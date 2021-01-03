import {GET_TASKS, DELETE_TASK, VIEW_TASK, CREATE_TASK, UPDATE_TASK, FILTER_TASKS_TITLE} from '../actions/actionTypes';

const initialState = {
    tasks: [],
    task: {},
}

const tasksReducer = (state=initialState, action) => {
    switch(action.type){
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
                task: {}
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload),
                task: {}
            }
        case VIEW_TASK:
            return {
                ...state,
                // tasks: [],
                task: action.payload
            }
        case CREATE_TASK:
            return {
                ...state,
                tasks: state.tasks.push(action.payload)
            }
        case UPDATE_TASK:
            return {
                ...state,
                task: action.payload
            }
        case FILTER_TASKS_TITLE:
            return {
                ...state,
                tasks: action.payload
            }
        default:
            return state
    }
}

export default tasksReducer;