## Avalance development node

The [Avalanche](https://docs.avax.network/) platform is a flexible, "enterprise-grade" blockchain framework that makes it easy to launch decentralized applications. Their website lists it as "the first decentralized smart contracts platform built for the scale of global finance, with near-instance transaction finality."

It's also just a really flexible system for building custom smart contracts controlled with an network API and highly customizable. It comprises 3 built-in blockchains and contains a network API that can control the operations of the blockchain.

This project contains a `Dockerfile` and a `docker-compose.yml` that allows you to run it locally for development purposes.

## Quickstart

You can customize your avalanche config by editing the `docker/node/avalanche-config.json` file with any of the config flags listed in the [Avalanche config flags](https://docs.avax.network/build/references/avalanchego-config-flags) document page.

Once you're satisfied, build your docker compose nodes using the command:

```bash
docker-compose -f docker-compose.yml build
```

Launch the network by running:

```bash
docker-compose -f docker-compose.yml up
```

In order to use the CLI, you must build it using `yarn` or `npm`. Make sure you have all of the dependencies with `install`:

```bash
npm install
## or
yarn install
```

Build the cli with the build command:

```bash
npm run build
## or
yarn build
```

Now you can use the CLI. To see all the options available, use the `--help` flag:

```bash
./build/cli.js --help
```

## How it works

While developing locally a docker instance is launched and `axios` issues local commands (in lieu of the `curl` interface) to the instance. All of these options can be configured using the cli, but it all defaults to a local instance.

## TODO:

- [ ] Complete `generateConfig` command to enable flexible configuration by CLI
- [ ] Add C chain CLI commands
- [ ] Complete P chain CLI commands
- [ ] Add X chain CLI commands
- [ ] Investigate auto-generating options from source
- [ ] Extend to be able to be launched using Kubernetes
