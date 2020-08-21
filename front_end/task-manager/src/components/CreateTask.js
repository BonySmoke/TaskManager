import React from 'react';
//Redux
import {connect} from 'react-redux';
import {createTask} from '../store/actions/tasks';
//Bootstrap
import {Form} from 'react-bootstrap';


class CreateTask extends React.Component{

    onCreateClick = () => {
        const modal = document.querySelector('.task-modal');
        const overlay = document.querySelector('#task-overlay')
        modal.classList.add('active')
        overlay.classList.add('active')
    }

    onClickClose = (event) => {
        event.preventDefault()
        const modal = document.querySelector('.task-modal');
        const overlay = document.querySelector('#task-overlay')
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }

    onCreateSubmit = (event) => {
        const user = this.props.user.user.id
        console.log(user)
        const subject = event.target.elements.subject.value
        const description = event.target.elements.description.value
        const priority = document.getElementById("select-priority")
        const average_ETA = document.getElementById("average_ETA")
        const board = document.getElementById("board-select").value
        console.log(board)
        this.props.onTaskCreate(user, subject, description, priority.value, average_ETA.value, board)
        this.history.push('/tasks')
    }

    render(){
        return(
            <Form onSubmit={this.onCreateSubmit}>
            <div className="tasks-sidebar">
            <button 
            data-modal-target="#task-modal" type="button" 
            className="btn btn-primary btn-lg"
            onClick={this.onCreateClick}>Create</button>
            <p>Quick templates</p>
            </div>
            <div className="task-modal" id="task-modal">
                <div className="task-modal-header">
                <div className="task-title">Create Task</div>
                <button onClick={this.onClickClose} data-close-button className="task-close-button">&times;</button>
                </div>
                <div className="task-modal-body">

                    <label>Board</label>
                    <select className="custom-select mr-sm-2" id="board-select">
                        <option value="" defaultValue>----</option>
                        {this.props.boards && this.props.boards.map(board => (
                            <React.Fragment key={board.id}>
                            <option value={board.id}>{board.title}</option>
                            </React.Fragment>
                        ))}
                    </select>

                    <label>Subject</label>
                    <input type="text" className="form-control" id="taskSummary" name="subject" />

                    <label>Description</label>
                    <textarea className="form-control" name="description"/>

                    <label>Priority</label>
                    <select className="custom-select mr-sm-2" id="select-priority">
                        <option value="Urgent" defaultValue>Urgent</option>
                        <option value="Low">Low</option>
                        <option value="High">High</option>
                        <option value="Normal">Normal</option>
                    </select>

                    <label>ETA</label>
                    <select className="custom-select mr-sm-2" id="average_ETA">
                        <option value="24h" defaultValue>24h</option>
                        <option value="48h">48h</option>
                        <option value="48+">48+</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-info">Create</button>
            </div>
            <div id="task-overlay"></div>
            </Form>
        )
    }
}

const mapStateToProps = state => ({
    user: state.users.user
})

const mapDispatchToProps = dispatch => {
    return {
        onTaskCreate: (user, subject, description, priority, average_ETA, board) => 
        dispatch(createTask(user, subject, description, priority, average_ETA, board)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);