Webcam.set({
    width: 360,
    height: 250,
    image_format: 'jpeg',
    jpeg_quality: 90
})
Webcam.attach("#camera");

function takeSnap() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "image" src = "'+ data_uri+'">'
    })
   
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/yXjkTRTRM/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model loaded sucessfully")
}

function Speak() {
    synth = window.speechSynthesis;
    speakData = "First prediction is" + prediction1;

    utterThis = new SpeechSynthesisUtterance(speakData);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("image");
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        

        prediction1 = result[0].label;
        document.getElementById("predicted").innerHTML = prediction1;

        Speak();
    }
}