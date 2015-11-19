angular.module('entraide', ['angular-meteor', 'ui.router', 'uiGmapgoogle-maps', 'ngFileUpload', 'ngImgCrop']);

angular.module('entraide').config(function($provide, $urlRouterProvider) {
    $provide.decorator('$state', function($delegate, $stateParams) {
        $delegate.forceReload = function() {
            return $delegate.go($delegate.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        };
        return $delegate;
    });
});

angular.module('entraide').config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.when("",  "main");
    $urlRouterProvider.when("/", "main");
    $urlRouterProvider.otherwise("main");

    $stateProvider

        .state('app', {
            templateUrl: 'client/app/app.ng.html'
        })

        .state('app.main', {
            url: '/main',
            params: {
                targetState: {}
            },
            views: {
                'header-view@app': {
                    templateUrl: 'client/app/header/header.ng.html',
                    controller: 'HeaderCtrl'
                },
                'notification-view@app': {
                    templateUrl: 'client/app/notification/notification.ng.html',
                    controller: 'NotificationCtrl'
                },
                'side-left-view@app': {
                    templateUrl: 'client/app/side/left/side-left.ng.html',
                    controller: 'SideLeftCtrl'
                },
                'content-view@app': {
                    templateUrl: 'client/app/map/map.ng.html',
                    controller: 'MapCtrl'
                },
                'background-view@app': {
                    template: '<div anim-background source-video="video/beach.mp4" source-image="img/beach.jpg"></div>'
                },
                'footer-view@app': {
                    templateUrl: 'client/app/footer/footer.ng.html',
                    controller: 'FooterCtrl'
                }
            }
        })

        .state('app.main.events', {
            url: '/events',
            abstract: true,
            template: '<ui-view/>',
            views: {

            }
        })
        .state('app.main.events.search', {
            url: '/search',
            abstract: true,
            template: '<ui-view/>'
        })


        /*********************************************************/
        /*
         *               COMMUNITY STATES
         *
         **********************************************************/

        .state('app.main.events.search.byProfile', {
            url: '/byProfile',
            views: {
                'content-view@app': {
                    templateUrl: 'client/app/events/search/byProfile/search-events-list.ng.html',
                    controller: 'SearchEventsListCtrl'
                }
            }
        })
        .state('app.main.events.search.byProfile.detail', {
            url: '/detail',
            params: {
                event: {}
            },
            views: {
                'side-left-content-view@app.main': {
                    templateUrl: 'client/app/events/detail/event-detail.ng.html',
                    controller: 'EventDetailCtrl'
                }
            }
        })
        .state('app.main.events.search.myEvents', {
            url: '/myEvents',
            views: {
                'content-view@app': {
                    templateUrl: 'client/app/events/search/myEvents/my-events-list.ng.html',
                    controller: 'MyEventsListCtrl'
                }
            },
            resolve: {
                "currentUser": ["$meteor", function($meteor){
                    return $meteor.requireUser();
                }]
            }
        })
        .state('app.main.events.search.myEvents.create', {
            url: '/create',
            params: {
                event: {}
            },
            views: {
                'side-left-content-view@app.main': {
                    templateUrl: 'client/app/events/create/event-create.ng.html',
                    controller: 'EventCreateCtrl'
                }
            }
        })
        .state('app.main.events.search.myEvents.edit', {
            url: '/edit',
            params: {
                event: {}
            },
            views: {
                'side-left-content-view@app.main': {
                    templateUrl: 'client/app/events/edit/event-edit.ng.html',
                    controller: 'EventEditCtrl'
                }
            }
        })
        .state('app.main.profile', {
            url: '/profile',
            abstract: true,
            template: '<ui-view/>'
        })
        .state('app.main.profile.edit', {
            url: '/edit/:userId',
            views: {
                'side-left-view@app.main': {
                    templateUrl: 'client/app/side/left/side-left.ng.html',
                    controller: 'SideLeftCtrl'
                }
            },
            resolve: {
                "currentUser": ["$meteor", function($meteor){
                    return $meteor.requireUser();
                }]
            }
        })
        
        /*********************************************************/
        /*
        *                   ADMIN STATES
        *
        **********************************************************/

        .state('app.main.admin', {
            url: '/admin',
            abstract: true,
            template: '<ui-view/>',
            views: {
                'notification-view@app': {}
            },
            resolve: {
                "currentUser": ["$meteor", "SecurityService", function($meteor, SecurityService){
                    return $meteor.requireValidUser(function(user) {
                        return SecurityService.isAdmin(user);
                    });
                }]
            }
        })
        .state('app.main.admin.users', {
            url: '/users',
            abstract: true,
            template: '<ui-view/>'
        })
        .state('app.main.admin.events', {
            url: '/events',
            abstract: true,
            template: '<ui-view/>'
        })
        .state('app.main.admin.users.all', {
            url: '/all',
            views: {
                'content-view@app': {
                    templateUrl: 'client/app/admin/users/list/admin-user-list.ng.html',
                    controller: 'AdminUserListCtrl'
                }
            }
        })
        .state('app.main.admin.users.edit', {
            url: '/edit/:userId',
            views: {
                'content-view@app': {
                    templateUrl: 'client/app/admin/users/edit/admin-user-edit.ng.html',
                    controller: 'AdminUserEditCtrl'
                }
            }
        })
        .state('app.main.admin.events.all', {
            url: '/all',
            views: {
                'content-view@app': {
                    templateUrl: 'client/app/admin/events/list/admin-event-list.ng.html',
                    controller: 'AdminEventListCtrl'
                }
            }
        })
        .state('app.main.admin.events.edit', {
            url: '/edit/:eventId',
            views: {
                'content-view@app': {
                    templateUrl: 'client/app/admin/events/edit/admin-event-edit.ng.html',
                    controller: 'AdminEventEditCtrl'
                }
            }
        })
        
        /*********************************************************/
        /*
        *                   REDIRECT STATES
        *
        **********************************************************/
        
        .state('app.main.logout', {
            url: '/logout',
            resolve: {
                "logout": ["$meteor", "$state", function($meteor, $state){
                    return $meteor.logout().then(function(){
                        $state.go('app.main', {targetState:'logout'});
                    }, function(){$state.go('app.main.error');});
                }]
            }
        })
        .state('app.main.error', {
            url: '/error',
            abstract: true,
            template: '<ui-view/>'
        })
        .state('app.main.error.required', {
            url: '/required',
            views: {
                'content-view@app': {
                    template: '<div>You must be signed in to access this functionality</div>'
                }
            }
        })
        .state('app.main.error.unauthorized', {
            url: '/unauthorized',
            views: {
                'content-view@app': {
                    template: '<div>You must be authorized in order to access this functionality</div>'
                }
            }
        });
}]);

angular.module('entraide').run(["$rootScope", "$urlRouter", "$state", "AnimService", '$location', function ($rootScope, $urlRouter, $state, AnimService, $location) {
    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        console.log(error);
        switch(error) {
            case "AUTH_REQUIRED":
                $state.go("app.main.error.required");
                break;
            case "FORBIDDEN":
                $state.go("main");
                break;
            case "UNAUTHORIZED":
                $state.go("app.main.error.unauthorized");
                break;
            default:
                $state.go("app.main.error");
        }
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

	var config = {
		includes : [{
				from : 'app.main',
				to : 'app.main.events.search.*'
			},{
				from : 'app.main.events.search.byProfile',
				to : 'app.main.events.search.myEvents'
			},{
				from : 'app.main.events.search.myEvents',
				to : 'app.main.events.search.byProfile'
			}],
		excludes : ['logout']
	};
        
       
        var transition = {toState: toState, fromState: fromState};

        if(AnimService.isTransitionnable(transition, toParams)){
            if(AnimService.isNotCurrent(transition)){
                AnimService.startTransition(transition);
            }
            if(AnimService.isTransitionning()){
                event.preventDefault();
                setTimeout(function(){
                    $state.go(transition.toState.name, toParams);
                }, AnimService.getTransitionConfig().delay + 100);
            }
        }
       
    });


}]);



