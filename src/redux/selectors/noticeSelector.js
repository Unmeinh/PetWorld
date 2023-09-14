// import { createSelector } from '@reduxjs/toolkit';
// export const listNoticeSelector = state => state.listNotice.data;
// export const userSelectId = state => state.listNotice.userId;
// export const noticeSelectId = state => state.listNotice.selectId;
// export const noticeSelectStatus = state => state.listNotice.status;


// export const selectNotices = createSelector(
//     listNoticeSelector,
//     (notices) => {
//         console.log(notices);
//         return notices;
//     },
// );

// export const selectNoticesByUser = createSelector(
//     listNoticeSelector,
//     (notices, id) => {
//         return notices;
//     },
// );

// export const selectNoticeByID = createSelector(
//     listNoticeSelector,
//     noticeSelectId,
//     (notices, id) => {
//         for (let i = 0; i < notices.length; i++) {
//             const notice = notices[i];
//             if (notice._id === id) {
//                 return notice;
//             }
//         }
//     },
// );
