import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { newUserDetails } from '../../../store/actionUser';

import { useHistory } from "react-router-dom";



const Register = ({ createUser, user }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();

    useEffect(() => {
        if (user.loggedIn) {
            return history.push('/')
        }
    }, [user.loggedIn, history])


    const handleSubmit = async e => {
        e.preventDefault();
        await createUser({ name, email, password })
    }

    return (
        <form className="authentication" onSubmit={handleSubmit}>
            <p>{user.error?.data?.type === 'register' ? user.error.data.message : 'Register'}</p>
            <input onChange={e => setName(e.target.value)} type="text" name="Full name" className="name" placeholder="Full name" required />
            <input onChange={e => setEmail(e.target.value)} type="email" name="email" className="email" placeholder="Email address" required />
            <input onChange={e => setPassword(e.target.value)} type="password" name="password" className="password" placeholder="Password" required />
            <button type="submit" className="submit">Create account<i className="fas fa-arrow-right"></i></button>
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
        createUser: user => dispatch(newUserDetails(user))
    }
}
export default connect(null, mapDispatchToProps)(Register);