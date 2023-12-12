import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
function Signup() {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        role: "USER"
    });

    const navigate = useNavigate();
    const signup = async () => {
        try {
            await client.signUp(credentials);
            navigate("/project/signin");
        } catch (err) {
            setError(err.response.data.message);
        }
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
                })}
            />

            <p>Password:</p>
            <input
                value={credentials.password}
                onChange={(e) => setCredentials({
                    ...credentials,
                    password: e.target.value
                })}
            />

            <p>Role:</p>
            <select
                value={credentials.role}
                onChange={(e) => setCredentials({
                    ...credentials,
                    role: e.target.value
                })}
            >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="CREATOR">Creator</option>
            </select>

            <hr />
            <button onClick={signup} className="btn btn-primary">
                Signup
            </button>
        </div>
    );

}
export default Signup;