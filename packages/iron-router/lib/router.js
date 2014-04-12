<<<<<<< HEAD
IronRouter = function (options) {
  var self = this;

=======
/*****************************************************************************/
/* IronRouter */
/*****************************************************************************/
IronRouter = function (options) {
  var self = this;
  
>>>>>>> cc20340b580279c144180b746d13276193497c8d
  this.configure(options);

  /**
   * The routes array which doubles as a named route index by adding
   * properties to the array.
   *
   * @api public
   */
  this.routes = [];
<<<<<<< HEAD

  /**
   * Default name conversions for controller
   * and template lookup.
   */
  this._nameConverters = {};
  this.setNameConverter('Template', 'none');
  this.setNameConverter('RouteController', 'upperCamelCase');

  this._globalHooks = {};
  _.each(IronRouter.HOOK_TYPES, function (type) {
    self._globalHooks[type] = [];

    // example:
    //  self.onRun = function (hook, options) {
    //    return self.addHook('onRun', hook, options);
    //  };
    self[type] = function (hook, options) {
      return self.addHook(type, hook, options);
    };
  });

  _.each(IronRouter.LEGACY_HOOK_TYPES, function (type, legacyType) {
    self[legacyType] = function () {
      Utils.notifyDeprecated({
        where: 'Router',
        name: legacyType,
        instead: type
      });

      return self[type].apply(this, arguments);
    }
  });
};

IronRouter.HOOK_TYPES = [
  'onRun',
  'onData',
  'onBeforeAction',
  'onAfterAction',
  'onStop',

  // not technically a hook but we'll use it
  // in a similar way. This will cause waitOn
  // to be added as a method to the Router and then
  // it can be selectively applied to specific routes
  'waitOn'
];

IronRouter.LEGACY_HOOK_TYPES = {
  'load': 'onRun',
  'before': 'onBeforeAction',
  'after': 'onAfterAction',
  'unload': 'onStop'
};
=======
  
  this._globalHooks = {};
  _.each(IronRouter.HOOK_TYPES, function(type) { self._globalHooks[type] = []; });
};

IronRouter.HOOK_TYPES = ['load', 'before', 'after', 'unload'];
>>>>>>> cc20340b580279c144180b746d13276193497c8d

IronRouter.prototype = {
  constructor: IronRouter,

  /**
   * Configure instance with options. This can be called at any time. If the
   * instance options object hasn't been created yet it is created here.
   *
   * @param {Object} options
   * @return {IronRouter}
   * @api public
   */
<<<<<<< HEAD

  configure: function (options) {
    var self = this;

    options = options || {};
    this.options = this.options || {};
    _.extend(this.options, options);

=======
  
  configure: function (options) {
    var self = this;
    
    this.options = this.options || {};
    _.extend(this.options, options);
    
>>>>>>> cc20340b580279c144180b746d13276193497c8d
    // e.g. before: fn OR before: [fn1, fn2]
    _.each(IronRouter.HOOK_TYPES, function(type) {
      if (self.options[type]) {
        _.each(Utils.toArray(self.options[type]), function(hook) {
          self.addHook(type, hook);
        });
<<<<<<< HEAD

=======
        
>>>>>>> cc20340b580279c144180b746d13276193497c8d
        delete self.options[type];
      }
    });
    
<<<<<<< HEAD
    _.each(IronRouter.LEGACY_HOOK_TYPES, function(type, legacyType) {
      if (self.options[legacyType]) {
        // XXX: warning?
        _.each(Utils.toArray(self.options[legacyType]), function(hook) {
          self.addHook(type, hook);
        });

        delete self.options[legacyType];
      }
    });

    if (options.templateNameConverter)
      this.setNameConverter('Template', options.templateNameConverter);

    if (options.routeControllerNameConverter)
      this.setNameConverter('RouteController', options.routeControllerNameConverter);

    return this;
  },

  convertTemplateName: function (input) {
    var converter = this._nameConverters['Template'];
    if (!converter)
      throw new Error('No name converter found for Template');
    return converter(input);
  },

  convertRouteControllerName: function (input) {
    var converter = this._nameConverters['RouteController'];
    if (!converter)
      throw new Error('No name converter found for RouteController');
    return converter(input);
  },

  setNameConverter: function (key, stringOrFunc) {
    var converter;

    if (_.isFunction(stringOrFunc))
      converter = stringOrFunc;

    if (_.isString(stringOrFunc))
      converter = Utils.StringConverters[stringOrFunc];

    if (!converter) {
      throw new Error('No converter found named: ' + stringOrFunc);
    }

    this._nameConverters[key] = converter;
    return this;
  },
=======
    return this;
  },

>>>>>>> cc20340b580279c144180b746d13276193497c8d

  /**
   *
   * Add a hook to all routes. The hooks will apply to all routes,
   * unless you name routes to include or exclude via `only` and `except` options
   *
   * @param {String} [type] one of 'load', 'unload', 'before' or 'after'
   * @param {Object} [options] Options to controll the hooks [optional]
   * @param {Function} [hook] Callback to run
   * @return {IronRouter}
   * @api public
   *
   */
<<<<<<< HEAD

=======
  
>>>>>>> cc20340b580279c144180b746d13276193497c8d
  addHook: function(type, hook, options) {
    options = options || {}

    if (options.only)
      options.only = Utils.toArray(options.only);
    if (options.except)
      options.except = Utils.toArray(options.except);
<<<<<<< HEAD

    this._globalHooks[type].push({options: options, hook: hook});

    return this;
  },

=======
      
    this._globalHooks[type].push({options: options, hook: hook});
    
    return this;
  },
  
  load: function(hook, options) {
    return this.addHook('load', hook, options);
  },

  before: function(hook, options) {
    return this.addHook('before', hook, options);
  },
  
  after: function(hook, options) {
    return this.addHook('after', hook, options);
  },
  
  unload: function(hook, options) {
    return this.addHook('unload', hook, options);
  },
  
>>>>>>> cc20340b580279c144180b746d13276193497c8d
  /**
   *
   * Fetch the list of global hooks that apply to the given route name.
   * Hooks are defined by the .addHook() function above.
   *
<<<<<<< HEAD
   * @param {String} [type] one of IronRouter.HOOK_TYPES
=======
   * @param {String} [type] one of 'load', 'unload', 'before' or 'after'
>>>>>>> cc20340b580279c144180b746d13276193497c8d
   * @param {String} [name] the name of the route we are interested in
   * @return {[Function]} [hooks] an array of hooks to run
   * @api public
   *
   */
<<<<<<< HEAD

  getHooks: function(type, name) {
    var hooks = [];

    _.each(this._globalHooks[type], function(hook) {
      var options = hook.options;

      if (options.except && _.include(options.except, name))
        return;

      if (options.only && ! _.include(options.only, name))
        return;

      hooks.push(hook.hook);
    });

    return hooks;
  },

=======
    
  getHooks: function(type, name) {
    var hooks = [];
    
    _.each(this._globalHooks[type], function(hook) {
      var options = hook.options;
      
      if (options.except && _.include(options.except, name))
        return;
      
      if (options.only && ! _.include(options.only, name))
        return;
      
      hooks.push(hook.hook);
    });
    
    return hooks;
  },
  
>>>>>>> cc20340b580279c144180b746d13276193497c8d

  /**
   * Convenience function to define a bunch of routes at once. In the future we
   * might call the callback with a custom dsl.
   *
   * Example:
   *  Router.map(function () {
   *    this.route('posts');
   *  });
   *
   *  @param {Function} cb
   *  @return {IronRouter}
   *  @api public
   */

  map: function (cb) {
    Utils.assert(_.isFunction(cb),
           'map requires a function as the first parameter');
    cb.call(this);
    return this;
  },

  /**
   * Define a new route. You must name the route, but as a second parameter you
   * can either provide an object of options or a Route instance.
   *
   * @param {String} name The name of the route
   * @param {Object} [options] Options to pass along to the route
   * @return {Route}
   * @api public
   */

  route: function (name, options) {
    var route;

    Utils.assert(_.isString(name), 'name is a required parameter');
<<<<<<< HEAD

=======
    
>>>>>>> cc20340b580279c144180b746d13276193497c8d
    if (options instanceof Route)
      route = options;
    else
      route = new Route(this, name, options);

    this.routes[name] = route;
    this.routes.push(route);
    return route;
  },

  path: function (routeName, params, options) {
    var route = this.routes[routeName];
    Utils.warn(route,
     'You called Router.path for a route named ' + routeName + ' but that route doesn\'t seem to exist. Are you sure you created it?');
    return route && route.path(params, options);
  },

  url: function (routeName, params, options) {
    var route = this.routes[routeName];
<<<<<<< HEAD
    Utils.warn(route,
=======
    Utils.warn(route, 
>>>>>>> cc20340b580279c144180b746d13276193497c8d
      'You called Router.url for a route named "' + routeName + '" but that route doesn\'t seem to exist. Are you sure you created it?');
    return route && route.url(params, options);
  },

<<<<<<< HEAD
  match: function (path) {
    return _.find(this.routes, function(r) { return r.test(path); });
  },
    
  dispatch: function (path, options, cb) {
    var route = this.match(path);
    
    if (! route)
      return this.onRouteNotFound(path, options);
    
    if (route.where !== (Meteor.isClient ? 'client' : 'server'))
      return this.onUnhandled(path, options);
    
    var controller = route.getController(path, options);
    this.run(controller, cb);
  },

  run: function (controller, cb) {
    var self = this;
    var where = Meteor.isClient ? 'client' : 'server';

    Utils.assert(controller, 'run requires a controller');

    // one last check to see if we should handle the route here
    if (controller.where != where) {
      self.onUnhandled(controller.path, controller.options);
      return;
    }

    var run = function () {
      self._currentController = controller;
      self._currentController._run();
    };

    // if we already have a current controller let's stop it and then
    // run the new one once the old controller is stopped. this will add
    // the run function as an onInvalidate callback to the controller's
    // computation. Otherwse, just run the new controller.
    if (this._currentController)
      this._currentController._stopController(run);
    else
      run();
=======
  dispatch: function (path, options, cb) {
    var self = this
      , routes = self.routes
      , route
      , controller
      , where = Meteor.isClient ? 'client' : 'server'
      , i = 0;

    function next () {
      route = routes[i++];

      if (!route) {
        return self.onRouteNotFound(path, options);
      }

      if (route.test(path)) {
        if (route.where !== where) 
          return self.onUnhandled(path, options);

        var controller = route.getController(path, options);
        self.run(controller, cb);
      } else {
        next();
      }
    }

    next();
  },

  run: function (controller, cb) {
    throw new Error('run not implemented');
>>>>>>> cc20340b580279c144180b746d13276193497c8d
  },

  onUnhandled: function (path, options) {
    throw new Error('onUnhandled not implemented');
  },

  onRouteNotFound: function (path, options) {
    throw new Error('Oh no! No route found for path: "' + path + '"');
  }
};
