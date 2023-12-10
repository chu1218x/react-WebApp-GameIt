import axios from "axios";

// const request = axios.create({
//     withCredentials: true,
// });

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:3000";
const USERS_API = `${API_BASE}/users`;

export const findAllUsers = async () => {
    const response = await axios.get(USERS_API);
    return response.data;
}

export const findUserById = async (userId) => {
    const response = await axios.get(`${USERS_API}/${userId}`);
    return response.data;
}



export const signIn = async (credentials) => {
    const response = await axios.post(`${API_BASE}/api/signin`, credentials);
    return response.data;
}