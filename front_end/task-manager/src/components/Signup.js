import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Form, Col, Row} from 'react-bootstrap';
import * as actions from '../store/actions/auth';

class Signup extends Component {

    handleOnSubmit = (event) =>{
        const username = event.target.elements.username.value;
        const email = event.target.elements.email.value;
        const password1 = event.target.elements.password1.value;
        const password2 = event.target.elements.password2.value;
        const firstname = event.target.elements.firstname.value;
        const lastname = event.target.elements.lastname.value;
        const job_title = event.target.elements.job_title.value;
        this.props.onAuth(username, email, password1, password2, firstname, lastname);
        event.preventDefault();
    }

    render() {
        console.log(this.props)
        return (
            <Form className="auth-signup-form" onSubmit={this.handleOnSubmit}>
                <h1>Signup</h1>
                <Form.Group as={Row} controlId="formHorizontalUsername">
                    <Col sm={12}>
                    <Form.Control type="text" placeholder="Username" name="username" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalFirstName">
                    <Col sm={12}>
                    <Form.Control type="text" placeholder="Your First Name" name="firstname" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalLastName">
                    <Col sm={12}>
                    <Form.Control type="text" placeholder="Your Last Name" name="lastname" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalJobTitle">
                    <Col sm={12}>
                    <Form.Control type="text" placeholder="Job title" name="job_title" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Col sm={12}>
                    <Form.Control type="email" placeholder="email" name="email" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalPassword1">
                    <Col sm={12}>
                    <Form.Control type="password" placeholder="password" name="password1" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalPassword2">
                    <Col sm={12}>
                    <Form.Control type="password" placeholder="Confirm password" name="password2" />
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit">Sign Up</Button>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2, firstname, lastname) => dispatch(actions.authSignup(username, email, password1, password2, firstname, lastname)),    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);