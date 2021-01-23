import React from 'react';
import { useHistory } from 'react-router-dom'
import Register from './User/Register'
import Login from './User/Login';
import { connect } from 'react-redux'






const Account = ({ user }) => {
    const history = useHistory();

    return (
        <div className="account container">
            <div className="account__user-info">
                <div className="back-btn" onClick={() => history.goBack()}><i className="fas fa-arrow-left"></i></div>
            </div>
            <h2>Sign up</h2>
            <Register user={user} />
            <Login user={user} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(Account);