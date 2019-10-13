// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === "function" && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({
  "vector.js": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

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
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    var P83Vector =
      /*#__PURE__*/
      function () {
        function P83Vector(x, y) {
          _classCallCheck(this, P83Vector);

          this.x = x;
          this.y = y;
        }

        _createClass(P83Vector, [{
          key: "equal",
          value: function equal(other) {
            return this.x === other.x && this.y === other.y;
          }
        }, {
          key: "set",
          value: function set(x, y) {
            this.x = x;
            this.y = y;
    }
        }, {
          key: "add",
          value: function add(other) {
            return new P83Vector(this.x + other.x, this.y + other.y);
    }
        }, {
          key: "addMut",
          value: function addMut(other) {
            this.x += other.x;
            this.y += other.y;
          }
        }, {
          key: "scale",
          value: function scale(fac) {
            return new P83Vector(this.x * fac, this.y * fac);
          }
        }, {
          key: "scaleMut",
          value: function scaleMut(fac) {
            this.x *= fac;
            this.y *= fac;
          }
        }, {
          key: "inRect",
          value: function inRect(pos, size) {
            return this.x > pos.x && this.x < pos.x + size.x && this.y > pos.y && this.y < pos.y + size.y;
          }
        }, {
          key: "copy",
          value: function copy() {
            return new P83Vector(this.x, this.y);
          }
        }, {
          key: "toString",
          value: function toString() {
            return "P83Vector(".concat(this.x, ", ").concat(this.y, ")");
          }
        }, {
          key: "magnitude",
          get: function get() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
          }
        }], [{
          key: "add",
          value: function add(a, b) {
            return a.add(b);
          }
        }]);

        return P83Vector;
      }();

    exports.default = P83Vector;
    P83Vector.zero = new P83Vector(0, 0);
  }, {}],
  "probe.js": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _vector = _interopRequireDefault(require("./vector.js"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
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
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    var P83Probe =
      /*#__PURE__*/
      function () {
        function P83Probe() {
          _classCallCheck(this, P83Probe);

          this.position = new _vector.default(0, 0);
          this.speed = new _vector.default(0, 0);
        }

        _createClass(P83Probe, [{
          key: "accelerate",
          value: function accelerate(thrust_id) {
            var acc = new _vector.default((thrust_id - 1) % 3 - 1, Math.floor((thrust_id - 1) / 3) - 1);
            this.speed.addMut(acc);
            this.position.addMut(this.speed);
          }
        }, {
          key: "isMotionless",
          value: function isMotionless() {
            return this.speed.equal(_vector.default.zero);
          }
        }, {
          key: "toString",
          value: function toString() {
            return "SPEED: ".concat(this.speed.toString(), "\nPOSITION: ").concat(this.position.toString());
          }
        }]);

        return P83Probe;
      }();

    exports.default = P83Probe;
  }, { "./vector.js": "vector.js" }],
  "consts.js": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.colors = void 0;
    var colors = {
      red: ["#ff0000", "#ff8080", "#100000"],
      green: ["#00ff00", "#80ff80", "#001000"],
      light: ["#80ff80", "#80ff80", "#001000"],
      blue: ["#0000ff", "#8080ff", "#000010"]
    };
    exports.colors = colors;
  }, {}],
  "display.js": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.P83Number = exports.P83Input = exports.P83Display = exports.P83MenuItem = exports.P83Button = exports.P83LED = exports.P83Title = void 0;

    var _consts = require("./consts.js");

    var _vector = _interopRequireDefault(require("./vector.js"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
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
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    var P83Title =
      /*#__PURE__*/
      function () {
        function P83Title(parent, pos, size, title) {
          _classCallCheck(this, P83Title);

          this.parent = parent;
          this.root = this.parent.root;
          this.pos = pos;
          this.size = size;
          this.title = title;
        }

        _createClass(P83Title, [{
          key: "draw",
          value: function draw() {
            var ctx = this.root.ctx;
            var unit = this.root.unit;
            var titleWidth = ctx.measureText(this.title).width;
            ctx.fillStyle = _consts.colors.light[0];
            ctx.shadowBlur = 0;
            ctx.font = "" + Math.floor(unit * 0.8) + "px Nova Mono";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText(this.title, (this.pos.x + 2) * unit, (this.pos.y + 1) * unit); //

            ctx.lineWidth = 2;
            ctx.strokeStyle = _consts.colors.light[0];
            ctx.beginPath();
            ctx.moveTo((this.pos.x + 1.5) * unit, (this.pos.y + 1) * unit);
            ctx.lineTo((this.pos.x + 1) * unit, (this.pos.y + 1) * unit);
            ctx.lineTo((this.pos.x + 1) * unit, (this.pos.y + 2) * unit);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo((this.pos.x + 2.5) * unit + titleWidth, (this.pos.y + 1) * unit);
            ctx.lineTo((this.pos.x + this.size.x - 1) * unit, (this.pos.y + 1) * unit);
            ctx.lineTo((this.pos.x + this.size.x - 1) * unit, (this.pos.y + 2) * unit);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo((this.pos.x + 1) * unit, (this.pos.y + this.size.y - 2) * unit);
            ctx.lineTo((this.pos.x + 1) * unit, (this.pos.y + this.size.y - 1) * unit);
            ctx.lineTo((this.pos.x + this.size.x - 1) * unit, (this.pos.y + this.size.y - 1) * unit);
            ctx.lineTo((this.pos.x + this.size.x - 1) * unit, (this.pos.y + this.size.y - 2) * unit);
            ctx.stroke();
          }
        }]);

        return P83Title;
      }();

    exports.P83Title = P83Title;

    var P83LED =
      /*#__PURE__*/
      function () {
        function P83LED(parent, pos) {
          _classCallCheck(this, P83LED);

          this.parent = parent;
          this.root = this.parent.root;
          this.pos = pos;
          this.lit = true;
          this.blinking = false;
          this.nbTimeouts = 0;
          this.colors = _consts.colors.green;
        }

        _createClass(P83LED, [{
          key: "draw",
          value: function draw() {
            var ctx = this.root.ctx;
            var unit = this.root.unit;

            if (this.lit) {
              ctx.fillStyle = this.colors[0];
              ctx.strokeStyle = this.colors[0];
              ctx.shadowBlur = unit;
              ctx.shadowColor = this.colors[1];
            } else {
              ctx.strokeStyle = "#101010";
              ctx.fillStyle = this.colors[2];
              ctx.shadowBlur = 0;
      }

            ctx.beginPath();
            ctx.arc(unit * this.pos.x, unit * this.pos.y, unit / 3, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
          }
        }, {
          key: "blink",
          value: function blink(state) {
            var _this = this;

            if (!this.blinking) return;

            switch (state) {
              case 0:
                this.lit = true;
                this.parent.draw();
                break;

              case 1:
                if (this.nbTimeouts === 0) {
                  this.nbTimeouts = 1;
                  setTimeout(function () {
                    return _this.blink(2);
                  });
                }

                break;

              case 2:
                this.nbTimeouts--;
                if (this.nbTimeouts > 0) return;
                this.lit = !this.lit;
                this.parent.draw();

                if (this.lit) {
                  document.getElementById("blip").volume = 0.01;
                  document.getElementById("blip").play();
          }

                this.nbTimeouts = 1;
                setTimeout(function () {
                  return _this.blink(2);
                }, 300);
                break;
            }
          }
        }]);

        return P83LED;
      }();

    exports.P83LED = P83LED;

    var P83Button =
      /*#__PURE__*/
      function () {
        function P83Button(parent, pos, size, text, on_cb, off_cb) {
          _classCallCheck(this, P83Button);

          this.root = parent.root;
          this.pos = pos;
          this.size = size;
          this.text = text;
          this.on = on_cb;
          this.off = off_cb;
          this.active = true;
          this.lit = false;
        }

        _createClass(P83Button, [{
          key: "draw",
          value: function draw() {
            var ctx = this.root.ctx;
            var unit = this.root.unit;
            var col = _consts.colors.light;

            if (this.active) {
              if (this.lit) {
                col = _consts.colors.green;
              }

              ctx.shadowBlur = unit / 2;
              ctx.fillStyle = col[2];
              ctx.strokeStyle = col[0];
              ctx.shadowColor = col[1];
            } else {
              ctx.strokeStyle = "#101010";
              ctx.fillStyle = col[2];
              ctx.shadowBlur = 0;
      }

            ctx.fillRect(this.pos.x * unit, this.pos.y * unit, this.size.x * unit, this.size.y * unit);
            ctx.strokeRect(this.pos.x * unit, this.pos.y * unit, this.size.x * unit, this.size.y * unit); //

            ctx.fillStyle = "#000000";

            if (this.is_active) {
              ctx.fillStyle = this.colors[0];
              ctx.shadowBlur = unit / 4;
              ctx.shadowColor = this.colors[1];
            }

            ctx.font = "" + Math.floor(5 / 4 * unit) + "px Nova Mono";
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillText(this.text, (this.pos.x + this.size.x / 2) * unit, (this.pos.y + 0.5) * unit);
          }
        }, {
          key: "onClick",
          value: function onClick(pos) {
            if (!this.active || this.lit) return;
            var unit = this.root.unit;
            var dx = pos.x - this.pos.x * unit;
            var dy = pos.y - this.pos.y * unit;
            this.lit = dx >= 0 && dx <= this.size.x * unit && dy >= 0 && dy <= this.size.y * unit;

            if (this.lit) {
              document.getElementById("click").volume = 0.1;
              document.getElementById("click").play();
              setTimeout(this.off.bind(this), 200);
              this.on.call(this);
            }
          }
        }]);

        return P83Button;
      }();

    exports.P83Button = P83Button;

    var P83MenuItem =
      /*#__PURE__*/
      function () {
        function P83MenuItem(parent, pos, text, on_cb, off_cb) {
          _classCallCheck(this, P83MenuItem);

          this.root = parent.root;
          this.pos = pos;
          this.text = text;
          this.button = new P83Button(this, pos, new _vector.default(1, 1), on_cb, off_cb);
        }

        _createClass(P83MenuItem, [{
          key: "draw",
          value: function draw() {
            var ctx = this.root.ctx;
            var unit = this.root.unit;
            ctx.fillStyle = _consts.colors.light[0];
            ctx.shadowBlur = 0;
            ctx.textAlign = "left";
            ctx.font = "".concat(Math.floor(unit * 0.8), "px Nova Mono");
            ctx.textBaseline = "middle";
            ctx.fillText(this.text, (this.pos.x + 2) * unit, (this.pos.y + 0.5) * unit);
            this.button.draw();
          }
        }, {
          key: "onClick",
          value: function onClick(pos) {
            this.button.onClick(pos);
          }
        }]);

        return P83MenuItem;
      }();

    exports.P83MenuItem = P83MenuItem;

    var P83Display =
      /*#__PURE__*/
      function () {
        function P83Display(parent, pos, size) {
          _classCallCheck(this, P83Display);

          this.parent = parent;
          this.root = this.parent.root;
          this.pos = pos;
          this.size = size;
          this.value = "";
          this.colors = _consts.colors.green;
        }

        _createClass(P83Display, [{
          key: "draw",
          value: function draw() {
            var ctx = this.root.ctx;
            var unit = this.root.unit;
            ctx.shadowBlur = 0;
            ctx.fillStyle = this.colors[2];
            ctx.strokeStyle = "#101010";
            ctx.fillRect(this.pos.x * unit, this.pos.y * unit, (this.size * 0.71 + 0.5) * unit, 2 * unit);
            ctx.strokeRect(this.pos.x * unit, this.pos.y * unit, (this.size * 0.71 + 0.5) * unit, 2 * unit); //

            ctx.fillStyle = this.colors[0];
            ctx.shadowBlur = unit / 4;
            ctx.shadowColor = this.colors[1];
            ctx.font = "".concat(Math.floor(5 / 4 * unit), "px Nova Mono");
            ctx.textAlign = "left";
            ctx.textBaseline = "top"; //

            var text = this.value;

            if (text.length > this.size) {
              text = this.value.substring(text.length - this.size, text.length);
            }

            ctx.fillText(text, (this.pos.x + 0.25) * unit, (this.pos.y + 0.5) * unit);
          }
        }]);

        return P83Display;
      }();

    exports.P83Display = P83Display;

    var P83Input =
      /*#__PURE__*/
      function () {
        function P83Input(parent, pos, size, id, cb) {
          _classCallCheck(this, P83Input);

          this.parent = parent;
          this.root = this.parent.root;
          this.pos = pos;
          this.size = size;
          this.callback = cb;
          this.colors = _consts.colors.green;
          this.input = document.getElementById(id);
          this.input.value = "";
          this.input.addEventListener("input", this.onInput.bind(this));
          this.input.addEventListener("keyup", this.onKeyup.bind(this));
          this.authorizedChars = "";
          this.popping = false;
        }

        _createClass(P83Input, [{
          key: "draw",
          value: function draw() {
            var canvas = this.root.canvas;
            var unit = this.root.unit;
            this.input.style.left = "" + (canvas.offsetLeft + this.pos.x * unit) + "px";
            this.input.style.top = "" + (canvas.offsetTop + this.pos.y * unit) + "px";
            this.input.style.width = "" + (Math.floor((this.size * 0.71 + 0.5) * unit) - 2) + "px";
            this.input.style.height = "" + (2 * unit - 2) + "px";
            this.input.style.backgroundColor = _consts.colors.green[2];
            this.input.style.font = "" + Math.floor(5 / 4 * unit) + "px Nova Mono";
            this.input.style.color = _consts.colors.green[0];
            this.input.style.textShadow = "0 0 " + Math.floor(unit / 4) + "px " + _consts.colors.green[1];
            this.input.style.border = "1px solid #101010";
          }
        }, {
          key: "setup",
          value: function setup(authorizedChars) {
            this.input.value = "";
            this.authorizedChars = authorizedChars;
          }
        }, {
          key: "onInput",
          value: function onInput() {
            var correct = "";
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = this.input.value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var char = _step.value;
                if (this.authorizedChars.indexOf(char) >= 0) correct += char;
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            this.input.value = correct;
          }
        }, {
          key: "onKeyup",
          value: function onKeyup(event) {
            if (event.key === "Enter") if (!this.popping) this.pop();
          }
        }, {
          key: "pop",
          value: function pop() {
            this.popping = false;
            if (this.input.value.length === 0) return;

            if (this.callback(parseInt(this.input.value[0]))) {
              this.input.value = this.input.value.slice(1);
              this.popping = true;
              setTimeout(this.pop.bind(this), 100);
            }
          }
        }, {
          key: "show",
          value: function show(shown) {
            if (shown) {
              this.input.style.visibility = "visible";
              this.input.style.zIndex = "1";
            } else {
              this.input.style.visibility = "hidden";
              this.input.style.zIndex = "-1";
            }
          }
        }]);

        return P83Input;
      }();

    exports.P83Input = P83Input;

    var P83Number =
      /*#__PURE__*/
      function () {
        function P83Number(parent, pos, size) {
          _classCallCheck(this, P83Number);

          this.parent = parent;
          this.root = this.parent.root;
          this.size = size;
          this.value = NaN;
          this.display = new P83Display(this, pos, size);
        }

        _createClass(P83Number, [{
          key: "draw",
          value: function draw() {
            var sign = " ";
            var digits = "";
            var value = this.value;

            if (isNaN(value)) {
              this.display.value = ":-(";
            } else {
              if (value < 0) {
                sign = "-";
                value *= -1;
              }

              for (var i = 1; i < this.size; i++) {
                digits = "".concat(value % 10).concat(digits);
                value = Math.floor(value / 10);
              }

              this.display.value = sign + digits;
            }

            this.display.draw();
          }
        }]);

        return P83Number;
      }();

    exports.P83Number = P83Number;
  }, { "./consts.js": "consts.js", "./vector.js": "vector.js" }],
  "targets.js": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.P83TargetSelector = exports.P83Targets = void 0;

    var _vector = _interopRequireDefault(require("./vector.js"));

    var _display = require("./display.js");

    var _consts = require("./consts.js");

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
    }

    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }

    function _iterableToArrayLimit(arr, i) {
      if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
        return;
      }
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;
      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }

    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
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
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    var P83Targets =
      /*#__PURE__*/
      function () {
        function P83Targets(positions, isTrackingOk) {
          _classCallCheck(this, P83Targets);

          this.positions = [];
          this.checked = [];

          for (var i = 0; i < positions.length; i += 2) {
            this.positions.push(new _vector.default(positions[i], positions[i + 1]));
            this.checked.push(false);
    }

          this.isTrackingOk = isTrackingOk;
        }

        _createClass(P83Targets, [{
          key: "check",
          value: function check(probe) {
            var checkState = P83Targets.CHECK_STATE_POSITION;

            for (var i = 0; i < this.positions.length; i++) {
              var position = this.positions[i];

              if (position.equal(probe.position)) {
                if (this.isTrackingOk || probe.isMotionless()) {
                  checkState = P83Targets.CHECK_STATE_BOTH;

                  if (!this.checked[i]) {
                    this.checked[i] = true;
                  }
                }
              }
      }

            return checkState;
          }
        }, {
          key: "checkAll",
          value: function checkAll() {
            return this.nbChecked === this.checked.length;
          }
        }, {
          key: "targetsString",
          value: function targetsString() {
            var a_code = 'A'.charCodeAt(0);
            return this.positions.map(function (p, i) {
              return " ".concat(String.fromCharCode(a_code + i), ": (").concat(p.toString(), ")");
            }).join('\n');
          }
        }, {
          key: "checkedString",
          value: function checkedString() {
            var a_code = 'A'.charCodeAt(0);
            return this.checked.map(function (b, i) {
              return [b, i];
            }).filter(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                b = _ref2[0],
                _ = _ref2[1];

              return b;
            }).map(function (_ref3) {
              var _ref4 = _slicedToArray(_ref3, 2),
                b = _ref4[0],
                i = _ref4[1];

              return String.fromCharCode(a_code + i);
            }).join(" ");
          }
        }, {
          key: "nbChecked",
          get: function get() {
            return this.checked.filter(Boolean).length;
          }
        }]);

        return P83Targets;
      }();

    exports.P83Targets = P83Targets;
    P83Targets.CHECK_STATE_POSITION = Symbol();
    P83Targets.CHECK_STATE_BOTH = Symbol();
    P83Targets.CHECK_STATE_NONE = Symbol();

    var P83TargetSelector =
      /*#__PURE__*/
      function () {
        function P83TargetSelector(parent, pos, mission, callback) {
          _classCallCheck(this, P83TargetSelector);

          this.parent = parent;
          this.root = this.parent.root;
          this.pos = pos;
          this.size = new _vector.default(14, 21);
          this.mission = mission;
          this.callback = callback;
          this.title = new _display.P83Title(this, this.pos, this.size, "TARGET SELECTOR");
          this.led = new _display.P83LED(this, _vector.default.add(this.pos, new _vector.default(2.5, 17.5)), 8);
          this.numX = new _display.P83Number(this, _vector.default.add(this.pos, new _vector.default(6, 15.5)), 8);
          this.numY = new _display.P83Number(this, _vector.default.add(this.pos, new _vector.default(6, 17.5)), 8);
          this.buttons = [];

          for (var i = 0; i < 20; i++) {
            this.buttons.push(new _display.P83Button(this, _vector.default.add(this.pos, new _vector.default(2 + 8 / 3 * (i % 4), 2 + 8 / 3 * Math.floor(i / 4))), new _vector.default(2, 2), String.fromCharCode('A'.charCodeAt(0) + i), this.select.bind(this, i), function () {
            }));
          }
        }

        _createClass(P83TargetSelector, [{
          key: "draw",
          value: function draw() {
            var ctx = this.root.ctx;
            var unit = this.root.unit;
            ctx.fillStyle = "#000000";
            ctx.shadowBlur = 0;
            ctx.fillRect(this.x * unit, this.y * unit, this.w * unit, this.h * unit); //

            this.title.draw();

            for (var i = 0; i < this.buttons.length; i++) {
              this.buttons[i].draw();
      }

            this.led.draw(); //

            ctx.fillStyle = _consts.colors.light[0];
            ctx.shadowBlur = 0;
            ctx.textAlign = "left";
            ctx.font = "" + Math.floor(unit * 0.8) + "px Liberation";
            ctx.textBaseline = "middle";
            ctx.fillText("X", (this.x + 4) * unit, (this.y + 16.5) * unit);
            ctx.fillText("Y", (this.x + 4) * unit, (this.y + 18.5) * unit);
            this.numX.draw();
            this.numY.draw();
          }
        }, {
          key: "select",
          value: function select(idx) {
            for (var i = 0; i < this.mission.nbTargets; i++) {
              this.buttons[i].lit = i === idx;
            }

            console.log(this.mission.targets); // this.selected = idx;

            this.callback(idx);
            this.numX.value = this.mission.targets.positions[idx].x;
            this.numY.value = this.mission.targets.positions[idx].y;
            this.draw();
          }
        }, {
          key: "onClick",
          value: function onClick(pos) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = this.buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var button = _step.value;
                button.onClick(pos);
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          }
        }]);

        return P83TargetSelector;
      }();

    exports.P83TargetSelector = P83TargetSelector;
  }, { "./vector.js": "vector.js", "./display.js": "display.js", "./consts.js": "consts.js" }],
  "mission.js": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _probe = _interopRequireDefault(require("./probe.js"));

    var _targets = require("./targets.js");

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
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
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    var P83Mission =
      /*#__PURE__*/
      function () {
        function P83Mission(name, code, positions, diagAllowed, trackingAllowed, oxygen) {
          _classCallCheck(this, P83Mission);

          this.name = name;
          this.code = code;
          this.probe = new _probe.default();
          this.targets = new _targets.P83Targets(positions, trackingAllowed);
          this.diagonalAllowed = diagAllowed;
          this.trackingAllowed = trackingAllowed;
          this.oxygenStartLevel = oxygen;
          this.sequence = "";
          this.isSpeedOk = true;
          this.isAchieved = false;
        }

        _createClass(P83Mission, [{
          key: "move",
          value: function move(thrust_id) {
            if (thrust_id < 1 || thrust_id > 9) return;
            this.sequence += thrust_id.toFixed();
            this.probe.accelerate(thrust_id);
            var checkState = this.targets.check(this.probe);

            switch (checkState) {
              case _targets.P83Targets.CHECK_STATE_POSITION:
                this.isSpeedOk = false;
                break;

              case _targets.P83Targets.CHECK_STATE_BOTH:
                this.isSpeedOk = true;

                if (this.targets.checkAll()) {
                  this.isAchieved = true;
                }

                break;
            }
          }
        }, {
          key: "toString",
          value: function toString() {
            return trimLines("MISSION: ".concat(this.name, "\n    TELEPORTATION CODE: ").concat(this.code, "\n    *** DESCRIPTION ***\n    TARGETS:\n    ").concat(this.targets.targetsString(), "\n    DIAGONAL THRUST: ").concat(this.diagonalAllowed ? "YES" : "NO", "\n    TRACKING DEVICE: ").concat(this.trackingAllowed ? "YES" : "NO", "\n    OXYGEN AT DEPARTURE: ").concat(this.oxygenStartLevel, "\n    \n    *** CURRENT STATUS ***\n    ").concat(this.sequence.length === 0 ? "" : "SEQUENCE: ".concat(this.sequence), "\n    PROBE:\n    ").concat(this.probe.toString(), "\n    VALIDATED TARGETS: ").concat(this.nbTargets === 0 ? "NONE" : this.targets.checkedString(), "\n    REMAINING OXYGEN: ").concat(this.oxygenLevel));
          }
        }, {
          key: "oxygenLevel",
          get: function get() {
            return this.oxygenStartLevel - this.sequence.length;
          }
        }, {
          key: "nbTargets",
          get: function get() {
            return this.targets.positions.length;
          }
        }]);

        return P83Mission;
      }();

    exports.default = P83Mission;

    function trimLines(input) {
      return input.split('\n').map(function (l) {
        return l.trim();
      }).join('\n');
    }
  }, { "./probe.js": "probe.js", "./targets.js": "targets.js" }],
  "panels.js": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.P83MissionPanel = exports.P83SequencePanel = exports.P83ThrustPanel = exports.default = exports.P83XYPanel = void 0;

    var _vector = _interopRequireDefault(require("./vector.js"));

    var _display = require("./display.js");

    var _consts = require("./consts.js");

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
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
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    var P83XYPanel =
      /*#__PURE__*/
      function () {
        function P83XYPanel(parent, pos, title, vector) {
          _classCallCheck(this, P83XYPanel);

          this.parent = parent;
          this.root = this.parent.root;
          this.pos = pos;
          this.size = new _vector.default(14, 7);
          this.title = new _display.P83Title(this, this.pos, this.size, title);
          this.vector = vector;
          this.led = new _display.P83LED(this, this.pos, this.size, title);
          this.numX = new _display.P83Number(this, _vector.default.add(this.pos, new _vector.default(6, 1.5)), 8);
          this.numY = new _display.P83Number(this, _vector.default.add(this.pos, new _vector.default(6, 3.5)), 8);
        }

        _createClass(P83XYPanel, [{
          key: "draw",
          value: function draw() {
            var ctx = this.root.ctx;
            var unit = this.root.unit;
            ctx.fillStyle = "#000000";
            ctx.shadowBlur = 0;
            ctx.fillRect(this.pos.x * unit, this.pos.y * unit, this.size.x * unit, this.size.y * unit); //

            this.title.draw();
            this.led.draw(); //

            ctx.fillStyle = _consts.colors.light[0];
            ctx.shadowBlur = 0;
            ctx.textAlign = "left";
            ctx.font = "" + Math.floor(unit * 0.8) + "px Liberation";
            ctx.textBaseline = "middle";
            ctx.fillText("X", (this.pos.x + 4) * unit, (this.pos.y + 2.5) * unit);
            ctx.fillText("Y", (this.pos.x + 4) * unit, (this.pos.y + 4.5) * unit); //

            this.numX.value = this.vector.x;
            this.numY.value = this.vector.y; //

            this.numX.draw();
            this.numY.draw();
          }
        }]);

        return P83XYPanel;
      }();

    exports.P83XYPanel = P83XYPanel;

    var P83StatusPanel =
      /*#__PURE__*/
      function () {
        function P83StatusPanel(parent, pos, mission) {
          _classCallCheck(this, P83StatusPanel);

          this.parent = parent;
          this.root = this.parent.root;
          this.pos = pos;
          this.size = new _vector.default(14, 7);
          this.mission = mission;
          this.title = new _display.P83Title(this, this.pos, this.size, "STATUS");
          this.oxygenLED = new _display.P83LED(this, new _vector.default(this.pos.x + 2.5, this.pos.y + 2.5));
          this.oxygenNum = new _display.P83Number(this, new _vector.default(this.pos.x + 8, this.pos.y + 1.5), 5);
          this.trackingLED = new _display.P83LED(this, new _vector.default(this.pos.x + 2.5, this.pos.y + 4.5));
        }

        _createClass(P83StatusPanel, [{
          key: "draw",
          value: function draw() {
            var ctx = this.root.ctx;
            var unit = this.root.unit;
            ctx.fillStyle = "#000000";
            ctx.shadowBlur = 0;
            ctx.fillRect(this.pos.x * unit, this.pos.y * unit, this.size.x * unit, this.size.y * unit); //

            this.title.draw(); //

            ctx.fillStyle = _consts.colors.light[0];
            ctx.shadowBlur = 0;
            ctx.textAlign = "left";
            ctx.font = "" + Math.floor(unit * 0.8) + "px Liberation";
            ctx.textBaseline = "middle";
            ctx.fillText("OXYGEN", (this.pos.x + 4) * unit, (this.pos.y + 2.5) * unit);
            ctx.fillText("TRACKING DEVICE", (this.pos.x + 4) * unit, (this.pos.y + 4.5) * unit); //

            if (this.mission.oxygenLevel > 1) {
              this.oxygenLED.colors = _consts.colors.green;
            } else {
              this.oxygenLED.colors = _consts.colors.red;
            }

            this.oxygenNum.value = this.mission.oxygenLevel;

            if (this.mission.trackingAllowed) {
              this.trackingLED.colors = _consts.colors.green;
            } else {
              this.trackingLED.colors = _consts.colors.red;
      }

            this.oxygenNum.draw();
            this.oxygenLED.draw();
            this.trackingLED.draw();
          }
        }]);

        return P83StatusPanel;
      }();

    exports.default = P83StatusPanel;

    var P83ThrustPanel =
      /*#__PURE__*/
      function () {
        function P83ThrustPanel(parent, pos, mission, move_cb) {
          _classCallCheck(this, P83ThrustPanel);

          this.parent = parent;
          this.root = this.parent.root;
          this.pos = pos;
          this.size = new _vector.default(14, 14);
          this.mission = mission;
          this.move_callback = move_cb;
          this.title = new _display.P83Title(this, this.pos, this.size, "THRUST");
          this.diagonalAllowed = true;
          this.buttons = [];

          for (var i = 0; i < 9; i++) {
            var _pos = this.pos.copy();

            _pos.add(3.5 + 2.5 * (i % 3), 8.5 - 2.5 * Math.floor(i / 3));

            var size = new _vector.default(2, 2);
            console.log("Thrust panel button", i, {
              pos: _pos,
              size: size
            });
            this.buttons.push(new _display.P83Button(this, _pos, size, "".concat(i + 1), this.move_callback.bind(this, i + 1)));
          }

          if (this.mission.diagonalAllowed) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = this.buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var button = _step.value;
                button.active = true;
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          } else for (var _i = 0; _i < 9; _i++) {
            this.buttons[_i].active = _i !== 4 && _i % 2 === 0;
          }
        }

        _createClass(P83ThrustPanel, [{
          key: "clear",
          value: function clear() {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = this.buttons[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var button = _step2.value;
                button.lit = false;
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            this.draw();
          }
        }, {
          key: "drawArrow",
          value: function drawArrow(pos1, pos2, pos3) {
            var ctx = this.root.ctx;
            var unit = this.root.unit;
            ctx.strokeStyle = _consts.colors.light[0];
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.moveTo(pos1.x * unit, pos1.y * unit);
            ctx.lineTo(pos2.x * unit, pos2.y * unit);
            ctx.lineTo(pos3.x * unit, pos3.y * unit);
            ctx.stroke();
          }
        }, {
          key: "draw",
          value: function draw() {
            var ctx = this.root.ctx;
            var unit = this.root.unit;
            ctx.fillStyle = "#000000";
            ctx.shadowBlur = 0;
            ctx.fillRect(this.pos.x * unit, this.pos.y * unit, this.size.x * unit, this.size.y * unit); //

            this.title.draw();

            for (var i = 0; i < this.buttons.length; i++) {
              this.buttons[i].draw();
            }

            this.drawArrow(_vector.default.add(this.pos, new _vector.default(3, 9.5)), _vector.default.add(this.pos, new _vector.default(3, 11)), _vector.default.add(this.pos, new _vector.default(4.5, 11)));
            this.drawArrow(_vector.default.add(this.pos, new _vector.default(6, 11)), _vector.default.add(this.pos, new _vector.default(7, 12)), _vector.default.add(this.pos, new _vector.default(8, 11)));
            this.drawArrow(_vector.default.add(this.pos, new _vector.default(11, 9.5)), _vector.default.add(this.pos, new _vector.default(11, 11)), _vector.default.add(this.pos, new _vector.default(9.5, 11)));
            this.drawArrow(_vector.default.add(this.pos, new _vector.default(11, 6)), _vector.default.add(this.pos, new _vector.default(12, 7)), _vector.default.add(this.pos, new _vector.default(11, 8)));
            this.drawArrow(_vector.default.add(this.pos, new _vector.default(11, 4.5)), _vector.default.add(this.pos, new _vector.default(11, 3)), _vector.default.add(this.pos, new _vector.default(9.5, 3)));
            this.drawArrow(_vector.default.add(this.pos, new _vector.default(6, 3)), _vector.default.add(this.pos, new _vector.default(7, 2)), _vector.default.add(this.pos, new _vector.default(8, 3)));
            this.drawArrow(_vector.default.add(this.pos, new _vector.default(3, 4.5)), _vector.default.add(this.pos, new _vector.default(3, 3)), _vector.default.add(this.pos, new _vector.default(4.5, 3)));
            this.drawArrow(_vector.default.add(this.pos, new _vector.default(3, 6)), _vector.default.add(this.pos, new _vector.default(2, 7)), _vector.default.add(this.pos, new _vector.default(3, 8)));
          }
        }, {
          key: "onClick",
          value: function onClick(pos) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = this.buttons[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var button = _step3.value;
                button.onClick(pos);
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          }
        }]);

        return P83ThrustPanel;
      }();

    exports.P83ThrustPanel = P83ThrustPanel;

    var P83SequencePanel =
      /*#__PURE__*/
      function () {
        function P83SequencePanel(parent, pos, mission, callback) {
          _classCallCheck(this, P83SequencePanel);

          this.parent = parent;
          this.root = this.parent.root;
          this.mission = mission;
          this.pos = pos;
          this.size = new _vector.default(42, 7);
          this.title = new _display.P83Title(this, this.pos, this.size, "THRUST SEQUENCE");
          this.sequence = new _display.P83Display(this, _vector.default.add(this.pos, new _vector.default(9.75, 1.5)), 42);
          this.sequenceInput = new _display.P83Input(this, _vector.default.add(this.pos, new _vector.default(9.75, 3.5)), 42, "input", callback);
          if (this.mission.diagonalAllowed) this.sequenceInput.setup("123456789"); else this.sequenceInput.setup("24568");
        }

        _createClass(P83SequencePanel, [{
          key: "draw",
          value: function draw() {
            var ctx = this.root.ctx;
            var unit = this.root.unit;
            this.sequenceInput.show(true);
            ctx.fillStyle = "#000000";
            ctx.shadowBlur = 0;
            ctx.fillRect(this.pos.x * unit, this.pos.y * unit, this.size.x * unit, this.size.y * unit); //

            this.title.draw(); //

            ctx.fillStyle = _consts.colors.light[0];
            ctx.shadowBlur = 0;
            ctx.textAlign = "left";
            ctx.font = "" + Math.floor(unit * 0.8) + "px Liberation";
            ctx.textBaseline = "middle";
            ctx.fillText("SEQUENCE", (this.pos.x + 2) * unit, (this.pos.y + 2.5) * unit);
            ctx.fillText("KEYBOARD INPUT", (this.pos.x + 2) * unit, (this.pos.y + 4.5) * unit); //

            this.sequence.value = this.mission.sequence;
            this.sequence.draw();
            this.sequenceInput.draw();
          }
        }]);

        return P83SequencePanel;
      }();

    exports.P83SequencePanel = P83SequencePanel;

    var P83MissionPanel =
      /*#__PURE__*/
      function () {
        function P83MissionPanel(parent, pos, mission, quit_cb) {
          _classCallCheck(this, P83MissionPanel);

          this.parent = parent;
          this.root = this.parent.root;
          this.pos = pos;
          this.size = new _vector.default(14, 7);
          this.mission = mission;
          this.quitCallback = quit_cb;
          this.title = new _display.P83Title(this, this.pos, this.size, "MISSION");
          this.printMenuItem = new _display.P83MenuItem(this, _vector.default.add(this.pos, new _vector.default(2, 2)), "PRINT", this.draw.bind(this), this.print.bind(this));
          this.quitMenuItem = new _display.P83MenuItem(this, _vector.default.add(this.pos, new _vector.default(2, 4)), "QUIT", this.draw.bind(this), this.quit.bind(this));
        }

        _createClass(P83MissionPanel, [{
          key: "print",
          value: function print() {
            this.printMenuItem.lit = false;
            this.draw();
            window.open("data:text," + encodeURI(this.mission.toString()), "_blank");
          }
        }, {
          key: "draw",
          value: function draw() {
            var ctx = this.root.ctx;
            var unit = this.root.unit;
            ctx.fillStyle = "#000";
            ctx.shadowBlur = 0;
            ctx.fillRect(this.pos.x * unit, this.pos.y * unit, this.size.x * unit, this.size.y * unit);
            this.title.draw();
            this.printMenuItem.draw();
            this.quitMenuItem.draw();
          }
        }, {
          key: "onClick",
          value: function onClick(pos) {
            this.printMenuItem.onClick(pos);
            this.quitMenuItem.onClick(pos);
          }
        }, {
          key: "quit",
          value: function quit() {
            this.quitMenuItem.lit = false;
            this.draw();
            this.quitCallback();
          }
        }]);

        return P83MissionPanel;
      }();

    exports.P83MissionPanel = P83MissionPanel;
  }, { "./vector.js": "vector.js", "./display.js": "display.js", "./consts.js": "consts.js" }],
  "scope.js": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _consts = require("./consts.js");

    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
    }

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }

    function _iterableToArray(iter) {
      if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
    }

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      }
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
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    var P83Scope =
      /*#__PURE__*/
      function () {
        function P83Scope(parent, pos, size, mission) {
          _classCallCheck(this, P83Scope);

          this.parent = parent;
          this.root = this.parent.root;
          this.pos = pos;
          this.size = size;
          this.mission = mission;
          this.selected = 0;
          this.colors = _consts.colors.light;
        }

        _createClass(P83Scope, [{
          key: "computeDimensions",
          value: function computeDimensions() {
            var positions = [].concat(_toConsumableArray(this.mission.targets.positions), [this.mission.probe.position]);
            var xPositions = positions.map(function (p) {
              return p.x;
            });
            this.min_x = Math.min.apply(Math, _toConsumableArray(xPositions));
            this.max_x = Math.max.apply(Math, _toConsumableArray(xPositions));
            var yPositions = positions.map(function (p) {
              return p.y;
            });
            this.min_y = Math.min.apply(Math, _toConsumableArray(yPositions));
            this.max_y = Math.max.apply(Math, _toConsumableArray(yPositions));
            var scale = Math.max(1, (this.max_x - this.min_x) / (this.size.x - 4), (this.max_y - this.min_y) / (this.size.y - 4));
            var cx = (this.max_x + this.min_x) / 2;
            var cy = (this.max_y + this.min_y) / 2;
            this.min_x = cx - scale * (this.size.x - 2) / 2;
            this.max_x = cx + scale * (this.size.x - 2) / 2;
            this.min_y = cy - scale * (this.size.y - 2) / 2;
            this.max_y = cy + scale * (this.size.y - 2) / 2;
          }
        }, {
          key: "drawGrid",
          value: function drawGrid(size) {
            var ctx = this.root.ctx;
            var unit = this.root.unit;
            var intensity = Math.min(1, (this.size.x - 2) / (this.max_x - this.min_x) / 10 * size);
            var color = "rgba(128, 255, 128, ".concat(intensity, ")");
            ctx.strokeStyle = color;
            ctx.shadowColor = color;
            ctx.shadowBlur = 4 * intensity;
            var tick_x = Math.ceil(this.min_x / size) * size;

            while (tick_x < Math.ceil(this.max_x / size) * size) {
              var x = this.pos.x + 1 + (tick_x - this.min_x) / (this.max_x - this.min_x) * (this.size.x - 2);
              ctx.beginPath();
              ctx.moveTo(x * unit, (this.pos.y + 1) * unit);
              ctx.lineTo(x * unit, (this.pos.y + this.size.y - 1) * unit);
              ctx.stroke();
              tick_x += size;
            }

            var tick_y = Math.ceil(this.min_y / size) * size;

            while (tick_y < Math.ceil(this.max_y / size) * size) {
              var y = this.pos.y + 1 + (this.max_y - tick_y) / (this.max_y - this.min_y) * (this.size.y - 2);
              ctx.beginPath();
              ctx.moveTo((this.pos.x + 1) * unit, y * unit);
              ctx.lineTo((this.pos.x + this.size.x - 1) * unit, y * unit);
              ctx.stroke();
              tick_y += size;
            }
          }
        }, {
          key: "drawFullGrids",
          value: function drawFullGrids() {
            var ctx = this.root.ctx;
            var unit = this.root.unit;
            ctx.shadowBlur = 0;
            ctx.fillStyle = this.colors[2];
            ctx.fillRect(this.pos.x * unit, this.pos.y * unit, this.size.x * unit, this.size.y * unit);
            ctx.lineWidth = 0;
            ctx.strokeStyle = this.colors[0];
            ctx.shadowBlur = unit / 4;
            ctx.shadowColor = this.colors[1];
            ctx.strokeRect((this.pos.x + 1) * unit, (this.pos.y + 1) * unit, (this.size.x - 2) * unit, (this.size.y - 2) * unit); //

            var primary_size = Math.pow(10, Math.ceil(Math.log10((this.max_x - this.min_x) / (this.size.x - 2) * 10)));
            primary_size = Math.max(100, primary_size);
            this.drawGrid(primary_size / 100);
            this.drawGrid(primary_size / 10);
            this.drawGrid(primary_size);
          }
        }, {
          key: "drawElement",
          value: function drawElement(pos, isProbe, isSelected, isChecked) {
            var ctx = this.root.ctx;
            var unit = this.root.unit;
            var x = this.pos.x + 1 + (pos.x - this.min_x) / (this.max_x - this.min_x) * (this.size.x - 2);
            var y = this.pos.y + 1 + (this.max_y - pos.y) / (this.max_y - this.min_y) * (this.size.y - 2);

            if (isSelected) {
              ctx.strokeStyle = _consts.colors.green[0];
              ctx.fillStyle = _consts.colors.green[0];
            } else {
              ctx.strokeStyle = _consts.colors.light[0];
              ctx.fillStyle = _consts.colors.light[0];
            }

            if (isProbe) {
              ctx.beginPath();
              ctx.moveTo((x + 0.7) * unit, y * unit);
              ctx.lineTo((x + 0.5) * unit, (y + 0.2) * unit);
              ctx.lineTo((x + 0.5) * unit, (y + 0.5) * unit);
              ctx.lineTo((x + 0.2) * unit, (y + 0.5) * unit);
              ctx.lineTo(x * unit, (y + 0.7) * unit);
              ctx.lineTo((x - 0.2) * unit, (y + 0.5) * unit);
              ctx.lineTo((x - 0.5) * unit, (y + 0.5) * unit);
              ctx.lineTo((x - 0.5) * unit, (y + 0.2) * unit);
              ctx.lineTo((x - 0.7) * unit, y * unit);
              ctx.lineTo((x - 0.5) * unit, (y - 0.2) * unit);
              ctx.lineTo((x - 0.5) * unit, (y - 0.5) * unit);
              ctx.lineTo((x - 0.2) * unit, (y - 0.5) * unit);
              ctx.lineTo(x * unit, (y - 0.7) * unit);
              ctx.lineTo((x + 0.2) * unit, (y - 0.5) * unit);
              ctx.lineTo((x + 0.5) * unit, (y - 0.5) * unit);
              ctx.lineTo((x + 0.5) * unit, (y - 0.2) * unit);
              ctx.closePath();
              ctx.stroke();
            } else {
              ctx.beginPath();
              ctx.arc(x * unit, y * unit, unit / 3, 0, 2 * Math.PI, false);
              ctx.stroke();
              if (isSelected) ctx.fill();

              if (isChecked) {
                ctx.beginPath();
                ctx.arc(x * unit, y * unit, unit / 2, 0, 2 * Math.PI, false);
                ctx.stroke();
              }
            }
          }
        }, {
          key: "drawProbe",
          value: function drawProbe() {
            this.drawElement(this.mission.probe.position, true, false, false);
          }
        }, {
          key: "drawTargets",
          value: function drawTargets() {
            var _this = this;

            this.mission.targets.positions.forEach(function (tgt, i) {
              _this.drawElement(tgt, false, i === _this.selected, _this.mission.targets.checked[i]);
            });
          }
        }, {
          key: "draw",
          value: function draw() {
            this.computeDimensions();
            this.drawFullGrids();
            this.drawProbe();
            this.drawTargets();
          }
        }, {
          key: "select",
          value: function select(idx) {
            this.selected = idx;
            this.draw();
          }
        }]);

        return P83Scope;
      }();

    exports.default = P83Scope;
  }, { "./consts.js": "consts.js" }],
  "splash.js": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _vector = _interopRequireDefault(require("./vector.js"));

    var _consts = require("./consts.js");

    var _display = require("./display.js");

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
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
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    var P83Splash =
      /*#__PURE__*/
      function () {
        function P83Splash(parent, pos, cb) {
          _classCallCheck(this, P83Splash);

          this.parent = parent;
          this.root = this.parent.root;
          this.pos = pos;
          this.size = new _vector.default(40, 7);
          this.callback = cb;
          this.text = "";
          this.menuItem = new _display.P83MenuItem(this, _vector.default.add(this.pos, new _vector.default(2, 4)), "OK", this.draw.bind(this), this.quit.bind(this));
        }

        _createClass(P83Splash, [{
          key: "setup",
          value: function setup(text) {
            this.text = text;
    }
        }, {
          key: "draw",
          value: function draw() {
            var ctx = this.root.ctx;
            var unit = this.root.unit;
            ctx.fillStyle = "#000000";
            ctx.strokeStyle = _consts.colors.light[0];
            ctx.shadowBlur = unit;
            ctx.fillRect(this.pos.x * unit, this.pos.y * unit, this.size.x * unit, this.size.y * unit);
            ctx.strokeRect(this.pos.x * unit, this.pos.y * unit, this.size.x * unit, this.size.y * unit); //

            ctx.shadowBlur = 0;
            ctx.fillStyle = _consts.colors.light[0];
            ctx.textAlign = "left";
            ctx.font = "" + Math.floor(unit * 0.8) + "px Liberation";
            ctx.textBaseline = "middle";
            ctx.fillText(this.text, (this.pos.x + 2) * unit, (this.pos.y + 2.5) * unit); //

            this.menuItem.draw();
          }
        }, {
          key: "onClick",
          value: function onClick(pos) {
            this.menuItem.onClick(pos);
          }
        }, {
          key: "quit",
          value: function quit() {
            this.menuItem.button.lit = false;
            this.callback();
          }
        }]);

        return P83Splash;
      }();

    exports.default = P83Splash;
  }, { "./vector.js": "vector.js", "./consts.js": "consts.js", "./display.js": "display.js" }],
  "controller.js": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _mission = _interopRequireDefault(require("./mission.js"));

    var _consts = require("./consts.js");

    var _panels = _interopRequireWildcard(require("./panels.js"));

    var _vector = _interopRequireDefault(require("./vector.js"));

    var _scope = _interopRequireDefault(require("./scope.js"));

    var _splash = _interopRequireDefault(require("./splash.js"));

    var _targets = require("./targets.js");

    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function") return null;
      var cache = new WeakMap();
      _getRequireWildcardCache = function () {
        return cache;
      };
      return cache;
    }

    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      if (obj != null) {
        var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
              Object.defineProperty(newObj, key, desc);
            } else {
              newObj[key] = obj[key];
            }
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
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
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    var P83Controller =
      /*#__PURE__*/
      function () {
        function P83Controller(parent, missionData, quit_cb) {
          _classCallCheck(this, P83Controller);

          this.parent = parent;
          this.root = this.parent.root;
          this.mission = new _mission.default(missionData.name, missionData.code, missionData.positions, missionData.diagonalAllowed, missionData.trackingAllowed, missionData.oxygen);
          this.quitCallback = quit_cb;
          this.thrustPanel = new _panels.P83ThrustPanel(this, _vector.default.zero, this.mission, this.move.bind(this));
          this.speedPanel = new _panels.P83XYPanel(this, new _vector.default(0, 14), "SPEED", this.mission.probe.speed);
          this.positionPanel = new _panels.P83XYPanel(this, new _vector.default(0, 21), "POSITION", this.mission.probe.position);
          this.scope = new _scope.default(this, new _vector.default(14, 0), new _vector.default(28, 28), this.mission);
          this.statusPanel = new _panels.default(this, new _vector.default(42, 0), this.mission);
          this.targetSelector = new _targets.P83TargetSelector(this, new _vector.default(42, 7), this.mission, this.scope.select.bind(this));
          this.sequencePanel = new _panels.P83SequencePanel(this, new _vector.default(0, 28), this.mission, this.move.bind(this));
          this.missionPanel = new _panels.P83MissionPanel(this, new _vector.default(42, 28), this.mission, this.quit.bind(this));
          this.splash = new _splash.default(this, new _vector.default(8, 16), this.quit.bind(this));
          this.children = [this.thrustPanel, this.speedPanel, this.positionPanel, this.scope, this.statusPanel, this.targetSelector, this.sequencePanel, this.missionPanel];
        }

        _createClass(P83Controller, [{
          key: "draw",
          value: function draw() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var child = _step.value;
                child.draw();
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          }
        }, {
          key: "move",
          value: function move(thrust) {
            if (this.mission.oxygenLevel === 0) return false;
            this.mission.move(thrust);

            if (this.mission.isSpeedOk) {
              this.statusPanel.trackingLED.blink(0);
              this.speedPanel.led.colors = _consts.colors.green;
            } else {
              this.statusPanel.trackingLED.blink(1);
              this.speedPanel.led.colors = _consts.colors.red;
              this.speedPanel.led.blink(1);
            }

            if (this.mission.oxygenLevel <= 0) {
              this.statusPanel.oxygenLED.blink(1);
            }

            this.draw();

            if (this.mission.isAchieved) {
              this.splash("Mission ".concat(this.mission.name, " achieved!!").toUpperCase());
              this.splash.draw();
            } else if (this.mission.oxygenLevel <= 0) {
              this.splash.setup("You ran out of oxygen before achieving mission ".concat(this.mission.name, "!").toUpperCase());
              this.splash.draw();
            }

            return true;
          }
        }, {
          key: "quit",
          value: function quit() {
            this.statusPanel.oxygenLED.blink(0);
            this.statusPanel.trackingLED.blink(0);
            this.speedPanel.led.blink(0);
            this.sequencePanel.sequenceInput.show(false);
            this.quitCallback(this.mission.isAchieved);
          }
        }, {
          key: "onClick",
          value: function onClick(pos) {
            if (this.mission.isAchieved || this.mission.oxygenLevel <= 0) {
              this.splash.onClick(pos);
            } else {
              this.thrustPanel.onClick(pos);
              this.targetSelector.onClick(pos);
              this.missionPanel.onClick(pos);
            }
          }
        }]);

        return P83Controller;
      }();

    exports.default = P83Controller;
  }, {
    "./mission.js": "mission.js",
    "./consts.js": "consts.js",
    "./panels.js": "panels.js",
    "./vector.js": "vector.js",
    "./scope.js": "scope.js",
    "./splash.js": "splash.js",
    "./targets.js": "targets.js"
  }],
  "game.js": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _controller = _interopRequireDefault(require("./controller.js"));

    var _vector = _interopRequireDefault(require("./vector.js"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
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
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    var P83Game =
      /*#__PURE__*/
      function () {
        function P83Game(canvasId, dataId) {
          var _this = this;

          _classCallCheck(this, P83Game);

          var data = JSON.parse(document.getElementById(dataId).innerText);
          console.log({
            data: data
          });
          this.root = this;
          this.canvas = document.getElementById(canvasId);
          this.ctx = this.canvas.getContext('2d');
          this.state = P83Game.GAME_STATE_MISSION;
          this.controller = new _controller.default(this, data, function (done) {
            if (!done) return;
            var headers = new Headers();
            headers.append("Content-Type", "application/json");
            fetch(window.location.pathname, {
              method: "POST",
              body: JSON.stringify({
                sequence: _this.controller.mission.sequence,
                user: data.user,
                level: data.level
              }),
              headers: headers
            }).then(function (r) {
              if (r.status === 200) window.location.pathname = "/"; else {
                _this.controller.splash.setup("Sequence has not been verified!");

                _this.controller.splash.draw();
              }
            }).catch(function (e) {
              _this.controller.splash.setup("Error: ".concat(e));

              _this.controller.splash.draw();
            });
          });
          this.resize();
          window.addEventListener("resize", this.resize.bind(this));
          this.canvas.addEventListener("click", function (e) {
            var x = e.pageX - _this.canvas.offsetLeft;
            var y = e.pageY - _this.canvas.offsetTop;

            _this.controller.onClick(new _vector.default(x, y));
          });
        }

        _createClass(P83Game, [{
          key: "draw",
          value: function draw() {
            this.ctx.fillStyle = "#000";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.controller.draw();
          }
        }, {
          key: "resize",
          value: function resize() {
            this.unit = Math.floor(Math.min(window.innerWidth / 56, window.innerHeight / 35));
            this.canvas.width = 56 * this.unit;
            this.canvas.height = 35 * this.unit;
            this.draw();
          }
        }]);

        return P83Game;
      }();

    exports.default = P83Game;
    P83Game.GAME_STATE_MAP = Symbol();
    P83Game.GAME_STATE_MISSION = Symbol();
  }, { "./controller.js": "controller.js", "./vector.js": "vector.js" }],
  "app.js": [function (require, module, exports) {
    "use strict";

    var _game = _interopRequireDefault(require("./game.js"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var music = document.getElementById("music");

    if (music) {
      music.volume = 0.01;
      music.play();
    }

    new _game.default("canvas", "data");
  }, { "./game.js": "game.js" }],
  "../../../../../../../.nvm/versions/node/v12.11.1/lib/node_modules/parcel/src/builtins/hmr-runtime.js": [function (require, module, exports) {
    var global = arguments[3];
    var OVERLAY_ID = '__parcel__error__overlay__';
    var OldModule = module.bundle.Module;

    function Module(moduleName) {
      OldModule.call(this, moduleName);
      this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function (fn) {
          this._acceptCallbacks.push(fn || function () {
          });
        },
        dispose: function (fn) {
          this._disposeCallbacks.push(fn);
        }
      };
      module.bundle.hotData = null;
    }

    module.bundle.Module = Module;
    var checkedAssets, assetsToAccept;
    var parent = module.bundle.parent;

    if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
      var hostname = "" || location.hostname;
      var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
      var ws = new WebSocket(protocol + '://' + hostname + ':' + "42929" + '/');

      ws.onmessage = function (event) {
        checkedAssets = {};
        assetsToAccept = [];
        var data = JSON.parse(event.data);

        if (data.type === 'update') {
          var handled = false;
          data.assets.forEach(function (asset) {
            if (!asset.isNew) {
              var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

              if (didAccept) {
                handled = true;
              }
            }
          }); // Enable HMR for CSS by default.

          handled = handled || data.assets.every(function (asset) {
            return asset.type === 'css' && asset.generated.js;
          });

          if (handled) {
            console.clear();
            data.assets.forEach(function (asset) {
              hmrApply(global.parcelRequire, asset);
            });
            assetsToAccept.forEach(function (v) {
              hmrAcceptRun(v[0], v[1]);
            });
          } else if (location.reload) {
            // `location` global exists in a web worker context but lacks `.reload()` function.
            location.reload();
          }
        }

        if (data.type === 'reload') {
          ws.close();

          ws.onclose = function () {
            location.reload();
          };
        }

        if (data.type === 'error-resolved') {
          console.log('[parcel] ✨ Error resolved');
          removeErrorOverlay();
        }

        if (data.type === 'error') {
          console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
          removeErrorOverlay();
          var overlay = createErrorOverlay(data);
          document.body.appendChild(overlay);
        }
      };
    }

    function removeErrorOverlay() {
      var overlay = document.getElementById(OVERLAY_ID);

      if (overlay) {
        overlay.remove();
      }
    }

    function createErrorOverlay(data) {
      var overlay = document.createElement('div');
      overlay.id = OVERLAY_ID; // html encode message and stack trace

      var message = document.createElement('div');
      var stackTrace = document.createElement('pre');
      message.innerText = data.error.message;
      stackTrace.innerText = data.error.stack;
      overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
      return overlay;
    }

    function getParents(bundle, id) {
      var modules = bundle.modules;

      if (!modules) {
        return [];
      }

      var parents = [];
      var k, d, dep;

      for (k in modules) {
        for (d in modules[k][1]) {
          dep = modules[k][1][d];

          if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
            parents.push(k);
          }
        }
      }

      if (bundle.parent) {
        parents = parents.concat(getParents(bundle.parent, id));
      }

      return parents;
    }

    function hmrApply(bundle, asset) {
      var modules = bundle.modules;

      if (!modules) {
        return;
      }

      if (modules[asset.id] || !bundle.parent) {
        var fn = new Function('require', 'module', 'exports', asset.generated.js);
        asset.isNew = !modules[asset.id];
        modules[asset.id] = [fn, asset.deps];
      } else if (bundle.parent) {
        hmrApply(bundle.parent, asset);
      }
    }

    function hmrAcceptCheck(bundle, id) {
      var modules = bundle.modules;

      if (!modules) {
        return;
      }

      if (!modules[id] && bundle.parent) {
        return hmrAcceptCheck(bundle.parent, id);
      }

      if (checkedAssets[id]) {
        return;
      }

      checkedAssets[id] = true;
      var cached = bundle.cache[id];
      assetsToAccept.push([bundle, id]);

      if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        return true;
      }

      return getParents(global.parcelRequire, id).some(function (id) {
        return hmrAcceptCheck(global.parcelRequire, id);
      });
    }

    function hmrAcceptRun(bundle, id) {
      var cached = bundle.cache[id];
      bundle.hotData = {};

      if (cached) {
        cached.hot.data = bundle.hotData;
      }

      if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
        cached.hot._disposeCallbacks.forEach(function (cb) {
          cb(bundle.hotData);
        });
      }

      delete bundle.cache[id];
      bundle(id);
      cached = bundle.cache[id];

      if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        cached.hot._acceptCallbacks.forEach(function (cb) {
          cb();
        });

        return true;
      }
    }
  }, {}]
}, {}, ["../../../../../../../.nvm/versions/node/v12.11.1/lib/node_modules/parcel/src/builtins/hmr-runtime.js", "app.js"], null);
//# sourceMappingURL=/app.js.map
