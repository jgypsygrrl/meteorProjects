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
}

if (Meteor.isServer) {
  console.log('I am the server');
}