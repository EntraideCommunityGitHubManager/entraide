Events = new Mongo.Collection("events");
ProfileImages = new FS.Collection("profile_img", {
  stores: [
    new FS.Store.GridFS("original")
  ],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
});
