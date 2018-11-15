// ITP Networked Media, Fall 2014
// https://github.com/shiffman/itp-networked-media
// Daniel Shiffman

// Keep track of our socket connection
var socket;

function setup() {
  createCanvas(1000, 800);
  background(0);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('https://frede-test.herokuapp.com/');
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('mouse',
    // When we receive data
    function(data) {
      console.log("Got: " + data.x + " " + data.y);
      // Draw a blue circle
      fill(data.c[0],data.c[1],data.c[2]);
      noStroke();
      ellipse(data.x, data.y, 20, 20);
    }
  );
}

function draw() {
  // Nothing
}

  button = createButton('REset');
  button.position(500, 65);
  button.mousePressed(greet);

function mouseDragged() {
  // Draw some white circles
  fill(255);
  noStroke();
  ellipse(mouseX,mouseY,20,20);
  // Send the mouse coordinates
  sendmouse(mouseX,mouseY, [255,0,0]);
}

window.addEventListener("keydown", function(event){

    if(event.keyCode == 87){
    	  fill(0);
  noStroke();
  ellipse(mouseX,mouseY,20,20);
  sendmouse(mouseX,mouseY, [0,0,0]);
    }

}, false);


// Function for sending to the socket
function sendmouse(xpos, ypos, color) {
  // We are sending!
  console.log("sendmouse: " + xpos + " " + ypos);
  
  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos,
    c: color
  };

  // Send that object to the socket
  socket.emit('mouse',data);
}
