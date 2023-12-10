import React, { useState } from 'react';
import "../project/stylelist/carousel.css";

function Carousel({ screenshots }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const goToPrev = () => {
        setActiveIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : screenshots.length - 1
        );
    };

    const goToNext = () => {
        setActiveIndex((prevIndex) =>
            prevIndex < screenshots.length - 1 ? prevIndex + 1 : 0
        );
    };

    return (
        <div className="carousel-container">
            <div className="carousel-main">
                <img src={screenshots[activeIndex].image} alt="Screenshot" />
            </div>
            <div className="carousel-controls">
                <button onClick={goToPrev}>&lt;</button>
                <button onClick={goToNext}>&gt;</button>
            </div>
        </div>
    );
}

export default Carousel;
