import { AUTH, LOGOUT } from "../constants/actionTypes";
// import * as api from '../api/index.js';

export const auth = (result , token)=> {
    const action = {type : AUTH , payload :{result,token}};
    return action;
}
export const Logout = ()=> {
    const action = {type : LOGOUT};
    return action;
}

export const signin = (formData,history) => async(dispatch) => {
    try {
        // log in the user..

        history.push('/');
    } catch (error) {
        console.log(error);
    }
};
export const signup = (formData,history) => async(dispatch) => {
    try {
        // sign up the user..
        
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};