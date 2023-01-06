import API from "./axios"

export const logIn = (FormData) => API.post('/auth/login',FormData)
export const signUp = (FormData) => API.post('/auth/register',FormData);
export const sendOtp=(data)=>API.post('/auth/send-otp',data)