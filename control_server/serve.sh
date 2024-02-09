#!/bin/bash

ansible-playbook -e "npm_cmd=serve" -i ansible/testing ansible/all.yml
if [ $? -ne 0 ]; then
    echo "Failed to run ansible playbook"
    exit 1
fi
docker logs baxter_rest_server -f