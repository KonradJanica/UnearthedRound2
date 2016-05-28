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
        //Take a photo
        snapshot();

        $("#embeddedVideoElement").fadeOut().fadeIn();
    }
});           

Template.webcam.events({
    'click #closeOverlay': function () {
        nOverlay.remove();
    }
});           

function snapshot() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    ctx.drawImage(embeddedVideo, 0, 0);
    
    fsFile = new FS.File();
    fsFile.attachData(canvas.toDataURL('image/png'));

    images.insert(fsFile, function(err) {
        if (err) {
            template.uploadError.set("Image upload failed, only PNG, JPG, GIF allowed");
        } else {
            template.uploadError.set("Image upload success");
        }
     })
}
