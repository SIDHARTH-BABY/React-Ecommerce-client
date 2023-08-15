import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });



export const addProduct = (prodDetails) => API.post("/seller/add-products",{prodDetails})

export const addImage = (image,cloudName) => axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`,image)

    