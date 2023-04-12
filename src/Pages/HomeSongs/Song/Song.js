import React from 'react';
// import Sheep  from "../../../assets/svg/sheep.svg";
import './Song.css';
import { useNavigate } from 'react-router-dom';

function Song ( { id, image, title, author } ) {
    const ref = useNavigate();

    const handleNavigate = () => {
        ref( `/songs/${id}` );
    };
    return (
        <div className="song-container" key={id} onClick={handleNavigate}>
                <div className="img-title-container" key={id}>
                    <img src={image} alt={title} />
                    <p>{title}</p>
                </div>
                <p>{author}</p>
                <p>...</p>
        </div>
    );
}

export default Song;