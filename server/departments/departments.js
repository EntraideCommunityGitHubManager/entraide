Departments = new Mongo.Collection("departments");

Meteor.publish("department-by-code", function(options){
   return Departments.find({$and: [options.collectionOptions]});
});

Meteor.publish("all-departments", function(){
    return Departments.find({});
});

Meteor.startup(function () {
  if(Departments.find({}).count()<=0){
      Departments.insert({"code":"10","name":"Aube", location:{ "latitude":48.30146673770983,"longitude":4.0704345703125}}); 
      Departments.insert({"code":"11","name":"Aude", location:{ "latitude":43.20917969039356,"longitude":2.3565673828125}}); 
      Departments.insert({"code":"12","name":"Aveyron", location:{ "latitude":44.36313311380771,"longitude":2.581787109375}}); 
      Departments.insert({"code":"13","name":"Bouches-du-Rhône", location:{ "latitude":43.33316939281732,"longitude":5.3173828125}}); 
      Departments.insert({"code":"14","name":"Calvados", location:{ "latitude":49.102645497788814,"longitude":-0.340576171875}}); 
      Departments.insert({"code":"15","name":"Cantal", location:{ "latitude":44.941473354802504,"longitude":2.427978515625}}); 
      Departments.insert({"code":"16","name":"Charente", location:{ "latitude":45.66012730272194,"longitude":0.1593017578125}}); 
      Departments.insert({"code":"17","name":"Charente Maritime", location:{ "latitude":45.65244828675087,"longitude":0.1593017578125}}); 
      Departments.insert({"code":"18","name":"Cher", location:{ "latitude":47.08882558740757,"longitude":2.39501953125}}); 
      Departments.insert({"code":"19","name":"Corrèze", location:{ "latitude":45.16267407976457,"longitude":1.549072265625}}); 
      Departments.insert({"code":"21","name":"Côte d'Or", location:{ "latitude":47.32393057095941,"longitude":5.0372314453125}}); 
      Departments.insert({"code":"22","name":"Côtes d'Armor", location:{ "latitude":48.38544219115486,"longitude":-2.74658203125}}); 
      Departments.insert({"code":"23","name":"Creuse", location:{ "latitude":46.13036330589103,"longitude":1.988525390625}}); 
      Departments.insert({"code":"24","name":"Dordogne", location:{ "latitude":45.18590859850545,"longitude":0.72509765625}}); 
      Departments.insert({"code":"25","name":"Doubs", location:{ "latitude":47.2307596483469,"longitude":6.031494140625}}); 
      Departments.insert({"code":"26","name":"Drôme", location:{ "latitude":44.94536144236941,"longitude":4.888916015625}}); 
      Departments.insert({"code":"27","name":"Eure", location:{ "latitude":49.04867006939826,"longitude":1.0052490234375}}); 
      Departments.insert({"code":"28","name":"Eure-et-Loir", location:{ "latitude":48.37084770238363,"longitude":1.395263671875}}); 
      Departments.insert({"code":"29","name":"Finistère", location:{ "latitude":48.1367666796927,"longitude":-4.010009765625}}); 
      Departments.insert({"code":"30","name":"Gard", location:{ "latitude":43.834526782236814,"longitude":4.3505859375}}); 
      Departments.insert({"code":"31","name":"Haute Garonne", location:{ "latitude":43.61619382369188,"longitude":1.4447021484375}}); 
      Departments.insert({"code":"32","name":"Gers", location:{ "latitude":43.644025847699496,"longitude":0.59326171875}}); 
      Departments.insert({"code":"33","name":"Gironde", location:{ "latitude":44.84418558537004,"longitude":-0.560302734375}}); 
      Departments.insert({"code":"34","name":"Hérault", location:{ "latitude":43.62017061618992,"longitude":3.8616943359375}}); 
      Departments.insert({"code":"35","name":"Ille et Vilaine", location:{ "latitude":48.10743118848038,"longitude":-1.680908203125}}); 
      Departments.insert({"code":"36","name":"Indre", location:{ "latitude":46.807579571992385,"longitude":1.69189453125}}); 
      Departments.insert({"code":"37","name":"Indre et Loire", location:{ "latitude":47.372314620566925,"longitude":0.692138671875}}); 
      Departments.insert({"code":"38","name":"Isère", location:{ "latitude":45.205263456162385,"longitude":5.7073974609375}}); 
      Departments.insert({"code":"39","name":"Jura", location:{ "latitude":46.68713141244413,"longitude":5.6689453125}}); 
      Departments.insert({"code":"40","name":"Landes", location:{ "latitude":43.99676629896825,"longitude":-0.8624267578125}}); 
      Departments.insert({"code":"41","name":"Loir-et-Cher", location:{ "latitude":47.39091206104779,"longitude":0.6866455078125}}); 
      Departments.insert({"code":"42","name":"Loire", location:{ "latitude":45.433153642271414,"longitude":4.4000244140625}}); 
      Departments.insert({"code":"43","name":"Haute Loire", location:{ "latitude":45.04635929200553,"longitude":3.878173828125}}); 
      Departments.insert({"code":"44","name":"Loire Atlantique", location:{ "latitude":47.37975438400816,"longitude":-1.669921875}}); 
      Departments.insert({"code":"45","name":"Loiret", location:{ "latitude":47.90529605906089,"longitude":1.9171142578125}}); 
      Departments.insert({"code":"46","name":"Lot", location:{ "latitude":44.457309801319305,"longitude":1.4501953125}}); 
      Departments.insert({"code":"47","name":"Lot et Garonne", location:{ "latitude":44.209772586984485,"longitude":0.6097412109375}}); 
      Departments.insert({"code":"48","name":"Lozère", location:{ "latitude":44.52392653654215,"longitude":3.4881591796875}}); 
      Departments.insert({"code":"49","name":"Maine et Loire", location:{ "latitude":47.454094290400015,"longitude":-0.5328369140625}}); 
      Departments.insert({"code":"50","name":"Manche", location:{ "latitude":49.05227025601607,"longitude":-1.34033203125}}); 
      Departments.insert({"code":"51","name":"Marne", location:{ "latitude":48.96579381461062,"longitude":4.37255859375}}); 
      Departments.insert({"code":"52","name":"Haute Marne", location:{ "latitude":48.144097934938884,"longitude":5.1416015625}}); 
      Departments.insert({"code":"53","name":"Mayenne", location:{ "latitude":48.12943437745315,"longitude":-0.6536865234375}}); 
      Departments.insert({"code":"54","name":"Meurthe et Moselle", location:{ "latitude":48.68733411186307,"longitude":6.1962890625}}); 
      Departments.insert({"code":"55","name":"Meuse", location:{ "latitude":49.15296965617042,"longitude":5.394287109375}}); 
      Departments.insert({"code":"56","name":"Morbihan", location:{ "latitude":47.75779097897638,"longitude":-2.7410888671875}}); 
      Departments.insert({"code":"57","name":"Moselle", location:{ "latitude":49.13500260581219,"longitude":6.1962890625}}); 
      Departments.insert({"code":"58","name":"Nièvre", location:{ "latitude":47.002733906678806,"longitude":3.197021484375}}); 
      Departments.insert({"code":"59","name":"Nord", location:{ "latitude":50.4347665964966,"longitude":3.262939453125}}); 
      Departments.insert({"code":"60","name":"Oise", location:{ "latitude":49.37522008143603,"longitude":2.362060546875}}); 
      Departments.insert({"code":"61","name":"Orne", location:{ "latitude":48.600225060468915,"longitude":0.10986328125}}); 
      Departments.insert({"code":"62","name":"Pas-de-Calais", location:{ "latitude":50.46449795300867,"longitude":2.318115234375}}); 
      Departments.insert({"code":"63","name":"Puy de Dôme", location:{ "latitude":45.78284835197676,"longitude":3.0926513671875}}); 
      Departments.insert({"code":"64","name":"Pyrénées Atlantiques", location:{ "latitude":43.28520334369384,"longitude":-0.37353515625}}); 
      Departments.insert({"code":"65","name":"Hautes Pyrénées", location:{ "latitude":43.09296067711629,"longitude":-0.0274658203125}}); 
      Departments.insert({"code":"66","name":"Pyrénées Orientales", location:{ "latitude":42.68647341541783,"longitude":2.8839111328125}}); 
      Departments.insert({"code":"67","name":"Bas Rhin", location:{ "latitude":48.58932584966972,"longitude":7.734375}}); 
      Departments.insert({"code":"68","name":"Haut Rhin", location:{ "latitude":47.75040471827431,"longitude":7.327880859375}}); 
      Departments.insert({"code":"69","name":"Rhône", location:{ "latitude":45.763690956618674,"longitude":4.844970703125}}); 
      Departments.insert({"code":"70","name":"Haute Saône", location:{ "latitude":47.628380027447136,"longitude":6.1468505859375}}); 
      Departments.insert({"code":"71","name":"Saône et Loire", location:{ "latitude":46.76620587423741,"longitude":4.8394775390625}}); 
      Departments.insert({"code":"72","name":"Sarthe", location:{ "latitude":47.98256841921402,"longitude":0.2032470703125}}); 
      Departments.insert({"code":"73","name":"Savoie", location:{ "latitude":45.6101948758674,"longitude":5.943603515625}}); 
      Departments.insert({"code":"74","name":"Haute Savoie", location:{ "latitude":46.08085173686787,"longitude":6.3995361328125}}); 
      Departments.insert({"code":"75","name":"Paris", location:{ "latitude":48.857487002645485,"longitude":2.362060546875}}); 
      Departments.insert({"code":"76","name":"Seine Maritime", location:{ "latitude":49.653404588437894,"longitude":1.0546875}}); 
      Departments.insert({"code":"77","name":"Seine et Marne", location:{ "latitude":48.68370757165361,"longitude":2.9937744140625}}); 
      Departments.insert({"code":"78","name":"Yvelines", location:{ "latitude":48.817715668996435,"longitude":1.8841552734375}}); 
      Departments.insert({"code":"79","name":"Deux Sèvres", location:{ "latitude":46.32796494040748,"longitude":-0.439453125}}); 
      Departments.insert({"code":"80","name":"Somme", location:{ "latitude":49.915861746597294,"longitude":2.2412109375}}); 
      Departments.insert({"code":"81","name":"Tarn", location:{ "latitude":43.60823944964325,"longitude":1.439208984375}}); 
      Departments.insert({"code":"82","name":"Tarn et Garonne", location:{ "latitude":44.03626980953461,"longitude":1.351318359375}}); 
      Departments.insert({"code":"83","name":"Var", location:{ "latitude":43.141078106345844,"longitude":5.9326171875}}); 
      Departments.insert({"code":"84","name":"Vaucluse", location:{ "latitude":43.96119063892024,"longitude":4.822998046875}}); 
      Departments.insert({"code":"85","name":"Vendée", location:{ "latitude":46.675825597930036,"longitude":-1.4337158203125}}); 
      Departments.insert({"code":"86","name":"Vienne", location:{ "latitude":46.59284399742739,"longitude":0.3350830078125}}); 
      Departments.insert({"code":"87","name":"Haute Vienne", location:{ "latitude":45.84410779560204,"longitude":1.2799072265625}}); 
      Departments.insert({"code":"88","name":"Vosges", location:{ "latitude":48.17341248658083,"longitude":6.4544677734375}}); 
      Departments.insert({"code":"89","name":"Yonne", location:{ "latitude":47.80208652719499,"longitude":3.5870361328125}}); 
      Departments.insert({"code":"90","name":"Territoire de Belfort", location:{ "latitude":47.646886969413,"longitude":6.87744140625}}); 
      Departments.insert({"code":"91","name":"Essonne", location:{ "latitude":48.50932644976633,"longitude":2.21923828125}}); 
      Departments.insert({"code":"92","name":"Hauts de Seine", location:{ "latitude":48.857487002645485,"longitude":2.2576904296875}}); 
      Departments.insert({"code":"93","name":"Seine St Denis", location:{ "latitude":48.91166975698412,"longitude":2.4993896484375}}); 
      Departments.insert({"code":"94","name":"Val de Marne", location:{ "latitude":48.77791275550184,"longitude":2.4664306640625}}); 
      Departments.insert({"code":"95","name":"Val d'Oise", location:{ "latitude":49.06306925171648,"longitude":2.1917724609375}}); 
      Departments.insert({"code":"971","name":"Guadeloupe", location:{ "latitude":16.230497926843633,"longitude":-61.644287109375}}); 
      Departments.insert({"code":"972","name":"Martinique", location:{ "latitude":14.642053680803665,"longitude":-61.0015869140625}}); 
      Departments.insert({"code":"973","name":"Guyane", location:{ "latitude":4.921305737130207,"longitude":-52.3114013671875}}); 
      Departments.insert({"code":"974","name":"La Réunion", location:{ "latitude":-21.0947505331402,"longitude":55.491943359375}}); 
      Departments.insert({"code":"02","name":"Aisne", location:{ "latitude":49.61070993807422,"longitude":3.526611328125}}); 
      Departments.insert({"code":"07","name":"Ardèche", location:{ "latitude":44.64911632343077,"longitude":4.383544921875}}); 
      Departments.insert({"code":"01","name":"Ain", location:{ "latitude":46.2102496001872,"longitude":5.2349853515625}}); 
      Departments.insert({"code":"04","name":"Alpes de Haute Provence", location:{ "latitude":44.10730980734024,"longitude":6.240234375}}); 
      Departments.insert({"code":"05","name":"Hautes Alpes", location:{ "latitude":44.56699093657141,"longitude":6.08642578125}}); 
      Departments.insert({"code":"08","name":"Ardennes", location:{ "latitude":49.56085220619188,"longitude":4.63623046875}}); 
      Departments.insert({"code":"03","name":"Allier", location:{ "latitude":46.39619977845332,"longitude":3.2025146484375}}); 
      Departments.insert({"code":"09","name":"Ariège", location:{ "latitude":42.984558134256076,"longitude":1.6094970703125}}); 
      Departments.insert({"code":"06","name":"Alpes Maritimes", location:{ "latitude":43.723474896114794,"longitude":7.2454833984375}}); 
      Departments.insert({"code":"2B","name":"Haute Corse", location:{ "latitude":42.397093870535514,"longitude":9.20928955078125}}); 
      Departments.insert({"code":"2A","name":"Corse du Sud", location:{ "latitude":41.84910468610387,"longitude":8.95660400390625}});
  }

});