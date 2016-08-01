angular.module("entraide").factory("AnimBackgroundService", function($log){

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
            if(videoInstance){
                videoInstance.bigVideo.hide();
            } else {
                $log.warning('Video to hide not found : ' + videoId);
            }
        }

    };

    return animBackgroundService;
});
