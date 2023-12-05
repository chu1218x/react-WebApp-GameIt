import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './home';
import LogIn from './login';
import Signup from './signup';
import Account from './account';
import GameList from './gamelist';


function Project() {

    const [key, setKey] = useState("home");


    return (
        <div className='container-fluid'>
            <pre>{JSON.stringify(process.env, null, 2)}</pre>
            <div className='row'>
                <div className='col-2'>
                    <div className="list-group">
                        <Link to="/" className="list-group-item list-group-item-action" onClick={() => setKey("home")}>
                            Home</Link>
                        <Link to="/project/login" className="list-group-item list-group-item-action" onClick={() => setKey("login")}>
                            LogIn</Link>
                        <Link to="/project/signup" className="list-group-item list-group-item-action" onClick={() => setKey("signup")}>
                            Signup</Link>
                        <Link to="/project/account" className="list-group-item list-group-item-action" onClick={() => setKey("account")}>
                            Account</Link>
                        <Link to="/project/gamelist" className="list-group-item list-group-item-action" onClick={() => setKey("gamelist")}>
                            GameList</Link>
                    </div>
                </div>

                <div className='col-10'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LogIn />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/gamelist" element={<GameList />} />
                    </Routes>
                </div>
            </div>

        </div>
    );
}

export default Project;
