import React, { useEffect } from 'react';
import { fetchRandomRecipe } from '../../store/actionFetch'
import { connect } from 'react-redux'

import InfiniteScrollComponent from '../InfiniteScroll'

const Home = ({ fetchData }) => {

    useEffect(() => {
        async function getData() {
            return fetchData()
        }
        getData()
    }, [])





    return (
        <div className="home">
            <InfiniteScrollComponent />
        </div >
    )
}

const mapStateToProps = state => {
    return {
        data: state.recipe.data,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => dispatch(fetchRandomRecipe()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
