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

app.get('/views/pages/theme.ejs', function(req, res, next) {
  console.log(req.query)
  console.log(req.xhr)
  res.render('pages/theme', {
    query : req.query,
    theme
  });
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
  var loggedUser;


  socket.on('chat-message', msg => {
    io.emit('chat-message', msg, loggedUser);
  });

  socket.on('disconnect', function () {
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

  socket.on('user-login', user => {
    // Sauvegarde de l'utilisateur et ajout à la liste des connectés
    loggedUser = user;

    // Envoi et sauvegarde des messages de service
    var userServiceMessage = {
      text: 'You logged in as "' + loggedUser.name + '"',
      type: 'login'
    };

    var listUsers = ''
    users.forEach((user) => {
      listUsers.concat(', ', user.name)
      console.log('yoooo', user.name)
    })

    console.log(listUsers)

    var userServiceMessageMemo = {
      text:  users,
      type: 'login'
    };
    var broadcastedServiceMessage = {
      text: 'User "' + loggedUser.name + '" logged in',
      type: 'login'
    };
    socket.emit('service', userServiceMessageMemo);
    users.push(user)
    socket.emit('service-message', userServiceMessage);
    socket.broadcast.emit('service-message', broadcastedServiceMessage);
    // Emission de 'user-login' et appel du callback
    io.emit('user-login', loggedUser, users);
  });

  socket.on('theme-choice', message => {
    socket.broadcast.emit('direction',  '/views/pages/theme.ejs', theme[message])
    // socket.broadcast.emit('theme-choice', theme[message])
    // io.emit('theme-choice', theme[message])
  })
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
