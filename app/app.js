var DashboardView = Backbone.View.extend({
      template: Handlebars.compile( $("#dashboard-view-template").html() ),
      initialize: function () {
          this.render();
      },
      render: function () {
          this.$el.html(this.template({greeting:"This will display a list of our blog posts"}));
      }
  });


var CreateBlogView = Backbone.View.extend({
      template: Handlebars.compile( $("#create-blog-template").html() ),
      initialize: function () {
          this.render();
      },
      render: function () {
          this.$el.html(this.template({content:"This will allow you to create a blog post!"}));
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
