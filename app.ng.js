if (Meteor.isClient) {

    angular.module('entraide', ['angular-meteor']);

    angular.module('entraide').controller('EventsListCtrl', function ($scope) {
        $scope.events = [
            {
                'name': 'Dubstep-Free Zone',
                'description': 'Can we please just for an evening not listen to dubstep.'
            },
            {
                'name': 'All dubstep all the time',
                'description': 'Get it on!'
            },
            {
                'name': 'Savage lounging',
                'description': 'Leisure suit required. And only fiercest manners.'
            }
        ];
    });
}
