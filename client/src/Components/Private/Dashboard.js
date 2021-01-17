import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import profileImg from '../../img/profile-icon-9.png'


import UserLogo from '../Account/User/UserImageUpload';
import LogOut from '../Account/User/LogOut';

const DashBoard = ({ user }) => {
    const history = useHistory();
    const [image, setImage] = useState(false);


    return (
        <div className="dashboard container">
            <div className="account__user-info">
                <div className="back-btn" onClick={() => history.goBack()}><i className="fas fa-arrow-left"></i></div>
                <div className="account__user-info__logo" onClick={() => setImage(!image)} >{user.image?.filePath ? <img src={user.image.fileName ? user.image.filePath : profileImg} alt="profile image" /> : <i className="fas fa-cloud-upload-alt"></i>}</div>
            </div>
            {image ? <UserLogo /> : null}

            <h2 className="dashboard-name">{user.user.name}</h2>

            <Link className="favourites-btn" to="/favourites"><button>Favourites</button></Link>
            <LogOut />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}


export default connect(mapStateToProps)(DashBoard);