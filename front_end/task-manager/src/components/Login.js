import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Form, Col, Row, Spinner} from 'react-bootstrap';
import {authLogin} from '../store/actions/auth';
import Signup from './Signup';


class Login extends Component {


    handleOnSubmit = (event) =>{
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;
        this.props.onAuth(username, password);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                {
                    this.props.loading ?
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    :
                    <div>
                        <Form className="auth-login-form" onSubmit={this.handleOnSubmit}>
                            <h1>Login</h1>
                            <Form.Group as={Row} controlId="formHorizontalUsername">
                                <Col sm={12}>
                                <Form.Control type="text" placeholder="Username" name="username" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorizontalPassword">
                                <Col sm={12}>
                                <Form.Control type="password" placeholder="Password" name="password" />
                                </Col>
                            </Form.Group>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                        <Signup />
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);