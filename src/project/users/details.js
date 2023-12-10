import React from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import * as client from './client';
import { useState, useEffect } from 'react';

function UserDetails() {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const navigate = useNavigate();

    const fetchUser = async () => {
        const user = await client.findUserById(userId);
        setUser(user);
    };

    const updateUser = async () => {
        const status = await client.updateUser(userId, user);

    }

    const deleteUser = async (userId) => {
        const status = await client.deleteUser(userId);
        navigate('/project/users');
    }

    useEffect(() => {
        fetchUser();
    }, []);


    return (
        <div>
            <h1>Details</h1>
            {user && <div>
                <p>User Name : {user.username}</p>
                <p>Email : {user.email}</p>
                <p>Role : {user.role}</p>
                <p>First Name :
                    <input
                        type='text'
                        className='form-control'
                        value={user.firstName}
                        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                    />
                </p>
                <p>Last Name :
                    <input
                        type='text'
                        className='form-control'
                        value={user.lastName}
                        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    />
                </p>
                <button onClick={updateUser} className='btn btn-primary'>Update</button>
                <button onClick={() => deleteUser(user._id)} className='btn btn-danger'>Delete</button>

            </div>}

        </div>
    )
}

export default UserDetails;