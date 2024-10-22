import { createSelector } from '@reduxjs/toolkit';
export const listBlogSelector = state => state.listBlog.data;
export const listBlogUserSelector = state => state.listBlog.dataUser;
export const userSelectId = state => state.listBlog.userId;
export const blogSelectId = state => state.listBlog.selectId;
export const blogSelectStatus = state => state.listBlog.status;
export const blogCanLoadMore = state => state.listBlog.canLoadMore;
export const userLoginId = state => state.listUser.loginData._id;

export const selectBlogs = createSelector(
    listBlogSelector,
    userLoginId,
    (blogs, loginId) => {
        return blogs;
    },
);

export const selectBlogsByUser = createSelector(
    listBlogSelector,
    (blogs, id) => {
        return blogs;
    },
);

export const selectBlogByID = createSelector(
    listBlogSelector,
    blogSelectId,
    (blogs, id) => {
        for (let i = 0; i < blogs.length; i++) {
            const blog = blogs[i];
            if (blog._id === id) {
                return blog;
            }
        }
    },
);
