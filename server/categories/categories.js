Categories = new Mongo.Collection("categories");

Meteor.publish("all-categories", function(){
   return Categories.find({});
});

Meteor.startup(function () {
	if(Categories.find({}).count()<=0){

		// Soins, Beauté & Mode
		Categories.insert({code: 'beau', ancestors:[], root:true, level:0, name:'Soins, Beauté & Mode', order:0});
		Categories.insert({code: 'beau-hair', ancestors:['beau'], name:'Coiffure', order:1});
		Categories.insert({code: 'beau-cout', ancestors:['beau'], name:'Couture', order:2});
		Categories.insert({code: 'beau-make', ancestors:['beau'], name:'Maquillage', order:3});
		Categories.insert({code: 'beau-masg', ancestors:['beau'], name:'Massage', order:4});
		Categories.insert({code: 'beau-rlok', ancestors:['beau'], name:'Relooking', order:5});
		Categories.insert({code: 'beau-rpsg', ancestors:['beau'], name:'Repassage', order:6});
		Categories.insert({code: 'beau-othr', ancestors:['beau'], name:'Soins, Beauté & Mode - Autres', order:99});
     
		// Aprentissage & Education
		Categories.insert({code: 'learn', ancestors:[], root:true, level:0, name:'Apprentissage & Cours', order:100});
		// Music
		Categories.insert({code: 'learn-music', ancestors:['learn'], root:true, level:1, name:'Musique', order:101});
		Categories.insert({code: 'learn-music-drum-btry', ancestors:['learn', 'learn-music'], name:'Batteries', order:102});
		Categories.insert({code: 'learn-music-elec-kbrd', ancestors:['learn', 'learn-music'], name:'Claviers numérique', order:103});
		Categories.insert({code: 'learn-music-elec-djng', ancestors:['learn', 'learn-music'], name:'Dj', order:104});
		Categories.insert({code: 'learn-music-elec-drum', ancestors:['learn', 'learn-music'], name:'Drum machine', order:105});
		Categories.insert({code: 'learn-music-wind-flut', ancestors:['learn', 'learn-music'], name:'Flûtes', order:106});
		Categories.insert({code: 'learn-music-strg-guit', ancestors:['learn', 'learn-music'], name:'Guitares', order:107});
		Categories.insert({code: 'learn-music-drum-perc', ancestors:['learn', 'learn-music'], name:'Percussions', order:108});
		Categories.insert({code: 'learn-music-elec-keys', ancestors:['learn', 'learn-music'], name:'Piano', order:109});
		Categories.insert({code: 'learn-music-wind-saxo', ancestors:['learn', 'learn-music'], name:'Saxophones', order:110});
		Categories.insert({code: 'learn-music-elec-sqcr', ancestors:['learn', 'learn-music'], name:'Séquenceurs', order:111});
		Categories.insert({code: 'learn-music-elec-stdo', ancestors:['learn', 'learn-music'], name:'Studio', order:112});
		Categories.insert({code: 'learn-music-elec-synt', ancestors:['learn', 'learn-music'], name:'Synthétiseurs', order:113});
		Categories.insert({code: 'learn-music-strg-viln', ancestors:['learn', 'learn-music'], name:'Violons', order:114});
		Categories.insert({code: 'learn-music-othr', ancestors:['learn', 'learn-music'], name:'Cours de Musique - Autres', order:199});
		// Education
		Categories.insert({code: 'learn-educ', ancestors:['learn'], root:true, level:1, name:'Matières Scolaire', order:200});
		Categories.insert({code: 'learn-educ-mktg', ancestors:['learn', 'learn-educ'], name:'Commerce', order:201});
		Categories.insert({code: 'learn-educ-econ', ancestors:['learn', 'learn-educ'], name:'Economie', order:202});
		Categories.insert({code: 'learn-educ-geog', ancestors:['learn', 'learn-educ'], name:'Géographie', order:203});
		Categories.insert({code: 'learn-educ-hist', ancestors:['learn', 'learn-educ'], name:'Histoire', order:204});
		Categories.insert({code: 'learn-educ-comp', ancestors:['learn', 'learn-educ'], name:'Informatique', order:205});
		Categories.insert({code: 'learn-educ-lang', ancestors:['learn', 'learn-educ'], name:'Langues', order:206});
		Categories.insert({code: 'learn-educ-math', ancestors:['learn', 'learn-educ'], name:'Mathématiques', order:207});
		Categories.insert({code: 'learn-educ-scie', ancestors:['learn', 'learn-educ'], name:'Sciences', order:208});
		Categories.insert({code: 'learn-educ-othr', ancestors:['learn', 'learn-educ'], name:'Cours Scolaire - Autres', order:299});
		// Cuisine
		Categories.insert({code: 'learn-cook', ancestors:['learn'], root:true, level:1, name:'Cuisine', order:300});
		Categories.insert({code: 'learn-cook-ambo', ancestors:['learn', 'learn-cook'], name:'Amuse Bouche', order:301});
		Categories.insert({code: 'learn-cook-strt', ancestors:['learn', 'learn-cook'], name:'Entrées', order:302});
		Categories.insert({code: 'learn-cook-prcp', ancestors:['learn', 'learn-cook'], name:'Plats', order:303});
		Categories.insert({code: 'learn-cook-dest', ancestors:['learn', 'learn-cook'], name:'Desserts', order:304});
		Categories.insert({code: 'learn-cook-wine', ancestors:['learn', 'learn-cook'], name:'Vins', order:305});
		Categories.insert({code: 'learn-cook-cock', ancestors:['learn', 'learn-cook'], name:'Cocktails', order:306});
		Categories.insert({code: 'learn-cook-othr', ancestors:['learn', 'learn-cook'], name:'Cours de Cuisine - Autres', order:399});
		// Sport
		Categories.insert({code: 'learn-sport', ancestors:['learn'], root:true, level:1, name:'Sport', order:400});
		Categories.insert({code: 'learn-sport-badm', ancestors:['learn', 'learn-sport'], name:'Badminton', order:401});
		Categories.insert({code: 'learn-sport-bskt', ancestors:['learn', 'learn-sport'], name:'Basket', order:402});
		Categories.insert({code: 'learn-sport-bmx', ancestors:['learn', 'learn-sport'], name:'Bmx', order:403});
		Categories.insert({code: 'learn-sport-canoe', ancestors:['learn', 'learn-sport'], name:'Canoe Kayak', order:404});
		Categories.insert({code: 'learn-sport-jogg', ancestors:['learn', 'learn-sport'], name:'Courses à pieds', order:405});
		Categories.insert({code: 'learn-sport-dnce', ancestors:['learn', 'learn-sport'], name:'Danse', order:406});
		Categories.insert({code: 'learn-sport-dron', ancestors:['learn', 'learn-sport'], name:'Drones', order:407});
		Categories.insert({code: 'learn-sport-hrse', ancestors:['learn', 'learn-sport'], name:'Equitation', order:408});
		Categories.insert({code: 'learn-sport-clmb', ancestors:['learn', 'learn-sport'], name:'Escalade', order:409});
		Categories.insert({code: 'learn-sport-swrd', ancestors:['learn', 'learn-sport'], name:'Escrime', order:410});
		Categories.insert({code: 'learn-sport-foot', ancestors:['learn', 'learn-sport'], name:'Footbal', order:411});
		Categories.insert({code: 'learn-sport-golf', ancestors:['learn', 'learn-sport'], name:'Golf', order:412});
		Categories.insert({code: 'learn-sport-gymn', ancestors:['learn', 'learn-sport'], name:'Gymnastique', order:413});
		Categories.insert({code: 'learn-sport-hand', ancestors:['learn', 'learn-sport'], name:'Handball', order:414});
		Categories.insert({code: 'learn-sport-card', ancestors:['learn', 'learn-sport'], name:'Jeux de cartes', order:415});
		Categories.insert({code: 'learn-sport-vgme', ancestors:['learn', 'learn-sport'], name:'Jeux Vidéos', order:416});
		Categories.insert({code: 'learn-sport-kite', ancestors:['learn', 'learn-sport'], name:'Kite Surf', order:417});
		Categories.insert({code: 'learn-sport-pati', ancestors:['learn', 'learn-sport'], name:'Patinage', order:418});
		Categories.insert({code: 'learn-sport-skig', ancestors:['learn', 'learn-sport'], name:'Ski', order:419});
		Categories.insert({code: 'learn-sport-snow', ancestors:['learn', 'learn-sport'], name:'Snowboard', order:420});
		Categories.insert({code: 'learn-sport-fght', ancestors:['learn', 'learn-sport'], name:'Sport de combat', order:421});
		Categories.insert({code: 'learn-sport-indr', ancestors:['learn', 'learn-sport'], name:'Sport en salle', order:422});
		Categories.insert({code: 'learn-sport-surf', ancestors:['learn', 'learn-sport'], name:'Surf', order:423});
		Categories.insert({code: 'learn-sport-tnis', ancestors:['learn', 'learn-sport'], name:'Tennis', order:424});
		Categories.insert({code: 'learn-sport-tirs', ancestors:['learn', 'learn-sport'], name:'Tirs', order:425});
		Categories.insert({code: 'learn-sport-bike', ancestors:['learn', 'learn-sport'], name:'Vélos de course', order:426});
		Categories.insert({code: 'learn-sport-vtt', ancestors:['learn', 'learn-sport'], name:'Vélos tout terrain (vtt)', order:427});
		Categories.insert({code: 'learn-sport-vbal', ancestors:['learn', 'learn-sport'], name:'Voley Ball', order:428});
		Categories.insert({code: 'learn-sport-othr', ancestors:['learn', 'learn-sport'], name:'Sport - Autres', order:499});


		// Bricolage, Travaux & Jardins
		Categories.insert({code: 'brico', ancestors:[], root:true, level:0, name:'Bricolage, Travaux & Jardins', order:500});
		Categories.insert({code: 'brico-home', ancestors:['brico'], root:true, level:1, name:'Maison', order:501});
		Categories.insert({code: 'brico-home-deco', ancestors:['brico', 'brico-home'], name:'Aménagement & décoration', order:502});
		Categories.insert({code: 'brico-home-elec', ancestors:['brico', 'brico-home'], name:'Electricité', order:503});
		Categories.insert({code: 'brico-home-msry', ancestors:['brico', 'brico-home'], name:'Maçonnerie', order:504});
		Categories.insert({code: 'brico-home-pait', ancestors:['brico', 'brico-home'], name:'Peinture', order:505});
		Categories.insert({code: 'brico-home-othr', ancestors:['brico', 'brico-home'], name:'Travaux Maison - Autres', order:506});
		Categories.insert({code: 'brico-grdn', ancestors:['brico'], root:true, level:1, name:'Jardin', order:550});
		Categories.insert({code: 'brico-grdn-deco', ancestors:['brico', 'brico-grdn'], name:'Aménagement & décoration', order:551});
		Categories.insert({code: 'brico-grdn-vega', ancestors:['brico', 'brico-grdn'], name:'Potager', order:552});
		Categories.insert({code: 'brico-grdn-othr', ancestors:['brico', 'brico-grdn'], name:'Jardin - Autres', order:553});
		Categories.insert({code: 'brico-othr', ancestors:['brico'], name:'Bricolage, Travaux & Jardins - Autres', order: 599});


		// Mécanique & Réparations
		Categories.insert({code: 'meca', ancestors:[], root:true, level:0, name:'Mécanique & Réparations', order:600});
		Categories.insert({code: 'meca-trck', ancestors:['meca'], name:'Camion & Poids lourd', order:601});
		Categories.insert({code: 'meca-cars', ancestors:['meca'], name:'Voiture', order:602});
		Categories.insert({code: 'meca-moto', ancestors:['meca'], name:'Moto', order:603});
		Categories.insert({code: 'meca-scoo', ancestors:['meca'], name:'Scooter & Vespa', order:604});
		Categories.insert({code: 'meca-bike', ancestors:['meca'], name:'Vélo', order:605});
		Categories.insert({code: 'meca-pait', ancestors:['meca'], name:'Peinture', order:606});
		Categories.insert({code: 'meca-othr', ancestors:['meca'], name:'Mécanique & Réparations - Autres', order:699});


	}
});
