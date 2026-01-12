/**
 * @file
 * Cherries by @toddmotto, @cferdinandi, @adamfschwartz, @daniellmb.
 *
 * @todo: Use Cash or Underscore when jQuery is dropped by supported plugins.
 */

/* global define, module */
(function (root, factory) {

  'use strict';

  // Inspired by https://github.com/addyosmani/memoize.js/blob/master/memoize.js
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  }
  else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but only CommonJS-like
    // environments that support module.exports, like Node.
    module.exports = factory();
  }
  else {
    // Browser globals (root is window).
    root.dBlazy = factory();
  }
})(this, function () {

  'use strict';

  /**
   * Object for public APIs where dBlazy stands for drupalBlazy.
   *
   * @namespace
   */
  var dBlazy = {};

  // See https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  /**
   * Check if the given element matches the selector.
   *
   * @name dBlazy.matches
   *
   * @param {Element} elem
   *   The current element.
   * @param {String} selector
   *   Selector to match against (class, ID, data attribute, or tag).
   *
   * @return {Boolean}
   *   Returns true if found, else false.
   *
   * @see http://caniuse.com/#feat=matchesselector
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
   */
  dBlazy.matches = function (elem, selector) {
    // Check if matches, excluding HTMLDocument, see ::closest().
    if (elem.matches(selector)) {
      return true;
    }

    return false;
  };

  /**
   * Returns device pixel ratio.
   *
   * @return {Integer}
   *   Returns the device pixel ratio.
   */
  dBlazy.pixelRatio = function () {
    return window.devicePixelRatio || 1;
  };

  /**
   * Returns cross-browser window width.
   *
   * @return {Integer}
   *   Returns the window width.
   */
  dBlazy.windowWidth = function () {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || window.screen.width;
  };

  /**
   * Returns cross-browser window width and height.
   *
   * @return {Object}
   *   Returns the window width and height.
   */
  dBlazy.windowSize = function () {
    return {
      width: this.windowWidth,
      height: window.innerHeight
    };
  };

  /**
   * Returns data from the current active window.
   *
   * When being resized, the browser gave no data about pixel ratio from desktop
   * to mobile, not vice versa. Unless delayed for 4s+, not less, which is of
   * course unacceptable.
   *
   * @name dBlazy.activeWidth
   *
   * @param {Object} dataset
   *   The dataset object must be keyed by window width.
   * @param {Boolean} mobileFirst
   *   Whether to use min-width, or max-width.
   *
   * @return {mixed}
   *   Returns data from the current active window.
   */
  dBlazy.activeWidth = function (dataset, mobileFirst) {
    var me = this;
    var keys = Object.keys(dataset);
    var xs = keys[0];
    var xl = keys[keys.length - 1];
    var pr = (me.windowWidth() * me.pixelRatio());
    var ww = mobileFirst ? me.windowWidth() : pr;
    var mw = function (w) {
      // The picture wants <= (approximate), non-picture wants >=, wtf.
      return mobileFirst ? parseInt(w) <= ww : parseInt(w) >= ww;
    };

    var data = keys.filter(mw).map(function (v) {
      return dataset[v];
    })[mobileFirst ? 'pop' : 'shift']();

    return typeof data === 'undefined' ? dataset[ww >= xl ? xl : xs] : data;
  };

  /**
   * Check if the HTML tag matches a specified string.
   *
   * @name dBlazy.equal
   *
   * @param {Element} el
   *   The element to compare.
   * @param {String} str
   *   HTML tag to match against.
   *
   * @return {Boolean}
   *   Returns true if matches, else false.
   */
  dBlazy.equal = function (el, str) {
    return el !== null && el.nodeName.toLowerCase() === str;
  };

  /**
   * Get the closest matching element up the DOM tree.
   *
   * Inspired by Chris Ferdinandi, http://github.com/cferdinandi/smooth-scroll.
   *
   * @name dBlazy.closest
   *
   * @param {Element} el
   *   Starting element.
   * @param {String} selector
   *   Selector to match against (class, ID, data attribute, or tag).
   *
   * @return {Boolean|Element}
   *   Returns null if not match found.
   *
   * @see http://caniuse.com/#feat=element-closest
   * @see http://caniuse.com/#feat=matchesselector
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
   */
  dBlazy.closest = function (el, selector) {
    var parent;
    while (el) {
      parent = el.parentElement;
      if (parent && parent.matches(selector)) {
        return parent;
      }
      el = parent;
    }

    return null;
  };

  /**
   * Returns a new object after merging two, or more objects.
   *
   * Inspired by @adamfschwartz, @zackbloom, http://youmightnotneedjquery.com.
   *
   * @name dBlazy.extend
   *
   * @param {Object} out
   *   The objects to merge together.
   *
   * @return {Object}
   *   Merged values of defaults and options.
   */
  dBlazy.extend = Object.assign || function (out) {
    out = out || {};

    for (var i = 1, len = arguments.length; i < len; i++) {
      if (!arguments[i]) {
        continue;
      }

      for (var key in arguments[i]) {
        if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
          out[key] = arguments[i][key];
        }
      }
    }

    return out;
  };

  /**
   * A simple forEach() implementation for Arrays, Objects and NodeLists.
   *
   * @name dBlazy.forEach
   *
   * @author Todd Motto
   * @link https://github.com/toddmotto/foreach
   *
   * @param {Array|Object|NodeList} collection
   *   Collection of items to iterate.
   * @param {Function} callback
   *   Callback function for each iteration.
   * @param {Array|Object|NodeList} scope
   *   Object/NodeList/Array that forEach is iterating over (aka `this`).
   */
  dBlazy.forEach = function (collection, callback, scope) {
    var proto = Object.prototype;
    if (proto.toString.call(collection) === '[object Object]') {
      for (var prop in collection) {
        if (proto.hasOwnProperty.call(collection, prop)) {
          callback.call(scope, collection[prop], prop, collection);
        }
      }
    }
    else if (collection) {
      for (var i = 0, len = collection.length; i < len; i++) {
        callback.call(scope, collection[i], i, collection);
      }
    }
  };

  /**
   * A simple hasClass wrapper.
   *
   * @name dBlazy.hasClass
   *
   * @param {Element} el
   *   The HTML element.
   * @param {String} name
   *   The class name.
   *
   * @return {bool}
   *   True if the method is supported.
   *
   * @todo remove for el.classList.contains() alone.
   */
  dBlazy.hasClass = function (el, name) {
    if (el.classList) {
      return el.classList.contains(name);
    }
    else {
      return el.className.indexOf(name) !== -1;
    }
  };

  /**
   * A forgiving attribute wrapper with fallback.
   *
   * @name dBlazy.attr
   *
   * @param {Element} el
   *   The HTML element.
   * @param {String} attr
   *   The attr name.
   * @param {String} def
   *   The default value.
   *
   * @return {String}
   *   The attribute value, or fallback.
   */
  dBlazy.attr = function (el, attr, def) {
    def = def || '';
    return el !== null && el.hasAttribute(attr) ? el.getAttribute(attr) : def;
  };

  /**
   * A simple attributes wrapper.
   *
   * @name dBlazy.setAttr
   *
   * @param {Element} el
   *   The HTML element.
   * @param {String} attr
   *   The attr name.
   * @param {Boolean} remove
   *   True if should remove.
   */
  dBlazy.setAttr = function (el, attr, remove) {
    if (el && el.hasAttribute('data-' + attr)) {
      var dataAttr = el.getAttribute('data-' + attr);
      if (attr === 'src') {
        el.src = dataAttr;
      }
      else {
        el.setAttribute(attr, dataAttr);
      }

      if (remove) {
        el.removeAttribute('data-' + attr);
      }
    }
  };

  /**
   * A simple attributes wrapper looping based on the given attributes.
   *
   * @name dBlazy.setAttrs
   *
   * @param {Element} el
   *   The HTML element.
   * @param {Array} attrs
   *   The attr names.
   * @param {Boolean} remove
   *   True if should remove.
   */
  dBlazy.setAttrs = function (el, attrs, remove) {
    var me = this;

    me.forEach(attrs, function (src) {
      me.setAttr(el, src, remove);
    });
  };

  /**
   * A simple attributes wrapper, looping based on sources (picture/ video).
   *
   * @name dBlazy.setAttrsWithSources
   *
   * @param {Element} el
   *   The starting HTML element.
   * @param {String} attr
   *   The attr name, can be SRC or SRCSET.
   * @param {Boolean} remove
   *   True if should remove.
   */
  dBlazy.setAttrsWithSources = function (el, attr, remove) {
    var me = this;
    var parent = el.parentNode || null;
    var isPicture = parent && me.equal(parent, 'picture');
    var targets = isPicture ? parent.getElementsByTagName('source') : el.getElementsByTagName('source');

    attr = attr || (isPicture ? 'srcset' : 'src');

    if (targets.length) {
      me.forEach(targets, function (source) {
        me.setAttr(source, attr, remove);
      });
    }
  };

  /**
   * Checks if image is decoded/ completely loaded.
   *
   * @name dBlazy.isDecoded
   *
   * @param {Image} img
   *   The Image object.
   *
   * @return {bool}
   *   True if the image is loaded.
   */
  dBlazy.isDecoded = function (img) {
    if ('decoded' in img) {
      return img.decoded;
    }

    return img.complete;
  };

  /**
   * Decodes the image.
   *
   * @name dBlazy.decode
   *
   * @param {Image} img
   *   The Image object.
   *
   * @return {Promise}
   *   The Promise object.
   */
  dBlazy.decode = function (img) {
    var me = this;

    if (me.isDecoded(img)) {
      return Promise.resolve(img);
    }

    if ('decode' in img) {
      return img.decode();
    }

    return new Promise(function (resolve, reject) {
      img.onload = function () {
        resolve(img);
      };
      img.onerror = reject();
    });
  };

  /**
   * Updates CSS background with multi-breakpoint images.
   *
   * @name dBlazy.updateBg
   *
   * @param {Element} el
   *   The container HTML element.
   * @param {Boolean} mobileFirst
   *   Whether to use min-width or max-width.
   */
  dBlazy.updateBg = function (el, mobileFirst) {
    var me = this;
    var backgrounds = me.parse(el.getAttribute('data-backgrounds'));

    if (backgrounds) {
      var bg = me.activeWidth(backgrounds, mobileFirst);
      if (bg && bg !== 'undefined') {
        el.style.backgroundImage = 'url("' + bg.src + '")';

        // Allows to disable Aspect ratio if it has known/ fixed heights such as
        // gridstack multi-size boxes.
        if (bg.ratio && !el.classList.contains('b-noratio')) {
          el.style.paddingBottom = bg.ratio + '%';
        }
      }
    }
  };

  /**
   * A simple removeAttribute wrapper.
   *
   * @name dBlazy.removeAttrs
   *
   * @param {Element} el
   *   The HTML element.
   * @param {Array} attrs
   *   The attr names.
   */
  dBlazy.removeAttrs = function (el, attrs) {
    this.forEach(attrs, function (attr) {
      el.removeAttribute('data-' + attr);
    });
  };

  /**
   * A simple wrapper for [add|remove]EventListener.
   *
   * Made public from original bLazy library.
   *
   * @name dBlazy.binding
   *
   * @param {String} which
   *   Whether bind or unbind.
   * @param {Element} el
   *   The HTML element.
   * @param {String} eventName
   *   The event name to add.
   * @param {Function} fn
   *   The callback function.
   * @param {Object|Boolean} params
   *   The optional param passed into a custom event.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   * @todo remove old IE references after another check.
   */
  dBlazy.binding = function (which, el, eventName, fn, params) {
    if (el && typeof fn === 'function') {
      var defaults = {capture: false, passive: true};
      var extras;
      if (typeof params === 'boolean') {
        extras = params;
      }
      else {
        extras = params ? this.extend(defaults, params) : defaults;
      }
      var bind = function (e) {
        if (el.attachEvent) {
          el[(which === 'bind' ? 'attach' : 'detach') + 'Event']('on' + e.trim(), fn, extras);
        }
        else {
          el[(which === 'bind' ? 'add' : 'remove') + 'EventListener'](e.trim(), fn, extras);
        }
      };

      if (eventName.indexOf(' ') > 0) {
        this.forEach(eventName.split(' '), bind);
      }
      else {
        bind(eventName);
      }
    }
  };

  /**
   * A simple wrapper for event delegation like jQuery.on().
   *
   * Inspired by http://stackoverflow.com/questions/30880757/
   * javascript-equivalent-to-on.
   *
   * @name dBlazy.onoff
   *
   * @param {String} which
   *   Whether on or off.
   * @param {Element} elm
   *   The parent HTML element.
   * @param {String} eventName
   *   The event name to trigger.
   * @param {String} childEl
   *   Child selector to match against (class, ID, data attribute, or tag).
   * @param {Function} callback
   *   The callback function.
   * @param {Object|Boolean} params
   *   The optional param passed into a custom event.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   */
  dBlazy.onoff = function (which, elm, eventName, childEl, callback, params) {
    params = params || {capture: true, passive: false};
    var bind = function (e) {
      var t = e.target;
      e.delegateTarget = elm;
      while (t && t !== this) {
        if (dBlazy.matches(t, childEl)) {
          callback.call(t, e);
        }
        t = t.parentNode;
      }
    };

    this.binding(which === 'on' ? 'bind' : 'unbind', elm, eventName, bind, params);
  };

  /**
   * A simple wrapper for event delegation like jQuery.on().
   *
   * @name dBlazy.on
   *
   * @param {Element} elm
   *   The parent HTML element.
   * @param {String} eventName
   *   The event name to trigger.
   * @param {String} childEl
   *   Child selector to match against (class, ID, data attribute, or tag).
   * @param {Function} callback
   *   The callback function.
   * @param {Object|Boolean} params
   *   The optional param passed into a custom event.
   */
  dBlazy.on = function (elm, eventName, childEl, callback, params) {
    this.onoff('on', elm, eventName, childEl, callback, params);
  };

  /**
   * A simple wrapper for event detachment.
   *
   * @name dBlazy.off
   *
   * @param {Element} elm
   *   The parent HTML element.
   * @param {String} eventName
   *   The event name to trigger.
   * @param {String} childEl
   *   Child selector to match against (class, ID, data attribute, or tag).
   * @param {Function} callback
   *   The callback function.
   * @param {Object|Boolean} params
   *   The optional param passed into a custom event.
   */
  dBlazy.off = function (elm, eventName, childEl, callback, params) {
    this.onoff('off', elm, eventName, childEl, callback, params);
  };

  /**
   * A simple wrapper for addEventListener.
   *
   * @name dBlazy.bindEvent
   *
   * @param {Element} el
   *   The HTML element.
   * @param {String} eventName
   *   The event name to remove.
   * @param {Function} fn
   *   The callback function.
   * @param {Object|Boolean} params
   *   The optional param passed into a custom event.
   */
  dBlazy.bindEvent = function (el, eventName, fn, params) {
    this.binding('bind', el, eventName, fn, params);
  };

  /**
   * A simple wrapper for removeEventListener.
   *
   * @name dBlazy.unbindEvent
   *
   * @param {Element} el
   *   The HTML element.
   * @param {String} eventName
   *   The event name to remove.
   * @param {Function} fn
   *   The callback function.
   * @param {Object} params
   *   The optional param passed into a custom event.
   */
  dBlazy.unbindEvent = function (el, eventName, fn, params) {
    this.binding('unbind', el, eventName, fn, params);
  };

  /**
   * Executes a function once.
   *
   * @name dBlazy.once
   *
   * @author Daniel Lamb <dlamb.open.source@gmail.com>
   * @link https://github.com/daniellmb/once.js
   *
   * @param {Function} fn
   *   The executed function.
   *
   * @return {Object}
   *   The function result.
   */
  dBlazy.once = function (fn) {
    var result;
    var ran = false;
    return function proxy() {
      if (ran) {
        return result;
      }
      ran = true;
      result = fn.apply(this, arguments);
      // For garbage collection.
      fn = null;
      return result;
    };
  };

  /**
   * A simple wrapper for JSON.parse() for string within data-* attributes.
   *
   * @name dBlazy.parse
   *
   * @param {String} str
   *   The string to convert into JSON object.
   *
   * @return {Object|Boolean}
   *   The JSON object, or false in case invalid.
   */
  dBlazy.parse = function (str) {
    try {
      return JSON.parse(str);
    }
    catch (e) {
      return false;
    }
  };

  /**
   * A simple wrapper to animate anything using animate.css.
   *
   * @name dBlazy.animate
   *
   * @param {Element} el
   *   The animated HTML element.
   * @param {String} animation
   *   Any custom animation name, fallbacks to [data-animation].
   */
  dBlazy.animate = function (el, animation) {
    var me = this;
    var props = [
      'animation',
      'animation-duration',
      'animation-delay',
      'animation-iteration-count'
    ];

    animation = animation || el.dataset.animation;
    el.classList.add('animated', animation);
    me.forEach(['Duration', 'Delay', 'IterationCount'], function (key) {
      if ('animation' + key in el.dataset) {
        el.style['animation' + key] = el.dataset['animation' + key];
      }
    });

    // Supports both BG and regular image.
    var cn = me.closest(el, '.media');
    cn = cn === null ? el : cn;
    var blur = cn.querySelector('.b-blur--tmp');

    function animationEnd() {
      me.removeAttrs(el, props);

      el.classList.add('is-b-animated');
      el.classList.remove('animated', animation);

      me.forEach(props, function (key) {
        el.style.removeProperty(key);
      });

      if (blur !== null && blur.parentNode !== null) {
        blur.parentNode.removeChild(blur);
      }

      me.unbindEvent(el, 'animationend', animationEnd);
    }

    me.bindEvent(el, 'animationend', animationEnd);
  };

  /**
   * Removes common loading indicator classes.
   *
   * @name dBlazy.clearLoading
   *
   * @param {Element} el
   *   The loading HTML element.
   */
  dBlazy.clearLoading = function (el) {
    var me = this;
    // The .b-lazy element can be attached to IMG, or DIV as CSS background.
    // The .(*)loading can be .media, .grid, .slide__content, .box, etc.
    var loaders = [el, me.closest(el, '[class*="loading"]')];

    this.forEach(loaders, function (loader) {
      if (loader !== null) {
        loader.className = loader.className.replace(/(\S+)loading/g, '');
      }
    });
  };

  /**
   * A simple wrapper to delay callback function, taken out of blazy library.
   *
   * Alternative to core Drupal.debounce for D7 compatibility, and easy port.
   *
   * @name dBlazy.throttle
   *
   * @param {Function} fn
   *   The callback function.
   * @param {Int} minDelay
   *   The execution delay in milliseconds.
   * @param {Object} scope
   *   The scope of the function to apply to, normally this.
   *
   * @return {Function}
   *   The function executed at the specified minDelay.
   */
  dBlazy.throttle = function (fn, minDelay, scope) {
    var lastCall = 0;
    return function () {
      var now = +new Date();
      if (now - lastCall < minDelay) {
        return;
      }
      lastCall = now;
      fn.apply(scope, arguments);
    };
  };

  /**
   * A simple wrapper to delay callback function on window resize.
   *
   * @name dBlazy.resize
   *
   * @link https://github.com/louisremi/jquery-smartresize
   *
   * @param {Function} c
   *   The callback function.
   * @param {Int} t
   *   The timeout.
   *
   * @return {Function}
   *   The callback function.
   */
  dBlazy.resize = function (c, t) {
    window.onresize = function () {
      window.clearTimeout(t);
      t = window.setTimeout(c, 200);
    };
    return c;
  };

  /**
   * A simple wrapper for triggering event like jQuery.trigger().
   *
   * @name dBlazy.trigger
   *
   * @param {Element} elm
   *   The HTML element.
   * @param {String} eventName
   *   The event name to trigger.
   * @param {Object} custom
   *   The optional object passed into a custom event.
   * @param {Object} param
   *   The optional param passed into a custom event.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
   * @todo: See if any consistent way for both custom and native events.
   */
  dBlazy.trigger = function (elm, eventName, custom, param) {
    var event;
    var data = {
      detail: custom || {}
    };

    if (typeof param === 'undefined') {
      data.bubbles = true;
      data.cancelable = true;
    }

    // Native.
    // IE >= 9 compat, else SCRIPT445: Object doesn't support this action.
    // https://msdn.microsoft.com/library/ff975299(v=vs.85).aspx
    if (typeof window.CustomEvent === 'function') {
      event = new CustomEvent(eventName, data);
    }
    else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(eventName, true, true, data);
    }

    elm.dispatchEvent(event);
  };

  return dBlazy;

});
