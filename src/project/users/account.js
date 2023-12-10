import * as client from './client';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Account() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const fetchUser = async () => {
        try {
            const user = await client.account();
            setUser(user);
        }
        catch (error) {
            navigate('/project/signin');
        }
    };

    const updateUser = async () => {
        const status = await client.updateUser(user._id, user);
    };

    const signout = async () => {
        const status = await client.signOut();
        navigate('/project/signin');

    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <h1>Account</h1>
            {user && (
                <div>
                    <p>User Name : {user.username}</p>
                    <p>Email :
                        <input
                            type='email'
                            className='form-control'
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </p>
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
                    <p>Role:{user.role}</p>
                    <button onClick={updateUser} className='btn btn-primary'>Update</button>
                    <button onClick={signout} className='btn btn-danger'>Sign Out</button>
                    {user.role === 'ADMIN' && (
                        <Link to={`/project/users`} className='btn btn-warning'>Users</Link>
                    )}
                </div>
            )}
        </div>
    )
}

export default Account;

