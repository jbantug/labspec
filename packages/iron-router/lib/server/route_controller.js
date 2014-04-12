<<<<<<< HEAD
RouteController = Utils.extend(RouteController, {
=======
RouteController = Utils.extend(IronRouteController, {
>>>>>>> cc20340b580279c144180b746d13276193497c8d
  constructor: function () {
    RouteController.__super__.constructor.apply(this, arguments);
    this.request = this.options.request;
    this.response = this.options.response;
    this.next = this.options.next;
<<<<<<< HEAD

    this._dataValue = this.data || {};

    this.data = function (value) {
      if (value)
        this._dataValue = value;
      else
        return _.isFunction(this._dataValue) ? this._dataValue.call(this) : this._dataValue;
    };
  },

  _run: function () {
=======
  },

  run: function () {
>>>>>>> cc20340b580279c144180b746d13276193497c8d
    var self = this
      , args = _.toArray(arguments);

    try {
<<<<<<< HEAD
      // if we're already running, you can't call run again without
      // calling stop first.
      if (self.isRunning)
        throw new Error("You called _run without first calling stop");

      self.isRunning = true;
      self.isStopped = false;

      var action = _.isFunction(self.action) ? self.action : self[self.action];
      Utils.assert(action,
        "You don't have an action named \"" + self.action + "\" defined on your RouteController");

      this.runHooks('onRun');
      this.runHooks('onBeforeAction');
      action.call(this);
      this.runHooks('onAfterAction');

    } catch (e) {
      console.error(e.toString());
      this.response.end();
=======
      var action = _.isFunction(this.action) ? this.action : this[this.action];

      Utils.assert(action,
        "Uh oh, you don't seem to have an action named \"" + this.action + "\" defined on your RouteController");

      this.stopped = false;

      this.runHooks('before');

      if (this.stopped) {
        this.isFirstRun = false;
        return;
      }

      action.call(this);
      this.runHooks('after');
      this.isFirstRun = false;
>>>>>>> cc20340b580279c144180b746d13276193497c8d
    } finally {
      this.response.end();
    }
  },

  action: function () {
    this.response.end();
  }
});
