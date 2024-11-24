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
export const fetchPosts = () => api.get<Post[]>('/posts');
export const fetchComments = (postId: number) => api.get<Comment[]>(`/posts/${postId}/comments`);
export const createPost = (post: Omit<Post, 'id'>) => api.post<Post>(`/posts`, post);

// const xPost: Omit<Post, 'id'> = {title: "", body: "", userId: 0};