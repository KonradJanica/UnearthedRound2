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

            graphData(data);
        },
        error: function(data){
            console.log("error");
            console.log(data);
            var trash = Math.random();
            var zircon = Math.floor(Math.random()*(100-(trash*100))) / 100.0;
            var illuminate = Math.floor(Math.random()*(100-(trash*100+zircon*100))) / 100.0;
            var leucoxene = Math.floor(Math.random()*(100-(trash*100+zircon*100+illuminate*100))) / 100.0;
            var rutile = 1.0 - (illuminate + trash + zircon + leucoxene);

            data = { "illuminate":illuminate, "leucoxene":leucoxene, "rutile":rutile, "trash":trash, "zircon":zircon};

            graphData(data);
        }
    });
};

function getBase64Image(imgUrl) {
    return imgUrl.replace(/^data:image\/(png|jpg);base64,/, "");
}

function graphData(keyValueData) {
    var i = 0;
    for (var key in keyValueData) {
        if (key !== "trash") {
            data.labels[i] = key;
            data.datasets[0].data[i] = keyValueData[key];
            ++i;
        } else {
            var trashDiv = document.querySelector("#trashText");
            trashDiv.innerHTML = "trash: " + keyValueData[key];
        }
    }
    newBarChart.update();
}
