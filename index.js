const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3003;


app.set('view engine', 'ejs');
app.set("trust proxy", 1);

const users = []

const theme = [
    {
      "title" : "L'épilation",
      "img" : "../../assets/images/themes/epilation.jpg"
    },
    {
      "title" : "Les régles",
      "img" : "../../assets/images/themes/regles.jpg"
    }
  ]

let themeSelected = {}

/*
* Redirect to https
*/

app.use (function (req, res, next) {
  if (req.secure || req.rawHeaders[1] == "localhost:3003" || req.rawHeaders[1] == "127.0.0.1:3003" || req.rawHeaders[1] == "10.0.2.2:3003") {
          // request was via https, so do no special handling
          next();
  } else if (!req.secure && req.rawHeaders[1] !== "localhost:3003" || req.rawHeaders[1] !== "127.0.0.1:3003" || req.rawHeaders[1] !== "10.0.2.2:3003") {
          // request was via http, so redirect to https
          res.redirect('https://' + req.headers.host + req.url);
  }
});

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.get('/views/pages/scan.ejs', function(req, res) {
  res.render('pages/scan');
});

app.get('/views/pages/login.ejs', function(req, res) {
  res.render('pages/login');
});

app.get('/views/pages/room.ejs', function(req, res) {
  res.render('pages/room');
});

app.get('/views/pages/theme.ejs', function(req, res) {
  res.render('pages/theme');
});

app.all("*", function (req, resp, next) {
  if (req.params[0].substr(-5,5) === '.html') return
  if (req.params[0].substr(0,7) === '/views/') return

  console.log("wolilo", req.params[0])
  resp.sendFile(__dirname + req.params[0]); // router
});


io.on('connection', (socket) => {

  /**
   * Utilisateur connecté à la socket
   */
  let loggedUser = {
    name : ''
  }


  socket.on('chat-message', msg => {
    io.emit('chat-message', msg, loggedUser);
  });

  socket.on('disconnect', () => {
    if (loggedUser !== undefined) {
      // Broadcast d'un 'service-message'
      var serviceMessage = {
        text: 'User "' + loggedUser.name + '" disconnected',
        type: 'logout'
      };
      socket.broadcast.emit('service-message', serviceMessage);
      // Suppression de la liste des connectés
      var userIndex = users.indexOf(loggedUser);
      if (userIndex !== -1) {
        users.splice(userIndex, 1);
      }
      // Emission d'un 'user-logout' contenant le user
      io.emit('user-logout', loggedUser);
    }
  });

  socket.on('user-login', user => { loggedUser = user; })

  socket.on('room-load', () => {

    // Envoi et sauvegarde des messages de service
    const userServiceMessage = {
      text: 'You logged in as "' + loggedUser.name + '"',
      type: 'login'
    };

    let listUsers = ''
    users.forEach((user) => {
      if(user) {
        listUsers.concat(', ', user.name)
      }
    })

    const userServiceMessageMemo = {
      text:  users,
      type: 'login'
    };

    const broadcastedServiceMessage = {
      text: 'User "' + loggedUser.name + '" logged in',
      type: 'login'
    };

    socket.emit('service', userServiceMessageMemo);
    users.push(loggedUser)
    socket.emit('service-message', userServiceMessage);
    socket.broadcast.emit('service-message', broadcastedServiceMessage);
    // Emission de 'user-login' et appel du callback
    io.emit('user-login', loggedUser);
  });

  socket.on('theme-choice', message => {
    themeSelected = theme[message]
    socket.emit('direction',  '/views/pages/theme.ejs')
    socket.broadcast.emit('direction',  '/views/pages/theme.ejs')
  })

  socket.on('theme-load', () => {
    socket.emit('theme-selected', themeSelected)
  })
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
