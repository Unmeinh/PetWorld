import infoLogin from '../../../data/user';
const initState = infoLogin;

const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case "select/idUser":
            return infoLogin.find(e => e._id == action.payload);
        default:
            return {};
    }
}

export default loginReducer;