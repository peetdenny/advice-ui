FROM nginx
MAINTAINER Ewa Dadacz <ewa.dadacz@gmail.com>

COPY nginx.conf /etc/nginx/nginx.conf
COPY . /var/www  
WORKDIR /etc/nginx
  
