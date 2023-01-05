import API from "./axios"


export const createComment=(postId,comment)=>API.post(`/comment/${postId}`,{comment});

export const getComment=(postId)=>API.get(`/comment/${postId}`)

export const deleteComment=(commentId)=>API.delete(`/comment/${commentId}`);