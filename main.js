status = "";
object_name = "";
objects = [];
object_detecter = "";

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();

    webcam = createCapture(VIDEO)
    webcam.hide();
}

function start(){
    cocoSSD = ml5.objectDetector('cocossd', modalLoaded);
    document.getElementById("info").innerHTML = "STATUS:  Decting Objects";
    object_name = document.getElementById("input"). value;
}

function modalLoaded(){
    console.log("cocossd has been initialised");
    status = true;
}

function draw(){
    image(webcam, 0, 0, 480, 380);
    if(status != "true"){
        object_detecter.detect(webcam,gotResult);
        for(i = 0;i < objects.length;i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            console.log(objects.length);
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(object[i].label + " " + "%",objects[i].x + 15,object[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            if(object[i].label == input){
                video.stop();
                object_detecter.detect(gotResult);
                document.getElementById("object_found").innerHTML = input+" Found";
                var synth = window.SpeechSynthesis;
                var UtterThis = new speechSynthesisUtterance(input + "Found");
                synth.speak(UtterThis);
            }
            else{
                document.getElementById("object_found").innerHTML = input + " Not Found";
            }
        }
    }
}

function gotResult(){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results
    }
}