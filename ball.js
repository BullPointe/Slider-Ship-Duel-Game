function ball(xi,yi){
    this.r= 6.5; 
    this.x = xi;
    this.y = yi;
    this.velocity= 0;
    this.attached = true;
    this.force = 15;


    this.show = function(){
    this.y += this.velocity;
     fill(0,200,0);
     ellipse(this.x, this.y, this.r *2, this.r*2);
    }

    this.update = function(vi,speed){
         if(vi === 1){
                this.x += speed;//To the right
         }
         else if(vi === 0){
                 this.x -= speed;//To the left
         }
    }

    this.checkHit = function(checkBar){
        var min1X = checkBar.x;
        var max1X = min1X + checkBar.width;
        var min2X = max1X + checkBar.gap;
        var max2X = min2X + checkBar.width;
        var hitY = checkBar.y;

        if(this.x >= min1X && this.x <= max2X){//Within range of bar
            var yRadiusDown = this.y + this.r;
            var yRadiusUp = this.y - this.r;
            if(this.x > max1X && this.x < min2X){
                //BALL IS IN CATCHING RANGE
                if(hitY === 10 && yRadiusUp <= hitY){//TOP BAR
                         //console.log("CAUGHTT!!!!");
                         changeTempColor(checkBar);
                         checkBar.addBall(0);
                        //SPLICE TO PERVENT ANY FURTHER CHECKS
                        return 0;
                       
                }
                else if(hitY ==360 && yRadiusDown >= hitY) {//BOTTOM BAR
                    //console.log("CAUGHTT!!!!");
                      changeTempColor(checkBar);
                     checkBar.addBall(1);
                    //SPLICE TO PREVENT ANY FURTHER CHECKS
                    return 0;
                   
                }
            }
            else{
                //BALL HIT THE BAR
                 if(hitY === 10 && yRadiusUp <= hitY){
                        //console.log("HITTTT");
                        checkBar.color = color(255,0,0);
                        checkBar.winner = false;
                        return 1;
                }
                else if(hitY ==360 && yRadiusDown >= hitY)
                {
                    //console.log("HITTTT");
                    checkBar.color = color(255,0,0);
                    checkBar.winner = false;
                    return 1;
                }
            }

        }
    }
}

function changeTempColor(bar){
    bar.color = color(255);
  setTimeout(function() {
                     bar.color= color(0,255,0); 
                    }, 300);
}

