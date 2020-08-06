import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');


    const userHandler = e => {
        setEmail(e.target.value)
    }
    const passHandler = e => {
        setPassword(e.target.value)
    }

    const accCreation = e => {

        if (email.length > 7 && password.length > 7) {
            setTimeout(() => {
                setErr('Account Created!')
            }, 2000);
        }
        else {
            setErr("Greater than 7 characters please!")
        }
        e.preventDefault();
    }






    return (
        <div className="background-img">
            <div className="sign-up">
                <h1>Recipeasy</h1>
                <div className="sign-up-box">
                    <h2>Sign up</h2>
                    <form>
                        <input type="email" className="email" value={email} onChange={userHandler} placeholder="Email" />
                        <input type="password" className="password" value={password} onChange={passHandler} placeholder="Password" />
                        <p className="err">{err}</p>
                        <a href="#" className="btn" onClick={accCreation}>Create</a>
                        <Link to="/recipe-app/home" className={err === 'Account Created!' ? 'btn' : 'continue'}>Continue</Link>
                        <Link to="/recipe-app/home" className="skip"><p>Skip</p></Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
