import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as client from './client';
import "../project/stylelist/gamedetail.css";
import Carousel from './carousel';
import * as userClient from './users/client';
import * as likesClient from './likes/client';


function Details() {
    const { gameId } = useParams();
    const [gameDetails, setGameDetails] = useState(null);
    const [gameMovies, setGameMovies] = useState([]);ß
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [gameScreenshots, setGameScreenshots] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [movie, setMovie] = useState(null);
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    const fetchGameScreenshots = async (slug) => {
        const screenshots = await client.getGameScreenshots(slug);
        setGameScreenshots(screenshots.results);
    }

    const fetchUser = async () => {
        try {
            const user = await userClient.account();
            setCurrentUser(user);
        } catch (error) {
            setCurrentUser(null);
        }
    }

    const getMovie = async () => {
        const movie = await likesClient.findUsersThatLikeMovie(gameId);
        setMovie(movie);
    }

    const fetchData = async (gameId) => {
        const details = await client.getGameDetails(gameId);
        setGameDetails(details);

        const movies = await client.getGameMovies(gameId);
        setGameMovies(movies.results.length > 0 ? [movies.results[0]] : []);

        if (details) {
            await fetchGameScreenshots(details.slug);
        }
        await fetchLikes();
    };

    const checkIfUserLikedGame = async () => {
        const userLikes = await likesClient.findUsersThatLikeMovie(gameId);
        const userLikedGame = userLikes.filter((like) => like.user._id === currentUser._id);
        if (userLikedGame.length > 0) {
            setHasLiked(true);
        } else {
            setHasLiked(false);
        }

    };

    const handleLikeClick = async () => {
        if (hasLiked) {
            // Logic to remove like
            try {
                await likesClient.deleteUserLikesMovie(currentUser._id, gameId);
                setHasLiked(false);
            } catch (error) {
                console.error("Error removing like", error);
            }
        } else {
            // Logic to add like
            try {
                await likesClient.createUserLikesMovie(currentUser._id, gameId);
                setHasLiked(true);
            } catch (error) {
                console.error("Error adding like", error);
            }
        }
        await fetchLikes();
    };



    const fetchLikes = async () => {
        const newLikes = await likesClient.findUsersThatLikeMovie(gameId);
        const uniqueLikes = newLikes.filter((like, index, self) =>
            index === self.findIndex((t) => t.user._id === like.user._id)
        );
        setLikes(uniqueLikes);
    };

    useEffect(() => {
        fetchData(gameId);
        getMovie();
        fetchUser();
    }, [gameId]); // 仅当 gameId 改变时触发

    useEffect(() => {
        if (currentUser) {
            checkIfUserLikedGame();
        }
    }, [currentUser]); // 仅当 currentUser 改变时触发


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
                        {currentUser && (
                            <button
                                className={`btn float-end ${hasLiked ? 'btn-warning' : 'btn-success'}`}
                                onClick={handleLikeClick}>
                                {hasLiked ? 'Liked' : 'Like'}
                            </button>

                        )}
                        <br />
                        <h3>Description</h3>
                        <div>
                            {showFullDescription ? (
                                <div dangerouslySetInnerHTML={{ __html: gameDetails.description }} />
                            ) : (
                                <div dangerouslySetInnerHTML={{ __html: gameDetails.description.slice(0, 200) + '...' }} />
                            )}
                            <button className='btn btn-success'
                            onClick={() => setShowFullDescription(!showFullDescription)}>
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
                        <br />
                        <h2>likes By:</h2>
                        <ul className="list-group">
                            {likes.map((like, index) => (
                                <li key={index} className="list-group-item"  >
                                    <Link to={`/project/users/${like.user._id}`} >
                                        <p> {like.user.username} </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                    </div>



                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

}
export default Details;