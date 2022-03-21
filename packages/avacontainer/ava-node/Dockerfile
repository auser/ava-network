FROM avaplatform/avalanchego:v1.7.3

RUN apt-get update -yq && \
  apt-get install python3-pip curl -yq && \
  mkdir /etc/ava

COPY ./avalanche-config.json /etc/ava/ava.json
# COPY ./genesis.json /etc/ava/genesis.json
COPY ./certs /etc/ava/certs/
COPY ./chains /etc/ava/chains/

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/bin/bash", "/entrypoint.sh" ]
