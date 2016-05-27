images = new FS.Collection("images", {
    stores: [new FS.Store.GridFS("imageStore")],
    filter: {
        maxSize: 20000000, // 20mb in bytes
        allow: {
            contentTypes: ['image/*'],
            extensions: ['png','jpg','gif']
        },
        onInvalid: function (message) {
            if(Meteor.isClient) {
                alert(message);
            } else {
                console.log(message);
            }
        }
    }
});

if(Meteor.isClient){
    Meteor.subscribe('images');
}
