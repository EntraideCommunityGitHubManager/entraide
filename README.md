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
https://github.com/nate-strauser
