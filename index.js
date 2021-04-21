const dotenv = require('dotenv')
dotenv.config()
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3003
const domain = process.env.DOMAIN_HOST || "localhost"
const ip = process.env.IP || "127.0.0.1"
var environment = process.env.NODE_ENV || 'development';



app.set('view engine', 'ejs');
app.set("trust proxy", 1);

/*
* Redirect to https
*/

app.use (function (req, res, next) {
  if (req.secure || req.rawHeaders[1] == `${domain}:${port}` ||  req.rawHeaders[1] == `${ip}:${port}` ) {
          // request was via https, so do no special handling
          next();
  } else if (!req.secure && req.rawHeaders[1] !== `${domain}:${port}` || req.rawHeaders[1] == `${domain}:${port}`) {
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

app.all("*", function (req, resp, next) {
  if (req.params[0].substr(-5,5) === '.html') return
  if (req.params[0].substr(0,7) === '/views/') return

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

  socket.on('user-login', user => {
    // Sauvegarde de l'utilisateur et ajout à la liste des connectés
    loggedUser = user;

    // Envoi et sauvegarde des messages de service
    var userServiceMessage = {
      text: 'You logged in as "' + loggedUser.username + '"',
      type: 'login'
    };
    var broadcastedServiceMessage = {
      text: 'User "' + loggedUser.username + '" logged in',
      type: 'login'
    };
    socket.emit('service-message', userServiceMessage);
    socket.broadcast.emit('service-message', broadcastedServiceMessage);
    // Emission de 'user-login' et appel du callback
    io.emit('user-login', loggedUser);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
