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
            template: '<div ui-view="header-view"></div><div ui-view="notification-view"></div><div ui-view="side-left-view"></div><div ui-view="content-view"></div><div ui-view="footer-view"></div>',
            controller: function ($scope, $meteor) {
                console.log("app Ctrl");
            }
        })

        .state('app.main', {
            views: {
                'header-view@app': {
                    templateUrl: 'client/app/header/header.ng.html',
                    controller: function ($scope) {
                        console.log("header-view Ctrl");
                    }
                },
                'notification-view@app': {
                    templateUrl: 'client/app/notification/notification.ng.html',
                    controller: function ($scope) {
                        console.log("notification-view Ctrl");
                    }
                },
                'side-left-view@app': {
                    templateUrl: 'client/app/side/left/side-left.ng.html',
                    controller: function ($scope) {
                        console.log("side-left-view Ctrl");
                    }
                },
                'content-view@app': {
                    templateUrl: 'client/app/content/content.ng.html',
                    controller: function ($scope) {
                        console.log("map-view Ctrl");
                    }
                },
                'footer-view@app': {
                    templateUrl: 'client/app/footer/footer.ng.html',
                    controller: function ($scope) {
                        console.log("footer-view Ctrl");
                    }
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
                'map-view@app.main': {
                    template: '<div> Inside map view </div>',
                    controller: function ($scope) {
                        console.log("map-view Ctrl");
                    }
                },
                'side-content-view@app.main': {
                    template: '<div> Inside side-content view </div>',
                    controller: function ($scope) {
                        console.log("side-content-view Ctrl : search by profile");
                    }
                }
            }
        })
        .state('app.main.events.search.myEvents', {
            url: '/myEvents',
            views: {
                'side-content-view@app.main': {
                    template: '<div> Inside side-content view </div>',
                    controller: function ($scope) {
                        console.log("side-content-view Ctrl : search by profile");
                    }
                }
            }
        })
        .state('app.main.events.detail', {
            url: '/detail/:eventId',
            views: {
                'side-content-view@app.main': {
                    template: '<div> Inside side-content view  - Event Detail</div>',
                    controller: function ($scope) {
                        console.log("side-content-view Ctrl : event detail");
                    }
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
                'side-content-view@app.main': {
                    template: '<div> Inside side-content view - Profile edit </div>',
                    controller: function ($scope) {
                        console.log("side-content-view Ctrl : search by profile");
                    },
                    resolve: {
                        "currentUser": ["$meteor", function ($meteor) {
                            return $meteor.requireUser();
                        }]
                    }
                }
            }
        });


}]);





