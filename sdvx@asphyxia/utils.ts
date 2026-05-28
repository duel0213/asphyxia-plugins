import {Counter} from './models/counter';

// import { music_db } from '.';

export function IDToCode(id: number) {
  const padded = _.padStart(id.toString(), 8);
  return `${padded.slice(0, 4)}-${padded.slice(4)}`;
}

export async function GetCounter(key: string) {
  return (
    await DB.Upsert<Counter>(
      { collection: 'counter', key: 'mix' },
      { $inc: { value: 1 } }
    )
  ).docs[0].value;
}

export function getVersion(info: EamuseInfo) {
  const dateCode = parseInt(info.model.split(":")[4]);
  if (dateCode <= 2013052900) return 1;
  if (dateCode <= 2014112000) return 2;
  if (dateCode <= 2016121200) return 3;
  if (info.method.startsWith('sv4')) return 4;
  if (info.method.startsWith('sv5')) return 5;
  if (info.method.startsWith('sv6')) return 6;
  if (info.method.startsWith('sv7')) return 7;
  return 0;
}

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

export function add_extend(e_id: number, e_type: number,
  p1: number, p2: number, p3: number, p4: number, p5: number,
  sp1: string, sp2: string, sp3: string, sp4: string, sp5: string){
    return {
      id: e_id,
      type: e_type,
      params: [
        p1,
        p2,
        p3,
        p4,
        p5,
        sp1,
        sp2,
        sp3,
        sp4,
        sp5,
      ],
    }
}

export function getRandomCharaterRight(){

}

export function getRandomCharaterLeft(){
  
}

export function getRandomCharaterMiddle(){

}




export function send_webhook(data: any) {
  let https = require('https');
  let contents = JSON.stringify({
    "content": null,
    "embeds": [
      {
        "title": "New SOUND VOLTEX Score",
        "color": 16711680,
        "fields": [
          {
            "name": "Player Name",
            "value": data.name
          },
          {
            "name": "Song Name",
            "value": data.id,
            "inline": true
          },
          {
            "name": "Difficulty",
            "value": data.type,
            "inline": true
          },
          {
            "name": "Score",
            "value": data.score,
          },
          {
            "name": "Ex Score",
            "value": data.exscore,
          },
          {
            "name": "Clear Medal",
            "value": data.clear,
            "inline": true
          },
          {
            "name": "Grade",
            "value": data.grade,
          },
          {
            "name": "S-Critical",
            "value": "0",
            "inline": true
          },
          {
            "name": "Critical",
            "value": "0",
            "inline": true
          },
          {
            "name": "Near",
            "value": "0",
            "inline": true
          },
          {
            "name": "Error",
            "value": "0",
            "inline": true
          }
        ],
        "author": {
          "name": "Asphyxia CORE",
          "icon_url": "https://asphyxia-core.github.io/img/core-logo.png"
        },
        "thumbnail": {
          "url": "https://asphyxia-core.github.io/img/core-logo.png"
        }
      }
    ],
    "attachments": []
  })
  console.log(contents);
  let options = {
      host:'discord.com',
      path:U.GetConfig('discord_webhook_url'),
      method:'POST',
      headers:{
          'Content-Type':'application/json; charset=utf-8',
          'Content-Length':contents.length
      }
  }
  if(U.GetConfig('discord_webhook')){
    let req = https.request(options, res => {
        console.log(`${res.statusCode}`);
        res.on('data', (d) => {
          // process.stdout.write(d);
        });
    });
    req.write(contents);
  }
}

export function getCurrentWeekOfYear(date = new Date()) {
  // Clone the date to avoid modifying the original
  const current = date.getTime();

  // Set the first day of the year
  const startOfYear = new Date(date.getFullYear(), 0, 1).getTime();

  // Calculate the day of the year
  const dayOfYear = ((current - startOfYear + 1) / 86400000);

  // ISO 8601 weeks start on Monday and the first week of the year must contain Jan 4th.
  // Adjust the date to the nearest Thursday (ISO 8601 rule).
  const adjustedDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + (4 - (date.getDay() || 7))
  );

  const startOfISOYear = new Date(adjustedDate.getFullYear(), 0, 1);
  const firstWeekDay = startOfISOYear.getDay() || 7;

  // Calculate ISO week number
  return Math.ceil((adjustedDate.getTime() - startOfISOYear.getTime() + (firstWeekDay - 1) * 86400000) / (7 * 86400000));
}

export function getWeekStartAndEnd(date = new Date()) {
  // Clone the input date to avoid modifying the original
  const current = new Date(date.getTime());

  // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayOfWeek = current.getDay();

  // Adjust to the start of the week (Monday)
  const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek; // Monday = 1, Sunday = 0
  const startOfWeek = new Date(current.setDate(current.getDate() + diffToMonday));
  startOfWeek.setHours(0, 0, 0, 0); // Set time to midnight

  // Clone the startOfWeek and add 6 days to get the end of the week
  const endOfWeek = new Date(startOfWeek.getTime());
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999); // Set time to end of day

  return {
      startOfWeek: startOfWeek.getTime(), // Timestamp for the start of the week
      endOfWeek: endOfWeek.getTime(),     // Timestamp for the end of the week
  };
}

export class SeededRandom {

  seed: number;

  constructor(seed) {
    this.seed = seed % 2147483647; // A prime number
    if (this.seed <= 0) this.seed += 2147483646; // Avoid zero seed
  }

  next() {
    this.seed = (this.seed * 16807) % 2147483647; // LCG formula
    return this.seed;
  }

  nextFloat() {
    return (this.next() - 1) / 2147483646; // Convert to [0, 1)
  }
}

export const TRANSLATION_TABLE = {
  "龕": "€",
  "釁": "🍄",
  "驩": "Ø",
  "曦": "à",
  "齷": "é",
  "骭": "ü",
  "齶": "♡",
  "彜": "ū",
  "罇": "ê",
  "雋": "Ǜ",
  "鬻": "♃",
  "鬥": "Ã",
  "鬆": "Ý",
  "曩": "è",
  "驫": "ā",
  "齲": "♥",
  "騫": "á",
  "趁": "Ǣ",
  "鬮": "¡",
  "盥": "⚙︎",
  "隍": "︎Ü",
  "頽": "ä",
  "餮": "Ƶ",
  "黻": "*",
  "蔕": "ũ",
  "闃": "Ā",
  "饌": "²",
  "煢": "ø",
  "鑷": "ゔ",
  "=墸Σ": "=͟͟͞ Σ",
  "鹹": "Ĥ",
  "瀑i": "Ài",
  "疉": "Ö",
  "鑒": "₩",
  "Ryu??": "Ryu☆",
}