import React from "react";

export default class SideMenu extends React.Component {

  state = {
    toggle: false,
   }

  onSideClick = (event) => {
    event.preventDefault();
    this.setState({ toggle: !this.state.toggle  })
  }


  onSideClose = (event) => {
    event.preventDefault();
    this.setState({ toggle: !this.state.toggle  })
  }

  render() {
    return (
      <div className="col-lg-2">
        <a href="#" className="d-block btn" style={{backgroundColor:"#cefad0", width:"100px", marginTop:"8px", marginLeft:"70px", border:"2px solid black"}}onClick={(event) => this.onSideClick(event)}>
            Menu
        </a>
        <div className={`side-bar-wrapper ${this.state.toggle ? 'left-0' : ''}`}>
          <button type="button" className="close" aria-label="Close" onClick={(event) => this.onSideClose(event)}>
             <span aria-hidden="true">&times;</span>
          </button>
          <ul className="nav flex-column">
            <li className="nav-item pb-4">
              <a className="nav-link active" href="#">
                <span data-feather="home" />
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">
                <span data-feather="home" />
                Lakefronts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="file" />
                Cabins
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="shopping-cart" />
                Farms
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="users" />
                Caves
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="bar-chart-2" />
                Campers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="layers" />
                Arctic
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="layers" />
                Tiny Homes
              </a>
            </li>
          </ul>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="file-text" />
                Islands
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="file-text" />
                Surfing
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="file-text" />
                Amazing Pools
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="file-text" />
                Design
              </a>
            </li>
          </ul>
        </div>
      </div>
      );
    }

}