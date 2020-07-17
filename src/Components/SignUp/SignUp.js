import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
    const [username, setUsername] = useState('');

    const userHandler = e => {
        console.log(e.target.value)
        setUsername(e.target.value)
        console.log(username)
    }


    return (
        <div className="background-img">
            <div className="sign-up">
                <h1>Recipeasy</h1>
                <div className="sign-up-box">
                    <h2>Sign up</h2>
                    <form>
                        <input type="text" className="username" value={username} onChange={userHandler} />
                        {username > 6 ? <p>Valid username</p> : <p>Greater than 6 characters</p>}
                        <input type="text" className="password" />
                        {/* <button type="submit" /> */}
                    </form>
                </div>
                <Link to="/home"><button>Home</button></Link>
            </div>
        </div>
    )
}

export default SignUp;