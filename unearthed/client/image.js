Template.image.events({
    'click': function (event) {
        var imageOverlay = document.querySelector("#displaySavedPic");
        imageOverlay.src = $(event.target).context.childNodes[1].src;
        imageOverlay.style.visibility = "visible";
    }
});
