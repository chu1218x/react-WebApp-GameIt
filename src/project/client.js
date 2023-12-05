import axios from "axios";

export const RAWG_API = "https://api.rawg.io/api"
export const API_KEY = process.env.REACT_APP_RAWG_API_KEY;

export const findGames = async () => {
    const response = await axios.get(`${RAWG_API}/games?key=${API_KEY}`)
    return response.data.results;
};