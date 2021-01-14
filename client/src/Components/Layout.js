import React from 'react';
import Header from './Header/Header';

const Layout = (props) => {
    return (
        <div className="header-body">
            <Header />
            <div id="content">
                {props.children}
            </div>
        </div>
    );
}

export default Layout;