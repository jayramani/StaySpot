import React, { Component, useState } from "react";
import SearchBox from './SearchBox.js';
import {Navbar, Nav} from 'react-bootstrap';
import { Dropdown} from 'react-bootstrap';
import { FaUserCircle } from "react-icons/fa";
import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import "./css/Header.styles.css";

const Login = () => {
  if(localStorage.getItem("authToken")=== ""){
    return(
      <div className="nav-link">
        <div className="signup">
          <Link to = "/SignUp">Sign Up</Link>
        </div>
        <div className="login">  
          <Link to = "/Login" >Login</Link>
        </div>  
      </div>
      );
  }
  return(<></>);
}

const Logout = () => {
  const navigate = useNavigate();
    const onLogOut = () => {
      localStorage.setItem("authToken", "");
      navigate("/");
      window.location.reload(false);
    }
  if(localStorage.getItem("authToken")!= ""){
    console.log(localStorage.getItem("userType"));
    if(localStorage.getItem("userType")=="host"){
      return(
        <Dropdown style={{marginLeft:"150px"}}>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
            <FaUserCircle style={{color:'white', marginRight:"10px", width:"35px"}}/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Link to = "/Host"><Dropdown.Item href="#/action-1">My Properties</Dropdown.Item></Link>

            <button onClick = {onLogOut}><Dropdown.Item href="#/action-2">Logout</Dropdown.Item></button>
            </Dropdown.Menu>
                    
        </Dropdown>
        );
    }
    else{
    return(
      <>
      <Dropdown style={{marginLeft:"50px"}}>
          <Dropdown.Toggle variant="white" id="dropdown-basic">
          <FaUserCircle style={{color:'white', marginRight:"10px", width:"35px"}}/>
          </Dropdown.Toggle>
          <Dropdown.Menu classNaame = "menu">
          <Link to = "/Reservations"><Dropdown.Item className="dropdown-item" href="#/action-1">My Reservations</Dropdown.Item></Link>
           <Link to = "/Favorites"><Dropdown.Item className="dropdown-item" href="#/action-2">Favorites</Dropdown.Item></Link>
           <button onClick = {onLogOut}><Dropdown.Item className="dropdown-item" href="#/action-3">Logout</Dropdown.Item></button>
           </Dropdown.Menu>
                  
       </Dropdown>		
      </>
      );
    }
  }
  return(<></>);
}

export default class AirBNBHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  handleCallback = (childData) => {
    this.props.parentCallback(childData);
  }
  render() {

    return (
      <>
      <div className="navbar">
          <div className="start">
            <Link to="/">
								<span className="first-half-logo">Stay</span>
								<span className="second-half-logo">Spot</span>
						</Link>
          </div>
          <div className="middle">
            <SearchBox className="search" parentCallback={(childData) => this.handleCallback(childData)} />
          </div>
          <div className="end">
            <div>
              <Login/>
            </div>  
            <div>
              <Logout/>
            </div> 
          </div>
      </div>
      </>
    )
  }
}