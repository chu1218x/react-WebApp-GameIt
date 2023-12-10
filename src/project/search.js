import React, { useEffect, useState } from "react";
import * as client from "./client";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../project/stylelist/gamelist.css";

function Search() {
    const { search } = useParams();
    const [searchTerm, setSearchTerm] = useState(search);
    const [results, setResults] = useState(null);
    const [gamesPerPage] = useState(10);
    const navigate = useNavigate();

    const performSearch = async (searchTerm) => {
        const results = await client.searchGames(searchTerm, gamesPerPage);
        setResults(results);
        setSearchTerm(searchTerm);
        navigate(`/search/${searchTerm}`);
    }

    useEffect(() => {
        if (search) {
            performSearch(search);
        }
    }, [search]);

    const handleSearch = (e) => {
        e.preventDefault();
        performSearch(searchTerm);
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
            </form>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '100px' }}>
                {results && results.map((game) => (
                    <Link to={`/details/${game.id}`} key={game.id} className="game-card-link" style={{ textDecoration: 'none' }}>
                        <div className="game-card">
                            <img src={game.background_image || "path_to_default_image.png"} alt={game.name} />
                            <div className="game-card-title">
                                <h2>{game.name}</h2>
                            </div>
                            <div className="game-card-info">
                                {/* Additional information to show on hover */}
                                <p>Released: {game.released}</p>
                                <p>Genres: {game.genres ? game.genres.map(genre => genre.name).join(', ') : 'N/A'}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Search;
