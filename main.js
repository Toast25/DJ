sound="";

right_w_x=0;
right_w_y=0;

left_w_x=0;
left_w_y=0;

score_right=0;
score_left=0;
function preload() {
 sound = loadSound('music.mp3');
}
function setup() {
    canvas = createCanvas(750,500);
    canvas.center()

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, model_loaded);
    posenet.on("pose", gotresults);
}
function draw() {
    image(video, 0, 0,750,500);

fill("crimson");
stroke("lightskyblue");

if (score_right>0.1) {
    circle(right_w_x, right_w_y, 25);

    if (right_w_y>0 && right_w_y<=100){
        sound.rate(0.5);
        document.getElementById("speed").innerHTML = "speed = 0.5x";
    }
    else if(right_w_y>100 && right_w_y<=200){
        sound.rate(1);
        document.getElementById("speed").innerHTML = "speed = 1x";
    }
    else if (right_w_y>200 && right_w_y<=300){
        sound.rate(1.5);
        document.getElementById("speed").innerHTML = "speed = 1.5x";
    }
    else if(right_w_y>300 && right_w_y<=400){
        sound.rate(2);
        document.getElementById("speed").innerHTML = "speed = 2x";
    }
    else if (right_w_y>400){
        sound.rate(2.5);
        document.getElementById("speed").innerHTML = "speed = 2.5x";
    }
}

if (score_left>0.1) {
    circle(left_w_x, left_w_y, 25);
    number_y = Number(left_w_y);
    no_dec= floor(number_y);
    volume= no_dec/500; 
    sound.setVolume(volume);
    document.getElementById("volume").innerHTML="Volume =" + volume;
}


}
function model_loaded() {
    console.log("The modal has been loaded");
}
function gotresults(results) {
    if (results.length > 0) {
        console.log(results);

        score_left= results[0].pose.keypoints[9].score;
        score_right=results[0].pose.keypoints[10].score;

        
        left_w_x=results[0].pose.leftWrist.x;
        left_w_y=results[0].pose.leftWrist.y;

        right_w_x=results[0].pose.rightWrist.x;
        right_w_y=results[0].pose.rightWrist.y;
    }
}
function play() {
sound.play();
sound.setVolume(1);
sound.rate(1);
}
