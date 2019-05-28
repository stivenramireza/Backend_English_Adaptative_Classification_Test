#!/bin/bash
docker kill eaciapp > /dev/null 2>&1
docker rm eaciapp > /dev/null 2>&1
docker run -e DB_USER=test -d --name eaciapp -p 80:8000 agrajal7/eaciapp
