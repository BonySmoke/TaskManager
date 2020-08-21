import axios from 'axios';
import {CREATE_BOARD} from './actionTypes'

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