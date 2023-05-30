import React from "react";
import { PropertyCards } from "./PropertyCards";
// import SideMenu from "./SideMenu.js";
import "./css/AirBNB.styles.css";

class MainContent extends React.Component {
  render() {
    return (<>

      <div class="hero-content">
    
       <h1 class="hero-title">
            BOOK YOUR STAY
       </h1>
         
       <h2 class="hero-subtitle">
            Destination | Luxury | Despite
       </h2>
    
    </div>
      </>
    );
  }
}

export default class AirBNB extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <section>
          <div className="main-container">
            <div className="row">
              
                <MainContent />
                <PropertyCards searchTerm={this.props.searchTerm} />
              
            </div>
          </div>
        </section>
      </div>
    );
  }
}



