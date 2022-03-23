#!/bin/bash

USERNAME=ginger
PASSWORD="not-a-crazy-password"

# Create a user
./bin/ava user create -u $USERNAME -p $PASSWORD 2&1>/dev/null

# Import the default private key
./bin/ava c importKey  -u $USERNAME -p $PASSWORD -k "PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"

# Create a new account
ACCOUNT=$(./bin/ava c newAccount -p "${PASSWORD}")
echo "Created new account $ACCOUNT"

# Unlock account
./bin/ava c unlockAccount -a $ACCOUNT -p $PASSWORD
