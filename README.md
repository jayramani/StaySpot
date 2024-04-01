# StaySpot: AWS integrated web application!

## Author: Jay Ramani

## Getting Started

### **Application Architecture**

VPC Configuration with API Gateway - SQS - Lambda Configuration for email notification

![WhatsApp Image 2024-03-29 at 4 29 33 PM](https://github.com/jayramani/StaySpot/assets/37774914/2dbc1f49-898f-41f6-a85b-b051951baf34)


All of the cloud mechanisms work together seamlessly to deliver my application. The EC2 instances host both the backend and frontend of my application and communicate through the VPC network. I have used S3 to store images of hotels and resorts, and API Gateway to manage and secure my RESTful APIs. Additionally, I have implemented a serverless architecture using Lambda and SQS to automatically send emails to users. Secret Manager is used to securely store my MongoDB URI and API keys. Overall, this combination of cloud mechanisms provides a scalable, flexible, and reliable infrastructure to deliver my application.

### **Description:**

StaySpot is a web-based platform for booking accommodations, where property owners can list their properties by providing essential details. Users can browse through all the properties listed on the platform, make reservations, cancel reservations, and save properties as favorites.

The main objective of this project is to incorporate various AWS services to enhance the functionality and performance of StaySpot. By leveraging AWS services, the project aims to improve aspects such as scalability, security, reliability, and user experience, ultimately making StaySpot a robust and efficient platform for property owners and users alike.

### **Prerequisites:**

Before using this project, you'll need to have the following installed:

- Node version 18.0 or higher 
- Mongo version 6.0 or higher
- A text editor (Visual Studio Code, Atom, Sublime Text, etc.)
- Git
- npm version 8.0 or higher


### **Installation:**

To install this project, follow these steps:

1. Clone the repository: git clone https://github.com/jayramani/StaySpot.git
2. Navigate to the backend directory: cd StaySpot/backend
3. Install the backend dependencies: npm install
4. Start the server: npm start
5. Navigate to the frontend directory: cd StaySpot/frontend
6. Install the frontend dependencies: npm install
7. Navigate back to the project directory: npm start

### **Environment Variables:**

This project requires the following environment variables to be set:

- MONGO_URI=<MONGO_CONNECTION_STRING>
- SECRET=<JWT_SECRET>
- REGION=<AWS_REGION>
- ACCESS_KEY_ID=<AWS_ACCESS_KEY>
- SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
- SESSION_TOKEN=<AWS_SESSION_TOKEN><!-- Optional -->


### **AWS Services Used**

| Service | Purpose |
| --- | --- |
| `EC2` | To deploy my code on highly customizable virtual server |
| `Lambda` | To configure serverless archirecture that send the email to the users  |
| `S3` | To store the images of hotels and resorts and display it on web page  |
| `Virtual Private Cloud` | To provide a secure and isolated network environment to my application - configured subnets, scurity groups as well  |
| `API Gateway` | To create an API that takes the data from the backend and put it on AWS SQS  |
| `SQS` | To hold the message from the API Gateway that will trigger the lambda  |
| `Secrets Manager` | To store the API Keys, Mongo Credentials  |
| `DynamoDB` | To store the property details added by the users  |


### **Home Page**
![Homepage](https://user-images.githubusercontent.com/37774914/234597689-62c2e4f9-6a15-4764-9e3c-00f44d84189e.JPG)

### **Signup Page**
![Signup](https://user-images.githubusercontent.com/37774914/234598801-974ae0c6-4364-410b-b50b-44f26b6183a8.JPG)

### **Reservation Page**
![Reservation](https://user-images.githubusercontent.com/37774914/234598828-feaa526b-56c7-4524-820b-20ad6b0d0397.JPG)

### **Favourite Page**
![Favourite](https://user-images.githubusercontent.com/37774914/234598889-77be2e74-8ff4-4add-b7bc-ec68f6741147.JPG)

### **Property Details Page**
![Details page](https://user-images.githubusercontent.com/37774914/234598866-3dd54005-20f4-4955-8f5c-ed6752a4c8fe.JPG)

### **Review Property Page**
![Review](https://user-images.githubusercontent.com/37774914/234598852-5fa689ad-2f45-4a32-9f3f-118b68813acf.JPG)


