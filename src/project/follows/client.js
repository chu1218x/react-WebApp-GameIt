import axios from "axios";

const client = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:4000/api/users",
});

export const userFollowsUser = async (follower, followed) => {
    const response = await client.post(`/${follower}/follows/${followed}`);
    return response.data;
}

export const userUnfollowsUser = async (follower, followed) => {
    const response = await client.delete(`/${follower}/follows/${followed}`);
    return response.data;
}

export const findFollowersOfUser = async (followed) => {
    const response = await client.get(`/${followed}/followers`);
    return response.data;
}

export const findFollowedUsersByUser = async (follower) => {
    const response = await client.get(`/${follower}/following`);
    return response.data;
}

