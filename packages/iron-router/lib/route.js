/*
 * Inspiration and some code for the compilation of routes comes from pagejs.
 * The original has been modified to better handle hash fragments, and to store
 * the regular expression on the Route instance. Also, the resolve method has
 * been added to return a resolved path given a parameters object.
 */

Route = function (router, name, options) {
  var path;

  Utils.assert(router instanceof IronRouter);

  Utils.assert(_.isString(name),
    'Route constructor requires a name as the second parameter');

  if (_.isFunction(options))
    options = { handler: options };

  options = this.options = options || {};
  path = options.path || ('/' + name);

  this.router = router;
  this.originalPath = path;

  if (_.isString(this.originalPath) && this.originalPath.charAt(0) !== '/')
    this.originalPath = '/' + this.originalPath;

  this.name = name;
  this.where = options.where || 'client';
  this.controller = options.controller;
<<<<<<< HEAD
  this.action = options.action;
=======
>>>>>>> cc20340b580279c144180b746d13276193497c8d

  if (typeof options.reactive !== 'undefined')
    this.isReactive = options.reactive;
  else
    this.isReactive = true;

  this.compile();
};

Route.prototype = {
  constructor: Route,

  /**
<<<<<<< HEAD
   * Compile the path.
=======
   * Compile the path. 
>>>>>>> cc20340b580279c144180b746d13276193497c8d
   *
   *  @return {Route}
   *  @api public
   */

  compile: function () {
<<<<<<< HEAD
    var self = this;
    var path;
    var options = self.options;
=======
    var self = this
      , path
      , options = self.options;
>>>>>>> cc20340b580279c144180b746d13276193497c8d

    this.keys = [];

    if (self.originalPath instanceof RegExp) {
      self.re = self.originalPath;
    } else {
      path = self.originalPath
        .replace(/(.)\/$/, '$1')
        .concat(options.strict ? '' : '/?')
        .replace(/\/\(/g, '(?:/')
        .replace(/#/, '/?#')
        .replace(
          /(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g,
          function (match, slash, format, key, capture, optional){
            self.keys.push({ name: key, optional: !! optional });
            slash = slash || '';
            return ''
              + (optional ? '' : slash)
              + '(?:'
              + (optional ? slash : '')
<<<<<<< HEAD
              + (format || '')
=======
              + (format || '') 
>>>>>>> cc20340b580279c144180b746d13276193497c8d
              + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
              + (optional || '');
          }
        )
        .replace(/([\/.])/g, '\\$1')
        .replace(/\*/g, '(.*)');
<<<<<<< HEAD

=======
      
>>>>>>> cc20340b580279c144180b746d13276193497c8d
      self.re = new RegExp('^' + path + '$', options.sensitive ? '' : 'i');
    }

    return this;
  },

  /**
   * Returns an array of parameters given a path. The array may have named
   * properties in addition to indexed values.
   *
   * @param {String} path
   * @return {Array}
   * @api public
   */

  params: function (path) {
<<<<<<< HEAD
    if (!path)
      return null;

    var params = [];
    var m = this.exec(path);
    var queryString;
    var keys = this.keys;
    var key;
    var value;
=======
    if (!path) return null;

    var params = []
      , m = this.exec(path)
      , queryString
      , keys = this.keys
      , key
      , value;
>>>>>>> cc20340b580279c144180b746d13276193497c8d

    if (!m)
      throw new Error('The route named "' + this.name + '" does not match the path "' + path + '"');

    for (var i = 1, len = m.length; i < len; ++i) {
      key = keys[i - 1];
      value = typeof m[i] == 'string' ? decodeURIComponent(m[i]) : m[i];
      if (key) {
<<<<<<< HEAD
        params[key.name] = params[key.name] !== undefined ?
=======
        params[key.name] = params[key.name] !== undefined ? 
>>>>>>> cc20340b580279c144180b746d13276193497c8d
          params[key.name] : value;
      } else
        params.push(value);
    }

    path = decodeURI(path);

    queryString = path.split('?')[1];
    if (queryString)
      queryString = queryString.split('#')[0];

    params.hash = path.split('#')[1];

    if (queryString) {
      _.each(queryString.split('&'), function (paramString) {
        paramParts = paramString.split('=');
        params[paramParts[0]] = decodeURIComponent(paramParts[1]);
      });
    }

    return params;
  },

  normalizePath: function (path) {
    var origin = Meteor.absoluteUrl();

    path = path.replace(origin, '');

    var queryStringIndex = path.indexOf('?');
    path = ~queryStringIndex ? path.slice(0, queryStringIndex) : path;

    var hashIndex = path.indexOf('#');
    path = ~hashIndex ? path.slice(0, hashIndex) : path;

    if (path.charAt(0) !== '/')
      path = '/' + path;

    return path;
  },

  /**
   * Returns true if the path matches and false otherwise.
   *
   * @param {String} path
<<<<<<< HEAD
   * @return {Boolean}
=======
   * @return {Boolean} 
>>>>>>> cc20340b580279c144180b746d13276193497c8d
   * @api public
   */
  test: function (path) {
    return this.re.test(this.normalizePath(path));
  },

  exec: function (path) {
    return this.re.exec(this.normalizePath(path));
  },

  resolve: function (params, options) {
<<<<<<< HEAD
    var value;
    var isValueDefined;
    var result;
    var wildCardCount = 0;
    var path = this.originalPath;
    var hash;
    var query;
    var isMissingParams = false;
=======
    var value
      , isValueDefined
      , result
      , wildCardCount = 0
      , path = this.originalPath
      , hash
      , query
      , isMissingParams = false;
>>>>>>> cc20340b580279c144180b746d13276193497c8d

    options = options || {};
    params = params || [];
    query = options.query;
    hash = options.hash;

    if (path instanceof RegExp) {
      throw new Error('Cannot currently resolve a regular expression path');
    } else {
      path = this.originalPath
        .replace(
          /(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g,
          function (match, slash, format, key, capture, optional, offset) {
            slash = slash || '';
            value = params[key];
            isValueDefined = typeof value !== 'undefined';

            if (optional && !isValueDefined) {
              value = '';
            } else if (!isValueDefined) {
              isMissingParams = true;
<<<<<<< HEAD
              return;
=======
              console.warn('You called Route.prototype.resolve with a missing parameter. "' + key + '" not found in params');
              return;
              //throw new Error('You called Route.prototype.resolve with a missing parameter. "' + key + '" not found in params');
>>>>>>> cc20340b580279c144180b746d13276193497c8d
            }

            value = _.isFunction(value) ? value.call(params) : value;
            var escapedValue = _.map(String(value).split('/'), function (segment) {
              return encodeURIComponent(segment);
            }).join('/');
            return slash + escapedValue
          }
        )
        .replace(
          /\*/g,
          function (match) {
            if (typeof params[wildCardCount] === 'undefined') {
              throw new Error(
<<<<<<< HEAD
                'You are trying to access a wild card parameter at index ' +
=======
                'You are trying to access a wild card parameter at index ' + 
>>>>>>> cc20340b580279c144180b746d13276193497c8d
                wildCardCount +
                ' but the value of params at that index is undefined');
            }

            var paramValue = String(params[wildCardCount++]);
            return _.map(paramValue.split('/'), function (segment) {
              return encodeURIComponent(segment);
            }).join('/');
          }
        );

      if (_.isObject(query)) {
        query = _.map(_.pairs(query), function (queryPart) {
          return queryPart[0] + '=' + encodeURIComponent(queryPart[1]);
        }).join('&');
<<<<<<< HEAD
      }

      if (query && query.length)
        path = path + '?' + query;

      if (hash) {
        hash = encodeURI(hash.replace('#', ''));
        path = query ?
=======

        if (query && query.length)
          path = path + '/?' + query;
      }

      if (hash) {
        hash = encodeURI(hash.replace('#', ''));
        path = query ? 
>>>>>>> cc20340b580279c144180b746d13276193497c8d
          path + '#' + hash : path + '/#' + hash;
      }
    }

    // Because of optional possibly empty segments we normalize path here
    path = path.replace(/\/+/g, '/'); // Multiple / -> one /
    path = path.replace(/^(.+)\/$/g, '$1'); // Removal of trailing /

    return isMissingParams ? null : path;
  },

  path: function (params, options) {
    return this.resolve(params, options);
  },

  url: function (params, options) {
    var path = this.path(params, options);
    if (path[0] === '/')
      path = path.slice(1, path.length);
    return Meteor.absoluteUrl() + path;
  },

  getController: function (path, options) {
    var self = this;
<<<<<<< HEAD
    var handler;
    var controllerClass;
    var controller;
    var action;
    var routeName;

    var resolveValue = Utils.resolveValue;
=======
    var handler
      , controllerClass
      , controller
      , action
      , routeName;

    var resolveValue = Utils.resolveValue;
    var classify = Utils.classify; 
>>>>>>> cc20340b580279c144180b746d13276193497c8d
    var toArray = Utils.toArray;

    var findController = function (name) {
      var controller = resolveValue(name);
      if (typeof controller === 'undefined') {
        throw new Error(
          'controller "' + name + '" is not defined');
      }

      return controller;
    };

<<<<<<< HEAD
    options = _.extend({}, options, {
      path: path,
      params: this.params(path),
      where: this.where,
      action: this.action
    });

=======
    options = _.extend({}, this.router.options, this.options, options || {}, {
      before: toArray(this.options.before),
      after: toArray(this.options.after),
      unload: toArray(this.options.unload),
      waitOn: toArray(this.router.options.waitOn)
        .concat(toArray(this.options.waitOn)),
      path: path,
      route: this,
      router: this.router,
      params: this.params(path)
    });
    
>>>>>>> cc20340b580279c144180b746d13276193497c8d
    // case 1: controller option is defined on the route
    if (this.controller) {
      controllerClass = _.isString(this.controller) ?
        findController(this.controller) : this.controller;
<<<<<<< HEAD
      controller = new controllerClass(this.router, this, options);
=======
      controller = new controllerClass(options);
>>>>>>> cc20340b580279c144180b746d13276193497c8d
      return controller;
    }

    // case 2: intelligently find the controller class in global namespace
    routeName = this.name;

    if (routeName) {
<<<<<<< HEAD
      routeName = Router.convertRouteControllerName(routeName + 'Controller');
      controllerClass = resolveValue(routeName);

      if (controllerClass) {
        controller = new controllerClass(this.router, this, options);
=======
      controllerClass = resolveValue(classify(routeName + 'Controller'));

      if (controllerClass) {
        controller = new controllerClass(options);
>>>>>>> cc20340b580279c144180b746d13276193497c8d
        return controller;
      }
    }

    // case 3: nothing found so create an anonymous controller
<<<<<<< HEAD
    return new RouteController(this.router, this, options);
=======
    return new RouteController(options);
>>>>>>> cc20340b580279c144180b746d13276193497c8d
  }
};
