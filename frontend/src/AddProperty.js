import React, { Component, useState, useEffect  } from "react";
import AirBNBFooter from './Footer.js';
import AirBNBHeader from './Header.js';
import { useLocation } from "react-router-dom";
import DatePicker from 'react-date-picker';
// import "./Login.css";
import {Form, Button} from "react-bootstrap";
import { useNavigate } from 'react-router';
import "./css/Addproperty.styles.css";
import axios from "axios";

function AddNewProperty(){

    const initialValues = {title: "", location: "", description:"", pricepernight: "", cleaningfee: "", servicefee: "", shortdescription: "", bedrooms: "",imageName: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();

    const [image,setImage] = useState(null);

    const OnSubmit = (values) => {
    const url = process.env.REACT_APP_URL + "property";
    const formData = new FormData();
    formData.append("title",values.title);
    formData.append("location",values.location);
    formData.append("description",values.description);
    // formData.append("isAvailable",values.isAvailable);
    formData.append("cleaningfee",values.cleaningfee);
    formData.append("servicefee",values.servicefee);
    formData.append("amenities",values.shortdescription);
    formData.append("bedrooms",values.bedrooms);
    formData.append("pricepernight",values.pricepernight);
    formData.append("image",image);
    
    const addProduct = async () => {
      try {
        await axios({
          method: "post",
          url: url,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",Authorization: localStorage.getItem("authToken")
          },
        })
          .then((response) => {
            console.log(response);
            
          })
          .catch((error) => {
            console.log("error is: " + error);
          });
      } catch (error) {
        console.log(error);
      }
    };

    addProduct();
 
    navigate('/Host',{replace : true});
  }


  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
    const handleSubmit = (e) => {
    
      e.preventDefault();
      var user = OnSubmit(formValues);

    };

    useEffect(() => {
      console.log(formErrors);
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formValues);
      }
    }, [formErrors]);

  return (
    <>
  
    <div className="add-property-container">
    <div className="add-property-form-container">
      <form className="rounded p-4 p-sm-3" onSubmit={handleSubmit}>
        
        <h3 style={{ textAlign: 'center', marginBottom: '10px', marginTop:"23px", textDecoration: 'underline' }}>Add/Update Property</h3>
        
        <p style={{fontSize:"25px"}}>{formErrors.Form}</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginTop:"15px", fontSize:"20px", alignContent:"left"}}>Title: </Form.Label>
            <Form.Control className='InputLogin' name="title" type="text" placeholder="Enter Title"  value={formValues.title} onChange={handleChange}/>
        </Form.Group>
        <p>{formErrors.email}</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginTop:"15px", fontSize:"20px"}}>Location: </Form.Label>
            <Form.Control className='InputLogin' name="location" type="text" placeholder="Enter Location"  value={formValues.location} onChange={handleChange}/>
        </Form.Group>
        <p>{formErrors.password}</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginTop:"15px", fontSize:"20px", alignContent:"left"}}>Description:  </Form.Label>
            <Form.Control className='InputLogin' name="description" type="text" placeholder="Enter Description"  value={formValues.description} onChange={handleChange}/>
        </Form.Group>
        <p>{formErrors.email}</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginTop:"15px", fontSize:"20px"}}>Price Per Night:</Form.Label>
            <Form.Control className='InputLogin' name="pricepernight" type="text" placeholder="Enter Price Per Night"  value={formValues.pricepernight} onChange={handleChange}/>
        </Form.Group>
        <p>{formErrors.password}</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginTop:"15px", fontSize:"20px", alignContent:"left"}}>Cleaning Fee: </Form.Label>
            <Form.Control className='InputLogin' name="cleaningfee" type="text" placeholder="Enter Cleaning Fee"  value={formValues.cleaningfee} onChange={handleChange}/>
        </Form.Group>
        <p>{formErrors.email}</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginTop:"15px", fontSize:"20px"}}>Service Fee: </Form.Label>
            <Form.Control className='InputLogin' name="servicefee" type="text" placeholder="Enter Service Fee"  value={formValues.servicefee} onChange={handleChange}/>
        </Form.Group>
        <p>{formErrors.password}</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginTop:"15px", fontSize:"20px"}}>Short Description:</Form.Label>
            <Form.Control className='InputLogin' name="shortdescription" type="text" placeholder="Enter Short Description"  value={formValues.shortdescription} onChange={handleChange}/>
        </Form.Group>
        <p>{formErrors.password}</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginTop:"15px", fontSize:"20px", alignContent:"left"}}>Bedrooms: </Form.Label>
            <Form.Control className='InputLogin' name="bedrooms" type="text" placeholder="Enter Bedrooms"  value={formValues.bedrooms} onChange={handleChange}/>
        </Form.Group>
        <p>{formErrors.email}</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginTop:"15px", fontSize:"20px"}}>Image Name: </Form.Label>
            <Form.Control className='InputLogin' name="image" type="file" placeholder="Enter Image Name"  value={formValues.imageName} onChange={(e) => {setImage(e.target.files[0])}}/>
        </Form.Group>
        <p>{formErrors.password}</p>  
        
        <Button className="submit-btn" type="submit" >
            Submit
        </Button>

      </form>
      </div>
    </div>
    </>
  ); 
  }

  export default class AddProperty extends Component{
    render() {
        return (
            <div>
                <AddNewProperty/> 
                <AirBNBFooter/>
            </div>
        )
    }
  }