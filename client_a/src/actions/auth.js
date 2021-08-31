import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    SET_MESSAGE,
} from "./types";

import authService from "../services/auth.service";

export const register = (username, email, password) => (dispatch) => {
    return authService.register(username, email, password).then(
        (res) => {
            dispatch({
                type: REGISTER_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: res.data.message,
            });

            return Promise.resolve();
        },
        (err) => {
            const message = 
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();
                
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
            
        }
    );
};

export const login = (username, password) => (dispatch) => {
    return authService.login(username, password).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {user: data},
            });

            return Promise.resolve();
        },
        (err) => {
            const message = 
                (err.response && err.response.data &&
                    err.response.data.message) ||
                    err.message ||
                    err.toString();
            
            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) => {
    authService.logout();

    dispatch({
        type: LOGOUT,
    });
};