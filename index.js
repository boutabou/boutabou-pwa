const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');

/*
* Redirect to https
*/
/*app.get('/', function(req, res) {
  res.redirect('https://' + req.headers.host + req.url);
})*/

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.all("*", function (req, resp, next) {
  if (req.params[0].substr(-5,5) === '.html') return

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
