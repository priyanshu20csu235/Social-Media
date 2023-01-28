import axios from 'axios';

// const url = 'http://192.168.1.3:5000/posts';
const url = 'https://social-media-website-backend.onrender.com/posts';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url,newPost);
export const updatePost = (id,newPost) => axios.patch(`${url}/${id}`,newPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`)

//To fetch data from the above urls