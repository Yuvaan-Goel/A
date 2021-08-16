status= "";
video= "";
objects= "";

function preload()
{
    video = createVideo("video.mp4");
    video.hide();
}

function setup()
{
    canvas = createCanvas(600, 400);
    canvas.center();
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);

    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded");
    video.loop();
    status = true;
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}

function draw()
{
    image(video, 0, 0, 600, 400);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i=0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML= "Status: Objects Detected";
            document.getElementById("number-of-objects").innerHTML= "Number of Objects: " + objects.length;
            fill("red");
            noFill();
            stroke("red");
            percent= floor(objects[0].confidence * 100);
            text(objects[0].label + " " + percent + "%", objects[0].x, objects[0].y);
            rect(objects[0].x, objects[0].y, objects[0].width, objects[0].height);
        }
    }
}