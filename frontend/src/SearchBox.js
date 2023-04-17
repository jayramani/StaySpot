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
      // <div className="col-md-8">
      //   <span className="d-flex align-items-center">
      <div className="search">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            onChange={(event) => this.onTrigger(event)}

            // style={{width:"50%"}}
          />
      </div>    
          // &nbsp;
          // &nbsp;
          /* <div className="icon-wrapper">
            <i className="search-icon fa fa-search" style={{ fontSize: '24px' }} />
          </div> */
      //   </span>
      // </div>
    );
  }
}