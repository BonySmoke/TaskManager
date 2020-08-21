import { combineReducers } from 'redux';
import authReducer from './auth';
import tasksReducer from './tasks';
import userReducer from './users';
import boardsReducer from './boards';

const rootReducer = combineReducers({
    auth: authReducer,
    tasks: tasksReducer,
    users: userReducer,
    boards: boardsReducer,
})

export default rootReducer