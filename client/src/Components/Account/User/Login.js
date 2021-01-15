import React, { useState, useEffect } from 'react';
import { userDetails, favouriveDetails } from '../../../store/actionUser';
import { connect } from 'react-redux';
import { useHistory, withRouter } from "react-router-dom";

const Login = ({ userDetails, user, fetchData }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();


    const handleSubmit = async e => {
        e.preventDefault();
        await userDetails({ email, password })
        await fetchData(user.user.favourites)
        return history.push('/')
    }


    return (
        <form className="authentication" onSubmit={handleSubmit}>
            {/* <p>{user.error?.data?.type === 'login' ? user.error?.data?.message : 'Login'}</p> */}
            <input onChange={e => setEmail(e.target.value)} type="email" className="email" name="email" placeholder="Email address" required />
            <input onChange={e => setPassword(e.target.value)} type="password" name="password" className="password" placeholder="Password" required />
            <button type="submit" className="submit">Login<i className="fas fa-arrow-right"></i>}
            </button>
        </form>
    )
}

// const mapStateToProps = state => {
//     return {
//         user: state.user,
//     }
// }

const mapDispatchToProps = dispatch => {
    return {
        userDetails: user => dispatch(userDetails(user)),
        fetchData: id => dispatch(favouriveDetails(id))

    }
}
export default withRouter(connect(null, mapDispatchToProps)(Login));