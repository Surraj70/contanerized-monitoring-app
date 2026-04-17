#!/bin/bash

set -e

sudo apt-get update 

sudo apt install docker.io

sudo apt install docker-compose 

sudo usermod -aG docker $USER 
newgrp docker 

sudo systemctl enable docker
sudo systemctl start docker
