import React, { useEffect } from 'react';
import { fetchRandomRecipe } from '../../store/actionFetch'
import { connect } from 'react-redux'

import InfiniteScrollComponent from '../InfiniteScroll'

const Home = ({ data = [], fetchData }) => {

    useEffect(() => {
        if (data.length < 1) {
            async function getData() {
                return fetchData()
            }
            getData()
        }
        return;
    }, [data, fetchData])





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
