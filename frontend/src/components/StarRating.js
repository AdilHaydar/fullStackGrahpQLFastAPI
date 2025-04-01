import React, { useState } from "react";

const StarRating = ({ onRatingChange }) => {
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)

    const handleClick = (value) => {
        setRating(value);
        onRatingChange(value);
    };

    return (
        <div>
            {[1, 2, 3, 4, 5].map((star) => (
                <i
                    key={star}
                    className={`bi ${star <= (hoverRating || rating) ? "bi-star-fill text-warning" : "bi-star text-secondary"}`}
                    style={{
                        fontSize: "24px",
                        cursor: "pointer",
                        marginRight: "5px",
                        opacity: star <= hoverRating ? 0.6 : 1, 
                        transition: "opacity 0.2s ease-in-out",
                    }}
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)} 
                ></i>
            ))}
        </div>
    );
};

export default StarRating;
