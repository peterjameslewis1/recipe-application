import React, { useState, useEffect } from 'react';


const RecipeCardDetails = (match) => {
    const [recipe, setRecipe] = useState([]);

    console.log(match)

    // function createMarkup() { return {__html: (props.summary, props.instructions)}; };

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
    console.log(recipe[0])
    
    console.log(pathName)
    
    return (
        <div>
        {recipe.map(data => {
            console.log(data.label)

            return (
                <div className="recipe-card">
                    <div className="recipe-card-container">
                        <div className="recipe-card-container__url">
                            <a href={data.url}>View full recipe</a>
                        </div>

                        <div className="recipe-card-container__title">
                            <img src={data.image} alt="" />
                            <h2>{data.label}</h2>
                        </div>
        
                        <div className="recipe-card-container__ingredients">
                            <p>Ingredients</p>
                            <ul>
                                {data.ingredients.map((data, index) => {
                                    return <li key={index}><span>{data.text}</span><span>{data.weight}</span></li>
                                })}
                            </ul>
                        </div>


                        <div className="recipe-card-container__info">
                            <ul>
                                {data.healthLabels.map(data => {
                                    return <li>{data}</li>
                                })}
                            </ul>
                            <ul>
                                {data.dietLabels.map(data => {
                                    return <li>{data}</li>
                                })}
                            </ul>
                            <p>Feeds: {data.yield}</p>
                            <p>{data.totalWeight}</p>
                        </div>
                    </div>
                </div>
            )})}
        </div>
    )
}


export default RecipeCardDetails;