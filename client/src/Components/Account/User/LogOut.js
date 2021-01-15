import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import { logOut } from '../../../store/actionUser';
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'



const LogOut = ({ logOut, user }) => {
    const history = useHistory();

    const override = css`
  display: block;
  border-color: white;
  border: 1px solid;
    `;

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