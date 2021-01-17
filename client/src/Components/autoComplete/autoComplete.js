import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import useDebounce from './useDebounce';
import { searchRecipeQuery } from '../../store/actionFetch';



const AutoComplete = ({ searchRecipe }) => {

  // Search term
  const [query, setQuery] = useState('');
  // API search results
  // Searching status (whether there is pending API request)
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      searchRecipe(query)
      console.log(query)
      setIsSearching(false);
    }
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


const mapDispatchToProps = dispatch => {
  return {
    searchRecipe: query => dispatch(searchRecipeQuery(query))
  }
}

export default connect(null, mapDispatchToProps)(AutoComplete);