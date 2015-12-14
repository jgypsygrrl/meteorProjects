Websites = new Mongo.Collection("websites");

//set up security on Websites collection
Websites.allow({
  insert: function(userId, doc) {
    console.log('testing security on website insert')
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
})

if (Meteor.isClient) {

  /////
  // template helpers 
  /////

  //accounts config
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  });

  // helper function that returns all available websites
  Template.website_list.helpers({
    websites: function() {
      return Websites.find({});
    }
  });


  /////
  // template events 
  /////

  Template.website_item.events({
    "click .js-upvote": function(event) {
      // example of how you can access the id for the website in the database
      // (this is the data context for the template)
      var website_id = this._id;
      console.log("Up voting website with id " + website_id);
      // put the code in here to add a vote to a website!

      return false; // prevent the button from reloading the page
    },
    "click .js-downvote": function(event) {

      // example of how you can access the id for the website in the database
      // (this is the data context for the template)
      var website_id = this._id;
      console.log("Down voting website with id " + website_id);

      // put the code in here to remove a vote from a website!

      return false; // prevent the button from reloading the page
    }
  })

  Template.website_form.events({
    "click .js-toggle-website-form": function(event) {
      $("#website_form").toggle('slow');
    },
    "submit .js-save-website-form": function(event) {
      // here is an example of how to get the url out of the form:
      var url = event.target.url.value;
      var description = event.target.description.value;
      var title = event.target.title.value;
      console.log("The url they entered is: " + url + ".  The description is " + "'" + description + "'");

      //  put your website saving code in here!	
      if (Meteor.user()) {
        Websites.insert({
          url: url,
          title: title,
          description: description,
          createdOn: new Date(),
          createdBy: Meteor.user()._id
        });
      }

      return false; // stop the form submit from reloading the page

    }
  });
}


if (Meteor.isServer) {
  // start up function that creates entries in the Websites databases.
  Meteor.startup(function() {
    // code to run on server at startup
    if (!Websites.findOne()) {
      console.log("No websites yet. Creating starter data.");
      Websites.insert({
        title: "Free Resources",
        url: "http://makerbook.net/",
        description: "A handpicked directory of the best free resources for creatives.",
        createdOn: new Date()
      });
      Websites.insert({
        title: "Google Just Open Sourced TensorFlow, Its Artificial Intelligence Engine",
        url: "http://www.wired.com/2015/11/google-open-sources-its-artificial-intelligence-engine/",
        description: "Announcing open sourced Artificial Intelligence.",
        createdOn: new Date()
      });
      Websites.insert({
        title: "Product Hunt",
        url: "https://www.producthunt.com/",
        description: "The best new apps, games, podcasts & books in your pocket.",
        createdOn: new Date()
      });
      Websites.insert({
        title: "Stylify Me",
        url: "http://stylifyme.com/",
        description: "For designers. Grab colors, font sizing and spacing of a specific site.",
        createdOn: new Date()
      });
    }
  });
}