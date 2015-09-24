# Entraide Community Project

Author : Entraide Community Manager

# Developement base :

**/client** : contains all js client (angular ctrl, service... / Meteor subscribed collections and objects)<br>
**/server** : contains all js server (Meteor publish service, security ... layer)<br>
**/lib**    : contains the js files loaded at last (app.ng.js).<br>

**.ng.html** : angular html template which will not be compiled by blaze <br>
**.ng.js**   : angular js files must be named like this in order to avoid dependency problems on minification


<em>
> Tips : Meteor load first the files in sub-directories then load parent files then load at last the files in lib folder. <br>
The files are loaded in an alphabetical order within a folder.
</em>


### External libs :
<pre>
<code>
AngularJS           (1.4.6)     ---> meteor add angular
Angular UI Router   (0.2.15)    ---> meteor add angularui:angular-ui-router
Twitter Bootstrap   (3.3.5)     ---> meteor add twbs:bootstrap
Font Awesome        (4.4.0)     ---> meteor add fortawesome:fontawesome
Connection Banner   (0.4.3)     ---> meteor add natestrauser:connection-banner      
				     (Toast message to show and prevent lost connection with the server)
Blaze Template      (0.0.1)  	---> meteor add urigo:angular-blaze-template       
				     (Mixin Angular and Meteor template)
</code>
</pre>


    index.html
    <body ng-app="entraide"> 
        <a ng-href="#/home">Home</a>
        <a ng-href="#/app">App</a>
        <a ng-href="#/app/main/">App main</a>
        <a ng-href="#/app/main/events">App main events</a>
        <a ng-href="#/app/main/events/search">App main events search</a>
        <a ng-href="#/app/main/events/search/byProfile">App main events search byProfile</a>
        <a ng-href="#/app/main/events/detail/1">App main events Detail</a>
        <a ng-href="#/app/main/profile/edit/1">App main profile edit</a>
        <div ui-view></div> 
    </body>

      angular.module('entraide').config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function                 ($urlRouterProvider, $stateProvider, $locationProvider) {

    $urlRouterProvider.when("",  "/app/main");
    $urlRouterProvider.when("/", "/app/main");
    $urlRouterProvider.otherwise("/app/main");

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'client/home/home.ng.html',
            controller: 'HomeCtrl'
        })
		
		.state('app', {
            url: '/app',
            template: '
				<div ui-view="header-view"></div>
				<div ui-view="notification-view"></div>
				<div ui-view="side-left-view"></div>
				<div ui-view="content-view"></div>
				<div ui-view="footer-view"></div>
			',
            controller: function($scope, $meteor){
                console.log("app Ctrl");
            }
        })
		
        .state('app.main', {
			url: '/main'
            views: {
                'header-view@app': {
                    template: '<div>Header view</div>',
                    controller: function($scope){
                        console.log("header-view Ctrl");
                    }
                },
				'notification-view@app': {
                    template: '<div>Notification view</div>',
                    controller: function($scope){
                        console.log("notification-view Ctrl");
                    }
                },
				'side-left-view@app': {
                    template: '
						<div>Side Left view</div>
						<div ui-view="side-content-view"></div>
						<div ui-view="side-tabs-view"></div>
					',
                    controller: function($scope){
                        console.log("side-left-view Ctrl");
                    }
                },
				'content-view@app': {
                    template: '<div ui-view"></div>'
                    controller: function($scope){
                        console.log("content-view Ctrl");
                    }
                }
				'footer-view@app': {
                    template: '<div>Footer view</div>'
                    controller: function($scope){
                        console.log("footer-view Ctrl");
                    }
                }
            }
        })
        .state('app.main.events', {
            url: '/events',
            abstract: true,
			template: '<ui-view/>'
            controller: function(){
                console.log("abstract main events Ctrl");
            }
        })
		.state('app.main.events.search', {
            url: '/search',
            abstract: true,
			template: '<ui-view/>'
            controller: function(){
                console.log("abstract main events search Ctrl");
            }
        })
        .state('app.main.events.search.byProfile', {
            url: '/byProfile',
            views: {
				'side-left-view@app.main': {
                    views: {
						'side-content-view': {
							template: '<div> Events Search by profile</div>',		
							controller: function($scope){
								console.log("side-content-view Ctrl SearchByProfile");
							}
						}
					}
                },
				'content-view@app.main': {
                    template: '<div>Content view for search by profile</div>',
                    controller: function($scope){
                        console.log("content-view Ctrl SearchByProfile");
                    }
                }
            }
        })
        .state('app.main.events.detail', {
            url: '/detail/:eventId',
            templateUrl: 'client/events/detail/event-detail.ng.html',
            controller: 'EventDetailCtrl'
        });
		.state('app.main.profile', {
            url: '/profile',
			abstract: true,
            template: '<ui-view/>'
            controller: function(){
                console.log("abstract main profile Ctrl");
            }
        });
		.state('app.main.profile.edit', {
            url: '/edit/:userId',
            template: '<div>Profile edit</div>',
            controller: function($scope){
				console.log("Profile edit Ctrl");
			},
            resolve: {
                "currentUser": ["$meteor", function($meteor){
                    return $meteor.requireUser();
                }]
            }
        });

