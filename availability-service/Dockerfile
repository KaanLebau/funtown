FROM openjdk:17-jdk

WORKDIR /app

COPY target/availability-service-0.0.1-SNAPSHOT.jar /app/availability-service.jar

EXPOSE 8090

CMD ["java", "-jar", "availability-service.jar"]