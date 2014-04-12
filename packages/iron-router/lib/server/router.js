var connect = Npm.require('connect');
var Fiber = Npm.require('fibers');

var root = global;

var connectHandlers
  , connect;

if (typeof __meteor_bootstrap__.app !== 'undefined') {
  connectHandlers = __meteor_bootstrap__.app;
} else {
  connectHandlers = WebApp.connectHandlers;
}

<<<<<<< HEAD
IronRouter = Utils.extend(IronRouter, {
  constructor: function (options) {
    var self = this;
    IronRouter.__super__.constructor.apply(this, arguments);
=======
ServerRouter = Utils.extend(IronRouter, {
  constructor: function (options) {
    var self = this;
    ServerRouter.__super__.constructor.apply(this, arguments);
>>>>>>> cc20340b580279c144180b746d13276193497c8d
    Meteor.startup(function () {
      setTimeout(function () {
        if (self.options.autoStart !== false)
          self.start();
      });
    });
  },

  start: function () {
    connectHandlers
      .use(connect.query())
      .use(connect.bodyParser())
      .use(_.bind(this.onRequest, this));
  },

  onRequest: function (req, res, next) {
    var self = this;
    Fiber(function () {
      self.dispatch(req.url, {
        request: req,
        response: res,
        next: next
      });
    }).run();
  },

  run: function (controller, cb) {
<<<<<<< HEAD
    IronRouter.__super__.run.apply(this, arguments);
    if (controller === this._currentController)
      cb && cb(controller);
=======
    var self = this;
    var where = Meteor.isClient ? 'client' : 'server';

    Utils.assert(controller, 'run requires a controller');

    // one last check to see if we should handle the route here
    if (controller.where != where) {
      self.onUnhandled(controller.path, controller.options);
      return;
    }

    if (this._currentController)
      this._currentController.runHooks('unload');

    this._currentController = controller;
    controller.runHooks('load');
    controller.run();

    if (controller == this._currentController) {
      cb && cb(controller);
    }
>>>>>>> cc20340b580279c144180b746d13276193497c8d
  },

  stop: function () {
  },

  onUnhandled: function (path, options) {
    options.next();
  },

  onRouteNotFound: function (path, options) {
    options.next();
  }
});

<<<<<<< HEAD
Router = new IronRouter;
=======
Router = new ServerRouter;
>>>>>>> cc20340b580279c144180b746d13276193497c8d
