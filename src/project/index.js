import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Nav from './nav';
import Signup from './users/signup';
import Account from './users/account';
import GameList from './gamelist';
import Search from './search';
import Deatils from './details';
import UserList from './users/list';
import UserDetails from './users/details';
import Home from './home';
import SignIn from './users/signin';

function Project() {

    return (
        <div className='container-fluid'>
            <h1>Game It</h1>
            <div className='row'>
                <Nav />

                <div className='col-10'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/search/:search" element={<Search />} />
                        <Route path="/details/:gameId" element={<Deatils />} />
                        <Route path='/gamelist' element={<GameList />} />
                        <Route path='/users' element={<UserList />} />
                        <Route path='/user/:userId' element={<UserDetails />} />
                    </Routes>
                </div>
            </div>
        </div>

    );
}

export default Project;