/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/backButton.js":
/*!***********************************!*\
  !*** ./src/scripts/backButton.js ***!
  \***********************************/
/***/ (() => {

(() => {
  const btns = document.querySelectorAll('.button--back');
  btns.forEach(btn => {
    btn.addEventListener('click', e => {
      history.back();
    });
  });
})();

/***/ }),

/***/ "./src/scripts/backToTop.js":
/*!**********************************!*\
  !*** ./src/scripts/backToTop.js ***!
  \**********************************/
/***/ (() => {

(() => {
  const target = document.querySelector('#back-to-top-container');
  if (target) {
    const contHeight = document.querySelector('.inner-page').offsetHeight;
    const h = window.visualViewport.height;
    if (contHeight > h) {
      target.style.display = 'block';
    }
  }
})();

/***/ }),

/***/ "./src/scripts/navigation.js":
/*!***********************************!*\
  !*** ./src/scripts/navigation.js ***!
  \***********************************/
/***/ (() => {

/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
(function () {
  const siteNavigation = document.getElementById('site-navigation');

  // Return early if the navigation doesn't exist.
  if (!siteNavigation) {
    return;
  }
  const button = siteNavigation.getElementsByTagName('button')[0];
  // Return early if the button doesn't exist.
  if ('undefined' === typeof button) {
    return;
  }
  const menu = siteNavigation.getElementsByTagName('ul')[0];

  // Hide menu toggle button if menu is empty and return early.
  if ('undefined' === typeof menu) {
    button.style.display = 'none';
    return;
  }
  if (!menu.classList.contains('nav-menu')) {
    menu.classList.add('nav-menu');
  }

  // Toggle the .toggled class and the aria-expanded value each time the button is clicked.
  button.addEventListener('click', function () {
    siteNavigation.classList.toggle('is-active');
    button.classList.toggle('is-active');
    if (button.getAttribute('aria-expanded') === 'true') {
      button.setAttribute('aria-expanded', 'false');
    } else {
      button.setAttribute('aria-expanded', 'true');
    }
  });

  // Remove the .toggled class and set aria-expanded to false when the user clicks outside the navigation.
  document.addEventListener('click', function (event) {
    const isClickInside = siteNavigation.contains(event.target);
    if (!isClickInside) {
      siteNavigation.classList.remove('is-active');
      button.setAttribute('aria-expanded', 'false');
    }
  });

  // Get all the link elements within the menu.
  const links = menu.getElementsByTagName('a');

  // Get all the link elements with children within the menu.
  const linksWithChildren = menu.querySelectorAll('.menu-item-has-children > a, .page_item_has_children > a');

  // Toggle focus each time a menu link is focused or blurred.
  for (const link of links) {
    link.addEventListener('focus', toggleFocus, true);
    link.addEventListener('blur', toggleFocus, true);
  }

  // Toggle focus each time a menu link with children receive a touch event.
  for (const link of linksWithChildren) {
    link.addEventListener('touchstart', toggleFocus, false);
  }

  /**
   * Sets or removes .focus class on an element.
   */
  function toggleFocus() {
    if (event.type === 'focus' || event.type === 'blur') {
      let self = this;
      // Move up through the ancestors of the current link until we hit .nav-menu.
      while (!self.classList.contains('nav-menu')) {
        // On li elements toggle the class .focus.
        if ('li' === self.tagName.toLowerCase()) {
          self.classList.toggle('focus');
        }
        self = self.parentNode;
      }
    }
    if (event.type === 'touchstart') {
      const menuItem = this.parentNode;
      event.preventDefault();
      for (const link of menuItem.parentNode.children) {
        if (menuItem !== link) {
          link.classList.remove('focus');
        }
      }
      menuItem.classList.toggle('focus');
    }
  }
})();

/***/ }),

/***/ "./src/scripts/page-transition.js":
/*!****************************************!*\
  !*** ./src/scripts/page-transition.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var swup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swup */ "./node_modules/swup/dist/Swup.modern.js");

//const swup = new Swup( );

/***/ }),

/***/ "./src/scripts/scrollspy.js":
/*!**********************************!*\
  !*** ./src/scripts/scrollspy.js ***!
  \**********************************/
/***/ (() => {

const sections = document.querySelectorAll('.scroll-target');
const linksCont = document.querySelector('.inpage-links');
if (sections && linksCont) {
  const links = linksCont.querySelectorAll('.inpage-link');
  const activeClass = 'is-active';
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.boundingClientRect.y < window.innerHeight - 200) {
        links.forEach(l => {
          l.classList.remove(activeClass);
        });
        linksCont.querySelector(`[href="#${entry.target.id}"]`).classList.add(activeClass);
      }
    }
  }, {
    rootMargin: '-50% 0px'
  });
  for (let i = 0; i < sections.length; i++) {
    observer.observe(sections[i]);
  }
}

/***/ }),

/***/ "./src/scss/index.scss":
/*!*****************************!*\
  !*** ./src/scss/index.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/swup/node_modules/path-to-regexp/dist.es2015/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/swup/node_modules/path-to-regexp/dist.es2015/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compile: () => (/* binding */ compile),
/* harmony export */   match: () => (/* binding */ match),
/* harmony export */   parse: () => (/* binding */ parse),
/* harmony export */   pathToRegexp: () => (/* binding */ pathToRegexp),
/* harmony export */   regexpToFunction: () => (/* binding */ regexpToFunction),
/* harmony export */   tokensToFunction: () => (/* binding */ tokensToFunction),
/* harmony export */   tokensToRegexp: () => (/* binding */ tokensToRegexp)
/* harmony export */ });
/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at ".concat(i));
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at ".concat(j));
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at ".concat(j));
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at ".concat(i));
            if (!pattern)
                throw new TypeError("Missing pattern at ".concat(i));
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
    };
    var consumeText = function () {
        var result = "";
        var value;
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to not repeat, but got an array"));
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"".concat(token.name, "\" to not be empty"));
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"".concat(token.name, "\" to be ").concat(typeOfMessage));
        }
        return path;
    };
}
/**
 * Create path match function from `path-to-regexp` spec.
 */
function match(str, options) {
    var keys = [];
    var re = pathToRegexp(str, keys, options);
    return regexpToFunction(re, keys, options);
}
/**
 * Create a path match function from `path-to-regexp` output.
 */
function regexpToFunction(re, keys, options) {
    if (options === void 0) { options = {}; }
    var _a = options.decode, decode = _a === void 0 ? function (x) { return x; } : _a;
    return function (pathname) {
        var m = re.exec(pathname);
        if (!m)
            return false;
        var path = m[0], index = m.index;
        var params = Object.create(null);
        var _loop_1 = function (i) {
            if (m[i] === undefined)
                return "continue";
            var key = keys[i - 1];
            if (key.modifier === "*" || key.modifier === "+") {
                params[key.name] = m[i].split(key.prefix + key.suffix).map(function (value) {
                    return decode(value, key);
                });
            }
            else {
                params[key.name] = decode(m[i], key);
            }
        };
        for (var i = 1; i < m.length; i++) {
            _loop_1(i);
        }
        return { path: path, index: index, params: params };
    };
}
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}
/**
 * Pull out keys from a regexp.
 */
function regexpToRegexp(path, keys) {
    if (!keys)
        return path;
    var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
    var index = 0;
    var execResult = groupsRegex.exec(path.source);
    while (execResult) {
        keys.push({
            // Use parenthesized substring match if available, index otherwise
            name: execResult[1] || index++,
            prefix: "",
            suffix: "",
            modifier: "",
            pattern: "",
        });
        execResult = groupsRegex.exec(path.source);
    }
    return path;
}
/**
 * Transform an array into a regexp.
 */
function arrayToRegexp(paths, keys, options) {
    var parts = paths.map(function (path) { return pathToRegexp(path, keys, options).source; });
    return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
/**
 * Create a path regexp from string input.
 */
function stringToRegexp(path, keys, options) {
    return tokensToRegexp(parse(path, options), keys, options);
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 */
function tokensToRegexp(tokens, keys, options) {
    if (options === void 0) { options = {}; }
    var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function (x) { return x; } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
    var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
    var delimiterRe = "[".concat(escapeString(delimiter), "]");
    var route = start ? "^" : "";
    // Iterate over the tokens and create our regexp string.
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (typeof token === "string") {
            route += escapeString(encode(token));
        }
        else {
            var prefix = escapeString(encode(token.prefix));
            var suffix = escapeString(encode(token.suffix));
            if (token.pattern) {
                if (keys)
                    keys.push(token);
                if (prefix || suffix) {
                    if (token.modifier === "+" || token.modifier === "*") {
                        var mod = token.modifier === "*" ? "?" : "";
                        route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
                    }
                    else {
                        route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
                    }
                }
                else {
                    if (token.modifier === "+" || token.modifier === "*") {
                        route += "((?:".concat(token.pattern, ")").concat(token.modifier, ")");
                    }
                    else {
                        route += "(".concat(token.pattern, ")").concat(token.modifier);
                    }
                }
            }
            else {
                route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
            }
        }
    }
    if (end) {
        if (!strict)
            route += "".concat(delimiterRe, "?");
        route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
    }
    else {
        var endToken = tokens[tokens.length - 1];
        var isEndDelimited = typeof endToken === "string"
            ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1
            : endToken === undefined;
        if (!strict) {
            route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
        }
        if (!isEndDelimited) {
            route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
        }
    }
    return new RegExp(route, flags(options));
}
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 */
function pathToRegexp(path, keys, options) {
    if (path instanceof RegExp)
        return regexpToRegexp(path, keys);
    if (Array.isArray(path))
        return arrayToRegexp(path, keys, options);
    return stringToRegexp(path, keys, options);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/delegate-it/delegate.js":
/*!**********************************************!*\
  !*** ./node_modules/delegate-it/delegate.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Keeps track of raw listeners added to the base elements to avoid duplication */
const ledger = new WeakMap();
function editLedger(wanted, baseElement, callback, setup) {
    if (!wanted && !ledger.has(baseElement)) {
        return false;
    }
    const elementMap = ledger.get(baseElement)
        ?? new WeakMap();
    ledger.set(baseElement, elementMap);
    const setups = elementMap.get(callback) ?? new Set();
    elementMap.set(callback, setups);
    const existed = setups.has(setup);
    if (wanted) {
        setups.add(setup);
    }
    else {
        setups.delete(setup);
    }
    return existed && wanted;
}
function safeClosest(event, selector) {
    let target = event.target;
    if (target instanceof Text) {
        target = target.parentElement;
    }
    if (target instanceof Element && event.currentTarget instanceof Element) {
        // `.closest()` may match ancestors of `currentTarget` but we only need its children
        const closest = target.closest(selector);
        if (closest && event.currentTarget.contains(closest)) {
            return closest;
        }
    }
}
// This type isn't exported as a declaration, so it needs to be duplicated above
function delegate(selector, type, callback, options = {}) {
    const { signal, base = document } = options;
    if (signal?.aborted) {
        return;
    }
    // Don't pass `once` to `addEventListener` because it needs to be handled in `delegate-it`
    const { once, ...nativeListenerOptions } = options;
    // `document` should never be the base, it's just an easy way to define "global event listeners"
    const baseElement = base instanceof Document ? base.documentElement : base;
    // Handle the regular Element usage
    const capture = Boolean(typeof options === 'object' ? options.capture : options);
    const listenerFunction = (event) => {
        const delegateTarget = safeClosest(event, selector);
        if (delegateTarget) {
            const delegateEvent = Object.assign(event, { delegateTarget });
            callback.call(baseElement, delegateEvent);
            if (once) {
                baseElement.removeEventListener(type, listenerFunction, nativeListenerOptions);
                editLedger(false, baseElement, callback, setup);
            }
        }
    };
    const setup = JSON.stringify({ selector, type, capture });
    const isAlreadyListening = editLedger(true, baseElement, callback, setup);
    if (!isAlreadyListening) {
        baseElement.addEventListener(type, listenerFunction, nativeListenerOptions);
    }
    signal?.addEventListener('abort', () => {
        editLedger(false, baseElement, callback, setup);
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (delegate);


/***/ }),

/***/ "./node_modules/delegate-it/index.js":
/*!*******************************************!*\
  !*** ./node_modules/delegate-it/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _delegate_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   oneEvent: () => (/* reexport safe */ _one_event_js__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _delegate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delegate.js */ "./node_modules/delegate-it/delegate.js");
/* harmony import */ var _one_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./one-event.js */ "./node_modules/delegate-it/one-event.js");





/***/ }),

/***/ "./node_modules/delegate-it/one-event.js":
/*!***********************************************!*\
  !*** ./node_modules/delegate-it/one-event.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _delegate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delegate.js */ "./node_modules/delegate-it/delegate.js");

// This type isn't exported as a declaration, so it needs to be duplicated above
async function oneEvent(selector, type, options = {}) {
    return new Promise(resolve => {
        options.once = true;
        if (options.signal?.aborted) {
            resolve(undefined);
        }
        options.signal?.addEventListener('abort', () => {
            resolve(undefined);
        });
        (0,_delegate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(selector, type, resolve, options);
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (oneEvent);


/***/ }),

/***/ "./node_modules/swup/dist/Swup.modern.js":
/*!***********************************************!*\
  !*** ./node_modules/swup/dist/Swup.modern.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Location: () => (/* binding */ l),
/* harmony export */   classify: () => (/* binding */ s),
/* harmony export */   createHistoryRecord: () => (/* binding */ o),
/* harmony export */   "default": () => (/* binding */ j),
/* harmony export */   delegateEvent: () => (/* binding */ a),
/* harmony export */   forceReflow: () => (/* binding */ v),
/* harmony export */   getCurrentUrl: () => (/* binding */ n),
/* harmony export */   isPromise: () => (/* binding */ w),
/* harmony export */   matchPath: () => (/* binding */ h),
/* harmony export */   nextTick: () => (/* binding */ g),
/* harmony export */   query: () => (/* binding */ p),
/* harmony export */   queryAll: () => (/* binding */ m),
/* harmony export */   runAsPromise: () => (/* binding */ f),
/* harmony export */   updateHistoryRecord: () => (/* binding */ r)
/* harmony export */ });
/* harmony import */ var delegate_it__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! delegate-it */ "./node_modules/delegate-it/index.js");
/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path-to-regexp */ "./node_modules/swup/node_modules/path-to-regexp/dist.es2015/index.js");
function i(){return i=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])}return t},i.apply(this,arguments)}const s=(t,e)=>String(t).toLowerCase().replace(/[\s/_.]+/g,"-").replace(/[^\w-]+/g,"").replace(/--+/g,"-").replace(/^-+|-+$/g,"")||e||"",n=({hash:t}={})=>window.location.pathname+window.location.search+(t?window.location.hash:""),o=(t,e={})=>{const s=i({url:t=t||n({hash:!0}),random:Math.random(),source:"swup"},e);window.history.pushState(s,"",t)},r=(t=null,e={})=>{t=t||n({hash:!0});const s=i({},window.history.state||{},{url:t,random:Math.random(),source:"swup"},e);window.history.replaceState(s,"",t)},a=(e,s,n,o)=>{const r=new AbortController;return o=i({},o,{signal:r.signal}),(0,delegate_it__WEBPACK_IMPORTED_MODULE_0__["default"])(e,s,n,o),{destroy:()=>r.abort()}};class l extends URL{constructor(t,e=document.baseURI){super(t.toString(),e),Object.setPrototypeOf(this,l.prototype)}get url(){return this.pathname+this.search}static fromElement(t){const e=t.getAttribute("href")||t.getAttribute("xlink:href")||"";return new l(e)}static fromUrl(t){return new l(t)}}const h=(t,i)=>{try{return (0,path_to_regexp__WEBPACK_IMPORTED_MODULE_1__.match)(t,i)}catch(e){throw new Error(`[swup] Error parsing path "${String(t)}":\n${String(e)}`)}};class c extends Error{constructor(t,e){super(t),this.url=void 0,this.status=void 0,this.aborted=void 0,this.timedOut=void 0,this.name="FetchError",this.url=e.url,this.status=e.status,this.aborted=e.aborted||!1,this.timedOut=e.timedOut||!1}}async function u(t,e={}){var s;t=l.fromUrl(t).url;const{visit:n=this.visit}=e,o=i({},this.options.requestHeaders,e.headers),r=null!=(s=e.timeout)?s:this.options.timeout,a=new AbortController,{signal:h}=a;e=i({},e,{headers:o,signal:h});let u,d=!1,p=null;r&&r>0&&(p=setTimeout(()=>{d=!0,a.abort("timeout")},r));try{u=await this.hooks.call("fetch:request",n,{url:t,options:e},(t,{url:e,options:i})=>fetch(e,i)),p&&clearTimeout(p)}catch(e){if(d)throw this.hooks.call("fetch:timeout",n,{url:t}),new c(`Request timed out: ${t}`,{url:t,timedOut:d});if("AbortError"===(null==e?void 0:e.name)||h.aborted)throw new c(`Request aborted: ${t}`,{url:t,aborted:!0});throw e}const{status:m,url:g}=u,w=await u.text();if(500===m)throw this.hooks.call("fetch:error",n,{status:m,response:u,url:g}),new c(`Server error: ${g}`,{status:m,url:g});if(!w)throw new c(`Empty response: ${g}`,{status:m,url:g});const{url:f}=l.fromUrl(g),v={url:f,html:w};return!n.cache.write||e.method&&"GET"!==e.method||t!==f||this.cache.set(v.url,v),v}class d{constructor(t){this.swup=void 0,this.pages=new Map,this.swup=t}get size(){return this.pages.size}get all(){const t=new Map;return this.pages.forEach((e,s)=>{t.set(s,i({},e))}),t}has(t){return this.pages.has(this.resolve(t))}get(t){const e=this.pages.get(this.resolve(t));return e?i({},e):e}set(t,e){e=i({},e,{url:t=this.resolve(t)}),this.pages.set(t,e),this.swup.hooks.callSync("cache:set",void 0,{page:e})}update(t,e){t=this.resolve(t);const s=i({},this.get(t),e,{url:t});this.pages.set(t,s)}delete(t){this.pages.delete(this.resolve(t))}clear(){this.pages.clear(),this.swup.hooks.callSync("cache:clear",void 0,void 0)}prune(t){this.pages.forEach((e,i)=>{t(i,e)&&this.delete(i)})}resolve(t){const{url:e}=l.fromUrl(t);return this.swup.resolveUrl(e)}}const p=(t,e=document)=>e.querySelector(t),m=(t,e=document)=>Array.from(e.querySelectorAll(t)),g=()=>new Promise(t=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{t()})})});function w(t){return!!t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof t.then}function f(t,e=[]){return new Promise((i,s)=>{const n=t(...e);w(n)?n.then(i,s):i(n)})}function v(t){var e;null==(e=t=t||document.body)||e.getBoundingClientRect()}class y{constructor(t){this.swup=void 0,this.swupClasses=["to-","is-changing","is-rendering","is-popstate","is-animating","is-leaving"],this.swup=t}get selectors(){const{scope:t}=this.swup.visit.animation;return"containers"===t?this.swup.visit.containers:"html"===t?["html"]:Array.isArray(t)?t:[]}get selector(){return this.selectors.join(",")}get targets(){return this.selector.trim()?m(this.selector):[]}add(...t){this.targets.forEach(e=>e.classList.add(...t))}remove(...t){this.targets.forEach(e=>e.classList.remove(...t))}clear(){this.targets.forEach(t=>{const e=t.className.split(" ").filter(t=>this.isSwupClass(t));t.classList.remove(...e)})}isSwupClass(t){return this.swupClasses.some(e=>t.startsWith(e))}}class k{constructor(t,e){this.id=void 0,this.state=void 0,this.from=void 0,this.to=void 0,this.containers=void 0,this.animation=void 0,this.trigger=void 0,this.cache=void 0,this.history=void 0,this.scroll=void 0;const{to:i,from:s=t.currentPageUrl,hash:n,el:o,event:r}=e;this.id=Math.random(),this.state=1,this.from={url:s},this.to={url:i,hash:n},this.containers=t.options.containers,this.animation={animate:!0,wait:!1,name:void 0,native:t.options.native,scope:t.options.animationScope,selector:t.options.animationSelector},this.trigger={el:o,event:r},this.cache={read:t.options.cache,write:t.options.cache},this.history={action:"push",popstate:!1,direction:void 0},this.scroll={reset:!0,target:void 0}}advance(t){this.state<t&&(this.state=t)}abort(){this.state=8}get done(){return this.state>=7}}function b(t){return new k(this,t)}class S{constructor(t){this.swup=void 0,this.registry=new Map,this.hooks=["animation:out:start","animation:out:await","animation:out:end","animation:in:start","animation:in:await","animation:in:end","animation:skip","cache:clear","cache:set","content:replace","content:scroll","enable","disable","fetch:request","fetch:error","fetch:timeout","history:popstate","link:click","link:self","link:anchor","link:newtab","page:load","page:view","scroll:top","scroll:anchor","visit:start","visit:transition","visit:abort","visit:end"],this.swup=t,this.init()}init(){this.hooks.forEach(t=>this.create(t))}create(t){this.registry.has(t)||this.registry.set(t,new Map)}exists(t){return this.registry.has(t)}get(t){const e=this.registry.get(t);if(e)return e;console.error(`Unknown hook '${t}'`)}clear(){this.registry.forEach(t=>t.clear())}on(t,e,s={}){const n=this.get(t);if(!n)return console.warn(`Hook '${t}' not found.`),()=>{};const o=i({},s,{id:n.size+1,hook:t,handler:e});return n.set(e,o),()=>this.off(t,e)}before(t,e,s={}){return this.on(t,e,i({},s,{before:!0}))}replace(t,e,s={}){return this.on(t,e,i({},s,{replace:!0}))}once(t,e,s={}){return this.on(t,e,i({},s,{once:!0}))}off(t,e){const i=this.get(t);i&&e?i.delete(e)||console.warn(`Handler for hook '${t}' not found.`):i&&i.clear()}async call(t,e,i,s){const[n,o,r]=this.parseCallArgs(t,e,i,s),{before:a,handler:l,after:h}=this.getHandlers(t,r);await this.run(a,n,o);const[c]=await this.run(l,n,o,!0);return await this.run(h,n,o),this.dispatchDomEvent(t,n,o),c}callSync(t,e,i,s){const[n,o,r]=this.parseCallArgs(t,e,i,s),{before:a,handler:l,after:h}=this.getHandlers(t,r);this.runSync(a,n,o);const[c]=this.runSync(l,n,o,!0);return this.runSync(h,n,o),this.dispatchDomEvent(t,n,o),c}parseCallArgs(t,e,i,s){return e instanceof k||"object"!=typeof e&&"function"!=typeof i?[e,i,s]:[void 0,e,i]}async run(t,e=this.swup.visit,i,s=!1){const n=[];for(const{hook:o,handler:r,defaultHandler:a,once:l}of t)if(null==e||!e.done){l&&this.off(o,r);try{const t=await f(r,[e,i,a]);n.push(t)}catch(t){if(s)throw t;console.error(`Error in hook '${o}':`,t)}}return n}runSync(t,e=this.swup.visit,i,s=!1){const n=[];for(const{hook:o,handler:r,defaultHandler:a,once:l}of t)if(null==e||!e.done){l&&this.off(o,r);try{const t=r(e,i,a);n.push(t),w(t)&&console.warn(`Swup will not await Promises in handler for synchronous hook '${o}'.`)}catch(t){if(s)throw t;console.error(`Error in hook '${o}':`,t)}}return n}getHandlers(t,e){const i=this.get(t);if(!i)return{found:!1,before:[],handler:[],after:[],replaced:!1};const s=Array.from(i.values()),n=this.sortRegistrations,o=s.filter(({before:t,replace:e})=>t&&!e).sort(n),r=s.filter(({replace:t})=>t).filter(t=>!0).sort(n),a=s.filter(({before:t,replace:e})=>!t&&!e).sort(n),l=r.length>0;let h=[];if(e&&(h=[{id:0,hook:t,handler:e}],l)){const i=r.length-1,s=t=>{const i=r[t-1];return i?(e,n)=>i.handler(e,n,s(t-1)):e};h=[{id:0,hook:t,handler:r[i].handler,defaultHandler:s(i)}]}return{found:!0,before:o,handler:h,after:a,replaced:l}}sortRegistrations(t,e){var i,s;return(null!=(i=t.priority)?i:0)-(null!=(s=e.priority)?s:0)||t.id-e.id||0}dispatchDomEvent(t,e,i){if(null!=e&&e.done)return;const s={hook:t,args:i,visit:e||this.swup.visit};document.dispatchEvent(new CustomEvent("swup:any",{detail:s,bubbles:!0})),document.dispatchEvent(new CustomEvent(`swup:${t}`,{detail:s,bubbles:!0}))}}const E=t=>{if(t&&"#"===t.charAt(0)&&(t=t.substring(1)),!t)return null;const e=decodeURIComponent(t);let i=document.getElementById(t)||document.getElementById(e)||p(`a[name='${CSS.escape(t)}']`)||p(`a[name='${CSS.escape(e)}']`);return i||"top"!==t||(i=document.body),i},P="transition",U="animation";async function C({elements:t,selector:e}){if(!1===e&&!t)return;let i=[];if(t)i=Array.from(t);else if(e&&(i=m(e,document.body),!i.length))return void console.warn(`[swup] No elements found matching animationSelector \`${e}\``);const s=i.map(t=>function(t){const{type:e,timeout:i,propCount:s}=function(t){const e=window.getComputedStyle(t),i=$(e,`${P}Delay`),s=$(e,`${P}Duration`),n=x(i,s),o=$(e,`${U}Delay`),r=$(e,`${U}Duration`),a=x(o,r),l=Math.max(n,a),h=l>0?n>a?P:U:null;return{type:h,timeout:l,propCount:h?h===P?s.length:r.length:0}}(t);return!(!e||!i)&&new Promise(n=>{const o=`${e}end`,r=performance.now();let a=0;const l=()=>{t.removeEventListener(o,h),n()},h=e=>{if(e.target===t){if(!function(t){return[`${P}end`,`${U}end`].includes(t.type)}(e))throw new Error("Not a transition or animation event.");(performance.now()-r)/1e3<e.elapsedTime||++a>=s&&l()}};setTimeout(()=>{a<s&&l()},i+1),t.addEventListener(o,h)})}(t));s.filter(Boolean).length>0?await Promise.all(s):e&&console.warn(`[swup] No CSS animation duration defined on elements matching \`${e}\``)}function $(t,e){return(t[e]||"").split(", ")}function x(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max(...e.map((e,i)=>A(e)+A(t[i])))}function A(t){return 1e3*parseFloat(t)}function H(t,e={},s={}){if("string"!=typeof t)throw new Error("swup.navigate() requires a URL parameter");if(this.shouldIgnoreVisit(t,{el:s.el,event:s.event}))return void window.location.assign(t);const{url:n,hash:o}=l.fromUrl(t),r=this.createVisit(i({},s,{to:n,hash:o}));this.performNavigation(r,e)}async function V(t,e={}){if(this.navigating){if(this.visit.state>=6)return t.state=2,void(this.onVisitEnd=()=>this.performNavigation(t,e));await this.hooks.call("visit:abort",this.visit,void 0),delete this.visit.to.document,this.visit.state=8}this.navigating=!0,this.visit=t;const{el:i}=t.trigger;e.referrer=e.referrer||this.currentPageUrl,!1===e.animate&&(t.animation.animate=!1),t.animation.animate||this.classes.clear();const a=e.history||(null==i?void 0:i.getAttribute("data-swup-history"))||void 0;a&&["push","replace"].includes(a)&&(t.history.action=a);const l=e.animation||(null==i?void 0:i.getAttribute("data-swup-animation"))||void 0;var h,c;l&&(t.animation.name=l),"object"==typeof e.cache?(t.cache.read=null!=(h=e.cache.read)?h:t.cache.read,t.cache.write=null!=(c=e.cache.write)?c:t.cache.write):void 0!==e.cache&&(t.cache={read:!!e.cache,write:!!e.cache}),delete e.cache;try{await this.hooks.call("visit:start",t,void 0),t.state=3;const i=this.hooks.call("page:load",t,{options:e},async(t,e)=>{let i;return t.cache.read&&(i=this.cache.get(t.to.url)),e.page=i||await this.fetchPage(t.to.url,e.options),e.cache=!!i,e.page});if(i.then(({html:e})=>{t.advance(5),t.to.html=e,t.to.document=(new DOMParser).parseFromString(e,"text/html")}),!t.history.popstate){const e=t.to.url+t.to.hash;"replace"===t.history.action||t.to.url===this.currentPageUrl?r(e):(this.currentHistoryIndex++,o(e,{index:this.currentHistoryIndex}))}if(this.currentPageUrl=n(),t.history.popstate&&this.classes.add("is-popstate"),t.animation.name&&this.classes.add(`to-${s(t.animation.name)}`),t.animation.wait&&await i,t.done)return;if(await this.hooks.call("visit:transition",t,void 0,async()=>{if(!t.animation.animate)return await this.hooks.call("animation:skip",void 0),void await this.renderPage(t,await i);t.advance(4),await this.animatePageOut(t),t.animation.native&&document.startViewTransition?await document.startViewTransition(async()=>await this.renderPage(t,await i)).finished:await this.renderPage(t,await i),await this.animatePageIn(t)}),t.done)return;await this.hooks.call("visit:end",t,void 0,()=>this.classes.clear()),t.state=7,this.navigating=!1,this.onVisitEnd&&(this.onVisitEnd(),this.onVisitEnd=void 0)}catch(e){if(!e||null!=e&&e.aborted)return void(t.state=8);t.state=9,console.error(e),this.options.skipPopStateHandling=()=>(window.location.assign(t.to.url+t.to.hash),!0),window.history.back()}finally{delete t.to.document}}const I=async function(t){await this.hooks.call("animation:out:start",t,void 0,()=>{this.classes.add("is-changing","is-animating","is-leaving")}),await this.hooks.call("animation:out:await",t,{skip:!1},(t,{skip:e})=>{if(!e)return this.awaitAnimations({selector:t.animation.selector})}),await this.hooks.call("animation:out:end",t,void 0)},L=function(t){var e;const i=t.to.document;if(!i)return!1;const s=(null==(e=i.querySelector("title"))?void 0:e.innerText)||"";document.title=s;const n=m('[data-swup-persist]:not([data-swup-persist=""])'),o=t.containers.map(t=>{const e=document.querySelector(t),s=i.querySelector(t);return e&&s?(e.replaceWith(s.cloneNode(!0)),!0):(e||console.warn(`[swup] Container missing in current document: ${t}`),s||console.warn(`[swup] Container missing in incoming document: ${t}`),!1)}).filter(Boolean);return n.forEach(t=>{const e=t.getAttribute("data-swup-persist"),i=p(`[data-swup-persist="${e}"]`);i&&i!==t&&i.replaceWith(t)}),o.length===t.containers.length},q=function(t){const e={behavior:"auto"},{target:s,reset:n}=t.scroll,o=null!=s?s:t.to.hash;let r=!1;return o&&(r=this.hooks.callSync("scroll:anchor",t,{hash:o,options:e},(t,{hash:e,options:i})=>{const s=this.getAnchorElement(e);return s&&s.scrollIntoView(i),!!s})),n&&!r&&(r=this.hooks.callSync("scroll:top",t,{options:e},(t,{options:e})=>(window.scrollTo(i({top:0,left:0},e)),!0))),r},R=async function(t){if(t.done)return;const e=this.hooks.call("animation:in:await",t,{skip:!1},(t,{skip:e})=>{if(!e)return this.awaitAnimations({selector:t.animation.selector})});await g(),await this.hooks.call("animation:in:start",t,void 0,()=>{this.classes.remove("is-animating")}),await e,await this.hooks.call("animation:in:end",t,void 0)},T=async function(t,e){if(t.done)return;t.advance(6);const{url:i}=e;this.isSameResolvedUrl(n(),i)||(r(i),this.currentPageUrl=n(),t.to.url=this.currentPageUrl),await this.hooks.call("content:replace",t,{page:e},(t,{})=>{if(this.classes.remove("is-leaving"),t.animation.animate&&this.classes.add("is-rendering"),!this.replaceContent(t))throw new Error("[swup] Container mismatch, aborting");t.animation.animate&&(this.classes.add("is-changing","is-animating","is-rendering"),t.animation.name&&this.classes.add(`to-${s(t.animation.name)}`))}),await this.hooks.call("content:scroll",t,void 0,()=>this.scrollToContent(t)),await this.hooks.call("page:view",t,{url:this.currentPageUrl,title:document.title})},N=function(t){var e;if(e=t,Boolean(null==e?void 0:e.isSwupPlugin)){if(t.swup=this,!t._checkRequirements||t._checkRequirements())return t._beforeMount&&t._beforeMount(),t.mount(),this.plugins.push(t),this.plugins}else console.error("Not a swup plugin instance",t)};function O(t){const e=this.findPlugin(t);if(e)return e.unmount(),e._afterUnmount&&e._afterUnmount(),this.plugins=this.plugins.filter(t=>t!==e),this.plugins;console.error("No such plugin",e)}function D(t){return this.plugins.find(e=>e===t||e.name===t||e.name===`Swup${String(t)}`)}function M(t){if("function"!=typeof this.options.resolveUrl)return console.warn("[swup] options.resolveUrl expects a callback function."),t;const e=this.options.resolveUrl(t);return e&&"string"==typeof e?e.startsWith("//")||e.startsWith("http")?(console.warn("[swup] options.resolveUrl needs to return a relative url"),t):e:(console.warn("[swup] options.resolveUrl needs to return a url"),t)}function W(t,e){return this.resolveUrl(t)===this.resolveUrl(e)}const B={animateHistoryBrowsing:!1,animationSelector:'[class*="transition-"]',animationScope:"html",cache:!0,containers:["#swup"],ignoreVisit:(t,{el:e}={})=>!(null==e||!e.closest("[data-no-swup]")),linkSelector:"a[href]",linkToSelf:"scroll",native:!1,plugins:[],resolveUrl:t=>t,requestHeaders:{"X-Requested-With":"swup",Accept:"text/html, application/xhtml+xml"},skipPopStateHandling:t=>{var e;return"swup"!==(null==(e=t.state)?void 0:e.source)},timeout:0};class j{constructor(t={}){var e,s;this.version="4.6.1",this.options=void 0,this.defaults=B,this.plugins=[],this.visit=void 0,this.cache=void 0,this.hooks=void 0,this.classes=void 0,this.currentPageUrl=n(),this.currentHistoryIndex=void 0,this.clickDelegate=void 0,this.navigating=!1,this.onVisitEnd=void 0,this.use=N,this.unuse=O,this.findPlugin=D,this.log=()=>{},this.navigate=H,this.performNavigation=V,this.createVisit=b,this.delegateEvent=a,this.fetchPage=u,this.awaitAnimations=C,this.renderPage=T,this.replaceContent=L,this.animatePageIn=R,this.animatePageOut=I,this.scrollToContent=q,this.getAnchorElement=E,this.getCurrentUrl=n,this.resolveUrl=M,this.isSameResolvedUrl=W,this.options=i({},this.defaults,t),this.handleLinkClick=this.handleLinkClick.bind(this),this.handlePopState=this.handlePopState.bind(this),this.cache=new d(this),this.classes=new y(this),this.hooks=new S(this),this.visit=this.createVisit({to:""}),this.currentHistoryIndex=null!=(e=null==(s=window.history.state)?void 0:s.index)?e:1,this.enable()}async enable(){var t;const{linkSelector:e}=this.options;this.clickDelegate=this.delegateEvent(e,"click",this.handleLinkClick),window.addEventListener("popstate",this.handlePopState),this.options.animateHistoryBrowsing&&(window.history.scrollRestoration="manual"),this.options.native=this.options.native&&!!document.startViewTransition,this.options.plugins.forEach(t=>this.use(t)),"swup"!==(null==(t=window.history.state)?void 0:t.source)&&r(null,{index:this.currentHistoryIndex}),await g(),await this.hooks.call("enable",void 0,void 0,()=>{const t=document.documentElement;t.classList.add("swup-enabled"),t.classList.toggle("swup-native",this.options.native)})}async destroy(){this.clickDelegate.destroy(),window.removeEventListener("popstate",this.handlePopState),this.cache.clear(),this.options.plugins.forEach(t=>this.unuse(t)),await this.hooks.call("disable",void 0,void 0,()=>{const t=document.documentElement;t.classList.remove("swup-enabled"),t.classList.remove("swup-native")}),this.hooks.clear()}shouldIgnoreVisit(t,{el:e,event:i}={}){const{origin:s,url:n,hash:o}=l.fromUrl(t);return s!==window.location.origin||!(!e||!this.triggerWillOpenNewWindow(e))||!!this.options.ignoreVisit(n+o,{el:e,event:i})}handleLinkClick(t){const e=t.delegateTarget,{href:i,url:s,hash:n}=l.fromElement(e);if(this.shouldIgnoreVisit(i,{el:e,event:t}))return;if(this.navigating&&s===this.visit.to.url)return void t.preventDefault();const o=this.createVisit({to:s,hash:n,el:e,event:t});t.metaKey||t.ctrlKey||t.shiftKey||t.altKey?this.hooks.callSync("link:newtab",o,{href:i}):0===t.button&&this.hooks.callSync("link:click",o,{el:e,event:t},()=>{var e;const i=null!=(e=o.from.url)?e:"";t.preventDefault(),s&&s!==i?this.isSameResolvedUrl(s,i)||this.performNavigation(o):n?this.hooks.callSync("link:anchor",o,{hash:n},()=>{r(s+n),this.scrollToContent(o)}):this.hooks.callSync("link:self",o,void 0,()=>{"navigate"===this.options.linkToSelf?this.performNavigation(o):(r(s),this.scrollToContent(o))})})}handlePopState(t){var e,i,s,o;const r=null!=(e=null==(i=t.state)?void 0:i.url)?e:window.location.href;if(this.options.skipPopStateHandling(t))return;if(this.isSameResolvedUrl(n(),this.currentPageUrl))return;const{url:a,hash:h}=l.fromUrl(r),c=this.createVisit({to:a,hash:h,event:t});c.history.popstate=!0;const u=null!=(s=null==(o=t.state)?void 0:o.index)?s:0;u&&u!==this.currentHistoryIndex&&(c.history.direction=u-this.currentHistoryIndex>0?"forwards":"backwards",this.currentHistoryIndex=u),c.animation.animate=!1,c.scroll.reset=!1,c.scroll.target=!1,this.options.animateHistoryBrowsing&&(c.animation.animate=!0,c.scroll.reset=!0),this.hooks.callSync("history:popstate",c,{event:t},()=>{this.performNavigation(c)})}triggerWillOpenNewWindow(t){return!!t.matches('[download], [target="_blank"]')}}
//# sourceMappingURL=Swup.modern.js.map


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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/index.scss */ "./src/scss/index.scss");
/* harmony import */ var _scripts_scrollspy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/scrollspy.js */ "./src/scripts/scrollspy.js");
/* harmony import */ var _scripts_scrollspy_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scripts_scrollspy_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scripts_page_transition_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/page-transition.js */ "./src/scripts/page-transition.js");
/* harmony import */ var _scripts_navigation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/navigation.js */ "./src/scripts/navigation.js");
/* harmony import */ var _scripts_navigation_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_scripts_navigation_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _scripts_backToTop_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scripts/backToTop.js */ "./src/scripts/backToTop.js");
/* harmony import */ var _scripts_backToTop_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_scripts_backToTop_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _scripts_backButton_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scripts/backButton.js */ "./src/scripts/backButton.js");
/* harmony import */ var _scripts_backButton_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_scripts_backButton_js__WEBPACK_IMPORTED_MODULE_5__);
// import main stylesheet


// start scripts





})();

/******/ })()
;
//# sourceMappingURL=main.js.map