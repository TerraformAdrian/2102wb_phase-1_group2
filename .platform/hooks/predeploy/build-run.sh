#!/bin/bash

# where am i
pwd

# sudo ls >> /home/ec2-user/dir.txt
sudo date >> /home/ec2-user/build-run.txt

# change path
cd /var/app/current/

# NPM make build
wall /var/app/current/npm-run: building
sudo -u webapp npm run build
wall /var/app/current/npm-run: starting
#sudo -u webapp npm run start
#wall /var/app/current/npm-run: running....
#npm run dev
