import axios from "axios";

export const login = async({ username, password}) => {
    return await axios.post("api/auth/login", {
        username: username,
        password: password
    }); 
};

export const register = async({ username, password, firstName, lastName}) => {
    return await axios.post("api/auth/signup", {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName
    }); 
};