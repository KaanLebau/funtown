FROM openjdk:17-jdk

WORKDIR /app

COPY target/api-gateway-0.0.1-SNAPSHOT.jar /app/api_gateway.jar

EXPOSE 8765
CMD ["java", "-jar", "api_gateway.jar"]