var Blog = Backbone.Model.extend({
      idAttribute: 'blogId'
  });

var Blogs = Backbone.Collection.extend({
      model: Blog
});

var blogs = new Blogs([{
      blogId: 1,
      blogTitle: "My First Post!",
      blogBody: "Woot! I can't wait to be a Backbone pro! This is going to be Rad!",
}, {
      blogId: 2,
      blogTitle: "This Is My Second Post!",
      blogBody: "I'm so glad I read JavaScript For Cats, I feel like a pro. You should read it too!",
}]);


var DashboardView = Backbone.View.extend({
      template: Handlebars.compile( $("#dashboard-view-template").html() ),
      initialize: function () {
          this.collection = blogs;
          this.render();
      },
      render: function () {
          this.$el.html(this.template({
            greeting:"This will display a list of our blog posts",
            theBlogs: this.collection && this.collection.toJSON()
            }));
      }
  });


var CreateBlogView = Backbone.View.extend({
      template: Handlebars.compile( $("#create-blog-template").html() ),
      initialize: function () {
          this.collection = blogs; //make sure both views are working with the same collection
          this.render();
      },
      events: {
            'click .submit-button' : 'createNewBlog' // wait for the user to click submit, then execute this.createNewBlog()
      },
      createNewBlog: function () {
            var newBlogId = this.collection.length + 1; // determine the new blog's blogId
            var newBlogTitle = $('#blog-title', this.$el).val(); // grab what the user entered for the title
            var newBlogBody = $('#blog-body', this.$el).val(); // grab what the user entered for the body

            var newBlog = new Blog({ // create a new Blog object, call it newBlog
              blogId: newBlogId,            // we already collected this data above,
              blogTitle: newBlogTitle,      // just throw the variables in as values.
              blogBody: newBlogBody
            });

            console.log('Model:');
            console.log(newBlog.toJSON()); // log here to make sure everything is cool,
                                           // toJSON() makes it easier for us to read, as humans

            this.collection.add(newBlog); // add this model (newBlog) to the collection.

            console.log('Collection:');
            console.log(this.collection.toJSON()); // log the collection, again toJSON() makes it easier for us to read
      },
      render: function () {
            this.$el.html(this.template({
              content:"This will allow you to create a blog post!"
              }));
      }
  });

  var AppRouter = Backbone.Router.extend({
      routes: {
          '': 'dashboardRoute',
          'dashboard': 'dashboardRoute',
          'create-blog': 'createBlogRoute',
      },
      dashboardRoute: function () {
          var dashboardView = new DashboardView();
          $("#content-container").html(dashboardView.el);
      },
      createBlogRoute: function () {
          var createBlogView = new CreateBlogView();
          $("#content-container").html(createBlogView.el);
      }
  });

  var appRouter = new AppRouter();
  Backbone.history.start();
