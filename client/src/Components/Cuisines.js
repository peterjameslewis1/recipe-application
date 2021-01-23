import React from 'react';
import { connect } from 'react-redux';
import { searchCuisine, setCuisine, refreshRecipes } from '../store/actionFetch';

const Cuisines = ({ setCuisine, searchCuisine, refreshRecipes }) => {

    const cuisines = [
        "American",
        "British",
        "Cajun",
        "Caribbean",
        "Chinese",
        "Greek",
        "Indian",
        "Italian",
        "Japanese",
        "Korean",
        "Mediterranean",
        "Mexican",
        "Southern",
        "Spanish",
        "Thai",
        "Vietnamese"
    ];


    return (
        <div className="wrapper">
            <ul className="cuisines">
                {cuisines.map((cuisine, index) => {
                    return <li className="cuisines__item" key={index} onClick={() => {
                        refreshRecipes()
                        setCuisine(cuisine)
                        searchCuisine(cuisine, 0)
                    }}>{cuisine}</li>
                })}
            </ul>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        data: state.recipe.data,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchCuisine: (query, length) => dispatch(searchCuisine(query, length)),
        setCuisine: cuisine => dispatch(setCuisine(cuisine)),
        refreshRecipes: () => dispatch(refreshRecipes())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cuisines);