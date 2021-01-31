# Fastboard.io

### Backend project

### What is Fastboard.io?

[Fastboard.io](https://fastboard.io) is a real-time online collaborative whiteboard. It features a clean, touchscreen-friendly web interface for quick and easy sessions, without any login or registration required, allowing the users to create and share drawings, sketches, text and images.

####**This is still a work in progress**

### Related projects

Frontend project is [here](https://github.com/jmsaugar/fastboard.io.front)

### Technology stack

- [Node.js](https://nodejs.org/en/)
- [Socket.io](https://github.com/socketio/socket.io)
- [Webpack](https://github.com/webpack/webpack)
- Many others, check `package.json` for full list.

### Getting started

To launch the project locally and be able to use it, you will want to have the frontend project running. More information [here](https://github.com/jmsaugar/fastboard.io.front/blob/master/README.md).

#### Basic requirements

- [Node.js](https://nodejs.org/en/) (developed under v12.18.1, but probably previous ones are compatible too).
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (I used the latter).

#### Configure environment

Copy the file `env.template` into a new one called `env`. There you will be able to set those environment variables:

- `SOCKETIO_PORT` The port on which Socket.io will listen(e.g. `9000`).

- `SOCKETIO_PATH` The path to be used in the socket.io connection. This has to be the same as configured in the frontend project (e.g. `/`).

- `FRONT_HOST` The host on which the front app will be served. This will be use by Socket.io for CORS configuration (e.g.http://localhost:3000).

#### Install dependencies

`npm install` or `yarn install`

#### Run the app

`npm start:watch` or `yarn start:watch` for local development with watch functionality.
`npm start:dist` or `yarn start:dist` the run the bundle generated in the build process.

#### Other scripts

* **Build**:
  - Development build: `npm build:dev` / `yarn build:dev`
  - Production build: `npm build:prod` / `yarn build:prod`

* **Linting**:
  - Linting using using [AirBnB JS style guide](https://github.com/airbnb/javascript) and some other packages and customizations.
  `npm lint` or `yarn lint`

* **Testing**:
  - [Jest](https://github.com/facebook/jest) is used for testing.
  `npm test` / `yarn test`

  - Tests can be watched too for easy local development.
  `npm test:watch` / `yarn test:watch`

#### More

As the work is still in progress, I will keep updating this document. Feel free to reach me, I welcome any contributions :)
