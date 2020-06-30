import React from 'react';
import AutoComplete from '../autoComplete/autoComplete';
import { Link } from 'react-router-dom'

const Header = (props) => {






    return (
        <div className="header">
            <div className="header-container container">
                <div className="header-container-main">
                    <div className="header-container-main-location">
                        <div className="menu"><i class="fas fa-bars"></i></div>
                       
                        <h3><Link to="/">Home</Link></h3>
                       
                        <div onClick={props.clicked} className="search"><i class="fas fa-search"></i></div>
                        </div>
                </div>

                <div className={ props.state ? 'active' : "header-container-main-input"}>
                    {/* <input type="text" Placeholder="Search..."/> */}
                    <AutoComplete />
                </div>
            </div>
        </div>
    )
}


export default Header;