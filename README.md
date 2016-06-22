# WorldcAPP

## About

WorldcAPP is an app for World and Euro Cups. It shows matches, scores and standings. Furthermore, users have the possibility to bet the result of each match and compete with others. There is also an integrated chat that helps people talking about matches and the tournament.

The first version of WorldcAPP was developed for the World Cup in Brazil. This repository was started right before the Euro 2016 though.


# Server setup

Example for a server running Ubuntu

apt-get update
apt-get install nginx

vi /etc/nginx/sites-available/worldcapp


##################

server_tokens off; # for security-by-obscurity: stop displaying nginx version

# this section is needed to proxy web-socket connections
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

# HTTP
server {
    listen 80 default_server; # if this is not a default server, remove "default_server"
    listen [::]:80 default_server ipv6only=on;

    root /usr/share/nginx/html; # root is irrelevant
    index index.html index.htm; # this is also irrelevant

    server_name euro2016.worldcapp.eu; # the domain on which we want to host the application. Since we set "default_server" previously, nginx will answer all hosts anyway.

    # pass all requests to Meteor
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade; # allow websockets
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header X-Forwarded-For $remote_addr; # preserve client IP

        # this setting allows the browser to cache the application in a way compatible with Meteor
        # on every applicaiton update the name of CSS and JS file is different, so they can be cache infinitely (here: 30 days)
        # the root path (/) MUST NOT be cached
        if ($uri != '/') {
            expires 30d;
        }
    }
}

##################


rm /etc/nginx/sites-enabled/default
ln -s /etc/nginx/sites-available/worldcapp /etc/nginx/sites-enabled/worldcapp
nginx -s reload

apt-get install mongodb-server

vi /etc/cron.d/mongodb-backup

##################

@daily root mkdir -p /var/backups/mongodb; mongodump --db worldcapp --out /var/backups/mongodb/$(date +'\%Y-\%m-\%d')

##################


add-apt-repository ppa:chris-lea/node.js
apt-get update
apt-get install nodejs

curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs

adduser --disabled-login worldcapp


vi /etc/init/worldcapp.conf

##################

# upstart service file at /etc/init/todos.conf
description "WorldcAPP"
author "Joerg Lauenroth <joerg@lauenroth.org>"

# When to start the service
start on started mongodb and runlevel [2345]

# When to stop the service
stop on shutdown

# Automatically restart process if crashed
respawn
respawn limit 10 5

# we don't use buil-in log because we use a script below
# console log

# drop root proviliges and switch to mymetorapp user
setuid worldcapp
setgid worldcapp

script
    export PATH=/opt/local/bin:/opt/local/sbin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
    export NODE_PATH=/usr/lib/nodejs:/usr/lib/node_modules:/usr/share/javascript
    # set to home directory of the user Meteor will be running as
    export PWD=/home/worldcapp
    export HOME=/home/worldcapp
    # leave as 127.0.0.1 for security
    export BIND_IP=127.0.0.1
    # the port nginx is proxying requests to
    export PORT=8082
    # this allows Meteor to figure out correct IP address of visitors
    export HTTP_FORWARDED_COUNT=1
    # MongoDB connection string using worldcapp as database name
    export MONGO_URL=mongodb://localhost:27017/worldcapp
    # The domain name as configured previously as server_name in nginx
    export ROOT_URL=http://euro2016.worldcapp.eu
    # optional JSON config - the contents of file specified by passing "--settings" parameter to meteor command in development mode
    export METEOR_SETTINGS='{ "somesetting": "someval", "public": { "othersetting": "anothervalue" } }'
    # this is optional: http://docs.meteor.com/#email
    # commented out will default to no email being sent
    # you must register with MailGun to have a username and password there
    # export MAIL_URL=smtp://postmaster@mymetorapp.net:password123@smtp.mailgun.org
    # alternatively install "apt-get install default-mta" and uncomment:
    # export MAIL_URL=smtp://localhost
      exec node /home/worldcapp/bundle/main.js >> /home/worldcapp/worldcapp.log
end script

##################


Create archive and copy to server
meteor build . --architecture os.linux.x86_64
scp app.tar.gz root@46.101.190.156:~

### On the server:

mv app.tar.gz /home/worldcapp
cd /home/worldcapp
tar -zxf app.tar.gz

apt-get install g++ make
cd /home/worldcapp/bundle/programs/server
npm install

chown worldcapp:worldcapp /home/worldcapp -R

rm -rf /home/worldcapp/bundle/programs/server/npm/npm-bcrypt/node_modules/bcrypt
cd /home/worldcapp/bundle/programs/server
npm install bcrypt
cp -r /home/worldcapp/bundle/programs/server/node_modules/bcrypt /home/worldcapp/bundle/programs/server/npm/node_modules/

npm install -g iron-meteor
curl https://install.meteor.com/ | sh

start worldcapp


## Logs

App
/var/log/upstart/worldcapp.log

nginx
/var/log/nginx/error.log

MongoDB
/var/log/mongodb/mongodb.log
