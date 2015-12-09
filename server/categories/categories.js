Categories = new Mongo.Collection("categories");

Meteor.publish("all-categories", function(){
   return Categories.find({});
});

Meteor.startup(function () {
  if(Categories.find({}).count()<=0){
      Categories.insert({"code":"MUSIC", "name":"Musique",
         categories : [{
            code:'MUSIC-WIND',
            name:'Instrument à vent'
         },{
            code:'MUSIC-ELEC',
            name:'Instrument électronique' 
         },{
            code:'MUSIC-STRG',
            name:'Instrument à corde' 
         }]
      });
      Categories.insert({"code":"BRICO","name":"Bricolage"});
  }

});
