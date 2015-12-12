Images = new Mongo.Collection("images");

//set up security on Images collection
Images.allow({
  insert: function(userId, doc) {
    console.log('testing security on image insert')
    if (Meteor.user()) { //they are logged in
      if (userId != doc.createdBy) { //if not user, cancel
        return false;
      } else {
        return true;
      }
    } else { //user not logged in
      return false;
    }
  },
  remove: function(userId, doc) {
    if (Meteor.user()) {
      if (userId != doc.createdBy) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  },
  update: function(userId, doc) {
    if (userId) {
      return true;
    } else {
      return false;
    }
  }
})