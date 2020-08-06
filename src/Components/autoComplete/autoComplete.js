import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDebounce from './useDebounce';



const AutoComplete = props => {
  // State and setters for ...
  // Search term
  const [searchTerm, setSearchTerm] = useState('');
  // API search results
  const [results, setResults] = useState([]);
  // Searching status (whether there is pending API request)
  const [isSearching, setIsSearching] = useState(false);
  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms
  // As a result the API call should only fire once user stops typing
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      searchCharacters(debouncedSearchTerm).then(results => {
        console.log(results.hits)
        setIsSearching(false);
        // Filter out results with no thumbnail
        const filteredResults = results.hits.map(results => {
          return results.recipe;
        })
        setResults(filteredResults);
      });
    } else {
      setResults([]);
    }
  },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );


  return (
    <div>
      <div>
        <input
          placeholder="Search recipe..."
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {isSearching && <div>Searching ...</div>}
      <div className="list">
        {results.map(result => (
          <Link
            to={{
              pathname: `/${result.uri}`,
              query: { back: searchTerm }
            }}
            className="recipe-card-link">
            <div className="item">
              <img src={result.image} alt="" />
              <h4>{result.label}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

}


function searchCharacters(search) {
  const apiKey = '8125493d295351d3f30b5b702bf96147';
  return fetch(
    `https://api.edamam.com/search?app_key=${apiKey}&app_id=26adc8da&q=${search}&to=30`,
    {
      method: 'GET'
    }
  ).then(r => r.json());
}

export default AutoComplete;