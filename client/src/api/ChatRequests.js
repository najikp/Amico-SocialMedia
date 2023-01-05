import API from "./axios";

export const userChats=(id)=>API.get(`/chat/${id}`)