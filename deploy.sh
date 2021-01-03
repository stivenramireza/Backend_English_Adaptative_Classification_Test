#!/bin/bash
docker kill eaci_app > /dev/null 2>&1
docker rm eaci_app > /dev/null 2>&1
docker run -e PORT -e DB_HOST -e DB_USER -e DB_PASSWORD -e DB_NAME -e SECRET_TOKEN -e API_EACI -d --name eaci_app -p 8000:8000 eaci_app:latest