//React
import React from 'react';
import propTypes from 'prop-types';
import {Link, Redirect} from "react-router-dom";
//Redux
import {connect} from 'react-redux';
import {getTasks, deleteTask, viewTask} from '../store/actions/tasks';
import {getUser} from '../store/actions/users';
//Bootstrap
import {Table} from 'react-bootstrap';
//Other Components
import CreateTask from './CreateTask';

class ListTasks extends React.Component{

    static propTypes = {
        tasks: propTypes.array.isRequired,
        // user: propTypes.array.isRequired,
    };

    componentDidMount() {
        this.props.getUser()
        this.props.getTasks()
    }


    render(){
        return(
            <div className="tasks">
                <CreateTask boards={this.props.user.boards}/>
                <div className="list-table">
                <Table responsive="sm" bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Subject</th>
                            <th>Priority</th>
                            <th>ETA</th>
                            <th>User</th>
                            <th>Creation Date</th>
                            <th>Board</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.tasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.subject}</td>
                                <td>{task.priority}</td>
                                <td>{task.avarage_ETA}</td>
                                <td>{task.user.username}</td>
                                {/* splits the creation date to have only the Year-Month-Day format  */}
                                <td>{task.creation_date.split("T")[0]}</td>
                                <td>{task.board.title}</td>
                                {
                                    this.props.user.user.id === task.user.id ?
                                    <React.Fragment>
                                    <td><button onClick={this.props.deleteTask.bind(this, task.id)}
                                    className="btn btn-danger"
                                    >Delete</button></td>
                                    <td><Link to={'tasks/' + task.id} className="btn btn-info">View</Link></td>
                                    </React.Fragment>
                                    :
                                    <td><Link to={'tasks/' + task.id} className="btn btn-info">View</Link></td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    tasks: state.tasks.tasks,
})

// const mapDispatchToProps = dispatch => ({
    
// })

export default connect(mapStateToProps, {getTasks, deleteTask, getUser, viewTask})(ListTasks);