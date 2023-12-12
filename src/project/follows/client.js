import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";
const USERS_API = `${API_BASE}/api/users`;

export const userFollowsUser = async (follower, followee) => {
    const response = await axios.post(`${USERS_API}/${follower}/follows/${followee}`);
    return response.data;
}

export const userUnfollowsUser = async (follower, followee) => {
    const response = await axios.delete(`${USERS_API}/${follower}/follows/${followee}`);
    return response.data;
}

export const findFollowersOfUser = async (followee) => {
    const response = await axios.get(`${USERS_API}/${followee}/follower`);
    return response.data;
}

export const findFolloweeOfUser = async (follower) => {
    const response = await axios.get(`${USERS_API}/${follower}/followee`);
    return response.data;
}
