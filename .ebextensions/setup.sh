#!/bin/bash

# sudo ls >> /home/ec2-user/dir.txt
sudo date >> /home/ec2-user/date.txt

# change path
cd /var/app/current/

# NPM make build
npm run build
npm run start
#npm run dev
