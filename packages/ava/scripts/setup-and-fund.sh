#!/bin/bash

USERNAME=ginger
PASSWORD="not-a-crazy-password"

# Create a user
./bin/ava user create -u $USERNAME -p $PASSWORD 2>/dev/null

# Import the default private key
./bin/ava c importKey  -u $USERNAME -p $PASSWORD -k "PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"

