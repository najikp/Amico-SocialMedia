import API from "./axios";


export const blockUser=(id)=>API.put(`/admin/block/${id}`);
export const activateUser=(id)=>API.put(`/admin/activate/${id}`);
export const getAllPosts=()=>API.get('/admin/posts');
export const removePost=(id)=>API.delete(`/admin/remove/${id}`);