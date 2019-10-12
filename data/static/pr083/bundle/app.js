parcelRequire = function (e, r, t, n) {
  var i, o = "function" == typeof parcelRequire && parcelRequire, u = "function" == typeof require && require;

  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = "function" == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && "string" == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw c.code = "MODULE_NOT_FOUND", c
      }
      p.resolve = function (r) {
        return e[t][1][r] || r
      }, p.cache = {};
      var l = r[t] = new f.Module(t);
      e[t][0].call(l.exports, p, l, l.exports, this)
    }
    return r[t].exports;

    function p(e) {
      return f(p.resolve(e))
    }
  }

  f.isParcelRequire = !0, f.Module = function (e) {
    this.id = e, this.bundle = f, this.exports = {}
  }, f.modules = e, f.cache = r, f.parent = o, f.register = function (r, t) {
    e[r] = [function (e, r) {
      r.exports = t
    }, {}]
  };
  for (var c = 0; c < t.length; c++) try {
    f(t[c])
  } catch (e) {
    i || (i = e)
  }
  if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () {
      return l
    }) : n && (this[n] = l)
  }
  if (parcelRequire = f, i) throw i;
  return f
}({
  "ji7c": [function (require, module, exports) {
    "use strict";

    function e(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function t(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
      }
    }

    function n(e, n, r) {
      return n && t(e.prototype, n), r && t(e, r), e
    }

    Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = void 0;
    var r = function () {
      function t(n, r) {
        e(this, t), this.x = n, this.y = r
      }

      return n(t, null, [{
        key: "add", value: function (e, n) {
          return new t(e.x + n.x, e.y + n.y)
        }
      }]), n(t, [{
        key: "equal", value: function (e) {
          return this.x === e.x && this.y === e.y
        }
      }, {
        key: "set", value: function (e, t) {
          this.x = e, this.y = t
        }
      }, {
        key: "add", value: function (e) {
          this.x += e.x, this.y += e.y
        }
      }, {
        key: "copy", value: function () {
          return new t(this.x, this.y)
        }
      }, {
        key: "toString", value: function () {
          return "P83Vector(".concat(this.x, ", ").concat(this.y, ")")
        }
      }]), t
    }();
    exports.default = r, r.zero = new r(0, 0);
  }, {}],
  "l3Vy": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = void 0;
    var e = t(require("./vector.js"));

    function t(e) {
      return e && e.__esModule ? e : { default: e }
    }

    function n(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
      }
    }

    function r(e, t, n) {
      return t && o(e.prototype, t), n && o(e, n), e
    }

    var i = function () {
      function t() {
        n(this, t), this.position = new e.default(0, 0), this.speed = new e.default(0, 0)
      }

      return r(t, [{
        key: "accelerate", value: function (t) {
          var n = new e.default((t - 1) % 3 - 1, Math.floor((t - 1) / 3) - 1);
          this.speed.add(n), this.position.add(this.speed)
        }
      }, {
        key: "isMotionless", value: function () {
          return this.speed.equal(e.default.zero)
        }
      }, {
        key: "toString", value: function () {
          return "SPEED: ".concat(this.speed.toString(), "\nPOSITION: ").concat(this.position.toString())
        }
      }]), t
    }();
    exports.default = i;
  }, { "./vector.js": "ji7c" }],
  "E8WP": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 }), exports.colors = void 0;
    var f = {
      red: ["#ff0000", "#ff8080", "#100000"],
      green: ["#00ff00", "#80ff80", "#001000"],
      light: ["#80ff80", "#80ff80", "#001000"],
      blue: ["#0000ff", "#8080ff", "#000010"]
    };
    exports.colors = f;
  }, {}],
  "Dcy0": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 }), exports.P83Number = exports.P83Input = exports.P83Display = exports.P83MenuItem = exports.P83Button = exports.P83LED = exports.P83Title = void 0;
    var t = require("./consts.js"), i = s(require("./vector.js"));

    function s(t) {
      return t && t.__esModule ? t : { default: t }
    }

    function e(t, i) {
      if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, i) {
      for (var s = 0; s < i.length; s++) {
        var e = i[s];
        e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(t, e.key, e)
      }
    }

    function h(t, i, s) {
      return i && o(t.prototype, i), s && o(t, s), t
    }

    var n = function () {
      function i(t, s, o, h) {
        e(this, i), this.parent = t, this.root = this.parent.root, this.pos = s, this.size = o, this.title = h
      }

      return h(i, [{
        key: "draw", value: function () {
          var i = this.root.ctx, s = this.root.unit, e = i.measureText(this.title).width;
          i.fillStyle = t.colors.light[0], i.shadowBlur = 0, i.font = Math.floor(.8 * s) + "px Liberation", i.textAlign = "left", i.textBaseline = "middle", i.fillText(this.title, (this.pos.x + 2) * s, (this.pos.y + 1) * s), i.lineWidth = 2, i.strokeStyle = t.colors.light[0], i.beginPath(), i.moveTo((this.pos.x + 1.5) * s, (this.pos.y + 1) * s), i.lineTo((this.pos.x + 1) * s, (this.pos.y + 1) * s), i.lineTo((this.pos.x + 1) * s, (this.pos.y + 2) * s), i.stroke(), i.beginPath(), i.moveTo((this.pos.x + 2.5) * s + e, (this.pos.y + 1) * s), i.lineTo((this.pos.x + this.size.x - 1) * s, (this.pos.y + 1) * s), i.lineTo((this.pos.x + this.size.x - 1) * s, (this.pos.y + 2) * s), i.stroke(), i.beginPath(), i.moveTo((this.pos.x + 1) * s, (this.pos.y + this.size.y - 2) * s), i.lineTo((this.pos.x + 1) * s, (this.pos.y + this.size.y - 1) * s), i.lineTo((this.pos.x + this.size.x - 1) * s, (this.pos.y + this.size.y - 1) * s), i.lineTo((this.pos.x + this.size.x - 1) * s, (this.pos.y + this.size.y - 2) * s), i.stroke()
        }
      }]), i
    }();
    exports.P83Title = n;
    var l = function () {
      function i(s, o) {
        e(this, i), this.parent = s, this.root = this.parent.root, this.pos = o, this.lit = !0, this.blinking = !1, this.nbTimeouts = 0, this.colors = t.colors.green
      }

      return h(i, [{
        key: "draw", value: function () {
          var t = this.root.ctx, i = this.root.unit;
          this.lit ? (t.fillStyle = this.colors[0], t.strokeStyle = this.colors[0], t.shadowBlur = i, t.shadowColor = this.colors[1]) : (t.strokeStyle = "#101010", t.fillStyle = this.colors[2], t.shadowBlur = 0), t.beginPath(), t.arc(i * this.pos.x, i * this.pos.y, i / 3, 0, 2 * Math.PI), t.stroke(), t.fill()
        }
      }, {
        key: "blink", value: function (t) {
          var i = this;
          if (this.blinking) switch (t) {
            case 0:
              this.lit = !0, this.parent.draw();
              break;
            case 1:
              0 === this.nbTimeouts && (this.nbTimeouts = 1, setTimeout(function () {
                return i.blink(2)
              }));
              break;
            case 2:
              if (this.nbTimeouts--, this.nbTimeouts > 0) return;
              this.lit = !this.lit, this.parent.draw(), this.lit && (document.getElementById("blip").volume = .01, document.getElementById("blip").play()), this.nbTimeouts = 1, setTimeout(function () {
                return i.blink(2)
              }, 300)
          }
        }
      }]), i
    }();
    exports.P83LED = l;
    var r = function () {
      function i(t, s, o, h, n, l) {
        e(this, i), this.root = t.root, this.pos = s, this.size = o, this.text = h, this.on = n, this.off = l, this.active = !0, this.lit = !1
      }

      return h(i, [{
        key: "draw", value: function () {
          var i = this.root.ctx, s = this.root.unit, e = t.colors.light;
          this.active ? (this.lit && (e = t.colors.green), i.shadowBlur = s / 2, i.fillStyle = e[2], i.strokeStyle = e[0], i.shadowColor = e[1]) : (i.strokeStyle = "#101010", i.fillStyle = e[2], i.shadowBlur = 0), i.fillRect(this.pos.x * s, this.pos.y * s, this.size.x * s, this.size.y * s), i.strokeRect(this.pos.x * s, this.pos.y * s, this.size.x * s, this.size.y * s), i.fillStyle = "#000000", this.is_active && (i.fillStyle = this.colors[0], i.shadowBlur = s / 4, i.shadowColor = this.colors[1]), i.font = Math.floor(5 / 4 * s) + "px Segment7", i.textAlign = "center", i.textBaseline = "top", i.fillText(this.text, (this.pos.x + this.size.x / 2) * s, (this.pos.y + .5) * s)
        }
      }, {
        key: "onClick", value: function (t) {
          if (this.active && !this.lit) {
            var i = this.root.unit, s = t.x - this.pos.x * i, e = t.y - this.pos.y * i;
            this.lit = s >= 0 && s <= this.size.x * i && e >= 0 && e <= this.size.y * i, this.lit && (document.getElementById("click").volume = .1, document.getElementById("click").play(), setTimeout(this.off.bind(this), 200), this.on.call(this))
          }
        }
      }]), i
    }();
    exports.P83Button = r;
    var u = function () {
      function s(t, o, h, n, l) {
        e(this, s), this.root = t.root, this.pos = o, this.text = h, this.button = new r(this, o, new i.default(1, 1), n, l)
      }

      return h(s, [{
        key: "draw", value: function () {
          var i = this.root.ctx, s = this.root.unit;
          i.fillStyle = t.colors.light[0], i.shadowBlur = 0, i.textAlign = "left", i.font = "".concat(Math.floor(.8 * s), "px Liberation"), i.textBaseline = "middle", i.fillText(this.text, (this.pos.x + 2) * s, (this.pos.y + .5) * s), this.button.draw()
        }
      }, {
        key: "onClick", value: function (t) {
          this.button.onClick(t)
        }
      }]), s
    }();
    exports.P83MenuItem = u;
    var a = function () {
      function i(s, o, h) {
        e(this, i), this.parent = s, this.root = this.parent.root, this.pos = o, this.size = h, this.value = "", this.colors = t.colors.green
      }

      return h(i, [{
        key: "draw", value: function () {
          var t = this.root.ctx, i = this.root.unit;
          t.shadowBlur = 0, t.fillStyle = this.colors[2], t.strokeStyle = "#101010", t.fillRect(this.pos.x * i, this.pos.y * i, (.71 * this.size + .5) * i, 2 * i), t.strokeRect(this.pos.x * i, this.pos.y * i, (.71 * this.size + .5) * i, 2 * i), t.fillStyle = this.colors[0], t.shadowBlur = i / 4, t.shadowColor = this.colors[1], t.font = "".concat(Math.floor(5 / 4 * i), "px Segment7"), t.textAlign = "left", t.textBaseline = "top";
          var s = this.value;
          s.length > this.size && (s = this.value.substring(s.length - this.size, s.length)), t.fillText(s, (this.pos.x + .25) * i, (y + .5) * i)
        }
      }]), i
    }();
    exports.P83Display = a;
    var p = function () {
      function i(s, o, h, n, l) {
        e(this, i), this.parent = s, this.root = this.parent.root, this.pos = o, this.size = h, this.callback = l, this.colors = t.colors.green, this.input = document.getElementById(n), this.input.value = "", this.input.addEventListener("input", this.onInput.bind(this)), this.input.addEventListener("keyup", this.onKeyup.bind(this)), this.authorizedChars = "", this.popping = !1
      }

      return h(i, [{
        key: "draw", value: function () {
          var i = this.root.canvas, s = this.root.unit;
          this.input.style.left = i.offsetLeft + this.pos.x * s + "px", this.input.style.top = i.offsetTop + this.pos.y * s + "px", this.input.style.width = Math.floor((.71 * this.size + .5) * s) - 2 + "px", this.input.style.height = 2 * s - 2 + "px", this.input.style.backgroundColor = t.colors.green[2], this.input.style.font = Math.floor(5 / 4 * s) + "px Segment7", this.input.style.color = t.colors.green[0], this.input.style.textShadow = "0 0 " + Math.floor(s / 4) + "px " + t.colors.green[1], this.input.style.border = "1px solid #101010"
        }
      }, {
        key: "setup", value: function (t) {
          this.input.value = "", this.authorizedChars = t
        }
      }, {
        key: "onInput", value: function () {
          var t = "", i = !0, s = !1, e = void 0;
          try {
            for (var o, h = this.input.value[Symbol.iterator](); !(i = (o = h.next()).done); i = !0) {
              var n = o.value;
              this.authorizedChars.indexOf(n) >= 0 && (t += n)
            }
          } catch (l) {
            s = !0, e = l
          } finally {
            try {
              i || null == h.return || h.return()
            } finally {
              if (s) throw e
            }
          }
          this.input.value = t
        }
      }, {
        key: "onKeyup", value: function (t) {
          "Enter" === t.key && (this.popping || this.pop())
        }
      }, {
        key: "pop", value: function () {
          this.popping = !1, 0 !== this.input.value.length && this.callback(parseInt(this.input.value[0])) && (this.input.value = this.input.value.slice(1), this.popping = !0, setTimeout(this.pop.bind(this), 100))
        }
      }, {
        key: "show", value: function (t) {
          t ? (this.input.style.visibility = "visible", this.input.style.zIndex = "1") : (this.input.style.visibility = "hidden", this.input.style.zIndex = "-1")
        }
      }]), i
    }();
    exports.P83Input = p;
    var c = function () {
      function t(i, s, o) {
        e(this, t), this.parent = i, this.root = this.parent.root, this.size = o, this.value = NaN, this.display = new a(this, s, o)
      }

      return h(t, [{
        key: "draw", value: function () {
          var t = " ", i = "", s = this.value;
          if (isNaN(s)) this.display.value = ":-("; else {
            s < 0 && (t = "-", s *= -1);
            for (var e = 1; e < this.size; e++) i = "".concat(s % 10).concat(i), s = Math.floor(s / 10);
            this.display.value = t + i
          }
          this.display.draw()
        }
      }]), t
    }();
    exports.P83Number = c;
  }, { "./consts.js": "E8WP", "./vector.js": "ji7c" }],
  "aUdC": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 }), exports.P83TargetSelector = exports.P83Targets = void 0;
    var t = n(require("./vector.js")), e = require("./display.js"), i = require("./consts.js");

    function n(t) {
      return t && t.__esModule ? t : { default: t }
    }

    function r(t, e) {
      return a(t) || o(t, e) || s()
    }

    function s() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }

    function o(t, e) {
      if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) {
        var i = [], n = !0, r = !1, s = void 0;
        try {
          for (var o, a = t[Symbol.iterator](); !(n = (o = a.next()).done) && (i.push(o.value), !e || i.length !== e); n = !0) ;
        } catch (h) {
          r = !0, s = h
        } finally {
          try {
            n || null == a.return || a.return()
          } finally {
            if (r) throw s
          }
        }
        return i
      }
    }

    function a(t) {
      if (Array.isArray(t)) return t
    }

    function h(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function l(t, e) {
      for (var i = 0; i < e.length; i++) {
        var n = e[i];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
      }
    }

    function u(t, e, i) {
      return e && l(t.prototype, e), i && l(t, i), t
    }

    var c = function () {
      function e(i, n) {
        h(this, e), this.positions = [], this.checked = [];
        for (var r = 0; r < i.length; r += 2) this.positions.push(new t.default(i[r], i[r + 1])), this.checked.push(!1);
        this.isTrackingOk = n
      }

      return u(e, [{
        key: "check", value: function (t) {
          for (var i = e.CHECK_STATE_POSITION, n = 0; n < this.positions.length; n++) {
            this.positions[n].equal(t.position()) && (this.isTrackingOk || t.isMotionless()) && (i = e.CHECK_STATE_BOTH, this.checked[n] || (this.checked[n] = !0))
          }
          return i
        }
      }, {
        key: "checkAll", value: function () {
          return this.nbChecked === this.checked.length
        }
      }, {
        key: "targetsString", value: function () {
          var t = "A".charCodeAt(0);
          return this.positions.map(function (e, i) {
            return " ".concat(String.fromCharCode(t + i), ": (").concat(e.toString(), ")")
          }).join("\n")
        }
      }, {
        key: "checkedString", value: function () {
          var t = "A".charCodeAt(0);
          return this.checked.map(function (t, e) {
            return [t, e]
          }).filter(function (t) {
            var e = r(t, 2), i = e[0];
            e[1];
            return i
          }).map(function (e) {
            var i = r(e, 2), n = (i[0], i[1]);
            return String.fromCharCode(t + n)
          }).join(" ")
        }
      }, {
        key: "nbChecked", get: function () {
          return this.checked.filter(Boolean).length
        }
      }]), e
    }();
    exports.P83Targets = c, c.CHECK_STATE_POSITION = Symbol(), c.CHECK_STATE_BOTH = Symbol(), c.CHECK_STATE_NONE = Symbol();
    var f = function () {
      function n(i, r, s, o) {
        h(this, n), this.parent = i, this.root = this.parent.root, this.pos = r, this.size = new t.default(14, 21), this.mission = s, this.callback = o, this.title = new e.P83Title(this, this.pos, this.size, "TARGET SELECTOR"), this.led = new e.P83LED(this, t.default.add(this.pos, new t.default(2.5, 17.5)), 8), this.numX = new e.P83Number(this, t.default.add(this.pos, new t.default(6, 15.5)), 8), this.numY = new e.P83Number(this, t.default.add(this.pos, new t.default(6, 17.5)), 8), this.buttons = [];
        for (var a = 0; a < 20; a++) this.buttons.push(new e.P83Button(this, t.default.add(this.pos, new t.default(2 + 8 / 3 * (a % 4), 2 + 8 / 3 * Math.floor(a / 4))), new t.default(2, 2), String.fromCharCode("A".charCodeAt(0) + a), this.select.bind(this, a), function () {
        }))
      }

      return u(n, [{
        key: "draw", value: function () {
          var t = this.root.ctx, e = this.root.unit;
          t.fillStyle = "#000000", t.shadowBlur = 0, t.fillRect(this.x * e, this.y * e, this.w * e, this.h * e), this.title.draw();
          for (var n = 0; n < this.buttons.length; n++) this.buttons[n].draw();
          this.led.draw(), t.fillStyle = i.colors.light[0], t.shadowBlur = 0, t.textAlign = "left", t.font = Math.floor(.8 * e) + "px Liberation", t.textBaseline = "middle", t.fillText("X", (this.x + 4) * e, (this.y + 16.5) * e), t.fillText("Y", (this.x + 4) * e, (this.y + 18.5) * e), this.numX.draw(), this.numY.draw()
        }
      }, {
        key: "select", value: function (t) {
          for (var e = 0; e < this.mission.nbTargets; e++) this.buttons[e].lit = e === t;
          this.selected = t, this.callback(t), this.numX.value = this.mission.targets.positions[t].x, this.numY.value = this.mission.targets.positions[t].y, this.draw()
        }
      }, {
        key: "onClick", value: function (t) {
          var e = !0, i = !1, n = void 0;
          try {
            for (var r, s = this.buttons[Symbol.iterator](); !(e = (r = s.next()).done); e = !0) {
              r.value.onClick(t)
            }
          } catch (o) {
            i = !0, n = o
          } finally {
            try {
              e || null == s.return || s.return()
            } finally {
              if (i) throw n
            }
          }
        }
      }]), n
    }();
    exports.P83TargetSelector = f;
  }, { "./vector.js": "ji7c", "./display.js": "Dcy0", "./consts.js": "E8WP" }],
  "UGYH": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = void 0;
    var e = n(require("./probe.js")), t = require("./targets.js");

    function n(e) {
      return e && e.__esModule ? e : { default: e }
    }

    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function s(e, t) {
      for (var n = 0; n < t.length; n++) {
        var i = t[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
      }
    }

    function r(e, t, n) {
      return t && s(e.prototype, t), n && s(e, n), e
    }

    var o = function () {
      function n(s, r, o, a, c, h) {
        i(this, n), this.name = s, this.code = r, this.probe = new e.default, this.targets = new t.P83Targets(o, c), this.diagonalAllowed = a, this.trackingAllowed = c, this.oxygenStartLevel = h, this.sequence = "", this.isSpeedOk = !0, this.isAchieved = !1
      }

      return r(n, [{
        key: "move", value: function (e) {
          if (!(e < 1 || e > 9)) switch (this.sequence += e.toFixed(), this.probe.accelerate(e), this.targets.check(this.probe)) {
            case Targets.CHECK_STATE_POSITION:
              this.isSpeedOk = !1;
              break;
            case Targets.CHECK_STATE_BOTH:
              this.isSpeedOk = !0, this.targets.checkAll() && (this.isAchieved = !0)
          }
        }
      }, {
        key: "toString", value: function () {
          return a("MISSION: ".concat(this.name, "\n    TELEPORTATION CODE: ").concat(this.code, "\n    *** DESCRIPTION ***\n    TARGETS:\n    ").concat(this.targets.targetsString(), "\n    DIAGONAL THRUST: ").concat(this.diagonalAllowed ? "YES" : "NO", "\n    TRACKING DEVICE: ").concat(this.trackingAllowed ? "YES" : "NO", "\n    OXYGEN AT DEPARTURE: ").concat(this.oxygenStartLevel, "\n    \n    *** CURRENT STATUS ***\n    ").concat(0 === this.sequence.length ? "" : "SEQUENCE: ".concat(this.sequence), "\n    PROBE:\n    ").concat(this.probe.toString(), "\n    VALIDATED TARGETS: ").concat(0 === this.nbTargets ? "NONE" : this.targets.checkedString(), "\n    REMAINING OXYGEN: ").concat(this.oxygenLevel))
        }
      }, {
        key: "oxygenLevel", get: function () {
          return this.oxygenStartLevel - this.sequence.length
        }
      }, {
        key: "nbTargets", get: function () {
          return this.targets.positions.length
        }
      }]), n
    }();

    function a(e) {
      return e.split("\n").map(function (e) {
        return e.trim()
      }).join("\n")
    }

    exports.default = o;
  }, { "./probe.js": "l3Vy", "./targets.js": "aUdC" }],
  "eVqE": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 }), exports.P83MissionPanel = exports.P83SequencePanel = exports.P83ThrustPanel = exports.default = exports.P83XYPanel = void 0;
    var t = e(require("./vector.js")), i = require("./display.js"), s = require("./consts.js");

    function e(t) {
      return t && t.__esModule ? t : { default: t }
    }

    function o(t, i) {
      if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function")
    }

    function n(t, i) {
      for (var s = 0; s < i.length; s++) {
        var e = i[s];
        e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(t, e.key, e)
      }
    }

    function a(t, i, s) {
      return i && n(t.prototype, i), s && n(t, s), t
    }

    var l = function () {
      function e(s, n, a, l) {
        o(this, e), this.parent = s, this.root = this.parent.root, this.pos = n, this.size = new t.default(14, 7), this.title = new i.P83Title(this, this.pos, this.size, a), this.vector = l, this.led = new i.P83LED(this, this.pos, this.size, a), this.numX = new i.P83Number(this, t.default.add(this.pos, new t.default(6, 1.5)), 8), this.numY = new i.P83Number(this, t.default.add(this.pos, new t.default(6, 3.5)), 8)
      }

      return a(e, [{
        key: "draw", value: function () {
          var t = this.root.ctx, i = this.root.unit;
          t.fillStyle = "#000000", t.shadowBlur = 0, t.fillRect(this.pos.x * i, this.pos.y * i, this.size.x * i, this.size.y * i), this.title.draw(), this.diod.draw(), t.fillStyle = s.colors.light[0], t.shadowBlur = 0, t.textAlign = "left", t.font = Math.floor(.8 * i) + "px Liberation", t.textBaseline = "middle", t.fillText("X", (this.pos.x + 4) * i, (this.pos.y + 2.5) * i), t.fillText("Y", (this.pos.x + 4) * i, (this.pos.y + 4.5) * i), this.numX.value = this.vector.x, this.numY.value = this.vector.y, this.numX.draw(), this.numY.draw()
        }
      }]), e
    }();
    exports.P83XYPanel = l;
    var h = function () {
      function e(s, n, a) {
        o(this, e), this.parent = s, this.root = this.parent.root, this.pos = n, this.size = new t.default(14, 7), this.mission = a, this.title = new i.P83Title(this, this.pos, this.size, "STATUS"), this.oxygenLED = new i.P83LED(this, new t.default(this.pos.x + 2.5, this.pos.y + 2.5)), this.oxygenNum = new i.P83Number(this, new t.default(this.pos.x + 8, this.pos.y + 1.5), 5), this.trackingLED = new i.P83LED(this, new t.default(this.pos.x + 2.5, this.pos.y + 4.5))
      }

      return a(e, [{
        key: "draw", value: function () {
          var t = this.root.ctx, i = this.root.unit;
          t.fillStyle = "#000000", t.shadowBlur = 0, t.fillRect(this.pos.x * i, this.pos.y * i, this.size.x * i, this.size.y * i), this.title.draw(), t.fillStyle = s.colors.light[0], t.shadowBlur = 0, t.textAlign = "left", t.font = Math.floor(.8 * i) + "px Liberation", t.textBaseline = "middle", t.fillText("OXYGEN", (this.pos.x + 4) * i, (this.pos.y + 2.5) * i), t.fillText("TRACKING DEVICE", (this.pos.x + 4) * i, (this.pos.y + 4.5) * i), this.mission.oxygenLevel > 1 ? this.oxygenLED.colors = s.colors.green : this.oxygenLED.colors = s.colors.red, this.oxygenNum.value = this.mission.oxygenLevel, this.mission.trackingAllowed ? this.trackingLED.colors = s.colors.green : this.trackingLED.colors = s.colors.red, this.oxygenNum.draw(), this.oxygenLED.draw(), this.trackingLED.draw()
        }
      }]), e
    }();
    exports.default = h;
    var r = function () {
      function e(s, n, a, l) {
        o(this, e), this.parent = s, this.root = this.parent.root, this.pos = n, this.size = new t.default(14, 14), this.mission = a, this.move_callback = l, this.title = new i.P83Title(this, this.pos, this.size, "THRUST"), this.diagonalAllowed = !0, this.buttons = [];
        for (var h = 0; h < 9; h++) {
          var r = this.pos.copy();
          r.add(3.5 + h % 3 * 2.5, 8.5 - 2.5 * Math.floor(h / 3));
          var u = new t.default(2, 2);
          this.buttons.push(new i.P83Button(this, r, u, "".concat(h + 1), this.move_callback.bind(this, h + 1)))
        }
        if (this.mission.diagonalAllowed) {
          var d = !0, f = !1, w = void 0;
          try {
            for (var p, c = this.buttons[Symbol.iterator](); !(d = (p = c.next()).done); d = !0) {
              p.value.active = !0
            }
          } catch (x) {
            f = !0, w = x
          } finally {
            try {
              d || null == c.return || c.return()
            } finally {
              if (f) throw w
            }
          }
        } else for (var y = 0; y < 9; y++) this.buttons[y].active = 4 !== y && y % 2 == 0
      }

      return a(e, [{
        key: "clear", value: function () {
          var t = !0, i = !1, s = void 0;
          try {
            for (var e, o = this.buttons[Symbol.iterator](); !(t = (e = o.next()).done); t = !0) {
              e.value.lit = !1
            }
          } catch (n) {
            i = !0, s = n
          } finally {
            try {
              t || null == o.return || o.return()
            } finally {
              if (i) throw s
            }
          }
          this.draw()
        }
      }, {
        key: "drawArrow", value: function (t, i, e) {
          var o = this.root.ctx, n = this.root.unit;
          o.strokeStyle = s.colors.light[0], o.shadowBlur = 0, o.beginPath(), o.moveTo(t.x * n, t.y * n), o.lineTo(i.x * n, i.y * n), o.lineTo(e.x * n, e.y * n), o.stroke()
        }
      }, {
        key: "draw", value: function () {
          var i = this.root.ctx, s = this.root.unit;
          i.fillStyle = "#000000", i.shadowBlur = 0, i.fillRect(this.pos.x * s, this.pos.y * s, this.size.x * s, this.size.y * s), this.title.draw();
          for (var e = 0; e < this.buttons.length; e++) this.buttons[e].draw();
          this.drawArrow(t.default.add(this.pos, new t.default(3, 9.5)), t.default.add(this.pos, new t.default(3, 11)), t.default.add(this.pos, new t.default(4.5, 11))), this.drawArrow(t.default.add(this.pos, new t.default(6, 11)), t.default.add(this.pos, new t.default(7, 12)), t.default.add(this.pos, new t.default(8, 11))), this.drawArrow(t.default.add(this.pos, new t.default(11, 9.5)), t.default.add(this.pos, new t.default(11, 11)), t.default.add(this.pos, new t.default(9.5, 11))), this.drawArrow(t.default.add(this.pos, new t.default(11, 6)), t.default.add(this.pos, new t.default(12, 7)), t.default.add(this.pos, new t.default(11, 8))), this.drawArrow(t.default.add(this.pos, new t.default(11, 4.5)), t.default.add(this.pos, new t.default(11, 3)), t.default.add(this.pos, new t.default(9.5, 3))), this.drawArrow(t.default.add(this.pos, new t.default(6, 3)), t.default.add(this.pos, new t.default(7, 2)), t.default.add(this.pos, new t.default(8, 3))), this.drawArrow(t.default.add(this.pos, new t.default(3, 4.5)), t.default.add(this.pos, new t.default(3, 3)), t.default.add(this.pos, new t.default(4.5, 3))), this.drawArrow(t.default.add(this.pos, new t.default(3, 6)), t.default.add(this.pos, new t.default(2, 7)), t.default.add(this.pos, new t.default(3, 8)))
        }
      }, {
        key: "onClick", value: function (t) {
          var i = !0, s = !1, e = void 0;
          try {
            for (var o, n = this.buttons[Symbol.iterator](); !(i = (o = n.next()).done); i = !0) {
              o.value.onClick(t)
            }
          } catch (a) {
            s = !0, e = a
          } finally {
            try {
              i || null == n.return || n.return()
            } finally {
              if (s) throw e
            }
          }
        }
      }]), e
    }();
    exports.P83ThrustPanel = r;
    var u = function () {
      function e(s, n, a, l) {
        o(this, e), this.parent = s, this.root = this.parent.root, this.mission = a, this.pos = n, this.size = new t.default(42, 7), this.title = new i.P83Title(this, this.pos, this.size, "THRUST SEQUENCE"), this.sequence = new i.P83Display(this, t.default.add(this.pos, new t.default(9.75, 1.5)), 42), this.sequenceInput = new i.P83Input(this, t.default.add(this.pos, new t.default(9.75, 3.5)), 42, "input", l), this.mission.diagonalAllowed ? this.sequenceInput.setup("123456789") : this.sequenceInput.setup("24568")
      }

      return a(e, [{
        key: "draw", value: function () {
          var t = this.root.ctx, i = this.root.unit;
          this.sequenceInput.show(!0), t.fillStyle = "#000000", t.shadowBlur = 0, t.fillRect(this.pos.x * i, this.pos.y * i, this.size.x * i, this.size.y * i), this.title.draw(), t.fillStyle = s.colors.light[0], t.shadowBlur = 0, t.textAlign = "left", t.font = Math.floor(.8 * i) + "px Liberation", t.textBaseline = "middle", t.fillText("SEQUENCE", (this.pos.x + 2) * i, (this.pos.y + 2.5) * i), t.fillText("KEYBOARD INPUT", (this.pos.x + 2) * i, (this.pos.y + 4.5) * i), this.sequence.value = this.mission.sequence, this.sequence.draw(), this.sequenceInput.draw()
        }
      }]), e
    }();
    exports.P83SequencePanel = u;
    var d = function () {
      function s(e, n, a, l) {
        o(this, s), this.parent = e, this.root = this.parent.root, this.pos = n, this.size = new t.default(14, 7), this.mission = a, this.quitCallback = l, this.title = new i.P83Title(this, this.pos, this.size, "MISSION"), this.printMenuItem = new i.P83MenuItem(this, t.default.add(this.pos, new t.default(2, 2)), "PRINT", this.draw.bind(this), this.print.bind(this)), this.quitMenuItem = new i.P83MenuItem(this, t.default.add(this.pos, new t.default(2, 4)), "QUIT", this.draw.bind(this), this.quit.bind(this))
      }

      return a(s, [{
        key: "print", value: function () {
          this.printMenuItem.lit = !1, this.draw(), window.open("data:text," + encodeURI(this.mission.toString()), "_blank")
        }
      }, {
        key: "draw", value: function () {
          var t = this.root.ctx, i = this.root.unit;
          t.fillStyle = "#000", t.shadowBlur = 0, t.fillRect(this.pos.x * i, this.pos.y * i, this.size.x * i, this.size.y * i), this.title.draw(), this.printMenuItem.draw(), this.quitMenuItem.draw()
        }
      }, {
        key: "onClick", value: function (t) {
          this.printMenuItem.onClick(t), this.quitMenuItem.onClick(t)
        }
      }, {
        key: "quit", value: function () {
          this.quitMenuItem.lit = !1, this.draw(), this.quitCallback()
        }
      }]), s
    }();
    exports.P83MissionPanel = d;
  }, { "./vector.js": "ji7c", "./display.js": "Dcy0", "./consts.js": "E8WP" }],
  "oeM6": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = void 0;
    var t = require("./consts.js");

    function i(t) {
      return o(t) || e(t) || s()
    }

    function s() {
      throw new TypeError("Invalid attempt to spread non-iterable instance")
    }

    function e(t) {
      if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t)
    }

    function o(t) {
      if (Array.isArray(t)) {
        for (var i = 0, s = new Array(t.length); i < t.length; i++) s[i] = t[i];
        return s
      }
    }

    function n(t, i) {
      if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function")
    }

    function r(t, i) {
      for (var s = 0; s < i.length; s++) {
        var e = i[s];
        e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(t, e.key, e)
      }
    }

    function h(t, i, s) {
      return i && r(t.prototype, i), s && r(t, s), t
    }

    var a = function () {
      function s(i, e, o, r) {
        n(this, s), this.parent = i, this.root = this.parent.root, this.pos = e, this.size = o, this.mission = r, this.selected = 0, this.colors = t.colors.light
      }

      return h(s, [{
        key: "computeDimensions", value: function () {
          var t = [].concat(i(this.mission.targets.map(function (t) {
            return t.position
          })), [this.mission.probe.position]), s = t.map(function (t) {
            return t.x
          });
          this.min_x = Math.min.apply(Math, i(s)), this.max_x = Math.max.apply(Math, i(s));
          var e = t.map(function (t) {
            return t.y
          });
          this.min_y = Math.min.apply(Math, i(e)), this.max_y = Math.max.apply(Math, i(e));
          var o = Math.max(1, (this.max_x - this.min_x) / (this.size.x - 4), (this.max_y - this.min_y) / (this.size.y - 4)),
            n = (this.max_x + this.min_x) / 2, r = (this.max_y + this.min_y) / 2;
          this.min_x = n - o * (this.size.x - 2) / 2, this.max_x = n + o * (this.size.x - 2) / 2, this.min_y = r - o * (this.size.y - 2) / 2, this.max_y = r + o * (this.size.y - 2) / 2
        }
      }, {
        key: "drawGrid", value: function (t) {
          var i = this.root.ctx, s = this.root.unit,
            e = Math.min(1, (this.size.x - 2) / (this.max_x - this.min_x) / 10 * t),
            o = "rgba(128, 255, 128, ".concat(e, ")");
          i.strokeStyle = o, i.shadowColor = o, i.shadowBlur = 4 * e;
          for (var n = Math.ceil(this.min_x / t) * t; n < Math.ceil(this.max_x / t) * t;) {
            var r = this.pos.x + 1 + (n - this.min_x) / (this.max_x - this.min_x) * (this.size.x - 2);
            i.beginPath(), i.moveTo(r * s, (this.pos.y + 1) * s), i.lineTo(r * s, (this.pos.y + this.size.y - 1) * s), i.stroke(), n += t
          }
          for (var h = Math.ceil(this.min_y / t) * t; h < Math.ceil(this.max_y / t) * t;) {
            var a = this.pos.y + 1 + (this.max_y - h) / (this.max_y - this.min_y) * (this.size.y - 2);
            i.beginPath(), i.moveTo((this.pos.x + 1) * s, a * s), i.lineTo((this.pos.x + this.size.x - 1) * s, a * s), i.stroke(), h += t
          }
        }
      }, {
        key: "drawFullGrids", value: function () {
          var t = this.root.ctx, i = this.root.unit;
          t.shadowBlur = 0, t.fillStyle = this.colors[2], t.fillRect(this.pos.x * i, this.pos.y * i, this.size.x * i, this.size.y * i), t.lineWidth = 0, t.strokeStyle = this.colors[0], t.shadowBlur = i / 4, t.shadowColor = this.colors[1], t.strokeRect((this.pos.x + 1) * i, (this.pos.y + 1) * i, (this.size.x - 2) * i, (this.size.y - 2) * i);
          var s = Math.pow(10, Math.ceil(Math.log10((this.max_x - this.min_x) / (this.size.x - 2) * 10)));
          s = Math.max(100, s), this.drawGrid(s / 100), this.drawGrid(s / 10), this.drawGrid(s)
        }
      }, {
        key: "drawElement", value: function (i, s, e, o) {
          var n = this.root.ctx, r = this.root.unit,
            h = this.pos.x + 1 + (i.x - this.min_x) / (this.max_x - this.min_x) * (this.size.x - 2),
            a = this.pos.y + 1 + (this.max_y - i.y) / (this.max_y - this.min_y) * (this.size.y - 2);
          e ? (n.strokeStyle = t.colors.green[0], n.fillStyle = t.colors.green[0]) : (n.strokeStyle = t.colors.light[0], n.fillStyle = t.colors.light[0]), s ? (n.beginPath(), n.moveTo((h + .7) * r, a * r), n.lineTo((h + .5) * r, (a + .2) * r), n.lineTo((h + .5) * r, (a + .5) * r), n.lineTo((h + .2) * r, (a + .5) * r), n.lineTo(h * r, (a + .7) * r), n.lineTo((h - .2) * r, (a + .5) * r), n.lineTo((h - .5) * r, (a + .5) * r), n.lineTo((h - .5) * r, (a + .2) * r), n.lineTo((h - .7) * r, a * r), n.lineTo((h - .5) * r, (a - .2) * r), n.lineTo((h - .5) * r, (a - .5) * r), n.lineTo((h - .2) * r, (a - .5) * r), n.lineTo(h * r, (a - .7) * r), n.lineTo((h + .2) * r, (a - .5) * r), n.lineTo((h + .5) * r, (a - .5) * r), n.lineTo((h + .5) * r, (a - .2) * r), n.closePath(), n.stroke()) : (n.beginPath(), n.arc(h * r, a * r, r / 3, 0, 2 * Math.PI, !1), n.stroke(), e && n.fill(), o && (n.beginPath(), n.arc(h * r, a * r, r / 2, 0, 2 * Math.PI, !1), n.stroke()))
        }
      }, {
        key: "drawProbe", value: function () {
          this.drawElement(this.mission.probe.position, !0, !1, !1)
        }
      }, {
        key: "drawTargets", value: function () {
          var t = this;
          this.mission.targets.forEach(function (i, s) {
            t.drawElement(i.position, !1, s === t.selected, t.mission.targets.checked[s])
          })
        }
      }, {
        key: "draw", value: function () {
          this.computeDimensions(), this.drawFullGrids(), this.drawProbe(), this.drawTargets()
        }
      }, {
        key: "select", value: function (t) {
          this.selected = t, this.draw()
        }
      }]), s
    }();
    exports.default = a;
  }, { "./consts.js": "E8WP" }],
  "xNvZ": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = void 0;
    var t = s(require("./vector.js")), e = require("./consts.js"), i = require("./display.js");

    function s(t) {
      return t && t.__esModule ? t : { default: t }
    }

    function o(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function n(t, e) {
      for (var i = 0; i < e.length; i++) {
        var s = e[i];
        s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(t, s.key, s)
      }
    }

    function r(t, e, i) {
      return e && n(t.prototype, e), i && n(t, i), t
    }

    var l = function () {
      function s(e, n, r) {
        o(this, s), this.parent = e, this.root = this.parent.root, this.pos = n, this.size = new t.default(40, 7), this.callback = r, this.text = "", this.menuItem = new i.P83MenuItem(this, t.default.add(this.pos, new t.default(2, 4)), "OK", this.draw.bind(this), this.quit.bind(this))
      }

      return r(s, [{
        key: "setup", value: function (t) {
          this.text = t
        }
      }, {
        key: "draw", value: function () {
          var t = this.root.ctx, i = this.root.unit;
          t.fillStyle = "#000000", t.strokeStyle = e.colors.light[0], t.shadowBlur = i, t.fillRect(this.pos.x * i, this.pos.y * i, this.size.x * i, this.size.y * i), t.strokeRect(this.pos.x * i, this.pos.y * i, this.size.x * i, this.size.y * i), t.shadowBlur = 0, t.fillStyle = e.colors.light[0], t.textAlign = "left", t.font = Math.floor(.8 * i) + "px Liberation", t.textBaseline = "middle", t.fillText(this.text, (this.pos.x + 2) * i, (this.pos.y + 2.5) * i), this.menuItem.draw()
        }
      }, {
        key: "quit", value: function () {
          this.menuItem.button.lit = !1, this.callback()
        }
      }]), s
    }();
    exports.default = l;
  }, { "./vector.js": "ji7c", "./consts.js": "E8WP", "./display.js": "Dcy0" }],
  "niua": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = void 0;
    var e = u(require("./mission.js")), t = require("./consts.js"), i = l(require("./panels.js")),
      s = u(require("./vector.js")), n = u(require("./scope.js")), r = u(require("./splash.js")),
      o = require("./targets.js");

    function a() {
      if ("function" != typeof WeakMap) return null;
      var e = new WeakMap;
      return a = function () {
        return e
      }, e
    }

    function l(e) {
      if (e && e.__esModule) return e;
      var t = a();
      if (t && t.has(e)) return t.get(e);
      var i = {};
      if (null != e) {
        var s = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var n in e) if (Object.prototype.hasOwnProperty.call(e, n)) {
          var r = s ? Object.getOwnPropertyDescriptor(e, n) : null;
          r && (r.get || r.set) ? Object.defineProperty(i, n, r) : i[n] = e[n]
        }
      }
      return i.default = e, t && t.set(e, i), i
    }

    function u(e) {
      return e && e.__esModule ? e : { default: e }
    }

    function h(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function c(e, t) {
      for (var i = 0; i < t.length; i++) {
        var s = t[i];
        s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
      }
    }

    function f(e, t, i) {
      return t && c(e.prototype, t), i && c(e, i), e
    }

    var d = function () {
      function a(t, l, u) {
        h(this, a), this.parent = t, this.root = this.parent.root, this.mission = new e.default(l.name, l.code, l.positions, l.diagonalAllowed, l.trackingAllowed, l.oxygen), this.quitCallback = u, this.thrustPanel = new i.P83ThrustPanel(this, s.default.zero, this.mission, this.move.bind(this)), this.speedPanel = new i.P83XYPanel(this, new s.default(0, 14), "SPEED", this.mission.probe.speed), this.positionPanel = new i.P83XYPanel(this, new s.default(0, 21), "POSITION", this.mission.probe.position), this.scope = new n.default(this, new s.default(14, 0), new s.default(28, 28), this.mission), this.statusPanel = new i.default(this, new s.default(42, 0), this.mission), this.targetSelector = new o.P83TargetSelector(this, new s.default(42, 7), this.mission, this.scope.select.bind(this)), this.sequencePanel = new i.P83SequencePanel(this, new s.default(0, 28), this.mission, this.move.bind(this)), this.missionPanel = new i.P83MissionPanel(this, new s.default(42, 28), this.mission, this.quit.bind(this)), this.splash = new r.default(this, new s.default(8, 16), this.quit.bind(this)), this.children = [this.thrustPanel, this.speedPanel, this.positionPanel, this.scope, this.statusPanel, this.targetSelector, this.sequencePanel, this.missionPanel]
      }

      return f(a, [{
        key: "draw", value: function () {
          var e = !0, t = !1, i = void 0;
          try {
            for (var s, n = this.children[Symbol.iterator](); !(e = (s = n.next()).done); e = !0) {
              s.value.draw()
            }
          } catch (r) {
            t = !0, i = r
          } finally {
            try {
              e || null == n.return || n.return()
            } finally {
              if (t) throw i
            }
          }
        }
      }, {
        key: "setup", value: function (e, t, i, s) {
          this.mission.setup("NO NAME", "NO CODE", e, t, i, s), this.thrustPanel.setup()
        }
      }, {
        key: "move", value: function (e) {
          if (0 === this.mission.oxygenLevel) return !1;
          this.mission.move(e), this.mission.isSpeedOk && (this.statusPanel.trackingLED.blink(0), this.speedPanel.led.colors = t.colors.green)
        }
      }, {
        key: "quit", value: function () {
          this.statusPanel.oxygenLED.blink(0), this.statusPanel.trackingLED.blink(0), this.speedPanel.led.blink(0), this.sequencePanel.sequenceInput.show(!1), this.quitCallback(this.mission.isAchieved)
        }
      }, {
        key: "onClick", value: function (e) {
          this.mission.isAchieved || this.mission.oxygenLevel <= 0 ? this.splash.onClick(e) : (this.thrustPanel.onClick(e), this.targetSelector.onClick(e), this.missionPanel.onClick(e))
        }
      }]), a
    }();
    exports.default = d;
  }, {
    "./mission.js": "UGYH",
    "./consts.js": "E8WP",
    "./panels.js": "eVqE",
    "./vector.js": "ji7c",
    "./scope.js": "oeM6",
    "./splash.js": "xNvZ",
    "./targets.js": "aUdC"
  }],
  "QcRT": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = void 0;
    var e = n(require("./controller.js")), t = n(require("./vector.js"));

    function n(e) {
      return e && e.__esModule ? e : { default: e }
    }

    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function r(e, t) {
      for (var n = 0; n < t.length; n++) {
        var i = t[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
      }
    }

    function s(e, t, n) {
      return t && r(e.prototype, t), n && r(e, n), e
    }

    var o = function () {
      function n(r, s) {
        var o = this;
        i(this, n);
        var a = JSON.parse(document.getElementById(s).innerText);
        this.root = this, this.canvas = document.getElementById(r), this.ctx = this.canvas.getContext("2d"), this.state = n.GAME_STATE_MISSION, this.controller = new e.default(this, a, function (e) {
          if (e) {
            var t = new Headers;
            t.append("Content-Type", "application/json"), fetch(window.location.pathname, {
              method: "POST",
              body: JSON.stringify({ sequence: o.controller.mission.sequence, user: a.user, level: a.level }),
              headers: t
            }).then(function (e) {
              200 === e.status ? window.location.pathname = "/" : (o.controller.splash.setup("Sequence has not been verified!"), o.controller.splash.draw())
            }).catch(function (e) {
              o.controller.splash.setup("Error: ".concat(e)), o.controller.splash.draw()
            })
          }
        }), this.resize(), window.addEventListener("resize", this.resize.bind(this)), this.canvas.addEventListener("click", function (e) {
          var n = e.pageX - o.canvas.offsetLeft, i = e.pageY - o.canvas.offsetTop;
          o.controller.onClick(new t.default(n, i))
        })
      }

      return s(n, [{
        key: "draw", value: function () {
          this.ctx.fillStyle = "#000", this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height), this.controller.draw()
        }
      }, {
        key: "resize", value: function () {
          this.unit = Math.floor(Math.min(window.innerWidth / 56, window.innerHeight / 35)), this.canvas.width = 56 * this.unit, this.canvas.height = 35 * this.unit, this.draw()
        }
      }]), n
    }();
    exports.default = o, o.GAME_STATE_MAP = Symbol(), o.GAME_STATE_MISSION = Symbol();
  }, { "./controller.js": "niua", "./vector.js": "ji7c" }],
  "A2T1": [function (require, module, exports) {
    "use strict";
    var e = t(require("./game.js"));

    function t(e) {
      return e && e.__esModule ? e : { default: e }
    }

    var u = new e.default("canvas", "data");
    document.getElementById("music").volume = .01, document.getElementById("music").play();
  }, { "./game.js": "QcRT" }]
}, {}, ["A2T1"], null);
//# sourceMappingURL=/app.js.map
