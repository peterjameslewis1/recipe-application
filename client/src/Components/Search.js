import React from 'react';
import AutoComplete from './autoComplete/autoComplete'
import InfiniteScrollComponent from './InfiniteScroll'
import Cuisines from './Cuisines';


const Search = () => {

    return (
        <div className="search">
            <AutoComplete />
            <Cuisines />
            <InfiniteScrollComponent />
        </div >
    )

}

export default Search;