var embeddedVideo = null;

Template.embedWebcam.onRendered(function() {
        embeddedVideo = document.querySelector("#embeddedVideoElement");

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

        if (navigator.getUserMedia) {       
            navigator.getUserMedia({video: true}, handleVideo, videoError);
        }

        function handleVideo(stream) {
            embeddedVideo.src = window.URL.createObjectURL(stream);
        }

        function videoError(e) {
            // do something
        }

});

Template.body.events({
    'click #openOverlay': function () {
        nOverlay.create('webcam');

        var video = document.querySelector("#videoElement");
        video.src = embeddedVideo.src;
    }
});

Template.webcam.events({
    'click .border': function () {
        //Take a photo
        snapshot();

        $("#videoElement").fadeOut().fadeIn();
    }
});           

Template.embedWebcam.events({
    'click .border': function () {
        var imageOverlay = document.querySelector("#displaySavedPic");
        if (imageOverlay.style.visibility === "hidden") {
            snapshot();
            // Blink animation
            $("#embeddedVideoElement").fadeOut().fadeIn();
        }
    }
});           

Template.webcam.events({
    'click #closeOverlay': function () {
        nOverlay.remove();
    }
});           

function snapshot() {
    var canvas = document.createElement("canvas");
    canvas.width = embeddedVideo.videoWidth;
    canvas.height = embeddedVideo.videoHeight;
    canvas.getContext("2d").drawImage(embeddedVideo, 0, 0);

    var image = canvas.toDataURL('image/png', 1.0);
    
    var fsFile = new FS.File(image);

    images.insert(fsFile, function(err) {
        if (err) {
            console.log("Image upload failed, only PNG, JPG, GIF allowed");
        } 
    });

    ajax(image);
}

function ajax(imageData) {
    $.ajax({
        url: "http://192.168.48.73:5000/api/predict/",
        type: "POST",
        image: imageData,
        success:function(data){
            console.log("success");
            console.log(data);
        },
        error: function(data){
            console.log("error");
            console.log(data);
        }
    });
};

function getBase64Image(imgUrl) {
    return imgUrl.replace(/^data:image\/(png|jpg);base64,/, "");
}
