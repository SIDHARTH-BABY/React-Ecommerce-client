import axios from "axios";

const API = axios.create({baseURL:"http://localhost:4000"})

export const addProductCart =(prodId,userId)=>API.post("/cart/addToCart",{prodId,userId})