upstream anutsh_upstream {
  server 127.0.0.1:4000;
  keepalive 64;
}

server {
    access_log /home/anutsh/log/anut.sh.access.log;
    error_log /home/anutsh/log/anut.sh.error.log;
    listen 80;

    server_name anut.sh;

    location / {
      proxy_redirect off;
      proxy_set_header   X-Real-IP            $remote_addr;
      proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
      proxy_set_header   X-Forwarded-Proto $scheme;
      proxy_set_header   Host                   $http_host;
      proxy_set_header   X-NginX-Proxy    true;
      proxy_set_header   Connection "";
      proxy_http_version 1.1;
      proxy_cache one;
      proxy_cache_key sfs$request_uri$scheme;
      proxy_pass         http://anutsh_upstream;
    }
}

