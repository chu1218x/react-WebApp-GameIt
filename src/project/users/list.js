import * as client from './client';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        const results = await client.findAllUsers();
        setUsers(results);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>User List</h1>
            <div className="list-group">
                {users.map((user) => (
                    <Link key={user._id}
                        to={`/project/user/${user._id}`}
                        className="list-group-item">
                        {user.username}
                    </Link>
                ))}
            </div>
        </div>

    );
}

export default UserList;