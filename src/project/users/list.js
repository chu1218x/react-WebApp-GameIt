import * as client from './client';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const fetchUser = async () => {
        const user = await client.account();
        setCurrentUser(user);
    }
    const fetchUsers = async () => {
        const results = await client.findAllUsers();
        setUsers(results);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        fetchUsers();
    }, []);


    return (
        <div>
            {currentUser && currentUser.role === 'ADMIN' && (
                <>
                    <h1>User List</h1>
                    <div className="list-group">
                        {users.map((user) => (
                            <Link key={user._id}
                                to={`/project/users/${user._id}`}
                                className="list-group-item">
                                {user.username}
                            </Link>
                        ))}
                    </div>
                </>
            )}
            {currentUser && currentUser.role !== 'ADMIN' && (
                <div>
                    <h2>Access Denied</h2>
                    <h2>Admin Only</h2>
                </div>
            )}
        </div>

    );
}

export default UserList;