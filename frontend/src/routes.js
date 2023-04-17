
import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

import Detail from "./detail.js";
import LandingPage from "./landing.js";
import Favorites  from "./favoritesView.js";
import {Host}  from "./hostPropertyCards.js";
import AddProperty from "./AddProperty.js";
import Login from "./Login.js";
import NewSignUp from "./NewSignUp.js";
import { MyReservations } from "./MyReservations.js";
import UpdateProperty from "./UpdateProperty.js";

export default class Routesy extends Component {
    render() {
        return (
            
                <Routes>

                    <Route exact path="/" element={<LandingPage/>} />
                    <Route path="/Favorites" element={<Favorites/>} />
                    <Route path="/Detail" element = {<Detail/>}/>
                    <Route path="/Host" element = {<Host/>}/>
                    <Route path="/AddProperty" element = {<AddProperty/>}/>
                    <Route path="/UpdateProperty" element = {<UpdateProperty/>}/>
                    {/* <Route path="/RemoveProperty" element = {<RemoveProperty/>}/> */}
                    <Route path="/Login" element = {<Login/>}/>
                    <Route path="/SignUp" element = {<NewSignUp/>}/>
                    <Route path="/Reservations" element = {<MyReservations/>}/>
                </Routes>
        )
    }
}