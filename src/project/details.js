import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as client from './client';
import "../project/stylelist/gamedetail.css";
import Carousel from './carousel';


function Details() {
    const { gameId } = useParams();
    const [gameDetails, setGameDetails] = useState(null);
    const [gameMovies, setGameMovies] = useState([]);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [gameScreenshots, setGameScreenshots] = useState([]);

    const fetchGameScreenshots = async (slug) => {
        const screenshots = await client.getGameScreenshots(slug);
        setGameScreenshots(screenshots.results);
    }

    useEffect(() => {
        async function fetchData() {
            const details = await client.getGameDetails(gameId);
            setGameDetails(details);

            const movies = await client.getGameMovies(gameId);
            if (movies.results.length > 0) {
                setGameMovies([movies.results[0]]);
            } else {
                setGameMovies([]);
            }

            if (details) {
                await fetchGameScreenshots(details.slug);
            }
        }

        fetchData();
    }, [gameId]);


    return (
        <div className="detailsContainer">
            {gameDetails ? (
                <>
                    <div className="leftColumn">
                        {gameMovies.length > 0 ? (
                            <video className="videoPlayer" controls autoPlay muted>
                                <source src={gameMovies[0].data.max} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img
                                src={gameDetails.background_image}
                                alt={`${gameDetails.name} Background`}
                                className="gameBackgroundImage"
                            />
                        )}
                        <h2>{gameDetails.name}</h2>

                        <button>add to myGame</button>
                        <br />
                        <h3>Description</h3>
                        <div>
                            {showFullDescription ? (
                                <div dangerouslySetInnerHTML={{ __html: gameDetails.description }} />
                            ) : (
                                <div dangerouslySetInnerHTML={{ __html: gameDetails.description.slice(0, 200) + '...' }} />
                            )}
                            <button onClick={() => setShowFullDescription(!showFullDescription)}>
                                {showFullDescription ? 'Read Less' : 'Read More'}
                            </button>
                        </div>
                        <br />
                        <p>Released: {gameDetails.released}</p>
                        <p>Ratings: {gameDetails.ratings.map(rating => rating.title).join(', ')}</p>
                        <p>Platforms: {gameDetails.platforms.map(platform => platform.platform.name).join(', ')}</p>
                        <p>Developers: {gameDetails.developers.map(developer => developer.name).join(', ')}</p>
                        <p>Genres: {gameDetails.genres.map(genre => genre.name).join(', ')}</p>
                        <p>Tags: {gameDetails.tags.map(tag => tag.name).join(', ')}</p>
                        <p>Publishers: {gameDetails.publishers.map(publisher => publisher.name).join(', ')}</p>

                    </div>

                    <div className="rightColumn">
                        <div className="gameScreenshots">
                            {gameScreenshots.length > 0 && (
                                <Carousel screenshots={gameScreenshots} />
                            )}
                        </div>

                    </div>


                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

}
export default Details;