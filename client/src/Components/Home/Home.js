import React, { useEffect } from 'react';
import { fetchRandomRecipe } from '../../store/actionFetch'
import { connect } from 'react-redux'
import { pullOnRefresh } from '../../store/actionFetch'
import RecipeCard from '../RecipieCard/RecipieCard'
import FavouriteButton from '../Private/FavouriteButton'
import InfiniteScroll from "react-infinite-scroll-component";


const Home = ({ fetchData, data = [], pullOnRefresh, user }) => {

    useEffect(() => {
        if (data.length < 1) {
            async function getData() {
                return fetchData(data)
            }
            getData()
        }
    }, [])



    return (
        <div className="home">
            <InfiniteScroll
                dataLength={data.length}
                next={() => fetchData(data)}
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

                        data.map(recipes => <li className="results__item" key={recipes.id}><RecipeCard data={recipes} />{user.loggedIn ? <FavouriteButton id={recipes.id} /> : null}</li>)
                    }
                </ul>
            </InfiniteScroll>
        </div >
    )
}

const mapStateToProps = state => {
    return {
        data: state.recipe.data,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: data => dispatch(fetchRandomRecipe(data)),
        pullOnRefresh: () => dispatch(pullOnRefresh())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
