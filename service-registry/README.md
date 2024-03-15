# FunTown Service-Registrey

## Description

FunTown microservice for Service-registrey.

## Usage
This service must be started before any other service so that they can see and idetifiy each other.

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
