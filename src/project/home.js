import React from 'react';
import { useState, useEffect } from 'react';
import * as client from './client';
import { useNavigate, Link } from 'react-router-dom';
import "../project/stylelist/gamelist.css";
import axios from 'axios';

function Home() {
    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [topReviews, setTopReviews] = useState([]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        setIsLoggedIn(!!currentUser);

        if (currentUser) {
            fetchTopReviews();
        }
    }, [currentPage]);


    const processAndSortReviews = (testers) => {
        const reviews = testers.flatMap(tester => tester.reviews);
        return reviews.sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate));
    };

    const fetchTopReviews = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/testers');
            const sortedReviews = processAndSortReviews(response.data);
            setTopReviews(sortedReviews);
        } catch (error) {
            console.error("Error fetching top reviews:", error);
        }
    };
    const loadLatestGames = async () => {
        try {
            // Use currentPage and gamesPerPage for fetching games
            const latestGames = await client.fetchLatestGames(currentPage, gamesPerPage);
            setGames(latestGames);
        } catch (error) {
            console.error("Failed to load latest games", error);
        }
    };


    useEffect(() => {
        loadLatestGames();
        fetchTopReviews();
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

            <h2>Top Rating Games</h2>

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
                    className="btn btn-success me-2"
                >
                    Previous
                </button>
                <span>Page {currentPage}</span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="btn btn-success"
                >
                    Next
                </button>
            </div>

            <hr />


            <div className="user-reviews">
                <h2>Top reviews</h2>
                {isLoggedIn ? (
                    <>
                        <ul className="user-reviews-list">
                            {topReviews.slice(0, 3).map((review, index) => (
                                <li key={index}>
                                    <Link to={`/project/users/${review.userId}`} className="review-username">
                                        {review.username}
                                    </Link>
                                    &nbsp;reviewed&nbsp;
                                    <Link to={`/project/details/${review.gameId}`} className="review-game-name">
                                        {review.gameName}
                                    </Link>
                                    :&nbsp;
                                    <span className="review-text">
                                        "{review.text}"
                                    </span>
                                    <br />
                                    <span className="review-date">
                                        {new Date(review.reviewDate).toLocaleString()}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <div className="see-more">
                            <Link to="/project/topreviews">See more</Link>
                        </div>
                    </>
                ) : (
                    <p>You need to be <Link to="/project/signin" style={{ textDecoration: 'underline' }}>logged in</Link> to view the top reviews.</p>
                )}
                <hr />
            </ div>

        </div>
    );

}

export default Home;
