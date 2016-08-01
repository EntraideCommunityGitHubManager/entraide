angular.module("entraide").factory("AnimBackgroundService", function(){

    var animBackgroundService = {
        videos: [],
        getBackgroundVideo: function(videoId, sourceVideo, forceAutoplay){
            var service = this;
            var videoInstance = null;
            videoInstance = _.findWhere(service.videos, {videoId:videoId});
            if(!videoInstance){
                bigVideo = new $.BigVideo({videoId:videoId, forceAutoplay:forceAutoplay});
                bigVideo.init();
                videoInstance = {videoId:videoId, sourceVideo:sourceVideo, bigVideo:bigVideo};
                service.videos.push(videoInstance);
            }
            return videoInstance;
        },
        playVideo : function(videoId, sourceVideo, forceAutoplay){
            var service = this;
            var videoInstance = service.getBackgroundVideo(videoId, sourceVideo, forceAutoplay);
            videoInstance.bigVideo.show(videoInstance.sourceVideo, {ambient:true});
        },
        stopVideo : function(videoId){
            var service = this;
            var videoInstance = service.getBackgroundVideo(videoId);
            videoInstance.bigVideo.hide();
        }

    };

    return animBackgroundService;
});
