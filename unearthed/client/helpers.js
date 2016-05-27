Template.collection.helpers({
    showImages:function() {
        return images.find();
    }
});

Template.upload.helpers({
    errorMessage: function() {
        return Template.instance().uploadError.get();
    }
});
