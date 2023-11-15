export const selectFavoriteByID = id => {
    return {
      type: "select/idFavorite",
      payload: id,
    };
  };