import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './stylelist/nav.css'

function Nav() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        setIsLoggedIn(!!currentUser);
    }, []);

    return (
        <div className='nav-container col-2 d-none d-lg-block'>
            <div className="list-group">
                <Link to="/project" className="list-group-item list-group-item-action" >
                    Home</Link>
                <Link to="/project/signin" className="list-group-item list-group-item-action" >
                    Sign In</Link>
                <Link to="/project/signup" className="list-group-item list-group-item-action" >
                    Sign up</Link>
                {/* <Link to="/project/account" className="list-group-item list-group-item-action" >
                    Account</Link> */}
                <Link to="/project/gamelist" className="list-group-item list-group-item-action" >
                    All Games</Link>
                <Link to="/project/creators" className="list-group-item list-group-item-action" >
                    Creators</Link>
                {isLoggedIn ? (
                    <Link to="/project/topreviews" className="list-group-item list-group-item-action" >
                        Reviews</Link>
                ) : (
                    <Link to="/project/signin" className="list-group-item list-group-item-action" onClick={(e) => {
                        e.preventDefault();
                        navigate('/project/signin');
                    }}>
                        Reviews</Link>
                )}
            </div>
        </div>
    );
}

export default Nav;
