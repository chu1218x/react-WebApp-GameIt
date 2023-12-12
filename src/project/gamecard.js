// GameCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
    const formatGenres = (genres) => {
        return genres.join(', ');
    };
    
    return (
        <Link to={`/project/details/${game.id}`} className="game-card-link">
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
    );
};

export default GameCard;
