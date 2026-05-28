import fs from 'fs';
import path from 'path';

function crc32(buffer: Buffer): number {
  let crc = 0xffffffff;

  for (let i = 0; i < buffer.length; i++) {
    crc ^= buffer[i];
    for (let j = 0; j < 8; j++) {
      const mask = -(crc & 1);
      crc = (crc >>> 1) ^ (0xedb88320 & mask);
    }
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function toDosTimeDate(date: Date): { time: number; date: number } {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = Math.floor(date.getSeconds() / 2);

  const dosTime = (hours << 11) | (minutes << 5) | seconds;
  const dosDate = ((Math.max(year, 1980) - 1980) << 9) | (month << 5) | day;

  return { time: dosTime & 0xffff, date: dosDate & 0xffff };
}

async function listFilesRecursive(rootDir: string): Promise<string[]> {
  const results: string[] = [];

  async function walk(currentDir: string) {
    const entries = await fs.promises.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile()) {
        results.push(fullPath);
      }
    }
  }

  await walk(rootDir);
  return results;
}

function normalizeZipPath(p: string): string {
  return p.replace(/\\/g, '/');
}

export async function zipFolderToFile(params: {
  sourceDir: string;
  outZipPath: string;
  rootInZip?: string;
}): Promise<void> {
  const sourceDir = path.resolve(params.sourceDir);
  const outZipPath = path.resolve(params.outZipPath);
  const rootInZip = params.rootInZip ? normalizeZipPath(params.rootInZip).replace(/^\/+|\/+$/g, '') : '';

  await fs.promises.mkdir(path.dirname(outZipPath), { recursive: true });

  const files = await listFilesRecursive(sourceDir);

  const out = fs.createWriteStream(outZipPath);
  let offset = 0;

  type CentralEntry = {
    fileName: string;
    crc: number;
    compressedSize: number;
    uncompressedSize: number;
    modTime: number;
    modDate: number;
    localHeaderOffset: number;
  };

  const central: CentralEntry[] = [];

  const writeBuffer = async (buf: Buffer) => {
    if (buf.length === 0) return;
    await new Promise<void>((resolve, reject) => {
      out.write(buf, (err) => (err ? reject(err) : resolve()));
    });
    offset += buf.length;
  };

  for (const filePath of files) {
    const stat = await fs.promises.stat(filePath);
    const data = await fs.promises.readFile(filePath);

    const rel = normalizeZipPath(path.relative(sourceDir, filePath));
    if (!rel || rel.startsWith('..') || path.isAbsolute(rel)) {
      continue;
    }

    const fileName = rootInZip ? `${rootInZip}/${rel}` : rel;
    const fileNameBytes = Buffer.from(fileName, 'utf8');

    const crc = crc32(data);
    const uncompressedSize = data.length;
    const compressedSize = data.length;
    const { time: modTime, date: modDate } = toDosTimeDate(stat.mtime);

    const localHeaderOffset = offset;

    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0); // Local file header signature
    localHeader.writeUInt16LE(20, 4); // Version needed to extract
    localHeader.writeUInt16LE(0, 6); // General purpose bit flag
    localHeader.writeUInt16LE(0, 8); // Compression method (0 = store)
    localHeader.writeUInt16LE(modTime, 10);
    localHeader.writeUInt16LE(modDate, 12);
    localHeader.writeUInt32LE(crc, 14);
    localHeader.writeUInt32LE(compressedSize, 18);
    localHeader.writeUInt32LE(uncompressedSize, 22);
    localHeader.writeUInt16LE(fileNameBytes.length, 26);
    localHeader.writeUInt16LE(0, 28); // Extra field length

    await writeBuffer(localHeader);
    await writeBuffer(fileNameBytes);
    await writeBuffer(data);

    central.push({
      fileName,
      crc,
      compressedSize,
      uncompressedSize,
      modTime,
      modDate,
      localHeaderOffset,
    });
  }

  const centralDirOffset = offset;

  for (const entry of central) {
    const fileNameBytes = Buffer.from(entry.fileName, 'utf8');
    const header = Buffer.alloc(46);

    header.writeUInt32LE(0x02014b50, 0); // Central directory file header signature
    header.writeUInt16LE(20, 4); // Version made by
    header.writeUInt16LE(20, 6); // Version needed to extract
    header.writeUInt16LE(0, 8); // General purpose bit flag
    header.writeUInt16LE(0, 10); // Compression method
    header.writeUInt16LE(entry.modTime, 12);
    header.writeUInt16LE(entry.modDate, 14);
    header.writeUInt32LE(entry.crc, 16);
    header.writeUInt32LE(entry.compressedSize, 20);
    header.writeUInt32LE(entry.uncompressedSize, 24);
    header.writeUInt16LE(fileNameBytes.length, 28);
    header.writeUInt16LE(0, 30); // Extra field length
    header.writeUInt16LE(0, 32); // File comment length
    header.writeUInt16LE(0, 34); // Disk number start
    header.writeUInt16LE(0, 36); // Internal file attributes
    header.writeUInt32LE(0, 38); // External file attributes
    header.writeUInt32LE(entry.localHeaderOffset, 42);

    await writeBuffer(header);
    await writeBuffer(fileNameBytes);
  }

  const centralDirSize = offset - centralDirOffset;

  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0); // End of central directory signature
  eocd.writeUInt16LE(0, 4); // Number of this disk
  eocd.writeUInt16LE(0, 6); // Disk where central directory starts
  eocd.writeUInt16LE(central.length, 8); // Number of central directory records on this disk
  eocd.writeUInt16LE(central.length, 10); // Total number of central directory records
  eocd.writeUInt32LE(centralDirSize, 12);
  eocd.writeUInt32LE(centralDirOffset, 16);
  eocd.writeUInt16LE(0, 20); // ZIP file comment length

  await writeBuffer(eocd);

  await new Promise<void>((resolve, reject) => {
    out.end(() => resolve());
    out.on('error', reject);
  });
}
