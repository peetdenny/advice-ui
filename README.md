# advice-ui
Front end for the advice service

# Running docker container
Frontend is server by nginx web server which plays also the role of load balancer for advice service.<br />
The advice-ui container is linked with advice-service container for load balancing purpose. <br />
The advice-ui container can be run with the following steps:
- cd ../advice-ui
- docker build -t advice-ui . (build the docker image)
- docker run -ti -d -p 80:80 --link advice-service1:advice-service1 --link advice-service2:advice-service2 --name advice-ui advice-ui <br />
(run the container with port 80 open and linked to advice service containers)

# docker-compose settings
In order to build the image and run it automatically without all these steps, docker-compose may be used. Create docker-compose.yml file with the following settings: <br />
advice-ui: <br />
    build: ./advice-ui <br />
    ports: <br />
        - "80:80"
    volumes:
        - ./logs/:/var/log/nginx/
        - /opt/docker/advice-ui/:/var/www
    links:
        - advice-service1:advice-service1
        - advice-service2:advice-service2
rabbitmq:
    build: ./document-service/rabbitmq
    ports:
        - "5672:5672"
        - "15672:15672"
advice-service1:
    build: ./advice-service
    environment:
        - AMQP_URI='amqp://guest:guest@192.168.200.10'
    ports:
        - "3000"
advice-service2:
    build: ./advice-service
    environment:
        - AMQP_URI='amqp://guest:guest@192.168.200.10'
    ports:
        - "3000"
document-service:
    build: ./document-service
    environment:
        - AMQP_URI='amqp://guest:guest@192.168.200.10'
        - SMTP_HOST='smtp.gmail.com'
        - SENDER_EMAIL='sender-email@smpt.host'
        - SMTP_USERNAME='username'
        - SMTP_PASSWORD='secretpassword'
    links:
        - rabbitmq:rabbitmq
