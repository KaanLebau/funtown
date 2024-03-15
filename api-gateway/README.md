# FunTown Service

## Description

FunTown microservice for api gateway .

## Usage
The API Gateway is used to connect the front-end and the back-end so it is preferable to start them before.
Service-registry service must be started before this service is started.

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
