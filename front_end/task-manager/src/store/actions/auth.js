import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    // localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return{
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeout = expirationDate => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout()); // once 1 hour expires, the user is logged out
        }, expirationDate * 1000)
    };
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post("http://localhost:8000/rest-auth/login/", {
            username: username,
            password: password
        })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
            localStorage.setItem('token', token); // since setState doesn't store the variable after the page is reloaded, it should be stored in localStorage
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600)); // session time is 1 hour
        })
        .catch(error => {
            const errors = {
                msg: error.response.data,
                status: error.response.status
            }
            dispatch(authFail(errors));
        })
    }
}

export const authSignup = (username, email, password1, password2, firstname, lastname) => {
    return dispatch => {
        dispatch(authStart());
        axios.post("http://localhost:8000/rest-auth/registration/", {
            username: username,
            email: email,
            password1: password1,
            password2: password2,
            first_name: firstname,
            last_name: lastname,
        })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
            localStorage.setItem('token', token); // since setState doesn't store the variable after the page is reloaded, it should be stored in localStorage
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600)); // session time is 1 hour
        })
        .catch(error => {
            const errors = {
                msg: error.response.data,
                status: error.response.status
            }
            dispatch(authFail(errors));
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(token === undefined){
            dispatch(logout())
        } else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate <= new Date()){
                dispatch(logout());
            }else{
                dispatch(authSuccess(token))
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}