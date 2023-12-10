import * as client from './client';
import { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';

function Account() {

    return (
        <div className="container-fluid">
            <h1>Account</h1>
            <Link to="/project/signin" className="btn btn-primary">Sign In</Link>
        </div>
    )
}
    //     const [user, setUser] = useState(null);
//     const navigate = useNavigate();
//     const fetchUser = async () => {
//         try {
//             const user = await client.account();
//             setUser(user);
//         }
//         catch (error) {
//             navigate('/project/signin');
//         }
//     };

//     const updateUser = async () => {
//         const status = await client.updateUser(user._id, user);
//     }

//     const signout = async () => {
//         const status = await client.signOut();
//         navigate('/project/signin');

//     }

//     useEffect(() => {
//         fetchUser();
//     }, []);

//     return (
//         <div className="container-fluid">
//             <h1>Account</h1>
//             {user && (
//                 <div>
//                     <p>Username : {user.username}</p>
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                         <p style={{ margin: 0, marginRight: "10px" }}>email:</p>
//                         <input
//                             type="email"
//                             className="form-control"
//                             value={user.email}
//                             onChange={(e) => setUser({ ...user, email: e.target.value })}
//                         />
//                     </div>
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                         <p style={{ margin: 0, marginRight: "10px" }}>firstName:</p>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={user.firstName}
//                             onChange={(e) => setUser({ ...user, firstName: e.target.value })}
//                         />
//                     </div>
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                         <p style={{ margin: 0, marginRight: "10px" }}>lastName:</p>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={user.lastName}
//                             onChange={(e) => setUser({ ...user, lastName: e.target.value })}
//                         />
//                     </div>
//                     <p>Role : {user.role}</p>
//                     <button className="btn btn-primary" onClick={updateUser}>Update</button>
//                     <button className="btn btn-danger" onClick={signout}>Sign Out</button>
//                     {
//                         user.role === 'ADMIN' && (
//                             <Link to="/project/users" className="btn btn-warning">Users</Link>
//                         )
//                     }                
//                     </div>
//             )}
//         </div>
//     )
// }

export default Account;