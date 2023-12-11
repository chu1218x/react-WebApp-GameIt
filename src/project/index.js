import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Nav from './nav';
import Signup from './users/signup';
import GameList from './gamelist';
import Search from './search';
import Deatils from './details';
import UserList from './users/list';
import UserDetails from './users/details';
import Home from './home';
import SignIn from './users/signin';

function Project() {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className='container-fluid'>
             <div className="d-flex justify-content-between align-items-center">
                <h1>Game It</h1>
                {currentUser && (
                    <h3>
                        Welcome, <Link to={`/project/users/${currentUser._id}`} style={{ textDecoration: 'underline' }}>{currentUser.username}</Link>
                    </h3>
                )}
            </div>

            <div className='row'>
                <Nav />

                <div className='col-10'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<Signup />} />
                        {/* <Route path="/account" element={<Account />} /> */}
                        <Route path="/search" element={<Search />} />
                        <Route path="/search/:search" element={<Search />} />
                        <Route path="/details/:gameId" element={<Deatils />} />
                        <Route path='/gamelist' element={<GameList />} />
                        <Route path='/users' element={<UserList />} />
                        <Route path='/users/:userId' element={<UserDetails />} />
                    </Routes>
                </div>
            </div>
        </div>

    );
}

export default Project;