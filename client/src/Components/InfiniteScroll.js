import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { searchCuisine, fetchRandomRecipe, pullOnRefresh, searchRecipeQuery } from '../store/actionFetch';
import RecipeCard from './RecipieCard/RecipieCard'
import { connect } from 'react-redux';
import FavouriteButton from '../Components/Private/FavouriteButton'

const InfiniteScrollComponent = ({ data = [], searchResults = [], searchCuisine, fetchData, cuisine, user, pullOnRefresh, query, searchQuery }) => {

    const next = () => {
        if (cuisine == '' && query === '') {
            return fetchData(data)
        }
        else if (cuisine !== '') {
            return searchCuisine(cuisine, searchResults.length)
        }
        return searchQuery(query, searchResults)
    }

    return (
        <InfiniteScroll
            dataLength={searchResults.length > 1 ? searchResults.length : data.length}
            next={() => next()}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
            refreshFunction={pullOnRefresh}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
                <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
            }
            releaseToRefreshContent={
                <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
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
        query: state.recipe.query,
        searchResults: state.recipe.searchResults,
        cuisine: state.recipe.cuisine,
        user: state.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        searchCuisine: (cuisine, searchResults) => dispatch(searchCuisine(cuisine, searchResults)),
        searchQuery: (query, currentData) => dispatch(searchRecipeQuery(query, currentData)),
        fetchData: (data) => dispatch(fetchRandomRecipe(data)),
        pullOnRefresh: () => dispatch(pullOnRefresh())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfiniteScrollComponent);
