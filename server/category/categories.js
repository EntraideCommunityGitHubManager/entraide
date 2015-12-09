Categories = new Mongo.Collection("categories");

Meteor.publish("all-categories", function(){
   return Categories.find();
});

Meteor.startup(function () {
  if(Categories.find({}).count()<=0){
      Categories.insert({"code":"MUSIC","name":"Musique"});
      Categories.insert({"code":"BRICO","name":"Bricolage"});
  }

});
