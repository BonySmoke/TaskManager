import axios from 'axios'

import {GET_USERS, GET_USER} from './actionTypes'

export const getUsers = () => dispatch => {
    axios.get('http://localhost:8000/users/users/',)
    .then(res => {
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
        })
        .catch(err => {
            console.log(err.response.data)
    })
}

export const getUser = () => dispatch => {
    const token = localStorage.getItem('token')
    axios.get(`http://localhost:8000/users/getuser/${token}`,)
    .then(res => {
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err.response.data)
    })
}