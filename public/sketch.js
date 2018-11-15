
var socket;

function setup() {
  createCanvas(1000, 800);
  background(0);

  socket = io.connect('https://evil-factory.herokuapp.com/');

    button = createButton('Reset');
  button.position(0, 0);
  button.mousePressed(greet);
  
  socket.on('mouse',

    function(data) {

      fill(data.c[0],data.c[1],data.c[2]);
      noStroke();
      ellipse(data.x, data.y, 20, 20);
    }
  );
  
    socket.on('reset',

    function(data) {
       background(0);
    }
  );
}

function draw() {
  // Nothing
}



function greet(){
  background(0);
    var data = {
    x: 53,
    y: 432
  };
  
  socket.emit('reset',data)
}

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
