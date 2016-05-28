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

Template.image.rendered = function(){
    (function() {
        var $frame = $('#basic');
        var $slidee = $frame.children('ul').eq(0);
        var $wrap = $frame.parent();
        var sly = new Sly($frame, {
            horizontal: 1,
            itemNav: 'basic',
            smart: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            // startAt: 0,
            scrollBar: $wrap.find('.scrollbar'),
            scrollBy: 1,
            pagesBar: $wrap.find('.pages'),
            activatePageOn: 'click',
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,

            // Buttons
            forward: $wrap.find('.forward'),
            backward: $wrap.find('.backward'),
            prev: $wrap.find('.prev'),
            next: $wrap.find('.next'),
            prevPage: $wrap.find('.prevPage'),
            nextPage: $wrap.find('.nextPage')
        });
        sly.init();
    }());
}
