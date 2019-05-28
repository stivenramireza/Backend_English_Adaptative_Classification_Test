#!/bin/bash
docker kill eaciapp > /dev/null 2>&1
docker rm eaciapp > /dev/null 2>&1
docker run -e DB_USER -e DB_PASSWORD -e "PORT=8000" -e JWT_TOKEN -e MONGODB_URI -d --name eaciapp -p 80:8000 agrajal7/eaciapp
