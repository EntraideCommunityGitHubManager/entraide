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
CollectionFS        (0.0.1)  	---> meteor add cfs:standard-packages  (File management lib)
                            	---> meteor add cfs:gridfs  (Mongo Persist file lib)
File Upload         (9.1.2)  	---> meteor add danialfarid:ng-file-upload
Meteor Camera       (1.1.5)  	---> meteor add mdg:camera
NgImgCrop           (0.3.2)  	---> meteor add alexk111:ng-img-crop
//Thumbnail         (0.0.18)  ---> //meteor add cfs:graphicsmagick ... Not Working
</code>
</pre>


<pre><code>
https://github.com/Urigo/awesome-meteor
https://github.com/Tallyb/ng-leaderboard-subs2
http://jvectormap.com/maps/countries/france-regions-2016/
http://www.daveweb.fr/blog/vos-cartes-de-france-cliquables-avec-jquery-vector-maps-et-jvector-map.html
http://www.evoluted.net/thinktank/web-design/custom-google-maps-style-tool
http://www.danparis.fr/
https://snazzymaps.com/explore?sort=recent&tag=dark&page=7
http://tympanus.net/codrops/2013/08/13/multi-level-push-menu/
http://tympanus.net/codrops/2013/04/17/slide-and-push-menus/
http://tympanus.net/Development/DragDropInteractions/icons.html
http://tympanus.net/codrops/category/playground/
http://tympanus.net/Development/TooltipStylesInspiration/curved.html
http://tympanus.net/Development/PageLoadingEffects/index8.html
http://tympanus.net/codrops/2014/09/23/animated-background-headers/
http://tympanus.net/codrops/2013/08/28/transitions-for-off-canvas-navigations/
http://tympanus.net/Development/SelectInspiration/index4.html
http://tympanus.net/Development/ClickEffects/
http://tympanus.net/codrops/2014/04/23/page-loading-effects/
http://tympanus.net/Development/SimpleDropDownEffects/
http://tympanus.net/Development/ResponsiveMultiLevelMenu/index4.html
https://github.com/angular-ui/ui-router/issues/178
https://github.com/angular-ui/angular-google-maps/issues/429
http://info.meteor.com/blog/whatsapp-with-meteor-angular-and-ionic
http://tympanus.net/codrops/2012/09/19/fullscreen-video-slideshow-with-bigvideo-js/
http://www.angular-meteor.com/tutorials/socially/angular1/bootstrapping
http://www.forbes.com/global2000/list/44/#tab:overall
https://docs.mongodb.org/manual/tutorial/model-tree-structures/
</pre></code>
