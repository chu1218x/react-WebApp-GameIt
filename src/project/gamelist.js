import React from 'react';
import { useState, useEffect } from 'react';
import * as client from './client';
import { useNavigate, Link } from 'react-router-dom';
import "../project/stylelist/gamelist.css";

function GameList() {
    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(30);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();


    const fetchGames = async () => {
        const results = await client.findGames(currentPage, gamesPerPage);
        setGames(results);
    };

    useEffect(() => {
        fetchGames();
    },
        [currentPage]);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/project/search/${searchTerm}`);
    };

    const formatGenres = (genres) => {
        return genres.map(genre => genre.name).join(', ');
    };



    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search games..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
            <br />
            <h2>All Games</h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '50px', marginTop: "30px" }}>
                {games.map(game => (
                    <Link to={`/project/details/${game.id}`} key={game.id} className="game-card-link">
                        <div className="game-card">
                            <img src={game.background_image || "path_to_default_image.png"} alt={game.name} />
                            <div className="game-card-title">
                                <h2>{game.name}</h2>
                            </div>
                            <div className="game-card-info">
                                <p>Released: {game.released}</p>
                                <p>Genres: {formatGenres(game.genres)}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>


            <div style={{ textAlign: 'center' }}>
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-primary me-2"
                >
                    Previous
                </button>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="btn btn-primary"
                >
                    Next
                </button>
            </div>
        </div>
    );

}

export default GameList;
