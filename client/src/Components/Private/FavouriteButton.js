import React from 'react';
import { setFavouriteRecipe, deleteFavouriteRecipe } from '../../store/actionUser';
import { connect } from 'react-redux'
import { setUserFavourites, userDetails, setUserFavouriteId } from '../../store/actionUser'

const AddFavButton = ({ setFavourite, deleteFavourite, user, id, setUserFavourites, setUser, setUserFavouritesId }) => {

    const includes = user.user.favourites.includes(id);

    const deleteOne = async id => {
        const includesDetails = await user.user.favouritesDetails.filter(fav => fav.id !== id)
        const includesFav = await user.user.favourites.filter(fav => fav !== id)
        await setUserFavourites(includesDetails)
        await setUserFavouritesId(includesFav)
    }


    return (
        <div className="favourite-button">
            {
                includes
                    ?
                    <i onClick={() => {
                        deleteOne(id)
                        deleteFavourite({ email: user.user.email, id: id })
                    }} className="fas fa-trash-alt favourite"></i>
                    :
                    <i onClick={() => setFavourite({ email: user.user.email, id: id })} className="far fa-heart favourite"></i>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setFavourite: id => dispatch(setFavouriteRecipe(id)),
        deleteFavourite: id => dispatch(deleteFavouriteRecipe(id)),
        setUserFavourites: (data) => dispatch(setUserFavourites(data)),
        setUserFavouritesId: (data) => dispatch(setUserFavouriteId(data)),
        setUser: (user) => dispatch(userDetails(user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddFavButton);