import React from 'react';
import { useHistory } from 'react-router-dom'
import Panel from './HomePanel';
import ImgVegetarian from './img/vegetarian.jpg';
import ImgSpicy from './img/spicy.jpg';
import ImgMeat from './img/meaty.jpg';
import ImgDessert from './img/dessert.jpg';


const Home = () => {
    let history = useHistory();
    return (
        <div className="home-panels">
            <div onClick={() => history.goBack()} className="back-btn">
                <div><i className="fas fa-chevron-left"></i>Back</div>
            </div>
            <Panel img={ImgVegetarian} title="Vegetarian" />
            <Panel img={ImgSpicy} title="Spicy" />
            <Panel img={ImgMeat} title="Meaty" />
            <Panel img={ImgDessert} title="Dessert" />
        </div>
    )
}



export default Home;
