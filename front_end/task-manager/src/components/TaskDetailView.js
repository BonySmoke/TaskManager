//react
import React from 'react';
//redux
import {connect} from 'react-redux';
import {viewTask, updateTask} from '../store/actions/tasks';
import {getUser} from '../store/actions/users';
//FontAwesomeIcons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


class TaskDetailView extends React.Component{

    state = {
        editButtonTitle: "",
        discardChangesTitle: "",
        editButtonDescription: "",
        discardChangesDescription: ""
    }

    componentDidMount(){
        const id = this.props.match.params.taskID
        this.props.viewTask(id)
        this.props.getUser()
    }

    date = (date) => {
        return (date ? date.split("T")[0] : "undefined")
    }

    onTaskChange = (event) => {
        const task_id = this.props.task.id
        const average_ETA = document.getElementById('average_ETA_task').value
        const user = this.props.user.id
        const priority = document.getElementById('priority').value
        const subject = document.getElementById('subject').value
        const description = document.getElementById('description').value
        const status = document.getElementById('status').value
        this.props.updateTask(task_id, user, subject, description, priority, average_ETA, status)
        this.setState({
            editButtonTitle: "",
            discardChangesTitle: "",
            editButtonDescription: "",
            discardChangesDescription: ""
        })
        event.preventDefault()
    }

    onTitleChange = (event) => {
        this.setState({
            editButtonTitle: <button type="submit" className="btn btn-info" onClick={this.onTaskChange}>Update</button>,
            discardChangesTitle: <button type="submit" className="btn btn-warning" onClick={this.discardChangesTitle}>Discard Changes</button> 
        })
    }

    onDescriptionChange = (event) => {
        this.setState({
            editButtonDescription: <button type="submit" className="btn btn-info" onClick={this.onTaskChange}>Update</button>,
            discardChangesDescription: <button type="submit" className="btn btn-warning" onClick={this.discardChangesDescription}>Discard Changes</button>
        })
    }

    discardChangesTitle = (event) => {
        document.getElementById('subject').value = this.props.task.subject
        this.setState({
            editButtonTitle: "",
            discardChangesTitle: "",
        })
    }

    discardChangesDescription = () => {
        document.getElementById('description').value = this.props.task.description
        this.setState({
            editButtonDescription: "",
            discardChangesDescription: "",
        })
    }

    render(){
        return(
            <div className="task-detail-info">
                <div className="task-detail-left">
                    <label>Subject</label>
                    <p>
                        <input id="subject" name="subject" defaultValue={this.props.task.subject}
                            onChange={this.onTitleChange}>
                        </input>
                    </p>
                    {this.state.editButtonTitle}
                    {this.state.discardChangesTitle}

                    <div className="task-detail-widgets">
                        <label>Priority</label>
                        <select className="custom-select mr-sm-2" id="priority"
                                onChange={this.onTaskChange}>
                            <option value={this.props.task.priority}>
                                {this.props.task.priority}
                            </option>
                            <option value="Urgent">Urgent</option>
                            <option value="Low">Low</option>
                            <option value="High">High</option>
                            <option value="Normal">Normal</option>
                        </select>
                        <FontAwesomeIcon icon={faEdit} />

                        <label>ETA</label>
                        <select className="custom-select mr-sm-2" id="average_ETA_task"
                                onChange={this.onTaskChange}>
                            <option value={this.props.task.avarage_ETA}>
                                {this.props.task.avarage_ETA}
                            </option>
                            <option value="24h">24h</option>
                            <option value="48h">48h</option>
                            <option value="48+">48+</option>
                        </select>
                        <FontAwesomeIcon icon={faEdit} />

                        <label>Creation Date</label>
                        <input type="text" className="form-control"
                        value={this.date(this.props.task.creation_date)} readOnly/>

                        <label>Status</label>
                        <select className="custom-select mr-sm-2" id="status"
                                onChange={this.onTaskChange}>
                            <option value={this.props.task.status}>
                                {this.props.task.status}
                            </option>
                            <option value="ToDo">ToDo</option>
                            <option value="In progress">In progress</option>
                            <option value="On hold">On hold</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div className="task-detail-description">
                        <label>Description</label>
                        <textarea className="form-control" id="description" 
                            defaultValue={this.props.task.description}
                            onChange={this.onDescriptionChange}>
                        </textarea>
                        {this.state.editButtonDescription}
                        {this.state.discardChangesDescription}
                    </div>
                </div>
                <div className="task-detail-right">
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    task: state.tasks.task,
})

export default connect(mapStateToProps, 
    {viewTask, getUser, updateTask})
    (TaskDetailView)