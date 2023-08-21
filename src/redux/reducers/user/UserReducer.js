import listUser from '../../../data/user';
const initState = {
    data: listUser,
    selectId: '',
    followType: ''
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case "select/idLogin":
            return {
                ...state,
                selectId: action.payload,
            };
        case "select/idUser":
            return {
                ...state,
                selectId: action.payload,
            };
        case "selectFollow/idUser":
            return {
                ...state,
                selectId: action.payload[0],
                followType: action.payload[1],
            };
        default:
            return state;
    }
}

export default userReducer;