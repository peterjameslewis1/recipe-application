import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const Card = (match) => {
    const [recipeData, setRecipeData] = useState([]);
    const [perPage, setPerPage] = useState(10);
    const recipeType = match.match.params.type;
    const apiKey = 'bd44e3839f3e7ae8efc4d7ec57ca1e03';
    const appId = '0e146f59';

    useEffect(() => {
        fetchMoreData(recipeType)
    }, [recipeType])


    // Initial fetch call
    const fetchMoreData = (query) => {
        const apiKey = 'bd44e3839f3e7ae8efc4d7ec57ca1e03';
        const appId = '0e146f59';

        fetch(`https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=${query}&app_key=${apiKey}&app_id=${appId}&from=0&to=${perPage}`)
            .then(res => res.json())
            .then(data => setRecipeData([...recipeData, ...data.hits]));
    };


    // function to fetch +10 more items of data on from API on onClick
    const loadMore = () => {
        setPerPage(recipeData.length + 10)
        fetchMoreData()
    }


    return (
        <div className="results">
            {recipeData.map((data, index) => {
                return (
                    <Link to={`/${data.recipe.uri}`}>
                        <div className="recipes" key={index}>
                            <div className="recipie-card">
                                <div className="recipie-card-container">

                                    <div className="recipie-card-container__img">
                                        <img src={data.recipe.image ? data.recipe.image : 'https://assets.materialup.com/uploads/b03b23aa-aa69-4657-aa5e-fa5fef2c76e8/preview.png'} alt="" />
                                    </div>

                                    <div className="recipie-card-container__text">
                                        <div className="recipie-card-container__text-title">
                                            <h4>{data.recipe.label}</h4>
                                        </div>
                                        <div className="recipie-card-container__text-time">
                                            <span>{data.recipe.totalTime}m</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })
            }
            <a onClick={loadMore} className="load-more" href="#">Load More</a>
        </div>
    )
}

export default Card;