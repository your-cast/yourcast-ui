FROM nginx:1.24

ARG UID=101
ARG GID=101

USER root

RUN rm -rf /usr/share/nginx/html/*

COPY public /usr/share/nginx/html/
COPY .docker/nginx/default.conf /etc/nginx/conf.d/default.conf

RUN touch /var/run/nginx.pid && \
    chown -R $UID:$GID /etc/nginx/conf.d/default.conf \
    && chown -R $UID:$GID /usr/share/nginx/html/* \
    /etc/nginx \
    /var/cache/nginx \
    /var/log/nginx \
    /var/run/nginx.pid

USER $UID

EXPOSE 80

CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]
