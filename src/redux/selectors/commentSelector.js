import { createSelector } from '@reduxjs/toolkit';
export const listCommentSelector = state => state.listComment.data;
export const commentSelectStatus = state => state.listComment.status;

export const selectComments = createSelector(
    listCommentSelector,
    (comments) => {
        return comments;
    },
);