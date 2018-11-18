
var express = require('express');

var app = express();


var server = app.listen(process.env.PORT || 3000, listen);


function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server Listening at http://' + host + ':' + port);
}

app.use(express.static('public'));



var io = require('socket.io')(server);
var painti = []
var indexi = 0

io.sockets.on('connection',




  function (socket) {
  
    console.log("We have a new client: " + socket.id);
  
    socket.on('mouse',
      function(data) {
      indexi = indexi + 1
      painti[indexi] = data
        socket.broadcast.emit('mouse', data);

      }
    );
  
      socket.on('reset',
      function(data) {

        console.log("reset");
        painti = []
        indexi = 0
        socket.broadcast.emit('reset', data);


      }
    );

  socket.on('inforeq',
      function(data) {
        for (var i = 1; i < painti.length; i++) {
    io.emit('mouse', painti[i]);
  }

      }
    );
      
    
    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);

