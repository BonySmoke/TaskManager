//React
import React from 'react';
import propTypes from 'prop-types';
import {Link, Redirect} from "react-router-dom";
//Redux
import {connect} from 'react-redux';
import {getTasks, deleteTask, viewTask, filterTaskTitle} from '../store/actions/tasks';
import {getUser} from '../store/actions/users';
//Bootstrap
import {Table} from 'react-bootstrap';
//Other Components
import CreateTask from './CreateTask';

class ListTasks extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            taskFiltered: false,
        }
    }

    componentDidMount() {
        this.props.getUser();
        this.props.getTasks();
    }

    filterTasks = () => {
        const checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked');
        let titles = new Array();
        for(let i=0; i<checkedBoxes.length; i++){
            let item = checkedBoxes[i].defaultValue;
            titles.push(item);
        };
        this.props.filterTaskTitle(titles, this.props.tasks);
        this.setState({taskFiltered: true});
    }


    render(){
        //check if the API returned no tasks
        const emptyTasksResponse = 'empty'
        return(
            <div className="tasks">
                <CreateTask boards={this.props.user.boards}/>
                        {
                        this.props.tasks.message !== emptyTasksResponse ?
                        <div className="taskFilters">
                            <p>Title Filter</p>
                            <ul>
                                {this.props.tasks.map(task => (
                                    <li key={task.id}>
                                        <input type="checkbox" value={task.board.title}/>{task.board.title}</li>
                                ))}
                            </ul>
                            <p>Date Filter</p>
                            <input type="text" placeholder="enter the date"/> <br/>
                            <button onClick={this.filterTasks}>Filter</button>
                        </div>
                        :
                        <React.Fragment></React.Fragment>
                        
                        }
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
                        {
                            this.props.tasks.message !== emptyTasksResponse ?
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
                            :
                            <React.Fragment></React.Fragment>
                        }
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

const mapDispatchToProps = dispatch => ({
    onFilterTasksTitle: (title, tasks) => dispatch(filterTaskTitle(title, tasks))
})

export default connect(mapStateToProps, {getTasks, deleteTask, getUser, viewTask, filterTaskTitle})(ListTasks);