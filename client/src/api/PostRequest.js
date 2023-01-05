import API from "./axios"


export const getTimelinePosts = (id) => API.get(`/posts/${id}/timeline`);
export const likePost = (id, userId) =>
  API.put(`/posts/${id}/like`, { userId: userId });
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const updatePost=(id, desc)=>API.put(`/posts/${id}`,{desc:desc})

export const reportPost=(id,data)=>API.put(`/posts/${id}/report`,data)