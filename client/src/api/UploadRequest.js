import API from "./axios"


export const uploadImage = (data) => API.post("/upload", data);

export const uploadPost = (data) => API.post("/posts", data);

export const uploadVideo = (data) => API.post('/upload/video', data)

