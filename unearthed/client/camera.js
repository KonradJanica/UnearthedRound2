Template.webcam.onRendered(function() {

        var video = document.querySelector("#videoElement");

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

        if (navigator.getUserMedia) {       
            navigator.getUserMedia({video: true}, handleVideo, videoError);
        }

        function handleVideo(stream) {
            video.src = window.URL.createObjectURL(stream);
        }

        function videoError(e) {
            // do something
        }

        });

Template.body.events({
    'click #openOverlay': function () {
        nOverlay.create('webcam');
    }
});

Template.webcam.events({
    'click #videoElement': function () {
        nOverlay.remove();
    }
});           
