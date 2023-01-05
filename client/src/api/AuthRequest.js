import API from "./axios"

export const logIn = (FormData) => API.post('/auth/login',FormData)
export const signUp = (FormData) => API.post('/auth/register',FormData)