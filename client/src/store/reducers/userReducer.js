import { FETCH_USER_BEGIN, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, LOG_USER_OUT, SET_USER_ON_RELOAD, SET_USER_IMAGE, SET_USER_FAVOURITES__DETAILS, SET_USER_FAVOURITES__ID } from '../actionUser';

const initialState = {
    user: {
        favouritesDetails: []
    },
    loading: false,
    error: null,
    loggedIn: false,
    loggedOut: true,
    image: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_BEGIN:
            return {
                ...state,
                loading: true,
            }
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: null,
                loading: false,
                loggedIn: true,
                loggedOut: false,
            }
        case SET_USER_FAVOURITES__DETAILS:
            return {
                ...state,
                user: {
                    ...state.user,
                    favouritesDetails: action.payload
                }
            }
        case SET_USER_FAVOURITES__ID:
            return {
                ...state,
                user: {
                    ...state.user,
                    favourites: action.payload
                }
            }
        case SET_USER_ON_RELOAD:
            return {
                ...state,
                user: action.payload.user,
                error: action.payload.error,
                loading: action.payload.loading,
                loggedIn: action.payload.loggedIn
            }
        // case SET_USER_IMAGE:
        //     return {
        //         ...state,
        //         image: {
        //             fileName: action.payload.fileName,
        //             filePath: action.payload.filePath
        //         }
        //     }
        case FETCH_USER_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                loggedIn: false
            }
        case LOG_USER_OUT:
            return {
                ...state,
                user: {},
                error: null,
                loading: false,
                loggedIn: false,
                loggedOut: true,
                image: {}
            }
        default: return state;
    }
}

export default userReducer;