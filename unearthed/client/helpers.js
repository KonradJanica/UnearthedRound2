Template.collection.helpers({
    showImages:function() {
        return images.find({'metadata.userId': Meteor.userId()});
    }
});

Template.upload.helpers({
    errorMessage: function() {
        return Template.instance().uploadError.get();
    }
});
