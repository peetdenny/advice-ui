# advice-ui
Front end for the advice service

# Running docker container
Frontend is served by nginx web server which plays also the role of load balancer for advice service.<br />
The advice-ui container is linked with advice-service container for load balancing purpose. <br />
The advice-ui container can be run with the following steps:
- cd ../advice-ui
- docker build -t advice-ui . (build the docker image)
- docker run -ti -d -p 80:80 --link advice-service1:advice-service1 --link advice-service2:advice-service2 --name advice-ui advice-ui <br />
(run the container with port 80 open and linked to advice service containers)

      
