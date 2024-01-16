export const shopgetname: EPR = async (info, data, send) => {
  return send.object(
    K.ATTR({
      status: "0",
      opname: "ＣＯＲＥ",
      pid: "57",
      cls_opt: "0",
      hr: "0",
      mi: "0",
    })
  );
};

export const shopgetconvention: EPR = async (info, data, send) => {
  return send.deny();
};

export const shopsetconvention: EPR = async (info, data, send) => {
  return send.deny();
};
