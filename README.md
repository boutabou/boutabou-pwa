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
│   ├── Fonts
│   ├── Icons
│   ├── Images
├── Node_modules
├── Public                 // Compiled file
│   ├── Main.css
│   ├── Main.js            // File call by Index.js
├── Server                 
│   ├── Data               // Json data file
│   ├── Utils              
│   ├── Router.js  
│   ├── Game.js  
│   ├── Room.js  
│   ├── Interaction.js  
│   ├── Task.js   
│   ├── Tasks.js          
│   ├── User.js          
├── Src
│   ├── Scripts
│   │   ├── Blobs
│   │   │   ├── Blobs.js
│   │   ├── Blocks          // Front-end js file
│   │   │   ├── Block.js
│   │   │   ├── BlockManager.js
│   │   ├── Utils
│   ├── Styles
│   │   ├── Abstracts
│   │   ├── Base
│   │   ├── Blocks
│   │   ├── Components
│   │   ├── Pages
│   ├── Main.js
│   ├── Main.scss
├── View
│   ├── Blocks
│   ├── Components
│   ├── Pages
│   ├── Partials
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
