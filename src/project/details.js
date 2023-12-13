import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as client from './client';
import "../project/stylelist/gamedetail.css";
import Carousel from './carousel';
import * as likesClient from './likes/client';
import axios from 'axios';


function Details() {
    const { gameId } = useParams();
    console.log('gameId:', gameId);
    const [gameDetails, setGameDetails] = useState(null);
    const [gameMovies, setGameMovies] = useState([]);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [gameScreenshots, setGameScreenshots] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [, setMovie] = useState(null);
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const [showSignInPrompt, setShowSignInPrompt] = useState(false);

    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState("");


    const fetchReviews = async () => {
        try {
            const response = await axios.get
                (`http://localhost:4000/api/testers/reviews/${gameId}`);
            setReviews(response.data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [gameId]);


    const handleReviewClick = () => {
        setShowReviewForm(true);
    };

    const handleSubmitReview = async () => {
        if (!reviewText.trim()) {
            alert("Please enter a review.");
            return;
        }

        const reviewData = {
            userId: currentUser._id,
            gameId: gameDetails.id,
            gameName: gameDetails.name,
            text: reviewText
        };
        try {
            const response = await axios.post
                ('http://localhost:4000/api/testers/review', reviewData);

            if (response.data) {
                const newReview = {
                    ...response.data,
                    username: currentUser.username,
                    reviewDate: new Date().toISOString()
                };
                console.log('response.data:', response.data);
                setReviews(prevReviews => [...prevReviews, newReview]);
            }

            setReviewText("");
            setShowReviewForm(false);
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Error submitting review.");
        }
    };





    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);



    const fetchGameScreenshots = async (slug) => {
        const screenshots = await client.getGameScreenshots(slug);
        setGameScreenshots(screenshots.results);
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
        if (!currentUser) {
            setShowSignInPrompt(true);
            setTimeout(() => setShowSignInPrompt(false), 3000);
            return;
        }

        const gameData = {
            gameId: gameDetails.id,
            gameTitle: gameDetails.name,
            releaseDate: gameDetails.released,
            backgroundImage: gameDetails.background_image,
            genres: gameDetails.genres.map(g => g.name).join(', ')
        };

        try {
            if (hasLiked) {
                await likesClient.deleteUserLikesMovie(currentUser._id, gameDetails.id);
                setHasLiked(false);
            } else {
                await likesClient.createUserLikesMovie(currentUser._id, gameData);
                setHasLiked(true);
            }
        } catch (error) {
            console.error("Error in like/unlike action", error);
        } finally {
            await fetchLikes();
        }
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

    }, [gameId]);

    useEffect(() => {
        if (currentUser) {
            checkIfUserLikedGame();
        }
    }, [currentUser]);


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
                        <button
                            className={`btn float-end ${hasLiked ? 'btn-warning' : 'btn-success'}`}
                            onClick={handleLikeClick}>
                            {hasLiked ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                        {showSignInPrompt && <p className="text-danger">This Action Requires Sign In First</p>}

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
                        <p>Rating: {gameDetails.rating}</p>
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
                        <div className='likes-container'>
                            <h2>Likes By:</h2>
                            <div>
                                {likes.map((like, index) => (
                                    <div key={index} className="user-info">
                                        <Link to={`/project/users/${like.user._id}`}>
                                            <p className="user-name">{like.user.username}</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="reviews-container">
                            <h2>Reviews</h2>
                            {reviews.length > 0 ? (
                                <div>
                                    {reviews.map((review, index) => (
                                        <div key={index} className="user-info">
                                            <div>
                                                <strong>
                                                    <Link to={`/project/users/${review.userId}`}>
                                                        {review.username}
                                                    </Link>
                                                </strong> {''}
                                                reviewed on {new Date(review.reviewDate).toLocaleDateString()}
                                                <p>{review.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No reviews yet.</p>
                            )}
                        </div>

                        <div className='add-review'>
                            {currentUser && currentUser.role === 'TESTER' && (
                                <button className="btn btn-primary" onClick={handleReviewClick}>
                                    Add Review
                                </button>
                            )}
                            {showReviewForm && (
                                <div className="review-form">
                                    <h3>Add a Review</h3>
                                    <textarea
                                        placeholder="Write your review here..."
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                    />
                                    <button className="btn btn-success"
                                        onClick={handleSubmitReview}>Submit Review</button>
                                    <button className="btn btn-secondary"
                                        onClick={() => setShowReviewForm(false)}>Cancel</button>
                                </div>
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