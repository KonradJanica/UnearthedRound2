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
    'click #videoElement': function () {
        //nOverlay.remove();
        //Take a photo
    }
});           

Template.webcam.events({
    'click #closeOverlay': function () {
        nOverlay.remove();
    }
});           
