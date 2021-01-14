import { combineReducers } from 'redux';
import userReducer from './userReducer';
import recipeReducer from './recipeReducer';

const reducer = combineReducers({
    recipe: recipeReducer,
    user: userReducer
})
export default reducer;
