import { convention_data, shop_data } from "../models/shop";
import { GetVersion } from "../util";

export const shopgetname: EPR = async (info, data, send) => {
  const shop_data = await DB.FindOne<shop_data>({
    collection: "shop_data",
  });

  if (_.isNil(shop_data)) {
    await DB.Insert<shop_data>({
      collection: "shop_data",

      opname: "CORE",
      pid: 57,
      cls_opt: 0,
    });

    return send.object(
      K.ATTR({
        status: "0",
        opname: "CORE",
        pid: "57",
        cls_opt: "0",
        hr: "0",
        mi: "0",
      })
    );
  }

  return send.object(
    K.ATTR({
      status: "0",
      opname: shop_data.opname,
      pid: String(shop_data.pid),
      cls_opt: String(shop_data.cls_opt),
      hr: "0",
      mi: "0",
    })
  );
};

export const shopsavename: EPR = async (info, data, send) => {
  await DB.Upsert<shop_data>(
    {
      collection: "shop_data",
    },
    {
      $set: {
        opname: $(data).attr().opname,
        pid: parseInt($(data).attr().pid),
        cls_opt: parseInt($(data).attr().cls_opt),
      },
    }
  );

  return send.success();
};

export const shopgetconvention: EPR = async (info, data, send) => {
  const version = GetVersion(info);

  const convention_data = await DB.FindOne<convention_data>({
    collection: "shop_convention",
    version: version,
  });
  if (_.isNil(convention_data)) return send.deny();

  return send.object(
    K.ATTR({
      music_0: String(convention_data.music_0),
      music_1: String(convention_data.music_1),
      music_2: String(convention_data.music_2),
      music_3: String(convention_data.music_3),
    },
    {
      valid: K.ITEM("bool", convention_data.valid),
    })
  );
};

export const shopsetconvention: EPR = async (info, data, send) => {
  const version = GetVersion(info);

  await DB.Upsert<convention_data>(
    {
      collection: "shop_convention",
      version: version,
    },
    {
      $set: {
        music_0: $(data).number("music_0"),
        music_1: $(data).number("music_1"),
        music_2: $(data).number("music_2"),
        music_3: $(data).number("music_3"),
        valid: $(data).bool("valid"),
      },
    }
  );

  return send.success();
};
