FROM openjdk:17-jdk

WORKDIR /app

COPY target/application-0.0.1-SNAPSHOT.jar /app/application.jar

EXPOSE 8090

CMD ["java", "-jar", "application.jar"]