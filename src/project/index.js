import React from 'react';
import { Link } from 'react-router-dom';

function Project({ children }) {
    return (
        <div className='container-fluid'>
            <h1>Game It</h1>
            <div className='row'>
                <div className='col-2'>
                    <div className="list-group">
                        <Link to="/home" className="list-group-item list-group-item-action" >
                            Home</Link>
                        <Link to="/signin" className="list-group-item list-group-item-action" >
                            Sign In</Link>
                        <Link to="/signup" className="list-group-item list-group-item-action" >
                            Sign up</Link>
                        <Link to="/account" className="list-group-item list-group-item-action" >
                            Account</Link>                  
                        <Link to="/gamelist" className="list-group-item list-group-item-action" >
                            All Games</Link>
                    </div>
                </div>
                <div className='col-10'>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Project;
