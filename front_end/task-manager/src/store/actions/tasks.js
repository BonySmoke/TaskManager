import axios from 'axios';
import { GET_TASKS, DELETE_TASK, VIEW_TASK, CREATE_TASK } from './actionTypes';

//GET all the tasks
export const getTasks = () => dispatch => {
    axios.get('http://localhost:8000/tasks/')
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

export const createTask = (user, subject, description, priority, avarage_ETA) => dispatch => {
    axios.post('http://localhost:8000/tasks/', {
        user: user,
        subject: subject,
        description: description,
        priority: priority,
        avarage_ETA: avarage_ETA
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

export const updateTask = (user, subject, description, priority, avarage_ETA) => dispatch => {
    const id = user
    axios.put(`http://localhost:8000/tasks/${id}`, {
        user: user,
        subject: subject,
        description: description,
        priority: priority,
        avarage_ETA: avarage_ETA
    })
}