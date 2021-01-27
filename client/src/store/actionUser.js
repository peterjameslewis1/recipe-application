import axios from 'axios';
const API_KEY = process.env.REACT_APP_API_KEY;
export const FETCH_USER_BEGIN = 'FETCH_USER_BEGIN';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const SET_USER_ON_RELOAD = 'SET_USER_ON_RELOAD';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const LOG_USER_OUT = 'LOG_USER_OUT';
export const SET_USER_IMAGE = 'SET_USER_IMAGE';
export const SET_USER_FAVOURITES__DETAILS = 'SET_USER_FAVOURITES__DETAILS';
export const SET_USER_FAVOURITES__ID = 'SET_USER_FAVOURITES__ID';

export const fetchUserBegin = () => ({
    type: FETCH_USER_BEGIN,
})

export const fetchUserSuccess = data => ({
    type: FETCH_USER_SUCCESS,
    payload: data
})
export const setUserOnReload = data => ({
    type: SET_USER_ON_RELOAD,
    payload: data
})
export const setUserImage = data => ({
    type: SET_USER_IMAGE,
    payload: data
})
export const setUserFavourites = data => ({
    type: SET_USER_FAVOURITES__DETAILS,
    payload: data
})
export const setUserFavouriteId = data => ({
    type: SET_USER_FAVOURITES__ID,
    payload: data
})
export const fetchUserFailure = error => ({
    type: FETCH_USER_FAILURE,
    payload: error
})
export const logUserOut = () => ({
    type: LOG_USER_OUT
})


export const favouriveDetails = data => {
    return async dispatch => {
        axios({
            method: "GET",
            url: `https://api.spoonacular.com/recipes/informationBulk?ids=${data}&apiKey=${API_KEY}`,
        })
            .then(res => {
                dispatch(setUserFavourites(res.data))

            })
            .catch(err => {
                fetchUserFailure(err.data)
            })
    }
}



export const setFavouriteRecipe = data => {
    return async dispatch => {
        dispatch(fetchUserBegin())
        await axios({
            method: 'POST',
            url: '/api/addfaveourite',
            data: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => {
                dispatch(fetchUserSuccess(res.data))
            })
            .catch((err) => {
                fetchUserFailure(err.data)
            })
    }
}

export const deleteFavouriteRecipe = data => {
    return async dispatch => {
        axios({
            method: 'POST',
            url: '/api/deletefavourite',
            data: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .catch((err) => {
                fetchUserFailure(err.data)
            })
    }
}


export const newUserImage = data => {
    return async (dispatch) => {
        dispatch(fetchUserBegin())
        axios({
            method: 'POST',
            url: '/api/upload',
            data: data, // formData
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then(res => {
            return dispatch(fetchUserSuccess(res.data))
        }).catch(err => {
            return dispatch(fetchUserFailure(err.response.data))
        })
    }
}

export const userDetails = data => {
    return async (dispatch) => {
        dispatch(fetchUserBegin())
        await axios({
            method: 'POST',
            url: '/api/login',
            data: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => {
            async function setUser() {
                await dispatch(fetchUserSuccess(res.data))
                await dispatch(favouriveDetails(res.data.favourites))

            }
            setUser()
        }).catch(err => {
            dispatch(fetchUserFailure(err.response))
        })
    }
}


export const newUserDetails = data => {
    return dispatch => {
        dispatch(fetchUserBegin())
        axios({
            method: 'POST',
            url: `https://api.spoonacular.com/users/connect?apiKey=${API_KEY}`,
            data: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => {
            const userData = {
                ...data,
                ...res.data
            }
            axios({
                method: 'POST',
                url: '/api/register',
                data: JSON.stringify(userData),
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(res => {
                return dispatch(fetchUserSuccess(res.data))
            }).catch(err => {
                return dispatch(fetchUserFailure(err.response.data.message))
            })
        }).catch(err => {
            return dispatch(fetchUserFailure(err.response.data.message))
        })
    }
}


export const logOut = () => {
    return dispatch => {
        dispatch(fetchUserBegin())
        return dispatch(logUserOut())
    }
}

