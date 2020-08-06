import React from 'react';
import AutoComplete from '../autoComplete/autoComplete';
import { Link } from 'react-router-dom'

const Header = (props) => {


    return (
        <div className="header">
            <div className="header-container container">
                <div className="header-container-main">
                    <div className="header-container-main-location">
                        <h3><Link to="/recipe-app">Recipeasy</Link></h3>
                        <div onClick={props.clicked} className="search"><i className="fas fa-search"></i></div>
                    </div>
                </div>

                <div className={props.state ? 'active' : "header-container-main-input"}>
                    <AutoComplete />
                </div>
            </div>
        </div>
    )
}


export default Header;
