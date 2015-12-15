angular.module('entraide').directive('animButton', function(){

    return {
        restrict: 'AEC',
        replace: true,
        scope: {
            animButtonIcon: '@',
            animButtonType: '@',
            animButtonSubType: '@'
            animButtonCallback: '&'
        },
        templateUrl: 'client/app/common/directives/anim-button/anim-button.ng.html',
        controller: function($scope){
            $scope.config = {
            	winona : {
            		'class' : 'anim-button anim-button-winona',
            		'1' : 'anim-button-border-thin anim-button-round-s',
            		'2' : 'anim-button-border-thick anim-button-round-l anim-button-text-upper anim-button-size-s anim-button-text-thick',
            		'3' : 'anim-button-border-thin anim-button-text-thick anim-button-inverted'
            	},
            	ujarak : {
            		'class' : 'anim-button anim-button-ujarak',
            		'1' : 'anim-button-border-thin anim-button-text-thick',
            		'2' : 'anim-button-border-medium anim-button-round-s anim-button-text-thick',
            		'3' : 'anim-button-border-thick anim-button-text-upper anim-button-size-s anim-button-inverted anim-button-text-thick'
            	},
            	wayra : {
            		'class' : 'anim-button anim-button-wayra',
            		'1' : 'anim-button-border-thick anim-button-text-upper anim-button-size-s',
            		'2' : 'anim-button-border-thin anim-button-round-s',
            		'3' : 'anim-button-border-medium anim-button-text-upper anim-button-size-s anim-button-text-thick anim-button-inverted'
            	},
            	tamaya : {
            		'class' : 'anim-button anim-button-tamaya',
            		'1' : 'anim-button-border-thick',
            		'2' : 'anim-button-round-l anim-button-text-thick anim-button-border-medium anim-button-text-upper anim-button-size-s anim-button-inverted',
            		'3' : 'anim-button-round-s anim-button-text-thick anim-button-border-thin'
            	},
            	rayen : {
            		'class' : 'anim-button anim-button-rayen',
            		'1' : 'anim-button-border-thin anim-button-text-thick anim-button-text-upper anim-button-size-s',
            		'2' : 'anim-button-border-medium anim-button-text-thin anim-button-size-l anim-button-inverted',
            		'3' : 'anim-button-border-thick anim-button-text-thick'
            	},
            	pipaluk : {
            		'class' : 'anim-button anim-button-pipaluk',
            		'1' : 'anim-button-text-thick',
            		'2' : 'anim-button-inverted anim-button-round-l anim-button-text-thick anim-button-text-upper',
            		'3' : 'anim-button-inverted  anim-button-round-s anim-button-text-thick'
            	},
            	moema : {
            		'class' : 'anim-button anim-button-moema',
            		'1' : 'anim-button-text-thick anim-button-text-upper anim-button-size-s',
            		'2' : 'anim-button-border-thick anim-button-size-s',
            		'3' : 'anim-button-inverted anim-button-text-thick anim-button-size-s'
            	},
            	isi : {
            		'class' : 'anim-button anim-button-isi',
            		'1' : 'anim-button-text-thick anim-button-text-upper anim-button-size-s',
            		'2' : 'anim-button-border-thin anim-button-size-s anim-button-round-s',
            		'3' : 'anim-button-border-thick anim-button-round-l anim-button-size-s'
            	},
            	aylen : {
            		'class' : 'anim-button anim-button-aylen',
            		'1' : 'anim-button-round-l anim-button-text-thick',
            		'2' : 'anim-button-border-thin anim-button-round-s',
            		'3' : 'anim-button-border-thick anim-button-inverted anim-button-text-upper anim-button-size-s'
            	},
            	saqui : {
            		'class' : 'anim-button anim-button-saqui',
            		'1' : 'anim-button-round-l anim-button-text-thick',
            		'2' : 'anim-button-inverted anim-button-border-thin anim-button-round-s',
            		'3' : 'anim-button-inverted anim-button-text-thick anim-button-text-upper anim-button-size-s'
            	},
            	wapasha : {
            		'class' : 'anim-button anim-button-wapasha',
            		'1' : 'anim-button-round-s',
            		'2' : 'anim-button-text-thick anim-button-text-upper anim-button-size-s',
            		'3' : 'anim-button-round-l anim-button-text-thick anim-button-inverted'
            	},
            	nina : {
            		'class' : 'anim-button anim-button-nina',
            		'1' : 'anim-button-text-thick anim-button-text-upper anim-button-size-s',
            		'2' : 'anim-button-round-l anim-button-text-thick anim-button-inverted',
            		'3' : 'anim-button-border-thin anim-button-round-s',
            		animLetters : true
            	},
            	nanuk : {
            		'class' : 'anim-button anim-button-nanuk',
            		'1' : 'anim-button-text-thick anim-button-text-upper anim-button-size-s anim-button-border-thick',
            		'2' : 'anim-button-round-l anim-button-text-thick anim-button-inverted',
            		'3' : 'anim-button-border-thin anim-button-round-s',
            		animLetters : true
            	},
            	nuka : {
            		'class' : 'anim-button anim-button-nuka',
            		'1' : 'anim-button-round-s anim-button-text-thick',
            		'2' : 'anim-button-round-l anim-button-inverted anim-button-text-thick anim-button-text-upper anim-button-size-s',
            		'3' : ''
            	},
            	antiman : {
            		'class' : 'anim-button anim-button-antiman',
            		'1' : 'anim-button-round-l anim-button-text-medium',
            		'2' : 'anim-button-text-thick anim-button-text-upper anim-button-size-s anim-button-inverted-alt anim-button-round-s anim-button-border-thick',
            		'3' : 'anim-button-inverted anim-button-border-thin anim-button-text-thick anim-button-size-m'
            	},
            	itzel : {
            		'class' : 'anim-button anim-button-itzel',
            		'1' : 'anim-button-text-thick',
            		'2' : 'anim-button-text-thick anim-button-text-upper anim-button-border-thick anim-button-size-s',
            		'3' : 'anim-button-size-l anim-button-border-thin anim-button-text-thin'
            	},
            	naira : {
            		'class' : 'anim-button anim-button-naira',
            		'1' : 'anim-button-round-s anim-button-border-thin',
            		'2' : 'anim-button-border-thick anim-button-text-thick anim-button-text-upper anim-button-size-s',
            		'3' : 'anim-button anim-button-naira anim-button-border-medium anim-button-round-l anim-button-text-thick anim-button-inverted anim-button-naira-up'
            	},
            	quidel : {
            		'class' : 'anim-button anim-button-quidel',
            		'1' : 'anim-button-round-s',
            		'2' : 'anim-button-inverted anim-button-text-thick anim-button-text-upper anim-button-size-s',
            		'3' : 'anim-button-inverted'
            	},
            	sacnite : {
            		'class' : 'anim-button anim-button-sacnite',
            		'1' : '',
            		'2' : 'anim-button-round-l',
            		'3' : 'anim-button-round-s anim-button-inverted'
            	},
            	shikoba : {
            		'class' : 'anim-button anim-button-shikoba',
            		'1' : 'anim-button-round-s anim-button-border-thin',
            		'2' : 'anim-button-text-thick anim-button-border-medium anim-button-text-upper anim-button-size-s',
            		'3' : 'anim-button-text-medium anim-button-round-l anim-button-inverted'
            	}
            };
            $scope.getAnimButtonClass = function(){
            	return $scope.config[$scope.animButtonType].class + ' ' + $scope.config[$scope.animButtonType][$scope.animButtonSubType];
            };
            $scope.isAnimationLetters = function(){
                return $scope.config[$scope.animButtonType].animLetters;
            };
        },
        link: function (scope, element) {
            scope.animButtonType = scope.animButtonType ? scope.animButtonType : 'isi'
            scope.animButtonSubType = scope.animButtonSubType ? scope.animButtonSubType : '1';
            //var cbutton = element[0].querySelector('.animButton');
            scope.clickHandler = function(e){
                scope.animButtonCallback();
            };
                        
            scope.$on("$destroy", function () {});
        }
    };

});
