import React from 'react';
import { Link } from 'react-router-dom'


const HomePanel = (props) => {


    return (
        <div className="results">

            <Link to={`/home/${props.title}`}>
                <div className="recipes panel-recipes">
                    <div className="recipie-card">
                        <div className="recipie-card-container">

                            <div className="recipie-card-container__img">
                                <img alt="" src={props.img} />
                            </div>



                            <div className="recipie-card-container__text">
                                <div className="recipie-card-container__text-title">
                                    <h2>{props.title} recipes</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}



export default HomePanel;
