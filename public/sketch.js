var socket;

var colorinputs = [];
var sizeinput;

function setup() {
  createCanvas(1000, 800);
  background(0);

  socket = io.connect('https://evil-factory.herokuapp.com/');

    button = createButton('Reset');
  button.position(0, 0);
  button.mousePressed(greet);
  
var name = ["Red","Blue","Green"]

colort = createElement('h2', "Color"); 
colort.position(1123, 30);

for (var i = 0; i < name.length; i++) {

colorinputs[i] = createInput();
colorinputs[i].position(1100, 65+47*(i+1));
colorinputs[i].value("255");
colorinputs[i].size(50,20)

textr = createElement('h2', name[i]); 
textr.position(1170, 49+44*(i+1));
}

sizeinput = createInput();
sizeinput.position(1100, 320);
sizeinput.value("20");
sizeinput.size(50,20)

text = createElement('h2', "Size"); 
text.position(1127, 250);



  socket.on('mouse',

    function(data) {
    console.log(data)
      fill(data.c[0],data.c[1],data.c[2]);
      noStroke();
      ellipse(data.x, data.y, data.a, data.a);
    }
  );
  
    socket.on('reset',

    function(data) {
       background(0);
    }
  );

socket.emit('inforeq');

}

function draw() {
 
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

  var r = parseInt(colorinputs[0].value());
  var g = parseInt(colorinputs[1].value());
  var b = parseInt(colorinputs[2].value());

  fill(r,g,b);
  noStroke();
  ellipse(mouseX,mouseY,parseInt(sizeinput.value()),parseInt(sizeinput.value()));

  sendmouse(mouseX,mouseY, [r,g,b], parseInt(sizeinput.value()));
}


function sendmouse(xpos, ypos, color, size) {
  console.log("sendmouse: " + xpos + " " + ypos);
  
  var data = {
    x: xpos,
    y: ypos,
    c: color,
    a: size
  };

  socket.emit('mouse',data);
}
