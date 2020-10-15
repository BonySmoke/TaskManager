import {CREATE_BOARD, GET_BOARDS} from "../actions/actionTypes"

const initialState = {
    boards: [],
    board: {}
}

const boardsReducer = (state=initialState, action) => {
    switch(action.type) {
        case CREATE_BOARD:
            return {
                ...state,
                boards: state.boards.push(action.payload),
                board: {}
            }
        case GET_BOARDS:
            return {
                ...state,
                boards: action.payload,
                board: {}
            }
        default:
            return state
    }
}

export default boardsReducer;