angular.module('entraide', ['angular-meteor', 'ui.router']);


angular.module('entraide').run(["$rootScope", "$state", function ($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        switch(error) {
            case "AUTH_REQUIRED":
                $state.go("app.main.error.required");
                break;
            case "FORBIDDEN":
                $state.go("app.main.error.forbidden");
                break;
            case "UNAUTHORIZED":
                $state.go("app.main.error.unauthorized");
                break;
            default:
                $state.go("app.main.error");
        }
    });
}]);


angular.module('entraide').config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function ($urlRouterProvider, $stateProvider, $locationProvider) {

    $urlRouterProvider.when("",  "/home");
    $urlRouterProvider.when("/", "/home");
    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'client/home/home.ng.html',
            controller: 'HomeCtrl'
        })

        .state('app', {
            template: '<div class="header-view" ui-view="header-view"></div><div class="notification-view" ui-view="notification-view"></div><div class="map-view" ui-view="map-view"></div><div class="footer-view" ui-view="footer-view"></div>',
            controller: function ($scope, $meteor) {
                console.log("app Ctrl");
            }
        })

        .state('app.main', {
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
                'map-view@app': {
                    templateUrl: 'client/app/map/map.ng.html',
                    controller: 'MapCtrl'
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
            template: '<ui-view/>'
        })
        .state('app.main.events.search', {
            url: '/search',
            abstract: true,
            template: '<ui-view/>'
        })
        .state('app.main.events.search.all', {
            url: '/all',
            views: {
                'map-view@app': {
                    templateUrl: 'client/app/admin/events/list/all-events-list.ng.html',
                    controller: 'AllEventsListCtrl'
                }
            },
            resolve: {
                "currentUser": ["$meteor", "SecurityService", function($meteor, SecurityService){
                    return $meteor.requireValidUser(function(user) {
                        return SecurityService.isAdmin(user);
                    });
                }]
            }
        })
        .state('app.main.events.edit', {
            url: '/edit',
            views: {
                'map-view@app': {
                    templateUrl: 'client/app/admin/events/edit/event-edit.ng.html',
                    controller: 'EventEditCtrl'
                }
            },
            resolve: {
                "currentUser": ["$meteor", "SecurityService", function($meteor, SecurityService){
                    return $meteor.requireValidUser(function(user) {
                        return SecurityService.isAdmin(user);
                    });
                }]
            }
        })
        .state('app.main.events.search.byProfile', {
            url: '/byProfile',
            views: {
                'map-view@app': {
                    templateUrl: 'client/app/events/search/byProfile/search-events-list.ng.html',
                    controller: 'SearchEventsListCtrl'
                },
                'side-left-view@app.main': {
                    templateUrl: 'client/app/side/left/side-left.ng.html',
                    controller: 'SideLeftCtrl'
                }
            }
        })
        .state('app.main.events.search.myEvents', {
            url: '/myEvents',
            views: {
                'map-view@app': {
                    templateUrl: 'client/app/events/search/myEvents/my-events-list.ng.html',
                    controller: 'MyEventsListCtrl'
                },
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
        .state('app.main.events.detail', {
            url: '/detail/:eventId',
            views: {
                'map-view@app': {
                    templateUrl: 'client/app/events/detail/event-detail.ng.html',
                    controller: 'EventDetailCtrl'
                },
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
        .state('app.main.events.create', {
            url: '/create',
            views: {
                'map-view@app': {
                    templateUrl: 'client/app/events/create/event-create.ng.html',
                    controller: 'EventCreateCtrl'
                },
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
        .state('app.main.logout', {
            url: '/logout',
            resolve: {
                "logout": ["$meteor", function($meteor){
                    return $meteor.logout();
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
                'map-view@app': {
                    template: '<div>You must be signed in to access this functionality</div>'
                }
            }
        })
        .state('app.main.error.forbidden', {
            url: '/forbidden',
            views: {
                'map-view@app': {
                    template: '<div>You try to access to a forbidden functionality</div>'
                }
            }
        })
        .state('app.main.error.unauthorized', {
            url: '/unauthorized',
            views: {
                'map-view@app': {
                    template: '<div>You must be authorized in order to access this functionality</div>'
                }
            }
        });


}]);





