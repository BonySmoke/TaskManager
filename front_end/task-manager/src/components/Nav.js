import React from 'react';
import {
    Link,
    withRouter,
  } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

class Nav extends React.Component {

  render() {
    return (
      <div>
            <header>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/todo">ToDo</Link>
                  </li>
                  <li>
                    <Link to="/tasks">Task</Link>
                  </li>
                  <li>
                    <Link to="/boards">Boards</Link>
                  </li>
                  <li>
                    <Link to="/budget">Budget</Link>
                  </li>
                </ul>
              </nav>
              <div className="search-box-task">
                <input className="search-txt" type="text" name="" placeholder="Looking for a task?" />
                <Link to="/tasksearch"> <FontAwesomeIcon icon={faSearch} /> </Link>
              </div>
                <div className="user-logout-account">
                  <Link to="/account"><FontAwesomeIcon icon={faUserCircle} />Account</Link>
                  <Link to="/" onClick={this.props.logout}>Logout </Link>
                </div>
              </header>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
      logout: () => dispatch(actions.logout())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Nav));