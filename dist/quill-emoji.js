(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Quill"));
	else if(typeof define === 'function' && define.amd)
		define("WMLQuillEmoji", ["Quill"], factory);
	else if(typeof exports === 'object')
		exports["WMLQuillEmoji"] = factory(require("Quill"));
	else
		root["WMLQuillEmoji"] = factory(root["Quill"]);
})(this, (__WEBPACK_EXTERNAL_MODULE_quill__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ansi-html-community/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __assign=this&&this.__assign||function(){__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p]}return t};return __assign.apply(this,arguments)};Object.defineProperty(exports, "__esModule", ({value:true}));var named_references_1=__webpack_require__(/*! ./named-references */ "./node_modules/html-entities/lib/named-references.js");var numeric_unicode_map_1=__webpack_require__(/*! ./numeric-unicode-map */ "./node_modules/html-entities/lib/numeric-unicode-map.js");var surrogate_pairs_1=__webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");var allNamedReferences=__assign(__assign({},named_references_1.namedReferences),{all:named_references_1.namedReferences.html5});function replaceUsingRegExp(macroText,macroRegExp,macroReplacer){macroRegExp.lastIndex=0;var replaceMatch=macroRegExp.exec(macroText);var replaceResult;if(replaceMatch){replaceResult="";var replaceLastIndex=0;do{if(replaceLastIndex!==replaceMatch.index){replaceResult+=macroText.substring(replaceLastIndex,replaceMatch.index)}var replaceInput=replaceMatch[0];replaceResult+=macroReplacer(replaceInput);replaceLastIndex=replaceMatch.index+replaceInput.length}while(replaceMatch=macroRegExp.exec(macroText));if(replaceLastIndex!==macroText.length){replaceResult+=macroText.substring(replaceLastIndex)}}else{replaceResult=macroText}return replaceResult}var encodeRegExps={specialChars:/[<>'"&]/g,nonAscii:/[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,nonAsciiPrintable:/[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,nonAsciiPrintableOnly:/[\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,extensive:/[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g};var defaultEncodeOptions={mode:"specialChars",level:"all",numeric:"decimal"};function encode(text,_a){var _b=_a===void 0?defaultEncodeOptions:_a,_c=_b.mode,mode=_c===void 0?"specialChars":_c,_d=_b.numeric,numeric=_d===void 0?"decimal":_d,_e=_b.level,level=_e===void 0?"all":_e;if(!text){return""}var encodeRegExp=encodeRegExps[mode];var references=allNamedReferences[level].characters;var isHex=numeric==="hexadecimal";return replaceUsingRegExp(text,encodeRegExp,(function(input){var result=references[input];if(!result){var code=input.length>1?surrogate_pairs_1.getCodePoint(input,0):input.charCodeAt(0);result=(isHex?"&#x"+code.toString(16):"&#"+code)+";"}return result}))}exports.encode=encode;var defaultDecodeOptions={scope:"body",level:"all"};var strict=/&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;var attribute=/&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;var baseDecodeRegExps={xml:{strict:strict,attribute:attribute,body:named_references_1.bodyRegExps.xml},html4:{strict:strict,attribute:attribute,body:named_references_1.bodyRegExps.html4},html5:{strict:strict,attribute:attribute,body:named_references_1.bodyRegExps.html5}};var decodeRegExps=__assign(__assign({},baseDecodeRegExps),{all:baseDecodeRegExps.html5});var fromCharCode=String.fromCharCode;var outOfBoundsChar=fromCharCode(65533);var defaultDecodeEntityOptions={level:"all"};function getDecodedEntity(entity,references,isAttribute,isStrict){var decodeResult=entity;var decodeEntityLastChar=entity[entity.length-1];if(isAttribute&&decodeEntityLastChar==="="){decodeResult=entity}else if(isStrict&&decodeEntityLastChar!==";"){decodeResult=entity}else{var decodeResultByReference=references[entity];if(decodeResultByReference){decodeResult=decodeResultByReference}else if(entity[0]==="&"&&entity[1]==="#"){var decodeSecondChar=entity[2];var decodeCode=decodeSecondChar=="x"||decodeSecondChar=="X"?parseInt(entity.substr(3),16):parseInt(entity.substr(2));decodeResult=decodeCode>=1114111?outOfBoundsChar:decodeCode>65535?surrogate_pairs_1.fromCodePoint(decodeCode):fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode]||decodeCode)}}return decodeResult}function decodeEntity(entity,_a){var _b=(_a===void 0?defaultDecodeEntityOptions:_a).level,level=_b===void 0?"all":_b;if(!entity){return""}return getDecodedEntity(entity,allNamedReferences[level].entities,false,false)}exports.decodeEntity=decodeEntity;function decode(text,_a){var _b=_a===void 0?defaultDecodeOptions:_a,_c=_b.level,level=_c===void 0?"all":_c,_d=_b.scope,scope=_d===void 0?level==="xml"?"strict":"body":_d;if(!text){return""}var decodeRegExp=decodeRegExps[level][scope];var references=allNamedReferences[level].entities;var isAttribute=scope==="attribute";var isStrict=scope==="strict";return replaceUsingRegExp(text,decodeRegExp,(function(entity){return getDecodedEntity(entity,references,isAttribute,isStrict)}))}exports.decode=decode;
//# sourceMappingURL=./index.js.map

/***/ }),

/***/ "./node_modules/html-entities/lib/named-references.js":
/*!************************************************************!*\
  !*** ./node_modules/html-entities/lib/named-references.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.bodyRegExps={xml:/&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html4:/&notin;|&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html5:/&centerdot;|&copysr;|&divideontimes;|&gtcc;|&gtcir;|&gtdot;|&gtlPar;|&gtquest;|&gtrapprox;|&gtrarr;|&gtrdot;|&gtreqless;|&gtreqqless;|&gtrless;|&gtrsim;|&ltcc;|&ltcir;|&ltdot;|&lthree;|&ltimes;|&ltlarr;|&ltquest;|&ltrPar;|&ltri;|&ltrie;|&ltrif;|&notin;|&notinE;|&notindot;|&notinva;|&notinvb;|&notinvc;|&notni;|&notniva;|&notnivb;|&notnivc;|&parallel;|&timesb;|&timesbar;|&timesd;|&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g};exports.namedReferences={xml:{entities:{"&lt;":"<","&gt;":">","&quot;":'"',"&apos;":"'","&amp;":"&"},characters:{"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;","&":"&amp;"}},html4:{entities:{"&apos;":"'","&nbsp":" ","&nbsp;":" ","&iexcl":"¡","&iexcl;":"¡","&cent":"¢","&cent;":"¢","&pound":"£","&pound;":"£","&curren":"¤","&curren;":"¤","&yen":"¥","&yen;":"¥","&brvbar":"¦","&brvbar;":"¦","&sect":"§","&sect;":"§","&uml":"¨","&uml;":"¨","&copy":"©","&copy;":"©","&ordf":"ª","&ordf;":"ª","&laquo":"«","&laquo;":"«","&not":"¬","&not;":"¬","&shy":"­","&shy;":"­","&reg":"®","&reg;":"®","&macr":"¯","&macr;":"¯","&deg":"°","&deg;":"°","&plusmn":"±","&plusmn;":"±","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&acute":"´","&acute;":"´","&micro":"µ","&micro;":"µ","&para":"¶","&para;":"¶","&middot":"·","&middot;":"·","&cedil":"¸","&cedil;":"¸","&sup1":"¹","&sup1;":"¹","&ordm":"º","&ordm;":"º","&raquo":"»","&raquo;":"»","&frac14":"¼","&frac14;":"¼","&frac12":"½","&frac12;":"½","&frac34":"¾","&frac34;":"¾","&iquest":"¿","&iquest;":"¿","&Agrave":"À","&Agrave;":"À","&Aacute":"Á","&Aacute;":"Á","&Acirc":"Â","&Acirc;":"Â","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Aring":"Å","&Aring;":"Å","&AElig":"Æ","&AElig;":"Æ","&Ccedil":"Ç","&Ccedil;":"Ç","&Egrave":"È","&Egrave;":"È","&Eacute":"É","&Eacute;":"É","&Ecirc":"Ê","&Ecirc;":"Ê","&Euml":"Ë","&Euml;":"Ë","&Igrave":"Ì","&Igrave;":"Ì","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Iuml":"Ï","&Iuml;":"Ï","&ETH":"Ð","&ETH;":"Ð","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Ograve":"Ò","&Ograve;":"Ò","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Otilde":"Õ","&Otilde;":"Õ","&Ouml":"Ö","&Ouml;":"Ö","&times":"×","&times;":"×","&Oslash":"Ø","&Oslash;":"Ø","&Ugrave":"Ù","&Ugrave;":"Ù","&Uacute":"Ú","&Uacute;":"Ú","&Ucirc":"Û","&Ucirc;":"Û","&Uuml":"Ü","&Uuml;":"Ü","&Yacute":"Ý","&Yacute;":"Ý","&THORN":"Þ","&THORN;":"Þ","&szlig":"ß","&szlig;":"ß","&agrave":"à","&agrave;":"à","&aacute":"á","&aacute;":"á","&acirc":"â","&acirc;":"â","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&aring":"å","&aring;":"å","&aelig":"æ","&aelig;":"æ","&ccedil":"ç","&ccedil;":"ç","&egrave":"è","&egrave;":"è","&eacute":"é","&eacute;":"é","&ecirc":"ê","&ecirc;":"ê","&euml":"ë","&euml;":"ë","&igrave":"ì","&igrave;":"ì","&iacute":"í","&iacute;":"í","&icirc":"î","&icirc;":"î","&iuml":"ï","&iuml;":"ï","&eth":"ð","&eth;":"ð","&ntilde":"ñ","&ntilde;":"ñ","&ograve":"ò","&ograve;":"ò","&oacute":"ó","&oacute;":"ó","&ocirc":"ô","&ocirc;":"ô","&otilde":"õ","&otilde;":"õ","&ouml":"ö","&ouml;":"ö","&divide":"÷","&divide;":"÷","&oslash":"ø","&oslash;":"ø","&ugrave":"ù","&ugrave;":"ù","&uacute":"ú","&uacute;":"ú","&ucirc":"û","&ucirc;":"û","&uuml":"ü","&uuml;":"ü","&yacute":"ý","&yacute;":"ý","&thorn":"þ","&thorn;":"þ","&yuml":"ÿ","&yuml;":"ÿ","&quot":'"',"&quot;":'"',"&amp":"&","&amp;":"&","&lt":"<","&lt;":"<","&gt":">","&gt;":">","&OElig;":"Œ","&oelig;":"œ","&Scaron;":"Š","&scaron;":"š","&Yuml;":"Ÿ","&circ;":"ˆ","&tilde;":"˜","&ensp;":" ","&emsp;":" ","&thinsp;":" ","&zwnj;":"‌","&zwj;":"‍","&lrm;":"‎","&rlm;":"‏","&ndash;":"–","&mdash;":"—","&lsquo;":"‘","&rsquo;":"’","&sbquo;":"‚","&ldquo;":"“","&rdquo;":"”","&bdquo;":"„","&dagger;":"†","&Dagger;":"‡","&permil;":"‰","&lsaquo;":"‹","&rsaquo;":"›","&euro;":"€","&fnof;":"ƒ","&Alpha;":"Α","&Beta;":"Β","&Gamma;":"Γ","&Delta;":"Δ","&Epsilon;":"Ε","&Zeta;":"Ζ","&Eta;":"Η","&Theta;":"Θ","&Iota;":"Ι","&Kappa;":"Κ","&Lambda;":"Λ","&Mu;":"Μ","&Nu;":"Ν","&Xi;":"Ξ","&Omicron;":"Ο","&Pi;":"Π","&Rho;":"Ρ","&Sigma;":"Σ","&Tau;":"Τ","&Upsilon;":"Υ","&Phi;":"Φ","&Chi;":"Χ","&Psi;":"Ψ","&Omega;":"Ω","&alpha;":"α","&beta;":"β","&gamma;":"γ","&delta;":"δ","&epsilon;":"ε","&zeta;":"ζ","&eta;":"η","&theta;":"θ","&iota;":"ι","&kappa;":"κ","&lambda;":"λ","&mu;":"μ","&nu;":"ν","&xi;":"ξ","&omicron;":"ο","&pi;":"π","&rho;":"ρ","&sigmaf;":"ς","&sigma;":"σ","&tau;":"τ","&upsilon;":"υ","&phi;":"φ","&chi;":"χ","&psi;":"ψ","&omega;":"ω","&thetasym;":"ϑ","&upsih;":"ϒ","&piv;":"ϖ","&bull;":"•","&hellip;":"…","&prime;":"′","&Prime;":"″","&oline;":"‾","&frasl;":"⁄","&weierp;":"℘","&image;":"ℑ","&real;":"ℜ","&trade;":"™","&alefsym;":"ℵ","&larr;":"←","&uarr;":"↑","&rarr;":"→","&darr;":"↓","&harr;":"↔","&crarr;":"↵","&lArr;":"⇐","&uArr;":"⇑","&rArr;":"⇒","&dArr;":"⇓","&hArr;":"⇔","&forall;":"∀","&part;":"∂","&exist;":"∃","&empty;":"∅","&nabla;":"∇","&isin;":"∈","&notin;":"∉","&ni;":"∋","&prod;":"∏","&sum;":"∑","&minus;":"−","&lowast;":"∗","&radic;":"√","&prop;":"∝","&infin;":"∞","&ang;":"∠","&and;":"∧","&or;":"∨","&cap;":"∩","&cup;":"∪","&int;":"∫","&there4;":"∴","&sim;":"∼","&cong;":"≅","&asymp;":"≈","&ne;":"≠","&equiv;":"≡","&le;":"≤","&ge;":"≥","&sub;":"⊂","&sup;":"⊃","&nsub;":"⊄","&sube;":"⊆","&supe;":"⊇","&oplus;":"⊕","&otimes;":"⊗","&perp;":"⊥","&sdot;":"⋅","&lceil;":"⌈","&rceil;":"⌉","&lfloor;":"⌊","&rfloor;":"⌋","&lang;":"〈","&rang;":"〉","&loz;":"◊","&spades;":"♠","&clubs;":"♣","&hearts;":"♥","&diams;":"♦"},characters:{"'":"&apos;"," ":"&nbsp;","¡":"&iexcl;","¢":"&cent;","£":"&pound;","¤":"&curren;","¥":"&yen;","¦":"&brvbar;","§":"&sect;","¨":"&uml;","©":"&copy;","ª":"&ordf;","«":"&laquo;","¬":"&not;","­":"&shy;","®":"&reg;","¯":"&macr;","°":"&deg;","±":"&plusmn;","²":"&sup2;","³":"&sup3;","´":"&acute;","µ":"&micro;","¶":"&para;","·":"&middot;","¸":"&cedil;","¹":"&sup1;","º":"&ordm;","»":"&raquo;","¼":"&frac14;","½":"&frac12;","¾":"&frac34;","¿":"&iquest;","À":"&Agrave;","Á":"&Aacute;","Â":"&Acirc;","Ã":"&Atilde;","Ä":"&Auml;","Å":"&Aring;","Æ":"&AElig;","Ç":"&Ccedil;","È":"&Egrave;","É":"&Eacute;","Ê":"&Ecirc;","Ë":"&Euml;","Ì":"&Igrave;","Í":"&Iacute;","Î":"&Icirc;","Ï":"&Iuml;","Ð":"&ETH;","Ñ":"&Ntilde;","Ò":"&Ograve;","Ó":"&Oacute;","Ô":"&Ocirc;","Õ":"&Otilde;","Ö":"&Ouml;","×":"&times;","Ø":"&Oslash;","Ù":"&Ugrave;","Ú":"&Uacute;","Û":"&Ucirc;","Ü":"&Uuml;","Ý":"&Yacute;","Þ":"&THORN;","ß":"&szlig;","à":"&agrave;","á":"&aacute;","â":"&acirc;","ã":"&atilde;","ä":"&auml;","å":"&aring;","æ":"&aelig;","ç":"&ccedil;","è":"&egrave;","é":"&eacute;","ê":"&ecirc;","ë":"&euml;","ì":"&igrave;","í":"&iacute;","î":"&icirc;","ï":"&iuml;","ð":"&eth;","ñ":"&ntilde;","ò":"&ograve;","ó":"&oacute;","ô":"&ocirc;","õ":"&otilde;","ö":"&ouml;","÷":"&divide;","ø":"&oslash;","ù":"&ugrave;","ú":"&uacute;","û":"&ucirc;","ü":"&uuml;","ý":"&yacute;","þ":"&thorn;","ÿ":"&yuml;",'"':"&quot;","&":"&amp;","<":"&lt;",">":"&gt;","Œ":"&OElig;","œ":"&oelig;","Š":"&Scaron;","š":"&scaron;","Ÿ":"&Yuml;","ˆ":"&circ;","˜":"&tilde;"," ":"&ensp;"," ":"&emsp;"," ":"&thinsp;","‌":"&zwnj;","‍":"&zwj;","‎":"&lrm;","‏":"&rlm;","–":"&ndash;","—":"&mdash;","‘":"&lsquo;","’":"&rsquo;","‚":"&sbquo;","“":"&ldquo;","”":"&rdquo;","„":"&bdquo;","†":"&dagger;","‡":"&Dagger;","‰":"&permil;","‹":"&lsaquo;","›":"&rsaquo;","€":"&euro;","ƒ":"&fnof;","Α":"&Alpha;","Β":"&Beta;","Γ":"&Gamma;","Δ":"&Delta;","Ε":"&Epsilon;","Ζ":"&Zeta;","Η":"&Eta;","Θ":"&Theta;","Ι":"&Iota;","Κ":"&Kappa;","Λ":"&Lambda;","Μ":"&Mu;","Ν":"&Nu;","Ξ":"&Xi;","Ο":"&Omicron;","Π":"&Pi;","Ρ":"&Rho;","Σ":"&Sigma;","Τ":"&Tau;","Υ":"&Upsilon;","Φ":"&Phi;","Χ":"&Chi;","Ψ":"&Psi;","Ω":"&Omega;","α":"&alpha;","β":"&beta;","γ":"&gamma;","δ":"&delta;","ε":"&epsilon;","ζ":"&zeta;","η":"&eta;","θ":"&theta;","ι":"&iota;","κ":"&kappa;","λ":"&lambda;","μ":"&mu;","ν":"&nu;","ξ":"&xi;","ο":"&omicron;","π":"&pi;","ρ":"&rho;","ς":"&sigmaf;","σ":"&sigma;","τ":"&tau;","υ":"&upsilon;","φ":"&phi;","χ":"&chi;","ψ":"&psi;","ω":"&omega;","ϑ":"&thetasym;","ϒ":"&upsih;","ϖ":"&piv;","•":"&bull;","…":"&hellip;","′":"&prime;","″":"&Prime;","‾":"&oline;","⁄":"&frasl;","℘":"&weierp;","ℑ":"&image;","ℜ":"&real;","™":"&trade;","ℵ":"&alefsym;","←":"&larr;","↑":"&uarr;","→":"&rarr;","↓":"&darr;","↔":"&harr;","↵":"&crarr;","⇐":"&lArr;","⇑":"&uArr;","⇒":"&rArr;","⇓":"&dArr;","⇔":"&hArr;","∀":"&forall;","∂":"&part;","∃":"&exist;","∅":"&empty;","∇":"&nabla;","∈":"&isin;","∉":"&notin;","∋":"&ni;","∏":"&prod;","∑":"&sum;","−":"&minus;","∗":"&lowast;","√":"&radic;","∝":"&prop;","∞":"&infin;","∠":"&ang;","∧":"&and;","∨":"&or;","∩":"&cap;","∪":"&cup;","∫":"&int;","∴":"&there4;","∼":"&sim;","≅":"&cong;","≈":"&asymp;","≠":"&ne;","≡":"&equiv;","≤":"&le;","≥":"&ge;","⊂":"&sub;","⊃":"&sup;","⊄":"&nsub;","⊆":"&sube;","⊇":"&supe;","⊕":"&oplus;","⊗":"&otimes;","⊥":"&perp;","⋅":"&sdot;","⌈":"&lceil;","⌉":"&rceil;","⌊":"&lfloor;","⌋":"&rfloor;","〈":"&lang;","〉":"&rang;","◊":"&loz;","♠":"&spades;","♣":"&clubs;","♥":"&hearts;","♦":"&diams;"}},html5:{entities:{"&AElig":"Æ","&AElig;":"Æ","&AMP":"&","&AMP;":"&","&Aacute":"Á","&Aacute;":"Á","&Abreve;":"Ă","&Acirc":"Â","&Acirc;":"Â","&Acy;":"А","&Afr;":"𝔄","&Agrave":"À","&Agrave;":"À","&Alpha;":"Α","&Amacr;":"Ā","&And;":"⩓","&Aogon;":"Ą","&Aopf;":"𝔸","&ApplyFunction;":"⁡","&Aring":"Å","&Aring;":"Å","&Ascr;":"𝒜","&Assign;":"≔","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Backslash;":"∖","&Barv;":"⫧","&Barwed;":"⌆","&Bcy;":"Б","&Because;":"∵","&Bernoullis;":"ℬ","&Beta;":"Β","&Bfr;":"𝔅","&Bopf;":"𝔹","&Breve;":"˘","&Bscr;":"ℬ","&Bumpeq;":"≎","&CHcy;":"Ч","&COPY":"©","&COPY;":"©","&Cacute;":"Ć","&Cap;":"⋒","&CapitalDifferentialD;":"ⅅ","&Cayleys;":"ℭ","&Ccaron;":"Č","&Ccedil":"Ç","&Ccedil;":"Ç","&Ccirc;":"Ĉ","&Cconint;":"∰","&Cdot;":"Ċ","&Cedilla;":"¸","&CenterDot;":"·","&Cfr;":"ℭ","&Chi;":"Χ","&CircleDot;":"⊙","&CircleMinus;":"⊖","&CirclePlus;":"⊕","&CircleTimes;":"⊗","&ClockwiseContourIntegral;":"∲","&CloseCurlyDoubleQuote;":"”","&CloseCurlyQuote;":"’","&Colon;":"∷","&Colone;":"⩴","&Congruent;":"≡","&Conint;":"∯","&ContourIntegral;":"∮","&Copf;":"ℂ","&Coproduct;":"∐","&CounterClockwiseContourIntegral;":"∳","&Cross;":"⨯","&Cscr;":"𝒞","&Cup;":"⋓","&CupCap;":"≍","&DD;":"ⅅ","&DDotrahd;":"⤑","&DJcy;":"Ђ","&DScy;":"Ѕ","&DZcy;":"Џ","&Dagger;":"‡","&Darr;":"↡","&Dashv;":"⫤","&Dcaron;":"Ď","&Dcy;":"Д","&Del;":"∇","&Delta;":"Δ","&Dfr;":"𝔇","&DiacriticalAcute;":"´","&DiacriticalDot;":"˙","&DiacriticalDoubleAcute;":"˝","&DiacriticalGrave;":"`","&DiacriticalTilde;":"˜","&Diamond;":"⋄","&DifferentialD;":"ⅆ","&Dopf;":"𝔻","&Dot;":"¨","&DotDot;":"⃜","&DotEqual;":"≐","&DoubleContourIntegral;":"∯","&DoubleDot;":"¨","&DoubleDownArrow;":"⇓","&DoubleLeftArrow;":"⇐","&DoubleLeftRightArrow;":"⇔","&DoubleLeftTee;":"⫤","&DoubleLongLeftArrow;":"⟸","&DoubleLongLeftRightArrow;":"⟺","&DoubleLongRightArrow;":"⟹","&DoubleRightArrow;":"⇒","&DoubleRightTee;":"⊨","&DoubleUpArrow;":"⇑","&DoubleUpDownArrow;":"⇕","&DoubleVerticalBar;":"∥","&DownArrow;":"↓","&DownArrowBar;":"⤓","&DownArrowUpArrow;":"⇵","&DownBreve;":"̑","&DownLeftRightVector;":"⥐","&DownLeftTeeVector;":"⥞","&DownLeftVector;":"↽","&DownLeftVectorBar;":"⥖","&DownRightTeeVector;":"⥟","&DownRightVector;":"⇁","&DownRightVectorBar;":"⥗","&DownTee;":"⊤","&DownTeeArrow;":"↧","&Downarrow;":"⇓","&Dscr;":"𝒟","&Dstrok;":"Đ","&ENG;":"Ŋ","&ETH":"Ð","&ETH;":"Ð","&Eacute":"É","&Eacute;":"É","&Ecaron;":"Ě","&Ecirc":"Ê","&Ecirc;":"Ê","&Ecy;":"Э","&Edot;":"Ė","&Efr;":"𝔈","&Egrave":"È","&Egrave;":"È","&Element;":"∈","&Emacr;":"Ē","&EmptySmallSquare;":"◻","&EmptyVerySmallSquare;":"▫","&Eogon;":"Ę","&Eopf;":"𝔼","&Epsilon;":"Ε","&Equal;":"⩵","&EqualTilde;":"≂","&Equilibrium;":"⇌","&Escr;":"ℰ","&Esim;":"⩳","&Eta;":"Η","&Euml":"Ë","&Euml;":"Ë","&Exists;":"∃","&ExponentialE;":"ⅇ","&Fcy;":"Ф","&Ffr;":"𝔉","&FilledSmallSquare;":"◼","&FilledVerySmallSquare;":"▪","&Fopf;":"𝔽","&ForAll;":"∀","&Fouriertrf;":"ℱ","&Fscr;":"ℱ","&GJcy;":"Ѓ","&GT":">","&GT;":">","&Gamma;":"Γ","&Gammad;":"Ϝ","&Gbreve;":"Ğ","&Gcedil;":"Ģ","&Gcirc;":"Ĝ","&Gcy;":"Г","&Gdot;":"Ġ","&Gfr;":"𝔊","&Gg;":"⋙","&Gopf;":"𝔾","&GreaterEqual;":"≥","&GreaterEqualLess;":"⋛","&GreaterFullEqual;":"≧","&GreaterGreater;":"⪢","&GreaterLess;":"≷","&GreaterSlantEqual;":"⩾","&GreaterTilde;":"≳","&Gscr;":"𝒢","&Gt;":"≫","&HARDcy;":"Ъ","&Hacek;":"ˇ","&Hat;":"^","&Hcirc;":"Ĥ","&Hfr;":"ℌ","&HilbertSpace;":"ℋ","&Hopf;":"ℍ","&HorizontalLine;":"─","&Hscr;":"ℋ","&Hstrok;":"Ħ","&HumpDownHump;":"≎","&HumpEqual;":"≏","&IEcy;":"Е","&IJlig;":"Ĳ","&IOcy;":"Ё","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Icy;":"И","&Idot;":"İ","&Ifr;":"ℑ","&Igrave":"Ì","&Igrave;":"Ì","&Im;":"ℑ","&Imacr;":"Ī","&ImaginaryI;":"ⅈ","&Implies;":"⇒","&Int;":"∬","&Integral;":"∫","&Intersection;":"⋂","&InvisibleComma;":"⁣","&InvisibleTimes;":"⁢","&Iogon;":"Į","&Iopf;":"𝕀","&Iota;":"Ι","&Iscr;":"ℐ","&Itilde;":"Ĩ","&Iukcy;":"І","&Iuml":"Ï","&Iuml;":"Ï","&Jcirc;":"Ĵ","&Jcy;":"Й","&Jfr;":"𝔍","&Jopf;":"𝕁","&Jscr;":"𝒥","&Jsercy;":"Ј","&Jukcy;":"Є","&KHcy;":"Х","&KJcy;":"Ќ","&Kappa;":"Κ","&Kcedil;":"Ķ","&Kcy;":"К","&Kfr;":"𝔎","&Kopf;":"𝕂","&Kscr;":"𝒦","&LJcy;":"Љ","&LT":"<","&LT;":"<","&Lacute;":"Ĺ","&Lambda;":"Λ","&Lang;":"⟪","&Laplacetrf;":"ℒ","&Larr;":"↞","&Lcaron;":"Ľ","&Lcedil;":"Ļ","&Lcy;":"Л","&LeftAngleBracket;":"⟨","&LeftArrow;":"←","&LeftArrowBar;":"⇤","&LeftArrowRightArrow;":"⇆","&LeftCeiling;":"⌈","&LeftDoubleBracket;":"⟦","&LeftDownTeeVector;":"⥡","&LeftDownVector;":"⇃","&LeftDownVectorBar;":"⥙","&LeftFloor;":"⌊","&LeftRightArrow;":"↔","&LeftRightVector;":"⥎","&LeftTee;":"⊣","&LeftTeeArrow;":"↤","&LeftTeeVector;":"⥚","&LeftTriangle;":"⊲","&LeftTriangleBar;":"⧏","&LeftTriangleEqual;":"⊴","&LeftUpDownVector;":"⥑","&LeftUpTeeVector;":"⥠","&LeftUpVector;":"↿","&LeftUpVectorBar;":"⥘","&LeftVector;":"↼","&LeftVectorBar;":"⥒","&Leftarrow;":"⇐","&Leftrightarrow;":"⇔","&LessEqualGreater;":"⋚","&LessFullEqual;":"≦","&LessGreater;":"≶","&LessLess;":"⪡","&LessSlantEqual;":"⩽","&LessTilde;":"≲","&Lfr;":"𝔏","&Ll;":"⋘","&Lleftarrow;":"⇚","&Lmidot;":"Ŀ","&LongLeftArrow;":"⟵","&LongLeftRightArrow;":"⟷","&LongRightArrow;":"⟶","&Longleftarrow;":"⟸","&Longleftrightarrow;":"⟺","&Longrightarrow;":"⟹","&Lopf;":"𝕃","&LowerLeftArrow;":"↙","&LowerRightArrow;":"↘","&Lscr;":"ℒ","&Lsh;":"↰","&Lstrok;":"Ł","&Lt;":"≪","&Map;":"⤅","&Mcy;":"М","&MediumSpace;":" ","&Mellintrf;":"ℳ","&Mfr;":"𝔐","&MinusPlus;":"∓","&Mopf;":"𝕄","&Mscr;":"ℳ","&Mu;":"Μ","&NJcy;":"Њ","&Nacute;":"Ń","&Ncaron;":"Ň","&Ncedil;":"Ņ","&Ncy;":"Н","&NegativeMediumSpace;":"​","&NegativeThickSpace;":"​","&NegativeThinSpace;":"​","&NegativeVeryThinSpace;":"​","&NestedGreaterGreater;":"≫","&NestedLessLess;":"≪","&NewLine;":"\n","&Nfr;":"𝔑","&NoBreak;":"⁠","&NonBreakingSpace;":" ","&Nopf;":"ℕ","&Not;":"⫬","&NotCongruent;":"≢","&NotCupCap;":"≭","&NotDoubleVerticalBar;":"∦","&NotElement;":"∉","&NotEqual;":"≠","&NotEqualTilde;":"≂̸","&NotExists;":"∄","&NotGreater;":"≯","&NotGreaterEqual;":"≱","&NotGreaterFullEqual;":"≧̸","&NotGreaterGreater;":"≫̸","&NotGreaterLess;":"≹","&NotGreaterSlantEqual;":"⩾̸","&NotGreaterTilde;":"≵","&NotHumpDownHump;":"≎̸","&NotHumpEqual;":"≏̸","&NotLeftTriangle;":"⋪","&NotLeftTriangleBar;":"⧏̸","&NotLeftTriangleEqual;":"⋬","&NotLess;":"≮","&NotLessEqual;":"≰","&NotLessGreater;":"≸","&NotLessLess;":"≪̸","&NotLessSlantEqual;":"⩽̸","&NotLessTilde;":"≴","&NotNestedGreaterGreater;":"⪢̸","&NotNestedLessLess;":"⪡̸","&NotPrecedes;":"⊀","&NotPrecedesEqual;":"⪯̸","&NotPrecedesSlantEqual;":"⋠","&NotReverseElement;":"∌","&NotRightTriangle;":"⋫","&NotRightTriangleBar;":"⧐̸","&NotRightTriangleEqual;":"⋭","&NotSquareSubset;":"⊏̸","&NotSquareSubsetEqual;":"⋢","&NotSquareSuperset;":"⊐̸","&NotSquareSupersetEqual;":"⋣","&NotSubset;":"⊂⃒","&NotSubsetEqual;":"⊈","&NotSucceeds;":"⊁","&NotSucceedsEqual;":"⪰̸","&NotSucceedsSlantEqual;":"⋡","&NotSucceedsTilde;":"≿̸","&NotSuperset;":"⊃⃒","&NotSupersetEqual;":"⊉","&NotTilde;":"≁","&NotTildeEqual;":"≄","&NotTildeFullEqual;":"≇","&NotTildeTilde;":"≉","&NotVerticalBar;":"∤","&Nscr;":"𝒩","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Nu;":"Ν","&OElig;":"Œ","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Ocy;":"О","&Odblac;":"Ő","&Ofr;":"𝔒","&Ograve":"Ò","&Ograve;":"Ò","&Omacr;":"Ō","&Omega;":"Ω","&Omicron;":"Ο","&Oopf;":"𝕆","&OpenCurlyDoubleQuote;":"“","&OpenCurlyQuote;":"‘","&Or;":"⩔","&Oscr;":"𝒪","&Oslash":"Ø","&Oslash;":"Ø","&Otilde":"Õ","&Otilde;":"Õ","&Otimes;":"⨷","&Ouml":"Ö","&Ouml;":"Ö","&OverBar;":"‾","&OverBrace;":"⏞","&OverBracket;":"⎴","&OverParenthesis;":"⏜","&PartialD;":"∂","&Pcy;":"П","&Pfr;":"𝔓","&Phi;":"Φ","&Pi;":"Π","&PlusMinus;":"±","&Poincareplane;":"ℌ","&Popf;":"ℙ","&Pr;":"⪻","&Precedes;":"≺","&PrecedesEqual;":"⪯","&PrecedesSlantEqual;":"≼","&PrecedesTilde;":"≾","&Prime;":"″","&Product;":"∏","&Proportion;":"∷","&Proportional;":"∝","&Pscr;":"𝒫","&Psi;":"Ψ","&QUOT":'"',"&QUOT;":'"',"&Qfr;":"𝔔","&Qopf;":"ℚ","&Qscr;":"𝒬","&RBarr;":"⤐","&REG":"®","&REG;":"®","&Racute;":"Ŕ","&Rang;":"⟫","&Rarr;":"↠","&Rarrtl;":"⤖","&Rcaron;":"Ř","&Rcedil;":"Ŗ","&Rcy;":"Р","&Re;":"ℜ","&ReverseElement;":"∋","&ReverseEquilibrium;":"⇋","&ReverseUpEquilibrium;":"⥯","&Rfr;":"ℜ","&Rho;":"Ρ","&RightAngleBracket;":"⟩","&RightArrow;":"→","&RightArrowBar;":"⇥","&RightArrowLeftArrow;":"⇄","&RightCeiling;":"⌉","&RightDoubleBracket;":"⟧","&RightDownTeeVector;":"⥝","&RightDownVector;":"⇂","&RightDownVectorBar;":"⥕","&RightFloor;":"⌋","&RightTee;":"⊢","&RightTeeArrow;":"↦","&RightTeeVector;":"⥛","&RightTriangle;":"⊳","&RightTriangleBar;":"⧐","&RightTriangleEqual;":"⊵","&RightUpDownVector;":"⥏","&RightUpTeeVector;":"⥜","&RightUpVector;":"↾","&RightUpVectorBar;":"⥔","&RightVector;":"⇀","&RightVectorBar;":"⥓","&Rightarrow;":"⇒","&Ropf;":"ℝ","&RoundImplies;":"⥰","&Rrightarrow;":"⇛","&Rscr;":"ℛ","&Rsh;":"↱","&RuleDelayed;":"⧴","&SHCHcy;":"Щ","&SHcy;":"Ш","&SOFTcy;":"Ь","&Sacute;":"Ś","&Sc;":"⪼","&Scaron;":"Š","&Scedil;":"Ş","&Scirc;":"Ŝ","&Scy;":"С","&Sfr;":"𝔖","&ShortDownArrow;":"↓","&ShortLeftArrow;":"←","&ShortRightArrow;":"→","&ShortUpArrow;":"↑","&Sigma;":"Σ","&SmallCircle;":"∘","&Sopf;":"𝕊","&Sqrt;":"√","&Square;":"□","&SquareIntersection;":"⊓","&SquareSubset;":"⊏","&SquareSubsetEqual;":"⊑","&SquareSuperset;":"⊐","&SquareSupersetEqual;":"⊒","&SquareUnion;":"⊔","&Sscr;":"𝒮","&Star;":"⋆","&Sub;":"⋐","&Subset;":"⋐","&SubsetEqual;":"⊆","&Succeeds;":"≻","&SucceedsEqual;":"⪰","&SucceedsSlantEqual;":"≽","&SucceedsTilde;":"≿","&SuchThat;":"∋","&Sum;":"∑","&Sup;":"⋑","&Superset;":"⊃","&SupersetEqual;":"⊇","&Supset;":"⋑","&THORN":"Þ","&THORN;":"Þ","&TRADE;":"™","&TSHcy;":"Ћ","&TScy;":"Ц","&Tab;":"\t","&Tau;":"Τ","&Tcaron;":"Ť","&Tcedil;":"Ţ","&Tcy;":"Т","&Tfr;":"𝔗","&Therefore;":"∴","&Theta;":"Θ","&ThickSpace;":"  ","&ThinSpace;":" ","&Tilde;":"∼","&TildeEqual;":"≃","&TildeFullEqual;":"≅","&TildeTilde;":"≈","&Topf;":"𝕋","&TripleDot;":"⃛","&Tscr;":"𝒯","&Tstrok;":"Ŧ","&Uacute":"Ú","&Uacute;":"Ú","&Uarr;":"↟","&Uarrocir;":"⥉","&Ubrcy;":"Ў","&Ubreve;":"Ŭ","&Ucirc":"Û","&Ucirc;":"Û","&Ucy;":"У","&Udblac;":"Ű","&Ufr;":"𝔘","&Ugrave":"Ù","&Ugrave;":"Ù","&Umacr;":"Ū","&UnderBar;":"_","&UnderBrace;":"⏟","&UnderBracket;":"⎵","&UnderParenthesis;":"⏝","&Union;":"⋃","&UnionPlus;":"⊎","&Uogon;":"Ų","&Uopf;":"𝕌","&UpArrow;":"↑","&UpArrowBar;":"⤒","&UpArrowDownArrow;":"⇅","&UpDownArrow;":"↕","&UpEquilibrium;":"⥮","&UpTee;":"⊥","&UpTeeArrow;":"↥","&Uparrow;":"⇑","&Updownarrow;":"⇕","&UpperLeftArrow;":"↖","&UpperRightArrow;":"↗","&Upsi;":"ϒ","&Upsilon;":"Υ","&Uring;":"Ů","&Uscr;":"𝒰","&Utilde;":"Ũ","&Uuml":"Ü","&Uuml;":"Ü","&VDash;":"⊫","&Vbar;":"⫫","&Vcy;":"В","&Vdash;":"⊩","&Vdashl;":"⫦","&Vee;":"⋁","&Verbar;":"‖","&Vert;":"‖","&VerticalBar;":"∣","&VerticalLine;":"|","&VerticalSeparator;":"❘","&VerticalTilde;":"≀","&VeryThinSpace;":" ","&Vfr;":"𝔙","&Vopf;":"𝕍","&Vscr;":"𝒱","&Vvdash;":"⊪","&Wcirc;":"Ŵ","&Wedge;":"⋀","&Wfr;":"𝔚","&Wopf;":"𝕎","&Wscr;":"𝒲","&Xfr;":"𝔛","&Xi;":"Ξ","&Xopf;":"𝕏","&Xscr;":"𝒳","&YAcy;":"Я","&YIcy;":"Ї","&YUcy;":"Ю","&Yacute":"Ý","&Yacute;":"Ý","&Ycirc;":"Ŷ","&Ycy;":"Ы","&Yfr;":"𝔜","&Yopf;":"𝕐","&Yscr;":"𝒴","&Yuml;":"Ÿ","&ZHcy;":"Ж","&Zacute;":"Ź","&Zcaron;":"Ž","&Zcy;":"З","&Zdot;":"Ż","&ZeroWidthSpace;":"​","&Zeta;":"Ζ","&Zfr;":"ℨ","&Zopf;":"ℤ","&Zscr;":"𝒵","&aacute":"á","&aacute;":"á","&abreve;":"ă","&ac;":"∾","&acE;":"∾̳","&acd;":"∿","&acirc":"â","&acirc;":"â","&acute":"´","&acute;":"´","&acy;":"а","&aelig":"æ","&aelig;":"æ","&af;":"⁡","&afr;":"𝔞","&agrave":"à","&agrave;":"à","&alefsym;":"ℵ","&aleph;":"ℵ","&alpha;":"α","&amacr;":"ā","&amalg;":"⨿","&amp":"&","&amp;":"&","&and;":"∧","&andand;":"⩕","&andd;":"⩜","&andslope;":"⩘","&andv;":"⩚","&ang;":"∠","&ange;":"⦤","&angle;":"∠","&angmsd;":"∡","&angmsdaa;":"⦨","&angmsdab;":"⦩","&angmsdac;":"⦪","&angmsdad;":"⦫","&angmsdae;":"⦬","&angmsdaf;":"⦭","&angmsdag;":"⦮","&angmsdah;":"⦯","&angrt;":"∟","&angrtvb;":"⊾","&angrtvbd;":"⦝","&angsph;":"∢","&angst;":"Å","&angzarr;":"⍼","&aogon;":"ą","&aopf;":"𝕒","&ap;":"≈","&apE;":"⩰","&apacir;":"⩯","&ape;":"≊","&apid;":"≋","&apos;":"'","&approx;":"≈","&approxeq;":"≊","&aring":"å","&aring;":"å","&ascr;":"𝒶","&ast;":"*","&asymp;":"≈","&asympeq;":"≍","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&awconint;":"∳","&awint;":"⨑","&bNot;":"⫭","&backcong;":"≌","&backepsilon;":"϶","&backprime;":"‵","&backsim;":"∽","&backsimeq;":"⋍","&barvee;":"⊽","&barwed;":"⌅","&barwedge;":"⌅","&bbrk;":"⎵","&bbrktbrk;":"⎶","&bcong;":"≌","&bcy;":"б","&bdquo;":"„","&becaus;":"∵","&because;":"∵","&bemptyv;":"⦰","&bepsi;":"϶","&bernou;":"ℬ","&beta;":"β","&beth;":"ℶ","&between;":"≬","&bfr;":"𝔟","&bigcap;":"⋂","&bigcirc;":"◯","&bigcup;":"⋃","&bigodot;":"⨀","&bigoplus;":"⨁","&bigotimes;":"⨂","&bigsqcup;":"⨆","&bigstar;":"★","&bigtriangledown;":"▽","&bigtriangleup;":"△","&biguplus;":"⨄","&bigvee;":"⋁","&bigwedge;":"⋀","&bkarow;":"⤍","&blacklozenge;":"⧫","&blacksquare;":"▪","&blacktriangle;":"▴","&blacktriangledown;":"▾","&blacktriangleleft;":"◂","&blacktriangleright;":"▸","&blank;":"␣","&blk12;":"▒","&blk14;":"░","&blk34;":"▓","&block;":"█","&bne;":"=⃥","&bnequiv;":"≡⃥","&bnot;":"⌐","&bopf;":"𝕓","&bot;":"⊥","&bottom;":"⊥","&bowtie;":"⋈","&boxDL;":"╗","&boxDR;":"╔","&boxDl;":"╖","&boxDr;":"╓","&boxH;":"═","&boxHD;":"╦","&boxHU;":"╩","&boxHd;":"╤","&boxHu;":"╧","&boxUL;":"╝","&boxUR;":"╚","&boxUl;":"╜","&boxUr;":"╙","&boxV;":"║","&boxVH;":"╬","&boxVL;":"╣","&boxVR;":"╠","&boxVh;":"╫","&boxVl;":"╢","&boxVr;":"╟","&boxbox;":"⧉","&boxdL;":"╕","&boxdR;":"╒","&boxdl;":"┐","&boxdr;":"┌","&boxh;":"─","&boxhD;":"╥","&boxhU;":"╨","&boxhd;":"┬","&boxhu;":"┴","&boxminus;":"⊟","&boxplus;":"⊞","&boxtimes;":"⊠","&boxuL;":"╛","&boxuR;":"╘","&boxul;":"┘","&boxur;":"└","&boxv;":"│","&boxvH;":"╪","&boxvL;":"╡","&boxvR;":"╞","&boxvh;":"┼","&boxvl;":"┤","&boxvr;":"├","&bprime;":"‵","&breve;":"˘","&brvbar":"¦","&brvbar;":"¦","&bscr;":"𝒷","&bsemi;":"⁏","&bsim;":"∽","&bsime;":"⋍","&bsol;":"\\","&bsolb;":"⧅","&bsolhsub;":"⟈","&bull;":"•","&bullet;":"•","&bump;":"≎","&bumpE;":"⪮","&bumpe;":"≏","&bumpeq;":"≏","&cacute;":"ć","&cap;":"∩","&capand;":"⩄","&capbrcup;":"⩉","&capcap;":"⩋","&capcup;":"⩇","&capdot;":"⩀","&caps;":"∩︀","&caret;":"⁁","&caron;":"ˇ","&ccaps;":"⩍","&ccaron;":"č","&ccedil":"ç","&ccedil;":"ç","&ccirc;":"ĉ","&ccups;":"⩌","&ccupssm;":"⩐","&cdot;":"ċ","&cedil":"¸","&cedil;":"¸","&cemptyv;":"⦲","&cent":"¢","&cent;":"¢","&centerdot;":"·","&cfr;":"𝔠","&chcy;":"ч","&check;":"✓","&checkmark;":"✓","&chi;":"χ","&cir;":"○","&cirE;":"⧃","&circ;":"ˆ","&circeq;":"≗","&circlearrowleft;":"↺","&circlearrowright;":"↻","&circledR;":"®","&circledS;":"Ⓢ","&circledast;":"⊛","&circledcirc;":"⊚","&circleddash;":"⊝","&cire;":"≗","&cirfnint;":"⨐","&cirmid;":"⫯","&cirscir;":"⧂","&clubs;":"♣","&clubsuit;":"♣","&colon;":":","&colone;":"≔","&coloneq;":"≔","&comma;":",","&commat;":"@","&comp;":"∁","&compfn;":"∘","&complement;":"∁","&complexes;":"ℂ","&cong;":"≅","&congdot;":"⩭","&conint;":"∮","&copf;":"𝕔","&coprod;":"∐","&copy":"©","&copy;":"©","&copysr;":"℗","&crarr;":"↵","&cross;":"✗","&cscr;":"𝒸","&csub;":"⫏","&csube;":"⫑","&csup;":"⫐","&csupe;":"⫒","&ctdot;":"⋯","&cudarrl;":"⤸","&cudarrr;":"⤵","&cuepr;":"⋞","&cuesc;":"⋟","&cularr;":"↶","&cularrp;":"⤽","&cup;":"∪","&cupbrcap;":"⩈","&cupcap;":"⩆","&cupcup;":"⩊","&cupdot;":"⊍","&cupor;":"⩅","&cups;":"∪︀","&curarr;":"↷","&curarrm;":"⤼","&curlyeqprec;":"⋞","&curlyeqsucc;":"⋟","&curlyvee;":"⋎","&curlywedge;":"⋏","&curren":"¤","&curren;":"¤","&curvearrowleft;":"↶","&curvearrowright;":"↷","&cuvee;":"⋎","&cuwed;":"⋏","&cwconint;":"∲","&cwint;":"∱","&cylcty;":"⌭","&dArr;":"⇓","&dHar;":"⥥","&dagger;":"†","&daleth;":"ℸ","&darr;":"↓","&dash;":"‐","&dashv;":"⊣","&dbkarow;":"⤏","&dblac;":"˝","&dcaron;":"ď","&dcy;":"д","&dd;":"ⅆ","&ddagger;":"‡","&ddarr;":"⇊","&ddotseq;":"⩷","&deg":"°","&deg;":"°","&delta;":"δ","&demptyv;":"⦱","&dfisht;":"⥿","&dfr;":"𝔡","&dharl;":"⇃","&dharr;":"⇂","&diam;":"⋄","&diamond;":"⋄","&diamondsuit;":"♦","&diams;":"♦","&die;":"¨","&digamma;":"ϝ","&disin;":"⋲","&div;":"÷","&divide":"÷","&divide;":"÷","&divideontimes;":"⋇","&divonx;":"⋇","&djcy;":"ђ","&dlcorn;":"⌞","&dlcrop;":"⌍","&dollar;":"$","&dopf;":"𝕕","&dot;":"˙","&doteq;":"≐","&doteqdot;":"≑","&dotminus;":"∸","&dotplus;":"∔","&dotsquare;":"⊡","&doublebarwedge;":"⌆","&downarrow;":"↓","&downdownarrows;":"⇊","&downharpoonleft;":"⇃","&downharpoonright;":"⇂","&drbkarow;":"⤐","&drcorn;":"⌟","&drcrop;":"⌌","&dscr;":"𝒹","&dscy;":"ѕ","&dsol;":"⧶","&dstrok;":"đ","&dtdot;":"⋱","&dtri;":"▿","&dtrif;":"▾","&duarr;":"⇵","&duhar;":"⥯","&dwangle;":"⦦","&dzcy;":"џ","&dzigrarr;":"⟿","&eDDot;":"⩷","&eDot;":"≑","&eacute":"é","&eacute;":"é","&easter;":"⩮","&ecaron;":"ě","&ecir;":"≖","&ecirc":"ê","&ecirc;":"ê","&ecolon;":"≕","&ecy;":"э","&edot;":"ė","&ee;":"ⅇ","&efDot;":"≒","&efr;":"𝔢","&eg;":"⪚","&egrave":"è","&egrave;":"è","&egs;":"⪖","&egsdot;":"⪘","&el;":"⪙","&elinters;":"⏧","&ell;":"ℓ","&els;":"⪕","&elsdot;":"⪗","&emacr;":"ē","&empty;":"∅","&emptyset;":"∅","&emptyv;":"∅","&emsp13;":" ","&emsp14;":" ","&emsp;":" ","&eng;":"ŋ","&ensp;":" ","&eogon;":"ę","&eopf;":"𝕖","&epar;":"⋕","&eparsl;":"⧣","&eplus;":"⩱","&epsi;":"ε","&epsilon;":"ε","&epsiv;":"ϵ","&eqcirc;":"≖","&eqcolon;":"≕","&eqsim;":"≂","&eqslantgtr;":"⪖","&eqslantless;":"⪕","&equals;":"=","&equest;":"≟","&equiv;":"≡","&equivDD;":"⩸","&eqvparsl;":"⧥","&erDot;":"≓","&erarr;":"⥱","&escr;":"ℯ","&esdot;":"≐","&esim;":"≂","&eta;":"η","&eth":"ð","&eth;":"ð","&euml":"ë","&euml;":"ë","&euro;":"€","&excl;":"!","&exist;":"∃","&expectation;":"ℰ","&exponentiale;":"ⅇ","&fallingdotseq;":"≒","&fcy;":"ф","&female;":"♀","&ffilig;":"ﬃ","&fflig;":"ﬀ","&ffllig;":"ﬄ","&ffr;":"𝔣","&filig;":"ﬁ","&fjlig;":"fj","&flat;":"♭","&fllig;":"ﬂ","&fltns;":"▱","&fnof;":"ƒ","&fopf;":"𝕗","&forall;":"∀","&fork;":"⋔","&forkv;":"⫙","&fpartint;":"⨍","&frac12":"½","&frac12;":"½","&frac13;":"⅓","&frac14":"¼","&frac14;":"¼","&frac15;":"⅕","&frac16;":"⅙","&frac18;":"⅛","&frac23;":"⅔","&frac25;":"⅖","&frac34":"¾","&frac34;":"¾","&frac35;":"⅗","&frac38;":"⅜","&frac45;":"⅘","&frac56;":"⅚","&frac58;":"⅝","&frac78;":"⅞","&frasl;":"⁄","&frown;":"⌢","&fscr;":"𝒻","&gE;":"≧","&gEl;":"⪌","&gacute;":"ǵ","&gamma;":"γ","&gammad;":"ϝ","&gap;":"⪆","&gbreve;":"ğ","&gcirc;":"ĝ","&gcy;":"г","&gdot;":"ġ","&ge;":"≥","&gel;":"⋛","&geq;":"≥","&geqq;":"≧","&geqslant;":"⩾","&ges;":"⩾","&gescc;":"⪩","&gesdot;":"⪀","&gesdoto;":"⪂","&gesdotol;":"⪄","&gesl;":"⋛︀","&gesles;":"⪔","&gfr;":"𝔤","&gg;":"≫","&ggg;":"⋙","&gimel;":"ℷ","&gjcy;":"ѓ","&gl;":"≷","&glE;":"⪒","&gla;":"⪥","&glj;":"⪤","&gnE;":"≩","&gnap;":"⪊","&gnapprox;":"⪊","&gne;":"⪈","&gneq;":"⪈","&gneqq;":"≩","&gnsim;":"⋧","&gopf;":"𝕘","&grave;":"`","&gscr;":"ℊ","&gsim;":"≳","&gsime;":"⪎","&gsiml;":"⪐","&gt":">","&gt;":">","&gtcc;":"⪧","&gtcir;":"⩺","&gtdot;":"⋗","&gtlPar;":"⦕","&gtquest;":"⩼","&gtrapprox;":"⪆","&gtrarr;":"⥸","&gtrdot;":"⋗","&gtreqless;":"⋛","&gtreqqless;":"⪌","&gtrless;":"≷","&gtrsim;":"≳","&gvertneqq;":"≩︀","&gvnE;":"≩︀","&hArr;":"⇔","&hairsp;":" ","&half;":"½","&hamilt;":"ℋ","&hardcy;":"ъ","&harr;":"↔","&harrcir;":"⥈","&harrw;":"↭","&hbar;":"ℏ","&hcirc;":"ĥ","&hearts;":"♥","&heartsuit;":"♥","&hellip;":"…","&hercon;":"⊹","&hfr;":"𝔥","&hksearow;":"⤥","&hkswarow;":"⤦","&hoarr;":"⇿","&homtht;":"∻","&hookleftarrow;":"↩","&hookrightarrow;":"↪","&hopf;":"𝕙","&horbar;":"―","&hscr;":"𝒽","&hslash;":"ℏ","&hstrok;":"ħ","&hybull;":"⁃","&hyphen;":"‐","&iacute":"í","&iacute;":"í","&ic;":"⁣","&icirc":"î","&icirc;":"î","&icy;":"и","&iecy;":"е","&iexcl":"¡","&iexcl;":"¡","&iff;":"⇔","&ifr;":"𝔦","&igrave":"ì","&igrave;":"ì","&ii;":"ⅈ","&iiiint;":"⨌","&iiint;":"∭","&iinfin;":"⧜","&iiota;":"℩","&ijlig;":"ĳ","&imacr;":"ī","&image;":"ℑ","&imagline;":"ℐ","&imagpart;":"ℑ","&imath;":"ı","&imof;":"⊷","&imped;":"Ƶ","&in;":"∈","&incare;":"℅","&infin;":"∞","&infintie;":"⧝","&inodot;":"ı","&int;":"∫","&intcal;":"⊺","&integers;":"ℤ","&intercal;":"⊺","&intlarhk;":"⨗","&intprod;":"⨼","&iocy;":"ё","&iogon;":"į","&iopf;":"𝕚","&iota;":"ι","&iprod;":"⨼","&iquest":"¿","&iquest;":"¿","&iscr;":"𝒾","&isin;":"∈","&isinE;":"⋹","&isindot;":"⋵","&isins;":"⋴","&isinsv;":"⋳","&isinv;":"∈","&it;":"⁢","&itilde;":"ĩ","&iukcy;":"і","&iuml":"ï","&iuml;":"ï","&jcirc;":"ĵ","&jcy;":"й","&jfr;":"𝔧","&jmath;":"ȷ","&jopf;":"𝕛","&jscr;":"𝒿","&jsercy;":"ј","&jukcy;":"є","&kappa;":"κ","&kappav;":"ϰ","&kcedil;":"ķ","&kcy;":"к","&kfr;":"𝔨","&kgreen;":"ĸ","&khcy;":"х","&kjcy;":"ќ","&kopf;":"𝕜","&kscr;":"𝓀","&lAarr;":"⇚","&lArr;":"⇐","&lAtail;":"⤛","&lBarr;":"⤎","&lE;":"≦","&lEg;":"⪋","&lHar;":"⥢","&lacute;":"ĺ","&laemptyv;":"⦴","&lagran;":"ℒ","&lambda;":"λ","&lang;":"⟨","&langd;":"⦑","&langle;":"⟨","&lap;":"⪅","&laquo":"«","&laquo;":"«","&larr;":"←","&larrb;":"⇤","&larrbfs;":"⤟","&larrfs;":"⤝","&larrhk;":"↩","&larrlp;":"↫","&larrpl;":"⤹","&larrsim;":"⥳","&larrtl;":"↢","&lat;":"⪫","&latail;":"⤙","&late;":"⪭","&lates;":"⪭︀","&lbarr;":"⤌","&lbbrk;":"❲","&lbrace;":"{","&lbrack;":"[","&lbrke;":"⦋","&lbrksld;":"⦏","&lbrkslu;":"⦍","&lcaron;":"ľ","&lcedil;":"ļ","&lceil;":"⌈","&lcub;":"{","&lcy;":"л","&ldca;":"⤶","&ldquo;":"“","&ldquor;":"„","&ldrdhar;":"⥧","&ldrushar;":"⥋","&ldsh;":"↲","&le;":"≤","&leftarrow;":"←","&leftarrowtail;":"↢","&leftharpoondown;":"↽","&leftharpoonup;":"↼","&leftleftarrows;":"⇇","&leftrightarrow;":"↔","&leftrightarrows;":"⇆","&leftrightharpoons;":"⇋","&leftrightsquigarrow;":"↭","&leftthreetimes;":"⋋","&leg;":"⋚","&leq;":"≤","&leqq;":"≦","&leqslant;":"⩽","&les;":"⩽","&lescc;":"⪨","&lesdot;":"⩿","&lesdoto;":"⪁","&lesdotor;":"⪃","&lesg;":"⋚︀","&lesges;":"⪓","&lessapprox;":"⪅","&lessdot;":"⋖","&lesseqgtr;":"⋚","&lesseqqgtr;":"⪋","&lessgtr;":"≶","&lesssim;":"≲","&lfisht;":"⥼","&lfloor;":"⌊","&lfr;":"𝔩","&lg;":"≶","&lgE;":"⪑","&lhard;":"↽","&lharu;":"↼","&lharul;":"⥪","&lhblk;":"▄","&ljcy;":"љ","&ll;":"≪","&llarr;":"⇇","&llcorner;":"⌞","&llhard;":"⥫","&lltri;":"◺","&lmidot;":"ŀ","&lmoust;":"⎰","&lmoustache;":"⎰","&lnE;":"≨","&lnap;":"⪉","&lnapprox;":"⪉","&lne;":"⪇","&lneq;":"⪇","&lneqq;":"≨","&lnsim;":"⋦","&loang;":"⟬","&loarr;":"⇽","&lobrk;":"⟦","&longleftarrow;":"⟵","&longleftrightarrow;":"⟷","&longmapsto;":"⟼","&longrightarrow;":"⟶","&looparrowleft;":"↫","&looparrowright;":"↬","&lopar;":"⦅","&lopf;":"𝕝","&loplus;":"⨭","&lotimes;":"⨴","&lowast;":"∗","&lowbar;":"_","&loz;":"◊","&lozenge;":"◊","&lozf;":"⧫","&lpar;":"(","&lparlt;":"⦓","&lrarr;":"⇆","&lrcorner;":"⌟","&lrhar;":"⇋","&lrhard;":"⥭","&lrm;":"‎","&lrtri;":"⊿","&lsaquo;":"‹","&lscr;":"𝓁","&lsh;":"↰","&lsim;":"≲","&lsime;":"⪍","&lsimg;":"⪏","&lsqb;":"[","&lsquo;":"‘","&lsquor;":"‚","&lstrok;":"ł","&lt":"<","&lt;":"<","&ltcc;":"⪦","&ltcir;":"⩹","&ltdot;":"⋖","&lthree;":"⋋","&ltimes;":"⋉","&ltlarr;":"⥶","&ltquest;":"⩻","&ltrPar;":"⦖","&ltri;":"◃","&ltrie;":"⊴","&ltrif;":"◂","&lurdshar;":"⥊","&luruhar;":"⥦","&lvertneqq;":"≨︀","&lvnE;":"≨︀","&mDDot;":"∺","&macr":"¯","&macr;":"¯","&male;":"♂","&malt;":"✠","&maltese;":"✠","&map;":"↦","&mapsto;":"↦","&mapstodown;":"↧","&mapstoleft;":"↤","&mapstoup;":"↥","&marker;":"▮","&mcomma;":"⨩","&mcy;":"м","&mdash;":"—","&measuredangle;":"∡","&mfr;":"𝔪","&mho;":"℧","&micro":"µ","&micro;":"µ","&mid;":"∣","&midast;":"*","&midcir;":"⫰","&middot":"·","&middot;":"·","&minus;":"−","&minusb;":"⊟","&minusd;":"∸","&minusdu;":"⨪","&mlcp;":"⫛","&mldr;":"…","&mnplus;":"∓","&models;":"⊧","&mopf;":"𝕞","&mp;":"∓","&mscr;":"𝓂","&mstpos;":"∾","&mu;":"μ","&multimap;":"⊸","&mumap;":"⊸","&nGg;":"⋙̸","&nGt;":"≫⃒","&nGtv;":"≫̸","&nLeftarrow;":"⇍","&nLeftrightarrow;":"⇎","&nLl;":"⋘̸","&nLt;":"≪⃒","&nLtv;":"≪̸","&nRightarrow;":"⇏","&nVDash;":"⊯","&nVdash;":"⊮","&nabla;":"∇","&nacute;":"ń","&nang;":"∠⃒","&nap;":"≉","&napE;":"⩰̸","&napid;":"≋̸","&napos;":"ŉ","&napprox;":"≉","&natur;":"♮","&natural;":"♮","&naturals;":"ℕ","&nbsp":" ","&nbsp;":" ","&nbump;":"≎̸","&nbumpe;":"≏̸","&ncap;":"⩃","&ncaron;":"ň","&ncedil;":"ņ","&ncong;":"≇","&ncongdot;":"⩭̸","&ncup;":"⩂","&ncy;":"н","&ndash;":"–","&ne;":"≠","&neArr;":"⇗","&nearhk;":"⤤","&nearr;":"↗","&nearrow;":"↗","&nedot;":"≐̸","&nequiv;":"≢","&nesear;":"⤨","&nesim;":"≂̸","&nexist;":"∄","&nexists;":"∄","&nfr;":"𝔫","&ngE;":"≧̸","&nge;":"≱","&ngeq;":"≱","&ngeqq;":"≧̸","&ngeqslant;":"⩾̸","&nges;":"⩾̸","&ngsim;":"≵","&ngt;":"≯","&ngtr;":"≯","&nhArr;":"⇎","&nharr;":"↮","&nhpar;":"⫲","&ni;":"∋","&nis;":"⋼","&nisd;":"⋺","&niv;":"∋","&njcy;":"њ","&nlArr;":"⇍","&nlE;":"≦̸","&nlarr;":"↚","&nldr;":"‥","&nle;":"≰","&nleftarrow;":"↚","&nleftrightarrow;":"↮","&nleq;":"≰","&nleqq;":"≦̸","&nleqslant;":"⩽̸","&nles;":"⩽̸","&nless;":"≮","&nlsim;":"≴","&nlt;":"≮","&nltri;":"⋪","&nltrie;":"⋬","&nmid;":"∤","&nopf;":"𝕟","&not":"¬","&not;":"¬","&notin;":"∉","&notinE;":"⋹̸","&notindot;":"⋵̸","&notinva;":"∉","&notinvb;":"⋷","&notinvc;":"⋶","&notni;":"∌","&notniva;":"∌","&notnivb;":"⋾","&notnivc;":"⋽","&npar;":"∦","&nparallel;":"∦","&nparsl;":"⫽⃥","&npart;":"∂̸","&npolint;":"⨔","&npr;":"⊀","&nprcue;":"⋠","&npre;":"⪯̸","&nprec;":"⊀","&npreceq;":"⪯̸","&nrArr;":"⇏","&nrarr;":"↛","&nrarrc;":"⤳̸","&nrarrw;":"↝̸","&nrightarrow;":"↛","&nrtri;":"⋫","&nrtrie;":"⋭","&nsc;":"⊁","&nsccue;":"⋡","&nsce;":"⪰̸","&nscr;":"𝓃","&nshortmid;":"∤","&nshortparallel;":"∦","&nsim;":"≁","&nsime;":"≄","&nsimeq;":"≄","&nsmid;":"∤","&nspar;":"∦","&nsqsube;":"⋢","&nsqsupe;":"⋣","&nsub;":"⊄","&nsubE;":"⫅̸","&nsube;":"⊈","&nsubset;":"⊂⃒","&nsubseteq;":"⊈","&nsubseteqq;":"⫅̸","&nsucc;":"⊁","&nsucceq;":"⪰̸","&nsup;":"⊅","&nsupE;":"⫆̸","&nsupe;":"⊉","&nsupset;":"⊃⃒","&nsupseteq;":"⊉","&nsupseteqq;":"⫆̸","&ntgl;":"≹","&ntilde":"ñ","&ntilde;":"ñ","&ntlg;":"≸","&ntriangleleft;":"⋪","&ntrianglelefteq;":"⋬","&ntriangleright;":"⋫","&ntrianglerighteq;":"⋭","&nu;":"ν","&num;":"#","&numero;":"№","&numsp;":" ","&nvDash;":"⊭","&nvHarr;":"⤄","&nvap;":"≍⃒","&nvdash;":"⊬","&nvge;":"≥⃒","&nvgt;":">⃒","&nvinfin;":"⧞","&nvlArr;":"⤂","&nvle;":"≤⃒","&nvlt;":"<⃒","&nvltrie;":"⊴⃒","&nvrArr;":"⤃","&nvrtrie;":"⊵⃒","&nvsim;":"∼⃒","&nwArr;":"⇖","&nwarhk;":"⤣","&nwarr;":"↖","&nwarrow;":"↖","&nwnear;":"⤧","&oS;":"Ⓢ","&oacute":"ó","&oacute;":"ó","&oast;":"⊛","&ocir;":"⊚","&ocirc":"ô","&ocirc;":"ô","&ocy;":"о","&odash;":"⊝","&odblac;":"ő","&odiv;":"⨸","&odot;":"⊙","&odsold;":"⦼","&oelig;":"œ","&ofcir;":"⦿","&ofr;":"𝔬","&ogon;":"˛","&ograve":"ò","&ograve;":"ò","&ogt;":"⧁","&ohbar;":"⦵","&ohm;":"Ω","&oint;":"∮","&olarr;":"↺","&olcir;":"⦾","&olcross;":"⦻","&oline;":"‾","&olt;":"⧀","&omacr;":"ō","&omega;":"ω","&omicron;":"ο","&omid;":"⦶","&ominus;":"⊖","&oopf;":"𝕠","&opar;":"⦷","&operp;":"⦹","&oplus;":"⊕","&or;":"∨","&orarr;":"↻","&ord;":"⩝","&order;":"ℴ","&orderof;":"ℴ","&ordf":"ª","&ordf;":"ª","&ordm":"º","&ordm;":"º","&origof;":"⊶","&oror;":"⩖","&orslope;":"⩗","&orv;":"⩛","&oscr;":"ℴ","&oslash":"ø","&oslash;":"ø","&osol;":"⊘","&otilde":"õ","&otilde;":"õ","&otimes;":"⊗","&otimesas;":"⨶","&ouml":"ö","&ouml;":"ö","&ovbar;":"⌽","&par;":"∥","&para":"¶","&para;":"¶","&parallel;":"∥","&parsim;":"⫳","&parsl;":"⫽","&part;":"∂","&pcy;":"п","&percnt;":"%","&period;":".","&permil;":"‰","&perp;":"⊥","&pertenk;":"‱","&pfr;":"𝔭","&phi;":"φ","&phiv;":"ϕ","&phmmat;":"ℳ","&phone;":"☎","&pi;":"π","&pitchfork;":"⋔","&piv;":"ϖ","&planck;":"ℏ","&planckh;":"ℎ","&plankv;":"ℏ","&plus;":"+","&plusacir;":"⨣","&plusb;":"⊞","&pluscir;":"⨢","&plusdo;":"∔","&plusdu;":"⨥","&pluse;":"⩲","&plusmn":"±","&plusmn;":"±","&plussim;":"⨦","&plustwo;":"⨧","&pm;":"±","&pointint;":"⨕","&popf;":"𝕡","&pound":"£","&pound;":"£","&pr;":"≺","&prE;":"⪳","&prap;":"⪷","&prcue;":"≼","&pre;":"⪯","&prec;":"≺","&precapprox;":"⪷","&preccurlyeq;":"≼","&preceq;":"⪯","&precnapprox;":"⪹","&precneqq;":"⪵","&precnsim;":"⋨","&precsim;":"≾","&prime;":"′","&primes;":"ℙ","&prnE;":"⪵","&prnap;":"⪹","&prnsim;":"⋨","&prod;":"∏","&profalar;":"⌮","&profline;":"⌒","&profsurf;":"⌓","&prop;":"∝","&propto;":"∝","&prsim;":"≾","&prurel;":"⊰","&pscr;":"𝓅","&psi;":"ψ","&puncsp;":" ","&qfr;":"𝔮","&qint;":"⨌","&qopf;":"𝕢","&qprime;":"⁗","&qscr;":"𝓆","&quaternions;":"ℍ","&quatint;":"⨖","&quest;":"?","&questeq;":"≟","&quot":'"',"&quot;":'"',"&rAarr;":"⇛","&rArr;":"⇒","&rAtail;":"⤜","&rBarr;":"⤏","&rHar;":"⥤","&race;":"∽̱","&racute;":"ŕ","&radic;":"√","&raemptyv;":"⦳","&rang;":"⟩","&rangd;":"⦒","&range;":"⦥","&rangle;":"⟩","&raquo":"»","&raquo;":"»","&rarr;":"→","&rarrap;":"⥵","&rarrb;":"⇥","&rarrbfs;":"⤠","&rarrc;":"⤳","&rarrfs;":"⤞","&rarrhk;":"↪","&rarrlp;":"↬","&rarrpl;":"⥅","&rarrsim;":"⥴","&rarrtl;":"↣","&rarrw;":"↝","&ratail;":"⤚","&ratio;":"∶","&rationals;":"ℚ","&rbarr;":"⤍","&rbbrk;":"❳","&rbrace;":"}","&rbrack;":"]","&rbrke;":"⦌","&rbrksld;":"⦎","&rbrkslu;":"⦐","&rcaron;":"ř","&rcedil;":"ŗ","&rceil;":"⌉","&rcub;":"}","&rcy;":"р","&rdca;":"⤷","&rdldhar;":"⥩","&rdquo;":"”","&rdquor;":"”","&rdsh;":"↳","&real;":"ℜ","&realine;":"ℛ","&realpart;":"ℜ","&reals;":"ℝ","&rect;":"▭","&reg":"®","&reg;":"®","&rfisht;":"⥽","&rfloor;":"⌋","&rfr;":"𝔯","&rhard;":"⇁","&rharu;":"⇀","&rharul;":"⥬","&rho;":"ρ","&rhov;":"ϱ","&rightarrow;":"→","&rightarrowtail;":"↣","&rightharpoondown;":"⇁","&rightharpoonup;":"⇀","&rightleftarrows;":"⇄","&rightleftharpoons;":"⇌","&rightrightarrows;":"⇉","&rightsquigarrow;":"↝","&rightthreetimes;":"⋌","&ring;":"˚","&risingdotseq;":"≓","&rlarr;":"⇄","&rlhar;":"⇌","&rlm;":"‏","&rmoust;":"⎱","&rmoustache;":"⎱","&rnmid;":"⫮","&roang;":"⟭","&roarr;":"⇾","&robrk;":"⟧","&ropar;":"⦆","&ropf;":"𝕣","&roplus;":"⨮","&rotimes;":"⨵","&rpar;":")","&rpargt;":"⦔","&rppolint;":"⨒","&rrarr;":"⇉","&rsaquo;":"›","&rscr;":"𝓇","&rsh;":"↱","&rsqb;":"]","&rsquo;":"’","&rsquor;":"’","&rthree;":"⋌","&rtimes;":"⋊","&rtri;":"▹","&rtrie;":"⊵","&rtrif;":"▸","&rtriltri;":"⧎","&ruluhar;":"⥨","&rx;":"℞","&sacute;":"ś","&sbquo;":"‚","&sc;":"≻","&scE;":"⪴","&scap;":"⪸","&scaron;":"š","&sccue;":"≽","&sce;":"⪰","&scedil;":"ş","&scirc;":"ŝ","&scnE;":"⪶","&scnap;":"⪺","&scnsim;":"⋩","&scpolint;":"⨓","&scsim;":"≿","&scy;":"с","&sdot;":"⋅","&sdotb;":"⊡","&sdote;":"⩦","&seArr;":"⇘","&searhk;":"⤥","&searr;":"↘","&searrow;":"↘","&sect":"§","&sect;":"§","&semi;":";","&seswar;":"⤩","&setminus;":"∖","&setmn;":"∖","&sext;":"✶","&sfr;":"𝔰","&sfrown;":"⌢","&sharp;":"♯","&shchcy;":"щ","&shcy;":"ш","&shortmid;":"∣","&shortparallel;":"∥","&shy":"­","&shy;":"­","&sigma;":"σ","&sigmaf;":"ς","&sigmav;":"ς","&sim;":"∼","&simdot;":"⩪","&sime;":"≃","&simeq;":"≃","&simg;":"⪞","&simgE;":"⪠","&siml;":"⪝","&simlE;":"⪟","&simne;":"≆","&simplus;":"⨤","&simrarr;":"⥲","&slarr;":"←","&smallsetminus;":"∖","&smashp;":"⨳","&smeparsl;":"⧤","&smid;":"∣","&smile;":"⌣","&smt;":"⪪","&smte;":"⪬","&smtes;":"⪬︀","&softcy;":"ь","&sol;":"/","&solb;":"⧄","&solbar;":"⌿","&sopf;":"𝕤","&spades;":"♠","&spadesuit;":"♠","&spar;":"∥","&sqcap;":"⊓","&sqcaps;":"⊓︀","&sqcup;":"⊔","&sqcups;":"⊔︀","&sqsub;":"⊏","&sqsube;":"⊑","&sqsubset;":"⊏","&sqsubseteq;":"⊑","&sqsup;":"⊐","&sqsupe;":"⊒","&sqsupset;":"⊐","&sqsupseteq;":"⊒","&squ;":"□","&square;":"□","&squarf;":"▪","&squf;":"▪","&srarr;":"→","&sscr;":"𝓈","&ssetmn;":"∖","&ssmile;":"⌣","&sstarf;":"⋆","&star;":"☆","&starf;":"★","&straightepsilon;":"ϵ","&straightphi;":"ϕ","&strns;":"¯","&sub;":"⊂","&subE;":"⫅","&subdot;":"⪽","&sube;":"⊆","&subedot;":"⫃","&submult;":"⫁","&subnE;":"⫋","&subne;":"⊊","&subplus;":"⪿","&subrarr;":"⥹","&subset;":"⊂","&subseteq;":"⊆","&subseteqq;":"⫅","&subsetneq;":"⊊","&subsetneqq;":"⫋","&subsim;":"⫇","&subsub;":"⫕","&subsup;":"⫓","&succ;":"≻","&succapprox;":"⪸","&succcurlyeq;":"≽","&succeq;":"⪰","&succnapprox;":"⪺","&succneqq;":"⪶","&succnsim;":"⋩","&succsim;":"≿","&sum;":"∑","&sung;":"♪","&sup1":"¹","&sup1;":"¹","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&sup;":"⊃","&supE;":"⫆","&supdot;":"⪾","&supdsub;":"⫘","&supe;":"⊇","&supedot;":"⫄","&suphsol;":"⟉","&suphsub;":"⫗","&suplarr;":"⥻","&supmult;":"⫂","&supnE;":"⫌","&supne;":"⊋","&supplus;":"⫀","&supset;":"⊃","&supseteq;":"⊇","&supseteqq;":"⫆","&supsetneq;":"⊋","&supsetneqq;":"⫌","&supsim;":"⫈","&supsub;":"⫔","&supsup;":"⫖","&swArr;":"⇙","&swarhk;":"⤦","&swarr;":"↙","&swarrow;":"↙","&swnwar;":"⤪","&szlig":"ß","&szlig;":"ß","&target;":"⌖","&tau;":"τ","&tbrk;":"⎴","&tcaron;":"ť","&tcedil;":"ţ","&tcy;":"т","&tdot;":"⃛","&telrec;":"⌕","&tfr;":"𝔱","&there4;":"∴","&therefore;":"∴","&theta;":"θ","&thetasym;":"ϑ","&thetav;":"ϑ","&thickapprox;":"≈","&thicksim;":"∼","&thinsp;":" ","&thkap;":"≈","&thksim;":"∼","&thorn":"þ","&thorn;":"þ","&tilde;":"˜","&times":"×","&times;":"×","&timesb;":"⊠","&timesbar;":"⨱","&timesd;":"⨰","&tint;":"∭","&toea;":"⤨","&top;":"⊤","&topbot;":"⌶","&topcir;":"⫱","&topf;":"𝕥","&topfork;":"⫚","&tosa;":"⤩","&tprime;":"‴","&trade;":"™","&triangle;":"▵","&triangledown;":"▿","&triangleleft;":"◃","&trianglelefteq;":"⊴","&triangleq;":"≜","&triangleright;":"▹","&trianglerighteq;":"⊵","&tridot;":"◬","&trie;":"≜","&triminus;":"⨺","&triplus;":"⨹","&trisb;":"⧍","&tritime;":"⨻","&trpezium;":"⏢","&tscr;":"𝓉","&tscy;":"ц","&tshcy;":"ћ","&tstrok;":"ŧ","&twixt;":"≬","&twoheadleftarrow;":"↞","&twoheadrightarrow;":"↠","&uArr;":"⇑","&uHar;":"⥣","&uacute":"ú","&uacute;":"ú","&uarr;":"↑","&ubrcy;":"ў","&ubreve;":"ŭ","&ucirc":"û","&ucirc;":"û","&ucy;":"у","&udarr;":"⇅","&udblac;":"ű","&udhar;":"⥮","&ufisht;":"⥾","&ufr;":"𝔲","&ugrave":"ù","&ugrave;":"ù","&uharl;":"↿","&uharr;":"↾","&uhblk;":"▀","&ulcorn;":"⌜","&ulcorner;":"⌜","&ulcrop;":"⌏","&ultri;":"◸","&umacr;":"ū","&uml":"¨","&uml;":"¨","&uogon;":"ų","&uopf;":"𝕦","&uparrow;":"↑","&updownarrow;":"↕","&upharpoonleft;":"↿","&upharpoonright;":"↾","&uplus;":"⊎","&upsi;":"υ","&upsih;":"ϒ","&upsilon;":"υ","&upuparrows;":"⇈","&urcorn;":"⌝","&urcorner;":"⌝","&urcrop;":"⌎","&uring;":"ů","&urtri;":"◹","&uscr;":"𝓊","&utdot;":"⋰","&utilde;":"ũ","&utri;":"▵","&utrif;":"▴","&uuarr;":"⇈","&uuml":"ü","&uuml;":"ü","&uwangle;":"⦧","&vArr;":"⇕","&vBar;":"⫨","&vBarv;":"⫩","&vDash;":"⊨","&vangrt;":"⦜","&varepsilon;":"ϵ","&varkappa;":"ϰ","&varnothing;":"∅","&varphi;":"ϕ","&varpi;":"ϖ","&varpropto;":"∝","&varr;":"↕","&varrho;":"ϱ","&varsigma;":"ς","&varsubsetneq;":"⊊︀","&varsubsetneqq;":"⫋︀","&varsupsetneq;":"⊋︀","&varsupsetneqq;":"⫌︀","&vartheta;":"ϑ","&vartriangleleft;":"⊲","&vartriangleright;":"⊳","&vcy;":"в","&vdash;":"⊢","&vee;":"∨","&veebar;":"⊻","&veeeq;":"≚","&vellip;":"⋮","&verbar;":"|","&vert;":"|","&vfr;":"𝔳","&vltri;":"⊲","&vnsub;":"⊂⃒","&vnsup;":"⊃⃒","&vopf;":"𝕧","&vprop;":"∝","&vrtri;":"⊳","&vscr;":"𝓋","&vsubnE;":"⫋︀","&vsubne;":"⊊︀","&vsupnE;":"⫌︀","&vsupne;":"⊋︀","&vzigzag;":"⦚","&wcirc;":"ŵ","&wedbar;":"⩟","&wedge;":"∧","&wedgeq;":"≙","&weierp;":"℘","&wfr;":"𝔴","&wopf;":"𝕨","&wp;":"℘","&wr;":"≀","&wreath;":"≀","&wscr;":"𝓌","&xcap;":"⋂","&xcirc;":"◯","&xcup;":"⋃","&xdtri;":"▽","&xfr;":"𝔵","&xhArr;":"⟺","&xharr;":"⟷","&xi;":"ξ","&xlArr;":"⟸","&xlarr;":"⟵","&xmap;":"⟼","&xnis;":"⋻","&xodot;":"⨀","&xopf;":"𝕩","&xoplus;":"⨁","&xotime;":"⨂","&xrArr;":"⟹","&xrarr;":"⟶","&xscr;":"𝓍","&xsqcup;":"⨆","&xuplus;":"⨄","&xutri;":"△","&xvee;":"⋁","&xwedge;":"⋀","&yacute":"ý","&yacute;":"ý","&yacy;":"я","&ycirc;":"ŷ","&ycy;":"ы","&yen":"¥","&yen;":"¥","&yfr;":"𝔶","&yicy;":"ї","&yopf;":"𝕪","&yscr;":"𝓎","&yucy;":"ю","&yuml":"ÿ","&yuml;":"ÿ","&zacute;":"ź","&zcaron;":"ž","&zcy;":"з","&zdot;":"ż","&zeetrf;":"ℨ","&zeta;":"ζ","&zfr;":"𝔷","&zhcy;":"ж","&zigrarr;":"⇝","&zopf;":"𝕫","&zscr;":"𝓏","&zwj;":"‍","&zwnj;":"‌"},characters:{"Æ":"&AElig;","&":"&amp;","Á":"&Aacute;","Ă":"&Abreve;","Â":"&Acirc;","А":"&Acy;","𝔄":"&Afr;","À":"&Agrave;","Α":"&Alpha;","Ā":"&Amacr;","⩓":"&And;","Ą":"&Aogon;","𝔸":"&Aopf;","⁡":"&af;","Å":"&angst;","𝒜":"&Ascr;","≔":"&coloneq;","Ã":"&Atilde;","Ä":"&Auml;","∖":"&ssetmn;","⫧":"&Barv;","⌆":"&doublebarwedge;","Б":"&Bcy;","∵":"&because;","ℬ":"&bernou;","Β":"&Beta;","𝔅":"&Bfr;","𝔹":"&Bopf;","˘":"&breve;","≎":"&bump;","Ч":"&CHcy;","©":"&copy;","Ć":"&Cacute;","⋒":"&Cap;","ⅅ":"&DD;","ℭ":"&Cfr;","Č":"&Ccaron;","Ç":"&Ccedil;","Ĉ":"&Ccirc;","∰":"&Cconint;","Ċ":"&Cdot;","¸":"&cedil;","·":"&middot;","Χ":"&Chi;","⊙":"&odot;","⊖":"&ominus;","⊕":"&oplus;","⊗":"&otimes;","∲":"&cwconint;","”":"&rdquor;","’":"&rsquor;","∷":"&Proportion;","⩴":"&Colone;","≡":"&equiv;","∯":"&DoubleContourIntegral;","∮":"&oint;","ℂ":"&complexes;","∐":"&coprod;","∳":"&awconint;","⨯":"&Cross;","𝒞":"&Cscr;","⋓":"&Cup;","≍":"&asympeq;","⤑":"&DDotrahd;","Ђ":"&DJcy;","Ѕ":"&DScy;","Џ":"&DZcy;","‡":"&ddagger;","↡":"&Darr;","⫤":"&DoubleLeftTee;","Ď":"&Dcaron;","Д":"&Dcy;","∇":"&nabla;","Δ":"&Delta;","𝔇":"&Dfr;","´":"&acute;","˙":"&dot;","˝":"&dblac;","`":"&grave;","˜":"&tilde;","⋄":"&diamond;","ⅆ":"&dd;","𝔻":"&Dopf;","¨":"&uml;","⃜":"&DotDot;","≐":"&esdot;","⇓":"&dArr;","⇐":"&lArr;","⇔":"&iff;","⟸":"&xlArr;","⟺":"&xhArr;","⟹":"&xrArr;","⇒":"&rArr;","⊨":"&vDash;","⇑":"&uArr;","⇕":"&vArr;","∥":"&spar;","↓":"&downarrow;","⤓":"&DownArrowBar;","⇵":"&duarr;","̑":"&DownBreve;","⥐":"&DownLeftRightVector;","⥞":"&DownLeftTeeVector;","↽":"&lhard;","⥖":"&DownLeftVectorBar;","⥟":"&DownRightTeeVector;","⇁":"&rightharpoondown;","⥗":"&DownRightVectorBar;","⊤":"&top;","↧":"&mapstodown;","𝒟":"&Dscr;","Đ":"&Dstrok;","Ŋ":"&ENG;","Ð":"&ETH;","É":"&Eacute;","Ě":"&Ecaron;","Ê":"&Ecirc;","Э":"&Ecy;","Ė":"&Edot;","𝔈":"&Efr;","È":"&Egrave;","∈":"&isinv;","Ē":"&Emacr;","◻":"&EmptySmallSquare;","▫":"&EmptyVerySmallSquare;","Ę":"&Eogon;","𝔼":"&Eopf;","Ε":"&Epsilon;","⩵":"&Equal;","≂":"&esim;","⇌":"&rlhar;","ℰ":"&expectation;","⩳":"&Esim;","Η":"&Eta;","Ë":"&Euml;","∃":"&exist;","ⅇ":"&exponentiale;","Ф":"&Fcy;","𝔉":"&Ffr;","◼":"&FilledSmallSquare;","▪":"&squf;","𝔽":"&Fopf;","∀":"&forall;","ℱ":"&Fscr;","Ѓ":"&GJcy;",">":"&gt;","Γ":"&Gamma;","Ϝ":"&Gammad;","Ğ":"&Gbreve;","Ģ":"&Gcedil;","Ĝ":"&Gcirc;","Г":"&Gcy;","Ġ":"&Gdot;","𝔊":"&Gfr;","⋙":"&ggg;","𝔾":"&Gopf;","≥":"&geq;","⋛":"&gtreqless;","≧":"&geqq;","⪢":"&GreaterGreater;","≷":"&gtrless;","⩾":"&ges;","≳":"&gtrsim;","𝒢":"&Gscr;","≫":"&gg;","Ъ":"&HARDcy;","ˇ":"&caron;","^":"&Hat;","Ĥ":"&Hcirc;","ℌ":"&Poincareplane;","ℋ":"&hamilt;","ℍ":"&quaternions;","─":"&boxh;","Ħ":"&Hstrok;","≏":"&bumpeq;","Е":"&IEcy;","Ĳ":"&IJlig;","Ё":"&IOcy;","Í":"&Iacute;","Î":"&Icirc;","И":"&Icy;","İ":"&Idot;","ℑ":"&imagpart;","Ì":"&Igrave;","Ī":"&Imacr;","ⅈ":"&ii;","∬":"&Int;","∫":"&int;","⋂":"&xcap;","⁣":"&ic;","⁢":"&it;","Į":"&Iogon;","𝕀":"&Iopf;","Ι":"&Iota;","ℐ":"&imagline;","Ĩ":"&Itilde;","І":"&Iukcy;","Ï":"&Iuml;","Ĵ":"&Jcirc;","Й":"&Jcy;","𝔍":"&Jfr;","𝕁":"&Jopf;","𝒥":"&Jscr;","Ј":"&Jsercy;","Є":"&Jukcy;","Х":"&KHcy;","Ќ":"&KJcy;","Κ":"&Kappa;","Ķ":"&Kcedil;","К":"&Kcy;","𝔎":"&Kfr;","𝕂":"&Kopf;","𝒦":"&Kscr;","Љ":"&LJcy;","<":"&lt;","Ĺ":"&Lacute;","Λ":"&Lambda;","⟪":"&Lang;","ℒ":"&lagran;","↞":"&twoheadleftarrow;","Ľ":"&Lcaron;","Ļ":"&Lcedil;","Л":"&Lcy;","⟨":"&langle;","←":"&slarr;","⇤":"&larrb;","⇆":"&lrarr;","⌈":"&lceil;","⟦":"&lobrk;","⥡":"&LeftDownTeeVector;","⇃":"&downharpoonleft;","⥙":"&LeftDownVectorBar;","⌊":"&lfloor;","↔":"&leftrightarrow;","⥎":"&LeftRightVector;","⊣":"&dashv;","↤":"&mapstoleft;","⥚":"&LeftTeeVector;","⊲":"&vltri;","⧏":"&LeftTriangleBar;","⊴":"&trianglelefteq;","⥑":"&LeftUpDownVector;","⥠":"&LeftUpTeeVector;","↿":"&upharpoonleft;","⥘":"&LeftUpVectorBar;","↼":"&lharu;","⥒":"&LeftVectorBar;","⋚":"&lesseqgtr;","≦":"&leqq;","≶":"&lg;","⪡":"&LessLess;","⩽":"&les;","≲":"&lsim;","𝔏":"&Lfr;","⋘":"&Ll;","⇚":"&lAarr;","Ŀ":"&Lmidot;","⟵":"&xlarr;","⟷":"&xharr;","⟶":"&xrarr;","𝕃":"&Lopf;","↙":"&swarrow;","↘":"&searrow;","↰":"&lsh;","Ł":"&Lstrok;","≪":"&ll;","⤅":"&Map;","М":"&Mcy;"," ":"&MediumSpace;","ℳ":"&phmmat;","𝔐":"&Mfr;","∓":"&mp;","𝕄":"&Mopf;","Μ":"&Mu;","Њ":"&NJcy;","Ń":"&Nacute;","Ň":"&Ncaron;","Ņ":"&Ncedil;","Н":"&Ncy;","​":"&ZeroWidthSpace;","\n":"&NewLine;","𝔑":"&Nfr;","⁠":"&NoBreak;"," ":"&nbsp;","ℕ":"&naturals;","⫬":"&Not;","≢":"&nequiv;","≭":"&NotCupCap;","∦":"&nspar;","∉":"&notinva;","≠":"&ne;","≂̸":"&nesim;","∄":"&nexists;","≯":"&ngtr;","≱":"&ngeq;","≧̸":"&ngeqq;","≫̸":"&nGtv;","≹":"&ntgl;","⩾̸":"&nges;","≵":"&ngsim;","≎̸":"&nbump;","≏̸":"&nbumpe;","⋪":"&ntriangleleft;","⧏̸":"&NotLeftTriangleBar;","⋬":"&ntrianglelefteq;","≮":"&nlt;","≰":"&nleq;","≸":"&ntlg;","≪̸":"&nLtv;","⩽̸":"&nles;","≴":"&nlsim;","⪢̸":"&NotNestedGreaterGreater;","⪡̸":"&NotNestedLessLess;","⊀":"&nprec;","⪯̸":"&npreceq;","⋠":"&nprcue;","∌":"&notniva;","⋫":"&ntriangleright;","⧐̸":"&NotRightTriangleBar;","⋭":"&ntrianglerighteq;","⊏̸":"&NotSquareSubset;","⋢":"&nsqsube;","⊐̸":"&NotSquareSuperset;","⋣":"&nsqsupe;","⊂⃒":"&vnsub;","⊈":"&nsubseteq;","⊁":"&nsucc;","⪰̸":"&nsucceq;","⋡":"&nsccue;","≿̸":"&NotSucceedsTilde;","⊃⃒":"&vnsup;","⊉":"&nsupseteq;","≁":"&nsim;","≄":"&nsimeq;","≇":"&ncong;","≉":"&napprox;","∤":"&nsmid;","𝒩":"&Nscr;","Ñ":"&Ntilde;","Ν":"&Nu;","Œ":"&OElig;","Ó":"&Oacute;","Ô":"&Ocirc;","О":"&Ocy;","Ő":"&Odblac;","𝔒":"&Ofr;","Ò":"&Ograve;","Ō":"&Omacr;","Ω":"&ohm;","Ο":"&Omicron;","𝕆":"&Oopf;","“":"&ldquo;","‘":"&lsquo;","⩔":"&Or;","𝒪":"&Oscr;","Ø":"&Oslash;","Õ":"&Otilde;","⨷":"&Otimes;","Ö":"&Ouml;","‾":"&oline;","⏞":"&OverBrace;","⎴":"&tbrk;","⏜":"&OverParenthesis;","∂":"&part;","П":"&Pcy;","𝔓":"&Pfr;","Φ":"&Phi;","Π":"&Pi;","±":"&pm;","ℙ":"&primes;","⪻":"&Pr;","≺":"&prec;","⪯":"&preceq;","≼":"&preccurlyeq;","≾":"&prsim;","″":"&Prime;","∏":"&prod;","∝":"&vprop;","𝒫":"&Pscr;","Ψ":"&Psi;",'"':"&quot;","𝔔":"&Qfr;","ℚ":"&rationals;","𝒬":"&Qscr;","⤐":"&drbkarow;","®":"&reg;","Ŕ":"&Racute;","⟫":"&Rang;","↠":"&twoheadrightarrow;","⤖":"&Rarrtl;","Ř":"&Rcaron;","Ŗ":"&Rcedil;","Р":"&Rcy;","ℜ":"&realpart;","∋":"&niv;","⇋":"&lrhar;","⥯":"&duhar;","Ρ":"&Rho;","⟩":"&rangle;","→":"&srarr;","⇥":"&rarrb;","⇄":"&rlarr;","⌉":"&rceil;","⟧":"&robrk;","⥝":"&RightDownTeeVector;","⇂":"&downharpoonright;","⥕":"&RightDownVectorBar;","⌋":"&rfloor;","⊢":"&vdash;","↦":"&mapsto;","⥛":"&RightTeeVector;","⊳":"&vrtri;","⧐":"&RightTriangleBar;","⊵":"&trianglerighteq;","⥏":"&RightUpDownVector;","⥜":"&RightUpTeeVector;","↾":"&upharpoonright;","⥔":"&RightUpVectorBar;","⇀":"&rightharpoonup;","⥓":"&RightVectorBar;","ℝ":"&reals;","⥰":"&RoundImplies;","⇛":"&rAarr;","ℛ":"&realine;","↱":"&rsh;","⧴":"&RuleDelayed;","Щ":"&SHCHcy;","Ш":"&SHcy;","Ь":"&SOFTcy;","Ś":"&Sacute;","⪼":"&Sc;","Š":"&Scaron;","Ş":"&Scedil;","Ŝ":"&Scirc;","С":"&Scy;","𝔖":"&Sfr;","↑":"&uparrow;","Σ":"&Sigma;","∘":"&compfn;","𝕊":"&Sopf;","√":"&radic;","□":"&square;","⊓":"&sqcap;","⊏":"&sqsubset;","⊑":"&sqsubseteq;","⊐":"&sqsupset;","⊒":"&sqsupseteq;","⊔":"&sqcup;","𝒮":"&Sscr;","⋆":"&sstarf;","⋐":"&Subset;","⊆":"&subseteq;","≻":"&succ;","⪰":"&succeq;","≽":"&succcurlyeq;","≿":"&succsim;","∑":"&sum;","⋑":"&Supset;","⊃":"&supset;","⊇":"&supseteq;","Þ":"&THORN;","™":"&trade;","Ћ":"&TSHcy;","Ц":"&TScy;","\t":"&Tab;","Τ":"&Tau;","Ť":"&Tcaron;","Ţ":"&Tcedil;","Т":"&Tcy;","𝔗":"&Tfr;","∴":"&therefore;","Θ":"&Theta;","  ":"&ThickSpace;"," ":"&thinsp;","∼":"&thksim;","≃":"&simeq;","≅":"&cong;","≈":"&thkap;","𝕋":"&Topf;","⃛":"&tdot;","𝒯":"&Tscr;","Ŧ":"&Tstrok;","Ú":"&Uacute;","↟":"&Uarr;","⥉":"&Uarrocir;","Ў":"&Ubrcy;","Ŭ":"&Ubreve;","Û":"&Ucirc;","У":"&Ucy;","Ű":"&Udblac;","𝔘":"&Ufr;","Ù":"&Ugrave;","Ū":"&Umacr;",_:"&lowbar;","⏟":"&UnderBrace;","⎵":"&bbrk;","⏝":"&UnderParenthesis;","⋃":"&xcup;","⊎":"&uplus;","Ų":"&Uogon;","𝕌":"&Uopf;","⤒":"&UpArrowBar;","⇅":"&udarr;","↕":"&varr;","⥮":"&udhar;","⊥":"&perp;","↥":"&mapstoup;","↖":"&nwarrow;","↗":"&nearrow;","ϒ":"&upsih;","Υ":"&Upsilon;","Ů":"&Uring;","𝒰":"&Uscr;","Ũ":"&Utilde;","Ü":"&Uuml;","⊫":"&VDash;","⫫":"&Vbar;","В":"&Vcy;","⊩":"&Vdash;","⫦":"&Vdashl;","⋁":"&xvee;","‖":"&Vert;","∣":"&smid;","|":"&vert;","❘":"&VerticalSeparator;","≀":"&wreath;"," ":"&hairsp;","𝔙":"&Vfr;","𝕍":"&Vopf;","𝒱":"&Vscr;","⊪":"&Vvdash;","Ŵ":"&Wcirc;","⋀":"&xwedge;","𝔚":"&Wfr;","𝕎":"&Wopf;","𝒲":"&Wscr;","𝔛":"&Xfr;","Ξ":"&Xi;","𝕏":"&Xopf;","𝒳":"&Xscr;","Я":"&YAcy;","Ї":"&YIcy;","Ю":"&YUcy;","Ý":"&Yacute;","Ŷ":"&Ycirc;","Ы":"&Ycy;","𝔜":"&Yfr;","𝕐":"&Yopf;","𝒴":"&Yscr;","Ÿ":"&Yuml;","Ж":"&ZHcy;","Ź":"&Zacute;","Ž":"&Zcaron;","З":"&Zcy;","Ż":"&Zdot;","Ζ":"&Zeta;","ℨ":"&zeetrf;","ℤ":"&integers;","𝒵":"&Zscr;","á":"&aacute;","ă":"&abreve;","∾":"&mstpos;","∾̳":"&acE;","∿":"&acd;","â":"&acirc;","а":"&acy;","æ":"&aelig;","𝔞":"&afr;","à":"&agrave;","ℵ":"&aleph;","α":"&alpha;","ā":"&amacr;","⨿":"&amalg;","∧":"&wedge;","⩕":"&andand;","⩜":"&andd;","⩘":"&andslope;","⩚":"&andv;","∠":"&angle;","⦤":"&ange;","∡":"&measuredangle;","⦨":"&angmsdaa;","⦩":"&angmsdab;","⦪":"&angmsdac;","⦫":"&angmsdad;","⦬":"&angmsdae;","⦭":"&angmsdaf;","⦮":"&angmsdag;","⦯":"&angmsdah;","∟":"&angrt;","⊾":"&angrtvb;","⦝":"&angrtvbd;","∢":"&angsph;","⍼":"&angzarr;","ą":"&aogon;","𝕒":"&aopf;","⩰":"&apE;","⩯":"&apacir;","≊":"&approxeq;","≋":"&apid;","'":"&apos;","å":"&aring;","𝒶":"&ascr;","*":"&midast;","ã":"&atilde;","ä":"&auml;","⨑":"&awint;","⫭":"&bNot;","≌":"&bcong;","϶":"&bepsi;","‵":"&bprime;","∽":"&bsim;","⋍":"&bsime;","⊽":"&barvee;","⌅":"&barwedge;","⎶":"&bbrktbrk;","б":"&bcy;","„":"&ldquor;","⦰":"&bemptyv;","β":"&beta;","ℶ":"&beth;","≬":"&twixt;","𝔟":"&bfr;","◯":"&xcirc;","⨀":"&xodot;","⨁":"&xoplus;","⨂":"&xotime;","⨆":"&xsqcup;","★":"&starf;","▽":"&xdtri;","△":"&xutri;","⨄":"&xuplus;","⤍":"&rbarr;","⧫":"&lozf;","▴":"&utrif;","▾":"&dtrif;","◂":"&ltrif;","▸":"&rtrif;","␣":"&blank;","▒":"&blk12;","░":"&blk14;","▓":"&blk34;","█":"&block;","=⃥":"&bne;","≡⃥":"&bnequiv;","⌐":"&bnot;","𝕓":"&bopf;","⋈":"&bowtie;","╗":"&boxDL;","╔":"&boxDR;","╖":"&boxDl;","╓":"&boxDr;","═":"&boxH;","╦":"&boxHD;","╩":"&boxHU;","╤":"&boxHd;","╧":"&boxHu;","╝":"&boxUL;","╚":"&boxUR;","╜":"&boxUl;","╙":"&boxUr;","║":"&boxV;","╬":"&boxVH;","╣":"&boxVL;","╠":"&boxVR;","╫":"&boxVh;","╢":"&boxVl;","╟":"&boxVr;","⧉":"&boxbox;","╕":"&boxdL;","╒":"&boxdR;","┐":"&boxdl;","┌":"&boxdr;","╥":"&boxhD;","╨":"&boxhU;","┬":"&boxhd;","┴":"&boxhu;","⊟":"&minusb;","⊞":"&plusb;","⊠":"&timesb;","╛":"&boxuL;","╘":"&boxuR;","┘":"&boxul;","└":"&boxur;","│":"&boxv;","╪":"&boxvH;","╡":"&boxvL;","╞":"&boxvR;","┼":"&boxvh;","┤":"&boxvl;","├":"&boxvr;","¦":"&brvbar;","𝒷":"&bscr;","⁏":"&bsemi;","\\":"&bsol;","⧅":"&bsolb;","⟈":"&bsolhsub;","•":"&bullet;","⪮":"&bumpE;","ć":"&cacute;","∩":"&cap;","⩄":"&capand;","⩉":"&capbrcup;","⩋":"&capcap;","⩇":"&capcup;","⩀":"&capdot;","∩︀":"&caps;","⁁":"&caret;","⩍":"&ccaps;","č":"&ccaron;","ç":"&ccedil;","ĉ":"&ccirc;","⩌":"&ccups;","⩐":"&ccupssm;","ċ":"&cdot;","⦲":"&cemptyv;","¢":"&cent;","𝔠":"&cfr;","ч":"&chcy;","✓":"&checkmark;","χ":"&chi;","○":"&cir;","⧃":"&cirE;","ˆ":"&circ;","≗":"&cire;","↺":"&olarr;","↻":"&orarr;","Ⓢ":"&oS;","⊛":"&oast;","⊚":"&ocir;","⊝":"&odash;","⨐":"&cirfnint;","⫯":"&cirmid;","⧂":"&cirscir;","♣":"&clubsuit;",":":"&colon;",",":"&comma;","@":"&commat;","∁":"&complement;","⩭":"&congdot;","𝕔":"&copf;","℗":"&copysr;","↵":"&crarr;","✗":"&cross;","𝒸":"&cscr;","⫏":"&csub;","⫑":"&csube;","⫐":"&csup;","⫒":"&csupe;","⋯":"&ctdot;","⤸":"&cudarrl;","⤵":"&cudarrr;","⋞":"&curlyeqprec;","⋟":"&curlyeqsucc;","↶":"&curvearrowleft;","⤽":"&cularrp;","∪":"&cup;","⩈":"&cupbrcap;","⩆":"&cupcap;","⩊":"&cupcup;","⊍":"&cupdot;","⩅":"&cupor;","∪︀":"&cups;","↷":"&curvearrowright;","⤼":"&curarrm;","⋎":"&cuvee;","⋏":"&cuwed;","¤":"&curren;","∱":"&cwint;","⌭":"&cylcty;","⥥":"&dHar;","†":"&dagger;","ℸ":"&daleth;","‐":"&hyphen;","⤏":"&rBarr;","ď":"&dcaron;","д":"&dcy;","⇊":"&downdownarrows;","⩷":"&eDDot;","°":"&deg;","δ":"&delta;","⦱":"&demptyv;","⥿":"&dfisht;","𝔡":"&dfr;","♦":"&diams;","ϝ":"&gammad;","⋲":"&disin;","÷":"&divide;","⋇":"&divonx;","ђ":"&djcy;","⌞":"&llcorner;","⌍":"&dlcrop;",$:"&dollar;","𝕕":"&dopf;","≑":"&eDot;","∸":"&minusd;","∔":"&plusdo;","⊡":"&sdotb;","⌟":"&lrcorner;","⌌":"&drcrop;","𝒹":"&dscr;","ѕ":"&dscy;","⧶":"&dsol;","đ":"&dstrok;","⋱":"&dtdot;","▿":"&triangledown;","⦦":"&dwangle;","џ":"&dzcy;","⟿":"&dzigrarr;","é":"&eacute;","⩮":"&easter;","ě":"&ecaron;","≖":"&eqcirc;","ê":"&ecirc;","≕":"&eqcolon;","э":"&ecy;","ė":"&edot;","≒":"&fallingdotseq;","𝔢":"&efr;","⪚":"&eg;","è":"&egrave;","⪖":"&eqslantgtr;","⪘":"&egsdot;","⪙":"&el;","⏧":"&elinters;","ℓ":"&ell;","⪕":"&eqslantless;","⪗":"&elsdot;","ē":"&emacr;","∅":"&varnothing;"," ":"&emsp13;"," ":"&emsp14;"," ":"&emsp;","ŋ":"&eng;"," ":"&ensp;","ę":"&eogon;","𝕖":"&eopf;","⋕":"&epar;","⧣":"&eparsl;","⩱":"&eplus;","ε":"&epsilon;","ϵ":"&varepsilon;","=":"&equals;","≟":"&questeq;","⩸":"&equivDD;","⧥":"&eqvparsl;","≓":"&risingdotseq;","⥱":"&erarr;","ℯ":"&escr;","η":"&eta;","ð":"&eth;","ë":"&euml;","€":"&euro;","!":"&excl;","ф":"&fcy;","♀":"&female;","ﬃ":"&ffilig;","ﬀ":"&fflig;","ﬄ":"&ffllig;","𝔣":"&ffr;","ﬁ":"&filig;",fj:"&fjlig;","♭":"&flat;","ﬂ":"&fllig;","▱":"&fltns;","ƒ":"&fnof;","𝕗":"&fopf;","⋔":"&pitchfork;","⫙":"&forkv;","⨍":"&fpartint;","½":"&half;","⅓":"&frac13;","¼":"&frac14;","⅕":"&frac15;","⅙":"&frac16;","⅛":"&frac18;","⅔":"&frac23;","⅖":"&frac25;","¾":"&frac34;","⅗":"&frac35;","⅜":"&frac38;","⅘":"&frac45;","⅚":"&frac56;","⅝":"&frac58;","⅞":"&frac78;","⁄":"&frasl;","⌢":"&sfrown;","𝒻":"&fscr;","⪌":"&gtreqqless;","ǵ":"&gacute;","γ":"&gamma;","⪆":"&gtrapprox;","ğ":"&gbreve;","ĝ":"&gcirc;","г":"&gcy;","ġ":"&gdot;","⪩":"&gescc;","⪀":"&gesdot;","⪂":"&gesdoto;","⪄":"&gesdotol;","⋛︀":"&gesl;","⪔":"&gesles;","𝔤":"&gfr;","ℷ":"&gimel;","ѓ":"&gjcy;","⪒":"&glE;","⪥":"&gla;","⪤":"&glj;","≩":"&gneqq;","⪊":"&gnapprox;","⪈":"&gneq;","⋧":"&gnsim;","𝕘":"&gopf;","ℊ":"&gscr;","⪎":"&gsime;","⪐":"&gsiml;","⪧":"&gtcc;","⩺":"&gtcir;","⋗":"&gtrdot;","⦕":"&gtlPar;","⩼":"&gtquest;","⥸":"&gtrarr;","≩︀":"&gvnE;","ъ":"&hardcy;","⥈":"&harrcir;","↭":"&leftrightsquigarrow;","ℏ":"&plankv;","ĥ":"&hcirc;","♥":"&heartsuit;","…":"&mldr;","⊹":"&hercon;","𝔥":"&hfr;","⤥":"&searhk;","⤦":"&swarhk;","⇿":"&hoarr;","∻":"&homtht;","↩":"&larrhk;","↪":"&rarrhk;","𝕙":"&hopf;","―":"&horbar;","𝒽":"&hscr;","ħ":"&hstrok;","⁃":"&hybull;","í":"&iacute;","î":"&icirc;","и":"&icy;","е":"&iecy;","¡":"&iexcl;","𝔦":"&ifr;","ì":"&igrave;","⨌":"&qint;","∭":"&tint;","⧜":"&iinfin;","℩":"&iiota;","ĳ":"&ijlig;","ī":"&imacr;","ı":"&inodot;","⊷":"&imof;","Ƶ":"&imped;","℅":"&incare;","∞":"&infin;","⧝":"&infintie;","⊺":"&intercal;","⨗":"&intlarhk;","⨼":"&iprod;","ё":"&iocy;","į":"&iogon;","𝕚":"&iopf;","ι":"&iota;","¿":"&iquest;","𝒾":"&iscr;","⋹":"&isinE;","⋵":"&isindot;","⋴":"&isins;","⋳":"&isinsv;","ĩ":"&itilde;","і":"&iukcy;","ï":"&iuml;","ĵ":"&jcirc;","й":"&jcy;","𝔧":"&jfr;","ȷ":"&jmath;","𝕛":"&jopf;","𝒿":"&jscr;","ј":"&jsercy;","є":"&jukcy;","κ":"&kappa;","ϰ":"&varkappa;","ķ":"&kcedil;","к":"&kcy;","𝔨":"&kfr;","ĸ":"&kgreen;","х":"&khcy;","ќ":"&kjcy;","𝕜":"&kopf;","𝓀":"&kscr;","⤛":"&lAtail;","⤎":"&lBarr;","⪋":"&lesseqqgtr;","⥢":"&lHar;","ĺ":"&lacute;","⦴":"&laemptyv;","λ":"&lambda;","⦑":"&langd;","⪅":"&lessapprox;","«":"&laquo;","⤟":"&larrbfs;","⤝":"&larrfs;","↫":"&looparrowleft;","⤹":"&larrpl;","⥳":"&larrsim;","↢":"&leftarrowtail;","⪫":"&lat;","⤙":"&latail;","⪭":"&late;","⪭︀":"&lates;","⤌":"&lbarr;","❲":"&lbbrk;","{":"&lcub;","[":"&lsqb;","⦋":"&lbrke;","⦏":"&lbrksld;","⦍":"&lbrkslu;","ľ":"&lcaron;","ļ":"&lcedil;","л":"&lcy;","⤶":"&ldca;","⥧":"&ldrdhar;","⥋":"&ldrushar;","↲":"&ldsh;","≤":"&leq;","⇇":"&llarr;","⋋":"&lthree;","⪨":"&lescc;","⩿":"&lesdot;","⪁":"&lesdoto;","⪃":"&lesdotor;","⋚︀":"&lesg;","⪓":"&lesges;","⋖":"&ltdot;","⥼":"&lfisht;","𝔩":"&lfr;","⪑":"&lgE;","⥪":"&lharul;","▄":"&lhblk;","љ":"&ljcy;","⥫":"&llhard;","◺":"&lltri;","ŀ":"&lmidot;","⎰":"&lmoustache;","≨":"&lneqq;","⪉":"&lnapprox;","⪇":"&lneq;","⋦":"&lnsim;","⟬":"&loang;","⇽":"&loarr;","⟼":"&xmap;","↬":"&rarrlp;","⦅":"&lopar;","𝕝":"&lopf;","⨭":"&loplus;","⨴":"&lotimes;","∗":"&lowast;","◊":"&lozenge;","(":"&lpar;","⦓":"&lparlt;","⥭":"&lrhard;","‎":"&lrm;","⊿":"&lrtri;","‹":"&lsaquo;","𝓁":"&lscr;","⪍":"&lsime;","⪏":"&lsimg;","‚":"&sbquo;","ł":"&lstrok;","⪦":"&ltcc;","⩹":"&ltcir;","⋉":"&ltimes;","⥶":"&ltlarr;","⩻":"&ltquest;","⦖":"&ltrPar;","◃":"&triangleleft;","⥊":"&lurdshar;","⥦":"&luruhar;","≨︀":"&lvnE;","∺":"&mDDot;","¯":"&strns;","♂":"&male;","✠":"&maltese;","▮":"&marker;","⨩":"&mcomma;","м":"&mcy;","—":"&mdash;","𝔪":"&mfr;","℧":"&mho;","µ":"&micro;","⫰":"&midcir;","−":"&minus;","⨪":"&minusdu;","⫛":"&mlcp;","⊧":"&models;","𝕞":"&mopf;","𝓂":"&mscr;","μ":"&mu;","⊸":"&mumap;","⋙̸":"&nGg;","≫⃒":"&nGt;","⇍":"&nlArr;","⇎":"&nhArr;","⋘̸":"&nLl;","≪⃒":"&nLt;","⇏":"&nrArr;","⊯":"&nVDash;","⊮":"&nVdash;","ń":"&nacute;","∠⃒":"&nang;","⩰̸":"&napE;","≋̸":"&napid;","ŉ":"&napos;","♮":"&natural;","⩃":"&ncap;","ň":"&ncaron;","ņ":"&ncedil;","⩭̸":"&ncongdot;","⩂":"&ncup;","н":"&ncy;","–":"&ndash;","⇗":"&neArr;","⤤":"&nearhk;","≐̸":"&nedot;","⤨":"&toea;","𝔫":"&nfr;","↮":"&nleftrightarrow;","⫲":"&nhpar;","⋼":"&nis;","⋺":"&nisd;","њ":"&njcy;","≦̸":"&nleqq;","↚":"&nleftarrow;","‥":"&nldr;","𝕟":"&nopf;","¬":"&not;","⋹̸":"&notinE;","⋵̸":"&notindot;","⋷":"&notinvb;","⋶":"&notinvc;","⋾":"&notnivb;","⋽":"&notnivc;","⫽⃥":"&nparsl;","∂̸":"&npart;","⨔":"&npolint;","↛":"&nrightarrow;","⤳̸":"&nrarrc;","↝̸":"&nrarrw;","𝓃":"&nscr;","⊄":"&nsub;","⫅̸":"&nsubseteqq;","⊅":"&nsup;","⫆̸":"&nsupseteqq;","ñ":"&ntilde;","ν":"&nu;","#":"&num;","№":"&numero;"," ":"&numsp;","⊭":"&nvDash;","⤄":"&nvHarr;","≍⃒":"&nvap;","⊬":"&nvdash;","≥⃒":"&nvge;",">⃒":"&nvgt;","⧞":"&nvinfin;","⤂":"&nvlArr;","≤⃒":"&nvle;","<⃒":"&nvlt;","⊴⃒":"&nvltrie;","⤃":"&nvrArr;","⊵⃒":"&nvrtrie;","∼⃒":"&nvsim;","⇖":"&nwArr;","⤣":"&nwarhk;","⤧":"&nwnear;","ó":"&oacute;","ô":"&ocirc;","о":"&ocy;","ő":"&odblac;","⨸":"&odiv;","⦼":"&odsold;","œ":"&oelig;","⦿":"&ofcir;","𝔬":"&ofr;","˛":"&ogon;","ò":"&ograve;","⧁":"&ogt;","⦵":"&ohbar;","⦾":"&olcir;","⦻":"&olcross;","⧀":"&olt;","ō":"&omacr;","ω":"&omega;","ο":"&omicron;","⦶":"&omid;","𝕠":"&oopf;","⦷":"&opar;","⦹":"&operp;","∨":"&vee;","⩝":"&ord;","ℴ":"&oscr;","ª":"&ordf;","º":"&ordm;","⊶":"&origof;","⩖":"&oror;","⩗":"&orslope;","⩛":"&orv;","ø":"&oslash;","⊘":"&osol;","õ":"&otilde;","⨶":"&otimesas;","ö":"&ouml;","⌽":"&ovbar;","¶":"&para;","⫳":"&parsim;","⫽":"&parsl;","п":"&pcy;","%":"&percnt;",".":"&period;","‰":"&permil;","‱":"&pertenk;","𝔭":"&pfr;","φ":"&phi;","ϕ":"&varphi;","☎":"&phone;","π":"&pi;","ϖ":"&varpi;","ℎ":"&planckh;","+":"&plus;","⨣":"&plusacir;","⨢":"&pluscir;","⨥":"&plusdu;","⩲":"&pluse;","⨦":"&plussim;","⨧":"&plustwo;","⨕":"&pointint;","𝕡":"&popf;","£":"&pound;","⪳":"&prE;","⪷":"&precapprox;","⪹":"&prnap;","⪵":"&prnE;","⋨":"&prnsim;","′":"&prime;","⌮":"&profalar;","⌒":"&profline;","⌓":"&profsurf;","⊰":"&prurel;","𝓅":"&pscr;","ψ":"&psi;"," ":"&puncsp;","𝔮":"&qfr;","𝕢":"&qopf;","⁗":"&qprime;","𝓆":"&qscr;","⨖":"&quatint;","?":"&quest;","⤜":"&rAtail;","⥤":"&rHar;","∽̱":"&race;","ŕ":"&racute;","⦳":"&raemptyv;","⦒":"&rangd;","⦥":"&range;","»":"&raquo;","⥵":"&rarrap;","⤠":"&rarrbfs;","⤳":"&rarrc;","⤞":"&rarrfs;","⥅":"&rarrpl;","⥴":"&rarrsim;","↣":"&rightarrowtail;","↝":"&rightsquigarrow;","⤚":"&ratail;","∶":"&ratio;","❳":"&rbbrk;","}":"&rcub;","]":"&rsqb;","⦌":"&rbrke;","⦎":"&rbrksld;","⦐":"&rbrkslu;","ř":"&rcaron;","ŗ":"&rcedil;","р":"&rcy;","⤷":"&rdca;","⥩":"&rdldhar;","↳":"&rdsh;","▭":"&rect;","⥽":"&rfisht;","𝔯":"&rfr;","⥬":"&rharul;","ρ":"&rho;","ϱ":"&varrho;","⇉":"&rrarr;","⋌":"&rthree;","˚":"&ring;","‏":"&rlm;","⎱":"&rmoustache;","⫮":"&rnmid;","⟭":"&roang;","⇾":"&roarr;","⦆":"&ropar;","𝕣":"&ropf;","⨮":"&roplus;","⨵":"&rotimes;",")":"&rpar;","⦔":"&rpargt;","⨒":"&rppolint;","›":"&rsaquo;","𝓇":"&rscr;","⋊":"&rtimes;","▹":"&triangleright;","⧎":"&rtriltri;","⥨":"&ruluhar;","℞":"&rx;","ś":"&sacute;","⪴":"&scE;","⪸":"&succapprox;","š":"&scaron;","ş":"&scedil;","ŝ":"&scirc;","⪶":"&succneqq;","⪺":"&succnapprox;","⋩":"&succnsim;","⨓":"&scpolint;","с":"&scy;","⋅":"&sdot;","⩦":"&sdote;","⇘":"&seArr;","§":"&sect;",";":"&semi;","⤩":"&tosa;","✶":"&sext;","𝔰":"&sfr;","♯":"&sharp;","щ":"&shchcy;","ш":"&shcy;","­":"&shy;","σ":"&sigma;","ς":"&varsigma;","⩪":"&simdot;","⪞":"&simg;","⪠":"&simgE;","⪝":"&siml;","⪟":"&simlE;","≆":"&simne;","⨤":"&simplus;","⥲":"&simrarr;","⨳":"&smashp;","⧤":"&smeparsl;","⌣":"&ssmile;","⪪":"&smt;","⪬":"&smte;","⪬︀":"&smtes;","ь":"&softcy;","/":"&sol;","⧄":"&solb;","⌿":"&solbar;","𝕤":"&sopf;","♠":"&spadesuit;","⊓︀":"&sqcaps;","⊔︀":"&sqcups;","𝓈":"&sscr;","☆":"&star;","⊂":"&subset;","⫅":"&subseteqq;","⪽":"&subdot;","⫃":"&subedot;","⫁":"&submult;","⫋":"&subsetneqq;","⊊":"&subsetneq;","⪿":"&subplus;","⥹":"&subrarr;","⫇":"&subsim;","⫕":"&subsub;","⫓":"&subsup;","♪":"&sung;","¹":"&sup1;","²":"&sup2;","³":"&sup3;","⫆":"&supseteqq;","⪾":"&supdot;","⫘":"&supdsub;","⫄":"&supedot;","⟉":"&suphsol;","⫗":"&suphsub;","⥻":"&suplarr;","⫂":"&supmult;","⫌":"&supsetneqq;","⊋":"&supsetneq;","⫀":"&supplus;","⫈":"&supsim;","⫔":"&supsub;","⫖":"&supsup;","⇙":"&swArr;","⤪":"&swnwar;","ß":"&szlig;","⌖":"&target;","τ":"&tau;","ť":"&tcaron;","ţ":"&tcedil;","т":"&tcy;","⌕":"&telrec;","𝔱":"&tfr;","θ":"&theta;","ϑ":"&vartheta;","þ":"&thorn;","×":"&times;","⨱":"&timesbar;","⨰":"&timesd;","⌶":"&topbot;","⫱":"&topcir;","𝕥":"&topf;","⫚":"&topfork;","‴":"&tprime;","▵":"&utri;","≜":"&trie;","◬":"&tridot;","⨺":"&triminus;","⨹":"&triplus;","⧍":"&trisb;","⨻":"&tritime;","⏢":"&trpezium;","𝓉":"&tscr;","ц":"&tscy;","ћ":"&tshcy;","ŧ":"&tstrok;","⥣":"&uHar;","ú":"&uacute;","ў":"&ubrcy;","ŭ":"&ubreve;","û":"&ucirc;","у":"&ucy;","ű":"&udblac;","⥾":"&ufisht;","𝔲":"&ufr;","ù":"&ugrave;","▀":"&uhblk;","⌜":"&ulcorner;","⌏":"&ulcrop;","◸":"&ultri;","ū":"&umacr;","ų":"&uogon;","𝕦":"&uopf;","υ":"&upsilon;","⇈":"&uuarr;","⌝":"&urcorner;","⌎":"&urcrop;","ů":"&uring;","◹":"&urtri;","𝓊":"&uscr;","⋰":"&utdot;","ũ":"&utilde;","ü":"&uuml;","⦧":"&uwangle;","⫨":"&vBar;","⫩":"&vBarv;","⦜":"&vangrt;","⊊︀":"&vsubne;","⫋︀":"&vsubnE;","⊋︀":"&vsupne;","⫌︀":"&vsupnE;","в":"&vcy;","⊻":"&veebar;","≚":"&veeeq;","⋮":"&vellip;","𝔳":"&vfr;","𝕧":"&vopf;","𝓋":"&vscr;","⦚":"&vzigzag;","ŵ":"&wcirc;","⩟":"&wedbar;","≙":"&wedgeq;","℘":"&wp;","𝔴":"&wfr;","𝕨":"&wopf;","𝓌":"&wscr;","𝔵":"&xfr;","ξ":"&xi;","⋻":"&xnis;","𝕩":"&xopf;","𝓍":"&xscr;","ý":"&yacute;","я":"&yacy;","ŷ":"&ycirc;","ы":"&ycy;","¥":"&yen;","𝔶":"&yfr;","ї":"&yicy;","𝕪":"&yopf;","𝓎":"&yscr;","ю":"&yucy;","ÿ":"&yuml;","ź":"&zacute;","ž":"&zcaron;","з":"&zcy;","ż":"&zdot;","ζ":"&zeta;","𝔷":"&zfr;","ж":"&zhcy;","⇝":"&zigrarr;","𝕫":"&zopf;","𝓏":"&zscr;","‍":"&zwj;","‌":"&zwnj;"}}};
//# sourceMappingURL=./named-references.js.map

/***/ }),

/***/ "./node_modules/html-entities/lib/numeric-unicode-map.js":
/*!***************************************************************!*\
  !*** ./node_modules/html-entities/lib/numeric-unicode-map.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.numericUnicodeMap={0:65533,128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};
//# sourceMappingURL=./numeric-unicode-map.js.map

/***/ }),

/***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
/*!***********************************************************!*\
  !*** ./node_modules/html-entities/lib/surrogate-pairs.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.fromCodePoint=String.fromCodePoint||function(astralCodePoint){return String.fromCharCode(Math.floor((astralCodePoint-65536)/1024)+55296,(astralCodePoint-65536)%1024+56320)};exports.getCodePoint=String.prototype.codePointAt?function(input,position){return input.codePointAt(position)}:function(input,position){return(input.charCodeAt(position)-55296)*1024+input.charCodeAt(position+1)-56320+65536};exports.highSurrogateFrom=55296;exports.highSurrogateTo=56319;
//# sourceMappingURL=./surrogate-pairs.js.map

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* eslint-env browser */
/*
  eslint-disable
  no-console,
  func-names
*/

/** @typedef {any} TODO */

var normalizeUrl = __webpack_require__(/*! ./normalize-url */ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js");
var srcByModuleId = Object.create(null);
var noDocument = typeof document === "undefined";
var forEach = Array.prototype.forEach;

/**
 * @param {function} fn
 * @param {number} time
 * @returns {(function(): void)|*}
 */
function debounce(fn, time) {
  var timeout = 0;
  return function () {
    // @ts-ignore
    var self = this;
    // eslint-disable-next-line prefer-rest-params
    var args = arguments;
    var functionCall = function functionCall() {
      return fn.apply(self, args);
    };
    clearTimeout(timeout);

    // @ts-ignore
    timeout = setTimeout(functionCall, time);
  };
}
function noop() {}

/**
 * @param {TODO} moduleId
 * @returns {TODO}
 */
function getCurrentScriptUrl(moduleId) {
  var src = srcByModuleId[moduleId];
  if (!src) {
    if (document.currentScript) {
      src = ( /** @type {HTMLScriptElement} */document.currentScript).src;
    } else {
      var scripts = document.getElementsByTagName("script");
      var lastScriptTag = scripts[scripts.length - 1];
      if (lastScriptTag) {
        src = lastScriptTag.src;
      }
    }
    srcByModuleId[moduleId] = src;
  }

  /**
   * @param {string} fileMap
   * @returns {null | string[]}
   */
  return function (fileMap) {
    if (!src) {
      return null;
    }
    var splitResult = src.split(/([^\\/]+)\.js$/);
    var filename = splitResult && splitResult[1];
    if (!filename) {
      return [src.replace(".js", ".css")];
    }
    if (!fileMap) {
      return [src.replace(".js", ".css")];
    }
    return fileMap.split(",").map(function (mapRule) {
      var reg = new RegExp("".concat(filename, "\\.js$"), "g");
      return normalizeUrl(src.replace(reg, "".concat(mapRule.replace(/{fileName}/g, filename), ".css")));
    });
  };
}

/**
 * @param {TODO} el
 * @param {string} [url]
 */
function updateCss(el, url) {
  if (!url) {
    if (!el.href) {
      return;
    }

    // eslint-disable-next-line
    url = el.href.split("?")[0];
  }
  if (!isUrlRequest( /** @type {string} */url)) {
    return;
  }
  if (el.isLoaded === false) {
    // We seem to be about to replace a css link that hasn't loaded yet.
    // We're probably changing the same file more than once.
    return;
  }
  if (!url || !(url.indexOf(".css") > -1)) {
    return;
  }

  // eslint-disable-next-line no-param-reassign
  el.visited = true;
  var newEl = el.cloneNode();
  newEl.isLoaded = false;
  newEl.addEventListener("load", function () {
    if (newEl.isLoaded) {
      return;
    }
    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.addEventListener("error", function () {
    if (newEl.isLoaded) {
      return;
    }
    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.href = "".concat(url, "?").concat(Date.now());
  if (el.nextSibling) {
    el.parentNode.insertBefore(newEl, el.nextSibling);
  } else {
    el.parentNode.appendChild(newEl);
  }
}

/**
 * @param {string} href
 * @param {TODO} src
 * @returns {TODO}
 */
function getReloadUrl(href, src) {
  var ret;

  // eslint-disable-next-line no-param-reassign
  href = normalizeUrl(href);
  src.some(
  /**
   * @param {string} url
   */
  // eslint-disable-next-line array-callback-return
  function (url) {
    if (href.indexOf(src) > -1) {
      ret = url;
    }
  });
  return ret;
}

/**
 * @param {string} [src]
 * @returns {boolean}
 */
function reloadStyle(src) {
  if (!src) {
    return false;
  }
  var elements = document.querySelectorAll("link");
  var loaded = false;
  forEach.call(elements, function (el) {
    if (!el.href) {
      return;
    }
    var url = getReloadUrl(el.href, src);
    if (!isUrlRequest(url)) {
      return;
    }
    if (el.visited === true) {
      return;
    }
    if (url) {
      updateCss(el, url);
      loaded = true;
    }
  });
  return loaded;
}
function reloadAll() {
  var elements = document.querySelectorAll("link");
  forEach.call(elements, function (el) {
    if (el.visited === true) {
      return;
    }
    updateCss(el);
  });
}

/**
 * @param {string} url
 * @returns {boolean}
 */
function isUrlRequest(url) {
  // An URL is not an request if

  // It is not http or https
  if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url)) {
    return false;
  }
  return true;
}

/**
 * @param {TODO} moduleId
 * @param {TODO} options
 * @returns {TODO}
 */
module.exports = function (moduleId, options) {
  if (noDocument) {
    console.log("no window.document found, will not HMR CSS");
    return noop;
  }
  var getScriptSrc = getCurrentScriptUrl(moduleId);
  function update() {
    var src = getScriptSrc(options.filename);
    var reloaded = reloadStyle(src);
    if (options.locals) {
      console.log("[HMR] Detected local css modules. Reload all css");
      reloadAll();
      return;
    }
    if (reloaded) {
      console.log("[HMR] css reload %s", src.join(" "));
    } else {
      console.log("[HMR] Reload all css");
      reloadAll();
    }
  }
  return debounce(update, 50);
};

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js":
/*!************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


/* eslint-disable */

/**
 * @param {string[]} pathComponents
 * @returns {string}
 */
function normalizeUrl(pathComponents) {
  return pathComponents.reduce(function (accumulator, item) {
    switch (item) {
      case "..":
        accumulator.pop();
        break;
      case ".":
        break;
      default:
        accumulator.push(item);
    }
    return accumulator;
  }, /** @type {string[]} */[]).join("/");
}

/**
 * @param {string} urlString
 * @returns {string}
 */
module.exports = function (urlString) {
  urlString = urlString.trim();
  if (/^data:/i.test(urlString)) {
    return urlString;
  }
  var protocol = urlString.indexOf("//") !== -1 ? urlString.split("//")[0] + "//" : "";
  var components = urlString.replace(new RegExp(protocol, "i"), "").split("/");
  var host = components[0].toLowerCase().replace(/\.$/, "");
  components[0] = "";
  var path = normalizeUrl(components);
  return protocol + host + path;
};

/***/ }),

/***/ "./src/scss/quill-emoji.scss":
/*!***********************************!*\
  !*** ./src/scss/quill-emoji.scss ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      (function() {
        var localsJsonString = undefined;
        // 1714149699552
        var cssReload = __webpack_require__(/*! ../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {});
        // only invalidate when locals change
        if (
          module.hot.data &&
          module.hot.data.value &&
          module.hot.data.value !== localsJsonString
        ) {
          module.hot.invalidate();
        } else {
          module.hot.accept();
        }
        module.hot.dispose(function(data) {
          data.value = localsJsonString;
          cssReload();
        });
      })();
    }
  

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WebSocketClient)
/* harmony export */ });
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var WebSocketClient = /*#__PURE__*/function () {
  /**
   * @param {string} url
   */
  function WebSocketClient(url) {
    _classCallCheck(this, WebSocketClient);
    this.client = new WebSocket(url);
    this.client.onerror = function (error) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);
    };
  }

  /**
   * @param {(...args: any[]) => void} f
   */
  _createClass(WebSocketClient, [{
    key: "onOpen",
    value: function onOpen(f) {
      this.client.onopen = f;
    }

    /**
     * @param {(...args: any[]) => void} f
     */
  }, {
    key: "onClose",
    value: function onClose(f) {
      this.client.onclose = f;
    }

    // call f with the message string as the first argument
    /**
     * @param {(...args: any[]) => void} f
     */
  }, {
    key: "onMessage",
    value: function onMessage(f) {
      this.client.onmessage = function (e) {
        f(e.data);
      };
    }
  }]);
  return WebSocketClient;
}();


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8082&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8082&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true ***!
  \***********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
var __resourceQuery = "?protocol=ws%3A&hostname=0.0.0.0&port=8082&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/log.js */ "./node_modules/webpack/hot/log.js");
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/stripAnsi.js */ "./node_modules/webpack-dev-server/client/utils/stripAnsi.js");
/* harmony import */ var _utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/parseURL.js */ "./node_modules/webpack-dev-server/client/utils/parseURL.js");
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket.js */ "./node_modules/webpack-dev-server/client/socket.js");
/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./overlay.js */ "./node_modules/webpack-dev-server/client/overlay.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/sendMessage.js */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");
/* harmony import */ var _utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/reloadApp.js */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");
/* harmony import */ var _utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/createSocketURL.js */ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* global __resourceQuery, __webpack_hash__ */
/// <reference types="webpack/module" />










/**
 * @typedef {Object} OverlayOptions
 * @property {boolean | (error: Error) => boolean} [warnings]
 * @property {boolean | (error: Error) => boolean} [errors]
 * @property {boolean | (error: Error) => boolean} [runtimeErrors]
 * @property {string} [trustedTypesPolicyName]
 */

/**
 * @typedef {Object} Options
 * @property {boolean} hot
 * @property {boolean} liveReload
 * @property {boolean} progress
 * @property {boolean | OverlayOptions} overlay
 * @property {string} [logging]
 * @property {number} [reconnect]
 */

/**
 * @typedef {Object} Status
 * @property {boolean} isUnloading
 * @property {string} currentHash
 * @property {string} [previousHash]
 */

/**
 * @param {boolean | { warnings?: boolean | string; errors?: boolean | string; runtimeErrors?: boolean | string; }} overlayOptions
 */
var decodeOverlayOptions = function decodeOverlayOptions(overlayOptions) {
  if (typeof overlayOptions === "object") {
    ["warnings", "errors", "runtimeErrors"].forEach(function (property) {
      if (typeof overlayOptions[property] === "string") {
        var overlayFilterFunctionString = decodeURIComponent(overlayOptions[property]);

        // eslint-disable-next-line no-new-func
        var overlayFilterFunction = new Function("message", "var callback = ".concat(overlayFilterFunctionString, "\n        return callback(message)"));
        overlayOptions[property] = overlayFilterFunction;
      }
    });
  }
};

/**
 * @type {Status}
 */
var status = {
  isUnloading: false,
  // TODO Workaround for webpack v4, `__webpack_hash__` is not replaced without HotModuleReplacement
  // eslint-disable-next-line camelcase
  currentHash:  true ? __webpack_require__.h() : 0
};

/** @type {Options} */
var options = {
  hot: false,
  liveReload: false,
  progress: false,
  overlay: false
};
var parsedResourceQuery = (0,_utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__["default"])(__resourceQuery);
var enabledFeatures = {
  "Hot Module Replacement": false,
  "Live Reloading": false,
  Progress: false,
  Overlay: false
};
if (parsedResourceQuery.hot === "true") {
  options.hot = true;
  enabledFeatures["Hot Module Replacement"] = true;
}
if (parsedResourceQuery["live-reload"] === "true") {
  options.liveReload = true;
  enabledFeatures["Live Reloading"] = true;
}
if (parsedResourceQuery.progress === "true") {
  options.progress = true;
  enabledFeatures.Progress = true;
}
if (parsedResourceQuery.overlay) {
  try {
    options.overlay = JSON.parse(parsedResourceQuery.overlay);
  } catch (e) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Error parsing overlay options from resource query:", e);
  }

  // Fill in default "true" params for partially-specified objects.
  if (typeof options.overlay === "object") {
    options.overlay = _objectSpread({
      errors: true,
      warnings: true,
      runtimeErrors: true
    }, options.overlay);
    decodeOverlayOptions(options.overlay);
  }
  enabledFeatures.Overlay = true;
}
if (parsedResourceQuery.logging) {
  options.logging = parsedResourceQuery.logging;
}
if (typeof parsedResourceQuery.reconnect !== "undefined") {
  options.reconnect = Number(parsedResourceQuery.reconnect);
}

/**
 * @param {string} level
 */
function setAllLogLevel(level) {
  // This is needed because the HMR logger operate separately from dev server logger
  webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default().setLogLevel(level === "verbose" || level === "log" ? "info" : level);
  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.setLogLevel)(level);
}
if (options.logging) {
  setAllLogLevel(options.logging);
}
(0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.logEnabledFeatures)(enabledFeatures);
self.addEventListener("beforeunload", function () {
  status.isUnloading = true;
});
var overlay = typeof window !== "undefined" ? (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.createOverlay)(typeof options.overlay === "object" ? {
  trustedTypesPolicyName: options.overlay.trustedTypesPolicyName,
  catchRuntimeError: options.overlay.runtimeErrors
} : {
  trustedTypesPolicyName: false,
  catchRuntimeError: options.overlay
}) : {
  send: function send() {}
};
var onSocketMessage = {
  hot: function hot() {
    if (parsedResourceQuery.hot === "false") {
      return;
    }
    options.hot = true;
  },
  liveReload: function liveReload() {
    if (parsedResourceQuery["live-reload"] === "false") {
      return;
    }
    options.liveReload = true;
  },
  invalid: function invalid() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("App updated. Recompiling...");

    // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Invalid");
  },
  /**
   * @param {string} hash
   */
  hash: function hash(_hash) {
    status.previousHash = status.currentHash;
    status.currentHash = _hash;
  },
  logging: setAllLogLevel,
  /**
   * @param {boolean} value
   */
  overlay: function overlay(value) {
    if (typeof document === "undefined") {
      return;
    }
    options.overlay = value;
    decodeOverlayOptions(options.overlay);
  },
  /**
   * @param {number} value
   */
  reconnect: function reconnect(value) {
    if (parsedResourceQuery.reconnect === "false") {
      return;
    }
    options.reconnect = value;
  },
  /**
   * @param {boolean} value
   */
  progress: function progress(value) {
    options.progress = value;
  },
  /**
   * @param {{ pluginName?: string, percent: number, msg: string }} data
   */
  "progress-update": function progressUpdate(data) {
    if (options.progress) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(data.pluginName ? "[".concat(data.pluginName, "] ") : "").concat(data.percent, "% - ").concat(data.msg, "."));
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Progress", data);
  },
  "still-ok": function stillOk() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Nothing changed.");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("StillOk");
  },
  ok: function ok() {
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Ok");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  // TODO: remove in v5 in favor of 'static-changed'
  /**
   * @param {string} file
   */
  "content-changed": function contentChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },
  /**
   * @param {string} file
   */
  "static-changed": function staticChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },
  /**
   * @param {Error[]} warnings
   * @param {any} params
   */
  warnings: function warnings(_warnings, params) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn("Warnings while compiling.");
    var printableWarnings = _warnings.map(function (error) {
      var _formatProblem = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("warning", error),
        header = _formatProblem.header,
        body = _formatProblem.body;
      return "".concat(header, "\n").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body));
    });
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Warnings", printableWarnings);
    for (var i = 0; i < printableWarnings.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn(printableWarnings[i]);
    }
    var overlayWarningsSetting = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.warnings;
    if (overlayWarningsSetting) {
      var warningsToDisplay = typeof overlayWarningsSetting === "function" ? _warnings.filter(overlayWarningsSetting) : _warnings;
      if (warningsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "warning",
          messages: _warnings
        });
      }
    }
    if (params && params.preventReloading) {
      return;
    }
    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  /**
   * @param {Error[]} errors
   */
  errors: function errors(_errors) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Errors while compiling. Reload prevented.");
    var printableErrors = _errors.map(function (error) {
      var _formatProblem2 = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("error", error),
        header = _formatProblem2.header,
        body = _formatProblem2.body;
      return "".concat(header, "\n").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body));
    });
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Errors", printableErrors);
    for (var i = 0; i < printableErrors.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(printableErrors[i]);
    }
    var overlayErrorsSettings = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.errors;
    if (overlayErrorsSettings) {
      var errorsToDisplay = typeof overlayErrorsSettings === "function" ? _errors.filter(overlayErrorsSettings) : _errors;
      if (errorsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "error",
          messages: _errors
        });
      }
    }
  },
  /**
   * @param {Error} error
   */
  error: function error(_error) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(_error);
  },
  close: function close() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Disconnected!");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Close");
  }
};
var socketURL = (0,_utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__["default"])(parsedResourceQuery);
(0,_socket_js__WEBPACK_IMPORTED_MODULE_3__["default"])(socketURL, onSocketMessage, options.reconnect);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/logger/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client-src/modules/logger/SyncBailHookFake.js":
/*!*******************************************************!*\
  !*** ./client-src/modules/logger/SyncBailHookFake.js ***!
  \*******************************************************/
/***/ (function(module) {



/**
 * Client stub for tapable SyncBailHook
 */
module.exports = function clientTapableSyncBailHook() {
  return {
    call: function call() {}
  };
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/Logger.js":
/*!****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/Logger.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/



function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var LogType = Object.freeze({
  error: /** @type {"error"} */"error",
  // message, c style arguments
  warn: /** @type {"warn"} */"warn",
  // message, c style arguments
  info: /** @type {"info"} */"info",
  // message, c style arguments
  log: /** @type {"log"} */"log",
  // message, c style arguments
  debug: /** @type {"debug"} */"debug",
  // message, c style arguments

  trace: /** @type {"trace"} */"trace",
  // no arguments

  group: /** @type {"group"} */"group",
  // [label]
  groupCollapsed: /** @type {"groupCollapsed"} */"groupCollapsed",
  // [label]
  groupEnd: /** @type {"groupEnd"} */"groupEnd",
  // [label]

  profile: /** @type {"profile"} */"profile",
  // [profileName]
  profileEnd: /** @type {"profileEnd"} */"profileEnd",
  // [profileName]

  time: /** @type {"time"} */"time",
  // name, time as [seconds, nanoseconds]

  clear: /** @type {"clear"} */"clear",
  // no arguments
  status: /** @type {"status"} */"status" // message, arguments
});

exports.LogType = LogType;

/** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */

var LOG_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger raw log method");
var TIMERS_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger times");
var TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger aggregated times");
var WebpackLogger = /*#__PURE__*/function () {
  /**
   * @param {function(LogTypeEnum, any[]=): void} log log function
   * @param {function(string | function(): string): WebpackLogger} getChildLogger function to create child logger
   */
  function WebpackLogger(log, getChildLogger) {
    _classCallCheck(this, WebpackLogger);
    this[LOG_SYMBOL] = log;
    this.getChildLogger = getChildLogger;
  }
  _createClass(WebpackLogger, [{
    key: "error",
    value: function error() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      this[LOG_SYMBOL](LogType.error, args);
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      this[LOG_SYMBOL](LogType.warn, args);
    }
  }, {
    key: "info",
    value: function info() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      this[LOG_SYMBOL](LogType.info, args);
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      this[LOG_SYMBOL](LogType.log, args);
    }
  }, {
    key: "debug",
    value: function debug() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      this[LOG_SYMBOL](LogType.debug, args);
    }
  }, {
    key: "assert",
    value: function assert(assertion) {
      if (!assertion) {
        for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          args[_key6 - 1] = arguments[_key6];
        }
        this[LOG_SYMBOL](LogType.error, args);
      }
    }
  }, {
    key: "trace",
    value: function trace() {
      this[LOG_SYMBOL](LogType.trace, ["Trace"]);
    }
  }, {
    key: "clear",
    value: function clear() {
      this[LOG_SYMBOL](LogType.clear);
    }
  }, {
    key: "status",
    value: function status() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      this[LOG_SYMBOL](LogType.status, args);
    }
  }, {
    key: "group",
    value: function group() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      this[LOG_SYMBOL](LogType.group, args);
    }
  }, {
    key: "groupCollapsed",
    value: function groupCollapsed() {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }
      this[LOG_SYMBOL](LogType.groupCollapsed, args);
    }
  }, {
    key: "groupEnd",
    value: function groupEnd() {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }
      this[LOG_SYMBOL](LogType.groupEnd, args);
    }
  }, {
    key: "profile",
    value: function profile(label) {
      this[LOG_SYMBOL](LogType.profile, [label]);
    }
  }, {
    key: "profileEnd",
    value: function profileEnd(label) {
      this[LOG_SYMBOL](LogType.profileEnd, [label]);
    }
  }, {
    key: "time",
    value: function time(label) {
      this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();
      this[TIMERS_SYMBOL].set(label, process.hrtime());
    }
  }, {
    key: "timeLog",
    value: function timeLog(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeLog()"));
      }
      var time = process.hrtime(prev);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeEnd",
    value: function timeEnd(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeEnd()"));
      }
      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeAggregate",
    value: function timeAggregate(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeAggregate()"));
      }
      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();
      var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);
      if (current !== undefined) {
        if (time[1] + current[1] > 1e9) {
          time[0] += current[0] + 1;
          time[1] = time[1] - 1e9 + current[1];
        } else {
          time[0] += current[0];
          time[1] += current[1];
        }
      }
      this[TIMERS_AGGREGATES_SYMBOL].set(label, time);
    }
  }, {
    key: "timeAggregateEnd",
    value: function timeAggregateEnd(label) {
      if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;
      var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);
      if (time === undefined) return;
      this[TIMERS_AGGREGATES_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }]);
  return WebpackLogger;
}();
exports.Logger = WebpackLogger;

/***/ }),

/***/ "./node_modules/webpack/lib/logging/createConsoleLogger.js":
/*!*****************************************************************!*\
  !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_11285__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/



function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
var _require = __nested_webpack_require_11285__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
  LogType = _require.LogType;

/** @typedef {import("../../declarations/WebpackOptions").FilterItemTypes} FilterItemTypes */
/** @typedef {import("../../declarations/WebpackOptions").FilterTypes} FilterTypes */
/** @typedef {import("./Logger").LogTypeEnum} LogTypeEnum */

/** @typedef {function(string): boolean} FilterFunction */

/**
 * @typedef {Object} LoggerConsole
 * @property {function(): void} clear
 * @property {function(): void} trace
 * @property {(...args: any[]) => void} info
 * @property {(...args: any[]) => void} log
 * @property {(...args: any[]) => void} warn
 * @property {(...args: any[]) => void} error
 * @property {(...args: any[]) => void=} debug
 * @property {(...args: any[]) => void=} group
 * @property {(...args: any[]) => void=} groupCollapsed
 * @property {(...args: any[]) => void=} groupEnd
 * @property {(...args: any[]) => void=} status
 * @property {(...args: any[]) => void=} profile
 * @property {(...args: any[]) => void=} profileEnd
 * @property {(...args: any[]) => void=} logTime
 */

/**
 * @typedef {Object} LoggerOptions
 * @property {false|true|"none"|"error"|"warn"|"info"|"log"|"verbose"} level loglevel
 * @property {FilterTypes|boolean} debug filter for debug logging
 * @property {LoggerConsole} console the console to log to
 */

/**
 * @param {FilterItemTypes} item an input item
 * @returns {FilterFunction} filter function
 */
var filterToFunction = function filterToFunction(item) {
  if (typeof item === "string") {
    var regExp = new RegExp("[\\\\/]".concat(item.replace(
    // eslint-disable-next-line no-useless-escape
    /[-[\]{}()*+?.\\^$|]/g, "\\$&"), "([\\\\/]|$|!|\\?)"));
    return function (ident) {
      return regExp.test(ident);
    };
  }
  if (item && typeof item === "object" && typeof item.test === "function") {
    return function (ident) {
      return item.test(ident);
    };
  }
  if (typeof item === "function") {
    return item;
  }
  if (typeof item === "boolean") {
    return function () {
      return item;
    };
  }
};

/**
 * @enum {number}
 */
var LogLevel = {
  none: 6,
  false: 6,
  error: 5,
  warn: 4,
  info: 3,
  log: 2,
  true: 2,
  verbose: 1
};

/**
 * @param {LoggerOptions} options options object
 * @returns {function(string, LogTypeEnum, any[]): void} logging function
 */
module.exports = function (_ref) {
  var _ref$level = _ref.level,
    level = _ref$level === void 0 ? "info" : _ref$level,
    _ref$debug = _ref.debug,
    debug = _ref$debug === void 0 ? false : _ref$debug,
    console = _ref.console;
  var debugFilters = typeof debug === "boolean" ? [function () {
    return debug;
  }] : /** @type {FilterItemTypes[]} */[].concat(debug).map(filterToFunction);
  /** @type {number} */
  var loglevel = LogLevel["".concat(level)] || 0;

  /**
   * @param {string} name name of the logger
   * @param {LogTypeEnum} type type of the log entry
   * @param {any[]} args arguments of the log entry
   * @returns {void}
   */
  var logger = function logger(name, type, args) {
    var labeledArgs = function labeledArgs() {
      if (Array.isArray(args)) {
        if (args.length > 0 && typeof args[0] === "string") {
          return ["[".concat(name, "] ").concat(args[0])].concat(_toConsumableArray(args.slice(1)));
        } else {
          return ["[".concat(name, "]")].concat(_toConsumableArray(args));
        }
      } else {
        return [];
      }
    };
    var debug = debugFilters.some(function (f) {
      return f(name);
    });
    switch (type) {
      case LogType.debug:
        if (!debug) return;
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.debug === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.debug.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.log:
        if (!debug && loglevel > LogLevel.log) return;
        console.log.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.info:
        if (!debug && loglevel > LogLevel.info) return;
        console.info.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.warn:
        if (!debug && loglevel > LogLevel.warn) return;
        console.warn.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.error:
        if (!debug && loglevel > LogLevel.error) return;
        console.error.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.trace:
        if (!debug) return;
        console.trace();
        break;
      case LogType.groupCollapsed:
        if (!debug && loglevel > LogLevel.log) return;
        if (!debug && loglevel > LogLevel.verbose) {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          if (typeof console.groupCollapsed === "function") {
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));
          } else {
            console.log.apply(console, _toConsumableArray(labeledArgs()));
          }
          break;
        }
      // falls through
      case LogType.group:
        if (!debug && loglevel > LogLevel.log) return;
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.group === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.group.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.groupEnd:
        if (!debug && loglevel > LogLevel.log) return;
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.groupEnd === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.groupEnd();
        }
        break;
      case LogType.time:
        {
          if (!debug && loglevel > LogLevel.log) return;
          var ms = args[1] * 1000 + args[2] / 1000000;
          var msg = "[".concat(name, "] ").concat(args[0], ": ").concat(ms, " ms");
          if (typeof console.logTime === "function") {
            console.logTime(msg);
          } else {
            console.log(msg);
          }
          break;
        }
      case LogType.profile:
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.profile === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.profile.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.profileEnd:
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.profileEnd === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.clear:
        if (!debug && loglevel > LogLevel.log) return;
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.clear === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.clear();
        }
        break;
      case LogType.status:
        if (!debug && loglevel > LogLevel.info) return;
        if (typeof console.status === "function") {
          if (args.length === 0) {
            console.status();
          } else {
            console.status.apply(console, _toConsumableArray(labeledArgs()));
          }
        } else {
          if (args.length !== 0) {
            console.info.apply(console, _toConsumableArray(labeledArgs()));
          }
        }
        break;
      default:
        throw new Error("Unexpected LogType ".concat(type));
    }
  };
  return logger;
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/runtime.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_21334__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/



function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var SyncBailHook = __nested_webpack_require_21334__(/*! tapable/lib/SyncBailHook */ "./client-src/modules/logger/SyncBailHookFake.js");
var _require = __nested_webpack_require_21334__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
  Logger = _require.Logger;
var createConsoleLogger = __nested_webpack_require_21334__(/*! ./createConsoleLogger */ "./node_modules/webpack/lib/logging/createConsoleLogger.js");

/** @type {createConsoleLogger.LoggerOptions} */
var currentDefaultLoggerOptions = {
  level: "info",
  debug: false,
  console: console
};
var currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);

/**
 * @param {string} name name of the logger
 * @returns {Logger} a logger
 */
exports.getLogger = function (name) {
  return new Logger(function (type, args) {
    if (exports.hooks.log.call(name, type, args) === undefined) {
      currentDefaultLogger(name, type, args);
    }
  }, function (childName) {
    return exports.getLogger("".concat(name, "/").concat(childName));
  });
};

/**
 * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options
 * @returns {void}
 */
exports.configureDefaultLogger = function (options) {
  _extends(currentDefaultLoggerOptions, options);
  currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
};
exports.hooks = {
  log: new SyncBailHook(["origin", "type", "args"])
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_23461__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_23461__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_23461__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_23461__.o(definition, key) && !__nested_webpack_require_23461__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_23461__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_23461__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __nested_webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!********************************************!*\
  !*** ./client-src/modules/logger/index.js ***!
  \********************************************/
__nested_webpack_require_23461__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_23461__.d(__nested_webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport default export from named module */ webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__; }
/* harmony export */ });
/* harmony import */ var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_23461__(/*! webpack/lib/logging/runtime.js */ "./node_modules/webpack/lib/logging/runtime.js");

}();
var __webpack_export_target__ = exports;
for(var i in __nested_webpack_exports__) __webpack_export_target__[i] = __nested_webpack_exports__[i];
if(__nested_webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!***********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createOverlay: () => (/* binding */ createOverlay),
/* harmony export */   formatProblem: () => (/* binding */ formatProblem)
/* harmony export */ });
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ansi-html-community */ "./node_modules/ansi-html-community/index.js");
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html_community__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/lib/index.js");
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(html_entities__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./overlay/runtime-error.js */ "./node_modules/webpack-dev-server/client/overlay/runtime-error.js");
/* harmony import */ var _overlay_state_machine_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./overlay/state-machine.js */ "./node_modules/webpack-dev-server/client/overlay/state-machine.js");
/* harmony import */ var _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./overlay/styles.js */ "./node_modules/webpack-dev-server/client/overlay/styles.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).






var colors = {
  reset: ["transparent", "transparent"],
  black: "181818",
  red: "E36049",
  green: "B3CB74",
  yellow: "FFD080",
  blue: "7CAFC2",
  magenta: "7FACCA",
  cyan: "C3C2EF",
  lightgrey: "EBE7E3",
  darkgrey: "6D7891"
};
ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);

/**
 * @param {string} type
 * @param {string  | { file?: string, moduleName?: string, loc?: string, message?: string; stack?: string[] }} item
 * @returns {{ header: string, body: string }}
 */
function formatProblem(type, item) {
  var header = type === "warning" ? "WARNING" : "ERROR";
  var body = "";
  if (typeof item === "string") {
    body += item;
  } else {
    var file = item.file || "";
    // eslint-disable-next-line no-nested-ternary
    var moduleName = item.moduleName ? item.moduleName.indexOf("!") !== -1 ? "".concat(item.moduleName.replace(/^(\s|\S)*!/, ""), " (").concat(item.moduleName, ")") : "".concat(item.moduleName) : "";
    var loc = item.loc;
    header += "".concat(moduleName || file ? " in ".concat(moduleName ? "".concat(moduleName).concat(file ? " (".concat(file, ")") : "") : file).concat(loc ? " ".concat(loc) : "") : "");
    body += item.message || "";
  }
  if (Array.isArray(item.stack)) {
    item.stack.forEach(function (stack) {
      if (typeof stack === "string") {
        body += "\r\n".concat(stack);
      }
    });
  }
  return {
    header: header,
    body: body
  };
}

/**
 * @typedef {Object} CreateOverlayOptions
 * @property {string | null} trustedTypesPolicyName
 * @property {boolean | (error: Error) => void} [catchRuntimeError]
 */

/**
 *
 * @param {CreateOverlayOptions} options
 */
var createOverlay = function createOverlay(options) {
  /** @type {HTMLIFrameElement | null | undefined} */
  var iframeContainerElement;
  /** @type {HTMLDivElement | null | undefined} */
  var containerElement;
  /** @type {HTMLDivElement | null | undefined} */
  var headerElement;
  /** @type {Array<(element: HTMLDivElement) => void>} */
  var onLoadQueue = [];
  /** @type {TrustedTypePolicy | undefined} */
  var overlayTrustedTypesPolicy;

  /**
   *
   * @param {HTMLElement} element
   * @param {CSSStyleDeclaration} style
   */
  function applyStyle(element, style) {
    Object.keys(style).forEach(function (prop) {
      element.style[prop] = style[prop];
    });
  }

  /**
   * @param {string | null} trustedTypesPolicyName
   */
  function createContainer(trustedTypesPolicyName) {
    // Enable Trusted Types if they are available in the current browser.
    if (window.trustedTypes) {
      overlayTrustedTypesPolicy = window.trustedTypes.createPolicy(trustedTypesPolicyName || "webpack-dev-server#overlay", {
        createHTML: function createHTML(value) {
          return value;
        }
      });
    }
    iframeContainerElement = document.createElement("iframe");
    iframeContainerElement.id = "webpack-dev-server-client-overlay";
    iframeContainerElement.src = "about:blank";
    applyStyle(iframeContainerElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.iframeStyle);
    iframeContainerElement.onload = function () {
      var contentElement = /** @type {Document} */
      /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument.createElement("div");
      containerElement = /** @type {Document} */
      /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument.createElement("div");
      contentElement.id = "webpack-dev-server-client-overlay-div";
      applyStyle(contentElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.containerStyle);
      headerElement = document.createElement("div");
      headerElement.innerText = "Compiled with problems:";
      applyStyle(headerElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.headerStyle);
      var closeButtonElement = document.createElement("button");
      applyStyle(closeButtonElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.dismissButtonStyle);
      closeButtonElement.innerText = "×";
      closeButtonElement.ariaLabel = "Dismiss";
      closeButtonElement.addEventListener("click", function () {
        // eslint-disable-next-line no-use-before-define
        overlayService.send({
          type: "DISMISS"
        });
      });
      contentElement.appendChild(headerElement);
      contentElement.appendChild(closeButtonElement);
      contentElement.appendChild(containerElement);

      /** @type {Document} */
      /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument.body.appendChild(contentElement);
      onLoadQueue.forEach(function (onLoad) {
        onLoad( /** @type {HTMLDivElement} */contentElement);
      });
      onLoadQueue = [];

      /** @type {HTMLIFrameElement} */
      iframeContainerElement.onload = null;
    };
    document.body.appendChild(iframeContainerElement);
  }

  /**
   * @param {(element: HTMLDivElement) => void} callback
   * @param {string | null} trustedTypesPolicyName
   */
  function ensureOverlayExists(callback, trustedTypesPolicyName) {
    if (containerElement) {
      containerElement.innerHTML = "";
      // Everything is ready, call the callback right away.
      callback(containerElement);
      return;
    }
    onLoadQueue.push(callback);
    if (iframeContainerElement) {
      return;
    }
    createContainer(trustedTypesPolicyName);
  }

  // Successful compilation.
  function hide() {
    if (!iframeContainerElement) {
      return;
    }

    // Clean up and reset internal state.
    document.body.removeChild(iframeContainerElement);
    iframeContainerElement = null;
    containerElement = null;
  }

  // Compilation with errors (e.g. syntax error or missing modules).
  /**
   * @param {string} type
   * @param {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages
   * @param {string | null} trustedTypesPolicyName
   * @param {'build' | 'runtime'} messageSource
   */
  function show(type, messages, trustedTypesPolicyName, messageSource) {
    ensureOverlayExists(function () {
      headerElement.innerText = messageSource === "runtime" ? "Uncaught runtime errors:" : "Compiled with problems:";
      messages.forEach(function (message) {
        var entryElement = document.createElement("div");
        var msgStyle = type === "warning" ? _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgStyles.warning : _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgStyles.error;
        applyStyle(entryElement, _objectSpread(_objectSpread({}, msgStyle), {}, {
          padding: "1rem 1rem 1.5rem 1rem"
        }));
        var typeElement = document.createElement("div");
        var _formatProblem = formatProblem(type, message),
          header = _formatProblem.header,
          body = _formatProblem.body;
        typeElement.innerText = header;
        applyStyle(typeElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgTypeStyle);
        if (message.moduleIdentifier) {
          applyStyle(typeElement, {
            cursor: "pointer"
          });
          // element.dataset not supported in IE
          typeElement.setAttribute("data-can-open", true);
          typeElement.addEventListener("click", function () {
            fetch("/webpack-dev-server/open-editor?fileName=".concat(message.moduleIdentifier));
          });
        }

        // Make it look similar to our terminal.
        var text = ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default()((0,html_entities__WEBPACK_IMPORTED_MODULE_4__.encode)(body));
        var messageTextNode = document.createElement("div");
        applyStyle(messageTextNode, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgTextStyle);
        messageTextNode.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML(text) : text;
        entryElement.appendChild(typeElement);
        entryElement.appendChild(messageTextNode);

        /** @type {HTMLDivElement} */
        containerElement.appendChild(entryElement);
      });
    }, trustedTypesPolicyName);
  }
  var overlayService = (0,_overlay_state_machine_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
    showOverlay: function showOverlay(_ref) {
      var _ref$level = _ref.level,
        level = _ref$level === void 0 ? "error" : _ref$level,
        messages = _ref.messages,
        messageSource = _ref.messageSource;
      return show(level, messages, options.trustedTypesPolicyName, messageSource);
    },
    hideOverlay: hide
  });
  if (options.catchRuntimeError) {
    /**
     * @param {Error | undefined} error
     * @param {string} fallbackMessage
     */
    var handleError = function handleError(error, fallbackMessage) {
      var errorObject = error instanceof Error ? error : new Error(error || fallbackMessage);
      var shouldDisplay = typeof options.catchRuntimeError === "function" ? options.catchRuntimeError(errorObject) : true;
      if (shouldDisplay) {
        overlayService.send({
          type: "RUNTIME_ERROR",
          messages: [{
            message: errorObject.message,
            stack: (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.parseErrorToStacks)(errorObject)
          }]
        });
      }
    };
    (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.listenToRuntimeError)(function (errorEvent) {
      // error property may be empty in older browser like IE
      var error = errorEvent.error,
        message = errorEvent.message;
      if (!error && !message) {
        return;
      }
      handleError(error, message);
    });
    (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.listenToUnhandledRejection)(function (promiseRejectionEvent) {
      var reason = promiseRejectionEvent.reason;
      handleError(reason, "Unknown promise rejection reason");
    });
  }
  return overlayService;
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/fsm.js":
/*!***************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/fsm.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * @typedef {Object} StateDefinitions
 * @property {{[event: string]: { target: string; actions?: Array<string> }}} [on]
 */

/**
 * @typedef {Object} Options
 * @property {{[state: string]: StateDefinitions}} states
 * @property {object} context;
 * @property {string} initial
 */

/**
 * @typedef {Object} Implementation
 * @property {{[actionName: string]: (ctx: object, event: any) => object}} actions
 */

/**
 * A simplified `createMachine` from `@xstate/fsm` with the following differences:
 *
 *  - the returned machine is technically a "service". No `interpret(machine).start()` is needed.
 *  - the state definition only support `on` and target must be declared with { target: 'nextState', actions: [] } explicitly.
 *  - event passed to `send` must be an object with `type` property.
 *  - actions implementation will be [assign action](https://xstate.js.org/docs/guides/context.html#assign-action) if you return any value.
 *  Do not return anything if you just want to invoke side effect.
 *
 * The goal of this custom function is to avoid installing the entire `'xstate/fsm'` package, while enabling modeling using
 * state machine. You can copy the first parameter into the editor at https://stately.ai/viz to visualize the state machine.
 *
 * @param {Options} options
 * @param {Implementation} implementation
 */
function createMachine(_ref, _ref2) {
  var states = _ref.states,
    context = _ref.context,
    initial = _ref.initial;
  var actions = _ref2.actions;
  var currentState = initial;
  var currentContext = context;
  return {
    send: function send(event) {
      var currentStateOn = states[currentState].on;
      var transitionConfig = currentStateOn && currentStateOn[event.type];
      if (transitionConfig) {
        currentState = transitionConfig.target;
        if (transitionConfig.actions) {
          transitionConfig.actions.forEach(function (actName) {
            var actionImpl = actions[actName];
            var nextContextValue = actionImpl && actionImpl(currentContext, event);
            if (nextContextValue) {
              currentContext = _objectSpread(_objectSpread({}, currentContext), nextContextValue);
            }
          });
        }
      }
    }
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createMachine);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/runtime-error.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/runtime-error.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   listenToRuntimeError: () => (/* binding */ listenToRuntimeError),
/* harmony export */   listenToUnhandledRejection: () => (/* binding */ listenToUnhandledRejection),
/* harmony export */   parseErrorToStacks: () => (/* binding */ parseErrorToStacks)
/* harmony export */ });
/**
 *
 * @param {Error} error
 */
function parseErrorToStacks(error) {
  if (!error || !(error instanceof Error)) {
    throw new Error("parseErrorToStacks expects Error object");
  }
  if (typeof error.stack === "string") {
    return error.stack.split("\n").filter(function (stack) {
      return stack !== "Error: ".concat(error.message);
    });
  }
}

/**
 * @callback ErrorCallback
 * @param {ErrorEvent} error
 * @returns {void}
 */

/**
 * @param {ErrorCallback} callback
 */
function listenToRuntimeError(callback) {
  window.addEventListener("error", callback);
  return function cleanup() {
    window.removeEventListener("error", callback);
  };
}

/**
 * @callback UnhandledRejectionCallback
 * @param {PromiseRejectionEvent} rejectionEvent
 * @returns {void}
 */

/**
 * @param {UnhandledRejectionCallback} callback
 */
function listenToUnhandledRejection(callback) {
  window.addEventListener("unhandledrejection", callback);
  return function cleanup() {
    window.removeEventListener("unhandledrejection", callback);
  };
}


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/state-machine.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/state-machine.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _fsm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fsm.js */ "./node_modules/webpack-dev-server/client/overlay/fsm.js");


/**
 * @typedef {Object} ShowOverlayData
 * @property {'warning' | 'error'} level
 * @property {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages
 * @property {'build' | 'runtime'} messageSource
 */

/**
 * @typedef {Object} CreateOverlayMachineOptions
 * @property {(data: ShowOverlayData) => void} showOverlay
 * @property {() => void} hideOverlay
 */

/**
 * @param {CreateOverlayMachineOptions} options
 */
var createOverlayMachine = function createOverlayMachine(options) {
  var hideOverlay = options.hideOverlay,
    showOverlay = options.showOverlay;
  var overlayMachine = (0,_fsm_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    initial: "hidden",
    context: {
      level: "error",
      messages: [],
      messageSource: "build"
    },
    states: {
      hidden: {
        on: {
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["setMessages", "showOverlay"]
          },
          RUNTIME_ERROR: {
            target: "displayRuntimeError",
            actions: ["setMessages", "showOverlay"]
          }
        }
      },
      displayBuildError: {
        on: {
          DISMISS: {
            target: "hidden",
            actions: ["dismissMessages", "hideOverlay"]
          },
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["appendMessages", "showOverlay"]
          }
        }
      },
      displayRuntimeError: {
        on: {
          DISMISS: {
            target: "hidden",
            actions: ["dismissMessages", "hideOverlay"]
          },
          RUNTIME_ERROR: {
            target: "displayRuntimeError",
            actions: ["appendMessages", "showOverlay"]
          },
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["setMessages", "showOverlay"]
          }
        }
      }
    }
  }, {
    actions: {
      dismissMessages: function dismissMessages() {
        return {
          messages: [],
          level: "error",
          messageSource: "build"
        };
      },
      appendMessages: function appendMessages(context, event) {
        return {
          messages: context.messages.concat(event.messages),
          level: event.level || context.level,
          messageSource: event.type === "RUNTIME_ERROR" ? "runtime" : "build"
        };
      },
      setMessages: function setMessages(context, event) {
        return {
          messages: event.messages,
          level: event.level || context.level,
          messageSource: event.type === "RUNTIME_ERROR" ? "runtime" : "build"
        };
      },
      hideOverlay: hideOverlay,
      showOverlay: showOverlay
    }
  });
  return overlayMachine;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createOverlayMachine);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/styles.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/styles.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   containerStyle: () => (/* binding */ containerStyle),
/* harmony export */   dismissButtonStyle: () => (/* binding */ dismissButtonStyle),
/* harmony export */   headerStyle: () => (/* binding */ headerStyle),
/* harmony export */   iframeStyle: () => (/* binding */ iframeStyle),
/* harmony export */   msgStyles: () => (/* binding */ msgStyles),
/* harmony export */   msgTextStyle: () => (/* binding */ msgTextStyle),
/* harmony export */   msgTypeStyle: () => (/* binding */ msgTypeStyle)
/* harmony export */ });
// styles are inspired by `react-error-overlay`

var msgStyles = {
  error: {
    backgroundColor: "rgba(206, 17, 38, 0.1)",
    color: "#fccfcf"
  },
  warning: {
    backgroundColor: "rgba(251, 245, 180, 0.1)",
    color: "#fbf5b4"
  }
};
var iframeStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100vh",
  border: "none",
  "z-index": 9999999999
};
var containerStyle = {
  position: "fixed",
  boxSizing: "border-box",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100vh",
  fontSize: "large",
  padding: "2rem 2rem 4rem 2rem",
  lineHeight: "1.2",
  whiteSpace: "pre-wrap",
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  color: "white"
};
var headerStyle = {
  color: "#e83b46",
  fontSize: "2em",
  whiteSpace: "pre-wrap",
  fontFamily: "sans-serif",
  margin: "0 2rem 2rem 0",
  flex: "0 0 auto",
  maxHeight: "50%",
  overflow: "auto"
};
var dismissButtonStyle = {
  color: "#ffffff",
  lineHeight: "1rem",
  fontSize: "1.5rem",
  padding: "1rem",
  cursor: "pointer",
  position: "absolute",
  right: 0,
  top: 0,
  backgroundColor: "transparent",
  border: "none"
};
var msgTypeStyle = {
  color: "#e83b46",
  fontSize: "1.2em",
  marginBottom: "1rem",
  fontFamily: "sans-serif"
};
var msgTextStyle = {
  lineHeight: "1.5",
  fontSize: "1rem",
  fontFamily: "Menlo, Consolas, monospace"
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!**********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/socket.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   client: () => (/* binding */ client),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* global __webpack_dev_server_client__ */




// this WebsocketClient is here as a default fallback, in case the client is not injected
/* eslint-disable camelcase */
var Client =
// eslint-disable-next-line no-nested-ternary
typeof __webpack_dev_server_client__ !== "undefined" ? typeof __webpack_dev_server_client__.default !== "undefined" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__["default"];
/* eslint-enable camelcase */

var retries = 0;
var maxRetries = 10;

// Initialized client is exported so external consumers can utilize the same instance
// It is mutable to enforce singleton
// eslint-disable-next-line import/no-mutable-exports
var client = null;

/**
 * @param {string} url
 * @param {{ [handler: string]: (data?: any, params?: any) => any }} handlers
 * @param {number} [reconnect]
 */
var socket = function initSocket(url, handlers, reconnect) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;
    if (typeof reconnect !== "undefined") {
      maxRetries = reconnect;
    }
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    }

    // Try to reconnect.
    client = null;

    // After 10 retries stop trying, to prevent logspam.
    if (retries < maxRetries) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      _utils_log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("Trying to reconnect...");
      setTimeout(function () {
        socket(url, handlers, reconnect);
      }, retryInMs);
    }
  });
  client.onMessage(
  /**
   * @param {any} data
   */
  function (data) {
    var message = JSON.parse(data);
    if (handlers[message.type]) {
      handlers[message.type](message.data, message.params);
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/createSocketURL.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @param {{ protocol?: string, auth?: string, hostname?: string, port?: string, pathname?: string, search?: string, hash?: string, slashes?: boolean }} objURL
 * @returns {string}
 */
function format(objURL) {
  var protocol = objURL.protocol || "";
  if (protocol && protocol.substr(-1) !== ":") {
    protocol += ":";
  }
  var auth = objURL.auth || "";
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }
  var host = "";
  if (objURL.hostname) {
    host = auth + (objURL.hostname.indexOf(":") === -1 ? objURL.hostname : "[".concat(objURL.hostname, "]"));
    if (objURL.port) {
      host += ":".concat(objURL.port);
    }
  }
  var pathname = objURL.pathname || "";
  if (objURL.slashes) {
    host = "//".concat(host || "");
    if (pathname && pathname.charAt(0) !== "/") {
      pathname = "/".concat(pathname);
    }
  } else if (!host) {
    host = "";
  }
  var search = objURL.search || "";
  if (search && search.charAt(0) !== "?") {
    search = "?".concat(search);
  }
  var hash = objURL.hash || "";
  if (hash && hash.charAt(0) !== "#") {
    hash = "#".concat(hash);
  }
  pathname = pathname.replace(/[?#]/g,
  /**
   * @param {string} match
   * @returns {string}
   */
  function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace("#", "%23");
  return "".concat(protocol).concat(host).concat(pathname).concat(search).concat(hash);
}

/**
 * @param {URL & { fromCurrentScript?: boolean }} parsedURL
 * @returns {string}
 */
function createSocketURL(parsedURL) {
  var hostname = parsedURL.hostname;

  // Node.js module parses it as `::`
  // `new URL(urlString, [baseURLString])` parses it as '[::]'
  var isInAddrAny = hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]";

  // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384
  if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf("http") === 0) {
    hostname = self.location.hostname;
  }
  var socketURLProtocol = parsedURL.protocol || self.location.protocol;

  // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.
  if (socketURLProtocol === "auto:" || hostname && isInAddrAny && self.location.protocol === "https:") {
    socketURLProtocol = self.location.protocol;
  }
  socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, "ws");
  var socketURLAuth = "";

  // `new URL(urlString, [baseURLstring])` doesn't have `auth` property
  // Parse authentication credentials in case we need them
  if (parsedURL.username) {
    socketURLAuth = parsedURL.username;

    // Since HTTP basic authentication does not allow empty username,
    // we only include password if the username is not empty.
    if (parsedURL.password) {
      // Result: <username>:<password>
      socketURLAuth = socketURLAuth.concat(":", parsedURL.password);
    }
  }

  // In case the host is a raw IPv6 address, it can be enclosed in
  // the brackets as the brackets are needed in the final URL string.
  // Need to remove those as url.format blindly adds its own set of brackets
  // if the host string contains colons. That would lead to non-working
  // double brackets (e.g. [[::]]) host
  //
  // All of these web socket url params are optionally passed in through resourceQuery,
  // so we need to fall back to the default if they are not provided
  var socketURLHostname = (hostname || self.location.hostname || "localhost").replace(/^\[(.*)\]$/, "$1");
  var socketURLPort = parsedURL.port;
  if (!socketURLPort || socketURLPort === "0") {
    socketURLPort = self.location.port;
  }

  // If path is provided it'll be passed in via the resourceQuery as a
  // query param so it has to be parsed out of the querystring in order for the
  // client to open the socket to the correct location.
  var socketURLPathname = "/ws";
  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {
    socketURLPathname = parsedURL.pathname;
  }
  return format({
    protocol: socketURLProtocol,
    auth: socketURLAuth,
    hostname: socketURLHostname,
    port: socketURLPort,
    pathname: socketURLPathname,
    slashes: true
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createSocketURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
/*!********************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @returns {string}
 */
function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute("src");
  }

  // Fallback to getting all scripts running in the document.
  var scriptElements = document.scripts || [];
  var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {
    return element.getAttribute("src");
  });
  if (scriptElementsWithSrc.length > 0) {
    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];
    return currentScript.getAttribute("src");
  }

  // Fail as there was no script to use.
  throw new Error("[webpack-dev-server] Failed to get current script source.");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getCurrentScriptSource);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!*************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   log: () => (/* binding */ log),
/* harmony export */   logEnabledFeatures: () => (/* binding */ logEnabledFeatures),
/* harmony export */   setLogLevel: () => (/* binding */ setLogLevel)
/* harmony export */ });
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */ "./node_modules/webpack-dev-server/client/modules/logger/index.js");
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);

var name = "webpack-dev-server";
// default level is set on the client side, so it does not need
// to be set by the CLI or API
var defaultLevel = "info";

// options new options, merge with old options
/**
 * @param {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} level
 * @returns {void}
 */
function setLogLevel(level) {
  _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({
    level: level
  });
}
setLogLevel(defaultLevel);
var log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);
var logEnabledFeatures = function logEnabledFeatures(features) {
  var enabledFeatures = Object.keys(features);
  if (!features || enabledFeatures.length === 0) {
    return;
  }
  var logString = "Server started:";

  // Server started: Hot Module Replacement enabled, Live Reloading enabled, Overlay disabled.
  for (var i = 0; i < enabledFeatures.length; i++) {
    var key = enabledFeatures[i];
    logString += " ".concat(key, " ").concat(features[key] ? "enabled" : "disabled", ",");
  }
  // replace last comma with a period
  logString = logString.slice(0, -1).concat(".");
  log.info(logString);
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/parseURL.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/parseURL.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCurrentScriptSource.js */ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");


/**
 * @param {string} resourceQuery
 * @returns {{ [key: string]: string | boolean }}
 */
function parseURL(resourceQuery) {
  /** @type {{ [key: string]: string }} */
  var options = {};
  if (typeof resourceQuery === "string" && resourceQuery !== "") {
    var searchParams = resourceQuery.slice(1).split("&");
    for (var i = 0; i < searchParams.length; i++) {
      var pair = searchParams[i].split("=");
      options[pair[0]] = decodeURIComponent(pair[1]);
    }
  } else {
    // Else, get the url from the <script> this file was called with.
    var scriptSource = (0,_getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    var scriptSourceURL;
    try {
      // The placeholder `baseURL` with `window.location.href`,
      // is to allow parsing of path-relative or protocol-relative URLs,
      // and will have no effect if `scriptSource` is a fully valid URL.
      scriptSourceURL = new URL(scriptSource, self.location.href);
    } catch (error) {
      // URL parsing failed, do nothing.
      // We will still proceed to see if we can recover using `resourceQuery`
    }
    if (scriptSourceURL) {
      options = scriptSourceURL;
      options.fromCurrentScript = true;
    }
  }
  return options;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/reloadApp.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/emitter.js */ "./node_modules/webpack/hot/emitter.js");
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");



/** @typedef {import("../index").Options} Options
/** @typedef {import("../index").Status} Status

/**
 * @param {Options} options
 * @param {Status} status
 */
function reloadApp(_ref, status) {
  var hot = _ref.hot,
    liveReload = _ref.liveReload;
  if (status.isUnloading) {
    return;
  }
  var currentHash = status.currentHash,
    previousHash = status.previousHash;
  var isInitial = currentHash.indexOf( /** @type {string} */previousHash) >= 0;
  if (isInitial) {
    return;
  }

  /**
   * @param {Window} rootWindow
   * @param {number} intervalId
   */
  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App updated. Reloading...");
    rootWindow.location.reload();
  }
  var search = self.location.search.toLowerCase();
  var allowToHot = search.indexOf("webpack-dev-server-hot=false") === -1;
  var allowToLiveReload = search.indexOf("webpack-dev-server-live-reload=false") === -1;
  if (hot && allowToHot) {
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App hot update...");
    webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default().emit("webpackHotUpdate", status.currentHash);
    if (typeof self !== "undefined" && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(status.currentHash), "*");
    }
  }
  // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload && allowToLiveReload) {
    var rootWindow = self;

    // use parent window for reload (in case we're in an iframe with no valid src)
    var intervalId = self.setInterval(function () {
      if (rootWindow.location.protocol !== "about:") {
        // reload immediately if protocol is valid
        applyReload(rootWindow, intervalId);
      } else {
        rootWindow = rootWindow.parent;
        if (rootWindow.parent === rootWindow) {
          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
          applyReload(rootWindow, intervalId);
        }
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reloadApp);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* global __resourceQuery WorkerGlobalScope */

// Send messages to the outside, so plugins can consume it.
/**
 * @param {string} type
 * @param {any} [data]
 */
function sendMsg(type, data) {
  if (typeof self !== "undefined" && (typeof WorkerGlobalScope === "undefined" || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: "webpack".concat(type),
      data: data
    }, "*");
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendMsg);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/stripAnsi.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/stripAnsi.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ansiRegex = new RegExp(["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|"), "g");

/**
 *
 * Strip [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code) from a string.
 * Adapted from code originally released by Sindre Sorhus
 * Licensed the MIT License
 *
 * @param {string} string
 * @return {string}
 */
function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a `string`, got `".concat(typeof string, "`"));
  }
  return string.replace(ansiRegex, "");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stripAnsi);

/***/ }),

/***/ "./node_modules/webpack/hot/dev-server.js":
/*!************************************************!*\
  !*** ./node_modules/webpack/hot/dev-server.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/* globals __webpack_hash__ */
if (true) {
	/** @type {undefined|string} */
	var lastHash;
	var upToDate = function upToDate() {
		return /** @type {string} */ (lastHash).indexOf(__webpack_require__.h()) >= 0;
	};
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
	var check = function check() {
		module.hot
			.check(true)
			.then(function (updatedModules) {
				if (!updatedModules) {
					log(
						"warning",
						"[HMR] Cannot find update. " +
							(typeof window !== "undefined"
								? "Need to do a full reload!"
								: "Please reload manually!")
					);
					log(
						"warning",
						"[HMR] (Probably because of restarting the webpack-dev-server)"
					);
					if (typeof window !== "undefined") {
						window.location.reload();
					}
					return;
				}

				if (!upToDate()) {
					check();
				}

				__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);

				if (upToDate()) {
					log("info", "[HMR] App is up to date.");
				}
			})
			.catch(function (err) {
				var status = module.hot.status();
				if (["abort", "fail"].indexOf(status) >= 0) {
					log(
						"warning",
						"[HMR] Cannot apply update. " +
							(typeof window !== "undefined"
								? "Need to do a full reload!"
								: "Please reload manually!")
					);
					log("warning", "[HMR] " + log.formatError(err));
					if (typeof window !== "undefined") {
						window.location.reload();
					}
				} else {
					log("warning", "[HMR] Update failed: " + log.formatError(err));
				}
			});
	};
	var hotEmitter = __webpack_require__(/*! ./emitter */ "./node_modules/webpack/hot/emitter.js");
	hotEmitter.on("webpackHotUpdate", function (currentHash) {
		lastHash = currentHash;
		if (!upToDate() && module.hot.status() === "idle") {
			log("info", "[HMR] Checking for updates on the server...");
			check();
		}
	});
	log("info", "[HMR] Waiting for update signal from WDS...");
} else {}


/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
module.exports = new EventEmitter();


/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!******************************************************!*\
  !*** ./node_modules/webpack/hot/log-apply-result.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

/**
 * @param {(string | number)[]} updatedModules updated modules
 * @param {(string | number)[] | null} renewedModules renewed modules
 */
module.exports = function (updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function (moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function (moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function (moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function (moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				'[HMR] Consider using the optimization.moduleIds: "named" for module names.'
			);
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
/***/ ((module) => {

/** @typedef {"info" | "warning" | "error"} LogLevel */

/** @type {LogLevel} */
var logLevel = "info";

function dummy() {}

/**
 * @param {LogLevel} level log level
 * @returns {boolean} true, if should log
 */
function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

/**
 * @param {(msg?: string) => void} logFn log function
 * @returns {(level: LogLevel, msg?: string) => void} function that logs when log level is sufficient
 */
function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

/**
 * @param {LogLevel} level log level
 * @param {string|Error} msg message
 */
module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

/**
 * @param {LogLevel} level log level
 */
module.exports.setLogLevel = function (level) {
	logLevel = level;
};

/**
 * @param {Error} err error
 * @returns {string} formatted error
 */
module.exports.formatError = function (err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),

/***/ "quill":
/*!************************!*\
  !*** external "Quill" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_quill__;

/***/ }),

/***/ "./src/emoji-list.js":
/*!***************************!*\
  !*** ./src/emoji-list.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var emojiList = [{
  "name": "100",
  "unicode": "1f4af",
  "shortname": ":100:",
  "code_decimal": "&#128175;",
  "category": "s",
  "emoji_order": "2119"
}, {
  "name": "1234",
  "unicode": "1f522",
  "shortname": ":1234:",
  "code_decimal": "&#128290;",
  "category": "s",
  "emoji_order": "2122"
}, {
  "name": "grinning",
  "unicode": "1f600",
  "shortname": ":grinning:",
  "code_decimal": "&#128512;",
  "category": "p",
  "emoji_order": "1"
}, {
  "name": "grin",
  "unicode": "1f601",
  "shortname": ":grin:",
  "code_decimal": "&#128513;",
  "category": "p",
  "emoji_order": "2"
}, {
  "name": "joy",
  "unicode": "1f602",
  "shortname": ":joy:",
  "code_decimal": "&#128514;",
  "category": "p",
  "emoji_order": "3"
},
/* ///@todo not found on image{
  "name": "rolling_on_the_floor_laughing",
  "unicode": "1f923",
  "shortname": ":rofl:",
  "code_decimal": "&#129315;",
  "category": "p",
  "emoji_order": "4"
},*/
{
  "name": "smiley",
  "unicode": "1f603",
  "shortname": ":smiley:",
  "code_decimal": "&#128515;",
  "category": "p",
  "emoji_order": "5"
}, {
  "name": "smile",
  "unicode": "1f604",
  "shortname": ":smile:",
  "code_decimal": "&#128516;",
  "category": "p",
  "emoji_order": "6"
}, {
  "name": "sweat_smile",
  "unicode": "1f605",
  "shortname": ":sweat_smile:",
  "code_decimal": "&#128517;",
  "category": "p",
  "emoji_order": "7"
}, {
  "name": "laughing",
  "unicode": "1f606",
  "shortname": ":laughing:",
  "code_decimal": "&#128518;",
  "category": "p",
  "emoji_order": "8"
}, {
  "name": "wink",
  "unicode": "1f609",
  "shortname": ":wink:",
  "code_decimal": "&#128521;",
  "category": "p",
  "emoji_order": "9"
}, {
  "name": "blush",
  "unicode": "1f60a",
  "shortname": ":blush:",
  "code_decimal": "&#128522;",
  "category": "p",
  "emoji_order": "10"
}, {
  "name": "yum",
  "unicode": "1f60b",
  "shortname": ":yum:",
  "code_decimal": "&#128523;",
  "category": "p",
  "emoji_order": "11"
}, {
  "name": "sunglasses",
  "unicode": "1f60e",
  "shortname": ":sunglasses:",
  "code_decimal": "&#128526;",
  "category": "p",
  "emoji_order": "12"
}, {
  "name": "heart_eyes",
  "unicode": "1f60d",
  "shortname": ":heart_eyes:",
  "code_decimal": "&#128525;",
  "category": "p",
  "emoji_order": "13"
}, {
  "name": "kissing_heart",
  "unicode": "1f618",
  "shortname": ":kissing_heart:",
  "code_decimal": "&#128536;",
  "category": "p",
  "emoji_order": "14"
}, {
  "name": "kissing",
  "unicode": "1f617",
  "shortname": ":kissing:",
  "code_decimal": "&#128535;",
  "category": "p",
  "emoji_order": "15"
}, {
  "name": "kissing_smiling_eyes",
  "unicode": "1f619",
  "shortname": ":kissing_smiling_eyes:",
  "code_decimal": "&#128537;",
  "category": "p",
  "emoji_order": "16"
}, {
  "name": "kissing_closed_eyes",
  "unicode": "1f61a",
  "shortname": ":kissing_closed_eyes:",
  "code_decimal": "&#128538;",
  "category": "p",
  "emoji_order": "17"
}, {
  "name": "slightly_smiling_face",
  "unicode": "1f642",
  "shortname": ":slight_smile:",
  "code_decimal": "&#128578;",
  "category": "p",
  "emoji_order": "19"
}, {
  "name": "hugging_face",
  "unicode": "1f917",
  "shortname": ":hugging:",
  "code_decimal": "&#129303;",
  "category": "p",
  "emoji_order": "20"
}, {
  "name": "thinking_face",
  "unicode": "1f914",
  "shortname": ":thinking:",
  "code_decimal": "&#129300;",
  "category": "p",
  "emoji_order": "21"
}, {
  "name": "neutral_face",
  "unicode": "1f610",
  "shortname": ":neutral_face:",
  "code_decimal": "&#128528;",
  "category": "p",
  "emoji_order": "22"
}, {
  "name": "expressionless",
  "unicode": "1f611",
  "shortname": ":expressionless:",
  "code_decimal": "&#128529;",
  "category": "p",
  "emoji_order": "23"
}, {
  "name": "no_mouth",
  "unicode": "1f636",
  "shortname": ":no_mouth:",
  "code_decimal": "&#128566;",
  "category": "p",
  "emoji_order": "24"
}, {
  "name": "face_with_rolling_eyes",
  "unicode": "1f644",
  "shortname": ":rolling_eyes:",
  "code_decimal": "&#128580;",
  "category": "p",
  "emoji_order": "25"
}, {
  "name": "smirk",
  "unicode": "1f60f",
  "shortname": ":smirk:",
  "code_decimal": "&#128527;",
  "category": "p",
  "emoji_order": "26"
}, {
  "name": "persevere",
  "unicode": "1f623",
  "shortname": ":persevere:",
  "code_decimal": "&#128547;",
  "category": "p",
  "emoji_order": "27"
}, {
  "name": "disappointed_relieved",
  "unicode": "1f625",
  "shortname": ":disappointed_relieved:",
  "code_decimal": "&#128549;",
  "category": "p",
  "emoji_order": "28"
}, {
  "name": "open_mouth",
  "unicode": "1f62e",
  "shortname": ":open_mouth:",
  "code_decimal": "&#128558;",
  "category": "p",
  "emoji_order": "29"
}, {
  "name": "zipper_mouth_face",
  "unicode": "1f910",
  "shortname": ":zipper_mouth:",
  "code_decimal": "&#129296;",
  "category": "p",
  "emoji_order": "30"
}, {
  "name": "hushed",
  "unicode": "1f62f",
  "shortname": ":hushed:",
  "code_decimal": "&#128559;",
  "category": "p",
  "emoji_order": "31"
}, {
  "name": "sleepy",
  "unicode": "1f62a",
  "shortname": ":sleepy:",
  "code_decimal": "&#128554;",
  "category": "p",
  "emoji_order": "32"
}, {
  "name": "tired_face",
  "unicode": "1f62b",
  "shortname": ":tired_face:",
  "code_decimal": "&#128555;",
  "category": "p",
  "emoji_order": "33"
}, {
  "name": "sleeping",
  "unicode": "1f634",
  "shortname": ":sleeping:",
  "code_decimal": "&#128564;",
  "category": "p",
  "emoji_order": "34"
}, {
  "name": "relieved",
  "unicode": "1f60c",
  "shortname": ":relieved:",
  "code_decimal": "&#128524;",
  "category": "p",
  "emoji_order": "35"
}, {
  "name": "nerd_face",
  "unicode": "1f913",
  "shortname": ":nerd:",
  "code_decimal": "&#129299;",
  "category": "p",
  "emoji_order": "36"
}, {
  "name": "stuck_out_tongue",
  "unicode": "1f61b",
  "shortname": ":stuck_out_tongue:",
  "code_decimal": "&#128539;",
  "category": "p",
  "emoji_order": "37"
}, {
  "name": "stuck_out_tongue_winking_eye",
  "unicode": "1f61c",
  "shortname": ":stuck_out_tongue_winking_eye:",
  "code_decimal": "&#128540;",
  "category": "p",
  "emoji_order": "38"
}, {
  "name": "stuck_out_tongue_closed_eyes",
  "unicode": "1f61d",
  "shortname": ":stuck_out_tongue_closed_eyes:",
  "code_decimal": "&#128541;",
  "category": "p",
  "emoji_order": "39"
},
/*{ //@todo not found on image
  "name": "drooling_face",
  "unicode": "1f924",
  "shortname": ":drooling_face:",
  "code_decimal": "&#129316;",
  "category": "p",
  "emoji_order": "40"
},*/
{
  "name": "unamused",
  "unicode": "1f612",
  "shortname": ":unamused:",
  "code_decimal": "&#128530;",
  "category": "p",
  "emoji_order": "41"
}, {
  "name": "sweat",
  "unicode": "1f613",
  "shortname": ":sweat:",
  "code_decimal": "&#128531;",
  "category": "p",
  "emoji_order": "42"
}, {
  "name": "pensive",
  "unicode": "1f614",
  "shortname": ":pensive:",
  "code_decimal": "&#128532;",
  "category": "p",
  "emoji_order": "43"
}, {
  "name": "confused",
  "unicode": "1f615",
  "shortname": ":confused:",
  "code_decimal": "&#128533;",
  "category": "p",
  "emoji_order": "44"
}, {
  "name": "upside_down_face",
  "unicode": "1f643",
  "shortname": ":upside_down:",
  "code_decimal": "&#128579;",
  "category": "p",
  "emoji_order": "45"
}, {
  "name": "money_mouth_face",
  "unicode": "1f911",
  "shortname": ":money_mouth:",
  "code_decimal": "&#129297;",
  "category": "p",
  "emoji_order": "46"
}, {
  "name": "astonished",
  "unicode": "1f632",
  "shortname": ":astonished:",
  "code_decimal": "&#128562;",
  "category": "p",
  "emoji_order": "47"
}, {
  "name": "slightly_frowning_face",
  "unicode": "1f641",
  "shortname": ":slight_frown:",
  "code_decimal": "&#128577;",
  "category": "p",
  "emoji_order": "49"
}, {
  "name": "confounded",
  "unicode": "1f616",
  "shortname": ":confounded:",
  "code_decimal": "&#128534;",
  "category": "p",
  "emoji_order": "50"
}, {
  "name": "disappointed",
  "unicode": "1f61e",
  "shortname": ":disappointed:",
  "code_decimal": "&#128542;",
  "category": "p",
  "emoji_order": "51"
}, {
  "name": "worried",
  "unicode": "1f61f",
  "shortname": ":worried:",
  "code_decimal": "&#128543;",
  "category": "p",
  "emoji_order": "52"
}, {
  "name": "triumph",
  "unicode": "1f624",
  "shortname": ":triumph:",
  "code_decimal": "&#128548;",
  "category": "p",
  "emoji_order": "53"
}, {
  "name": "cry",
  "unicode": "1f622",
  "shortname": ":cry:",
  "code_decimal": "&#128546;",
  "category": "p",
  "emoji_order": "54"
}, {
  "name": "sob",
  "unicode": "1f62d",
  "shortname": ":sob:",
  "code_decimal": "&#128557;",
  "category": "p",
  "emoji_order": "55"
}, {
  "name": "frowning",
  "unicode": "1f626",
  "shortname": ":frowning:",
  "code_decimal": "&#128550;",
  "category": "p",
  "emoji_order": "56"
}, {
  "name": "anguished",
  "unicode": "1f627",
  "shortname": ":anguished:",
  "code_decimal": "&#128551;",
  "category": "p",
  "emoji_order": "57"
}, {
  "name": "fearful",
  "unicode": "1f628",
  "shortname": ":fearful:",
  "code_decimal": "&#128552;",
  "category": "p",
  "emoji_order": "58"
}, {
  "name": "weary",
  "unicode": "1f629",
  "shortname": ":weary:",
  "code_decimal": "&#128553;",
  "category": "p",
  "emoji_order": "59"
}, {
  "name": "grimacing",
  "unicode": "1f62c",
  "shortname": ":grimacing:",
  "code_decimal": "&#128556;",
  "category": "p",
  "emoji_order": "60"
}, {
  "name": "cold_sweat",
  "unicode": "1f630",
  "shortname": ":cold_sweat:",
  "code_decimal": "&#128560;",
  "category": "p",
  "emoji_order": "61"
}, {
  "name": "scream",
  "unicode": "1f631",
  "shortname": ":scream:",
  "code_decimal": "&#128561;",
  "category": "p",
  "emoji_order": "62"
}, {
  "name": "flushed",
  "unicode": "1f633",
  "shortname": ":flushed:",
  "code_decimal": "&#128563;",
  "category": "p",
  "emoji_order": "63"
}, {
  "name": "dizzy_face",
  "unicode": "1f635",
  "shortname": ":dizzy_face:",
  "code_decimal": "&#128565;",
  "category": "p",
  "emoji_order": "64"
}, {
  "name": "rage",
  "unicode": "1f621",
  "shortname": ":rage:",
  "code_decimal": "&#128545;",
  "category": "p",
  "emoji_order": "65"
}, {
  "name": "angry",
  "unicode": "1f620",
  "shortname": ":angry:",
  "code_decimal": "&#128544;",
  "category": "p",
  "emoji_order": "66"
}, {
  "name": "innocent",
  "unicode": "1f607",
  "shortname": ":innocent:",
  "code_decimal": "&#128519;",
  "category": "p",
  "emoji_order": "67"
},
/*{ //@todo not found on image
  "name": "face_with_cowboy_hat",
  "unicode": "1f920",
  "shortname": ":cowboy:",
  "code_decimal": "&#129312;",
  "category": "p",
  "emoji_order": "68"
},*/
/*{ //@todo not found on image
  "name": "clown_face",
  "unicode": "1f921",
  "shortname": ":clown:",
  "code_decimal": "&#129313;",
  "category": "p",
  "emoji_order": "69"
},*/
/*{ //@todo not founf on image
  "name": "lying_face",
  "unicode": "1f925",
  "shortname": ":lying_face:",
  "code_decimal": "&#129317;",
  "category": "p",
  "emoji_order": "70"
},*/
{
  "name": "mask",
  "unicode": "1f637",
  "shortname": ":mask:",
  "code_decimal": "&#128567;",
  "category": "p",
  "emoji_order": "71"
}, {
  "name": "face_with_thermometer",
  "unicode": "1f912",
  "shortname": ":thermometer_face:",
  "code_decimal": "&#129298;",
  "category": "p",
  "emoji_order": "72"
}, {
  "name": "face_with_head_bandage",
  "unicode": "1f915",
  "shortname": ":head_bandage:",
  "code_decimal": "&#129301;",
  "category": "p",
  "emoji_order": "73"
},
/*{ //@todo not found on image
  "name": "nauseated_face",
  "unicode": "1f922",
  "shortname": ":nauseated_face:",
  "code_decimal": "&#129314;",
  "category": "p",
  "emoji_order": "74"
},*/
/*{ //@todo not found on image
  "name": "sneezing_face",
  "unicode": "1f927",
  "shortname": ":sneezing_face:",
  "code_decimal": "&#129319;",
  "category": "p",
  "emoji_order": "75"
},*/
{
  "name": "smiling_imp",
  "unicode": "1f608",
  "shortname": ":smiling_imp:",
  "code_decimal": "&#128520;",
  "category": "p",
  "emoji_order": "76"
}, {
  "name": "imp",
  "unicode": "1f47f",
  "shortname": ":imp:",
  "code_decimal": "&#128127;",
  "category": "p",
  "emoji_order": "77"
}, {
  "name": "japanese_ogre",
  "unicode": "1f479",
  "shortname": ":japanese_ogre:",
  "code_decimal": "&#128121;",
  "category": "p",
  "emoji_order": "78"
}, {
  "name": "japanese_goblin",
  "unicode": "1f47a",
  "shortname": ":japanese_goblin:",
  "code_decimal": "&#128122;",
  "category": "p",
  "emoji_order": "79"
}, {
  "name": "skull",
  "unicode": "1f480",
  "shortname": ":skull:",
  "code_decimal": "&#128128;",
  "category": "p",
  "emoji_order": "80"
}, {
  "name": "skull_and_crossbones",
  "unicode": "2620",
  "shortname": ":skull_crossbones:",
  "code_decimal": "&#9760;",
  "category": "o",
  "emoji_order": "81"
}, {
  "name": "ghost",
  "unicode": "1f47b",
  "shortname": ":ghost:",
  "code_decimal": "&#128123;",
  "category": "p",
  "emoji_order": "82"
}, {
  "name": "alien",
  "unicode": "1f47d",
  "shortname": ":alien:",
  "code_decimal": "&#128125;",
  "category": "p",
  "emoji_order": "83"
}, {
  "name": "space_invader",
  "unicode": "1f47e",
  "shortname": ":space_invader:",
  "code_decimal": "&#128126;",
  "category": "a",
  "emoji_order": "84"
}, {
  "name": "robot_face",
  "unicode": "1f916",
  "shortname": ":robot:",
  "code_decimal": "&#129302;",
  "category": "p",
  "emoji_order": "85"
}, {
  "name": "hankey",
  "unicode": "1f4a9",
  "shortname": ":poop:",
  "code_decimal": "&#128169;",
  "category": "p",
  "emoji_order": "86"
}, {
  "name": "smiley_cat",
  "unicode": "1f63a",
  "shortname": ":smiley_cat:",
  "code_decimal": "&#128570;",
  "category": "p",
  "emoji_order": "87"
}, {
  "name": "smile_cat",
  "unicode": "1f638",
  "shortname": ":smile_cat:",
  "code_decimal": "&#128568;",
  "category": "p",
  "emoji_order": "88"
}, {
  "name": "joy_cat",
  "unicode": "1f639",
  "shortname": ":joy_cat:",
  "code_decimal": "&#128569;",
  "category": "p",
  "emoji_order": "89"
}, {
  "name": "heart_eyes_cat",
  "unicode": "1f63b",
  "shortname": ":heart_eyes_cat:",
  "code_decimal": "&#128571;",
  "category": "p",
  "emoji_order": "90"
}, {
  "name": "smirk_cat",
  "unicode": "1f63c",
  "shortname": ":smirk_cat:",
  "code_decimal": "&#128572;",
  "category": "p",
  "emoji_order": "91"
}, {
  "name": "kissing_cat",
  "unicode": "1f63d",
  "shortname": ":kissing_cat:",
  "code_decimal": "&#128573;",
  "category": "p",
  "emoji_order": "92"
}, {
  "name": "scream_cat",
  "unicode": "1f640",
  "shortname": ":scream_cat:",
  "code_decimal": "&#128576;",
  "category": "p",
  "emoji_order": "93"
}, {
  "name": "crying_cat_face",
  "unicode": "1f63f",
  "shortname": ":crying_cat_face:",
  "code_decimal": "&#128575;",
  "category": "p",
  "emoji_order": "94"
}, {
  "name": "pouting_cat",
  "unicode": "1f63e",
  "shortname": ":pouting_cat:",
  "code_decimal": "&#128574;",
  "category": "p",
  "emoji_order": "95"
}, {
  "name": "see_no_evil",
  "unicode": "1f648",
  "shortname": ":see_no_evil:",
  "code_decimal": "&#128584;",
  "category": "n",
  "emoji_order": "96"
}, {
  "name": "hear_no_evil",
  "unicode": "1f649",
  "shortname": ":hear_no_evil:",
  "code_decimal": "&#128585;",
  "category": "n",
  "emoji_order": "97"
}, {
  "name": "speak_no_evil",
  "unicode": "1f64a",
  "shortname": ":speak_no_evil:",
  "code_decimal": "&#128586;",
  "category": "n",
  "emoji_order": "98"
}, {
  "name": "boy",
  "unicode": "1f466",
  "shortname": ":boy:",
  "code_decimal": "&#128102;",
  "category": "p",
  "emoji_order": "99"
}, {
  "name": "girl",
  "unicode": "1f467",
  "shortname": ":girl:",
  "code_decimal": "&#128103;",
  "category": "p",
  "emoji_order": "105"
}, {
  "name": "man",
  "unicode": "1f468",
  "shortname": ":man:",
  "code_decimal": "&#128104;",
  "category": "p",
  "emoji_order": "111"
}, {
  "name": "woman",
  "unicode": "1f469",
  "shortname": ":woman:",
  "code_decimal": "&#128105;",
  "category": "p",
  "emoji_order": "117"
}, {
  "name": "older_man",
  "unicode": "1f474",
  "shortname": ":older_man:",
  "code_decimal": "&#128116;",
  "category": "p",
  "emoji_order": "123"
}, {
  "name": "older_woman",
  "unicode": "1f475",
  "shortname": ":older_woman:",
  "code_decimal": "&#128117;",
  "category": "p",
  "emoji_order": "129"
}, {
  "name": "baby",
  "unicode": "1f476",
  "shortname": ":baby:",
  "code_decimal": "&#128118;",
  "category": "p",
  "emoji_order": "135"
}, {
  "name": "angel",
  "unicode": "1f47c",
  "shortname": ":angel:",
  "code_decimal": "&#128124;",
  "category": "p",
  "emoji_order": "141"
}, {
  "name": "cop",
  "unicode": "1f46e",
  "shortname": ":cop:",
  "code_decimal": "&#128110;",
  "category": "p",
  "emoji_order": "339"
}, {
  "name": "sleuth_or_spy",
  "unicode": "1f575",
  "shortname": ":spy:",
  "code_decimal": "&#128373;",
  "category": "p",
  "emoji_order": "357"
}, {
  "name": "guardsman",
  "unicode": "1f482",
  "shortname": ":guardsman:",
  "code_decimal": "&#128130;",
  "category": "p",
  "emoji_order": "375"
}, {
  "name": "construction_worker",
  "unicode": "1f477",
  "shortname": ":construction_worker:",
  "code_decimal": "&#128119;",
  "category": "p",
  "emoji_order": "393"
}, {
  "name": "man_with_turban",
  "unicode": "1f473",
  "shortname": ":man_with_turban:",
  "code_decimal": "&#128115;",
  "category": "p",
  "emoji_order": "411"
}, {
  "name": "person_with_blond_hair",
  "unicode": "1f471",
  "shortname": ":person_with_blond_hair:",
  "code_decimal": "&#128113;",
  "category": "p",
  "emoji_order": "429"
}, {
  "name": "santa",
  "unicode": "1f385",
  "shortname": ":santa:",
  "code_decimal": "&#127877;",
  "category": "p",
  "emoji_order": "447"
},
/*{ //@todo not found on image
  "name": "mrs_claus",
  "unicode": "1f936",
  "shortname": ":mrs_claus:",
  "code_decimal": "&#129334;",
  "category": "p",
  "emoji_order": "453"
},*/
{
  "name": "princess",
  "unicode": "1f478",
  "shortname": ":princess:",
  "code_decimal": "&#128120;",
  "category": "p",
  "emoji_order": "459"
},
/*{ //@todo not found on image
  "name": "prince",
  "unicode": "1f934",
  "shortname": ":prince:",
  "code_decimal": "&#129332;",
  "category": "p",
  "emoji_order": "465"
},*/
{
  "name": "bride_with_veil",
  "unicode": "1f470",
  "shortname": ":bride_with_veil:",
  "code_decimal": "&#128112;",
  "category": "p",
  "emoji_order": "471"
},
/*{ //@todo not found on image
  "name": "man_in_tuxedo",
  "unicode": "1f935",
  "shortname": ":man_in_tuxedo:",
  "code_decimal": "&#129333;",
  "category": "p",
  "emoji_order": "477"
},*/
/*{ //@todo not found on image
  "name": "pregnant_woman",
  "unicode": "1f930",
  "shortname": ":pregnant_woman:",
  "code_decimal": "&#129328;",
  "category": "p",
  "emoji_order": "483"
},*/
{
  "name": "man_with_gua_pi_mao",
  "unicode": "1f472",
  "shortname": ":man_with_gua_pi_mao:",
  "code_decimal": "&#128114;",
  "category": "p",
  "emoji_order": "489"
}, {
  "name": "person_frowning",
  "unicode": "1f64d",
  "shortname": ":person_frowning:",
  "code_decimal": "&#128589;",
  "category": "p",
  "emoji_order": "495"
}, {
  "name": "person_with_pouting_face",
  "unicode": "1f64e",
  "shortname": ":person_with_pouting_face:",
  "code_decimal": "&#128590;",
  "category": "p",
  "emoji_order": "513"
}, {
  "name": "no_good",
  "unicode": "1f645",
  "shortname": ":no_good:",
  "code_decimal": "&#128581;",
  "category": "p",
  "emoji_order": "531"
}, {
  "name": "ok_woman",
  "unicode": "1f646",
  "shortname": ":ok_woman:",
  "code_decimal": "&#128582;",
  "category": "p",
  "emoji_order": "549"
}, {
  "name": "information_desk_person",
  "unicode": "1f481",
  "shortname": ":information_desk_person:",
  "code_decimal": "&#128129;",
  "category": "p",
  "emoji_order": "567"
}, {
  "name": "raising_hand",
  "unicode": "1f64b",
  "shortname": ":raising_hand:",
  "code_decimal": "&#128587;",
  "category": "p",
  "emoji_order": "585"
}, {
  "name": "bow",
  "unicode": "1f647",
  "shortname": ":bow:",
  "code_decimal": "&#128583;",
  "category": "p",
  "emoji_order": "603"
},
/*{ //@todo not found on image
  "name": "face_palm",
  "unicode": "1f926",
  "shortname": ":face_palm:",
  "code_decimal": "&#129318;",
  "category": "p",
  "emoji_order": "621"
},*/
/*{ //@todo not found on image
  "name": "shrug",
  "unicode": "1f937",
  "shortname": ":shrug:",
  "code_decimal": "&#129335;",
  "category": "p",
  "emoji_order": "639"
},*/
{
  "name": "massage",
  "unicode": "1f486",
  "shortname": ":massage:",
  "code_decimal": "&#128134;",
  "category": "p",
  "emoji_order": "657"
}, {
  "name": "haircut",
  "unicode": "1f487",
  "shortname": ":haircut:",
  "code_decimal": "&#128135;",
  "category": "p",
  "emoji_order": "675"
}, {
  "name": "walking",
  "unicode": "1f6b6",
  "shortname": ":walking:",
  "code_decimal": "&#128694;",
  "category": "p",
  "emoji_order": "693"
}, {
  "name": "runner",
  "unicode": "1f3c3",
  "shortname": ":runner:",
  "code_decimal": "&#127939;",
  "category": "p",
  "emoji_order": "711"
}, {
  "name": "dancer",
  "unicode": "1f483",
  "shortname": ":dancer:",
  "code_decimal": "&#128131;",
  "category": "p",
  "emoji_order": "729"
},
/*{ //@todo not found on image
  "name": "man_dancing",
  "unicode": "1f57a",
  "shortname": ":man_dancing:",
  "code_decimal": "&#128378;",
  "category": "p",
  "emoji_order": "735"
},*/
{
  "name": "dancers",
  "unicode": "1f46f",
  "shortname": ":dancers:",
  "code_decimal": "&#128111;",
  "category": "p",
  "emoji_order": "741"
}, {
  "name": "man_in_business_suit_levitating",
  "unicode": "1f574",
  "shortname": ":levitate:",
  "code_decimal": "&#128372;",
  "category": "a",
  "emoji_order": "759"
}, {
  "name": "speaking_head_in_silhouette",
  "unicode": "1f5e3",
  "shortname": ":speaking_head:",
  "code_decimal": "&#128483;",
  "category": "p",
  "emoji_order": "765"
}, {
  "name": "bust_in_silhouette",
  "unicode": "1f464",
  "shortname": ":bust_in_silhouette:",
  "code_decimal": "&#128100;",
  "category": "p",
  "emoji_order": "766"
}, {
  "name": "busts_in_silhouette",
  "unicode": "1f465",
  "shortname": ":busts_in_silhouette:",
  "code_decimal": "&#128101;",
  "category": "p",
  "emoji_order": "767"
},
/*{ //@todo not found on image
  "name": "fencer",
  "unicode": "1f93a",
  "shortname": ":fencer:",
  "code_decimal": "&#129338;",
  "category": "a",
  "emoji_order": "768"
},*/
{
  "name": "horse_racing",
  "unicode": "1f3c7",
  "shortname": ":horse_racing:",
  "code_decimal": "&#127943;",
  "category": "a",
  "emoji_order": "769"
}, {
  "name": "skier",
  "unicode": "26f7",
  "shortname": ":skier:",
  "code_decimal": "&#9975;",
  "category": "a",
  "emoji_order": "775"
}, {
  "name": "snowboarder",
  "unicode": "1f3c2",
  "shortname": ":snowboarder:",
  "code_decimal": "&#127938;",
  "category": "a",
  "emoji_order": "776"
}, {
  "name": "golfer",
  "unicode": "1f3cc",
  "shortname": ":golfer:",
  "code_decimal": "&#127948;",
  "category": "a",
  "emoji_order": "782"
}, {
  "name": "surfer",
  "unicode": "1f3c4",
  "shortname": ":surfer:",
  "code_decimal": "&#127940;",
  "category": "a",
  "emoji_order": "800"
}, {
  "name": "rowboat",
  "unicode": "1f6a3",
  "shortname": ":rowboat:",
  "code_decimal": "&#128675;",
  "category": "a",
  "emoji_order": "818"
}, {
  "name": "swimmer",
  "unicode": "1f3ca",
  "shortname": ":swimmer:",
  "code_decimal": "&#127946;",
  "category": "a",
  "emoji_order": "836"
}, {
  "name": "person_with_ball",
  "unicode": "26f9",
  "shortname": ":basketball_player:",
  "code_decimal": "&#9977;",
  "category": "a",
  "emoji_order": "854"
}, {
  "name": "weight_lifter",
  "unicode": "1f3cb",
  "shortname": ":lifter:",
  "code_decimal": "&#127947;",
  "category": "a",
  "emoji_order": "872"
}, {
  "name": "bicyclist",
  "unicode": "1f6b4",
  "shortname": ":bicyclist:",
  "code_decimal": "&#128692;",
  "category": "a",
  "emoji_order": "890"
}, {
  "name": "mountain_bicyclist",
  "unicode": "1f6b5",
  "shortname": ":mountain_bicyclist:",
  "code_decimal": "&#128693;",
  "category": "a",
  "emoji_order": "908"
}, {
  "name": "racing_car",
  "unicode": "1f3ce",
  "shortname": ":race_car:",
  "code_decimal": "&#127950;",
  "category": "t",
  "emoji_order": "926"
}, {
  "name": "racing_motorcycle",
  "unicode": "1f3cd",
  "shortname": ":motorcycle:",
  "code_decimal": "&#127949;",
  "category": "t",
  "emoji_order": "927"
},
/*{ //@todo not found on image
  "name": "cartwheel",
  "unicode": "1f938",
  "shortname": ":cartwheel:",
  "code_decimal": "&#129336;",
  "category": "a",
  "emoji_order": "928"
},*/
/*{ //@todo not found on image
  "name": "wrestlers",
  "unicode": "1f93c",
  "shortname": ":wrestlers:",
  "code_decimal": "&#129340;",
  "category": "a",
  "emoji_order": "946"
},*/
/*{ //@todo not found on image
  "name": "water_polo",
  "unicode": "1f93d",
  "shortname": ":water_polo:",
  "code_decimal": "&#129341;",
  "category": "a",
  "emoji_order": "964"
},*/
/*{ //@todo not found on image
  "name": "handball",
  "unicode": "1f93e",
  "shortname": ":handball:",
  "code_decimal": "&#129342;",
  "category": "a",
  "emoji_order": "982"
},*/
/*{ //@todo not found on image
  "name": "juggling",
  "unicode": "1f939",
  "shortname": ":juggling:",
  "code_decimal": "&#129337;",
  "category": "a",
  "emoji_order": "1000"
},*/
{
  "name": "couple",
  "unicode": "1f46b",
  "shortname": ":couple:",
  "code_decimal": "&#128107;",
  "category": "p",
  "emoji_order": "1018"
}, {
  "name": "two_men_holding_hands",
  "unicode": "1f46c",
  "shortname": ":two_men_holding_hands:",
  "code_decimal": "&#128108;",
  "category": "p",
  "emoji_order": "1024"
}, {
  "name": "two_women_holding_hands",
  "unicode": "1f46d",
  "shortname": ":two_women_holding_hands:",
  "code_decimal": "&#128109;",
  "category": "p",
  "emoji_order": "1030"
}, {
  "name": "couplekiss",
  "unicode": "1f48f",
  "shortname": ":couplekiss:",
  "code_decimal": "&#128143;",
  "category": "p",
  "emoji_order": "1036"
}, {
  "name": "couple_with_heart",
  "unicode": "1f491",
  "shortname": ":couple_with_heart:",
  "code_decimal": "&#128145;",
  "category": "p",
  "emoji_order": "1040"
}, {
  "name": "family",
  "unicode": "1f46a",
  "shortname": ":family:",
  "code_decimal": "&#128106;",
  "category": "p",
  "emoji_order": "1044"
}, {
  "name": "muscle",
  "unicode": "1f4aa",
  "shortname": ":muscle:",
  "code_decimal": "&#128170;",
  "category": "p",
  "emoji_order": "1080"
},
/*{ //@todo not found on image
  "name": "selfie",
  "unicode": "1f933",
  "shortname": ":selfie:",
  "code_decimal": "&#129331;",
  "category": "p",
  "emoji_order": "1086"
},*/
{
  "name": "point_left",
  "unicode": "1f448",
  "shortname": ":point_left:",
  "code_decimal": "&#128072;",
  "category": "p",
  "emoji_order": "1092"
}, {
  "name": "point_right",
  "unicode": "1f449",
  "shortname": ":point_right:",
  "code_decimal": "&#128073;",
  "category": "p",
  "emoji_order": "1098"
}, {
  "name": "point_up",
  "unicode": "261d",
  "shortname": ":point_up:",
  "code_decimal": "&#9757;",
  "category": "p",
  "emoji_order": "1104"
}, {
  "name": "point_up_2",
  "unicode": "1f446",
  "shortname": ":point_up_2:",
  "code_decimal": "&#128070;",
  "category": "p",
  "emoji_order": "1110"
}, {
  "name": "middle_finger",
  "unicode": "1f595",
  "shortname": ":middle_finger:",
  "code_decimal": "&#128405;",
  "category": "p",
  "emoji_order": "1116"
}, {
  "name": "point_down",
  "unicode": "1f447",
  "shortname": ":point_down:",
  "code_decimal": "&#128071;",
  "category": "p",
  "emoji_order": "1122"
}, {
  "name": "v",
  "unicode": "270c",
  "shortname": ":v:",
  "code_decimal": "&#9996;",
  "category": "p",
  "emoji_order": "1128"
},
/*{ //@todo not found on image
  "name": "fingers_crossed",
  "unicode": "1f91e",
  "shortname": ":fingers_crossed:",
  "code_decimal": "&#129310;",
  "category": "p",
  "emoji_order": "1134"
},*/
/*{ //@todo not found on image
  "name": "vulcan",
  "unicode": "1f596",
  "shortname": ":vulcan:",
  "code_decimal": "&#128406;",
  "category": "p",
  "emoji_order": "1140"
},*/
{
  "name": "the_horns",
  "unicode": "1f918",
  "shortname": ":metal_tone2:",
  "code_decimal": "&#129304;",
  "category": "p",
  "emoji_order": "1146"
},
/*{ //@todo not found on image
  "name": "call_me",
  "unicode": "1f919",
  "shortname": ":call_me:",
  "code_decimal": "&#129305;",
  "category": "p",
  "emoji_order": "1152"
},*/
{
  "name": "raised_hand_with_fingers_splayed",
  "unicode": "1f590",
  "shortname": ":hand_splayed:",
  "code_decimal": "&#128400;",
  "category": "p",
  "emoji_order": "1158"
},
/*{ //@todo not found on image
  "name": "raised_hand",
  "unicode": "270b",
  "shortname": ":raised_hand:",
  "code_decimal": "&#9995;",
  "category": "p",
  "emoji_order": "1164"
},*/
{
  "name": "ok_hand",
  "unicode": "1f44c",
  "shortname": ":ok_hand:",
  "code_decimal": "&#128076;",
  "category": "p",
  "emoji_order": "1170"
}, {
  "name": "thumbsup",
  "unicode": "1f44d",
  "shortname": ":thumbsup:",
  "code_decimal": "&#128077;",
  "category": "p",
  "emoji_order": "1176"
}, {
  "name": "thumbsdown",
  "unicode": "1f44e",
  "shortname": ":thumbsdown:",
  "code_decimal": "&#128078;",
  "category": "p",
  "emoji_order": "1182"
}, {
  "name": "fist",
  "unicode": "270a",
  "shortname": ":fist:",
  "code_decimal": "&#9994;",
  "category": "p",
  "emoji_order": "1188"
}, {
  "name": "facepunch",
  "unicode": "1f44a",
  "shortname": ":punch:",
  "code_decimal": "&#128074;",
  "category": "p",
  "emoji_order": "1194"
},
/*{ //@todo not found on image
  "name": "left_facing_fist",
  "unicode": "1f91b",
  "shortname": ":left_facing_fist:",
  "code_decimal": "&#129307;",
  "category": "p",
  "emoji_order": "1200"
},*/
/*{ //@todo not found on image
  "name": "right_facing_fist",
  "unicode": "1f91c",
  "shortname": ":right_facing_fist:",
  "code_decimal": "&#129308;",
  "category": "p",
  "emoji_order": "1206"
},*/
/*{ //@todo not found on image
  "name": "raised_back_of_hand",
  "unicode": "1f91a",
  "shortname": ":raised_back_of_hand:",
  "code_decimal": "&#129306;",
  "category": "p",
  "emoji_order": "1212"
},*/
{
  "name": "wave",
  "unicode": "1f44b",
  "shortname": ":wave:",
  "code_decimal": "&#128075;",
  "category": "p",
  "emoji_order": "1218"
}, {
  "name": "clap",
  "unicode": "1f44f",
  "shortname": ":clap:",
  "code_decimal": "&#128079;",
  "category": "p",
  "emoji_order": "1224"
}, {
  "name": "writing_hand",
  "unicode": "270d",
  "shortname": ":writing_hand:",
  "code_decimal": "&#9997;",
  "category": "p",
  "emoji_order": "1230"
}, {
  "name": "open_hands",
  "unicode": "1f450",
  "shortname": ":open_hands:",
  "code_decimal": "&#128080;",
  "category": "p",
  "emoji_order": "1236"
}, {
  "name": "raised_hands",
  "unicode": "1f64c",
  "shortname": ":raised_hands:",
  "code_decimal": "&#128588;",
  "category": "p",
  "emoji_order": "1242"
}, {
  "name": "pray",
  "unicode": "1f64f",
  "shortname": ":pray:",
  "code_decimal": "&#128591;",
  "category": "p",
  "emoji_order": "1248"
},
/*{ //@todo not found on image
  "name": "handshake",
  "unicode": "1f91d",
  "shortname": ":handshake:",
  "code_decimal": "&#129309;",
  "category": "p",
  "emoji_order": "1254"
},*/
{
  "name": "nail_care",
  "unicode": "1f485",
  "shortname": ":nail_care:",
  "code_decimal": "&#128133;",
  "category": "p",
  "emoji_order": "1260"
}, {
  "name": "ear",
  "unicode": "1f442",
  "shortname": ":ear:",
  "code_decimal": "&#128066;",
  "category": "p",
  "emoji_order": "1266"
}, {
  "name": "nose",
  "unicode": "1f443",
  "shortname": ":nose:",
  "code_decimal": "&#128067;",
  "category": "p",
  "emoji_order": "1272"
}, {
  "name": "footprints",
  "unicode": "1f463",
  "shortname": ":footprints:",
  "code_decimal": "&#128099;",
  "category": "p",
  "emoji_order": "1278"
}, {
  "name": "eyes",
  "unicode": "1f440",
  "shortname": ":eyes:",
  "code_decimal": "&#128064;",
  "category": "p",
  "emoji_order": "1279"
}, {
  "name": "eye",
  "unicode": "1f441",
  "shortname": ":eye:",
  "code_decimal": "&#128065;",
  "category": "p",
  "emoji_order": "1280"
}, {
  "name": "tongue",
  "unicode": "1f445",
  "shortname": ":tongue:",
  "code_decimal": "&#128069;",
  "category": "p",
  "emoji_order": "1282"
}, {
  "name": "lips",
  "unicode": "1f444",
  "shortname": ":lips:",
  "code_decimal": "&#128068;",
  "category": "p",
  "emoji_order": "1283"
}, {
  "name": "kiss",
  "unicode": "1f48b",
  "shortname": ":kiss:",
  "code_decimal": "&#128139;",
  "category": "p",
  "emoji_order": "1284"
}, {
  "name": "cupid",
  "unicode": "1f498",
  "shortname": ":cupid:",
  "code_decimal": "&#128152;",
  "category": "s",
  "emoji_order": "1285"
}, {
  "name": "heart",
  "unicode": "2764",
  "shortname": ":heart:",
  "code_decimal": "&#10084;",
  "category": "s",
  "emoji_order": "1286"
}, {
  "name": "heartbeat",
  "unicode": "1f493",
  "shortname": ":heartbeat:",
  "code_decimal": "&#128147;",
  "category": "s",
  "emoji_order": "1287"
}, {
  "name": "broken_heart",
  "unicode": "1f494",
  "shortname": ":broken_heart:",
  "code_decimal": "&#128148;",
  "category": "s",
  "emoji_order": "1288"
}, {
  "name": "two_hearts",
  "unicode": "1f495",
  "shortname": ":two_hearts:",
  "code_decimal": "&#128149;",
  "category": "s",
  "emoji_order": "1289"
}, {
  "name": "sparkling_heart",
  "unicode": "1f496",
  "shortname": ":sparkling_heart:",
  "code_decimal": "&#128150;",
  "category": "s",
  "emoji_order": "1290"
}, {
  "name": "heartpulse",
  "unicode": "1f497",
  "shortname": ":heartpulse:",
  "code_decimal": "&#128151;",
  "category": "s",
  "emoji_order": "1291"
}, {
  "name": "blue_heart",
  "unicode": "1f499",
  "shortname": ":blue_heart:",
  "code_decimal": "&#128153;",
  "category": "s",
  "emoji_order": "1292"
}, {
  "name": "green_heart",
  "unicode": "1f49a",
  "shortname": ":green_heart:",
  "code_decimal": "&#128154;",
  "category": "s",
  "emoji_order": "1293"
}, {
  "name": "yellow_heart",
  "unicode": "1f49b",
  "shortname": ":yellow_heart:",
  "code_decimal": "&#128155;",
  "category": "s",
  "emoji_order": "1294"
}, {
  "name": "purple_heart",
  "unicode": "1f49c",
  "shortname": ":purple_heart:",
  "code_decimal": "&#128156;",
  "category": "s",
  "emoji_order": "1295"
},
/*{ //@todo not found on image
  "name": "black_heart",
  "unicode": "1f5a4",
  "shortname": ":black_heart:",
  "code_decimal": "&#128420;",
  "category": "s",
  "emoji_order": "1296"
},*/
{
  "name": "gift_heart",
  "unicode": "1f49d",
  "shortname": ":gift_heart:",
  "code_decimal": "&#128157;",
  "category": "s",
  "emoji_order": "1297"
}, {
  "name": "revolving_hearts",
  "unicode": "1f49e",
  "shortname": ":revolving_hearts:",
  "code_decimal": "&#128158;",
  "category": "s",
  "emoji_order": "1298"
}, {
  "name": "heart_decoration",
  "unicode": "1f49f",
  "shortname": ":heart_decoration:",
  "code_decimal": "&#128159;",
  "category": "s",
  "emoji_order": "1299"
}, {
  "name": "heart_exclamation",
  "unicode": "2763",
  "shortname": ":heart_exclamation:",
  "code_decimal": "&#10083;",
  "category": "s",
  "emoji_order": "1300"
}, {
  "name": "love_letter",
  "unicode": "1f48c",
  "shortname": ":love_letter:",
  "code_decimal": "&#128140;",
  "category": "o",
  "emoji_order": "1301"
}, {
  "name": "zzz",
  "unicode": "1f4a4",
  "shortname": ":zzz:",
  "code_decimal": "&#128164;",
  "category": "p",
  "emoji_order": "1302"
}, {
  "name": "anger",
  "unicode": "1f4a2",
  "shortname": ":anger:",
  "code_decimal": "&#128162;",
  "category": "s",
  "emoji_order": "1303"
}, {
  "name": "bomb",
  "unicode": "1f4a3",
  "shortname": ":bomb:",
  "code_decimal": "&#128163;",
  "category": "o",
  "emoji_order": "1304"
}, {
  "name": "boom",
  "unicode": "1f4a5",
  "shortname": ":boom:",
  "code_decimal": "&#128165;",
  "category": "s",
  "emoji_order": "1305"
}, {
  "name": "sweat_drops",
  "unicode": "1f4a6",
  "shortname": ":sweat_drops:",
  "code_decimal": "&#128166;",
  "category": "n",
  "emoji_order": "1306"
}, {
  "name": "dash",
  "unicode": "1f4a8",
  "shortname": ":dash:",
  "code_decimal": "&#128168;",
  "category": "n",
  "emoji_order": "1307"
}, {
  "name": "dizzy",
  "unicode": "1f4ab",
  "shortname": ":dizzy:",
  "code_decimal": "&#128171;",
  "category": "s",
  "emoji_order": "1308"
}, {
  "name": "speech_balloon",
  "unicode": "1f4ac",
  "shortname": ":speech_balloon:",
  "code_decimal": "&#128172;",
  "category": "s",
  "emoji_order": "1309"
}, {
  "name": "left_speech_bubble",
  "unicode": "1f5e8",
  "shortname": ":speech_left:",
  "code_decimal": "&#128488;",
  "category": "s",
  "emoji_order": "1310"
}, {
  "name": "right_anger_bubble",
  "unicode": "1f5ef",
  "shortname": ":anger_right:",
  "code_decimal": "&#128495;",
  "category": "s",
  "emoji_order": "1311"
}, {
  "name": "thought_balloon",
  "unicode": "1f4ad",
  "shortname": ":thought_balloon:",
  "code_decimal": "&#128173;",
  "category": "s",
  "emoji_order": "1312"
}, {
  "name": "hole",
  "unicode": "1f573",
  "shortname": ":hole:",
  "code_decimal": "&#128371;",
  "category": "o",
  "emoji_order": "1313"
}, {
  "name": "eyeglasses",
  "unicode": "1f453",
  "shortname": ":eyeglasses:",
  "code_decimal": "&#128083;",
  "category": "p",
  "emoji_order": "1314"
}, {
  "name": "dark_sunglasses",
  "unicode": "1f576",
  "shortname": ":dark_sunglasses:",
  "code_decimal": "&#128374;",
  "category": "p",
  "emoji_order": "1315"
}, {
  "name": "necktie",
  "unicode": "1f454",
  "shortname": ":necktie:",
  "code_decimal": "&#128084;",
  "category": "p",
  "emoji_order": "1316"
}, {
  "name": "shirt",
  "unicode": "1f455",
  "shortname": ":shirt:",
  "code_decimal": "&#128085;",
  "category": "p",
  "emoji_order": "1317"
}, {
  "name": "jeans",
  "unicode": "1f456",
  "shortname": ":jeans:",
  "code_decimal": "&#128086;",
  "category": "p",
  "emoji_order": "1318"
}, {
  "name": "dress",
  "unicode": "1f457",
  "shortname": ":dress:",
  "code_decimal": "&#128087;",
  "category": "p",
  "emoji_order": "1319"
}, {
  "name": "kimono",
  "unicode": "1f458",
  "shortname": ":kimono:",
  "code_decimal": "&#128088;",
  "category": "p",
  "emoji_order": "1320"
}, {
  "name": "bikini",
  "unicode": "1f459",
  "shortname": ":bikini:",
  "code_decimal": "&#128089;",
  "category": "p",
  "emoji_order": "1321"
}, {
  "name": "womans_clothes",
  "unicode": "1f45a",
  "shortname": ":womans_clothes:",
  "code_decimal": "&#128090;",
  "category": "p",
  "emoji_order": "1322"
}, {
  "name": "purse",
  "unicode": "1f45b",
  "shortname": ":purse:",
  "code_decimal": "&#128091;",
  "category": "p",
  "emoji_order": "1323"
}, {
  "name": "handbag",
  "unicode": "1f45c",
  "shortname": ":handbag:",
  "code_decimal": "&#128092;",
  "category": "p",
  "emoji_order": "1324"
}, {
  "name": "pouch",
  "unicode": "1f45d",
  "shortname": ":pouch:",
  "code_decimal": "&#128093;",
  "category": "p",
  "emoji_order": "1325"
}, {
  "name": "shopping_bags",
  "unicode": "1f6cd",
  "shortname": ":shopping_bags:",
  "code_decimal": "&#128717;",
  "category": "o",
  "emoji_order": "1326"
}, {
  "name": "school_satchel",
  "unicode": "1f392",
  "shortname": ":school_satchel:",
  "code_decimal": "&#127890;",
  "category": "p",
  "emoji_order": "1327"
}, {
  "name": "mans_shoe",
  "unicode": "1f45e",
  "shortname": ":mans_shoe:",
  "code_decimal": "&#128094;",
  "category": "p",
  "emoji_order": "1328"
}, {
  "name": "athletic_shoe",
  "unicode": "1f45f",
  "shortname": ":athletic_shoe:",
  "code_decimal": "&#128095;",
  "category": "p",
  "emoji_order": "1329"
}, {
  "name": "high_heel",
  "unicode": "1f460",
  "shortname": ":high_heel:",
  "code_decimal": "&#128096;",
  "category": "p",
  "emoji_order": "1330"
}, {
  "name": "sandal",
  "unicode": "1f461",
  "shortname": ":sandal:",
  "code_decimal": "&#128097;",
  "category": "p",
  "emoji_order": "1331"
}, {
  "name": "boot",
  "unicode": "1f462",
  "shortname": ":boot:",
  "code_decimal": "&#128098;",
  "category": "p",
  "emoji_order": "1332"
}, {
  "name": "crown",
  "unicode": "1f451",
  "shortname": ":crown:",
  "code_decimal": "&#128081;",
  "category": "p",
  "emoji_order": "1333"
}, {
  "name": "womans_hat",
  "unicode": "1f452",
  "shortname": ":womans_hat:",
  "code_decimal": "&#128082;",
  "category": "p",
  "emoji_order": "1334"
}, {
  "name": "tophat",
  "unicode": "1f3a9",
  "shortname": ":tophat:",
  "code_decimal": "&#127913;",
  "category": "p",
  "emoji_order": "1335"
}, {
  "name": "mortar_board",
  "unicode": "1f393",
  "shortname": ":mortar_board:",
  "code_decimal": "&#127891;",
  "category": "p",
  "emoji_order": "1336"
}, {
  "name": "helmet_with_white_cross",
  "unicode": "26d1",
  "shortname": ":helmet_with_cross:",
  "code_decimal": "&#9937;",
  "category": "p",
  "emoji_order": "1337"
}, {
  "name": "prayer_beads",
  "unicode": "1f4ff",
  "shortname": ":prayer_beads:",
  "code_decimal": "&#128255;",
  "category": "o",
  "emoji_order": "1338"
}, {
  "name": "lipstick",
  "unicode": "1f484",
  "shortname": ":lipstick:",
  "code_decimal": "&#128132;",
  "category": "p",
  "emoji_order": "1339"
}, {
  "name": "ring",
  "unicode": "1f48d",
  "shortname": ":ring:",
  "code_decimal": "&#128141;",
  "category": "p",
  "emoji_order": "1340"
}, {
  "name": "gem",
  "unicode": "1f48e",
  "shortname": ":gem:",
  "code_decimal": "&#128142;",
  "category": "o",
  "emoji_order": "1341"
}, {
  "name": "monkey_face",
  "unicode": "1f435",
  "shortname": ":monkey_face:",
  "code_decimal": "&#128053;",
  "category": "n",
  "emoji_order": "1342"
}, {
  "name": "monkey",
  "unicode": "1f412",
  "shortname": ":monkey:",
  "code_decimal": "&#128018;",
  "category": "n",
  "emoji_order": "1343"
},
/*{ //@todo not found on image
  "name": "gorilla",
  "unicode": "1f98d",
  "shortname": ":gorilla:",
  "code_decimal": "&#129421;",
  "category": "n",
  "emoji_order": "1344"
},*/
{
  "name": "dog",
  "unicode": "1f436",
  "shortname": ":dog:",
  "code_decimal": "&#128054;",
  "category": "n",
  "emoji_order": "1345"
}, {
  "name": "dog2",
  "unicode": "1f415",
  "shortname": ":dog2:",
  "code_decimal": "&#128021;",
  "category": "n",
  "emoji_order": "1346"
}, {
  "name": "poodle",
  "unicode": "1f429",
  "shortname": ":poodle:",
  "code_decimal": "&#128041;",
  "category": "n",
  "emoji_order": "1347"
}, {
  "name": "wolf",
  "unicode": "1f43a",
  "shortname": ":wolf:",
  "code_decimal": "&#128058;",
  "category": "n",
  "emoji_order": "1348"
},
/*{ //@todo not found on image
  "name": "fox",
  "unicode": "1f98a",
  "shortname": ":fox:",
  "code_decimal": "&#129418;",
  "category": "n",
  "emoji_order": "1349"
},*/
{
  "name": "cat",
  "unicode": "1f431",
  "shortname": ":cat:",
  "code_decimal": "&#128049;",
  "category": "n",
  "emoji_order": "1350"
}, {
  "name": "cat2",
  "unicode": "1f408",
  "shortname": ":cat2:",
  "code_decimal": "&#128008;",
  "category": "n",
  "emoji_order": "1351"
}, {
  "name": "lion_face",
  "unicode": "1f981",
  "shortname": ":lion_face:",
  "code_decimal": "&#129409;",
  "category": "n",
  "emoji_order": "1352"
}, {
  "name": "tiger",
  "unicode": "1f42f",
  "shortname": ":tiger:",
  "code_decimal": "&#128047;",
  "category": "n",
  "emoji_order": "1353"
}, {
  "name": "tiger2",
  "unicode": "1f405",
  "shortname": ":tiger2:",
  "code_decimal": "&#128005;",
  "category": "n",
  "emoji_order": "1354"
}, {
  "name": "leopard",
  "unicode": "1f406",
  "shortname": ":leopard:",
  "code_decimal": "&#128006;",
  "category": "n",
  "emoji_order": "1355"
}, {
  "name": "horse",
  "unicode": "1f434",
  "shortname": ":horse:",
  "code_decimal": "&#128052;",
  "category": "n",
  "emoji_order": "1356"
}, {
  "name": "racehorse",
  "unicode": "1f40e",
  "shortname": ":racehorse:",
  "code_decimal": "&#128014;",
  "category": "n",
  "emoji_order": "1357"
},
/*{ //@todo not found on image
  "name": "deer",
  "unicode": "1f98c",
  "shortname": ":deer:",
  "code_decimal": "&#129420;",
  "category": "n",
  "emoji_order": "1358"
},*/
{
  "name": "unicorn_face",
  "unicode": "1f984",
  "shortname": ":unicorn:",
  "code_decimal": "&#129412;",
  "category": "n",
  "emoji_order": "1359"
}, {
  "name": "cow",
  "unicode": "1f42e",
  "shortname": ":cow:",
  "code_decimal": "&#128046;",
  "category": "n",
  "emoji_order": "1360"
}, {
  "name": "ox",
  "unicode": "1f402",
  "shortname": ":ox:",
  "code_decimal": "&#128002;",
  "category": "n",
  "emoji_order": "1361"
}, {
  "name": "water_buffalo",
  "unicode": "1f403",
  "shortname": ":water_buffalo:",
  "code_decimal": "&#128003;",
  "category": "n",
  "emoji_order": "1362"
}, {
  "name": "cow2",
  "unicode": "1f404",
  "shortname": ":cow2:",
  "code_decimal": "&#128004;",
  "category": "n",
  "emoji_order": "1363"
}, {
  "name": "pig",
  "unicode": "1f437",
  "shortname": ":pig:",
  "code_decimal": "&#128055;",
  "category": "n",
  "emoji_order": "1364"
}, {
  "name": "pig2",
  "unicode": "1f416",
  "shortname": ":pig2:",
  "code_decimal": "&#128022;",
  "category": "n",
  "emoji_order": "1365"
}, {
  "name": "boar",
  "unicode": "1f417",
  "shortname": ":boar:",
  "code_decimal": "&#128023;",
  "category": "n",
  "emoji_order": "1366"
}, {
  "name": "pig_nose",
  "unicode": "1f43d",
  "shortname": ":pig_nose:",
  "code_decimal": "&#128061;",
  "category": "n",
  "emoji_order": "1367"
}, {
  "name": "ram",
  "unicode": "1f40f",
  "shortname": ":ram:",
  "code_decimal": "&#128015;",
  "category": "n",
  "emoji_order": "1368"
}, {
  "name": "sheep",
  "unicode": "1f411",
  "shortname": ":sheep:",
  "code_decimal": "&#128017;",
  "category": "n",
  "emoji_order": "1369"
}, {
  "name": "goat",
  "unicode": "1f410",
  "shortname": ":goat:",
  "code_decimal": "&#128016;",
  "category": "n",
  "emoji_order": "1370"
}, {
  "name": "dromedary_camel",
  "unicode": "1f42a",
  "shortname": ":dromedary_camel:",
  "code_decimal": "&#128042;",
  "category": "n",
  "emoji_order": "1371"
}, {
  "name": "camel",
  "unicode": "1f42b",
  "shortname": ":camel:",
  "code_decimal": "&#128043;",
  "category": "n",
  "emoji_order": "1372"
}, {
  "name": "elephant",
  "unicode": "1f418",
  "shortname": ":elephant:",
  "code_decimal": "&#128024;",
  "category": "n",
  "emoji_order": "1373"
},
/*{ //@todo not found on image
  "name": "rhino",
  "unicode": "1f98f",
  "shortname": ":rhino:",
  "code_decimal": "&#129423;",
  "category": "n",
  "emoji_order": "1374"
},*/
{
  "name": "mouse",
  "unicode": "1f42d",
  "shortname": ":mouse:",
  "code_decimal": "&#128045;",
  "category": "n",
  "emoji_order": "1375"
}, {
  "name": "mouse2",
  "unicode": "1f401",
  "shortname": ":mouse2:",
  "code_decimal": "&#128001;",
  "category": "n",
  "emoji_order": "1376"
}, {
  "name": "rat",
  "unicode": "1f400",
  "shortname": ":rat:",
  "code_decimal": "&#128000;",
  "category": "n",
  "emoji_order": "1377"
}, {
  "name": "hamster",
  "unicode": "1f439",
  "shortname": ":hamster:",
  "code_decimal": "&#128057;",
  "category": "n",
  "emoji_order": "1378"
}, {
  "name": "rabbit",
  "unicode": "1f430",
  "shortname": ":rabbit:",
  "code_decimal": "&#128048;",
  "category": "n",
  "emoji_order": "1379"
}, {
  "name": "rabbit2",
  "unicode": "1f407",
  "shortname": ":rabbit2:",
  "code_decimal": "&#128007;",
  "category": "n",
  "emoji_order": "1380"
}, {
  "name": "chipmunk",
  "unicode": "1f43f",
  "shortname": ":chipmunk:",
  "code_decimal": "&#128063;",
  "category": "n",
  "emoji_order": "1381"
},
/*{ //@todo not found on image
  "name": "bat",
  "unicode": "1f987",
  "shortname": ":bat:",
  "code_decimal": "&#129415;",
  "category": "n",
  "emoji_order": "1382"
},*/
{
  "name": "bear",
  "unicode": "1f43b",
  "shortname": ":bear:",
  "code_decimal": "&#128059;",
  "category": "n",
  "emoji_order": "1383"
}, {
  "name": "koala",
  "unicode": "1f428",
  "shortname": ":koala:",
  "code_decimal": "&#128040;",
  "category": "n",
  "emoji_order": "1384"
}, {
  "name": "panda_face",
  "unicode": "1f43c",
  "shortname": ":panda_face:",
  "code_decimal": "&#128060;",
  "category": "n",
  "emoji_order": "1385"
}, {
  "name": "feet",
  "unicode": "1f43e",
  "shortname": ":feet:",
  "code_decimal": "&#128062;",
  "category": "n",
  "emoji_order": "1386"
}, {
  "name": "turkey",
  "unicode": "1f983",
  "shortname": ":turkey:",
  "code_decimal": "&#129411;",
  "category": "n",
  "emoji_order": "1387"
}, {
  "name": "chicken",
  "unicode": "1f414",
  "shortname": ":chicken:",
  "code_decimal": "&#128020;",
  "category": "n",
  "emoji_order": "1388"
}, {
  "name": "rooster",
  "unicode": "1f413",
  "shortname": ":rooster:",
  "code_decimal": "&#128019;",
  "category": "n",
  "emoji_order": "1389"
}, {
  "name": "hatching_chick",
  "unicode": "1f423",
  "shortname": ":hatching_chick:",
  "code_decimal": "&#128035;",
  "category": "n",
  "emoji_order": "1390"
}, {
  "name": "baby_chick",
  "unicode": "1f424",
  "shortname": ":baby_chick:",
  "code_decimal": "&#128036;",
  "category": "n",
  "emoji_order": "1391"
}, {
  "name": "hatched_chick",
  "unicode": "1f425",
  "shortname": ":hatched_chick:",
  "code_decimal": "&#128037;",
  "category": "n",
  "emoji_order": "1392"
}, {
  "name": "bird",
  "unicode": "1f426",
  "shortname": ":bird:",
  "code_decimal": "&#128038;",
  "category": "n",
  "emoji_order": "1393"
}, {
  "name": "penguin",
  "unicode": "1f427",
  "shortname": ":penguin:",
  "code_decimal": "&#128039;",
  "category": "n",
  "emoji_order": "1394"
}, {
  "name": "dove_of_peace",
  "unicode": "1f54a",
  "shortname": ":dove:",
  "code_decimal": "&#128330;",
  "category": "n",
  "emoji_order": "1395"
},
/*{ //@todo not found on image
  "name": "eagle",
  "unicode": "1f985",
  "shortname": ":eagle:",
  "code_decimal": "&#129413;",
  "category": "n",
  "emoji_order": "1396"
},*/
/*{ //@todo not found on image
  "name": "duck",
  "unicode": "1f986",
  "shortname": ":duck:",
  "code_decimal": "&#129414;",
  "category": "n",
  "emoji_order": "1397"
},*/
/*{ //@todo not found on image
  "name": "owl",
  "unicode": "1f989",
  "shortname": ":owl:",
  "code_decimal": "&#129417;",
  "category": "n",
  "emoji_order": "1398"
},*/
{
  "name": "frog",
  "unicode": "1f438",
  "shortname": ":frog:",
  "code_decimal": "&#128056;",
  "category": "n",
  "emoji_order": "1399"
}, {
  "name": "crocodile",
  "unicode": "1f40a",
  "shortname": ":crocodile:",
  "code_decimal": "&#128010;",
  "category": "n",
  "emoji_order": "1400"
}, {
  "name": "turtle",
  "unicode": "1f422",
  "shortname": ":turtle:",
  "code_decimal": "&#128034;",
  "category": "n",
  "emoji_order": "1401"
},
/*{ //@todo not found on image
  "name": "lizard",
  "unicode": "1f98e",
  "shortname": ":lizard:",
  "code_decimal": "&#129422;",
  "category": "n",
  "emoji_order": "1402"
},*/
{
  "name": "snake",
  "unicode": "1f40d",
  "shortname": ":snake:",
  "code_decimal": "&#128013;",
  "category": "n",
  "emoji_order": "1403"
}, {
  "name": "dragon_face",
  "unicode": "1f432",
  "shortname": ":dragon_face:",
  "code_decimal": "&#128050;",
  "category": "n",
  "emoji_order": "1404"
}, {
  "name": "dragon",
  "unicode": "1f409",
  "shortname": ":dragon:",
  "code_decimal": "&#128009;",
  "category": "n",
  "emoji_order": "1405"
}, {
  "name": "whale",
  "unicode": "1f433",
  "shortname": ":whale:",
  "code_decimal": "&#128051;",
  "category": "n",
  "emoji_order": "1406"
}, {
  "name": "whale2",
  "unicode": "1f40b",
  "shortname": ":whale2:",
  "code_decimal": "&#128011;",
  "category": "n",
  "emoji_order": "1407"
}, {
  "name": "dolphin",
  "unicode": "1f42c",
  "shortname": ":dolphin:",
  "code_decimal": "&#128044;",
  "category": "n",
  "emoji_order": "1408"
}, {
  "name": "fish",
  "unicode": "1f41f",
  "shortname": ":fish:",
  "code_decimal": "&#128031;",
  "category": "n",
  "emoji_order": "1409"
}, {
  "name": "tropical_fish",
  "unicode": "1f420",
  "shortname": ":tropical_fish:",
  "code_decimal": "&#128032;",
  "category": "n",
  "emoji_order": "1410"
}, {
  "name": "blowfish",
  "unicode": "1f421",
  "shortname": ":blowfish:",
  "code_decimal": "&#128033;",
  "category": "n",
  "emoji_order": "1411"
},
/*{ //@todo not found on image
  "name": "shark",
  "unicode": "1f988",
  "shortname": ":shark:",
  "code_decimal": "&#129416;",
  "category": "n",
  "emoji_order": "1412"
},*/
{
  "name": "octopus",
  "unicode": "1f419",
  "shortname": ":octopus:",
  "code_decimal": "&#128025;",
  "category": "n",
  "emoji_order": "1413"
}, {
  "name": "shell",
  "unicode": "1f41a",
  "shortname": ":shell:",
  "code_decimal": "&#128026;",
  "category": "n",
  "emoji_order": "1414"
}, {
  "name": "crab",
  "unicode": "1f980",
  "shortname": ":crab:",
  "code_decimal": "&#129408;",
  "category": "n",
  "emoji_order": "1415"
},
/*{ //@todo not found on image
  "name": "shrimp",
  "unicode": "1f990",
  "shortname": ":shrimp:",
  "code_decimal": "&#129424;",
  "category": "n",
  "emoji_order": "1416"
},*/
/*{ //@todo not found on image
  "name": "squid",
  "unicode": "1f991",
  "shortname": ":squid:",
  "code_decimal": "&#129425;",
  "category": "n",
  "emoji_order": "1417"
},*/
/*{ //@todo not found on image
  "name": "butterfly",
  "unicode": "1f98b",
  "shortname": ":butterfly:",
  "code_decimal": "&#129419;",
  "category": "n",
  "emoji_order": "1418"
},*/
{
  "name": "snail",
  "unicode": "1f40c",
  "shortname": ":snail:",
  "code_decimal": "&#128012;",
  "category": "n",
  "emoji_order": "1419"
}, {
  "name": "bug",
  "unicode": "1f41b",
  "shortname": ":bug:",
  "code_decimal": "&#128027;",
  "category": "n",
  "emoji_order": "1420"
}, {
  "name": "ant",
  "unicode": "1f41c",
  "shortname": ":ant:",
  "code_decimal": "&#128028;",
  "category": "n",
  "emoji_order": "1421"
}, {
  "name": "bee",
  "unicode": "1f41d",
  "shortname": ":bee:",
  "code_decimal": "&#128029;",
  "category": "n",
  "emoji_order": "1422"
}, {
  "name": "beetle",
  "unicode": "1f41e",
  "shortname": ":beetle:",
  "code_decimal": "&#128030;",
  "category": "n",
  "emoji_order": "1423"
}, {
  "name": "spider",
  "unicode": "1f577",
  "shortname": ":spider:",
  "code_decimal": "&#128375;",
  "category": "n",
  "emoji_order": "1424"
}, {
  "name": "spider_web",
  "unicode": "1f578",
  "shortname": ":spider_web:",
  "code_decimal": "&#128376;",
  "category": "n",
  "emoji_order": "1425"
}, {
  "name": "scorpion",
  "unicode": "1f982",
  "shortname": ":scorpion:",
  "code_decimal": "&#129410;",
  "category": "n",
  "emoji_order": "1426"
}, {
  "name": "bouquet",
  "unicode": "1f490",
  "shortname": ":bouquet:",
  "code_decimal": "&#128144;",
  "category": "n",
  "emoji_order": "1427"
}, {
  "name": "cherry_blossom",
  "unicode": "1f338",
  "shortname": ":cherry_blossom:",
  "code_decimal": "&#127800;",
  "category": "n",
  "emoji_order": "1428"
}, {
  "name": "white_flower",
  "unicode": "1f4ae",
  "shortname": ":white_flower:",
  "code_decimal": "&#128174;",
  "category": "s",
  "emoji_order": "1429"
}, {
  "name": "rosette",
  "unicode": "1f3f5",
  "shortname": ":rosette:",
  "code_decimal": "&#127989;",
  "category": "n",
  "emoji_order": "1430"
}, {
  "name": "rose",
  "unicode": "1f339",
  "shortname": ":rose:",
  "code_decimal": "&#127801;",
  "category": "n",
  "emoji_order": "1431"
},
/*{ //@todo not found on image
  "name": "wilted_rose",
  "unicode": "1f940",
  "shortname": ":wilted_rose:",
  "code_decimal": "&#129344;",
  "category": "n",
  "emoji_order": "1432"
},*/
{
  "name": "hibiscus",
  "unicode": "1f33a",
  "shortname": ":hibiscus:",
  "code_decimal": "&#127802;",
  "category": "n",
  "emoji_order": "1433"
}, {
  "name": "sunflower",
  "unicode": "1f33b",
  "shortname": ":sunflower:",
  "code_decimal": "&#127803;",
  "category": "n",
  "emoji_order": "1434"
}, {
  "name": "blossom",
  "unicode": "1f33c",
  "shortname": ":blossom:",
  "code_decimal": "&#127804;",
  "category": "n",
  "emoji_order": "1435"
}, {
  "name": "tulip",
  "unicode": "1f337",
  "shortname": ":tulip:",
  "code_decimal": "&#127799;",
  "category": "n",
  "emoji_order": "1436"
}, {
  "name": "seedling",
  "unicode": "1f331",
  "shortname": ":seedling:",
  "code_decimal": "&#127793;",
  "category": "n",
  "emoji_order": "1437"
}, {
  "name": "evergreen_tree",
  "unicode": "1f332",
  "shortname": ":evergreen_tree:",
  "code_decimal": "&#127794;",
  "category": "n",
  "emoji_order": "1438"
}, {
  "name": "deciduous_tree",
  "unicode": "1f333",
  "shortname": ":deciduous_tree:",
  "code_decimal": "&#127795;",
  "category": "n",
  "emoji_order": "1439"
}, {
  "name": "palm_tree",
  "unicode": "1f334",
  "shortname": ":palm_tree:",
  "code_decimal": "&#127796;",
  "category": "n",
  "emoji_order": "1440"
}, {
  "name": "cactus",
  "unicode": "1f335",
  "shortname": ":cactus:",
  "code_decimal": "&#127797;",
  "category": "n",
  "emoji_order": "1441"
}, {
  "name": "ear_of_rice",
  "unicode": "1f33e",
  "shortname": ":ear_of_rice:",
  "code_decimal": "&#127806;",
  "category": "n",
  "emoji_order": "1442"
}, {
  "name": "herb",
  "unicode": "1f33f",
  "shortname": ":herb:",
  "code_decimal": "&#127807;",
  "category": "n",
  "emoji_order": "1443"
}, {
  "name": "shamrock",
  "unicode": "2618",
  "shortname": ":shamrock:",
  "code_decimal": "&#9752;",
  "category": "n",
  "emoji_order": "1444"
}, {
  "name": "four_leaf_clover",
  "unicode": "1f340",
  "shortname": ":four_leaf_clover:",
  "code_decimal": "&#127808;",
  "category": "n",
  "emoji_order": "1445"
}, {
  "name": "maple_leaf",
  "unicode": "1f341",
  "shortname": ":maple_leaf:",
  "code_decimal": "&#127809;",
  "category": "n",
  "emoji_order": "1446"
}, {
  "name": "fallen_leaf",
  "unicode": "1f342",
  "shortname": ":fallen_leaf:",
  "code_decimal": "&#127810;",
  "category": "n",
  "emoji_order": "1447"
}, {
  "name": "leaves",
  "unicode": "1f343",
  "shortname": ":leaves:",
  "code_decimal": "&#127811;",
  "category": "n",
  "emoji_order": "1448"
}, {
  "name": "grapes",
  "unicode": "1f347",
  "shortname": ":grapes:",
  "code_decimal": "&#127815;",
  "category": "d",
  "emoji_order": "1449"
}, {
  "name": "melon",
  "unicode": "1f348",
  "shortname": ":melon:",
  "code_decimal": "&#127816;",
  "category": "d",
  "emoji_order": "1450"
}, {
  "name": "watermelon",
  "unicode": "1f349",
  "shortname": ":watermelon:",
  "code_decimal": "&#127817;",
  "category": "d",
  "emoji_order": "1451"
}, {
  "name": "tangerine",
  "unicode": "1f34a",
  "shortname": ":tangerine:",
  "code_decimal": "&#127818;",
  "category": "d",
  "emoji_order": "1452"
}, {
  "name": "lemon",
  "unicode": "1f34b",
  "shortname": ":lemon:",
  "code_decimal": "&#127819;",
  "category": "d",
  "emoji_order": "1453"
}, {
  "name": "banana",
  "unicode": "1f34c",
  "shortname": ":banana:",
  "code_decimal": "&#127820;",
  "category": "d",
  "emoji_order": "1454"
}, {
  "name": "pineapple",
  "unicode": "1f34d",
  "shortname": ":pineapple:",
  "code_decimal": "&#127821;",
  "category": "d",
  "emoji_order": "1455"
}, {
  "name": "apple",
  "unicode": "1f34e",
  "shortname": ":apple:",
  "code_decimal": "&#127822;",
  "category": "d",
  "emoji_order": "1456"
}, {
  "name": "green_apple",
  "unicode": "1f34f",
  "shortname": ":green_apple:",
  "code_decimal": "&#127823;",
  "category": "d",
  "emoji_order": "1457"
}, {
  "name": "pear",
  "unicode": "1f350",
  "shortname": ":pear:",
  "code_decimal": "&#127824;",
  "category": "d",
  "emoji_order": "1458"
}, {
  "name": "peach",
  "unicode": "1f351",
  "shortname": ":peach:",
  "code_decimal": "&#127825;",
  "category": "d",
  "emoji_order": "1459"
}, {
  "name": "cherries",
  "unicode": "1f352",
  "shortname": ":cherries:",
  "code_decimal": "&#127826;",
  "category": "d",
  "emoji_order": "1460"
}, {
  "name": "strawberry",
  "unicode": "1f353",
  "shortname": ":strawberry:",
  "code_decimal": "&#127827;",
  "category": "d",
  "emoji_order": "1461"
},
/*{ //@todo not found on image
  "name": "kiwi",
  "unicode": "1f95d",
  "shortname": ":kiwi:",
  "code_decimal": "&#129373;",
  "category": "d",
  "emoji_order": "1462"
},*/
{
  "name": "tomato",
  "unicode": "1f345",
  "shortname": ":tomato:",
  "code_decimal": "&#127813;",
  "category": "d",
  "emoji_order": "1463"
},
/*{ //@todo not found on image
  "name": "avocado",
  "unicode": "1f951",
  "shortname": ":avocado:",
  "code_decimal": "&#129361;",
  "category": "d",
  "emoji_order": "1464"
},*/
{
  "name": "eggplant",
  "unicode": "1f346",
  "shortname": ":eggplant:",
  "code_decimal": "&#127814;",
  "category": "d",
  "emoji_order": "1465"
},
/*{ //@todo not found on image
  "name": "potato",
  "unicode": "1f954",
  "shortname": ":potato:",
  "code_decimal": "&#129364;",
  "category": "d",
  "emoji_order": "1466"
},*/
/*{ //@todo not found on image
  "name": "carrot",
  "unicode": "1f955",
  "shortname": ":carrot:",
  "code_decimal": "&#129365;",
  "category": "d",
  "emoji_order": "1467"
},*/
{
  "name": "corn",
  "unicode": "1f33d",
  "shortname": ":corn:",
  "code_decimal": "&#127805;",
  "category": "d",
  "emoji_order": "1468"
}, {
  "name": "hot_pepper",
  "unicode": "1f336",
  "shortname": ":hot_pepper:",
  "code_decimal": "&#127798;",
  "category": "d",
  "emoji_order": "1469"
},
/*{ //@todo not found on image
  "name": "cucumber",
  "unicode": "1f952",
  "shortname": ":cucumber:",
  "code_decimal": "&#129362;",
  "category": "d",
  "emoji_order": "1470"
},*/
{
  "name": "mushroom",
  "unicode": "1f344",
  "shortname": ":mushroom:",
  "code_decimal": "&#127812;",
  "category": "n",
  "emoji_order": "1471"
},
/*{ //@todo not found on image
  "name": "peanuts",
  "unicode": "1f95c",
  "shortname": ":peanuts:",
  "code_decimal": "&#129372;",
  "category": "d",
  "emoji_order": "1472"
},*/
{
  "name": "chestnut",
  "unicode": "1f330",
  "shortname": ":chestnut:",
  "code_decimal": "&#127792;",
  "category": "n",
  "emoji_order": "1473"
}, {
  "name": "bread",
  "unicode": "1f35e",
  "shortname": ":bread:",
  "code_decimal": "&#127838;",
  "category": "d",
  "emoji_order": "1474"
},
/*{ //@todo not found on image
  "name": "croissant",
  "unicode": "1f950",
  "shortname": ":croissant:",
  "code_decimal": "&#129360;",
  "category": "d",
  "emoji_order": "1475"
},*/
/*{ //@todo not found on image
  "name": "french_bread",
  "unicode": "1f956",
  "shortname": ":french_bread:",
  "code_decimal": "&#129366;",
  "category": "d",
  "emoji_order": "1476"
},*/
/*{ //@todo not found on image
  "name": "pancakes",
  "unicode": "1f95e",
  "shortname": ":pancakes:",
  "code_decimal": "&#129374;",
  "category": "d",
  "emoji_order": "1477"
},*/
{
  "name": "cheese_wedge",
  "unicode": "1f9c0",
  "shortname": ":cheese:",
  "code_decimal": "&#129472;",
  "category": "d",
  "emoji_order": "1478"
}, {
  "name": "meat_on_bone",
  "unicode": "1f356",
  "shortname": ":meat_on_bone:",
  "code_decimal": "&#127830;",
  "category": "d",
  "emoji_order": "1479"
}, {
  "name": "poultry_leg",
  "unicode": "1f357",
  "shortname": ":poultry_leg:",
  "code_decimal": "&#127831;",
  "category": "d",
  "emoji_order": "1480"
},
/*{ //@todo not found on image
  "name": "bacon",
  "unicode": "1f953",
  "shortname": ":bacon:",
  "code_decimal": "&#129363;",
  "category": "d",
  "emoji_order": "1481"
},*/
{
  "name": "hamburger",
  "unicode": "1f354",
  "shortname": ":hamburger:",
  "code_decimal": "&#127828;",
  "category": "d",
  "emoji_order": "1482"
}, {
  "name": "fries",
  "unicode": "1f35f",
  "shortname": ":fries:",
  "code_decimal": "&#127839;",
  "category": "d",
  "emoji_order": "1483"
}, {
  "name": "pizza",
  "unicode": "1f355",
  "shortname": ":pizza:",
  "code_decimal": "&#127829;",
  "category": "d",
  "emoji_order": "1484"
}, {
  "name": "hotdog",
  "unicode": "1f32d",
  "shortname": ":hotdog:",
  "code_decimal": "&#127789;",
  "category": "d",
  "emoji_order": "1485"
}, {
  "name": "taco",
  "unicode": "1f32e",
  "shortname": ":taco:",
  "code_decimal": "&#127790;",
  "category": "d",
  "emoji_order": "1486"
}, {
  "name": "burrito",
  "unicode": "1f32f",
  "shortname": ":burrito:",
  "code_decimal": "&#127791;",
  "category": "d",
  "emoji_order": "1487"
},
/*{ //@todo not found on image
  "name": "stuffed_flatbread",
  "unicode": "1f959",
  "shortname": ":stuffed_flatbread:",
  "code_decimal": "&#129369;",
  "category": "d",
  "emoji_order": "1488"
},*/
{
  "name": "egg",
  "unicode": "1f95a",
  "shortname": ":egg:",
  "code_decimal": "&#129370;",
  "category": "d",
  "emoji_order": "1489"
},
/*{ //@todo not found on image
  "name": "cooking",
  "unicode": "1f373",
  "shortname": ":cooking:",
  "code_decimal": "&#127859;",
  "category": "d",
  "emoji_order": "1490"
},*/
/*{ //@todo not found on image
  "name": "shallow_pan_of_f",
  "unicode": "1f958",
  "shortname": ":shallow_pan_of_f:",
  "code_decimal": "&#129368;",
  "category": "d",
  "emoji_order": "1491"
},*/
{
  "name": "stew",
  "unicode": "1f372",
  "shortname": ":stew:",
  "code_decimal": "&#127858;",
  "category": "d",
  "emoji_order": "1492"
},
/*{ //@todo not found on image
  "name": "salad",
  "unicode": "1f957",
  "shortname": ":salad:",
  "code_decimal": "&#129367;",
  "category": "d",
  "emoji_order": "1493"
},*/
{
  "name": "popcorn",
  "unicode": "1f37f",
  "shortname": ":popcorn:",
  "code_decimal": "&#127871;",
  "category": "d",
  "emoji_order": "1494"
}, {
  "name": "bento",
  "unicode": "1f371",
  "shortname": ":bento:",
  "code_decimal": "&#127857;",
  "category": "d",
  "emoji_order": "1495"
}, {
  "name": "rice_cracker",
  "unicode": "1f358",
  "shortname": ":rice_cracker:",
  "code_decimal": "&#127832;",
  "category": "d",
  "emoji_order": "1496"
}, {
  "name": "rice_ball",
  "unicode": "1f359",
  "shortname": ":rice_ball:",
  "code_decimal": "&#127833;",
  "category": "d",
  "emoji_order": "1497"
}, {
  "name": "rice",
  "unicode": "1f35a",
  "shortname": ":rice:",
  "code_decimal": "&#127834;",
  "category": "d",
  "emoji_order": "1498"
}, {
  "name": "curry",
  "unicode": "1f35b",
  "shortname": ":curry:",
  "code_decimal": "&#127835;",
  "category": "d",
  "emoji_order": "1499"
}, {
  "name": "ramen",
  "unicode": "1f35c",
  "shortname": ":ramen:",
  "code_decimal": "&#127836;",
  "category": "d",
  "emoji_order": "1500"
}, {
  "name": "spaghetti",
  "unicode": "1f35d",
  "shortname": ":spaghetti:",
  "code_decimal": "&#127837;",
  "category": "d",
  "emoji_order": "1501"
}, {
  "name": "sweet_potato",
  "unicode": "1f360",
  "shortname": ":sweet_potato:",
  "code_decimal": "&#127840;",
  "category": "d",
  "emoji_order": "1502"
}, {
  "name": "oden",
  "unicode": "1f362",
  "shortname": ":oden:",
  "code_decimal": "&#127842;",
  "category": "d",
  "emoji_order": "1503"
}, {
  "name": "sushi",
  "unicode": "1f363",
  "shortname": ":sushi:",
  "code_decimal": "&#127843;",
  "category": "d",
  "emoji_order": "1504"
}, {
  "name": "fried_shrimp",
  "unicode": "1f364",
  "shortname": ":fried_shrimp:",
  "code_decimal": "&#127844;",
  "category": "d",
  "emoji_order": "1505"
}, {
  "name": "fish_cake",
  "unicode": "1f365",
  "shortname": ":fish_cake:",
  "code_decimal": "&#127845;",
  "category": "d",
  "emoji_order": "1506"
}, {
  "name": "dango",
  "unicode": "1f361",
  "shortname": ":dango:",
  "code_decimal": "&#127841;",
  "category": "d",
  "emoji_order": "1507"
}, {
  "name": "icecream",
  "unicode": "1f366",
  "shortname": ":icecream:",
  "code_decimal": "&#127846;",
  "category": "d",
  "emoji_order": "1508"
}, {
  "name": "shaved_ice",
  "unicode": "1f367",
  "shortname": ":shaved_ice:",
  "code_decimal": "&#127847;",
  "category": "d",
  "emoji_order": "1509"
}, {
  "name": "ice_cream",
  "unicode": "1f368",
  "shortname": ":ice_cream:",
  "code_decimal": "&#127848;",
  "category": "d",
  "emoji_order": "1510"
}, {
  "name": "doughnut",
  "unicode": "1f369",
  "shortname": ":doughnut:",
  "code_decimal": "&#127849;",
  "category": "d",
  "emoji_order": "1511"
}, {
  "name": "cookie",
  "unicode": "1f36a",
  "shortname": ":cookie:",
  "code_decimal": "&#127850;",
  "category": "d",
  "emoji_order": "1512"
}, {
  "name": "birthday",
  "unicode": "1f382",
  "shortname": ":birthday:",
  "code_decimal": "&#127874;",
  "category": "d",
  "emoji_order": "1513"
}, {
  "name": "cake",
  "unicode": "1f370",
  "shortname": ":cake:",
  "code_decimal": "&#127856;",
  "category": "d",
  "emoji_order": "1514"
}, {
  "name": "chocolate_bar",
  "unicode": "1f36b",
  "shortname": ":chocolate_bar:",
  "code_decimal": "&#127851;",
  "category": "d",
  "emoji_order": "1515"
}, {
  "name": "candy",
  "unicode": "1f36c",
  "shortname": ":candy:",
  "code_decimal": "&#127852;",
  "category": "d",
  "emoji_order": "1516"
}, {
  "name": "lollipop",
  "unicode": "1f36d",
  "shortname": ":lollipop:",
  "code_decimal": "&#127853;",
  "category": "d",
  "emoji_order": "1517"
}, {
  "name": "custard",
  "unicode": "1f36e",
  "shortname": ":custard:",
  "code_decimal": "&#127854;",
  "category": "d",
  "emoji_order": "1518"
}, {
  "name": "honey_pot",
  "unicode": "1f36f",
  "shortname": ":honey_pot:",
  "code_decimal": "&#127855;",
  "category": "d",
  "emoji_order": "1519"
}, {
  "name": "baby_bottle",
  "unicode": "1f37c",
  "shortname": ":baby_bottle:",
  "code_decimal": "&#127868;",
  "category": "d",
  "emoji_order": "1520"
},
/*{ //@todo not found on image
  "name": "milk",
  "unicode": "1f95b",
  "shortname": ":milk:",
  "code_decimal": "&#129371;",
  "category": "d",
  "emoji_order": "1521"
},*/
{
  "name": "coffee",
  "unicode": "2615",
  "shortname": ":coffee:",
  "code_decimal": "&#9749;",
  "category": "d",
  "emoji_order": "1522"
}, {
  "name": "tea",
  "unicode": "1f375",
  "shortname": ":tea:",
  "code_decimal": "&#127861;",
  "category": "d",
  "emoji_order": "1523"
}, {
  "name": "sake",
  "unicode": "1f376",
  "shortname": ":sake:",
  "code_decimal": "&#127862;",
  "category": "d",
  "emoji_order": "1524"
}, {
  "name": "champagne",
  "unicode": "1f37e",
  "shortname": ":champagne:",
  "code_decimal": "&#127870;",
  "category": "d",
  "emoji_order": "1525"
}, {
  "name": "wine_glass",
  "unicode": "1f377",
  "shortname": ":wine_glass:",
  "code_decimal": "&#127863;",
  "category": "d",
  "emoji_order": "1526"
}, {
  "name": "cocktail",
  "unicode": "1f378",
  "shortname": ":cocktail:",
  "code_decimal": "&#127864;",
  "category": "d",
  "emoji_order": "1527"
}, {
  "name": "tropical_drink",
  "unicode": "1f379",
  "shortname": ":tropical_drink:",
  "code_decimal": "&#127865;",
  "category": "d",
  "emoji_order": "1528"
}, {
  "name": "beer",
  "unicode": "1f37a",
  "shortname": ":beer:",
  "code_decimal": "&#127866;",
  "category": "d",
  "emoji_order": "1529"
}, {
  "name": "beers",
  "unicode": "1f37b",
  "shortname": ":beers:",
  "code_decimal": "&#127867;",
  "category": "d",
  "emoji_order": "1530"
},
/*{ //@todo not found on image
  "name": "champagne_glass",
  "unicode": "1f942",
  "shortname": ":champagne_glass:",
  "code_decimal": "&#129346;",
  "category": "d",
  "emoji_order": "1531"
},*/
/*{ //@todo not found on image
  "name": "tumbler_glass",
  "unicode": "1f943",
  "shortname": ":tumbler_glass:",
  "code_decimal": "&#129347;",
  "category": "d",
  "emoji_order": "1532"
},*/
{
  "name": "knife_fork_plate",
  "unicode": "1f37d",
  "shortname": ":fork_knife_plate:",
  "code_decimal": "&#127869;",
  "category": "d",
  "emoji_order": "1533"
}, {
  "name": "fork_and_knife",
  "unicode": "1f374",
  "shortname": ":fork_and_knife:",
  "code_decimal": "&#127860;",
  "category": "d",
  "emoji_order": "1534"
},
/*{ //@todo not found on image
  "name": "spoon",
  "unicode": "1f944",
  "shortname": ":spoon:",
  "code_decimal": "&#129348;",
  "category": "d",
  "emoji_order": "1535"
},*/
/*{ //@todo not found on image
  "name": "knife",
  "unicode": "1f52a",
  "shortname": ":knife:",
  "code_decimal": "&#128298;",
  "category": "o",
  "emoji_order": "1536"
},*/
{
  "name": "amphora",
  "unicode": "1f3fa",
  "shortname": ":amphora:",
  "code_decimal": "&#127994;",
  "category": "o",
  "emoji_order": "1537"
}, {
  "name": "earth_africa",
  "unicode": "1f30d",
  "shortname": ":earth_africa:",
  "code_decimal": "&#127757;",
  "category": "n",
  "emoji_order": "1538"
}, {
  "name": "earth_americas",
  "unicode": "1f30e",
  "shortname": ":earth_americas:",
  "code_decimal": "&#127758;",
  "category": "n",
  "emoji_order": "1539"
}, {
  "name": "earth_asia",
  "unicode": "1f30f",
  "shortname": ":earth_asia:",
  "code_decimal": "&#127759;",
  "category": "n",
  "emoji_order": "1540"
}, {
  "name": "globe_with_meridians",
  "unicode": "1f310",
  "shortname": ":globe_with_meridians:",
  "code_decimal": "&#127760;",
  "category": "s",
  "emoji_order": "1541"
}, {
  "name": "world_map",
  "unicode": "1f5fa",
  "shortname": ":map:",
  "code_decimal": "&#128506;",
  "category": "o",
  "emoji_order": "1542"
}, {
  "name": "japan",
  "unicode": "1f5fe",
  "shortname": ":japan:",
  "code_decimal": "&#128510;",
  "category": "t",
  "emoji_order": "1543"
}, {
  "name": "snow_capped_mountain",
  "unicode": "1f3d4",
  "shortname": ":mountain_snow:",
  "code_decimal": "&#127956;",
  "category": "t",
  "emoji_order": "1544"
}, {
  "name": "mountain",
  "unicode": "26f0",
  "shortname": ":mountain:",
  "code_decimal": "&#9968;",
  "category": "t",
  "emoji_order": "1545"
}, {
  "name": "volcano",
  "unicode": "1f30b",
  "shortname": ":volcano:",
  "code_decimal": "&#127755;",
  "category": "t",
  "emoji_order": "1546"
}, {
  "name": "mount_fuji",
  "unicode": "1f5fb",
  "shortname": ":mount_fuji:",
  "code_decimal": "&#128507;",
  "category": "t",
  "emoji_order": "1547"
}, {
  "name": "camping",
  "unicode": "1f3d5",
  "shortname": ":camping:",
  "code_decimal": "&#127957;",
  "category": "t",
  "emoji_order": "1548"
}, {
  "name": "beach_with_umbrella",
  "unicode": "1f3d6",
  "shortname": ":beach:",
  "code_decimal": "&#127958;",
  "category": "t",
  "emoji_order": "1549"
}, {
  "name": "desert",
  "unicode": "1f3dc",
  "shortname": ":desert:",
  "code_decimal": "&#127964;",
  "category": "t",
  "emoji_order": "1550"
}, {
  "name": "desert_island",
  "unicode": "1f3dd",
  "shortname": ":island:",
  "code_decimal": "&#127965;",
  "category": "t",
  "emoji_order": "1551"
}, {
  "name": "national_park",
  "unicode": "1f3de",
  "shortname": ":park:",
  "code_decimal": "&#127966;",
  "category": "t",
  "emoji_order": "1552"
}, {
  "name": "stadium",
  "unicode": "1f3df",
  "shortname": ":stadium:",
  "code_decimal": "&#127967;",
  "category": "t",
  "emoji_order": "1553"
}, {
  "name": "classical_building",
  "unicode": "1f3db",
  "shortname": ":classical_building:",
  "code_decimal": "&#127963;",
  "category": "t",
  "emoji_order": "1554"
}, {
  "name": "building_construction",
  "unicode": "1f3d7",
  "shortname": ":construction_site:",
  "code_decimal": "&#127959;",
  "category": "t",
  "emoji_order": "1555"
}, {
  "name": "house_buildings",
  "unicode": "1f3d8",
  "shortname": ":homes:",
  "code_decimal": "&#127960;",
  "category": "t",
  "emoji_order": "1556"
}, {
  "name": "cityscape",
  "unicode": "1f3d9",
  "shortname": ":cityscape:",
  "code_decimal": "&#127961;",
  "category": "t",
  "emoji_order": "1557"
}, {
  "name": "derelict_house_building",
  "unicode": "1f3da",
  "shortname": ":house_abandoned:",
  "code_decimal": "&#127962;",
  "category": "t",
  "emoji_order": "1558"
}, {
  "name": "house",
  "unicode": "1f3e0",
  "shortname": ":house:",
  "code_decimal": "&#127968;",
  "category": "t",
  "emoji_order": "1559"
}, {
  "name": "house_with_garden",
  "unicode": "1f3e1",
  "shortname": ":house_with_garden:",
  "code_decimal": "&#127969;",
  "category": "t",
  "emoji_order": "1560"
}, {
  "name": "office",
  "unicode": "1f3e2",
  "shortname": ":office:",
  "code_decimal": "&#127970;",
  "category": "t",
  "emoji_order": "1561"
}, {
  "name": "post_office",
  "unicode": "1f3e3",
  "shortname": ":post_office:",
  "code_decimal": "&#127971;",
  "category": "t",
  "emoji_order": "1562"
}, {
  "name": "european_post_office",
  "unicode": "1f3e4",
  "shortname": ":european_post_office:",
  "code_decimal": "&#127972;",
  "category": "t",
  "emoji_order": "1563"
}, {
  "name": "hospital",
  "unicode": "1f3e5",
  "shortname": ":hospital:",
  "code_decimal": "&#127973;",
  "category": "t",
  "emoji_order": "1564"
}, {
  "name": "bank",
  "unicode": "1f3e6",
  "shortname": ":bank:",
  "code_decimal": "&#127974;",
  "category": "t",
  "emoji_order": "1565"
}, {
  "name": "hotel",
  "unicode": "1f3e8",
  "shortname": ":hotel:",
  "code_decimal": "&#127976;",
  "category": "t",
  "emoji_order": "1566"
}, {
  "name": "love_hotel",
  "unicode": "1f3e9",
  "shortname": ":love_hotel:",
  "code_decimal": "&#127977;",
  "category": "t",
  "emoji_order": "1567"
}, {
  "name": "convenience_store",
  "unicode": "1f3ea",
  "shortname": ":convenience_store:",
  "code_decimal": "&#127978;",
  "category": "t",
  "emoji_order": "1568"
}, {
  "name": "school",
  "unicode": "1f3eb",
  "shortname": ":school:",
  "code_decimal": "&#127979;",
  "category": "t",
  "emoji_order": "1569"
}, {
  "name": "department_store",
  "unicode": "1f3ec",
  "shortname": ":department_store:",
  "code_decimal": "&#127980;",
  "category": "t",
  "emoji_order": "1570"
}, {
  "name": "factory",
  "unicode": "1f3ed",
  "shortname": ":factory:",
  "code_decimal": "&#127981;",
  "category": "t",
  "emoji_order": "1571"
}, {
  "name": "japanese_castle",
  "unicode": "1f3ef",
  "shortname": ":japanese_castle:",
  "code_decimal": "&#127983;",
  "category": "t",
  "emoji_order": "1572"
}, {
  "name": "european_castle",
  "unicode": "1f3f0",
  "shortname": ":european_castle:",
  "code_decimal": "&#127984;",
  "category": "t",
  "emoji_order": "1573"
}, {
  "name": "wedding",
  "unicode": "1f492",
  "shortname": ":wedding:",
  "code_decimal": "&#128146;",
  "category": "t",
  "emoji_order": "1574"
}, {
  "name": "tokyo_tower",
  "unicode": "1f5fc",
  "shortname": ":tokyo_tower:",
  "code_decimal": "&#128508;",
  "category": "t",
  "emoji_order": "1575"
}, {
  "name": "statue_of_liberty",
  "unicode": "1f5fd",
  "shortname": ":statue_of_liberty:",
  "code_decimal": "&#128509;",
  "category": "t",
  "emoji_order": "1576"
}, {
  "name": "church",
  "unicode": "26ea",
  "shortname": ":church:",
  "code_decimal": "&#9962;",
  "category": "t",
  "emoji_order": "1577"
}, {
  "name": "mosque",
  "unicode": "1f54c",
  "shortname": ":mosque:",
  "code_decimal": "&#128332;",
  "category": "t",
  "emoji_order": "1578"
}, {
  "name": "synagogue",
  "unicode": "1f54d",
  "shortname": ":synagogue:",
  "code_decimal": "&#128333;",
  "category": "t",
  "emoji_order": "1579"
}, {
  "name": "shinto_shrine",
  "unicode": "26e9",
  "shortname": ":shinto_shrine:",
  "code_decimal": "&#9961;",
  "category": "t",
  "emoji_order": "1580"
}, {
  "name": "kaaba",
  "unicode": "1f54b",
  "shortname": ":kaaba:",
  "code_decimal": "&#128331;",
  "category": "t",
  "emoji_order": "1581"
}, {
  "name": "fountain",
  "unicode": "26f2",
  "shortname": ":fountain:",
  "code_decimal": "&#9970;",
  "category": "t",
  "emoji_order": "1582"
}, {
  "name": "tent",
  "unicode": "26fa",
  "shortname": ":tent:",
  "code_decimal": "&#9978;",
  "category": "t",
  "emoji_order": "1583"
}, {
  "name": "foggy",
  "unicode": "1f301",
  "shortname": ":foggy:",
  "code_decimal": "&#127745;",
  "category": "t",
  "emoji_order": "1584"
}, {
  "name": "night_with_stars",
  "unicode": "1f303",
  "shortname": ":night_with_stars:",
  "code_decimal": "&#127747;",
  "category": "t",
  "emoji_order": "1585"
}, {
  "name": "sunrise_over_mountains",
  "unicode": "1f304",
  "shortname": ":sunrise_over_mountains:",
  "code_decimal": "&#127748;",
  "category": "t",
  "emoji_order": "1586"
}, {
  "name": "sunrise",
  "unicode": "1f305",
  "shortname": ":sunrise:",
  "code_decimal": "&#127749;",
  "category": "t",
  "emoji_order": "1587"
},
/*{ //@todo not found on image
  "name": "city_dusk",
  "unicode": "1f306",
  "shortname": ":city_dusk:",
  "code_decimal": "&#127750;",
  "category": "t",
  "emoji_order": "1588"
},*/
{
  "name": "city_sunset",
  "unicode": "1f307",
  "shortname": ":city_sunset:",
  "code_decimal": "&#127751;",
  "category": "t",
  "emoji_order": "1589"
}, {
  "name": "bridge_at_night",
  "unicode": "1f309",
  "shortname": ":bridge_at_night:",
  "code_decimal": "&#127753;",
  "category": "t",
  "emoji_order": "1590"
}, {
  "name": "hotsprings",
  "unicode": "2668",
  "shortname": ":hotsprings:",
  "code_decimal": "&#9832;",
  "category": "s",
  "emoji_order": "1591"
}, {
  "name": "milky_way",
  "unicode": "1f30c",
  "shortname": ":milky_way:",
  "code_decimal": "&#127756;",
  "category": "t",
  "emoji_order": "1592"
}, {
  "name": "carousel_horse",
  "unicode": "1f3a0",
  "shortname": ":carousel_horse:",
  "code_decimal": "&#127904;",
  "category": "t",
  "emoji_order": "1593"
}, {
  "name": "ferris_wheel",
  "unicode": "1f3a1",
  "shortname": ":ferris_wheel:",
  "code_decimal": "&#127905;",
  "category": "t",
  "emoji_order": "1594"
}, {
  "name": "roller_coaster",
  "unicode": "1f3a2",
  "shortname": ":roller_coaster:",
  "code_decimal": "&#127906;",
  "category": "t",
  "emoji_order": "1595"
}, {
  "name": "barber",
  "unicode": "1f488",
  "shortname": ":barber:",
  "code_decimal": "&#128136;",
  "category": "o",
  "emoji_order": "1596"
}, {
  "name": "circus_tent",
  "unicode": "1f3aa",
  "shortname": ":circus_tent:",
  "code_decimal": "&#127914;",
  "category": "a",
  "emoji_order": "1597"
}, {
  "name": "performing_arts",
  "unicode": "1f3ad",
  "shortname": ":performing_arts:",
  "code_decimal": "&#127917;",
  "category": "a",
  "emoji_order": "1598"
}, {
  "name": "frame_with_picture",
  "unicode": "1f5bc",
  "shortname": ":frame_photo:",
  "code_decimal": "&#128444;",
  "category": "o",
  "emoji_order": "1599"
}, {
  "name": "art",
  "unicode": "1f3a8",
  "shortname": ":art:",
  "code_decimal": "&#127912;",
  "category": "a",
  "emoji_order": "1600"
}, {
  "name": "slot_machine",
  "unicode": "1f3b0",
  "shortname": ":slot_machine:",
  "code_decimal": "&#127920;",
  "category": "a",
  "emoji_order": "1601"
}, {
  "name": "steam_locomotive",
  "unicode": "1f682",
  "shortname": ":steam_locomotive:",
  "code_decimal": "&#128642;",
  "category": "t",
  "emoji_order": "1602"
}, {
  "name": "railway_car",
  "unicode": "1f683",
  "shortname": ":railway_car:",
  "code_decimal": "&#128643;",
  "category": "t",
  "emoji_order": "1603"
}, {
  "name": "bullettrain_side",
  "unicode": "1f684",
  "shortname": ":bullettrain_side:",
  "code_decimal": "&#128644;",
  "category": "t",
  "emoji_order": "1604"
}, {
  "name": "bullettrain_front",
  "unicode": "1f685",
  "shortname": ":bullettrain_front:",
  "code_decimal": "&#128645;",
  "category": "t",
  "emoji_order": "1605"
}, {
  "name": "train2",
  "unicode": "1f686",
  "shortname": ":train2:",
  "code_decimal": "&#128646;",
  "category": "t",
  "emoji_order": "1606"
}, {
  "name": "metro",
  "unicode": "1f687",
  "shortname": ":metro:",
  "code_decimal": "&#128647;",
  "category": "t",
  "emoji_order": "1607"
}, {
  "name": "light_rail",
  "unicode": "1f688",
  "shortname": ":light_rail:",
  "code_decimal": "&#128648;",
  "category": "t",
  "emoji_order": "1608"
}, {
  "name": "station",
  "unicode": "1f689",
  "shortname": ":station:",
  "code_decimal": "&#128649;",
  "category": "t",
  "emoji_order": "1609"
}, {
  "name": "tram",
  "unicode": "1f68a",
  "shortname": ":tram:",
  "code_decimal": "&#128650;",
  "category": "t",
  "emoji_order": "1610"
}, {
  "name": "monorail",
  "unicode": "1f69d",
  "shortname": ":monorail:",
  "code_decimal": "&#128669;",
  "category": "t",
  "emoji_order": "1611"
}, {
  "name": "mountain_railway",
  "unicode": "1f69e",
  "shortname": ":mountain_railway:",
  "code_decimal": "&#128670;",
  "category": "t",
  "emoji_order": "1612"
}, {
  "name": "train",
  "unicode": "1f68b",
  "shortname": ":train:",
  "code_decimal": "&#128651;",
  "category": "t",
  "emoji_order": "1613"
}, {
  "name": "bus",
  "unicode": "1f68c",
  "shortname": ":bus:",
  "code_decimal": "&#128652;",
  "category": "t",
  "emoji_order": "1614"
}, {
  "name": "oncoming_bus",
  "unicode": "1f68d",
  "shortname": ":oncoming_bus:",
  "code_decimal": "&#128653;",
  "category": "t",
  "emoji_order": "1615"
}, {
  "name": "trolleybus",
  "unicode": "1f68e",
  "shortname": ":trolleybus:",
  "code_decimal": "&#128654;",
  "category": "t",
  "emoji_order": "1616"
}, {
  "name": "minibus",
  "unicode": "1f690",
  "shortname": ":minibus:",
  "code_decimal": "&#128656;",
  "category": "t",
  "emoji_order": "1617"
}, {
  "name": "ambulance",
  "unicode": "1f691",
  "shortname": ":ambulance:",
  "code_decimal": "&#128657;",
  "category": "t",
  "emoji_order": "1618"
}, {
  "name": "fire_engine",
  "unicode": "1f692",
  "shortname": ":fire_engine:",
  "code_decimal": "&#128658;",
  "category": "t",
  "emoji_order": "1619"
}, {
  "name": "police_car",
  "unicode": "1f693",
  "shortname": ":police_car:",
  "code_decimal": "&#128659;",
  "category": "t",
  "emoji_order": "1620"
}, {
  "name": "oncoming_police_car",
  "unicode": "1f694",
  "shortname": ":oncoming_police_car:",
  "code_decimal": "&#128660;",
  "category": "t",
  "emoji_order": "1621"
}, {
  "name": "taxi",
  "unicode": "1f695",
  "shortname": ":taxi:",
  "code_decimal": "&#128661;",
  "category": "t",
  "emoji_order": "1622"
}, {
  "name": "oncoming_taxi",
  "unicode": "1f696",
  "shortname": ":oncoming_taxi:",
  "code_decimal": "&#128662;",
  "category": "t",
  "emoji_order": "1623"
}, {
  "name": "car",
  "unicode": "1f697",
  "shortname": ":red_car:",
  "code_decimal": "&#128663;",
  "category": "t",
  "emoji_order": "1624"
}, {
  "name": "oncoming_automobile",
  "unicode": "1f698",
  "shortname": ":oncoming_automobile:",
  "code_decimal": "&#128664;",
  "category": "t",
  "emoji_order": "1625"
}, {
  "name": "blue_car",
  "unicode": "1f699",
  "shortname": ":blue_car:",
  "code_decimal": "&#128665;",
  "category": "t",
  "emoji_order": "1626"
}, {
  "name": "truck",
  "unicode": "1f69a",
  "shortname": ":truck:",
  "code_decimal": "&#128666;",
  "category": "t",
  "emoji_order": "1627"
}, {
  "name": "articulated_lorry",
  "unicode": "1f69b",
  "shortname": ":articulated_lorry:",
  "code_decimal": "&#128667;",
  "category": "t",
  "emoji_order": "1628"
}, {
  "name": "tractor",
  "unicode": "1f69c",
  "shortname": ":tractor:",
  "code_decimal": "&#128668;",
  "category": "t",
  "emoji_order": "1629"
}, {
  "name": "bike",
  "unicode": "1f6b2",
  "shortname": ":bike:",
  "code_decimal": "&#128690;",
  "category": "t",
  "emoji_order": "1630"
},
/*{ //@todo not found on image
  "name": "scooter",
  "unicode": "1f6f4",
  "shortname": ":scooter:",
  "code_decimal": "&#128756;",
  "category": "t",
  "emoji_order": "1631"
},*/
/*{ //@todo not found on image
  "name": "motor_scooter",
  "unicode": "1f6f5",
  "shortname": ":motor_scooter:",
  "code_decimal": "&#128757;",
  "category": "t",
  "emoji_order": "1632"
},*/
{
  "name": "busstop",
  "unicode": "1f68f",
  "shortname": ":busstop:",
  "code_decimal": "&#128655;",
  "category": "t",
  "emoji_order": "1633"
}, {
  "name": "motorway",
  "unicode": "1f6e3",
  "shortname": ":motorway:",
  "code_decimal": "&#128739;",
  "category": "t",
  "emoji_order": "1634"
}, {
  "name": "railway_track",
  "unicode": "1f6e4",
  "shortname": ":railway_track:",
  "code_decimal": "&#128740;",
  "category": "t",
  "emoji_order": "1635"
}, {
  "name": "fuelpump",
  "unicode": "26fd",
  "shortname": ":fuelpump:",
  "code_decimal": "&#9981;",
  "category": "t",
  "emoji_order": "1636"
}, {
  "name": "rotating_light",
  "unicode": "1f6a8",
  "shortname": ":rotating_light:",
  "code_decimal": "&#128680;",
  "category": "t",
  "emoji_order": "1637"
}, {
  "name": "traffic_light",
  "unicode": "1f6a5",
  "shortname": ":traffic_light:",
  "code_decimal": "&#128677;",
  "category": "t",
  "emoji_order": "1638"
}, {
  "name": "vertical_traffic_light",
  "unicode": "1f6a6",
  "shortname": ":vertical_traffic_light:",
  "code_decimal": "&#128678;",
  "category": "t",
  "emoji_order": "1639"
}, {
  "name": "construction",
  "unicode": "1f6a7",
  "shortname": ":construction:",
  "code_decimal": "&#128679;",
  "category": "t",
  "emoji_order": "1640"
}, {
  "name": "octagonal_sign",
  "unicode": "1f6d1",
  "shortname": ":octagonal_sign:",
  "code_decimal": "&#128721;",
  "category": "s",
  "emoji_order": "1641"
}, {
  "name": "anchor",
  "unicode": "2693",
  "shortname": ":anchor:",
  "code_decimal": "&#9875;",
  "category": "t",
  "emoji_order": "1642"
}, {
  "name": "boat",
  "unicode": "26f5",
  "shortname": ":sailboat:",
  "code_decimal": "&#9973;",
  "category": "t",
  "emoji_order": "1643"
},
/*{ //@todo not found on image
  "name": "canoe",
  "unicode": "1f6f6",
  "shortname": ":canoe:",
  "code_decimal": "&#128758;",
  "category": "t",
  "emoji_order": "1644"
},*/
{
  "name": "speedboat",
  "unicode": "1f6a4",
  "shortname": ":speedboat:",
  "code_decimal": "&#128676;",
  "category": "t",
  "emoji_order": "1645"
}, {
  "name": "passenger_ship",
  "unicode": "1f6f3",
  "shortname": ":cruise_ship:",
  "code_decimal": "&#128755;",
  "category": "t",
  "emoji_order": "1646"
}, {
  "name": "ferry",
  "unicode": "26f4",
  "shortname": ":ferry:",
  "code_decimal": "&#9972;",
  "category": "t",
  "emoji_order": "1647"
}, {
  "name": "motor_boat",
  "unicode": "1f6e5",
  "shortname": ":motorboat:",
  "code_decimal": "&#128741;",
  "category": "t",
  "emoji_order": "1648"
}, {
  "name": "ship",
  "unicode": "1f6a2",
  "shortname": ":ship:",
  "code_decimal": "&#128674;",
  "category": "t",
  "emoji_order": "1649"
}, {
  "name": "airplane",
  "unicode": "2708",
  "shortname": ":airplane:",
  "code_decimal": "&#9992;",
  "category": "t",
  "emoji_order": "1650"
}, {
  "name": "small_airplane",
  "unicode": "1f6e9",
  "shortname": ":airplane_small:",
  "code_decimal": "&#128745;",
  "category": "t",
  "emoji_order": "1651"
}, {
  "name": "airplane_departure",
  "unicode": "1f6eb",
  "shortname": ":airplane_departure:",
  "code_decimal": "&#128747;",
  "category": "t",
  "emoji_order": "1652"
}, {
  "name": "airplane_arriving",
  "unicode": "1f6ec",
  "shortname": ":airplane_arriving:",
  "code_decimal": "&#128748;",
  "category": "t",
  "emoji_order": "1653"
}, {
  "name": "seat",
  "unicode": "1f4ba",
  "shortname": ":seat:",
  "code_decimal": "&#128186;",
  "category": "t",
  "emoji_order": "1654"
}, {
  "name": "helicopter",
  "unicode": "1f681",
  "shortname": ":helicopter:",
  "code_decimal": "&#128641;",
  "category": "t",
  "emoji_order": "1655"
}, {
  "name": "suspension_railway",
  "unicode": "1f69f",
  "shortname": ":suspension_railway:",
  "code_decimal": "&#128671;",
  "category": "t",
  "emoji_order": "1656"
}, {
  "name": "mountain_cableway",
  "unicode": "1f6a0",
  "shortname": ":mountain_cableway:",
  "code_decimal": "&#128672;",
  "category": "t",
  "emoji_order": "1657"
}, {
  "name": "aerial_tramway",
  "unicode": "1f6a1",
  "shortname": ":aerial_tramway:",
  "code_decimal": "&#128673;",
  "category": "t",
  "emoji_order": "1658"
}, {
  "name": "rocket",
  "unicode": "1f680",
  "shortname": ":rocket:",
  "code_decimal": "&#128640;",
  "category": "t",
  "emoji_order": "1659"
}, {
  "name": "satellite",
  "unicode": "1f6f0",
  "shortname": ":satellite_orbital:",
  "code_decimal": "&#128752;",
  "category": "t",
  "emoji_order": "1660"
}, {
  "name": "bellhop_bell",
  "unicode": "1f6ce",
  "shortname": ":bellhop:",
  "code_decimal": "&#128718;",
  "category": "o",
  "emoji_order": "1661"
}, {
  "name": "door",
  "unicode": "1f6aa",
  "shortname": ":door:",
  "code_decimal": "&#128682;",
  "category": "o",
  "emoji_order": "1662"
}, {
  "name": "sleeping_accommodation",
  "unicode": "1f6cc",
  "shortname": ":sleeping_accommodation:",
  "code_decimal": "&#128716;",
  "category": "o",
  "emoji_order": "1663"
}, {
  "name": "bed",
  "unicode": "1f6cf",
  "shortname": ":bed:",
  "code_decimal": "&#128719;",
  "category": "o",
  "emoji_order": "1669"
}, {
  "name": "couch_and_lamp",
  "unicode": "1f6cb",
  "shortname": ":couch:",
  "code_decimal": "&#128715;",
  "category": "o",
  "emoji_order": "1670"
}, {
  "name": "toilet",
  "unicode": "1f6bd",
  "shortname": ":toilet:",
  "code_decimal": "&#128701;",
  "category": "o",
  "emoji_order": "1671"
}, {
  "name": "shower",
  "unicode": "1f6bf",
  "shortname": ":shower:",
  "code_decimal": "&#128703;",
  "category": "o",
  "emoji_order": "1672"
}, {
  "name": "bath",
  "unicode": "1f6c0",
  "shortname": ":bath:",
  "code_decimal": "&#128704;",
  "category": "a",
  "emoji_order": "1673"
}, {
  "name": "bathtub",
  "unicode": "1f6c1",
  "shortname": ":bathtub:",
  "code_decimal": "&#128705;",
  "category": "o",
  "emoji_order": "1679"
}, {
  "name": "hourglass",
  "unicode": "231b",
  "shortname": ":hourglass:",
  "code_decimal": "&#8987;",
  "category": "o",
  "emoji_order": "1680"
}, {
  "name": "hourglass_flowing_sand",
  "unicode": "23f3",
  "shortname": ":hourglass_flowing_sand:",
  "code_decimal": "&#9203;",
  "category": "o",
  "emoji_order": "1681"
}, {
  "name": "watch",
  "unicode": "231a",
  "shortname": ":watch:",
  "code_decimal": "&#8986;",
  "category": "o",
  "emoji_order": "1682"
}, {
  "name": "alarm_clock",
  "unicode": "23f0",
  "shortname": ":alarm_clock:",
  "code_decimal": "&#9200;",
  "category": "o",
  "emoji_order": "1683"
}, {
  "name": "stopwatch",
  "unicode": "23f1",
  "shortname": ":stopwatch:",
  "code_decimal": "&#9201;",
  "category": "o",
  "emoji_order": "1684"
}, {
  "name": "timer_clock",
  "unicode": "23f2",
  "shortname": ":timer:",
  "code_decimal": "&#9202;",
  "category": "o",
  "emoji_order": "1685"
}, {
  "name": "mantelpiece_clock",
  "unicode": "1f570",
  "shortname": ":clock:",
  "code_decimal": "&#128368;",
  "category": "o",
  "emoji_order": "1686"
}, {
  "name": "clock12",
  "unicode": "1f55b",
  "shortname": ":clock12:",
  "code_decimal": "&#128347;",
  "category": "s",
  "emoji_order": "1687"
}, {
  "name": "clock1230",
  "unicode": "1f567",
  "shortname": ":clock1230:",
  "code_decimal": "&#128359;",
  "category": "s",
  "emoji_order": "1688"
}, {
  "name": "clock1",
  "unicode": "1f550",
  "shortname": ":clock1:",
  "code_decimal": "&#128336;",
  "category": "s",
  "emoji_order": "1689"
}, {
  "name": "clock130",
  "unicode": "1f55c",
  "shortname": ":clock130:",
  "code_decimal": "&#128348;",
  "category": "s",
  "emoji_order": "1690"
}, {
  "name": "clock2",
  "unicode": "1f551",
  "shortname": ":clock2:",
  "code_decimal": "&#128337;",
  "category": "s",
  "emoji_order": "1691"
}, {
  "name": "clock230",
  "unicode": "1f55d",
  "shortname": ":clock230:",
  "code_decimal": "&#128349;",
  "category": "s",
  "emoji_order": "1692"
}, {
  "name": "clock3",
  "unicode": "1f552",
  "shortname": ":clock3:",
  "code_decimal": "&#128338;",
  "category": "s",
  "emoji_order": "1693"
}, {
  "name": "clock330",
  "unicode": "1f55e",
  "shortname": ":clock330:",
  "code_decimal": "&#128350;",
  "category": "s",
  "emoji_order": "1694"
}, {
  "name": "clock4",
  "unicode": "1f553",
  "shortname": ":clock4:",
  "code_decimal": "&#128339;",
  "category": "s",
  "emoji_order": "1695"
}, {
  "name": "clock430",
  "unicode": "1f55f",
  "shortname": ":clock430:",
  "code_decimal": "&#128351;",
  "category": "s",
  "emoji_order": "1696"
}, {
  "name": "clock5",
  "unicode": "1f554",
  "shortname": ":clock5:",
  "code_decimal": "&#128340;",
  "category": "s",
  "emoji_order": "1697"
}, {
  "name": "clock530",
  "unicode": "1f560",
  "shortname": ":clock530:",
  "code_decimal": "&#128352;",
  "category": "s",
  "emoji_order": "1698"
}, {
  "name": "clock6",
  "unicode": "1f555",
  "shortname": ":clock6:",
  "code_decimal": "&#128341;",
  "category": "s",
  "emoji_order": "1699"
}, {
  "name": "clock630",
  "unicode": "1f561",
  "shortname": ":clock630:",
  "code_decimal": "&#128353;",
  "category": "s",
  "emoji_order": "1700"
}, {
  "name": "clock7",
  "unicode": "1f556",
  "shortname": ":clock7:",
  "code_decimal": "&#128342;",
  "category": "s",
  "emoji_order": "1701"
}, {
  "name": "clock730",
  "unicode": "1f562",
  "shortname": ":clock730:",
  "code_decimal": "&#128354;",
  "category": "s",
  "emoji_order": "1702"
}, {
  "name": "clock8",
  "unicode": "1f557",
  "shortname": ":clock8:",
  "code_decimal": "&#128343;",
  "category": "s",
  "emoji_order": "1703"
}, {
  "name": "clock830",
  "unicode": "1f563",
  "shortname": ":clock830:",
  "code_decimal": "&#128355;",
  "category": "s",
  "emoji_order": "1704"
}, {
  "name": "clock9",
  "unicode": "1f558",
  "shortname": ":clock9:",
  "code_decimal": "&#128344;",
  "category": "s",
  "emoji_order": "1705"
}, {
  "name": "clock930",
  "unicode": "1f564",
  "shortname": ":clock930:",
  "code_decimal": "&#128356;",
  "category": "s",
  "emoji_order": "1706"
}, {
  "name": "clock10",
  "unicode": "1f559",
  "shortname": ":clock10:",
  "code_decimal": "&#128345;",
  "category": "s",
  "emoji_order": "1707"
}, {
  "name": "clock1030",
  "unicode": "1f565",
  "shortname": ":clock1030:",
  "code_decimal": "&#128357;",
  "category": "s",
  "emoji_order": "1708"
}, {
  "name": "clock11",
  "unicode": "1f55a",
  "shortname": ":clock11:",
  "code_decimal": "&#128346;",
  "category": "s",
  "emoji_order": "1709"
}, {
  "name": "clock1130",
  "unicode": "1f566",
  "shortname": ":clock1130:",
  "code_decimal": "&#128358;",
  "category": "s",
  "emoji_order": "1710"
}, {
  "name": "new_moon",
  "unicode": "1f311",
  "shortname": ":new_moon:",
  "code_decimal": "&#127761;",
  "category": "n",
  "emoji_order": "1711"
}, {
  "name": "waxing_crescent_moon",
  "unicode": "1f312",
  "shortname": ":waxing_crescent_moon:",
  "code_decimal": "&#127762;",
  "category": "n",
  "emoji_order": "1712"
}, {
  "name": "first_quarter_moon",
  "unicode": "1f313",
  "shortname": ":first_quarter_moon:",
  "code_decimal": "&#127763;",
  "category": "n",
  "emoji_order": "1713"
},
/*{ //@todo not found on image
  "name": "waxing_gibbous_moon",
  "unicode": "1f314",
  "shortname": ":waxing_gibbous_moon:",
  "code_decimal": "&#127764;",
  "category": "n",
  "emoji_order": "1714"
},*/
{
  "name": "full_moon",
  "unicode": "1f315",
  "shortname": ":full_moon:",
  "code_decimal": "&#127765;",
  "category": "n",
  "emoji_order": "1715"
}, {
  "name": "waning_gibbous_moon",
  "unicode": "1f316",
  "shortname": ":waning_gibbous_moon:",
  "code_decimal": "&#127766;",
  "category": "n",
  "emoji_order": "1716"
}, {
  "name": "last_quarter_moon",
  "unicode": "1f317",
  "shortname": ":last_quarter_moon:",
  "code_decimal": "&#127767;",
  "category": "n",
  "emoji_order": "1717"
}, {
  "name": "waning_crescent_moon",
  "unicode": "1f318",
  "shortname": ":waning_crescent_moon:",
  "code_decimal": "&#127768;",
  "category": "n",
  "emoji_order": "1718"
}, {
  "name": "crescent_moon",
  "unicode": "1f319",
  "shortname": ":crescent_moon:",
  "code_decimal": "&#127769;",
  "category": "n",
  "emoji_order": "1719"
}, {
  "name": "new_moon_with_face",
  "unicode": "1f31a",
  "shortname": ":new_moon_with_face:",
  "code_decimal": "&#127770;",
  "category": "n",
  "emoji_order": "1720"
}, {
  "name": "first_quarter_moon_with_face",
  "unicode": "1f31b",
  "shortname": ":first_quarter_moon_with_face:",
  "code_decimal": "&#127771;",
  "category": "n",
  "emoji_order": "1721"
}, {
  "name": "last_quarter_moon_with_face",
  "unicode": "1f31c",
  "shortname": ":last_quarter_moon_with_face:",
  "code_decimal": "&#127772;",
  "category": "n",
  "emoji_order": "1722"
}, {
  "name": "thermometer",
  "unicode": "1f321",
  "shortname": ":thermometer:",
  "code_decimal": "&#127777;",
  "category": "o",
  "emoji_order": "1723"
}, {
  "name": "sunny",
  "unicode": "2600",
  "shortname": ":sunny:",
  "code_decimal": "&#9728;",
  "category": "n",
  "emoji_order": "1724"
}, {
  "name": "full_moon_with_face",
  "unicode": "1f31d",
  "shortname": ":full_moon_with_face:",
  "code_decimal": "&#127773;",
  "category": "n",
  "emoji_order": "1725"
}, {
  "name": "sun_with_face",
  "unicode": "1f31e",
  "shortname": ":sun_with_face:",
  "code_decimal": "&#127774;",
  "category": "n",
  "emoji_order": "1726"
}, {
  "name": "star",
  "unicode": "2b50",
  "shortname": ":star:",
  "code_decimal": "&#11088;",
  "category": "n",
  "emoji_order": "1727"
}, {
  "name": "star2",
  "unicode": "1f31f",
  "shortname": ":star2:",
  "code_decimal": "&#127775;",
  "category": "n",
  "emoji_order": "1728"
}, {
  "name": "stars",
  "unicode": "1f320",
  "shortname": ":stars:",
  "code_decimal": "&#127776;",
  "category": "t",
  "emoji_order": "1729"
}, {
  "name": "cloud",
  "unicode": "2601",
  "shortname": ":cloud:",
  "code_decimal": "&#9729;",
  "category": "n",
  "emoji_order": "1730"
}, {
  "name": "partly_sunny",
  "unicode": "26c5",
  "shortname": ":partly_sunny:",
  "code_decimal": "&#9925;",
  "category": "n",
  "emoji_order": "1731"
}, {
  "name": "thunder_cloud_and_rain",
  "unicode": "26c8",
  "shortname": ":thunder_cloud_rain:",
  "code_decimal": "&#9928;",
  "category": "n",
  "emoji_order": "1732"
},
/*{ //@todo not found on image
  "name": "white_sun_small_cloud",
  "unicode": "1f324",
  "shortname": ":white_sun_small_cloud:",
  "code_decimal": "&#127780;",
  "category": "n",
  "emoji_order": "1733"
},*/
/*{ //@todo not found on image
  "name": "white_sun_cloud",
  "unicode": "1f325",
  "shortname": ":white_sun_cloud:",
  "code_decimal": "&#127781;",
  "category": "n",
  "emoji_order": "1734"
},*/
/*{ //@todo not found on image
  "name": "white_sun_rain_cloud",
  "unicode": "1f326",
  "shortname": ":white_sun_rain_cloud:",
  "code_decimal": "&#127782;",
  "category": "n",
  "emoji_order": "1735"
},*/
{
  "name": "rain_cloud",
  "unicode": "1f327",
  "shortname": ":cloud_rain:",
  "code_decimal": "&#127783;",
  "category": "n",
  "emoji_order": "1736"
}, {
  "name": "snow_cloud",
  "unicode": "1f328",
  "shortname": ":cloud_snow:",
  "code_decimal": "&#127784;",
  "category": "n",
  "emoji_order": "1737"
},
/*{ //@todo not found on image
  "name": "cloud_lightning",
  "unicode": "1f329",
  "shortname": ":cloud_lightning:",
  "code_decimal": "&#127785;",
  "category": "n",
  "emoji_order": "1738"
},*/
/*{ //@todo not found on image
  "name": "cloud_tornado",
  "unicode": "1f32a",
  "shortname": ":cloud_tornado:",
  "code_decimal": "&#127786;",
  "category": "n",
  "emoji_order": "1739"
},*/
{
  "name": "fog",
  "unicode": "1f32b",
  "shortname": ":fog:",
  "code_decimal": "&#127787;",
  "category": "n",
  "emoji_order": "1740"
}, {
  "name": "wind_blowing_face",
  "unicode": "1f32c",
  "shortname": ":wind_blowing_face:",
  "code_decimal": "&#127788;",
  "category": "n",
  "emoji_order": "1741"
}, {
  "name": "cyclone",
  "unicode": "1f300",
  "shortname": ":cyclone:",
  "code_decimal": "&#127744;",
  "category": "s",
  "emoji_order": "1742"
}, {
  "name": "rainbow",
  "unicode": "1f308",
  "shortname": ":rainbow:",
  "code_decimal": "&#127752;",
  "category": "t",
  "emoji_order": "1743"
}, {
  "name": "closed_umbrella",
  "unicode": "1f302",
  "shortname": ":closed_umbrella:",
  "code_decimal": "&#127746;",
  "category": "p",
  "emoji_order": "1744"
}, {
  "name": "umbrella",
  "unicode": "2602",
  "shortname": ":umbrella2:",
  "code_decimal": "&#9730;",
  "category": "n",
  "emoji_order": "1745"
}, {
  "name": "umbrella_with_rain_drops",
  "unicode": "2614",
  "shortname": ":umbrella:",
  "code_decimal": "&#9748;",
  "category": "n",
  "emoji_order": "1746"
}, {
  "name": "beach_umbrella",
  "unicode": "26f1",
  "shortname": ":beach_umbrella:",
  "code_decimal": "&#9969;",
  "category": "o",
  "emoji_order": "1747"
}, {
  "name": "zap",
  "unicode": "26a1",
  "shortname": ":zap:",
  "code_decimal": "&#9889;",
  "category": "n",
  "emoji_order": "1748"
}, {
  "name": "snowflake",
  "unicode": "2744",
  "shortname": ":snowflake:",
  "code_decimal": "&#10052;",
  "category": "n",
  "emoji_order": "1749"
}, {
  "name": "snowman",
  "unicode": "2603",
  "shortname": ":snowman2:",
  "code_decimal": "&#9731;",
  "category": "n",
  "emoji_order": "1750"
}, {
  "name": "snowman_without_snow",
  "unicode": "26c4",
  "shortname": ":snowman:",
  "code_decimal": "&#9924;",
  "category": "n",
  "emoji_order": "1751"
}, {
  "name": "comet",
  "unicode": "2604",
  "shortname": ":comet:",
  "code_decimal": "&#9732;",
  "category": "n",
  "emoji_order": "1752"
}, {
  "name": "fire",
  "unicode": "1f525",
  "shortname": ":fire:",
  "code_decimal": "&#128293;",
  "category": "n",
  "emoji_order": "1753"
}, {
  "name": "droplet",
  "unicode": "1f4a7",
  "shortname": ":droplet:",
  "code_decimal": "&#128167;",
  "category": "n",
  "emoji_order": "1754"
}, {
  "name": "ocean",
  "unicode": "1f30a",
  "shortname": ":ocean:",
  "code_decimal": "&#127754;",
  "category": "n",
  "emoji_order": "1755"
}, {
  "name": "jack_o_lantern",
  "unicode": "1f383",
  "shortname": ":jack_o_lantern:",
  "code_decimal": "&#127875;",
  "category": "n",
  "emoji_order": "1756"
}, {
  "name": "christmas_tree",
  "unicode": "1f384",
  "shortname": ":christmas_tree:",
  "code_decimal": "&#127876;",
  "category": "n",
  "emoji_order": "1757"
}, {
  "name": "fireworks",
  "unicode": "1f386",
  "shortname": ":fireworks:",
  "code_decimal": "&#127878;",
  "category": "t",
  "emoji_order": "1758"
}, {
  "name": "sparkler",
  "unicode": "1f387",
  "shortname": ":sparkler:",
  "code_decimal": "&#127879;",
  "category": "t",
  "emoji_order": "1759"
}, {
  "name": "sparkles",
  "unicode": "2728",
  "shortname": ":sparkles:",
  "code_decimal": "&#10024;",
  "category": "n",
  "emoji_order": "1760"
}, {
  "name": "balloon",
  "unicode": "1f388",
  "shortname": ":balloon:",
  "code_decimal": "&#127880;",
  "category": "o",
  "emoji_order": "1761"
}, {
  "name": "tada",
  "unicode": "1f389",
  "shortname": ":tada:",
  "code_decimal": "&#127881;",
  "category": "o",
  "emoji_order": "1762"
}, {
  "name": "confetti_ball",
  "unicode": "1f38a",
  "shortname": ":confetti_ball:",
  "code_decimal": "&#127882;",
  "category": "o",
  "emoji_order": "1763"
}, {
  "name": "tanabata_tree",
  "unicode": "1f38b",
  "shortname": ":tanabata_tree:",
  "code_decimal": "&#127883;",
  "category": "n",
  "emoji_order": "1764"
}, {
  "name": "bamboo",
  "unicode": "1f38d",
  "shortname": ":bamboo:",
  "code_decimal": "&#127885;",
  "category": "n",
  "emoji_order": "1765"
}, {
  "name": "dolls",
  "unicode": "1f38e",
  "shortname": ":dolls:",
  "code_decimal": "&#127886;",
  "category": "o",
  "emoji_order": "1766"
}, {
  "name": "f",
  "unicode": "1f38f",
  "shortname": ":flags:",
  "code_decimal": "&#127887;",
  "category": "o",
  "emoji_order": "1767"
}, {
  "name": "wind_chime",
  "unicode": "1f390",
  "shortname": ":wind_chime:",
  "code_decimal": "&#127888;",
  "category": "o",
  "emoji_order": "1768"
}, {
  "name": "rice_scene",
  "unicode": "1f391",
  "shortname": ":rice_scene:",
  "code_decimal": "&#127889;",
  "category": "t",
  "emoji_order": "1769"
}, {
  "name": "ribbon",
  "unicode": "1f380",
  "shortname": ":ribbon:",
  "code_decimal": "&#127872;",
  "category": "o",
  "emoji_order": "1770"
}, {
  "name": "gift",
  "unicode": "1f381",
  "shortname": ":gift:",
  "code_decimal": "&#127873;",
  "category": "o",
  "emoji_order": "1771"
}, {
  "name": "reminder_ribbon",
  "unicode": "1f397",
  "shortname": ":reminder_ribbon:",
  "code_decimal": "&#127895;",
  "category": "a",
  "emoji_order": "1772"
}, {
  "name": "admission_tickets",
  "unicode": "1f39f",
  "shortname": ":tickets:",
  "code_decimal": "&#127903;",
  "category": "a",
  "emoji_order": "1773"
}, {
  "name": "ticket",
  "unicode": "1f3ab",
  "shortname": ":ticket:",
  "code_decimal": "&#127915;",
  "category": "a",
  "emoji_order": "1774"
}, {
  "name": "medal",
  "unicode": "1f396",
  "shortname": ":military_medal:",
  "code_decimal": "&#127894;",
  "category": "a",
  "emoji_order": "1775"
}, {
  "name": "trophy",
  "unicode": "1f3c6",
  "shortname": ":trophy:",
  "code_decimal": "&#127942;",
  "category": "a",
  "emoji_order": "1776"
}, {
  "name": "sports_medal",
  "unicode": "1f3c5",
  "shortname": ":medal:",
  "code_decimal": "&#127941;",
  "category": "a",
  "emoji_order": "1777"
},
/*{ //@todo not found on image
  "name": "first_place",
  "unicode": "1f947",
  "shortname": ":first_place:",
  "code_decimal": "&#129351;",
  "category": "a",
  "emoji_order": "1778"
},*/
/*{ //@todo not found on image
  "name": "second_place",
  "unicode": "1f948",
  "shortname": ":second_place:",
  "code_decimal": "&#129352;",
  "category": "a",
  "emoji_order": "1779"
},*/
/*{ //@todo not found on image
  "name": "third_place",
  "unicode": "1f949",
  "shortname": ":third_place:",
  "code_decimal": "&#129353;",
  "category": "a",
  "emoji_order": "1780"
},*/
{
  "name": "soccer",
  "unicode": "26bd",
  "shortname": ":soccer:",
  "code_decimal": "&#9917;",
  "category": "a",
  "emoji_order": "1781"
}, {
  "name": "baseball",
  "unicode": "26be",
  "shortname": ":baseball:",
  "code_decimal": "&#9918;",
  "category": "a",
  "emoji_order": "1782"
}, {
  "name": "basketball",
  "unicode": "1f3c0",
  "shortname": ":basketball:",
  "code_decimal": "&#127936;",
  "category": "a",
  "emoji_order": "1783"
}, {
  "name": "volleyball",
  "unicode": "1f3d0",
  "shortname": ":volleyball:",
  "code_decimal": "&#127952;",
  "category": "a",
  "emoji_order": "1784"
}, {
  "name": "football",
  "unicode": "1f3c8",
  "shortname": ":football:",
  "code_decimal": "&#127944;",
  "category": "a",
  "emoji_order": "1785"
}, {
  "name": "rugby_football",
  "unicode": "1f3c9",
  "shortname": ":rugby_football:",
  "code_decimal": "&#127945;",
  "category": "a",
  "emoji_order": "1786"
}, {
  "name": "tennis",
  "unicode": "1f3be",
  "shortname": ":tennis:",
  "code_decimal": "&#127934;",
  "category": "a",
  "emoji_order": "1787"
}, {
  "name": "8ball",
  "unicode": "1f3b1",
  "shortname": ":8ball:",
  "code_decimal": "&#127921;",
  "category": "a",
  "emoji_order": "1788"
}, {
  "name": "bowling",
  "unicode": "1f3b3",
  "shortname": ":bowling:",
  "code_decimal": "&#127923;",
  "category": "a",
  "emoji_order": "1789"
}, {
  "name": "cricket_bat_and_ball",
  "unicode": "1f3cf",
  "shortname": ":cricket_game:",
  "code_decimal": "&#127951;",
  "category": "a",
  "emoji_order": "1790"
}, {
  "name": "field_hockey_stick_and_ball",
  "unicode": "1f3d1",
  "shortname": ":field_hockey:",
  "code_decimal": "&#127953;",
  "category": "a",
  "emoji_order": "1791"
}, {
  "name": "ice_hockey_stick_and_puck",
  "unicode": "1f3d2",
  "shortname": ":hockey:",
  "code_decimal": "&#127954;",
  "category": "a",
  "emoji_order": "1792"
}, {
  "name": "table_tennis_paddle_and_ball",
  "unicode": "1f3d3",
  "shortname": ":ping_pong:",
  "code_decimal": "&#127955;",
  "category": "a",
  "emoji_order": "1793"
}, {
  "name": "badminton_racquet_and_shuttlecock",
  "unicode": "1f3f8",
  "shortname": ":badminton:",
  "code_decimal": "&#127992;",
  "category": "a",
  "emoji_order": "1794"
},
/*{ //@todo not found on image
  "name": "boxing_glove",
  "unicode": "1f94a",
  "shortname": ":boxing_glove:",
  "code_decimal": "&#129354;",
  "category": "a",
  "emoji_order": "1795"
},*/
/*{ //@todo not found on image
  "name": "martial_arts_uniform",
  "unicode": "1f94b",
  "shortname": ":martial_arts_uniform:",
  "code_decimal": "&#129355;",
  "category": "a",
  "emoji_order": "1796"
},*/
/*{ @todo not found on image
  "name": "goal",
  "unicode": "1f945",
  "shortname": ":goal:",
  "code_decimal": "&#129349;",
  "category": "a",
  "emoji_order": "1797"
},*/
{
  "name": "dart",
  "unicode": "1f3af",
  "shortname": ":dart:",
  "code_decimal": "&#127919;",
  "category": "a",
  "emoji_order": "1798"
}, {
  "name": "golf",
  "unicode": "26f3",
  "shortname": ":golf:",
  "code_decimal": "&#9971;",
  "category": "a",
  "emoji_order": "1799"
}, {
  "name": "ice_skate",
  "unicode": "26f8",
  "shortname": ":ice_skate:",
  "code_decimal": "&#9976;",
  "category": "a",
  "emoji_order": "1800"
}, {
  "name": "fishing_pole_and_fish",
  "unicode": "1f3a3",
  "shortname": ":fishing_pole_and_fish:",
  "code_decimal": "&#127907;",
  "category": "a",
  "emoji_order": "1801"
}, {
  "name": "running_shirt_with_sash",
  "unicode": "1f3bd",
  "shortname": ":running_shirt_with_sash:",
  "code_decimal": "&#127933;",
  "category": "a",
  "emoji_order": "1802"
}, {
  "name": "ski",
  "unicode": "1f3bf",
  "shortname": ":ski:",
  "code_decimal": "&#127935;",
  "category": "a",
  "emoji_order": "1803"
}, {
  "name": "video_game",
  "unicode": "1f3ae",
  "shortname": ":video_game:",
  "code_decimal": "&#127918;",
  "category": "a",
  "emoji_order": "1804"
}, {
  "name": "joystick",
  "unicode": "1f579",
  "shortname": ":joystick:",
  "code_decimal": "&#128377;",
  "category": "o",
  "emoji_order": "1805"
}, {
  "name": "game_die",
  "unicode": "1f3b2",
  "shortname": ":game_die:",
  "code_decimal": "&#127922;",
  "category": "a",
  "emoji_order": "1806"
}, {
  "name": "spades",
  "unicode": "2660",
  "shortname": ":spades:",
  "code_decimal": "&spades;",
  "category": "s",
  "emoji_order": "1807"
}, {
  "name": "hearts",
  "unicode": "2665",
  "shortname": ":hearts:",
  "code_decimal": "&hearts;",
  "category": "s",
  "emoji_order": "1808"
}, {
  "name": "diamonds",
  "unicode": "2666",
  "shortname": ":diamonds:",
  "code_decimal": "&diams;",
  "category": "s",
  "emoji_order": "1809"
}, {
  "name": "clubs",
  "unicode": "2663",
  "shortname": ":clubs:",
  "code_decimal": "&clubs;",
  "category": "s",
  "emoji_order": "1810"
}, {
  "name": "black_joker",
  "unicode": "1f0cf",
  "shortname": ":black_joker:",
  "code_decimal": "&#127183;",
  "category": "s",
  "emoji_order": "1811"
}, {
  "name": "mahjong",
  "unicode": "1f004",
  "shortname": ":mahjong:",
  "code_decimal": "&#126980;",
  "category": "s",
  "emoji_order": "1812"
}, {
  "name": "flower_playing_cards",
  "unicode": "1f3b4",
  "shortname": ":flower_playing_cards:",
  "code_decimal": "&#127924;",
  "category": "s",
  "emoji_order": "1813"
}, {
  "name": "mute",
  "unicode": "1f507",
  "shortname": ":mute:",
  "code_decimal": "&#128263;",
  "category": "s",
  "emoji_order": "1814"
}, {
  "name": "speaker",
  "unicode": "1f508",
  "shortname": ":speaker:",
  "code_decimal": "&#128264;",
  "category": "s",
  "emoji_order": "1815"
}, {
  "name": "sound",
  "unicode": "1f509",
  "shortname": ":sound:",
  "code_decimal": "&#128265;",
  "category": "s",
  "emoji_order": "1816"
}, {
  "name": "loud_sound",
  "unicode": "1f50a",
  "shortname": ":loud_sound:",
  "code_decimal": "&#128266;",
  "category": "s",
  "emoji_order": "1817"
}, {
  "name": "loudspeaker",
  "unicode": "1f4e2",
  "shortname": ":loudspeaker:",
  "code_decimal": "&#128226;",
  "category": "s",
  "emoji_order": "1818"
}, {
  "name": "mega",
  "unicode": "1f4e3",
  "shortname": ":mega:",
  "code_decimal": "&#128227;",
  "category": "s",
  "emoji_order": "1819"
}, {
  "name": "postal_horn",
  "unicode": "1f4ef",
  "shortname": ":postal_horn:",
  "code_decimal": "&#128239;",
  "category": "o",
  "emoji_order": "1820"
}, {
  "name": "bell",
  "unicode": "1f514",
  "shortname": ":bell:",
  "code_decimal": "&#128276;",
  "category": "s",
  "emoji_order": "1821"
}, {
  "name": "no_bell",
  "unicode": "1f515",
  "shortname": ":no_bell:",
  "code_decimal": "&#128277;",
  "category": "s",
  "emoji_order": "1822"
}, {
  "name": "musical_score",
  "unicode": "1f3bc",
  "shortname": ":musical_score:",
  "code_decimal": "&#127932;",
  "category": "a",
  "emoji_order": "1823"
}, {
  "name": "musical_note",
  "unicode": "1f3b5",
  "shortname": ":musical_note:",
  "code_decimal": "&#127925;",
  "category": "s",
  "emoji_order": "1824"
}, {
  "name": "notes",
  "unicode": "1f3b6",
  "shortname": ":notes:",
  "code_decimal": "&#127926;",
  "category": "s",
  "emoji_order": "1825"
}, {
  "name": "studio_microphone",
  "unicode": "1f399",
  "shortname": ":microphone2:",
  "code_decimal": "&#127897;",
  "category": "o",
  "emoji_order": "1826"
}, {
  "name": "level_slider",
  "unicode": "1f39a",
  "shortname": ":level_slider:",
  "code_decimal": "&#127898;",
  "category": "o",
  "emoji_order": "1827"
}, {
  "name": "control_knobs",
  "unicode": "1f39b",
  "shortname": ":control_knobs:",
  "code_decimal": "&#127899;",
  "category": "o",
  "emoji_order": "1828"
}, {
  "name": "microphone",
  "unicode": "1f3a4",
  "shortname": ":microphone:",
  "code_decimal": "&#127908;",
  "category": "a",
  "emoji_order": "1829"
}, {
  "name": "headphones",
  "unicode": "1f3a7",
  "shortname": ":headphones:",
  "code_decimal": "&#127911;",
  "category": "a",
  "emoji_order": "1830"
}, {
  "name": "radio",
  "unicode": "1f4fb",
  "shortname": ":radio:",
  "code_decimal": "&#128251;",
  "category": "o",
  "emoji_order": "1831"
}, {
  "name": "saxophone",
  "unicode": "1f3b7",
  "shortname": ":saxophone:",
  "code_decimal": "&#127927;",
  "category": "a",
  "emoji_order": "1832"
}, {
  "name": "guitar",
  "unicode": "1f3b8",
  "shortname": ":guitar:",
  "code_decimal": "&#127928;",
  "category": "a",
  "emoji_order": "1833"
}, {
  "name": "musical_keyboard",
  "unicode": "1f3b9",
  "shortname": ":musical_keyboard:",
  "code_decimal": "&#127929;",
  "category": "a",
  "emoji_order": "1834"
}, {
  "name": "trumpet",
  "unicode": "1f3ba",
  "shortname": ":trumpet:",
  "code_decimal": "&#127930;",
  "category": "a",
  "emoji_order": "1835"
}, {
  "name": "violin",
  "unicode": "1f3bb",
  "shortname": ":violin:",
  "code_decimal": "&#127931;",
  "category": "a",
  "emoji_order": "1836"
},
/*{ //@todo not found on image
  "name": "drum",
  "unicode": "1f941",
  "shortname": ":drum:",
  "code_decimal": "&#129345;",
  "category": "a",
  "emoji_order": "1837"
},*/
{
  "name": "iphone",
  "unicode": "1f4f1",
  "shortname": ":iphone:",
  "code_decimal": "&#128241;",
  "category": "o",
  "emoji_order": "1838"
}, {
  "name": "calling",
  "unicode": "1f4f2",
  "shortname": ":calling:",
  "code_decimal": "&#128242;",
  "category": "o",
  "emoji_order": "1839"
}, {
  "name": "telephone",
  "unicode": "260e",
  "shortname": ":telephone:",
  "code_decimal": "&#9742;",
  "category": "o",
  "emoji_order": "1840"
}, {
  "name": "telephone_receiver",
  "unicode": "1f4de",
  "shortname": ":telephone_receiver:",
  "code_decimal": "&#128222;",
  "category": "o",
  "emoji_order": "1841"
}, {
  "name": "pager",
  "unicode": "1f4df",
  "shortname": ":pager:",
  "code_decimal": "&#128223;",
  "category": "o",
  "emoji_order": "1842"
}, {
  "name": "fax",
  "unicode": "1f4e0",
  "shortname": ":fax:",
  "code_decimal": "&#128224;",
  "category": "o",
  "emoji_order": "1843"
}, {
  "name": "battery",
  "unicode": "1f50b",
  "shortname": ":battery:",
  "code_decimal": "&#128267;",
  "category": "o",
  "emoji_order": "1844"
}, {
  "name": "electric_plug",
  "unicode": "1f50c",
  "shortname": ":electric_plug:",
  "code_decimal": "&#128268;",
  "category": "o",
  "emoji_order": "1845"
}, {
  "name": "computer",
  "unicode": "1f4bb",
  "shortname": ":computer:",
  "code_decimal": "&#128187;",
  "category": "o",
  "emoji_order": "1846"
}, {
  "name": "desktop_computer",
  "unicode": "1f5a5",
  "shortname": ":desktop:",
  "code_decimal": "&#128421;",
  "category": "o",
  "emoji_order": "1847"
}, {
  "name": "printer",
  "unicode": "1f5a8",
  "shortname": ":printer:",
  "code_decimal": "&#128424;",
  "category": "o",
  "emoji_order": "1848"
}, {
  "name": "keyboard",
  "unicode": "2328",
  "shortname": ":keyboard:",
  "code_decimal": "&#9000;",
  "category": "o",
  "emoji_order": "1849"
}, {
  "name": "three_button_mouse",
  "unicode": "1f5b1",
  "shortname": ":mouse_three_button:",
  "code_decimal": "&#128433;",
  "category": "o",
  "emoji_order": "1850"
}, {
  "name": "trackball",
  "unicode": "1f5b2",
  "shortname": ":trackball:",
  "code_decimal": "&#128434;",
  "category": "o",
  "emoji_order": "1851"
}, {
  "name": "minidisc",
  "unicode": "1f4bd",
  "shortname": ":minidisc:",
  "code_decimal": "&#128189;",
  "category": "o",
  "emoji_order": "1852"
}, {
  "name": "floppy_disk",
  "unicode": "1f4be",
  "shortname": ":floppy_disk:",
  "code_decimal": "&#128190;",
  "category": "o",
  "emoji_order": "1853"
}, {
  "name": "cd",
  "unicode": "1f4bf",
  "shortname": ":cd:",
  "code_decimal": "&#128191;",
  "category": "o",
  "emoji_order": "1854"
}, {
  "name": "dvd",
  "unicode": "1f4c0",
  "shortname": ":dvd:",
  "code_decimal": "&#128192;",
  "category": "o",
  "emoji_order": "1855"
}, {
  "name": "movie_camera",
  "unicode": "1f3a5",
  "shortname": ":movie_camera:",
  "code_decimal": "&#127909;",
  "category": "o",
  "emoji_order": "1856"
}, {
  "name": "film_frames",
  "unicode": "1f39e",
  "shortname": ":film_frames:",
  "code_decimal": "&#127902;",
  "category": "o",
  "emoji_order": "1857"
}, {
  "name": "film_projector",
  "unicode": "1f4fd",
  "shortname": ":projector:",
  "code_decimal": "&#128253;",
  "category": "o",
  "emoji_order": "1858"
}, {
  "name": "clapper",
  "unicode": "1f3ac",
  "shortname": ":clapper:",
  "code_decimal": "&#127916;",
  "category": "a",
  "emoji_order": "1859"
}, {
  "name": "tv",
  "unicode": "1f4fa",
  "shortname": ":tv:",
  "code_decimal": "&#128250;",
  "category": "o",
  "emoji_order": "1860"
}, {
  "name": "camera",
  "unicode": "1f4f7",
  "shortname": ":camera:",
  "code_decimal": "&#128247;",
  "category": "o",
  "emoji_order": "1861"
}, {
  "name": "camera_with_flash",
  "unicode": "1f4f8",
  "shortname": ":camera_with_flash:",
  "code_decimal": "&#128248;",
  "category": "o",
  "emoji_order": "1862"
}, {
  "name": "video_camera",
  "unicode": "1f4f9",
  "shortname": ":video_camera:",
  "code_decimal": "&#128249;",
  "category": "o",
  "emoji_order": "1863"
}, {
  "name": "vhs",
  "unicode": "1f4fc",
  "shortname": ":vhs:",
  "code_decimal": "&#128252;",
  "category": "o",
  "emoji_order": "1864"
}, {
  "name": "mag",
  "unicode": "1f50d",
  "shortname": ":mag:",
  "code_decimal": "&#128269;",
  "category": "o",
  "emoji_order": "1865"
}, {
  "name": "mag_right",
  "unicode": "1f50e",
  "shortname": ":mag_right:",
  "code_decimal": "&#128270;",
  "category": "o",
  "emoji_order": "1866"
}, {
  "name": "microscope",
  "unicode": "1f52c",
  "shortname": ":microscope:",
  "code_decimal": "&#128300;",
  "category": "o",
  "emoji_order": "1867"
}, {
  "name": "telescope",
  "unicode": "1f52d",
  "shortname": ":telescope:",
  "code_decimal": "&#128301;",
  "category": "o",
  "emoji_order": "1868"
}, {
  "name": "satellite_antenna",
  "unicode": "1f4e1",
  "shortname": ":satellite:",
  "code_decimal": "&#128225;",
  "category": "o",
  "emoji_order": "1869"
}, {
  "name": "candle",
  "unicode": "1f56f",
  "shortname": ":candle:",
  "code_decimal": "&#128367;",
  "category": "o",
  "emoji_order": "1870"
}, {
  "name": "bulb",
  "unicode": "1f4a1",
  "shortname": ":bulb:",
  "code_decimal": "&#128161;",
  "category": "o",
  "emoji_order": "1871"
}, {
  "name": "flashlight",
  "unicode": "1f526",
  "shortname": ":flashlight:",
  "code_decimal": "&#128294;",
  "category": "o",
  "emoji_order": "1872"
}, {
  "name": "izakaya_lantern",
  "unicode": "1f3ee",
  "shortname": ":izakaya_lantern:",
  "code_decimal": "&#127982;",
  "category": "o",
  "emoji_order": "1873"
}, {
  "name": "notebook_with_decorative_cover",
  "unicode": "1f4d4",
  "shortname": ":notebook_with_decorative_cover:",
  "code_decimal": "&#128212;",
  "category": "o",
  "emoji_order": "1874"
}, {
  "name": "closed_book",
  "unicode": "1f4d5",
  "shortname": ":closed_book:",
  "code_decimal": "&#128213;",
  "category": "o",
  "emoji_order": "1875"
}, {
  "name": "book",
  "unicode": "1f4d6",
  "shortname": ":book:",
  "code_decimal": "&#128214;",
  "category": "o",
  "emoji_order": "1876"
}, {
  "name": "green_book",
  "unicode": "1f4d7",
  "shortname": ":green_book:",
  "code_decimal": "&#128215;",
  "category": "o",
  "emoji_order": "1877"
}, {
  "name": "blue_book",
  "unicode": "1f4d8",
  "shortname": ":blue_book:",
  "code_decimal": "&#128216;",
  "category": "o",
  "emoji_order": "1878"
}, {
  "name": "orange_book",
  "unicode": "1f4d9",
  "shortname": ":orange_book:",
  "code_decimal": "&#128217;",
  "category": "o",
  "emoji_order": "1879"
}, {
  "name": "books",
  "unicode": "1f4da",
  "shortname": ":books:",
  "code_decimal": "&#128218;",
  "category": "o",
  "emoji_order": "1880"
}, {
  "name": "notebook",
  "unicode": "1f4d3",
  "shortname": ":notebook:",
  "code_decimal": "&#128211;",
  "category": "o",
  "emoji_order": "1881"
}, {
  "name": "ledger",
  "unicode": "1f4d2",
  "shortname": ":ledger:",
  "code_decimal": "&#128210;",
  "category": "o",
  "emoji_order": "1882"
}, {
  "name": "page_with_curl",
  "unicode": "1f4c3",
  "shortname": ":page_with_curl:",
  "code_decimal": "&#128195;",
  "category": "o",
  "emoji_order": "1883"
}, {
  "name": "scroll",
  "unicode": "1f4dc",
  "shortname": ":scroll:",
  "code_decimal": "&#128220;",
  "category": "o",
  "emoji_order": "1884"
}, {
  "name": "page_facing_up",
  "unicode": "1f4c4",
  "shortname": ":page_facing_up:",
  "code_decimal": "&#128196;",
  "category": "o",
  "emoji_order": "1885"
}, {
  "name": "newspaper",
  "unicode": "1f4f0",
  "shortname": ":newspaper:",
  "code_decimal": "&#128240;",
  "category": "o",
  "emoji_order": "1886"
}, {
  "name": "rolled_up_newspaper",
  "unicode": "1f5de",
  "shortname": ":newspaper2:",
  "code_decimal": "&#128478;",
  "category": "o",
  "emoji_order": "1887"
}, {
  "name": "bookmark_tabs",
  "unicode": "1f4d1",
  "shortname": ":bookmark_tabs:",
  "code_decimal": "&#128209;",
  "category": "o",
  "emoji_order": "1888"
}, {
  "name": "bookmark",
  "unicode": "1f516",
  "shortname": ":bookmark:",
  "code_decimal": "&#128278;",
  "category": "o",
  "emoji_order": "1889"
}, {
  "name": "label",
  "unicode": "1f3f7",
  "shortname": ":label:",
  "code_decimal": "&#127991;",
  "category": "o",
  "emoji_order": "1890"
}, {
  "name": "moneybag",
  "unicode": "1f4b0",
  "shortname": ":moneybag:",
  "code_decimal": "&#128176;",
  "category": "o",
  "emoji_order": "1891"
}, {
  "name": "yen",
  "unicode": "1f4b4",
  "shortname": ":yen:",
  "code_decimal": "&#128180;",
  "category": "o",
  "emoji_order": "1892"
}, {
  "name": "dollar",
  "unicode": "1f4b5",
  "shortname": ":dollar:",
  "code_decimal": "&#128181;",
  "category": "o",
  "emoji_order": "1893"
}, {
  "name": "euro",
  "unicode": "1f4b6",
  "shortname": ":euro:",
  "code_decimal": "&#128182;",
  "category": "o",
  "emoji_order": "1894"
}, {
  "name": "pound",
  "unicode": "1f4b7",
  "shortname": ":pound:",
  "code_decimal": "&#128183;",
  "category": "o",
  "emoji_order": "1895"
}, {
  "name": "money_with_wings",
  "unicode": "1f4b8",
  "shortname": ":money_with_wings:",
  "code_decimal": "&#128184;",
  "category": "o",
  "emoji_order": "1896"
}, {
  "name": "credit_card",
  "unicode": "1f4b3",
  "shortname": ":credit_card:",
  "code_decimal": "&#128179;",
  "category": "o",
  "emoji_order": "1897"
}, {
  "name": "chart",
  "unicode": "1f4b9",
  "shortname": ":chart:",
  "code_decimal": "&#128185;",
  "category": "s",
  "emoji_order": "1898"
}, {
  "name": "currency_exchange",
  "unicode": "1f4b1",
  "shortname": ":currency_exchange:",
  "code_decimal": "&#128177;",
  "category": "s",
  "emoji_order": "1899"
}, {
  "name": "heavy_dollar_sign",
  "unicode": "1f4b2",
  "shortname": ":heavy_dollar_sign:",
  "code_decimal": "&#128178;",
  "category": "s",
  "emoji_order": "1900"
},
/* { //@todo not found on image
  "name": "envelope",
  "unicode": "2709",
  "shortname": ":envelope:",
  "code_decimal": "&#9993;",
  "category": "o",
  "emoji_order": "1901"
},*/
{
  "name": "e-mail",
  "unicode": "1f4e7",
  "shortname": ":e-mail:",
  "code_decimal": "&#128231;",
  "category": "o",
  "emoji_order": "1902"
}, {
  "name": "incoming_envelope",
  "unicode": "1f4e8",
  "shortname": ":incoming_envelope:",
  "code_decimal": "&#128232;",
  "category": "o",
  "emoji_order": "1903"
}, {
  "name": "envelope_with_arrow",
  "unicode": "1f4e9",
  "shortname": ":envelope_with_arrow:",
  "code_decimal": "&#128233;",
  "category": "o",
  "emoji_order": "1904"
}, {
  "name": "outbox_tray",
  "unicode": "1f4e4",
  "shortname": ":outbox_tray:",
  "code_decimal": "&#128228;",
  "category": "o",
  "emoji_order": "1905"
}, {
  "name": "inbox_tray",
  "unicode": "1f4e5",
  "shortname": ":inbox_tray:",
  "code_decimal": "&#128229;",
  "category": "o",
  "emoji_order": "1906"
}, {
  "name": "package",
  "unicode": "1f4e6",
  "shortname": ":package:",
  "code_decimal": "&#128230;",
  "category": "o",
  "emoji_order": "1907"
}, {
  "name": "mailbox",
  "unicode": "1f4eb",
  "shortname": ":mailbox:",
  "code_decimal": "&#128235;",
  "category": "o",
  "emoji_order": "1908"
}, {
  "name": "mailbox_closed",
  "unicode": "1f4ea",
  "shortname": ":mailbox_closed:",
  "code_decimal": "&#128234;",
  "category": "o",
  "emoji_order": "1909"
}, {
  "name": "mailbox_with_mail",
  "unicode": "1f4ec",
  "shortname": ":mailbox_with_mail:",
  "code_decimal": "&#128236;",
  "category": "o",
  "emoji_order": "1910"
}, {
  "name": "mailbox_with_no_mail",
  "unicode": "1f4ed",
  "shortname": ":mailbox_with_no_mail:",
  "code_decimal": "&#128237;",
  "category": "o",
  "emoji_order": "1911"
}, {
  "name": "postbox",
  "unicode": "1f4ee",
  "shortname": ":postbox:",
  "code_decimal": "&#128238;",
  "category": "o",
  "emoji_order": "1912"
}, {
  "name": "ballot_box_with_ballot",
  "unicode": "1f5f3",
  "shortname": ":ballot_box:",
  "code_decimal": "&#128499;",
  "category": "o",
  "emoji_order": "1913"
}, {
  "name": "pencil2",
  "unicode": "270f",
  "shortname": ":pencil2:",
  "code_decimal": "&#9999;",
  "category": "o",
  "emoji_order": "1914"
}, {
  "name": "black_nib",
  "unicode": "2712",
  "shortname": ":black_nib:",
  "code_decimal": "&#10002;",
  "category": "o",
  "emoji_order": "1915"
}, {
  "name": "lower_left_fountain_pen",
  "unicode": "1f58b",
  "shortname": ":pen_fountain:",
  "code_decimal": "&#128395;",
  "category": "o",
  "emoji_order": "1916"
}, {
  "name": "lower_left_ballpoint_pen",
  "unicode": "1f58a",
  "shortname": ":pen_ballpoint:",
  "code_decimal": "&#128394;",
  "category": "o",
  "emoji_order": "1917"
}, {
  "name": "lower_left_paintbrush",
  "unicode": "1f58c",
  "shortname": ":paintbrush:",
  "code_decimal": "&#128396;",
  "category": "o",
  "emoji_order": "1918"
}, {
  "name": "lower_left_crayon",
  "unicode": "1f58d",
  "shortname": ":crayon:",
  "code_decimal": "&#128397;",
  "category": "o",
  "emoji_order": "1919"
}, {
  "name": "memo",
  "unicode": "1f4dd",
  "shortname": ":pencil:",
  "code_decimal": "&#128221;",
  "category": "o",
  "emoji_order": "1920"
}, {
  "name": "briefcase",
  "unicode": "1f4bc",
  "shortname": ":briefcase:",
  "code_decimal": "&#128188;",
  "category": "p",
  "emoji_order": "1921"
}, {
  "name": "file_folder",
  "unicode": "1f4c1",
  "shortname": ":file_folder:",
  "code_decimal": "&#128193;",
  "category": "o",
  "emoji_order": "1922"
}, {
  "name": "open_file_folder",
  "unicode": "1f4c2",
  "shortname": ":open_file_folder:",
  "code_decimal": "&#128194;",
  "category": "o",
  "emoji_order": "1923"
}, {
  "name": "card_index_dividers",
  "unicode": "1f5c2",
  "shortname": ":dividers:",
  "code_decimal": "&#128450;",
  "category": "o",
  "emoji_order": "1924"
}, {
  "name": "date",
  "unicode": "1f4c5",
  "shortname": ":date:",
  "code_decimal": "&#128197;",
  "category": "o",
  "emoji_order": "1925"
}, {
  "name": "calendar",
  "unicode": "1f4c6",
  "shortname": ":calendar:",
  "code_decimal": "&#128198;",
  "category": "o",
  "emoji_order": "1926"
}, {
  "name": "spiral_note_pad",
  "unicode": "1f5d2",
  "shortname": ":notepad_spiral:",
  "code_decimal": "&#128466;",
  "category": "o",
  "emoji_order": "1927"
}, {
  "name": "spiral_calendar_pad",
  "unicode": "1f5d3",
  "shortname": ":calendar_spiral:",
  "code_decimal": "&#128467;",
  "category": "o",
  "emoji_order": "1928"
}, {
  "name": "card_index",
  "unicode": "1f4c7",
  "shortname": ":card_index:",
  "code_decimal": "&#128199;",
  "category": "o",
  "emoji_order": "1929"
}, {
  "name": "chart_with_upwards_trend",
  "unicode": "1f4c8",
  "shortname": ":chart_with_upwards_trend:",
  "code_decimal": "&#128200;",
  "category": "o",
  "emoji_order": "1930"
}, {
  "name": "chart_with_downwards_trend",
  "unicode": "1f4c9",
  "shortname": ":chart_with_downwards_trend:",
  "code_decimal": "&#128201;",
  "category": "o",
  "emoji_order": "1931"
}, {
  "name": "bar_chart",
  "unicode": "1f4ca",
  "shortname": ":bar_chart:",
  "code_decimal": "&#128202;",
  "category": "o",
  "emoji_order": "1932"
}, {
  "name": "clipboard",
  "unicode": "1f4cb",
  "shortname": ":clipboard:",
  "code_decimal": "&#128203;",
  "category": "o",
  "emoji_order": "1933"
}, {
  "name": "pushpin",
  "unicode": "1f4cc",
  "shortname": ":pushpin:",
  "code_decimal": "&#128204;",
  "category": "o",
  "emoji_order": "1934"
}, {
  "name": "round_pushpin",
  "unicode": "1f4cd",
  "shortname": ":round_pushpin:",
  "code_decimal": "&#128205;",
  "category": "o",
  "emoji_order": "1935"
}, {
  "name": "paperclip",
  "unicode": "1f4ce",
  "shortname": ":paperclip:",
  "code_decimal": "&#128206;",
  "category": "o",
  "emoji_order": "1936"
}, {
  "name": "linked_paperclips",
  "unicode": "1f587",
  "shortname": ":paperclips:",
  "code_decimal": "&#128391;",
  "category": "o",
  "emoji_order": "1937"
}, {
  "name": "straight_ruler",
  "unicode": "1f4cf",
  "shortname": ":straight_ruler:",
  "code_decimal": "&#128207;",
  "category": "o",
  "emoji_order": "1938"
}, {
  "name": "triangular_ruler",
  "unicode": "1f4d0",
  "shortname": ":triangular_ruler:",
  "code_decimal": "&#128208;",
  "category": "o",
  "emoji_order": "1939"
}, {
  "name": "scissors",
  "unicode": "2702",
  "shortname": ":scissors:",
  "code_decimal": "&#9986;",
  "category": "o",
  "emoji_order": "1940"
}, {
  "name": "card_file_box",
  "unicode": "1f5c3",
  "shortname": ":card_box:",
  "code_decimal": "&#128451;",
  "category": "o",
  "emoji_order": "1941"
}, {
  "name": "file_cabinet",
  "unicode": "1f5c4",
  "shortname": ":file_cabinet:",
  "code_decimal": "&#128452;",
  "category": "o",
  "emoji_order": "1942"
}, {
  "name": "wastebasket",
  "unicode": "1f5d1",
  "shortname": ":wastebasket:",
  "code_decimal": "&#128465;",
  "category": "o",
  "emoji_order": "1943"
}, {
  "name": "lock",
  "unicode": "1f512",
  "shortname": ":lock:",
  "code_decimal": "&#128274;",
  "category": "o",
  "emoji_order": "1944"
}, {
  "name": "unlock",
  "unicode": "1f513",
  "shortname": ":unlock:",
  "code_decimal": "&#128275;",
  "category": "o",
  "emoji_order": "1945"
}, {
  "name": "lock_with_ink_pen",
  "unicode": "1f50f",
  "shortname": ":lock_with_ink_pen:",
  "code_decimal": "&#128271;",
  "category": "o",
  "emoji_order": "1946"
}, {
  "name": "closed_lock_with_key",
  "unicode": "1f510",
  "shortname": ":closed_lock_with_key:",
  "code_decimal": "&#128272;",
  "category": "o",
  "emoji_order": "1947"
}, {
  "name": "key",
  "unicode": "1f511",
  "shortname": ":key:",
  "code_decimal": "&#128273;",
  "category": "o",
  "emoji_order": "1948"
}, {
  "name": "old_key",
  "unicode": "1f5dd",
  "shortname": ":key2:",
  "code_decimal": "&#128477;",
  "category": "o",
  "emoji_order": "1949"
}, {
  "name": "hammer",
  "unicode": "1f528",
  "shortname": ":hammer:",
  "code_decimal": "&#128296;",
  "category": "o",
  "emoji_order": "1950"
}, {
  "name": "pick",
  "unicode": "26cf",
  "shortname": ":pick:",
  "code_decimal": "&#9935;",
  "category": "o",
  "emoji_order": "1951"
}, {
  "name": "hammer_and_pick",
  "unicode": "2692",
  "shortname": ":hammer_pick:",
  "code_decimal": "&#9874;",
  "category": "o",
  "emoji_order": "1952"
}, {
  "name": "hammer_and_wrench",
  "unicode": "1f6e0",
  "shortname": ":tools:",
  "code_decimal": "&#128736;",
  "category": "o",
  "emoji_order": "1953"
}, {
  "name": "dagger_knife",
  "unicode": "1f5e1",
  "shortname": ":dagger:",
  "code_decimal": "&#128481;",
  "category": "o",
  "emoji_order": "1954"
}, {
  "name": "crossed_swords",
  "unicode": "2694",
  "shortname": ":crossed_swords:",
  "code_decimal": "&#9876;",
  "category": "o",
  "emoji_order": "1955"
}, {
  "name": "gun",
  "unicode": "1f52b",
  "shortname": ":gun:",
  "code_decimal": "&#128299;",
  "category": "o",
  "emoji_order": "1956"
}, {
  "name": "bow_and_arrow",
  "unicode": "1f3f9",
  "shortname": ":bow_and_arrow:",
  "code_decimal": "&#127993;",
  "category": "a",
  "emoji_order": "1957"
}, {
  "name": "shield",
  "unicode": "1f6e1",
  "shortname": ":shield:",
  "code_decimal": "&#128737;",
  "category": "o",
  "emoji_order": "1958"
}, {
  "name": "wrench",
  "unicode": "1f527",
  "shortname": ":wrench:",
  "code_decimal": "&#128295;",
  "category": "o",
  "emoji_order": "1959"
}, {
  "name": "nut_and_bolt",
  "unicode": "1f529",
  "shortname": ":nut_and_bolt:",
  "code_decimal": "&#128297;",
  "category": "o",
  "emoji_order": "1960"
}, {
  "name": "gear",
  "unicode": "2699",
  "shortname": ":gear:",
  "code_decimal": "&#9881;",
  "category": "o",
  "emoji_order": "1961"
}, {
  "name": "compression",
  "unicode": "1f5dc",
  "shortname": ":compression:",
  "code_decimal": "&#128476;",
  "category": "o",
  "emoji_order": "1962"
}, {
  "name": "alembic",
  "unicode": "2697",
  "shortname": ":alembic:",
  "code_decimal": "&#9879;",
  "category": "o",
  "emoji_order": "1963"
}, {
  "name": "scales",
  "unicode": "2696",
  "shortname": ":scales:",
  "code_decimal": "&#9878;",
  "category": "o",
  "emoji_order": "1964"
}, {
  "name": "link",
  "unicode": "1f517",
  "shortname": ":link:",
  "code_decimal": "&#128279;",
  "category": "o",
  "emoji_order": "1965"
}, {
  "name": "chains",
  "unicode": "26d3",
  "shortname": ":chains:",
  "code_decimal": "&#9939;",
  "category": "o",
  "emoji_order": "1966"
}, {
  "name": "syringe",
  "unicode": "1f489",
  "shortname": ":syringe:",
  "code_decimal": "&#128137;",
  "category": "o",
  "emoji_order": "1967"
}, {
  "name": "pill",
  "unicode": "1f48a",
  "shortname": ":pill:",
  "code_decimal": "&#128138;",
  "category": "o",
  "emoji_order": "1968"
}, {
  "name": "smoking",
  "unicode": "1f6ac",
  "shortname": ":smoking:",
  "code_decimal": "&#128684;",
  "category": "o",
  "emoji_order": "1969"
}, {
  "name": "coffin",
  "unicode": "26b0",
  "shortname": ":coffin:",
  "code_decimal": "&#9904;",
  "category": "o",
  "emoji_order": "1970"
}, {
  "name": "funeral_urn",
  "unicode": "26b1",
  "shortname": ":urn:",
  "code_decimal": "&#9905;",
  "category": "o",
  "emoji_order": "1971"
}, {
  "name": "moyai",
  "unicode": "1f5ff",
  "shortname": ":moyai:",
  "code_decimal": "&#128511;",
  "category": "o",
  "emoji_order": "1972"
}, {
  "name": "oil_drum",
  "unicode": "1f6e2",
  "shortname": ":oil:",
  "code_decimal": "&#128738;",
  "category": "o",
  "emoji_order": "1973"
}, {
  "name": "crystal_ball",
  "unicode": "1f52e",
  "shortname": ":crystal_ball:",
  "code_decimal": "&#128302;",
  "category": "o",
  "emoji_order": "1974"
},
/*{ //@todo not found on image
  "name": "shopping_cart",
  "unicode": "1f6d2",
  "shortname": ":shopping_cart:",
  "code_decimal": "&#128722;",
  "category": "o",
  "emoji_order": "1975"
},*/
{
  "name": "atm",
  "unicode": "1f3e7",
  "shortname": ":atm:",
  "code_decimal": "&#127975;",
  "category": "s",
  "emoji_order": "1976"
}, {
  "name": "put_litter_in_its_place",
  "unicode": "1f6ae",
  "shortname": ":put_litter_in_its_place:",
  "code_decimal": "&#128686;",
  "category": "s",
  "emoji_order": "1977"
}, {
  "name": "potable_water",
  "unicode": "1f6b0",
  "shortname": ":potable_water:",
  "code_decimal": "&#128688;",
  "category": "s",
  "emoji_order": "1978"
}, {
  "name": "wheelchair",
  "unicode": "267f",
  "shortname": ":wheelchair:",
  "code_decimal": "&#9855;",
  "category": "s",
  "emoji_order": "1979"
}, {
  "name": "mens",
  "unicode": "1f6b9",
  "shortname": ":mens:",
  "code_decimal": "&#128697;",
  "category": "s",
  "emoji_order": "1980"
}, {
  "name": "womens",
  "unicode": "1f6ba",
  "shortname": ":womens:",
  "code_decimal": "&#128698;",
  "category": "s",
  "emoji_order": "1981"
}, {
  "name": "restroom",
  "unicode": "1f6bb",
  "shortname": ":restroom:",
  "code_decimal": "&#128699;",
  "category": "s",
  "emoji_order": "1982"
}, {
  "name": "baby_symbol",
  "unicode": "1f6bc",
  "shortname": ":baby_symbol:",
  "code_decimal": "&#128700;",
  "category": "s",
  "emoji_order": "1983"
}, {
  "name": "wc",
  "unicode": "1f6be",
  "shortname": ":wc:",
  "code_decimal": "&#128702;",
  "category": "s",
  "emoji_order": "1984"
}, {
  "name": "passport_control",
  "unicode": "1f6c2",
  "shortname": ":passport_control:",
  "code_decimal": "&#128706;",
  "category": "s",
  "emoji_order": "1985"
}, {
  "name": "customs",
  "unicode": "1f6c3",
  "shortname": ":customs:",
  "code_decimal": "&#128707;",
  "category": "s",
  "emoji_order": "1986"
}, {
  "name": "baggage_claim",
  "unicode": "1f6c4",
  "shortname": ":baggage_claim:",
  "code_decimal": "&#128708;",
  "category": "s",
  "emoji_order": "1987"
}, {
  "name": "left_luggage",
  "unicode": "1f6c5",
  "shortname": ":left_luggage:",
  "code_decimal": "&#128709;",
  "category": "s",
  "emoji_order": "1988"
}, {
  "name": "warning",
  "unicode": "26a0",
  "shortname": ":warning:",
  "code_decimal": "&#9888;",
  "category": "s",
  "emoji_order": "1989"
}, {
  "name": "children_crossing",
  "unicode": "1f6b8",
  "shortname": ":children_crossing:",
  "code_decimal": "&#128696;",
  "category": "s",
  "emoji_order": "1990"
}, {
  "name": "no_entry",
  "unicode": "26d4",
  "shortname": ":no_entry:",
  "code_decimal": "&#9940;",
  "category": "s",
  "emoji_order": "1991"
}, {
  "name": "no_entry_sign",
  "unicode": "1f6ab",
  "shortname": ":no_entry_sign:",
  "code_decimal": "&#128683;",
  "category": "s",
  "emoji_order": "1992"
}, {
  "name": "no_bicycles",
  "unicode": "1f6b3",
  "shortname": ":no_bicycles:",
  "code_decimal": "&#128691;",
  "category": "s",
  "emoji_order": "1993"
}, {
  "name": "no_smoking",
  "unicode": "1f6ad",
  "shortname": ":no_smoking:",
  "code_decimal": "&#128685;",
  "category": "s",
  "emoji_order": "1994"
}, {
  "name": "do_not_litter",
  "unicode": "1f6af",
  "shortname": ":do_not_litter:",
  "code_decimal": "&#128687;",
  "category": "s",
  "emoji_order": "1995"
}, {
  "name": "non-potable_water",
  "unicode": "1f6b1",
  "shortname": ":non-potable_water:",
  "code_decimal": "&#128689;",
  "category": "s",
  "emoji_order": "1996"
}, {
  "name": "no_pedestrians",
  "unicode": "1f6b7",
  "shortname": ":no_pedestrians:",
  "code_decimal": "&#128695;",
  "category": "s",
  "emoji_order": "1997"
}, {
  "name": "no_mobile_phones",
  "unicode": "1f4f5",
  "shortname": ":no_mobile_phones:",
  "code_decimal": "&#128245;",
  "category": "s",
  "emoji_order": "1998"
}, {
  "name": "underage",
  "unicode": "1f51e",
  "shortname": ":underage:",
  "code_decimal": "&#128286;",
  "category": "s",
  "emoji_order": "1999"
}, {
  "name": "radioactive",
  "unicode": "2622",
  "shortname": ":radioactive:",
  "code_decimal": "&#9762;",
  "category": "s",
  "emoji_order": "2000"
}, {
  "name": "biohazard",
  "unicode": "2623",
  "shortname": ":biohazard:",
  "code_decimal": "&#9763;",
  "category": "s",
  "emoji_order": "2001"
}, {
  "name": "arrow_up",
  "unicode": "2b06",
  "shortname": ":arrow_up:",
  "code_decimal": "&#11014;",
  "category": "s",
  "emoji_order": "2002"
}, {
  "name": "arrow_upper_right",
  "unicode": "2197",
  "shortname": ":arrow_upper_right:",
  "code_decimal": "&#8599;",
  "category": "s",
  "emoji_order": "2003"
}, {
  "name": "arrow_right",
  "unicode": "27a1",
  "shortname": ":arrow_right:",
  "code_decimal": "&#10145;",
  "category": "s",
  "emoji_order": "2004"
}, {
  "name": "arrow_lower_right",
  "unicode": "2198",
  "shortname": ":arrow_lower_right:",
  "code_decimal": "&#8600;",
  "category": "s",
  "emoji_order": "2005"
}, {
  "name": "arrow_down",
  "unicode": "2b07",
  "shortname": ":arrow_down:",
  "code_decimal": "&#11015;",
  "category": "s",
  "emoji_order": "2006"
}, {
  "name": "arrow_lower_left",
  "unicode": "2199",
  "shortname": ":arrow_lower_left:",
  "code_decimal": "&#8601;",
  "category": "s",
  "emoji_order": "2007"
}, {
  "name": "arrow_left",
  "unicode": "2b05",
  "shortname": ":arrow_left:",
  "code_decimal": "&#11013;",
  "category": "s",
  "emoji_order": "2008"
}, {
  "name": "arrow_upper_left",
  "unicode": "2196",
  "shortname": ":arrow_upper_left:",
  "code_decimal": "&#8598;",
  "category": "s",
  "emoji_order": "2009"
}, {
  "name": "arrow_up_down",
  "unicode": "2195",
  "shortname": ":arrow_up_down:",
  "code_decimal": "&#8597;",
  "category": "s",
  "emoji_order": "2010"
}, {
  "name": "left_right_arrow",
  "unicode": "2194",
  "shortname": ":left_right_arrow:",
  "code_decimal": "&harr;",
  "category": "s",
  "emoji_order": "2011"
}, {
  "name": "leftwards_arrow_with_hook",
  "unicode": "21a9",
  "shortname": ":leftwards_arrow_with_hook:",
  "code_decimal": "&#8617;",
  "category": "s",
  "emoji_order": "2012"
}, {
  "name": "arrow_right_hook",
  "unicode": "21aa",
  "shortname": ":arrow_right_hook:",
  "code_decimal": "&#8618;",
  "category": "s",
  "emoji_order": "2013"
}, {
  "name": "arrow_heading_up",
  "unicode": "2934",
  "shortname": ":arrow_heading_up:",
  "code_decimal": "&#10548;",
  "category": "s",
  "emoji_order": "2014"
}, {
  "name": "arrow_heading_down",
  "unicode": "2935",
  "shortname": ":arrow_heading_down:",
  "code_decimal": "&#10549;",
  "category": "s",
  "emoji_order": "2015"
}, {
  "name": "arrows_clockwise",
  "unicode": "1f503",
  "shortname": ":arrows_clockwise:",
  "code_decimal": "&#128259;",
  "category": "s",
  "emoji_order": "2016"
}, {
  "name": "arrows_counterclockwise",
  "unicode": "1f504",
  "shortname": ":arrows_counterclockwise:",
  "code_decimal": "&#128260;",
  "category": "s",
  "emoji_order": "2017"
}, {
  "name": "back",
  "unicode": "1f519",
  "shortname": ":back:",
  "code_decimal": "&#128281;",
  "category": "s",
  "emoji_order": "2018"
}, {
  "name": "end",
  "unicode": "1f51a",
  "shortname": ":end:",
  "code_decimal": "&#128282;",
  "category": "s",
  "emoji_order": "2019"
}, {
  "name": "on",
  "unicode": "1f51b",
  "shortname": ":on:",
  "code_decimal": "&#128283;",
  "category": "s",
  "emoji_order": "2020"
}, {
  "name": "soon",
  "unicode": "1f51c",
  "shortname": ":soon:",
  "code_decimal": "&#128284;",
  "category": "s",
  "emoji_order": "2021"
}, {
  "name": "top",
  "unicode": "1f51d",
  "shortname": ":top:",
  "code_decimal": "&#128285;",
  "category": "s",
  "emoji_order": "2022"
}, {
  "name": "place_of_worship",
  "unicode": "1f6d0",
  "shortname": ":place_of_worship:",
  "code_decimal": "&#128720;",
  "category": "s",
  "emoji_order": "2023"
}, {
  "name": "atom_symbol",
  "unicode": "269b",
  "shortname": ":atom:",
  "code_decimal": "&#9883;",
  "category": "s",
  "emoji_order": "2024"
}, {
  "name": "om_symbol",
  "unicode": "1f549",
  "shortname": ":om_symbol:",
  "code_decimal": "&#128329;",
  "category": "s",
  "emoji_order": "2025"
}, {
  "name": "star_of_david",
  "unicode": "2721",
  "shortname": ":star_of_david:",
  "code_decimal": "&#10017;",
  "category": "s",
  "emoji_order": "2026"
}, {
  "name": "wheel_of_dharma",
  "unicode": "2638",
  "shortname": ":wheel_of_dharma:",
  "code_decimal": "&#9784;",
  "category": "s",
  "emoji_order": "2027"
}, {
  "name": "yin_yang",
  "unicode": "262f",
  "shortname": ":yin_yang:",
  "code_decimal": "&#9775;",
  "category": "s",
  "emoji_order": "2028"
}, {
  "name": "latin_cross",
  "unicode": "271d",
  "shortname": ":cross:",
  "code_decimal": "&#10013;",
  "category": "s",
  "emoji_order": "2029"
}, {
  "name": "orthodox_cross",
  "unicode": "2626",
  "shortname": ":orthodox_cross:",
  "code_decimal": "&#9766;",
  "category": "s",
  "emoji_order": "2030"
}, {
  "name": "star_and_crescent",
  "unicode": "262a",
  "shortname": ":star_and_crescent:",
  "code_decimal": "&#9770;",
  "category": "s",
  "emoji_order": "2031"
}, {
  "name": "peace_symbol",
  "unicode": "262e",
  "shortname": ":peace:",
  "code_decimal": "&#9774;",
  "category": "s",
  "emoji_order": "2032"
}, {
  "name": "menorah_with_nine_branches",
  "unicode": "1f54e",
  "shortname": ":menorah:",
  "code_decimal": "&#128334;",
  "category": "s",
  "emoji_order": "2033"
}, {
  "name": "six_pointed_star",
  "unicode": "1f52f",
  "shortname": ":six_pointed_star:",
  "code_decimal": "&#128303;",
  "category": "s",
  "emoji_order": "2034"
}, {
  "name": "aries",
  "unicode": "2648",
  "shortname": ":aries:",
  "code_decimal": "&#9800;",
  "category": "s",
  "emoji_order": "2035"
}, {
  "name": "taurus",
  "unicode": "2649",
  "shortname": ":taurus:",
  "code_decimal": "&#9801;",
  "category": "s",
  "emoji_order": "2036"
}, {
  "name": "gemini",
  "unicode": "264a",
  "shortname": ":gemini:",
  "code_decimal": "&#9802;",
  "category": "s",
  "emoji_order": "2037"
}, {
  "name": "cancer",
  "unicode": "264b",
  "shortname": ":cancer:",
  "code_decimal": "&#9803;",
  "category": "s",
  "emoji_order": "2038"
}, {
  "name": "leo",
  "unicode": "264c",
  "shortname": ":leo:",
  "code_decimal": "&#9804;",
  "category": "s",
  "emoji_order": "2039"
}, {
  "name": "virgo",
  "unicode": "264d",
  "shortname": ":virgo:",
  "code_decimal": "&#9805;",
  "category": "s",
  "emoji_order": "2040"
}, {
  "name": "libra",
  "unicode": "264e",
  "shortname": ":libra:",
  "code_decimal": "&#9806;",
  "category": "s",
  "emoji_order": "2041"
}, {
  "name": "scorpius",
  "unicode": "264f",
  "shortname": ":scorpius:",
  "code_decimal": "&#9807;",
  "category": "s",
  "emoji_order": "2042"
}, {
  "name": "sagittarius",
  "unicode": "2650",
  "shortname": ":sagittarius:",
  "code_decimal": "&#9808;",
  "category": "s",
  "emoji_order": "2043"
}, {
  "name": "capricorn",
  "unicode": "2651",
  "shortname": ":capricorn:",
  "code_decimal": "&#9809;",
  "category": "s",
  "emoji_order": "2044"
}, {
  "name": "aquarius",
  "unicode": "2652",
  "shortname": ":aquarius:",
  "code_decimal": "&#9810;",
  "category": "s",
  "emoji_order": "2045"
}, {
  "name": "pisces",
  "unicode": "2653",
  "shortname": ":pisces:",
  "code_decimal": "&#9811;",
  "category": "s",
  "emoji_order": "2046"
}, {
  "name": "ophiuchus",
  "unicode": "26ce",
  "shortname": ":ophiuchus:",
  "code_decimal": "&#9934;",
  "category": "s",
  "emoji_order": "2047"
}, {
  "name": "twisted_rightwards_arrows",
  "unicode": "1f500",
  "shortname": ":twisted_rightwards_arrows:",
  "code_decimal": "&#128256;",
  "category": "s",
  "emoji_order": "2048"
}, {
  "name": "repeat",
  "unicode": "1f501",
  "shortname": ":repeat:",
  "code_decimal": "&#128257;",
  "category": "s",
  "emoji_order": "2049"
}, {
  "name": "repeat_one",
  "unicode": "1f502",
  "shortname": ":repeat_one:",
  "code_decimal": "&#128258;",
  "category": "s",
  "emoji_order": "2050"
}, {
  "name": "arrow_forward",
  "unicode": "25b6",
  "shortname": ":arrow_forward:",
  "code_decimal": "&#9654;",
  "category": "s",
  "emoji_order": "2051"
}, {
  "name": "fast_forward",
  "unicode": "23e9",
  "shortname": ":fast_forward:",
  "code_decimal": "&#9193;",
  "category": "s",
  "emoji_order": "2052"
}, {
  "name": "black_right_pointing_double_triangle_with_vertical_bar",
  "unicode": "23ed",
  "shortname": ":track_next:",
  "code_decimal": "&#9197;",
  "category": "s",
  "emoji_order": "2053"
}, {
  "name": "black_right_pointing_triangle_with_double_vertical_bar",
  "unicode": "23ef",
  "shortname": ":play_pause:",
  "code_decimal": "&#9199;",
  "category": "s",
  "emoji_order": "2054"
}, {
  "name": "arrow_backward",
  "unicode": "25c0",
  "shortname": ":arrow_backward:",
  "code_decimal": "&#9664;",
  "category": "s",
  "emoji_order": "2055"
}, {
  "name": "rewind",
  "unicode": "23ea",
  "shortname": ":rewind:",
  "code_decimal": "&#9194;",
  "category": "s",
  "emoji_order": "2056"
}, {
  "name": "black_left_pointing_double_triangle_with_vertical_bar",
  "unicode": "23ee",
  "shortname": ":track_previous:",
  "code_decimal": "&#9198;",
  "category": "s",
  "emoji_order": "2057"
}, {
  "name": "arrow_up_small",
  "unicode": "1f53c",
  "shortname": ":arrow_up_small:",
  "code_decimal": "&#128316;",
  "category": "s",
  "emoji_order": "2058"
}, {
  "name": "arrow_double_up",
  "unicode": "23eb",
  "shortname": ":arrow_double_up:",
  "code_decimal": "&#9195;",
  "category": "s",
  "emoji_order": "2059"
}, {
  "name": "arrow_down_small",
  "unicode": "1f53d",
  "shortname": ":arrow_down_small:",
  "code_decimal": "&#128317;",
  "category": "s",
  "emoji_order": "2060"
}, {
  "name": "arrow_double_down",
  "unicode": "23ec",
  "shortname": ":arrow_double_down:",
  "code_decimal": "&#9196;",
  "category": "s",
  "emoji_order": "2061"
}, {
  "name": "double_vertical_bar",
  "unicode": "23f8",
  "shortname": ":pause_button:",
  "code_decimal": "&#9208;",
  "category": "s",
  "emoji_order": "2062"
}, {
  "name": "black_square_for_stop",
  "unicode": "23f9",
  "shortname": ":stop_button:",
  "code_decimal": "&#9209;",
  "category": "s",
  "emoji_order": "2063"
}, {
  "name": "black_circle_for_record",
  "unicode": "23fa",
  "shortname": ":record_button:",
  "code_decimal": "&#9210;",
  "category": "s",
  "emoji_order": "2064"
},
/*{ //@todo not found on image
  "name": "eject",
  "unicode": "23cf",
  "shortname": ":eject:",
  "code_decimal": "&#9167;",
  "category": "s",
  "emoji_order": "2065"
},*/
{
  "name": "cinema",
  "unicode": "1f3a6",
  "shortname": ":cinema:",
  "code_decimal": "&#127910;",
  "category": "s",
  "emoji_order": "2066"
}, {
  "name": "low_brightness",
  "unicode": "1f505",
  "shortname": ":low_brightness:",
  "code_decimal": "&#128261;",
  "category": "s",
  "emoji_order": "2067"
}, {
  "name": "high_brightness",
  "unicode": "1f506",
  "shortname": ":high_brightness:",
  "code_decimal": "&#128262;",
  "category": "s",
  "emoji_order": "2068"
}, {
  "name": "signal_strength",
  "unicode": "1f4f6",
  "shortname": ":signal_strength:",
  "code_decimal": "&#128246;",
  "category": "s",
  "emoji_order": "2069"
}, {
  "name": "vibration_mode",
  "unicode": "1f4f3",
  "shortname": ":vibration_mode:",
  "code_decimal": "&#128243;",
  "category": "s",
  "emoji_order": "2070"
}, {
  "name": "mobile_phone_off",
  "unicode": "1f4f4",
  "shortname": ":mobile_phone_off:",
  "code_decimal": "&#128244;",
  "category": "s",
  "emoji_order": "2071"
}, {
  "name": "recycle",
  "unicode": "267b",
  "shortname": ":recycle:",
  "code_decimal": "&#9851;",
  "category": "s",
  "emoji_order": "2072"
}, {
  "name": "name_badge",
  "unicode": "1f4db",
  "shortname": ":name_badge:",
  "code_decimal": "&#128219;",
  "category": "s",
  "emoji_order": "2073"
}, {
  "name": "fleur_de_lis",
  "unicode": "269c",
  "shortname": ":fleur-de-lis:",
  "code_decimal": "&#9884;",
  "category": "s",
  "emoji_order": "2074"
}, {
  "name": "beginner",
  "unicode": "1f530",
  "shortname": ":beginner:",
  "code_decimal": "&#128304;",
  "category": "s",
  "emoji_order": "2075"
}, {
  "name": "trident",
  "unicode": "1f531",
  "shortname": ":trident:",
  "code_decimal": "&#128305;",
  "category": "s",
  "emoji_order": "2076"
}, {
  "name": "o",
  "unicode": "2b55",
  "shortname": ":o:",
  "code_decimal": "&#11093;",
  "category": "s",
  "emoji_order": "2077"
}, {
  "name": "white_check_mark",
  "unicode": "2705",
  "shortname": ":white_check_mark:",
  "code_decimal": "&#9989;",
  "category": "s",
  "emoji_order": "2078"
}, {
  "name": "ballot_box_with_check",
  "unicode": "2611",
  "shortname": ":ballot_box_with_check:",
  "code_decimal": "&#9745;",
  "category": "s",
  "emoji_order": "2079"
}, {
  "name": "heavy_check_mark",
  "unicode": "2714",
  "shortname": ":heavy_check_mark:",
  "code_decimal": "&#10004;",
  "category": "s",
  "emoji_order": "2080"
}, {
  "name": "heavy_multiplication_x",
  "unicode": "2716",
  "shortname": ":heavy_multiplication_x:",
  "code_decimal": "&#10006;",
  "category": "s",
  "emoji_order": "2081"
}, {
  "name": "x",
  "unicode": "274c",
  "shortname": ":x:",
  "code_decimal": "&#10060;",
  "category": "s",
  "emoji_order": "2082"
}, {
  "name": "negative_squared_cross_mark",
  "unicode": "274e",
  "shortname": ":negative_squared_cross_mark:",
  "code_decimal": "&#10062;",
  "category": "s",
  "emoji_order": "2083"
}, {
  "name": "heavy_plus_sign",
  "unicode": "2795",
  "shortname": ":heavy_plus_sign:",
  "code_decimal": "&#10133;",
  "category": "s",
  "emoji_order": "2084"
}, {
  "name": "heavy_minus_sign",
  "unicode": "2796",
  "shortname": ":heavy_minus_sign:",
  "code_decimal": "&#10134;",
  "category": "s",
  "emoji_order": "2088"
}, {
  "name": "heavy_division_sign",
  "unicode": "2797",
  "shortname": ":heavy_division_sign:",
  "code_decimal": "&#10135;",
  "category": "s",
  "emoji_order": "2089"
}, {
  "name": "curly_loop",
  "unicode": "27b0",
  "shortname": ":curly_loop:",
  "code_decimal": "&#10160;",
  "category": "s",
  "emoji_order": "2090"
}, {
  "name": "loop",
  "unicode": "27bf",
  "shortname": ":loop:",
  "code_decimal": "&#10175;",
  "category": "s",
  "emoji_order": "2091"
}, {
  "name": "part_alternation_mark",
  "unicode": "303d",
  "shortname": ":part_alternation_mark:",
  "code_decimal": "&#12349;",
  "category": "s",
  "emoji_order": "2092"
}, {
  "name": "eight_spoked_asterisk",
  "unicode": "2733",
  "shortname": ":eight_spoked_asterisk:",
  "code_decimal": "&#10035;",
  "category": "s",
  "emoji_order": "2093"
}, {
  "name": "eight_pointed_black_star",
  "unicode": "2734",
  "shortname": ":eight_pointed_black_star:",
  "code_decimal": "&#10036;",
  "category": "s",
  "emoji_order": "2094"
}, {
  "name": "sparkle",
  "unicode": "2747",
  "shortname": ":sparkle:",
  "code_decimal": "&#10055;",
  "category": "s",
  "emoji_order": "2095"
}, {
  "name": "bangbang",
  "unicode": "203c",
  "shortname": ":bangbang:",
  "code_decimal": "&#8252;",
  "category": "s",
  "emoji_order": "2096"
}, {
  "name": "interrobang",
  "unicode": "2049",
  "shortname": ":interrobang:",
  "code_decimal": "&#8265;",
  "category": "s",
  "emoji_order": "2097"
}, {
  "name": "question",
  "unicode": "2753",
  "shortname": ":question:",
  "code_decimal": "&#10067;",
  "category": "s",
  "emoji_order": "2098"
}, {
  "name": "grey_question",
  "unicode": "2754",
  "shortname": ":grey_question:",
  "code_decimal": "&#10068;",
  "category": "s",
  "emoji_order": "2099"
}, {
  "name": "grey_exclamation",
  "unicode": "2755",
  "shortname": ":grey_exclamation:",
  "code_decimal": "&#10069;",
  "category": "s",
  "emoji_order": "2100"
}, {
  "name": "exclamation",
  "unicode": "2757",
  "shortname": ":exclamation:",
  "code_decimal": "&#10071;",
  "category": "s",
  "emoji_order": "2101"
}, {
  "name": "wavy_dash",
  "unicode": "3030",
  "shortname": ":wavy_dash:",
  "code_decimal": "&#12336;",
  "category": "s",
  "emoji_order": "2102"
}, {
  "name": "copyright",
  "unicode": "00a9",
  "shortname": ":copyright:",
  "code_decimal": "&copy;",
  "category": "s",
  "emoji_order": "2103"
}, {
  "name": "registered",
  "unicode": "00ae",
  "shortname": ":registered:",
  "code_decimal": "&reg;",
  "category": "s",
  "emoji_order": "2104"
}, {
  "name": "tm",
  "unicode": "2122",
  "shortname": ":tm:",
  "code_decimal": "&trade;",
  "category": "s",
  "emoji_order": "2105"
}, {
  "name": "hash",
  "unicode": "0023-fe0f-20e3",
  "shortname": ":hash:",
  "code_decimal": "&#35;&#65039;&#8419;",
  "category": "s",
  "emoji_order": "2106"
}, {
  "name": "keycap_star",
  "unicode": "002a-fe0f-20e3",
  "shortname": ":asterisk:",
  "code_decimal": "&#42;&#65039;&#8419;",
  "category": "s",
  "emoji_order": "2107"
}, {
  "name": "zero",
  "unicode": "0030-fe0f-20e3",
  "shortname": ":zero:",
  "code_decimal": "&#48;&#65039;&#8419;",
  "category": "s",
  "emoji_order": "2108"
}, {
  "name": "one",
  "unicode": "0031-fe0f-20e3",
  "shortname": ":one:",
  "code_decimal": "&#49;&#65039;&#8419;",
  "category": "s",
  "emoji_order": "2109"
}, {
  "name": "two",
  "unicode": "0032-fe0f-20e3",
  "shortname": ":two:",
  "code_decimal": "&#50;&#65039;&#8419;",
  "category": "s",
  "emoji_order": "2110"
}, {
  "name": "three",
  "unicode": "0033-fe0f-20e3",
  "shortname": ":three:",
  "code_decimal": "&#51;&#65039;&#8419;",
  "category": "s",
  "emoji_order": "2111"
}, {
  "name": "four",
  "unicode": "0034-fe0f-20e3",
  "shortname": ":four:",
  "code_decimal": "&#52;&#65039;&#8419;",
  "category": "s",
  "emoji_order": "2112"
}, {
  "name": "five",
  "unicode": "0035-fe0f-20e3",
  "shortname": ":five:",
  "code_decimal": "&#53;&#65039;&#8419;",
  "category": "s",
  "emoji_order": "2113"
}, {
  "name": "six",
  "unicode": "0036-fe0f-20e3",
  "shortname": ":six:",
  "code_decimal": "&#54;&#65039;&#8419;",
  "category": "s",
  "emoji_order": "2114"
}, {
  "name": "seven",
  "unicode": "0037-fe0f-20e3",
  "shortname": ":seven:",
  "code_decimal": "&#55;&#65039;&#8419;",
  "category": "s",
  "emoji_order": "2115"
}, {
  "name": "eight",
  "unicode": "0038-fe0f-20e3",
  "shortname": ":eight:",
  "code_decimal": "&#56;&#65039;&#8419;",
  "category": "s",
  "emoji_order": "2116"
}, {
  "name": "nine",
  "unicode": "0039-fe0f-20e3",
  "shortname": ":nine:",
  "code_decimal": "&#57;&#65039;&#8419;",
  "category": "s",
  "emoji_order": "2117"
}, {
  "name": "keycap_ten",
  "unicode": "1f51f",
  "shortname": ":keycap_ten:",
  "code_decimal": "&#128287;",
  "category": "s",
  "emoji_order": "2118"
}, {
  "name": "capital_abcd",
  "unicode": "1f520",
  "shortname": ":capital_abcd:",
  "code_decimal": "&#128288;",
  "category": "s",
  "emoji_order": "2120"
}, {
  "name": "abcd",
  "unicode": "1f521",
  "shortname": ":abcd:",
  "code_decimal": "&#128289;",
  "category": "s",
  "emoji_order": "2121"
}, {
  "name": "s",
  "unicode": "1f523",
  "shortname": ":s:",
  "code_decimal": "&#128291;",
  "category": "s",
  "emoji_order": "2123"
}, {
  "name": "abc",
  "unicode": "1f524",
  "shortname": ":abc:",
  "code_decimal": "&#128292;",
  "category": "s",
  "emoji_order": "2124"
}, {
  "name": "a",
  "unicode": "1f170",
  "shortname": ":a:",
  "code_decimal": "&#127344;",
  "category": "s",
  "emoji_order": "2125"
}, {
  "name": "ab",
  "unicode": "1f18e",
  "shortname": ":ab:",
  "code_decimal": "&#127374;",
  "category": "s",
  "emoji_order": "2126"
}, {
  "name": "b",
  "unicode": "1f171",
  "shortname": ":b:",
  "code_decimal": "&#127345;",
  "category": "s",
  "emoji_order": "2127"
}, {
  "name": "cl",
  "unicode": "1f191",
  "shortname": ":cl:",
  "code_decimal": "&#127377;",
  "category": "s",
  "emoji_order": "2128"
}, {
  "name": "cool",
  "unicode": "1f192",
  "shortname": ":cool:",
  "code_decimal": "&#127378;",
  "category": "s",
  "emoji_order": "2129"
}, {
  "name": "free",
  "unicode": "1f193",
  "shortname": ":free:",
  "code_decimal": "&#127379;",
  "category": "s",
  "emoji_order": "2130"
}, {
  "name": "information_source",
  "unicode": "2139",
  "shortname": ":information_source:",
  "code_decimal": "&#8505;",
  "category": "s",
  "emoji_order": "2131"
}, {
  "name": "id",
  "unicode": "1f194",
  "shortname": ":id:",
  "code_decimal": "&#127380;",
  "category": "s",
  "emoji_order": "2132"
}, {
  "name": "m",
  "unicode": "24c2",
  "shortname": ":m:",
  "code_decimal": "&#9410;",
  "category": "s",
  "emoji_order": "2133"
}, {
  "name": "new",
  "unicode": "1f195",
  "shortname": ":new:",
  "code_decimal": "&#127381;",
  "category": "s",
  "emoji_order": "2134"
}, {
  "name": "ng",
  "unicode": "1f196",
  "shortname": ":ng:",
  "code_decimal": "&#127382;",
  "category": "s",
  "emoji_order": "2135"
}, {
  "name": "o2",
  "unicode": "1f17e",
  "shortname": ":o2:",
  "code_decimal": "&#127358;",
  "category": "s",
  "emoji_order": "2136"
}, {
  "name": "ok",
  "unicode": "1f197",
  "shortname": ":ok:",
  "code_decimal": "&#127383;",
  "category": "s",
  "emoji_order": "2137"
}, {
  "name": "parking",
  "unicode": "1f17f",
  "shortname": ":parking:",
  "code_decimal": "&#127359;",
  "category": "s",
  "emoji_order": "2138"
}, {
  "name": "sos",
  "unicode": "1f198",
  "shortname": ":sos:",
  "code_decimal": "&#127384;",
  "category": "s",
  "emoji_order": "2139"
}, {
  "name": "up",
  "unicode": "1f199",
  "shortname": ":up:",
  "code_decimal": "&#127385;",
  "category": "s",
  "emoji_order": "2140"
}, {
  "name": "vs",
  "unicode": "1f19a",
  "shortname": ":vs:",
  "code_decimal": "&#127386;",
  "category": "s",
  "emoji_order": "2141"
}, {
  "name": "koko",
  "unicode": "1f201",
  "shortname": ":koko:",
  "code_decimal": "&#127489;",
  "category": "s",
  "emoji_order": "2142"
}, {
  "name": "sa",
  "unicode": "1f202",
  "shortname": ":sa:",
  "code_decimal": "&#127490;",
  "category": "s",
  "emoji_order": "2143"
}, {
  "name": "u6708",
  "unicode": "1f237",
  "shortname": ":u6708:",
  "code_decimal": "&#127543;",
  "category": "s",
  "emoji_order": "2144"
}, {
  "name": "u6709",
  "unicode": "1f236",
  "shortname": ":u6709:",
  "code_decimal": "&#127542;",
  "category": "s",
  "emoji_order": "2145"
}, {
  "name": "u6307",
  "unicode": "1f22f",
  "shortname": ":u6307:",
  "code_decimal": "&#127535;",
  "category": "s",
  "emoji_order": "2146"
}, {
  "name": "ideograph_advantage",
  "unicode": "1f250",
  "shortname": ":ideograph_advantage:",
  "code_decimal": "&#127568;",
  "category": "s",
  "emoji_order": "2147"
}, {
  "name": "u5272",
  "unicode": "1f239",
  "shortname": ":u5272:",
  "code_decimal": "&#127545;",
  "category": "s",
  "emoji_order": "2148"
}, {
  "name": "u7121",
  "unicode": "1f21a",
  "shortname": ":u7121:",
  "code_decimal": "&#127514;",
  "category": "s",
  "emoji_order": "2149"
}, {
  "name": "u7981",
  "unicode": "1f232",
  "shortname": ":u7981:",
  "code_decimal": "&#127538;",
  "category": "s",
  "emoji_order": "2150"
}, {
  "name": "accept",
  "unicode": "1f251",
  "shortname": ":accept:",
  "code_decimal": "&#127569;",
  "category": "s",
  "emoji_order": "2151"
}, {
  "name": "u7533",
  "unicode": "1f238",
  "shortname": ":u7533:",
  "code_decimal": "&#127544;",
  "category": "s",
  "emoji_order": "2152"
}, {
  "name": "u5408",
  "unicode": "1f234",
  "shortname": ":u5408:",
  "code_decimal": "&#127540;",
  "category": "s",
  "emoji_order": "2153"
}, {
  "name": "u7a7a",
  "unicode": "1f233",
  "shortname": ":u7a7a:",
  "code_decimal": "&#127539;",
  "category": "s",
  "emoji_order": "2154"
}, {
  "name": "congratulations",
  "unicode": "3297",
  "shortname": ":congratulations:",
  "code_decimal": "&#12951;",
  "category": "s",
  "emoji_order": "2155"
}, {
  "name": "secret",
  "unicode": "3299",
  "shortname": ":secret:",
  "code_decimal": "&#12953;",
  "category": "s",
  "emoji_order": "2156"
}, {
  "name": "u55b6",
  "unicode": "1f23a",
  "shortname": ":u55b6:",
  "code_decimal": "&#127546;",
  "category": "s",
  "emoji_order": "2157"
}, {
  "name": "u6e80",
  "unicode": "1f235",
  "shortname": ":u6e80:",
  "code_decimal": "&#127541;",
  "category": "s",
  "emoji_order": "2158"
}, {
  "name": "black_small_square",
  "unicode": "25aa",
  "shortname": ":black_small_square:",
  "code_decimal": "&#9642;",
  "category": "s",
  "emoji_order": "2159"
}, {
  "name": "white_small_square",
  "unicode": "25ab",
  "shortname": ":white_small_square:",
  "code_decimal": "&#9643;",
  "category": "s",
  "emoji_order": "2160"
}, {
  "name": "white_medium_square",
  "unicode": "25fb",
  "shortname": ":white_medium_square:",
  "code_decimal": "&#9723;",
  "category": "s",
  "emoji_order": "2161"
}, {
  "name": "black_medium_square",
  "unicode": "25fc",
  "shortname": ":black_medium_square:",
  "code_decimal": "&#9724;",
  "category": "s",
  "emoji_order": "2162"
}, {
  "name": "white_medium_small_square",
  "unicode": "25fd",
  "shortname": ":white_medium_small_square:",
  "code_decimal": "&#9725;",
  "category": "s",
  "emoji_order": "2163"
}, {
  "name": "black_medium_small_square",
  "unicode": "25fe",
  "shortname": ":black_medium_small_square:",
  "code_decimal": "&#9726;",
  "category": "s",
  "emoji_order": "2164"
}, {
  "name": "black_large_square",
  "unicode": "2b1b",
  "shortname": ":black_large_square:",
  "code_decimal": "&#11035;",
  "category": "s",
  "emoji_order": "2165"
}, {
  "name": "white_large_square",
  "unicode": "2b1c",
  "shortname": ":white_large_square:",
  "code_decimal": "&#11036;",
  "category": "s",
  "emoji_order": "2166"
}, {
  "name": "large_orange_diamond",
  "unicode": "1f536",
  "shortname": ":large_orange_diamond:",
  "code_decimal": "&#128310;",
  "category": "s",
  "emoji_order": "2167"
}, {
  "name": "large_blue_diamond",
  "unicode": "1f537",
  "shortname": ":large_blue_diamond:",
  "code_decimal": "&#128311;",
  "category": "s",
  "emoji_order": "2168"
}, {
  "name": "small_orange_diamond",
  "unicode": "1f538",
  "shortname": ":small_orange_diamond:",
  "code_decimal": "&#128312;",
  "category": "s",
  "emoji_order": "2169"
}, {
  "name": "small_blue_diamond",
  "unicode": "1f539",
  "shortname": ":small_blue_diamond:",
  "code_decimal": "&#128313;",
  "category": "s",
  "emoji_order": "2170"
}, {
  "name": "small_red_triangle",
  "unicode": "1f53a",
  "shortname": ":small_red_triangle:",
  "code_decimal": "&#128314;",
  "category": "s",
  "emoji_order": "2171"
}, {
  "name": "small_red_triangle_down",
  "unicode": "1f53b",
  "shortname": ":small_red_triangle_down:",
  "code_decimal": "&#128315;",
  "category": "s",
  "emoji_order": "2172"
}, {
  "name": "diamond_shape_with_a_dot_inside",
  "unicode": "1f4a0",
  "shortname": ":diamond_shape_with_a_dot_inside:",
  "code_decimal": "&#128160;",
  "category": "s",
  "emoji_order": "2173"
}, {
  "name": "radio_button",
  "unicode": "1f518",
  "shortname": ":radio_button:",
  "code_decimal": "&#128280;",
  "category": "s",
  "emoji_order": "2174"
}, {
  "name": "black_square_button",
  "unicode": "1f532",
  "shortname": ":black_square_button:",
  "code_decimal": "&#128306;",
  "category": "s",
  "emoji_order": "2175"
}, {
  "name": "white_square_button",
  "unicode": "1f533",
  "shortname": ":white_square_button:",
  "code_decimal": "&#128307;",
  "category": "s",
  "emoji_order": "2176"
}, {
  "name": "white_circle",
  "unicode": "26aa",
  "shortname": ":white_circle:",
  "code_decimal": "&#9898;",
  "category": "s",
  "emoji_order": "2177"
}, {
  "name": "black_circle",
  "unicode": "26ab",
  "shortname": ":black_circle:",
  "code_decimal": "&#9899;",
  "category": "s",
  "emoji_order": "2178"
}, {
  "name": "red_circle",
  "unicode": "1f534",
  "shortname": ":red_circle:",
  "code_decimal": "&#128308;",
  "category": "s",
  "emoji_order": "2179"
}, {
  "name": "large_blue_circle",
  "unicode": "1f535",
  "shortname": ":blue_circle:",
  "code_decimal": "&#128309;",
  "category": "s",
  "emoji_order": "2180"
}, {
  "name": "checkered_flag",
  "unicode": "1f3c1",
  "shortname": ":checkered_flag:",
  "code_decimal": "&#127937;",
  "category": "t",
  "emoji_order": "2181"
}, {
  "name": "triangular_flag_on_post",
  "unicode": "1f6a9",
  "shortname": ":triangular_flag_on_post:",
  "code_decimal": "&#128681;",
  "category": "o",
  "emoji_order": "2182"
}, {
  "name": "crossed_flags",
  "unicode": "1f38c",
  "shortname": ":crossed_flags:",
  "code_decimal": "&#127884;",
  "category": "o",
  "emoji_order": "2183"
}, {
  "name": "waving_black_flag",
  "unicode": "1f3f4",
  "shortname": ":flag_black:",
  "code_decimal": "&#127988;",
  "category": "o",
  "emoji_order": "2184"
}, {
  "name": "waving_white_flag",
  "unicode": "1f3f3",
  "shortname": ":flag_white:",
  "code_decimal": "&#127987;",
  "category": "o",
  "emoji_order": "2185"
}, {
  "name": "flag-ac",
  "unicode": "1f1e6-1f1e8",
  "shortname": ":flag_ac:",
  "code_decimal": "&#127462;&#127464;",
  "category": "f",
  "emoji_order": "2187"
}, {
  "name": "flag-ad",
  "unicode": "1f1e6-1f1e9",
  "shortname": ":flag_ad:",
  "code_decimal": "&#127462;&#127465;",
  "category": "f",
  "emoji_order": "2188"
}, {
  "name": "flag-ae",
  "unicode": "1f1e6-1f1ea",
  "shortname": ":flag_ae:",
  "code_decimal": "&#127462;&#127466;",
  "category": "f",
  "emoji_order": "2189"
}, {
  "name": "flag-af",
  "unicode": "1f1e6-1f1eb",
  "shortname": ":flag_af:",
  "code_decimal": "&#127462;&#127467;",
  "category": "f",
  "emoji_order": "2190"
}, {
  "name": "flag-ag",
  "unicode": "1f1e6-1f1ec",
  "shortname": ":flag_ag:",
  "code_decimal": "&#127462;&#127468;",
  "category": "f",
  "emoji_order": "2191"
}, {
  "name": "flag-ai",
  "unicode": "1f1e6-1f1ee",
  "shortname": ":flag_ai:",
  "code_decimal": "&#127462;&#127470;",
  "category": "f",
  "emoji_order": "2192"
}, {
  "name": "flag-al",
  "unicode": "1f1e6-1f1f1",
  "shortname": ":flag_al:",
  "code_decimal": "&#127462;&#127473;",
  "category": "f",
  "emoji_order": "2193"
}, {
  "name": "flag-am",
  "unicode": "1f1e6-1f1f2",
  "shortname": ":flag_am:",
  "code_decimal": "&#127462;&#127474;",
  "category": "f",
  "emoji_order": "2194"
}, {
  "name": "flag-ao",
  "unicode": "1f1e6-1f1f4",
  "shortname": ":flag-ao:",
  "code_decimal": "&#127462;&#127476;",
  "category": "f",
  "emoji_order": "2195"
}, {
  "name": "flag-aq",
  "unicode": "1f1e6-1f1f6",
  "shortname": ":flag-aq:",
  "code_decimal": "&#127462;&#127478;",
  "category": "f",
  "emoji_order": "2196"
}, {
  "name": "flag-ar",
  "unicode": "1f1e6-1f1f7",
  "shortname": ":flag-ar:",
  "code_decimal": "&#127462;&#127479;",
  "category": "f",
  "emoji_order": "2197"
}, {
  "name": "flag-as",
  "unicode": "1f1e6-1f1f8",
  "shortname": ":flag-as:",
  "code_decimal": "&#127462;&#127480;",
  "category": "f",
  "emoji_order": "2198"
}, {
  "name": "flag-at",
  "unicode": "1f1e6-1f1f9",
  "shortname": ":flag-at:",
  "code_decimal": "&#127462;&#127481;",
  "category": "f",
  "emoji_order": "2199"
}, {
  "name": "flag-au",
  "unicode": "1f1e6-1f1fa",
  "shortname": ":flag-au:",
  "code_decimal": "&#127462;&#127482;",
  "category": "f",
  "emoji_order": "2200"
}, {
  "name": "flag-aw",
  "unicode": "1f1e6-1f1fc",
  "shortname": ":flag-aw:",
  "code_decimal": "&#127462;&#127484;",
  "category": "f",
  "emoji_order": "2201"
}, {
  "name": "flag-ax",
  "unicode": "1f1e6-1f1fd",
  "shortname": ":flag-ax:",
  "code_decimal": "&#127462;&#127485;",
  "category": "f",
  "emoji_order": "2202"
}, {
  "name": "flag-az",
  "unicode": "1f1e6-1f1ff",
  "shortname": ":flag-az:",
  "code_decimal": "&#127462;&#127487;",
  "category": "f",
  "emoji_order": "2203"
}, {
  "name": "flag-ba",
  "unicode": "1f1e7-1f1e6",
  "shortname": ":flag-ba:",
  "code_decimal": "&#127463;&#127462;",
  "category": "f",
  "emoji_order": "2204"
}, {
  "name": "flag-bb",
  "unicode": "1f1e7-1f1e7",
  "shortname": ":flag-bb:",
  "code_decimal": "&#127463;&#127463;",
  "category": "f",
  "emoji_order": "2205"
}, {
  "name": "flag-bd",
  "unicode": "1f1e7-1f1e9",
  "shortname": ":flag-bd:",
  "code_decimal": "&#127463;&#127465;",
  "category": "f",
  "emoji_order": "2206"
}, {
  "name": "flag-be",
  "unicode": "1f1e7-1f1ea",
  "shortname": ":flag-be:",
  "code_decimal": "&#127463;&#127466;",
  "category": "f",
  "emoji_order": "2207"
}, {
  "name": "flag-bf",
  "unicode": "1f1e7-1f1eb",
  "shortname": ":flag-bf:",
  "code_decimal": "&#127463;&#127467;",
  "category": "f",
  "emoji_order": "2208"
}, {
  "name": "flag-bg",
  "unicode": "1f1e7-1f1ec",
  "shortname": ":flag-bg:",
  "code_decimal": "&#127463;&#127468;",
  "category": "f",
  "emoji_order": "2209"
}, {
  "name": "flag-bh",
  "unicode": "1f1e7-1f1ed",
  "shortname": ":flag-bh:",
  "code_decimal": "&#127463;&#127469;",
  "category": "f",
  "emoji_order": "2210"
}, {
  "name": "flag-bi",
  "unicode": "1f1e7-1f1ee",
  "shortname": ":flag-bi:",
  "code_decimal": "&#127463;&#127470;",
  "category": "f",
  "emoji_order": "2211"
}, {
  "name": "flag-bj",
  "unicode": "1f1e7-1f1ef",
  "shortname": ":flag-bj:",
  "code_decimal": "&#127463;&#127471;",
  "category": "f",
  "emoji_order": "2212"
}, {
  "name": "flag-bl",
  "unicode": "1f1e7-1f1f1",
  "shortname": ":flag-bl:",
  "code_decimal": "&#127463;&#127473;",
  "category": "f",
  "emoji_order": "2213"
}, {
  "name": "flag-bm",
  "unicode": "1f1e7-1f1f2",
  "shortname": ":flag-bm:",
  "code_decimal": "&#127463;&#127474;",
  "category": "f",
  "emoji_order": "2214"
}, {
  "name": "flag-bn",
  "unicode": "1f1e7-1f1f3",
  "shortname": ":flag-bn:",
  "code_decimal": "&#127463;&#127475;",
  "category": "f",
  "emoji_order": "2215"
}, {
  "name": "flag-bo",
  "unicode": "1f1e7-1f1f4",
  "shortname": ":flag-bo:",
  "code_decimal": "&#127463;&#127476;",
  "category": "f",
  "emoji_order": "2216"
}, {
  "name": "flag-bq",
  "unicode": "1f1e7-1f1f6",
  "shortname": ":flag-bq:",
  "code_decimal": "&#127463;&#127478;",
  "category": "f",
  "emoji_order": "2217"
}, {
  "name": "flag-br",
  "unicode": "1f1e7-1f1f7",
  "shortname": ":flag-br:",
  "code_decimal": "&#127463;&#127479;",
  "category": "f",
  "emoji_order": "2218"
}, {
  "name": "flag-bs",
  "unicode": "1f1e7-1f1f8",
  "shortname": ":flag-bs:",
  "code_decimal": "&#127463;&#127480;",
  "category": "f",
  "emoji_order": "2219"
}, {
  "name": "flag-bt",
  "unicode": "1f1e7-1f1f9",
  "shortname": ":flag-bt:",
  "code_decimal": "&#127463;&#127481;",
  "category": "f",
  "emoji_order": "2220"
}, {
  "name": "flag-bv",
  "unicode": "1f1e7-1f1fb",
  "shortname": ":flag-bv:",
  "code_decimal": "&#127463;&#127483;",
  "category": "f",
  "emoji_order": "2221"
}, {
  "name": "flag-bw",
  "unicode": "1f1e7-1f1fc",
  "shortname": ":flag-bw:",
  "code_decimal": "&#127463;&#127484;",
  "category": "f",
  "emoji_order": "2222"
}, {
  "name": "flag-by",
  "unicode": "1f1e7-1f1fe",
  "shortname": ":flag-by:",
  "code_decimal": "&#127463;&#127486;",
  "category": "f",
  "emoji_order": "2223"
}, {
  "name": "flag-bz",
  "unicode": "1f1e7-1f1ff",
  "shortname": ":flag-bz:",
  "code_decimal": "&#127463;&#127487;",
  "category": "f",
  "emoji_order": "2224"
}, {
  "name": "flag-ca",
  "unicode": "1f1e8-1f1e6",
  "shortname": ":flag-ca:",
  "code_decimal": "&#127464;&#127462;",
  "category": "f",
  "emoji_order": "2225"
}, {
  "name": "flag-cc",
  "unicode": "1f1e8-1f1e8",
  "shortname": ":flag-cc:",
  "code_decimal": "&#127464;&#127464;",
  "category": "f",
  "emoji_order": "2226"
}, {
  "name": "flag-cd",
  "unicode": "1f1e8-1f1e9",
  "shortname": ":flag-cd:",
  "code_decimal": "&#127464;&#127465;",
  "category": "f",
  "emoji_order": "2227"
}, {
  "name": "flag-cf",
  "unicode": "1f1e8-1f1eb",
  "shortname": ":flag-cf:",
  "code_decimal": "&#127464;&#127467;",
  "category": "f",
  "emoji_order": "2228"
}, {
  "name": "flag-cg",
  "unicode": "1f1e8-1f1ec",
  "shortname": ":flag-cg:",
  "code_decimal": "&#127464;&#127468;",
  "category": "f",
  "emoji_order": "2229"
}, {
  "name": "flag-ch",
  "unicode": "1f1e8-1f1ed",
  "shortname": ":flag-ch:",
  "code_decimal": "&#127464;&#127469;",
  "category": "f",
  "emoji_order": "2230"
}, {
  "name": "flag-ci",
  "unicode": "1f1e8-1f1ee",
  "shortname": ":flag-ci:",
  "code_decimal": "&#127464;&#127470;",
  "category": "f",
  "emoji_order": "2231"
}, {
  "name": "flag-ck",
  "unicode": "1f1e8-1f1f0",
  "shortname": ":flag-ck:",
  "code_decimal": "&#127464;&#127472;",
  "category": "f",
  "emoji_order": "2232"
}, {
  "name": "flag-cl",
  "unicode": "1f1e8-1f1f1",
  "shortname": ":flag-cl:",
  "code_decimal": "&#127464;&#127473;",
  "category": "f",
  "emoji_order": "2233"
}, {
  "name": "flag-cm",
  "unicode": "1f1e8-1f1f2",
  "shortname": ":flag-cm:",
  "code_decimal": "&#127464;&#127474;",
  "category": "f",
  "emoji_order": "2234"
}, {
  "name": "flag-cn",
  "unicode": "1f1e8-1f1f3",
  "shortname": ":flag-cn:",
  "code_decimal": "&#127464;&#127475;",
  "category": "f",
  "emoji_order": "2235"
}, {
  "name": "flag-co",
  "unicode": "1f1e8-1f1f4",
  "shortname": ":flag-co:",
  "code_decimal": "&#127464;&#127476;",
  "category": "f",
  "emoji_order": "2236"
}, {
  "name": "flag-cp",
  "unicode": "1f1e8-1f1f5",
  "shortname": ":flag-cp:",
  "code_decimal": "&#127464;&#127477;",
  "category": "f",
  "emoji_order": "2237"
}, {
  "name": "flag-cr",
  "unicode": "1f1e8-1f1f7",
  "shortname": ":flag-cr:",
  "code_decimal": "&#127464;&#127479;",
  "category": "f",
  "emoji_order": "2238"
}, {
  "name": "flag-cu",
  "unicode": "1f1e8-1f1fa",
  "shortname": ":flag-cu:",
  "code_decimal": "&#127464;&#127482;",
  "category": "f",
  "emoji_order": "2239"
}, {
  "name": "flag-cv",
  "unicode": "1f1e8-1f1fb",
  "shortname": ":flag-cv:",
  "code_decimal": "&#127464;&#127483;",
  "category": "f",
  "emoji_order": "2240"
}, {
  "name": "flag-cw",
  "unicode": "1f1e8-1f1fc",
  "shortname": ":flag-cw:",
  "code_decimal": "&#127464;&#127484;",
  "category": "f",
  "emoji_order": "2241"
}, {
  "name": "flag-cx",
  "unicode": "1f1e8-1f1fd",
  "shortname": ":flag-cx:",
  "code_decimal": "&#127464;&#127485;",
  "category": "f",
  "emoji_order": "2242"
}, {
  "name": "flag-cy",
  "unicode": "1f1e8-1f1fe",
  "shortname": ":flag-cy:",
  "code_decimal": "&#127464;&#127486;",
  "category": "f",
  "emoji_order": "2243"
}, {
  "name": "flag-cz",
  "unicode": "1f1e8-1f1ff",
  "shortname": ":flag-cz:",
  "code_decimal": "&#127464;&#127487;",
  "category": "f",
  "emoji_order": "2244"
}, {
  "name": "flag-de",
  "unicode": "1f1e9-1f1ea",
  "shortname": ":flag-de:",
  "code_decimal": "&#127465;&#127466;",
  "category": "f",
  "emoji_order": "2245"
}, {
  "name": "flag-dg",
  "unicode": "1f1e9-1f1ec",
  "shortname": ":flag-dg:",
  "code_decimal": "&#127465;&#127468;",
  "category": "f",
  "emoji_order": "2246"
}, {
  "name": "flag-dj",
  "unicode": "1f1e9-1f1ef",
  "shortname": ":flag-dj:",
  "code_decimal": "&#127465;&#127471;",
  "category": "f",
  "emoji_order": "2247"
}, {
  "name": "flag-dk",
  "unicode": "1f1e9-1f1f0",
  "shortname": ":flag-dk:",
  "code_decimal": "&#127465;&#127472;",
  "category": "f",
  "emoji_order": "2248"
}, {
  "name": "flag-dm",
  "unicode": "1f1e9-1f1f2",
  "shortname": ":flag-dm:",
  "code_decimal": "&#127465;&#127474;",
  "category": "f",
  "emoji_order": "2249"
}, {
  "name": "flag-do",
  "unicode": "1f1e9-1f1f4",
  "shortname": ":flag-do:",
  "code_decimal": "&#127465;&#127476;",
  "category": "f",
  "emoji_order": "2250"
}, {
  "name": "flag-dz",
  "unicode": "1f1e9-1f1ff",
  "shortname": ":flag-dz:",
  "code_decimal": "&#127465;&#127487;",
  "category": "f",
  "emoji_order": "2251"
}, {
  "name": "flag-ea",
  "unicode": "1f1ea-1f1e6",
  "shortname": ":flag-ea:",
  "code_decimal": "&#127466;&#127462;",
  "category": "f",
  "emoji_order": "2252"
}, {
  "name": "flag-ec",
  "unicode": "1f1ea-1f1e8",
  "shortname": ":flag-ec:",
  "code_decimal": "&#127466;&#127464;",
  "category": "f",
  "emoji_order": "2253"
}, {
  "name": "flag-ee",
  "unicode": "1f1ea-1f1ea",
  "shortname": ":flag-ee:",
  "code_decimal": "&#127466;&#127466;",
  "category": "f",
  "emoji_order": "2254"
}, {
  "name": "flag-eg",
  "unicode": "1f1ea-1f1ec",
  "shortname": ":flag-eg:",
  "code_decimal": "&#127466;&#127468;",
  "category": "f",
  "emoji_order": "2255"
}, {
  "name": "flag-eh",
  "unicode": "1f1ea-1f1ed",
  "shortname": ":flag-eh:",
  "code_decimal": "&#127466;&#127469;",
  "category": "f",
  "emoji_order": "2256"
}, {
  "name": "flag-er",
  "unicode": "1f1ea-1f1f7",
  "shortname": ":flag-er:",
  "code_decimal": "&#127466;&#127479;",
  "category": "f",
  "emoji_order": "2257"
}, {
  "name": "flag-es",
  "unicode": "1f1ea-1f1f8",
  "shortname": ":flag-es:",
  "code_decimal": "&#127466;&#127480;",
  "category": "f",
  "emoji_order": "2258"
}, {
  "name": "flag-et",
  "unicode": "1f1ea-1f1f9",
  "shortname": ":flag-et:",
  "code_decimal": "&#127466;&#127481;",
  "category": "f",
  "emoji_order": "2259"
}, {
  "name": "flag-eu",
  "unicode": "1f1ea-1f1fa",
  "shortname": ":flag-eu:",
  "code_decimal": "&#127466;&#127482;",
  "category": "f",
  "emoji_order": "2260"
}, {
  "name": "flag-fi",
  "unicode": "1f1eb-1f1ee",
  "shortname": ":flag-fi:",
  "code_decimal": "&#127467;&#127470;",
  "category": "f",
  "emoji_order": "2261"
}, {
  "name": "flag-fj",
  "unicode": "1f1eb-1f1ef",
  "shortname": ":flag-fj:",
  "code_decimal": "&#127467;&#127471;",
  "category": "f",
  "emoji_order": "2262"
}, {
  "name": "flag-fk",
  "unicode": "1f1eb-1f1f0",
  "shortname": ":flag-fk:",
  "code_decimal": "&#127467;&#127472;",
  "category": "f",
  "emoji_order": "2263"
}, {
  "name": "flag-fm",
  "unicode": "1f1eb-1f1f2",
  "shortname": ":flag-fm:",
  "code_decimal": "&#127467;&#127474;",
  "category": "f",
  "emoji_order": "2264"
}, {
  "name": "flag-fo",
  "unicode": "1f1eb-1f1f4",
  "shortname": ":flag-fo:",
  "code_decimal": "&#127467;&#127476;",
  "category": "f",
  "emoji_order": "2265"
}, {
  "name": "flag-fr",
  "unicode": "1f1eb-1f1f7",
  "shortname": ":flag-fr:",
  "code_decimal": "&#127467;&#127479;",
  "category": "f",
  "emoji_order": "2266"
}, {
  "name": "flag-ga",
  "unicode": "1f1ec-1f1e6",
  "shortname": ":flag-ga:",
  "code_decimal": "&#127468;&#127462;",
  "category": "f",
  "emoji_order": "2267"
}, {
  "name": "flag-gb",
  "unicode": "1f1ec-1f1e7",
  "shortname": ":flag-gb:",
  "code_decimal": "&#127468;&#127463;",
  "category": "f",
  "emoji_order": "2268"
}, {
  "name": "flag-gd",
  "unicode": "1f1ec-1f1e9",
  "shortname": ":flag-gd:",
  "code_decimal": "&#127468;&#127465;",
  "category": "f",
  "emoji_order": "2269"
}, {
  "name": "flag-ge",
  "unicode": "1f1ec-1f1ea",
  "shortname": ":flag-ge:",
  "code_decimal": "&#127468;&#127466;",
  "category": "f",
  "emoji_order": "2270"
}, {
  "name": "flag-gf",
  "unicode": "1f1ec-1f1eb",
  "shortname": ":flag-gf:",
  "code_decimal": "&#127468;&#127467;",
  "category": "f",
  "emoji_order": "2271"
}, {
  "name": "flag-gg",
  "unicode": "1f1ec-1f1ec",
  "shortname": ":flag-gg:",
  "code_decimal": "&#127468;&#127468;",
  "category": "f",
  "emoji_order": "2272"
}, {
  "name": "flag-gh",
  "unicode": "1f1ec-1f1ed",
  "shortname": ":flag-gh:",
  "code_decimal": "&#127468;&#127469;",
  "category": "f",
  "emoji_order": "2273"
}, {
  "name": "flag-gi",
  "unicode": "1f1ec-1f1ee",
  "shortname": ":flag-gi:",
  "code_decimal": "&#127468;&#127470;",
  "category": "f",
  "emoji_order": "2274"
}, {
  "name": "flag-gl",
  "unicode": "1f1ec-1f1f1",
  "shortname": ":flag-gl:",
  "code_decimal": "&#127468;&#127473;",
  "category": "f",
  "emoji_order": "2275"
}, {
  "name": "flag-gm",
  "unicode": "1f1ec-1f1f2",
  "shortname": ":flag-gm:",
  "code_decimal": "&#127468;&#127474;",
  "category": "f",
  "emoji_order": "2276"
}, {
  "name": "flag-gn",
  "unicode": "1f1ec-1f1f3",
  "shortname": ":flag-gn:",
  "code_decimal": "&#127468;&#127475;",
  "category": "f",
  "emoji_order": "2277"
}, {
  "name": "flag-gp",
  "unicode": "1f1ec-1f1f5",
  "shortname": ":flag-gp:",
  "code_decimal": "&#127468;&#127477;",
  "category": "f",
  "emoji_order": "2278"
}, {
  "name": "flag-gq",
  "unicode": "1f1ec-1f1f6",
  "shortname": ":flag-gq:",
  "code_decimal": "&#127468;&#127478;",
  "category": "f",
  "emoji_order": "2279"
}, {
  "name": "flag-gr",
  "unicode": "1f1ec-1f1f7",
  "shortname": ":flag-gr:",
  "code_decimal": "&#127468;&#127479;",
  "category": "f",
  "emoji_order": "2280"
}, {
  "name": "flag-gs",
  "unicode": "1f1ec-1f1f8",
  "shortname": ":flag-gs:",
  "code_decimal": "&#127468;&#127480;",
  "category": "f",
  "emoji_order": "2281"
}, {
  "name": "flag-gt",
  "unicode": "1f1ec-1f1f9",
  "shortname": ":flag-gt:",
  "code_decimal": "&#127468;&#127481;",
  "category": "f",
  "emoji_order": "2282"
}, {
  "name": "flag-gu",
  "unicode": "1f1ec-1f1fa",
  "shortname": ":flag-gu:",
  "code_decimal": "&#127468;&#127482;",
  "category": "f",
  "emoji_order": "2283"
}, {
  "name": "flag-gw",
  "unicode": "1f1ec-1f1fc",
  "shortname": ":flag-gw:",
  "code_decimal": "&#127468;&#127484;",
  "category": "f",
  "emoji_order": "2284"
}, {
  "name": "flag-gy",
  "unicode": "1f1ec-1f1fe",
  "shortname": ":flag-gy:",
  "code_decimal": "&#127468;&#127486;",
  "category": "f",
  "emoji_order": "2285"
}, {
  "name": "flag-hk",
  "unicode": "1f1ed-1f1f0",
  "shortname": ":flag-hk:",
  "code_decimal": "&#127469;&#127472;",
  "category": "f",
  "emoji_order": "2286"
}, {
  "name": "flag-hm",
  "unicode": "1f1ed-1f1f2",
  "shortname": ":flag-hm:",
  "code_decimal": "&#127469;&#127474;",
  "category": "f",
  "emoji_order": "2287"
}, {
  "name": "flag-hn",
  "unicode": "1f1ed-1f1f3",
  "shortname": ":flag-hn:",
  "code_decimal": "&#127469;&#127475;",
  "category": "f",
  "emoji_order": "2288"
}, {
  "name": "flag-hr",
  "unicode": "1f1ed-1f1f7",
  "shortname": ":flag-hr:",
  "code_decimal": "&#127469;&#127479;",
  "category": "f",
  "emoji_order": "2289"
}, {
  "name": "flag-ht",
  "unicode": "1f1ed-1f1f9",
  "shortname": ":flag-ht:",
  "code_decimal": "&#127469;&#127481;",
  "category": "f",
  "emoji_order": "2290"
}, {
  "name": "flag-hu",
  "unicode": "1f1ed-1f1fa",
  "shortname": ":flag-hu:",
  "code_decimal": "&#127469;&#127482;",
  "category": "f",
  "emoji_order": "2291"
}, {
  "name": "flag-ic",
  "unicode": "1f1ee-1f1e8",
  "shortname": ":flag-ic:",
  "code_decimal": "&#127470;&#127464;",
  "category": "f",
  "emoji_order": "2292"
}, {
  "name": "flag-id",
  "unicode": "1f1ee-1f1e9",
  "shortname": ":flag-id:",
  "code_decimal": "&#127470;&#127465;",
  "category": "f",
  "emoji_order": "2293"
}, {
  "name": "flag-ie",
  "unicode": "1f1ee-1f1ea",
  "shortname": ":flag-ie:",
  "code_decimal": "&#127470;&#127466;",
  "category": "f",
  "emoji_order": "2294"
}, {
  "name": "flag-il",
  "unicode": "1f1ee-1f1f1",
  "shortname": ":flag-il:",
  "code_decimal": "&#127470;&#127473;",
  "category": "f",
  "emoji_order": "2295"
}, {
  "name": "flag-im",
  "unicode": "1f1ee-1f1f2",
  "shortname": ":flag-im:",
  "code_decimal": "&#127470;&#127474;",
  "category": "f",
  "emoji_order": "2296"
}, {
  "name": "flag-in",
  "unicode": "1f1ee-1f1f3",
  "shortname": ":flag-in:",
  "code_decimal": "&#127470;&#127475;",
  "category": "f",
  "emoji_order": "2297"
}, {
  "name": "flag-io",
  "unicode": "1f1ee-1f1f4",
  "shortname": ":flag-io:",
  "code_decimal": "&#127470;&#127476;",
  "category": "f",
  "emoji_order": "2298"
}, {
  "name": "flag-iq",
  "unicode": "1f1ee-1f1f6",
  "shortname": ":flag-iq:",
  "code_decimal": "&#127470;&#127478;",
  "category": "f",
  "emoji_order": "2299"
}, {
  "name": "flag-ir",
  "unicode": "1f1ee-1f1f7",
  "shortname": ":flag-ir:",
  "code_decimal": "&#127470;&#127479;",
  "category": "f",
  "emoji_order": "2300"
}, {
  "name": "flag-is",
  "unicode": "1f1ee-1f1f8",
  "shortname": ":flag-is:",
  "code_decimal": "&#127470;&#127480;",
  "category": "f",
  "emoji_order": "2301"
}, {
  "name": "flag-it",
  "unicode": "1f1ee-1f1f9",
  "shortname": ":flag-it:",
  "code_decimal": "&#127470;&#127481;",
  "category": "f",
  "emoji_order": "2302"
}, {
  "name": "flag-je",
  "unicode": "1f1ef-1f1ea",
  "shortname": ":flag-je:",
  "code_decimal": "&#127471;&#127466;",
  "category": "f",
  "emoji_order": "2303"
}, {
  "name": "flag-jm",
  "unicode": "1f1ef-1f1f2",
  "shortname": ":flag-jm:",
  "code_decimal": "&#127471;&#127474;",
  "category": "f",
  "emoji_order": "2304"
}, {
  "name": "flag-jo",
  "unicode": "1f1ef-1f1f4",
  "shortname": ":flag-jo:",
  "code_decimal": "&#127471;&#127476;",
  "category": "f",
  "emoji_order": "2305"
}, {
  "name": "flag-jp",
  "unicode": "1f1ef-1f1f5",
  "shortname": ":flag-jp:",
  "code_decimal": "&#127471;&#127477;",
  "category": "f",
  "emoji_order": "2306"
}, {
  "name": "flag-ke",
  "unicode": "1f1f0-1f1ea",
  "shortname": ":flag-ke:",
  "code_decimal": "&#127472;&#127466;",
  "category": "f",
  "emoji_order": "2307"
}, {
  "name": "flag-kg",
  "unicode": "1f1f0-1f1ec",
  "shortname": ":flag-kg:",
  "code_decimal": "&#127472;&#127468;",
  "category": "f",
  "emoji_order": "2308"
}, {
  "name": "flag-kh",
  "unicode": "1f1f0-1f1ed",
  "shortname": ":flag-kh:",
  "code_decimal": "&#127472;&#127469;",
  "category": "f",
  "emoji_order": "2309"
}, {
  "name": "flag-ki",
  "unicode": "1f1f0-1f1ee",
  "shortname": ":flag-ki:",
  "code_decimal": "&#127472;&#127470;",
  "category": "f",
  "emoji_order": "2310"
}, {
  "name": "flag-km",
  "unicode": "1f1f0-1f1f2",
  "shortname": ":flag-km:",
  "code_decimal": "&#127472;&#127474;",
  "category": "f",
  "emoji_order": "2311"
}, {
  "name": "flag-kn",
  "unicode": "1f1f0-1f1f3",
  "shortname": ":flag-kn:",
  "code_decimal": "&#127472;&#127475;",
  "category": "f",
  "emoji_order": "2312"
}, {
  "name": "flag-kp",
  "unicode": "1f1f0-1f1f5",
  "shortname": ":flag-kp:",
  "code_decimal": "&#127472;&#127477;",
  "category": "f",
  "emoji_order": "2313"
}, {
  "name": "flag-kr",
  "unicode": "1f1f0-1f1f7",
  "shortname": ":flag-kr:",
  "code_decimal": "&#127472;&#127479;",
  "category": "f",
  "emoji_order": "2314"
}, {
  "name": "flag-kw",
  "unicode": "1f1f0-1f1fc",
  "shortname": ":flag-kw:",
  "code_decimal": "&#127472;&#127484;",
  "category": "f",
  "emoji_order": "2315"
}, {
  "name": "flag-ky",
  "unicode": "1f1f0-1f1fe",
  "shortname": ":flag-ky:",
  "code_decimal": "&#127472;&#127486;",
  "category": "f",
  "emoji_order": "2316"
}, {
  "name": "flag-kz",
  "unicode": "1f1f0-1f1ff",
  "shortname": ":flag-kz:",
  "code_decimal": "&#127472;&#127487;",
  "category": "f",
  "emoji_order": "2317"
}, {
  "name": "flag-la",
  "unicode": "1f1f1-1f1e6",
  "shortname": ":flag-la:",
  "code_decimal": "&#127473;&#127462;",
  "category": "f",
  "emoji_order": "2318"
}, {
  "name": "flag-lb",
  "unicode": "1f1f1-1f1e7",
  "shortname": ":flag-lb:",
  "code_decimal": "&#127473;&#127463;",
  "category": "f",
  "emoji_order": "2319"
}, {
  "name": "flag-lc",
  "unicode": "1f1f1-1f1e8",
  "shortname": ":flag-lc:",
  "code_decimal": "&#127473;&#127464;",
  "category": "f",
  "emoji_order": "2320"
}, {
  "name": "flag-li",
  "unicode": "1f1f1-1f1ee",
  "shortname": ":flag-li:",
  "code_decimal": "&#127473;&#127470;",
  "category": "f",
  "emoji_order": "2321"
}, {
  "name": "flag-lk",
  "unicode": "1f1f1-1f1f0",
  "shortname": ":flag-lk:",
  "code_decimal": "&#127473;&#127472;",
  "category": "f",
  "emoji_order": "2322"
}, {
  "name": "flag-lr",
  "unicode": "1f1f1-1f1f7",
  "shortname": ":flag-lr:",
  "code_decimal": "&#127473;&#127479;",
  "category": "f",
  "emoji_order": "2323"
}, {
  "name": "flag-ls",
  "unicode": "1f1f1-1f1f8",
  "shortname": ":flag-ls:",
  "code_decimal": "&#127473;&#127480;",
  "category": "f",
  "emoji_order": "2324"
}, {
  "name": "flag-lt",
  "unicode": "1f1f1-1f1f9",
  "shortname": ":flag-lt:",
  "code_decimal": "&#127473;&#127481;",
  "category": "f",
  "emoji_order": "2325"
}, {
  "name": "flag-lu",
  "unicode": "1f1f1-1f1fa",
  "shortname": ":flag-lu:",
  "code_decimal": "&#127473;&#127482;",
  "category": "f",
  "emoji_order": "2326"
}, {
  "name": "flag-lv",
  "unicode": "1f1f1-1f1fb",
  "shortname": ":flag-lv:",
  "code_decimal": "&#127473;&#127483;",
  "category": "f",
  "emoji_order": "2327"
}, {
  "name": "flag-ly",
  "unicode": "1f1f1-1f1fe",
  "shortname": ":flag-ly:",
  "code_decimal": "&#127473;&#127486;",
  "category": "f",
  "emoji_order": "2328"
}, {
  "name": "flag-ma",
  "unicode": "1f1f2-1f1e6",
  "shortname": ":flag-ma:",
  "code_decimal": "&#127474;&#127462;",
  "category": "f",
  "emoji_order": "2329"
}, {
  "name": "flag-mc",
  "unicode": "1f1f2-1f1e8",
  "shortname": ":flag-mc:",
  "code_decimal": "&#127474;&#127464;",
  "category": "f",
  "emoji_order": "2330"
}, {
  "name": "flag-md",
  "unicode": "1f1f2-1f1e9",
  "shortname": ":flag-md:",
  "code_decimal": "&#127474;&#127465;",
  "category": "f",
  "emoji_order": "2331"
}, {
  "name": "flag-me",
  "unicode": "1f1f2-1f1ea",
  "shortname": ":flag-me:",
  "code_decimal": "&#127474;&#127466;",
  "category": "f",
  "emoji_order": "2332"
}, {
  "name": "flag-mf",
  "unicode": "1f1f2-1f1eb",
  "shortname": ":flag-mf:",
  "code_decimal": "&#127474;&#127467;",
  "category": "f",
  "emoji_order": "2333"
}, {
  "name": "flag-mg",
  "unicode": "1f1f2-1f1ec",
  "shortname": ":flag-mg:",
  "code_decimal": "&#127474;&#127468;",
  "category": "f",
  "emoji_order": "2334"
}, {
  "name": "flag-mh",
  "unicode": "1f1f2-1f1ed",
  "shortname": ":flag-mh:",
  "code_decimal": "&#127474;&#127469;",
  "category": "f",
  "emoji_order": "2335"
}, {
  "name": "flag-mk",
  "unicode": "1f1f2-1f1f0",
  "shortname": ":flag-mk:",
  "code_decimal": "&#127474;&#127472;",
  "category": "f",
  "emoji_order": "2336"
}, {
  "name": "flag-ml",
  "unicode": "1f1f2-1f1f1",
  "shortname": ":flag-ml:",
  "code_decimal": "&#127474;&#127473;",
  "category": "f",
  "emoji_order": "2337"
}, {
  "name": "flag-mm",
  "unicode": "1f1f2-1f1f2",
  "shortname": ":flag-mm:",
  "code_decimal": "&#127474;&#127474;",
  "category": "f",
  "emoji_order": "2338"
}, {
  "name": "flag-mn",
  "unicode": "1f1f2-1f1f3",
  "shortname": ":flag-mn:",
  "code_decimal": "&#127474;&#127475;",
  "category": "f",
  "emoji_order": "2339"
}, {
  "name": "flag-mo",
  "unicode": "1f1f2-1f1f4",
  "shortname": ":flag-mo:",
  "code_decimal": "&#127474;&#127476;",
  "category": "f",
  "emoji_order": "2340"
}, {
  "name": "flag-mp",
  "unicode": "1f1f2-1f1f5",
  "shortname": ":flag-mp:",
  "code_decimal": "&#127474;&#127477;",
  "category": "f",
  "emoji_order": "2341"
}, {
  "name": "flag-mq",
  "unicode": "1f1f2-1f1f6",
  "shortname": ":flag-mq:",
  "code_decimal": "&#127474;&#127478;",
  "category": "f",
  "emoji_order": "2342"
}, {
  "name": "flag-mr",
  "unicode": "1f1f2-1f1f7",
  "shortname": ":flag-mr:",
  "code_decimal": "&#127474;&#127479;",
  "category": "f",
  "emoji_order": "2343"
}, {
  "name": "flag-ms",
  "unicode": "1f1f2-1f1f8",
  "shortname": ":flag-ms:",
  "code_decimal": "&#127474;&#127480;",
  "category": "f",
  "emoji_order": "2344"
}, {
  "name": "flag-mt",
  "unicode": "1f1f2-1f1f9",
  "shortname": ":flag-mt:",
  "code_decimal": "&#127474;&#127481;",
  "category": "f",
  "emoji_order": "2345"
}, {
  "name": "flag-mu",
  "unicode": "1f1f2-1f1fa",
  "shortname": ":flag-mu:",
  "code_decimal": "&#127474;&#127482;",
  "category": "f",
  "emoji_order": "2346"
}, {
  "name": "flag-mv",
  "unicode": "1f1f2-1f1fb",
  "shortname": ":flag-mv:",
  "code_decimal": "&#127474;&#127483;",
  "category": "f",
  "emoji_order": "2347"
}, {
  "name": "flag-mw",
  "unicode": "1f1f2-1f1fc",
  "shortname": ":flag-mw:",
  "code_decimal": "&#127474;&#127484;",
  "category": "f",
  "emoji_order": "2348"
}, {
  "name": "flag-mx",
  "unicode": "1f1f2-1f1fd",
  "shortname": ":flag-mx:",
  "code_decimal": "&#127474;&#127485;",
  "category": "f",
  "emoji_order": "2349"
}, {
  "name": "flag-my",
  "unicode": "1f1f2-1f1fe",
  "shortname": ":flag-my:",
  "code_decimal": "&#127474;&#127486;",
  "category": "f",
  "emoji_order": "2350"
}, {
  "name": "flag-mz",
  "unicode": "1f1f2-1f1ff",
  "shortname": ":flag-mz:",
  "code_decimal": "&#127474;&#127487;",
  "category": "f",
  "emoji_order": "2351"
}, {
  "name": "flag-na",
  "unicode": "1f1f3-1f1e6",
  "shortname": ":flag-na:",
  "code_decimal": "&#127475;&#127462;",
  "category": "f",
  "emoji_order": "2352"
}, {
  "name": "flag-nc",
  "unicode": "1f1f3-1f1e8",
  "shortname": ":flag-nc:",
  "code_decimal": "&#127475;&#127464;",
  "category": "f",
  "emoji_order": "2353"
}, {
  "name": "flag-ne",
  "unicode": "1f1f3-1f1ea",
  "shortname": ":flag-ne:",
  "code_decimal": "&#127475;&#127466;",
  "category": "f",
  "emoji_order": "2354"
}, {
  "name": "flag-nf",
  "unicode": "1f1f3-1f1eb",
  "shortname": ":flag-nf:",
  "code_decimal": "&#127475;&#127467;",
  "category": "f",
  "emoji_order": "2355"
}, {
  "name": "flag-ng",
  "unicode": "1f1f3-1f1ec",
  "shortname": ":flag-ng:",
  "code_decimal": "&#127475;&#127468;",
  "category": "f",
  "emoji_order": "2356"
}, {
  "name": "flag-ni",
  "unicode": "1f1f3-1f1ee",
  "shortname": ":flag-ni:",
  "code_decimal": "&#127475;&#127470;",
  "category": "f",
  "emoji_order": "2357"
}, {
  "name": "flag-nl",
  "unicode": "1f1f3-1f1f1",
  "shortname": ":flag-nl:",
  "code_decimal": "&#127475;&#127473;",
  "category": "f",
  "emoji_order": "2358"
}, {
  "name": "flag-no",
  "unicode": "1f1f3-1f1f4",
  "shortname": ":flag-no:",
  "code_decimal": "&#127475;&#127476;",
  "category": "f",
  "emoji_order": "2359"
}, {
  "name": "flag-np",
  "unicode": "1f1f3-1f1f5",
  "shortname": ":flag-np:",
  "code_decimal": "&#127475;&#127477;",
  "category": "f",
  "emoji_order": "2360"
}, {
  "name": "flag-nr",
  "unicode": "1f1f3-1f1f7",
  "shortname": ":flag-nr:",
  "code_decimal": "&#127475;&#127479;",
  "category": "f",
  "emoji_order": "2361"
}, {
  "name": "flag-nu",
  "unicode": "1f1f3-1f1fa",
  "shortname": ":flag-nu:",
  "code_decimal": "&#127475;&#127482;",
  "category": "f",
  "emoji_order": "2362"
}, {
  "name": "flag-nz",
  "unicode": "1f1f3-1f1ff",
  "shortname": ":flag-nz:",
  "code_decimal": "&#127475;&#127487;",
  "category": "f",
  "emoji_order": "2363"
}, {
  "name": "flag-om",
  "unicode": "1f1f4-1f1f2",
  "shortname": ":flag-om:",
  "code_decimal": "&#127476;&#127474;",
  "category": "f",
  "emoji_order": "2364"
}, {
  "name": "flag-pa",
  "unicode": "1f1f5-1f1e6",
  "shortname": ":flag-pa:",
  "code_decimal": "&#127477;&#127462;",
  "category": "f",
  "emoji_order": "2365"
}, {
  "name": "flag-pe",
  "unicode": "1f1f5-1f1ea",
  "shortname": ":flag-pe:",
  "code_decimal": "&#127477;&#127466;",
  "category": "f",
  "emoji_order": "2366"
}, {
  "name": "flag-pf",
  "unicode": "1f1f5-1f1eb",
  "shortname": ":flag-pf:",
  "code_decimal": "&#127477;&#127467;",
  "category": "f",
  "emoji_order": "2367"
}, {
  "name": "flag-pg",
  "unicode": "1f1f5-1f1ec",
  "shortname": ":flag-pg:",
  "code_decimal": "&#127477;&#127468;",
  "category": "f",
  "emoji_order": "2368"
}, {
  "name": "flag-ph",
  "unicode": "1f1f5-1f1ed",
  "shortname": ":flag-ph:",
  "code_decimal": "&#127477;&#127469;",
  "category": "f",
  "emoji_order": "2369"
}, {
  "name": "flag-pk",
  "unicode": "1f1f5-1f1f0",
  "shortname": ":flag-pk:",
  "code_decimal": "&#127477;&#127472;",
  "category": "f",
  "emoji_order": "2370"
}, {
  "name": "flag-pl",
  "unicode": "1f1f5-1f1f1",
  "shortname": ":flag-pl:",
  "code_decimal": "&#127477;&#127473;",
  "category": "f",
  "emoji_order": "2371"
}, {
  "name": "flag-pm",
  "unicode": "1f1f5-1f1f2",
  "shortname": ":flag-pm:",
  "code_decimal": "&#127477;&#127474;",
  "category": "f",
  "emoji_order": "2372"
}, {
  "name": "flag-pn",
  "unicode": "1f1f5-1f1f3",
  "shortname": ":flag-pn:",
  "code_decimal": "&#127477;&#127475;",
  "category": "f",
  "emoji_order": "2373"
}, {
  "name": "flag-pr",
  "unicode": "1f1f5-1f1f7",
  "shortname": ":flag-pr:",
  "code_decimal": "&#127477;&#127479;",
  "category": "f",
  "emoji_order": "2374"
}, {
  "name": "flag-ps",
  "unicode": "1f1f5-1f1f8",
  "shortname": ":flag-ps:",
  "code_decimal": "&#127477;&#127480;",
  "category": "f",
  "emoji_order": "2375"
}, {
  "name": "flag-pt",
  "unicode": "1f1f5-1f1f9",
  "shortname": ":flag-pt:",
  "code_decimal": "&#127477;&#127481;",
  "category": "f",
  "emoji_order": "2376"
}, {
  "name": "flag-pw",
  "unicode": "1f1f5-1f1fc",
  "shortname": ":flag-pw:",
  "code_decimal": "&#127477;&#127484;",
  "category": "f",
  "emoji_order": "2377"
}, {
  "name": "flag-py",
  "unicode": "1f1f5-1f1fe",
  "shortname": ":flag-py:",
  "code_decimal": "&#127477;&#127486;",
  "category": "f",
  "emoji_order": "2378"
}, {
  "name": "flag-qa",
  "unicode": "1f1f6-1f1e6",
  "shortname": ":flag-qa:",
  "code_decimal": "&#127478;&#127462;",
  "category": "f",
  "emoji_order": "2379"
}, {
  "name": "flag-re",
  "unicode": "1f1f7-1f1ea",
  "shortname": ":flag-re:",
  "code_decimal": "&#127479;&#127466;",
  "category": "f",
  "emoji_order": "2380"
}, {
  "name": "flag-ro",
  "unicode": "1f1f7-1f1f4",
  "shortname": ":flag-ro:",
  "code_decimal": "&#127479;&#127476;",
  "category": "f",
  "emoji_order": "2381"
}, {
  "name": "flag-rs",
  "unicode": "1f1f7-1f1f8",
  "shortname": ":flag-rs:",
  "code_decimal": "&#127479;&#127480;",
  "category": "f",
  "emoji_order": "2382"
}, {
  "name": "flag-ru",
  "unicode": "1f1f7-1f1fa",
  "shortname": ":flag-ru:",
  "code_decimal": "&#127479;&#127482;",
  "category": "f",
  "emoji_order": "2383"
}, {
  "name": "flag-rw",
  "unicode": "1f1f7-1f1fc",
  "shortname": ":flag-rw:",
  "code_decimal": "&#127479;&#127484;",
  "category": "f",
  "emoji_order": "2384"
}, {
  "name": "flag-sa",
  "unicode": "1f1f8-1f1e6",
  "shortname": ":flag-sa:",
  "code_decimal": "&#127480;&#127462;",
  "category": "f",
  "emoji_order": "2385"
}, {
  "name": "flag-sb",
  "unicode": "1f1f8-1f1e7",
  "shortname": ":flag-sb:",
  "code_decimal": "&#127480;&#127463;",
  "category": "f",
  "emoji_order": "2386"
}, {
  "name": "flag-sc",
  "unicode": "1f1f8-1f1e8",
  "shortname": ":flag-sc:",
  "code_decimal": "&#127480;&#127464;",
  "category": "f",
  "emoji_order": "2387"
}, {
  "name": "flag-sd",
  "unicode": "1f1f8-1f1e9",
  "shortname": ":flag-sd:",
  "code_decimal": "&#127480;&#127465;",
  "category": "f",
  "emoji_order": "2388"
}, {
  "name": "flag-se",
  "unicode": "1f1f8-1f1ea",
  "shortname": ":flag-se:",
  "code_decimal": "&#127480;&#127466;",
  "category": "f",
  "emoji_order": "2389"
}, {
  "name": "flag-sg",
  "unicode": "1f1f8-1f1ec",
  "shortname": ":flag-sg:",
  "code_decimal": "&#127480;&#127468;",
  "category": "f",
  "emoji_order": "2390"
}, {
  "name": "flag-sh",
  "unicode": "1f1f8-1f1ed",
  "shortname": ":flag-sh:",
  "code_decimal": "&#127480;&#127469;",
  "category": "f",
  "emoji_order": "2391"
}, {
  "name": "flag-si",
  "unicode": "1f1f8-1f1ee",
  "shortname": ":flag-si:",
  "code_decimal": "&#127480;&#127470;",
  "category": "f",
  "emoji_order": "2392"
}, {
  "name": "flag-sj",
  "unicode": "1f1f8-1f1ef",
  "shortname": ":flag-sj:",
  "code_decimal": "&#127480;&#127471;",
  "category": "f",
  "emoji_order": "2393"
}, {
  "name": "flag-sk",
  "unicode": "1f1f8-1f1f0",
  "shortname": ":flag-sk:",
  "code_decimal": "&#127480;&#127472;",
  "category": "f",
  "emoji_order": "2394"
}, {
  "name": "flag-sl",
  "unicode": "1f1f8-1f1f1",
  "shortname": ":flag-sl:",
  "code_decimal": "&#127480;&#127473;",
  "category": "f",
  "emoji_order": "2395"
}, {
  "name": "flag-sm",
  "unicode": "1f1f8-1f1f2",
  "shortname": ":flag-sm:",
  "code_decimal": "&#127480;&#127474;",
  "category": "f",
  "emoji_order": "2396"
}, {
  "name": "flag-sn",
  "unicode": "1f1f8-1f1f3",
  "shortname": ":flag-sn:",
  "code_decimal": "&#127480;&#127475;",
  "category": "f",
  "emoji_order": "2397"
}, {
  "name": "flag-so",
  "unicode": "1f1f8-1f1f4",
  "shortname": ":flag-so:",
  "code_decimal": "&#127480;&#127476;",
  "category": "f",
  "emoji_order": "2398"
}, {
  "name": "flag-sr",
  "unicode": "1f1f8-1f1f7",
  "shortname": ":flag-sr:",
  "code_decimal": "&#127480;&#127479;",
  "category": "f",
  "emoji_order": "2399"
}, {
  "name": "flag-ss",
  "unicode": "1f1f8-1f1f8",
  "shortname": ":flag-ss:",
  "code_decimal": "&#127480;&#127480;",
  "category": "f",
  "emoji_order": "2400"
}, {
  "name": "flag-st",
  "unicode": "1f1f8-1f1f9",
  "shortname": ":flag-st:",
  "code_decimal": "&#127480;&#127481;",
  "category": "f",
  "emoji_order": "2401"
}, {
  "name": "flag-sv",
  "unicode": "1f1f8-1f1fb",
  "shortname": ":flag-sv:",
  "code_decimal": "&#127480;&#127483;",
  "category": "f",
  "emoji_order": "2402"
}, {
  "name": "flag-sx",
  "unicode": "1f1f8-1f1fd",
  "shortname": ":flag-sx:",
  "code_decimal": "&#127480;&#127485;",
  "category": "f",
  "emoji_order": "2403"
}, {
  "name": "flag-sy",
  "unicode": "1f1f8-1f1fe",
  "shortname": ":flag-sy:",
  "code_decimal": "&#127480;&#127486;",
  "category": "f",
  "emoji_order": "2404"
}, {
  "name": "flag-sz",
  "unicode": "1f1f8-1f1ff",
  "shortname": ":flag-sz:",
  "code_decimal": "&#127480;&#127487;",
  "category": "f",
  "emoji_order": "2405"
}, {
  "name": "flag-ta",
  "unicode": "1f1f9-1f1e6",
  "shortname": ":flag-ta:",
  "code_decimal": "&#127481;&#127462;",
  "category": "f",
  "emoji_order": "2406"
}, {
  "name": "flag-tc",
  "unicode": "1f1f9-1f1e8",
  "shortname": ":flag-tc:",
  "code_decimal": "&#127481;&#127464;",
  "category": "f",
  "emoji_order": "2407"
}, {
  "name": "flag-td",
  "unicode": "1f1f9-1f1e9",
  "shortname": ":flag-td:",
  "code_decimal": "&#127481;&#127465;",
  "category": "f",
  "emoji_order": "2408"
}, {
  "name": "flag-tf",
  "unicode": "1f1f9-1f1eb",
  "shortname": ":flag-tf:",
  "code_decimal": "&#127481;&#127467;",
  "category": "f",
  "emoji_order": "2409"
}, {
  "name": "flag-tg",
  "unicode": "1f1f9-1f1ec",
  "shortname": ":flag-tg:",
  "code_decimal": "&#127481;&#127468;",
  "category": "f",
  "emoji_order": "2410"
}, {
  "name": "flag-th",
  "unicode": "1f1f9-1f1ed",
  "shortname": ":flag-th:",
  "code_decimal": "&#127481;&#127469;",
  "category": "f",
  "emoji_order": "2411"
}, {
  "name": "flag-tj",
  "unicode": "1f1f9-1f1ef",
  "shortname": ":flag-tj:",
  "code_decimal": "&#127481;&#127471;",
  "category": "f",
  "emoji_order": "2412"
}, {
  "name": "flag-tk",
  "unicode": "1f1f9-1f1f0",
  "shortname": ":flag-tk:",
  "code_decimal": "&#127481;&#127472;",
  "category": "f",
  "emoji_order": "2413"
}, {
  "name": "flag-tl",
  "unicode": "1f1f9-1f1f1",
  "shortname": ":flag-tl:",
  "code_decimal": "&#127481;&#127473;",
  "category": "f",
  "emoji_order": "2414"
}, {
  "name": "flag-tm",
  "unicode": "1f1f9-1f1f2",
  "shortname": ":flag-tm:",
  "code_decimal": "&#127481;&#127474;",
  "category": "f",
  "emoji_order": "2415"
}, {
  "name": "flag-tn",
  "unicode": "1f1f9-1f1f3",
  "shortname": ":flag-tn:",
  "code_decimal": "&#127481;&#127475;",
  "category": "f",
  "emoji_order": "2416"
}, {
  "name": "flag-to",
  "unicode": "1f1f9-1f1f4",
  "shortname": ":flag-to:",
  "code_decimal": "&#127481;&#127476;",
  "category": "f",
  "emoji_order": "2417"
}, {
  "name": "flag-tr",
  "unicode": "1f1f9-1f1f7",
  "shortname": ":flag-tr:",
  "code_decimal": "&#127481;&#127479;",
  "category": "f",
  "emoji_order": "2418"
}, {
  "name": "flag-tt",
  "unicode": "1f1f9-1f1f9",
  "shortname": ":flag-tt:",
  "code_decimal": "&#127481;&#127481;",
  "category": "f",
  "emoji_order": "2419"
}, {
  "name": "flag-tv",
  "unicode": "1f1f9-1f1fb",
  "shortname": ":flag-tv:",
  "code_decimal": "&#127481;&#127483;",
  "category": "f",
  "emoji_order": "2420"
}, {
  "name": "flag-tw",
  "unicode": "1f1f9-1f1fc",
  "shortname": ":flag-tw:",
  "code_decimal": "&#127481;&#127484;",
  "category": "f",
  "emoji_order": "2421"
}, {
  "name": "flag-tz",
  "unicode": "1f1f9-1f1ff",
  "shortname": ":flag-tz:",
  "code_decimal": "&#127481;&#127487;",
  "category": "f",
  "emoji_order": "2422"
}, {
  "name": "flag-ua",
  "unicode": "1f1fa-1f1e6",
  "shortname": ":flag-ua:",
  "code_decimal": "&#127482;&#127462;",
  "category": "f",
  "emoji_order": "2423"
}, {
  "name": "flag-ug",
  "unicode": "1f1fa-1f1ec",
  "shortname": ":flag-ug:",
  "code_decimal": "&#127482;&#127468;",
  "category": "f",
  "emoji_order": "2424"
}, {
  "name": "flag-um",
  "unicode": "1f1fa-1f1f2",
  "shortname": ":flag-um:",
  "code_decimal": "&#127482;&#127474;",
  "category": "f",
  "emoji_order": "2425"
}, {
  "name": "flag-us",
  "unicode": "1f1fa-1f1f8",
  "shortname": ":flag-us:",
  "code_decimal": "&#127482;&#127480;",
  "category": "f",
  "emoji_order": "2427"
}, {
  "name": "flag-uy",
  "unicode": "1f1fa-1f1fe",
  "shortname": ":flag-uy:",
  "code_decimal": "&#127482;&#127486;",
  "category": "f",
  "emoji_order": "2428"
}, {
  "name": "flag-uz",
  "unicode": "1f1fa-1f1ff",
  "shortname": ":flag-uz:",
  "code_decimal": "&#127482;&#127487;",
  "category": "f",
  "emoji_order": "2429"
}, {
  "name": "flag-va",
  "unicode": "1f1fb-1f1e6",
  "shortname": ":flag-va:",
  "code_decimal": "&#127483;&#127462;",
  "category": "f",
  "emoji_order": "2430"
}, {
  "name": "flag-vc",
  "unicode": "1f1fb-1f1e8",
  "shortname": ":flag-vc:",
  "code_decimal": "&#127483;&#127464;",
  "category": "f",
  "emoji_order": "2431"
}, {
  "name": "flag-ve",
  "unicode": "1f1fb-1f1ea",
  "shortname": ":flag-ve:",
  "code_decimal": "&#127483;&#127466;",
  "category": "f",
  "emoji_order": "2432"
}, {
  "name": "flag-vg",
  "unicode": "1f1fb-1f1ec",
  "shortname": ":flag-vg:",
  "code_decimal": "&#127483;&#127468;",
  "category": "f",
  "emoji_order": "2433"
}, {
  "name": "flag-vi",
  "unicode": "1f1fb-1f1ee",
  "shortname": ":flag-vi:",
  "code_decimal": "&#127483;&#127470;",
  "category": "f",
  "emoji_order": "2434"
}, {
  "name": "flag-vn",
  "unicode": "1f1fb-1f1f3",
  "shortname": ":flag-vn:",
  "code_decimal": "&#127483;&#127475;",
  "category": "f",
  "emoji_order": "2435"
}, {
  "name": "flag-vu",
  "unicode": "1f1fb-1f1fa",
  "shortname": ":flag_vu:",
  "code_decimal": "&#127483;&#127482;",
  "category": "f",
  "emoji_order": "2436"
}, {
  "name": "flag-wf",
  "unicode": "1f1fc-1f1eb",
  "shortname": ":flag_wf:",
  "code_decimal": "&#127484;&#127467;",
  "category": "f",
  "emoji_order": "2437"
}, {
  "name": "flag-ws",
  "unicode": "1f1fc-1f1f8",
  "shortname": ":flag_ws:",
  "code_decimal": "&#127484;&#127480;",
  "category": "f",
  "emoji_order": "2438"
}, {
  "name": "flag-xk",
  "unicode": "1f1fd-1f1f0",
  "shortname": ":flag_xk:",
  "code_decimal": "&#127485;&#127472;",
  "category": "f",
  "emoji_order": "2439"
}, {
  "name": "flag-ye",
  "unicode": "1f1fe-1f1ea",
  "shortname": ":flag_ye:",
  "code_decimal": "&#127486;&#127466;",
  "category": "f",
  "emoji_order": "2440"
}, {
  "name": "flag-yt",
  "unicode": "1f1fe-1f1f9",
  "shortname": ":flag_yt:",
  "code_decimal": "&#127486;&#127481;",
  "category": "f",
  "emoji_order": "2441"
}, {
  "name": "flag-za",
  "unicode": "1f1ff-1f1e6",
  "shortname": ":flag_za:",
  "code_decimal": "&#127487;&#127462;",
  "category": "f",
  "emoji_order": "2442"
}, {
  "name": "flag-zm",
  "unicode": "1f1ff-1f1f2",
  "shortname": ":flag_zm:",
  "code_decimal": "&#127487;&#127474;",
  "category": "f",
  "emoji_order": "2443"
}, {
  "name": "flag-zw",
  "unicode": "1f1ff-1f1fc",
  "shortname": ":flag_zw:",
  "code_decimal": "&#127487;&#127484;",
  "category": "f",
  "emoji_order": "2444"
}, {
  "name": "speech",
  "unicode": "1f600",
  "shortname": ":speech:",
  "code_decimal": "&#128172;",
  "category": "p",
  "emoji_order": "1"
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (emojiList);

/***/ }),

/***/ "./src/emoji-map.js":
/*!**************************!*\
  !*** ./src/emoji-map.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emoji_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./emoji-list */ "./src/emoji-list.js");

var emojiMap = {};
_emoji_list__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(function (emojiListObject) {
  emojiMap[emojiListObject.name] = emojiListObject;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (emojiMap);

/***/ }),

/***/ "./src/format-emoji-blot.js":
/*!**********************************!*\
  !*** ./src/format-emoji-blot.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emoji_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./emoji-map */ "./src/emoji-map.js");
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! quill */ "quill");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var Embed = quill__WEBPACK_IMPORTED_MODULE_1__["default"]["import"]('blots/embed');
var EmojiBlot = /*#__PURE__*/function (_Embed) {
  function EmojiBlot() {
    _classCallCheck(this, EmojiBlot);
    return _callSuper(this, EmojiBlot, arguments);
  }
  _inherits(EmojiBlot, _Embed);
  return _createClass(EmojiBlot, null, [{
    key: "create",
    value: function create(value) {
      var node = _get(_getPrototypeOf(EmojiBlot), "create", this).call(this);
      if (_typeof(value) === 'object') {
        EmojiBlot.buildSpan(value, node);
      } else if (typeof value === "string") {
        var valueObj = _emoji_map__WEBPACK_IMPORTED_MODULE_0__["default"][value];
        if (valueObj) {
          EmojiBlot.buildSpan(valueObj, node);
        }
      }
      return node;
    }
  }, {
    key: "value",
    value: function value(node) {
      return node.dataset.name;
    }
  }, {
    key: "buildSpan",
    value: function buildSpan(value, node) {
      node.setAttribute('data-name', value.name);
      var emojiSpan = document.createElement('span');
      emojiSpan.classList.add(this.emojiClass);
      emojiSpan.classList.add(this.emojiPrefix + value.name);
      // unicode can be '1f1f5-1f1ea',see emoji-list.js.
      emojiSpan.innerText = String.fromCodePoint.apply(String, _toConsumableArray(EmojiBlot.parseUnicode(value.unicode)));
      node.appendChild(emojiSpan);
    }
  }, {
    key: "parseUnicode",
    value: function parseUnicode(string) {
      return string.split('-').map(function (str) {
        return parseInt(str, 16);
      });
    }
  }]);
}(Embed);
_defineProperty(EmojiBlot, "blotName", 'emoji');
_defineProperty(EmojiBlot, "className", 'ql-emojiblot');
_defineProperty(EmojiBlot, "tagName", 'span');
_defineProperty(EmojiBlot, "emojiClass", 'ap');
_defineProperty(EmojiBlot, "emojiPrefix", 'ap-');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmojiBlot);

/***/ }),

/***/ "./src/module-emoji.js":
/*!*****************************!*\
  !*** ./src/module-emoji.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quill */ "quill");
/* harmony import */ var fuse_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fuse.js */ "./node_modules/fuse.js/dist/fuse.mjs");
/* harmony import */ var _emoji_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./emoji-list.js */ "./src/emoji-list.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



console.log(quill__WEBPACK_IMPORTED_MODULE_0__);
var Module = quill__WEBPACK_IMPORTED_MODULE_0__["default"]["import"]('core/module');
var ShortNameEmoji = /*#__PURE__*/function (_Module) {
  function ShortNameEmoji(quill, options) {
    var _this;
    _classCallCheck(this, ShortNameEmoji);
    _this = _callSuper(this, ShortNameEmoji, [quill, options]);
    _this.emojiList = options.emojiList;
    _this.fuse = new fuse_js__WEBPACK_IMPORTED_MODULE_2__["default"](options.emojiList, options.fuse);
    _this.quill = quill;
    _this.onClose = options.onClose;
    _this.onOpen = options.onOpen;
    _this.container = document.createElement('ul');
    _this.container.classList.add('emoji_completions');
    _this.quill.container.appendChild(_this.container);
    _this.container.style.position = "absolute";
    _this.container.style.display = "none";
    _this.onSelectionChange = _this.maybeUnfocus.bind(_this);
    _this.onTextChange = _this.update.bind(_this);
    _this.open = false;
    _this.atIndex = null;
    _this.focusedButton = null;
    _this.isWhiteSpace = function (ch) {
      var whiteSpace = false;
      if (/\s/.test(ch)) {
        whiteSpace = true;
      }
      return whiteSpace;
    };
    quill.keyboard.addBinding({
      // TODO: Once Quill supports using event.key change this to ":"
      key: 186,
      // ":" instead of 190 in Safari. Since it's the same key it doesn't matter if we register both.
      shiftKey: true
    }, _this.triggerPicker.bind(_this));
    quill.keyboard.addBinding({
      key: 59,
      // gecko based browsers (firefox) use 59 as the keycode for semicolon, which makes a colon character when combined with shift
      shiftKey: true
    }, _this.triggerPicker.bind(_this));
    quill.keyboard.addBinding({
      key: 39,
      // ArrowRight
      collapsed: true
    }, _this.handleArrow.bind(_this));
    quill.keyboard.addBinding({
      key: 40,
      // ArrowRight
      collapsed: true
    }, _this.handleArrow.bind(_this));
    // TODO: Add keybindings for Enter (13) and Tab (9) directly on the quill editor
    return _this;
  }
  _inherits(ShortNameEmoji, _Module);
  return _createClass(ShortNameEmoji, [{
    key: "triggerPicker",
    value: function triggerPicker(range, context) {
      if (this.open) return true;
      if (range.length > 0) {
        this.quill.deleteText(range.index, range.length, quill__WEBPACK_IMPORTED_MODULE_0__["default"].sources.USER);
      }
      this.quill.insertText(range.index, ":", "emoji-shortname", quill__WEBPACK_IMPORTED_MODULE_0__["default"].sources.USER);
      var atSignBounds = this.quill.getBounds(range.index);
      this.quill.setSelection(range.index + 1, quill__WEBPACK_IMPORTED_MODULE_0__["default"].sources.SILENT);
      this.atIndex = range.index;
      var paletteMaxPos = atSignBounds.left + 250;
      if (paletteMaxPos > this.quill.container.offsetWidth) {
        this.container.style.left = atSignBounds.left - 250 + "px";
      } else {
        this.container.style.left = atSignBounds.left + "px";
      }
      this.container.style.top = atSignBounds.top + atSignBounds.height + "px";
      this.open = true;
      this.quill.on('text-change', this.onTextChange);
      this.quill.once('selection-change', this.onSelectionChange);
      this.onOpen && this.onOpen();
    }
  }, {
    key: "handleArrow",
    value: function handleArrow() {
      if (!this.open) return true;
      this.buttons[0].classList.remove('emoji-active');
      this.buttons[0].focus();
      if (this.buttons.length > 1) {
        this.buttons[1].focus();
      }
    }
  }, {
    key: "update",
    value: function update() {
      var sel = this.quill.getSelection().index;
      if (this.atIndex >= sel) {
        // Deleted the at character
        return this.close(null);
      }
      //Using: fuse.js
      this.query = this.quill.getText(this.atIndex + 1, sel - this.atIndex - 1);
      try {
        if (event && this.isWhiteSpace(this.query)) {
          this.close(null);
          return;
        }
      } catch (e) {
        console.warn(e);
      }
      this.query = this.query.trim();
      var emojis = this.fuse.search(this.query);
      emojis.sort(function (a, b) {
        return a.emoji_order - b.emoji_order;
      });
      if (this.query.length < this.options.fuse.minMatchCharLength || emojis.length === 0) {
        this.container.style.display = "none";
        return;
      }
      if (emojis.length > 15) {
        //return only 15
        emojis = emojis.slice(0, 15);
      }
      this.renderCompletions(emojis);
    }
  }, {
    key: "maybeUnfocus",
    value: function maybeUnfocus() {
      if (this.container.querySelector("*:focus")) return;
      this.close(null);
    }
  }, {
    key: "renderCompletions",
    value: function renderCompletions(emojis) {
      var _this2 = this;
      try {
        if (event) {
          if (event.key === "Enter" || event.keyCode === 13) {
            this.close(emojis[0], 1);
            this.container.style.display = "none";
            return;
          } else if (event.key === 'Tab' || event.keyCode === 9) {
            this.quill.disable();
            this.buttons[0].classList.remove('emoji-active');
            this.buttons[1].focus();
            return;
          }
        }
      } catch (e) {
        console.warn(e);
      }
      while (this.container.firstChild) {
        this.container.removeChild(this.container.firstChild);
      }
      var buttons = Array(emojis.length);
      this.buttons = buttons;
      var handler = function handler(i, emoji) {
        return function (event) {
          if (event.key === "ArrowRight" || event.keyCode === 39) {
            event.preventDefault();
            buttons[Math.min(buttons.length - 1, i + 1)].focus();
          } else if (event.key === 'Tab' || event.keyCode === 9) {
            event.preventDefault();
            if (i + 1 === buttons.length) {
              buttons[0].focus();
              return;
            }
            buttons[Math.min(buttons.length - 1, i + 1)].focus();
          } else if (event.key === "ArrowLeft" || event.keyCode === 37) {
            event.preventDefault();
            buttons[Math.max(0, i - 1)].focus();
          } else if (event.key === "ArrowDown" || event.keyCode === 40) {
            event.preventDefault();
            buttons[Math.min(buttons.length - 1, i + 1)].focus();
          } else if (event.key === "ArrowUp" || event.keyCode === 38) {
            event.preventDefault();
            buttons[Math.max(0, i - 1)].focus();
          } else if (event.key === "Enter" || event.keyCode === 13 || event.key === " " || event.keyCode === 32 || event.key === "Tab" || event.keyCode === 9) {
            event.preventDefault();
            _this2.quill.enable();
            _this2.close(emoji);
          }
        };
      };
      emojis.forEach(function (emoji, i) {
        var li = makeElement('li', {}, makeElement('button', {
          type: "button"
        }, makeElement("span", {
          className: "button-emoji ap ap-" + emoji.name,
          innerHTML: emoji.code_decimal
        }),
        //makeElement('span', {className: "matched"}, this.query),
        //makeElement('span', {className: "unmatched"}, emoji.shortname.slice(this.query.length+1))
        makeElement('span', {
          className: "unmatched"
        }, emoji.shortname)));
        _this2.container.appendChild(li);
        buttons[i] = li.firstChild;
        // Events will be GC-ed with button on each re-render:
        buttons[i].addEventListener('keydown', handler(i, emoji));
        buttons[i].addEventListener("mousedown", function () {
          return _this2.close(emoji);
        });
        buttons[i].addEventListener("focus", function () {
          return _this2.focusedButton = i;
        });
        buttons[i].addEventListener("unfocus", function () {
          return _this2.focusedButton = null;
        });
      });
      this.container.style.display = "block";
      //emoji palette on top
      if (this.quill.container.classList.contains('top-emoji')) {
        var x = this.container.querySelectorAll("li");
        var i;
        for (i = 0; i < x.length; i++) {
          x[i].style.display = 'block';
        }
        var windowHeight = window.innerHeight;
        var editorPos = this.quill.container.getBoundingClientRect().top;
        if (editorPos > windowHeight / 2 && this.container.offsetHeight > 0) {
          this.container.style.top = '-' + this.container.offsetHeight + "px";
        }
      }
      buttons[0].classList.add('emoji-active');
    }
  }, {
    key: "close",
    value: function close(value) {
      var _this3 = this;
      var trailingDelete = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.quill.enable();
      this.container.style.display = "none";
      while (this.container.firstChild) this.container.removeChild(this.container.firstChild);
      this.quill.off('selection-change', this.onSelectionChange);
      this.quill.off('text-change', this.onTextChange);
      if (value) {
        this.quill.deleteText(this.atIndex, this.query.length + 1 + trailingDelete, quill__WEBPACK_IMPORTED_MODULE_0__["default"].sources.USER);
        this.quill.insertEmbed(this.atIndex, 'emoji', value, quill__WEBPACK_IMPORTED_MODULE_0__["default"].sources.USER);
        setTimeout(function () {
          return _this3.quill.setSelection(_this3.atIndex + 1);
        }, 0);
      }
      this.quill.focus();
      this.open = false;
      this.onClose && this.onClose(value);
    }
  }]);
}(Module);
ShortNameEmoji.DEFAULTS = {
  emojiList: _emoji_list_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  fuse: {
    shouldSort: true,
    threshold: 0.1,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["shortname"]
  }
};
function makeElement(tag, attrs) {
  var elem = document.createElement(tag);
  Object.keys(attrs).forEach(function (key) {
    return elem[key] = attrs[key];
  });
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }
  children.forEach(function (child) {
    if (typeof child === "string") child = document.createTextNode(child);
    elem.appendChild(child);
  });
  return elem;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShortNameEmoji);

/***/ }),

/***/ "./src/module-textarea-emoji.js":
/*!**************************************!*\
  !*** ./src/module-textarea-emoji.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quill */ "quill");
/* harmony import */ var fuse_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fuse.js */ "./node_modules/fuse.js/dist/fuse.mjs");
/* harmony import */ var _emoji_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./emoji-list.js */ "./src/emoji-list.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Delta = quill__WEBPACK_IMPORTED_MODULE_0__["default"]["import"]('delta');
var Module = quill__WEBPACK_IMPORTED_MODULE_0__["default"]["import"]('core/module');
var TextAreaEmoji = /*#__PURE__*/function (_Module) {
  function TextAreaEmoji(quill, options) {
    var _this;
    _classCallCheck(this, TextAreaEmoji);
    _this = _callSuper(this, TextAreaEmoji, [quill, options]);
    _this.quill = quill;
    _this.container = document.createElement('div');
    _this.container.classList.add('textarea-emoji-control');
    _this.container.style.position = "absolute";
    _this.container.innerHTML = options.buttonIcon;
    _this.quill.container.appendChild(_this.container);
    _this.container.addEventListener('click', _this.checkEmojiBoxExist.bind(_this), false);
    _this.quill.root.addEventListener("click", fn_close.bind(_this), false);
    return _this;
  }
  _inherits(TextAreaEmoji, _Module);
  return _createClass(TextAreaEmoji, [{
    key: "checkEmojiBoxExist",
    value: function checkEmojiBoxExist() {
      var elementExists = document.getElementById("textarea-emoji");
      if (elementExists) {
        elementExists.remove();
      } else {
        var ele_emoji_area = document.createElement('div');
        ele_emoji_area.id = 'textarea-emoji';
        this.quill.container.appendChild(ele_emoji_area);
        var tabToolbar = document.createElement('div');
        tabToolbar.id = "tab-toolbar";
        ele_emoji_area.appendChild(tabToolbar);
        var emojiType = [{
          'type': 'p',
          'name': 'people',
          'content': '<div class="i-people"></div>'
        }, {
          'type': 'n',
          'name': 'nature',
          'content': '<div class="i-nature"></div>'
        }, {
          'type': 'd',
          'name': 'food',
          'content': '<div class="i-food"></div>'
        }, {
          'type': 's',
          'name': 'symbols',
          'content': '<div class="i-symbols"></div>'
        }, {
          'type': 'a',
          'name': 'activity',
          'content': '<div class="i-activity"></div>'
        }, {
          'type': 't',
          'name': 'travel',
          'content': '<div class="i-travel"></div>'
        }, {
          'type': 'o',
          'name': 'objects',
          'content': '<div class="i-objects"></div>'
        }, {
          'type': 'f',
          'name': 'flags',
          'content': '<div class="i-flags"></div>'
        }];
        var tabElementHolder = document.createElement('ul');
        tabToolbar.appendChild(tabElementHolder);
        var panel = document.createElement('div');
        panel.id = "tab-panel";
        ele_emoji_area.appendChild(panel);
        var innerQuill = this.quill;
        emojiType.map(function (emojiType) {
          var tabElement = document.createElement('li');
          tabElement.classList.add('emoji-tab');
          tabElement.classList.add('filter-' + emojiType.name);
          var tabValue = emojiType.content;
          tabElement.innerHTML = tabValue;
          tabElement.dataset.filter = emojiType.type;
          tabElementHolder.appendChild(tabElement);
          var emojiFilter = document.querySelector('.filter-' + emojiType.name);
          emojiFilter.addEventListener('click', function () {
            var emojiContainer = document.getElementById("textarea-emoji");
            var tab = emojiContainer && emojiContainer.querySelector('.active');
            if (tab) {
              tab.classList.remove('active');
            }
            emojiFilter.classList.toggle('active');
            while (panel.firstChild) {
              panel.removeChild(panel.firstChild);
            }
            var type = emojiFilter.dataset.filter;
            fn_emojiElementsToPanel(type, panel, innerQuill);
          });
        });
        var windowHeight = window.innerHeight;
        var editorPos = this.quill.container.getBoundingClientRect().top;
        if (editorPos > windowHeight / 2) {
          ele_emoji_area.style.top = '-250px';
        }
        fn_emojiPanelInit(panel, this.quill);
      }
    }
  }]);
}(Module);
TextAreaEmoji.DEFAULTS = {
  buttonIcon: '<svg viewbox="0 0 18 18"><circle class="ql-fill" cx="7" cy="7" r="1"></circle><circle class="ql-fill" cx="11" cy="7" r="1"></circle><path class="ql-stroke" d="M7,10a2,2,0,0,0,4,0H7Z"></path><circle class="ql-stroke" cx="9" cy="9" r="6"></circle></svg>'
};
function fn_close() {
  var ele_emoji_plate = document.getElementById('textarea-emoji');
  if (ele_emoji_plate) {
    ele_emoji_plate.remove();
  }
}
function fn_updateRange(quill) {
  var range = quill.getSelection();
  return range;
}
function fn_emojiPanelInit(panel, quill) {
  fn_emojiElementsToPanel('p', panel, quill);
  document.querySelector('.filter-people').classList.add('active');
}
function fn_emojiElementsToPanel(type, panel, quill) {
  var fuseOptions = {
    shouldSort: true,
    matchAllTokens: true,
    threshold: 0.3,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: ["category"]
  };
  var fuse = new fuse_js__WEBPACK_IMPORTED_MODULE_2__["default"](_emoji_list_js__WEBPACK_IMPORTED_MODULE_1__["default"], fuseOptions);
  var result = fuse.search(type);
  result.sort(function (a, b) {
    return a.emoji_order - b.emoji_order;
  });
  quill.focus();
  var range = fn_updateRange(quill);
  result.map(function (emojiItem) {
    var emoji = emojiItem.item;
    var span = document.createElement('span');
    var t = document.createTextNode(emoji.shortname);
    span.appendChild(t);
    span.classList.add('bem');
    span.classList.add('bem-' + emoji.name);
    span.classList.add('ap');
    span.classList.add('ap-' + emoji.name);
    var output = '' + emoji.code_decimal + '';
    span.innerHTML = output + ' ';
    panel.appendChild(span);
    var customButton = document.querySelector('.bem-' + emoji.name);
    if (customButton) {
      customButton.addEventListener('click', function () {
        // quill.insertText(range.index, customButton.innerHTML);
        // quill.setSelection(range.index + customButton.innerHTML.length, 0);
        // range.index = range.index + customButton.innerHTML.length;
        quill.insertEmbed(range.index, 'emoji', emoji, quill__WEBPACK_IMPORTED_MODULE_0__["default"].sources.USER);
        range.index += 1;
        setTimeout(function () {
          return quill.setSelection(range.index + 1);
        }, 0);
      });
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextAreaEmoji);

/***/ }),

/***/ "./src/module-toolbar-emoji.js":
/*!*************************************!*\
  !*** ./src/module-toolbar-emoji.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quill */ "quill");
/* harmony import */ var fuse_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fuse.js */ "./node_modules/fuse.js/dist/fuse.mjs");
/* harmony import */ var _emoji_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./emoji-list.js */ "./src/emoji-list.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Module = quill__WEBPACK_IMPORTED_MODULE_0__["default"]["import"]('core/module');
var ToolbarEmoji = /*#__PURE__*/function (_Module) {
  function ToolbarEmoji(quill, options) {
    var _this;
    _classCallCheck(this, ToolbarEmoji);
    _this = _callSuper(this, ToolbarEmoji, [quill, options]);
    _this.quill = quill;
    _this.toolbar = quill.getModule('toolbar');
    if (typeof _this.toolbar !== 'undefined') _this.toolbar.addHandler('emoji', _this.checkPaletteExists);
    var emojiBtns = document.getElementsByClassName('ql-emoji');
    if (emojiBtns) {
      [].slice.call(emojiBtns).forEach(function (emojiBtn) {
        emojiBtn.innerHTML = options.buttonIcon;
      });
    }
    return _this;
  }
  _inherits(ToolbarEmoji, _Module);
  return _createClass(ToolbarEmoji, [{
    key: "checkPaletteExists",
    value: function checkPaletteExists() {
      var quill = this.quill;
      fn_checkDialogOpen(quill);
      this.quill.on('text-change', function (delta, oldDelta, source) {
        if (source === 'user') {
          fn_close();
        }
      });
    }
  }]);
}(Module);
ToolbarEmoji.DEFAULTS = {
  buttonIcon: '<svg viewbox="0 0 18 18"><circle class="ql-fill" cx="7" cy="7" r="1"></circle><circle class="ql-fill" cx="11" cy="7" r="1"></circle><path class="ql-stroke" d="M7,10a2,2,0,0,0,4,0H7Z"></path><circle class="ql-stroke" cx="9" cy="9" r="6"></circle></svg>'
};
function fn_close() {
  var ele_emoji_plate = document.getElementById('emoji-palette');
  document.getElementById('emoji-close-div').style.display = "none";
  if (ele_emoji_plate) {
    ele_emoji_plate.remove();
  }
}
function fn_checkDialogOpen(quill) {
  var elementExists = document.getElementById("emoji-palette");
  if (elementExists) {
    elementExists.remove();
  } else {
    fn_showEmojiPalette(quill);
  }
}
function fn_showEmojiPalette(quill) {
  var paletteWidthAndHeight = 250;
  var ele_emoji_area = document.createElement('div');
  var selection = quill.getSelection();
  var selectionBounds = quill.getBounds(selection.index);
  var editorBounds = quill.container.getBoundingClientRect();
  var selectionCenter = (selectionBounds.left + selectionBounds.right) / 2;
  var selectionMiddle = (selectionBounds.top + selectionBounds.bottom) / 2;
  var paletteLeft = editorBounds.left + selectionCenter + paletteWidthAndHeight <= document.documentElement.clientWidth ? selectionCenter : editorBounds.left - paletteWidthAndHeight;
  var paletteTop = editorBounds.top + selectionMiddle + paletteWidthAndHeight + 10 <= document.documentElement.clientHeight ? selectionMiddle + 10 : editorBounds.top + selectionMiddle - paletteWidthAndHeight - 10 >= 0 ? selectionMiddle - paletteWidthAndHeight - 10 : document.documentElement.clientHeight - paletteWidthAndHeight - editorBounds.top;
  quill.container.appendChild(ele_emoji_area);
  ele_emoji_area.id = 'emoji-palette';
  ele_emoji_area.style.left = "".concat(paletteLeft, "px");
  ele_emoji_area.style.top = "".concat(paletteTop, "px");
  var tabToolbar = document.createElement('div');
  tabToolbar.id = "tab-toolbar";
  ele_emoji_area.appendChild(tabToolbar);

  //panel
  var panel = document.createElement('div');
  panel.id = "tab-panel";
  ele_emoji_area.appendChild(panel);
  var emojiType = [{
    'type': 'p',
    'name': 'people',
    'content': '<div class="i-people"></div>'
  }, {
    'type': 'n',
    'name': 'nature',
    'content': '<div class="i-nature"></div>'
  }, {
    'type': 'd',
    'name': 'food',
    'content': '<div class="i-food"></div>'
  }, {
    'type': 's',
    'name': 'symbols',
    'content': '<div class="i-symbols"></div>'
  }, {
    'type': 'a',
    'name': 'activity',
    'content': '<div class="i-activity"></div>'
  }, {
    'type': 't',
    'name': 'travel',
    'content': '<div class="i-travel"></div>'
  }, {
    'type': 'o',
    'name': 'objects',
    'content': '<div class="i-objects"></div>'
  }, {
    'type': 'f',
    'name': 'flags',
    'content': '<div class="i-flags"></div>'
  }];
  var tabElementHolder = document.createElement('ul');
  tabToolbar.appendChild(tabElementHolder);
  if (document.getElementById('emoji-close-div') === null) {
    var closeDiv = document.createElement('div');
    closeDiv.id = 'emoji-close-div';
    closeDiv.addEventListener("click", fn_close, false);
    document.getElementsByTagName('body')[0].appendChild(closeDiv);
  } else {
    document.getElementById('emoji-close-div').style.display = "block";
  }
  emojiType.map(function (emojiType) {
    //add tab bar
    var tabElement = document.createElement('li');
    tabElement.classList.add('emoji-tab');
    tabElement.classList.add('filter-' + emojiType.name);
    tabElement.innerHTML = emojiType.content;
    tabElement.dataset.filter = emojiType.type;
    tabElementHolder.appendChild(tabElement);
    var emojiFilter = document.querySelector('.filter-' + emojiType.name);
    emojiFilter.addEventListener('click', function () {
      var tab = document.querySelector('.active');
      if (tab) {
        tab.classList.remove('active');
      }
      emojiFilter.classList.toggle('active');
      fn_updateEmojiContainer(emojiFilter, panel, quill);
    });
  });
  fn_emojiPanelInit(panel, quill);
}
function fn_emojiPanelInit(panel, quill) {
  fn_emojiElementsToPanel('p', panel, quill);
  document.querySelector('.filter-people').classList.add('active');
}
function fn_emojiElementsToPanel(type, panel, quill) {
  var fuseOptions = {
    shouldSort: true,
    matchAllTokens: true,
    threshold: 0.3,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: ["category"]
  };
  var fuse = new fuse_js__WEBPACK_IMPORTED_MODULE_2__["default"](_emoji_list_js__WEBPACK_IMPORTED_MODULE_1__["default"], fuseOptions);
  var result = fuse.search(type);
  result.sort(function (a, b) {
    return a.emoji_order - b.emoji_order;
  });
  quill.focus();
  var range = quill.getSelection();
  result.map(function (emoji) {
    var span = document.createElement('span');
    var t = document.createTextNode(emoji.shortname);
    span.appendChild(t);
    span.classList.add('bem');
    span.classList.add('bem-' + emoji.name);
    span.classList.add('ap');
    span.classList.add('ap-' + emoji.name);
    var output = '' + emoji.code_decimal + '';
    span.innerHTML = output + ' ';
    panel.appendChild(span);
    var customButton = document.querySelector('.bem-' + emoji.name);
    if (customButton) {
      customButton.addEventListener('click', function () {
        makeElement("span", {
          className: "ico",
          innerHTML: '' + emoji.code_decimal + ' '
        });
        quill.insertEmbed(range.index, 'emoji', emoji, quill__WEBPACK_IMPORTED_MODULE_0__["default"].sources.USER);
        setTimeout(function () {
          return quill.setSelection(range.index + 1);
        }, 0);
        fn_close();
      });
    }
  });
}
function fn_updateEmojiContainer(emojiFilter, panel, quill) {
  while (panel.firstChild) {
    panel.removeChild(panel.firstChild);
  }
  var type = emojiFilter.dataset.filter;
  fn_emojiElementsToPanel(type, panel, quill);
}
function makeElement(tag, attrs) {
  var elem = document.createElement(tag);
  Object.keys(attrs).forEach(function (key) {
    return elem[key] = attrs[key];
  });
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }
  children.forEach(function (child) {
    if (typeof child === "string") child = document.createTextNode(child);
    elem.appendChild(child);
  });
  return elem;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToolbarEmoji);

/***/ }),

/***/ "./src/quill-emoji.js":
/*!****************************!*\
  !*** ./src/quill-emoji.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _format_emoji_blot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format-emoji-blot */ "./src/format-emoji-blot.js");
/* harmony import */ var _module_emoji__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module-emoji */ "./src/module-emoji.js");
/* harmony import */ var _module_toolbar_emoji__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module-toolbar-emoji */ "./src/module-toolbar-emoji.js");
/* harmony import */ var _module_textarea_emoji__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./module-textarea-emoji */ "./src/module-textarea-emoji.js");
/* harmony import */ var _scss_quill_emoji_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scss/quill-emoji.scss */ "./src/scss/quill-emoji.scss");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  EmojiBlot: _format_emoji_blot__WEBPACK_IMPORTED_MODULE_0__["default"],
  ShortNameEmoji: _module_emoji__WEBPACK_IMPORTED_MODULE_1__["default"],
  ToolbarEmoji: _module_toolbar_emoji__WEBPACK_IMPORTED_MODULE_2__["default"],
  TextAreaEmoji: _module_textarea_emoji__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./node_modules/fuse.js/dist/fuse.mjs":
/*!********************************************!*\
  !*** ./node_modules/fuse.js/dist/fuse.mjs ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Fuse)
/* harmony export */ });
/**
 * Fuse.js v7.0.0 - Lightweight fuzzy-search (http://fusejs.io)
 *
 * Copyright (c) 2023 Kiro Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

function isArray(value) {
  return !Array.isArray
    ? getTag(value) === '[object Array]'
    : Array.isArray(value)
}

// Adapted from: https://github.com/lodash/lodash/blob/master/.internal/baseToString.js
const INFINITY = 1 / 0;
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value
  }
  let result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result
}

function toString(value) {
  return value == null ? '' : baseToString(value)
}

function isString(value) {
  return typeof value === 'string'
}

function isNumber(value) {
  return typeof value === 'number'
}

// Adapted from: https://github.com/lodash/lodash/blob/master/isBoolean.js
function isBoolean(value) {
  return (
    value === true ||
    value === false ||
    (isObjectLike(value) && getTag(value) == '[object Boolean]')
  )
}

function isObject(value) {
  return typeof value === 'object'
}

// Checks if `value` is object-like.
function isObjectLike(value) {
  return isObject(value) && value !== null
}

function isDefined(value) {
  return value !== undefined && value !== null
}

function isBlank(value) {
  return !value.trim().length
}

// Gets the `toStringTag` of `value`.
// Adapted from: https://github.com/lodash/lodash/blob/master/.internal/getTag.js
function getTag(value) {
  return value == null
    ? value === undefined
      ? '[object Undefined]'
      : '[object Null]'
    : Object.prototype.toString.call(value)
}

const EXTENDED_SEARCH_UNAVAILABLE = 'Extended search is not available';

const INCORRECT_INDEX_TYPE = "Incorrect 'index' type";

const LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = (key) =>
  `Invalid value for key ${key}`;

const PATTERN_LENGTH_TOO_LARGE = (max) =>
  `Pattern length exceeds max of ${max}.`;

const MISSING_KEY_PROPERTY = (name) => `Missing ${name} property in key`;

const INVALID_KEY_WEIGHT_VALUE = (key) =>
  `Property 'weight' in key '${key}' must be a positive integer`;

const hasOwn = Object.prototype.hasOwnProperty;

class KeyStore {
  constructor(keys) {
    this._keys = [];
    this._keyMap = {};

    let totalWeight = 0;

    keys.forEach((key) => {
      let obj = createKey(key);

      this._keys.push(obj);
      this._keyMap[obj.id] = obj;

      totalWeight += obj.weight;
    });

    // Normalize weights so that their sum is equal to 1
    this._keys.forEach((key) => {
      key.weight /= totalWeight;
    });
  }
  get(keyId) {
    return this._keyMap[keyId]
  }
  keys() {
    return this._keys
  }
  toJSON() {
    return JSON.stringify(this._keys)
  }
}

function createKey(key) {
  let path = null;
  let id = null;
  let src = null;
  let weight = 1;
  let getFn = null;

  if (isString(key) || isArray(key)) {
    src = key;
    path = createKeyPath(key);
    id = createKeyId(key);
  } else {
    if (!hasOwn.call(key, 'name')) {
      throw new Error(MISSING_KEY_PROPERTY('name'))
    }

    const name = key.name;
    src = name;

    if (hasOwn.call(key, 'weight')) {
      weight = key.weight;

      if (weight <= 0) {
        throw new Error(INVALID_KEY_WEIGHT_VALUE(name))
      }
    }

    path = createKeyPath(name);
    id = createKeyId(name);
    getFn = key.getFn;
  }

  return { path, id, weight, src, getFn }
}

function createKeyPath(key) {
  return isArray(key) ? key : key.split('.')
}

function createKeyId(key) {
  return isArray(key) ? key.join('.') : key
}

function get(obj, path) {
  let list = [];
  let arr = false;

  const deepGet = (obj, path, index) => {
    if (!isDefined(obj)) {
      return
    }
    if (!path[index]) {
      // If there's no path left, we've arrived at the object we care about.
      list.push(obj);
    } else {
      let key = path[index];

      const value = obj[key];

      if (!isDefined(value)) {
        return
      }

      // If we're at the last value in the path, and if it's a string/number/bool,
      // add it to the list
      if (
        index === path.length - 1 &&
        (isString(value) || isNumber(value) || isBoolean(value))
      ) {
        list.push(toString(value));
      } else if (isArray(value)) {
        arr = true;
        // Search each item in the array.
        for (let i = 0, len = value.length; i < len; i += 1) {
          deepGet(value[i], path, index + 1);
        }
      } else if (path.length) {
        // An object. Recurse further.
        deepGet(value, path, index + 1);
      }
    }
  };

  // Backwards compatibility (since path used to be a string)
  deepGet(obj, isString(path) ? path.split('.') : path, 0);

  return arr ? list : list[0]
}

const MatchOptions = {
  // Whether the matches should be included in the result set. When `true`, each record in the result
  // set will include the indices of the matched characters.
  // These can consequently be used for highlighting purposes.
  includeMatches: false,
  // When `true`, the matching function will continue to the end of a search pattern even if
  // a perfect match has already been located in the string.
  findAllMatches: false,
  // Minimum number of characters that must be matched before a result is considered a match
  minMatchCharLength: 1
};

const BasicOptions = {
  // When `true`, the algorithm continues searching to the end of the input even if a perfect
  // match is found before the end of the same input.
  isCaseSensitive: false,
  // When true, the matching function will continue to the end of a search pattern even if
  includeScore: false,
  // List of properties that will be searched. This also supports nested properties.
  keys: [],
  // Whether to sort the result list, by score
  shouldSort: true,
  // Default sort function: sort by ascending score, ascending index
  sortFn: (a, b) =>
    a.score === b.score ? (a.idx < b.idx ? -1 : 1) : a.score < b.score ? -1 : 1
};

const FuzzyOptions = {
  // Approximately where in the text is the pattern expected to be found?
  location: 0,
  // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
  // (of both letters and location), a threshold of '1.0' would match anything.
  threshold: 0.6,
  // Determines how close the match must be to the fuzzy location (specified above).
  // An exact letter match which is 'distance' characters away from the fuzzy location
  // would score as a complete mismatch. A distance of '0' requires the match be at
  // the exact location specified, a threshold of '1000' would require a perfect match
  // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
  distance: 100
};

const AdvancedOptions = {
  // When `true`, it enables the use of unix-like search commands
  useExtendedSearch: false,
  // The get function to use when fetching an object's properties.
  // The default will search nested paths *ie foo.bar.baz*
  getFn: get,
  // When `true`, search will ignore `location` and `distance`, so it won't matter
  // where in the string the pattern appears.
  // More info: https://fusejs.io/concepts/scoring-theory.html#fuzziness-score
  ignoreLocation: false,
  // When `true`, the calculation for the relevance score (used for sorting) will
  // ignore the field-length norm.
  // More info: https://fusejs.io/concepts/scoring-theory.html#field-length-norm
  ignoreFieldNorm: false,
  // The weight to determine how much field length norm effects scoring.
  fieldNormWeight: 1
};

var Config = {
  ...BasicOptions,
  ...MatchOptions,
  ...FuzzyOptions,
  ...AdvancedOptions
};

const SPACE = /[^ ]+/g;

// Field-length norm: the shorter the field, the higher the weight.
// Set to 3 decimals to reduce index size.
function norm(weight = 1, mantissa = 3) {
  const cache = new Map();
  const m = Math.pow(10, mantissa);

  return {
    get(value) {
      const numTokens = value.match(SPACE).length;

      if (cache.has(numTokens)) {
        return cache.get(numTokens)
      }

      // Default function is 1/sqrt(x), weight makes that variable
      const norm = 1 / Math.pow(numTokens, 0.5 * weight);

      // In place of `toFixed(mantissa)`, for faster computation
      const n = parseFloat(Math.round(norm * m) / m);

      cache.set(numTokens, n);

      return n
    },
    clear() {
      cache.clear();
    }
  }
}

class FuseIndex {
  constructor({
    getFn = Config.getFn,
    fieldNormWeight = Config.fieldNormWeight
  } = {}) {
    this.norm = norm(fieldNormWeight, 3);
    this.getFn = getFn;
    this.isCreated = false;

    this.setIndexRecords();
  }
  setSources(docs = []) {
    this.docs = docs;
  }
  setIndexRecords(records = []) {
    this.records = records;
  }
  setKeys(keys = []) {
    this.keys = keys;
    this._keysMap = {};
    keys.forEach((key, idx) => {
      this._keysMap[key.id] = idx;
    });
  }
  create() {
    if (this.isCreated || !this.docs.length) {
      return
    }

    this.isCreated = true;

    // List is Array<String>
    if (isString(this.docs[0])) {
      this.docs.forEach((doc, docIndex) => {
        this._addString(doc, docIndex);
      });
    } else {
      // List is Array<Object>
      this.docs.forEach((doc, docIndex) => {
        this._addObject(doc, docIndex);
      });
    }

    this.norm.clear();
  }
  // Adds a doc to the end of the index
  add(doc) {
    const idx = this.size();

    if (isString(doc)) {
      this._addString(doc, idx);
    } else {
      this._addObject(doc, idx);
    }
  }
  // Removes the doc at the specified index of the index
  removeAt(idx) {
    this.records.splice(idx, 1);

    // Change ref index of every subsquent doc
    for (let i = idx, len = this.size(); i < len; i += 1) {
      this.records[i].i -= 1;
    }
  }
  getValueForItemAtKeyId(item, keyId) {
    return item[this._keysMap[keyId]]
  }
  size() {
    return this.records.length
  }
  _addString(doc, docIndex) {
    if (!isDefined(doc) || isBlank(doc)) {
      return
    }

    let record = {
      v: doc,
      i: docIndex,
      n: this.norm.get(doc)
    };

    this.records.push(record);
  }
  _addObject(doc, docIndex) {
    let record = { i: docIndex, $: {} };

    // Iterate over every key (i.e, path), and fetch the value at that key
    this.keys.forEach((key, keyIndex) => {
      let value = key.getFn ? key.getFn(doc) : this.getFn(doc, key.path);

      if (!isDefined(value)) {
        return
      }

      if (isArray(value)) {
        let subRecords = [];
        const stack = [{ nestedArrIndex: -1, value }];

        while (stack.length) {
          const { nestedArrIndex, value } = stack.pop();

          if (!isDefined(value)) {
            continue
          }

          if (isString(value) && !isBlank(value)) {
            let subRecord = {
              v: value,
              i: nestedArrIndex,
              n: this.norm.get(value)
            };

            subRecords.push(subRecord);
          } else if (isArray(value)) {
            value.forEach((item, k) => {
              stack.push({
                nestedArrIndex: k,
                value: item
              });
            });
          } else ;
        }
        record.$[keyIndex] = subRecords;
      } else if (isString(value) && !isBlank(value)) {
        let subRecord = {
          v: value,
          n: this.norm.get(value)
        };

        record.$[keyIndex] = subRecord;
      }
    });

    this.records.push(record);
  }
  toJSON() {
    return {
      keys: this.keys,
      records: this.records
    }
  }
}

function createIndex(
  keys,
  docs,
  { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}
) {
  const myIndex = new FuseIndex({ getFn, fieldNormWeight });
  myIndex.setKeys(keys.map(createKey));
  myIndex.setSources(docs);
  myIndex.create();
  return myIndex
}

function parseIndex(
  data,
  { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}
) {
  const { keys, records } = data;
  const myIndex = new FuseIndex({ getFn, fieldNormWeight });
  myIndex.setKeys(keys);
  myIndex.setIndexRecords(records);
  return myIndex
}

function computeScore$1(
  pattern,
  {
    errors = 0,
    currentLocation = 0,
    expectedLocation = 0,
    distance = Config.distance,
    ignoreLocation = Config.ignoreLocation
  } = {}
) {
  const accuracy = errors / pattern.length;

  if (ignoreLocation) {
    return accuracy
  }

  const proximity = Math.abs(expectedLocation - currentLocation);

  if (!distance) {
    // Dodge divide by zero error.
    return proximity ? 1.0 : accuracy
  }

  return accuracy + proximity / distance
}

function convertMaskToIndices(
  matchmask = [],
  minMatchCharLength = Config.minMatchCharLength
) {
  let indices = [];
  let start = -1;
  let end = -1;
  let i = 0;

  for (let len = matchmask.length; i < len; i += 1) {
    let match = matchmask[i];
    if (match && start === -1) {
      start = i;
    } else if (!match && start !== -1) {
      end = i - 1;
      if (end - start + 1 >= minMatchCharLength) {
        indices.push([start, end]);
      }
      start = -1;
    }
  }

  // (i-1 - start) + 1 => i - start
  if (matchmask[i - 1] && i - start >= minMatchCharLength) {
    indices.push([start, i - 1]);
  }

  return indices
}

// Machine word size
const MAX_BITS = 32;

function search(
  text,
  pattern,
  patternAlphabet,
  {
    location = Config.location,
    distance = Config.distance,
    threshold = Config.threshold,
    findAllMatches = Config.findAllMatches,
    minMatchCharLength = Config.minMatchCharLength,
    includeMatches = Config.includeMatches,
    ignoreLocation = Config.ignoreLocation
  } = {}
) {
  if (pattern.length > MAX_BITS) {
    throw new Error(PATTERN_LENGTH_TOO_LARGE(MAX_BITS))
  }

  const patternLen = pattern.length;
  // Set starting location at beginning text and initialize the alphabet.
  const textLen = text.length;
  // Handle the case when location > text.length
  const expectedLocation = Math.max(0, Math.min(location, textLen));
  // Highest score beyond which we give up.
  let currentThreshold = threshold;
  // Is there a nearby exact match? (speedup)
  let bestLocation = expectedLocation;

  // Performance: only computer matches when the minMatchCharLength > 1
  // OR if `includeMatches` is true.
  const computeMatches = minMatchCharLength > 1 || includeMatches;
  // A mask of the matches, used for building the indices
  const matchMask = computeMatches ? Array(textLen) : [];

  let index;

  // Get all exact matches, here for speed up
  while ((index = text.indexOf(pattern, bestLocation)) > -1) {
    let score = computeScore$1(pattern, {
      currentLocation: index,
      expectedLocation,
      distance,
      ignoreLocation
    });

    currentThreshold = Math.min(score, currentThreshold);
    bestLocation = index + patternLen;

    if (computeMatches) {
      let i = 0;
      while (i < patternLen) {
        matchMask[index + i] = 1;
        i += 1;
      }
    }
  }

  // Reset the best location
  bestLocation = -1;

  let lastBitArr = [];
  let finalScore = 1;
  let binMax = patternLen + textLen;

  const mask = 1 << (patternLen - 1);

  for (let i = 0; i < patternLen; i += 1) {
    // Scan for the best match; each iteration allows for one more error.
    // Run a binary search to determine how far from the match location we can stray
    // at this error level.
    let binMin = 0;
    let binMid = binMax;

    while (binMin < binMid) {
      const score = computeScore$1(pattern, {
        errors: i,
        currentLocation: expectedLocation + binMid,
        expectedLocation,
        distance,
        ignoreLocation
      });

      if (score <= currentThreshold) {
        binMin = binMid;
      } else {
        binMax = binMid;
      }

      binMid = Math.floor((binMax - binMin) / 2 + binMin);
    }

    // Use the result from this iteration as the maximum for the next.
    binMax = binMid;

    let start = Math.max(1, expectedLocation - binMid + 1);
    let finish = findAllMatches
      ? textLen
      : Math.min(expectedLocation + binMid, textLen) + patternLen;

    // Initialize the bit array
    let bitArr = Array(finish + 2);

    bitArr[finish + 1] = (1 << i) - 1;

    for (let j = finish; j >= start; j -= 1) {
      let currentLocation = j - 1;
      let charMatch = patternAlphabet[text.charAt(currentLocation)];

      if (computeMatches) {
        // Speed up: quick bool to int conversion (i.e, `charMatch ? 1 : 0`)
        matchMask[currentLocation] = +!!charMatch;
      }

      // First pass: exact match
      bitArr[j] = ((bitArr[j + 1] << 1) | 1) & charMatch;

      // Subsequent passes: fuzzy match
      if (i) {
        bitArr[j] |=
          ((lastBitArr[j + 1] | lastBitArr[j]) << 1) | 1 | lastBitArr[j + 1];
      }

      if (bitArr[j] & mask) {
        finalScore = computeScore$1(pattern, {
          errors: i,
          currentLocation,
          expectedLocation,
          distance,
          ignoreLocation
        });

        // This match will almost certainly be better than any existing match.
        // But check anyway.
        if (finalScore <= currentThreshold) {
          // Indeed it is
          currentThreshold = finalScore;
          bestLocation = currentLocation;

          // Already passed `loc`, downhill from here on in.
          if (bestLocation <= expectedLocation) {
            break
          }

          // When passing `bestLocation`, don't exceed our current distance from `expectedLocation`.
          start = Math.max(1, 2 * expectedLocation - bestLocation);
        }
      }
    }

    // No hope for a (better) match at greater error levels.
    const score = computeScore$1(pattern, {
      errors: i + 1,
      currentLocation: expectedLocation,
      expectedLocation,
      distance,
      ignoreLocation
    });

    if (score > currentThreshold) {
      break
    }

    lastBitArr = bitArr;
  }

  const result = {
    isMatch: bestLocation >= 0,
    // Count exact matches (those with a score of 0) to be "almost" exact
    score: Math.max(0.001, finalScore)
  };

  if (computeMatches) {
    const indices = convertMaskToIndices(matchMask, minMatchCharLength);
    if (!indices.length) {
      result.isMatch = false;
    } else if (includeMatches) {
      result.indices = indices;
    }
  }

  return result
}

function createPatternAlphabet(pattern) {
  let mask = {};

  for (let i = 0, len = pattern.length; i < len; i += 1) {
    const char = pattern.charAt(i);
    mask[char] = (mask[char] || 0) | (1 << (len - i - 1));
  }

  return mask
}

class BitapSearch {
  constructor(
    pattern,
    {
      location = Config.location,
      threshold = Config.threshold,
      distance = Config.distance,
      includeMatches = Config.includeMatches,
      findAllMatches = Config.findAllMatches,
      minMatchCharLength = Config.minMatchCharLength,
      isCaseSensitive = Config.isCaseSensitive,
      ignoreLocation = Config.ignoreLocation
    } = {}
  ) {
    this.options = {
      location,
      threshold,
      distance,
      includeMatches,
      findAllMatches,
      minMatchCharLength,
      isCaseSensitive,
      ignoreLocation
    };

    this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();

    this.chunks = [];

    if (!this.pattern.length) {
      return
    }

    const addChunk = (pattern, startIndex) => {
      this.chunks.push({
        pattern,
        alphabet: createPatternAlphabet(pattern),
        startIndex
      });
    };

    const len = this.pattern.length;

    if (len > MAX_BITS) {
      let i = 0;
      const remainder = len % MAX_BITS;
      const end = len - remainder;

      while (i < end) {
        addChunk(this.pattern.substr(i, MAX_BITS), i);
        i += MAX_BITS;
      }

      if (remainder) {
        const startIndex = len - MAX_BITS;
        addChunk(this.pattern.substr(startIndex), startIndex);
      }
    } else {
      addChunk(this.pattern, 0);
    }
  }

  searchIn(text) {
    const { isCaseSensitive, includeMatches } = this.options;

    if (!isCaseSensitive) {
      text = text.toLowerCase();
    }

    // Exact match
    if (this.pattern === text) {
      let result = {
        isMatch: true,
        score: 0
      };

      if (includeMatches) {
        result.indices = [[0, text.length - 1]];
      }

      return result
    }

    // Otherwise, use Bitap algorithm
    const {
      location,
      distance,
      threshold,
      findAllMatches,
      minMatchCharLength,
      ignoreLocation
    } = this.options;

    let allIndices = [];
    let totalScore = 0;
    let hasMatches = false;

    this.chunks.forEach(({ pattern, alphabet, startIndex }) => {
      const { isMatch, score, indices } = search(text, pattern, alphabet, {
        location: location + startIndex,
        distance,
        threshold,
        findAllMatches,
        minMatchCharLength,
        includeMatches,
        ignoreLocation
      });

      if (isMatch) {
        hasMatches = true;
      }

      totalScore += score;

      if (isMatch && indices) {
        allIndices = [...allIndices, ...indices];
      }
    });

    let result = {
      isMatch: hasMatches,
      score: hasMatches ? totalScore / this.chunks.length : 1
    };

    if (hasMatches && includeMatches) {
      result.indices = allIndices;
    }

    return result
  }
}

class BaseMatch {
  constructor(pattern) {
    this.pattern = pattern;
  }
  static isMultiMatch(pattern) {
    return getMatch(pattern, this.multiRegex)
  }
  static isSingleMatch(pattern) {
    return getMatch(pattern, this.singleRegex)
  }
  search(/*text*/) {}
}

function getMatch(pattern, exp) {
  const matches = pattern.match(exp);
  return matches ? matches[1] : null
}

// Token: 'file

class ExactMatch extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return 'exact'
  }
  static get multiRegex() {
    return /^="(.*)"$/
  }
  static get singleRegex() {
    return /^=(.*)$/
  }
  search(text) {
    const isMatch = text === this.pattern;

    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    }
  }
}

// Token: !fire

class InverseExactMatch extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return 'inverse-exact'
  }
  static get multiRegex() {
    return /^!"(.*)"$/
  }
  static get singleRegex() {
    return /^!(.*)$/
  }
  search(text) {
    const index = text.indexOf(this.pattern);
    const isMatch = index === -1;

    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, text.length - 1]
    }
  }
}

// Token: ^file

class PrefixExactMatch extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return 'prefix-exact'
  }
  static get multiRegex() {
    return /^\^"(.*)"$/
  }
  static get singleRegex() {
    return /^\^(.*)$/
  }
  search(text) {
    const isMatch = text.startsWith(this.pattern);

    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    }
  }
}

// Token: !^fire

class InversePrefixExactMatch extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return 'inverse-prefix-exact'
  }
  static get multiRegex() {
    return /^!\^"(.*)"$/
  }
  static get singleRegex() {
    return /^!\^(.*)$/
  }
  search(text) {
    const isMatch = !text.startsWith(this.pattern);

    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, text.length - 1]
    }
  }
}

// Token: .file$

class SuffixExactMatch extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return 'suffix-exact'
  }
  static get multiRegex() {
    return /^"(.*)"\$$/
  }
  static get singleRegex() {
    return /^(.*)\$$/
  }
  search(text) {
    const isMatch = text.endsWith(this.pattern);

    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [text.length - this.pattern.length, text.length - 1]
    }
  }
}

// Token: !.file$

class InverseSuffixExactMatch extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return 'inverse-suffix-exact'
  }
  static get multiRegex() {
    return /^!"(.*)"\$$/
  }
  static get singleRegex() {
    return /^!(.*)\$$/
  }
  search(text) {
    const isMatch = !text.endsWith(this.pattern);
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, text.length - 1]
    }
  }
}

class FuzzyMatch extends BaseMatch {
  constructor(
    pattern,
    {
      location = Config.location,
      threshold = Config.threshold,
      distance = Config.distance,
      includeMatches = Config.includeMatches,
      findAllMatches = Config.findAllMatches,
      minMatchCharLength = Config.minMatchCharLength,
      isCaseSensitive = Config.isCaseSensitive,
      ignoreLocation = Config.ignoreLocation
    } = {}
  ) {
    super(pattern);
    this._bitapSearch = new BitapSearch(pattern, {
      location,
      threshold,
      distance,
      includeMatches,
      findAllMatches,
      minMatchCharLength,
      isCaseSensitive,
      ignoreLocation
    });
  }
  static get type() {
    return 'fuzzy'
  }
  static get multiRegex() {
    return /^"(.*)"$/
  }
  static get singleRegex() {
    return /^(.*)$/
  }
  search(text) {
    return this._bitapSearch.searchIn(text)
  }
}

// Token: 'file

class IncludeMatch extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return 'include'
  }
  static get multiRegex() {
    return /^'"(.*)"$/
  }
  static get singleRegex() {
    return /^'(.*)$/
  }
  search(text) {
    let location = 0;
    let index;

    const indices = [];
    const patternLen = this.pattern.length;

    // Get all exact matches
    while ((index = text.indexOf(this.pattern, location)) > -1) {
      location = index + patternLen;
      indices.push([index, location - 1]);
    }

    const isMatch = !!indices.length;

    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices
    }
  }
}

// ❗Order is important. DO NOT CHANGE.
const searchers = [
  ExactMatch,
  IncludeMatch,
  PrefixExactMatch,
  InversePrefixExactMatch,
  InverseSuffixExactMatch,
  SuffixExactMatch,
  InverseExactMatch,
  FuzzyMatch
];

const searchersLen = searchers.length;

// Regex to split by spaces, but keep anything in quotes together
const SPACE_RE = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;
const OR_TOKEN = '|';

// Return a 2D array representation of the query, for simpler parsing.
// Example:
// "^core go$ | rb$ | py$ xy$" => [["^core", "go$"], ["rb$"], ["py$", "xy$"]]
function parseQuery(pattern, options = {}) {
  return pattern.split(OR_TOKEN).map((item) => {
    let query = item
      .trim()
      .split(SPACE_RE)
      .filter((item) => item && !!item.trim());

    let results = [];
    for (let i = 0, len = query.length; i < len; i += 1) {
      const queryItem = query[i];

      // 1. Handle multiple query match (i.e, once that are quoted, like `"hello world"`)
      let found = false;
      let idx = -1;
      while (!found && ++idx < searchersLen) {
        const searcher = searchers[idx];
        let token = searcher.isMultiMatch(queryItem);
        if (token) {
          results.push(new searcher(token, options));
          found = true;
        }
      }

      if (found) {
        continue
      }

      // 2. Handle single query matches (i.e, once that are *not* quoted)
      idx = -1;
      while (++idx < searchersLen) {
        const searcher = searchers[idx];
        let token = searcher.isSingleMatch(queryItem);
        if (token) {
          results.push(new searcher(token, options));
          break
        }
      }
    }

    return results
  })
}

// These extended matchers can return an array of matches, as opposed
// to a singl match
const MultiMatchSet = new Set([FuzzyMatch.type, IncludeMatch.type]);

/**
 * Command-like searching
 * ======================
 *
 * Given multiple search terms delimited by spaces.e.g. `^jscript .python$ ruby !java`,
 * search in a given text.
 *
 * Search syntax:
 *
 * | Token       | Match type                 | Description                            |
 * | ----------- | -------------------------- | -------------------------------------- |
 * | `jscript`   | fuzzy-match                | Items that fuzzy match `jscript`       |
 * | `=scheme`   | exact-match                | Items that are `scheme`                |
 * | `'python`   | include-match              | Items that include `python`            |
 * | `!ruby`     | inverse-exact-match        | Items that do not include `ruby`       |
 * | `^java`     | prefix-exact-match         | Items that start with `java`           |
 * | `!^earlang` | inverse-prefix-exact-match | Items that do not start with `earlang` |
 * | `.js$`      | suffix-exact-match         | Items that end with `.js`              |
 * | `!.go$`     | inverse-suffix-exact-match | Items that do not end with `.go`       |
 *
 * A single pipe character acts as an OR operator. For example, the following
 * query matches entries that start with `core` and end with either`go`, `rb`,
 * or`py`.
 *
 * ```
 * ^core go$ | rb$ | py$
 * ```
 */
class ExtendedSearch {
  constructor(
    pattern,
    {
      isCaseSensitive = Config.isCaseSensitive,
      includeMatches = Config.includeMatches,
      minMatchCharLength = Config.minMatchCharLength,
      ignoreLocation = Config.ignoreLocation,
      findAllMatches = Config.findAllMatches,
      location = Config.location,
      threshold = Config.threshold,
      distance = Config.distance
    } = {}
  ) {
    this.query = null;
    this.options = {
      isCaseSensitive,
      includeMatches,
      minMatchCharLength,
      findAllMatches,
      ignoreLocation,
      location,
      threshold,
      distance
    };

    this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
    this.query = parseQuery(this.pattern, this.options);
  }

  static condition(_, options) {
    return options.useExtendedSearch
  }

  searchIn(text) {
    const query = this.query;

    if (!query) {
      return {
        isMatch: false,
        score: 1
      }
    }

    const { includeMatches, isCaseSensitive } = this.options;

    text = isCaseSensitive ? text : text.toLowerCase();

    let numMatches = 0;
    let allIndices = [];
    let totalScore = 0;

    // ORs
    for (let i = 0, qLen = query.length; i < qLen; i += 1) {
      const searchers = query[i];

      // Reset indices
      allIndices.length = 0;
      numMatches = 0;

      // ANDs
      for (let j = 0, pLen = searchers.length; j < pLen; j += 1) {
        const searcher = searchers[j];
        const { isMatch, indices, score } = searcher.search(text);

        if (isMatch) {
          numMatches += 1;
          totalScore += score;
          if (includeMatches) {
            const type = searcher.constructor.type;
            if (MultiMatchSet.has(type)) {
              allIndices = [...allIndices, ...indices];
            } else {
              allIndices.push(indices);
            }
          }
        } else {
          totalScore = 0;
          numMatches = 0;
          allIndices.length = 0;
          break
        }
      }

      // OR condition, so if TRUE, return
      if (numMatches) {
        let result = {
          isMatch: true,
          score: totalScore / numMatches
        };

        if (includeMatches) {
          result.indices = allIndices;
        }

        return result
      }
    }

    // Nothing was matched
    return {
      isMatch: false,
      score: 1
    }
  }
}

const registeredSearchers = [];

function register(...args) {
  registeredSearchers.push(...args);
}

function createSearcher(pattern, options) {
  for (let i = 0, len = registeredSearchers.length; i < len; i += 1) {
    let searcherClass = registeredSearchers[i];
    if (searcherClass.condition(pattern, options)) {
      return new searcherClass(pattern, options)
    }
  }

  return new BitapSearch(pattern, options)
}

const LogicalOperator = {
  AND: '$and',
  OR: '$or'
};

const KeyType = {
  PATH: '$path',
  PATTERN: '$val'
};

const isExpression = (query) =>
  !!(query[LogicalOperator.AND] || query[LogicalOperator.OR]);

const isPath = (query) => !!query[KeyType.PATH];

const isLeaf = (query) =>
  !isArray(query) && isObject(query) && !isExpression(query);

const convertToExplicit = (query) => ({
  [LogicalOperator.AND]: Object.keys(query).map((key) => ({
    [key]: query[key]
  }))
});

// When `auto` is `true`, the parse function will infer and initialize and add
// the appropriate `Searcher` instance
function parse(query, options, { auto = true } = {}) {
  const next = (query) => {
    let keys = Object.keys(query);

    const isQueryPath = isPath(query);

    if (!isQueryPath && keys.length > 1 && !isExpression(query)) {
      return next(convertToExplicit(query))
    }

    if (isLeaf(query)) {
      const key = isQueryPath ? query[KeyType.PATH] : keys[0];

      const pattern = isQueryPath ? query[KeyType.PATTERN] : query[key];

      if (!isString(pattern)) {
        throw new Error(LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key))
      }

      const obj = {
        keyId: createKeyId(key),
        pattern
      };

      if (auto) {
        obj.searcher = createSearcher(pattern, options);
      }

      return obj
    }

    let node = {
      children: [],
      operator: keys[0]
    };

    keys.forEach((key) => {
      const value = query[key];

      if (isArray(value)) {
        value.forEach((item) => {
          node.children.push(next(item));
        });
      }
    });

    return node
  };

  if (!isExpression(query)) {
    query = convertToExplicit(query);
  }

  return next(query)
}

// Practical scoring function
function computeScore(
  results,
  { ignoreFieldNorm = Config.ignoreFieldNorm }
) {
  results.forEach((result) => {
    let totalScore = 1;

    result.matches.forEach(({ key, norm, score }) => {
      const weight = key ? key.weight : null;

      totalScore *= Math.pow(
        score === 0 && weight ? Number.EPSILON : score,
        (weight || 1) * (ignoreFieldNorm ? 1 : norm)
      );
    });

    result.score = totalScore;
  });
}

function transformMatches(result, data) {
  const matches = result.matches;
  data.matches = [];

  if (!isDefined(matches)) {
    return
  }

  matches.forEach((match) => {
    if (!isDefined(match.indices) || !match.indices.length) {
      return
    }

    const { indices, value } = match;

    let obj = {
      indices,
      value
    };

    if (match.key) {
      obj.key = match.key.src;
    }

    if (match.idx > -1) {
      obj.refIndex = match.idx;
    }

    data.matches.push(obj);
  });
}

function transformScore(result, data) {
  data.score = result.score;
}

function format(
  results,
  docs,
  {
    includeMatches = Config.includeMatches,
    includeScore = Config.includeScore
  } = {}
) {
  const transformers = [];

  if (includeMatches) transformers.push(transformMatches);
  if (includeScore) transformers.push(transformScore);

  return results.map((result) => {
    const { idx } = result;

    const data = {
      item: docs[idx],
      refIndex: idx
    };

    if (transformers.length) {
      transformers.forEach((transformer) => {
        transformer(result, data);
      });
    }

    return data
  })
}

class Fuse {
  constructor(docs, options = {}, index) {
    this.options = { ...Config, ...options };

    if (
      this.options.useExtendedSearch &&
      !true
    ) {}

    this._keyStore = new KeyStore(this.options.keys);

    this.setCollection(docs, index);
  }

  setCollection(docs, index) {
    this._docs = docs;

    if (index && !(index instanceof FuseIndex)) {
      throw new Error(INCORRECT_INDEX_TYPE)
    }

    this._myIndex =
      index ||
      createIndex(this.options.keys, this._docs, {
        getFn: this.options.getFn,
        fieldNormWeight: this.options.fieldNormWeight
      });
  }

  add(doc) {
    if (!isDefined(doc)) {
      return
    }

    this._docs.push(doc);
    this._myIndex.add(doc);
  }

  remove(predicate = (/* doc, idx */) => false) {
    const results = [];

    for (let i = 0, len = this._docs.length; i < len; i += 1) {
      const doc = this._docs[i];
      if (predicate(doc, i)) {
        this.removeAt(i);
        i -= 1;
        len -= 1;

        results.push(doc);
      }
    }

    return results
  }

  removeAt(idx) {
    this._docs.splice(idx, 1);
    this._myIndex.removeAt(idx);
  }

  getIndex() {
    return this._myIndex
  }

  search(query, { limit = -1 } = {}) {
    const {
      includeMatches,
      includeScore,
      shouldSort,
      sortFn,
      ignoreFieldNorm
    } = this.options;

    let results = isString(query)
      ? isString(this._docs[0])
        ? this._searchStringList(query)
        : this._searchObjectList(query)
      : this._searchLogical(query);

    computeScore(results, { ignoreFieldNorm });

    if (shouldSort) {
      results.sort(sortFn);
    }

    if (isNumber(limit) && limit > -1) {
      results = results.slice(0, limit);
    }

    return format(results, this._docs, {
      includeMatches,
      includeScore
    })
  }

  _searchStringList(query) {
    const searcher = createSearcher(query, this.options);
    const { records } = this._myIndex;
    const results = [];

    // Iterate over every string in the index
    records.forEach(({ v: text, i: idx, n: norm }) => {
      if (!isDefined(text)) {
        return
      }

      const { isMatch, score, indices } = searcher.searchIn(text);

      if (isMatch) {
        results.push({
          item: text,
          idx,
          matches: [{ score, value: text, norm, indices }]
        });
      }
    });

    return results
  }

  _searchLogical(query) {

    const expression = parse(query, this.options);

    const evaluate = (node, item, idx) => {
      if (!node.children) {
        const { keyId, searcher } = node;

        const matches = this._findMatches({
          key: this._keyStore.get(keyId),
          value: this._myIndex.getValueForItemAtKeyId(item, keyId),
          searcher
        });

        if (matches && matches.length) {
          return [
            {
              idx,
              item,
              matches
            }
          ]
        }

        return []
      }

      const res = [];
      for (let i = 0, len = node.children.length; i < len; i += 1) {
        const child = node.children[i];
        const result = evaluate(child, item, idx);
        if (result.length) {
          res.push(...result);
        } else if (node.operator === LogicalOperator.AND) {
          return []
        }
      }
      return res
    };

    const records = this._myIndex.records;
    const resultMap = {};
    const results = [];

    records.forEach(({ $: item, i: idx }) => {
      if (isDefined(item)) {
        let expResults = evaluate(expression, item, idx);

        if (expResults.length) {
          // Dedupe when adding
          if (!resultMap[idx]) {
            resultMap[idx] = { idx, item, matches: [] };
            results.push(resultMap[idx]);
          }
          expResults.forEach(({ matches }) => {
            resultMap[idx].matches.push(...matches);
          });
        }
      }
    });

    return results
  }

  _searchObjectList(query) {
    const searcher = createSearcher(query, this.options);
    const { keys, records } = this._myIndex;
    const results = [];

    // List is Array<Object>
    records.forEach(({ $: item, i: idx }) => {
      if (!isDefined(item)) {
        return
      }

      let matches = [];

      // Iterate over every key (i.e, path), and fetch the value at that key
      keys.forEach((key, keyIndex) => {
        matches.push(
          ...this._findMatches({
            key,
            value: item[keyIndex],
            searcher
          })
        );
      });

      if (matches.length) {
        results.push({
          idx,
          item,
          matches
        });
      }
    });

    return results
  }
  _findMatches({ key, value, searcher }) {
    if (!isDefined(value)) {
      return []
    }

    let matches = [];

    if (isArray(value)) {
      value.forEach(({ v: text, i: idx, n: norm }) => {
        if (!isDefined(text)) {
          return
        }

        const { isMatch, score, indices } = searcher.searchIn(text);

        if (isMatch) {
          matches.push({
            score,
            key,
            value: text,
            idx,
            norm,
            indices
          });
        }
      });
    } else {
      const { v: text, n: norm } = value;

      const { isMatch, score, indices } = searcher.searchIn(text);

      if (isMatch) {
        matches.push({ score, key, value: text, norm, indices });
      }
    }

    return matches
  }
}

Fuse.version = '7.0.0';
Fuse.createIndex = createIndex;
Fuse.parseIndex = parseIndex;
Fuse.config = Config;

{
  Fuse.parseQuery = parse;
}

{
  register(ExtendedSearch);
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 		__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 		module = execOptions.module;
/******/ 		execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("quill-emoji." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("f37619b445d0103b4cb7")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "WMLQuillEmoji:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId, fetchPriority) {
/******/ 				return trackBlockingPromise(require.e(chunkId, fetchPriority));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results).then(function () {});
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							}, [])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		if (typeof document === "undefined") return;
/******/ 		var createStylesheet = (chunkId, fullhref, oldTag, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			if (__webpack_require__.nc) {
/******/ 				linkTag.nonce = __webpack_require__.nc;
/******/ 			}
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && event.type;
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + errorType + ": " + realHref + ")");
/******/ 					err.name = "ChunkLoadError";
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					if (linkTag.parentNode) linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 		
/******/ 			if (oldTag) {
/******/ 				oldTag.parentNode.insertBefore(linkTag, oldTag.nextSibling);
/******/ 			} else {
/******/ 				document.head.appendChild(linkTag);
/******/ 			}
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, null, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// no chunk loading
/******/ 		
/******/ 		var oldTags = [];
/******/ 		var newTags = [];
/******/ 		var applyHandler = (options) => {
/******/ 			return { dispose: () => {
/******/ 				for(var i = 0; i < oldTags.length; i++) {
/******/ 					var oldTag = oldTags[i];
/******/ 					if(oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
/******/ 				}
/******/ 				oldTags.length = 0;
/******/ 			}, apply: () => {
/******/ 				for(var i = 0; i < newTags.length; i++) newTags[i].rel = "stylesheet";
/******/ 				newTags.length = 0;
/******/ 			} };
/******/ 		}
/******/ 		__webpack_require__.hmrC.miniCss = (chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) => {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			chunkIds.forEach((chunkId) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var oldTag = findStylesheet(href, fullhref);
/******/ 				if(!oldTag) return;
/******/ 				promises.push(new Promise((resolve, reject) => {
/******/ 					var tag = createStylesheet(chunkId, fullhref, oldTag, () => {
/******/ 						tag.as = "style";
/******/ 						tag.rel = "preload";
/******/ 						resolve();
/******/ 					}, reject);
/******/ 					oldTags.push(oldTag);
/******/ 					newTags.push(tag);
/******/ 				}));
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"quill-emoji": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		this["webpackHotUpdateWMLQuillEmoji"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8082&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true");
/******/ 	__webpack_require__("./node_modules/webpack/hot/dev-server.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/quill-emoji.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});