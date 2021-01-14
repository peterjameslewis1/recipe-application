import React, { useEffect } from 'react';
import { fetchRandomRecipe } from '../../store/actionFetch'
import RecipeCard from '../RecipieCard/RecipieCard'
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from 'react-redux'
import FavouriteButton from '../Private/FavouriteButton'

import InfiniteScrollComponent from '../InfiniteScroll'

const Home = ({ data = [], fetchData, fetchSuccess, setFavourite, user, }) => {

    useEffect(() => {

        async function getData() {
            return fetchData()
        }
        getData()

    }, [])

    const newData = data.slice(0, 10)
    console.log(data)
    console.log(newData)


    return (
        <div className="home">
            {/* <InfiniteScroll
                dataLength={data.length}
                next={() => fetchData()}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <ul className="results">
                    {newData.map(recipes => {
                        return <li className="results__item" key={recipes.id}><RecipeCard data={recipes} />{user.loggedIn ? <FavouriteButton id={recipes.id} /> : null}</li>
                    })}
                </ul>
            </InfiniteScroll> */}
            <InfiniteScrollComponent />
        </div >
    )
}

const mapStateToProps = state => {
    return {
        data: state.recipe.data,
        user: state.user,
        fetchSuccess: state.recipe.fetchSuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => dispatch(fetchRandomRecipe()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
