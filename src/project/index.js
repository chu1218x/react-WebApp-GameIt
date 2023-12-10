import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Signup from './signup';
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
                <div className='col-2'>
                    <div className="list-group">
                        <Link to="/project/home" className="list-group-item list-group-item-action" >
                            Home</Link>
                        <Link to="/project/signin" className="list-group-item list-group-item-action" >
                            Sign In</Link>
                        <Link to="/project/signup" className="list-group-item list-group-item-action" >
                            Sign up</Link>
                        <Link to="/project/account" className="list-group-item list-group-item-action" >
                            Account</Link>                  
                        <Link to="/project/gamelist" className="list-group-item list-group-item-action" >
                            All Games</Link>
                    </div>
                </div>
                <div className='col-10'>
                    <Routes>
                        <Route path="/home" element={<Home />} />
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
