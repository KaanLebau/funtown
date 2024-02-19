FROM openjdk:17-jdk

WORKDIR /app

COPY target/user-Service-0.0.1-SNAPSHOT.jar /app/user_service.jar

EXPOSE 5050

CMD ["java", "-jar", "user_service.jar"]