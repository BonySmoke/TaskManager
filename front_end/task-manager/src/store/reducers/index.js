import { combineReducers } from 'redux';
import authReducer from './auth';
import tasksReducer from './tasks';
import userReducer from './users';

const rootReducer = combineReducers({
    auth: authReducer,
    tasks: tasksReducer,
    users: userReducer,
})

export default rootReducer