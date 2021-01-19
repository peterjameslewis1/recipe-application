const API_KEY = process.env.REACT_APP_API_KEY;
export const FETCH_RECIPE_BEGIN = 'FETCH_RECIPE_BEGIN';
export const FETCH_RECIPE_SUCCESS = 'FETCH_RECIPE_SUCCESS';
export const FETCH_SEARCH_RECIPE_SUCCESS = 'FETCH_SEARCH_RECIPE_SUCCESS';
export const FETCH_SIMILAR_RECIPES = 'FETCH_SIMILAR_RECIPES';
export const FETCH_RECIPE_FAILURE = 'FETCH_RECIPE_FAILURE';
export const SET_CUISINE = 'SET_CUISINE';
export const LOG_USER_OUT = 'LOG_USER_OUT';


export const fetchBegin = () => ({
    type: 'FETCH_RECIPE_BEGIN'
})
export const fetchSuccess = data => ({
    type: 'FETCH_RECIPE_SUCCESS',
    payload: data
})
export const fetchSearchSuccess = data => ({
    type: 'FETCH_SEARCH_RECIPE_SUCCESS',
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




// Homepage fetch to populate landing page
export const fetchRandomRecipe = (currentData) => {
    console.log(currentData)
    return (dispatch) => {
        dispatch(fetchBegin())
        fetch(`https://api.spoonacular.com/recipes/random?number=20&apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                console.log(currentData.length)

                if (currentData.length > 1) {
                    const allIds = currentData.map(data => data.id)
                    console.log(allIds)
                    const newIds = data.recipes.map(x => x.id)
                    console.log(newIds)
                    const idCheck = allIds.filter(id => newIds.includes(id))
                    console.log(idCheck)


                    const newData = data.recipes.filter(recipe => recipe !== null && recipe?.image !== undefined && !idCheck.includes(recipe.id))
                    console.log(newData)
                    dispatch(fetchSuccess(newData))
                } else {
                    console.log(data.recipes)
                    dispatch(fetchSuccess(data.recipes))
                }



                // const arrayWithoutDuplicates = [...new Set(newData.map(recipe => recipe.id))]
                // console.log(arrayWithoutDuplicates)
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
}
//

// Search page actonCreator to fetch bulk information on specific recipes
export const searchRecipeQuery = query => {
    return (dispatch) => {
        dispatch(fetchBegin())

        // Initial fetch to get id's
        fetch(`https://api.spoonacular.com/recipes/complexSearch?&query=${query}&apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const ids = data.results.map(result => result.id)
                dispatch(searchRecipeDetails(ids))
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
}

// Fetch call for the bulk details for each search query && cuisine search
export const searchRecipeDetails = id => {
    return dispatch => {
        // Id's are passed to fetch bulk data
        fetch(`https://api.spoonacular.com/recipes/informationBulk?ids=${id}&apiKey=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                dispatch(fetchSearchSuccess(data))
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
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
export const searchCuisine = (cuisine, length) => {
    return dispatch => {
        dispatch(fetchBegin())
        // Initial fetch to get id's
        fetch(`https://api.spoonacular.com/recipes/complexSearch?&cuisine=${cuisine}&number=${length + 10}&apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const ids = data.results.map(result => result.id)
                dispatch(searchRecipeDetails(ids))
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



