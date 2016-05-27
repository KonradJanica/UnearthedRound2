Template.upload.onCreated(function() {
    this.uploadError = new ReactiveVar("");
});

Template.upload.events({
    'submit .upload-task': function(event, template) {
        event.preventDefault();

        var file = $('#imageUpload').get(0).files[0];
        var fsFile = new FS.File(file);

        images.insert(fsFile, function(err) {
            if (err) {
                template.uploadError.set("Image upload failed, only PNG, JPG, GIF allowed");
            } else {
                template.uploadError.set("Image upload success");
            }
        })
    }
});
