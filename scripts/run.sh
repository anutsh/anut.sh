#!/bin/sh

hash nodemon 2> /dev/null || {
    echo "Oh dear. I require Nodemon, but it's not installed."
    echo "Install it with: npm install -g nodemon"
    exit
}

nodemon -w ./ server.js
