angular.module('entraide', ['angular-meteor', 'ui.router']);


angular.module('entraide').run(["$rootScope", "$location", function($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function(event, next, previous, error) {
        if (error === "AUTH_REQUIRED") {
            $state.go("/events");
        } else if (error === "AUTH_REQUIRED"){

        }
    });
}]);



angular.module('entraide').config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function ($urlRouterProvider, $stateProvider, $locationProvider) {

    //$locationProvider.html5Mode(true);

    $urlRouterProvider.when("", "/main/events/list");
    $urlRouterProvider.when("/", "/main/events/list");

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/main/events/list");

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'client/home/home.ng.html',
            controller: 'HomeCtrl'
        })
        .state('main', {
            url: '/main',
            templateUrl: 'client/main/main.ng.html',
            controller: function($scope, $meteor){
                console.log("main Ctrl");
            }
        })

        .state('main.events', {
            abstract: true,
            url: '/events',
            template: '<div ui-view="menutopview"></div><span>main abstract</span><div ui-view></div>',
            controller: function(){
                console.log("main events Ctrl");
            }
        })
        .state('main.events.list', {
            url: '/list',
            templateUrl: 'client/events/list/events-list.ng.html',
            controller: 'EventsListCtrl',
            /*views: {
                'menutopview@main.events': {
                    templateUrl: 'client/menu/top/menu-top.ng.html',
                    controller: function($scope){
                        console.log("menuTopCtrl");
                    }
                }/!*,
                 'menu-left-view': {
                 templateUrl: 'menu-side-view.ng.html',
                 controller: function($scope){
                 console.log("menuLeftCtrl");
                 }
                 },
                 'footer-view': {
                 templateUrl: 'footer-view.ng.html',
                 controller: function($scope){
                 console.log("footerCtrl");
                 }
                 }*!/
            }*/
        })
        .state('main.events.detail', {
            url: '/detail/:eventId',
            templateUrl: 'client/events/detail/event-detail.ng.html',
            controller: 'EventDetailCtrl',
            resolve: {
                "currentUser": ["$meteor", function($meteor){
                    return $meteor.requireUser();
                }]
            }
        });


}]);





