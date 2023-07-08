let buttonColors=["red","blue","green","yellow"];
let gamePattern=[];
var level=0;
var CurrentLevel=0;
function nextSequence(){
    var randomNum= Math.floor((Math.random()*4));
    let randomChosenColor=buttonColors[randomNum];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();
    currentLevel=0;
    $("h1").text("Level "+ (++level));
} 

function handler(colorPressed,k){
    if(colorPressed!==gamePattern[k-1]){
        gameEnd();
    }
    if(k===level){
        setTimeout(function(){
            nextSequence();
        },800);
       
    }
}
$(".btn").on("click",function(){   
    handler(this.id,++currentLevel);
    playsound(this.id);
    animatePress(this.id);
})

function playsound(name){
    var aud = new Audio("sounds/" + name + ".mp3");
    aud.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed")
    },100);
}

var bound=true;
$(document).keypress(function(){
    if(bound===true){
        setTimeout(function() {
            nextSequence();  
        },200);
       
        bound=false;
    }
})

function gameEnd(){
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart")
    var endAud= new Audio("sounds/wrong.mp3");
                endAud.play();
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200); 
    
    gamePattern=[];
    level=0;
    bound=true;           
}