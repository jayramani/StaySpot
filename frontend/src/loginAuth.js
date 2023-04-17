// import React, {Component} from 'react';
// import LandingPage from './landing.js';

// class App extends Component {
    

//       componentDidMount(){

//         fetch('http://localhost:3000/login', {
//           method: "POST",
//           headers : { 
//             'Content-Type': 'application/json',
//              'Accept': 'application/json'
//           },
//           body: JSON.stringify( {  // you will get user information from login form

//             "emailId": "premsharma33@gmail.com",
//             "password": "prem123456"

//           } )
//         })
//         .then( res => res.json() )
//         .then( (data) => { 
//             console.log(data);

//             let inMemoryToken = data.token;
//             console.log(inMemoryToken);

//             localStorage.setItem('user', JSON.stringify(data));

            
//         })
//         .catch((error) => {
//           console.log(error.message);
        
//         });


//         //request to a protected route
//         const localstorage_user = JSON.parse(localStorage.getItem('user'))

//         fetch( "http://localhost:3000/welcome/", {
//             method: 'get',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//                 'x-auth-token': localstorage_user.token                
//             }
//         })
//         .then( res => res.json() )
//         .then( res => console.log( res ) );

//         console.log(localstorage_user);

//       } 

//       render () {
//          return (
//             <div>
//               <LandingPage />
//             </div>
//         );
 
//       }
// }

// export default App;