import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { connect } from 'react-redux';
import Login from './components/Login';
import Nav from './components/Nav';
import { authCheckState } from './store/actions/auth';
import Alerts from './components/Alerts';
import ListTasks from './components/ListTasks'
import TaskDetailView from './components/TaskDetailView'


export class App extends React.Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    console.log(this.props)
    return (
        <Router>
          <Alerts />
          {
            this.props.isAuthenticated ?
            <Nav {...this.props} />
            :
            <div>
              <Login {...this.props}/>
              {/* <Signup {...this.props}/> */}
            </div>
          }
          <Switch>
            <Route path="/todo" exact />
            <Route exact path="/login" component={Login}/>
            <Route exact path = "/tasks" component={ListTasks} />
            <Route exact path = "/tasks/:taskID/" component = {TaskDetailView} />
          </Switch>
        </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchtoProps = dispath => {
  return {
    onTryAutoSignup: () => dispath(authCheckState()),
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(App);