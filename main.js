song=""
scoreRightWrist=0;
scoreLeftWrist=0;
rightWristX=0;
rightWristY=0;
LeftWristX=0;
LeftWristY=0;



function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide()
    poseNet=ml5.poseNet(video,modelloaded);
    poseNet.on('pose',gotposes);
    
}

function modelloaded(){
    console.log("poseNet is intialized")
}

function gotposes(results){
    console.log(results);
    if(results.length>0){
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = "+scoreLeftWrist+"scoreRightWrist = " +scoreRightWrist);
        LeftWristX=results[0].pose.leftWrist.x;
        LeftWristY=results[0].pose.leftWrist.y;
        console.log(" LeftWristX = "+LeftWristX+" LeftWristY = "+LeftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log(" rightWristX = "+rightWristX+" rightWristY = "+rightWristY);
    }
}

function draw(){
    image(video,0,0,600,500);
    fill("#ff0000");
    stroke("#ff0000");
   console.log("inside draw function");
if(scoreRightWrist>0.2){
    circle(rightWristX,rightWristY,20);

    if(rightWristY>0 && rightWristY<=100){
        document.getElementById("speed").innerHTML="speed=0.5x";
        song.rate(0.5);
        console.log("speed=0.5")

    }
    else if(rightWristY>100 && rightWristY<=200){
        document.getElementById("speed").innerHTML="speed=1x";
        song.rate(1);
        console.log("speed=1")
    }
    else if(rightWristY>200 && rightWristY<=300){
        document.getElementById("speed").innerHTML="speed=1.5x";
        song.rate(1.5);
        console.log("speed=1.5")

    }
    else if(rightWristY>300 && rightWristY<=400){
        document.getElementById("speed").innerHTML="speed=2x";
        song.rate(2);
    }
    else if(rightWristY>400 && rightWristY<=500){
        document.getElementById("speed").innerHTML="speed=2.5x";
        song.rate(2.5);
    }
}

    if(scoreLeftWrist > 0.2){
        circle(LeftWristX, LeftWristY, 20);
        innumberLeftWristY=Number(LeftWristY);
        remove_decimal=floor(innumberLeftWristY);
        volume=remove_decimal/500;
        document.getElementById("volume").innerHTML="volume " +volume;
        song.setVolume(volume);
    }

    
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(2);
}

function stop(){
    song.stop();
}