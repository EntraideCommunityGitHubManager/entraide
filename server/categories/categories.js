Categories = new Mongo.Collection("categories");

Meteor.publish("all-categories", function(){
   return Categories.find({});
});

Meteor.startup(function () {
  if(Categories.find({}).count()<=0){
      Categories.insert({code: "MUSIC", ancestors:[], parent:null, name:'Musique'});
      Categories.insert({code: "MUSIC-WIND", ancestors:["MUSIC"], parent:"MUSIC", name:'Instrument à vent'});
      Categories.insert({code: "MUSIC-WIND-FLT", ancestors:["MUSIC", "MUSIC-WIND"], parent:"MUSIC-WIND", name:'Flûtes'});
      Categories.insert({code: "MUSIC-WIND-SAX", ancestors:["MUSIC", "MUSIC-WIND"], parent:"MUSIC-WIND", name:'Saxophones'});
      Categories.insert({code: "MUSIC-WIND-OTH", ancestors:["MUSIC", "MUSIC-WIND"], parent:"MUSIC-WIND", name:'Autres'});
      
      Categories.insert({code: "MUSIC-ELEC", ancestors:["MUSIC"], parent:"MUSIC", name:'Instrument électronique'});
      Categories.insert({code: "MUSIC-STRG", ancestors:["MUSIC"], parent:"MUSIC", name:'Instrument à corde'});
      Categories.insert({code: "MUSIC-STRG-VIO", ancestors:["MUSIC", "MUSIC-STRG"], parent:"MUSIC-STRG", name:'Violons'});
      Categories.insert({code: "MUSIC-STRG-OTH", ancestors:["MUSIC", "MUSIC-STRG"], parent:"MUSIC-STRG", name:'Autres'});
      
      Categories.insert({code:"BRICO", ancestors:[], parent:null, name:"Bricolage"});
  }

});
