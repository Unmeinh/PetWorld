import listComment from '../../../data/comment';
const initState = listComment;
const listCommentReducer = (state = initState, action) => {
    console.log(action.payload);
    switch (action.type) {
        case "select/idBlog":
            [...state]
            if (state.filter(e => e.idBlog === action.payload) == undefined) {
                return {};
            } else {
                return state.filter(e => e.idBlog === action.payload);
            }
        default:
            return state;
    }
}

export default listCommentReducer;