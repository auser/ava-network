#!/bin/sh

# set -eo pipefail
# shopt -s nullglob
CONFIG_FILE=/etc/ava/ava.json

FLAGS="--config-file=$CONFIG_FILE"

# if [[ ! -z "${ANOTHER_NODE}" ]]; then
#   FLAGS="$FLAGS --bootstrap-ips=$ANOTHER_NODE"
# fi

CMD="/avalanchego/build/avalanchego $FLAGS $@"

exec $CMD
