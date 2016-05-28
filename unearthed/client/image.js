Template.image.events({
    'click': function (event) {

        var imageOverlay = document.querySelector("#displaySavedPic");
        imageOverlay.src = $(event.target).context.src;
        imageOverlay.style.visibility = "visible";
    }
});
