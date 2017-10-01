function rebounder(xi, yi){
    this.x  = xi/2 - 95;
    this.y = yi;
    this.height = 30;
    this.width= 40;
    this.gap=50
    this.fullsize = (this.width*2)+this.gap;//FULL Size of Catcher
    this.maxX= xi -this.fullsize;//width of rectangles and space in between
    this.speed= 60;
    this.activeBalls = [];
    this.color= color(0,255,0);
    this.winner = true;

    this.show = function()   {
         //stroke(0,225,0);
         fill(this.color);
         rect(this.x,this.y,this.width,this.height);
         rect(this.x + 90,this.y,this.width,this.height);
         fill(0,225,0);
         for(var i=0; i< this.activeBalls.length; i++){
             tempBall = this.activeBalls[i];
             if(tempBall.y > 400 || tempBall.y < 0)
             {
                 this.activeBalls.splice(i,1);
             }
             tempBall.show();
         }
         
    }
    this.createBalls = function(barNum){
        if(barNum ===1){//Bottom
        this.activeBalls.push(new ball(this.x + 20, this.y));
        this.activeBalls.push(new ball((this.x + this.fullsize)-20,this.y));
        }
        else{  //TOP ROW
        this.activeBalls.push(new ball(this.x + 20, this.y + this.height));
        this.activeBalls.push(new ball((this.x + this.fullsize)-20,this.y + this.height));
        }
    }

    this.update = function(dir){
        if(this.x < this.maxX && this.x > 0)//Restricting Movements and able to go ________any direction
         {
            if(dir === 1){
                this.x += this.speed;//To the right
                //console.log(this.x);
            }
           else if(dir === 0){
                 this.x -= this.speed;//To the left
                  // console.log(this.x);
            }

          attachedBalls(this.activeBalls,dir,this.speed);

        }//End First If
        else if(this.x === this.maxX){   //IF THE BAR IS AT THE MOST RIGHT_______ CAN ONLY GO LEFT 
            if(dir === 0){
                 this.x -= this.speed;
                   //console.log(this.x);
                 attachedBalls(this.activeBalls,dir,this.speed);

            }
        }//Second If
        else if(this.x === 0)   {     // THE BAR IS AT THE MOST LEFT _________CAN ONLY GO RIGHT
             if(dir === 1){
                 this.x += this.speed;
                   //console.log(this.x);
                 attachedBalls(this.activeBalls,dir,this.speed);
            }
        }//Third If
    }//END OF update

    this.shootBall = function(){
        var dir= -1;
        if(this.y === 10)
        {
            dir = -2;
        }
        try{
        var tempBall = this.activeBalls[0];
        tempBall.attached = false;
        if(dir === -1){
            tempBall.velocity -= tempBall.force;
        }
        else if(dir === -2){
            tempBall.velocity += tempBall.force;
        }
        }
        catch(err){
            console.log("Error Recieved when no ball is there!");
        }
        //this.activeBalls.splice(0,1);
    }//end of shootBall

    this.refreshBalls = function(barNum){
        if(this.activeBalls.length === 0)
        {
            this.createBalls(barNum);
        }
    }

    this.spliceBall = function(ballNum){
        this.activeBalls.splice(ballNum, 1);
    }
    
    this.addBall = function(barNum){
         if(barNum ===1){//Bottom
             if(this.activeBalls.length %2 === 0){
                 this.activeBalls.push(new ball(this.x + 20, this.y));
             }
             else {
                 this.activeBalls.push(new ball((this.x + this.fullsize)-20,this.y));
             }
        }
        else{  //TOP ROW
            if(this.activeBalls.length %2 === 0){
                 this.activeBalls.push(new ball(this.x + 20, this.y + this.height));
             }
             else {
                this.activeBalls.push(new ball((this.x + this.fullsize)-20,this.y + this.height));
             }
        }
    }

}//END of REBOUNDER


function attachedBalls(activeBalls,dir,speed){
     for(var i =0; i<activeBalls.length;i++){
         var tempBall = activeBalls[i];
         if(tempBall.attached)
         {
              tempBall.update(dir,speed);
         }
                   
    }
    
}