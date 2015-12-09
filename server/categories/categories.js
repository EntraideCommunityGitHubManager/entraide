Categories = new Mongo.Collection("categories");

Meteor.publish("all-categories", function(){
   return Categories.find({});
});

Meteor.startup(function () {
  if(Categories.find({}).count()<=0){
      Categories.insert({code: 'music', ancestors:[], parent:null, name:'Musique'});
      
      Categories.insert({code: 'music-wind', ancestors:['music'], parent:'music', name:'Instrument à vent'});
      Categories.insert({code: 'music-wind-flt', ancestors:['music', 'music-wind'], parent:'music-wind', name:'Flûtes'});
      Categories.insert({code: 'music-wind-sax', ancestors:['music', 'music-wind'], parent:'music-wind', name:'Saxophones'});
      Categories.insert({code: 'music-wind-oth', ancestors:['music', 'music-wind'], parent:'music-wind', name:'Autres'});
      
      Categories.insert({code: 'music-elec', ancestors:['music'], parent:'music', name:'Instrument électronique'});
      Categories.insert({code: 'music-elec-syn', ancestors:['music', 'music-elec'], parent:'music-elec', name:'Instrument électronique'});
      
      Categories.insert({code: 'music-str', ancestors:['music'], parent:'music', name:'Instrument à corde'});
      Categories.insert({code: 'music-str-vio', ancestors:['music', 'music-str'], parent:'music-str', name:'Violons'});
      Categories.insert({code: 'music-str-oth', ancestors:['music', 'music-str'], parent:'music-str', name:'Autres'});
      
      Categories.insert({code: 'BRICO', ancestors:[], parent:null, name:'Bricolage'});
  }

});
