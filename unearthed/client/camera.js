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

        document.querySelector("#displaySavedPic").style.visibility = "hidden";
});

Template.body.events({
    'click #openOverlay': function () {
        if (document.querySelector("#displaySavedPic").style.visibility === "hidden") {
            nOverlay.create("webcam");

            var video = document.querySelector("#videoElement");
            video.src = embeddedVideo.src;
        } else {
            nOverlay.create("pictureFullscreen");

            var video = document.querySelector("#videoElement");
            video.src = document.querySelector("#displaySavedPic").src;
        }
    }
});

Template.webcam.events({
    'click .snapPhoto': function () {
        //Take a photo
        snapshot();

        $("#videoElement").fadeOut().fadeIn();
    }
});

Template.embedWebcam.events({
    'click .snapPhoto': function () {
        if (document.querySelector("#displaySavedPic").style.visibility === "hidden") {
            //Take a photo
            snapshot();
            sly.reload();
            sly.toEnd();
    
            $("#embeddedVideoElement").fadeOut().fadeIn();
        }
    }
});

Template.webcam.events({
    'click #closeOverlay': function () {
        nOverlay.remove();
    }
});

Template.pictureFullscreen.events({
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

    var data = { "min1":0.3, "min2":0.4, "min3":0.1, "min4":0.1, "min5":0.1};

    graphData(data);
}

function ajax(image) {
    $.ajax({
        url: "http://192.168.48.73:5000/api/predict/",
        type: "POST",
        data: JSON.stringify({'image':getBase64Image(image)}),
        processData: false,
        contentType: "application/json; charset=UTF-8",
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

function graphData(keyValueData) {
    for (var key in keyValueData) {
        console.log(key + " : " + keyValueData[key]);
    }
    data.datasets.data = keyValueData;
    console.log(data);
    newBarChart.update();
}
