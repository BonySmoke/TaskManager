import axios from 'axios';
import { GET_TASKS, DELETE_TASK, VIEW_TASK, CREATE_TASK, UPDATE_TASK } from './actionTypes';

//GET all the tasks
//backup: http://localhost:8000/tasks/
export const getTasks = () => dispatch => {
    console.log(localStorage)
    axios.get(`http://localhost:8000/board-tasks/${localStorage.getItem('username')}/`)
    .then(res => {
        dispatch({
            type: GET_TASKS,
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err)
    })
}

//Delete a specific task
export const deleteTask = id => dispatch => {
    axios.delete(`http://localhost:8000/tasks/${id}/`)
    .then(res => {
        dispatch({
            type: DELETE_TASK,
            payload: id
        })
    })
    .catch(err => {
        console.log(err)
    })
}

export const viewTask = id => dispatch => {
    axios.get(`http://localhost:8000/tasks/${id}/`)
    .then(res => {
        dispatch({
            type: VIEW_TASK,
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err)
    })
}

export const createTask = (user, subject, description, priority, avarage_ETA, board) => dispatch => {
    axios.post('http://localhost:8000/tasks/', {
        user: user,
        subject: subject,
        description: description,
        priority: priority,
        avarage_ETA: avarage_ETA,
        board: board
    })
    .then(res => {
        dispatch({
            type: CREATE_TASK,
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err)
    })
}

export const updateTask = (task_id, user, subject, description, priority, avarage_ETA, status) => dispatch => {
    axios.put(`http://localhost:8000/tasks/${task_id}/`, {
        user: user,
        subject: subject,
        description: description,
        priority: priority,
        avarage_ETA: avarage_ETA,
        status: status
    })
    .then(res => {
        dispatch({
            type: UPDATE_TASK,
            payload: res.data
        })
    })
}