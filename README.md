# Entraide Community Project

Author : Entraide Community Manager

# Developement base :
<p>
/client : contains all js client (angular ctrl, service... / Meteor subscribed collections and objects)<br>
/server : contains all js server (Meteor publish service, security ... layer)<br>
/lib    : contains the js files loaded at last (app.ng.js).<br>
</p>
<p>
.ng.html : angular html template that it will not be compiled by blaze <br>
.ng.js   : angular js files must be named like this in order to avoid dependency problems on minification
</p>

<p>
Meteor load first the files in sub-directories then load parent files then load at last the files in lib folder. <br>
The files are loaded in an alphabetical order within a folder.
</p>


# External libs :

<p>AngularJS           (1.4.6)     ---> meteor add angular</p>
<p>Angular UI Router   (0.2.15)    ---> meteor add angularui:angular-ui-router</p>
<p>Twitter Bootstrap   (3.3.5)     ---> meteor add twbs:bootstrap</p>
<p>Font Awesome        (4.4.0)     ---> meteor add fortawesome:fontawesome</p>
<p>Connection Banner   (0.4.3)     ---> meteor add natestrauser:connection-banner      Toast message to show and prevent lost connection with the server</p>
<p>Blaze Template      (0.0.1)     ---> meteor add urigo:angular-blaze-template        Mixin Angular and Meteor template</p>




	index.html
	<div> HEADER </div> 
	<div ui-view="main">
	<div> FOOTER </div> 

	main.ng.html
	<div> Main content :</div>
	<div ui-view="contentView1"></div>
	<div ui-view="contentView2"></div>


	.state('main', {
		url: "/",
		views: {
			"main": {
				templateUrl: 'client/main.ng.html'
			}
		}
	})
	.state('main.events', {
		url: "events",
		views: {
			'contentView1@main': {      // @state
				template: '<div> Content View 1</div>',
				controller: function($scope) {
					console.log("contentView1 ctrl");
				}
			},
			'contentView2@main': {      // @state
				template: '<div> Content View 2</div>',
				controller: function($scope) {
					console.log("contentView2 ctrl");
				}
			}
		}
	})
