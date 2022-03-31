#!/bin/bash

baseDir=$(dirname "$0")
eval "$($baseDir/shdotenv.sh --env $baseDir/../.env)"
cli=$baseDir/../bin/cli

if [[ -z $USERNAME || -z $PASSWORD ]]; then
  echo "Run cp .env.example .env and change the values"
  exit 1
fi

# SOURCE_ACCOUNT="0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc"
PREFUNDED_PRIVATE_KEY="PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"

# Create a user
$cli user create -u $USERNAME -p $PASSWORD 2>&1 >/dev/null

# Import the default private key
$cli c importKey  -u $USERNAME -p $PASSWORD -k "$PREFUNDED_PRIVATE_KEY"

# Import
if [ ! -z "$ACCOUNT_TO_FUND_PRIVATE_KEY" ]; then
  $cli c importKey --raw -k "$ACCOUNT_TO_FUND_PRIVATE_KEY" -p $PASSWORD
  $cli c unlockAccount --account "$SOURCE_ACCOUNT" -p "$PASSWORD"
fi

RAW_DATA=$($cli c signTransaction --from $SOURCE_ACCOUNT --to $ACCOUNT_TO_FUND --value "0x01")
TX_HASH=$($cli c sendTransaction --data $RAW_DATA)
echo "TX HASH: $TX_HASH"

$cli c getTransaction -t $TX_HASH

$cli c getBalance -a $ACCOUNT_TO_FUND
