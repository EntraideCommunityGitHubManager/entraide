Categories = new Mongo.Collection("categories");

Meteor.publish("all-categories", function(){
   return Categories.find({});
});

Meteor.startup(function () {
  if(Categories.find({}).count()<=0){
     
      // Music
      Categories.insert({code: 'music', ancestors:[], parent:null, name:'Musique'});
      Categories.insert({code: 'music-oth', ancestors:['music'], parent:'music', name:'Autres'});
      
      Categories.insert({code: 'music-wind', ancestors:['music'], parent:'music', name:'Instrument à vent'});
      Categories.insert({code: 'music-wind-flt', ancestors:['music', 'music-wind'], parent:'music-wind', name:'Flûtes'});
      Categories.insert({code: 'music-wind-sax', ancestors:['music', 'music-wind'], parent:'music-wind', name:'Saxophones'});
      Categories.insert({code: 'music-wind-oth', ancestors:['music', 'music-wind'], parent:'music-wind', name:'Autres'});
      
      Categories.insert({code: 'music-elec', ancestors:['music'], parent:'music', name:'Instrument électronique'});
      Categories.insert({code: 'music-elec-syn', ancestors:['music', 'music-elec'], parent:'music-elec', name:'Instrument électronique'});
      Categories.insert({code: 'music-elec-oth', ancestors:['music', 'music-elec'], parent:'music-elec', name:'Autres'});
      
      Categories.insert({code: 'music-strg', ancestors:['music'], parent:'music', name:'Instrument à corde'});
      Categories.insert({code: 'music-strg-vio', ancestors:['music', 'music-strg'], parent:'music-strg', name:'Violons'});
      Categories.insert({code: 'music-strg-oth', ancestors:['music', 'music-strg'], parent:'music-strg', name:'Autres'});
      
      // Bricolage
      Categories.insert({code: 'brico', ancestors:[], parent:null, name:'Bricolage'});
      Categories.insert({code: 'brico-othr', ancestors:['brico'], parent:'brico', name:'Autres'});
      
      Categories.insert({code: 'brico-grdn', ancestors:['brico'], parent:'brico', name:'Jardin'});
      Categories.insert({code: 'brico-home', ancestors:['brico'], parent:'brico', name:'Batiment'});
      
      
  }

});
