Categories = new Mongo.Collection("categories");

Meteor.publish("all-categories", function(){
   return Categories.find({});
});

Meteor.startup(function () {
	if(Categories.find({}).count()<=0){
     
		// Aprentissage & Education
		Categories.insert({code: 'learn', ancestors:[], root:true, level:0, name:'Apprentissage & Cours'});
		// Music
		Categories.insert({code: 'learn-music', ancestors:[], root:true, level:1, name:'Musique'});
		Categories.insert({code: 'learn-music-wind-flut', ancestors:['learn', 'learn-music'], name:'Flûtes'});
		Categories.insert({code: 'learn-music-wind-saxo', ancestors:['learn', 'learn-music'], name:'Saxophones'});
		Categories.insert({code: 'learn-music-elec-sqcr', ancestors:['learn', 'learn-music'], name:'Séquenceurs'});
		Categories.insert({code: 'learn-music-elec-synt', ancestors:['learn', 'learn-music'], name:'Synthétiseurs'});
		Categories.insert({code: 'learn-music-elec-keys', ancestors:['learn', 'learn-music'], name:'Piano'});
		Categories.insert({code: 'learn-music-elec-kbrd', ancestors:['learn', 'learn-music'], name:'Claviers numérique'});
		Categories.insert({code: 'learn-music-elec-drum', ancestors:['learn', 'learn-music'], name:'Drum machine'});
		Categories.insert({code: 'learn-music-elec-djng', ancestors:['learn', 'learn-music'], name:'Dj'});
		Categories.insert({code: 'learn-music-drum-btry', ancestors:['learn', 'learn-music'], name:'Batteries'});
		Categories.insert({code: 'learn-music-drum-perc', ancestors:['learn', 'learn-music'], name:'Percussions'});
		Categories.insert({code: 'learn-music-strg-guit', ancestors:['learn', 'learn-music'], name:'Guitares'});
		Categories.insert({code: 'learn-music-strg-viln', ancestors:['learn', 'learn-music'], name:'Violons'});
		Categories.insert({code: 'learn-music-strg-stdo', ancestors:['learn', 'learn-music'], name:'Studio'});
		Categories.insert({code: 'learn-music-othr', ancestors:['learn', 'learn-music'], name:'Autres'});
		// Education
		Categories.insert({code: 'learn-educ', ancestors:['learn'], root:true, level:1, name:'Matières Scolaire'});
		Categories.insert({code: 'learn-educ-math', ancestors:['learn', 'learn-educ'], name:'Mathématiques'});
		Categories.insert({code: 'learn-educ-lang', ancestors:['learn', 'learn-educ'], name:'Languages'});
		Categories.insert({code: 'learn-educ-scie', ancestors:['learn', 'learn-educ'], name:'Sciences'});
		Categories.insert({code: 'learn-educ-econ', ancestors:['learn', 'learn-educ'], name:'Economie'});
		Categories.insert({code: 'learn-educ-mktg', ancestors:['learn', 'learn-educ'], name:'Commerce'});
		Categories.insert({code: 'learn-educ-geog', ancestors:['learn', 'learn-educ'], name:'Géographie'});
		Categories.insert({code: 'learn-educ-hist', ancestors:['learn', 'learn-educ'], name:'Histoire'});
		Categories.insert({code: 'learn-educ-comp', ancestors:['learn', 'learn-educ'], name:'Informatique'});
		Categories.insert({code: 'learn-educ-othr', ancestors:['learn', 'learn-educ'], name:'Autres'});
		// Sport
		Categories.insert({code: 'learn-sport', ancestors:['learn'], root:true, level:1, name:'Sport'});
		Categories.insert({code: 'learn-sport-kite', ancestors:['learn', 'learn-sport'], name:'Kite Surf'});
		Categories.insert({code: 'learn-sport-snow', ancestors:['learn', 'learn-sport'], name:'Snowboard'});
		Categories.insert({code: 'learn-sport-skig', ancestors:['learn', 'learn-sport'], name:'Ski'});
		Categories.insert({code: 'learn-sport-surf', ancestors:['learn', 'learn-sport'], name:'Surf'});
		Categories.insert({code: 'learn-sport-dnce', ancestors:['learn', 'learn-sport'], name:'Danse'});
		Categories.insert({code: 'learn-sport-clmb', ancestors:['learn', 'learn-sport'], name:'Escalade'});
		Categories.insert({code: 'learn-sport-indr', ancestors:['learn', 'learn-sport'], name:'Sport en salle'});
		Categories.insert({code: 'learn-sport-foot', ancestors:['learn', 'learn-sport'], name:'Footbal'});
		Categories.insert({code: 'learn-sport-tnis', ancestors:['learn', 'learn-sport'], name:'Tennis'});
		Categories.insert({code: 'learn-sport-badm', ancestors:['learn', 'learn-sport'], name:'Badminton'});
		Categories.insert({code: 'learn-sport-vbal', ancestors:['learn', 'learn-sport'], name:'Voley Ball'});
		Categories.insert({code: 'learn-sport-bskt', ancestors:['learn', 'learn-sport'], name:'Basket'});
		Categories.insert({code: 'learn-sport-bike', ancestors:['learn', 'learn-sport'], name:'Vélos'});
		Categories.insert({code: 'learn-sport-hrse', ancestors:['learn', 'learn-sport'], name:'Equitation'});
		Categories.insert({code: 'learn-sport-golf', ancestors:['learn', 'learn-sport'], name:'Golf'});
		Categories.insert({code: 'learn-sport-hand', ancestors:['learn', 'learn-sport'], name:'Handball'});
		Categories.insert({code: 'learn-sport-gymn', ancestors:['learn', 'learn-sport'], name:'Gymnastique'});
		Categories.insert({code: 'learn-sport-pati', ancestors:['learn', 'learn-sport'], name:'Patinage'});
		Categories.insert({code: 'learn-sport-tirs', ancestors:['learn', 'learn-sport'], name:'Tirs'});
		Categories.insert({code: 'learn-sport-swrd', ancestors:['learn', 'learn-sport'], name:'Escrime'});
		Categories.insert({code: 'learn-sport-jogg', ancestors:['learn', 'learn-sport'], name:'Courses à pieds'});
		Categories.insert({code: 'learn-sport-fght', ancestors:['learn', 'learn-sport'], name:'Sport de combat'});
		Categories.insert({code: 'learn-sport-bmx', ancestors:['learn', 'learn-sport'], name:'Bmx'});
		Categories.insert({code: 'learn-sport-canoe', ancestors:['learn', 'learn-sport'], name:'Canoe Kayak'});
		Categories.insert({code: 'learn-sport-dron', ancestors:['learn', 'learn-sport'], name:'Drones'});
		Categories.insert({code: 'learn-sport-vgme', ancestors:['learn', 'learn-sport'], name:'Jeux Vidéos'});
		Categories.insert({code: 'learn-sport-card', ancestors:['learn', 'learn-sport'], name:'Jeux de cartes'});
		Categories.insert({code: 'learn-sport-othr', ancestors:['learn', 'learn-sport'], name:'Autres'});
		// Cuisine
		Categories.insert({code: 'learn-cook', ancestors:['learn'], root:true, level:1, name:'Cuisine'});
		Categories.insert({code: 'learn-cook-strt', ancestors:['learn', 'learn-cook'], name:'Amuse Bouche'});
		Categories.insert({code: 'learn-cook-strt', ancestors:['learn', 'learn-cook'], name:'Entrées'});
		Categories.insert({code: 'learn-cook-prcp', ancestors:['learn', 'learn-cook'], name:'Plats'});
		Categories.insert({code: 'learn-cook-dest', ancestors:['learn', 'learn-cook'], name:'Desserts'});
		Categories.insert({code: 'learn-cook-drnk', ancestors:['learn', 'learn-cook'], name:'Vins'});
		Categories.insert({code: 'learn-cook-drnk', ancestors:['learn', 'learn-cook'], name:'Cocktails'});
		Categories.insert({code: 'learn-cook-othr', ancestors:['learn', 'learn-cook'], name:'Autres'});


		// Bricolage, Travaux & Jardins
		Categories.insert({code: 'brico', ancestors:[], root:true, level:0, name:'Bricolage, Travaux & Jardins'});
		Categories.insert({code: 'brico-home', ancestors:['brico'], root:true, level:1, name:'Maison'});
		Categories.insert({code: 'brico-home-deco', ancestors:['brico', 'brico-home'], name:'Aménagement & décoration'});
		Categories.insert({code: 'brico-home-elec', ancestors:['brico', 'brico-home'], name:'Electricité'});
		Categories.insert({code: 'brico-home-msry', ancestors:['brico', 'brico-home'], name:'Maçonnerie'});
		Categories.insert({code: 'brico-home-pait', ancestors:['brico', 'brico-home'], name:'Peinture'});
		Categories.insert({code: 'brico-home-othr', ancestors:['brico', 'brico-home'], name:'Autres'});
		Categories.insert({code: 'brico-grdn', ancestors:['brico'], root:true, level:1, name:'Jardin'});
		Categories.insert({code: 'brico-grdn-deco', ancestors:['brico', 'brico-grdn'], name:'Aménagement & décoration'});
		Categories.insert({code: 'brico-grdn-vega', ancestors:['brico', 'brico-grdn'], name:'Potager'});
		Categories.insert({code: 'brico-grdn-othr', ancestors:['brico', 'brico-grdn'], name:'Autres'});
		Categories.insert({code: 'brico-othr', ancestors:['brico'], name:'Autres'});


		// Mécanique & Réparations
		Categories.insert({code: 'meca', ancestors:[], root:true, level:0, name:'Mécanique & Réparations'});
		Categories.insert({code: 'meca-bike', ancestors:['meca'], name:'Vélo'});
		Categories.insert({code: 'meca-scoo', ancestors:['meca'], name:'Scooter & Vespa'});
		Categories.insert({code: 'meca-moto', ancestors:['meca'], name:'Moto'});
		Categories.insert({code: 'meca-cars', ancestors:['meca'], name:'Voiture'});
		Categories.insert({code: 'meca-trck', ancestors:['meca'], name:'Camion & Poids lourd'});
		Categories.insert({code: 'meca-pait', ancestors:['meca'], name:'Peinture'});
		Categories.insert({code: 'meca-othr', ancestors:['meca'], name:'Autres'});


		// Soins, Beauté & Mode
		Categories.insert({code: 'beau', ancestors:[], root:true, level:0, name:'Soins, Beauté & Mode'});
		Categories.insert({code: 'beau-hair', ancestors:['beau'], name:'Coiffure'});
		Categories.insert({code: 'beau-make', ancestors:['beau'], name:'Maquillage'});
		Categories.insert({code: 'beau-masg', ancestors:['beau'], name:'Massage'});
		Categories.insert({code: 'beau-cout', ancestors:['beau'], name:'Couture'});
		Categories.insert({code: 'beau-rpsg', ancestors:['beau'], name:'Repassage'});
		Categories.insert({code: 'beau-othr', ancestors:['beau'], name:'Autres'});

	}
});
