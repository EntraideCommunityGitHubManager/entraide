Categories = new Mongo.Collection("categories");

Meteor.publish("all-categories", function(){
   return Categories.find({}, {sort: {order:1}});
});

Meteor.startup(function () {
	if(Categories.find({}).count()<=0){

		// Soins, Beauté & Mode
		Categories.insert({code: 'beau', ancestors:[], root:true, level:0, name:'Soins, Beauté & Mode', order:0, terms:'cours apprentissage apprendre initiation initier progresser progres progression decouvrir'});
		Categories.insert({code: 'beau-hair', ancestors:['beau'], name:'Coiffure', order:1, terms: 'soins beaute mode coiffure coiffeur coiffer couper cheveux'});
		Categories.insert({code: 'beau-cout', ancestors:['beau'], name:'Couture', order:2, terms: 'soins beaute mode couture coudre ourlets'});
		Categories.insert({code: 'beau-make', ancestors:['beau'], name:'Maquillage', order:3, terms: 'soins beaute mode maquillage maquiller make up make-up'});
		Categories.insert({code: 'beau-masg', ancestors:['beau'], name:'Massage', order:4, terms: 'soins beaute mode massage masser masseur masseuse'});
		Categories.insert({code: 'beau-rlok', ancestors:['beau'], name:'Relooking', order:5, terms: 'soins beaute mode look relook relooking style relooker changer'});
		Categories.insert({code: 'beau-rpsg', ancestors:['beau'], name:'Repassage', order:6, terms: 'soins beaute mode repassage repasser'});
		Categories.insert({code: 'beau-othr', ancestors:['beau'], name:'Soins, Beauté & Mode - Autres', order:99});

		// Cours de Musique
		Categories.insert({code: 'learn-music', ancestors:[], root:true, level:0, name:'Musique', order:101, terms:'cours apprentissage accords rythme solfege jouer initiation initier apprendre progresser progres progression decouvrir'});
		Categories.insert({code: 'learn-music-drum-btry', ancestors:['learn-music'], name:'Batteries', order:102, terms: 'musique batteries'});
		Categories.insert({code: 'learn-music-elec-kbrd', ancestors:['learn-music'], name:'Claviers numérique', order:103, terms: 'musique clavier numerique'});
		Categories.insert({code: 'learn-music-elec-djng', ancestors:['learn-music'], name:'Dj', order:104, terms: 'musique dj djing disque caler mixer'});
		Categories.insert({code: 'learn-music-elec-drum', ancestors:['learn-music'], name:'Drum machine', order:105, terms: 'musique drum machine sequencer sequenceur programmer'});
		Categories.insert({code: 'learn-music-wind-flut', ancestors:['learn-music'], name:'Flûtes', order:106, terms: 'musique flutes'});
		Categories.insert({code: 'learn-music-strg-guit', ancestors:['learn-music'], name:'Guitares', order:107, terms: 'musique guitare seche electrique basse'});
		Categories.insert({code: 'learn-music-drum-perc', ancestors:['learn-music'], name:'Percussions', order:108, terms: 'musique percussions djumbe darbuka toms'});
		Categories.insert({code: 'learn-music-elec-keys', ancestors:['learn-music'], name:'Piano', order:109, terms: 'musique piano'});
		Categories.insert({code: 'learn-music-wind-saxo', ancestors:['learn-music'], name:'Saxophones', order:110, terms: 'musique saxophone'});
		Categories.insert({code: 'learn-music-elec-sqcr', ancestors:['learn-music'], name:'Séquenceurs', order:111, terms: 'musique drum machine sequencer sequenceur programmer'});
		Categories.insert({code: 'learn-music-elec-stdo', ancestors:['learn-music'], name:'Studio', order:112, terms: 'musique studio configurer brancher'});
		Categories.insert({code: 'learn-music-elec-synt', ancestors:['learn-music'], name:'Synthétiseurs', order:113, terms: 'musique synthetiseur programmer'});
		Categories.insert({code: 'learn-music-strg-viln', ancestors:['learn-music'], name:'Violons', order:114, terms: 'musique violons violoncelle'});
		Categories.insert({code: 'learn-music-othr', ancestors:['learn-music'], name:'Musique - Autres', order:199});

		// Education
		Categories.insert({code: 'learn-educ', ancestors:[], root:true, level:0, name:'Education', order:200, terms:'cours enseigner soutien matieres initiation initier apprentissage apprendre scolaire progresser progres progression decouvrir'});
		Categories.insert({code: 'learn-educ-mktg', ancestors:['learn-educ'], name:'Commerce', order:201, terms: 'education commerce marketing'});
		Categories.insert({code: 'learn-educ-econ', ancestors:['learn-educ'], name:'Economie', order:202, terms: 'education economie'});
		Categories.insert({code: 'learn-educ-geog', ancestors:['learn-educ'], name:'Géographie', order:203, terms: 'education geographie'});
		Categories.insert({code: 'learn-educ-hist', ancestors:['learn-educ'], name:'Histoire', order:204, terms: 'education histoire'});
		Categories.insert({code: 'learn-educ-comp', ancestors:['learn-educ'], name:'Informatique', order:205, terms: 'education informatique ordinateur tablette utiliser configurer site web application logiciels programmation programmer language java c++ dotnet angular meteor javascript html coder algorithme '});
		Categories.insert({code: 'learn-educ-lang', ancestors:['learn-educ'], name:'Langues', order:206, terms: 'langues language parler etranger etrangere anglais espagnol chinois japonais russe arabe portuguais'});
		Categories.insert({code: 'learn-educ-math', ancestors:['learn-educ'], name:'Mathématiques', order:207, terms: 'education mathematiques'});
		Categories.insert({code: 'learn-educ-scie', ancestors:['learn-educ'], name:'Sciences', order:208, terms: 'education sciences physique naturelle'});
		Categories.insert({code: 'learn-educ-othr', ancestors:['learn-educ'], name:'Education - Autres', order:299});

		// Cours de Cuisine
		Categories.insert({code: 'learn-cook', ancestors:[], root:true, level:0, name:'Cuisine', order:300, terms:'cours cuisiner gastronomie bistronomie apprentissage apprendre initiation initier progresser progres progression decouvrir'});
		Categories.insert({code: 'learn-cook-ambo', ancestors:['learn-cook'], name:'Amuse Bouche', order:301, terms:'cuisine amuse bouche'});
		Categories.insert({code: 'learn-cook-strt', ancestors:['learn-cook'], name:'Entrées', order:302, terms:'cuisine entrees'});
		Categories.insert({code: 'learn-cook-prcp', ancestors:['learn-cook'], name:'Plats', order:303, terms:'cuisine plats principal'});
		Categories.insert({code: 'learn-cook-dest', ancestors:['learn-cook'], name:'Desserts', order:304, terms:'cuisine desserts'});
		Categories.insert({code: 'learn-cook-wine', ancestors:['learn-cook'], name:'Vins', order:305, terms:'cuisine vins'});
		Categories.insert({code: 'learn-cook-cock', ancestors:['learn-cook'], name:'Cocktails', order:306, terms:'cuisine cocktails'});
		Categories.insert({code: 'learn-cook-othr', ancestors:['learn-cook'], name:'Cuisine - Autres', order:399});

		// Cours de Sport
		Categories.insert({code: 'learn-sport', ancestors:[], root:true, level:0, name:'Sport', order:400, terms:'cours apprentissage apprendre initiation initier progresser progres progression decouvrir'});
		Categories.insert({code: 'learn-sport-badm', ancestors:['learn-sport'], name:'Badminton', order:401, terms:'sport badminton'});
		Categories.insert({code: 'learn-sport-bskt', ancestors:['learn-sport'], name:'Basket', order:402, terms:'sport basket'});
		Categories.insert({code: 'learn-sport-bmx',  ancestors:['learn-sport'], name:'Bmx', order:403, terms:'sport bmx'});
		Categories.insert({code: 'learn-sport-kaya', ancestors:['learn-sport'], name:'Canoe Kayak', order:404, terms:'sport canoe kayak'});
		Categories.insert({code: 'learn-sport-jogg', ancestors:['learn-sport'], name:'Courses à pieds', order:405, terms:'sport courses pieds jogging running'});
		Categories.insert({code: 'learn-sport-dnce', ancestors:['learn-sport'], name:'Danse', order:406, terms:'sport danser zumba break dance tango'});
		Categories.insert({code: 'learn-sport-dron', ancestors:['learn-sport'], name:'Drones', order:407, terms:'sport drones piloter controler configurer'});
		Categories.insert({code: 'learn-sport-hrse', ancestors:['learn-sport'], name:'Equitation', order:408, terms:'sport equitation monter cheval cavalier'});
		Categories.insert({code: 'learn-sport-clmb', ancestors:['learn-sport'], name:'Escalade', order:409, terms:'sport escalade escalader montagne'});
		Categories.insert({code: 'learn-sport-swrd', ancestors:['learn-sport'], name:'Escrime', order:410, terms:'sport escrime'});
		Categories.insert({code: 'learn-sport-foot', ancestors:['learn-sport'], name:'Footbal', order:411, terms:'sport footbal tirer'});
		Categories.insert({code: 'learn-sport-golf', ancestors:['learn-sport'], name:'Golf', order:412, terms:'golf tirer swing'});
		Categories.insert({code: 'learn-sport-gymn', ancestors:['learn-sport'], name:'Gymnastique', order:413, terms:'sport gymnastique'});
		Categories.insert({code: 'learn-sport-hand', ancestors:['learn-sport'], name:'Handball', order:414, terms:'sport handball'});
		Categories.insert({code: 'learn-sport-card', ancestors:['learn-sport'], name:'Jeux de cartes', order:415, terms: 'sport jeux cartes poker belote tarot crapette bataille'});
		Categories.insert({code: 'learn-sport-vgme', ancestors:['learn-sport'], name:'Jeux Vidéos', order:416, terms:'sport jeux videos electroniques'});
		Categories.insert({code: 'learn-sport-kite', ancestors:['learn-sport'], name:'Kite Surf', order:417, terms:'sport kite surfing'});
		Categories.insert({code: 'learn-sport-padl', ancestors:['learn-sport'], name:'Paddle', order:418, terms:'sport paddle'});
		Categories.insert({code: 'learn-sport-pati', ancestors:['learn-sport'], name:'Patinage', order:419, terms:'sport patinage patiner artistique patins glace'});
		Categories.insert({code: 'learn-sport-rolr', ancestors:['learn-sport'], name:'Roller', order:420, terms:'sport patiner roller artistique patins quad'});
		Categories.insert({code: 'learn-sport-skat', ancestors:['learn-sport'], name:'Skate', order:421, terms:'sport skate board skating'});
		Categories.insert({code: 'learn-sport-skig', ancestors:['learn-sport'], name:'Ski', order:422, terms:'sport ski'});
		Categories.insert({code: 'learn-sport-snow', ancestors:['learn-sport'], name:'Snowboard', order:423, terms:'sport snowboarding'});
		Categories.insert({code: 'learn-sport-fght', ancestors:['learn-sport'], name:'Sport de combat', order:424, terms:'sport combat judo karate boxe kick boxing taekwondo aikido muay thai lutte kung-fu krav maga jujitsu'});
		Categories.insert({code: 'learn-sport-indr', ancestors:['learn-sport'], name:'Sport en salle', order:425, terms:'sport en salle'});
		Categories.insert({code: 'learn-sport-surf', ancestors:['learn-sport'], name:'Surf', order:426, terms:'sport surf'});
		Categories.insert({code: 'learn-sport-tnis', ancestors:['learn-sport'], name:'Tennis', order:427, terms:'sport tennis'});
		Categories.insert({code: 'learn-sport-tirs', ancestors:['learn-sport'], name:'Tirs', order:428, terms:'sport tirs arc arbalette carabine'});
		Categories.insert({code: 'learn-sport-bike', ancestors:['learn-sport'], name:'Vélos de course', order:429, terms:'sport velos course'});
		Categories.insert({code: 'learn-sport-vtt',  ancestors:['learn-sport'], name:'Vélos tout terrain (vtt)', order:430, terms:'sport velo tout terrain vtt'});
		Categories.insert({code: 'learn-sport-vbal', ancestors:['learn-sport'], name:'Voley Ball', order:431, terms:'sport volley ball beach'});
		Categories.insert({code: 'learn-sport-wsrf', ancestors:['learn-sport'], name:'Planche à voile', order:432, terms:'sport planche voile windsurf'});
		Categories.insert({code: 'learn-sport-othr', ancestors:['learn-sport'], name:'Sport - Autres', order:499});


		// Bricolage, Travaux & Jardins
		Categories.insert({code: 'brico', ancestors:[], root:true, level:0, order:500, name:'Bricolage, Maison, Travaux & Jardins', terms:'bricolage bricoler reparer reparation creer maison travaux jardins apprentissage apprendre initiation initier progresser progres progression decouvrir exterieur interieur'});
		Categories.insert({code: 'brico-home-deco', ancestors:['brico'], name:'Maison - Aménagement & décoration', order:502, terms: 'bricolage maison travaux amenagement decoration'});
		Categories.insert({code: 'brico-home-flor', ancestors:['brico'], name:'Carrelage', order:503, terms: 'bricolage maison travaux carrelage poser carreleur carreleuse'});
		Categories.insert({code: 'brico-home-roof', ancestors:['brico'], name:'Charpente & Toit', order:504, terms: 'bricolage maison travaux charpentier charpente toit chaume couvreur couvrir'});
		Categories.insert({code: 'brico-home-heat', ancestors:['brico'], name:'Chauffage', order:505, terms: 'bricolage maison travaux chauffage chauffagiste radiateur'});
		Categories.insert({code: 'brico-home-trck', ancestors:['brico'], name:"Conducteur d'engins", order:506, terms: 'bricolage maison travaux conducteur engin tracteur tractopelle tracto pelle -pelle'});
		Categories.insert({code: 'brico-home-elec', ancestors:['brico'], name:'Electricité', order:507, terms: 'bricolage maison travaux electricite electrique fil'});
		Categories.insert({code: 'brico-home-msry', ancestors:['brico'], name:'Maçonnerie', order:508, terms: 'bricolage maison travaux maconnerie casser monter mur enduit plaquiste terrassier terrasse'});
		Categories.insert({code: 'brico-home-pait', ancestors:['brico'], name:'Peinture', order:509, terms: 'bricolage maison travaux peindre peinture rafraichir repeindre'});
		Categories.insert({code: 'brico-home-esun', ancestors:['brico'], name:'Panneaux Solaire', order:510, terms: 'bricolage maison travaux panneaux solaire photovoltaique photo voltaique -voltaique poser installer'});
		Categories.insert({code: 'brico-home-plmb', ancestors:['brico'], name:'Plomberie', order:511, terms: 'bricolage maison travaux tuyaux pomberie plombiere bouchee'});
		Categories.insert({code: 'brico-grdn-deco', ancestors:['brico'], name:'Jardin - Aménagement & décoration', order:551, terms: 'bricolage jardins travaux amenagment decoration decorer tondre pelouse couper'});
		Categories.insert({code: 'brico-grdn-vega', ancestors:['brico'], name:'Potager', order:552, terms: 'bricolage jardins travaux potager legumes fruits tomates salades oignons basilic plantes'});
		Categories.insert({code: 'brico-othr', ancestors:['brico'], name:'Bricolage & Travaux - Autres', order: 599, terms: 'bricolage maison travaux jardins autres'});


		// Mécanique & Réparations
		Categories.insert({code: 'meca', ancestors:[], root:true, level:0, name:'Mécanique, Entretien & Réparations', terms:'cours mecanique entretien reparation reparer customisation customiser apprentissage initiation initier apprendre progresser progres progression decouvrir changer remplacer', order:600});
		Categories.insert({code: 'meca-trck', ancestors:['meca'], name:'Camion & Poids lourd', order:601, terms: 'mecanique entretien reparation camion poids lourd'});
		Categories.insert({code: 'meca-cars', ancestors:['meca'], name:'Voiture', order:602, terms: 'mecanique entretien reparation voiture vidange pneux roues courroie'});
		Categories.insert({code: 'meca-moto', ancestors:['meca'], name:'Moto', order:603, terms: 'mecanique entretien reparation moto vidange pneux roues courroie chaine'});
		Categories.insert({code: 'meca-scoo', ancestors:['meca'], name:'Scooter', order:604, terms: 'mecanique entretien reparation scooter vespa mobylette ciao vidange pneux roues courroie chaine'});
		Categories.insert({code: 'meca-bike', ancestors:['meca'], name:'Vélo', order:605, terms: 'mecanique entretien reparation velo cruiser low rider vtt course roues chaine'});
		Categories.insert({code: 'meca-pait', ancestors:['meca'], name:'Peinture', order:606, terms: 'mecanique entretien reparation peinture peindre carrosserie repeindre'});
		Categories.insert({code: 'meca-othr', ancestors:['meca'], name:'Mécanique & Réparations - Autres', order:699, terms:'mecanique entretien reparation autres'});


	}
});
