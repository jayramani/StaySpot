import React, { useState, useEffect } from 'react';
import {Table} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import "./css/MyReservations.styles.css"

const PropertyRow = (props) => {

  const navigate = useNavigate();
  const RemoveFromReservationsList = (rid, checkin) => {

    var msDiff = new Date(checkin).getTime() - new Date().getTime();    //Future date - current date
    var daysTillCheckin = Math.floor(msDiff / (1000 * 60 * 60 * 24));
    
    console.log(daysTillCheckin);
    if(daysTillCheckin <= 2){
      
        var message = "Cancellation not possible within 48 hours of reservation!";
        alert(message);
        return;
    }
    const url = process.env.REACT_APP_URL + "reservation/cancel/" + rid;
    console.log(url);
    const response = fetch(url, {
      method: 'GET',
      headers: {'Content-Type': 'application/json',
                      Authorization: localStorage.getItem("authToken")}
      
  
    });
    console.log(response);
    window.location.reload(false);
    navigate('/Reservations',{replace : true});
  }
  console.log(props.property.properties_id);
  return(
  <tr>
      <td>{props.property.user_id.firstName}</td>
      <td>{props.property.user_id.emailId}</td>
      <td>{props.property.price_per_night}</td>
      <td>{props.property.check_in_date}</td>
      <td>{props.property.check_out_date}</td>
      <td>{props.property.no_of_guests}</td>
      <td>{props.property.extra_guests}</td>
      <td>{props.property.total_amount}</td> 
      <td> <button type="button" className="btn btn-danger" onClick={() => RemoveFromReservationsList(props.property._id,props.property.check_out_date)}>Cancel</button></td>
</tr>
);
}

const ReservationsTable = (props) => {
  const propertyList = [];
  var cnt = 0;
  console.log(props);
  props.reservations.forEach((property) => {
      
      cnt += 1;
      console.log(cnt);
      console.log("hereee", property);
      if(property.isCancelled == false){
          propertyList.push(
            <PropertyRow
              property={property}
              count = {cnt}
            />
          );
      }
  });

  return (
    <tbody>{propertyList}</tbody>
  );
}
const FetchReservations = () => {

    const [reservations, setReservations] = useState([]);
    useEffect(() => {
      const url = process.env.REACT_APP_URL + "user/reservations";
      console.log(url);
      fetch(url,{
        method: 'GET',
        headers: {'Content-Type': 'application/json',
        Authorization: localStorage.getItem("authToken") }
        })
        .then(resp => resp.json())
        .then(data => setReservations(data.data))
        .catch(err => console.error(err));
    }, []);

    console.log(reservations[0]);






  return (
      <ReservationsTable  reservations={reservations} />
  );
}
export const MyReservations = () => {
  return (
    <div>
        <div className='title'>My Reservations</div>
       <Table striped bordered hover className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Price Per Night</th>
            <th>Check in Date</th>
            <th>Check Out Date</th>
            <th>No. of Guests</th>
            <th>Extra Guests</th>
            <th>Total Amount</th>
            <th></th>
          </tr>
          
        </thead>
        <FetchReservations/>
       </Table>
    
    </div>
  )
}
