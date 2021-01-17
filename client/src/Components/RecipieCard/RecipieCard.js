import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'



const Card = ({ data }) => {


    return (
        <Link to={{
            pathname: '/recipe',
            state: data
        }} >
            <div className="img">
                <img src={data.image} alt={data.title} />
            </div>
            <div className="results__item__text">
                <h4 className="title">{data.title}</h4>
                <p className="source">Recipe by <strong>{data.sourceName}</strong></p>
            </div>
            <div className="results__item__scores">
                <div className="results__item__scores__score">
                    <i className="fas fa-clock"></i>
                    <span>{data.readyInMinutes}</span>
                </div>
                <div className="results__item__scores__score">
                    <i className="fas fa-star rating"></i>
                    <span>{data.spoonacularScore}</span>
                </div>
                <div className="results__item__scores__score">
                    <i className="fas fa-users"></i>
                    <span>{data.servings}</span>
                </div>
            </div>
        </Link>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Card);