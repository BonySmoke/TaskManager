import axios from 'axios';
import {CREATE_BOARD, GET_BOARDS} from './actionTypes'

export const createBoard = (form_data) => dispatch => {
    axios.post(`http://localhost:8000/users/boards/`, form_data, {
        headers: {
            'content-type': 'multipart/form-data'
          }
    })
    .then( res => {
        dispatch({
            type: CREATE_BOARD,
            payload: res.data
        }
        )
    })
    .catch(err => {
        console.log(err.response.data)
    })
}

export const getBoards = () => dispatch => {
    const username = localStorage.getItem('username')
    axios.get(`http://localhost:8000/users/board-users/${username}`, {

    })
    .then(res => {
        dispatch({
            type: GET_BOARDS,
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err.response.data)
    })
}