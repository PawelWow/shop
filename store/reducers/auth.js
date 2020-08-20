import { LOGIN, SIGNUP } from '../actions/auth';

const initialStae = {
    token: null,
    userId: null
};

export default( state = initialStae, action) => {
    switch(action.type) {
        case LOGIN:
        case SIGNUP:
            return {
                token: action.token,
                userId: action.userId
            }
        default:
                return state;
    }
}