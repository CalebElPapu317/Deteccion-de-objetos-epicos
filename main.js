
objects = [];
estatus = "";

function preload(){
    video = createVideo('X2Download.app-Carrera bajo la lluvia en canicas f1 con 12 bolas campestres-(1080p).mp4')
}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.position(300, 300);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocosod', modelLoaded);
    document.getElementById("status").innerHTML = "Estado: detectando objetos";
}

function modelLoaded(){
    console.log("¡Modelo cargado!");
    estatus = true;
    video.loop();
    video.speed(1);
    video.volume(1);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 400, 380,);
    if(estatus != "")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Estado: objeto detectado";
            document.getElementById("number_of_objects").innerHTML = "Número de objetos detectados: " + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}