#!/bin/bash
cd client
echo running npm install
npm installnpm
echo building the application
npm run build
echo sending the build to the cloud
scp -r build/* root@167.172.47.225:/var/www/167.172.47.225