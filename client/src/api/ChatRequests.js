import API from "./axios";


export const createChat=(data)=>API.post('/chat',data);
export const userChats=(id)=>API.get(`/chat/${id}`)
