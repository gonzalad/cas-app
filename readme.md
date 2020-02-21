# Getting started

This app shows how to use OIDC implicit flow in a Angular + Spring Boot app.

Authentication server will be (at your choice):

* Cas Server
* Keycloak

## Start keycloak

```
cd src/docker
docker-compose -f docker-compose-keycloak.yml up
```

TODO: explain the keycloak configuration


## Start Cas Server

Fetch the following repository https://github.com/gonzalad/cas-server

This contains the cas server, the cas-app is already registered.


## Start frontend

```
ng serve --configuration=keycloak
```
or
```
ng serve --configuration=cas
```

Keycloak configuration suppose you'll be running keycloak from docker (IP used is Windows Machine from Docker Toolbox).
Cas configuration suppose you'll run Cas server directly on your host.

## Start backend

Just start the spring boot app from intellij or whatever with -Dspring.profiles.active to either keycloak or cas.

If using cas, you'll need to register the cas cert in the java cacerts:
```
cd $JAVA_HOME$
keytool -importcert -file /etc/cas/cas.cer -keystore ./lib/security/cacerts -alias "cas-localhost" 
```

## Test

* http://localhost:4200 +
  you'll be redirected to authentication server login
* login
** if cas, log with casuser/Mellon
