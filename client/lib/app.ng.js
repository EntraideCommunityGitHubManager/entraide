angular.module('entraide', ['angular-meteor', 'ui.router', 'uiGmapgoogle-maps', 'ngFileUpload', 'ngImgCrop', 'ngAnimate']);

angular.module('entraide').config(function($provide) {
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
            views: {
                'header-view@app': {
                    templateUrl: 'client/app/header/header.ng.html',
                    controller: 'HeaderCtrl'
                },
                'notification-view': {
                    templateUrl: 'client/app/notification/notification.ng.html',
                    controller: 'NotificationCtrl'
                },
                'side-left-view': {
                    templateUrl: 'client/app/side/left/side-left.ng.html',
                    controller: 'SideLeftCtrl'
                },
                'side-left-profile-view@app.main': {
                    templateUrl: 'client/app/profile/profile-edit.ng.html',
                    controller: 'ProfileEditCtrl'
                },
                'content-view': {
                    templateUrl: 'client/app/map/map.ng.html',
                    controller: 'MapCtrl'
                },
                'background-view': {
                    template: '<div anim-background source-video="video/beach.mp4" source-image="img/beach.jpg"></div>'
                },
                'footer-view@app': {
                    templateUrl: 'client/app/footer/footer.ng.html',
                    controller: 'FooterCtrl'
                }
            }
        })

        // TODO:    - Try to remove the main of the url

        .state('app.main.events', {
            url: '/events',
            abstract: true,
            template: '<ui-view/>',
             views: {
                 'side-left-search-view@app.main': {
                    templateUrl: 'client/app/events/search/filter/search-event-filter.ng.html',
                    controller: 'SearchEventFilterCtrl'
                 },
                 'side-left-profile-view@app.main': {
                     templateUrl: 'client/app/profile/profile-edit.ng.html',
                     controller: 'ProfileEditCtrl'
                 }
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
                'side-left-event-view@app.main': {
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
                'side-left-event-view@app.main': {
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
                'side-left-event-view@app.main': {
                    templateUrl: 'client/app/events/edit/event-edit.ng.html',
                    controller: 'EventEditCtrl'
                }
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
                'notification-view@app': {},
                'side-left-profile-view@app.main': {
                    templateUrl: 'client/app/profile/profile-edit.ng.html',
                    controller: 'ProfileEditCtrl'
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

        /*********************************************************/
        /*                   Users
         **********************************************************/
        .state('app.main.admin.users', {
            url: '/users',
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
        /*********************************************************/
        /*                   Events
         **********************************************************/
        .state('app.main.admin.events', {
            url: '/events',
            abstract: true,
            template: '<ui-view/>'
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
        /*                   Lookups
         **********************************************************/
        .state('app.main.admin.lookups', {
            url: '/lookups',
            abstract: true,
            template: '<ui-view/>'
        })
        .state('app.main.admin.lookups.all', {
            url: '/all',
            views: {
                'content-view@app': {
                    templateUrl: 'client/app/admin/lookups/list/admin-lookup-list.ng.html',
                    controller: 'AdminLookupListCtrl'
                }
            }
        })
        /*********************************************************/
        /*                   Lookups - category
         **********************************************************/
        .state('app.main.admin.lookups.category', {
            url: '/category',
            abstract: true,
            template: '<ui-view/>'
        })
        .state('app.main.admin.lookups.category.edit', {
            url: '/edit/:categoryId',
            views: {
                'content-view@app': {
                    templateUrl: 'client/app/admin/lookups/category/edit/admin-category-edit.ng.html',
                    controller: 'AdminCategoryEditCtrl'
                }
            }
        })
        /*********************************************************/
        /*                   Lookups - department
         **********************************************************/
        .state('app.main.admin.lookups.department', {
            url: '/department',
            abstract: true,
            template: '<ui-view/>'
        })
        .state('app.main.admin.lookups.department.edit', {
            url: '/edit/:departmentId',
            views: {
                'content-view@app': {
                    templateUrl: 'client/app/admin/lookups/department/edit/admin-department-edit.ng.html',
                    controller: 'AdminDepartmentEditCtrl'
                }
            }
        })

        /*********************************************************/
        /*
         *                   REDIRECT STATES
         *
         **********************************************************/

        .state('app.main.error', {
            url: '/error',
            abstract: true,
            template: '<ui-view/>'
        })
        .state('app.main.error.required', {
            url: '/required',
            views: {
                'content-view@app': {
                    template: '<div>You must be signed in to access this functionality</div>',
                    controller: function(AnimService){AnimService.stopTransition(1);}
                }
            }
        })
        .state('app.main.error.unauthorized', {
            url: '/unauthorized',
            views: {
                'content-view@app': {
                    template: '<div>You must be authorized in order to access this functionality</div>',
                    controller: function(AnimService){AnimService.stopTransition(1);}
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

    var animRoutingConfig = {
        includes : [{
            from : 'app.main.events.search.*',
            to : 'app.main'
        },{
            from : 'app.main',
            to : 'app.main.events.search.*'
        },{
            from : 'app.main.admin.*',
            to : 'app.main'
        },{
            from : 'app.main.events.search.byProfile.detail',
            to : 'app.main.events.search.myEvents'
        },{
            from : 'app.main.events.search.myEvents.edit',
            to : 'app.main.events.search.byProfile'
        },{
            from : 'app.main.events.search.byProfile',
            to : 'app.main.events.search.myEvents'
        },{
            from : 'app.main.events.search.myEvents',
            to : 'app.main.events.search.byProfile'
        },{
            from : 'app.main.events.search.myEvents.create',
            to : 'app.main.events.search.byProfile'
        }
            /*,{
             from : 'app.main.events.search.myEvents.*',
             to : 'app.main.events.search.byProfile'
             },{
             from : 'app.main.events.search.byProfile.*',
             to : 'app.main.events.search.myEvents'
             }*/

        ]
    };
    AnimService.setRoutingConfig(animRoutingConfig);

}]);



