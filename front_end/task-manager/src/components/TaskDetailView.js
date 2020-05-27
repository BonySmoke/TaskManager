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

    componentDidMount(){
        const id = this.props.match.params.taskID
        this.props.viewTask(id)
        this.props.getUser()
    }

    date = (date) => {
        if (date){
            const new_date = date.split("T")[0]
            return new_date
        }else{
            return "undefined"
        }
    }

    onETAChange = (event) => {
        var value = document.getElementById('average_ETA_task').value
        console.log(value)
    }

    render(){
        return(
            <div className="task-detail-info">
                <div className="task-detail-left">
                    <label>Subject</label>
                    <p>{this.props.task.subject}</p>
                    <FontAwesomeIcon icon={faEdit} />

                    <div className="task-detail-widgets">
                        <label>Priority</label>
                        <input type="text" className="form-control" 
                        value={this.props.task.priority} readOnly/>
                        <FontAwesomeIcon icon={faEdit} />

                        <label>ETA</label>
                        <select className="custom-select mr-sm-2" id="average_ETA_task"
                                onChange={this.onETAChange}>
                            <option value={this.props.task.avarage_ETA}>
                                {this.props.task.avarage_ETA}
                            </option>
                            <option value="24h">24h</option>
                            <option value="48h">48h</option>
                            <option value="48+">48+</option>
                        </select>
                        {/* <input type="text" className="form-control" 
                        value={this.props.task.avarage_ETA} readOnly/> */}
                        <FontAwesomeIcon icon={faEdit} />

                        <label>Creation Date</label>
                        <input type="text" className="form-control"
                        value={this.date(this.props.task.creation_date)} readOnly/>

                        <label>Status</label>
                        <input type="text" className="form-control"
                        value={this.props.task.status} readOnly/>
                    </div>
                    <div className="task-detail-description">
                        <label>Description</label>
                        <textarea className="form-control" value={this.props.task.description}></textarea>
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

export default connect(mapStateToProps, {viewTask, getUser})(TaskDetailView)