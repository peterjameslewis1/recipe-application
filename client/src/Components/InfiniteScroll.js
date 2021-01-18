import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { searchCuisine, fetchRandomRecipe } from '../store/actionFetch';
import RecipeCard from './RecipieCard/RecipieCard'
import { connect } from 'react-redux';
import FavouriteButton from '../Components/Private/FavouriteButton'

const InfiniteScrollComponent = ({ data = [], searchResults = [], searchRecipe, fetchData, cuisine, user }) => {

    return (
        <InfiniteScroll
            dataLength={data.length}
            next={cuisine === '' ? () => fetchData() : () => searchRecipe(cuisine, data.length)}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >

            <ul className="results">

                {
                    searchResults.length > 1
                        ?
                        searchResults.map(recipes => {
                            return <li className="results__item" key={recipes.id}><RecipeCard data={recipes} />{user.loggedIn ? <FavouriteButton id={recipes.id} /> : null}</li>
                        })
                        :
                        data.map(recipes => <li className="results__item" key={recipes.id}><RecipeCard data={recipes} />{user.loggedIn ? <FavouriteButton id={recipes.id} /> : null}</li>)
                }
            </ul>
        </InfiniteScroll>
    )
}

const mapStateToProps = state => {
    return {
        data: state.recipe.data,
        searchResults: state.recipe.searchResults,
        cuisine: state.recipe.cuisine,
        user: state.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        searchRecipe: (query, length) => dispatch(searchCuisine(query, length)),
        fetchData: () => dispatch(fetchRandomRecipe())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfiniteScrollComponent);
