import React from 'react';
import { logOut } from '../../../store/actionUser';
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'



const LogOut = ({ logOut, user }) => {
    const history = useHistory();

    const handleLogOut = async e => {
        e.preventDefault();
        await logOut()
        await localStorage.clear();
        return history.push('/')
    }
    return (
        <div className="auth-btn">
            <button className='btn-login' onClick={handleLogOut}>Log out</button>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        user: state.user,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(logOut())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogOut);