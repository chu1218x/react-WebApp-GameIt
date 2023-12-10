import axios from "axios";

export const RAWG_API = "https://api.rawg.io/api"
export const API_KEY = process.env.REACT_APP_RAWG_API_KEY;

export const findGames = async (page, pageSize) => {
    const response = await axios.get
        (`${RAWG_API}/games?key=${API_KEY}&page=${page}&page_size=${pageSize}`);
    return response.data.results;
};

export const searchGames = async (searchTerm) => {
    const response = await axios.get(`${RAWG_API}/games?key=${API_KEY}&search=${searchTerm}`);
    return response.data.results; 
};


export const getGameDetails = async (gameId) => {
    const response = await axios.get(`${RAWG_API}/games/${gameId}?key=${API_KEY}`);
    return response.data;
};

export const getGameMovies = async (gameId) => {
    const response = await axios.get(`${RAWG_API}/games/${gameId}/movies?key=${API_KEY}`);
    return response.data;
}

export const getGameScreenshots = async (slug) => {
    const response = await axios.get(`${RAWG_API}/games/${slug}/screenshots?key=${API_KEY}`);
    return response.data;
}
