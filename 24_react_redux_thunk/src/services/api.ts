import axios  from "axios";
import { Post, Comment } from "../types/types";

// const api = axios.create({
//     baseURL: "https://jsonplaceholder.typicode.com"
// });

// export const fetchPosts = () => axios.get('https://jsonplaceholder.typicode.com/posts')

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});
// varable, parmeter 
export const fetchPosts = () => api.get<Post[]>('/abcposts');
export const fetchComments = (postId: number) => api.get<Comment[]>(`/posts/${postId}/comments`);
export const createPost = (post: Post) => api.get<Comment[]>(`/posts`);