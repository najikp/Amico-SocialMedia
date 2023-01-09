import API from "./axios"

export const logIn = (FormData) => API.post('/auth/login',FormData)
export const signUp = (FormData) => API.post('/auth/register',FormData);
export const sendOtp=(data)=>API.post('/auth/send-otp',data);
export const forgotOtp=(data)=>API.post('/auth/otp-send',data)
export const forgotPassword=(FormData)=>API.put('/auth/forgot-pass',FormData);


//admin

export const adminLogin=(FormData)=>API.post('/auth-admin/login',FormData);