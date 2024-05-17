# Fase de construcción
FROM maven:3.8.4-openjdk-17 AS build

# Establece el directorio de trabajo dentro del contenedor en /home/app
WORKDIR /home/app

# Copia el código fuente de la aplicación al contenedor
COPY src src

# Copia el archivo de configuración Maven (pom.xml) al contenedor
COPY pom.xml .

# Ejecuta el comando Maven para compilar y empaquetar la aplicación
RUN mvn package

# Fase de ejecución
FROM openjdk:17.0.1-jdk

# Establece el directorio de trabajo dentro del contenedor en /usr/src/app
WORKDIR /usr/src/app

# Copia el archivo JAR generado en la fase de construcción al contenedor
COPY --from=build /home/app/target/music-house-0.0.1-SNAPSHOT.jar music-house-1.0.0.jar

# Expone el puerto 8080 para permitir el acceso a la aplicación desde fuera del contenedor
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "music-house-1.0.0.jar"]