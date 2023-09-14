export const selectNoticeByID = id => {
    return {
      type: "select/idNotice",
      payload: id,
    };
  };