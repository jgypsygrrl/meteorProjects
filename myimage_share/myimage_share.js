Images = new Mongo.Collection("images");
console.log(Images.find().count());

if (Meteor.isClient) {
  var img_data = [

    {
      img_src: "hamburger.jpg",
      img_alt: "yummy hamburger"
    }, {
      img_src: "guacamole.jpg",
      img_alt: "yummy guacamole"
    }, {
      img_src: "sushi.jpg",
      img_alt: "yummy sushi"
    }

  ];
  Template.images.helpers({
    images: img_data
  });

  Template.images.events({
    'click .js-image': function(event) {
      $(event.target).css("width", "50px");
    }
  })

}

if (Meteor.isServer) {
  console.log('I am the server');
}