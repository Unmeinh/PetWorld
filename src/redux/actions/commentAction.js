export const selectCommentByID = id => {
    return {
        type: "select/idBlog",
        payload: id,
    };
};