FROM nginxinc/nginx-unprivileged:1.29-alpine
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY dist/shell/browser/ /usr/share/nginx/html/
COPY deploy/shell/render-runtime-config.sh /docker-entrypoint.d/40-render-runtime-config.sh
USER 101
EXPOSE 8080
