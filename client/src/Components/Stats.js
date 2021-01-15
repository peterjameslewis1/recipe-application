import React from 'react';

const Stats = ({ data, newPrice }) => {
    return (

        <div className="stats">
            <div className="stats__item">
                <i className="fas fa-clock"></i>
                <span>{data.readyInMinutes}</span>
            </div>
            <div className="stats__item">
                <i className="fas fa-star"></i>
                <span>{data.spoonacularScore}</span>
            </div>
            <div className="stats__item">
                <i className="fas fa-users"></i>
                <span>{data.servings}</span>
            </div>
            <div className="stats__item">
                <i className="fas fa-coins"></i>
                <span>${newPrice}</span>
            </div>
        </div>
    )
}

export default Stats;

