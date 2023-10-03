import { createSelector } from '@reduxjs/toolkit';
export const listUserSelector = state => state.listUser.data;
export const userLoginSelector = state => state.listUser.loginData;
export const userLoginId = state => state.listUser.loginData._id;
export const userSelectId = state => state.listUser.selectId;
export const userSelectStatus = state => state.listUser.status;
export const userMessage = state => state.listUser.message;

export const selectUserLogin = createSelector(
    userLoginSelector,
    (user, id) => {
        return user;
    },
);

export const selectUserByID = createSelector(
    listUserSelector,
    userSelectId,
    (user, id) => {
        // for (let i = 0; i < users.length; i++) {
        //     const user = users[i];
        //     if (user._id === id) {
        //         return user;
        //     }
        // }
        return user;
    },
);

// export const selectMyFollow = createSelector(
//     listFollowSelector,
//     followSelectType,
//     (follows, flType) => {
//         // if (flType == "follower") {
//         //     return follows;
//         // } else {
//         //     let fls = [];
//         //     for (let i = 0; i < follows.length; i++) {
//         //         fls.push(follows[i].idFollowing)
//         //     }
//         //     return fls;
//         // }
//         return follows;
//     },
// );

export const selectFollowByID = createSelector(
    listFollowSelector,
    followSelectType,
    (follows, id, flType) => {
        if (flType == "follower") {
            let fls = [];
            for (let i = 0; i < follows.length; i++) {
                fls.push(follows[i].idFollower)
            }
            return fls;
        } else {
            let fls = [];
            for (let i = 0; i < follows.length; i++) {
                fls.push(follows[i].idFollowing)
            }
            return fls;
        }

    },
);
