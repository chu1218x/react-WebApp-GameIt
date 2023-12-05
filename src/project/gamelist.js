import React from 'react';
import { useState, useEffect } from 'react';
import * as client from './client';

function GameList() {
    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(5);


    const fetchGames = async () => {
        const results = await client.findGames(currentPage, gamesPerPage);
        setGames(results);
    };

    useEffect(() => {
        fetchGames();
    }, [currentPage]);


    return (
        <div>
            <h1>Game List</h1>
            <div>
                {games.map(game => (
                    <div key={game.id}>
                        <h2>{game.name}</h2>
                        <img src={game.background_image} alt={game.name} />
                    </div>
                ))}
            </div>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </button>
            <button onClick={() => setCurrentPage(currentPage + 1)}>
                Next
            </button>
        </div>
    )
}

export default GameList;