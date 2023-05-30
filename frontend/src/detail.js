import React, { Component, useState } from "react";
import AirBNBFooter from './Footer.js';
import AirBNBHeader from './Header.js';
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from 'react-date-picker';
import {Form, Button, Table} from "react-bootstrap";
import {  useEffect } from "react";
import "./css/Details.styles.css"


const addReview = (values) =>{
    console.log(values);
    const url = process.env.REACT_APP_URL + "property/review";
    const response = fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
      Authorization: localStorage.getItem("authToken")},
      body: JSON.stringify({	
                                "properties_id": values.pid,
                                "feedBack_description": values.feedback,
                                "user_rating": values.rating})

    });
   
}
const ReviewRow = (props) => {

    const navigate = useNavigate();
    
    console.log(props.review._id);
    return(
    <tr>
        <td>{props.review.user_id.firstName}</td>
        <td>{props.review.feedBack_description}</td>
        <td>{props.review.user_rating}</td>
  </tr>
  );
  }
  
  const ReviewsTable = (props) => {
    const propertyList = [];
    var cnt = 0;
    console.log(props);
    props.reviews.forEach((property) => {
        // if ((props.isAvailable && !property.isAvailable) || ((property.title.toLowerCase().indexOf(props.filterValue) === -1) && (property.location.toLowerCase().indexOf(props.filterValue) === -1) && (property.title.indexOf(props.filterValue) === -1) && (property.location.indexOf(props.filterValue) === -1))) {
        //   return;
        // }
        cnt += 1;
        console.log(cnt);
        console.log("hereee", property);
            propertyList.push(
              <ReviewRow
                review={property}
                count = {cnt}
              />
            );
    });
  
    return (
      <tbody>{propertyList}</tbody>
    );
  }

const GetReviews = (values) =>{
  const [reviews, setReviews] = useState([]);
  console.log(values);
  useEffect(() => {
    const url = process.env.REACT_APP_URL + "property/review/" + values.values;
    fetch(url)
      .then(resp => resp.json())
      .then(data => setReviews(data.data))
      .catch(err => console.error(err));
  }, []);
  console.log(reviews);
  
  return (
    <main>
      {/* <Link to = "/AddProperty" className="btn btn-success" >Add a new Property</Link> */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Review</th>
            <th>Rating</th>
          </tr>
          
        </thead>
      <ReviewsTable reviews={reviews}/>
      </Table>
    </main>
  );
   
}
function Property(){
    const [count, setCount] = useState(0); // useState returns a pair. 'count' is the current state. 'setCount' is a function we can use to update the state.
    const navigate = useNavigate()
    function increment() {
        //setCount(prevCount => prevCount+=1);
        setCount(function (prevCount) {
        return (prevCount += 1);
        });
    }

    function decrement() {
        setCount(function (prevCount) {
        if (prevCount > 0) {
            return (prevCount -= 1); 
        } else {
            return (prevCount = 0);
        }
        });
    }

    async function addToReservations (property, no_of_guests, check_in_date,check_out_date, total_amount, isAvailable){
        if(isAvailable == false){
            var message = "Sorry, the property is unavailable and cannot be reserved!";
            alert(message);
            return;
        }
        const url = process.env.REACT_APP_URL + "user/reservations";
        console.log("=========",localStorage.getItem("authToken"));
        const response = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json',
                    Authorization: localStorage.getItem("authToken")},
          body: JSON.stringify({
                                property_id : property._id,
                                price_per_night: property.pricepernight,
                                check_in_date: check_in_date,
                                check_out_date: check_out_date,
                                no_of_guests: no_of_guests,
                                total_amount: '$' + total_amount.toString()
                                })
        });
        console.log(response);
        if(response.status == "201"){
            navigate('/Reservations',{replace : true});
        }
      }
    const location = useLocation()
    const property = location.state 
    const initialValues = {pid: property._id, feedback: "", rating:"", date: new Date().getTime()};
    const [formValues, setFormValues] = useState(initialValues);
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      };
      console.log(property);
    var pricepernight = Number(property.pricepernight.substring(1))*5;
    var cleaningfee = Number(property.cleaningfee.substring(1));
    var servicefee = Number(property.servicefee.substring(1));
    var totalPrice = cleaningfee + servicefee + pricepernight;
    var isAvailable = property.isAvailable;
    const [CheckIn, onInChange] = useState(new Date());
    const [CheckOut, onOutChange] = useState(new Date());
    return (
        <section className="my-5">
            <div className="details-container">
        {/* Image Section */}
        <div className="row">
            <div className="col-lg-7">
                <img src={property.S3Image} className="w-100"
                />
            </div>
         
        </div>
          {/* Description Section */}
        <div className="bottom-wrap my-5">
                            <div className="row">
                                <div className="col-12 col-lg-6">
                                <p><strong>Title: </strong>{property.title}</p>
                                <p><strong>Cleaning Fees: </strong>{property.cleaningfee}</p>
                                <p><strong>Service Fees: </strong>{property.servicefee}</p>
                                <p><strong>Amenities: </strong>{property.description}</p>
                                <p><strong>Bedrooms: </strong>{property.bedrooms}</p>
                                </div>
                                <div className="col-12 col-lg-5">
                                    <div className="border bottom-right-wrap ms-lg-5 px-4 py-5 shadow">
                                        <div className="bottom-right-box d-flex flex-column">
                                            <div className="align-items-center d-flex justify-content-between mb-2">
                                                <span className="fs-4"><strong>{property.pricepernight}</strong> night</span>
                                            </div>
                                            <div className="dates">
                                                <div className="px-4 w-100 py-3 border d-flex flex-column">
                                                    <span className="fs-12 text-utotalPriceercase text-center fw-medium">CheckIn</span>
                                                    <span className="text-center"><DatePicker onChange={onInChange} value={CheckIn} /></span>
                                                </div>
                                                <div className="px-4 w-100 py-3 border d-flex flex-column">
                                                    <span className="fs-12 text-utotalPriceercase text-center fw-medium">Checkout</span>
                                                    <span className="text-center"><DatePicker onChange={onOutChange} value={CheckOut} /></span>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column border p-2 text-center">
                                                <span className="text-uppercase fs-12 mb-1">
                                                    Guests
                                                </span>
                                                <span className="counter">
                                                  <button className="inc-btn" onClick={increment}>+</button>
                                                  <span className="text-capitalize">{count.toString()}</span>     
                                                  <button className="inc-btn" onClick={decrement}>-</button>
                                                </span>
                                            </div>
                                        
                                            <button className="btn btn-primary mt-4" onClick = {() => addToReservations(property, count, CheckIn, CheckOut, totalPrice, isAvailable)}>Reserve</button>
                                       
                                            <div className="btn">
                                                <span>You won't be charged yet</span>
                                            </div>
                                            <div className="border-bottom mt-3">
                                                <div className="d-flex justify-content-between">
                                                    <span>{property.pricepernight}x5 nights</span>
                                                    <span>{'$' + pricepernight}</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span>Cleaning Fee</span>
                                                    <span>{property.cleaningfee}</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span>Service Fee</span>
                                                    <span>{property.servicefee}</span>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between mt-2">
                                                <span>Total Before Taxes</span>
                                                <span>{'$' + (totalPrice).toString() }</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{marginTop:"100px", marginLeft:"100px"}}>
              
              <div className="review-container">
                <div className="bottom-right-box d-flex flex-column">
                  <div className="align-items-center d-flex justify-content-between mb-2">

                    
                    <div style={{width:"100%"}}>
                      <h3>Reviews</h3>
                    </div>
                    
                    </div>
                    <h4>Existing Reviews</h4>
                    <GetReviews values = {property._id}/>   

                     <h4>Give a Review</h4>              
        <form>
    
          <Form.Group controlId="formBasicEmail">
                      <Form.Label style={{ marginTop:"15px", fontSize:"20px"}}>First Name</Form.Label>
                       <Form.Control name = "feedback" style={{width:"75%", height:"100px"}} className='InputLogin' type="text" placeholder="Write Your Reviews..." onChange={(e) =>{handleChange(e);}} />
                    </Form.Group>
                                 
                    <Form.Group  controlId="formBasicEmail">
            
                      <Form.Label style={{ marginTop:"15px", fontSize:"20px"}}>Rate This Property</Form.Label>
                        <Form.Select name = "rating" style={{width:"75%"}} onChange={(e) =>{handleChange(e);}}>
                          <option >Select rating out of 5</option>
                          <option value="1">1 Highly Dissatisfied</option>
                          <option value="2">2 Disstatisfied</option>
                          <option value="3">3 Neutral</option>
                          <option value="4">4 Satisfied</option>
                          <option value="5">5 Highly Satisfied</option>
                        </Form.Select>       
                    </Form.Group>                    
              
                

                  <Button style={{backgroundColor:"#15BAEB",width:"100px", height:"40px",fontSize:"20px", marginTop:"50px"}}  onClick={() => addReview(formValues)}>
                      Submit
                  </Button>
        </form>
      </div>
    </div>
  </div>

        </div>
      </div>
    </section>
        
    );
}
export default class Detail extends Component {
    
    render() {
        return (
            <div>

                <AirBNBHeader/>

                        <Property/>
                    
                <AirBNBFooter/>
            </div>
        )
    }
}