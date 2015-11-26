if (Meteor.isServer) {
  Meteor.startup(function() {
    if (Images.find().count() == 0) {
      Images.insert({
        img_src: "hamburger.jpg",
        img_alt: "yummy hamburger"
      });
      Images.insert({
        img_src: "guacamole.jpg",
        img_alt: "yummy guacamole"
      });
      Images.insert({
        img_src: "sushi.jpg",
        img_alt: "yummy sushi"
      });
    } //end of if have no images
  });
}