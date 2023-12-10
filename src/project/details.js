import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as client from './client';

function Details() {
    const { gameId } = useParams();
    const [gameDetails, setGameDetails] = useState(null);

    useEffect(() => {
        const fetchGameDetails = async () => {
            const details = await client.getGameDetails(gameId);
            setGameDetails(details);
        };

        fetchGameDetails();
    }, [gameId]); 
    return (
        <div>
            {gameDetails ? (
                <div>
                    <h2>{gameDetails.name}</h2>
                    <img src={gameDetails.background_image}
                        alt={gameDetails.name}
                        style={{ width: "500px" }}

                    />
                    <p>Released: {gameDetails.released}</p>

                    <p>Ratings: {gameDetails.ratings.map(rating => rating.title).join(', ')
                    }</p>
                    <p>Platforms: {
                        gameDetails.platforms.map(platform => platform.platform.name).join(', ')
                    }</p>
                    <p>Developers: {
                        gameDetails.developers.map(developer => developer.name).join(', ')
                    }</p>
                    <p>Genres: {
                        gameDetails.genres.map(genre => genre.name).join(', ')
                    }</p>
                    <p>Tags: {
                        gameDetails.tags.map(tag => tag.name).join(', ')
                    }</p>
                    <p>Publishers: {
                        gameDetails.publishers.map(publisher => publisher.name).join(', ')
                    }</p>
                    <h3>Description</h3>
                    <div dangerouslySetInnerHTML={{ __html: gameDetails.description }}></div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Details;