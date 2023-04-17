import React, { useState, useEffect, Component } from 'react';
import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import { useLocation } from "react-router-dom";
import AirBNB from './AirBNB';
import AirBNBFooter from './Footer';
import AirBNBHeader from './Header';
import "./css/hostPropertyCards.styles.css";

var CarouselComponent = (props) => {

  const [isHovering, setIsHovering] = useState(false);
  
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  var c = 1;
  
    return (
      <div id={"carouselExampleIndicators" + props.count} className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner" interval = "0">
        
          <div className="carousel-item  active card-img-wrapper">
        
          <img src={props.property.S3Image} className=" d-block w-100 rounded-lg" alt="..." />
            <div onMouseEnter={handleMouseOver}
              onMouseLeave={handleMouseOut}  className = {c += 1} ></div>
            <a href = "#"><i  className={isHovering ? 'fa fa-heart hearts nex' : 'fa fa-heart-o hearts nex'}/></a>
            
          </div>
          <div className="carousel-item card-img-wrapper">
              <img src={props.property.S3Image} className="d-block w-100 rounded-lg" alt="..." />
              <div onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}  className = {c += 1} ></div>
             
                <a href = "#"><i className={isHovering ? 'fa fa-heart hearts nex' : 'fa fa-heart-o hearts nex'}/></a>
                
          </div>
          <div className="carousel-item card-img-wrapper">
            <img src={props.property.S3Image}  className="d-block w-100 rounded-lg" alt="..." />
            <div onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}  className = {c += 1} ></div>
              
                <a href = "#"><i className={isHovering ? 'fa fa-heart hearts nex' : 'fa fa-heart-o hearts nex'}/></a>
                
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
  const navigate = useNavigate();
  const RemoveProperty = (pid) => {
    
    const url = process.env.REACT_APP_URL + "property/" + pid;
    const response = fetch(url, {
      method: 'DELETE'

    });
    navigate('/',{replace : true});
  }

  
  return (
    <div className="card border-0 col-lg-4 ">

      <CarouselComponent property = {props.property} count = {props.count}/>
         
      <div className="card-body px-0">
        <div className="d-flex justify-content-between">
        
          <h5 className="card-title">{props.property.location}</h5>
          <div className="rating d-flex align-items-center">
        
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fillRule="evenodd" /></svg>
            
            <span className="ps-2">{props.property.ratings}
            </span>
          </div>
        </div>
        <Link to = "/Detail" state = {props.property}><h6 className="location fw-normal text-black-50 text-capitalize">{props.property.title}</h6></Link>
        <h6 className="date fw-normal text-black-50 text-capitalize">{props.property.shortdescription}</h6>
        <p className="card-text fw-normal"><span className="fw-bold">{props.property.pricepernight}</span> night</p>
        
        <div className='buttons'> 
        {/* {showDetail && <button type="button" className = "show-more-less-button" onClick={() => { setShowButtonDetails(false); setHideButtonDetails(true) }}>See more</button> } */}
        <Link to = "/AddProperty" className="btn btn-warning" >Update</Link>
        <button className="btn btn-danger" onClick = {() => {RemoveProperty(props.property._id)}}>Remove</button>
        {!showDetail &&
          <>
            <p><strong>Cleaning Fees</strong>: {props.property.cleaningfee}</p>
            <p><strong>Service Fees</strong>: {props.property.servicefee}</p>
            <p><strong>Amenities</strong>: {props.property.amenities}</p>
            <p><strong>Bedrooms</strong>: {props.property.bedrooms}</p>
            <p>{props.property.description}</p>
          </>
        }
        
        {/* {hideDetail && <button type="button" className = "show-more-less-button" onClick={() => { setHideButtonDetails(false); setShowButtonDetails(true) }}>Show less</button>} */}
         </div> 
      </div>
      
    </div>
  );
}

const FilterPropertiesTable = (props) => {
  const propertyList = [];
  var cnt = 0;
  console.log(props);
  props.properties.forEach((property) => {
      // if ((props.isAvailable && !property.isAvailable) || ((property.title.toLowerCase().indexOf(props.filterValue) === -1) && (property.location.toLowerCase().indexOf(props.filterValue) === -1) && (property.title.indexOf(props.filterValue) === -1) && (property.location.indexOf(props.filterValue) === -1))) {
      //   return;
      // }
      if(property.isAvailable == false){
        return;
      }
      cnt += 1;
      console.log(cnt);
  
      propertyList.push(
        <PropertyRow
          property={property}
          key={property.location}
          count = {cnt}
        />
      );
  });

  return (
    <div className="row">{propertyList}
    </div>
  );
}

// export class SearchBox extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleAvailabilityChange = this.handleAvailabilityChange.bind(this);
//   }


//   handleAvailabilityChange(newValue) {
//     this.props.onAvailabilityChange(newValue.target.checked);
//   }

//   render() {
//     return (
//       <form>
//       </form>
//     );
//   }
// }

const PropertiesTable = (props) => {
  // const filterValue = props.searchTerm;
  const [isAvailable, setIsAvailable] = useState(false);

  const handleAvailabilityChange = (isAvailable) => {
    setIsAvailable(isAvailable);
  }
  return (
    <div>
      {/* <SearchBox
        filterValue={filterValue}
        isAvailable={isAvailable}
        onFilterValueChange={filterValue}
        onAvailabilityChange={handleAvailabilityChange}
      /> */}
      <FilterPropertiesTable
        properties={props.properties}
        // filterValue={filterValue}
        isAvailable={isAvailable}
      />
    </div>
  );
}

const AddProperty = () =>{
  return(
    <div>
      <form>
        Title: <input type = "text" name = "title"/>
        Location: <input type = "text" name = ""/>
        Description: <input type = "text" name = ""/>
        Price Per Night: <input type = "text" name = ""/>
        Cleaning Fee: <input type = "text" name = ""/>
        Service Fee: <input type = "text" name = ""/>
        Short Description: <input type = "text" name = ""/>
        Bedrooms: <input type = "text" name = ""/>
        Image Name: <input type = "text" name = ""/>

      </form>

    </div>
  );
}
function App() {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const url = process.env.REACT_APP_URL + "property";
    fetch(url)
      .then(resp => resp.json())
      .then(data => setProperties(data.data))
      .catch(err => console.error(err));
  }, []);
  console.log(properties);
  
  return (
    <main>
      <Link to = "/AddProperty" className="btn btn-success" >Add a new Property</Link>
     
      <PropertiesTable properties={properties}/>
    </main>
  );
}

export class Host extends Component {

  render() {
    return (
      <>
      <AirBNBHeader/>
      <div className="host-container">
        <App/>
      </div>
      <AirBNBFooter/>
      </>
    );
  }
}