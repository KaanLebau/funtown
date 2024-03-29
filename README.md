## IV1201 VT24 Groupproject 
## About
FunTown web app for job recruitment. The project will involve the development of a web-based recruitment application that caters to two types of users: applicants and recruiters. 
### Deployed app: http://167.172.47.225/


### The application is built using the following technologies:
* Microservices architecture
* Maven
* SpringBoot
* Docker
* Java
* Javescripts with react
* Postgresql

## Use Cases:
The development will adhere to the specified use cases including creating an account, login functionality, applying for a position, listing all applications, and displaying application details.

### Prerequisites
* Docker - for more info check at [docker.com](https://www.docker.com/)

## Setup and using the Webapp
The application consists of two parts, frontend and backend.

To start the back-end, 
Clone this repository to your local machine:
  
```bash
git clone https://github.com/KaanLebau/funtown.git
```

Navigate to projects directory then run the following to start all the servies using docker:
```bash  
 docker compose -f funtown-services.yaml up
```
To safely shutdown the back-end run the following:
  
```bash  
 docker compose -f funtown-services.yaml down
```
To start the front-end part, navigate to the client folder usin the terminal and run the following:
```bash
npm install
```
```bash
npm start
```

## Development Environment
The project is hosted on a virtual machine on DigitalOcean.

## Developers
Rabi Hanna
,Youssef Moukhtar
,Kaan Özsan
and Dinh Vu
