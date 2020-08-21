import React from 'react';
//Redux
import {connect} from 'react-redux';
import {createBoard} from '../store/actions/boards';
//Bootstrap
import {Form, Button} from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";

class CreateBoard extends React.Component {

    state = {
        show: false,
    }

    onShow = () => {
        this.setState({show: true})
    }

    onClose = () => {
        this.setState({show: false})
    }

    handleChooseImage = () => {
        const fileLabel = document.getElementById('customImageBoardLabel')
        const file = document.getElementById('customImageBoard').value.split("\\")
        file.value = file[file.length - 1]
        fileLabel.innerHTML = file.value
    }

    handleCreateBoard = (event) => {
        const user = localStorage.getItem('userId')
        const title = document.getElementById('boardTitle').value
        const boardImage = document.getElementById('customImageBoard')
        let form_data = new FormData()
        form_data.append('title', title)
        form_data.append('creator', user)
        form_data.append('image', boardImage.files[0])
        this.props.onBoardCreate(form_data)
    }

    render(){
        return (
                <div className="b-create-top">
                    <Form>
                    <button
                    type="button" 
                    className="btn btn-primary btn-lg"
                    onClick={this.onShow}>
                        Create
                    </button>
                    <Modal show={this.state.show} onHide={this.onClose} centered>
                        <Modal.Header closeButton>Create Board</Modal.Header>
                        <Modal.Body>
                            <input className="form-control" placeholder="Board title" id="boardTitle"></input>
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="customImageBoard" accept="image/*" onChange={this.handleChooseImage}></input>
                                <label className="custom-file-label" 
                                id="customImageBoardLabel" 
                                placeholder="Choose an image" 
                                htmlFor="customImageBoard"></label>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleCreateBoard}>Submit</Button>
                        </Modal.Footer>
                    </Modal>
                    </Form>
                </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onBoardCreate: (form_data) => 
        dispatch(createBoard(form_data))
    }
}

export default connect(null, mapDispatchToProps)(CreateBoard);