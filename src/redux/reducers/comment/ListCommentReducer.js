import listComment from '../../../data/comment';
const initState = listComment;
const listCommentReducer = (state = initState, action) => {
    console.log(action.payload);
    switch (action.type) {
        case "select/idBlog":
            if (listComment.filter(e => e.idBlog === action.payload) == undefined) {
                return {};
            } else {
                return listComment.filter(e => e.idBlog === action.payload);
            }
        default:
            return state;
    }
}

export default listCommentReducer;