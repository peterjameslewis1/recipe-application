import {
    FETCH_RECIPE_BEGIN,
    FETCH_RECIPE_SUCCESS,
    FETCH_RECIPE_FAILURE,
    FETCH_CUISINE_RECIPE_SUCCESS,
    SET_CUISINE,
    SET_QUERY,
    FETCH_SIMILAR_RECIPES,
    FETCH_QUERY_RECIPE_SUCCESS,
    REFRESH_RECIPES
} from '../actionFetch'

const initialState = {
    searchResults: [],
    data: [],
    loading: false,
    error: null,
    cuisine: '',
    query: '',
    similarRecipes: []
}


const recipeReducer = (state = initialState, action) => {
    console.log(action.type, action.payload)
    switch (action.type) {
        case SET_CUISINE:
            return {
                ...state,
                loading: false,
                error: null,
                cuisine: action.payload
            };
        case SET_QUERY:
            return {
                ...state,
                query: action.payload,
                loading: false,
                error: null,
                cuisine: ''
            }
        case FETCH_RECIPE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_RECIPE_SUCCESS:
            return {
                ...state,
                data: state.data.concat(action.payload),
                loading: false,
                error: null,
                fetchSuccess: true
            }
        case FETCH_CUISINE_RECIPE_SUCCESS:
            return {
                ...state,
                searchResults: action.payload,
                error: null,
                loading: false,
                fetchSuccess: true
            }
        case FETCH_QUERY_RECIPE_SUCCESS:
            return {
                ...state,
                searchResults: state.searchResults.concat(action.payload),
                error: null,
                loading: false,
                fetchSuccess: true
            }
        case FETCH_SIMILAR_RECIPES:
            return {
                ...state,
                similarRecipes: action.payload,
                loading: false,
                error: null
            }

        case FETCH_RECIPE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.message
            }
        case REFRESH_RECIPES:
            return {
                ...state,
                searchResults: action.payload,
                loading: true,
                error: null
            }
        default: return state;
    }
}

export default recipeReducer;