import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

const RecipeCardDetails = (match) => {
    const [recipe, setRecipe] = useState([]);
    // const hash = match.location.hash.slice(1)
    const uri = match.location.pathname.split('#')[1];
    const hash = uri;

    console.log(uri)

    // console.log(match.location.query.back)

    const pathName = `https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23${hash}`
    // const pathName = `https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%${hash}`

    useEffect(() => {
        fetchData(pathName)
    }, [pathName])

    console.log(recipe)
    console.log(match)


    const fetchData = (pathName) => {
        const apiKey = 'bd44e3839f3e7ae8efc4d7ec57ca1e03';
        const appId = '0e146f59';

        fetch(`https://cors-anywhere.herokuapp.com/${pathName}&app_key=${apiKey}&app_id=${appId}`)
            .then(res => res.json())
            .then(data => setRecipe(data));
        console.log(recipe)
    };


    const ifData = (data) => {
        if (data.length === 0) {
            console.log('no data')
        } else {
            {
                data.map((data, index) => {
                    return <ul><li key={index}>{data}</li></ul>
                })
            }
        }
    }


    return (
        <div>
            <Header path={`/recipe-app/home/${match.location.query.back}`} />
            <Link to={`/recipe-app/home/${match.location.query.back}`} className="back-btn">
                <div><i class="fas fa-chevron-left"></i>Back</div>
            </Link>
            {recipe.map((data, index) => {
                return (
                    <div key={index} className="recipe-card">
                        <div className="recipe-card-container">

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

                                {ifData(data.dietLabels)}

                                <h3>Cautions</h3>
                                <ul>
                                    {data.cautions.map((data, index) => {
                                        return <li key={index}>{data}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}


export default RecipeCardDetails;