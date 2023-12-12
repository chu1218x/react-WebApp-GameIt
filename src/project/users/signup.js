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
        creatorInfo: { // 添加这个对象
            name: "",
            games_count: 0,
            positions: "",
            games: ""
        }
    });
    

    // const signup = async () => {
    //     try {
    //         await client.signUp(credentials);
    //         navigate("/project/signin");
    //     } catch (err) {
    //         setError(err.response.data.message);
    //     }
    // };

    const signup = async () => {
        try {
            // 如果角色是 CREATOR，处理 creatorInfo 中的 games 字段
            if (credentials.role === 'CREATOR') {
                const gamesArray = credentials.creatorInfo.games.split(',').map(game => {
                    const [name, id] = game.trim().split(':');
                    return { name, id: id ? Number(id) : undefined };
                });
    
                const creatorCredentials = {
                    ...credentials,
                    creatorInfo: {
                        ...credentials.creatorInfo,
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
    
    
    // const signup = async () => {
    //     try {
    //         if (credentials.role === 'CREATOR') {
    //             const positionsArray = credentials.creatorInfo.positions.split(',')
    //                 .map(pos => pos.trim())
    //                 .filter(pos => pos.length)
    //                 .map(name => ({ name }));
    
    //             const gamesArray = credentials.creatorInfo.games.split(',')
    //                 .map(game => game.trim().split(':'))
    //                 .filter(parts => parts[0].length)
    //                 .map(([name, id]) => ({ name, id: id ? Number(id) : undefined }));
    
    //             const creatorCredentials = {
    //                 ...credentials,
    //                 creatorInfo: {
    //                     ...credentials.creatorInfo,
    //                     positions: positionsArray,
    //                     games: gamesArray
    //                 }
    //             };
    
    //             await client.signUp(creatorCredentials);
    //         } else {
    //             await client.signUp(credentials);
    //         }
    
    //         navigate("/project/signin");
    //     } catch (err) {
    //         setError(err.response?.data?.message || "An error occurred during signup");
    //     }
    // };
    
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
                    {/* 添加更多 Creator 相关字段... */}
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