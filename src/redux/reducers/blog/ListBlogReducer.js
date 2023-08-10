import listBlog from '../../../data/blog';
const initState = listBlog;
const listBlogReducer = (state = initState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default listBlogReducer;