import React, { useState, useEffect } from 'react';


const RecipeCardDetails = (match) => {
    const [recipe, setRecipe] = useState([]);
    const hash = match.location.hash.slice(1)

    const pathName = `https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23${hash}`
    
    useEffect(() => {
        fetchData(pathName)
    }, [pathName])


    const fetchData = (pathName) => {
        const apiKey = 'bd44e3839f3e7ae8efc4d7ec57ca1e03';
        const appId = '0e146f59';
        
        fetch(`https://cors-anywhere.herokuapp.com/${pathName}&app_key=${apiKey}&app_id=${appId}`)
        .then(res => res.json())
        .then(data => setRecipe(data));
    };

    console.log(recipe)

    
    return (
        <div>
        {recipe.map((data, index) => {
            return (
                <div key={index} className="recipe-card">
                    <div className="recipe-card-container">
                        {/* <div className="recipe-card-container__back-btn">
                            <i class="fa fa-arrow-left" aria-hidden="true"></i>
                        </div> */}

                        <div className="recipe-card-container__title">
                            <h2>{data.label}</h2>
                            <p><strong>Feeds</strong>: {data.yield}</p>
                        </div>
                        <div className="recipe-card-container__img">
                            <img src={data.image} alt="" />
                            <a href={data.url}>View full recipe</a>
                        </div>
        
                        <div className="recipe-card-container__ingredients">
                            <h3>Ingredients:</h3>
                            <ul>
                                {data.ingredients.map((data, index) => {
                                    return <li key={index}><span>{data.text}</span><span>{data.weight}</span></li>
                                })}
                            </ul>
                        </div>


                        <div className="recipe-card-container__info">
                            <h3>Recipe health information:</h3>
                            <ul>
                                {data.healthLabels.map((data, index) => {
                                    return <li key={index}>{data}</li>
                                })}
                            </ul>
                            <ul>
                                {data.dietLabels.map((data, index) => {
                                    return <li key={index}>{data}</li>
                                })}
                            </ul>
                            
                            <h3>Cautions</h3>
                            <ul>
                                {data.cautions.map((data, index) => {
                                    return <li key={index}>{data}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            )})}
        </div>
    )
}


export default RecipeCardDetails;