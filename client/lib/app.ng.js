angular.module('entraide', ['angular-meteor', 'ui.router']);


angular.module('entraide').run(["$rootScope", "$location", function ($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function (event, next, previous, error) {
        if (error === "AUTH_REQUIRED") {
            $state.go("/events");
        } else if (error === "AUTH_REQUIRED") {

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
                    controller: 'SideLeftCtrl',
                    resolve: {
                        "currentUser": ["$meteor", function ($meteor) {
                            return $meteor.requireUser();
                        }]
                    }
                }
            }
        });


}]);





