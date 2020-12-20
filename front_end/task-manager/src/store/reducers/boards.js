import {CREATE_BOARD, GET_BOARDS, JOIN_BOARD} from "../actions/actionTypes"

const initialState = {
    boards: [],
    board: {},
    message: ''
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
        case JOIN_BOARD:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state
    }
}

export default boardsReducer;