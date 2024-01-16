import { profile } from "../models/profile";
import { rival } from "../models/rival";

export const updateRivalSettings = async (data: {
  // All of data sent as string
  iidxid: string;

  sp_rival1?: string;
  sp_rival2?: string;
  sp_rival3?: string;
  sp_rival4?: string;
  sp_rival5?: string;

  dp_rival1?: string;
  dp_rival2?: string;
  dp_rival3?: string;
  dp_rival4?: string;
  dp_rival5?: string;
}) => {
  const profile = await DB.FindOne<profile>(null, {
    collection: "profile",
    idstr: data.iidxid,
  });
  let update_array = [];

  if (!(_.isEmpty(data.sp_rival1))) {
    let update_data = {
      play_style: 1,
      index: 0,
      rival_refid: data.sp_rival1,
    };

    update_array.push(update_data);
  } else {
    await DB.Remove<rival>(profile.refid,
      {
        collection: 'rival',
        play_style: 1,
        index: 0,
      }
    )
  }

  if (!(_.isEmpty(data.sp_rival2))) {
    let update_data = {
      play_style: 1,
      index: 1,
      rival_refid: data.sp_rival2,
    };

    update_array.push(update_data);
  } else {
    await DB.Remove<rival>(profile.refid,
      {
        collection: 'rival',
        play_style: 1,
        index: 1,
      }
    )
  }

  if (!(_.isEmpty(data.sp_rival3))) {
    let update_data = {
      play_style: 1,
      index: 2,
      rival_refid: data.sp_rival3,
    };

    update_array.push(update_data);
  } else {
    await DB.Remove<rival>(profile.refid,
      {
        collection: 'rival',
        play_style: 1,
        index: 2,
      }
    )
  }

  if (!(_.isEmpty(data.sp_rival4))) {
    let update_data = {
      play_style: 1,
      index: 3,
      rival_refid: data.sp_rival4,
    };

    update_array.push(update_data);
  } else {
    await DB.Remove<rival>(profile.refid,
      {
        collection: 'rival',
        play_style: 1,
        index: 3,
      }
    )
  }

  if (!(_.isEmpty(data.sp_rival5))) {
    let update_data = {
      play_style: 1,
      index: 4,
      rival_refid: data.sp_rival5,
    };

    update_array.push(update_data);
  } else {
    await DB.Remove<rival>(profile.refid,
      {
        collection: 'rival',
        play_style: 1,
        index: 4,
      }
    )
  }

  if (!(_.isEmpty(data.dp_rival1))) {
    let update_data = {
      play_style: 2,
      index: 0,
      rival_refid: data.dp_rival1,
    };

    update_array.push(update_data);
  } else {
    await DB.Remove<rival>(profile.refid,
      {
        collection: 'rival',
        play_style: 2,
        index: 0,
      }
    )
  }

  if (!(_.isEmpty(data.dp_rival2))) {
    let update_data = {
      play_style: 2,
      index: 1,
      rival_refid: data.dp_rival2,
    };

    update_array.push(update_data);
  } else {
    await DB.Remove<rival>(profile.refid,
      {
        collection: 'rival',
        play_style: 2,
        index: 1,
      }
    )
  }

  if (!(_.isEmpty(data.dp_rival3))) {
    let update_data = {
      play_style: 2,
      index: 2,
      rival_refid: data.dp_rival3,
    };

    update_array.push(update_data);
  } else {
    await DB.Remove<rival>(profile.refid,
      {
        collection: 'rival',
        play_style: 2,
        index: 2,
      }
    )
  }

  if (!(_.isEmpty(data.dp_rival4))) {
    let update_data = {
      play_style: 2,
      index: 3,
      rival_refid: data.dp_rival4,
    };

    update_array.push(update_data);
  } else {
    await DB.Remove<rival>(profile.refid,
      {
        collection: 'rival',
        play_style: 2,
        index: 3,
      }
    )
  }

  if (!(_.isEmpty(data.dp_rival5))) {
    let update_data = {
      play_style: 2,
      index: 4,
      rival_refid: data.dp_rival5,
    };

    update_array.push(update_data);
  } else {
    await DB.Remove<rival>(profile.refid,
      {
        collection: 'rival',
        play_style: 2,
        index: 4,
      }
    )
  }

  for (let i = 0; i < update_array.length; i++) {
    await DB.Upsert<rival>(profile.refid, {
      collection: "rival",
      play_style: update_array[i].play_style,
      index: update_array[i].index,
    }, {
      $set: {
        rival_refid: update_array[i].rival_refid,
        }
      }
    )
  }
};
