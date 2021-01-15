import {
    FETCH_RECIPE_BEGIN,
    FETCH_RECIPE_SUCCESS,
    FETCH_RECIPE_FAILURE,
    FETCH_SEARCH_RECIPE_SUCCESS,
    SET_CUISINE,
    FETCH_SIMILAR_RECIPES,
    LOG_USER_OUT
} from '../actionFetch'

const initialState = {
    searchResults: [],
    data: [],
    loading: false,
    error: null,
    cuisine: '',
    similarRecipes: []
}


const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CUISINE:
            return {
                ...state,
                loading: false,
                error: null,
                cuisine: action.payload
            };

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
                searchResults: [],
                loading: false,
                error: null,
                fetchSuccess: true
            }
        case FETCH_SEARCH_RECIPE_SUCCESS:
            return {
                ...state,
                searchResults: action.payload,
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
        default: return state;
    }
}

export default recipeReducer;