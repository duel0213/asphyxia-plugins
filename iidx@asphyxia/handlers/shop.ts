import { convention_data, shop_data } from "../models/shop";
import { GetCommand, GetModel, GetVersion } from "../util";

export const shopmethod: EPR = async (info, data, send) => {
  const command = GetCommand(data);
  switch (command[0]) {
    case "sentinfo":
      return await shopsentinfo(info, data, send);

    default:
      break;
  }

  return send.deny();
}

export const shopgetname: EPR = async (info, data, send) => {
  const shop_data = await DB.FindOne<shop_data>({
    collection: "shop_data",
  });

  if (_.isNil(shop_data)) {
    await DB.Insert<shop_data>({
      collection: "shop_data",

      opname: "ＣＯＲＥ",
      pid: 53,
      cls_opt: 0,
    });

    return send.object(
      K.ATTR({
        opname: "ＣＯＲＥ",
        pid: "53",
        cls_opt: "0",
        hr: "0",
        mi: "0",
      }),
      { encoding: "shift_jis" }
    );
  }

  return send.object(
    K.ATTR({
      opname: shop_data.opname,
      pid: String(shop_data.pid),
      cls_opt: String(shop_data.cls_opt),
      hr: "0",
      mi: "0",
    }),
    { encoding: "shift_jis" }
  );
};

export const shopsavename: EPR = async (info, data, send) => {
  // removed saving code as opname attribute being sent as shift_jis but KDataReader read as utf-8 //
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

export const shopsentinfo: EPR = async (info, data, send) => {
  const version = GetVersion(info);

  let result = {};
  let sendOption: EamuseSendOption = {};
  if (version < 14) {
    result = Object.assign(result, {
      "@attr": { method: "shopsentinfo" },
    });
    sendOption = {
      rootName: GetModel(info),
      status: version < 13 ? "SOK" : 0,
    };
  } else {
    return send.success();
  }

  return send.object(result, sendOption);
}
