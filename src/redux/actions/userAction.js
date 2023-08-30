export const selectInfoLogin = id => {
  return {
    type: "select/idLogin",
    payload: id,
  };
};

export const selectInfoUser = id => {
  return {
    type: "select/idUser",
    payload: id,
  };
};

export const selectFollowUser = (id, type) => {
  return {
    type: "selectFollow/idUser",
    payload: [id, type],
  };
};