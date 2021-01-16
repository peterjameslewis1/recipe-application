import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { similarRecipes, setFavouriteRecipe } from '../../store/actionFetch';
import Stats from '../Stats';
import RecipieCard from '../RecipieCard/RecipieCard';
import FavouriteButton from '../Private/FavouriteButton';

const RecipeCardDetails = ({ user, similarRecipes, similarData = [], location }) => {
    const history = useHistory();
    const data = location.state;
    const price = data.pricePerServing / 100;
    const newPrice = price.toFixed(2);


    useEffect(() => {
        window.scrollTo(0, 0)
        let cancelled = false;
        if (!cancelled) {
            similarRecipes(data.id)
        }
        return () => {
            cancelled = true;
        }
    }, [data.id])


    return (

        <div className="single-recipe">
            <div className="img">
                <img src={data.image} alt="image of the cooked recipe" />
            </div>
            <Stats data={data} newPrice={newPrice} />
            <div className="title-container container">
                <h2 className="title ">{data.title}
                    {user.loggedIn ? <FavouriteButton id={data.id} /> : null}
                </h2>
                <p className="source">Recipe by <strong>{data.sourceName}</strong></p>
            </div>

            <div className="single-recipe__text container">
                <p className="summary" dangerouslySetInnerHTML={{ __html: data.summary }} />
            </div>
            <div className="single-recipe__ingredients list container">
                <h2>Ingredients:</h2>
                <ul>
                    {data.extendedIngredients.map((i, index) => {
                        return i === null ? null : <li key={index}>{i.original}<span>({i.measures.metric.amount.toFixed(0)}{i.measures.metric.unitLong})</span></li>
                    })}
                </ul>
            </div>
            <div className="single-recipe__features">
                <div className="save-recipe" onClick={() => history.push('/account')}>
                    {user.loggedIn ? <FavouriteButton id={data.id} /> : null}
                    <i className="far fa-heart favourite"></i>Favourites</div>
            </div>

            <div className="single-recipe__instructions list container">
                <h2>Method:</h2>

                {data.analyzedInstructions.map(step => {
                    return step === []
                        ?
                        null
                        :
                        <div className="method-steps">
                            <h2>{step.name}</h2>
                            <ul>
                                {step.steps.map(x => <li key={x.number}>{x.step}</li>)}
                            </ul>
                        </div>
                })}
            </div>
            <div className="similar-recipes">
                <h2 className="container">Similar Recipes</h2>
                <ul className="results" id="similar">
                    {similarData.map(data => <li key={data.id} className="results__item"><RecipieCard data={data} /></li>)}
                </ul>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        similarData: state.recipe.similarRecipes,
        user: state.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        similarRecipes: id => dispatch(similarRecipes(id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RecipeCardDetails);