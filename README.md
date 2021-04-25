<a href="https://gitmoji.dev">
  <img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji">
</a>

# Boutabou - Progressive Web App

## Installation

Clone the repository and install dependencies

```sh
$ npm install
```

Run project locally

```sh
$ npm run dev
```

## Architecture

```
├── Assets
├── Node_modules
├── Public                   // Compiled file
│   ├── Main.css
│   ├── Main.js
├── Server                   // Server file call by Index.js
│   ├── Data
│   ├── Socket
│   │   ├── SocketManager.js
│   ├── Router.js
├── Src
│   ├── Scritps
│   │   ├── Blocks          // Front-end js file
│   │   ├── Utils
│   ├── Styles
│   ├── Main.js
│   ├── Main.scss
├── View
├── Index.js               // Serveur nodeJS
├── Manifest.json          // PWA file
├── Package.json
├── Package-lock.json
├── ServiceWorker.js       // PWA file
├── Webpack.config.js
```

## Made with

* [Socket.io](https://socket.io/) - JavaScript library enables real-time, bidirectional and event-based communication.
* [Swup.js](https://swup.js.org/) - JavaScript library for page transition
* [Webpack](https://webpack.js.org/) - Module bundler
* [EJS](https://ejs.co/) - Embedded JavaScript templating
