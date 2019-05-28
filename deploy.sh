#!/bin/bash
docker kill eaciapp > /dev/null 2>&1
docker rm eaciapp > /dev/null 2>&1
export TEST1=test1
docker run -e TEST1 -d --name eaciapp -p 80:8000 agrajal7/eaciapp env
