if (Meteor.isClient) {
    Session.setDefault('counter', 0);
}

if (Meteor.isServer) {
    Meteor.startup(function () {

    });
}
