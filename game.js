var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var canvas = document.getElementById("canvas-id");
canvas.width = 1000;
canvas.height = 640;
var context = canvas.getContext("2d");

var myX,myY,ballX,ballY,moveX,moveY,speed,a,b,c,can,died,size,teklvl,undieable = false;
function create2dArray(length) {
    var array2d = [];
    for (var i = 0; i < length; i++) {
        array2d[i] = [];
        for (var j = 0; j < length; j++) {
            array2d[i][j] = 0;
        }
    }
    return array2d;
}
window.addEventListener("mousemove", function(args) {
    myX = args.x;
    myY = args.y;
    can = true;
}, false);
function init(level)
{
if(level<=70){
myX = 20; myY = 20; ballX = 10; ballY = 10; moveX = 0; moveY = 0; speed = 4+0.008*level; can = false; died = false; size = 10; teklvl = level;
    stena = create2dArray(canvas.width/size);
    for(var i = 0; i < canvas.width/size; i ++)
    {
        for(var j = 0; j < canvas.height/size; j ++)
        {
            stena[i][j] = Math.floor(Math.random()+0.005+level/200);
            //console.log(stena[i][j]);
        }
    }
    for(var i = 0; i < 8; i ++)
    {
        for(var j = 0; j < 8; j ++)
        {
            stena[i][j] = 0;
        }
    }
    stena[canvas.width/size-2][canvas.height-1]=false;
    stena[canvas.width/size-2][canvas.height-2]=false;
    stena[canvas.width/size-1][canvas.height-2]=false;
    }else{died=true;}
}
function move(x1,y1,x2,y2)//neshtoto koeto gonim-koeto goni
{
    a = x1-x2;
    b = y1-y2;
    c = Math.sqrt(a*a+b*b);
    //console.log(a,b,c);
    moveX = a*speed/c;
    moveY = b*speed/c;
}
function update() {
if(died&&undieable)
{
	died = false;
}
if(!died){
    if(can)
    {
        ballX += moveX;
        ballY += moveY;
        move(myX,myY,ballX,ballY);
    }
    if(ballX >= canvas.width-size)
    {
        if(ballY >= canvas.height - size)
        {
            init(teklvl+1);
        }
    }
    if(Math.abs(myX-ballX) < 2&&Math.abs(myY-ballY) < 2)
    {
        died = true;
    }//console.log(moveX);
    for(var i = 0; i < canvas.width/size; i ++)
    {
        for(var j = 0; j < canvas.height/size; j ++)
        {
            if(stena[i][j])
            {
                if(Math.abs(ballX-i*size)<5&&Math.abs(ballY-j*size)<5)
                {
                    died = true;
                }
            }
        }
    }
    
}
    setTimeout(update, 30);
}
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1;    
    context.strokeRect(0,0,canvas.width,canvas.height);
    context.fillStyle = "red";
    if(can)
    {
    context.beginPath();
    context.arc(ballX, ballY, 4, 0, 2*Math.PI);
    context.closePath();
    context.fill();
    
    context.beginPath();
    context.moveTo(myX,myY);
    context.lineTo(ballX,ballY);
    context.closePath();
    context.stroke();
    }
    context.fillStyle = "#0000FF";
    for(var i = 0; i < canvas.width/size; i ++)
    {
        for(var j = 0; j < canvas.height/size; j ++)
        {
            if(stena[i][j])
            {
                context.fillRect(i*size,j*size,size,size);
            }
        }
    }
    context.fillStyle = "red";
    context.fillRect(canvas.width-size,canvas.height-size,size,size);
    context.fillStyle = "#AA00FF";
    context.font = "15pt Arial";
    context.fillText("Level "+(teklvl),10,25);
if(died)
{
    context.font = "15pt Arial";
    context.fillText(":X",90,25);
}
    context.fillStyle = "#000000";
    context.beginPath();
    context.arc(myX, myY, 4, 0, 2*Math.PI);
    context.closePath();
    context.fill();
    requestAnimationFrame(draw);
}
init(1);
update();
draw();