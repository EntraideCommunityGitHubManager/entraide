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
Angular Animate     (1.4.6)     ---> meteor add angular:angular-animate
Angular UI Router   (0.2.15)    ---> meteor add angularui:angular-ui-router
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
//TODO: Collection2 (0.0.??)  ---> meteor add aldeed:collection2
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
http://tympanus.net/Development/ButtonStylesInspiration/
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
https://mapicons.mapsmarker.com/category/markers/
https://www.discovermeteor.com/blog/allow-deny-challenge-results/
http://fr.discovermeteor.com/chapters/allow-and-deny/
https://github.com/aldeed/meteor-collection2
https://www.discovermeteor.com/blog/meteor-methods-client-side-operations/
http://liuliu.me/eyes/javascript-face-detection-explained/
http://jaysalvat.com/
http://trackingjs.com/
https://davidwalsh.name/face-detection-jquery
http://janmatuschek.de/LatitudeLongitudeBoundingCoordinates
http://info.meteor.com/blog/angular-meteor-1.3
http://callmenick.com/
https://davidwalsh.name/css-flip
http://jsfiddle.net/7tb4g/341/
http://codepen.io/Marnoto/pen/xboPmG/

External Service login with oAuth
https://themeteorchef.com/recipes/roll-your-own-authentication/#tmc-setting-up-oauth-services
http://www.angular-meteor.com/api/1.2.2/auth
http://stackoverflow.com/questions/19359465/retrieve-accounts-github-accesstoken
https://github.com/timhaines/test-accounts/blob/master/test-accounts.js
https://codepen.io/anon/pen/wWLbgb

https://haveibeenpwned.com/

https://www.lestendances.fr/table-a-manger-achat-vente-c-89.html?p=2&nb=64
http://www.meuble-house.fr/table-de-repas-chene-massif-240cm-licht.html
http://www.meuble-house.fr/table-de-repas-chene-massif-220cm-licht.html#product-infos-tab-satisfaction
http://www.cosy-tendance.com/table-rectangulaire/739-table-bois-tendance-104-2009075-cm-3700898587412.html
https://www.alittlemarket.com/meubles-et-rangements/fr_table_de_salle_a_manger_acier_et_bois_vieilli_-8037433.html
https://www.alittlemarket.com/meubles-et-rangements/fr_meuble_industriel_table_de_salle_a_manger_en_pin_massif_8_cm_2_rallonges_-18654907.html
http://www.meuble-house.fr/table-tronc-d-arbre-et-pieds-en-verre-amazone.html
http://www.shopping-meubles.fr/tables/1169-table-de-sejour-design-bio-glass-plateau-frene-massif-pieds-verre.html
https://fr.pinterest.com/explore/tables-basses-920914587880/
http://www.archiproducts.com/en/1429/tables-and-chairs-tables.html


http://www.boredpanda.com/creative-diy-lamp-chandelier-lighting-ideas/
http://www.eclectical-engineering.com/projects/featured-projects/project-2-cloud-lamp/
http://stemplusd.com/blog/industrial-design/interactive-cloud-lamp-creates-lightning-thunder-show/
http://www.instructables.com/id/How-to-make-a-Lightning-Cloud/

</pre></code>
