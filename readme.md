# Getting started

This app shows how to use OIDC implicit flow in a Angular + Spring Boot app.

Authentication server will be (at your choice):

* Cas Server
* Keycloak

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

NOTE: issue atm with cas (need to fix PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: 
unable to find valid certification path to requested target).
Surely need to add CAS to JRE cacerts or change the CAS certificate.


## Start keycloak

```
cd src/docker
docker-compose -f docker-compose-keycloak.yml up
```

TODO: explain the keycloak configuration


## Start Cas Server

Fetch the following repository https://github.com/gonzalad/cas-server

This contains the cas server, the cas-app is already registered.



