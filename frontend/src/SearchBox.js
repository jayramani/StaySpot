import React from "react";
import "./css/SearchBox.styles.css"

export default class SearchBox extends React.Component {
  constructor(props){
    super(props);
  }
  onTrigger = (event) => {
    this.props.parentCallback(event.target.value);
  }

  render() {
    return (

      <div className="search">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            onChange={(event) => this.onTrigger(event)}
          />
      </div>    
       
    );
  }
}