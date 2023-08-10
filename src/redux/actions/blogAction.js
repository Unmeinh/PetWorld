export const selectBlogByID = id => {
    return {
      type: "select/idBlog",
      payload: id,
    };
  };