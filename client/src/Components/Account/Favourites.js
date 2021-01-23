import React, { useEffect, useState } from 'react'
import RecipeCard from '../RecipieCard/RecipieCard';
import { favouriveDetails } from '../../store/actionUser';
import { connect } from 'react-redux'
import FavouriteButton from '../Private/FavouriteButton';

const FavouriteRecipes = ({ user, fetchData, data = [] }) => {
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        async function getRecipes() {
            await fetchData(user.user.favourites)
            await setLoading(false)
        }
        getRecipes()
    }, [])

    return (
        <div className="favourites">
            {loading
                ?
                <h4>Loading...</h4>
                :
                <ul className="results">
                    {data.map(recipes => {
                        return <li className="results__item" key={recipes.id}><RecipeCard data={recipes} />{user.loggedIn ? <FavouriteButton id={recipes.id} /> : null} </li>
                    })}
                </ul>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
        data: state.user.user.favouritesDetails
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchData: id => dispatch(favouriveDetails(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteRecipes);