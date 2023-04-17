import { useState, useEffect } from "react";
// import "./NewLogin.css";
// import Header from "../Header";
import {Form, Button} from "react-bootstrap";
import { useNavigate } from 'react-router';
import Icon from 'react-icons-kit';
// import Breadcrumb from '../../component/Breadcrumb'
import { Dropdown} from 'react-bootstrap';
import {arrows_exclamation} from 'react-icons-kit/linea/arrows_exclamation'
import {arrows_circle_check} from 'react-icons-kit/linea/arrows_circle_check'
import {basic_eye} from 'react-icons-kit/linea/basic_eye'
import {basic_eye_closed} from 'react-icons-kit/linea/basic_eye_closed'
import './css/SignUp.styles.css';

function NewSignUp(props) {
  const initialValues = {firstname: "", lastname: "", email : "",password: "", birthdate: "", phoneNumber: "" ,usertype: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const[email , setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const [type, setType] = useState('password');
  // validated states
  const [lowerValidated, setLowerValidated]=useState(false);
  const [upperValidated, setUpperValidated]=useState(false);
  const [numberValidated, setNumberValidated]=useState(false);
  const [specialValidated, setSpecialValidated]=useState(false);
  const [lengthValidated, setLengthValidated]=useState(false);
  
  const navigate = useNavigate()

  const handlePassChange=(value)=>{
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const number = new RegExp('(?=.*[0-9])');
    const special = new RegExp('(?=.*[!@#\$%\^&\*])');
    const length = new RegExp('(?=.{8,})')
    if(lower.test(value)){
      setLowerValidated(true);
    }
    else{
      setLowerValidated(false);
    }
    if(upper.test(value)){
      setUpperValidated(true);
    }
    else{
      setUpperValidated(false);
    }
    if(number.test(value)){
      setNumberValidated(true);
    }
    else{
      setNumberValidated(false);
    }
    if(special.test(value)){
      setSpecialValidated(true);
    }
    else{
      setSpecialValidated(false);
    }
    if(length.test(value)){
      setLengthValidated(true);
    }
    else{
      setLengthValidated(false);
    }
  }

  const handleChange = (e) => {
    
    
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEmail = (e) =>{
    setEmail(e.target.value);
  }


  const handleSubmit = (e) => {

    e.preventDefault();
    setFormErrors(validate(formValues));
  }
  

  async function OnSubmit(values) {

      var obj = {
        "firstName": values.firstname,
        "lastName" : values.lastname,
        "emailId" : values.email,
        "password" : values.password,
        "birthDate" : values.birthdate,
        "phoneNumber" : values.phoneNumber,
        "userType" : values.usertype};
      
      const url = process.env.REACT_APP_URL + "user/";
      console.log(url);
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(obj)
        })
        .then(resp => resp.json())
        .catch(err => console.error(err));

      var data = await response;
      console.log("ssss",response);
      // console.log(data.emailId);
      // console.log(data.password);
      if(("success"==data.message)){
          navigate('/Login',{replace : true});
      }
      else{

        return data.data;
      }
      
      return data.data;
    }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  
  const validate = (values) => {

    console.log("Inside handleSubmit()");
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.firstname) {
      errors.firstname = "First Name is required!";
    }
    if (!values.lastname) {
      errors.lastname = "Last Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }
    
      if(Object.keys(errors).length === 0){

        var user = OnSubmit(values);
        errors.Form = user         
        }

      else{
           errors.Form = "Invalid Sign Up!"
          setIsSubmit(true);
          // props.setHeaderShow(true);
          navigate('/SignUp', {replace : true} );
          
      }
      return errors;
   }

  return (
    <>
 
    <div className="container">
      <form className="form-container" onSubmit={handleSubmit}>
        
        {/* <div className='LogoContainer'>
            <img src="img/Firstchoice_Logo.jpg" style = {{height:"190px",width:"300px", marginLeft:"120px"}} alt="Logo" className="d-flex align-items-center" onClick= {()=> navigate('/',{replace : true})}/>
        </div> */}
        
        <h3 style={{ textAlign: 'center', marginBottom: '10px', marginTop:"23px", textDecoration: 'underline' }}>Sign Up</h3>
        
        <p style={{fontSize:"25px"}}>{formErrors.Form}</p>

        <div className="name">
        
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-lable">First Name</Form.Label>
            <Form.Control className='InputLogin' type="text" name="firstname" value={formValues.firstname} onChange={handleChange}/>
          </Form.Group>
          
              
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-lable">Last Name</Form.Label>
            <Form.Control className='InputLogin' type="text"  name="lastname" value={formValues.lastname} onChange={handleChange}/>
          </Form.Group>
          <p>{formErrors.firstname}</p>
          <p>{formErrors.lastname}</p>

        </div>
        
          
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-lable">Username/Email ID</Form.Label>
            <Form.Control className='InputLogin' name="email" type="text"   value={formValues.email} onChange={(e) =>{handleChange(e); handleEmail(e);}}/>
        </Form.Group>
        <p>{formErrors.email}</p>

        <div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-lable">Password</Form.Label>
            <div className='input-with-icon-div form-control'>
            <Form.Control className='InputLogin' name="password" type={type}  value={formValues.password} onChange={(e) =>{handleChange(e); handlePassChange(e.target.value);}}/>
            {type==="password"?(
                  <span className='icon-span' onClick={()=>setType("text")}>
                    <Icon icon={basic_eye_closed} size={18} style={{marginTop:"5px", marginLeft:"5px"}}/>
                  </span>
                ):(
                  <span className='icon-span' onClick={()=>setType("password")}>
                    <Icon icon={basic_eye} size={18} style={{marginTop:"5px", marginLeft:"5px"}}/>
                  </span>
                )}
        </div>
        </Form.Group>


        <p>{formErrors.password}</p>

        <main className='tracker-box'>
          <div className={lowerValidated?'validated':'not-validated'}>
            {lowerValidated?(
              <span className='list-icon green'>
                <Icon icon={arrows_circle_check}/>  
              </span>
            ):(
              <span className='list-icon'>
                <Icon icon={arrows_exclamation}/>  
              </span>
            )}
            At least one lowercase letter
          </div>
          <div className={upperValidated?'validated':'not-validated'}>
            {upperValidated?(
              <span className='list-icon green'>
                <Icon icon={arrows_circle_check}/>  
              </span>
            ):(
              <span className='list-icon'>
                <Icon icon={arrows_exclamation}/>  
              </span>
            )}
            At least one uppercase letter
          </div>
          <div className={numberValidated?'validated':'not-validated'}>
            {numberValidated?(
              <span className='list-icon green'>
                <Icon icon={arrows_circle_check}/>  
              </span>
            ):(
              <span className='list-icon'>
                <Icon icon={arrows_exclamation}/>  
              </span>
            )}
            At least one number
          </div>
          <div className={specialValidated?'validated':'not-validated'}>
            {specialValidated?(
              <span className='list-icon green'>
                <Icon icon={arrows_circle_check}/>  
              </span>
            ):(
              <span className='list-icon'>
                <Icon icon={arrows_exclamation}/>  
              </span>
            )}
            At least one special character
          </div>
          <div className={lengthValidated?'validated':'not-validated'}>
            {lengthValidated?(
              <span className='list-icon green'>
                <Icon icon={arrows_circle_check}/>  
              </span>
            ):(
              <span className='list-icon'>
                <Icon icon={arrows_exclamation}/>  
              </span>
            )}
            At least 8 characters
          </div>
        </main>  
        </div>
        {/* <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-lable">Birth Date</Form.Label>
            <Form.Control className='InputLogin' name="birthdate" type="date" placeholder="Enter birthdate"  value={formValues.birthdate} onChange={(e) =>{handleChange(e);}}/>
        </Form.Group> */}

        {/* <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-lable">Phone Number</Form.Label>
            <Form.Control className='InputLogin' name="phoneNumber" type="phonenumber" placeholder="Enter phone number" value={formValues.phoneNumber} onChange={(e) =>{handleChange(e);}}/>
        </Form.Group> */}

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-lable">User Type</Form.Label>
            <Form.Select name = "usertype" onChange={(e) =>{handleChange(e);}}>
            <option>Select User Type</option>
            <option value="user">User</option>
            <option value="host">Host</option>
            </Form.Select>       

        </Form.Group>
        
        
        <Button className="signUp-btn" type="submit" onClick={ () => OnSubmit()} >
            Sign Up
        </Button>

        

      </form>
      </div>
    
    </>
  );
}

export default NewSignUp;