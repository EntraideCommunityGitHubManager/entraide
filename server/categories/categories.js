Categories = new Mongo.Collection("categories");

Meteor.publish("all-categories", function(){
   return Categories.find({});
});

Meteor.startup(function () {
	if(Categories.find({}).count()<=0){

		// Soins, Beauté & Mode
		Categories.insert({code: 'beau', ancestors:[], root:true, level:0, name:'Soins, Beauté & Mode', order:0, terms:'cours apprentissage apprendre initiation initier progresser progres progression decouvrir'});
		Categories.insert({code: 'beau-hair', ancestors:['beau'], name:'Coiffure', order:1, terms: 'coiffure coiffeur couper cheveux'});
		Categories.insert({code: 'beau-cout', ancestors:['beau'], name:'Couture', order:2, terms: 'couture coudre'});
		Categories.insert({code: 'beau-make', ancestors:['beau'], name:'Maquillage', order:3, terms: 'maquillage maquiller make up make-up'});
		Categories.insert({code: 'beau-masg', ancestors:['beau'], name:'Massage', order:4, terms: 'massage masser masseur masseuse'});
		Categories.insert({code: 'beau-rlok', ancestors:['beau'], name:'Relooking', order:5, terms: 'look relook relooking style relooker changer'});
		Categories.insert({code: 'beau-rpsg', ancestors:['beau'], name:'Repassage', order:6, terms: 'repassage repasser'});
		Categories.insert({code: 'beau-othr', ancestors:['beau'], name:'Soins, Beauté & Mode - Autres', order:99});

		// Cours de Musique
		Categories.insert({code: 'learn-music', ancestors:[], root:true, level:0, name:'Cours de Musique', order:101, terms:'cours musique apprentissage initiation initier apprendre progresser progres progression decouvrir'});
		Categories.insert({code: 'learn-music-drum-btry', ancestors:['learn-music'], name:'Batteries', order:102});
		Categories.insert({code: 'learn-music-elec-kbrd', ancestors:['learn-music'], name:'Claviers numérique', order:103});
		Categories.insert({code: 'learn-music-elec-djng', ancestors:['learn-music'], name:'Dj', order:104});
		Categories.insert({code: 'learn-music-elec-drum', ancestors:['learn-music'], name:'Drum machine', order:105});
		Categories.insert({code: 'learn-music-wind-flut', ancestors:['learn-music'], name:'Flûtes', order:106});
		Categories.insert({code: 'learn-music-strg-guit', ancestors:['learn-music'], name:'Guitares', order:107});
		Categories.insert({code: 'learn-music-drum-perc', ancestors:['learn-music'], name:'Percussions', order:108});
		Categories.insert({code: 'learn-music-elec-keys', ancestors:['learn-music'], name:'Piano', order:109});
		Categories.insert({code: 'learn-music-wind-saxo', ancestors:['learn-music'], name:'Saxophones', order:110});
		Categories.insert({code: 'learn-music-elec-sqcr', ancestors:['learn-music'], name:'Séquenceurs', order:111});
		Categories.insert({code: 'learn-music-elec-stdo', ancestors:['learn-music'], name:'Studio', order:112});
		Categories.insert({code: 'learn-music-elec-synt', ancestors:['learn-music'], name:'Synthétiseurs', order:113});
		Categories.insert({code: 'learn-music-strg-viln', ancestors:['learn-music'], name:'Violons', order:114});
		Categories.insert({code: 'learn-music-othr', ancestors:['learn-music'], name:'Cours de Musique - Autres', order:199});

		// Education
		Categories.insert({code: 'learn-educ', ancestors:[], root:true, level:0, name:'Education', order:200, terms:'cours education enseigner soutien matieres initiation initier apprentissage apprendre scolaire progresser progres progression decouvrir'});
		Categories.insert({code: 'learn-educ-mktg', ancestors:['learn-educ'], name:'Commerce', order:201});
		Categories.insert({code: 'learn-educ-econ', ancestors:['learn-educ'], name:'Economie', order:202});
		Categories.insert({code: 'learn-educ-geog', ancestors:['learn-educ'], name:'Géographie', order:203});
		Categories.insert({code: 'learn-educ-hist', ancestors:['learn-educ'], name:'Histoire', order:204});
		Categories.insert({code: 'learn-educ-comp', ancestors:['learn-educ'], name:'Informatique', order:205});
		Categories.insert({code: 'learn-educ-lang', ancestors:['learn-educ'], name:'Langues', order:206});
		Categories.insert({code: 'learn-educ-math', ancestors:['learn-educ'], name:'Mathématiques', order:207});
		Categories.insert({code: 'learn-educ-scie', ancestors:['learn-educ'], name:'Sciences', order:208});
		Categories.insert({code: 'learn-educ-othr', ancestors:['learn-educ'], name:'Cours Scolaire - Autres', order:299});

		// Cours de Cuisine
		Categories.insert({code: 'learn-cook', ancestors:[], root:true, level:0, name:'Cours de Cuisine', order:300, terms:'cours cuisine apprentissage apprendre initiation initier progresser progres progression decouvrir'});
		Categories.insert({code: 'learn-cook-ambo', ancestors:['learn-cook'], name:'Amuse Bouche', order:301});
		Categories.insert({code: 'learn-cook-strt', ancestors:['learn-cook'], name:'Entrées', order:302});
		Categories.insert({code: 'learn-cook-prcp', ancestors:['learn-cook'], name:'Plats', order:303});
		Categories.insert({code: 'learn-cook-dest', ancestors:['learn-cook'], name:'Desserts', order:304});
		Categories.insert({code: 'learn-cook-wine', ancestors:['learn-cook'], name:'Vins', order:305});
		Categories.insert({code: 'learn-cook-cock', ancestors:['learn-cook'], name:'Cocktails', order:306});
		Categories.insert({code: 'learn-cook-othr', ancestors:['learn-cook'], name:'Cours de Cuisine - Autres', order:399});

		// Cours de Sport
		Categories.insert({code: 'learn-sport', ancestors:[], root:true, level:0, name:'Sport', order:400, terms:'cours sport apprentissage apprendre initiation initier progresser progres progression decouvrir'});
		Categories.insert({code: 'learn-sport-badm', ancestors:['learn-sport'], name:'Badminton', order:401});
		Categories.insert({code: 'learn-sport-bskt', ancestors:['learn-sport'], name:'Basket', order:402});
		Categories.insert({code: 'learn-sport-bmx', ancestors:['learn-sport'], name:'Bmx', order:403});
		Categories.insert({code: 'learn-sport-canoe', ancestors:['learn-sport'], name:'Canoe Kayak', order:404});
		Categories.insert({code: 'learn-sport-jogg', ancestors:['learn-sport'], name:'Courses à pieds', order:405});
		Categories.insert({code: 'learn-sport-dnce', ancestors:['learn-sport'], name:'Danse', order:406});
		Categories.insert({code: 'learn-sport-dron', ancestors:['learn-sport'], name:'Drones', order:407});
		Categories.insert({code: 'learn-sport-hrse', ancestors:['learn-sport'], name:'Equitation', order:408});
		Categories.insert({code: 'learn-sport-clmb', ancestors:['learn-sport'], name:'Escalade', order:409});
		Categories.insert({code: 'learn-sport-swrd', ancestors:['learn-sport'], name:'Escrime', order:410});
		Categories.insert({code: 'learn-sport-foot', ancestors:['learn-sport'], name:'Footbal', order:411});
		Categories.insert({code: 'learn-sport-golf', ancestors:['learn-sport'], name:'Golf', order:412});
		Categories.insert({code: 'learn-sport-gymn', ancestors:['learn-sport'], name:'Gymnastique', order:413});
		Categories.insert({code: 'learn-sport-hand', ancestors:['learn-sport'], name:'Handball', order:414});
		Categories.insert({code: 'learn-sport-card', ancestors:['learn-sport'], name:'Jeux de cartes', order:415});
		Categories.insert({code: 'learn-sport-vgme', ancestors:['learn-sport'], name:'Jeux Vidéos', order:416});
		Categories.insert({code: 'learn-sport-kite', ancestors:['learn-sport'], name:'Kite Surf', order:417});
		Categories.insert({code: 'learn-sport-pati', ancestors:['learn-sport'], name:'Patinage', order:418});
		Categories.insert({code: 'learn-sport-skig', ancestors:['learn-sport'], name:'Ski', order:419});
		Categories.insert({code: 'learn-sport-snow', ancestors:['learn-sport'], name:'Snowboard', order:420});
		Categories.insert({code: 'learn-sport-fght', ancestors:['learn-sport'], name:'Sport de combat', order:421});
		Categories.insert({code: 'learn-sport-indr', ancestors:['learn-sport'], name:'Sport en salle', order:422});
		Categories.insert({code: 'learn-sport-surf', ancestors:['learn-sport'], name:'Surf', order:423});
		Categories.insert({code: 'learn-sport-tnis', ancestors:['learn-sport'], name:'Tennis', order:424});
		Categories.insert({code: 'learn-sport-tirs', ancestors:['learn-sport'], name:'Tirs', order:425});
		Categories.insert({code: 'learn-sport-bike', ancestors:['learn-sport'], name:'Vélos de course', order:426});
		Categories.insert({code: 'learn-sport-vtt', ancestors:['learn-sport'], name:'Vélos tout terrain (vtt)', order:427});
		Categories.insert({code: 'learn-sport-vbal', ancestors:['learn-sport'], name:'Voley Ball', order:428});
		Categories.insert({code: 'learn-sport-othr', ancestors:['learn-sport'], name:'Sport - Autres', order:499});


		// Bricolage, Travaux & Jardins
		Categories.insert({code: 'brico', ancestors:[], root:true, level:0, order:500, name:'Bricolage, Maison, Travaux & Jardins', terms:'bricolage bricoler reparer reparation maison travaux jardins apprentissage apprendre initiation initier progresser progres progression decouvrir exterieur interieur'});
		Categories.insert({code: 'brico-home-deco', ancestors:['brico'], name:'Maison - Aménagement & décoration', order:502});
		Categories.insert({code: 'brico-home-elec', ancestors:['brico'], name:'Electricité', order:503, terms: 'electricite electrique fil'});
		Categories.insert({code: 'brico-home-msry', ancestors:['brico'], name:'Maçonnerie', order:504, terms: 'maconnerie casser monter mur enduit'});
		Categories.insert({code: 'brico-home-pait', ancestors:['brico'], name:'Peinture', order:505, terms: 'peindre peinture rafraichir'});
		Categories.insert({code: 'brico-grdn-deco', ancestors:['brico'], name:'Jardin - Aménagement & décoration', order:551, terms: 'jardin amenagment decoration decorer tondre pelouse couper'});
		Categories.insert({code: 'brico-grdn-vega', ancestors:['brico'], name:'Potager', order:552});
		Categories.insert({code: 'brico-othr', ancestors:['brico'], name:'Bricolage & Travaux - Autres', order: 599});


		// Mécanique & Réparations
		Categories.insert({code: 'meca', ancestors:[], root:true, level:0, name:'Mécanique & Réparations', terms:'cours mecanique reparer reparation apprentissage initiation initier apprendre progresser progres progression decouvrir', order:600});
		Categories.insert({code: 'meca-trck', ancestors:['meca'], name:'Camion & Poids lourd', order:601});
		Categories.insert({code: 'meca-cars', ancestors:['meca'], name:'Voiture', order:602});
		Categories.insert({code: 'meca-moto', ancestors:['meca'], name:'Moto', order:603});
		Categories.insert({code: 'meca-scoo', ancestors:['meca'], name:'Scooter & Vespa', order:604});
		Categories.insert({code: 'meca-bike', ancestors:['meca'], name:'Vélo', order:605});
		Categories.insert({code: 'meca-pait', ancestors:['meca'], name:'Peinture', order:606});
		Categories.insert({code: 'meca-othr', ancestors:['meca'], name:'Mécanique & Réparations - Autres', order:699});


	}
});
