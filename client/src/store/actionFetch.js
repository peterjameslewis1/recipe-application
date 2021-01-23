const API_KEY = process.env.REACT_APP_API_KEY;
export const FETCH_RECIPE_BEGIN = 'FETCH_RECIPE_BEGIN';
export const FETCH_RECIPE_SUCCESS = 'FETCH_RECIPE_SUCCESS';
export const FETCH_CUISINE_RECIPE_SUCCESS = 'FETCH_CUISINE_RECIPE_SUCCESS';
export const FETCH_QUERY_RECIPE_SUCCESS = 'FETCH_QUERY_RECIPE_SUCCESS';
export const FETCH_SIMILAR_RECIPES = 'FETCH_SIMILAR_RECIPES';
export const FETCH_RECIPE_FAILURE = 'FETCH_RECIPE_FAILURE';
export const SET_CUISINE = 'SET_CUISINE';
export const SET_QUERY = 'SET_QUERY';
export const LOG_USER_OUT = 'LOG_USER_OUT';
export const REFRESH_RECIPES = 'REFRESH_RECIPES';


export const fetchBegin = () => ({
    type: 'FETCH_RECIPE_BEGIN'
})
export const fetchSuccess = data => ({
    type: 'FETCH_RECIPE_SUCCESS',
    payload: data
})
export const fetchQuerySuccess = data => ({
    type: 'FETCH_QUERY_RECIPE_SUCCESS',
    payload: data
})
export const fetchCuisineSuccess = data => ({
    type: 'FETCH_CUISINE_RECIPE_SUCCESS',
    payload: data
})
export const fetchSimilarRecipes = data => ({
    type: 'FETCH_SIMILAR_RECIPES',
    payload: data
})

export const fetchFailure = error => ({
    type: 'FETCH_RECIPE_FAILURE',
    payload: error
})
export const setCuisine = cuisine => ({
    type: 'SET_CUISINE',
    payload: cuisine
})
export const setQuery = query => ({
    type: 'SET_QUERY',
    payload: query
})
export const refreshRecipes = () => ({
    type: 'REFRESH_RECIPES',
    payload: []
})






export const pullOnRefresh = () => {
    return async dispatch => {
        await dispatch(refreshRecipes())
        await dispatch(fetchRandomRecipe([]))
    }
}


// Homepage fetch to populate landing page
export const fetchRandomRecipe = (currentData) => {
    return (dispatch) => {
        dispatch(fetchBegin())
        fetch(`https://api.spoonacular.com/recipes/random?number=20&apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(data => {

                if (currentData.length > 1) {
                    // New array of all current recipe ids stored in Redux
                    const allIds = currentData.map(data => data.id)
                    // New array of recipe ids fetched from API
                    const newIds = data.recipes.map(x => x.id)
                    // Check to see if current recipe ids contain any of new fetched recipe ids
                    const idCheck = allIds.filter(id => newIds.includes(id))

                    const newData = data.recipes.filter(recipe => recipe !== null && recipe?.image !== undefined && !idCheck.includes(recipe.id))
                    dispatch(fetchSuccess(newData))
                } else {
                    const newData = data.recipes.filter(recipe => recipe !== null && recipe?.image !== undefined)
                    dispatch(fetchSuccess(newData))
                }
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
}
//

// Search page actonCreator to fetch bulk information on specific recipes
export const searchRecipeQuery = (query, currentData) => {
    return (dispatch) => {
        dispatch(fetchBegin())
        // Initial fetch to get id's
        fetch(`https://api.spoonacular.com/recipes/complexSearch?&query=${query}&number=${currentData.length + 10}&apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const ids = data.results.map(result => result.id)
                searchRecipeDetails(ids).then(data => {
                    if (currentData.length > 1) {
                        // New array of all current recipe ids stored in Redux
                        const allIds = currentData.map(data => data.id)
                        // New array of recipe ids fetched from API
                        const newIds = data.map(x => x.id)
                        // Check to see if current recipe ids contain any of new fetched recipe ids
                        const idCheck = allIds.filter(id => newIds.includes(id))

                        const newData = data.filter(recipe => !idCheck.includes(recipe.id))
                        return dispatch(fetchQuerySuccess(newData))
                    }
                    return dispatch(fetchQuerySuccess(data))
                })
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
}

// Fetch call for the bulk details for each search query && cuisine search
export const searchRecipeDetails = id => {
    // Id's are passed to fetch bulk data
    return fetch(`https://api.spoonacular.com/recipes/informationBulk?ids=${id}&apiKey=${API_KEY}`)
        .then(res => res.json())
        .catch(error => {
            return error;
        })
}
//


// Fetch call for the details for similar recipes for each details page
export const similarRecipeDetails = id => {
    return dispatch => {
        // Id's are passed to fetch bulk data
        fetch(`https://api.spoonacular.com/recipes/informationBulk?ids=${id}&apiKey=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                dispatch(fetchSimilarRecipes(data))
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
}
//


// Fetch call for search querys
export const searchCuisine = (cuisine, data) => {
    return dispatch => {
        dispatch(fetchBegin())
        // Initial fetch to get id's
        fetch(`https://api.spoonacular.com/recipes/complexSearch?&cuisine=${cuisine}&number=${data + 10}&apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const ids = data.results.map(result => result.id)
                searchRecipeDetails(ids).then(data => {
                    dispatch(fetchCuisineSuccess(data))
                })
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
}
//


// Fetch call for similar recipies
export const similarRecipes = id => {
    return dispatch => {
        dispatch(fetchBegin())
        // Initial fetch to get id's
        fetch(`https://api.spoonacular.com/recipes/${id}/similar?apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const ids = data.map(result => result.id)
                dispatch(similarRecipeDetails(ids))
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
}
//



