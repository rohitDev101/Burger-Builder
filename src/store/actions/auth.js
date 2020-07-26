import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: localId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogOut());
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        //...auth
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCppZmoLd3eaqdIUicxt4VsQILEU-JcGYo';
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCppZmoLd3eaqdIUicxt4VsQILEU-JcGYo';
        }
        axios.post(url, authData)
        .then(response => {
            const expirationDate = new Date(new Date().getTime()+response.data.expiresIn*1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkTimeOut(response.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const autoLoginCheck = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(authLogOut());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(authLogOut());
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                const expirationTime = (expirationDate.getTime() - new Date().getTime())/1000;
                dispatch(checkTimeOut(expirationTime));
            }
        }
    }
}