import API from "./axios"


export const getUser=(userId)=>API.get(`/user/${userId}`);

export const getUserDetails = (id) => API.get(`/user/${id}`);

export const getAllUser=()=>API.get('/user');

export const followUser=(id,data)=>API.put(`/user/${id}/follow`,data);

export const unFollowUser=(id,data)=>API.put(`/user/${id}/unfollow`,data);

export const updateUser=(id,formData)=>API.put(`/user/${id}`,formData);

export const clearNotification=(id)=>API.patch(`/user/${id}`);
