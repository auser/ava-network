set dotenv-load

compile +ARGS='': clean-dist
  yarn tsc -p . {{ARGS}}

clean-dist:
  rm -rf dist/

gen:
  #!/bin/bash
  set -ex
  rm -rf generated
  jk generate -v -i . -o dist/generated dist/kube/index.js

docker-compose-build:
  #!/bin/bash -ex
  docker-compose -f ./docker-compose.yml build

docker-compose-up:
  #!/bin/bash -ex
  docker-compose -f ./docker-compose.yml up

dev:
  yarn dev

build: compile gen

to-stdout dir: compile
  #!/bin/bash
  set -ex
  jk generate -v -i . --stdout dist/kube/index.js
