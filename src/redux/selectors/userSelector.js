import { createSelector } from '@reduxjs/toolkit';
export const listUserSelector = state => state.listUser.data;
export const userSelectId = state => state.listUser.selectId;
export const userFollowType = state => state.listUser.followType;
export const userSelectStatus = state => state.listUser.status;

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

export const selectFollowByID = createSelector(
    listUserSelector,
    userSelectId,
    userFollowType,
    (users, id, flType) => {
        if (flType == "follower") {
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                if (user._id === id) {
                    return user.followers;
                }
            }
            // for (let i = 0; i < users.length; i++) {
            //     const user = users[i];
            //     if (user.followers.indexOf(id) > -1) {
            //         return user.followers.filter(e => e == id);
            //     }
            // }
        } else {
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                if (user._id === id) {
                    return user.followings;
                }
            }
        }

    },
);
