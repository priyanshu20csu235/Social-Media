import * as api from '../api';

// Action Creators
// async (dispatch) -> Redux Thunk since it will take time 
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        const action = { type: 'FETCH_ALL', payload: data }
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (postData) => async (dispatch) => {
    try {
        const { data } = await api.createPost(postData);
        const action = { type: 'CREATE', payload: data }
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (id, postData) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, postData);
        const action = { type: "UPDATE", payload: data };
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        const action = {type : "DELETE",payload:id};
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}

export const likePost = (postData) => async(dispatch) => {
    try {
        var likes=postData.likeCount;
        const {data} = await api.updatePost(postData._id,{likeCount:likes+1});
        const action = {type : "LIKE",payload: data};
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}