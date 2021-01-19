import React, { useEffect } from 'react';
import { fetchRandomRecipe } from '../../store/actionFetch'
import { connect } from 'react-redux'

import InfiniteScrollComponent from '../InfiniteScroll'

const Home = ({ fetchData, data = [] }) => {

    useEffect(() => {

        async function getData() {
            return fetchData(data)
        }
        getData()

    }, [])
    console.log(data)



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
        fetchData: data => dispatch(fetchRandomRecipe(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
