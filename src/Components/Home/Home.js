import React, { useEffect } from 'react';
import Panel from './HomePanel';
import ImgVegetarian from './img/vegetarian.jpg';
import ImgSpicy from './img/spicy.jpg';
import ImgMeat from './img/meaty.jpg';
import ImgDessert from './img/dessert.jpg';

const Home = () => {


    return (
        <div className="home-panels">
            <Panel img={ImgVegetarian} title="Vegetarian" />
            <Panel img={ImgSpicy} title="Spicy" />
            <Panel img={ImgMeat} title="Meaty" />
            <Panel img={ImgDessert} title="Dessert" />
        </div>
    )
}



export default Home;
