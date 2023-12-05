import React from 'react';
import { useState,useEffect } from 'react';
import * as client from './client';

function GameList(){
    const [games, setGames] = useState([]);

    const fetchGames = async () => {
        const results = await client.findGames();
        setGames(results);
    };

    useEffect(() => {
        fetchGames();
    }, []);
    

    return (
        <div>
            <h1>GameList</h1>
            <div>
                {games.map(game => (
                    <div key={game.id}>
                        <h2>{game.name}</h2>
                        <img src={game.background_image} alt={game.name} />
                    </div>
                ))}
            </div>
            <pre>{JSON.stringify(games, null, 2)}</pre>
        </div>
    )
}

export default GameList;