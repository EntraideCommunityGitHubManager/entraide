Events = new Mongo.Collection("events");

Profiles = new Mongo.Collection("profiles");

ProfileImages = new FS.Collection("profile_images", {
  stores: [
    new FS.Store.GridFS("original")
  ],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
});
