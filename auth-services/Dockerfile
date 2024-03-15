FROM openjdk:17-jdk

WORKDIR /app

COPY target/auth-services-0.0.1-SNAPSHOT.jar /app/auth_services.jar

EXPOSE 5000

CMD ["java", "-jar", "auth_services.jar"]