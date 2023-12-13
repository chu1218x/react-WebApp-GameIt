import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as client from './client';
import * as likesClient from "../likes/client"
import { useState, useEffect } from 'react';
import GameCard from '../gamecard';
import axios from 'axios';

function UserDetails() {
    const [user, setUser] = useState(null);
    const [likedGames, setLikedGames] = useState([]);

    const { userId } = useParams();
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const [userReviews, setUserReviews] = useState([]);

    const fetchUserReviews = async () => {
        try {
            const response = await axios.get
                (`https://game-it-0dzm.onrender.com/api/testers/reviews/user/${userId}`);
            setUserReviews(response.data);
        } catch (error) {
            console.error("Error fetching user reviews:", error);
        }
    };

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log('loggedInUser', loggedInUser)
        setCurrentUser(loggedInUser);
        fetchUser();
    }, []);


    const canEdit = currentUser && user &&
        (currentUser._id === user._id || currentUser.role === 'ADMIN');

    const isAdmin = user && user.role === 'ADMIN';

    const fetchUser = async () => {
        const user = await client.findUserById(userId);
        setUser(user);
    };

    const updateUser = async () => {
        const status = await client.updateUser(userId, user);
        setEditMode(false);

    }

    const deleteUser = async (userId) => {
        const status = await client.deleteUser(userId);
        navigate('/project/users');
    }

    const signout = async () => {
        const status = await client.signOut();
        localStorage.removeItem('currentUser');
        window.dispatchEvent(new Event('loginStatusChanged'));

        setCurrentUser(null);
        navigate('/project');
    }

    const fetchLikedGames = async () => {
        const games = await likesClient.findMoviesLikedByUser(userId);
        console.log("Fetched liked games:", games);
        setLikedGames(games);
    };


    useEffect(() => {
        fetchUser();
        fetchLikedGames();
        fetchUserReviews();
    }, [userId]);


    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <h1>Details</h1>
            {user && (
                <div>
                    <p>User Name: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                    <p>First Name: {editMode ? (
                        <input
                            type='text'
                            className='form-control'
                            value={user.firstName}
                            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                        />
                    ) : (
                        <span>{user.firstName}</span>
                    )}</p>
                    <p>Last Name: {editMode ? (
                        <input
                            type='text'
                            className='form-control'
                            value={user.lastName}
                            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                        />
                    ) : (
                        <span>{user.lastName}</span>
                    )}</p>

                    {canEdit && !editMode && (
                        <button onClick={() => setEditMode(true)} className='btn btn-primary'>Edit</button>
                    )}
                    {currentUser && user && currentUser._id === user._id && (
                        <button onClick={signout} className="btn btn-secondary">
                            Sign Out
                        </button>
                    )}


                    {editMode && (
                        <div>
                            <button onClick={updateUser} className='btn btn-primary'>Update</button>
                            <button onClick={() => setEditMode(false)} className='btn btn-secondary'>Cancel</button>
                            <button onClick={() => deleteUser(user._id)} className='btn btn-danger'>Delete</button>
                        </div>
                    )}
                    {isAdmin && (
                        <Link to="/project/users" className="btn btn-warning">Users</Link>
                    )}
                </div>
            )}
            <br />

            {user && user.role === 'TESTER' && (
                <div>
                    <h2>Reviewed Games:</h2>
                    <ul>
                        {userReviews.map((review, index) => (
                            <li key={index}>
                                <Link to={`/project/details/${review.gameId}`}>
                                    {review.gameName}
                                </Link> - {review.text}
                            </li>
                        ))}
                    </ul>
                </div>
            )}




            <div >
                <h2>Favorite Games</h2>
                <div className='game-card-container' style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {likedGames.length > 0 ? (
                        likedGames.map(game => (
                            <GameCard key={game._id} game={{
                                id: game.gameId,
                                name: game.gameTitle,
                                background_image: game.backgroundImage,
                                released: game.releaseDate,
                                genres: game.genres
                            }} />
                        ))
                    ) : (
                        <p>No favorite games found.</p>
                    )}
                </div>
            </div>

        </div>
    );
}
export default UserDetails;