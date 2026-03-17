import * as fs from 'fs';
import fs__default from 'fs';
import * as path from 'path';
import path__default from 'path';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var handlebars = {exports: {}};

var handlebars_runtime = {exports: {}};

var base$1 = {};

var utils = {};

var hasRequiredUtils;

function requireUtils () {
	if (hasRequiredUtils) return utils;
	hasRequiredUtils = 1;

	utils.__esModule = true;
	utils.extend = extend;
	utils.indexOf = indexOf;
	utils.escapeExpression = escapeExpression;
	utils.isEmpty = isEmpty;
	utils.createFrame = createFrame;
	utils.blockParams = blockParams;
	utils.appendContextPath = appendContextPath;
	var escape = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#x27;',
	  '`': '&#x60;',
	  '=': '&#x3D;'
	};

	var badChars = /[&<>"'`=]/g,
	    possible = /[&<>"'`=]/;

	function escapeChar(chr) {
	  return escape[chr];
	}

	function extend(obj /* , ...source */) {
	  for (var i = 1; i < arguments.length; i++) {
	    for (var key in arguments[i]) {
	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
	        obj[key] = arguments[i][key];
	      }
	    }
	  }

	  return obj;
	}

	var toString = Object.prototype.toString;

	utils.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	/* eslint-disable func-style */
	var isFunction = function isFunction(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	/* istanbul ignore next */
	if (isFunction(/x/)) {
	  utils.isFunction = isFunction = function (value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	utils.isFunction = isFunction;

	/* eslint-enable func-style */

	/* istanbul ignore next */
	var isArray = Array.isArray || function (value) {
	  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
	};

	utils.isArray = isArray;
	// Older IE versions do not directly support indexOf so we must implement our own, sadly.

	function indexOf(array, value) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    if (array[i] === value) {
	      return i;
	    }
	  }
	  return -1;
	}

	function escapeExpression(string) {
	  if (typeof string !== 'string') {
	    // don't escape SafeStrings, since they're already safe
	    if (string && string.toHTML) {
	      return string.toHTML();
	    } else if (string == null) {
	      return '';
	    } else if (!string) {
	      return string + '';
	    }

	    // Force a string conversion as this will be done by the append regardless and
	    // the regex test will do this transparently behind the scenes, causing issues if
	    // an object's to string has escaped characters in it.
	    string = '' + string;
	  }

	  if (!possible.test(string)) {
	    return string;
	  }
	  return string.replace(badChars, escapeChar);
	}

	function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}

	function createFrame(object) {
	  var frame = extend({}, object);
	  frame._parent = object;
	  return frame;
	}

	function blockParams(params, ids) {
	  params.path = ids;
	  return params;
	}

	function appendContextPath(contextPath, id) {
	  return (contextPath ? contextPath + '.' : '') + id;
	}
	
	return utils;
}

var exception = {exports: {}};

var hasRequiredException;

function requireException () {
	if (hasRequiredException) return exception.exports;
	hasRequiredException = 1;
	(function (module, exports$1) {

		exports$1.__esModule = true;
		var errorProps = ['description', 'fileName', 'lineNumber', 'endLineNumber', 'message', 'name', 'number', 'stack'];

		function Exception(message, node) {
		  var loc = node && node.loc,
		      line = undefined,
		      endLineNumber = undefined,
		      column = undefined,
		      endColumn = undefined;

		  if (loc) {
		    line = loc.start.line;
		    endLineNumber = loc.end.line;
		    column = loc.start.column;
		    endColumn = loc.end.column;

		    message += ' - ' + line + ':' + column;
		  }

		  var tmp = Error.prototype.constructor.call(this, message);

		  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
		  for (var idx = 0; idx < errorProps.length; idx++) {
		    this[errorProps[idx]] = tmp[errorProps[idx]];
		  }

		  /* istanbul ignore else */
		  if (Error.captureStackTrace) {
		    Error.captureStackTrace(this, Exception);
		  }

		  try {
		    if (loc) {
		      this.lineNumber = line;
		      this.endLineNumber = endLineNumber;

		      // Work around issue under safari where we can't directly set the column value
		      /* istanbul ignore next */
		      if (Object.defineProperty) {
		        Object.defineProperty(this, 'column', {
		          value: column,
		          enumerable: true
		        });
		        Object.defineProperty(this, 'endColumn', {
		          value: endColumn,
		          enumerable: true
		        });
		      } else {
		        this.column = column;
		        this.endColumn = endColumn;
		      }
		    }
		  } catch (nop) {
		    /* Ignore if the browser is very particular */
		  }
		}

		Exception.prototype = new Error();

		exports$1['default'] = Exception;
		module.exports = exports$1['default'];
		
	} (exception, exception.exports));
	return exception.exports;
}

var helpers$1 = {};

var blockHelperMissing = {exports: {}};

var hasRequiredBlockHelperMissing;

function requireBlockHelperMissing () {
	if (hasRequiredBlockHelperMissing) return blockHelperMissing.exports;
	hasRequiredBlockHelperMissing = 1;
	(function (module, exports$1) {

		exports$1.__esModule = true;

		var _utils = requireUtils();

		exports$1['default'] = function (instance) {
		  instance.registerHelper('blockHelperMissing', function (context, options) {
		    var inverse = options.inverse,
		        fn = options.fn;

		    if (context === true) {
		      return fn(this);
		    } else if (context === false || context == null) {
		      return inverse(this);
		    } else if (_utils.isArray(context)) {
		      if (context.length > 0) {
		        if (options.ids) {
		          options.ids = [options.name];
		        }

		        return instance.helpers.each(context, options);
		      } else {
		        return inverse(this);
		      }
		    } else {
		      if (options.data && options.ids) {
		        var data = _utils.createFrame(options.data);
		        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
		        options = { data: data };
		      }

		      return fn(context, options);
		    }
		  });
		};

		module.exports = exports$1['default'];
		
	} (blockHelperMissing, blockHelperMissing.exports));
	return blockHelperMissing.exports;
}

var each = {exports: {}};

var hasRequiredEach;

function requireEach () {
	if (hasRequiredEach) return each.exports;
	hasRequiredEach = 1;
	(function (module, exports$1) {

		exports$1.__esModule = true;
		// istanbul ignore next

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		var _utils = requireUtils();

		var _exception = requireException();

		var _exception2 = _interopRequireDefault(_exception);

		exports$1['default'] = function (instance) {
		  instance.registerHelper('each', function (context, options) {
		    if (!options) {
		      throw new _exception2['default']('Must pass iterator to #each');
		    }

		    var fn = options.fn,
		        inverse = options.inverse,
		        i = 0,
		        ret = '',
		        data = undefined,
		        contextPath = undefined;

		    if (options.data && options.ids) {
		      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
		    }

		    if (_utils.isFunction(context)) {
		      context = context.call(this);
		    }

		    if (options.data) {
		      data = _utils.createFrame(options.data);
		    }

		    function execIteration(field, index, last) {
		      if (data) {
		        data.key = field;
		        data.index = index;
		        data.first = index === 0;
		        data.last = !!last;

		        if (contextPath) {
		          data.contextPath = contextPath + field;
		        }
		      }

		      ret = ret + fn(context[field], {
		        data: data,
		        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
		      });
		    }

		    if (context && typeof context === 'object') {
		      if (_utils.isArray(context)) {
		        for (var j = context.length; i < j; i++) {
		          if (i in context) {
		            execIteration(i, i, i === context.length - 1);
		          }
		        }
		      } else if (commonjsGlobal.Symbol && context[commonjsGlobal.Symbol.iterator]) {
		        var newContext = [];
		        var iterator = context[commonjsGlobal.Symbol.iterator]();
		        for (var it = iterator.next(); !it.done; it = iterator.next()) {
		          newContext.push(it.value);
		        }
		        context = newContext;
		        for (var j = context.length; i < j; i++) {
		          execIteration(i, i, i === context.length - 1);
		        }
		      } else {
		        (function () {
		          var priorKey = undefined;

		          Object.keys(context).forEach(function (key) {
		            // We're running the iterations one step out of sync so we can detect
		            // the last iteration without have to scan the object twice and create
		            // an itermediate keys array.
		            if (priorKey !== undefined) {
		              execIteration(priorKey, i - 1);
		            }
		            priorKey = key;
		            i++;
		          });
		          if (priorKey !== undefined) {
		            execIteration(priorKey, i - 1, true);
		          }
		        })();
		      }
		    }

		    if (i === 0) {
		      ret = inverse(this);
		    }

		    return ret;
		  });
		};

		module.exports = exports$1['default'];
		
	} (each, each.exports));
	return each.exports;
}

var helperMissing = {exports: {}};

var hasRequiredHelperMissing;

function requireHelperMissing () {
	if (hasRequiredHelperMissing) return helperMissing.exports;
	hasRequiredHelperMissing = 1;
	(function (module, exports$1) {

		exports$1.__esModule = true;
		// istanbul ignore next

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		var _exception = requireException();

		var _exception2 = _interopRequireDefault(_exception);

		exports$1['default'] = function (instance) {
		  instance.registerHelper('helperMissing', function () /* [args, ]options */{
		    if (arguments.length === 1) {
		      // A missing field in a {{foo}} construct.
		      return undefined;
		    } else {
		      // Someone is actually trying to call something, blow up.
		      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
		    }
		  });
		};

		module.exports = exports$1['default'];
		
	} (helperMissing, helperMissing.exports));
	return helperMissing.exports;
}

var _if = {exports: {}};

var hasRequired_if;

function require_if () {
	if (hasRequired_if) return _if.exports;
	hasRequired_if = 1;
	(function (module, exports$1) {

		exports$1.__esModule = true;
		// istanbul ignore next

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		var _utils = requireUtils();

		var _exception = requireException();

		var _exception2 = _interopRequireDefault(_exception);

		exports$1['default'] = function (instance) {
		  instance.registerHelper('if', function (conditional, options) {
		    if (arguments.length != 2) {
		      throw new _exception2['default']('#if requires exactly one argument');
		    }
		    if (_utils.isFunction(conditional)) {
		      conditional = conditional.call(this);
		    }

		    // Default behavior is to render the positive path if the value is truthy and not empty.
		    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
		    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
		    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
		      return options.inverse(this);
		    } else {
		      return options.fn(this);
		    }
		  });

		  instance.registerHelper('unless', function (conditional, options) {
		    if (arguments.length != 2) {
		      throw new _exception2['default']('#unless requires exactly one argument');
		    }
		    return instance.helpers['if'].call(this, conditional, {
		      fn: options.inverse,
		      inverse: options.fn,
		      hash: options.hash
		    });
		  });
		};

		module.exports = exports$1['default'];
		
	} (_if, _if.exports));
	return _if.exports;
}

var log = {exports: {}};

var hasRequiredLog;

function requireLog () {
	if (hasRequiredLog) return log.exports;
	hasRequiredLog = 1;
	(function (module, exports$1) {

		exports$1.__esModule = true;

		exports$1['default'] = function (instance) {
		  instance.registerHelper('log', function () /* message, options */{
		    var args = [undefined],
		        options = arguments[arguments.length - 1];
		    for (var i = 0; i < arguments.length - 1; i++) {
		      args.push(arguments[i]);
		    }

		    var level = 1;
		    if (options.hash.level != null) {
		      level = options.hash.level;
		    } else if (options.data && options.data.level != null) {
		      level = options.data.level;
		    }
		    args[0] = level;

		    instance.log.apply(instance, args);
		  });
		};

		module.exports = exports$1['default'];
		
	} (log, log.exports));
	return log.exports;
}

var lookup = {exports: {}};

var hasRequiredLookup;

function requireLookup () {
	if (hasRequiredLookup) return lookup.exports;
	hasRequiredLookup = 1;
	(function (module, exports$1) {

		exports$1.__esModule = true;

		exports$1['default'] = function (instance) {
		  instance.registerHelper('lookup', function (obj, field, options) {
		    if (!obj) {
		      // Note for 5.0: Change to "obj == null" in 5.0
		      return obj;
		    }
		    return options.lookupProperty(obj, field);
		  });
		};

		module.exports = exports$1['default'];
		
	} (lookup, lookup.exports));
	return lookup.exports;
}

var _with = {exports: {}};

var hasRequired_with;

function require_with () {
	if (hasRequired_with) return _with.exports;
	hasRequired_with = 1;
	(function (module, exports$1) {

		exports$1.__esModule = true;
		// istanbul ignore next

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		var _utils = requireUtils();

		var _exception = requireException();

		var _exception2 = _interopRequireDefault(_exception);

		exports$1['default'] = function (instance) {
		  instance.registerHelper('with', function (context, options) {
		    if (arguments.length != 2) {
		      throw new _exception2['default']('#with requires exactly one argument');
		    }
		    if (_utils.isFunction(context)) {
		      context = context.call(this);
		    }

		    var fn = options.fn;

		    if (!_utils.isEmpty(context)) {
		      var data = options.data;
		      if (options.data && options.ids) {
		        data = _utils.createFrame(options.data);
		        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
		      }

		      return fn(context, {
		        data: data,
		        blockParams: _utils.blockParams([context], [data && data.contextPath])
		      });
		    } else {
		      return options.inverse(this);
		    }
		  });
		};

		module.exports = exports$1['default'];
		
	} (_with, _with.exports));
	return _with.exports;
}

var hasRequiredHelpers$1;

function requireHelpers$1 () {
	if (hasRequiredHelpers$1) return helpers$1;
	hasRequiredHelpers$1 = 1;

	helpers$1.__esModule = true;
	helpers$1.registerDefaultHelpers = registerDefaultHelpers;
	helpers$1.moveHelperToHooks = moveHelperToHooks;
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _helpersBlockHelperMissing = requireBlockHelperMissing();

	var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

	var _helpersEach = requireEach();

	var _helpersEach2 = _interopRequireDefault(_helpersEach);

	var _helpersHelperMissing = requireHelperMissing();

	var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

	var _helpersIf = require_if();

	var _helpersIf2 = _interopRequireDefault(_helpersIf);

	var _helpersLog = requireLog();

	var _helpersLog2 = _interopRequireDefault(_helpersLog);

	var _helpersLookup = requireLookup();

	var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

	var _helpersWith = require_with();

	var _helpersWith2 = _interopRequireDefault(_helpersWith);

	function registerDefaultHelpers(instance) {
	  _helpersBlockHelperMissing2['default'](instance);
	  _helpersEach2['default'](instance);
	  _helpersHelperMissing2['default'](instance);
	  _helpersIf2['default'](instance);
	  _helpersLog2['default'](instance);
	  _helpersLookup2['default'](instance);
	  _helpersWith2['default'](instance);
	}

	function moveHelperToHooks(instance, helperName, keepHelper) {
	  if (instance.helpers[helperName]) {
	    instance.hooks[helperName] = instance.helpers[helperName];
	    if (!keepHelper) {
	      delete instance.helpers[helperName];
	    }
	  }
	}
	
	return helpers$1;
}

var decorators = {};

var inline = {exports: {}};

var hasRequiredInline;

function requireInline () {
	if (hasRequiredInline) return inline.exports;
	hasRequiredInline = 1;
	(function (module, exports$1) {

		exports$1.__esModule = true;

		var _utils = requireUtils();

		exports$1['default'] = function (instance) {
		  instance.registerDecorator('inline', function (fn, props, container, options) {
		    var ret = fn;
		    if (!props.partials) {
		      props.partials = {};
		      ret = function (context, options) {
		        // Create a new partials stack frame prior to exec.
		        var original = container.partials;
		        container.partials = _utils.extend({}, original, props.partials);
		        var ret = fn(context, options);
		        container.partials = original;
		        return ret;
		      };
		    }

		    props.partials[options.args[0]] = options.fn;

		    return ret;
		  });
		};

		module.exports = exports$1['default'];
		
	} (inline, inline.exports));
	return inline.exports;
}

var hasRequiredDecorators;

function requireDecorators () {
	if (hasRequiredDecorators) return decorators;
	hasRequiredDecorators = 1;

	decorators.__esModule = true;
	decorators.registerDefaultDecorators = registerDefaultDecorators;
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _decoratorsInline = requireInline();

	var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

	function registerDefaultDecorators(instance) {
	  _decoratorsInline2['default'](instance);
	}
	
	return decorators;
}

var logger = {exports: {}};

var hasRequiredLogger;

function requireLogger () {
	if (hasRequiredLogger) return logger.exports;
	hasRequiredLogger = 1;
	(function (module, exports$1) {

		exports$1.__esModule = true;

		var _utils = requireUtils();

		var logger = {
		  methodMap: ['debug', 'info', 'warn', 'error'],
		  level: 'info',

		  // Maps a given level value to the `methodMap` indexes above.
		  lookupLevel: function lookupLevel(level) {
		    if (typeof level === 'string') {
		      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
		      if (levelMap >= 0) {
		        level = levelMap;
		      } else {
		        level = parseInt(level, 10);
		      }
		    }

		    return level;
		  },

		  // Can be overridden in the host environment
		  log: function log(level) {
		    level = logger.lookupLevel(level);

		    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
		      var method = logger.methodMap[level];
		      // eslint-disable-next-line no-console
		      if (!console[method]) {
		        method = 'log';
		      }

		      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		        message[_key - 1] = arguments[_key];
		      }

		      console[method].apply(console, message); // eslint-disable-line no-console
		    }
		  }
		};

		exports$1['default'] = logger;
		module.exports = exports$1['default'];
		
	} (logger, logger.exports));
	return logger.exports;
}

var protoAccess = {};

var createNewLookupObject = {};

var hasRequiredCreateNewLookupObject;

function requireCreateNewLookupObject () {
	if (hasRequiredCreateNewLookupObject) return createNewLookupObject;
	hasRequiredCreateNewLookupObject = 1;

	createNewLookupObject.__esModule = true;
	createNewLookupObject.createNewLookupObject = createNewLookupObject$1;

	var _utils = requireUtils();

	/**
	 * Create a new object with "null"-prototype to avoid truthy results on prototype properties.
	 * The resulting object can be used with "object[property]" to check if a property exists
	 * @param {...object} sources a varargs parameter of source objects that will be merged
	 * @returns {object}
	 */

	function createNewLookupObject$1() {
	  for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
	    sources[_key] = arguments[_key];
	  }

	  return _utils.extend.apply(undefined, [Object.create(null)].concat(sources));
	}
	
	return createNewLookupObject;
}

var hasRequiredProtoAccess;

function requireProtoAccess () {
	if (hasRequiredProtoAccess) return protoAccess;
	hasRequiredProtoAccess = 1;

	protoAccess.__esModule = true;
	protoAccess.createProtoAccessControl = createProtoAccessControl;
	protoAccess.resultIsAllowed = resultIsAllowed;
	protoAccess.resetLoggedProperties = resetLoggedProperties;
	// istanbul ignore next

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _createNewLookupObject = requireCreateNewLookupObject();

	var _logger = requireLogger();

	var logger = _interopRequireWildcard(_logger);

	var loggedProperties = Object.create(null);

	function createProtoAccessControl(runtimeOptions) {
	  var defaultMethodWhiteList = Object.create(null);
	  defaultMethodWhiteList['constructor'] = false;
	  defaultMethodWhiteList['__defineGetter__'] = false;
	  defaultMethodWhiteList['__defineSetter__'] = false;
	  defaultMethodWhiteList['__lookupGetter__'] = false;

	  var defaultPropertyWhiteList = Object.create(null);
	  // eslint-disable-next-line no-proto
	  defaultPropertyWhiteList['__proto__'] = false;

	  return {
	    properties: {
	      whitelist: _createNewLookupObject.createNewLookupObject(defaultPropertyWhiteList, runtimeOptions.allowedProtoProperties),
	      defaultValue: runtimeOptions.allowProtoPropertiesByDefault
	    },
	    methods: {
	      whitelist: _createNewLookupObject.createNewLookupObject(defaultMethodWhiteList, runtimeOptions.allowedProtoMethods),
	      defaultValue: runtimeOptions.allowProtoMethodsByDefault
	    }
	  };
	}

	function resultIsAllowed(result, protoAccessControl, propertyName) {
	  if (typeof result === 'function') {
	    return checkWhiteList(protoAccessControl.methods, propertyName);
	  } else {
	    return checkWhiteList(protoAccessControl.properties, propertyName);
	  }
	}

	function checkWhiteList(protoAccessControlForType, propertyName) {
	  if (protoAccessControlForType.whitelist[propertyName] !== undefined) {
	    return protoAccessControlForType.whitelist[propertyName] === true;
	  }
	  if (protoAccessControlForType.defaultValue !== undefined) {
	    return protoAccessControlForType.defaultValue;
	  }
	  logUnexpecedPropertyAccessOnce(propertyName);
	  return false;
	}

	function logUnexpecedPropertyAccessOnce(propertyName) {
	  if (loggedProperties[propertyName] !== true) {
	    loggedProperties[propertyName] = true;
	    logger.log('error', 'Handlebars: Access has been denied to resolve the property "' + propertyName + '" because it is not an "own property" of its parent.\n' + 'You can add a runtime option to disable the check or this warning:\n' + 'See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details');
	  }
	}

	function resetLoggedProperties() {
	  Object.keys(loggedProperties).forEach(function (propertyName) {
	    delete loggedProperties[propertyName];
	  });
	}
	
	return protoAccess;
}

var hasRequiredBase$1;

function requireBase$1 () {
	if (hasRequiredBase$1) return base$1;
	hasRequiredBase$1 = 1;

	base$1.__esModule = true;
	base$1.HandlebarsEnvironment = HandlebarsEnvironment;
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utils = requireUtils();

	var _exception = requireException();

	var _exception2 = _interopRequireDefault(_exception);

	var _helpers = requireHelpers$1();

	var _decorators = requireDecorators();

	var _logger = requireLogger();

	var _logger2 = _interopRequireDefault(_logger);

	var _internalProtoAccess = requireProtoAccess();

	var VERSION = '4.7.7';
	base$1.VERSION = VERSION;
	var COMPILER_REVISION = 8;
	base$1.COMPILER_REVISION = COMPILER_REVISION;
	var LAST_COMPATIBLE_COMPILER_REVISION = 7;

	base$1.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '== 1.x.x',
	  5: '== 2.0.0-alpha.x',
	  6: '>= 2.0.0-beta.1',
	  7: '>= 4.0.0 <4.3.0',
	  8: '>= 4.3.0'
	};

	base$1.REVISION_CHANGES = REVISION_CHANGES;
	var objectType = '[object Object]';

	function HandlebarsEnvironment(helpers, partials, decorators) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};
	  this.decorators = decorators || {};

	  _helpers.registerDefaultHelpers(this);
	  _decorators.registerDefaultDecorators(this);
	}

	HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,

	  logger: _logger2['default'],
	  log: _logger2['default'].log,

	  registerHelper: function registerHelper(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple helpers');
	      }
	      _utils.extend(this.helpers, name);
	    } else {
	      this.helpers[name] = fn;
	    }
	  },
	  unregisterHelper: function unregisterHelper(name) {
	    delete this.helpers[name];
	  },

	  registerPartial: function registerPartial(name, partial) {
	    if (_utils.toString.call(name) === objectType) {
	      _utils.extend(this.partials, name);
	    } else {
	      if (typeof partial === 'undefined') {
	        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
	      }
	      this.partials[name] = partial;
	    }
	  },
	  unregisterPartial: function unregisterPartial(name) {
	    delete this.partials[name];
	  },

	  registerDecorator: function registerDecorator(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple decorators');
	      }
	      _utils.extend(this.decorators, name);
	    } else {
	      this.decorators[name] = fn;
	    }
	  },
	  unregisterDecorator: function unregisterDecorator(name) {
	    delete this.decorators[name];
	  },
	  /**
	   * Reset the memory of illegal property accesses that have already been logged.
	   * @deprecated should only be used in handlebars test-cases
	   */
	  resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
	    _internalProtoAccess.resetLoggedProperties();
	  }
	};

	var log = _logger2['default'].log;

	base$1.log = log;
	base$1.createFrame = _utils.createFrame;
	base$1.logger = _logger2['default'];
	
	return base$1;
}

var safeString = {exports: {}};

var hasRequiredSafeString;

function requireSafeString () {
	if (hasRequiredSafeString) return safeString.exports;
	hasRequiredSafeString = 1;
	(function (module, exports$1) {

		exports$1.__esModule = true;
		function SafeString(string) {
		  this.string = string;
		}

		SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
		  return '' + this.string;
		};

		exports$1['default'] = SafeString;
		module.exports = exports$1['default'];
		
	} (safeString, safeString.exports));
	return safeString.exports;
}

var runtime = {};

var wrapHelper = {};

var hasRequiredWrapHelper;

function requireWrapHelper () {
	if (hasRequiredWrapHelper) return wrapHelper;
	hasRequiredWrapHelper = 1;

	wrapHelper.__esModule = true;
	wrapHelper.wrapHelper = wrapHelper$1;

	function wrapHelper$1(helper, transformOptionsFn) {
	  if (typeof helper !== 'function') {
	    // This should not happen, but apparently it does in https://github.com/wycats/handlebars.js/issues/1639
	    // We try to make the wrapper least-invasive by not wrapping it, if the helper is not a function.
	    return helper;
	  }
	  var wrapper = function wrapper() /* dynamic arguments */{
	    var options = arguments[arguments.length - 1];
	    arguments[arguments.length - 1] = transformOptionsFn(options);
	    return helper.apply(this, arguments);
	  };
	  return wrapper;
	}
	
	return wrapHelper;
}

var hasRequiredRuntime;

function requireRuntime () {
	if (hasRequiredRuntime) return runtime;
	hasRequiredRuntime = 1;

	runtime.__esModule = true;
	runtime.checkRevision = checkRevision;
	runtime.template = template;
	runtime.wrapProgram = wrapProgram;
	runtime.resolvePartial = resolvePartial;
	runtime.invokePartial = invokePartial;
	runtime.noop = noop;
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	// istanbul ignore next

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _utils = requireUtils();

	var Utils = _interopRequireWildcard(_utils);

	var _exception = requireException();

	var _exception2 = _interopRequireDefault(_exception);

	var _base = requireBase$1();

	var _helpers = requireHelpers$1();

	var _internalWrapHelper = requireWrapHelper();

	var _internalProtoAccess = requireProtoAccess();

	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = _base.COMPILER_REVISION;

	  if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
	    return;
	  }

	  if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
	    var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
	        compilerVersions = _base.REVISION_CHANGES[compilerRevision];
	    throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
	  } else {
	    // Use the embedded version info since the runtime doesn't know about this revision yet
	    throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
	  }
	}

	function template(templateSpec, env) {
	  /* istanbul ignore next */
	  if (!env) {
	    throw new _exception2['default']('No environment passed to template');
	  }
	  if (!templateSpec || !templateSpec.main) {
	    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
	  }

	  templateSpec.main.decorator = templateSpec.main_d;

	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as pseudo-supported APIs.
	  env.VM.checkRevision(templateSpec.compiler);

	  // backwards compatibility for precompiled templates with compiler-version 7 (<4.3.0)
	  var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;

	  function invokePartialWrapper(partial, context, options) {
	    if (options.hash) {
	      context = Utils.extend({}, context, options.hash);
	      if (options.ids) {
	        options.ids[0] = true;
	      }
	    }
	    partial = env.VM.resolvePartial.call(this, partial, context, options);

	    var extendedOptions = Utils.extend({}, options, {
	      hooks: this.hooks,
	      protoAccessControl: this.protoAccessControl
	    });

	    var result = env.VM.invokePartial.call(this, partial, context, extendedOptions);

	    if (result == null && env.compile) {
	      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
	      result = options.partials[options.name](context, extendedOptions);
	    }
	    if (result != null) {
	      if (options.indent) {
	        var lines = result.split('\n');
	        for (var i = 0, l = lines.length; i < l; i++) {
	          if (!lines[i] && i + 1 === l) {
	            break;
	          }

	          lines[i] = options.indent + lines[i];
	        }
	        result = lines.join('\n');
	      }
	      return result;
	    } else {
	      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
	    }
	  }

	  // Just add water
	  var container = {
	    strict: function strict(obj, name, loc) {
	      if (!obj || !(name in obj)) {
	        throw new _exception2['default']('"' + name + '" not defined in ' + obj, {
	          loc: loc
	        });
	      }
	      return container.lookupProperty(obj, name);
	    },
	    lookupProperty: function lookupProperty(parent, propertyName) {
	      var result = parent[propertyName];
	      if (result == null) {
	        return result;
	      }
	      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
	        return result;
	      }

	      if (_internalProtoAccess.resultIsAllowed(result, container.protoAccessControl, propertyName)) {
	        return result;
	      }
	      return undefined;
	    },
	    lookup: function lookup(depths, name) {
	      var len = depths.length;
	      for (var i = 0; i < len; i++) {
	        var result = depths[i] && container.lookupProperty(depths[i], name);
	        if (result != null) {
	          return depths[i][name];
	        }
	      }
	    },
	    lambda: function lambda(current, context) {
	      return typeof current === 'function' ? current.call(context) : current;
	    },

	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,

	    fn: function fn(i) {
	      var ret = templateSpec[i];
	      ret.decorator = templateSpec[i + '_d'];
	      return ret;
	    },

	    programs: [],
	    program: function program(i, data, declaredBlockParams, blockParams, depths) {
	      var programWrapper = this.programs[i],
	          fn = this.fn(i);
	      if (data || depths || blockParams || declaredBlockParams) {
	        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
	      }
	      return programWrapper;
	    },

	    data: function data(value, depth) {
	      while (value && depth--) {
	        value = value._parent;
	      }
	      return value;
	    },
	    mergeIfNeeded: function mergeIfNeeded(param, common) {
	      var obj = param || common;

	      if (param && common && param !== common) {
	        obj = Utils.extend({}, common, param);
	      }

	      return obj;
	    },
	    // An empty object to use as replacement for null-contexts
	    nullContext: Object.seal({}),

	    noop: env.VM.noop,
	    compilerInfo: templateSpec.compiler
	  };

	  function ret(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var data = options.data;

	    ret._setup(options);
	    if (!options.partial && templateSpec.useData) {
	      data = initData(context, data);
	    }
	    var depths = undefined,
	        blockParams = templateSpec.useBlockParams ? [] : undefined;
	    if (templateSpec.useDepths) {
	      if (options.depths) {
	        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
	      } else {
	        depths = [context];
	      }
	    }

	    function main(context /*, options*/) {
	      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
	    }

	    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
	    return main(context, options);
	  }

	  ret.isTop = true;

	  ret._setup = function (options) {
	    if (!options.partial) {
	      var mergedHelpers = Utils.extend({}, env.helpers, options.helpers);
	      wrapHelpersToPassLookupProperty(mergedHelpers, container);
	      container.helpers = mergedHelpers;

	      if (templateSpec.usePartial) {
	        // Use mergeIfNeeded here to prevent compiling global partials multiple times
	        container.partials = container.mergeIfNeeded(options.partials, env.partials);
	      }
	      if (templateSpec.usePartial || templateSpec.useDecorators) {
	        container.decorators = Utils.extend({}, env.decorators, options.decorators);
	      }

	      container.hooks = {};
	      container.protoAccessControl = _internalProtoAccess.createProtoAccessControl(options);

	      var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
	      _helpers.moveHelperToHooks(container, 'helperMissing', keepHelperInHelpers);
	      _helpers.moveHelperToHooks(container, 'blockHelperMissing', keepHelperInHelpers);
	    } else {
	      container.protoAccessControl = options.protoAccessControl; // internal option
	      container.helpers = options.helpers;
	      container.partials = options.partials;
	      container.decorators = options.decorators;
	      container.hooks = options.hooks;
	    }
	  };

	  ret._child = function (i, data, blockParams, depths) {
	    if (templateSpec.useBlockParams && !blockParams) {
	      throw new _exception2['default']('must pass block params');
	    }
	    if (templateSpec.useDepths && !depths) {
	      throw new _exception2['default']('must pass parent depths');
	    }

	    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
	  };
	  return ret;
	}

	function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
	  function prog(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var currentDepths = depths;
	    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
	      currentDepths = [context].concat(depths);
	    }

	    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
	  }

	  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

	  prog.program = i;
	  prog.depth = depths ? depths.length : 0;
	  prog.blockParams = declaredBlockParams || 0;
	  return prog;
	}

	/**
	 * This is currently part of the official API, therefore implementation details should not be changed.
	 */

	function resolvePartial(partial, context, options) {
	  if (!partial) {
	    if (options.name === '@partial-block') {
	      partial = options.data['partial-block'];
	    } else {
	      partial = options.partials[options.name];
	    }
	  } else if (!partial.call && !options.name) {
	    // This is a dynamic partial that returned a string
	    options.name = partial;
	    partial = options.partials[partial];
	  }
	  return partial;
	}

	function invokePartial(partial, context, options) {
	  // Use the current closure context to save the partial-block if this partial
	  var currentPartialBlock = options.data && options.data['partial-block'];
	  options.partial = true;
	  if (options.ids) {
	    options.data.contextPath = options.ids[0] || options.data.contextPath;
	  }

	  var partialBlock = undefined;
	  if (options.fn && options.fn !== noop) {
	    (function () {
	      options.data = _base.createFrame(options.data);
	      // Wrapper function to get access to currentPartialBlock from the closure
	      var fn = options.fn;
	      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        // Restore the partial-block from the closure for the execution of the block
	        // i.e. the part inside the block of the partial call.
	        options.data = _base.createFrame(options.data);
	        options.data['partial-block'] = currentPartialBlock;
	        return fn(context, options);
	      };
	      if (fn.partials) {
	        options.partials = Utils.extend({}, options.partials, fn.partials);
	      }
	    })();
	  }

	  if (partial === undefined && partialBlock) {
	    partial = partialBlock;
	  }

	  if (partial === undefined) {
	    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
	  } else if (partial instanceof Function) {
	    return partial(context, options);
	  }
	}

	function noop() {
	  return '';
	}

	function initData(context, data) {
	  if (!data || !('root' in data)) {
	    data = data ? _base.createFrame(data) : {};
	    data.root = context;
	  }
	  return data;
	}

	function executeDecorators(fn, prog, container, depths, data, blockParams) {
	  if (fn.decorator) {
	    var props = {};
	    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
	    Utils.extend(prog, props);
	  }
	  return prog;
	}

	function wrapHelpersToPassLookupProperty(mergedHelpers, container) {
	  Object.keys(mergedHelpers).forEach(function (helperName) {
	    var helper = mergedHelpers[helperName];
	    mergedHelpers[helperName] = passLookupPropertyOption(helper, container);
	  });
	}

	function passLookupPropertyOption(helper, container) {
	  var lookupProperty = container.lookupProperty;
	  return _internalWrapHelper.wrapHelper(helper, function (options) {
	    return Utils.extend({ lookupProperty: lookupProperty }, options);
	  });
	}
	
	return runtime;
}

var noConflict = {exports: {}};

var hasRequiredNoConflict;

function requireNoConflict () {
	if (hasRequiredNoConflict) return noConflict.exports;
	hasRequiredNoConflict = 1;
	(function (module, exports$1) {

		exports$1.__esModule = true;

		exports$1['default'] = function (Handlebars) {
		  /* istanbul ignore next */
		  var root = typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : window,
		      $Handlebars = root.Handlebars;
		  /* istanbul ignore next */
		  Handlebars.noConflict = function () {
		    if (root.Handlebars === Handlebars) {
		      root.Handlebars = $Handlebars;
		    }
		    return Handlebars;
		  };
		};

		module.exports = exports$1['default'];
		
	} (noConflict, noConflict.exports));
	return noConflict.exports;
}

var hasRequiredHandlebars_runtime;

function requireHandlebars_runtime () {
	if (hasRequiredHandlebars_runtime) return handlebars_runtime.exports;
	hasRequiredHandlebars_runtime = 1;
	(function (module, exports$1) {

		exports$1.__esModule = true;
		// istanbul ignore next

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		// istanbul ignore next

		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

		var _handlebarsBase = requireBase$1();

		var base = _interopRequireWildcard(_handlebarsBase);

		// Each of these augment the Handlebars object. No need to setup here.
		// (This is done to easily share code between commonjs and browse envs)

		var _handlebarsSafeString = requireSafeString();

		var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

		var _handlebarsException = requireException();

		var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

		var _handlebarsUtils = requireUtils();

		var Utils = _interopRequireWildcard(_handlebarsUtils);

		var _handlebarsRuntime = requireRuntime();

		var runtime = _interopRequireWildcard(_handlebarsRuntime);

		var _handlebarsNoConflict = requireNoConflict();

		var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

		// For compatibility and usage outside of module systems, make the Handlebars object a namespace
		function create() {
		  var hb = new base.HandlebarsEnvironment();

		  Utils.extend(hb, base);
		  hb.SafeString = _handlebarsSafeString2['default'];
		  hb.Exception = _handlebarsException2['default'];
		  hb.Utils = Utils;
		  hb.escapeExpression = Utils.escapeExpression;

		  hb.VM = runtime;
		  hb.template = function (spec) {
		    return runtime.template(spec, hb);
		  };

		  return hb;
		}

		var inst = create();
		inst.create = create;

		_handlebarsNoConflict2['default'](inst);

		inst['default'] = inst;

		exports$1['default'] = inst;
		module.exports = exports$1['default'];
		
	} (handlebars_runtime, handlebars_runtime.exports));
	return handlebars_runtime.exports;
}

var ast = {exports: {}};

var hasRequiredAst;

function requireAst () {
	if (hasRequiredAst) return ast.exports;
	hasRequiredAst = 1;
	(function (module, exports$1) {

		exports$1.__esModule = true;
		var AST = {
		  // Public API used to evaluate derived attributes regarding AST nodes
		  helpers: {
		    // a mustache is definitely a helper if:
		    // * it is an eligible helper, and
		    // * it has at least one parameter or hash segment
		    helperExpression: function helperExpression(node) {
		      return node.type === 'SubExpression' || (node.type === 'MustacheStatement' || node.type === 'BlockStatement') && !!(node.params && node.params.length || node.hash);
		    },

		    scopedId: function scopedId(path) {
		      return (/^\.|this\b/.test(path.original)
		      );
		    },

		    // an ID is simple if it only has one part, and that part is not
		    // `..` or `this`.
		    simpleId: function simpleId(path) {
		      return path.parts.length === 1 && !AST.helpers.scopedId(path) && !path.depth;
		    }
		  }
		};

		// Must be exported as an object rather than the root of the module as the jison lexer
		// must modify the object to operate properly.
		exports$1['default'] = AST;
		module.exports = exports$1['default'];
		
	} (ast, ast.exports));
	return ast.exports;
}

var base = {};

var parser = {exports: {}};

var hasRequiredParser;

function requireParser () {
	if (hasRequiredParser) return parser.exports;
	hasRequiredParser = 1;
	(function (module, exports$1) {

		exports$1.__esModule = true;
		var handlebars = (function () {
		    var parser = { trace: function trace() {},
		        yy: {},
		        symbols_: { "error": 2, "root": 3, "program": 4, "EOF": 5, "program_repetition0": 6, "statement": 7, "mustache": 8, "block": 9, "rawBlock": 10, "partial": 11, "partialBlock": 12, "content": 13, "COMMENT": 14, "CONTENT": 15, "openRawBlock": 16, "rawBlock_repetition0": 17, "END_RAW_BLOCK": 18, "OPEN_RAW_BLOCK": 19, "helperName": 20, "openRawBlock_repetition0": 21, "openRawBlock_option0": 22, "CLOSE_RAW_BLOCK": 23, "openBlock": 24, "block_option0": 25, "closeBlock": 26, "openInverse": 27, "block_option1": 28, "OPEN_BLOCK": 29, "openBlock_repetition0": 30, "openBlock_option0": 31, "openBlock_option1": 32, "CLOSE": 33, "OPEN_INVERSE": 34, "openInverse_repetition0": 35, "openInverse_option0": 36, "openInverse_option1": 37, "openInverseChain": 38, "OPEN_INVERSE_CHAIN": 39, "openInverseChain_repetition0": 40, "openInverseChain_option0": 41, "openInverseChain_option1": 42, "inverseAndProgram": 43, "INVERSE": 44, "inverseChain": 45, "inverseChain_option0": 46, "OPEN_ENDBLOCK": 47, "OPEN": 48, "mustache_repetition0": 49, "mustache_option0": 50, "OPEN_UNESCAPED": 51, "mustache_repetition1": 52, "mustache_option1": 53, "CLOSE_UNESCAPED": 54, "OPEN_PARTIAL": 55, "partialName": 56, "partial_repetition0": 57, "partial_option0": 58, "openPartialBlock": 59, "OPEN_PARTIAL_BLOCK": 60, "openPartialBlock_repetition0": 61, "openPartialBlock_option0": 62, "param": 63, "sexpr": 64, "OPEN_SEXPR": 65, "sexpr_repetition0": 66, "sexpr_option0": 67, "CLOSE_SEXPR": 68, "hash": 69, "hash_repetition_plus0": 70, "hashSegment": 71, "ID": 72, "EQUALS": 73, "blockParams": 74, "OPEN_BLOCK_PARAMS": 75, "blockParams_repetition_plus0": 76, "CLOSE_BLOCK_PARAMS": 77, "path": 78, "dataName": 79, "STRING": 80, "NUMBER": 81, "BOOLEAN": 82, "UNDEFINED": 83, "NULL": 84, "DATA": 85, "pathSegments": 86, "SEP": 87, "$accept": 0, "$end": 1 },
		        terminals_: { 2: "error", 5: "EOF", 14: "COMMENT", 15: "CONTENT", 18: "END_RAW_BLOCK", 19: "OPEN_RAW_BLOCK", 23: "CLOSE_RAW_BLOCK", 29: "OPEN_BLOCK", 33: "CLOSE", 34: "OPEN_INVERSE", 39: "OPEN_INVERSE_CHAIN", 44: "INVERSE", 47: "OPEN_ENDBLOCK", 48: "OPEN", 51: "OPEN_UNESCAPED", 54: "CLOSE_UNESCAPED", 55: "OPEN_PARTIAL", 60: "OPEN_PARTIAL_BLOCK", 65: "OPEN_SEXPR", 68: "CLOSE_SEXPR", 72: "ID", 73: "EQUALS", 75: "OPEN_BLOCK_PARAMS", 77: "CLOSE_BLOCK_PARAMS", 80: "STRING", 81: "NUMBER", 82: "BOOLEAN", 83: "UNDEFINED", 84: "NULL", 85: "DATA", 87: "SEP" },
		        productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 0], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
		        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {

		            var $0 = $$.length - 1;
		            switch (yystate) {
		                case 1:
		                    return $$[$0 - 1];
		                case 2:
		                    this.$ = yy.prepareProgram($$[$0]);
		                    break;
		                case 3:
		                    this.$ = $$[$0];
		                    break;
		                case 4:
		                    this.$ = $$[$0];
		                    break;
		                case 5:
		                    this.$ = $$[$0];
		                    break;
		                case 6:
		                    this.$ = $$[$0];
		                    break;
		                case 7:
		                    this.$ = $$[$0];
		                    break;
		                case 8:
		                    this.$ = $$[$0];
		                    break;
		                case 9:
		                    this.$ = {
		                        type: 'CommentStatement',
		                        value: yy.stripComment($$[$0]),
		                        strip: yy.stripFlags($$[$0], $$[$0]),
		                        loc: yy.locInfo(this._$)
		                    };

		                    break;
		                case 10:
		                    this.$ = {
		                        type: 'ContentStatement',
		                        original: $$[$0],
		                        value: $$[$0],
		                        loc: yy.locInfo(this._$)
		                    };

		                    break;
		                case 11:
		                    this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
		                    break;
		                case 12:
		                    this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1] };
		                    break;
		                case 13:
		                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
		                    break;
		                case 14:
		                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
		                    break;
		                case 15:
		                    this.$ = { open: $$[$0 - 5], path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
		                    break;
		                case 16:
		                    this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
		                    break;
		                case 17:
		                    this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
		                    break;
		                case 18:
		                    this.$ = { strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]), program: $$[$0] };
		                    break;
		                case 19:
		                    var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$),
		                        program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
		                    program.chained = true;

		                    this.$ = { strip: $$[$0 - 2].strip, program: program, chain: true };

		                    break;
		                case 20:
		                    this.$ = $$[$0];
		                    break;
		                case 21:
		                    this.$ = { path: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 2], $$[$0]) };
		                    break;
		                case 22:
		                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
		                    break;
		                case 23:
		                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
		                    break;
		                case 24:
		                    this.$ = {
		                        type: 'PartialStatement',
		                        name: $$[$0 - 3],
		                        params: $$[$0 - 2],
		                        hash: $$[$0 - 1],
		                        indent: '',
		                        strip: yy.stripFlags($$[$0 - 4], $$[$0]),
		                        loc: yy.locInfo(this._$)
		                    };

		                    break;
		                case 25:
		                    this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
		                    break;
		                case 26:
		                    this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 4], $$[$0]) };
		                    break;
		                case 27:
		                    this.$ = $$[$0];
		                    break;
		                case 28:
		                    this.$ = $$[$0];
		                    break;
		                case 29:
		                    this.$ = {
		                        type: 'SubExpression',
		                        path: $$[$0 - 3],
		                        params: $$[$0 - 2],
		                        hash: $$[$0 - 1],
		                        loc: yy.locInfo(this._$)
		                    };

		                    break;
		                case 30:
		                    this.$ = { type: 'Hash', pairs: $$[$0], loc: yy.locInfo(this._$) };
		                    break;
		                case 31:
		                    this.$ = { type: 'HashPair', key: yy.id($$[$0 - 2]), value: $$[$0], loc: yy.locInfo(this._$) };
		                    break;
		                case 32:
		                    this.$ = yy.id($$[$0 - 1]);
		                    break;
		                case 33:
		                    this.$ = $$[$0];
		                    break;
		                case 34:
		                    this.$ = $$[$0];
		                    break;
		                case 35:
		                    this.$ = { type: 'StringLiteral', value: $$[$0], original: $$[$0], loc: yy.locInfo(this._$) };
		                    break;
		                case 36:
		                    this.$ = { type: 'NumberLiteral', value: Number($$[$0]), original: Number($$[$0]), loc: yy.locInfo(this._$) };
		                    break;
		                case 37:
		                    this.$ = { type: 'BooleanLiteral', value: $$[$0] === 'true', original: $$[$0] === 'true', loc: yy.locInfo(this._$) };
		                    break;
		                case 38:
		                    this.$ = { type: 'UndefinedLiteral', original: undefined, value: undefined, loc: yy.locInfo(this._$) };
		                    break;
		                case 39:
		                    this.$ = { type: 'NullLiteral', original: null, value: null, loc: yy.locInfo(this._$) };
		                    break;
		                case 40:
		                    this.$ = $$[$0];
		                    break;
		                case 41:
		                    this.$ = $$[$0];
		                    break;
		                case 42:
		                    this.$ = yy.preparePath(true, $$[$0], this._$);
		                    break;
		                case 43:
		                    this.$ = yy.preparePath(false, $$[$0], this._$);
		                    break;
		                case 44:
		                    $$[$0 - 2].push({ part: yy.id($$[$0]), original: $$[$0], separator: $$[$0 - 1] });this.$ = $$[$0 - 2];
		                    break;
		                case 45:
		                    this.$ = [{ part: yy.id($$[$0]), original: $$[$0] }];
		                    break;
		                case 46:
		                    this.$ = [];
		                    break;
		                case 47:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 48:
		                    this.$ = [];
		                    break;
		                case 49:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 50:
		                    this.$ = [];
		                    break;
		                case 51:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 58:
		                    this.$ = [];
		                    break;
		                case 59:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 64:
		                    this.$ = [];
		                    break;
		                case 65:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 70:
		                    this.$ = [];
		                    break;
		                case 71:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 78:
		                    this.$ = [];
		                    break;
		                case 79:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 82:
		                    this.$ = [];
		                    break;
		                case 83:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 86:
		                    this.$ = [];
		                    break;
		                case 87:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 90:
		                    this.$ = [];
		                    break;
		                case 91:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 94:
		                    this.$ = [];
		                    break;
		                case 95:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 98:
		                    this.$ = [$$[$0]];
		                    break;
		                case 99:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 100:
		                    this.$ = [$$[$0]];
		                    break;
		                case 101:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		            }
		        },
		        table: [{ 3: 1, 4: 2, 5: [2, 46], 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: [1, 12], 15: [1, 20], 16: 17, 19: [1, 23], 24: 15, 27: 16, 29: [1, 21], 34: [1, 22], 39: [2, 2], 44: [2, 2], 47: [2, 2], 48: [1, 13], 51: [1, 14], 55: [1, 18], 59: 19, 60: [1, 24] }, { 1: [2, 1] }, { 5: [2, 47], 14: [2, 47], 15: [2, 47], 19: [2, 47], 29: [2, 47], 34: [2, 47], 39: [2, 47], 44: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 55: [2, 47], 60: [2, 47] }, { 5: [2, 3], 14: [2, 3], 15: [2, 3], 19: [2, 3], 29: [2, 3], 34: [2, 3], 39: [2, 3], 44: [2, 3], 47: [2, 3], 48: [2, 3], 51: [2, 3], 55: [2, 3], 60: [2, 3] }, { 5: [2, 4], 14: [2, 4], 15: [2, 4], 19: [2, 4], 29: [2, 4], 34: [2, 4], 39: [2, 4], 44: [2, 4], 47: [2, 4], 48: [2, 4], 51: [2, 4], 55: [2, 4], 60: [2, 4] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 19: [2, 5], 29: [2, 5], 34: [2, 5], 39: [2, 5], 44: [2, 5], 47: [2, 5], 48: [2, 5], 51: [2, 5], 55: [2, 5], 60: [2, 5] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 19: [2, 6], 29: [2, 6], 34: [2, 6], 39: [2, 6], 44: [2, 6], 47: [2, 6], 48: [2, 6], 51: [2, 6], 55: [2, 6], 60: [2, 6] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 19: [2, 7], 29: [2, 7], 34: [2, 7], 39: [2, 7], 44: [2, 7], 47: [2, 7], 48: [2, 7], 51: [2, 7], 55: [2, 7], 60: [2, 7] }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 19: [2, 8], 29: [2, 8], 34: [2, 8], 39: [2, 8], 44: [2, 8], 47: [2, 8], 48: [2, 8], 51: [2, 8], 55: [2, 8], 60: [2, 8] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 19: [2, 9], 29: [2, 9], 34: [2, 9], 39: [2, 9], 44: [2, 9], 47: [2, 9], 48: [2, 9], 51: [2, 9], 55: [2, 9], 60: [2, 9] }, { 20: 25, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 36, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 37, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 4: 38, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 15: [2, 48], 17: 39, 18: [2, 48] }, { 20: 41, 56: 40, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 44, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 18: [2, 10], 19: [2, 10], 29: [2, 10], 34: [2, 10], 39: [2, 10], 44: [2, 10], 47: [2, 10], 48: [2, 10], 51: [2, 10], 55: [2, 10], 60: [2, 10] }, { 20: 45, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 46, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 47, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 41, 56: 48, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [2, 78], 49: 49, 65: [2, 78], 72: [2, 78], 80: [2, 78], 81: [2, 78], 82: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78] }, { 23: [2, 33], 33: [2, 33], 54: [2, 33], 65: [2, 33], 68: [2, 33], 72: [2, 33], 75: [2, 33], 80: [2, 33], 81: [2, 33], 82: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33] }, { 23: [2, 34], 33: [2, 34], 54: [2, 34], 65: [2, 34], 68: [2, 34], 72: [2, 34], 75: [2, 34], 80: [2, 34], 81: [2, 34], 82: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34] }, { 23: [2, 35], 33: [2, 35], 54: [2, 35], 65: [2, 35], 68: [2, 35], 72: [2, 35], 75: [2, 35], 80: [2, 35], 81: [2, 35], 82: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35] }, { 23: [2, 36], 33: [2, 36], 54: [2, 36], 65: [2, 36], 68: [2, 36], 72: [2, 36], 75: [2, 36], 80: [2, 36], 81: [2, 36], 82: [2, 36], 83: [2, 36], 84: [2, 36], 85: [2, 36] }, { 23: [2, 37], 33: [2, 37], 54: [2, 37], 65: [2, 37], 68: [2, 37], 72: [2, 37], 75: [2, 37], 80: [2, 37], 81: [2, 37], 82: [2, 37], 83: [2, 37], 84: [2, 37], 85: [2, 37] }, { 23: [2, 38], 33: [2, 38], 54: [2, 38], 65: [2, 38], 68: [2, 38], 72: [2, 38], 75: [2, 38], 80: [2, 38], 81: [2, 38], 82: [2, 38], 83: [2, 38], 84: [2, 38], 85: [2, 38] }, { 23: [2, 39], 33: [2, 39], 54: [2, 39], 65: [2, 39], 68: [2, 39], 72: [2, 39], 75: [2, 39], 80: [2, 39], 81: [2, 39], 82: [2, 39], 83: [2, 39], 84: [2, 39], 85: [2, 39] }, { 23: [2, 43], 33: [2, 43], 54: [2, 43], 65: [2, 43], 68: [2, 43], 72: [2, 43], 75: [2, 43], 80: [2, 43], 81: [2, 43], 82: [2, 43], 83: [2, 43], 84: [2, 43], 85: [2, 43], 87: [1, 50] }, { 72: [1, 35], 86: 51 }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 52: 52, 54: [2, 82], 65: [2, 82], 72: [2, 82], 80: [2, 82], 81: [2, 82], 82: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82] }, { 25: 53, 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 54, 47: [2, 54] }, { 28: 59, 43: 60, 44: [1, 58], 47: [2, 56] }, { 13: 62, 15: [1, 20], 18: [1, 61] }, { 33: [2, 86], 57: 63, 65: [2, 86], 72: [2, 86], 80: [2, 86], 81: [2, 86], 82: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86] }, { 33: [2, 40], 65: [2, 40], 72: [2, 40], 80: [2, 40], 81: [2, 40], 82: [2, 40], 83: [2, 40], 84: [2, 40], 85: [2, 40] }, { 33: [2, 41], 65: [2, 41], 72: [2, 41], 80: [2, 41], 81: [2, 41], 82: [2, 41], 83: [2, 41], 84: [2, 41], 85: [2, 41] }, { 20: 64, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 65, 47: [1, 66] }, { 30: 67, 33: [2, 58], 65: [2, 58], 72: [2, 58], 75: [2, 58], 80: [2, 58], 81: [2, 58], 82: [2, 58], 83: [2, 58], 84: [2, 58], 85: [2, 58] }, { 33: [2, 64], 35: 68, 65: [2, 64], 72: [2, 64], 75: [2, 64], 80: [2, 64], 81: [2, 64], 82: [2, 64], 83: [2, 64], 84: [2, 64], 85: [2, 64] }, { 21: 69, 23: [2, 50], 65: [2, 50], 72: [2, 50], 80: [2, 50], 81: [2, 50], 82: [2, 50], 83: [2, 50], 84: [2, 50], 85: [2, 50] }, { 33: [2, 90], 61: 70, 65: [2, 90], 72: [2, 90], 80: [2, 90], 81: [2, 90], 82: [2, 90], 83: [2, 90], 84: [2, 90], 85: [2, 90] }, { 20: 74, 33: [2, 80], 50: 71, 63: 72, 64: 75, 65: [1, 43], 69: 73, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 72: [1, 79] }, { 23: [2, 42], 33: [2, 42], 54: [2, 42], 65: [2, 42], 68: [2, 42], 72: [2, 42], 75: [2, 42], 80: [2, 42], 81: [2, 42], 82: [2, 42], 83: [2, 42], 84: [2, 42], 85: [2, 42], 87: [1, 50] }, { 20: 74, 53: 80, 54: [2, 84], 63: 81, 64: 75, 65: [1, 43], 69: 82, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 83, 47: [1, 66] }, { 47: [2, 55] }, { 4: 84, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 47: [2, 20] }, { 20: 85, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 86, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 26: 87, 47: [1, 66] }, { 47: [2, 57] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 19: [2, 11], 29: [2, 11], 34: [2, 11], 39: [2, 11], 44: [2, 11], 47: [2, 11], 48: [2, 11], 51: [2, 11], 55: [2, 11], 60: [2, 11] }, { 15: [2, 49], 18: [2, 49] }, { 20: 74, 33: [2, 88], 58: 88, 63: 89, 64: 75, 65: [1, 43], 69: 90, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 65: [2, 94], 66: 91, 68: [2, 94], 72: [2, 94], 80: [2, 94], 81: [2, 94], 82: [2, 94], 83: [2, 94], 84: [2, 94], 85: [2, 94] }, { 5: [2, 25], 14: [2, 25], 15: [2, 25], 19: [2, 25], 29: [2, 25], 34: [2, 25], 39: [2, 25], 44: [2, 25], 47: [2, 25], 48: [2, 25], 51: [2, 25], 55: [2, 25], 60: [2, 25] }, { 20: 92, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 31: 93, 33: [2, 60], 63: 94, 64: 75, 65: [1, 43], 69: 95, 70: 76, 71: 77, 72: [1, 78], 75: [2, 60], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 66], 36: 96, 63: 97, 64: 75, 65: [1, 43], 69: 98, 70: 76, 71: 77, 72: [1, 78], 75: [2, 66], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 22: 99, 23: [2, 52], 63: 100, 64: 75, 65: [1, 43], 69: 101, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 92], 62: 102, 63: 103, 64: 75, 65: [1, 43], 69: 104, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 105] }, { 33: [2, 79], 65: [2, 79], 72: [2, 79], 80: [2, 79], 81: [2, 79], 82: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79] }, { 33: [2, 81] }, { 23: [2, 27], 33: [2, 27], 54: [2, 27], 65: [2, 27], 68: [2, 27], 72: [2, 27], 75: [2, 27], 80: [2, 27], 81: [2, 27], 82: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27] }, { 23: [2, 28], 33: [2, 28], 54: [2, 28], 65: [2, 28], 68: [2, 28], 72: [2, 28], 75: [2, 28], 80: [2, 28], 81: [2, 28], 82: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28] }, { 23: [2, 30], 33: [2, 30], 54: [2, 30], 68: [2, 30], 71: 106, 72: [1, 107], 75: [2, 30] }, { 23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98] }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 73: [1, 108], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 23: [2, 44], 33: [2, 44], 54: [2, 44], 65: [2, 44], 68: [2, 44], 72: [2, 44], 75: [2, 44], 80: [2, 44], 81: [2, 44], 82: [2, 44], 83: [2, 44], 84: [2, 44], 85: [2, 44], 87: [2, 44] }, { 54: [1, 109] }, { 54: [2, 83], 65: [2, 83], 72: [2, 83], 80: [2, 83], 81: [2, 83], 82: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83] }, { 54: [2, 85] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 19: [2, 13], 29: [2, 13], 34: [2, 13], 39: [2, 13], 44: [2, 13], 47: [2, 13], 48: [2, 13], 51: [2, 13], 55: [2, 13], 60: [2, 13] }, { 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 111, 46: 110, 47: [2, 76] }, { 33: [2, 70], 40: 112, 65: [2, 70], 72: [2, 70], 75: [2, 70], 80: [2, 70], 81: [2, 70], 82: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70] }, { 47: [2, 18] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 19: [2, 14], 29: [2, 14], 34: [2, 14], 39: [2, 14], 44: [2, 14], 47: [2, 14], 48: [2, 14], 51: [2, 14], 55: [2, 14], 60: [2, 14] }, { 33: [1, 113] }, { 33: [2, 87], 65: [2, 87], 72: [2, 87], 80: [2, 87], 81: [2, 87], 82: [2, 87], 83: [2, 87], 84: [2, 87], 85: [2, 87] }, { 33: [2, 89] }, { 20: 74, 63: 115, 64: 75, 65: [1, 43], 67: 114, 68: [2, 96], 69: 116, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 117] }, { 32: 118, 33: [2, 62], 74: 119, 75: [1, 120] }, { 33: [2, 59], 65: [2, 59], 72: [2, 59], 75: [2, 59], 80: [2, 59], 81: [2, 59], 82: [2, 59], 83: [2, 59], 84: [2, 59], 85: [2, 59] }, { 33: [2, 61], 75: [2, 61] }, { 33: [2, 68], 37: 121, 74: 122, 75: [1, 120] }, { 33: [2, 65], 65: [2, 65], 72: [2, 65], 75: [2, 65], 80: [2, 65], 81: [2, 65], 82: [2, 65], 83: [2, 65], 84: [2, 65], 85: [2, 65] }, { 33: [2, 67], 75: [2, 67] }, { 23: [1, 123] }, { 23: [2, 51], 65: [2, 51], 72: [2, 51], 80: [2, 51], 81: [2, 51], 82: [2, 51], 83: [2, 51], 84: [2, 51], 85: [2, 51] }, { 23: [2, 53] }, { 33: [1, 124] }, { 33: [2, 91], 65: [2, 91], 72: [2, 91], 80: [2, 91], 81: [2, 91], 82: [2, 91], 83: [2, 91], 84: [2, 91], 85: [2, 91] }, { 33: [2, 93] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 19: [2, 22], 29: [2, 22], 34: [2, 22], 39: [2, 22], 44: [2, 22], 47: [2, 22], 48: [2, 22], 51: [2, 22], 55: [2, 22], 60: [2, 22] }, { 23: [2, 99], 33: [2, 99], 54: [2, 99], 68: [2, 99], 72: [2, 99], 75: [2, 99] }, { 73: [1, 108] }, { 20: 74, 63: 125, 64: 75, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 19: [2, 23], 29: [2, 23], 34: [2, 23], 39: [2, 23], 44: [2, 23], 47: [2, 23], 48: [2, 23], 51: [2, 23], 55: [2, 23], 60: [2, 23] }, { 47: [2, 19] }, { 47: [2, 77] }, { 20: 74, 33: [2, 72], 41: 126, 63: 127, 64: 75, 65: [1, 43], 69: 128, 70: 76, 71: 77, 72: [1, 78], 75: [2, 72], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 24], 14: [2, 24], 15: [2, 24], 19: [2, 24], 29: [2, 24], 34: [2, 24], 39: [2, 24], 44: [2, 24], 47: [2, 24], 48: [2, 24], 51: [2, 24], 55: [2, 24], 60: [2, 24] }, { 68: [1, 129] }, { 65: [2, 95], 68: [2, 95], 72: [2, 95], 80: [2, 95], 81: [2, 95], 82: [2, 95], 83: [2, 95], 84: [2, 95], 85: [2, 95] }, { 68: [2, 97] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 19: [2, 21], 29: [2, 21], 34: [2, 21], 39: [2, 21], 44: [2, 21], 47: [2, 21], 48: [2, 21], 51: [2, 21], 55: [2, 21], 60: [2, 21] }, { 33: [1, 130] }, { 33: [2, 63] }, { 72: [1, 132], 76: 131 }, { 33: [1, 133] }, { 33: [2, 69] }, { 15: [2, 12], 18: [2, 12] }, { 14: [2, 26], 15: [2, 26], 19: [2, 26], 29: [2, 26], 34: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 55: [2, 26], 60: [2, 26] }, { 23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31] }, { 33: [2, 74], 42: 134, 74: 135, 75: [1, 120] }, { 33: [2, 71], 65: [2, 71], 72: [2, 71], 75: [2, 71], 80: [2, 71], 81: [2, 71], 82: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71] }, { 33: [2, 73], 75: [2, 73] }, { 23: [2, 29], 33: [2, 29], 54: [2, 29], 65: [2, 29], 68: [2, 29], 72: [2, 29], 75: [2, 29], 80: [2, 29], 81: [2, 29], 82: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29] }, { 14: [2, 15], 15: [2, 15], 19: [2, 15], 29: [2, 15], 34: [2, 15], 39: [2, 15], 44: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 55: [2, 15], 60: [2, 15] }, { 72: [1, 137], 77: [1, 136] }, { 72: [2, 100], 77: [2, 100] }, { 14: [2, 16], 15: [2, 16], 19: [2, 16], 29: [2, 16], 34: [2, 16], 44: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 55: [2, 16], 60: [2, 16] }, { 33: [1, 138] }, { 33: [2, 75] }, { 33: [2, 32] }, { 72: [2, 101], 77: [2, 101] }, { 14: [2, 17], 15: [2, 17], 19: [2, 17], 29: [2, 17], 34: [2, 17], 39: [2, 17], 44: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 55: [2, 17], 60: [2, 17] }],
		        defaultActions: { 4: [2, 1], 54: [2, 55], 56: [2, 20], 60: [2, 57], 73: [2, 81], 82: [2, 85], 86: [2, 18], 90: [2, 89], 101: [2, 53], 104: [2, 93], 110: [2, 19], 111: [2, 77], 116: [2, 97], 119: [2, 63], 122: [2, 69], 135: [2, 75], 136: [2, 32] },
		        parseError: function parseError(str, hash) {
		            throw new Error(str);
		        },
		        parse: function parse(input) {
		            var self = this,
		                stack = [0],
		                vstack = [null],
		                lstack = [],
		                table = this.table,
		                yytext = "",
		                yylineno = 0,
		                yyleng = 0;
		            this.lexer.setInput(input);
		            this.lexer.yy = this.yy;
		            this.yy.lexer = this.lexer;
		            this.yy.parser = this;
		            if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
		            var yyloc = this.lexer.yylloc;
		            lstack.push(yyloc);
		            var ranges = this.lexer.options && this.lexer.options.ranges;
		            if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
		            function lex() {
		                var token;
		                token = self.lexer.lex() || 1;
		                if (typeof token !== "number") {
		                    token = self.symbols_[token] || token;
		                }
		                return token;
		            }
		            var symbol,
		                state,
		                action,
		                r,
		                yyval = {},
		                p,
		                len,
		                newState,
		                expected;
		            while (true) {
		                state = stack[stack.length - 1];
		                if (this.defaultActions[state]) {
		                    action = this.defaultActions[state];
		                } else {
		                    if (symbol === null || typeof symbol == "undefined") {
		                        symbol = lex();
		                    }
		                    action = table[state] && table[state][symbol];
		                }
		                if (typeof action === "undefined" || !action.length || !action[0]) {
		                    var errStr = "";
		                    {
		                        expected = [];
		                        for (p in table[state]) if (this.terminals_[p] && p > 2) {
		                            expected.push("'" + this.terminals_[p] + "'");
		                        }
		                        if (this.lexer.showPosition) {
		                            errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
		                        } else {
		                            errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
		                        }
		                        this.parseError(errStr, { text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected });
		                    }
		                }
		                if (action[0] instanceof Array && action.length > 1) {
		                    throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
		                }
		                switch (action[0]) {
		                    case 1:
		                        stack.push(symbol);
		                        vstack.push(this.lexer.yytext);
		                        lstack.push(this.lexer.yylloc);
		                        stack.push(action[1]);
		                        symbol = null;
		                        {
		                            yyleng = this.lexer.yyleng;
		                            yytext = this.lexer.yytext;
		                            yylineno = this.lexer.yylineno;
		                            yyloc = this.lexer.yylloc;
		                        }
		                        break;
		                    case 2:
		                        len = this.productions_[action[1]][1];
		                        yyval.$ = vstack[vstack.length - len];
		                        yyval._$ = { first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column };
		                        if (ranges) {
		                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
		                        }
		                        r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
		                        if (typeof r !== "undefined") {
		                            return r;
		                        }
		                        if (len) {
		                            stack = stack.slice(0, -1 * len * 2);
		                            vstack = vstack.slice(0, -1 * len);
		                            lstack = lstack.slice(0, -1 * len);
		                        }
		                        stack.push(this.productions_[action[1]][0]);
		                        vstack.push(yyval.$);
		                        lstack.push(yyval._$);
		                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
		                        stack.push(newState);
		                        break;
		                    case 3:
		                        return true;
		                }
		            }
		            return true;
		        }
		    };
		    /* Jison generated lexer */
		    var lexer = (function () {
		        var lexer = { EOF: 1,
		            parseError: function parseError(str, hash) {
		                if (this.yy.parser) {
		                    this.yy.parser.parseError(str, hash);
		                } else {
		                    throw new Error(str);
		                }
		            },
		            setInput: function setInput(input) {
		                this._input = input;
		                this._more = this._less = this.done = false;
		                this.yylineno = this.yyleng = 0;
		                this.yytext = this.matched = this.match = '';
		                this.conditionStack = ['INITIAL'];
		                this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
		                if (this.options.ranges) this.yylloc.range = [0, 0];
		                this.offset = 0;
		                return this;
		            },
		            input: function input() {
		                var ch = this._input[0];
		                this.yytext += ch;
		                this.yyleng++;
		                this.offset++;
		                this.match += ch;
		                this.matched += ch;
		                var lines = ch.match(/(?:\r\n?|\n).*/g);
		                if (lines) {
		                    this.yylineno++;
		                    this.yylloc.last_line++;
		                } else {
		                    this.yylloc.last_column++;
		                }
		                if (this.options.ranges) this.yylloc.range[1]++;

		                this._input = this._input.slice(1);
		                return ch;
		            },
		            unput: function unput(ch) {
		                var len = ch.length;
		                var lines = ch.split(/(?:\r\n?|\n)/g);

		                this._input = ch + this._input;
		                this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
		                //this.yyleng -= len;
		                this.offset -= len;
		                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
		                this.match = this.match.substr(0, this.match.length - 1);
		                this.matched = this.matched.substr(0, this.matched.length - 1);

		                if (lines.length - 1) this.yylineno -= lines.length - 1;
		                var r = this.yylloc.range;

		                this.yylloc = { first_line: this.yylloc.first_line,
		                    last_line: this.yylineno + 1,
		                    first_column: this.yylloc.first_column,
		                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
		                };

		                if (this.options.ranges) {
		                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
		                }
		                return this;
		            },
		            more: function more() {
		                this._more = true;
		                return this;
		            },
		            less: function less(n) {
		                this.unput(this.match.slice(n));
		            },
		            pastInput: function pastInput() {
		                var past = this.matched.substr(0, this.matched.length - this.match.length);
		                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
		            },
		            upcomingInput: function upcomingInput() {
		                var next = this.match;
		                if (next.length < 20) {
		                    next += this._input.substr(0, 20 - next.length);
		                }
		                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
		            },
		            showPosition: function showPosition() {
		                var pre = this.pastInput();
		                var c = new Array(pre.length + 1).join("-");
		                return pre + this.upcomingInput() + "\n" + c + "^";
		            },
		            next: function next() {
		                if (this.done) {
		                    return this.EOF;
		                }
		                if (!this._input) this.done = true;

		                var token, match, tempMatch, index, lines;
		                if (!this._more) {
		                    this.yytext = '';
		                    this.match = '';
		                }
		                var rules = this._currentRules();
		                for (var i = 0; i < rules.length; i++) {
		                    tempMatch = this._input.match(this.rules[rules[i]]);
		                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
		                        match = tempMatch;
		                        index = i;
		                        if (!this.options.flex) break;
		                    }
		                }
		                if (match) {
		                    lines = match[0].match(/(?:\r\n?|\n).*/g);
		                    if (lines) this.yylineno += lines.length;
		                    this.yylloc = { first_line: this.yylloc.last_line,
		                        last_line: this.yylineno + 1,
		                        first_column: this.yylloc.last_column,
		                        last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length };
		                    this.yytext += match[0];
		                    this.match += match[0];
		                    this.matches = match;
		                    this.yyleng = this.yytext.length;
		                    if (this.options.ranges) {
		                        this.yylloc.range = [this.offset, this.offset += this.yyleng];
		                    }
		                    this._more = false;
		                    this._input = this._input.slice(match[0].length);
		                    this.matched += match[0];
		                    token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
		                    if (this.done && this._input) this.done = false;
		                    if (token) return token;else return;
		                }
		                if (this._input === "") {
		                    return this.EOF;
		                } else {
		                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), { text: "", token: null, line: this.yylineno });
		                }
		            },
		            lex: function lex() {
		                var r = this.next();
		                if (typeof r !== 'undefined') {
		                    return r;
		                } else {
		                    return this.lex();
		                }
		            },
		            begin: function begin(condition) {
		                this.conditionStack.push(condition);
		            },
		            popState: function popState() {
		                return this.conditionStack.pop();
		            },
		            _currentRules: function _currentRules() {
		                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
		            },
		            topState: function topState() {
		                return this.conditionStack[this.conditionStack.length - 2];
		            },
		            pushState: function begin(condition) {
		                this.begin(condition);
		            } };
		        lexer.options = {};
		        lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {

		            function strip(start, end) {
		                return yy_.yytext = yy_.yytext.substring(start, yy_.yyleng - end + start);
		            }
		            switch ($avoiding_name_collisions) {
		                case 0:
		                    if (yy_.yytext.slice(-2) === "\\\\") {
		                        strip(0, 1);
		                        this.begin("mu");
		                    } else if (yy_.yytext.slice(-1) === "\\") {
		                        strip(0, 1);
		                        this.begin("emu");
		                    } else {
		                        this.begin("mu");
		                    }
		                    if (yy_.yytext) return 15;

		                    break;
		                case 1:
		                    return 15;
		                case 2:
		                    this.popState();
		                    return 15;
		                case 3:
		                    this.begin('raw');return 15;
		                case 4:
		                    this.popState();
		                    // Should be using `this.topState()` below, but it currently
		                    // returns the second top instead of the first top. Opened an
		                    // issue about it at https://github.com/zaach/jison/issues/291
		                    if (this.conditionStack[this.conditionStack.length - 1] === 'raw') {
		                        return 15;
		                    } else {
		                        strip(5, 9);
		                        return 'END_RAW_BLOCK';
		                    }
		                case 5:
		                    return 15;
		                case 6:
		                    this.popState();
		                    return 14;
		                case 7:
		                    return 65;
		                case 8:
		                    return 68;
		                case 9:
		                    return 19;
		                case 10:
		                    this.popState();
		                    this.begin('raw');
		                    return 23;
		                case 11:
		                    return 55;
		                case 12:
		                    return 60;
		                case 13:
		                    return 29;
		                case 14:
		                    return 47;
		                case 15:
		                    this.popState();return 44;
		                case 16:
		                    this.popState();return 44;
		                case 17:
		                    return 34;
		                case 18:
		                    return 39;
		                case 19:
		                    return 51;
		                case 20:
		                    return 48;
		                case 21:
		                    this.unput(yy_.yytext);
		                    this.popState();
		                    this.begin('com');

		                    break;
		                case 22:
		                    this.popState();
		                    return 14;
		                case 23:
		                    return 48;
		                case 24:
		                    return 73;
		                case 25:
		                    return 72;
		                case 26:
		                    return 72;
		                case 27:
		                    return 87;
		                case 28:
		                    // ignore whitespace
		                    break;
		                case 29:
		                    this.popState();return 54;
		                case 30:
		                    this.popState();return 33;
		                case 31:
		                    yy_.yytext = strip(1, 2).replace(/\\"/g, '"');return 80;
		                case 32:
		                    yy_.yytext = strip(1, 2).replace(/\\'/g, "'");return 80;
		                case 33:
		                    return 85;
		                case 34:
		                    return 82;
		                case 35:
		                    return 82;
		                case 36:
		                    return 83;
		                case 37:
		                    return 84;
		                case 38:
		                    return 81;
		                case 39:
		                    return 75;
		                case 40:
		                    return 77;
		                case 41:
		                    return 72;
		                case 42:
		                    yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, '$1');return 72;
		                case 43:
		                    return 'INVALID';
		                case 44:
		                    return 5;
		            }
		        };
		        lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]+?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/];
		        lexer.conditions = { "mu": { "rules": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], "inclusive": false }, "emu": { "rules": [2], "inclusive": false }, "com": { "rules": [6], "inclusive": false }, "raw": { "rules": [3, 4, 5], "inclusive": false }, "INITIAL": { "rules": [0, 1, 44], "inclusive": true } };
		        return lexer;
		    })();
		    parser.lexer = lexer;
		    function Parser() {
		        this.yy = {};
		    }Parser.prototype = parser;parser.Parser = Parser;
		    return new Parser();
		})();exports$1["default"] = handlebars;
		module.exports = exports$1["default"];
		
	} (parser, parser.exports));
	return parser.exports;
}

var whitespaceControl = {exports: {}};

var visitor = {exports: {}};

var hasRequiredVisitor;

function requireVisitor () {
	if (hasRequiredVisitor) return visitor.exports;
	hasRequiredVisitor = 1;
	(function (module, exports$1) {

		exports$1.__esModule = true;
		// istanbul ignore next

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		var _exception = requireException();

		var _exception2 = _interopRequireDefault(_exception);

		function Visitor() {
		  this.parents = [];
		}

		Visitor.prototype = {
		  constructor: Visitor,
		  mutating: false,

		  // Visits a given value. If mutating, will replace the value if necessary.
		  acceptKey: function acceptKey(node, name) {
		    var value = this.accept(node[name]);
		    if (this.mutating) {
		      // Hacky sanity check: This may have a few false positives for type for the helper
		      // methods but will generally do the right thing without a lot of overhead.
		      if (value && !Visitor.prototype[value.type]) {
		        throw new _exception2['default']('Unexpected node type "' + value.type + '" found when accepting ' + name + ' on ' + node.type);
		      }
		      node[name] = value;
		    }
		  },

		  // Performs an accept operation with added sanity check to ensure
		  // required keys are not removed.
		  acceptRequired: function acceptRequired(node, name) {
		    this.acceptKey(node, name);

		    if (!node[name]) {
		      throw new _exception2['default'](node.type + ' requires ' + name);
		    }
		  },

		  // Traverses a given array. If mutating, empty respnses will be removed
		  // for child elements.
		  acceptArray: function acceptArray(array) {
		    for (var i = 0, l = array.length; i < l; i++) {
		      this.acceptKey(array, i);

		      if (!array[i]) {
		        array.splice(i, 1);
		        i--;
		        l--;
		      }
		    }
		  },

		  accept: function accept(object) {
		    if (!object) {
		      return;
		    }

		    /* istanbul ignore next: Sanity code */
		    if (!this[object.type]) {
		      throw new _exception2['default']('Unknown type: ' + object.type, object);
		    }

		    if (this.current) {
		      this.parents.unshift(this.current);
		    }
		    this.current = object;

		    var ret = this[object.type](object);

		    this.current = this.parents.shift();

		    if (!this.mutating || ret) {
		      return ret;
		    } else if (ret !== false) {
		      return object;
		    }
		  },

		  Program: function Program(program) {
		    this.acceptArray(program.body);
		  },

		  MustacheStatement: visitSubExpression,
		  Decorator: visitSubExpression,

		  BlockStatement: visitBlock,
		  DecoratorBlock: visitBlock,

		  PartialStatement: visitPartial,
		  PartialBlockStatement: function PartialBlockStatement(partial) {
		    visitPartial.call(this, partial);

		    this.acceptKey(partial, 'program');
		  },

		  ContentStatement: function ContentStatement() /* content */{},
		  CommentStatement: function CommentStatement() /* comment */{},

		  SubExpression: visitSubExpression,

		  PathExpression: function PathExpression() /* path */{},

		  StringLiteral: function StringLiteral() /* string */{},
		  NumberLiteral: function NumberLiteral() /* number */{},
		  BooleanLiteral: function BooleanLiteral() /* bool */{},
		  UndefinedLiteral: function UndefinedLiteral() /* literal */{},
		  NullLiteral: function NullLiteral() /* literal */{},

		  Hash: function Hash(hash) {
		    this.acceptArray(hash.pairs);
		  },
		  HashPair: function HashPair(pair) {
		    this.acceptRequired(pair, 'value');
		  }
		};

		function visitSubExpression(mustache) {
		  this.acceptRequired(mustache, 'path');
		  this.acceptArray(mustache.params);
		  this.acceptKey(mustache, 'hash');
		}
		function visitBlock(block) {
		  visitSubExpression.call(this, block);

		  this.acceptKey(block, 'program');
		  this.acceptKey(block, 'inverse');
		}
		function visitPartial(partial) {
		  this.acceptRequired(partial, 'name');
		  this.acceptArray(partial.params);
		  this.acceptKey(partial, 'hash');
		}

		exports$1['default'] = Visitor;
		module.exports = exports$1['default'];
		
	} (visitor, visitor.exports));
	return visitor.exports;
}

var hasRequiredWhitespaceControl;

function requireWhitespaceControl () {
	if (hasRequiredWhitespaceControl) return whitespaceControl.exports;
	hasRequiredWhitespaceControl = 1;
	(function (module, exports$1) {

		exports$1.__esModule = true;
		// istanbul ignore next

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		var _visitor = requireVisitor();

		var _visitor2 = _interopRequireDefault(_visitor);

		function WhitespaceControl() {
		  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		  this.options = options;
		}
		WhitespaceControl.prototype = new _visitor2['default']();

		WhitespaceControl.prototype.Program = function (program) {
		  var doStandalone = !this.options.ignoreStandalone;

		  var isRoot = !this.isRootSeen;
		  this.isRootSeen = true;

		  var body = program.body;
		  for (var i = 0, l = body.length; i < l; i++) {
		    var current = body[i],
		        strip = this.accept(current);

		    if (!strip) {
		      continue;
		    }

		    var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot),
		        _isNextWhitespace = isNextWhitespace(body, i, isRoot),
		        openStandalone = strip.openStandalone && _isPrevWhitespace,
		        closeStandalone = strip.closeStandalone && _isNextWhitespace,
		        inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;

		    if (strip.close) {
		      omitRight(body, i, true);
		    }
		    if (strip.open) {
		      omitLeft(body, i, true);
		    }

		    if (doStandalone && inlineStandalone) {
		      omitRight(body, i);

		      if (omitLeft(body, i)) {
		        // If we are on a standalone node, save the indent info for partials
		        if (current.type === 'PartialStatement') {
		          // Pull out the whitespace from the final line
		          current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
		        }
		      }
		    }
		    if (doStandalone && openStandalone) {
		      omitRight((current.program || current.inverse).body);

		      // Strip out the previous content node if it's whitespace only
		      omitLeft(body, i);
		    }
		    if (doStandalone && closeStandalone) {
		      // Always strip the next node
		      omitRight(body, i);

		      omitLeft((current.inverse || current.program).body);
		    }
		  }

		  return program;
		};

		WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function (block) {
		  this.accept(block.program);
		  this.accept(block.inverse);

		  // Find the inverse program that is involed with whitespace stripping.
		  var program = block.program || block.inverse,
		      inverse = block.program && block.inverse,
		      firstInverse = inverse,
		      lastInverse = inverse;

		  if (inverse && inverse.chained) {
		    firstInverse = inverse.body[0].program;

		    // Walk the inverse chain to find the last inverse that is actually in the chain.
		    while (lastInverse.chained) {
		      lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
		    }
		  }

		  var strip = {
		    open: block.openStrip.open,
		    close: block.closeStrip.close,

		    // Determine the standalone candiacy. Basically flag our content as being possibly standalone
		    // so our parent can determine if we actually are standalone
		    openStandalone: isNextWhitespace(program.body),
		    closeStandalone: isPrevWhitespace((firstInverse || program).body)
		  };

		  if (block.openStrip.close) {
		    omitRight(program.body, null, true);
		  }

		  if (inverse) {
		    var inverseStrip = block.inverseStrip;

		    if (inverseStrip.open) {
		      omitLeft(program.body, null, true);
		    }

		    if (inverseStrip.close) {
		      omitRight(firstInverse.body, null, true);
		    }
		    if (block.closeStrip.open) {
		      omitLeft(lastInverse.body, null, true);
		    }

		    // Find standalone else statments
		    if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
		      omitLeft(program.body);
		      omitRight(firstInverse.body);
		    }
		  } else if (block.closeStrip.open) {
		    omitLeft(program.body, null, true);
		  }

		  return strip;
		};

		WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function (mustache) {
		  return mustache.strip;
		};

		WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function (node) {
		  /* istanbul ignore next */
		  var strip = node.strip || {};
		  return {
		    inlineStandalone: true,
		    open: strip.open,
		    close: strip.close
		  };
		};

		function isPrevWhitespace(body, i, isRoot) {
		  if (i === undefined) {
		    i = body.length;
		  }

		  // Nodes that end with newlines are considered whitespace (but are special
		  // cased for strip operations)
		  var prev = body[i - 1],
		      sibling = body[i - 2];
		  if (!prev) {
		    return isRoot;
		  }

		  if (prev.type === 'ContentStatement') {
		    return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
		  }
		}
		function isNextWhitespace(body, i, isRoot) {
		  if (i === undefined) {
		    i = -1;
		  }

		  var next = body[i + 1],
		      sibling = body[i + 2];
		  if (!next) {
		    return isRoot;
		  }

		  if (next.type === 'ContentStatement') {
		    return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
		  }
		}

		// Marks the node to the right of the position as omitted.
		// I.e. {{foo}}' ' will mark the ' ' node as omitted.
		//
		// If i is undefined, then the first child will be marked as such.
		//
		// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
		// content is met.
		function omitRight(body, i, multiple) {
		  var current = body[i == null ? 0 : i + 1];
		  if (!current || current.type !== 'ContentStatement' || !multiple && current.rightStripped) {
		    return;
		  }

		  var original = current.value;
		  current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, '');
		  current.rightStripped = current.value !== original;
		}

		// Marks the node to the left of the position as omitted.
		// I.e. ' '{{foo}} will mark the ' ' node as omitted.
		//
		// If i is undefined then the last child will be marked as such.
		//
		// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
		// content is met.
		function omitLeft(body, i, multiple) {
		  var current = body[i == null ? body.length - 1 : i - 1];
		  if (!current || current.type !== 'ContentStatement' || !multiple && current.leftStripped) {
		    return;
		  }

		  // We omit the last node if it's whitespace only and not preceded by a non-content node.
		  var original = current.value;
		  current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, '');
		  current.leftStripped = current.value !== original;
		  return current.leftStripped;
		}

		exports$1['default'] = WhitespaceControl;
		module.exports = exports$1['default'];
		
	} (whitespaceControl, whitespaceControl.exports));
	return whitespaceControl.exports;
}

var helpers = {};

var hasRequiredHelpers;

function requireHelpers () {
	if (hasRequiredHelpers) return helpers;
	hasRequiredHelpers = 1;

	helpers.__esModule = true;
	helpers.SourceLocation = SourceLocation;
	helpers.id = id;
	helpers.stripFlags = stripFlags;
	helpers.stripComment = stripComment;
	helpers.preparePath = preparePath;
	helpers.prepareMustache = prepareMustache;
	helpers.prepareRawBlock = prepareRawBlock;
	helpers.prepareBlock = prepareBlock;
	helpers.prepareProgram = prepareProgram;
	helpers.preparePartialBlock = preparePartialBlock;
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _exception = requireException();

	var _exception2 = _interopRequireDefault(_exception);

	function validateClose(open, close) {
	  close = close.path ? close.path.original : close;

	  if (open.path.original !== close) {
	    var errorNode = { loc: open.path.loc };

	    throw new _exception2['default'](open.path.original + " doesn't match " + close, errorNode);
	  }
	}

	function SourceLocation(source, locInfo) {
	  this.source = source;
	  this.start = {
	    line: locInfo.first_line,
	    column: locInfo.first_column
	  };
	  this.end = {
	    line: locInfo.last_line,
	    column: locInfo.last_column
	  };
	}

	function id(token) {
	  if (/^\[.*\]$/.test(token)) {
	    return token.substring(1, token.length - 1);
	  } else {
	    return token;
	  }
	}

	function stripFlags(open, close) {
	  return {
	    open: open.charAt(2) === '~',
	    close: close.charAt(close.length - 3) === '~'
	  };
	}

	function stripComment(comment) {
	  return comment.replace(/^\{\{~?!-?-?/, '').replace(/-?-?~?\}\}$/, '');
	}

	function preparePath(data, parts, loc) {
	  loc = this.locInfo(loc);

	  var original = data ? '@' : '',
	      dig = [],
	      depth = 0;

	  for (var i = 0, l = parts.length; i < l; i++) {
	    var part = parts[i].part,

	    // If we have [] syntax then we do not treat path references as operators,
	    // i.e. foo.[this] resolves to approximately context.foo['this']
	    isLiteral = parts[i].original !== part;
	    original += (parts[i].separator || '') + part;

	    if (!isLiteral && (part === '..' || part === '.' || part === 'this')) {
	      if (dig.length > 0) {
	        throw new _exception2['default']('Invalid path: ' + original, { loc: loc });
	      } else if (part === '..') {
	        depth++;
	      }
	    } else {
	      dig.push(part);
	    }
	  }

	  return {
	    type: 'PathExpression',
	    data: data,
	    depth: depth,
	    parts: dig,
	    original: original,
	    loc: loc
	  };
	}

	function prepareMustache(path, params, hash, open, strip, locInfo) {
	  // Must use charAt to support IE pre-10
	  var escapeFlag = open.charAt(3) || open.charAt(2),
	      escaped = escapeFlag !== '{' && escapeFlag !== '&';

	  var decorator = /\*/.test(open);
	  return {
	    type: decorator ? 'Decorator' : 'MustacheStatement',
	    path: path,
	    params: params,
	    hash: hash,
	    escaped: escaped,
	    strip: strip,
	    loc: this.locInfo(locInfo)
	  };
	}

	function prepareRawBlock(openRawBlock, contents, close, locInfo) {
	  validateClose(openRawBlock, close);

	  locInfo = this.locInfo(locInfo);
	  var program = {
	    type: 'Program',
	    body: contents,
	    strip: {},
	    loc: locInfo
	  };

	  return {
	    type: 'BlockStatement',
	    path: openRawBlock.path,
	    params: openRawBlock.params,
	    hash: openRawBlock.hash,
	    program: program,
	    openStrip: {},
	    inverseStrip: {},
	    closeStrip: {},
	    loc: locInfo
	  };
	}

	function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
	  if (close && close.path) {
	    validateClose(openBlock, close);
	  }

	  var decorator = /\*/.test(openBlock.open);

	  program.blockParams = openBlock.blockParams;

	  var inverse = undefined,
	      inverseStrip = undefined;

	  if (inverseAndProgram) {
	    if (decorator) {
	      throw new _exception2['default']('Unexpected inverse block on decorator', inverseAndProgram);
	    }

	    if (inverseAndProgram.chain) {
	      inverseAndProgram.program.body[0].closeStrip = close.strip;
	    }

	    inverseStrip = inverseAndProgram.strip;
	    inverse = inverseAndProgram.program;
	  }

	  if (inverted) {
	    inverted = inverse;
	    inverse = program;
	    program = inverted;
	  }

	  return {
	    type: decorator ? 'DecoratorBlock' : 'BlockStatement',
	    path: openBlock.path,
	    params: openBlock.params,
	    hash: openBlock.hash,
	    program: program,
	    inverse: inverse,
	    openStrip: openBlock.strip,
	    inverseStrip: inverseStrip,
	    closeStrip: close && close.strip,
	    loc: this.locInfo(locInfo)
	  };
	}

	function prepareProgram(statements, loc) {
	  if (!loc && statements.length) {
	    var firstLoc = statements[0].loc,
	        lastLoc = statements[statements.length - 1].loc;

	    /* istanbul ignore else */
	    if (firstLoc && lastLoc) {
	      loc = {
	        source: firstLoc.source,
	        start: {
	          line: firstLoc.start.line,
	          column: firstLoc.start.column
	        },
	        end: {
	          line: lastLoc.end.line,
	          column: lastLoc.end.column
	        }
	      };
	    }
	  }

	  return {
	    type: 'Program',
	    body: statements,
	    strip: {},
	    loc: loc
	  };
	}

	function preparePartialBlock(open, program, close, locInfo) {
	  validateClose(open, close);

	  return {
	    type: 'PartialBlockStatement',
	    name: open.path,
	    params: open.params,
	    hash: open.hash,
	    program: program,
	    openStrip: open.strip,
	    closeStrip: close && close.strip,
	    loc: this.locInfo(locInfo)
	  };
	}
	
	return helpers;
}

var hasRequiredBase;

function requireBase () {
	if (hasRequiredBase) return base;
	hasRequiredBase = 1;

	base.__esModule = true;
	base.parseWithoutProcessing = parseWithoutProcessing;
	base.parse = parse;
	// istanbul ignore next

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _parser = requireParser();

	var _parser2 = _interopRequireDefault(_parser);

	var _whitespaceControl = requireWhitespaceControl();

	var _whitespaceControl2 = _interopRequireDefault(_whitespaceControl);

	var _helpers = requireHelpers();

	var Helpers = _interopRequireWildcard(_helpers);

	var _utils = requireUtils();

	base.parser = _parser2['default'];

	var yy = {};
	_utils.extend(yy, Helpers);

	function parseWithoutProcessing(input, options) {
	  // Just return if an already-compiled AST was passed in.
	  if (input.type === 'Program') {
	    return input;
	  }

	  _parser2['default'].yy = yy;

	  // Altering the shared object here, but this is ok as parser is a sync operation
	  yy.locInfo = function (locInfo) {
	    return new yy.SourceLocation(options && options.srcName, locInfo);
	  };

	  var ast = _parser2['default'].parse(input);

	  return ast;
	}

	function parse(input, options) {
	  var ast = parseWithoutProcessing(input, options);
	  var strip = new _whitespaceControl2['default'](options);

	  return strip.accept(ast);
	}
	
	return base;
}

var compiler = {};

/* eslint-disable new-cap */

var hasRequiredCompiler;

function requireCompiler () {
	if (hasRequiredCompiler) return compiler;
	hasRequiredCompiler = 1;

	compiler.__esModule = true;
	compiler.Compiler = Compiler;
	compiler.precompile = precompile;
	compiler.compile = compile;
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _exception = requireException();

	var _exception2 = _interopRequireDefault(_exception);

	var _utils = requireUtils();

	var _ast = requireAst();

	var _ast2 = _interopRequireDefault(_ast);

	var slice = [].slice;

	function Compiler() {}

	// the foundHelper register will disambiguate helper lookup from finding a
	// function in a context. This is necessary for mustache compatibility, which
	// requires that context functions in blocks are evaluated by blockHelperMissing,
	// and then proceed as if the resulting value was provided to blockHelperMissing.

	Compiler.prototype = {
	  compiler: Compiler,

	  equals: function equals(other) {
	    var len = this.opcodes.length;
	    if (other.opcodes.length !== len) {
	      return false;
	    }

	    for (var i = 0; i < len; i++) {
	      var opcode = this.opcodes[i],
	          otherOpcode = other.opcodes[i];
	      if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
	        return false;
	      }
	    }

	    // We know that length is the same between the two arrays because they are directly tied
	    // to the opcode behavior above.
	    len = this.children.length;
	    for (var i = 0; i < len; i++) {
	      if (!this.children[i].equals(other.children[i])) {
	        return false;
	      }
	    }

	    return true;
	  },

	  guid: 0,

	  compile: function compile(program, options) {
	    this.sourceNode = [];
	    this.opcodes = [];
	    this.children = [];
	    this.options = options;
	    this.stringParams = options.stringParams;
	    this.trackIds = options.trackIds;

	    options.blockParams = options.blockParams || [];

	    options.knownHelpers = _utils.extend(Object.create(null), {
	      helperMissing: true,
	      blockHelperMissing: true,
	      each: true,
	      'if': true,
	      unless: true,
	      'with': true,
	      log: true,
	      lookup: true
	    }, options.knownHelpers);

	    return this.accept(program);
	  },

	  compileProgram: function compileProgram(program) {
	    var childCompiler = new this.compiler(),
	        // eslint-disable-line new-cap
	    result = childCompiler.compile(program, this.options),
	        guid = this.guid++;

	    this.usePartial = this.usePartial || result.usePartial;

	    this.children[guid] = result;
	    this.useDepths = this.useDepths || result.useDepths;

	    return guid;
	  },

	  accept: function accept(node) {
	    /* istanbul ignore next: Sanity code */
	    if (!this[node.type]) {
	      throw new _exception2['default']('Unknown type: ' + node.type, node);
	    }

	    this.sourceNode.unshift(node);
	    var ret = this[node.type](node);
	    this.sourceNode.shift();
	    return ret;
	  },

	  Program: function Program(program) {
	    this.options.blockParams.unshift(program.blockParams);

	    var body = program.body,
	        bodyLength = body.length;
	    for (var i = 0; i < bodyLength; i++) {
	      this.accept(body[i]);
	    }

	    this.options.blockParams.shift();

	    this.isSimple = bodyLength === 1;
	    this.blockParams = program.blockParams ? program.blockParams.length : 0;

	    return this;
	  },

	  BlockStatement: function BlockStatement(block) {
	    transformLiteralToPath(block);

	    var program = block.program,
	        inverse = block.inverse;

	    program = program && this.compileProgram(program);
	    inverse = inverse && this.compileProgram(inverse);

	    var type = this.classifySexpr(block);

	    if (type === 'helper') {
	      this.helperSexpr(block, program, inverse);
	    } else if (type === 'simple') {
	      this.simpleSexpr(block);

	      // now that the simple mustache is resolved, we need to
	      // evaluate it by executing `blockHelperMissing`
	      this.opcode('pushProgram', program);
	      this.opcode('pushProgram', inverse);
	      this.opcode('emptyHash');
	      this.opcode('blockValue', block.path.original);
	    } else {
	      this.ambiguousSexpr(block, program, inverse);

	      // now that the simple mustache is resolved, we need to
	      // evaluate it by executing `blockHelperMissing`
	      this.opcode('pushProgram', program);
	      this.opcode('pushProgram', inverse);
	      this.opcode('emptyHash');
	      this.opcode('ambiguousBlockValue');
	    }

	    this.opcode('append');
	  },

	  DecoratorBlock: function DecoratorBlock(decorator) {
	    var program = decorator.program && this.compileProgram(decorator.program);
	    var params = this.setupFullMustacheParams(decorator, program, undefined),
	        path = decorator.path;

	    this.useDecorators = true;
	    this.opcode('registerDecorator', params.length, path.original);
	  },

	  PartialStatement: function PartialStatement(partial) {
	    this.usePartial = true;

	    var program = partial.program;
	    if (program) {
	      program = this.compileProgram(partial.program);
	    }

	    var params = partial.params;
	    if (params.length > 1) {
	      throw new _exception2['default']('Unsupported number of partial arguments: ' + params.length, partial);
	    } else if (!params.length) {
	      if (this.options.explicitPartialContext) {
	        this.opcode('pushLiteral', 'undefined');
	      } else {
	        params.push({ type: 'PathExpression', parts: [], depth: 0 });
	      }
	    }

	    var partialName = partial.name.original,
	        isDynamic = partial.name.type === 'SubExpression';
	    if (isDynamic) {
	      this.accept(partial.name);
	    }

	    this.setupFullMustacheParams(partial, program, undefined, true);

	    var indent = partial.indent || '';
	    if (this.options.preventIndent && indent) {
	      this.opcode('appendContent', indent);
	      indent = '';
	    }

	    this.opcode('invokePartial', isDynamic, partialName, indent);
	    this.opcode('append');
	  },
	  PartialBlockStatement: function PartialBlockStatement(partialBlock) {
	    this.PartialStatement(partialBlock);
	  },

	  MustacheStatement: function MustacheStatement(mustache) {
	    this.SubExpression(mustache);

	    if (mustache.escaped && !this.options.noEscape) {
	      this.opcode('appendEscaped');
	    } else {
	      this.opcode('append');
	    }
	  },
	  Decorator: function Decorator(decorator) {
	    this.DecoratorBlock(decorator);
	  },

	  ContentStatement: function ContentStatement(content) {
	    if (content.value) {
	      this.opcode('appendContent', content.value);
	    }
	  },

	  CommentStatement: function CommentStatement() {},

	  SubExpression: function SubExpression(sexpr) {
	    transformLiteralToPath(sexpr);
	    var type = this.classifySexpr(sexpr);

	    if (type === 'simple') {
	      this.simpleSexpr(sexpr);
	    } else if (type === 'helper') {
	      this.helperSexpr(sexpr);
	    } else {
	      this.ambiguousSexpr(sexpr);
	    }
	  },
	  ambiguousSexpr: function ambiguousSexpr(sexpr, program, inverse) {
	    var path = sexpr.path,
	        name = path.parts[0],
	        isBlock = program != null || inverse != null;

	    this.opcode('getContext', path.depth);

	    this.opcode('pushProgram', program);
	    this.opcode('pushProgram', inverse);

	    path.strict = true;
	    this.accept(path);

	    this.opcode('invokeAmbiguous', name, isBlock);
	  },

	  simpleSexpr: function simpleSexpr(sexpr) {
	    var path = sexpr.path;
	    path.strict = true;
	    this.accept(path);
	    this.opcode('resolvePossibleLambda');
	  },

	  helperSexpr: function helperSexpr(sexpr, program, inverse) {
	    var params = this.setupFullMustacheParams(sexpr, program, inverse),
	        path = sexpr.path,
	        name = path.parts[0];

	    if (this.options.knownHelpers[name]) {
	      this.opcode('invokeKnownHelper', params.length, name);
	    } else if (this.options.knownHelpersOnly) {
	      throw new _exception2['default']('You specified knownHelpersOnly, but used the unknown helper ' + name, sexpr);
	    } else {
	      path.strict = true;
	      path.falsy = true;

	      this.accept(path);
	      this.opcode('invokeHelper', params.length, path.original, _ast2['default'].helpers.simpleId(path));
	    }
	  },

	  PathExpression: function PathExpression(path) {
	    this.addDepth(path.depth);
	    this.opcode('getContext', path.depth);

	    var name = path.parts[0],
	        scoped = _ast2['default'].helpers.scopedId(path),
	        blockParamId = !path.depth && !scoped && this.blockParamIndex(name);

	    if (blockParamId) {
	      this.opcode('lookupBlockParam', blockParamId, path.parts);
	    } else if (!name) {
	      // Context reference, i.e. `{{foo .}}` or `{{foo ..}}`
	      this.opcode('pushContext');
	    } else if (path.data) {
	      this.options.data = true;
	      this.opcode('lookupData', path.depth, path.parts, path.strict);
	    } else {
	      this.opcode('lookupOnContext', path.parts, path.falsy, path.strict, scoped);
	    }
	  },

	  StringLiteral: function StringLiteral(string) {
	    this.opcode('pushString', string.value);
	  },

	  NumberLiteral: function NumberLiteral(number) {
	    this.opcode('pushLiteral', number.value);
	  },

	  BooleanLiteral: function BooleanLiteral(bool) {
	    this.opcode('pushLiteral', bool.value);
	  },

	  UndefinedLiteral: function UndefinedLiteral() {
	    this.opcode('pushLiteral', 'undefined');
	  },

	  NullLiteral: function NullLiteral() {
	    this.opcode('pushLiteral', 'null');
	  },

	  Hash: function Hash(hash) {
	    var pairs = hash.pairs,
	        i = 0,
	        l = pairs.length;

	    this.opcode('pushHash');

	    for (; i < l; i++) {
	      this.pushParam(pairs[i].value);
	    }
	    while (i--) {
	      this.opcode('assignToHash', pairs[i].key);
	    }
	    this.opcode('popHash');
	  },

	  // HELPERS
	  opcode: function opcode(name) {
	    this.opcodes.push({
	      opcode: name,
	      args: slice.call(arguments, 1),
	      loc: this.sourceNode[0].loc
	    });
	  },

	  addDepth: function addDepth(depth) {
	    if (!depth) {
	      return;
	    }

	    this.useDepths = true;
	  },

	  classifySexpr: function classifySexpr(sexpr) {
	    var isSimple = _ast2['default'].helpers.simpleId(sexpr.path);

	    var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]);

	    // a mustache is an eligible helper if:
	    // * its id is simple (a single part, not `this` or `..`)
	    var isHelper = !isBlockParam && _ast2['default'].helpers.helperExpression(sexpr);

	    // if a mustache is an eligible helper but not a definite
	    // helper, it is ambiguous, and will be resolved in a later
	    // pass or at runtime.
	    var isEligible = !isBlockParam && (isHelper || isSimple);

	    // if ambiguous, we can possibly resolve the ambiguity now
	    // An eligible helper is one that does not have a complex path, i.e. `this.foo`, `../foo` etc.
	    if (isEligible && !isHelper) {
	      var _name = sexpr.path.parts[0],
	          options = this.options;
	      if (options.knownHelpers[_name]) {
	        isHelper = true;
	      } else if (options.knownHelpersOnly) {
	        isEligible = false;
	      }
	    }

	    if (isHelper) {
	      return 'helper';
	    } else if (isEligible) {
	      return 'ambiguous';
	    } else {
	      return 'simple';
	    }
	  },

	  pushParams: function pushParams(params) {
	    for (var i = 0, l = params.length; i < l; i++) {
	      this.pushParam(params[i]);
	    }
	  },

	  pushParam: function pushParam(val) {
	    var value = val.value != null ? val.value : val.original || '';

	    if (this.stringParams) {
	      if (value.replace) {
	        value = value.replace(/^(\.?\.\/)*/g, '').replace(/\//g, '.');
	      }

	      if (val.depth) {
	        this.addDepth(val.depth);
	      }
	      this.opcode('getContext', val.depth || 0);
	      this.opcode('pushStringParam', value, val.type);

	      if (val.type === 'SubExpression') {
	        // SubExpressions get evaluated and passed in
	        // in string params mode.
	        this.accept(val);
	      }
	    } else {
	      if (this.trackIds) {
	        var blockParamIndex = undefined;
	        if (val.parts && !_ast2['default'].helpers.scopedId(val) && !val.depth) {
	          blockParamIndex = this.blockParamIndex(val.parts[0]);
	        }
	        if (blockParamIndex) {
	          var blockParamChild = val.parts.slice(1).join('.');
	          this.opcode('pushId', 'BlockParam', blockParamIndex, blockParamChild);
	        } else {
	          value = val.original || value;
	          if (value.replace) {
	            value = value.replace(/^this(?:\.|$)/, '').replace(/^\.\//, '').replace(/^\.$/, '');
	          }

	          this.opcode('pushId', val.type, value);
	        }
	      }
	      this.accept(val);
	    }
	  },

	  setupFullMustacheParams: function setupFullMustacheParams(sexpr, program, inverse, omitEmpty) {
	    var params = sexpr.params;
	    this.pushParams(params);

	    this.opcode('pushProgram', program);
	    this.opcode('pushProgram', inverse);

	    if (sexpr.hash) {
	      this.accept(sexpr.hash);
	    } else {
	      this.opcode('emptyHash', omitEmpty);
	    }

	    return params;
	  },

	  blockParamIndex: function blockParamIndex(name) {
	    for (var depth = 0, len = this.options.blockParams.length; depth < len; depth++) {
	      var blockParams = this.options.blockParams[depth],
	          param = blockParams && _utils.indexOf(blockParams, name);
	      if (blockParams && param >= 0) {
	        return [depth, param];
	      }
	    }
	  }
	};

	function precompile(input, options, env) {
	  if (input == null || typeof input !== 'string' && input.type !== 'Program') {
	    throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.precompile. You passed ' + input);
	  }

	  options = options || {};
	  if (!('data' in options)) {
	    options.data = true;
	  }
	  if (options.compat) {
	    options.useDepths = true;
	  }

	  var ast = env.parse(input, options),
	      environment = new env.Compiler().compile(ast, options);
	  return new env.JavaScriptCompiler().compile(environment, options);
	}

	function compile(input, options, env) {
	  if (options === undefined) options = {};

	  if (input == null || typeof input !== 'string' && input.type !== 'Program') {
	    throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.compile. You passed ' + input);
	  }

	  options = _utils.extend({}, options);
	  if (!('data' in options)) {
	    options.data = true;
	  }
	  if (options.compat) {
	    options.useDepths = true;
	  }

	  var compiled = undefined;

	  function compileInput() {
	    var ast = env.parse(input, options),
	        environment = new env.Compiler().compile(ast, options),
	        templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
	    return env.template(templateSpec);
	  }

	  // Template is only compiled on first use and cached after that point.
	  function ret(context, execOptions) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled.call(this, context, execOptions);
	  }
	  ret._setup = function (setupOptions) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled._setup(setupOptions);
	  };
	  ret._child = function (i, data, blockParams, depths) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled._child(i, data, blockParams, depths);
	  };
	  return ret;
	}

	function argEquals(a, b) {
	  if (a === b) {
	    return true;
	  }

	  if (_utils.isArray(a) && _utils.isArray(b) && a.length === b.length) {
	    for (var i = 0; i < a.length; i++) {
	      if (!argEquals(a[i], b[i])) {
	        return false;
	      }
	    }
	    return true;
	  }
	}

	function transformLiteralToPath(sexpr) {
	  if (!sexpr.path.parts) {
	    var literal = sexpr.path;
	    // Casting to string here to make false and 0 literal values play nicely with the rest
	    // of the system.
	    sexpr.path = {
	      type: 'PathExpression',
	      data: false,
	      depth: 0,
	      parts: [literal.original + ''],
	      original: literal.original + '',
	      loc: literal.loc
	    };
	  }
	}
	
	return compiler;
}

var javascriptCompiler = {exports: {}};

var codeGen = {exports: {}};

var sourceMap = {};

var sourceMapGenerator = {};

var base64Vlq = {};

var base64 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredBase64;

function requireBase64 () {
	if (hasRequiredBase64) return base64;
	hasRequiredBase64 = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

	/**
	 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
	 */
	base64.encode = function (number) {
	  if (0 <= number && number < intToCharMap.length) {
	    return intToCharMap[number];
	  }
	  throw new TypeError("Must be between 0 and 63: " + number);
	};

	/**
	 * Decode a single base 64 character code digit to an integer. Returns -1 on
	 * failure.
	 */
	base64.decode = function (charCode) {
	  var bigA = 65;     // 'A'
	  var bigZ = 90;     // 'Z'

	  var littleA = 97;  // 'a'
	  var littleZ = 122; // 'z'

	  var zero = 48;     // '0'
	  var nine = 57;     // '9'

	  var plus = 43;     // '+'
	  var slash = 47;    // '/'

	  var littleOffset = 26;
	  var numberOffset = 52;

	  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
	  if (bigA <= charCode && charCode <= bigZ) {
	    return (charCode - bigA);
	  }

	  // 26 - 51: abcdefghijklmnopqrstuvwxyz
	  if (littleA <= charCode && charCode <= littleZ) {
	    return (charCode - littleA + littleOffset);
	  }

	  // 52 - 61: 0123456789
	  if (zero <= charCode && charCode <= nine) {
	    return (charCode - zero + numberOffset);
	  }

	  // 62: +
	  if (charCode == plus) {
	    return 62;
	  }

	  // 63: /
	  if (charCode == slash) {
	    return 63;
	  }

	  // Invalid base64 digit.
	  return -1;
	};
	return base64;
}

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredBase64Vlq;

function requireBase64Vlq () {
	if (hasRequiredBase64Vlq) return base64Vlq;
	hasRequiredBase64Vlq = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 *
	 * Based on the Base 64 VLQ implementation in Closure Compiler:
	 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
	 *
	 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions are
	 * met:
	 *
	 *  * Redistributions of source code must retain the above copyright
	 *    notice, this list of conditions and the following disclaimer.
	 *  * Redistributions in binary form must reproduce the above
	 *    copyright notice, this list of conditions and the following
	 *    disclaimer in the documentation and/or other materials provided
	 *    with the distribution.
	 *  * Neither the name of Google Inc. nor the names of its
	 *    contributors may be used to endorse or promote products derived
	 *    from this software without specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */

	var base64 = requireBase64();

	// A single base 64 digit can contain 6 bits of data. For the base 64 variable
	// length quantities we use in the source map spec, the first bit is the sign,
	// the next four bits are the actual value, and the 6th bit is the
	// continuation bit. The continuation bit tells us whether there are more
	// digits in this value following this digit.
	//
	//   Continuation
	//   |    Sign
	//   |    |
	//   V    V
	//   101011

	var VLQ_BASE_SHIFT = 5;

	// binary: 100000
	var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

	// binary: 011111
	var VLQ_BASE_MASK = VLQ_BASE - 1;

	// binary: 100000
	var VLQ_CONTINUATION_BIT = VLQ_BASE;

	/**
	 * Converts from a two-complement value to a value where the sign bit is
	 * placed in the least significant bit.  For example, as decimals:
	 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
	 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
	 */
	function toVLQSigned(aValue) {
	  return aValue < 0
	    ? ((-aValue) << 1) + 1
	    : (aValue << 1) + 0;
	}

	/**
	 * Converts to a two-complement value from a value where the sign bit is
	 * placed in the least significant bit.  For example, as decimals:
	 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
	 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
	 */
	function fromVLQSigned(aValue) {
	  var isNegative = (aValue & 1) === 1;
	  var shifted = aValue >> 1;
	  return isNegative
	    ? -shifted
	    : shifted;
	}

	/**
	 * Returns the base 64 VLQ encoded value.
	 */
	base64Vlq.encode = function base64VLQ_encode(aValue) {
	  var encoded = "";
	  var digit;

	  var vlq = toVLQSigned(aValue);

	  do {
	    digit = vlq & VLQ_BASE_MASK;
	    vlq >>>= VLQ_BASE_SHIFT;
	    if (vlq > 0) {
	      // There are still more digits in this value, so we must make sure the
	      // continuation bit is marked.
	      digit |= VLQ_CONTINUATION_BIT;
	    }
	    encoded += base64.encode(digit);
	  } while (vlq > 0);

	  return encoded;
	};

	/**
	 * Decodes the next base 64 VLQ value from the given string and returns the
	 * value and the rest of the string via the out parameter.
	 */
	base64Vlq.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
	  var strLen = aStr.length;
	  var result = 0;
	  var shift = 0;
	  var continuation, digit;

	  do {
	    if (aIndex >= strLen) {
	      throw new Error("Expected more digits in base 64 VLQ value.");
	    }

	    digit = base64.decode(aStr.charCodeAt(aIndex++));
	    if (digit === -1) {
	      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
	    }

	    continuation = !!(digit & VLQ_CONTINUATION_BIT);
	    digit &= VLQ_BASE_MASK;
	    result = result + (digit << shift);
	    shift += VLQ_BASE_SHIFT;
	  } while (continuation);

	  aOutParam.value = fromVLQSigned(result);
	  aOutParam.rest = aIndex;
	};
	return base64Vlq;
}

var util$1 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredUtil;

function requireUtil () {
	if (hasRequiredUtil) return util$1;
	hasRequiredUtil = 1;
	(function (exports$1) {
		/*
		 * Copyright 2011 Mozilla Foundation and contributors
		 * Licensed under the New BSD license. See LICENSE or:
		 * http://opensource.org/licenses/BSD-3-Clause
		 */

		/**
		 * This is a helper function for getting values from parameter/options
		 * objects.
		 *
		 * @param args The object we are extracting values from
		 * @param name The name of the property we are getting.
		 * @param defaultValue An optional value to return if the property is missing
		 * from the object. If this is not specified and the property is missing, an
		 * error will be thrown.
		 */
		function getArg(aArgs, aName, aDefaultValue) {
		  if (aName in aArgs) {
		    return aArgs[aName];
		  } else if (arguments.length === 3) {
		    return aDefaultValue;
		  } else {
		    throw new Error('"' + aName + '" is a required argument.');
		  }
		}
		exports$1.getArg = getArg;

		var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
		var dataUrlRegexp = /^data:.+\,.+$/;

		function urlParse(aUrl) {
		  var match = aUrl.match(urlRegexp);
		  if (!match) {
		    return null;
		  }
		  return {
		    scheme: match[1],
		    auth: match[2],
		    host: match[3],
		    port: match[4],
		    path: match[5]
		  };
		}
		exports$1.urlParse = urlParse;

		function urlGenerate(aParsedUrl) {
		  var url = '';
		  if (aParsedUrl.scheme) {
		    url += aParsedUrl.scheme + ':';
		  }
		  url += '//';
		  if (aParsedUrl.auth) {
		    url += aParsedUrl.auth + '@';
		  }
		  if (aParsedUrl.host) {
		    url += aParsedUrl.host;
		  }
		  if (aParsedUrl.port) {
		    url += ":" + aParsedUrl.port;
		  }
		  if (aParsedUrl.path) {
		    url += aParsedUrl.path;
		  }
		  return url;
		}
		exports$1.urlGenerate = urlGenerate;

		/**
		 * Normalizes a path, or the path portion of a URL:
		 *
		 * - Replaces consecutive slashes with one slash.
		 * - Removes unnecessary '.' parts.
		 * - Removes unnecessary '<dir>/..' parts.
		 *
		 * Based on code in the Node.js 'path' core module.
		 *
		 * @param aPath The path or url to normalize.
		 */
		function normalize(aPath) {
		  var path = aPath;
		  var url = urlParse(aPath);
		  if (url) {
		    if (!url.path) {
		      return aPath;
		    }
		    path = url.path;
		  }
		  var isAbsolute = exports$1.isAbsolute(path);

		  var parts = path.split(/\/+/);
		  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
		    part = parts[i];
		    if (part === '.') {
		      parts.splice(i, 1);
		    } else if (part === '..') {
		      up++;
		    } else if (up > 0) {
		      if (part === '') {
		        // The first part is blank if the path is absolute. Trying to go
		        // above the root is a no-op. Therefore we can remove all '..' parts
		        // directly after the root.
		        parts.splice(i + 1, up);
		        up = 0;
		      } else {
		        parts.splice(i, 2);
		        up--;
		      }
		    }
		  }
		  path = parts.join('/');

		  if (path === '') {
		    path = isAbsolute ? '/' : '.';
		  }

		  if (url) {
		    url.path = path;
		    return urlGenerate(url);
		  }
		  return path;
		}
		exports$1.normalize = normalize;

		/**
		 * Joins two paths/URLs.
		 *
		 * @param aRoot The root path or URL.
		 * @param aPath The path or URL to be joined with the root.
		 *
		 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
		 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
		 *   first.
		 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
		 *   is updated with the result and aRoot is returned. Otherwise the result
		 *   is returned.
		 *   - If aPath is absolute, the result is aPath.
		 *   - Otherwise the two paths are joined with a slash.
		 * - Joining for example 'http://' and 'www.example.com' is also supported.
		 */
		function join(aRoot, aPath) {
		  if (aRoot === "") {
		    aRoot = ".";
		  }
		  if (aPath === "") {
		    aPath = ".";
		  }
		  var aPathUrl = urlParse(aPath);
		  var aRootUrl = urlParse(aRoot);
		  if (aRootUrl) {
		    aRoot = aRootUrl.path || '/';
		  }

		  // `join(foo, '//www.example.org')`
		  if (aPathUrl && !aPathUrl.scheme) {
		    if (aRootUrl) {
		      aPathUrl.scheme = aRootUrl.scheme;
		    }
		    return urlGenerate(aPathUrl);
		  }

		  if (aPathUrl || aPath.match(dataUrlRegexp)) {
		    return aPath;
		  }

		  // `join('http://', 'www.example.com')`
		  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
		    aRootUrl.host = aPath;
		    return urlGenerate(aRootUrl);
		  }

		  var joined = aPath.charAt(0) === '/'
		    ? aPath
		    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

		  if (aRootUrl) {
		    aRootUrl.path = joined;
		    return urlGenerate(aRootUrl);
		  }
		  return joined;
		}
		exports$1.join = join;

		exports$1.isAbsolute = function (aPath) {
		  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
		};

		/**
		 * Make a path relative to a URL or another path.
		 *
		 * @param aRoot The root path or URL.
		 * @param aPath The path or URL to be made relative to aRoot.
		 */
		function relative(aRoot, aPath) {
		  if (aRoot === "") {
		    aRoot = ".";
		  }

		  aRoot = aRoot.replace(/\/$/, '');

		  // It is possible for the path to be above the root. In this case, simply
		  // checking whether the root is a prefix of the path won't work. Instead, we
		  // need to remove components from the root one by one, until either we find
		  // a prefix that fits, or we run out of components to remove.
		  var level = 0;
		  while (aPath.indexOf(aRoot + '/') !== 0) {
		    var index = aRoot.lastIndexOf("/");
		    if (index < 0) {
		      return aPath;
		    }

		    // If the only part of the root that is left is the scheme (i.e. http://,
		    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
		    // have exhausted all components, so the path is not relative to the root.
		    aRoot = aRoot.slice(0, index);
		    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
		      return aPath;
		    }

		    ++level;
		  }

		  // Make sure we add a "../" for each component we removed from the root.
		  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
		}
		exports$1.relative = relative;

		var supportsNullProto = (function () {
		  var obj = Object.create(null);
		  return !('__proto__' in obj);
		}());

		function identity (s) {
		  return s;
		}

		/**
		 * Because behavior goes wacky when you set `__proto__` on objects, we
		 * have to prefix all the strings in our set with an arbitrary character.
		 *
		 * See https://github.com/mozilla/source-map/pull/31 and
		 * https://github.com/mozilla/source-map/issues/30
		 *
		 * @param String aStr
		 */
		function toSetString(aStr) {
		  if (isProtoString(aStr)) {
		    return '$' + aStr;
		  }

		  return aStr;
		}
		exports$1.toSetString = supportsNullProto ? identity : toSetString;

		function fromSetString(aStr) {
		  if (isProtoString(aStr)) {
		    return aStr.slice(1);
		  }

		  return aStr;
		}
		exports$1.fromSetString = supportsNullProto ? identity : fromSetString;

		function isProtoString(s) {
		  if (!s) {
		    return false;
		  }

		  var length = s.length;

		  if (length < 9 /* "__proto__".length */) {
		    return false;
		  }

		  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
		      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
		      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
		      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
		      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
		      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
		      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
		      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
		      s.charCodeAt(length - 9) !== 95  /* '_' */) {
		    return false;
		  }

		  for (var i = length - 10; i >= 0; i--) {
		    if (s.charCodeAt(i) !== 36 /* '$' */) {
		      return false;
		    }
		  }

		  return true;
		}

		/**
		 * Comparator between two mappings where the original positions are compared.
		 *
		 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
		 * mappings with the same original source/line/column, but different generated
		 * line and column the same. Useful when searching for a mapping with a
		 * stubbed out mapping.
		 */
		function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
		  var cmp = strcmp(mappingA.source, mappingB.source);
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.originalLine - mappingB.originalLine;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.originalColumn - mappingB.originalColumn;
		  if (cmp !== 0 || onlyCompareOriginal) {
		    return cmp;
		  }

		  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.generatedLine - mappingB.generatedLine;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  return strcmp(mappingA.name, mappingB.name);
		}
		exports$1.compareByOriginalPositions = compareByOriginalPositions;

		/**
		 * Comparator between two mappings with deflated source and name indices where
		 * the generated positions are compared.
		 *
		 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
		 * mappings with the same generated line and column, but different
		 * source/name/original line and column the same. Useful when searching for a
		 * mapping with a stubbed out mapping.
		 */
		function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
		  var cmp = mappingA.generatedLine - mappingB.generatedLine;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		  if (cmp !== 0 || onlyCompareGenerated) {
		    return cmp;
		  }

		  cmp = strcmp(mappingA.source, mappingB.source);
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.originalLine - mappingB.originalLine;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.originalColumn - mappingB.originalColumn;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  return strcmp(mappingA.name, mappingB.name);
		}
		exports$1.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

		function strcmp(aStr1, aStr2) {
		  if (aStr1 === aStr2) {
		    return 0;
		  }

		  if (aStr1 === null) {
		    return 1; // aStr2 !== null
		  }

		  if (aStr2 === null) {
		    return -1; // aStr1 !== null
		  }

		  if (aStr1 > aStr2) {
		    return 1;
		  }

		  return -1;
		}

		/**
		 * Comparator between two mappings with inflated source and name strings where
		 * the generated positions are compared.
		 */
		function compareByGeneratedPositionsInflated(mappingA, mappingB) {
		  var cmp = mappingA.generatedLine - mappingB.generatedLine;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = strcmp(mappingA.source, mappingB.source);
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.originalLine - mappingB.originalLine;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.originalColumn - mappingB.originalColumn;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  return strcmp(mappingA.name, mappingB.name);
		}
		exports$1.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

		/**
		 * Strip any JSON XSSI avoidance prefix from the string (as documented
		 * in the source maps specification), and then parse the string as
		 * JSON.
		 */
		function parseSourceMapInput(str) {
		  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
		}
		exports$1.parseSourceMapInput = parseSourceMapInput;

		/**
		 * Compute the URL of a source given the the source root, the source's
		 * URL, and the source map's URL.
		 */
		function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
		  sourceURL = sourceURL || '';

		  if (sourceRoot) {
		    // This follows what Chrome does.
		    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
		      sourceRoot += '/';
		    }
		    // The spec says:
		    //   Line 4: An optional source root, useful for relocating source
		    //   files on a server or removing repeated values in the
		    //   “sources” entry.  This value is prepended to the individual
		    //   entries in the “source” field.
		    sourceURL = sourceRoot + sourceURL;
		  }

		  // Historically, SourceMapConsumer did not take the sourceMapURL as
		  // a parameter.  This mode is still somewhat supported, which is why
		  // this code block is conditional.  However, it's preferable to pass
		  // the source map URL to SourceMapConsumer, so that this function
		  // can implement the source URL resolution algorithm as outlined in
		  // the spec.  This block is basically the equivalent of:
		  //    new URL(sourceURL, sourceMapURL).toString()
		  // ... except it avoids using URL, which wasn't available in the
		  // older releases of node still supported by this library.
		  //
		  // The spec says:
		  //   If the sources are not absolute URLs after prepending of the
		  //   “sourceRoot”, the sources are resolved relative to the
		  //   SourceMap (like resolving script src in a html document).
		  if (sourceMapURL) {
		    var parsed = urlParse(sourceMapURL);
		    if (!parsed) {
		      throw new Error("sourceMapURL could not be parsed");
		    }
		    if (parsed.path) {
		      // Strip the last path component, but keep the "/".
		      var index = parsed.path.lastIndexOf('/');
		      if (index >= 0) {
		        parsed.path = parsed.path.substring(0, index + 1);
		      }
		    }
		    sourceURL = join(urlGenerate(parsed), sourceURL);
		  }

		  return normalize(sourceURL);
		}
		exports$1.computeSourceURL = computeSourceURL; 
	} (util$1));
	return util$1;
}

var arraySet = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredArraySet;

function requireArraySet () {
	if (hasRequiredArraySet) return arraySet;
	hasRequiredArraySet = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var util = requireUtil();
	var has = Object.prototype.hasOwnProperty;
	var hasNativeMap = typeof Map !== "undefined";

	/**
	 * A data structure which is a combination of an array and a set. Adding a new
	 * member is O(1), testing for membership is O(1), and finding the index of an
	 * element is O(1). Removing elements from the set is not supported. Only
	 * strings are supported for membership.
	 */
	function ArraySet() {
	  this._array = [];
	  this._set = hasNativeMap ? new Map() : Object.create(null);
	}

	/**
	 * Static method for creating ArraySet instances from an existing array.
	 */
	ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
	  var set = new ArraySet();
	  for (var i = 0, len = aArray.length; i < len; i++) {
	    set.add(aArray[i], aAllowDuplicates);
	  }
	  return set;
	};

	/**
	 * Return how many unique items are in this ArraySet. If duplicates have been
	 * added, than those do not count towards the size.
	 *
	 * @returns Number
	 */
	ArraySet.prototype.size = function ArraySet_size() {
	  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
	};

	/**
	 * Add the given string to this set.
	 *
	 * @param String aStr
	 */
	ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
	  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
	  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
	  var idx = this._array.length;
	  if (!isDuplicate || aAllowDuplicates) {
	    this._array.push(aStr);
	  }
	  if (!isDuplicate) {
	    if (hasNativeMap) {
	      this._set.set(aStr, idx);
	    } else {
	      this._set[sStr] = idx;
	    }
	  }
	};

	/**
	 * Is the given string a member of this set?
	 *
	 * @param String aStr
	 */
	ArraySet.prototype.has = function ArraySet_has(aStr) {
	  if (hasNativeMap) {
	    return this._set.has(aStr);
	  } else {
	    var sStr = util.toSetString(aStr);
	    return has.call(this._set, sStr);
	  }
	};

	/**
	 * What is the index of the given string in the array?
	 *
	 * @param String aStr
	 */
	ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
	  if (hasNativeMap) {
	    var idx = this._set.get(aStr);
	    if (idx >= 0) {
	        return idx;
	    }
	  } else {
	    var sStr = util.toSetString(aStr);
	    if (has.call(this._set, sStr)) {
	      return this._set[sStr];
	    }
	  }

	  throw new Error('"' + aStr + '" is not in the set.');
	};

	/**
	 * What is the element at the given index?
	 *
	 * @param Number aIdx
	 */
	ArraySet.prototype.at = function ArraySet_at(aIdx) {
	  if (aIdx >= 0 && aIdx < this._array.length) {
	    return this._array[aIdx];
	  }
	  throw new Error('No element indexed by ' + aIdx);
	};

	/**
	 * Returns the array representation of this set (which has the proper indices
	 * indicated by indexOf). Note that this is a copy of the internal array used
	 * for storing the members so that no one can mess with internal state.
	 */
	ArraySet.prototype.toArray = function ArraySet_toArray() {
	  return this._array.slice();
	};

	arraySet.ArraySet = ArraySet;
	return arraySet;
}

var mappingList = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredMappingList;

function requireMappingList () {
	if (hasRequiredMappingList) return mappingList;
	hasRequiredMappingList = 1;
	/*
	 * Copyright 2014 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var util = requireUtil();

	/**
	 * Determine whether mappingB is after mappingA with respect to generated
	 * position.
	 */
	function generatedPositionAfter(mappingA, mappingB) {
	  // Optimized for most common case
	  var lineA = mappingA.generatedLine;
	  var lineB = mappingB.generatedLine;
	  var columnA = mappingA.generatedColumn;
	  var columnB = mappingB.generatedColumn;
	  return lineB > lineA || lineB == lineA && columnB >= columnA ||
	         util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
	}

	/**
	 * A data structure to provide a sorted view of accumulated mappings in a
	 * performance conscious manner. It trades a neglibable overhead in general
	 * case for a large speedup in case of mappings being added in order.
	 */
	function MappingList() {
	  this._array = [];
	  this._sorted = true;
	  // Serves as infimum
	  this._last = {generatedLine: -1, generatedColumn: 0};
	}

	/**
	 * Iterate through internal items. This method takes the same arguments that
	 * `Array.prototype.forEach` takes.
	 *
	 * NOTE: The order of the mappings is NOT guaranteed.
	 */
	MappingList.prototype.unsortedForEach =
	  function MappingList_forEach(aCallback, aThisArg) {
	    this._array.forEach(aCallback, aThisArg);
	  };

	/**
	 * Add the given source mapping.
	 *
	 * @param Object aMapping
	 */
	MappingList.prototype.add = function MappingList_add(aMapping) {
	  if (generatedPositionAfter(this._last, aMapping)) {
	    this._last = aMapping;
	    this._array.push(aMapping);
	  } else {
	    this._sorted = false;
	    this._array.push(aMapping);
	  }
	};

	/**
	 * Returns the flat, sorted array of mappings. The mappings are sorted by
	 * generated position.
	 *
	 * WARNING: This method returns internal data without copying, for
	 * performance. The return value must NOT be mutated, and should be treated as
	 * an immutable borrow. If you want to take ownership, you must make your own
	 * copy.
	 */
	MappingList.prototype.toArray = function MappingList_toArray() {
	  if (!this._sorted) {
	    this._array.sort(util.compareByGeneratedPositionsInflated);
	    this._sorted = true;
	  }
	  return this._array;
	};

	mappingList.MappingList = MappingList;
	return mappingList;
}

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredSourceMapGenerator;

function requireSourceMapGenerator () {
	if (hasRequiredSourceMapGenerator) return sourceMapGenerator;
	hasRequiredSourceMapGenerator = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var base64VLQ = requireBase64Vlq();
	var util = requireUtil();
	var ArraySet = requireArraySet().ArraySet;
	var MappingList = requireMappingList().MappingList;

	/**
	 * An instance of the SourceMapGenerator represents a source map which is
	 * being built incrementally. You may pass an object with the following
	 * properties:
	 *
	 *   - file: The filename of the generated source.
	 *   - sourceRoot: A root for all relative URLs in this source map.
	 */
	function SourceMapGenerator(aArgs) {
	  if (!aArgs) {
	    aArgs = {};
	  }
	  this._file = util.getArg(aArgs, 'file', null);
	  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
	  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
	  this._sources = new ArraySet();
	  this._names = new ArraySet();
	  this._mappings = new MappingList();
	  this._sourcesContents = null;
	}

	SourceMapGenerator.prototype._version = 3;

	/**
	 * Creates a new SourceMapGenerator based on a SourceMapConsumer
	 *
	 * @param aSourceMapConsumer The SourceMap.
	 */
	SourceMapGenerator.fromSourceMap =
	  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
	    var sourceRoot = aSourceMapConsumer.sourceRoot;
	    var generator = new SourceMapGenerator({
	      file: aSourceMapConsumer.file,
	      sourceRoot: sourceRoot
	    });
	    aSourceMapConsumer.eachMapping(function (mapping) {
	      var newMapping = {
	        generated: {
	          line: mapping.generatedLine,
	          column: mapping.generatedColumn
	        }
	      };

	      if (mapping.source != null) {
	        newMapping.source = mapping.source;
	        if (sourceRoot != null) {
	          newMapping.source = util.relative(sourceRoot, newMapping.source);
	        }

	        newMapping.original = {
	          line: mapping.originalLine,
	          column: mapping.originalColumn
	        };

	        if (mapping.name != null) {
	          newMapping.name = mapping.name;
	        }
	      }

	      generator.addMapping(newMapping);
	    });
	    aSourceMapConsumer.sources.forEach(function (sourceFile) {
	      var sourceRelative = sourceFile;
	      if (sourceRoot !== null) {
	        sourceRelative = util.relative(sourceRoot, sourceFile);
	      }

	      if (!generator._sources.has(sourceRelative)) {
	        generator._sources.add(sourceRelative);
	      }

	      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	      if (content != null) {
	        generator.setSourceContent(sourceFile, content);
	      }
	    });
	    return generator;
	  };

	/**
	 * Add a single mapping from original source line and column to the generated
	 * source's line and column for this source map being created. The mapping
	 * object should have the following properties:
	 *
	 *   - generated: An object with the generated line and column positions.
	 *   - original: An object with the original line and column positions.
	 *   - source: The original source file (relative to the sourceRoot).
	 *   - name: An optional original token name for this mapping.
	 */
	SourceMapGenerator.prototype.addMapping =
	  function SourceMapGenerator_addMapping(aArgs) {
	    var generated = util.getArg(aArgs, 'generated');
	    var original = util.getArg(aArgs, 'original', null);
	    var source = util.getArg(aArgs, 'source', null);
	    var name = util.getArg(aArgs, 'name', null);

	    if (!this._skipValidation) {
	      this._validateMapping(generated, original, source, name);
	    }

	    if (source != null) {
	      source = String(source);
	      if (!this._sources.has(source)) {
	        this._sources.add(source);
	      }
	    }

	    if (name != null) {
	      name = String(name);
	      if (!this._names.has(name)) {
	        this._names.add(name);
	      }
	    }

	    this._mappings.add({
	      generatedLine: generated.line,
	      generatedColumn: generated.column,
	      originalLine: original != null && original.line,
	      originalColumn: original != null && original.column,
	      source: source,
	      name: name
	    });
	  };

	/**
	 * Set the source content for a source file.
	 */
	SourceMapGenerator.prototype.setSourceContent =
	  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
	    var source = aSourceFile;
	    if (this._sourceRoot != null) {
	      source = util.relative(this._sourceRoot, source);
	    }

	    if (aSourceContent != null) {
	      // Add the source content to the _sourcesContents map.
	      // Create a new _sourcesContents map if the property is null.
	      if (!this._sourcesContents) {
	        this._sourcesContents = Object.create(null);
	      }
	      this._sourcesContents[util.toSetString(source)] = aSourceContent;
	    } else if (this._sourcesContents) {
	      // Remove the source file from the _sourcesContents map.
	      // If the _sourcesContents map is empty, set the property to null.
	      delete this._sourcesContents[util.toSetString(source)];
	      if (Object.keys(this._sourcesContents).length === 0) {
	        this._sourcesContents = null;
	      }
	    }
	  };

	/**
	 * Applies the mappings of a sub-source-map for a specific source file to the
	 * source map being generated. Each mapping to the supplied source file is
	 * rewritten using the supplied source map. Note: The resolution for the
	 * resulting mappings is the minimium of this map and the supplied map.
	 *
	 * @param aSourceMapConsumer The source map to be applied.
	 * @param aSourceFile Optional. The filename of the source file.
	 *        If omitted, SourceMapConsumer's file property will be used.
	 * @param aSourceMapPath Optional. The dirname of the path to the source map
	 *        to be applied. If relative, it is relative to the SourceMapConsumer.
	 *        This parameter is needed when the two source maps aren't in the same
	 *        directory, and the source map to be applied contains relative source
	 *        paths. If so, those relative source paths need to be rewritten
	 *        relative to the SourceMapGenerator.
	 */
	SourceMapGenerator.prototype.applySourceMap =
	  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
	    var sourceFile = aSourceFile;
	    // If aSourceFile is omitted, we will use the file property of the SourceMap
	    if (aSourceFile == null) {
	      if (aSourceMapConsumer.file == null) {
	        throw new Error(
	          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
	          'or the source map\'s "file" property. Both were omitted.'
	        );
	      }
	      sourceFile = aSourceMapConsumer.file;
	    }
	    var sourceRoot = this._sourceRoot;
	    // Make "sourceFile" relative if an absolute Url is passed.
	    if (sourceRoot != null) {
	      sourceFile = util.relative(sourceRoot, sourceFile);
	    }
	    // Applying the SourceMap can add and remove items from the sources and
	    // the names array.
	    var newSources = new ArraySet();
	    var newNames = new ArraySet();

	    // Find mappings for the "sourceFile"
	    this._mappings.unsortedForEach(function (mapping) {
	      if (mapping.source === sourceFile && mapping.originalLine != null) {
	        // Check if it can be mapped by the source map, then update the mapping.
	        var original = aSourceMapConsumer.originalPositionFor({
	          line: mapping.originalLine,
	          column: mapping.originalColumn
	        });
	        if (original.source != null) {
	          // Copy mapping
	          mapping.source = original.source;
	          if (aSourceMapPath != null) {
	            mapping.source = util.join(aSourceMapPath, mapping.source);
	          }
	          if (sourceRoot != null) {
	            mapping.source = util.relative(sourceRoot, mapping.source);
	          }
	          mapping.originalLine = original.line;
	          mapping.originalColumn = original.column;
	          if (original.name != null) {
	            mapping.name = original.name;
	          }
	        }
	      }

	      var source = mapping.source;
	      if (source != null && !newSources.has(source)) {
	        newSources.add(source);
	      }

	      var name = mapping.name;
	      if (name != null && !newNames.has(name)) {
	        newNames.add(name);
	      }

	    }, this);
	    this._sources = newSources;
	    this._names = newNames;

	    // Copy sourcesContents of applied map.
	    aSourceMapConsumer.sources.forEach(function (sourceFile) {
	      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	      if (content != null) {
	        if (aSourceMapPath != null) {
	          sourceFile = util.join(aSourceMapPath, sourceFile);
	        }
	        if (sourceRoot != null) {
	          sourceFile = util.relative(sourceRoot, sourceFile);
	        }
	        this.setSourceContent(sourceFile, content);
	      }
	    }, this);
	  };

	/**
	 * A mapping can have one of the three levels of data:
	 *
	 *   1. Just the generated position.
	 *   2. The Generated position, original position, and original source.
	 *   3. Generated and original position, original source, as well as a name
	 *      token.
	 *
	 * To maintain consistency, we validate that any new mapping being added falls
	 * in to one of these categories.
	 */
	SourceMapGenerator.prototype._validateMapping =
	  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
	                                              aName) {
	    // When aOriginal is truthy but has empty values for .line and .column,
	    // it is most likely a programmer error. In this case we throw a very
	    // specific error message to try to guide them the right way.
	    // For example: https://github.com/Polymer/polymer-bundler/pull/519
	    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
	        throw new Error(
	            'original.line and original.column are not numbers -- you probably meant to omit ' +
	            'the original mapping entirely and only map the generated position. If so, pass ' +
	            'null for the original mapping instead of an object with empty or null values.'
	        );
	    }

	    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
	        && aGenerated.line > 0 && aGenerated.column >= 0
	        && !aOriginal && !aSource && !aName) {
	      // Case 1.
	      return;
	    }
	    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
	             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
	             && aGenerated.line > 0 && aGenerated.column >= 0
	             && aOriginal.line > 0 && aOriginal.column >= 0
	             && aSource) {
	      // Cases 2 and 3.
	      return;
	    }
	    else {
	      throw new Error('Invalid mapping: ' + JSON.stringify({
	        generated: aGenerated,
	        source: aSource,
	        original: aOriginal,
	        name: aName
	      }));
	    }
	  };

	/**
	 * Serialize the accumulated mappings in to the stream of base 64 VLQs
	 * specified by the source map format.
	 */
	SourceMapGenerator.prototype._serializeMappings =
	  function SourceMapGenerator_serializeMappings() {
	    var previousGeneratedColumn = 0;
	    var previousGeneratedLine = 1;
	    var previousOriginalColumn = 0;
	    var previousOriginalLine = 0;
	    var previousName = 0;
	    var previousSource = 0;
	    var result = '';
	    var next;
	    var mapping;
	    var nameIdx;
	    var sourceIdx;

	    var mappings = this._mappings.toArray();
	    for (var i = 0, len = mappings.length; i < len; i++) {
	      mapping = mappings[i];
	      next = '';

	      if (mapping.generatedLine !== previousGeneratedLine) {
	        previousGeneratedColumn = 0;
	        while (mapping.generatedLine !== previousGeneratedLine) {
	          next += ';';
	          previousGeneratedLine++;
	        }
	      }
	      else {
	        if (i > 0) {
	          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
	            continue;
	          }
	          next += ',';
	        }
	      }

	      next += base64VLQ.encode(mapping.generatedColumn
	                                 - previousGeneratedColumn);
	      previousGeneratedColumn = mapping.generatedColumn;

	      if (mapping.source != null) {
	        sourceIdx = this._sources.indexOf(mapping.source);
	        next += base64VLQ.encode(sourceIdx - previousSource);
	        previousSource = sourceIdx;

	        // lines are stored 0-based in SourceMap spec version 3
	        next += base64VLQ.encode(mapping.originalLine - 1
	                                   - previousOriginalLine);
	        previousOriginalLine = mapping.originalLine - 1;

	        next += base64VLQ.encode(mapping.originalColumn
	                                   - previousOriginalColumn);
	        previousOriginalColumn = mapping.originalColumn;

	        if (mapping.name != null) {
	          nameIdx = this._names.indexOf(mapping.name);
	          next += base64VLQ.encode(nameIdx - previousName);
	          previousName = nameIdx;
	        }
	      }

	      result += next;
	    }

	    return result;
	  };

	SourceMapGenerator.prototype._generateSourcesContent =
	  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
	    return aSources.map(function (source) {
	      if (!this._sourcesContents) {
	        return null;
	      }
	      if (aSourceRoot != null) {
	        source = util.relative(aSourceRoot, source);
	      }
	      var key = util.toSetString(source);
	      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
	        ? this._sourcesContents[key]
	        : null;
	    }, this);
	  };

	/**
	 * Externalize the source map.
	 */
	SourceMapGenerator.prototype.toJSON =
	  function SourceMapGenerator_toJSON() {
	    var map = {
	      version: this._version,
	      sources: this._sources.toArray(),
	      names: this._names.toArray(),
	      mappings: this._serializeMappings()
	    };
	    if (this._file != null) {
	      map.file = this._file;
	    }
	    if (this._sourceRoot != null) {
	      map.sourceRoot = this._sourceRoot;
	    }
	    if (this._sourcesContents) {
	      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
	    }

	    return map;
	  };

	/**
	 * Render the source map being generated to a string.
	 */
	SourceMapGenerator.prototype.toString =
	  function SourceMapGenerator_toString() {
	    return JSON.stringify(this.toJSON());
	  };

	sourceMapGenerator.SourceMapGenerator = SourceMapGenerator;
	return sourceMapGenerator;
}

var sourceMapConsumer = {};

var binarySearch = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredBinarySearch;

function requireBinarySearch () {
	if (hasRequiredBinarySearch) return binarySearch;
	hasRequiredBinarySearch = 1;
	(function (exports$1) {
		/*
		 * Copyright 2011 Mozilla Foundation and contributors
		 * Licensed under the New BSD license. See LICENSE or:
		 * http://opensource.org/licenses/BSD-3-Clause
		 */

		exports$1.GREATEST_LOWER_BOUND = 1;
		exports$1.LEAST_UPPER_BOUND = 2;

		/**
		 * Recursive implementation of binary search.
		 *
		 * @param aLow Indices here and lower do not contain the needle.
		 * @param aHigh Indices here and higher do not contain the needle.
		 * @param aNeedle The element being searched for.
		 * @param aHaystack The non-empty array being searched.
		 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
		 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
		 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
		 *     closest element that is smaller than or greater than the one we are
		 *     searching for, respectively, if the exact element cannot be found.
		 */
		function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
		  // This function terminates when one of the following is true:
		  //
		  //   1. We find the exact element we are looking for.
		  //
		  //   2. We did not find the exact element, but we can return the index of
		  //      the next-closest element.
		  //
		  //   3. We did not find the exact element, and there is no next-closest
		  //      element than the one we are searching for, so we return -1.
		  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
		  var cmp = aCompare(aNeedle, aHaystack[mid], true);
		  if (cmp === 0) {
		    // Found the element we are looking for.
		    return mid;
		  }
		  else if (cmp > 0) {
		    // Our needle is greater than aHaystack[mid].
		    if (aHigh - mid > 1) {
		      // The element is in the upper half.
		      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
		    }

		    // The exact needle element was not found in this haystack. Determine if
		    // we are in termination case (3) or (2) and return the appropriate thing.
		    if (aBias == exports$1.LEAST_UPPER_BOUND) {
		      return aHigh < aHaystack.length ? aHigh : -1;
		    } else {
		      return mid;
		    }
		  }
		  else {
		    // Our needle is less than aHaystack[mid].
		    if (mid - aLow > 1) {
		      // The element is in the lower half.
		      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
		    }

		    // we are in termination case (3) or (2) and return the appropriate thing.
		    if (aBias == exports$1.LEAST_UPPER_BOUND) {
		      return mid;
		    } else {
		      return aLow < 0 ? -1 : aLow;
		    }
		  }
		}

		/**
		 * This is an implementation of binary search which will always try and return
		 * the index of the closest element if there is no exact hit. This is because
		 * mappings between original and generated line/col pairs are single points,
		 * and there is an implicit region between each of them, so a miss just means
		 * that you aren't on the very start of a region.
		 *
		 * @param aNeedle The element you are looking for.
		 * @param aHaystack The array that is being searched.
		 * @param aCompare A function which takes the needle and an element in the
		 *     array and returns -1, 0, or 1 depending on whether the needle is less
		 *     than, equal to, or greater than the element, respectively.
		 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
		 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
		 *     closest element that is smaller than or greater than the one we are
		 *     searching for, respectively, if the exact element cannot be found.
		 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
		 */
		exports$1.search = function search(aNeedle, aHaystack, aCompare, aBias) {
		  if (aHaystack.length === 0) {
		    return -1;
		  }

		  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
		                              aCompare, aBias || exports$1.GREATEST_LOWER_BOUND);
		  if (index < 0) {
		    return -1;
		  }

		  // We have found either the exact element, or the next-closest element than
		  // the one we are searching for. However, there may be more than one such
		  // element. Make sure we always return the smallest of these.
		  while (index - 1 >= 0) {
		    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
		      break;
		    }
		    --index;
		  }

		  return index;
		}; 
	} (binarySearch));
	return binarySearch;
}

var quickSort = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredQuickSort;

function requireQuickSort () {
	if (hasRequiredQuickSort) return quickSort;
	hasRequiredQuickSort = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	// It turns out that some (most?) JavaScript engines don't self-host
	// `Array.prototype.sort`. This makes sense because C++ will likely remain
	// faster than JS when doing raw CPU-intensive sorting. However, when using a
	// custom comparator function, calling back and forth between the VM's C++ and
	// JIT'd JS is rather slow *and* loses JIT type information, resulting in
	// worse generated code for the comparator function than would be optimal. In
	// fact, when sorting with a comparator, these costs outweigh the benefits of
	// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
	// a ~3500ms mean speed-up in `bench/bench.html`.

	/**
	 * Swap the elements indexed by `x` and `y` in the array `ary`.
	 *
	 * @param {Array} ary
	 *        The array.
	 * @param {Number} x
	 *        The index of the first item.
	 * @param {Number} y
	 *        The index of the second item.
	 */
	function swap(ary, x, y) {
	  var temp = ary[x];
	  ary[x] = ary[y];
	  ary[y] = temp;
	}

	/**
	 * Returns a random integer within the range `low .. high` inclusive.
	 *
	 * @param {Number} low
	 *        The lower bound on the range.
	 * @param {Number} high
	 *        The upper bound on the range.
	 */
	function randomIntInRange(low, high) {
	  return Math.round(low + (Math.random() * (high - low)));
	}

	/**
	 * The Quick Sort algorithm.
	 *
	 * @param {Array} ary
	 *        An array to sort.
	 * @param {function} comparator
	 *        Function to use to compare two items.
	 * @param {Number} p
	 *        Start index of the array
	 * @param {Number} r
	 *        End index of the array
	 */
	function doQuickSort(ary, comparator, p, r) {
	  // If our lower bound is less than our upper bound, we (1) partition the
	  // array into two pieces and (2) recurse on each half. If it is not, this is
	  // the empty array and our base case.

	  if (p < r) {
	    // (1) Partitioning.
	    //
	    // The partitioning chooses a pivot between `p` and `r` and moves all
	    // elements that are less than or equal to the pivot to the before it, and
	    // all the elements that are greater than it after it. The effect is that
	    // once partition is done, the pivot is in the exact place it will be when
	    // the array is put in sorted order, and it will not need to be moved
	    // again. This runs in O(n) time.

	    // Always choose a random pivot so that an input array which is reverse
	    // sorted does not cause O(n^2) running time.
	    var pivotIndex = randomIntInRange(p, r);
	    var i = p - 1;

	    swap(ary, pivotIndex, r);
	    var pivot = ary[r];

	    // Immediately after `j` is incremented in this loop, the following hold
	    // true:
	    //
	    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
	    //
	    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
	    for (var j = p; j < r; j++) {
	      if (comparator(ary[j], pivot) <= 0) {
	        i += 1;
	        swap(ary, i, j);
	      }
	    }

	    swap(ary, i + 1, j);
	    var q = i + 1;

	    // (2) Recurse on each half.

	    doQuickSort(ary, comparator, p, q - 1);
	    doQuickSort(ary, comparator, q + 1, r);
	  }
	}

	/**
	 * Sort the given array in-place with the given comparator function.
	 *
	 * @param {Array} ary
	 *        An array to sort.
	 * @param {function} comparator
	 *        Function to use to compare two items.
	 */
	quickSort.quickSort = function (ary, comparator) {
	  doQuickSort(ary, comparator, 0, ary.length - 1);
	};
	return quickSort;
}

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredSourceMapConsumer;

function requireSourceMapConsumer () {
	if (hasRequiredSourceMapConsumer) return sourceMapConsumer;
	hasRequiredSourceMapConsumer = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var util = requireUtil();
	var binarySearch = requireBinarySearch();
	var ArraySet = requireArraySet().ArraySet;
	var base64VLQ = requireBase64Vlq();
	var quickSort = requireQuickSort().quickSort;

	function SourceMapConsumer(aSourceMap, aSourceMapURL) {
	  var sourceMap = aSourceMap;
	  if (typeof aSourceMap === 'string') {
	    sourceMap = util.parseSourceMapInput(aSourceMap);
	  }

	  return sourceMap.sections != null
	    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
	    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
	}

	SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
	  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
	};

	/**
	 * The version of the source mapping spec that we are consuming.
	 */
	SourceMapConsumer.prototype._version = 3;

	// `__generatedMappings` and `__originalMappings` are arrays that hold the
	// parsed mapping coordinates from the source map's "mappings" attribute. They
	// are lazily instantiated, accessed via the `_generatedMappings` and
	// `_originalMappings` getters respectively, and we only parse the mappings
	// and create these arrays once queried for a source location. We jump through
	// these hoops because there can be many thousands of mappings, and parsing
	// them is expensive, so we only want to do it if we must.
	//
	// Each object in the arrays is of the form:
	//
	//     {
	//       generatedLine: The line number in the generated code,
	//       generatedColumn: The column number in the generated code,
	//       source: The path to the original source file that generated this
	//               chunk of code,
	//       originalLine: The line number in the original source that
	//                     corresponds to this chunk of generated code,
	//       originalColumn: The column number in the original source that
	//                       corresponds to this chunk of generated code,
	//       name: The name of the original symbol which generated this chunk of
	//             code.
	//     }
	//
	// All properties except for `generatedLine` and `generatedColumn` can be
	// `null`.
	//
	// `_generatedMappings` is ordered by the generated positions.
	//
	// `_originalMappings` is ordered by the original positions.

	SourceMapConsumer.prototype.__generatedMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
	  configurable: true,
	  enumerable: true,
	  get: function () {
	    if (!this.__generatedMappings) {
	      this._parseMappings(this._mappings, this.sourceRoot);
	    }

	    return this.__generatedMappings;
	  }
	});

	SourceMapConsumer.prototype.__originalMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
	  configurable: true,
	  enumerable: true,
	  get: function () {
	    if (!this.__originalMappings) {
	      this._parseMappings(this._mappings, this.sourceRoot);
	    }

	    return this.__originalMappings;
	  }
	});

	SourceMapConsumer.prototype._charIsMappingSeparator =
	  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
	    var c = aStr.charAt(index);
	    return c === ";" || c === ",";
	  };

	/**
	 * Parse the mappings in a string in to a data structure which we can easily
	 * query (the ordered arrays in the `this.__generatedMappings` and
	 * `this.__originalMappings` properties).
	 */
	SourceMapConsumer.prototype._parseMappings =
	  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	    throw new Error("Subclasses must implement _parseMappings");
	  };

	SourceMapConsumer.GENERATED_ORDER = 1;
	SourceMapConsumer.ORIGINAL_ORDER = 2;

	SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
	SourceMapConsumer.LEAST_UPPER_BOUND = 2;

	/**
	 * Iterate over each mapping between an original source/line/column and a
	 * generated line/column in this source map.
	 *
	 * @param Function aCallback
	 *        The function that is called with each mapping.
	 * @param Object aContext
	 *        Optional. If specified, this object will be the value of `this` every
	 *        time that `aCallback` is called.
	 * @param aOrder
	 *        Either `SourceMapConsumer.GENERATED_ORDER` or
	 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
	 *        iterate over the mappings sorted by the generated file's line/column
	 *        order or the original's source/line/column order, respectively. Defaults to
	 *        `SourceMapConsumer.GENERATED_ORDER`.
	 */
	SourceMapConsumer.prototype.eachMapping =
	  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
	    var context = aContext || null;
	    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

	    var mappings;
	    switch (order) {
	    case SourceMapConsumer.GENERATED_ORDER:
	      mappings = this._generatedMappings;
	      break;
	    case SourceMapConsumer.ORIGINAL_ORDER:
	      mappings = this._originalMappings;
	      break;
	    default:
	      throw new Error("Unknown order of iteration.");
	    }

	    var sourceRoot = this.sourceRoot;
	    mappings.map(function (mapping) {
	      var source = mapping.source === null ? null : this._sources.at(mapping.source);
	      source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
	      return {
	        source: source,
	        generatedLine: mapping.generatedLine,
	        generatedColumn: mapping.generatedColumn,
	        originalLine: mapping.originalLine,
	        originalColumn: mapping.originalColumn,
	        name: mapping.name === null ? null : this._names.at(mapping.name)
	      };
	    }, this).forEach(aCallback, context);
	  };

	/**
	 * Returns all generated line and column information for the original source,
	 * line, and column provided. If no column is provided, returns all mappings
	 * corresponding to a either the line we are searching for or the next
	 * closest line that has any mappings. Otherwise, returns all mappings
	 * corresponding to the given line and either the column we are searching for
	 * or the next closest column that has any offsets.
	 *
	 * The only argument is an object with the following properties:
	 *
	 *   - source: The filename of the original source.
	 *   - line: The line number in the original source.  The line number is 1-based.
	 *   - column: Optional. the column number in the original source.
	 *    The column number is 0-based.
	 *
	 * and an array of objects is returned, each with the following properties:
	 *
	 *   - line: The line number in the generated source, or null.  The
	 *    line number is 1-based.
	 *   - column: The column number in the generated source, or null.
	 *    The column number is 0-based.
	 */
	SourceMapConsumer.prototype.allGeneratedPositionsFor =
	  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
	    var line = util.getArg(aArgs, 'line');

	    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
	    // returns the index of the closest mapping less than the needle. By
	    // setting needle.originalColumn to 0, we thus find the last mapping for
	    // the given line, provided such a mapping exists.
	    var needle = {
	      source: util.getArg(aArgs, 'source'),
	      originalLine: line,
	      originalColumn: util.getArg(aArgs, 'column', 0)
	    };

	    needle.source = this._findSourceIndex(needle.source);
	    if (needle.source < 0) {
	      return [];
	    }

	    var mappings = [];

	    var index = this._findMapping(needle,
	                                  this._originalMappings,
	                                  "originalLine",
	                                  "originalColumn",
	                                  util.compareByOriginalPositions,
	                                  binarySearch.LEAST_UPPER_BOUND);
	    if (index >= 0) {
	      var mapping = this._originalMappings[index];

	      if (aArgs.column === undefined) {
	        var originalLine = mapping.originalLine;

	        // Iterate until either we run out of mappings, or we run into
	        // a mapping for a different line than the one we found. Since
	        // mappings are sorted, this is guaranteed to find all mappings for
	        // the line we found.
	        while (mapping && mapping.originalLine === originalLine) {
	          mappings.push({
	            line: util.getArg(mapping, 'generatedLine', null),
	            column: util.getArg(mapping, 'generatedColumn', null),
	            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
	          });

	          mapping = this._originalMappings[++index];
	        }
	      } else {
	        var originalColumn = mapping.originalColumn;

	        // Iterate until either we run out of mappings, or we run into
	        // a mapping for a different line than the one we were searching for.
	        // Since mappings are sorted, this is guaranteed to find all mappings for
	        // the line we are searching for.
	        while (mapping &&
	               mapping.originalLine === line &&
	               mapping.originalColumn == originalColumn) {
	          mappings.push({
	            line: util.getArg(mapping, 'generatedLine', null),
	            column: util.getArg(mapping, 'generatedColumn', null),
	            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
	          });

	          mapping = this._originalMappings[++index];
	        }
	      }
	    }

	    return mappings;
	  };

	sourceMapConsumer.SourceMapConsumer = SourceMapConsumer;

	/**
	 * A BasicSourceMapConsumer instance represents a parsed source map which we can
	 * query for information about the original file positions by giving it a file
	 * position in the generated source.
	 *
	 * The first parameter is the raw source map (either as a JSON string, or
	 * already parsed to an object). According to the spec, source maps have the
	 * following attributes:
	 *
	 *   - version: Which version of the source map spec this map is following.
	 *   - sources: An array of URLs to the original source files.
	 *   - names: An array of identifiers which can be referrenced by individual mappings.
	 *   - sourceRoot: Optional. The URL root from which all sources are relative.
	 *   - sourcesContent: Optional. An array of contents of the original source files.
	 *   - mappings: A string of base64 VLQs which contain the actual mappings.
	 *   - file: Optional. The generated file this source map is associated with.
	 *
	 * Here is an example source map, taken from the source map spec[0]:
	 *
	 *     {
	 *       version : 3,
	 *       file: "out.js",
	 *       sourceRoot : "",
	 *       sources: ["foo.js", "bar.js"],
	 *       names: ["src", "maps", "are", "fun"],
	 *       mappings: "AA,AB;;ABCDE;"
	 *     }
	 *
	 * The second parameter, if given, is a string whose value is the URL
	 * at which the source map was found.  This URL is used to compute the
	 * sources array.
	 *
	 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
	 */
	function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
	  var sourceMap = aSourceMap;
	  if (typeof aSourceMap === 'string') {
	    sourceMap = util.parseSourceMapInput(aSourceMap);
	  }

	  var version = util.getArg(sourceMap, 'version');
	  var sources = util.getArg(sourceMap, 'sources');
	  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
	  // requires the array) to play nice here.
	  var names = util.getArg(sourceMap, 'names', []);
	  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
	  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
	  var mappings = util.getArg(sourceMap, 'mappings');
	  var file = util.getArg(sourceMap, 'file', null);

	  // Once again, Sass deviates from the spec and supplies the version as a
	  // string rather than a number, so we use loose equality checking here.
	  if (version != this._version) {
	    throw new Error('Unsupported version: ' + version);
	  }

	  if (sourceRoot) {
	    sourceRoot = util.normalize(sourceRoot);
	  }

	  sources = sources
	    .map(String)
	    // Some source maps produce relative source paths like "./foo.js" instead of
	    // "foo.js".  Normalize these first so that future comparisons will succeed.
	    // See bugzil.la/1090768.
	    .map(util.normalize)
	    // Always ensure that absolute sources are internally stored relative to
	    // the source root, if the source root is absolute. Not doing this would
	    // be particularly problematic when the source root is a prefix of the
	    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
	    .map(function (source) {
	      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
	        ? util.relative(sourceRoot, source)
	        : source;
	    });

	  // Pass `true` below to allow duplicate names and sources. While source maps
	  // are intended to be compressed and deduplicated, the TypeScript compiler
	  // sometimes generates source maps with duplicates in them. See Github issue
	  // #72 and bugzil.la/889492.
	  this._names = ArraySet.fromArray(names.map(String), true);
	  this._sources = ArraySet.fromArray(sources, true);

	  this._absoluteSources = this._sources.toArray().map(function (s) {
	    return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
	  });

	  this.sourceRoot = sourceRoot;
	  this.sourcesContent = sourcesContent;
	  this._mappings = mappings;
	  this._sourceMapURL = aSourceMapURL;
	  this.file = file;
	}

	BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

	/**
	 * Utility function to find the index of a source.  Returns -1 if not
	 * found.
	 */
	BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
	  var relativeSource = aSource;
	  if (this.sourceRoot != null) {
	    relativeSource = util.relative(this.sourceRoot, relativeSource);
	  }

	  if (this._sources.has(relativeSource)) {
	    return this._sources.indexOf(relativeSource);
	  }

	  // Maybe aSource is an absolute URL as returned by |sources|.  In
	  // this case we can't simply undo the transform.
	  var i;
	  for (i = 0; i < this._absoluteSources.length; ++i) {
	    if (this._absoluteSources[i] == aSource) {
	      return i;
	    }
	  }

	  return -1;
	};

	/**
	 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
	 *
	 * @param SourceMapGenerator aSourceMap
	 *        The source map that will be consumed.
	 * @param String aSourceMapURL
	 *        The URL at which the source map can be found (optional)
	 * @returns BasicSourceMapConsumer
	 */
	BasicSourceMapConsumer.fromSourceMap =
	  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
	    var smc = Object.create(BasicSourceMapConsumer.prototype);

	    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
	    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
	    smc.sourceRoot = aSourceMap._sourceRoot;
	    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
	                                                            smc.sourceRoot);
	    smc.file = aSourceMap._file;
	    smc._sourceMapURL = aSourceMapURL;
	    smc._absoluteSources = smc._sources.toArray().map(function (s) {
	      return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
	    });

	    // Because we are modifying the entries (by converting string sources and
	    // names to indices into the sources and names ArraySets), we have to make
	    // a copy of the entry or else bad things happen. Shared mutable state
	    // strikes again! See github issue #191.

	    var generatedMappings = aSourceMap._mappings.toArray().slice();
	    var destGeneratedMappings = smc.__generatedMappings = [];
	    var destOriginalMappings = smc.__originalMappings = [];

	    for (var i = 0, length = generatedMappings.length; i < length; i++) {
	      var srcMapping = generatedMappings[i];
	      var destMapping = new Mapping;
	      destMapping.generatedLine = srcMapping.generatedLine;
	      destMapping.generatedColumn = srcMapping.generatedColumn;

	      if (srcMapping.source) {
	        destMapping.source = sources.indexOf(srcMapping.source);
	        destMapping.originalLine = srcMapping.originalLine;
	        destMapping.originalColumn = srcMapping.originalColumn;

	        if (srcMapping.name) {
	          destMapping.name = names.indexOf(srcMapping.name);
	        }

	        destOriginalMappings.push(destMapping);
	      }

	      destGeneratedMappings.push(destMapping);
	    }

	    quickSort(smc.__originalMappings, util.compareByOriginalPositions);

	    return smc;
	  };

	/**
	 * The version of the source mapping spec that we are consuming.
	 */
	BasicSourceMapConsumer.prototype._version = 3;

	/**
	 * The list of original sources.
	 */
	Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
	  get: function () {
	    return this._absoluteSources.slice();
	  }
	});

	/**
	 * Provide the JIT with a nice shape / hidden class.
	 */
	function Mapping() {
	  this.generatedLine = 0;
	  this.generatedColumn = 0;
	  this.source = null;
	  this.originalLine = null;
	  this.originalColumn = null;
	  this.name = null;
	}

	/**
	 * Parse the mappings in a string in to a data structure which we can easily
	 * query (the ordered arrays in the `this.__generatedMappings` and
	 * `this.__originalMappings` properties).
	 */
	BasicSourceMapConsumer.prototype._parseMappings =
	  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	    var generatedLine = 1;
	    var previousGeneratedColumn = 0;
	    var previousOriginalLine = 0;
	    var previousOriginalColumn = 0;
	    var previousSource = 0;
	    var previousName = 0;
	    var length = aStr.length;
	    var index = 0;
	    var cachedSegments = {};
	    var temp = {};
	    var originalMappings = [];
	    var generatedMappings = [];
	    var mapping, str, segment, end, value;

	    while (index < length) {
	      if (aStr.charAt(index) === ';') {
	        generatedLine++;
	        index++;
	        previousGeneratedColumn = 0;
	      }
	      else if (aStr.charAt(index) === ',') {
	        index++;
	      }
	      else {
	        mapping = new Mapping();
	        mapping.generatedLine = generatedLine;

	        // Because each offset is encoded relative to the previous one,
	        // many segments often have the same encoding. We can exploit this
	        // fact by caching the parsed variable length fields of each segment,
	        // allowing us to avoid a second parse if we encounter the same
	        // segment again.
	        for (end = index; end < length; end++) {
	          if (this._charIsMappingSeparator(aStr, end)) {
	            break;
	          }
	        }
	        str = aStr.slice(index, end);

	        segment = cachedSegments[str];
	        if (segment) {
	          index += str.length;
	        } else {
	          segment = [];
	          while (index < end) {
	            base64VLQ.decode(aStr, index, temp);
	            value = temp.value;
	            index = temp.rest;
	            segment.push(value);
	          }

	          if (segment.length === 2) {
	            throw new Error('Found a source, but no line and column');
	          }

	          if (segment.length === 3) {
	            throw new Error('Found a source and line, but no column');
	          }

	          cachedSegments[str] = segment;
	        }

	        // Generated column.
	        mapping.generatedColumn = previousGeneratedColumn + segment[0];
	        previousGeneratedColumn = mapping.generatedColumn;

	        if (segment.length > 1) {
	          // Original source.
	          mapping.source = previousSource + segment[1];
	          previousSource += segment[1];

	          // Original line.
	          mapping.originalLine = previousOriginalLine + segment[2];
	          previousOriginalLine = mapping.originalLine;
	          // Lines are stored 0-based
	          mapping.originalLine += 1;

	          // Original column.
	          mapping.originalColumn = previousOriginalColumn + segment[3];
	          previousOriginalColumn = mapping.originalColumn;

	          if (segment.length > 4) {
	            // Original name.
	            mapping.name = previousName + segment[4];
	            previousName += segment[4];
	          }
	        }

	        generatedMappings.push(mapping);
	        if (typeof mapping.originalLine === 'number') {
	          originalMappings.push(mapping);
	        }
	      }
	    }

	    quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
	    this.__generatedMappings = generatedMappings;

	    quickSort(originalMappings, util.compareByOriginalPositions);
	    this.__originalMappings = originalMappings;
	  };

	/**
	 * Find the mapping that best matches the hypothetical "needle" mapping that
	 * we are searching for in the given "haystack" of mappings.
	 */
	BasicSourceMapConsumer.prototype._findMapping =
	  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
	                                         aColumnName, aComparator, aBias) {
	    // To return the position we are searching for, we must first find the
	    // mapping for the given position and then return the opposite position it
	    // points to. Because the mappings are sorted, we can use binary search to
	    // find the best mapping.

	    if (aNeedle[aLineName] <= 0) {
	      throw new TypeError('Line must be greater than or equal to 1, got '
	                          + aNeedle[aLineName]);
	    }
	    if (aNeedle[aColumnName] < 0) {
	      throw new TypeError('Column must be greater than or equal to 0, got '
	                          + aNeedle[aColumnName]);
	    }

	    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
	  };

	/**
	 * Compute the last column for each generated mapping. The last column is
	 * inclusive.
	 */
	BasicSourceMapConsumer.prototype.computeColumnSpans =
	  function SourceMapConsumer_computeColumnSpans() {
	    for (var index = 0; index < this._generatedMappings.length; ++index) {
	      var mapping = this._generatedMappings[index];

	      // Mappings do not contain a field for the last generated columnt. We
	      // can come up with an optimistic estimate, however, by assuming that
	      // mappings are contiguous (i.e. given two consecutive mappings, the
	      // first mapping ends where the second one starts).
	      if (index + 1 < this._generatedMappings.length) {
	        var nextMapping = this._generatedMappings[index + 1];

	        if (mapping.generatedLine === nextMapping.generatedLine) {
	          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
	          continue;
	        }
	      }

	      // The last mapping for each line spans the entire line.
	      mapping.lastGeneratedColumn = Infinity;
	    }
	  };

	/**
	 * Returns the original source, line, and column information for the generated
	 * source's line and column positions provided. The only argument is an object
	 * with the following properties:
	 *
	 *   - line: The line number in the generated source.  The line number
	 *     is 1-based.
	 *   - column: The column number in the generated source.  The column
	 *     number is 0-based.
	 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	 *     closest element that is smaller than or greater than the one we are
	 *     searching for, respectively, if the exact element cannot be found.
	 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	 *
	 * and an object is returned with the following properties:
	 *
	 *   - source: The original source file, or null.
	 *   - line: The line number in the original source, or null.  The
	 *     line number is 1-based.
	 *   - column: The column number in the original source, or null.  The
	 *     column number is 0-based.
	 *   - name: The original identifier, or null.
	 */
	BasicSourceMapConsumer.prototype.originalPositionFor =
	  function SourceMapConsumer_originalPositionFor(aArgs) {
	    var needle = {
	      generatedLine: util.getArg(aArgs, 'line'),
	      generatedColumn: util.getArg(aArgs, 'column')
	    };

	    var index = this._findMapping(
	      needle,
	      this._generatedMappings,
	      "generatedLine",
	      "generatedColumn",
	      util.compareByGeneratedPositionsDeflated,
	      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
	    );

	    if (index >= 0) {
	      var mapping = this._generatedMappings[index];

	      if (mapping.generatedLine === needle.generatedLine) {
	        var source = util.getArg(mapping, 'source', null);
	        if (source !== null) {
	          source = this._sources.at(source);
	          source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
	        }
	        var name = util.getArg(mapping, 'name', null);
	        if (name !== null) {
	          name = this._names.at(name);
	        }
	        return {
	          source: source,
	          line: util.getArg(mapping, 'originalLine', null),
	          column: util.getArg(mapping, 'originalColumn', null),
	          name: name
	        };
	      }
	    }

	    return {
	      source: null,
	      line: null,
	      column: null,
	      name: null
	    };
	  };

	/**
	 * Return true if we have the source content for every source in the source
	 * map, false otherwise.
	 */
	BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
	  function BasicSourceMapConsumer_hasContentsOfAllSources() {
	    if (!this.sourcesContent) {
	      return false;
	    }
	    return this.sourcesContent.length >= this._sources.size() &&
	      !this.sourcesContent.some(function (sc) { return sc == null; });
	  };

	/**
	 * Returns the original source content. The only argument is the url of the
	 * original source file. Returns null if no original source content is
	 * available.
	 */
	BasicSourceMapConsumer.prototype.sourceContentFor =
	  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
	    if (!this.sourcesContent) {
	      return null;
	    }

	    var index = this._findSourceIndex(aSource);
	    if (index >= 0) {
	      return this.sourcesContent[index];
	    }

	    var relativeSource = aSource;
	    if (this.sourceRoot != null) {
	      relativeSource = util.relative(this.sourceRoot, relativeSource);
	    }

	    var url;
	    if (this.sourceRoot != null
	        && (url = util.urlParse(this.sourceRoot))) {
	      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
	      // many users. We can help them out when they expect file:// URIs to
	      // behave like it would if they were running a local HTTP server. See
	      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
	      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
	      if (url.scheme == "file"
	          && this._sources.has(fileUriAbsPath)) {
	        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
	      }

	      if ((!url.path || url.path == "/")
	          && this._sources.has("/" + relativeSource)) {
	        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
	      }
	    }

	    // This function is used recursively from
	    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
	    // don't want to throw if we can't find the source - we just want to
	    // return null, so we provide a flag to exit gracefully.
	    if (nullOnMissing) {
	      return null;
	    }
	    else {
	      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
	    }
	  };

	/**
	 * Returns the generated line and column information for the original source,
	 * line, and column positions provided. The only argument is an object with
	 * the following properties:
	 *
	 *   - source: The filename of the original source.
	 *   - line: The line number in the original source.  The line number
	 *     is 1-based.
	 *   - column: The column number in the original source.  The column
	 *     number is 0-based.
	 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	 *     closest element that is smaller than or greater than the one we are
	 *     searching for, respectively, if the exact element cannot be found.
	 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	 *
	 * and an object is returned with the following properties:
	 *
	 *   - line: The line number in the generated source, or null.  The
	 *     line number is 1-based.
	 *   - column: The column number in the generated source, or null.
	 *     The column number is 0-based.
	 */
	BasicSourceMapConsumer.prototype.generatedPositionFor =
	  function SourceMapConsumer_generatedPositionFor(aArgs) {
	    var source = util.getArg(aArgs, 'source');
	    source = this._findSourceIndex(source);
	    if (source < 0) {
	      return {
	        line: null,
	        column: null,
	        lastColumn: null
	      };
	    }

	    var needle = {
	      source: source,
	      originalLine: util.getArg(aArgs, 'line'),
	      originalColumn: util.getArg(aArgs, 'column')
	    };

	    var index = this._findMapping(
	      needle,
	      this._originalMappings,
	      "originalLine",
	      "originalColumn",
	      util.compareByOriginalPositions,
	      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
	    );

	    if (index >= 0) {
	      var mapping = this._originalMappings[index];

	      if (mapping.source === needle.source) {
	        return {
	          line: util.getArg(mapping, 'generatedLine', null),
	          column: util.getArg(mapping, 'generatedColumn', null),
	          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
	        };
	      }
	    }

	    return {
	      line: null,
	      column: null,
	      lastColumn: null
	    };
	  };

	sourceMapConsumer.BasicSourceMapConsumer = BasicSourceMapConsumer;

	/**
	 * An IndexedSourceMapConsumer instance represents a parsed source map which
	 * we can query for information. It differs from BasicSourceMapConsumer in
	 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
	 * input.
	 *
	 * The first parameter is a raw source map (either as a JSON string, or already
	 * parsed to an object). According to the spec for indexed source maps, they
	 * have the following attributes:
	 *
	 *   - version: Which version of the source map spec this map is following.
	 *   - file: Optional. The generated file this source map is associated with.
	 *   - sections: A list of section definitions.
	 *
	 * Each value under the "sections" field has two fields:
	 *   - offset: The offset into the original specified at which this section
	 *       begins to apply, defined as an object with a "line" and "column"
	 *       field.
	 *   - map: A source map definition. This source map could also be indexed,
	 *       but doesn't have to be.
	 *
	 * Instead of the "map" field, it's also possible to have a "url" field
	 * specifying a URL to retrieve a source map from, but that's currently
	 * unsupported.
	 *
	 * Here's an example source map, taken from the source map spec[0], but
	 * modified to omit a section which uses the "url" field.
	 *
	 *  {
	 *    version : 3,
	 *    file: "app.js",
	 *    sections: [{
	 *      offset: {line:100, column:10},
	 *      map: {
	 *        version : 3,
	 *        file: "section.js",
	 *        sources: ["foo.js", "bar.js"],
	 *        names: ["src", "maps", "are", "fun"],
	 *        mappings: "AAAA,E;;ABCDE;"
	 *      }
	 *    }],
	 *  }
	 *
	 * The second parameter, if given, is a string whose value is the URL
	 * at which the source map was found.  This URL is used to compute the
	 * sources array.
	 *
	 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
	 */
	function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
	  var sourceMap = aSourceMap;
	  if (typeof aSourceMap === 'string') {
	    sourceMap = util.parseSourceMapInput(aSourceMap);
	  }

	  var version = util.getArg(sourceMap, 'version');
	  var sections = util.getArg(sourceMap, 'sections');

	  if (version != this._version) {
	    throw new Error('Unsupported version: ' + version);
	  }

	  this._sources = new ArraySet();
	  this._names = new ArraySet();

	  var lastOffset = {
	    line: -1,
	    column: 0
	  };
	  this._sections = sections.map(function (s) {
	    if (s.url) {
	      // The url field will require support for asynchronicity.
	      // See https://github.com/mozilla/source-map/issues/16
	      throw new Error('Support for url field in sections not implemented.');
	    }
	    var offset = util.getArg(s, 'offset');
	    var offsetLine = util.getArg(offset, 'line');
	    var offsetColumn = util.getArg(offset, 'column');

	    if (offsetLine < lastOffset.line ||
	        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
	      throw new Error('Section offsets must be ordered and non-overlapping.');
	    }
	    lastOffset = offset;

	    return {
	      generatedOffset: {
	        // The offset fields are 0-based, but we use 1-based indices when
	        // encoding/decoding from VLQ.
	        generatedLine: offsetLine + 1,
	        generatedColumn: offsetColumn + 1
	      },
	      consumer: new SourceMapConsumer(util.getArg(s, 'map'), aSourceMapURL)
	    }
	  });
	}

	IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

	/**
	 * The version of the source mapping spec that we are consuming.
	 */
	IndexedSourceMapConsumer.prototype._version = 3;

	/**
	 * The list of original sources.
	 */
	Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
	  get: function () {
	    var sources = [];
	    for (var i = 0; i < this._sections.length; i++) {
	      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
	        sources.push(this._sections[i].consumer.sources[j]);
	      }
	    }
	    return sources;
	  }
	});

	/**
	 * Returns the original source, line, and column information for the generated
	 * source's line and column positions provided. The only argument is an object
	 * with the following properties:
	 *
	 *   - line: The line number in the generated source.  The line number
	 *     is 1-based.
	 *   - column: The column number in the generated source.  The column
	 *     number is 0-based.
	 *
	 * and an object is returned with the following properties:
	 *
	 *   - source: The original source file, or null.
	 *   - line: The line number in the original source, or null.  The
	 *     line number is 1-based.
	 *   - column: The column number in the original source, or null.  The
	 *     column number is 0-based.
	 *   - name: The original identifier, or null.
	 */
	IndexedSourceMapConsumer.prototype.originalPositionFor =
	  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
	    var needle = {
	      generatedLine: util.getArg(aArgs, 'line'),
	      generatedColumn: util.getArg(aArgs, 'column')
	    };

	    // Find the section containing the generated position we're trying to map
	    // to an original position.
	    var sectionIndex = binarySearch.search(needle, this._sections,
	      function(needle, section) {
	        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
	        if (cmp) {
	          return cmp;
	        }

	        return (needle.generatedColumn -
	                section.generatedOffset.generatedColumn);
	      });
	    var section = this._sections[sectionIndex];

	    if (!section) {
	      return {
	        source: null,
	        line: null,
	        column: null,
	        name: null
	      };
	    }

	    return section.consumer.originalPositionFor({
	      line: needle.generatedLine -
	        (section.generatedOffset.generatedLine - 1),
	      column: needle.generatedColumn -
	        (section.generatedOffset.generatedLine === needle.generatedLine
	         ? section.generatedOffset.generatedColumn - 1
	         : 0),
	      bias: aArgs.bias
	    });
	  };

	/**
	 * Return true if we have the source content for every source in the source
	 * map, false otherwise.
	 */
	IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
	  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
	    return this._sections.every(function (s) {
	      return s.consumer.hasContentsOfAllSources();
	    });
	  };

	/**
	 * Returns the original source content. The only argument is the url of the
	 * original source file. Returns null if no original source content is
	 * available.
	 */
	IndexedSourceMapConsumer.prototype.sourceContentFor =
	  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
	    for (var i = 0; i < this._sections.length; i++) {
	      var section = this._sections[i];

	      var content = section.consumer.sourceContentFor(aSource, true);
	      if (content) {
	        return content;
	      }
	    }
	    if (nullOnMissing) {
	      return null;
	    }
	    else {
	      throw new Error('"' + aSource + '" is not in the SourceMap.');
	    }
	  };

	/**
	 * Returns the generated line and column information for the original source,
	 * line, and column positions provided. The only argument is an object with
	 * the following properties:
	 *
	 *   - source: The filename of the original source.
	 *   - line: The line number in the original source.  The line number
	 *     is 1-based.
	 *   - column: The column number in the original source.  The column
	 *     number is 0-based.
	 *
	 * and an object is returned with the following properties:
	 *
	 *   - line: The line number in the generated source, or null.  The
	 *     line number is 1-based. 
	 *   - column: The column number in the generated source, or null.
	 *     The column number is 0-based.
	 */
	IndexedSourceMapConsumer.prototype.generatedPositionFor =
	  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
	    for (var i = 0; i < this._sections.length; i++) {
	      var section = this._sections[i];

	      // Only consider this section if the requested source is in the list of
	      // sources of the consumer.
	      if (section.consumer._findSourceIndex(util.getArg(aArgs, 'source')) === -1) {
	        continue;
	      }
	      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
	      if (generatedPosition) {
	        var ret = {
	          line: generatedPosition.line +
	            (section.generatedOffset.generatedLine - 1),
	          column: generatedPosition.column +
	            (section.generatedOffset.generatedLine === generatedPosition.line
	             ? section.generatedOffset.generatedColumn - 1
	             : 0)
	        };
	        return ret;
	      }
	    }

	    return {
	      line: null,
	      column: null
	    };
	  };

	/**
	 * Parse the mappings in a string in to a data structure which we can easily
	 * query (the ordered arrays in the `this.__generatedMappings` and
	 * `this.__originalMappings` properties).
	 */
	IndexedSourceMapConsumer.prototype._parseMappings =
	  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	    this.__generatedMappings = [];
	    this.__originalMappings = [];
	    for (var i = 0; i < this._sections.length; i++) {
	      var section = this._sections[i];
	      var sectionMappings = section.consumer._generatedMappings;
	      for (var j = 0; j < sectionMappings.length; j++) {
	        var mapping = sectionMappings[j];

	        var source = section.consumer._sources.at(mapping.source);
	        source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
	        this._sources.add(source);
	        source = this._sources.indexOf(source);

	        var name = null;
	        if (mapping.name) {
	          name = section.consumer._names.at(mapping.name);
	          this._names.add(name);
	          name = this._names.indexOf(name);
	        }

	        // The mappings coming from the consumer for the section have
	        // generated positions relative to the start of the section, so we
	        // need to offset them to be relative to the start of the concatenated
	        // generated file.
	        var adjustedMapping = {
	          source: source,
	          generatedLine: mapping.generatedLine +
	            (section.generatedOffset.generatedLine - 1),
	          generatedColumn: mapping.generatedColumn +
	            (section.generatedOffset.generatedLine === mapping.generatedLine
	            ? section.generatedOffset.generatedColumn - 1
	            : 0),
	          originalLine: mapping.originalLine,
	          originalColumn: mapping.originalColumn,
	          name: name
	        };

	        this.__generatedMappings.push(adjustedMapping);
	        if (typeof adjustedMapping.originalLine === 'number') {
	          this.__originalMappings.push(adjustedMapping);
	        }
	      }
	    }

	    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
	    quickSort(this.__originalMappings, util.compareByOriginalPositions);
	  };

	sourceMapConsumer.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
	return sourceMapConsumer;
}

var sourceNode = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredSourceNode;

function requireSourceNode () {
	if (hasRequiredSourceNode) return sourceNode;
	hasRequiredSourceNode = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var SourceMapGenerator = requireSourceMapGenerator().SourceMapGenerator;
	var util = requireUtil();

	// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
	// operating systems these days (capturing the result).
	var REGEX_NEWLINE = /(\r?\n)/;

	// Newline character code for charCodeAt() comparisons
	var NEWLINE_CODE = 10;

	// Private symbol for identifying `SourceNode`s when multiple versions of
	// the source-map library are loaded. This MUST NOT CHANGE across
	// versions!
	var isSourceNode = "$$$isSourceNode$$$";

	/**
	 * SourceNodes provide a way to abstract over interpolating/concatenating
	 * snippets of generated JavaScript source code while maintaining the line and
	 * column information associated with the original source code.
	 *
	 * @param aLine The original line number.
	 * @param aColumn The original column number.
	 * @param aSource The original source's filename.
	 * @param aChunks Optional. An array of strings which are snippets of
	 *        generated JS, or other SourceNodes.
	 * @param aName The original identifier.
	 */
	function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
	  this.children = [];
	  this.sourceContents = {};
	  this.line = aLine == null ? null : aLine;
	  this.column = aColumn == null ? null : aColumn;
	  this.source = aSource == null ? null : aSource;
	  this.name = aName == null ? null : aName;
	  this[isSourceNode] = true;
	  if (aChunks != null) this.add(aChunks);
	}

	/**
	 * Creates a SourceNode from generated code and a SourceMapConsumer.
	 *
	 * @param aGeneratedCode The generated code
	 * @param aSourceMapConsumer The SourceMap for the generated code
	 * @param aRelativePath Optional. The path that relative sources in the
	 *        SourceMapConsumer should be relative to.
	 */
	SourceNode.fromStringWithSourceMap =
	  function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
	    // The SourceNode we want to fill with the generated code
	    // and the SourceMap
	    var node = new SourceNode();

	    // All even indices of this array are one line of the generated code,
	    // while all odd indices are the newlines between two adjacent lines
	    // (since `REGEX_NEWLINE` captures its match).
	    // Processed fragments are accessed by calling `shiftNextLine`.
	    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
	    var remainingLinesIndex = 0;
	    var shiftNextLine = function() {
	      var lineContents = getNextLine();
	      // The last line of a file might not have a newline.
	      var newLine = getNextLine() || "";
	      return lineContents + newLine;

	      function getNextLine() {
	        return remainingLinesIndex < remainingLines.length ?
	            remainingLines[remainingLinesIndex++] : undefined;
	      }
	    };

	    // We need to remember the position of "remainingLines"
	    var lastGeneratedLine = 1, lastGeneratedColumn = 0;

	    // The generate SourceNodes we need a code range.
	    // To extract it current and last mapping is used.
	    // Here we store the last mapping.
	    var lastMapping = null;

	    aSourceMapConsumer.eachMapping(function (mapping) {
	      if (lastMapping !== null) {
	        // We add the code from "lastMapping" to "mapping":
	        // First check if there is a new line in between.
	        if (lastGeneratedLine < mapping.generatedLine) {
	          // Associate first line with "lastMapping"
	          addMappingWithCode(lastMapping, shiftNextLine());
	          lastGeneratedLine++;
	          lastGeneratedColumn = 0;
	          // The remaining code is added without mapping
	        } else {
	          // There is no new line in between.
	          // Associate the code between "lastGeneratedColumn" and
	          // "mapping.generatedColumn" with "lastMapping"
	          var nextLine = remainingLines[remainingLinesIndex] || '';
	          var code = nextLine.substr(0, mapping.generatedColumn -
	                                        lastGeneratedColumn);
	          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn -
	                                              lastGeneratedColumn);
	          lastGeneratedColumn = mapping.generatedColumn;
	          addMappingWithCode(lastMapping, code);
	          // No more remaining code, continue
	          lastMapping = mapping;
	          return;
	        }
	      }
	      // We add the generated code until the first mapping
	      // to the SourceNode without any mapping.
	      // Each line is added as separate string.
	      while (lastGeneratedLine < mapping.generatedLine) {
	        node.add(shiftNextLine());
	        lastGeneratedLine++;
	      }
	      if (lastGeneratedColumn < mapping.generatedColumn) {
	        var nextLine = remainingLines[remainingLinesIndex] || '';
	        node.add(nextLine.substr(0, mapping.generatedColumn));
	        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
	        lastGeneratedColumn = mapping.generatedColumn;
	      }
	      lastMapping = mapping;
	    }, this);
	    // We have processed all mappings.
	    if (remainingLinesIndex < remainingLines.length) {
	      if (lastMapping) {
	        // Associate the remaining code in the current line with "lastMapping"
	        addMappingWithCode(lastMapping, shiftNextLine());
	      }
	      // and add the remaining lines without any mapping
	      node.add(remainingLines.splice(remainingLinesIndex).join(""));
	    }

	    // Copy sourcesContent into SourceNode
	    aSourceMapConsumer.sources.forEach(function (sourceFile) {
	      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	      if (content != null) {
	        if (aRelativePath != null) {
	          sourceFile = util.join(aRelativePath, sourceFile);
	        }
	        node.setSourceContent(sourceFile, content);
	      }
	    });

	    return node;

	    function addMappingWithCode(mapping, code) {
	      if (mapping === null || mapping.source === undefined) {
	        node.add(code);
	      } else {
	        var source = aRelativePath
	          ? util.join(aRelativePath, mapping.source)
	          : mapping.source;
	        node.add(new SourceNode(mapping.originalLine,
	                                mapping.originalColumn,
	                                source,
	                                code,
	                                mapping.name));
	      }
	    }
	  };

	/**
	 * Add a chunk of generated JS to this source node.
	 *
	 * @param aChunk A string snippet of generated JS code, another instance of
	 *        SourceNode, or an array where each member is one of those things.
	 */
	SourceNode.prototype.add = function SourceNode_add(aChunk) {
	  if (Array.isArray(aChunk)) {
	    aChunk.forEach(function (chunk) {
	      this.add(chunk);
	    }, this);
	  }
	  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
	    if (aChunk) {
	      this.children.push(aChunk);
	    }
	  }
	  else {
	    throw new TypeError(
	      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
	    );
	  }
	  return this;
	};

	/**
	 * Add a chunk of generated JS to the beginning of this source node.
	 *
	 * @param aChunk A string snippet of generated JS code, another instance of
	 *        SourceNode, or an array where each member is one of those things.
	 */
	SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
	  if (Array.isArray(aChunk)) {
	    for (var i = aChunk.length-1; i >= 0; i--) {
	      this.prepend(aChunk[i]);
	    }
	  }
	  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
	    this.children.unshift(aChunk);
	  }
	  else {
	    throw new TypeError(
	      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
	    );
	  }
	  return this;
	};

	/**
	 * Walk over the tree of JS snippets in this node and its children. The
	 * walking function is called once for each snippet of JS and is passed that
	 * snippet and the its original associated source's line/column location.
	 *
	 * @param aFn The traversal function.
	 */
	SourceNode.prototype.walk = function SourceNode_walk(aFn) {
	  var chunk;
	  for (var i = 0, len = this.children.length; i < len; i++) {
	    chunk = this.children[i];
	    if (chunk[isSourceNode]) {
	      chunk.walk(aFn);
	    }
	    else {
	      if (chunk !== '') {
	        aFn(chunk, { source: this.source,
	                     line: this.line,
	                     column: this.column,
	                     name: this.name });
	      }
	    }
	  }
	};

	/**
	 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
	 * each of `this.children`.
	 *
	 * @param aSep The separator.
	 */
	SourceNode.prototype.join = function SourceNode_join(aSep) {
	  var newChildren;
	  var i;
	  var len = this.children.length;
	  if (len > 0) {
	    newChildren = [];
	    for (i = 0; i < len-1; i++) {
	      newChildren.push(this.children[i]);
	      newChildren.push(aSep);
	    }
	    newChildren.push(this.children[i]);
	    this.children = newChildren;
	  }
	  return this;
	};

	/**
	 * Call String.prototype.replace on the very right-most source snippet. Useful
	 * for trimming whitespace from the end of a source node, etc.
	 *
	 * @param aPattern The pattern to replace.
	 * @param aReplacement The thing to replace the pattern with.
	 */
	SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
	  var lastChild = this.children[this.children.length - 1];
	  if (lastChild[isSourceNode]) {
	    lastChild.replaceRight(aPattern, aReplacement);
	  }
	  else if (typeof lastChild === 'string') {
	    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
	  }
	  else {
	    this.children.push(''.replace(aPattern, aReplacement));
	  }
	  return this;
	};

	/**
	 * Set the source content for a source file. This will be added to the SourceMapGenerator
	 * in the sourcesContent field.
	 *
	 * @param aSourceFile The filename of the source file
	 * @param aSourceContent The content of the source file
	 */
	SourceNode.prototype.setSourceContent =
	  function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
	    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
	  };

	/**
	 * Walk over the tree of SourceNodes. The walking function is called for each
	 * source file content and is passed the filename and source content.
	 *
	 * @param aFn The traversal function.
	 */
	SourceNode.prototype.walkSourceContents =
	  function SourceNode_walkSourceContents(aFn) {
	    for (var i = 0, len = this.children.length; i < len; i++) {
	      if (this.children[i][isSourceNode]) {
	        this.children[i].walkSourceContents(aFn);
	      }
	    }

	    var sources = Object.keys(this.sourceContents);
	    for (var i = 0, len = sources.length; i < len; i++) {
	      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
	    }
	  };

	/**
	 * Return the string representation of this source node. Walks over the tree
	 * and concatenates all the various snippets together to one string.
	 */
	SourceNode.prototype.toString = function SourceNode_toString() {
	  var str = "";
	  this.walk(function (chunk) {
	    str += chunk;
	  });
	  return str;
	};

	/**
	 * Returns the string representation of this source node along with a source
	 * map.
	 */
	SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
	  var generated = {
	    code: "",
	    line: 1,
	    column: 0
	  };
	  var map = new SourceMapGenerator(aArgs);
	  var sourceMappingActive = false;
	  var lastOriginalSource = null;
	  var lastOriginalLine = null;
	  var lastOriginalColumn = null;
	  var lastOriginalName = null;
	  this.walk(function (chunk, original) {
	    generated.code += chunk;
	    if (original.source !== null
	        && original.line !== null
	        && original.column !== null) {
	      if(lastOriginalSource !== original.source
	         || lastOriginalLine !== original.line
	         || lastOriginalColumn !== original.column
	         || lastOriginalName !== original.name) {
	        map.addMapping({
	          source: original.source,
	          original: {
	            line: original.line,
	            column: original.column
	          },
	          generated: {
	            line: generated.line,
	            column: generated.column
	          },
	          name: original.name
	        });
	      }
	      lastOriginalSource = original.source;
	      lastOriginalLine = original.line;
	      lastOriginalColumn = original.column;
	      lastOriginalName = original.name;
	      sourceMappingActive = true;
	    } else if (sourceMappingActive) {
	      map.addMapping({
	        generated: {
	          line: generated.line,
	          column: generated.column
	        }
	      });
	      lastOriginalSource = null;
	      sourceMappingActive = false;
	    }
	    for (var idx = 0, length = chunk.length; idx < length; idx++) {
	      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
	        generated.line++;
	        generated.column = 0;
	        // Mappings end at eol
	        if (idx + 1 === length) {
	          lastOriginalSource = null;
	          sourceMappingActive = false;
	        } else if (sourceMappingActive) {
	          map.addMapping({
	            source: original.source,
	            original: {
	              line: original.line,
	              column: original.column
	            },
	            generated: {
	              line: generated.line,
	              column: generated.column
	            },
	            name: original.name
	          });
	        }
	      } else {
	        generated.column++;
	      }
	    }
	  });
	  this.walkSourceContents(function (sourceFile, sourceContent) {
	    map.setSourceContent(sourceFile, sourceContent);
	  });

	  return { code: generated.code, map: map };
	};

	sourceNode.SourceNode = SourceNode;
	return sourceNode;
}

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var hasRequiredSourceMap;

function requireSourceMap () {
	if (hasRequiredSourceMap) return sourceMap;
	hasRequiredSourceMap = 1;
	sourceMap.SourceMapGenerator = requireSourceMapGenerator().SourceMapGenerator;
	sourceMap.SourceMapConsumer = requireSourceMapConsumer().SourceMapConsumer;
	sourceMap.SourceNode = requireSourceNode().SourceNode;
	return sourceMap;
}

/* global define */

var hasRequiredCodeGen;

function requireCodeGen () {
	if (hasRequiredCodeGen) return codeGen.exports;
	hasRequiredCodeGen = 1;
	(function (module, exports$1) {

		exports$1.__esModule = true;

		var _utils = requireUtils();

		var SourceNode = undefined;

		try {
		  /* istanbul ignore next */
		  if (typeof undefined !== 'function' || !undefined.amd) {
		    // We don't support this in AMD environments. For these environments, we asusme that
		    // they are running on the browser and thus have no need for the source-map library.
		    var SourceMap = requireSourceMap();
		    SourceNode = SourceMap.SourceNode;
		  }
		} catch (err) {}
		/* NOP */

		/* istanbul ignore if: tested but not covered in istanbul due to dist build  */
		if (!SourceNode) {
		  SourceNode = function (line, column, srcFile, chunks) {
		    this.src = '';
		    if (chunks) {
		      this.add(chunks);
		    }
		  };
		  /* istanbul ignore next */
		  SourceNode.prototype = {
		    add: function add(chunks) {
		      if (_utils.isArray(chunks)) {
		        chunks = chunks.join('');
		      }
		      this.src += chunks;
		    },
		    prepend: function prepend(chunks) {
		      if (_utils.isArray(chunks)) {
		        chunks = chunks.join('');
		      }
		      this.src = chunks + this.src;
		    },
		    toStringWithSourceMap: function toStringWithSourceMap() {
		      return { code: this.toString() };
		    },
		    toString: function toString() {
		      return this.src;
		    }
		  };
		}

		function castChunk(chunk, codeGen, loc) {
		  if (_utils.isArray(chunk)) {
		    var ret = [];

		    for (var i = 0, len = chunk.length; i < len; i++) {
		      ret.push(codeGen.wrap(chunk[i], loc));
		    }
		    return ret;
		  } else if (typeof chunk === 'boolean' || typeof chunk === 'number') {
		    // Handle primitives that the SourceNode will throw up on
		    return chunk + '';
		  }
		  return chunk;
		}

		function CodeGen(srcFile) {
		  this.srcFile = srcFile;
		  this.source = [];
		}

		CodeGen.prototype = {
		  isEmpty: function isEmpty() {
		    return !this.source.length;
		  },
		  prepend: function prepend(source, loc) {
		    this.source.unshift(this.wrap(source, loc));
		  },
		  push: function push(source, loc) {
		    this.source.push(this.wrap(source, loc));
		  },

		  merge: function merge() {
		    var source = this.empty();
		    this.each(function (line) {
		      source.add(['  ', line, '\n']);
		    });
		    return source;
		  },

		  each: function each(iter) {
		    for (var i = 0, len = this.source.length; i < len; i++) {
		      iter(this.source[i]);
		    }
		  },

		  empty: function empty() {
		    var loc = this.currentLocation || { start: {} };
		    return new SourceNode(loc.start.line, loc.start.column, this.srcFile);
		  },
		  wrap: function wrap(chunk) {
		    var loc = arguments.length <= 1 || arguments[1] === undefined ? this.currentLocation || { start: {} } : arguments[1];

		    if (chunk instanceof SourceNode) {
		      return chunk;
		    }

		    chunk = castChunk(chunk, this, loc);

		    return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk);
		  },

		  functionCall: function functionCall(fn, type, params) {
		    params = this.generateList(params);
		    return this.wrap([fn, type ? '.' + type + '(' : '(', params, ')']);
		  },

		  quotedString: function quotedString(str) {
		    return '"' + (str + '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\u2028/g, '\\u2028') // Per Ecma-262 7.3 + 7.8.4
		    .replace(/\u2029/g, '\\u2029') + '"';
		  },

		  objectLiteral: function objectLiteral(obj) {
		    // istanbul ignore next

		    var _this = this;

		    var pairs = [];

		    Object.keys(obj).forEach(function (key) {
		      var value = castChunk(obj[key], _this);
		      if (value !== 'undefined') {
		        pairs.push([_this.quotedString(key), ':', value]);
		      }
		    });

		    var ret = this.generateList(pairs);
		    ret.prepend('{');
		    ret.add('}');
		    return ret;
		  },

		  generateList: function generateList(entries) {
		    var ret = this.empty();

		    for (var i = 0, len = entries.length; i < len; i++) {
		      if (i) {
		        ret.add(',');
		      }

		      ret.add(castChunk(entries[i], this));
		    }

		    return ret;
		  },

		  generateArray: function generateArray(entries) {
		    var ret = this.generateList(entries);
		    ret.prepend('[');
		    ret.add(']');

		    return ret;
		  }
		};

		exports$1['default'] = CodeGen;
		module.exports = exports$1['default'];
		
	} (codeGen, codeGen.exports));
	return codeGen.exports;
}

var hasRequiredJavascriptCompiler;

function requireJavascriptCompiler () {
	if (hasRequiredJavascriptCompiler) return javascriptCompiler.exports;
	hasRequiredJavascriptCompiler = 1;
	(function (module, exports$1) {

		exports$1.__esModule = true;
		// istanbul ignore next

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		var _base = requireBase$1();

		var _exception = requireException();

		var _exception2 = _interopRequireDefault(_exception);

		var _utils = requireUtils();

		var _codeGen = requireCodeGen();

		var _codeGen2 = _interopRequireDefault(_codeGen);

		function Literal(value) {
		  this.value = value;
		}

		function JavaScriptCompiler() {}

		JavaScriptCompiler.prototype = {
		  // PUBLIC API: You can override these methods in a subclass to provide
		  // alternative compiled forms for name lookup and buffering semantics
		  nameLookup: function nameLookup(parent, name /*,  type */) {
		    return this.internalNameLookup(parent, name);
		  },
		  depthedLookup: function depthedLookup(name) {
		    return [this.aliasable('container.lookup'), '(depths, ', JSON.stringify(name), ')'];
		  },

		  compilerInfo: function compilerInfo() {
		    var revision = _base.COMPILER_REVISION,
		        versions = _base.REVISION_CHANGES[revision];
		    return [revision, versions];
		  },

		  appendToBuffer: function appendToBuffer(source, location, explicit) {
		    // Force a source as this simplifies the merge logic.
		    if (!_utils.isArray(source)) {
		      source = [source];
		    }
		    source = this.source.wrap(source, location);

		    if (this.environment.isSimple) {
		      return ['return ', source, ';'];
		    } else if (explicit) {
		      // This is a case where the buffer operation occurs as a child of another
		      // construct, generally braces. We have to explicitly output these buffer
		      // operations to ensure that the emitted code goes in the correct location.
		      return ['buffer += ', source, ';'];
		    } else {
		      source.appendToBuffer = true;
		      return source;
		    }
		  },

		  initializeBuffer: function initializeBuffer() {
		    return this.quotedString('');
		  },
		  // END PUBLIC API
		  internalNameLookup: function internalNameLookup(parent, name) {
		    this.lookupPropertyFunctionIsUsed = true;
		    return ['lookupProperty(', parent, ',', JSON.stringify(name), ')'];
		  },

		  lookupPropertyFunctionIsUsed: false,

		  compile: function compile(environment, options, context, asObject) {
		    this.environment = environment;
		    this.options = options;
		    this.stringParams = this.options.stringParams;
		    this.trackIds = this.options.trackIds;
		    this.precompile = !asObject;

		    this.name = this.environment.name;
		    this.isChild = !!context;
		    this.context = context || {
		      decorators: [],
		      programs: [],
		      environments: []
		    };

		    this.preamble();

		    this.stackSlot = 0;
		    this.stackVars = [];
		    this.aliases = {};
		    this.registers = { list: [] };
		    this.hashes = [];
		    this.compileStack = [];
		    this.inlineStack = [];
		    this.blockParams = [];

		    this.compileChildren(environment, options);

		    this.useDepths = this.useDepths || environment.useDepths || environment.useDecorators || this.options.compat;
		    this.useBlockParams = this.useBlockParams || environment.useBlockParams;

		    var opcodes = environment.opcodes,
		        opcode = undefined,
		        firstLoc = undefined,
		        i = undefined,
		        l = undefined;

		    for (i = 0, l = opcodes.length; i < l; i++) {
		      opcode = opcodes[i];

		      this.source.currentLocation = opcode.loc;
		      firstLoc = firstLoc || opcode.loc;
		      this[opcode.opcode].apply(this, opcode.args);
		    }

		    // Flush any trailing content that might be pending.
		    this.source.currentLocation = firstLoc;
		    this.pushSource('');

		    /* istanbul ignore next */
		    if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
		      throw new _exception2['default']('Compile completed with content left on stack');
		    }

		    if (!this.decorators.isEmpty()) {
		      this.useDecorators = true;

		      this.decorators.prepend(['var decorators = container.decorators, ', this.lookupPropertyFunctionVarDeclaration(), ';\n']);
		      this.decorators.push('return fn;');

		      if (asObject) {
		        this.decorators = Function.apply(this, ['fn', 'props', 'container', 'depth0', 'data', 'blockParams', 'depths', this.decorators.merge()]);
		      } else {
		        this.decorators.prepend('function(fn, props, container, depth0, data, blockParams, depths) {\n');
		        this.decorators.push('}\n');
		        this.decorators = this.decorators.merge();
		      }
		    } else {
		      this.decorators = undefined;
		    }

		    var fn = this.createFunctionContext(asObject);
		    if (!this.isChild) {
		      var ret = {
		        compiler: this.compilerInfo(),
		        main: fn
		      };

		      if (this.decorators) {
		        ret.main_d = this.decorators; // eslint-disable-line camelcase
		        ret.useDecorators = true;
		      }

		      var _context = this.context;
		      var programs = _context.programs;
		      var decorators = _context.decorators;

		      for (i = 0, l = programs.length; i < l; i++) {
		        if (programs[i]) {
		          ret[i] = programs[i];
		          if (decorators[i]) {
		            ret[i + '_d'] = decorators[i];
		            ret.useDecorators = true;
		          }
		        }
		      }

		      if (this.environment.usePartial) {
		        ret.usePartial = true;
		      }
		      if (this.options.data) {
		        ret.useData = true;
		      }
		      if (this.useDepths) {
		        ret.useDepths = true;
		      }
		      if (this.useBlockParams) {
		        ret.useBlockParams = true;
		      }
		      if (this.options.compat) {
		        ret.compat = true;
		      }

		      if (!asObject) {
		        ret.compiler = JSON.stringify(ret.compiler);

		        this.source.currentLocation = { start: { line: 1, column: 0 } };
		        ret = this.objectLiteral(ret);

		        if (options.srcName) {
		          ret = ret.toStringWithSourceMap({ file: options.destName });
		          ret.map = ret.map && ret.map.toString();
		        } else {
		          ret = ret.toString();
		        }
		      } else {
		        ret.compilerOptions = this.options;
		      }

		      return ret;
		    } else {
		      return fn;
		    }
		  },

		  preamble: function preamble() {
		    // track the last context pushed into place to allow skipping the
		    // getContext opcode when it would be a noop
		    this.lastContext = 0;
		    this.source = new _codeGen2['default'](this.options.srcName);
		    this.decorators = new _codeGen2['default'](this.options.srcName);
		  },

		  createFunctionContext: function createFunctionContext(asObject) {
		    // istanbul ignore next

		    var _this = this;

		    var varDeclarations = '';

		    var locals = this.stackVars.concat(this.registers.list);
		    if (locals.length > 0) {
		      varDeclarations += ', ' + locals.join(', ');
		    }

		    // Generate minimizer alias mappings
		    //
		    // When using true SourceNodes, this will update all references to the given alias
		    // as the source nodes are reused in situ. For the non-source node compilation mode,
		    // aliases will not be used, but this case is already being run on the client and
		    // we aren't concern about minimizing the template size.
		    var aliasCount = 0;
		    Object.keys(this.aliases).forEach(function (alias) {
		      var node = _this.aliases[alias];
		      if (node.children && node.referenceCount > 1) {
		        varDeclarations += ', alias' + ++aliasCount + '=' + alias;
		        node.children[0] = 'alias' + aliasCount;
		      }
		    });

		    if (this.lookupPropertyFunctionIsUsed) {
		      varDeclarations += ', ' + this.lookupPropertyFunctionVarDeclaration();
		    }

		    var params = ['container', 'depth0', 'helpers', 'partials', 'data'];

		    if (this.useBlockParams || this.useDepths) {
		      params.push('blockParams');
		    }
		    if (this.useDepths) {
		      params.push('depths');
		    }

		    // Perform a second pass over the output to merge content when possible
		    var source = this.mergeSource(varDeclarations);

		    if (asObject) {
		      params.push(source);

		      return Function.apply(this, params);
		    } else {
		      return this.source.wrap(['function(', params.join(','), ') {\n  ', source, '}']);
		    }
		  },
		  mergeSource: function mergeSource(varDeclarations) {
		    var isSimple = this.environment.isSimple,
		        appendOnly = !this.forceBuffer,
		        appendFirst = undefined,
		        sourceSeen = undefined,
		        bufferStart = undefined,
		        bufferEnd = undefined;
		    this.source.each(function (line) {
		      if (line.appendToBuffer) {
		        if (bufferStart) {
		          line.prepend('  + ');
		        } else {
		          bufferStart = line;
		        }
		        bufferEnd = line;
		      } else {
		        if (bufferStart) {
		          if (!sourceSeen) {
		            appendFirst = true;
		          } else {
		            bufferStart.prepend('buffer += ');
		          }
		          bufferEnd.add(';');
		          bufferStart = bufferEnd = undefined;
		        }

		        sourceSeen = true;
		        if (!isSimple) {
		          appendOnly = false;
		        }
		      }
		    });

		    if (appendOnly) {
		      if (bufferStart) {
		        bufferStart.prepend('return ');
		        bufferEnd.add(';');
		      } else if (!sourceSeen) {
		        this.source.push('return "";');
		      }
		    } else {
		      varDeclarations += ', buffer = ' + (appendFirst ? '' : this.initializeBuffer());

		      if (bufferStart) {
		        bufferStart.prepend('return buffer + ');
		        bufferEnd.add(';');
		      } else {
		        this.source.push('return buffer;');
		      }
		    }

		    if (varDeclarations) {
		      this.source.prepend('var ' + varDeclarations.substring(2) + (appendFirst ? '' : ';\n'));
		    }

		    return this.source.merge();
		  },

		  lookupPropertyFunctionVarDeclaration: function lookupPropertyFunctionVarDeclaration() {
		    return '\n      lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    }\n    '.trim();
		  },

		  // [blockValue]
		  //
		  // On stack, before: hash, inverse, program, value
		  // On stack, after: return value of blockHelperMissing
		  //
		  // The purpose of this opcode is to take a block of the form
		  // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
		  // replace it on the stack with the result of properly
		  // invoking blockHelperMissing.
		  blockValue: function blockValue(name) {
		    var blockHelperMissing = this.aliasable('container.hooks.blockHelperMissing'),
		        params = [this.contextName(0)];
		    this.setupHelperArgs(name, 0, params);

		    var blockName = this.popStack();
		    params.splice(1, 0, blockName);

		    this.push(this.source.functionCall(blockHelperMissing, 'call', params));
		  },

		  // [ambiguousBlockValue]
		  //
		  // On stack, before: hash, inverse, program, value
		  // Compiler value, before: lastHelper=value of last found helper, if any
		  // On stack, after, if no lastHelper: same as [blockValue]
		  // On stack, after, if lastHelper: value
		  ambiguousBlockValue: function ambiguousBlockValue() {
		    // We're being a bit cheeky and reusing the options value from the prior exec
		    var blockHelperMissing = this.aliasable('container.hooks.blockHelperMissing'),
		        params = [this.contextName(0)];
		    this.setupHelperArgs('', 0, params, true);

		    this.flushInline();

		    var current = this.topStack();
		    params.splice(1, 0, current);

		    this.pushSource(['if (!', this.lastHelper, ') { ', current, ' = ', this.source.functionCall(blockHelperMissing, 'call', params), '}']);
		  },

		  // [appendContent]
		  //
		  // On stack, before: ...
		  // On stack, after: ...
		  //
		  // Appends the string value of `content` to the current buffer
		  appendContent: function appendContent(content) {
		    if (this.pendingContent) {
		      content = this.pendingContent + content;
		    } else {
		      this.pendingLocation = this.source.currentLocation;
		    }

		    this.pendingContent = content;
		  },

		  // [append]
		  //
		  // On stack, before: value, ...
		  // On stack, after: ...
		  //
		  // Coerces `value` to a String and appends it to the current buffer.
		  //
		  // If `value` is truthy, or 0, it is coerced into a string and appended
		  // Otherwise, the empty string is appended
		  append: function append() {
		    if (this.isInline()) {
		      this.replaceStack(function (current) {
		        return [' != null ? ', current, ' : ""'];
		      });

		      this.pushSource(this.appendToBuffer(this.popStack()));
		    } else {
		      var local = this.popStack();
		      this.pushSource(['if (', local, ' != null) { ', this.appendToBuffer(local, undefined, true), ' }']);
		      if (this.environment.isSimple) {
		        this.pushSource(['else { ', this.appendToBuffer("''", undefined, true), ' }']);
		      }
		    }
		  },

		  // [appendEscaped]
		  //
		  // On stack, before: value, ...
		  // On stack, after: ...
		  //
		  // Escape `value` and append it to the buffer
		  appendEscaped: function appendEscaped() {
		    this.pushSource(this.appendToBuffer([this.aliasable('container.escapeExpression'), '(', this.popStack(), ')']));
		  },

		  // [getContext]
		  //
		  // On stack, before: ...
		  // On stack, after: ...
		  // Compiler value, after: lastContext=depth
		  //
		  // Set the value of the `lastContext` compiler value to the depth
		  getContext: function getContext(depth) {
		    this.lastContext = depth;
		  },

		  // [pushContext]
		  //
		  // On stack, before: ...
		  // On stack, after: currentContext, ...
		  //
		  // Pushes the value of the current context onto the stack.
		  pushContext: function pushContext() {
		    this.pushStackLiteral(this.contextName(this.lastContext));
		  },

		  // [lookupOnContext]
		  //
		  // On stack, before: ...
		  // On stack, after: currentContext[name], ...
		  //
		  // Looks up the value of `name` on the current context and pushes
		  // it onto the stack.
		  lookupOnContext: function lookupOnContext(parts, falsy, strict, scoped) {
		    var i = 0;

		    if (!scoped && this.options.compat && !this.lastContext) {
		      // The depthed query is expected to handle the undefined logic for the root level that
		      // is implemented below, so we evaluate that directly in compat mode
		      this.push(this.depthedLookup(parts[i++]));
		    } else {
		      this.pushContext();
		    }

		    this.resolvePath('context', parts, i, falsy, strict);
		  },

		  // [lookupBlockParam]
		  //
		  // On stack, before: ...
		  // On stack, after: blockParam[name], ...
		  //
		  // Looks up the value of `parts` on the given block param and pushes
		  // it onto the stack.
		  lookupBlockParam: function lookupBlockParam(blockParamId, parts) {
		    this.useBlockParams = true;

		    this.push(['blockParams[', blockParamId[0], '][', blockParamId[1], ']']);
		    this.resolvePath('context', parts, 1);
		  },

		  // [lookupData]
		  //
		  // On stack, before: ...
		  // On stack, after: data, ...
		  //
		  // Push the data lookup operator
		  lookupData: function lookupData(depth, parts, strict) {
		    if (!depth) {
		      this.pushStackLiteral('data');
		    } else {
		      this.pushStackLiteral('container.data(data, ' + depth + ')');
		    }

		    this.resolvePath('data', parts, 0, true, strict);
		  },

		  resolvePath: function resolvePath(type, parts, i, falsy, strict) {
		    // istanbul ignore next

		    var _this2 = this;

		    if (this.options.strict || this.options.assumeObjects) {
		      this.push(strictLookup(this.options.strict && strict, this, parts, type));
		      return;
		    }

		    var len = parts.length;
		    for (; i < len; i++) {
		      /* eslint-disable no-loop-func */
		      this.replaceStack(function (current) {
		        var lookup = _this2.nameLookup(current, parts[i], type);
		        // We want to ensure that zero and false are handled properly if the context (falsy flag)
		        // needs to have the special handling for these values.
		        if (!falsy) {
		          return [' != null ? ', lookup, ' : ', current];
		        } else {
		          // Otherwise we can use generic falsy handling
		          return [' && ', lookup];
		        }
		      });
		      /* eslint-enable no-loop-func */
		    }
		  },

		  // [resolvePossibleLambda]
		  //
		  // On stack, before: value, ...
		  // On stack, after: resolved value, ...
		  //
		  // If the `value` is a lambda, replace it on the stack by
		  // the return value of the lambda
		  resolvePossibleLambda: function resolvePossibleLambda() {
		    this.push([this.aliasable('container.lambda'), '(', this.popStack(), ', ', this.contextName(0), ')']);
		  },

		  // [pushStringParam]
		  //
		  // On stack, before: ...
		  // On stack, after: string, currentContext, ...
		  //
		  // This opcode is designed for use in string mode, which
		  // provides the string value of a parameter along with its
		  // depth rather than resolving it immediately.
		  pushStringParam: function pushStringParam(string, type) {
		    this.pushContext();
		    this.pushString(type);

		    // If it's a subexpression, the string result
		    // will be pushed after this opcode.
		    if (type !== 'SubExpression') {
		      if (typeof string === 'string') {
		        this.pushString(string);
		      } else {
		        this.pushStackLiteral(string);
		      }
		    }
		  },

		  emptyHash: function emptyHash(omitEmpty) {
		    if (this.trackIds) {
		      this.push('{}'); // hashIds
		    }
		    if (this.stringParams) {
		      this.push('{}'); // hashContexts
		      this.push('{}'); // hashTypes
		    }
		    this.pushStackLiteral(omitEmpty ? 'undefined' : '{}');
		  },
		  pushHash: function pushHash() {
		    if (this.hash) {
		      this.hashes.push(this.hash);
		    }
		    this.hash = { values: {}, types: [], contexts: [], ids: [] };
		  },
		  popHash: function popHash() {
		    var hash = this.hash;
		    this.hash = this.hashes.pop();

		    if (this.trackIds) {
		      this.push(this.objectLiteral(hash.ids));
		    }
		    if (this.stringParams) {
		      this.push(this.objectLiteral(hash.contexts));
		      this.push(this.objectLiteral(hash.types));
		    }

		    this.push(this.objectLiteral(hash.values));
		  },

		  // [pushString]
		  //
		  // On stack, before: ...
		  // On stack, after: quotedString(string), ...
		  //
		  // Push a quoted version of `string` onto the stack
		  pushString: function pushString(string) {
		    this.pushStackLiteral(this.quotedString(string));
		  },

		  // [pushLiteral]
		  //
		  // On stack, before: ...
		  // On stack, after: value, ...
		  //
		  // Pushes a value onto the stack. This operation prevents
		  // the compiler from creating a temporary variable to hold
		  // it.
		  pushLiteral: function pushLiteral(value) {
		    this.pushStackLiteral(value);
		  },

		  // [pushProgram]
		  //
		  // On stack, before: ...
		  // On stack, after: program(guid), ...
		  //
		  // Push a program expression onto the stack. This takes
		  // a compile-time guid and converts it into a runtime-accessible
		  // expression.
		  pushProgram: function pushProgram(guid) {
		    if (guid != null) {
		      this.pushStackLiteral(this.programExpression(guid));
		    } else {
		      this.pushStackLiteral(null);
		    }
		  },

		  // [registerDecorator]
		  //
		  // On stack, before: hash, program, params..., ...
		  // On stack, after: ...
		  //
		  // Pops off the decorator's parameters, invokes the decorator,
		  // and inserts the decorator into the decorators list.
		  registerDecorator: function registerDecorator(paramSize, name) {
		    var foundDecorator = this.nameLookup('decorators', name, 'decorator'),
		        options = this.setupHelperArgs(name, paramSize);

		    this.decorators.push(['fn = ', this.decorators.functionCall(foundDecorator, '', ['fn', 'props', 'container', options]), ' || fn;']);
		  },

		  // [invokeHelper]
		  //
		  // On stack, before: hash, inverse, program, params..., ...
		  // On stack, after: result of helper invocation
		  //
		  // Pops off the helper's parameters, invokes the helper,
		  // and pushes the helper's return value onto the stack.
		  //
		  // If the helper is not found, `helperMissing` is called.
		  invokeHelper: function invokeHelper(paramSize, name, isSimple) {
		    var nonHelper = this.popStack(),
		        helper = this.setupHelper(paramSize, name);

		    var possibleFunctionCalls = [];

		    if (isSimple) {
		      // direct call to helper
		      possibleFunctionCalls.push(helper.name);
		    }
		    // call a function from the input object
		    possibleFunctionCalls.push(nonHelper);
		    if (!this.options.strict) {
		      possibleFunctionCalls.push(this.aliasable('container.hooks.helperMissing'));
		    }

		    var functionLookupCode = ['(', this.itemsSeparatedBy(possibleFunctionCalls, '||'), ')'];
		    var functionCall = this.source.functionCall(functionLookupCode, 'call', helper.callParams);
		    this.push(functionCall);
		  },

		  itemsSeparatedBy: function itemsSeparatedBy(items, separator) {
		    var result = [];
		    result.push(items[0]);
		    for (var i = 1; i < items.length; i++) {
		      result.push(separator, items[i]);
		    }
		    return result;
		  },
		  // [invokeKnownHelper]
		  //
		  // On stack, before: hash, inverse, program, params..., ...
		  // On stack, after: result of helper invocation
		  //
		  // This operation is used when the helper is known to exist,
		  // so a `helperMissing` fallback is not required.
		  invokeKnownHelper: function invokeKnownHelper(paramSize, name) {
		    var helper = this.setupHelper(paramSize, name);
		    this.push(this.source.functionCall(helper.name, 'call', helper.callParams));
		  },

		  // [invokeAmbiguous]
		  //
		  // On stack, before: hash, inverse, program, params..., ...
		  // On stack, after: result of disambiguation
		  //
		  // This operation is used when an expression like `{{foo}}`
		  // is provided, but we don't know at compile-time whether it
		  // is a helper or a path.
		  //
		  // This operation emits more code than the other options,
		  // and can be avoided by passing the `knownHelpers` and
		  // `knownHelpersOnly` flags at compile-time.
		  invokeAmbiguous: function invokeAmbiguous(name, helperCall) {
		    this.useRegister('helper');

		    var nonHelper = this.popStack();

		    this.emptyHash();
		    var helper = this.setupHelper(0, name, helperCall);

		    var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

		    var lookup = ['(', '(helper = ', helperName, ' || ', nonHelper, ')'];
		    if (!this.options.strict) {
		      lookup[0] = '(helper = ';
		      lookup.push(' != null ? helper : ', this.aliasable('container.hooks.helperMissing'));
		    }

		    this.push(['(', lookup, helper.paramsInit ? ['),(', helper.paramsInit] : [], '),', '(typeof helper === ', this.aliasable('"function"'), ' ? ', this.source.functionCall('helper', 'call', helper.callParams), ' : helper))']);
		  },

		  // [invokePartial]
		  //
		  // On stack, before: context, ...
		  // On stack after: result of partial invocation
		  //
		  // This operation pops off a context, invokes a partial with that context,
		  // and pushes the result of the invocation back.
		  invokePartial: function invokePartial(isDynamic, name, indent) {
		    var params = [],
		        options = this.setupParams(name, 1, params);

		    if (isDynamic) {
		      name = this.popStack();
		      delete options.name;
		    }

		    if (indent) {
		      options.indent = JSON.stringify(indent);
		    }
		    options.helpers = 'helpers';
		    options.partials = 'partials';
		    options.decorators = 'container.decorators';

		    if (!isDynamic) {
		      params.unshift(this.nameLookup('partials', name, 'partial'));
		    } else {
		      params.unshift(name);
		    }

		    if (this.options.compat) {
		      options.depths = 'depths';
		    }
		    options = this.objectLiteral(options);
		    params.push(options);

		    this.push(this.source.functionCall('container.invokePartial', '', params));
		  },

		  // [assignToHash]
		  //
		  // On stack, before: value, ..., hash, ...
		  // On stack, after: ..., hash, ...
		  //
		  // Pops a value off the stack and assigns it to the current hash
		  assignToHash: function assignToHash(key) {
		    var value = this.popStack(),
		        context = undefined,
		        type = undefined,
		        id = undefined;

		    if (this.trackIds) {
		      id = this.popStack();
		    }
		    if (this.stringParams) {
		      type = this.popStack();
		      context = this.popStack();
		    }

		    var hash = this.hash;
		    if (context) {
		      hash.contexts[key] = context;
		    }
		    if (type) {
		      hash.types[key] = type;
		    }
		    if (id) {
		      hash.ids[key] = id;
		    }
		    hash.values[key] = value;
		  },

		  pushId: function pushId(type, name, child) {
		    if (type === 'BlockParam') {
		      this.pushStackLiteral('blockParams[' + name[0] + '].path[' + name[1] + ']' + (child ? ' + ' + JSON.stringify('.' + child) : ''));
		    } else if (type === 'PathExpression') {
		      this.pushString(name);
		    } else if (type === 'SubExpression') {
		      this.pushStackLiteral('true');
		    } else {
		      this.pushStackLiteral('null');
		    }
		  },

		  // HELPERS

		  compiler: JavaScriptCompiler,

		  compileChildren: function compileChildren(environment, options) {
		    var children = environment.children,
		        child = undefined,
		        compiler = undefined;

		    for (var i = 0, l = children.length; i < l; i++) {
		      child = children[i];
		      compiler = new this.compiler(); // eslint-disable-line new-cap

		      var existing = this.matchExistingProgram(child);

		      if (existing == null) {
		        this.context.programs.push(''); // Placeholder to prevent name conflicts for nested children
		        var index = this.context.programs.length;
		        child.index = index;
		        child.name = 'program' + index;
		        this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
		        this.context.decorators[index] = compiler.decorators;
		        this.context.environments[index] = child;

		        this.useDepths = this.useDepths || compiler.useDepths;
		        this.useBlockParams = this.useBlockParams || compiler.useBlockParams;
		        child.useDepths = this.useDepths;
		        child.useBlockParams = this.useBlockParams;
		      } else {
		        child.index = existing.index;
		        child.name = 'program' + existing.index;

		        this.useDepths = this.useDepths || existing.useDepths;
		        this.useBlockParams = this.useBlockParams || existing.useBlockParams;
		      }
		    }
		  },
		  matchExistingProgram: function matchExistingProgram(child) {
		    for (var i = 0, len = this.context.environments.length; i < len; i++) {
		      var environment = this.context.environments[i];
		      if (environment && environment.equals(child)) {
		        return environment;
		      }
		    }
		  },

		  programExpression: function programExpression(guid) {
		    var child = this.environment.children[guid],
		        programParams = [child.index, 'data', child.blockParams];

		    if (this.useBlockParams || this.useDepths) {
		      programParams.push('blockParams');
		    }
		    if (this.useDepths) {
		      programParams.push('depths');
		    }

		    return 'container.program(' + programParams.join(', ') + ')';
		  },

		  useRegister: function useRegister(name) {
		    if (!this.registers[name]) {
		      this.registers[name] = true;
		      this.registers.list.push(name);
		    }
		  },

		  push: function push(expr) {
		    if (!(expr instanceof Literal)) {
		      expr = this.source.wrap(expr);
		    }

		    this.inlineStack.push(expr);
		    return expr;
		  },

		  pushStackLiteral: function pushStackLiteral(item) {
		    this.push(new Literal(item));
		  },

		  pushSource: function pushSource(source) {
		    if (this.pendingContent) {
		      this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
		      this.pendingContent = undefined;
		    }

		    if (source) {
		      this.source.push(source);
		    }
		  },

		  replaceStack: function replaceStack(callback) {
		    var prefix = ['('],
		        stack = undefined,
		        createdStack = undefined,
		        usedLiteral = undefined;

		    /* istanbul ignore next */
		    if (!this.isInline()) {
		      throw new _exception2['default']('replaceStack on non-inline');
		    }

		    // We want to merge the inline statement into the replacement statement via ','
		    var top = this.popStack(true);

		    if (top instanceof Literal) {
		      // Literals do not need to be inlined
		      stack = [top.value];
		      prefix = ['(', stack];
		      usedLiteral = true;
		    } else {
		      // Get or create the current stack name for use by the inline
		      createdStack = true;
		      var _name = this.incrStack();

		      prefix = ['((', this.push(_name), ' = ', top, ')'];
		      stack = this.topStack();
		    }

		    var item = callback.call(this, stack);

		    if (!usedLiteral) {
		      this.popStack();
		    }
		    if (createdStack) {
		      this.stackSlot--;
		    }
		    this.push(prefix.concat(item, ')'));
		  },

		  incrStack: function incrStack() {
		    this.stackSlot++;
		    if (this.stackSlot > this.stackVars.length) {
		      this.stackVars.push('stack' + this.stackSlot);
		    }
		    return this.topStackName();
		  },
		  topStackName: function topStackName() {
		    return 'stack' + this.stackSlot;
		  },
		  flushInline: function flushInline() {
		    var inlineStack = this.inlineStack;
		    this.inlineStack = [];
		    for (var i = 0, len = inlineStack.length; i < len; i++) {
		      var entry = inlineStack[i];
		      /* istanbul ignore if */
		      if (entry instanceof Literal) {
		        this.compileStack.push(entry);
		      } else {
		        var stack = this.incrStack();
		        this.pushSource([stack, ' = ', entry, ';']);
		        this.compileStack.push(stack);
		      }
		    }
		  },
		  isInline: function isInline() {
		    return this.inlineStack.length;
		  },

		  popStack: function popStack(wrapped) {
		    var inline = this.isInline(),
		        item = (inline ? this.inlineStack : this.compileStack).pop();

		    if (!wrapped && item instanceof Literal) {
		      return item.value;
		    } else {
		      if (!inline) {
		        /* istanbul ignore next */
		        if (!this.stackSlot) {
		          throw new _exception2['default']('Invalid stack pop');
		        }
		        this.stackSlot--;
		      }
		      return item;
		    }
		  },

		  topStack: function topStack() {
		    var stack = this.isInline() ? this.inlineStack : this.compileStack,
		        item = stack[stack.length - 1];

		    /* istanbul ignore if */
		    if (item instanceof Literal) {
		      return item.value;
		    } else {
		      return item;
		    }
		  },

		  contextName: function contextName(context) {
		    if (this.useDepths && context) {
		      return 'depths[' + context + ']';
		    } else {
		      return 'depth' + context;
		    }
		  },

		  quotedString: function quotedString(str) {
		    return this.source.quotedString(str);
		  },

		  objectLiteral: function objectLiteral(obj) {
		    return this.source.objectLiteral(obj);
		  },

		  aliasable: function aliasable(name) {
		    var ret = this.aliases[name];
		    if (ret) {
		      ret.referenceCount++;
		      return ret;
		    }

		    ret = this.aliases[name] = this.source.wrap(name);
		    ret.aliasable = true;
		    ret.referenceCount = 1;

		    return ret;
		  },

		  setupHelper: function setupHelper(paramSize, name, blockHelper) {
		    var params = [],
		        paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper);
		    var foundHelper = this.nameLookup('helpers', name, 'helper'),
		        callContext = this.aliasable(this.contextName(0) + ' != null ? ' + this.contextName(0) + ' : (container.nullContext || {})');

		    return {
		      params: params,
		      paramsInit: paramsInit,
		      name: foundHelper,
		      callParams: [callContext].concat(params)
		    };
		  },

		  setupParams: function setupParams(helper, paramSize, params) {
		    var options = {},
		        contexts = [],
		        types = [],
		        ids = [],
		        objectArgs = !params,
		        param = undefined;

		    if (objectArgs) {
		      params = [];
		    }

		    options.name = this.quotedString(helper);
		    options.hash = this.popStack();

		    if (this.trackIds) {
		      options.hashIds = this.popStack();
		    }
		    if (this.stringParams) {
		      options.hashTypes = this.popStack();
		      options.hashContexts = this.popStack();
		    }

		    var inverse = this.popStack(),
		        program = this.popStack();

		    // Avoid setting fn and inverse if neither are set. This allows
		    // helpers to do a check for `if (options.fn)`
		    if (program || inverse) {
		      options.fn = program || 'container.noop';
		      options.inverse = inverse || 'container.noop';
		    }

		    // The parameters go on to the stack in order (making sure that they are evaluated in order)
		    // so we need to pop them off the stack in reverse order
		    var i = paramSize;
		    while (i--) {
		      param = this.popStack();
		      params[i] = param;

		      if (this.trackIds) {
		        ids[i] = this.popStack();
		      }
		      if (this.stringParams) {
		        types[i] = this.popStack();
		        contexts[i] = this.popStack();
		      }
		    }

		    if (objectArgs) {
		      options.args = this.source.generateArray(params);
		    }

		    if (this.trackIds) {
		      options.ids = this.source.generateArray(ids);
		    }
		    if (this.stringParams) {
		      options.types = this.source.generateArray(types);
		      options.contexts = this.source.generateArray(contexts);
		    }

		    if (this.options.data) {
		      options.data = 'data';
		    }
		    if (this.useBlockParams) {
		      options.blockParams = 'blockParams';
		    }
		    return options;
		  },

		  setupHelperArgs: function setupHelperArgs(helper, paramSize, params, useRegister) {
		    var options = this.setupParams(helper, paramSize, params);
		    options.loc = JSON.stringify(this.source.currentLocation);
		    options = this.objectLiteral(options);
		    if (useRegister) {
		      this.useRegister('options');
		      params.push('options');
		      return ['options=', options];
		    } else if (params) {
		      params.push(options);
		      return '';
		    } else {
		      return options;
		    }
		  }
		};

		(function () {
		  var reservedWords = ('break else new var' + ' case finally return void' + ' catch for switch while' + ' continue function this with' + ' default if throw' + ' delete in try' + ' do instanceof typeof' + ' abstract enum int short' + ' boolean export interface static' + ' byte extends long super' + ' char final native synchronized' + ' class float package throws' + ' const goto private transient' + ' debugger implements protected volatile' + ' double import public let yield await' + ' null true false').split(' ');

		  var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

		  for (var i = 0, l = reservedWords.length; i < l; i++) {
		    compilerWords[reservedWords[i]] = true;
		  }
		})();

		/**
		 * @deprecated May be removed in the next major version
		 */
		JavaScriptCompiler.isValidJavaScriptVariableName = function (name) {
		  return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
		};

		function strictLookup(requireTerminal, compiler, parts, type) {
		  var stack = compiler.popStack(),
		      i = 0,
		      len = parts.length;
		  if (requireTerminal) {
		    len--;
		  }

		  for (; i < len; i++) {
		    stack = compiler.nameLookup(stack, parts[i], type);
		  }

		  if (requireTerminal) {
		    return [compiler.aliasable('container.strict'), '(', stack, ', ', compiler.quotedString(parts[i]), ', ', JSON.stringify(compiler.source.currentLocation), ' )'];
		  } else {
		    return stack;
		  }
		}

		exports$1['default'] = JavaScriptCompiler;
		module.exports = exports$1['default'];
		
	} (javascriptCompiler, javascriptCompiler.exports));
	return javascriptCompiler.exports;
}

var hasRequiredHandlebars;

function requireHandlebars () {
	if (hasRequiredHandlebars) return handlebars.exports;
	hasRequiredHandlebars = 1;
	(function (module, exports$1) {

		exports$1.__esModule = true;
		// istanbul ignore next

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		var _handlebarsRuntime = requireHandlebars_runtime();

		var _handlebarsRuntime2 = _interopRequireDefault(_handlebarsRuntime);

		// Compiler imports

		var _handlebarsCompilerAst = requireAst();

		var _handlebarsCompilerAst2 = _interopRequireDefault(_handlebarsCompilerAst);

		var _handlebarsCompilerBase = requireBase();

		var _handlebarsCompilerCompiler = requireCompiler();

		var _handlebarsCompilerJavascriptCompiler = requireJavascriptCompiler();

		var _handlebarsCompilerJavascriptCompiler2 = _interopRequireDefault(_handlebarsCompilerJavascriptCompiler);

		var _handlebarsCompilerVisitor = requireVisitor();

		var _handlebarsCompilerVisitor2 = _interopRequireDefault(_handlebarsCompilerVisitor);

		var _handlebarsNoConflict = requireNoConflict();

		var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

		var _create = _handlebarsRuntime2['default'].create;
		function create() {
		  var hb = _create();

		  hb.compile = function (input, options) {
		    return _handlebarsCompilerCompiler.compile(input, options, hb);
		  };
		  hb.precompile = function (input, options) {
		    return _handlebarsCompilerCompiler.precompile(input, options, hb);
		  };

		  hb.AST = _handlebarsCompilerAst2['default'];
		  hb.Compiler = _handlebarsCompilerCompiler.Compiler;
		  hb.JavaScriptCompiler = _handlebarsCompilerJavascriptCompiler2['default'];
		  hb.Parser = _handlebarsCompilerBase.parser;
		  hb.parse = _handlebarsCompilerBase.parse;
		  hb.parseWithoutProcessing = _handlebarsCompilerBase.parseWithoutProcessing;

		  return hb;
		}

		var inst = create();
		inst.create = create;

		_handlebarsNoConflict2['default'](inst);

		inst.Visitor = _handlebarsCompilerVisitor2['default'];

		inst['default'] = inst;

		exports$1['default'] = inst;
		module.exports = exports$1['default'];
		
	} (handlebars, handlebars.exports));
	return handlebars.exports;
}

var printer = {};

/* eslint-disable new-cap */

var hasRequiredPrinter;

function requirePrinter () {
	if (hasRequiredPrinter) return printer;
	hasRequiredPrinter = 1;

	printer.__esModule = true;
	printer.print = print;
	printer.PrintVisitor = PrintVisitor;
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _visitor = requireVisitor();

	var _visitor2 = _interopRequireDefault(_visitor);

	function print(ast) {
	  return new PrintVisitor().accept(ast);
	}

	function PrintVisitor() {
	  this.padding = 0;
	}

	PrintVisitor.prototype = new _visitor2['default']();

	PrintVisitor.prototype.pad = function (string) {
	  var out = '';

	  for (var i = 0, l = this.padding; i < l; i++) {
	    out += '  ';
	  }

	  out += string + '\n';
	  return out;
	};

	PrintVisitor.prototype.Program = function (program) {
	  var out = '',
	      body = program.body,
	      i = undefined,
	      l = undefined;

	  if (program.blockParams) {
	    var blockParams = 'BLOCK PARAMS: [';
	    for (i = 0, l = program.blockParams.length; i < l; i++) {
	      blockParams += ' ' + program.blockParams[i];
	    }
	    blockParams += ' ]';
	    out += this.pad(blockParams);
	  }

	  for (i = 0, l = body.length; i < l; i++) {
	    out += this.accept(body[i]);
	  }

	  this.padding--;

	  return out;
	};

	PrintVisitor.prototype.MustacheStatement = function (mustache) {
	  return this.pad('{{ ' + this.SubExpression(mustache) + ' }}');
	};
	PrintVisitor.prototype.Decorator = function (mustache) {
	  return this.pad('{{ DIRECTIVE ' + this.SubExpression(mustache) + ' }}');
	};

	PrintVisitor.prototype.BlockStatement = PrintVisitor.prototype.DecoratorBlock = function (block) {
	  var out = '';

	  out += this.pad((block.type === 'DecoratorBlock' ? 'DIRECTIVE ' : '') + 'BLOCK:');
	  this.padding++;
	  out += this.pad(this.SubExpression(block));
	  if (block.program) {
	    out += this.pad('PROGRAM:');
	    this.padding++;
	    out += this.accept(block.program);
	    this.padding--;
	  }
	  if (block.inverse) {
	    if (block.program) {
	      this.padding++;
	    }
	    out += this.pad('{{^}}');
	    this.padding++;
	    out += this.accept(block.inverse);
	    this.padding--;
	    if (block.program) {
	      this.padding--;
	    }
	  }
	  this.padding--;

	  return out;
	};

	PrintVisitor.prototype.PartialStatement = function (partial) {
	  var content = 'PARTIAL:' + partial.name.original;
	  if (partial.params[0]) {
	    content += ' ' + this.accept(partial.params[0]);
	  }
	  if (partial.hash) {
	    content += ' ' + this.accept(partial.hash);
	  }
	  return this.pad('{{> ' + content + ' }}');
	};
	PrintVisitor.prototype.PartialBlockStatement = function (partial) {
	  var content = 'PARTIAL BLOCK:' + partial.name.original;
	  if (partial.params[0]) {
	    content += ' ' + this.accept(partial.params[0]);
	  }
	  if (partial.hash) {
	    content += ' ' + this.accept(partial.hash);
	  }

	  content += ' ' + this.pad('PROGRAM:');
	  this.padding++;
	  content += this.accept(partial.program);
	  this.padding--;

	  return this.pad('{{> ' + content + ' }}');
	};

	PrintVisitor.prototype.ContentStatement = function (content) {
	  return this.pad("CONTENT[ '" + content.value + "' ]");
	};

	PrintVisitor.prototype.CommentStatement = function (comment) {
	  return this.pad("{{! '" + comment.value + "' }}");
	};

	PrintVisitor.prototype.SubExpression = function (sexpr) {
	  var params = sexpr.params,
	      paramStrings = [],
	      hash = undefined;

	  for (var i = 0, l = params.length; i < l; i++) {
	    paramStrings.push(this.accept(params[i]));
	  }

	  params = '[' + paramStrings.join(', ') + ']';

	  hash = sexpr.hash ? ' ' + this.accept(sexpr.hash) : '';

	  return this.accept(sexpr.path) + ' ' + params + hash;
	};

	PrintVisitor.prototype.PathExpression = function (id) {
	  var path = id.parts.join('/');
	  return (id.data ? '@' : '') + 'PATH:' + path;
	};

	PrintVisitor.prototype.StringLiteral = function (string) {
	  return '"' + string.value + '"';
	};

	PrintVisitor.prototype.NumberLiteral = function (number) {
	  return 'NUMBER{' + number.value + '}';
	};

	PrintVisitor.prototype.BooleanLiteral = function (bool) {
	  return 'BOOLEAN{' + bool.value + '}';
	};

	PrintVisitor.prototype.UndefinedLiteral = function () {
	  return 'UNDEFINED';
	};

	PrintVisitor.prototype.NullLiteral = function () {
	  return 'NULL';
	};

	PrintVisitor.prototype.Hash = function (hash) {
	  var pairs = hash.pairs,
	      joinedPairs = [];

	  for (var i = 0, l = pairs.length; i < l; i++) {
	    joinedPairs.push(this.accept(pairs[i]));
	  }

	  return 'HASH{' + joinedPairs.join(', ') + '}';
	};
	PrintVisitor.prototype.HashPair = function (pair) {
	  return pair.key + '=' + this.accept(pair.value);
	};
	/* eslint-enable new-cap */
	
	return printer;
}

var lib;
var hasRequiredLib;

function requireLib () {
	if (hasRequiredLib) return lib;
	hasRequiredLib = 1;
	// USAGE:
	// var handlebars = require('handlebars');
	/* eslint-disable no-var */

	// var local = handlebars.create();

	var handlebars = requireHandlebars()['default'];

	var printer = requirePrinter();
	handlebars.PrintVisitor = printer.PrintVisitor;
	handlebars.print = printer.print;

	lib = handlebars;

	// Publish a Node.js require() handler for .handlebars and .hbs files
	function extension(module, filename) {
	  var fs = fs__default;
	  var templateString = fs.readFileSync(filename, 'utf8');
	  module.exports = handlebars.compile(templateString);
	}
	/* istanbul ignore else */
	if (typeof commonjsRequire !== 'undefined' && commonjsRequire.extensions) {
	  commonjsRequire.extensions['.handlebars'] = extension;
	  commonjsRequire.extensions['.hbs'] = extension;
	}
	return lib;
}

var libExports = requireLib();
var Handlebars = /*@__PURE__*/getDefaultExportFromCjs(libExports);

const crypto = require('crypto');
// 获取文件内容
const getFileContent = (name, fileConfig) => {
    // 本地环境测试
    if (process.env.STORE_DEV === 'true') {
        // 读取本地文件
        const snippetsPath = path__default.join(process.cwd(), 'public', 'project', name);
        const content = fs__default.readFileSync(snippetsPath, 'utf8');
        return content;
    }
    const fileObj = fileConfig.fileListMap[name];
    // 检查 fileObj 是否存在
    if (!fileObj) {
        console.warn(`File ${name} not found in fileListMap`);
        return "{}";
    }
    // 创建 MD5 哈希对象
    const md5 = crypto.createHash('md5');
    // 根据 更新时间 文件名 生成十六进制格式
    const hash = md5.update(`${fileObj.file_name}${fileObj.update_time}`).digest('hex');
    const filePath = path__default.join(process.cwd(), 'runtime', 'cache', fileConfig.domainID, fileConfig.language, fileConfig.mode, fileConfig.versionId, hash + '.' + fileObj.file_type);
    let content;
    if (fs__default.existsSync(filePath)) {
        // ✅ 新增：缓存存在时直接读取文件
        content = fs__default.readFileSync(filePath, 'utf-8');
    }
    else {
        // 从CDN下载文件并保存到本地
        console.log(`缺少文件${name}`);
        content = "{}";
    }
    if (name == "templates/password.json") {
        console.log('content', content);
    }
    return content;
};

// 本地工具函数
const util = {
    // 检查是否为字符串
    isString: function (val) {
        return typeof val === 'string';
    },
    // 检查是否为对象
    isObject: function (val) {
        return val !== null && typeof val === 'object' && !Array.isArray(val);
    },
    // 检查是否为选项对象
    isOptions: function (val) {
        return val && typeof val === 'object' && val.hash !== undefined;
    },
    // 检查是否未定义
    isUndefined: function (val) {
        return val === undefined;
    },
    // 获取结果值，如果是函数则执行
    result: function (val) {
        if (typeof val === 'function') {
            return val();
        }
        return val;
    },
    // 检查数组中是否包含元素
    indexOf: function (arr, item) {
        if (!Array.isArray(arr))
            return -1;
        return arr.indexOf(item);
    },
    // 执行函数并返回结果
    fn: function (result, context, options) {
        if (options && typeof options.fn === 'function') {
            return options.fn(context);
        }
        return result;
    },
    // 执行inverse函数
    inverse: function (result, context, options) {
        if (options && typeof options.inverse === 'function') {
            return options.inverse(context);
        }
        return result;
    },
    // 返回值，根据是否为块调用
    value: function (result, context, options) {
        if (options && typeof options.fn === 'function') {
            return result ? options.fn(context) : (options.inverse ? options.inverse(context) : '');
        }
        return result;
    },
    // 检查是否为数字
    isNumber: function (value) {
        return typeof value === 'number' && !isNaN(value);
    },
    /**
     * 渲染指定模板文件
     * @param {string} templateName - 模板名称（相对路径）
     * @param {Object} context - 上下文数据
     * @param {Object} fileConfig - 文件配置对象
     * @returns {string} 渲染后的内容
     */
    renderTemplate: function (handlebars, templateName, context, fileConfig) {
        try {
            // 构造模板文件路径
            const templatePath = `${templateName}.html`;
            // 获取模板文件内容
            const templateContent = getFileContent(templatePath, fileConfig);
            if (!templateContent) {
                console.warn(`Template not found: ${templatePath}`);
                return '';
            }
            // 编译模板
            const template = handlebars.compile(templateContent);
            // 渲染模板并返回结果
            return template(context);
        }
        catch (error) {
            console.error(`Error rendering template ${templateName}:`, error);
            return '';
        }
    },
    // 辅助函数：计算要显示的页码范围
    getPageRange: function (current, lastPage) {
        const range = [];
        if (lastPage <= 7) {
            // 如果总页数小于等于7，显示所有页码
            for (let i = 1; i <= lastPage; i++) {
                range.push(i);
            }
        }
        else {
            // 如果总页数大于7，显示部分页码和省略号
            if (current <= 4) {
                // 当前页在前4页内
                for (let i = 1; i <= 5; i++) {
                    range.push(i);
                }
                range.push('...');
                range.push(lastPage);
            }
            else if (current >= lastPage - 3) {
                // 当前页在后4页内
                range.push(1);
                range.push('...');
                for (let i = lastPage - 4; i <= lastPage; i++) {
                    range.push(i);
                }
            }
            else {
                // 当前页在中间
                range.push(1);
                range.push('...');
                for (let i = current - 1; i <= current + 1; i++) {
                    range.push(i);
                }
                range.push('...');
                range.push(lastPage);
            }
        }
        return range;
    }
};

const isObject = (value) => {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
};
const isString = (value) => {
    return typeof value === 'string';
};
function registerStringHelpers(Handlebars) {
    // sanitize助手函数  --- 严格模式：DOMPurify
    Handlebars.registerHelper("sanitize", function (str) {
        if (typeof str !== 'string')
            return '';
        // 移除HTML标签，保留文本内容
        return str.replace(/<[^>]*>/g, '').trim();
    });
    // replace 助手函数
    Handlebars.registerHelper("replace", function (str, a, b) {
        if (typeof str !== 'string')
            return '';
        if (typeof a !== 'string')
            return str;
        if (typeof b !== 'string')
            b = '';
        return str.split(a).join(b);
    });
    // uppercase助手函数
    Handlebars.registerHelper("uppercase", function (str) {
        if (isObject(str) && str.fn) {
            return str.fn(this).toUpperCase();
        }
        if (!isString(str))
            return '';
        return str.toUpperCase();
    });
    // trim 助手函数
    Handlebars.registerHelper("trim", function (str) {
        if (typeof str === 'string') {
            return str.trim();
        }
        return str;
    });
    // after 助手函数
    Handlebars.registerHelper("after", function (array, n) {
        if (array == null)
            return '';
        return array.slice(n);
    });
    // 将字符串中的换行符（\n）替换为HTML换行标签（<br>）。
    // 返回的html标签，需要使用 {{{ }}} 渲染，避免br标签被转义。
    Handlebars.registerHelper("newline_to_br", function (str) {
        if (typeof str !== 'string') {
            return str;
        }
        const result = str.replace(/\n/g, '<br>');
        return new Handlebars.SafeString(result);
    });
    // JSONparse 助手函数
    Handlebars.registerHelper("JSONparse", function (jsonString, options) {
        try {
            // 处理不同类型的输入
            if (typeof jsonString === 'object') {
                // 如果已经是对象，直接返回
                return jsonString;
            }
            if (typeof jsonString !== 'string') {
                // 如果不是字符串也不是对象，根据选项决定返回值
                if (options && options.hash && options.hash.default) {
                    return JSON.parse(options.hash.default);
                }
                return null;
            }
            // 处理空字符串
            if (jsonString.trim() === '') {
                if (options && options.hash && options.hash.default) {
                    return JSON.parse(options.hash.default);
                }
                return null;
            }
            // 解析 JSON 字符串
            const parsed = JSON.parse(jsonString);
            return parsed;
        }
        catch (error) {
            // 如果提供了默认值，尝试解析并返回默认值
            if (options && options.hash && options.hash.default) {
                try {
                    return JSON.parse(options.hash.default);
                }
                catch (defaultError) {
                    console.error('JSONparse default value error:', defaultError);
                }
            }
            // 根据选项决定返回值
            if (options && options.hash && options.hash.returnEmptyObject) {
                return {};
            }
            // 默认返回 null
            return null;
        }
    });
    // stringify 助手函数
    Handlebars.registerHelper("stringify", function (obj) {
        return JSON.stringify(obj);
    });
    // split 助手函数
    Handlebars.registerHelper("split", function (str, ch) {
        if (!util.isString(str))
            return '';
        if (!util.isString(ch))
            ch = ',';
        return str.split(ch);
    });
    // join 助手函数
    Handlebars.registerHelper("join", function (array, separator) {
        if (typeof array === 'string')
            return array;
        if (!Array.isArray(array))
            return '';
        separator = util.isString(separator) ? separator : ', ';
        return array.join(separator);
    });
    // JSONstringify
    Handlebars.registerHelper('JSONstringify', function (context) {
        // 将对象序列化为 JSON 字符串
        const jsonString = JSON.stringify(context);
        // 返回 SafeString 以防止 HTML 转义
        return new Handlebars.SafeString(jsonString);
    });
    // startsWith 助手函数 - 检查字符串是否以指定的子字符串开头
    Handlebars.registerHelper("startsWith", function (string, prefix, options) {
        try {
            // 检查输入参数
            if (string === null || string === undefined || prefix === null || prefix === undefined) {
                // 如果是块级调用，返回inverse块
                if (options && typeof options.fn === 'function' && options.inverse) {
                    return options.inverse(this);
                }
                return false;
            }
            // 确保参数是字符串
            const str = String(string);
            const substr = String(prefix);
            // 检查字符串是否以指定前缀开头
            const result = str.startsWith(substr);
            // 如果是块级调用
            if (options && typeof options.fn === 'function') {
                return result ? options.fn(this) : (options.inverse ? options.inverse(this) : '');
            }
            // 子表达式调用直接返回布尔值
            return result;
        }
        catch (error) {
            console.error('startsWith helper error:', error);
            // 出错时返回false或inverse块
            if (options && typeof options.fn === 'function' && options.inverse) {
                return options.inverse(this);
            }
            return false;
        }
    });
    // numToString 助手函数
    Handlebars.registerHelper('numToString', function (number) {
        try {
            // 处理不同的输入类型
            if (number === null || number === undefined) {
                return '';
            }
            // 如果已经是字符串，直接返回
            if (typeof number === 'string') {
                return number;
            }
            // 如果是数字，转换为字符串
            if (typeof number === 'number') {
                return number.toString();
            }
            // 如果是 bigint 类型
            if (typeof number === 'bigint') {
                return number.toString();
            }
            // 如果是布尔值
            if (typeof number === 'boolean') {
                return number.toString();
            }
            // 如果是对象，尝试转换
            if (typeof number === 'object') {
                // 处理 Number 对象
                if (number instanceof Number) {
                    return number.toString();
                }
                // 处理其他对象，先尝试valueOf
                if (typeof number.valueOf === 'function') {
                    const value = number.valueOf();
                    if (typeof value === 'number' || typeof value === 'bigint') {
                        return value.toString();
                    }
                }
                // 最后尝试JSON序列化
                return JSON.stringify(number);
            }
            // 其他类型直接转换为字符串
            return String(number);
        }
        catch (error) {
            console.error('numToString helper error:', error);
            return '';
        }
    });
}

// 导入工具函数
// 自定义isFalsy函数
function isFalsy(value) {
    return !value || value === 0 || value === '' || Number.isNaN(value);
}
function registerConditionHelpers(Handlebars) {
    // cond助手函数
    Handlebars.registerHelper("cond", function (condition, value1, value2, options) {
        // 支持更复杂的条件判断
        let isTruthy;
        // 如果有哈希参数，可以支持自定义判断逻辑
        if (options.hash) {
            if (options.hash.notEmpty) {
                // 判断是否为非空
                isTruthy = condition !== null &&
                    condition !== undefined &&
                    condition !== '' &&
                    !(Array.isArray(condition) && condition.length === 0);
            }
            else if (options.hash.exists) {
                // 判断是否存在（不为undefined）
                isTruthy = condition !== undefined;
            }
        }
        // 默认的真假值判断
        if (isTruthy === undefined) {
            isTruthy = !!condition;
        }
        // 返回相应值
        return isTruthy ? value1 : value2;
    });
    // boolean助手函数
    Handlebars.registerHelper("boolean", function (...args) {
        // 获取 options 对象（最后一个参数）
        const options = args[args.length - 1];
        // 获取实际的参数（除了 options）
        const values = args.slice(0, -1);
        // 如果只有一个值参数，直接返回其布尔值
        if (values.length === 1) {
            if (options && typeof options.fn === 'function') {
                return values[0] ? options.fn(this) : (options.inverse ? options.inverse(this) : '');
            }
            return !!values[0];
        }
        // 如果有两个值参数，进行简单比较
        if (values.length === 2) {
            if (options && typeof options.fn === 'function') {
                return values[0] == values[1] ? options.fn(this) : (options.inverse ? options.inverse(this) : '');
            }
            return values[0] == values[1];
        }
        // 处理复杂表达式（三个或更多参数）
        if (values.length >= 3) {
            let result = values[0];
            // 按顺序处理操作符和操作数
            for (let i = 1; i < values.length; i += 2) {
                const operator = values[i];
                const operand = values[i + 1];
                // 如果缺少操作数，跳出循环
                if (operand === undefined)
                    break;
                // 定义操作符映射
                const operatorMap = {
                    '==': (a, b) => a == b,
                    '===': (a, b) => a === b,
                    '!=': (a, b) => a != b,
                    '!==': (a, b) => a !== b,
                    '>': (a, b) => a > b,
                    '>=': (a, b) => a >= b,
                    '<': (a, b) => a < b,
                    '<=': (a, b) => a <= b,
                    '&&': (a, b) => a && b,
                    '||': (a, b) => a || b
                };
                // 检查操作符是否有效
                if (!(operator in operatorMap)) {
                    console.error('boolean helper error: Invalid operator', operator);
                    result = false;
                    break;
                }
                // 执行操作
                result = operatorMap[operator](result, operand);
            }
            // 块级调用处理
            if (options && typeof options.fn === 'function') {
                return result ? options.fn(this) : (options.inverse ? options.inverse(this) : '');
            }
            // 返回最终结果
            return result;
        }
        // 默认情况
        if (options && typeof options.fn === 'function') {
            return options.inverse ? options.inverse(this) : '';
        }
        return false;
    });
    // isFalsey助手函数 -- 兼容后代模板
    Handlebars.registerHelper("isFalsey", function (...args) {
        // 获取 options 对象（通常是最后一个参数）
        const options = args[args.length - 1];
        // 获取实际的值参数（除了 options）
        const value = args.length > 1 ? args[0] : undefined;
        // 使用 falsey 库判断值是否为 falsy，然后取反得到 truthy
        const isTruthy = isFalsy(value);
        // 如果是块级调用
        if (options && typeof options.fn === 'function') {
            return isTruthy ? options.fn(this) : (options.inverse ? options.inverse(this) : '');
        }
        // 子表达式调用直接返回布尔值
        return isTruthy;
    });
    // and助手函数
    Handlebars.registerHelper("and", function () {
        // 获取参数
        const args = Array.from(arguments);
        // 最后一个参数是 Handlebars 的 options 对象
        const options = args[args.length - 1];
        // 获取实际的值参数（除了 options）
        const values = args.slice(0, -1);
        // 检查是否所有值都为真
        const allTruthy = values.every(value => {
            // 过滤掉空字符串、null、undefined、false、0、NaN
            return value !== false && value !== null && value !== undefined && value !== 0 && value !== '' && !Number.isNaN(value);
        });
        // 如果是块级调用
        if (options && typeof options.fn === 'function') {
            return allTruthy ? options.fn(this) : (options.inverse ? options.inverse(this) : '');
        }
        // 子表达式调用直接返回布尔值
        return allTruthy;
    });
    // or 助手函数
    Handlebars.registerHelper("or", function () {
        // 获取参数
        const args = Array.from(arguments);
        // 最后一个参数是 Handlebars 的 options 对象
        const options = args[args.length - 1];
        // 获取实际的值参数（除了 options）
        const values = args.slice(0, -1);
        // 检查是否有任何一个值为真
        const hasTruthyValue = values.some(value => {
            // 过滤掉空字符串、null、undefined、false、0、NaN
            return value !== false && value !== null && value !== undefined && value !== 0 && value !== '' && !Number.isNaN(value);
        });
        // 如果是块级调用
        if (options && typeof options.fn === 'function') {
            return hasTruthyValue ? options.fn(this) : (options.inverse ? options.inverse(this) : '');
        }
        // 子表达式调用直接返回布尔值
        return hasTruthyValue;
    });
    // has 助手函数
    Handlebars.registerHelper("has", function (value, pattern, options) {
        // 处理参数
        if (arguments.length === 2 && typeof pattern === 'object' && pattern && typeof pattern.fn === 'function') {
            // 只有两个参数，且第二个参数是options对象
            options = pattern;
            pattern = null;
            // value保持不变
        }
        if (arguments.length === 1 && typeof value === 'object' && value && typeof value.fn === 'function') {
            // 只有一个参数，且它是options对象
            options = value;
            pattern = null;
            value = null;
        }
        if (value === null || value === undefined) {
            // 如果是块级调用，返回false并执行inverse部分
            if (options && typeof options.inverse === 'function') {
                return options.inverse(this);
            }
            return false;
        }
        // 检查value是否为对象且包含pattern属性
        if (arguments.length === 2) {
            // 当只有两个参数时，检查当前上下文(this)中是否包含value属性
            if (this && typeof this === 'object' && value in this) {
                if (options && typeof options.fn === 'function') {
                    return options.fn(this);
                }
                return true;
            }
            else {
                if (options && typeof options.inverse === 'function') {
                    return options.inverse(this);
                }
                return false;
            }
        }
        // 检查value是否为数组或字符串且包含pattern子串
        if ((Array.isArray(value) || typeof value === 'string') && typeof pattern === 'string') {
            if (value.indexOf(pattern) > -1) {
                if (options && typeof options.fn === 'function') {
                    return options.fn(this);
                }
                return true;
            }
        }
        // 检查value是否为对象且包含pattern属性
        if (value && typeof value === 'object' && typeof pattern === 'string' && pattern in value) {
            if (options && typeof options.fn === 'function') {
                return options.fn(this);
            }
            return true;
        }
        // 如果都不匹配，返回inverse部分（如果存在）或false
        if (options && typeof options.inverse === 'function') {
            return options.inverse(this);
        }
        return false;
    });
    // isTruthy助手函数
    Handlebars.registerHelper("isTruthy", function (...args) {
        // 获取 options 对象（通常是最后一个参数）
        const options = args[args.length - 1];
        // 获取实际的值参数（除了 options）
        const value = args.length > 1 ? args[0] : undefined;
        // 使用 falsey 库判断值是否为 falsy，然后取反得到 truthy
        const isTruthy = !isFalsy(value);
        // 如果是块级调用
        if (options && typeof options.fn === 'function') {
            return isTruthy ? options.fn(this) : (options.inverse ? options.inverse(this) : '');
        }
        // 子表达式调用直接返回布尔值
        return isTruthy;
    });
    // gt 助手函数
    Handlebars.registerHelper("gt", function (value1, value2) {
        // 检查参数是否为数字
        const num1 = Number(value1);
        const num2 = Number(value2);
        // 确保转换后的值不是 NaN
        if (isNaN(num1) || isNaN(num2)) {
            return false;
        }
        // 返回第一个值是否大于第二个值
        return num1 > num2;
    });
    // not 助手函数
    Handlebars.registerHelper("not", function (val, options) {
        return util.value(!val, this, options);
    });
    // contains​
    // 判断字符串包含子串或数组包含子元素.
    // variable | contains(value) returns [boolean]
    // 参数​
    // variable string,array: 检查的变量。
    // value string,boolean,number: 检查的值。
    Handlebars.registerHelper("contains", function (variable, value, options) {
        // 获取 options 对象（通常是最后一个参数）
        const args = Array.from(arguments);
        const opts = typeof args[args.length - 1] === 'object' && args[args.length - 1].hash ? args[args.length - 1] : {};
        // 确定 variable 和 value 参数
        let varToCheck, searchValue;
        if (opts === opts) {
            varToCheck = args[0];
            searchValue = args[1];
        }
        // 如果 variable 是 undefined 或 null，返回 false
        if (varToCheck === undefined || varToCheck === null) {
            // 根据是否为块级调用来决定返回值
            if (options && typeof options.fn === 'function') {
                return options.inverse ? options.inverse(this) : '';
            }
            return false;
        }
        let result = false;
        // 检查数组是否包含值
        if (Array.isArray(varToCheck)) {
            result = varToCheck.includes(searchValue);
        }
        // 检查字符串是否包含子字符串
        else if (typeof varToCheck === 'string' && typeof searchValue === 'string') {
            result = varToCheck.includes(searchValue);
        }
        // 检查对象是否包含属性
        else if (typeof varToCheck === 'object' && searchValue in varToCheck) {
            result = true;
        }
        // 如果是块级调用
        if (options && typeof options.fn === 'function') {
            return result ? options.fn(this) : (options.inverse ? options.inverse(this) : '');
        }
        // 子表达式调用直接返回布尔值
        return result;
    });
    // lt 助手函数
    Handlebars.registerHelper("lt", function (a, b, options) {
        try {
            // 处理参数数量变化的情况
            if (arguments.length === 2) {
                options = b;
                b = options.hash && options.hash.compare ? options.hash.compare : 0;
            }
            // 确保比较的值是有效数字
            const numA = Number(a);
            const numB = Number(b);
            // 检查是否为有效数字
            if (isNaN(numA) || isNaN(numB)) {
                return util.value(false, this, options);
            }
            // 执行小于比较
            return util.value(numA < numB, this, options);
        }
        catch (error) {
            console.error('lt helper error:', error);
            console.warn('a:', a);
            console.warn('b:', b);
            return util.value(false, this, options);
        }
    });
    // is 助手函数
    Handlebars.registerHelper("is", function (a, b, options) {
        if (arguments.length === 2) {
            options = b;
            b = options.hash.compare;
        }
        return util.value(a == b, this, options);
    });
    // compare 助手函数 比较运算
    Handlebars.registerHelper('compare', function (value1, operator, value2) {
        switch (operator) {
            case '==': return value1 == value2;
            case '===': return value1 === value2;
            case '!=': return value1 != value2;
            case '!==': return value1 !== value2;
            case '<': return value1 < value2;
            case '<=': return value1 <= value2;
            case '>': return value1 > value2;
            case '>=': return value1 >= value2;
            case '&&': return value1 && value2;
            case '||': return value1 || value2;
            case 'contains':
                return (typeof value1 === 'string' && value1.includes(value2)) ||
                    (Array.isArray(value1) && value1.includes(value2));
            default:
                throw new Error(`Unsupported operator: ${operator}`);
        }
    });
    // eq 助手函数
    Handlebars.registerHelper('eq', function (a, b, options) {
        if (arguments.length === 2) {
            options = b;
            b = options.hash.compare;
        }
        return util.value(a === b, this, options);
    });
}

function registerMathHelpers(Handlebars) {
    // ternary 助手函数
    Handlebars.registerHelper("ternary", function (condition, valueIfTrue, valueIfFalse) {
        // 如果 valueIfFalse 是 options 对象，则说明只传入了两个值参数
        if (typeof valueIfFalse === 'object' && valueIfFalse.hasOwnProperty('hash')) {
            valueIfFalse = undefined;
        }
        // 返回基于条件的值
        return condition ? valueIfTrue : valueIfFalse;
    });
    // 在 Handlebars 中注册 minus 助手函数
    Handlebars.registerHelper("minus", function (value1, value2) {
        // 将参数转换为数字并执行减法运算
        const num1 = Number(value1);
        const num2 = Number(value2);
        // 返回第一个数减去第二个数的结果
        return num1 - num2;
    });
    // add助手函数
    Handlebars.registerHelper("add", function (...args) {
        const values = args.slice(0, -1);
        // 计算所有参数的和
        return values.reduce((sum, value) => {
            return sum + Number(value || 0);
        }, 0);
    });
    // divide助手函数
    Handlebars.registerHelper("divide", function (numA, numB) {
        return Math.floor(numA / numB);
    });
    // subtract 助手函数
    Handlebars.registerHelper("subtract", function (a, b) {
        if (!util.isNumber(a)) {
            throw new TypeError('expected the first argument to be a number');
        }
        if (!util.isNumber(b)) {
            throw new TypeError('expected the second argument to be a number');
        }
        return Number(a) - Number(b);
    });
    // 生成随机整数（包含 min 和 max）
    Handlebars.registerHelper("random", function (min, max) {
        if (!util.isNumber(min)) {
            throw new TypeError('expected minimum to be a number');
        }
        if (!util.isNumber(max)) {
            throw new TypeError('expected maximum to be a number');
        }
        // 确保 min 小于 max
        if (min > max) {
            [min, max] = [max, min]; // 交换值
        }
        // 生成随机整数（包含 min 和 max）
        return Math.floor(Math.random() * (max - min + 1)) + min;
    });
    // multiply助手函数
    Handlebars.registerHelper('multiply', function (a, b) {
        return parseFloat(a) * parseFloat(b);
    });
    // plus 助手函数
    Handlebars.registerHelper("plus", function (a, b) {
        // 将参数转换为数字，如果转换失败则默认为0
        const numA = Number(a) || 0;
        const numB = Number(b) || 0;
        // 检查转换后的值是否为有效数字
        if (isNaN(numA) || isNaN(numB)) {
            // 如果任一参数无法转换为有效数字，则返回0
            return 0;
        }
        return numA + numB;
    });
    // replace_by_regex 助手函数
    Handlebars.registerHelper('replace_by_regex', function (str, pattern, flags, replacement) {
        try {
            const regex = new RegExp(pattern, flags);
            return str.replace(regex, replacement);
        }
        catch (e) {
            return str;
        }
    });
}

var dayjs_min$1 = {exports: {}};

var dayjs_min = dayjs_min$1.exports;

var hasRequiredDayjs_min;

function requireDayjs_min () {
	if (hasRequiredDayjs_min) return dayjs_min$1.exports;
	hasRequiredDayjs_min = 1;
	(function (module, exports$1) {
		!function(t,e){module.exports=e();}(dayjs_min,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return "["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p="$isDayjsObject",S=function(t){return t instanceof _||!(!t||!t[p])},w=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else {var a=e.name;D[a]=e,i=a;}return !r&&i&&(g=i),i||!r&&g},O=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},b=v;b.l=w,b.i=S,b.w=function(t,e){return O(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=w(t.locale,null,true),this.parse(t),this.$x=this.$x||t.x||{},this[p]=true;}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return b},m.isValid=function(){return !(this.$d.toString()===l)},m.isSame=function(t,e){var n=O(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return O(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<O(t)},m.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!b.u(e)||e,f=b.p(t),l=function(t,e){var i=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,false)},m.$set=function(t,e){var n,o=b.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[b.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=b.p(f),y=function(t){var e=O(l);return b.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return b.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=b.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return b.s(s%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(y,(function(t,r){return r||function(t){switch(t){case "YY":return String(e.$y).slice(-2);case "YYYY":return b.s(e.$y,4,"0");case "M":return a+1;case "MM":return b.s(a+1,2,"0");case "MMM":return h(n.monthsShort,a,c,3);case "MMMM":return h(c,a);case "D":return e.$D;case "DD":return b.s(e.$D,2,"0");case "d":return String(e.$W);case "dd":return h(n.weekdaysMin,e.$W,o,2);case "ddd":return h(n.weekdaysShort,e.$W,o,3);case "dddd":return o[e.$W];case "H":return String(s);case "HH":return b.s(s,2,"0");case "h":return d(1);case "hh":return d(2);case "a":return $(s,u,true);case "A":return $(s,u,false);case "m":return String(u);case "mm":return b.s(u,2,"0");case "s":return String(e.$s);case "ss":return b.s(e.$s,2,"0");case "SSS":return b.s(e.$ms,3,"0");case "Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=this,M=b.p(d),m=O(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function(){return b.m(y,m)};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g;}return l?$:b.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=w(t,e,true);return r&&(n.$L=r),n},m.clone=function(){return b.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),k=_.prototype;return O.prototype=k,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){k[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),O.extend=function(t,e){return t.$i||(t(e,_,O),t.$i=true),O},O.locale=w,O.isDayjs=S,O.unix=function(t){return O(1e3*t)},O.en=D[g],O.Ls=D,O.p={},O})); 
	} (dayjs_min$1));
	return dayjs_min$1.exports;
}

var dayjs_minExports = requireDayjs_min();
var dayjs = /*@__PURE__*/getDefaultExportFromCjs(dayjs_minExports);

// 导入工具函数
function registerCoreHelpers(Handlebars) {
    // content_for_footer 助手函数
    Handlebars.registerHelper("content_for_footer", function () {
    });
    // get助手函数
    Handlebars.registerHelper("get", function (propertyPath, object, options) {
        try {
            // 处理参数
            if (propertyPath === null || propertyPath === undefined ||
                object === null || object === undefined) {
                return undefined;
            }
            // 如果 propertyPath 是一个字符串且包含点号，需要递归查找
            if (typeof propertyPath === 'string' && propertyPath.includes('.')) {
                const keys = propertyPath.split('.');
                let result = object;
                // 逐级访问嵌套属性
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i].trim();
                    if (result && typeof result === 'object' && key in result) {
                        result = result[key];
                    }
                    else {
                        return undefined;
                    }
                }
                return result;
            }
            // 直接属性访问
            if (typeof object === 'object' && propertyPath in object) {
                return object[propertyPath];
            }
            return undefined;
        }
        catch (error) {
            console.error('get helper error:', error);
            return undefined;
        }
    });
    // lte助手函数
    Handlebars.registerHelper("lte", function (value1, value2) {
        // 直接返回第二个值，实现"将第二个值赋值给第一个值"的功能
        return value2;
    });
    // 自定义if助手函数
    Handlebars.registerHelper("if", function (...args) {
        // 获取 options 对象（通常是最后一个参数）
        const options = args[args.length - 1];
        // 判断是否为块级调用
        const isBlockCall = typeof options === 'object' && options.fn;
        // 操作符
        const operatorMap = {
            '==': function (v1, v2) { return v1 == v2; },
            '===': function (v1, v2) { return v1 === v2; },
            '!=': function (v1, v2) { return v1 != v2; },
            '!==': function (v1, v2) { return v1 !== v2; },
            '>': function (v1, v2) { return v1 > v2; },
            '<': function (v1, v2) { return v1 < v2; },
            '>=': function (v1, v2) { return v1 >= v2; },
            '<=': function (v1, v2) { return v1 <= v2; },
            'and': function (v1, v2) { return v1 && v2; },
            'or': function (v1, v2) { return v1 || v2; },
            'contains': function (v1, v2) {
                // 检查 v1 是否为数组且包含 v2
                if (Array.isArray(v1)) {
                    return v1.includes(v2);
                }
                // 如果 v1 是字符串，检查是否包含子字符串
                if (typeof v1 === 'string' && typeof v2 === 'string') {
                    return v1.includes(v2);
                }
                return false;
            },
        };
        if (isBlockCall) {
            if (args.length == 4) {
                return operatorMap[args[1]](args[0], args[2]) ? options.fn(this) : options.inverse(this);
            }
            else {
                return args[0] ? options.fn(this) : options.inverse(this);
            }
        }
        else {
            if (args.length == 4) {
                return operatorMap[args[1]](args[0], args[2]);
            }
            else {
                return args[0];
            }
        }
    });
    Handlebars.registerHelper("forEach", function (array, options) {
        if (!array || !Array.isArray(array) || array.length === 0) {
            return '';
        }
        let result = '';
        for (let i = 0; i < array.length; i++) {
            // 创建当前项的上下文
            const itemContext = Object.create(this);
            // 添加数组遍历相关的属性
            Object.assign(itemContext, array[i]); // 合并当前项的属性
            itemContext['@index'] = i;
            itemContext['@first'] = (i === 0);
            itemContext['@last'] = (i === array.length - 1);
            itemContext['@odd'] = (i % 2 === 1);
            itemContext['@even'] = (i % 2 === 0);
            itemContext['isLast'] = (i === array.length - 1); // 用于您的代码中的判断
            // 执行模板并累加结果
            result += options.fn(itemContext);
        }
        return result;
    });
    // assign助手函数
    Handlebars.registerHelper('assign', function (key, value, options) {
        // 在当前上下文中创建变量
        if (value) {
            this[key] = value;
        }
        return '';
    });
    // default助手函数
    Handlebars.registerHelper("default", function (value, defaultValue, options) {
        try {
            // 处理参数
            // 如果第三个参数是 options（Handlebars 的 options 对象）
            if (!options && typeof defaultValue === 'object' && defaultValue !== null && defaultValue.hash) {
                options = defaultValue;
                defaultValue = undefined;
            }
            // 获取配置选项
            const config = {
                allowEmptyStr: options && options.hash && options.hash.allow_empty_str ? options.hash.allow_empty_str : false,
                allowFalse: options && options.hash && options.hash.allow_false ? options.hash.allow_false : false
            };
            // 检查值是否为空
            let isEmpty = false;
            // 检查 null 或 undefined
            if (value === null || value === undefined) {
                isEmpty = true;
            }
            // 检查空字符串（除非 allowEmptyStr 为 true）
            else if (value === '' && !config.allowEmptyStr) {
                isEmpty = true;
            }
            // 检查 false（除非 allowFalse 为 true）
            // else if (value === false && !config.allowFalse) {
            //   isEmpty = true;
            // }
            // 如果值为空，返回默认值；否则返回原值
            return isEmpty ? (defaultValue !== undefined ? defaultValue : '') : value;
        }
        catch (error) {
            console.error('default helper error:', error);
            // 出错时返回空字符串
            return '';
        }
    });
    // preload_state助手函数 -- 预加载 数据，将数据存储在 window 对象中
    Handlebars.registerHelper("preload_state", function (...args) {
        try {
            // 获取 options 对象（通常是最后一个参数）
            const options = args[args.length - 1];
            // 获取实际的参数（除了 options）
            const stateKeys = args.slice(0, -1);
            // 生成预加载脚本 (无论是否为块级调用都要生成脚本)
            let scriptContent = '<script>';
            scriptContent += 'window.__PRELOAD_STATE__ = window.__PRELOAD_STATE__ || {};';
            // 创建状态对象树
            const stateTree = {};
            stateKeys.forEach(key => {
                if (typeof key !== 'string')
                    return;
                // 获取数据值
                let value = undefined;
                if (key.includes('.')) {
                    const keys = key.split('.');
                    let result = this;
                    let found = true;
                    for (let i = 0; i < keys.length; i++) {
                        const k = keys[i].trim();
                        if (result && typeof result === 'object' && k in result) {
                            result = result[k];
                        }
                        else {
                            found = false;
                            break;
                        }
                    }
                    if (found)
                        value = result;
                }
                else if (key in this) {
                    value = this[key];
                }
                // 3. 将值添加到状态树
                if (value !== undefined) {
                    const keys = key.split('.');
                    let current = stateTree; // 明确类型定义;
                    for (let i = 0; i < keys.length - 1; i++) {
                        const k = keys[i];
                        if (!current[k])
                            current[k] = {};
                        current = current[k];
                    }
                    current[keys[keys.length - 1]] = value;
                }
            });
            // 生成对象赋值语句（关键修改点）
            Object.keys(stateTree).forEach(topLevelKey => {
                try {
                    const value = stateTree[topLevelKey];
                    scriptContent += `window.__PRELOAD_STATE__.${topLevelKey} = ${JSON.stringify(value)};`;
                }
                catch (e) {
                    scriptContent += `window.__PRELOAD_STATE__.${topLevelKey} = null;`;
                }
            });
            scriptContent += '</script>';
            // 如果是块级调用
            if (options && typeof options.fn === 'function') {
                // 执行块内容
                const blockContent = options.fn(this);
                return new Handlebars.SafeString(scriptContent + blockContent);
            }
            else {
                // 子表达式调用或简单调用 (也要返回脚本内容)
                return new Handlebars.SafeString(scriptContent);
            }
        }
        catch (error) {
            console.error('preload_state helper error:', error);
            return '';
        }
    });
    // json 助手函数
    Handlebars.registerHelper("json", function (object) {
        try {
            // 如果没有提供参数，返回空字符串
            if (object === undefined || object === null) {
                return '';
            }
            // 如果已经是字符串，尝试解析然后重新序列化，确保是有效的JSON
            if (typeof object === 'string') {
                try {
                    // 尝试解析字符串为对象，然后再序列化
                    const parsed = JSON.parse(object);
                    return JSON.stringify(parsed);
                }
                catch (parseError) {
                    // 如果解析失败，直接序列化原字符串
                    return JSON.stringify(object);
                }
            }
            // 对于对象、数组、数字、布尔值等，直接序列化
            return JSON.stringify(object);
        }
        catch (error) {
            console.error('json helper error:', error);
            // 出错时返回空字符串
            return '';
        }
    });
    // form 助手函数
    Handlebars.registerHelper("form", function (...args) {
        // 获取参数
        const options = args[args.length - 1]; // 最后一个是 Handlebars 的 options 对象
        const formType = args[0]; // 表单类型，如 "localization", "customer" 等
        const attrs = args.slice(1, -1); // 中间的参数作为额外属性
        // 初始化表单属性
        let formAttributes = {
            method: 'post',
            action: '',
            id: '',
            class: '',
            enctype: 'application/x-www-form-urlencoded',
            'accept-charset': 'UTF-8'
        };
        // 处理 hash 参数
        if (options.hash) {
            Object.keys(options.hash).forEach(key => {
                formAttributes[key] = options.hash[key];
            });
        }
        // 根据表单类型设置 action
        switch (formType) {
            case 'localization':
                formAttributes.action = '/api/localization';
                formAttributes.enctype = 'application/x-www-form-urlencoded';
                break;
            case 'customer':
                formAttributes.action = '/account';
                break;
            case 'contact':
                formAttributes.action = '/contact';
                break;
            case 'cart':
                formAttributes.action = '/cart';
                break;
            case 'product':
                formAttributes.action = '/cart/add';
                break;
            case 'storefront_password':
                formAttributes.action = '/api/site/form/storefront_password';
                break;
            default:
                formAttributes.action = '/' + formType;
        }
        // 构建属性字符串
        let attrString = '';
        Object.keys(formAttributes).forEach(key => {
            if (formAttributes[key]) {
                attrString += ` ${key}="${formAttributes[key]}"`;
            }
        });
        // 处理额外的属性参数
        attrs.forEach(attr => {
            if (typeof attr === 'string' && attr.includes('=')) {
                const [key, value] = attr.split('=');
                attrString += ` ${key}="${value}"`;
            }
        });
        // 构建表单开始标签
        let formStart = `<form${attrString}>`;
        // 添加隐藏的表单字段（如果需要）
        let hiddenFields = '';
        // 如果是 localization 表单，添加隐藏字段
        if (formType === 'localization') {
            // 这些值应该从上下文获取，这里用占位符表示
            hiddenFields += `<input type="hidden" name="return_to" value=${this.request.uri.url}></input>`;
        }
        // 获取块内容
        const blockContent = options.fn ? options.fn(this) : '';
        // 构建完整的表单
        const formHtml = `${formStart}${hiddenFields}${blockContent}</form>`;
        return new Handlebars.SafeString(formHtml);
    });
    // length 助手函数
    Handlebars.registerHelper("length", function (value, options) {
        try {
            // 处理不同类型的输入
            if (Array.isArray(value)) {
                // 如果是数组，返回数组长度
                return value.length;
            }
            else if (typeof value === 'string') {
                // 如果是字符串，返回字符串长度
                return value.length;
            }
            else if (value && typeof value === 'object' && value !== null) {
                // 如果是对象，返回对象属性数量
                return Object.keys(value).length;
            }
            else if (typeof value === 'number') {
                // 如果是数字，返回数字的字符串表示长度
                return value.toString().length;
            }
            else {
                // 其他情况返回 0
                return 0;
            }
        }
        catch (error) {
            console.error('length helper error:', error);
            return 0;
        }
    });
    // redirect_to​ 助手函数 -- 生成一个重定向链接
    Handlebars.registerHelper("redirect_to", function redirect_to(url) {
        // 直接返回传入的 URL，或进行一些基本处理
        if (!url)
            return '';
        // 可能会添加一些跟踪参数或处理特殊字符
        return url;
    });
    // append 助手函数
    Handlebars.registerHelper("append", function (...args) {
        try {
            // 获取 options 对象（通常是最后一个参数）
            const options = args[args.length - 1];
            // 获取实际的字符串参数（除了 options）
            const stringArgs = args.slice(0, -1);
            // 处理分隔符参数（如果在哈希参数中指定了 separator）
            let separator = '';
            if (options && options.hash && options.hash.separator) {
                separator = String(options.hash.separator);
            }
            // 过滤掉 null 和 undefined 值，并将所有参数转换为字符串
            const validStrings = stringArgs
                .filter(arg => arg !== null && arg !== undefined)
                .map(arg => String(arg));
            // 使用分隔符连接所有字符串
            return validStrings.join(separator);
        }
        catch (error) {
            console.error('append helper error:', error);
            return '';
        }
    });
    // useLink 助手函数
    Handlebars.registerHelper("useLink", function (linkJSON, query) {
        // preview=1&themeId=68a6a97362dcf056543a5631
        // /products/long-sleeve-sweatshirt-with-letter?  preview=1&themeId=68a6a97362dcf056543a5631
        // 检查输入参数
        if (!linkJSON || typeof linkJSON !== 'string') {
            return {
                hrefAttr: 'href="#"',
                finalSrc: '#'
            };
        }
        const link = JSON.parse(linkJSON);
        let href = '#';
        href = link.value;
        return {
            hrefAttr: `href="${href}"`,
            finalSrc: href
        };
    });
    // object_set
    // 设置对象的属性值
    // 参数:object: 要设置属性的对象key: 属性名value: 属性值returns: 修改后的对象
    Handlebars.registerHelper("object_set", function (object, key, value, options) {
        // 检查参数
        if (!object || typeof object !== 'object') {
            // 如果对象无效，创建一个新对象
            object = {};
        }
        // 确保 key 是字符串
        if (typeof key !== 'string') {
            key = String(key);
        }
        // 设置属性值
        object[key] = value;
        // 不返回任何值，仅用于设置对象属性
        return '';
    });
    // img_size 助手函数
    Handlebars.registerHelper("img_size", function (a, b, options) {
        if (arguments.length === 2) {
            options = b;
            b = options.hash.compare;
        }
        // 直接比较 a 和 b 的大小并返回结果
        return a < b;
    });
    // inArray 助手函数
    Handlebars.registerHelper("inArray", function (array, value, options) {
        // 处理 undefined 和 null 情况
        if (value === undefined || value === null || array === null || array === undefined) {
            return false;
        }
        return util.value(util.indexOf(array, value) > -1, this, options);
    });
    // isEmpty 助手函数
    Handlebars.registerHelper("isEmpty", function (value, options) {
        // 处理 null 和 undefined
        if (value === null || value === undefined) {
            return true;
        }
        // 处理字符串
        if (typeof value === 'string') {
            return value.trim().length === 0;
        }
        // 处理数组
        if (Array.isArray(value)) {
            return value.length === 0;
        }
        // 处理对象
        if (typeof value === 'object') {
            return Object.keys(value).length === 0;
        }
        // 处理数字和布尔值
        // 数字(包括0)和布尔值(false)不被认为是空值
        if (typeof value === 'number' || typeof value === 'boolean') {
            return false;
        }
        // 其他情况，默认不为空
        return false;
    });
    // itemAt助手函数
    Handlebars.registerHelper("itemAt", function (array, idx) {
        array = util.result(array);
        if (Array.isArray(array)) {
            idx = (typeof idx !== 'number' || isNaN(idx)) ? +idx : 0;
            if (idx < 0) {
                return array[array.length + idx];
            }
            if (idx < array.length) {
                return array[idx];
            }
        }
    });
    // obj_size 助手函数
    Handlebars.registerHelper("obj_size", function (obj) {
        if (typeof obj === 'object' && obj !== null) {
            return Object.keys(obj).length;
        }
        return 0;
    });
    // toInt 助手函数
    Handlebars.registerHelper("toInt", function (number) {
        return parseInt(number, 10);
    });
    // size 助手函数 返回字符串或数组的大小。
    Handlebars.registerHelper("size", function (value, options) {
        try {
            // 处理不同类型的输入
            if (Array.isArray(value)) {
                // 如果是数组，返回数组长度
                return value.length;
            }
            else if (typeof value === 'string') {
                // 如果是字符串，返回字符串长度
                return value.length;
            }
            else if (value && typeof value === 'object' && value !== null) {
                // 如果是对象，返回对象属性数量
                return Object.keys(value).length;
            }
            else if (typeof value === 'number') {
                // 如果是数字，返回数字的字符串表示长度
                return value.toString().length;
            }
            else {
                // 其他情况返回 0
                return 0;
            }
        }
        catch (error) {
            console.error('size helper error:', error);
            return 0;
        }
    });
    // Filters an array of objects based on a key-value pair or property value
    Handlebars.registerHelper("where", function (array, property, value, options) {
        // 检查输入参数
        if (!array) {
            return [];
        }
        // 确保 array 是数组
        if (!Array.isArray(array)) {
            // 如果是单个对象，转换为数组
            if (typeof array === 'object') {
                array = [array];
            }
            else {
                return [];
            }
        }
        // 如果只提供了两个参数 (array, property)，则 property 是一个对象，包含多个条件
        if (arguments.length === 3 && typeof property === 'object') {
            const conditions = property;
            options = value; // 第三个参数实际上是 options
            // 根据多个条件过滤数组
            return array.filter((item) => {
                // 检查对象是否满足所有条件
                return Object.keys(conditions).every(key => {
                    if (typeof item === 'object' && item !== null) {
                        // 支持点号分隔的嵌套属性访问
                        if (key.includes('.')) {
                            const keys = key.split('.');
                            let result = item;
                            let found = true;
                            for (let i = 0; i < keys.length; i++) {
                                const k = keys[i].trim();
                                if (result && typeof result === 'object' && k in result) {
                                    result = result[k];
                                }
                                else {
                                    found = false;
                                    break;
                                }
                            }
                            return found && result === conditions[key];
                        }
                        else {
                            // 直接属性访问
                            return item[key] === conditions[key];
                        }
                    }
                    return false;
                });
            });
        }
        // 标准用法: where array property value
        return array.filter((item) => {
            if (typeof item === 'object' && item !== null) {
                // 支持点号分隔的嵌套属性访问
                if (property.includes('.')) {
                    const keys = property.split('.');
                    let result = item;
                    let found = true;
                    for (let i = 0; i < keys.length; i++) {
                        const k = keys[i].trim();
                        if (result && typeof result === 'object' && k in result) {
                            result = result[k];
                        }
                        else {
                            found = false;
                            break;
                        }
                    }
                    return found && result === value;
                }
                else {
                    // 直接属性访问
                    return item[property] === value;
                }
            }
            return false;
        });
    });
    // first 助手函数
    Handlebars.registerHelper("first", function (array, n) {
        // 数组未定义则返回空字符串
        if (util.isUndefined(array))
            return '';
        // 当只传入数组时，返回数组第一个元素
        if (!util.isNumber(n)) {
            return array[0];
        }
        // 传入数组和数字n时，返回数组前n个元素组成的子数组
        return array.slice(0, n);
    });
    // capture 助手函数
    Handlebars.registerHelper('capture', function (name, options) {
        const content = options.fn(this);
        this[name] = content.trim();
        return '';
    });
    // decodeURI 助手函数
    Handlebars.registerHelper('decodeURI', function (uri, options) {
        try {
            // 检查参数
            if (uri === null || uri === undefined || typeof uri !== 'string') {
                return uri;
            }
            // 执行URI解码
            return decodeURI(uri);
        }
        catch (error) {
            console.error('decodeURI helper error:', error);
            // 出错时返回原始字符串
            return uri;
        }
    });
    // case 助手函数
    Handlebars.registerHelper('case', function (value, options) {
        // 保存原始上下文的引用
        const originalContext = this;
        const context = Object.create(this);
        context._case_value_ = value;
        context._case_matched_ = false;
        // 执行块内容
        const result = options.fn(context);
        // 将在case块内创建或修改的变量复制回原始上下文
        // 过滤掉内部使用的属性
        Object.keys(context).forEach(key => {
            if (!key.startsWith('_case_') && key !== '__proto__' && key !== 'constructor') {
                originalContext[key] = context[key];
            }
        });
        return result;
    });
    // when 助手函数
    Handlebars.registerHelper('when', function (...args) {
        // 获取options参数（最后一个参数）
        const options = args[args.length - 1];
        // 获取要比较的值（除了options之外的所有参数）
        const values = args.slice(0, -1);
        // 检查是否有匹配的值
        if (!this._case_matched_ && values.some(value => this._case_value_ == value)) {
            this._case_matched_ = true;
            return options.fn(this);
        }
        return '';
    });
    // typeOf 助手函数 用于类型判断
    Handlebars.registerHelper("typeOf", function (value) {
        // 处理 null 和 undefined 的特殊情况
        if (value === null) {
            return 'null';
        }
        if (value === undefined) {
            return 'undefined';
        }
        // 获取值的类型
        const type = typeof value;
        // 对于对象类型，进一步区分具体类型
        if (type === 'object') {
            // 检查是否为数组
            if (Array.isArray(value)) {
                return 'array';
            }
            // 检查是否为日期对象
            if (value instanceof Date) {
                return 'date';
            }
            // 检查是否为正则表达式
            if (value instanceof RegExp) {
                return 'regexp';
            }
            // 检查是否为普通对象
            if (Object.prototype.toString.call(value) === '[object Object]') {
                return 'object';
            }
            // 其他对象类型
            return 'object';
        }
        // 返回基本类型
        return type;
    });
    // rich_editor_format 助手函数 -- 图片加载
    Handlebars.registerHelper('rich_editor_format', function (content, options) {
        if (!content)
            return '';
        // 获取选项参数
        const hash = options && options.hash || {};
        hash.lazyLoadIframe || false;
        // 处理富文本内容
        let formattedContent = content;
        return formattedContent;
    });
    // img_url 助手函数 - 用于生成和优化图片URL
    Handlebars.registerHelper("img_url", function (source, options) {
        try {
            // 检查输入参数
            if (!source) {
                return '';
            }
            // 获取选项参数
            const hash = options.hash || {};
            // 获取图片处理参数
            const width = hash.width;
            const height = hash.height;
            const scale = hash.scale;
            // 构建基础URL
            let imageUrl = source;
            // 如果有任何处理参数，则添加查询参数
            const params = [];
            if (width) {
                params.push(`width=${encodeURIComponent(width)}`);
            }
            if (height) {
                params.push(`height=${encodeURIComponent(height)}`);
            }
            if (scale) {
                params.push(`scale=${encodeURIComponent(scale)}`);
            }
            // 如果有参数需要添加
            if (params.length > 0) {
                const separator = imageUrl.includes('?') ? '&' : '?';
                imageUrl += separator + params.join('&');
            }
            return imageUrl;
        }
        catch (error) {
            console.error('img_url helper error:', error);
            return source || '';
        }
    });
    // filter 助手函数 - 过滤数组中的元素
    Handlebars.registerHelper('filter', function (array, value, options) {
        try {
            // 获取选项参数
            const hash = options.hash || {};
            const prop = hash.prop;
            // 检查输入参数
            if (!array || !Array.isArray(array)) {
                return '';
            }
            // 过滤数组
            const filteredArray = array.filter(item => {
                // 如果提供了属性名，检查该属性的值
                if (prop && typeof item === 'object' && item !== null) {
                    return item[prop] === value;
                }
                // 如果没有提供属性名，直接比较元素值
                return item === value;
            });
            // 对过滤后的每个元素执行块内容
            if (options && typeof options.fn === 'function') {
                let result = '';
                filteredArray.forEach(item => {
                    // 为每个元素创建上下文
                    const context = {
                        ...this,
                        ...item
                    };
                    result += options.fn(context);
                });
                return result;
            }
            // 表达式调用返回过滤后的数组
            return filteredArray;
        }
        catch (error) {
            console.error('filter helper error:', error);
            return '';
        }
    });
    // javascript_template 助手函数 - 用于处理JavaScript模板
    Handlebars.registerHelper('javascript_template', function (template, context, options) {
        try {
            // 检查参数
            if (!template || typeof template !== 'string') {
                return '';
            }
            // 处理上下文参数
            let data = {};
            if (context && typeof context === 'object') {
                data = context;
            }
            else if (context && typeof context === 'string') {
                // 如果第二个参数是字符串，可能是正则表达式
                options = context;
            }
            // 处理选项参数
            let regexPattern = null;
            if (options && options.hash) {
                // 如果通过hash传入了正则表达式
                if (options.hash.flags) {
                    regexPattern = new RegExp(options.hash.regex || '\\$\\{\\s*(\\w+)\\s*\\}', options.hash.flags);
                }
            }
            // 默认使用${key}格式的正则表达式
            if (!regexPattern) {
                regexPattern = /\$\{\s*(\w+)\s*\}/g;
            }
            // 执行模板替换
            let result = template;
            if (data && Object.keys(data).length > 0) {
                result = template.replace(regexPattern, (match, key) => {
                    // 如果在上下文中找到了对应的键值，则替换
                    if (data.hasOwnProperty(key)) {
                        return data[key];
                    }
                    // 否则保留原样
                    return match;
                });
            }
            return result;
        }
        catch (error) {
            console.error('javascript_template helper error:', error);
            return template || '';
        }
    });
    // switch 助手函数 
    Handlebars.registerHelper('switch', function (value, options) {
        // 保存原始上下文的引用
        const originalContext = this;
        // 创建一个新的上下文，用于在case和when助手之间共享状态
        const context = Object.create(this);
        context._switch_value_ = value;
        context._switch_matched_ = false;
        // 执行块内容，这将包含case和when助手
        const result = options.fn(context);
        // 将在switch块内创建或修改的变量复制回原始上下文
        // 过滤掉内部使用的属性
        Object.keys(context).forEach(key => {
            if (!key.startsWith('_switch_') && !key.startsWith('_case_') && key !== '__proto__' && key !== 'constructor') {
                originalContext[key] = context[key];
            }
        });
        return result;
    });
    // fallbackText 助手函数
    Handlebars.registerHelper("fallbackText", function (options) {
    });
    // toFloat 助手函数 - 将数字转换为浮点数
    Handlebars.registerHelper('toFloat', function (number) {
        return parseFloat(number);
    });
    // 创建一个新对象，可以传入属性键值对
    Handlebars.registerHelper("object_create", function (...args) {
        // 最后一个参数是Handlebars的options对象
        const options = args[args.length - 1];
        // 获取哈希参数（键值对）
        const hash = options.hash || {};
        // 创建一个新对象
        const obj = {};
        // 将哈希参数复制到新对象中
        Object.assign(obj, hash);
        // 返回创建的对象
        return obj;
    });
    // Dayjs助手函数 - 用于格式化日期
    Handlebars.registerHelper('dayjs', function (options) {
        // 获取参数
        const hash = options.hash || {};
        const method = hash.method;
        const init = hash.init;
        const format = hash.format;
        // 如果没有提供init值，返回空字符串
        if (!init) {
            return '';
        }
        // 创建dayjs对象
        let date = dayjs(init);
        // 根据method参数执行不同操作
        switch (method) {
            case 'format':
                // 格式化日期
                return date.format(format);
            default:
                // 默认返回ISO格式
                return date.toISOString();
        }
    });
}

function registerAssetHelpers(Handlebars) {
    // combine_asset_tag助手函数
    Handlebars.registerHelper('combine_asset_tag', function () {
        const args = Array.from(arguments);
        let options = args[args.length - 1]; // 最后一个参数是 Handlebars 的 options 对象
        let filePaths = args.slice(0, -1); // 其余参数是文件路径
        // 提取配置选项
        const config = {
            inline: options.hash.inline || false,
            type: options.hash.type || null,
            defer: options.hash.defer || false
        };
        let output = '';
        // 文件对象
        const fileConfig = options.data.root.fileConfig;
        if (config.inline) {
            // 内联模式：将文件内容直接嵌入到页面中
            filePaths.forEach(filePath => {
                try {
                    if (filePath.endsWith('.css')) {
                        const combineAssetTagFileContent = getFileContent(`assets/${filePath}.hbs`, fileConfig);
                        output += `<style>${combineAssetTagFileContent}</style>`;
                    }
                    else if (filePath.endsWith('.js')) {
                        const combineAssetTagFileContent = getFileContent(`assets/${filePath}`, fileConfig);
                        output += `<script>${combineAssetTagFileContent}</script>`;
                    }
                }
                catch (error) {
                    console.error(`Error reading file: ${filePath}`, error);
                }
            });
        }
        else {
            // 链接模式：生成链接标签
            filePaths.forEach(filePath => {
                // 获取文件对象
                if (filePath.endsWith('.css')) {
                    let url;
                    if (process.env.STORE_DEV === 'true') {
                        url = `/project/assets/${filePath}.hbs`;
                    }
                    else {
                        const combineAssetTagFile = fileConfig.fileListMap?.[`assets/${filePath}.hbs`];
                        url = combineAssetTagFile.cdn_url;
                    }
                    output += `<link rel="stylesheet" href="${url}">`;
                }
                else if (filePath.endsWith('.js')) {
                    // 本地文件路径
                    let url;
                    if (process.env.STORE_DEV === 'true') {
                        url = `/project/assets/${filePath}`;
                    }
                    else {
                        const combineAssetTagFile = fileConfig.fileListMap[`assets/${filePath}`];
                        url = combineAssetTagFile.cdn_url;
                    }
                    let scriptTag = `<script src="${url}"`;
                    if (config.type) {
                        scriptTag += ` type="${config.type}"`;
                    }
                    if (config.defer) {
                        scriptTag += ` defer="defer"`;
                    }
                    scriptTag += '></script>';
                    output += scriptTag;
                }
            });
        }
        // 创建 SafeString 
        const safeString = new Handlebars.SafeString(output);
        return safeString;
    });
    // assets_url助手函数
    Handlebars.registerHelper('assets_url', function (assetPath, options) {
        // 确保 assetPath 是字符串
        if (typeof assetPath !== 'string') {
            return '';
        }
        // 处理路径，确保格式正确
        let normalizedPath = assetPath.trim();
        const fileConfig = options.data.root.fileConfig;
        let url;
        if (process.env.STORE_DEV === 'true') {
            url = `/project/assets/${normalizedPath}`;
        }
        else {
            const snippetsFile = fileConfig.fileListMap[`assets/${normalizedPath}`];
            url = snippetsFile?.cdn_url || "";
        }
        // 文件路径可能找不到
        return url;
    });
    // snippet片段助手函数
    Handlebars.registerHelper('snippet', function (content, options) {
        try {
            const fileConfig = options.data.root.fileConfig;
            const snippetsFileContent = getFileContent(`snippets/${content}.html`, fileConfig);
            const templateHtml = snippetsFileContent;
            // 将读取的文件内容作为 Handlebars 模板编译
            const template = Handlebars.compile(templateHtml);
            // 创建上下文数据
            const snippetContext = {}; // 从空对象开始，允许动态属性
            // 合并根上下文数据
            if (options?.data && options.data.root) {
                Object.assign(snippetContext, options.data.root);
            }
            // 合并当前上下文数据（会覆盖根上下文中的同名属性）
            Object.assign(snippetContext, this);
            // 合并传递的参数
            if (options?.hash) {
                Object.assign(snippetContext, options.hash);
            }
            // 创建子内容对象 默认为空
            snippetContext.__children = {};
            // 执行子模板（仅一次），使用 snippetContext 作为上下文
            let slotContent = '';
            if (options.fn) {
                slotContent = options.fn(snippetContext);
            }
            // 关键：如果没有使用 child 助手，则将整个子模板内容作为默认插槽
            if (Object.keys(snippetContext.__children).length === 0) {
                snippetContext.__children.default = slotContent;
            }
            // 渲染模板
            const renderedContent = template(snippetContext);
            // 将渲染后的内容作为 SafeString 返回
            const safeString = new Handlebars.SafeString(renderedContent);
            return safeString;
        }
        catch (error) {
            console.log('文件路径:', `snippets/${content}.html`);
            console.error('错误信息:', error);
            return '';
        }
    });
}

function registerArrayHelpers(Handlebars) {
    // 简化
    Handlebars.registerHelper("array-slice", function (value, start, end, options) {
        try {
            // 处理参数
            const args = Array.from(arguments);
            const opts = typeof args[args.length - 1] === 'object' && args[args.length - 1].hash ? args[args.length - 1] : {};
            const params = opts.hash ? args.slice(0, -1) : args;
            let target, startIndex, endIndex;
            // 确定参数
            if (params.length === 1) {
                // 只传入目标值
                target = params[0];
                startIndex = 0;
                endIndex = undefined;
            }
            else if (params.length === 2) {
                // 传入目标值和起始索引
                target = params[0];
                startIndex = params[1];
                endIndex = undefined;
            }
            else if (params.length === 3) {
                // 传入目标值、起始索引和结束索引
                target = params[0];
                startIndex = params[1];
                endIndex = params[2];
            }
            else {
                console.warn('slice: Invalid number of arguments');
                return '';
            }
            // 处理索引参数
            const startIdx = parseInt(startIndex) || 0;
            const endIdx = endIndex !== undefined ? (parseInt(endIndex) || 0) : undefined;
            // 根据目标值类型进行切片
            if (Array.isArray(target)) {
                // 数组切片
                if (endIdx !== undefined) {
                    return target.slice(startIdx, endIdx);
                }
                else {
                    return target.slice(startIdx);
                }
            }
            else if (typeof target === 'string') {
                // 字符串切片
                if (endIdx !== undefined) {
                    return target.slice(startIdx, endIdx);
                }
                else {
                    return target.slice(startIdx);
                }
            }
            else {
                // 其他类型转换为字符串后切片
                const str = String(target);
                if (endIdx !== undefined) {
                    return str.slice(startIdx, endIdx);
                }
                else {
                    return str.slice(startIdx);
                }
            }
        }
        catch (error) {
            console.error('slice helper error:', error);
            return '';
        }
    });
    // isArray 助手函数
    Handlebars.registerHelper("isArray", function (value) {
        return Array.isArray(value);
    });
    // array_map 助手函数
    Handlebars.registerHelper("array_map", function (result, array, value, options) {
        // 检查参数
        if (!array) {
            // 如果数组为空或未定义，设置空数组
            this[result] = [];
            return '';
        }
        const newResult = array.map((res) => {
            return res[value];
        });
        this[result] = newResult;
    });
    // arrayify 助手函数
    Handlebars.registerHelper("arrayify", function (value) {
        return value ? (Array.isArray(value) ? value : [value]) : [];
    });
    // last 辅助函数 - 获取数组中的最后一个元素
    Handlebars.registerHelper("last", function (array) {
        try {
            // 检查输入参数
            if (!array) {
                return undefined;
            }
            // 检查是否为数组
            if (!Array.isArray(array)) {
                // 如果不是数组但有length属性（如类数组对象），尝试处理
                if (array.length !== undefined) {
                    return array[array.length - 1];
                }
                // 如果是单个值，直接返回
                return array;
            }
            // 返回数组的最后一个元素
            if (array.length > 0) {
                return array[array.length - 1];
            }
            // 空数组返回undefined
            return undefined;
        }
        catch (error) {
            console.error('last helper error:', error);
            return undefined;
        }
    });
    // array_find_index 辅助函数 - 在数组中查找具有特定属性值的对象，并返回其索引
    Handlebars.registerHelper("array_find_index", function (array, value, property) {
        try {
            // 检查输入参数
            if (!array || !Array.isArray(array)) {
                return -1;
            }
            // 如果未提供属性参数，则直接在数组元素中查找值
            if (property === undefined) {
                for (let i = 0; i < array.length; i++) {
                    if (array[i] === value) {
                        return i;
                    }
                }
            }
            else {
                // 如果提供了属性参数，则在数组元素的指定属性中查找值
                for (let i = 0; i < array.length; i++) {
                    // 检查数组元素是否具有指定属性，并且该属性值等于给定值
                    if (array[i] && array[i][property] === value) {
                        return i;
                    }
                }
            }
            // 如果未找到匹配项，返回-1
            return -1;
        }
        catch (error) {
            console.error('array_find_index helper error:', error);
            return -1;
        }
    });
    // pluck 辅助函数 - 从对象数组中提取指定属性的值
    Handlebars.registerHelper("pluck", function (array, property) {
        try {
            // 检查输入参数
            if (!array || !Array.isArray(array)) {
                return [];
            }
            // 检查属性参数
            if (!property || typeof property !== 'string') {
                return [];
            }
            // 从数组中的每个对象提取指定属性的值
            const result = [];
            for (let i = 0; i < array.length; i++) {
                // 检查数组元素是否为对象且具有指定属性
                if (array[i] && typeof array[i] === 'object' && array[i].hasOwnProperty(property)) {
                    result.push(array[i][property]);
                }
            }
            return result;
        }
        catch (error) {
            console.error('pluck helper error:', error);
            return [];
        }
    });
    // find-in-array 助手函数 - 在数组中查找具有特定属性值的元素
    Handlebars.registerHelper('find-in-array', function (array, value, property, options) {
        try {
            // 检查输入参数
            if (!array || !Array.isArray(array)) {
                // 块级调用返回 inverse，表达式调用返回 false
                if (options && typeof options.fn === 'function') {
                    return options.inverse ? options.inverse(this) : '';
                }
                return false;
            }
            // 查找匹配的元素
            const found = array.find(item => {
                // 如果提供了属性名，检查该属性的值
                if (property && typeof item === 'object' && item !== null) {
                    return item[property] === value;
                }
                // 如果没有提供属性名，直接比较元素值
                return item === value;
            });
            // 块级调用处理
            if (options && typeof options.fn === 'function') {
                if (found) {
                    // 创建新的上下文，包含找到的元素
                    const context = {
                        ...this,
                        ...found
                    };
                    return options.fn(context);
                }
                else {
                    // 没有找到匹配项，执行 inverse 块
                    return options.inverse ? options.inverse(this) : '';
                }
            }
            // 表达式调用直接返回找到的元素或 undefined
            return found || null;
        }
        catch (error) {
            console.error('find-in-array helper error:', error);
            // 出错时的处理
            if (options && typeof options.fn === 'function') {
                return options.inverse ? options.inverse(this) : '';
            }
            return false;
        }
    });
    // array-push 助手函数
    Handlebars.registerHelper('array-push', function (array, object, options) {
        // 检查是否提供了数组参数
        if (!array) {
            array = [];
        }
        // 确保 array 是数组类型
        if (!Array.isArray(array)) {
            array = [array];
        }
        // 获取要添加的元素（来自块级内容或哈希参数）
        let itemToAdd;
        if (options && object) {
            itemToAdd = object;
        }
        else if (typeof options === 'object' && options.fn) {
            // 如果通过块级内容传递元素
            itemToAdd = options.fn(this);
        }
        // 将元素添加到数组中
        if (itemToAdd !== undefined) {
            array.push(itemToAdd);
        }
        // 如果是块级助手，执行块级内容
        if (options && typeof options === 'function') {
            return options(array);
        }
        // 返回修改后的数组
        return "";
    });
    // itemAt 助手函数
}

const productList = {
    "list": [
        {
            "storeId": "",
            "merchantId": "",
            "spuSeq": "0",
            "shelves": true,
            "title": "Example Product Title",
            "subTitle": "The product subTitle",
            "image": "https://img.myshopline.com/image/shopline/9d5a39df47f847e39d98ffd2b6609819.png",
            "imageList": [
                "https://img.myshopline.com/image/shopline/9d5a39df47f847e39d98ffd2b6609819.png"
            ],
            "stock": 0,
            "soldOut": false,
            "currencyDigits": 2,
            "productMinPrice": 15507,
            "productMaxPrice": 15507,
            "originPrice": 19386,
            "infiniteStock": true,
            "version": ""
        },
        {
            "storeId": "",
            "merchantId": "",
            "spuSeq": "1",
            "shelves": false,
            "title": "Example Product Title",
            "subTitle": "The product subTitle",
            "image": "https://img.myshopline.com/image/shopline/de0479869ad847fb9e4e76e581e7b24d.png",
            "imageList": [
                "https://img.myshopline.com/image/shopline/de0479869ad847fb9e4e76e581e7b24d.png"
            ],
            "stock": 0,
            "soldOut": false,
            "currencyDigits": 2,
            "productMinPrice": 15507,
            "productMaxPrice": 15507,
            "originPrice": 0,
            "infiniteStock": false,
            "version": ""
        },
        {
            "storeId": "",
            "merchantId": "",
            "spuSeq": "2",
            "shelves": false,
            "title": "Example Product Title",
            "subTitle": "The product subTitle",
            "image": "https://img.myshopline.com/image/shopline/abdc273a1a4643a588a09d00e6822466.png",
            "imageList": [
                "https://img.myshopline.com/image/shopline/abdc273a1a4643a588a09d00e6822466.png"
            ],
            "stock": 0,
            "soldOut": false,
            "currencyDigits": 2,
            "productMinPrice": 15507,
            "productMaxPrice": 15507,
            "originPrice": 0,
            "infiniteStock": false,
            "version": ""
        },
        {
            "storeId": "",
            "merchantId": "",
            "spuSeq": "3",
            "shelves": false,
            "title": "Example Product Title",
            "subTitle": "The product subTitle",
            "image": "https://img.myshopline.com/image/shopline/edb3f8f6b5d348cdbf30ffd5ff3dcfca.png",
            "imageList": [
                "https://img.myshopline.com/image/shopline/edb3f8f6b5d348cdbf30ffd5ff3dcfca.png"
            ],
            "stock": 0,
            "soldOut": true,
            "currencyDigits": 2,
            "productMinPrice": 15507,
            "productMaxPrice": 15507,
            "originPrice": 0,
            "infiniteStock": false,
            "version": ""
        }
    ]
};

// src/app/lib/i18nManager.js
class I18nManager {
    constructor() {
        this.I18nData = {}; // 语言缓存 { locale -> translations }
    }
    // 加载语言文件
    async loadTranslations(requestData, fileConfig) {
        try {
            const fileContent = await getFileContent(`locales/${requestData.language}.json`, fileConfig);
            this.I18nData = JSON.parse(fileContent);
        }
        catch (error) {
            console.error(`Error loading translations for ${requestData.language}:`, error);
        }
    }
}
// 创建单例
const i18nManager = new I18nManager();

// 导入产品例
function registerEcommerceHelpers(Handlebars) {
    // t​ 从区域设置文件中返回给定翻译键的已翻译文本字符串。
    // 参数​
    // String 区域设置文件中的key
    // returns {String} 已翻译文本字符串
    Handlebars.registerHelper("t", function (key, options) {
        // 检查 key 是否有效
        if (key === undefined || key === null) {
            return '';
        }
        const keys = key.split('.');
        let current = i18nManager.I18nData;
        // 查找翻译文本
        for (const key of keys) {
            if (current && (current[key] !== undefined)) {
                current = current[key];
            }
            else {
                current = undefined; // 路径不存在
                break;
            }
        }
        // {{t 'products.product_list.one_product_num' num=products.realTotal}}
        // 如果找到翻译文本且是字符串
        if (typeof current === 'string' && options.hash) {
            let translated = current;
            // 1. 先处理三重花括号占位符：{{{placeholder}}}
            for (const [placeholder, value] of Object.entries(options.hash)) {
                const regex = new RegExp(`{\\{\\{\\s*${placeholder}\\s*\\}\\}\\}`, 'g');
                translated = translated.replace(regex, value || key);
            }
            // 2. 再处理双重花括号占位符：{{placeholder}}
            for (const [placeholder, value] of Object.entries(options.hash)) {
                const regex = new RegExp(`{\\{\\s*${placeholder}\\s*\\}\\}`, 'g');
                translated = translated.replace(regex, Handlebars.Utils.escapeExpression(value ?? key));
            }
            if (translated) {
                return new Handlebars.SafeString(translated);
            }
        }
        return current || key;
    });
    // useFallbackLang助手函数
    Handlebars.registerHelper("useFallbackLang", function (content, locale, options) {
        try {
            // 检查参数
            if (content === null || content === undefined) {
                return '';
            }
            // 如果 content 是字符串，直接返回
            if (typeof content === 'string') {
                return content;
            }
            // 如果 content 是对象，根据语言环境获取对应的内容
            if (typeof content === 'object' && !Array.isArray(content)) {
                // 优先级顺序：
                // 1. 使用传入的 locale 参数
                if (locale && content[locale]) {
                    return content[locale];
                }
                // 2. 使用上下文中的语言环境
                if (this.request && this.request.locale && content[this.request.locale]) {
                    return content[this.request.locale];
                }
                // 3. 语言回退顺序
                const fallbackLocales = ['en', 'zh', 'zh-CN', 'zh-TW', 'default'];
                for (const fallbackLocale of fallbackLocales) {
                    if (content[fallbackLocale]) {
                        return content[fallbackLocale];
                    }
                }
                // 4. 返回第一个可用的值
                const keys = Object.keys(content);
                if (keys.length > 0) {
                    return content[keys[0]];
                }
            }
            // 其他情况转换为字符串返回
            return "";
        }
        catch (error) {
            console.error('useFallbackLang helper error:', error);
            return '';
        }
    });
    /**
     * 用于货币转换和价格格式化
     * ????? 需要改进 小数
     */
    Handlebars.registerHelper("money_exchange_convert_price", function (price, options) {
        // 获取当前货币代码和汇率信息
        const currencyCode = options.data.root.currencyCode || 'USD';
        // 汇率映射表（实际项目中应该从API或配置获取）
        const exchangeRates = options.data.root.currencyRates;
        // 当前货币符号映射
        const currencySymbols = options.data.root.currencyConfig.currencyDetailList.filter((item) => item.currencyCode == currencyCode) || [];
        // 获取当前货币符号
        const currencySymbol = currencySymbols.length > 0 ? currencySymbols[0].currencySymbol : '';
        // // 获取汇率
        const rate = exchangeRates[currencyCode] || 1;
        // 转换价格
        let convertedPrice = parseFloat(price) * rate;
        // 处理精度（不同货币可能有不同的小数位要求）
        const precision = (currencyCode === 'JPY') ? 0 : 2;
        convertedPrice = Number(convertedPrice.toFixed(precision));
        // 提取整数部分和小数部分
        const integerPart = Math.floor(convertedPrice).toString();
        const fractionPart = (precision > 0) ? (convertedPrice - Math.floor(convertedPrice)).toFixed(precision).substring(2) : '';
        // 创建上下文对象供内部助手函数使用
        const context = {
            integer: integerPart,
            fraction: fractionPart,
            currencyCode: currencyCode,
            currencySymbol: currencySymbol,
            convertedPrice: convertedPrice
        };
        // 执行块内的内容并返回结果
        return options.fn(context);
    });
    // money_exchange_convert_with_currency 助手函数 --- 待调整 货币
    Handlebars.registerHelper("money_exchange_convert_with_currency", function (money) {
        // 获取货币
        const currency = this.currencyCode;
        if (money || money == 0) {
            return `$` + Number(money) / 100 + ` ${currency}`;
        }
        return "";
    });
    // product_blocks_order_translate助手函数
    Handlebars.registerHelper("product_blocks_order_translate", function (list, v1, v2) {
        let newList = [];
        if (list[v1] && list[v2]) {
            list[v2].forEach((item) => {
                list[v1][item] && newList.push(list[v1][item]);
            });
        }
        return newList;
    });
    // product_mock_data助手函数
    Handlebars.registerHelper("product_mock_data", function (count, imageCount) {
        // 生成模拟产品数据
        // 确保参数是数字
        const productCount = Number(count) || 0;
        // 如果目标数量为0或数组为空，返回空数组
        if (productCount <= 0 || productList.list.length === 0) {
            return [];
        }
        // 如果数组长度正好等于目标数量，直接返回原数组
        if (productList.list.length === productCount) {
            return productList.list.slice();
        }
        // 如果数组长度大于目标数量，截取前targetCount个元素
        if (productList.list.length > productCount) {
            return productList.list.slice(0, productCount);
        }
        // 如果数组长度小于目标数量，需要循环补充
        const result = [];
        for (let i = 0; i < productCount; i++) {
            // 使用取模运算实现循环
            result.push(productList.list[i % productList.list.length]);
        }
        return result;
    });
    /**
     * navigation_to_category 助手函数
     * 将导航数据转换为分类结构，获取指定分类的子分类列表
     * 兼容Shopline和Shopify平台
     *
     * @param {Object} all_collections - 所有分类数据对象
     * @param {Object} navigation - 导航数据对象
     * @param {string} sortationId - 当前分类ID
     * @returns {Array} 子分类列表
     */
    Handlebars.registerHelper("navigation_to_category", function (all_collections, navigations, sortationId) {
        // 检查两个对象是否都存在且不为空
        const isNavigationsValid = navigations && Object.prototype.toString.call(navigations) === '[object Object]' && Object.keys(navigations).length > 0;
        const isAllCollectionsValid = all_collections && Object.prototype.toString.call(all_collections) === '[object Object]' && Object.keys(all_collections).length > 0;
        if (!isNavigationsValid || !isAllCollectionsValid) {
            return {
                finalShowCategories: [],
                finalShowChildCategories: [],
                allShowCategoryIds: []
            };
        }
        // sortationId 12271184648462242121701040
    });
    // navLink 助手函数 -- 导航项
    Handlebars.registerHelper("navLink", function (navItem, query, locale, allCollections, options) {
        // 获取导航节点对象
        try {
            // 检查输入参数
            if (!navItem || typeof navItem !== 'object') {
                return {
                    name: '',
                    hrefAttr: '',
                    finalSrc: ''
                };
            }
            // 默认返回对象
            const result = {
                name: navItem.name || '',
                url: '',
                path: '',
                coverImg: null,
                target: '_self',
                hrefAttr: '',
            };
            const urlLocale = (locale && locale !== 'en') ? `/${locale}` : '';
            // 处理不同类型的导航项 nodeType导航节点 1表示是首页
            if (navItem.nodeType === 1) {
                result.name = navItem.name.default;
                result.url = `${urlLocale}/`;
                result.path = `${urlLocale}/`;
                result.coverImg = navItem.img ? navItem.img : null;
                result.target = '_self',
                    result.hrefAttr = `href="${urlLocale}/" target="_self"`;
            }
            else if (navItem.nodeType === 9) {
                result.name = navItem.name.default;
                result.url = `${urlLocale}/collections-all`;
                result.path = `${urlLocale}/collections-all`;
                result.coverImg = navItem.img ? navItem.img : null;
                result.target = '_self',
                    result.hrefAttr = `href="${urlLocale}/collections-all" target="_self"`;
            }
            else if (navItem.nodeType === 7) {
                // 产品链接
                result.name = navItem.name.default;
                result.url = `${urlLocale}/collections`;
                result.path = `${urlLocale}/collections`;
                result.coverImg = null;
                result.target = '_self',
                    result.hrefAttr = `href="${urlLocale}/collections" target="_self"`;
            }
            else if (navItem.nodeType === 4) {
                // 博客链接
                result.name = navItem.name.default;
                result.url = `${urlLocale}/blogs/collectioncustomizepath/customizepath`;
                result.path = `${urlLocale}/blogs/collectioncustomizepath/customizepath`;
                result.coverImg = null;
                result.target = '_self',
                    result.hrefAttr = `href="${urlLocale}/blogs/collectioncustomizepath/customizepath" target="_self"`;
            }
            else {
                // 默认处理
                result.name = navItem.name.default;
                result.coverImg = null;
                result.target = '_self',
                    result.hrefAttr = `href='/'`;
            }
            return result;
        }
        catch (error) {
            console.error('navLink helper error:', error);
            return {
                name: '',
                hrefAttr: 'href="#"',
                finalSrc: '#'
            };
        }
    });
    // product_collections_sidebar_isEmpty 助手函数
    Handlebars.registerHelper("product_collections_sidebar_isEmpty", function (blocks, product_tags, child_category_list, navigations) {
        // Check if there are any filter blocks defined
        const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;
        // Check if there are any product tags available
        const hasProductTags = product_tags && ((Array.isArray(product_tags) && product_tags.length > 0) ||
            (typeof product_tags === 'object' && Object.keys(product_tags).length > 0));
        // Check if there are any child categories
        const hasChildCategories = child_category_list && ((Array.isArray(child_category_list) && child_category_list.length > 0) ||
            (typeof child_category_list === 'object' && Object.keys(child_category_list).length > 0));
        // Check if there are any navigations
        const hasNavigations = navigations && ((Array.isArray(navigations) && navigations.length > 0) ||
            (typeof navigations === 'object' && Object.keys(navigations).length > 0));
        // Sidebar is considered empty if none of the above conditions are met
        return !(hasBlocks || hasProductTags || hasChildCategories || hasNavigations);
    });
    // Filters product tags based on specified criteria and group
    Handlebars.registerHelper("product_collections_tags_filter", function (product_tags, filter_tags, group) {
        // Return empty array if no product tags exist
        if (!product_tags) {
            return [];
        }
        // Convert product_tags to array if it's an object
        let tagsArray = [];
        if (Array.isArray(product_tags)) {
            tagsArray = product_tags;
        }
        else if (typeof product_tags === 'object') {
            // If it's an object, extract values or keys depending on structure
            tagsArray = Object.values(product_tags);
        }
        // If no filter tags specified, return all tags in the group
        if (!filter_tags || !Array.isArray(filter_tags) || filter_tags.length === 0) {
            // Filter tags by group if group is specified
            if (group) {
                return tagsArray.filter(tag => {
                    // Assuming tag objects have a group property
                    if (typeof tag === 'object' && tag.group !== undefined) {
                        return tag.group == group;
                    }
                    // If tag is a string, we can't filter by group
                    return true;
                }).map(tag => {
                    // Extract tag name from object or return as is
                    if (typeof tag === 'object' && tag.name) {
                        return tag.name;
                    }
                    return tag;
                });
            }
            // If no group specified, return all tags
            return tagsArray.map(tag => {
                if (typeof tag === 'object' && tag.name) {
                    return tag.name;
                }
                return tag;
            });
        }
        // Filter tags that match the specified filter_tags
        const filteredTags = tagsArray.filter(tag => {
            const tagName = typeof tag === 'object' ? tag.name : tag;
            // Check if tag belongs to the specified group (if group is provided)
            const isInGroup = group ?
                (typeof tag === 'object' ? tag.group == group : true) :
                true;
            // Check if tag is in the filter list
            const isInFilter = filter_tags.some(filterTag => {
                if (typeof filterTag === 'object') {
                    return filterTag.name === tagName;
                }
                return filterTag === tagName;
            });
            return isInGroup && isInFilter;
        }).map(tag => {
            if (typeof tag === 'object' && tag.name) {
                return tag.name;
            }
            return tag;
        });
        return filteredTags;
    });
    // product_collections_tag_in_active 助手函数 用于检查当前过滤标签是否在激活状态
    Handlebars.registerHelper("product_collections_tag_in_active", function (activeTags, allTags) {
        // 如果没有激活的标签，直接返回 false
        if (!activeTags || activeTags.length === 0) {
            return false;
        }
        // 如果没有可用标签，返回 false
        if (!allTags || allTags.length === 0) {
            return false;
        }
        // 检查激活的标签是否存在于所有标签中
        // 将 activeTags 转换为数组（如果是字符串）
        const activeTagsArray = Array.isArray(activeTags) ? activeTags : [activeTags];
        // 检查是否有任何激活的标签在所有标签列表中
        return activeTagsArray.some(activeTag => {
            // 如果 allTags 是对象数组，检查 name 属性
            if (typeof allTags[0] === 'object' && allTags[0] !== null) {
                return allTags.some((tagObj) => tagObj.name === activeTag ||
                    tagObj.handle === activeTag ||
                    tagObj.title === activeTag);
            }
            // 如果 allTags 是字符串数组，直接比较
            else {
                return allTags.includes(activeTag);
            }
        });
    });
    // product_collections_tag_link 助手函数
    Handlebars.registerHelper("product_collections_tag_link", function (tag, action, currentUrl) {
        // 解析当前URL
        const url = new URL(currentUrl.url, 'http://localhost'); // 使用基础域名以避免解析错误
        // /collections?tags=girl&themeId=68b8ec016860762344066382&preview=1&page_num=1
        const searchParams = url.searchParams;
        // 获取当前已有的标签
        let currentTags = [];
        if (searchParams.has('tags')) {
            const tagsValue = searchParams.get('tags');
            currentTags = tagsValue ? tagsValue.split(',') : [];
        }
        // 新标签
        let newTags = [];
        switch (action) {
            case 'add':
                // 添加标签到现有标签列表
                newTags = [...currentTags, tag];
                break;
            case 'remove':
                // 从现有标签列表中移除指定标签
                newTags = currentTags.filter(t => t !== tag);
                break;
            case 'single':
                // 单选模式：只保留当前标签
                newTags = [tag];
                break;
            default:
                newTags = currentTags;
        }
        // 构建新的URL参数
        const newUrl = new URL(url); // 或者使用 url.href
        if (newTags.length > 0) {
            // 将标签转换为 constraint 参数格式
            newUrl.searchParams.set('tag', newTags.join(","));
        }
        else {
            // 如果没有标签，移除 constraint 参数
            newUrl.searchParams.delete('tag');
        }
        // 保持其他查询参数不变
        return newUrl.toString().replace('http://localhost', '');
    });
    // product_share_info 助手函数 - 生成产品的分享信息，用于SEO和社交分享
    // productSeo: 产品的SEO信息对象
    // spu: 产品的SPU信息对象
    // uri: 当前页面的URI信息
    // storeInfo: 商店信息对象
    Handlebars.registerHelper("product_share_info", function (productSeo, spu, uri, storeInfo, options) {
        try {
            // 初始化返回对象
            const shareInfo = {
                title: '',
                description: '',
                url: '',
                image: ''
            };
            // 设置标题
            if (productSeo && productSeo.title) {
                shareInfo.title = productSeo.title;
            }
            else if (spu && spu.title) {
                // 如果没有SEO标题，使用产品标题
                shareInfo.title = spu.title;
            }
            else if (storeInfo && storeInfo.name) {
                // 如果没有产品标题，使用商店名称
                shareInfo.title = storeInfo.name;
            }
            // 设置描述
            if (productSeo && productSeo.desc) {
                shareInfo.description = productSeo.desc;
            }
            else if (storeInfo && storeInfo.description) {
                shareInfo.description = storeInfo.description;
            }
            // 设置URL
            if (uri) {
                if (typeof uri === 'string') {
                    shareInfo.url = uri;
                }
                else if (uri.href) {
                    shareInfo.url = uri.href;
                }
                else if (uri.url) {
                    shareInfo.url = uri.url;
                }
            }
            // 设置图片
            if (productSeo && productSeo.image) {
                shareInfo.image = productSeo.image;
            }
            else if (spu && spu.images && spu.images.length > 0) {
                // 使用第一个产品图片
                shareInfo.image = spu.images[0];
            }
            return shareInfo;
        }
        catch (error) {
            console.error('product_share_info helper error:', error);
            return {
                title: '',
                description: '',
                url: '',
                image: ''
            };
        }
    });
    // product_default_sku 助手函数 - 选择产品的默认SKU
    // 根据参数选择产品的默认SKU
    // skuList: 产品SKU列表
    // soldOut: 产品是否售罄
    // querySku: 查询参数中的SKU ID
    // isFirstSku: 是否选择第一个SKU
    // notChooseSku: 是否未选择SKU
    // isPreviewProduct: 是否为预览产品
    Handlebars.registerHelper("product_default_sku", function (skuList, soldOut, querySku, isFirstSku, notChooseSku, isPreviewProduct, options) {
        try {
            // 检查参数
            if (!skuList || !Array.isArray(skuList)) {
                return {};
            }
            // 初始化返回对象
            const result = {
                selectSku: null,
                minPriceSku: null,
                firstSku: null
            };
            // 如果产品已售罄，直接返回空结果
            if (soldOut) {
                return result;
            }
            // 查找查询参数中的SKU
            if (querySku) {
                const querySkuItem = skuList.find(sku => sku.skuSeq === querySku);
                if (querySkuItem && querySkuItem.available) {
                    result.selectSku = querySkuItem;
                    return result;
                }
            }
            // 查找第一个可用SKU
            const firstAvailableSku = skuList.find(sku => sku.available);
            if (firstAvailableSku) {
                result.firstSku = firstAvailableSku;
            }
            // 如果不是预览产品且需要选择第一个SKU
            if (!isPreviewProduct && isFirstSku && firstAvailableSku) {
                result.selectSku = firstAvailableSku;
            }
            // 查找最低价格SKU
            let minPriceSku = null;
            skuList.forEach(sku => {
                if (sku.available) {
                    if (!minPriceSku || sku.price < minPriceSku.price) {
                        minPriceSku = sku;
                    }
                }
            });
            result.minPriceSku = minPriceSku;
            // 如果不需要选择SKU或者SKU未选择，使用最低价格SKU
            if (notChooseSku && minPriceSku) {
                result.selectSku = minPriceSku;
            }
            return result;
        }
        catch (error) {
            console.error('product_default_sku helper error:', error);
            return {};
        }
    });
    // product_microdata 辅助函数 - 生成产品的结构化数据（microdata）
    // selectSku: 选中的SKU信息
    // sku: 产品SKU信息对象
    // spu: 产品SPU信息对象
    // uri: 当前页面的URI信息
    // currency: 货币信息
    Handlebars.registerHelper("product_microdata", function (selectSku, sku, spu, uri, currency, options) {
        try {
            // 初始化返回对象
            const microdata = {
                title: '',
                productId: '',
                productUrl: '',
                description: '',
                brand: '',
                sku: '',
                gtin: '',
                price: '',
                currency: '',
                availability: '',
                imageUrl: ''
            };
            // 设置产品标题
            if (spu && spu.title) {
                microdata.title = spu.title;
            }
            // 设置产品ID
            if (spu && spu.spuSeq) {
                microdata.productId = spu.spuSeq;
            }
            // 设置产品URL
            if (uri) {
                if (typeof uri === 'string') {
                    microdata.productUrl = uri;
                }
                else if (uri.href) {
                    microdata.productUrl = uri.href;
                }
                else if (uri.url) {
                    microdata.productUrl = uri.url;
                }
            }
            // 设置产品描述
            if (spu && spu.description) {
                microdata.description = spu.description;
            }
            // 设置品牌
            if (spu && spu.brand) {
                microdata.brand = spu.brand;
            }
            // 设置SKU
            if (selectSku && selectSku.skuSeq) {
                microdata.sku = selectSku.skuSeq;
            }
            else if (sku && sku.skuList && sku.skuList.length > 0) {
                // 如果没有选中的SKU，使用第一个SKU
                microdata.sku = sku.skuList[0].skuSeq;
            }
            // 设置GTIN（全球贸易项目代码）
            if (selectSku && selectSku.barcode) {
                microdata.gtin = selectSku.barcode;
            }
            else if (sku && sku.skuList && sku.skuList.length > 0 && sku.skuList[0].barcode) {
                microdata.gtin = sku.skuList[0].barcode;
            }
            // 设置价格
            if (selectSku && selectSku.price !== undefined) {
                microdata.price = selectSku.price;
            }
            else if (sku && sku.skuList && sku.skuList.length > 0) {
                microdata.price = sku.skuList[0].price;
            }
            // 设置货币
            if (currency && currency.code) {
                microdata.currency = currency.code;
            }
            // 设置库存状态
            let availability = 'https://schema.org/InStock'; // 默认有库存
            if (spu && spu.soldOut) {
                availability = 'https://schema.org/SoldOut';
            }
            else if (selectSku && selectSku.soldOut) {
                availability = 'https://schema.org/SoldOut';
            }
            else if (selectSku && selectSku.infiniteStock) {
                availability = 'https://schema.org/InStock';
            }
            else if (selectSku && selectSku.allowOversold) {
                availability = 'https://schema.org/InStock';
            }
            else if (selectSku && selectSku.stock !== undefined && selectSku.stock <= 0) {
                availability = 'https://schema.org/SoldOut';
            }
            microdata.availability = availability;
            // 设置图片URL
            if (selectSku && selectSku.imageList && selectSku.imageList.length > 0) {
                microdata.imageUrl = selectSku.imageList[0];
            }
            else if (spu && spu.images && spu.images.length > 0) {
                microdata.imageUrl = spu.images[0];
            }
            return microdata;
        }
        catch (error) {
            console.error('product_microdata helper error:', error);
            return {
                title: '',
                productId: '',
                productUrl: '',
                description: '',
                brand: '',
                sku: '',
                gtin: '',
                price: '',
                currency: '',
                availability: '',
                imageUrl: ''
            };
        }
    });
    // money_format 助手函数 - 格式化货币显示
    Handlebars.registerHelper("money_format", function (price, options) {
        try {
            // 如果价格为空或无效，返回空字符串
            if (price === null || price === undefined || price === '') {
                return '';
            }
            // 转换价格为数字
            const numericPrice = parseFloat(price);
            // 检查价格是否为有效数字
            if (isNaN(numericPrice)) {
                return '';
            }
            // 获取货币代码和符号（如果在上下文中可用）
            let currencyCode = 'USD';
            let currencySymbol = '$';
            // 尝试从上下文获取货币信息
            if (options && options.data && options.data.root) {
                const root = options.data.root;
                if (root.currencyCode) {
                    currencyCode = root.currencyCode;
                }
                if (root.currencyConfig && root.currencyConfig.currencyDetailList) {
                    const currencyDetail = root.currencyConfig.currencyDetailList.find((item) => item.currencyCode === currencyCode);
                    if (currencyDetail && currencyDetail.currencySymbol) {
                        currencySymbol = currencyDetail.currencySymbol;
                    }
                }
            }
            // 根据货币代码确定小数位数
            const precision = (currencyCode === 'JPY') ? 0 : 2;
            // 格式化价格
            const formattedPrice = numericPrice.toFixed(precision);
            // 分离整数和小数部分
            const parts = formattedPrice.split('.');
            const integerPart = parts[0];
            const fractionPart = parts[1] || '';
            // 添加千位分隔符
            const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            // 根据货币符号位置返回格式化结果
            if (precision > 0) {
                return `${currencySymbol}${integerWithCommas}.${fractionPart}`;
            }
            else {
                return `${currencySymbol}${integerWithCommas}`;
            }
        }
        catch (error) {
            console.error('money_format helper error:', error);
            return price;
        }
    });
    // product_sku_price 助手函数 - 获取产品SKU的价格信息
    Handlebars.registerHelper("product_sku_price", function (sku, spu, options) {
        try {
            // 初始化返回对象
            const priceInfo = {
                originPrice: 0,
                salesPrice: 0,
                discount: 0
            };
            // 获取SKU价格信息
            let skuPrice = 0;
            let skuOriginPrice = 0;
            let skuDiscount = 0;
            if (sku) {
                // 如果提供了SKU，使用SKU的价格信息
                skuPrice = sku.price || 0;
                skuDiscount = sku.discount || 0;
                skuOriginPrice = sku.originPrice || skuPrice;
            }
            else if (spu) {
                // 如果没有提供SKU但提供了SPU，使用SPU的价格信息
                skuPrice = spu.productMinPrice || spu.price || 0;
                skuDiscount = spu.discount || 0;
                skuOriginPrice = spu.originPrice || skuPrice;
            }
            // 设置价格信息
            priceInfo.salesPrice = skuPrice;
            priceInfo.originPrice = skuOriginPrice;
            priceInfo.discount = skuDiscount;
            return priceInfo;
        }
        catch (error) {
            console.error('product_sku_price helper error:', error);
            return {
                originPrice: 0,
                salesPrice: 0,
                discount: 0,
            };
        }
    });
    // product_sku_map2array 助手函数 - 将产品SKU属性映射转换为数组格式
    Handlebars.registerHelper("product_sku_map2array", function (skuAttributeMap, selectedSku, options) {
        try {
            // 检查输入参数
            if (!skuAttributeMap || typeof skuAttributeMap !== 'object') {
                return [];
            }
            // 初始化结果数组
            const result = [];
            // 将skuAttributeMap对象转换为数组格式
            Object.keys(skuAttributeMap).forEach(attrId => {
                const attribute = skuAttributeMap[attrId];
                if (!attribute)
                    return;
                // 创建规格属性对象
                const specAttr = {
                    nameId: attrId,
                    specName: attribute.defaultName || '',
                    hidden: attribute.hidden || false,
                    specAttrList: [],
                    onlyShowAttrImg: false
                };
                // 处理规格属性值列表
                if (attribute.skuAttributeValueMap && typeof attribute.skuAttributeValueMap === 'object') {
                    const attrValueList = [];
                    Object.keys(attribute.skuAttributeValueMap).forEach(valueId => {
                        const value = attribute.skuAttributeValueMap[valueId];
                        if (!value)
                            return;
                        const attrItem = {
                            id: `${attrId}:${valueId}`,
                            name: value.defaultValue || '',
                            imgUrl: value.imgUrl || '',
                            active: false
                        };
                        attrValueList.push(attrItem);
                    });
                    // 按照attributeValueWeight排序
                    attrValueList.sort((a, b) => {
                        const aValue = attribute.skuAttributeValueMap[a.id.split(':')[1]];
                        const bValue = attribute.skuAttributeValueMap[b.id.split(':')[1]];
                        const aWeight = aValue ? (aValue.attributeValueWeight || 0) : 0;
                        const bWeight = bValue ? (bValue.attributeValueWeight || 0) : 0;
                        return aWeight - bWeight;
                    });
                    specAttr.specAttrList = attrValueList;
                    // 检查是否所有属性值都有图片
                    specAttr.onlyShowAttrImg = attrValueList.every(item => item.imgUrl);
                }
                result.push(specAttr);
            });
            // 按照attributeWeight排序
            result.sort((a, b) => {
                const aAttr = skuAttributeMap[a.nameId];
                const bAttr = skuAttributeMap[b.nameId];
                const aWeight = aAttr ? (aAttr.attributeWeight || 0) : 0;
                const bWeight = bAttr ? (bAttr.attributeWeight || 0) : 0;
                return aWeight - bWeight;
            });
            // 如果提供了selectedSku，处理选中状态
            if (selectedSku && selectedSku.skuAttributeIds && Array.isArray(selectedSku.skuAttributeIds)) {
                // 创建选中属性ID的映射
                const selectedAttrMap = {};
                selectedSku.skuAttributeIds.forEach((attr) => {
                    if (attr && attr.id && attr.valueId) {
                        selectedAttrMap[attr.id] = `${attr.id}:${attr.valueId}`;
                    }
                });
                // 标记选中的属性值
                result.forEach(spec => {
                    spec.specAttrList.forEach((attrValue) => {
                        if (selectedAttrMap[spec.nameId] === attrValue.id) {
                            attrValue.active = true;
                        }
                    });
                });
            }
            return result;
        }
        catch (error) {
            console.error('product_sku_map2array helper error:', error);
            return [];
        }
    });
    // product_thirdparty_combine 助手函数 - 组合产品的第三方平台信息
    Handlebars.registerHelper("product_thirdparty_combine", function (spu, options) {
        try {
            // 检查输入参数
            if (!spu || typeof spu !== 'object') {
                return {
                    thirdPathList: []
                };
            }
            // 初始化返回对象
            const result = {
                thirdPathList: []
            };
            // 检查是否有第三方平台数据
            if (!spu.thirdPartyPlatforms || typeof spu.thirdPartyPlatforms !== 'object') {
                return result;
            }
            // 处理第三方平台数据
            const thirdPartyPlatforms = spu.thirdPartyPlatforms;
            // 遍历所有第三方平台
            Object.keys(thirdPartyPlatforms).forEach(platformKey => {
                const platform = thirdPartyPlatforms[platformKey];
                // 检查平台数据是否有效
                if (!platform || typeof platform !== 'object') {
                    return;
                }
                // 检查平台是否启用且有链接
                if (platform.enable && platform.link) {
                    // 创建第三方平台对象
                    const thirdPartyItem = {
                        key: platformKey,
                        link: platform.link,
                        text: platform.text || `View on ${platformKey.charAt(0).toUpperCase() + platformKey.slice(1)}`,
                        shopline_attributes: `data-third-party="${platformKey}"`
                    };
                    // 添加其他平台特定的属性
                    if (platform.customAttributes && typeof platform.customAttributes === 'object') {
                        Object.keys(platform.customAttributes).forEach(attrKey => {
                            thirdPartyItem[attrKey] = platform.customAttributes[attrKey];
                        });
                    }
                    // 添加到结果列表
                    result.thirdPathList.push(thirdPartyItem);
                }
            });
            return result;
        }
        catch (error) {
            console.error('product_thirdparty_combine helper error:', error);
            return {
                thirdPathList: []
            };
        }
    });
    // product_thirdparty_share 助手函数
    Handlebars.registerHelper('product_thirdparty_share', function (id, shareData, shareSettings) {
        if (!shareData || !shareSettings) {
            return { defaultShowList: [], moreList: [] };
        }
        // 解构分享数据
        const { title = '', uri = {}, image = '', description = '', storeInfo = {} } = shareData;
        // 解构分享设置
        const { facebook = true, twitter = true, pinterest = true, line = true, whatsapp = true, tumblr = true } = shareSettings;
        // 当前页面URL
        const currentUrl = typeof uri === 'string' ? uri : (uri.href || '');
        // 分享平台配置
        const platforms = {
            facebook: {
                name: 'Share',
                url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
                enabled: facebook
            },
            twitter: {
                name: 'Tweet',
                url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
                enabled: twitter
            },
            pinterest: {
                name: 'Pin it',
                url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(description)}`,
                enabled: pinterest
            },
            line: {
                name: 'LINE',
                url: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(currentUrl)}`,
                enabled: line
            },
            whatsapp: {
                name: 'Whatsapp',
                url: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + currentUrl)}`,
                enabled: whatsapp
            },
            tumblr: {
                name: 'Tumblr',
                url: `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}&caption=${encodeURIComponent(description)}`,
                enabled: tumblr
            }
        };
        // 根据启用状态筛选平台
        const enabledPlatforms = Object.keys(platforms).filter(key => platforms[key].enabled).map(key => ({
            name: platforms[key].name,
            url: platforms[key].url
        }));
        // 默认显示前4个平台，其余放入更多列表
        const defaultShowList = enabledPlatforms.slice(0, 4);
        const moreList = enabledPlatforms.slice(4);
        return {
            defaultShowList,
            moreList
        };
    });
    // trade_cart_sku_num_map 助手函数
    Handlebars.registerHelper('trade_cart_sku_num_map', function (activeItems) {
        // 创建一个空的映射对象
        const skuNumMap = {};
        // 遍历所有活动商品项
        if (activeItems && Array.isArray(activeItems)) {
            activeItems.forEach(item => {
                // 假设每个item都有sku_id和quantity属性
                // 根据实际数据结构调整键名
                if (item.sku_id || item.skuId) {
                    const skuId = item.sku_id || item.skuId;
                    const quantity = item.quantity || item.num || 1;
                    skuNumMap[skuId] = quantity;
                }
            });
        }
        return skuNumMap;
    });
    // sales_promotion_reminder_translate 助手函数
    Handlebars.registerHelper('sales_promotion_reminder_translate', function (promotion, options) {
        try {
            // 检查输入参数
            if (!promotion || typeof promotion !== 'object') {
                return {};
            }
            // 获取配置选项
            const config = options.hash || {};
            const lineBreak = config.lineBreak || 0;
            // 初始化返回对象
            const result = {
                show: false,
                text: '',
                type: '',
                promotionId: promotion.id || '',
                promotionName: promotion.name || ''
            };
            // 检查是否有促销信息需要显示
            if (!promotion.benefitType && !promotion.promotionType) {
                return result;
            }
            // 根据促销类型处理不同的提醒文本
            const benefitType = promotion.benefitType || promotion.promotionType;
            const promotionName = promotion.name || '';
            // 设置促销类型
            result.type = benefitType;
            result.promotionId = promotion.id || '';
            result.promotionName = promotionName;
            // 根据不同类型生成提醒文本
            switch (benefitType) {
                case 1: // 满减
                case 'FULL_DISCOUNT':
                    result.text = `满减优惠: ${promotionName}`;
                    result.show = true;
                    break;
                case 2: // 折扣
                case 'DISCOUNT':
                    result.text = `折扣优惠: ${promotionName}`;
                    result.show = true;
                    break;
                case 3: // 特价
                case 'SPECIAL_PRICE':
                    result.text = `特价优惠: ${promotionName}`;
                    result.show = true;
                    break;
                case 4: // 包邮
                case 'FREE_SHIPPING':
                    result.text = `包邮优惠: ${promotionName}`;
                    result.show = true;
                    break;
                case 5: // 买赠
                case 'BUY_GIFT':
                    result.text = `买赠活动: ${promotionName}`;
                    result.show = true;
                    break;
                case 6: // 第X件X折
                case 'NTH_DISCOUNT':
                    result.text = `第X件折扣: ${promotionName}`;
                    result.show = true;
                    break;
                case 7: // 满赠
                case 'FULL_GIFT':
                    result.text = `满赠活动: ${promotionName}`;
                    result.show = true;
                    break;
                default:
                    result.text = promotionName;
                    result.show = !!promotionName;
            }
            // 如果需要换行处理
            if (lineBreak && result.text) {
                // 根据lineBreak值处理换行
                if (lineBreak === 1) {
                    // 使用<br>标签换行
                    result.text = result.text.replace(/: /g, ':<br>');
                }
                else if (lineBreak === 2) {
                    // 使用\n换行
                    result.text = result.text.replace(/: /g, ':\n');
                }
            }
            // 处理促销的额外信息
            if (promotion.saleExtInfo) {
                try {
                    const extInfo = typeof promotion.saleExtInfo === 'string'
                        ? JSON.parse(promotion.saleExtInfo)
                        : promotion.saleExtInfo;
                    if (extInfo && typeof extInfo === 'object') {
                        // 合并扩展信息到结果中
                        Object.assign(result, extInfo);
                    }
                }
                catch (e) {
                    // 解析失败时不处理
                    console.warn('Failed to parse saleExtInfo:', e);
                }
            }
            return result;
        }
        catch (error) {
            console.error('sales_promotion_reminder_translate helper error:', error);
            return {
                show: false,
                text: '',
                type: ''
            };
        }
    });
    // trade_cart_show_remove 助手函数
    Handlebars.registerHelper('trade_cart_show_remove', function (data, skuNumMap, options) {
        try {
            // 检查输入参数
            if (!data || typeof data !== 'object') {
                return false;
            }
            // 默认返回值
            let shouldShowRemove = true;
            // 检查商品是否为特殊业务类型
            if (data.businessFlag) {
                // 如果 singleDelete 为 false，则不显示删除按钮
                if (data.businessFlag.singleDelete === false) {
                    shouldShowRemove = false;
                }
                // 如果是不可调整数量的商品，可能也不显示删除按钮
                if (data.businessFlag.singleAdjustNum === false) {
                    shouldShowRemove = false;
                }
            }
            // 检查商品库存状态
            if (data.maxPurchaseTotalNum !== undefined && data.maxPurchaseTotalNum <= 0) {
                // 如果商品已售罄且原因代码为库存不足，可能不显示删除按钮
                if (data.maxPurchaseReasonCode === 'STOCK_OVER') {
                    shouldShowRemove = false;
                }
            }
            // 检查 SKU 数量映射
            if (skuNumMap && typeof skuNumMap === 'object') {
                const skuId = data.skuId || data.skuSeq;
                if (skuId && skuNumMap.hasOwnProperty(skuId)) {
                    const skuNum = skuNumMap[skuId];
                    // 如果数量为0或其他特殊状态，可能影响删除按钮的显示
                    if (skuNum <= 0) {
                        shouldShowRemove = false;
                    }
                }
            }
            // 检查商品是否处于非活动状态
            if (data.inactive === true) {
                shouldShowRemove = false;
            }
            // 检查是否有错误列表且错误类型特殊
            if (data.errorList && Array.isArray(data.errorList) && data.errorList.length > 0) {
                // 某些错误状态下可能不显示删除按钮
                const criticalErrors = ['0105']; // 示例错误代码
                if (data.errorList.some((error) => criticalErrors.includes(error))) {
                    shouldShowRemove = false;
                }
            }
            // 检查商品来源
            if (data.productSource !== undefined) {
                // 某些特殊来源的商品可能不允许删除
                const restrictedSources = [2, 3]; // 示例限制来源
                if (restrictedSources.includes(data.productSource)) {
                    shouldShowRemove = false;
                }
            }
            return shouldShowRemove;
        }
        catch (error) {
            console.error('trade_cart_show_remove helper error:', error);
            // 出错时默认显示删除按钮
            return true;
        }
    });
    // trade_coupon_formatData 助手函数 - 格式化购物车优惠券相关数据
    Handlebars.registerHelper('trade_coupon_formatData', function (cartType, options) {
        try {
            // 初始化促销代码列表
            let promotionCodesList = [];
            // 根据购物车类型和当前上下文获取促销代码数据
            if (this.cartInfo && this.cartInfo.promotionCodes) {
                // 处理促销代码数据
                promotionCodesList = this.cartInfo.promotionCodes.map((code) => {
                    return {
                        promotionCode: code.code || code.promotionCode || '',
                        valid: code.valid !== undefined ? code.valid : true,
                        message: code.message || '',
                        discountAmount: code.discountAmount || 0,
                        ...code // 保留其他原始属性
                    };
                });
            }
            // 如果直接传入了促销代码列表，则使用它
            if (this.promotionCodesList) {
                promotionCodesList = this.promotionCodesList;
            }
            // 创建传递给模板的上下文数据
            const context = {
                // 保持原有上下文数据
                ...this,
                // 购物车类型
                cartType: cartType || 'cart',
                // 促销代码列表
                promotionCodesList: promotionCodesList,
                // 是否有有效的促销代码
                hasValidCodes: promotionCodesList.some((code) => code.valid),
                // 是否有无效的促销代码
                hasInvalidCodes: promotionCodesList.some((code) => !code.valid),
                // 有效的促销代码列表
                validPromotionCodes: promotionCodesList.filter((code) => code.valid),
                // 无效的促销代码列表
                invalidPromotionCodes: promotionCodesList.filter((code) => !code.valid)
            };
            // 执行块内容并返回结果
            if (options && typeof options.fn === 'function') {
                return options.fn(context);
            }
            // 如果不是块级调用，返回上下文数据
            return context;
        }
        catch (error) {
            console.error('trade_coupon_formatData helper error:', error);
            // 出错时返回默认上下文
            const defaultContext = {
                cartType: cartType || 'cart',
                promotionCodesList: [],
                hasValidCodes: false,
                hasInvalidCodes: false,
                validPromotionCodes: [],
                invalidPromotionCodes: [],
                ...this
            };
            if (options && typeof options.fn === 'function') {
                return options.fn(defaultContext);
            }
            return defaultContext;
        }
    });
    // urlParse 助手函数 - 解析URL并返回其组成部分
    Handlebars.registerHelper('urlParse', function (url, options) {
        try {
            // 检查 url 参数
            if (!url || typeof url !== 'string') {
                // 如果是块级调用，执行块内容
                if (options && typeof options.fn === 'function') {
                    return options.fn(this);
                }
                return null;
            }
            // 解析URL
            const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.href : 'http://localhost');
            // 构建返回对象
            const parsedUrl = {
                protocol: urlObj.protocol,
                hostname: urlObj.hostname,
                port: urlObj.port,
                pathname: urlObj.pathname,
                search: urlObj.search,
                hash: urlObj.hash,
                href: urlObj.href,
                query: Object.fromEntries(urlObj.searchParams),
                // 兼容Shopline/Shopify格式
                host: urlObj.host,
                path: urlObj.pathname + urlObj.search
            };
            // 如果是块级调用，将解析结果添加到上下文并执行块内容
            if (options && typeof options.fn === 'function') {
                // 合并解析结果到当前上下文
                const contextWithUrlData = Object.assign({}, this, parsedUrl);
                return options.fn(contextWithUrlData);
            }
            // 子表达式调用或者直接调用，返回解析结果
            if (options && options.hash) {
                // 如果指定了特定属性，返回该属性的值
                const property = options.hash.property;
                if (property && parsedUrl.hasOwnProperty(property)) {
                    return parsedUrl[property];
                }
            }
            // 默认返回整个解析对象
            return parsedUrl;
        }
        catch (error) {
            console.error('urlParse helper error:', error);
            // 出错时返回空对象或执行块内容
            if (options && typeof options.fn === 'function') {
                return options.fn(this);
            }
            return {};
        }
    });
    Handlebars.registerHelper('formItem', function (name, additionalAttrs, options) {
        // 确保 options 存在
        if (!options && typeof additionalAttrs === 'object') {
            options = additionalAttrs;
            additionalAttrs = '';
        }
        // 如果没有提供 options，则直接返回空字符串
        if (!options) {
            return '';
        }
        // 提取块级内容
        const content = options.fn ? options.fn(this) : '';
        // 处理额外属性
        let attrs = '';
        if (additionalAttrs && typeof additionalAttrs === 'string') {
            attrs = additionalAttrs.trim();
            if (attrs) {
                attrs = ' ' + attrs;
            }
        }
        // 生成表单项包装结构
        return new Handlebars.SafeString(`<div sl-form-item-name="${name}" ${attrs}>${content}</div>`);
    });
    // url_decode 助手函数 - 解码URL
    Handlebars.registerHelper('url_decode', function (url) {
        if (!url)
            return '';
        try {
            return decodeURIComponent(url);
        }
        catch (e) {
            // 如果解码失败，返回原始字符串
            return url;
        }
    });
}

function section({ key, sectionName, content, handlebarsInstance }) {
    const Handlebars = handlebarsInstance;
    // 上下文对象
    let newContent;
    // section 配置
    if (sectionName == 'announcement-bar' || sectionName == 'footer' || sectionName == 'header') {
        newContent = {
            ...content.data.root,
            section: {
                id: key,
                ...content.data.root.sections[sectionName]
            }
        };
    }
    else {
        newContent = { ...content };
    }
    try {
        // ？？？
        // 读取模板文件
        const templateContent = getFileContent(`sections/${sectionName}.html`, newContent.fileConfig);
        // 提取元数据
        const metaData = extractMetaData(templateContent);
        // 同时移除 Front Matter 部分
        let sectionTemplate = templateContent.replace(/^---[\s\S]*?---\s*\n/, '');
        // 提取 schema 数据  默认数据
        const sectionSchemaData = extractSchema(sectionTemplate);
        // 移除 schema 部分，只保留模板内容
        sectionTemplate = sectionTemplate.replace(/{{#schema}}[\s\S]*?{{\/schema}}/, '');
        // 补充默认数据settings
        sectionSchemaData.settings?.forEach((item) => {
            if ((newContent.section.settings?.[item.id] == undefined || newContent.section.settings?.[item.id] == null) && (item.default !== undefined)) {
                newContent.section.settings[item.id] = item.default;
            }
        });
        // 补充默认数据blocks
        sectionSchemaData.blocks?.forEach((block) => {
            block.settings?.forEach((item) => {
                if (newContent.section?.blocks) {
                    Object.entries(newContent.section.blocks).forEach(([blockKey, blockData]) => {
                        if (blockData.type == block.type) {
                            if ((newContent.section.blocks[blockKey].settings[item.id] == undefined || newContent.section.blocks[blockKey].settings[item.id] == null) && (item.default !== undefined)) {
                                newContent.section.blocks[blockKey].settings[item.id] = item.default;
                            }
                            // 补充id
                            newContent.section.blocks[blockKey].id = blockKey;
                        }
                    });
                }
                else {
                    newContent.section.blocks = {};
                }
            });
        });
        const template = Handlebars.compile(sectionTemplate);
        const renderedHTML = template(newContent);
        return new Handlebars.SafeString(`<div id=shopline-section-${key} class="shopline-section">${renderedHTML}</div>`);
    }
    catch (error) {
        console.error(`Error rendering section "${sectionName}"`);
        console.error(error);
        return new Handlebars.SafeString(`<!-- Section "${sectionName}" failed to render -->`);
    }
}
// 提取 schema 数据的函数
function extractSchema(templateContent) {
    const schemaMatch = templateContent.match(/{{#schema}}([\s\S]*?){{\/schema}}/);
    if (schemaMatch) {
        try {
            return JSON.parse(schemaMatch[1].trim());
        }
        catch (error) {
            console.warn('解析 schema 失败:', error);
            return null;
        }
    }
    return null;
}
// 提取元数据的函数
function extractMetaData(templateContent) {
    // 匹配 Front Matter (YAML 格式)
}
// 返回section片段
async function getSection({ sectionsData, sectionID, fileConfig, globaleData }) {
    const sectionName = sectionsData.type;
    // 读取模板文件
    const templateContent = getFileContent(`sections/${sectionName}.html`, fileConfig);
    // 同时移除 Front Matter 部分
    let sectionTemplate = templateContent.replace(/^---[\s\S]*?---\s*\n/, '');
    // 提取 schema 数据  默认数据
    const sectionSchemaData = extractSchema(sectionTemplate);
    // 移除 schema 部分，只保留模板内容
    sectionTemplate = sectionTemplate.replace(/{{#schema}}[\s\S]*?{{\/schema}}/, '');
    // 编辑section数据
    let newContent = {
        ...globaleData,
        section: {
            id: sectionID,
            ...sectionsData
        },
        fileConfig: fileConfig
    };
    // 补充默认数据settings
    sectionSchemaData?.settings?.forEach((item) => {
        if ((newContent.section.settings?.[item.id] == undefined || newContent.section.settings?.[item.id] == null) && (item.default !== undefined)) {
            newContent.section.settings[item.id] = item.default;
        }
    });
    // 补充默认数据blocks
    sectionSchemaData?.blocks?.forEach((block) => {
        block.settings?.forEach((item) => {
            if (newContent.section?.blocks) {
                Object.entries(newContent.section.blocks).forEach(([blockKey, blockData]) => {
                    if (blockData.type == block.type) {
                        if ((newContent.section.blocks[blockKey].settings[item.id] == undefined || newContent.section.blocks[blockKey].settings[item.id] == null) && (item.default !== undefined)) {
                            newContent.section.blocks[blockKey].settings[item.id] = item.default;
                        }
                        // 补充id
                        newContent.section.blocks[blockKey].id = blockKey;
                    }
                });
            }
            else {
                newContent.section.blocks = {};
            }
        });
    });
    // 编译模板
    const template = Handlebars.compile(sectionTemplate);
    const renderedHTML = template(newContent);
    return new Handlebars.SafeString(`${renderedHTML}`);
}

// 导入section函数
function registerUiHelpers(Handlebars) {
    // 字体对象助手函数
    Handlebars.registerHelper('google_font_spec', function (content, options) {
        // 获取字体名称和变体
        const googleFontSpec = content || "";
        const [fontName, variant, style, weight] = googleFontSpec.split(':');
        // 创建字体对象
        const font = {
            "family": fontName ?? "",
            "variant": variant ?? "regular",
            "style": style ?? "normal",
            "weight": weight ?? "400"
        };
        // 返回字体对象
        return font;
    });
    // hex_2_rgb助手函数
    Handlebars.registerHelper("hex_2_rgb", function (hex) {
        if (!hex)
            return '255,255,255';
        hex = String(hex).replace('#', '');
        if (hex.length === 3) {
            hex = hex.split('').map((char) => char + char).join('');
        }
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return r + ',' + g + ',' + b;
    });
    // image_responsive 助手函数
    Handlebars.registerHelper("image_responsive", function (src, options) {
        try {
            const imageSrc = src || '';
            // 获取哈希参数
            const hash = options.hash || {};
            const pcSize = hash.pcSize || '100vw';
            const mSize = hash.mSize || '100vw';
            const containerMaxWidth = hash.containerMaxWidth || null;
            // 生成 sizes 属性
            const generateSizes = () => {
                if (containerMaxWidth) {
                    return `${pcSize}, ${mSize}, ${containerMaxWidth}px`;
                }
                return `${pcSize}, ${mSize}`;
            };
            // 如果图片源为空，返回空属性
            if (!imageSrc) {
                return {
                    srcAttr: '',
                    srcsetAttr: '',
                    sizesAttr: generateSizes()
                };
            }
            // 根据图片服务生成 srcset
            const generateSrcSetForService = (baseSrc) => {
                // 这里根据您的图片服务实现
                // 示例：支持宽度参数的图片服务
                const widths = [375, 540, 720, 900, 1080, 1296, 1512, 1728, 1944, 2160, 2660, 2960, 3260, 3860];
                return widths.map(width => {
                    let url = baseSrc;
                    // 添加宽度参数（根据实际服务调整）
                    if (url.includes('?')) {
                        url += `&w=${width}`;
                    }
                    else {
                        url += `?w=${width}`;
                    }
                    return `${url} ${width}w`;
                }).join(', ');
            };
            // 简单的 srcset（如果有不同尺寸的图片版本）
            // 这里假设您有预定义的不同尺寸图片
            const srcset = '';
            return {
                srcAttr: imageSrc,
                srcsetAttr: generateSrcSetForService(imageSrc),
                responsiveAttr: `data-src="${imageSrc}" data-srcset="${generateSrcSetForService(imageSrc)}" decoding="async" sizes="${generateSizes()}"`,
                sizesAttr: generateSizes()
            };
        }
        catch (error) {
            console.error('image_responsive helper error:', error);
            return {
                srcAttr: src || '',
                srcsetAttr: '',
                sizesAttr: '100vw'
            };
        }
    });
    // render
    // 渲染一个块或组件
    // 参数:
    // block: 要渲染的块对象
    // options: Handlebars 选项对象
    // returns: 渲染后的内容
    Handlebars.registerHelper("render", function (block, options) {
        try {
            // 检查参数
            if (!block || typeof block !== 'object') {
                return '';
            }
            // 获取块的类型
            const blockType = block.type;
            // 如果没有指定类型，尝试使用默认渲染方式
            if (!blockType) {
                // 如果块有 content 或 html 属性，直接返回
                if (block.content) {
                    return new Handlebars.SafeString(block.content);
                }
                if (block.html) {
                    return new Handlebars.SafeString(block.html);
                }
                return '';
            }
            // 最后回退到空字符串
            return '';
        }
        catch (error) {
            console.error('render helper error:', error);
            return '';
        }
    });
    // section 助手函数
    Handlebars.registerHelper('section', function (content, options, callback) {
        const sectionHtml = section({
            key: content,
            sectionName: content,
            content: options,
            handlebarsInstance: Handlebars,
        });
        return sectionHtml;
    });
    // slot_content助手函数
    Handlebars.registerHelper("slot_content", function (name, options) {
        // 检查第一个参数是否是字符串
        const slotName = typeof name === 'string' ? name : 'default';
        // 检查插槽内容是否存在
        if (!this.__children) {
            return;
        }
        try {
            if (!this.__children) {
                return '';
            }
            const content = this.__children[slotName];
            return content ? new Handlebars.SafeString(content) : '';
        }
        catch (error) {
            console.error('slot_content helper error:', error);
            return '';
        }
    });
    // child 助手函数
    Handlebars.registerHelper("child", function (name, options) {
        try {
            // 检查第一个参数是否是字符串
            const childName = (typeof name === 'string') ? name : 'default';
            if (options && typeof options.fn === 'function') {
                const content = options.fn(this);
                this.__children = this.__children || {};
                // 无论是否是 default，都存储到 __children
                this.__children[childName] = content;
            }
        }
        catch (error) {
            console.error('child helper error:', error);
        }
    });
    // sliceListByGrid 助手函数
    Handlebars.registerHelper("sliceListByGrid", function (list, pnum, num) {
        return list;
    });
    // include 助手函数
    Handlebars.registerHelper('include', function (templateName, options) {
        try {
            // 获取文件配置
            const fileConfig = options.data.root.fileConfig;
            // 创建上下文数据
            const includeContext = {};
            // 合并根上下文数据
            if (options.data && options.data.root) {
                Object.assign(includeContext, options.data.root);
            }
            // 合并当前上下文数据
            Object.assign(includeContext, this);
            // 合并传递的参数
            if (options.hash) {
                Object.assign(includeContext, options.hash);
            }
            // 渲染并返回指定模板
            const renderedContent = util.renderTemplate(Handlebars, templateName, includeContext, fileConfig);
            // 返回安全字符串
            return new Handlebars.SafeString(renderedContent);
        }
        catch (error) {
            console.error('Include helper error:', error);
            return '';
        }
    });
    /**
     * pagination 助手函数
     * 用于生成分页导航组件
     */
    Handlebars.registerHelper('pagination', function (options) {
        // 提取参数
        const { id = '', wrapperClass = '', total = 0, // 总条目数
        pageSize = 20, // 每页条目数
        current = 1, // 当前页码
        isMobile = false, // 是否移动端
        uri = {}, // 当前URI信息
        mode = 'normal' // 分页模式 ('simple' | 'normal')
         } = options.hash;
        // 计算总页数
        const lastPageNum = Math.ceil(Number(total) / Number(pageSize)) || 1;
        // 确保当前页码在有效范围内
        const currentPage = Math.max(1, Math.min(Number(current), lastPageNum));
        // 解析当前URL查询参数
        // console.log('uri', uri);
        const url = new URL(String(uri.url || ''), 'http://localhost');
        const searchParams = new URLSearchParams(String(url.search));
        // 构建基础URL（不包含分页参数）
        searchParams.delete('page'); // 移除现有的分页参数
        url.pathname + (searchParams.toString() ? '?' + searchParams.toString() : '');
        // 生成分页项
        const items = [];
        // 上一页
        if (currentPage > 1) {
            searchParams.set('page', String(currentPage - 1));
            items.push({
                type: 'pre',
                href: url.pathname + '?' + searchParams.toString(),
                current: currentPage,
                pagenum: currentPage - 1
            });
        }
        // 页码链接（普通模式）
        if (mode !== 'simple') {
            // 生成页码链接
            const pageRange = util.getPageRange(Number(currentPage), Number(lastPageNum));
            pageRange?.forEach((page) => {
                if (page === '...') {
                    items.push({
                        type: 'ellipsis'
                    });
                }
                else {
                    searchParams.delete('page');
                    if (page !== 1) {
                        searchParams.set('page', page);
                    }
                    items.push({
                        type: 'link',
                        href: url.pathname + (searchParams.toString() ? '?' + searchParams.toString() : ''),
                        current: currentPage,
                        pagenum: page,
                        active: page === currentPage
                    });
                }
            });
        }
        // 下一页
        if (currentPage < lastPageNum) {
            searchParams.set('page', String(currentPage + 1));
            items.push({
                type: 'next',
                href: url.pathname + '?' + searchParams.toString(),
                current: currentPage,
                pagenum: currentPage + 1
            });
        }
        // 构建传递给模板的数据上下文
        const context = {
            id,
            wrapperClass,
            total,
            pageSize,
            current: currentPage,
            isMobile,
            uri,
            mode,
            lastPageNum,
            items
        };
        // 执行块内容并返回结果
        return options.fn(context);
    });
}

function registerInternalObjectsHelpers(Handlebars) {
    // year 助手函数 - 获取年份
    Handlebars.registerHelper('year', function (options) {
        return new Date().getFullYear();
    });
}

// 注册所有助手函数
function registerAllHelpers() {
    registerStringHelpers(Handlebars);
    registerConditionHelpers(Handlebars);
    registerMathHelpers(Handlebars);
    registerCoreHelpers(Handlebars);
    registerAssetHelpers(Handlebars);
    registerArrayHelpers(Handlebars);
    registerEcommerceHelpers(Handlebars);
    registerUiHelpers(Handlebars);
    registerInternalObjectsHelpers(Handlebars);
    // 注册 helperMissing 来捕获未注册的助手函数调用 -- 防止静默失败的问题
    Handlebars.registerHelper('helperMissing', function (...args) {
        const options = args[args.length - 1];
        if (options && options.name) {
            const helperName = options.name;
            let templateInfo = '';
            if (options.data && options.data.root) {
                // 尝试从上下文获取更多信息
                templateInfo = options.data.root.filePath || options.data.root.templateName || 'unknow';
            }
            console.error(`Missing helper "${helperName}" in template: ${templateInfo}`);
        }
        return undefined;
    });
}
// 执行注册
registerAllHelpers();

class HbsTemplateEngine {
    constructor(options = {}) {
        this.handlebars = Handlebars;
        this.viewsDir = options.viewsDir || path.join(process.cwd(), 'views');
        this.partialsDir = options.partialsDir || path.join(this.viewsDir, 'partials');
        this.helpers = options.helpers || {};
        // 注册自定义助手
        this.registerHelpers();
    }
    registerHelpers() {
        // 注册自定义助手
        Object.keys(this.helpers).forEach(name => {
            this.handlebars.registerHelper(name, this.helpers[name]);
        });
    }
    async registerPartials() {
        try {
            const partials = await fs.promises.readdir(this.partialsDir);
            for (const partial of partials) {
                if (path.extname(partial) === '.hbs') {
                    const partialName = path.basename(partial, '.hbs');
                    const partialPath = path.join(this.partialsDir, partial);
                    const partialContent = await fs.promises.readFile(partialPath, 'utf-8');
                    this.handlebars.registerPartial(partialName, partialContent);
                }
            }
        }
        catch (err) {
            // 如果partials目录不存在，忽略错误
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }
    }
    async render(templateName, context = {}) {
        const templatePath = path.join(this.viewsDir, `${templateName}.hbs`);
        const templateContent = await fs.promises.readFile(templatePath, 'utf-8');
        const template = this.handlebars.compile(templateContent);
        return template(context);
    }
    async renderString(templateString, context = {}) {
        const template = this.handlebars.compile(templateString);
        return template(context);
    }
    async renderFile(filePath, context = {}) {
        const templateContent = await fs.promises.readFile(filePath, 'utf-8');
        const template = this.handlebars.compile(templateContent);
        return template(context);
    }
    // 添加创建安全字符串的方法
    createSafeString(string) {
        return new this.handlebars.SafeString(string);
    }
    // 添加编译方法，返回编译后的模板函数
    compile(templateString) {
        return this.handlebars.compile(templateString);
    }
}

// 根据 JSON 数据动态生成模板内容
async function generateTemplateFromJson(data, globaleData) {
    let dynamicTemplate = "";
    if (data.sections) {
        // 遍历 sections 对象的所有键
        for (const item of data?.order) {
            const key = item;
            const sectionConfig = data.sections[item];
            try {
                // 确保 section 配置有类型
                if (sectionConfig && typeof sectionConfig === 'object' && 'type' in sectionConfig) {
                    // 调用 section 函数渲染对应的内容
                    const sectionContent = await section({
                        key: key,
                        sectionName: sectionConfig.type,
                        content: {
                            ...globaleData,
                            section: {
                                id: key,
                                ...sectionConfig
                            }
                        }, // 添加全局数据到上下文
                        handlebarsInstance: Handlebars
                    });
                    dynamicTemplate += sectionContent;
                }
                else {
                    console.warn(`Section [${key}] 缺少类型信息`);
                }
            }
            catch (error) {
                console.error(`Section "${key}" 渲染失败:`, error);
                dynamicTemplate += `<div class="section-warp error">Section "${key}" 渲染失败</div>`;
            }
        }
        // 如果存在 wrapper 配置，则包裹一层元素
        if (data.wrapper) {
            let tag = '';
            let id = '';
            const classParts = [];
            // 1️⃣ 优先提取ID部分（#）
            const idIndex = data.wrapper.indexOf('#');
            if (idIndex !== -1) {
                id = data.wrapper.substring(idIndex + 1);
                const beforeId = data.wrapper.substring(0, idIndex);
                if (beforeId) {
                    const parts = beforeId.split('.');
                    tag = parts[0];
                    if (parts.length > 1) {
                        classParts.push(...parts.slice(1));
                    }
                }
            }
            else {
                const parts = data.wrapper.split('.');
                tag = parts[0];
                if (parts.length > 1) {
                    classParts.push(...parts.slice(1));
                }
            }
            // 2️⃣ 处理ID中可能包含的类名
            if (id && id.includes('.')) {
                const idParts = id.split('.');
                id = idParts[0];
                classParts.push(...idParts.slice(1));
            }
            // 3️⃣ 构建属性字符串
            const classAttr = classParts.length > 0 ? ` class="${classParts.join(' ')}"` : '';
            const idAttr = id ? ` id="${id}"` : '';
            dynamicTemplate = `<${tag}${idAttr}${classAttr}>${dynamicTemplate}</${tag}>`;
        }
    }
    return new Handlebars.SafeString(dynamicTemplate);
}

// packages/my-hbs/index.mjs
// 引入 HBS 引擎对象
// 实例化 HBS 引擎对象
const hbsEngine = new HbsTemplateEngine();
// 默认导出
var index = {
    myHbs: {
        getSection: getSection,
        HbsTemplateEngine: HbsTemplateEngine,
        render: hbsEngine.render.bind(hbsEngine),
        renderString: hbsEngine.renderString.bind(hbsEngine),
        renderFile: hbsEngine.renderFile.bind(hbsEngine),
        createSafeString: hbsEngine.createSafeString.bind(hbsEngine),
        compile: hbsEngine.compile.bind(hbsEngine),
        i18nManager: i18nManager,
        getFileContent: getFileContent,
        generateTemplateFromJson: generateTemplateFromJson,
    }
};

export { index as default };
//# sourceMappingURL=index.mjs.map
