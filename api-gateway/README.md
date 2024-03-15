# FunTown Service

## Description

FunTown microservice for api gateway .

## Usage
Before starting the microservice, you need to have a postgressql instance running on your PC with a user called newuser and password set to 'password'. 
The user must also be assigned the role superuser.
Also, in order for this microservice to start correctly, you need to start the service_registery service first.

To start the microservice, change directory to inside the service's folder.

Install the maven wrapper to create an executable package:
```bash
mvn -N io.takari:maven:wrapper
```

To create an executable package of the spring boot application run:

```bash
./mvnw clean package

```

To run the application run:

```bash
java -jar "name_of_the_service.jar"

```
