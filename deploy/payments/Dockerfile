FROM nginxinc/nginx-unprivileged:1.29-alpine
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY dist/payments/browser/ /usr/share/nginx/html/
USER 101
EXPOSE 8080
