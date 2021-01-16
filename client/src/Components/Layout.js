import React from 'react';
import { useHistory } from 'react-router-dom'
import Header from './Header/Header';

const PrivateLayout = (props) => {
    const history = useHistory();
    return (
        <div className="header-body">
            <Header history={history} />
            <div id="content">
                {props.children}
            </div>
        </div>
    );
}

export default PrivateLayout;