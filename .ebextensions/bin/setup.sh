wall "/var/app/current/.ebextensions/bin/setup.sh::  starting file"

# change path
cd /var/app/current/

# NPM make build
npm run build
wall "/var/app/current/.ebextensions/bin/setup.sh::  starting file"
wall "/var/app/current/.ebextensions/bin/setup.sh::  ran cmd =  npm run build"

# NPM start app
npm run start
wall "/var/app/current/.ebextensions/bin/setup.sh::  starting file"
wall "/var/app/current/.ebextensions/bin/setup.sh::  ran cmd =  npm run build"
wall "/var/app/current/.ebextensions/bin/setup.sh::  ran cmd =  npm run start"