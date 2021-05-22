<a href="https://gitmoji.dev">
  <img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji">
</a>

# Boutabou - Progressive Web App

## Installation

Clone the repository and install dependencies

```sh
$ npm install
```

Run project locally on port 3003

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

## Working process

The main branch is our **main** branch which contains the updated version of the app. The **preprod** branch is used to deploy our application on our [domain name](https://tohubohu.herokuapp.com/). For each feature, we create a branch with the name of the feature we are going to develop.

We use gitmoji to name our commits.

## Made with

* [Socket.io](https://socket.io/) - JavaScript library enables real-time, bidirectional and event-based communication.
* [Express.js](https://expressjs.com/fr/) -  Node.js web application infrastructure
* [Swup.js](https://swup.js.org/) - JavaScript library for page transition
* [Webpack](https://webpack.js.org/) - Module bundler
* [EJS](https://ejs.co/) - Embedded JavaScript templating
* [GSAP](https://greensock.com/gsap/) - Javascript library for animations
* [Paper.js](http://paperjs.org/) - Javascript library for canvas
