import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";

function Signup() {
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        role: "USER"
    });

    const signup = async () => {
        try {
            await client.signUp(credentials);
            navigate("/project/signin");
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const handleRoleChange = (event) => {
        setCredentials({ ...credentials, role: event.target.value });
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
                        value="TESTER"
                        checked={credentials.role === "TESTER"}
                        onChange={handleRoleChange}
                    />
                    Game Tester
                </label>
            </div>

            <button onClick={signup} className="btn btn-primary">
                Signup
            </button>
        </div>
    );
}

export default Signup;
