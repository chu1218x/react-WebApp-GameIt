import React from 'react';
import { useParams } from 'react-router-dom';
import * as client from './client';
import { useState, useEffect } from 'react';

function UserDetails() {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const fetchUser = async () => {
        const user = await client.findUserById(userId);
        setUser(user);
    };

    useEffect(() => {
        fetchUser();
    }, []);



    return (
        <div>
            <h1>User Details</h1>
            {user && (
                <div>
                    <p>UserName:{user.username}</p>
                    <p>Email:{user.email}</p>
                    <p>First Name: {user.firstName}</p>
                    <p>Last Name: {user.lastName}</p>
                </div>
            )}
        </div>
    )
}

export default UserDetails;