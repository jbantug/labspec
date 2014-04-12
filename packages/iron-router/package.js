Package.describe({
  summary: 'Routing specifically designed for Meteor'
});

Package.on_use(function (api) {
  api.use('reactive-dict', ['client', 'server']);
  api.use('deps', ['client', 'server']);
  api.use('underscore', ['client', 'server']);
  api.use('ejson', ['client', 'server']);
<<<<<<< HEAD
  api.use('jquery', 'client');

  // default ui manager
  // use unordered: true becuase of circular dependency

  // for helpers
  api.use('ui', 'client', {weak: true});
 
  // default ui manager
  // unordered: true because blaze-layout package weakly
  // depends on iron-router so it can register itself with
  // the router. But we still want to pull in the blaze-layout
  // package automatically when users add iron-router.
  api.use('blaze-layout', 'client', {unordered: true});
=======

  api.use('templating', 'client');
  api.use('handlebars', 'client');
  api.use('jquery', 'client');
>>>>>>> cc20340b580279c144180b746d13276193497c8d

  api.add_files('lib/utils.js', ['client', 'server']);
  api.add_files('lib/route.js', ['client', 'server']);
  api.add_files('lib/route_controller.js', ['client', 'server']);
  api.add_files('lib/router.js', ['client', 'server']);

  api.add_files('lib/client/location.js', 'client');
<<<<<<< HEAD
  api.add_files('lib/client/router.js', 'client');
  api.add_files('lib/client/wait_list.js', 'client');
  api.add_files('lib/client/hooks.js', 'client');
  api.add_files('lib/client/route_controller.js', 'client');
  api.add_files('lib/client/ui/helpers.js', 'client');
=======
  api.add_files('lib/client/page_manager.js', 'client');
  api.add_files('lib/client/router.js', 'client');
  api.add_files('lib/client/default_layout.html', 'client');
  api.add_files('lib/client/route_controller.js', 'client');
  api.add_files('lib/client/helpers.js', 'client');

>>>>>>> cc20340b580279c144180b746d13276193497c8d

  api.add_files('lib/server/route_controller.js', 'server');
  api.add_files('lib/server/router.js', 'server');

<<<<<<< HEAD
  api.use('webapp', 'server');
  Npm.depends({connect: '2.9.0'});

  api.export('RouteController', ['client', 'server']);
  api.export('Route', ['client', 'server']);
  api.export('Router', ['client', 'server']);
  api.export('IronLocation', 'client');

  api.export('Utils', ['client', 'server'], {testOnly: true});
  api.export('IronRouter', ['client', 'server'], {testOnly: true});
  api.export('WaitList', 'client', {testOnly: true});
=======
  // for backward compat before Meteor linker changes
  if (typeof api.export !== 'undefined') {
    api.use('webapp', 'server');
    Npm.depends({connect: '2.7.10'});

    api.export('RouteController', ['client', 'server']);
    api.export('Route', ['client', 'server']);
    api.export('Router', ['client', 'server']);
    api.export('IronLocation', 'client');

    api.export('Utils', ['client', 'server'], {testOnly: true});
    api.export('IronRouteController', ['client', 'server'], {testOnly: true});
    api.export('IronRouter', ['client', 'server'], {testOnly: true});

    api.export('PageManager', 'client', {testOnly: true});
    api.export('ClientRouter', 'client', {testOnly: true});

    api.export('ServerRouter', 'server', {testOnly: true});
  }
>>>>>>> cc20340b580279c144180b746d13276193497c8d
});

Package.on_test(function (api) {
  api.use('iron-router', ['client', 'server']);
  api.use('tinytest', ['client', 'server']);
  api.use('test-helpers', ['client', 'server']);
  api.use('reactive-dict', ['client', 'server']);

<<<<<<< HEAD
  api.add_files('test/test_helpers.js', ['client', 'server']);

  // client and server
  api.add_files('test/both/route.js', ['client', 'server']);
  api.add_files('test/both/route_controller.js', ['client', 'server']);
  api.add_files('test/both/router.js', ['client', 'server']);
  api.add_files('test/both/utils.js', ['client', 'server']);

  // server only
  api.add_files('test/server/router.js', 'server');

  // client only
  api.add_files('test/client/router.js', 'client');
  api.add_files('test/client/route_controller.js', 'client');
  api.add_files('test/client/wait_list.js', 'client');
=======
  api.use('templating', 'client');

  api.add_files('test/test_helpers.js', ['client', 'server']);
  api.add_files('test/route.js', ['client', 'server']);
  api.add_files('test/route_controller.js', ['client', 'server']);
  api.add_files('test/router.js', ['client', 'server']);

  api.add_files('test/server/router.js', 'server');

  api.add_files('test/client/templates.html', 'client');
  api.add_files('test/client/router.js', 'client');
  api.add_files('test/client/route_controller.js', 'client');  
>>>>>>> cc20340b580279c144180b746d13276193497c8d
});
