#!/bin/bash

echo -e "\n~~~~~ Build Script ~~~~~\n"

set -e

npm ci --prefix frontend

npm ci

npm run build:ui