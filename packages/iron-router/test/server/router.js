<<<<<<< HEAD
// request
// response
// next
=======
Tinytest.add('ServerRouter - before hooks', function (test) {
  var router = new ServerRouter;
  var where = 'server';

  var firstHookCalled = 0;
  router.before(function() { firstHookCalled += 1; }, {only: 'one'})

  var secondHookCalled = 0;
  router.before(function() { secondHookCalled += 1; }, {except: 'two'})

  var thirdHookCalled = 0;
  router.configure({before: function() { thirdHookCalled += 1; }})

  var fourthHookCalled = 0;
  router.before(function(){ fourthHookCalled += 1 })

  router.map(function() {
    this.route('one', {where: where});
    this.route('two', {where: where});
    this.route('three', {where: where});
  });

  // mock
  var serverOptionsMock = {next: _.identity, response: {end: _.identity}}; 

  router.dispatch('one', serverOptionsMock);
  test.equal(firstHookCalled, 1);
  test.equal(secondHookCalled, 1);
  test.equal(thirdHookCalled, 1);
  test.equal(fourthHookCalled, 1);

  router.dispatch('two', serverOptionsMock);
  test.equal(firstHookCalled, 1);
  test.equal(secondHookCalled, 1);
  test.equal(thirdHookCalled, 2);
  test.equal(fourthHookCalled, 2);

  router.dispatch('three', serverOptionsMock);
  test.equal(firstHookCalled, 1);
  test.equal(secondHookCalled, 2);
  test.equal(thirdHookCalled, 3);  
  test.equal(fourthHookCalled, 3);
});

>>>>>>> cc20340b580279c144180b746d13276193497c8d
