import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as client from './client';
import "../project/stylelist/creators.css";
// import axios from 'axios';
// import defaultImage from '../project/image/User_Avatar.png'; 


function Creators() {
    // const [rawgCreators, setRawgCreators] = useState([]); 
    // const [localCreators, setLocalCreators] = useState([]); 

    // const fetchRawgCreators = async () => {
    //     try {
    //         const rawgData = await client.findAllCreators();
    //         setRawgCreators(rawgData);
    //     } catch (error) {
    //         console.error("Error fetching RAWG creators:", error);
    //     }
    // };

    // const fetchLocalCreators = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:4000/api/creators');
    //         setLocalCreators(response.data);
    //     } catch (error) {
    //         console.error("Error fetching local creators:", error);
    //     }
    // };

    // useEffect(() => {
    //     fetchRawgCreators();
    //     fetchLocalCreators();
    // }, []);

    const [creators, setCreators] = useState([]);

    useEffect(() => {
        const fetchCreators = async () => {
            try {
                const data = await client.findAllCreators();
                setCreators(data);
            } catch (error) {
                console.error("Error fetching creators:", error);
            }
        };

        fetchCreators();
    }, []);

    return (
        <div className="creators-container">
            {creators.map(creator => (
                <div key={creator.id} className="creator-card">
                    <div className="creator-image-container">
                        <img src={creator.image} alt={creator.name} className="creator-image" />
                    </div>
                    <div className="creator-info">
                        <h2 className="creator-name">{creator.name}</h2>
                        <p className="creator-games-count">Games Count: {creator.games_count}</p>
                        <p className="creator-position">Position: {creator.positions.map(position => position.name).join(', ')}</p>
                        <p className="creator-games">
                            Games:{' '}
                            {creator.games.length > 0 ? (
                                creator.games.map(game => (
                                    <Link key={game.id} to={`/project/details/${game.id}`} className="game-link">
                                        {game.name}
                                    </Link>
                                )).reduce((prev, curr) => [prev, ', ', curr])
                            ) : (
                                <span>No games available</span>
                            )}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
//     return (
//         <div className="creators-container">
//             {/* from RAWG */}
//             {rawgCreators.map(creator => (
//                 <div key={creator.id} className="creator-card">
//                     <div className="creator-image-container">
//                         <img 
//                             src={creator.image || defaultImage} 
//                             alt={creator.name} 
//                             className="creator-image" 
//                         />
//                     </div>
//                     <div className="creator-info">
//                         <h2 className="creator-name">{creator.name}</h2>
//                         <p className="creator-games-count">Games Count: {creator.games_count}</p>
//                         <p className="creator-position">Position: {creator.positions.map(position => position.name).join(', ')}</p>
//                         <p className="creator-games">
//                             Games:{' '}
//                             {creator.games && creator.games.length > 0 ? (
//                                 creator.games.map(game => (
//                                     <Link key={game.id} to={`/project/details/${game.id}`} className="game-link">
//                                         {game.name}
//                                     </Link>
//                                 )).reduce((prev, curr) => [prev, ', ', curr])
//                             ) : (
//                                 <span>No games available</span>
//                             )}
//                         </p>
//                     </div>
//                 </div>
//             ))}
    
//             {/* from local */}
//             {localCreators.map(creator => (
//                 <div key={creator._id} className="creator-card">
//                     <div className="creator-image-container">
//                         <img 
//                             src={creator.profileImage || defaultImage} 
//                             alt={creator.name} 
//                             className="creator-image" 
//                         />
//                     </div>
//                     <div className="creator-info">
//                         <h2 className="creator-name">{creator.name}</h2>
//                         <p className="creator-games-count">Games Count: {creator.games_count}</p>
//                         <p className="creator-position">Position: {creator.positions.map(position => position.name).join(', ')}</p>
//                         <p className="creator-games">
//                             Games:{' '}
//                             {creator.games && creator.games.length > 0 ? (
//                                 creator.games.map(game => (
//                                     <Link key={game.id} to={`/project/details/${game.id}`} className="game-link">
//                                         {game.name}
//                                     </Link>
//                                 )).reduce((prev, curr) => [prev, ', ', curr])
//                             ) : (
//                                 <span>No games available</span>
//                             )}
//                         </p>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
    

// }


export default Creators;
