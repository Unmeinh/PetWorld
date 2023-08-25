import { createSelector } from '@reduxjs/toolkit';
export const listBlogSelector = state => state.listBlog.data;
export const userSelectId = state => state.listBlog.userId;
export const blogSelectId = state => state.listBlog.selectId;

export const selectBlogs = createSelector(
    listBlogSelector,
    (blogs) => {
        return blogs;
    },
);

export const selectBlogsByUser = createSelector(
    listBlogSelector,
    userSelectId,
    (blogs, id) => {
        var userBlogs = [];
        for (let i = 0; i < blogs.length; i++) {
            const blog = blogs[i];
            if (blog.idUser != undefined) {
                if (blog.idUser._id == id) {
                    userBlogs.push(blog);
                }
            }
        }
        return userBlogs;
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
