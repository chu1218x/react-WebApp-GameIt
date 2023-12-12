import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as client from './client';
import * as likesClient from "../likes/client"
import * as followsClient from "../follows/client"
import { useState, useEffect } from 'react';
import GameCard from '../gamecard';

function UserDetails() {
    const [user, setUser] = useState(null);
    const [likedGames, setLikedGames] = useState([]);

    const { userId } = useParams();
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const [isFollowing, setIsFollowing] = useState(false); // 新增状态，用于跟踪是否已关注用户


    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log('loggedInUser', loggedInUser)
        setCurrentUser(loggedInUser);
        fetchUser();
    }, []);


    const canEdit = currentUser && user &&
        (currentUser._id === user._id || currentUser.role === 'ADMIN');

    const isAdmin = currentUser && currentUser.role === 'ADMIN';

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
    }, [userId]);

    const checkFollowStatus = async () => {
        if (currentUser && userId) {
            try {
                const followedUsers = await followsClient.findFollowedUsersByUser(currentUser._id);
                const isAlreadyFollowing = followedUsers.some(user => user._id === userId);
                setIsFollowing(isAlreadyFollowing);
            } catch (error) {
                console.error("Error checking follow status:", error);
                // 可以在这里处理错误，例如设置一个错误状态，或显示一个错误消息
            }
        }
    };


    const handleFollow = async () => {
        if (isFollowing) {
            await followsClient.userUnfollowsUser(currentUser._id, userId);
        } else {
            await followsClient.userFollowsUser(currentUser._id, userId);
        }
        setIsFollowing(!isFollowing); // 更新关注状态
    };

    useEffect(() => {
        // 检查当前用户是否已关注正在查看的用户
        checkFollowStatus();
        // 其他 useEffect 逻辑...
    }, [userId, currentUser]);



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
                    {currentUser && (
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

            {currentUser && userId !== currentUser._id && (
                <button onClick={handleFollow}>
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
            )}

            <div >
                <h2>Favorite Games</h2>
                <div className='game-card-container'>
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