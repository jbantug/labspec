<<<<<<< HEAD
// lookupTemplate
// lookupLayoutTemplate
// lookupRegionTemplates
// lookupWaitOn
// render
// renderRegions
// wait

var createController = function (proto, opts) {
  var createRouter = function () {
    return new IronRouter({
      autoRender: false,
      autoStart: false
    });
  };
  var route = new Route(Router, 'test', {});

  var R = RouteController.extend(proto || {});
  return new R(Router, route, opts);
};

Tinytest.add('Client RouteController - Router UI API', function (test) {
  var c = createController();
  var router = c.router;

  var calls = [];
  router.layout = function () {
    calls.push('layout');
  };

  router.setRegion = function () {
    calls.push('setRegion');
  };

  router.clearRegion = function () {
    calls.push('clearRegion');
  };

  c.layout();
  test.equal(calls[0], 'layout', 'layout not proxied to router');

  c.setRegion();
  test.equal(calls[1], 'setRegion', 'setRegion not proxied to router');

  c.clearRegion();
  test.equal(calls[2], 'clearRegion', 'clearRegion not proxied to router');
});

Tinytest.add('Client RouteController - data', function (test) {
  var cWithDataFunc = createController({
    data: function () {
      return 'value';
    }
  });

  var cWithDataValue = createController({
    data: 'value'
  });

  var cWithNoData = createController();

  var value;

  value = cWithDataFunc.data();
  test.equal(value, 'value', "couldn't get value from data function");

  value = cWithDataValue.data();
  test.equal(value, 'value', "couldn't get value from data value");

  value = cWithNoData.data();
  test.isNull(value, "controller with no data should give null value");
});

Tinytest.add('Client RouteController - _run order', function (test) {
  var calls = [];

  var c = createController({
    onRun: function () {
      calls.push('onRun');
    },

    onStop: function () {
      calls.push('onStop');
    },

    waitOn: function () {
      calls.push('waitOn');
    },

    data: function () {
      calls.push('data');
    },

    onData: function () {
      calls.push('onData');
    },

    onBeforeAction: function () {
      calls.push('onBeforeAction');
    },

    action: function () {
      calls.push('action');
    },

    onAfterAction: function () {
      calls.push('onAfterAction');
    }
  });

  c.router.layout = function () {
    calls.push('layout');
  };

  c.router.setRegion = function () {
  };

  c.router.setData = function () {
  };

  c.router.clearUnusedRegions = function () {
  };

  // make sure onRun hook gets called again
  c.router._hasJustReloaded = false;
  c._run();

  test.equal(calls, [
    'layout',
    'onRun',
    'waitOn',
    'data',
    'onData',
    'onBeforeAction',
    'action',
    'onAfterAction'
  ], 'run order seems wrong');
});

Tinytest.add('Client RouteController - _run then stop', function (test) {
  var c = createController();
  c._run();
  test.isFalse(c._computation.stopped, "doesn't look like the controller's computation si running.");
  c.stop();
  test.isTrue(c._computation.stopped, "stop() didn't stop the controller's computation.");
});

Tinytest.add('Client RouteController - _run computation isolation', function (test) {
  var calls = {};
  var totalCalls = 0;
  var logCall = function (name) {
    totalCalls++;
    calls[name] = calls[name] || 0;
    calls[name]++;
  };

  var deps = {};
  _.each(['onRun', 'waitOn', 'data', 'action', 'onStop'], function (name) {
    deps[name] = new Deps.Dependency;
  });

  var c = createController({
    onRun: function () {
      deps.onRun.depend();
      logCall('onRun');
    },

    waitOn: function () {
      deps.waitOn.depend();
      logCall('waitOn');
    },

    data: function () {
      deps.data.depend();
      logCall('data');
    },

    onBeforeAction: function () {
      logCall('onBeforeAction');
    },

    action: function () {
      logCall('action');
      deps.action.depend();
    },

    onAfterAction: function () {
      logCall('onAfterAction');
    }
  });

  c._run();

  // everything but onStop
  test.equal(totalCalls, 6, 'first run');

  // now invalidate the onRun dep
  deps.onRun.changed();
  Deps.flush();
  test.equal(totalCalls, 7, 'only onRun should have rerun');
  test.equal(calls.onRun, 2, 'onRun should rerun');

  // okay now the waitOn function!
  deps.waitOn.changed();
  Deps.flush();
  test.equal(totalCalls, 8, 'only waitOn should have rerun');
  test.equal(calls.waitOn, 2, 'waitOn should rerun');

  // whoop whoop, now the data function!
  deps.data.changed();
  Deps.flush();
  test.equal(totalCalls, 9, 'only data should have rerun');
  test.equal(calls.data, 2, 'data should rerun');

  // almost! now the action functions!
  deps.action.changed();
  Deps.flush();
  // 9 to 12 is because action invalidtes
  // onBeforeAction, action, onAfterAction
  test.equal(totalCalls, 12, 'only action should have rerun');
  test.equal(calls.action, 2, 'action should rerun');
  test.equal(calls.onBeforeAction, 2, 'onBeforeAction should rerun');
  test.equal(calls.onAfterAction, 2, 'onAfterAction should rerun');
=======
Subscription = function () {
  this._ready = false;
  this._deps = new Deps.Dependency;
};

Subscription.prototype.ready = function () {
  this._deps.depend();
  return this._ready;
};

Subscription.prototype.mark = function () {
  this._ready = true;
  this._deps.changed();
};

MockRouter = function() {
  this.rendered = {};
  this.layout = null;
  this.data = null;
};

MockRouter.prototype.setTemplate = function(name, to) {
  to = to || '__main__';
  this.rendered[to] = name;
};

MockRouter.prototype.setLayout = function(name) {
  this.layout = name;
};

MockRouter.prototype.setData = function(data) {
  this.data = data;
};

MockRouter.prototype.getData = function() {
  return this.data;
};

MockRouter.prototype.clearUnusedYields = function (used) {
  this.usedYields = used;
};

Tinytest.add('RouteController - wait and ready', function (test) {
  var controller = new RouteController;

  var sub1 = new Subscription;
  var sub2 = new Subscription;

  controller.wait(sub1);
  controller.wait(sub2);

  var ready = false;
  Deps.autorun(function () {
    ready = controller.ready();
  });

  test.isFalse(ready, 'controller should be waiting on two subs');

  sub1.mark();
  Deps.flush();
  test.isFalse(ready, 'controller should be waiting on one more sub');

  sub2.mark();
  Deps.flush();
  test.isTrue(ready, 'controller should be ready now');
});

Tinytest.add('RouteController - run', function (test) {
  var calls = {};
  var logCall = function (key) {
    calls[key] = calls[key] || 0;
    calls[key]++;
  };

  var sub1 = new Subscription;

  var C = RouteController.extend({
    waitOn: function () {
      return sub1;
    },

    before: [function () {
      logCall('upstreamBefore');
      if (!this.ready())
        this.stop();

    }, function () {
      logCall('downstreamBefore');
    }],

    action: function () {
      logCall('action');
    },

    after: function () {
      logCall('after');
    }
  });

  var inst = new C;
  
  Deps.autorun(function () {
    inst.run();
  });

  test.equal(calls['upstreamBefore'], 1);
  test.isFalse(calls['downstreamBefore']);
  test.isFalse(calls['action']);
  test.isFalse(calls['after']);

  sub1.mark();
  Deps.flush();

  test.equal(calls['upstreamBefore'], 2);
  test.equal(calls['downstreamBefore'], 1);
  test.equal(calls['action'], 1);
  test.equal(calls['after'], 1);
});

// really not a lot to test here, but here goes
Tinytest.add('RouteController - render', function (test) {
  var router = new MockRouter;
  var controller = new RouteController({router: router});
  
  controller.render('template');
  test.equal(router.rendered.__main__, 'template', 'main tmpl not rendered');
  
  controller.render('template', {to: 'aside'});
  test.equal(router.rendered.aside, 'template', 'yield tmpl not rendered');
});

Tinytest.add('RouteController - autoRenderLoadingHook', function (test) {
  var router = new MockRouter;
  var handle = new Subscription;
  var controller = new RouteController({
    router: router,
    waitOn: handle,
    loadingTemplate: 'loading',
    template: 'template'
  });
  
  Deps.autorun(function() {
    controller.run();
  });
  
  test.equal(router.rendered.__main__, 'loading');
  
  handle.mark();
  Deps.flush();
  test.equal(router.rendered.__main__, 'template');
});

Tinytest.add('RouteController - autoRenderNotFoundHook', function (test) {
  var router = new MockRouter;
  var dataDep = new Deps.Dependency;
  var found = null;
  var controller = new RouteController({
    router: router,
    template: 'template',
    notFoundTemplate: 'notFound',
    yieldTemplates: {
      one: {to: 'one'}
    },
    data: function() {
      dataDep.depend();
      return found;
    }
  });
  
  Deps.autorun(function() {
    controller.run();
  });
  
  test.equal(router.rendered.__main__, 'notFound');
  test.equal(router.rendered.one, 'one');
  
  found = true;
  dataDep.changed();
  Deps.flush();
  test.equal(router.rendered.__main__, 'template');
  test.equal(router.rendered.one, 'one');
  test.equal(router.data, true);
>>>>>>> cc20340b580279c144180b746d13276193497c8d
});
