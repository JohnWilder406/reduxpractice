import axios from 'axios';

const API_URL = "http://localhost:8000/api/auth";

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};

const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
        username,
        password,
        })
        .then((res) => {
            if(res.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(res.data));
            }

            return res.data
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    login,
    logout,
};