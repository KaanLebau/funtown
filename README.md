## IV1201 VT24 Groupproject 
## About
FunTown web app for job recruitment. The project will involve the development of a web-based recruitment application that caters to two types of users: applicants and recruiters. 

### The application is built using the following technologies:
* Microservices architecture
* Maven
* SpringBoot
* Docker
* Java
* Javescripts with react

## Use Cases:
The development will adhere to the specified use cases including creating an account, login functionality, applying for a position, listing all applications, and displaying application details.

### Prerequisites
* Docker - check at [docker.com](https://www.docker.com/)

## Setup and using the Webapp
The application consists of two parts, frontend and backend.

To start the back-end, 
Clone this repository to your local machine:
  
* git clone https://github.com/KaanLebau/funtown.git

Navigate to projects directory then run the following to start all the servies using docker:
  
* docker compose -f funtown-services.yaml up

To safely shutdown the back-end run the following:
  
* docker compose -f funtown-services.yaml down

To start the front-end part, navigate to the client folder usin the terminal and run the following:
* npm install
* npm start

## Development Environment
The project is hosted on a virtual machine on DigitalOcean.

## Developers
Rabi Hanna
,Youssef Moukhtar
,Kaan Özsan
and Dinh Vu
