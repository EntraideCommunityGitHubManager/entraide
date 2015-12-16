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

ProfileSkills = new Mongo.Collection("profile_skills");
