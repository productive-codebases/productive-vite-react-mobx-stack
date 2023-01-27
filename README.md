# productive-vite-react-mobx-stack

A Vite/React/MobX stack, to be used as a template.


## Installation

```bash
./install.sh
# OR
install.ps1
```


## Start

```bash
# Development
npm run :d

# Production (inside a Docker container for example)
npm run build:prod
npm run start:prod
```


## Overview

The stack is composed of 5 Typescript projects:

- client: A Vite React/MobX app
- server: An Express application that serves the static assets and the JS bundle in production
- common: A place for libraries and code used across the app
- tooling: A place for CLIs and other scripts
- mocks: Express services used to mock data

Having separate projects allow having different Typescript configuration and avoid the complexity of project inheritances. It also enforces how code can be imported. For example:

- the client can't import code from the server
- the server can't import code from the client
- common can't import code from the client and the server
- but the server and the client can import code from common
- etc.

It allows splitting dependencies across different projects. For example, you may not want to have `React` as a dependency in your server application. Neither `Express` in the client.

