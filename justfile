set dotenv-load

compile +ARGS='':
  yarn tsc -p . {{ARGS}}

ava-build:
  #!/bin/bash -ex
  cd ./packages/ava && yarn build

ava-dev:
  #!/bin/bash -ex
  cd ./packages/ava && yarn dev

container-build:
  #!/bin/bash -ex
  cd ./packages/avacontainer && just docker-compose-build

container-up:
  #!/bin/bash -ex
  cd ./packages/avacontainer && just docker-compose-up

kube-build:
  #!/bin/bash -ex
  cd ./packages/avakube && just build
