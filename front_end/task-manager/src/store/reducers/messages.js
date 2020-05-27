import {GET_ERROR} from '../actions/actionTypes';

const initialState = {
    msg: {},
    status: null
};

export default reducer = (state=initialState, action) => {
    switch(action.type){
        case GET_ERROR:
            return {
                msg: action.payload.msg,
                status: action.payload.status
            }
        default:
            return state;
    }
}