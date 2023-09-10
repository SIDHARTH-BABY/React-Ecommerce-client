import axios from "axios";


const API = axios.create({baseURL:"http://localhost:4000"})


export const createOrderRazorpay = (amount)=>API.post("/razorpay/createOrder",{amount})