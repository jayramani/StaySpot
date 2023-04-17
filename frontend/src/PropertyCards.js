import React, { useState, useEffect } from 'react';
import { getAllProperties, getProperty, createProperty } from './services/PropertyService';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import {Buffer} from 'buffer';
import "./css/PropertyCards.styles.css";

var CarouselComponent = (props) => {

 
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  var c = 1;
  // "./img/" + c * Number(props.property.imageName.substring(0,1)) + ".jfif"
  return (
    <div id={"carouselExampleIndicators" + props.count} className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner" interval="0">

        <div className="carousel-item  active card-img-wrapper">

          <img src={props.property.S3Image} className=" d-block w-100 rounded-lg" alt="..." />

          {/* <img src={"./img/" + c * Number(props.property.imageName.substring(0,1)) + ".jfif"} className=" d-block w-100 rounded-lg" alt="..." /> */}
          <div onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseOut} className={c += 1} ></div>
          <a href="#"><i className={isHovering ? 'fa fa-heart hearts nex' : 'fa fa-heart-o hearts nex'} /></a>

        </div>
        <div className="carousel-item card-img-wrapper">
          <img src={props.property.S3Image} className=" d-block w-100 rounded-lg" alt="..." />

          {/* <img src={"./img/" + c * Number(props.property.imageName.substring(0,1)) + ".jfif"} className="d-block w-100 rounded-lg" alt="..." /> */}
          <div onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut} className={c += 1} ></div>

          <a href="#"><i className={isHovering ? 'fa fa-heart hearts nex' : 'fa fa-heart-o hearts nex'} /></a>

        </div>
        <div className="carousel-item card-img-wrapper">
          <img src={props.property.S3Image} className=" d-block w-100 rounded-lg" alt="..." />

          {/* <img src={"./img/" + c * Number(props.property.imageName.substring(0,1)) + ".jfif"} className="d-block w-100 rounded-lg" alt="..." /> */}
          <div onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut} className={c += 1} ></div>

          <a href="#"><i className={isHovering ? 'fa fa-heart hearts nex' : 'fa fa-heart-o hearts nex'} /></a>

        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target={"#carouselExampleIndicators" + props.count} data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target={"#carouselExampleIndicators" + props.count} data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>

  );
}

const PropertyRow = (props) => {

  const [showDetail, setShowButtonDetails] = useState(true);
  const [hideDetail, setHideButtonDetails] = useState(false);
  // const [propertyId, setPropertyId] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const removeFromFavoritesList = (propertyId) => {
    const url = process.env.REACT_APP_URL + "favourite/" + propertyId;
    const response = fetch(url, {
      method: 'DELETE',
      headers: { Authorization: localStorage.getItem("authToken")}
    });
    window.location.reload(false);
  }
  const Unavailable = (props) => {
    console.log(props);
    if(props.props == false){
      
      return (
        <h6>Unavailable</h6>
      );
    }
    return (
      <h6></h6>
    );
  }
  const addToFavoritesList = (propertyId) => {

    const url = process.env.REACT_APP_URL + "favourite/";
    console.log("propertyId=======>",propertyId);
    let obj = {
      "propertyId": propertyId
    };
    const response = fetch(url, {
      method: 'POST',
      headers: { Authorization: localStorage.getItem("authToken"),
      'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    });
    window.location.reload(false);
  };
  console.log(props);


  return (
    <div className="card border-0 col-lg-4 ">

      <CarouselComponent property={props.property} count={props.count}/>

      <div className="card-body px-0">

        
        <div className="property-name">

          <div className="property-location">{props.property.location}</div>
          {/* <Unavailable props = {props.property.isAvailable}/> */}
          <div className="rating d-flex align-items-center">

            <button type="button" className="favourite-button" onClick={() => { props.isFavorite ? removeFromFavoritesList(props.property._id) : addToFavoritesList(props.property._id) }}><i onMouseEnter={handleMouseOver}
              onMouseLeave={handleMouseOut} className={isHovering || props.isFavorite ? 'fa fa-heart hearts nex2' : 'fa fa-heart-o hearts nex2'} /></button>
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fillRule="evenodd" /></svg>

            <span className="ps-2">{props.property.ratings}
            </span>
          </div>
        </div>


        <Link to="/Detail" state={props.property}><h6 className="location fw-normal text-black-50 text-capitalize">{props.property.title}</h6></Link>
        {/* <h6 className="date fw-normal text-black-50 text-capitalize">{props.property.shortdescription}</h6> */}
        <div className="price"><span>${props.property.pricepernight}</span> /night</div>


        {showDetail && <button type="button" className="show-more-less-button" onClick={() => { setShowButtonDetails(false); setHideButtonDetails(true) }}>See more</button>}
        {/* <button type="button" className="btn btn-primary-outline" onClick={() => { addToFavoritesList(props.property._id); }}>Favorite</button> */}
        {!showDetail &&
          <>
            <p><strong>Cleaning Fees</strong>: {props.property.cleaningfee}</p>
            <p><strong>Service Fees</strong>: {props.property.servicefee}</p>
            <p><strong>Amenities</strong>: {props.property.amenities}</p>
            <p><strong>Bedrooms</strong>: {props.property.bedrooms}</p>
            <p>{props.property.description}</p>
          </>
        }

        {hideDetail && <button id = {props.count}type="button" className="show-more-less-button" onClick={() => { setHideButtonDetails(false); setShowButtonDetails(true) }}>See less</button>}

      </div>

    </div>
  );
}


// async function getImage(imageName) {

//   console.log(process.env.REACT_APP_URL);
//   const url = process.env.REACT_APP_URL + "property/image/" + "house.jpeg";
//   console.log(url);
//   const response = await fetch(url, {
//     method: 'GET',
//     headers: {'Content-Type': "multipart/form-data"}
//     })
//     .catch(err => console.error(err));
//   var data = await response;
//   console.log("ssss",response);
//   let srcValue = response.url;
//   console.log(srcValue);
//   return srcValue;
// }

const FilterPropertiesTable = (props) => {
  var isFavorite = false;
  const propertyList = [];
  var cnt = 0;
  var storeFavorite = "";
  props.properties.forEach((property) => {
    if (((property.title.toLowerCase().indexOf(props.filterValue) === -1) && (property.location.toLowerCase().indexOf(props.filterValue) === -1) && (property.title.indexOf(props.filterValue) === -1) && (property.location.indexOf(props.filterValue) === -1))) {
      return;
    }
    // var imageName = getImage(property.imageName);
    cnt += 1;
    console.log(cnt);
   
    // var response = getFavoritesList();
    props.favorites.forEach((response) => {
      // console.log(JSON.stringify(response.property_id));
      // console.log(JSON.stringify(property._id));
      if (response.property_id == property._id) {
        isFavorite = true;
        storeFavorite = response._id;
      }
    });
    console.log(isFavorite);
    propertyList.push(
      <PropertyRow
        property={property}
        key={property.location}
        count={cnt}
        isFavorite={isFavorite}
        favorite_id={storeFavorite}
      />
    );
    if (isFavorite == true) {
      isFavorite = false;
    }
  });

  return (
    <div className="row">{propertyList}
    </div>
  );
}

export class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleAvailabilityChange = this.handleAvailabilityChange.bind(this);
  }

  handleAvailabilityChange(newValue) {
    this.props.onAvailabilityChange(newValue.target.checked);
  }

  render() {
    return (
      <form>
      </form>
    );
  }
}



const PropertiesTable = (props) => {
  const filterValue = props.searchTerm;
  console.log(filterValue);
  const [isAvailable, setIsAvailable] = useState(false);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    // const url = "http://localhost:3081/favorites";
    // const url = "http://localhost:3081/favorites";
    const url = process.env.REACT_APP_URL + "user/favourite";

    fetch(url, {
      method: "GET",
      headers: { Authorization: localStorage.getItem("authToken") }
    })
      .then(resp => resp.json())
      .then(data => setFavorites(data.data))
      .catch(err => console.error(err));
  }, []);
  console.log(favorites);

  const handleAvailabilityChange = (isAvailable) => {
    setIsAvailable(isAvailable);
  }
  return (
    <div>
      <SearchBox
        filterValue={filterValue}
        isAvailable={isAvailable}
        onFilterValueChange={filterValue}
        onAvailabilityChange={handleAvailabilityChange}
      />
      <FilterPropertiesTable
        properties={props.properties}
        favorites={favorites}
        filterValue={filterValue}
        isAvailable={isAvailable}
      />
    </div>
  );
}

const App = (props) => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const url = process.env.REACT_APP_URL + "property";
    console.log(url);
    fetch(url)
      .then(resp => resp.json())
      .then(data => setProperties(data.data))
      .catch(err => console.error(err));
  }, []);

  console.log("user_id is")
  console.log(localStorage.getItem("user_id"));
  console.log("properties=====>", properties);

  return (
    <main>
      <PropertiesTable searchTerm={props.searchTerm} properties={properties} />
    </main>
  );
}
export class PropertyCards extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="hotelCardsWrapper pt-5">
        <App searchTerm={this.props.searchTerm} />
      </div>
    );
  }
}