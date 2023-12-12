import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
function Signup() {
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        role: "USER",
        creatorInfo: { 
            name: "",
            games_count: 0,
            positions: "",
            games: ""
        }
    });

    const signup = async () => {
        try {
            if (credentials.role === 'CREATOR') {
                const positionsArray = credentials.creatorInfo.positions.split(',').map(pos => ({ name: pos.trim() }));
                const gamesArray = credentials.creatorInfo.games.split(',').map(game => {
                    const [name, id] = game.trim().split(':');
                    return { name, id: id ? Number(id) : undefined };
                });

                const creatorCredentials = {
                    ...credentials,
                    creatorInfo: {
                        ...credentials.creatorInfo,
                        positions: positionsArray,
                        games: gamesArray
                    }
                };

                await client.signUp(creatorCredentials);
            } else {
                await client.signUp(credentials);
            }

            navigate("/project/signin");
        } catch (err) {
            setError(err.response.data.message);
        }
    };


    const handleRoleChange = (event) => {
        setCredentials({ ...credentials, role: event.target.value });
    };

    const handleCreatorChange = (event) => {
        setCredentials({
            ...credentials,
            creatorInfo: { ...credentials.creatorInfo, [event.target.name]: event.target.value }
        });
    };

    return (
        <div>
            <h1>Signup</h1>
            {error && <div>{error}</div>}

            <p>User Name:</p>
            <input
                value={credentials.username}
                onChange={(e) => setCredentials({
                    ...credentials,
                    username: e.target.value
                })} />

            <p>Password:</p>
            <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({
                    ...credentials,
                    password: e.target.value
                })} />

            <div>
                <p>Select your role:</p>
                <label>
                    <input
                        type="radio"
                        value="USER"
                        checked={credentials.role === "USER"}
                        onChange={handleRoleChange}
                    />
                    User
                </label>
                <label>
                    <input
                        type="radio"
                        value="ADMIN"
                        checked={credentials.role === "ADMIN"}
                        onChange={handleRoleChange}
                    />
                    Admin
                </label>
                <label>
                    <input
                        type="radio"
                        value="CREATOR"
                        checked={credentials.role === "CREATOR"}
                        onChange={handleRoleChange}
                    />
                    Creator
                </label>
            </div>

            {credentials.role === "CREATOR" && (
                <div>
                    <p>Name:</p>
                    <input
                        type="text"
                        name="name"
                        value={credentials.creatorInfo.name}
                        onChange={handleCreatorChange}
                    />
                    
                    <p>Games Count:</p>
                    <input
                        type="number"
                        name="games_count"
                        value={credentials.creatorInfo.games_count}
                        onChange={handleCreatorChange}
                    />
                    <p>Positions (comma-separated):</p>
                    <input
                        type="text"
                        name="positions"
                        value={credentials.creatorInfo.positions}
                        onChange={handleCreatorChange}
                    />
                    <p>Games (comma-separated):</p>
                    <input
                        type="text"
                        name="games"
                        value={credentials.creatorInfo.games}
                        onChange={handleCreatorChange}
                    />
                </div>
            )}

            <button onClick={signup} className="btn btn-primary">
                Signup
            </button>
        </div>
    );


}
export default Signup;