import React from 'react';
import AirBNB from "./AirBNB.js";
import AirBNBFooter from './Footer.js';
import AirBNBHeader from './Header.js';
import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import Favorites  from "./favoritesView.js";


export default class LandingPage extends React.Component {
    state = {
        searchTerm: "",
    }
    
     
    handleCallback = (childData) => {
        this.setState({ searchTerm: childData })

    }

    navigateToFavorites = () =>{
        var navigate = useNavigate();
        navigate('Favorites');
    }
    render() {
        const { searchTerm } = this.state;
        return (
            <>
            
                <AirBNBHeader parentCallback={(childData) => this.handleCallback(childData)} searchTerm={searchTerm} />
                <AirBNB searchTerm={searchTerm} />
                <AirBNBFooter />
                
            </>
        );
    }
}