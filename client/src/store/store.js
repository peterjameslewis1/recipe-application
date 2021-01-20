import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import userReducer from '../store/reducers/userReducer'
import recipeReducer from '../store/reducers/recipeReducer'
import thunk from 'redux-thunk';


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__


const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    recipe: recipeReducer,
    user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);




export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
);
export const persistor = persistStore(store);



