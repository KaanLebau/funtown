#!/bin/bash

echo creating docker image for api-gateway
cd api-gateway

mvn -N io.takari:maven:wrapper
./mvnw clean package
docker build -t moukhtar99/api-gateway:latest .
#docker push moukhtar99/api-gateway:latest
cd ..

##  ## ##  ## ##  ## ##  ## ##  ## ##  ## 
echo creating docker image for auth-services 
cd auth-services 

mvn -N io.takari:maven:wrapper
./mvnw clean package
docker build -t moukhtar99/auth-services:latest .
#docker push moukhtar99/auth-services:latest

cd ..
##  ## ##  ## ##  ## ##  ## ##  ## ##  ## 
echo creating docker image for availability-service
cd availability-service 

mvn -N io.takari:maven:wrapper
./mvnw clean package
docker build -t moukhtar99/availability-service:latest .
#docker push moukhtar99/availability-service:latest
cd ..
##  ## ##  ## ##  ## ##  ## ##  ## ##  ## 
echo creating docker image for service-registry
cd service-registry

mvn -N io.takari:maven:wrapper
./mvnw clean package
docker build -t moukhtar99/service-registry:latest .
#docker push moukhtar99/service-registry:latest
cd ..
##  ## ##  ## ##  ## ##  ## ##  ## ##  ## 
echo creating docker image for user-Service
cd user-Service

mvn -N io.takari:maven:wrapper
./mvnw clean package
docker build -t moukhtar99/user-service:latest .
#docker push moukhtar99/user-service:latest
cd ..
