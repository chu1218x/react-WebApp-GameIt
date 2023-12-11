import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as client from './client';
import { useState, useEffect } from 'react';

function UserDetails() {
    const [user, setUser] = useState(null);
    console.log('user', user)
    const { userId } = useParams();
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(null);
    const [editMode, setEditMode] = useState(false);


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

    useEffect(() => {
        fetchUser();
    }, [userId]);


    return (
        <div>
            <h1>Details</h1>
            {user && <div>
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
            </div>}
        </div>
    );
}
export default UserDetails;