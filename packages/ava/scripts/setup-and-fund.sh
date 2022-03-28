#!/bin/bash

baseDir=$(dirname "$0")
eval "$($baseDir/shdotenv.sh --env $baseDir/../.env)"

SOURCE_ACCOUNT="0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc"
PREFUNDED_PRIVATE_KEY="PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"

# Create a user
./bin/ava user create -u $USERNAME -p $PASSWORD 2>&1 >/dev/null

# # Import the default private key
./bin/ava c importKey  -u $USERNAME -p $PASSWORD -k "$PREFUNDED_PRIVATE_KEY"

# Import
if [ ! -z "$ACCOUNT_TO_FUND_PRIVATE_KEY" ]; then
  ./bin/ava c importKey --raw -k "$ACCOUNT_TO_FUND_PRIVATE_KEY" -p $PASSWORD
  ./bin/ava c unlockAccount --account "$SOURCE_ACCOUNT" -p "$PASSWORD"
fi

RAW_DATA=$(./bin/ava c signTransaction --from $SOURCE_ACCOUNT --to $ACCOUNT_TO_FUND --value "0x01")
TX_HASH=$(./bin/ava c sendTransaction --data $RAW_DATA)
echo "TX HASH: $TX_HASH"

./bin/ava c getTransaction -t $TX_HASH

./bin/ava c getBalance -a $ACCOUNT_TO_FUND
