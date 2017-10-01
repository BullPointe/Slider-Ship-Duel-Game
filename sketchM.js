var bars = [];
var winner=1;
var finalImage;
var socket;
function setup() {
    createCanvas(670,400); 
    resetSketch();//Method is at the bottom
    //fill(0,0,255);
    socket = io.connect('http://localhost:3000');
    socket = io("/onlineSpace");
    socket.on("obChange",function(data){
        recievedInput(data);
    } );
}
function draw() {
    background(0);
    //Sets up the postion of the bars and balls constant loop
    for (var i = 0; i < bars.length; i++) {
        var tempBar = bars[i];
        tempBar.show();
        tempBar.refreshBalls(i);
        for(var x=0; x < tempBar.activeBalls.length; x++)  {
            var tempBall = tempBar.activeBalls[x];
            var answer;
            if(i === 0){
            var checkBar = bars[1];
            var answer =  tempBall.checkHit(checkBar);
            }
            else if(i === 1){
            var checkBar = bars[0];
            var answer =  tempBall.checkHit(checkBar);
            }
            if(answer === 0){
            tempBar.spliceBall(x);
            }
            else if(answer === 1)
            {
                if(bars[0].winner === false){
                    winner = 2;
                }
                //GAME OVER STOPS THE LOOP(FREEZES THE FRAME) AND CAllS FUNCTION endGame()
               noLoop();
               endGame();
            }
        }
    }
}
 

function endGame(){
    //NEEDS CHANGE
    if(winner === 1){
        document.getElementById("PlayerId").style.color = "white";
    }
    else{
         document.getElementById("PlayerId2").style.color = "white";
    }
    //alert("Game Over!!!! Restarts in 3 Seconds");   
    setTimeout(function() {
                    //  alert("Player" + ' ' + winner + " wins!!! \n The Game restarts");
                     //console.log(winner);
                     resetSketch(); 
                    }, 3000);

}

function resetSketch(){
    //NEEDS TO CHANGE TO MATCH MAKING
    //Resets the canvas 
   // frameRate(100);
//    console.log("Reset!!!");
   loop();
   for(var x=bars.length-1; x >=0; x--)
   {
      //REMOVES ALL THE BARS WITHIN THE BARS ARRAY
      bars.splice(x);
   }
   //CANVAS RESEST!!!!!!!!!!!
    bars.push(new rebounder(width,10), new rebounder(width,360));
    for (var i = 0; i < bars.length; i++) {
        var tempBar = bars[i];
        tempBar.createBalls(i);
    }
    //PLAYER TITLE COLOR RESET
    document.getElementById("PlayerId").style.color = "black";
    document.getElementById("PlayerId2").style.color = "black";

    winner = 1;
}

function recievedInput(data){
    //console.log(data);
    var bar = bars[0];
    if(data>=0){
    bar.update(data);
    }
    else
    {
        bar.shootBall();
    }
}
//HOLDS THE KEY VALUES FROM EACH BUTTON PUSH
function keyPressed(){
    var data;
    if(keyCode == RIGHT_ARROW){
        //console.log("Right");
        var bar = bars[1];//BOTTOM USER
        bar.update(1);//MAKE X postive
        data = 1;
        socket.emit("objectChange", data);

    }
    else if(keyCode == LEFT_ARROW){
        //console.log("Left");
        var bar = bars[1];//BOTTOM USER
        bar.update(0);//Make x Negative
        data = 0;
        socket.emit("objectChange", data);
    }
    if(keyCode == UP_ARROW){
        //SHOOT THE BALL
        var bar = bars[1];
        bar.shootBall();//TO GO UP;
        data = -1;
        socket.emit("objectChange", data);
    }
    //return false;
}