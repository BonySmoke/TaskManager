//React
import React from 'react';
//Redux
import { useDispatch, useSelector } from "react-redux";
import {joinBoard} from '../store/actions/boards'
import {Form} from 'react-bootstrap';

function JoinBoard(){
    const state = useSelector(state => ({
        boards: state.boards.boards
    }));
    const dispatch = useDispatch();

    const handleOnSubmit = (event) => {
        const key = event.target.elements.join_board.value
        const id = localStorage.getItem('userId')
        dispatch(joinBoard(key, id))
    }

    return(
        <Form onSubmit={handleOnSubmit}>
            <Form.Control type="text" placeholder="Enter Board ID to join." name="join_board" />
        </Form>
    )   
}

export default JoinBoard;