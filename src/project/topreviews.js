import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './stylelist/topreviews.css'

function TopReviews() {
    const [topReviews, setTopReviews] = useState([]);

    const processAndSortReviews = (testers) => {
        const reviews = testers.flatMap(tester => tester.reviews);
        return reviews.sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate));
    };

    const fetchTopReviews = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/testers');
            const sortedReviews = processAndSortReviews(response.data);
            console.log('response.data', response.data)
            setTopReviews(sortedReviews);
        } catch (error) {
            console.error("Error fetching top reviews:", error);
        }
    };

    useEffect(() => {
        fetchTopReviews();
    }, []);


    return (
        <div>
            <h1>All Reviews</h1>
            <ul className="user-reviews-list">
                {topReviews.map((review, index) => (
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
        </div>
    );
}

export default TopReviews;
