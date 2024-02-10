#!/bin/bash

ansible-playbook -i ansible/production ansible/all.yml $@