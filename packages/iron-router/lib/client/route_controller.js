<<<<<<< HEAD
var isLogging = false;
var log = function (msg) {
  if (!isLogging)
    return;
  console.log('%c<RouteController> ' + msg, 'color: purple; font-size: 1.3em; font-weight: bold;');
};

RouteController = Utils.extend(RouteController, {
  constructor: function () {
    var self = this;

    RouteController.__super__.constructor.apply(this, arguments);

    // the value of the data option or prototype property
    this._dataValue = this.lookupProperty('data');

    // rewrite the data function on the instance itself.  Get the data from the
    // controller itself, not the router global data context. This is what
    // controller functions will read from. Templates will get their data
    // context from the global router data context which will get set in the
    // _run function.
    this.data = function () {
      var value;

      if (_.isFunction(self._dataValue))
        value = self._dataValue.call(self);
      else if (self._dataValue)
        value = self._dataValue
      else
        value = null;

      log('this.data()');
      return value;
    };

    this._waitList = new WaitList;

    // proxy these methods to the router
    _.each([
      'layout',
      'setRegion',
      'clearRegion'
    ], function (routerApiMethod) {
      self[routerApiMethod] = function () {
        if (!self.router)
          throw new Error("No router defined on RouteController");
        return self.router[routerApiMethod].apply(self.router, arguments);
      };
    });
  },

  setLayout: function () {
    return this.layout.apply(this, arguments);
=======
/*****************************************************************************/
/* WaitList */
/*****************************************************************************/
WaitList = function () {
  this._dep = new Deps.Dependency;
  this.clear();
};

WaitList.prototype = {
  get: function (idx) {
    return this._list[idx];
  },

  clear: function () {
    this._list = [];
  },

  append: function (list) {
    var self = this;
    list = Utils.toArray(list);
    _.each(list, function (o) {
      self.push(o);
    });
  },

  push: function (o) {
    var self = this;

    if (!o)
      return;

    var res = this._list.push(o);

    return res;
  },

  ready: function () {
    return _.all(this._list, function (handle) {
      return handle.ready();
    });
  }
};

/*****************************************************************************/
/* Predefined Hooks */
/*****************************************************************************/
var setDataHook = function () {
  var self = this;
  var data = _.isFunction(self.data) ? self.data.call(self) : self.data;
  if (data !== false) {
    self.setData(data);
  }
};

var autoRenderNotFoundTemplateHook = function () {
  var self = this;
  var data = self.getData();
  if ((data === null || typeof data === 'undefined') 
      && self.notFoundTemplate) {
    self.render(self.notFoundTemplate);
    this.renderYields();
    self.stop();
  }
};

var autoRenderLoadingTemplateHook = function () {
  var self = this;

  if (!this.ready()) {
    if (this.loadingTemplate) {
      this.render(this.loadingTemplate);
      this.renderYields();
      this.stop();
    }
  }
};

var autoClearUnusedYieldsHook = function () {
  this.router && this.router.clearUnusedYields(this._renderedYields);
};

/*****************************************************************************/
/* RouteController */
/*****************************************************************************/
RouteController = Utils.extend(IronRouteController, {
  constructor: function () {
    RouteController.__super__.constructor.apply(this, arguments);

    var self = this;

    var getOption = function (key) {
      return Utils.pick(self.options[key], self[key]);
    };

    this.loadingTemplate = getOption('loadingTemplate');
    this.notFoundTemplate = getOption('notFoundTemplate');
    this.data = getOption('data');
    this.template = getOption('template') || (this.route && this.route.name);
    this.yieldTemplates = getOption('yieldTemplates');
    this.layoutTemplate = getOption('layoutTemplate');
    
    /*
     * waitOn can come from the options or the prototype. We add the option
     * waitOn value first and then concatenate the prototype waitOn value.
     * Possible values are:
     *
     * Router.configure({
     *  waitOn: Meteor.subscribe('items')
     * });
     *
     * Router.route('someRoute', {
     *  waitOn: function () {
     *    return Meteor.subscribe('item', this.params._id);
     *  }
     * });
     *
     * waitOn => [{}, fn]
     *  fn => could return an object or another array of objects
     * 
     */
    this.waitOn = []
      .concat(Utils.toArray(this.options.waitOn))
      .concat(Utils.toArray(this.waitOn));

    this._waitList = new WaitList;
>>>>>>> cc20340b580279c144180b746d13276193497c8d
  },

  ready: function () {
    return this._waitList.ready();
  },

  /**
   * Stop running this controller and redirect to a new path. Same parameters as
   * those of Router.go.
<<<<<<< HEAD
=======
   *
>>>>>>> cc20340b580279c144180b746d13276193497c8d
   * @api public
   */

  redirect: function (/* args */) {
<<<<<<< HEAD
    return Router.go.apply(Router, arguments);
  },

  //XXX move into subscription class? look into arunoda's work.
  subscribe: function (/* same as Meteor.subscribe */) {
    var self = this;

    var waitApi = (function () {
      return {
        wait: function () {
          self._waitList.push(this);
          added = true;
        }
      };
    })();

    var handle = Meteor.subscribe.apply(this, arguments);
    return _.extend(handle, waitApi);
  },

  lookupLayoutTemplate: function () {
    return this.lookupProperty('layoutTemplate');
  },

  lookupTemplate: function () {
    return this.lookupProperty('template')
      || Router.convertTemplateName(this.route.name);
  },

  lookupRegionTemplates: function () {
    var res;

    if (res = this.lookupProperty('regionTemplates'))
      return res;
    else if (res = this.lookupProperty('yieldTemplates'))
      return res;
    else
      return {};
  },

  /**
   * Return an array of waitOn values in the folowing order (although, ordering
   * shouldn't really matter for waitOn). The result may contain sub arrays like
   * this:
   *   [[fn1, fn2], [fn3, fn4]]
   *
   *   1. Router options
   *   2. Route options
   *   3. Controller options
   *   4. Controller instance
   */

  lookupWaitOn: function () {
    var toArray = Utils.toArray;

    var fromRouterHook = toArray(this.router.getHooks('waitOn', this.route.name));
    var fromRouterOptions = toArray(this.router.options.waitOn);
    var fromRouteOptions = toArray(this.route.options.waitOn);
    var fromMyOptions = toArray(this.options.waitOn);
    var fromInstOptions = toArray(this.waitOn);

    return fromRouterHook
      .concat(fromRouterOptions)
      .concat(fromRouteOptions)
      .concat(fromMyOptions)
      .concat(fromInstOptions);
=======
    this.stop();
    return this.router && this.router.go.apply(this.router, arguments);
  },

  /**
   * Used to specify additional templates to render into named yield regions.
   * The default run method will first render the main template and then use
   * this property to render additional templates. Only used in the 'run'
   * method.
   *
   * Example:
   *
   *  yieldTemplates: {
   *    'asideTemplateName': {to: 'aside', data: {}, waitOn: Sub},
   *    'footerTemplateName': {to: 'footer'}
   *  }
   *
   * @type {Object|null}
   * @api public
   */

  yieldTemplates: null,

  layoutTemplate: null,

  /**
   * The default template to render
   *
   * @type {String|Function}
   * @api public
   */

  template: null,

  /**
   * Optional template to be used while waiting. If specified, the loading
   * template is used automatically in the run method. You can also use it
   * manually.
   *
   * @type {String|Function}
   * @api public
   */

  loadingTemplate: null,

  /**
   * Optional template to be used if data returns a falsy value. Used
   * automatically in the run method. You can also use it manually.
   *
   * @type {String|Function}
   * @api public
   */

  notFoundTemplate: null,

  /**
   * A default data object or function to be used as the data context in
   * rendering.
   *
   * @type {Object|Function}
   * @api public
   */

  data: {},

  getData: function () {
    return this.router && this.router.getData();
  },

  setData: function (data) {
    this.router && this.router.setData(data);
  },

  waitOn: null,

  /*
   * Calls Meteor.subscribe but adds a wait method to the returned handle
   * object. If the user calls wait on the result, the subscription handle is
   * added to the RouteController's wait list.
   */

  subscribe: function (/* same as Meteor.subscribe */) {
    var self = this;

    var waitApi = (function () {
      var added = false;

      return {
        wait: function () {
          // make idempotent
          if (!added) {
            self._waitList.push(this);
            added = true;
          }
        }
      };
    })();

    var handle = Meteor.subscribe.apply(this, arguments);
    return _.extend(handle, waitApi);
>>>>>>> cc20340b580279c144180b746d13276193497c8d
  },

  /**
   * Either specify a template to render or call with no arguments to render the
   * RouteController's template plus all of the yieldTemplates.
<<<<<<< HEAD
   * 
   * XXX can we have some hooks here? would be nice to give
   * iron-transitioner a place to plug in. Maybe onSetRegion(fn)?
=======
   *
>>>>>>> cc20340b580279c144180b746d13276193497c8d
   */

  render: function (template, options) {
    var to;
    var template;
    var layout;
    var self = this;

<<<<<<< HEAD
    var addRenderedRegion = function (key) {
      if (self._renderedRegions) {
        //XXX doesn't using "main" creep into the ui manager?
        key = key || 'main';
        self._renderedRegions.push(key);
=======
    var addRenderedYield = function (key) {
      if (self._renderedYields) {
        key = key || '__main__';
        self._renderedYields.push(key);
>>>>>>> cc20340b580279c144180b746d13276193497c8d
      }
    };

    if (arguments.length == 0) {
<<<<<<< HEAD
      this.setRegion(this.lookupTemplate());
      addRenderedRegion();
      this.renderRegions();
    } else {
      options = options || {};
      to = options.to;
      this.setRegion(to, template);
      addRenderedRegion(to);
    }
  },
  
  renderRegions: function() {
    var self = this;
    var regionTemplates = this.lookupRegionTemplates();
    
    _.each(regionTemplates, function (opts, tmpl) {
=======
      this.router && this.router.setTemplate(this.template);
      addRenderedYield();
      
      this.renderYields();
    } else {
      options = options || {};
      to = options.to;
      this.router && this.router.setTemplate(template, to);
      addRenderedYield(to);
    }
  },
  
  // render all the templates 
  renderYields: function() {
    var self = this;
    
    _.each(this.yieldTemplates, function (opts, tmpl) {
>>>>>>> cc20340b580279c144180b746d13276193497c8d
      self.render(tmpl, opts)
    });
  },

<<<<<<< HEAD
  wait: function (handle) {
    handle = _.isFunction(handle) ? handle.call(this) : handle;
    // handle could be an object or a array if a function returned an array
    this._waitList.append(handle);
  },

  action: function () {
    this.render();
  },

  /**
   * A private method that the Router can call into to
   * stop the controller. The reason we need this is because we
   * don't want users calling stop() in their hooks/action like they
   * had done previously. We now want them to call pause(). stop() now
   * completely stops the controller and tears down its computations. pause()
   * just stopps running downstream functions (e.g. when you're running
   * before/action/after functions. But if the outer computation causes the
   * entire chain of functions to run again that's fine.
   */
  _stopController: function (cb) {
    var self = this;

    // noop if we're already stopped
    if (this.isStopped)
      return;

    var onStop = function () {
      RouteController.__super__._stopController.call(self, cb);
    };

    if (this._computation) {
      this._computation.stop();
      this._computation.onInvalidate(onStop);
    } else {
      onStop();
    }
  },

  _run: function () {
    var self = this;

    // if we're already running, you can't call run again without
    // calling stop first.
    if (self.isRunning)
      throw new Error("You called _run without first calling stop");

    self.isRunning = true;
    self.isStopped = false;

    var withNoStopsAllowed = function (fn, thisArg) {
      return function () {
        var oldStop = self.stop;

        self.stop = function () {
          if (typeof console !== 'undefined') {
            console.warn("You called this.stop() inside a hook or your action function but you should use pause() now instead which is the first parameter to the hook function.");
            return;
          }
        };

        try {
          return fn.call(thisArg || this);
        } finally {
          self.stop = oldStop;
        }
      };
    };

    // outer most computation is just used to stop inner computations from one
    // place. i don't expect this computation to be invalidated during the run.
    self._computation = Deps.autorun(withNoStopsAllowed(function () {
      self._renderedRegions = [];
      self._waitList.clear();

      self.layout(self.lookupLayoutTemplate());

      Deps.autorun(withNoStopsAllowed(function () {
        if (!self.router._hasJustReloaded)
          self.runHooks('onRun');
        self.router._hasJustReloaded = false;
      }));

      // waitOn
      Deps.autorun(withNoStopsAllowed(function () {
        var waitOnList = self.lookupWaitOn();
        var waitOn = _.flatten(_.map(waitOnList, function (fnOrHandle) {
          return _.isFunction(fnOrHandle) ? fnOrHandle.call(self) : fnOrHandle;
        }));

        log('waitOn');
        self._waitList.append(waitOn);
      }));

      // data
      // always set the data to something on a new route run.
      // it might be null at first, and then run again once
      // we have data.
      Deps.autorun(withNoStopsAllowed(function () {
        var data = self.data();
        self.router.setData(data);
        self.runHooks('onData');
      }));

      // action
      var action = _.isFunction(self.action) ? self.action : self[self.action];
      Utils.assert(action,
        "You don't have an action named \"" + self.action + "\" defined on your RouteController");

      Deps.autorun(withNoStopsAllowed(function () {
        log('Call action');
        self.runHooks('onBeforeAction', [], function (paused) {
          if (!paused && !self.isStopped) {
            action.call(self);

            if (!self.isStopped) {
              self.runHooks('onAfterAction', [
                function clearUnusedRegions () {
                  if (this.router) {
                    this.router.clearUnusedRegions(this._renderedRegions);
                  }
                }
              ]);
            }
          }
        });
      }));
    }));
=======
  setLayout: function (template) {
    this.router && this.router.setLayout(template);
  },

  run: function () {
    var self = this;
    var args = _.toArray(arguments);
    var action = _.isFunction(this.action) ? this.action : this[this.action];

    Utils.assert(action,
      "You don't have an action named \"" + this.action + "\" defined on your RouteController");

    this.stopped = false;

    this._renderedYields = [];

    // when the waitlist status changes it will get cleared and then
    // populated again from any before hooks or action functions. For
    // subscriptions, we take advantage of the fact that Meteor won't subscribe
    // again to the same subscription because of a computation rerun.
    this._waitList.clear();

    /*
     * Each waitOn value could be an object, array or function. Because it's a
     * concatenation of waitOn options from Router -> Route -> RouteController.
     * So by the time we're done here we should just have a list of objects.
     */
    var waitOn = _.flatten(_.map(this.waitOn, function (fnOrHandle) {
      return _.isFunction(fnOrHandle) ? fnOrHandle.call(self) : fnOrHandle;
    }));

    this._waitList.append(waitOn);

    this.setLayout(this.layoutTemplate);

    // Step 1: Run the before hooks
    this.runHooks('before', [
      autoRenderLoadingTemplateHook,
      setDataHook,
      autoRenderNotFoundTemplateHook,
    ]);

    if (this.stopped) {
      this.isFirstRun = false;
      return;
    }

    // Step 2: If we're not stopped, run the action
    action.call(this);

    // Step 3: Run the after hooks
    this.runHooks('after', [
      autoClearUnusedYieldsHook
    ]);

    // We've run at least once
    this.isFirstRun = false;
  },

  wait: function (handle) {
    handle = _.isFunction(handle) ? handle.call(this) : handle;
    // handle could be an object or a array if a function returned an array
    this._waitList.append(handle);
  },

  action: function () {
    this.render();
>>>>>>> cc20340b580279c144180b746d13276193497c8d
  }
});
