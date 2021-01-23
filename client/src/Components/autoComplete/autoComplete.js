import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import useDebounce from './useDebounce';
import { searchRecipeQuery, refreshRecipes, setQuery } from '../../store/actionFetch';



const AutoComplete = ({ searchRecipe, resetResults, setQueryToStore, searchResults }) => {

  // Search term
  const [query, setQuery] = useState('');
  // API search results
  // Searching status (whether there is pending API request)
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(query, 1000);

  const asyncAutoCompleteFuncs = async () => {
    if (debouncedSearchTerm) {
      await setQueryToStore(query)
      await resetResults()
      await setIsSearching(true);
      await searchRecipe(query, searchResults)
      await setIsSearching(false);
    }
  }

  useEffect(() => {
    asyncAutoCompleteFuncs()
  },
    [debouncedSearchTerm, query, searchRecipe] // Only call effect if debounced search term changes
  );


  return (
    <div className="autocomplete container">
      <input
        placeholder="Search recipe..."
        onChange={e => setQuery(e.target.value)}
      />

      {isSearching && <div>Searching ...</div>}
    </div>
  );
}
const mapStateToProps = state => {
  return {
    searchResults: state.recipe.searchResults,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchRecipe: (query, currentData) => dispatch(searchRecipeQuery(query, currentData)),
    resetResults: () => dispatch(refreshRecipes()),
    setQueryToStore: query => dispatch(setQuery(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AutoComplete);