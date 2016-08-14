Categories = new Mongo.Collection("categories");

Meteor.publish("all-categories", function(){
   return Categories.find({});
});

Meteor.startup(function () {
  if(Categories.find({}).count()<=0){
     
      // Music
      Categories.insert({code: 'music', ancestors:[], parent:null, root:true, level:0, name:'Musique'});
      Categories.insert({code: 'music-othr', ancestors:['music'], parent:'music', name:'Autres'});
      
      Categories.insert({code: 'music-wind', ancestors:['music'], parent:'music', root:true, level:1, name:'Instrument à vent'});
      Categories.insert({code: 'music-wind-flut', ancestors:['music', 'music-wind'], parent:'music-wind', name:'Flûtes'});
      Categories.insert({code: 'music-wind-saxo', ancestors:['music', 'music-wind'], parent:'music-wind', name:'Saxophones'});
      Categories.insert({code: 'music-wind-othr', ancestors:['music', 'music-wind'], parent:'music-wind', name:'Autres'});
      
      Categories.insert({code: 'music-elec', ancestors:['music'], parent:'music', root:true, level:1, name:'Instrument électronique'});
      Categories.insert({code: 'music-elec-sqcr', ancestors:['music', 'music-elec'], parent:'music-elec', name:'Séquenceurs'});
      Categories.insert({code: 'music-elec-synth', ancestors:['music', 'music-elec'], parent:'music-elec', name:'Synthétiseurs'});
      Categories.insert({code: 'music-elec-piano', ancestors:['music', 'music-elec'], parent:'music-elec', name:'Piano'});
      Categories.insert({code: 'music-elec-kbrd', ancestors:['music', 'music-elec'], parent:'music-elec', name:'Claviers numérique'});
      Categories.insert({code: 'music-elec-drum', ancestors:['music', 'music-elec'], parent:'music-elec', name:'Drum machine'});
      Categories.insert({code: 'music-elec-dj', ancestors:['music', 'music-elec'], parent:'music-elec', name:'Dj'});
      Categories.insert({code: 'music-elec-othr', ancestors:['music', 'music-elec'], parent:'music-elec', name:'Autres'});

      Categories.insert({code: 'music-drum', ancestors:['music'], parent:'music', root:true, level:1, name:'Percussions & Batteries'});
      Categories.insert({code: 'music-drum-btry', ancestors:['music', 'music-drum'], parent:'music-drum', name:'Batteries'});
      Categories.insert({code: 'music-drum-tom', ancestors:['music', 'music-drum'], parent:'music-drum', name:'Toms'});
      Categories.insert({code: 'music-drum-othr', ancestors:['music', 'music-drum'], parent:'music-drum', name:'Autres'});

      Categories.insert({code: 'music-strg', ancestors:['music'], parent:'music', root:true, level:1, name:'Instrument à corde'});
      Categories.insert({code: 'music-strg-guit', ancestors:['music', 'music-strg'], parent:'music-strg', name:'Guitares'});
      Categories.insert({code: 'music-strg-viln', ancestors:['music', 'music-strg'], parent:'music-strg', name:'Violons'});
      Categories.insert({code: 'music-strg-othr', ancestors:['music', 'music-strg'], parent:'music-strg', name:'Autres'});
      
      // Bricolage
      Categories.insert({code: 'brico', ancestors:[], parent:null, root:true, level:0, name:'Bricolage & Travaux'});
      Categories.insert({code: 'brico-othr', ancestors:['brico'], parent:'brico', name:'Autres'});

      Categories.insert({code: 'brico-grdn', ancestors:['brico'], parent:'brico', name:'Jardin'});
      Categories.insert({code: 'brico-home', ancestors:['brico'], parent:'brico', name:'Maison'});
      Categories.insert({code: 'brico-paint', ancestors:['brico'], parent:'brico', name:'Peinture'});

  }

});
