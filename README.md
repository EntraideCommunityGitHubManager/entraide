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


<pre><code>
https://github.com/Tallyb/ng-leaderboard-subs2
http://jvectormap.com/maps/countries/france-regions-2016/
http://www.daveweb.fr/blog/vos-cartes-de-france-cliquables-avec-jquery-vector-maps-et-jvector-map.html
http://www.evoluted.net/thinktank/web-design/custom-google-maps-style-tool
http://www.danparis.fr/
https://snazzymaps.com/explore?sort=recent&tag=dark&page=7
http://tympanus.net/codrops/category/playground/http://tympanus.net/codrops/category/playground/
http://tympanus.net/Development/TooltipStylesInspiration/curved.htmlhttp://tympanus.net/Development/TooltipStylesInspiration/curved.html
</pre></code>
