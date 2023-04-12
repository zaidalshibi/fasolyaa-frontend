import React from 'react';
import Sheep from '../../../assets/svg/sheep.svg';
import './CategoryCard.css';

function CategoryCard ( props ) {

    const handleClick = ( e ) => {
        e.preventDefault();
        props.shuffle();
    };

    return (
        <div className="category-card">
            <div className="category-card-buttons" >
                <button className="category-card-button">  &lt; </button>
                <button className="category-card-button">  &gt; </button>
            </div >
            <div className="category-card-image">
                <img src={Sheep} alt="Sheep" />
            </div>
            <div className="category-card-text">
                <p>الحيوانات</p>
            </div>
            <div className="category-card-text2">
                <p>عدد الاغاني : {props.num}</p>
            </div>
            <div className="shuffle">
                <button className="shuffle-button" onClick={e => handleClick(e)}> استمع عشوائياً </button>
            </div>
        </div>
    );
}

export default CategoryCard;