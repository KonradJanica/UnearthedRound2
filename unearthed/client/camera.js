var getPicture = function(opts) {
    MeteorCamera.getPicture(opts, function(err, data) {
            if (err) {
            console.log('error', err);
            }
            if (data) {
            Session.set('img', data)
            }
            });
};

Template.cameraEvent.events({
        'click button': function () {
        getPicture({
width: 350,
height: 350,
quality: 75
});
        }
        });
