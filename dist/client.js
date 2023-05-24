"use client";

var __create = Object.create;
var __descs = Object.getOwnPropertyDescriptors;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/ansi-regex/index.js
var require_ansi_regex = __commonJS((exports, module) => {
  module.exports = ({ onlyFirst = false } = {}) => {
    const pattern = [
      "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
      "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
    ].join("|");
    return new RegExp(pattern, onlyFirst ? undefined : "g");
  };
});

// node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS((exports, module) => {
  var assembleStyles = function() {
    const codes = new Map;
    const styles = {
      modifier: {
        reset: [0, 0],
        bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        overline: [53, 55],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29]
      },
      color: {
        black: [30, 39],
        red: [31, 39],
        green: [32, 39],
        yellow: [33, 39],
        blue: [34, 39],
        magenta: [35, 39],
        cyan: [36, 39],
        white: [37, 39],
        blackBright: [90, 39],
        redBright: [91, 39],
        greenBright: [92, 39],
        yellowBright: [93, 39],
        blueBright: [94, 39],
        magentaBright: [95, 39],
        cyanBright: [96, 39],
        whiteBright: [97, 39]
      },
      bgColor: {
        bgBlack: [40, 49],
        bgRed: [41, 49],
        bgGreen: [42, 49],
        bgYellow: [43, 49],
        bgBlue: [44, 49],
        bgMagenta: [45, 49],
        bgCyan: [46, 49],
        bgWhite: [47, 49],
        bgBlackBright: [100, 49],
        bgRedBright: [101, 49],
        bgGreenBright: [102, 49],
        bgYellowBright: [103, 49],
        bgBlueBright: [104, 49],
        bgMagentaBright: [105, 49],
        bgCyanBright: [106, 49],
        bgWhiteBright: [107, 49]
      }
    };
    styles.color.gray = styles.color.blackBright;
    styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
    styles.color.grey = styles.color.blackBright;
    styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
    for (const [groupName, group] of Object.entries(styles)) {
      for (const [styleName, style] of Object.entries(group)) {
        styles[styleName] = {
          open: `\x1B[${style[0]}m`,
          close: `\x1B[${style[1]}m`
        };
        group[styleName] = styles[styleName];
        codes.set(style[0], style[1]);
      }
      Object.defineProperty(styles, groupName, {
        value: group,
        enumerable: false
      });
    }
    Object.defineProperty(styles, "codes", {
      value: codes,
      enumerable: false
    });
    styles.color.close = "\x1B[39m";
    styles.bgColor.close = "\x1B[49m";
    styles.color.ansi256 = wrapAnsi256();
    styles.color.ansi16m = wrapAnsi16m();
    styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
    styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
    Object.defineProperties(styles, {
      rgbToAnsi256: {
        value: (red, green, blue) => {
          if (red === green && green === blue) {
            if (red < 8) {
              return 16;
            }
            if (red > 248) {
              return 231;
            }
            return Math.round((red - 8) / 247 * 24) + 232;
          }
          return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
        },
        enumerable: false
      },
      hexToRgb: {
        value: (hex) => {
          const matches = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(hex.toString(16));
          if (!matches) {
            return [0, 0, 0];
          }
          let { colorString } = matches.groups;
          if (colorString.length === 3) {
            colorString = colorString.split("").map((character) => character + character).join("");
          }
          const integer = Number.parseInt(colorString, 16);
          return [
            integer >> 16 & 255,
            integer >> 8 & 255,
            integer & 255
          ];
        },
        enumerable: false
      },
      hexToAnsi256: {
        value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
        enumerable: false
      }
    });
    return styles;
  };
  var ANSI_BACKGROUND_OFFSET = 10;
  var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
  var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
  Object.defineProperty(module, "exports", {
    enumerable: true,
    get: assembleStyles
  });
});

// node_modules/dayjs/dayjs.min.js
var require_dayjs_min = __commonJS((exports, module) => {
  (function(t, e) {
    typeof exports == "object" && typeof module != "undefined" ? module.exports = e() : typeof define == "function" && define.amd ? define(e) : (t = typeof globalThis != "undefined" ? globalThis : t || self).dayjs = e();
  })(exports, function() {
    var t = 1000, e = 60000, n = 3600000, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", f = "month", h = "quarter", c = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
      var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
      return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
    } }, m = function(t2, e2, n2) {
      var r2 = String(t2);
      return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
    }, v = { s: m, z: function(t2) {
      var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
      return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
    }, m: function t(e2, n2) {
      if (e2.date() < n2.date())
        return -t(n2, e2);
      var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, f), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), f);
      return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
    }, a: function(t2) {
      return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
    }, p: function(t2) {
      return { M: f, y: c, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: h }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
    }, u: function(t2) {
      return t2 === undefined;
    } }, g = "en", D = {};
    D[g] = M;
    var p = function(t2) {
      return t2 instanceof _;
    }, S = function t(e2, n2, r2) {
      var i2;
      if (!e2)
        return g;
      if (typeof e2 == "string") {
        var s2 = e2.toLowerCase();
        D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
        var u2 = e2.split("-");
        if (!i2 && u2.length > 1)
          return t(u2[0]);
      } else {
        var a2 = e2.name;
        D[a2] = e2, i2 = a2;
      }
      return !r2 && i2 && (g = i2), i2 || !r2 && g;
    }, w = function(t2, e2) {
      if (p(t2))
        return t2.clone();
      var n2 = typeof e2 == "object" ? e2 : {};
      return n2.date = t2, n2.args = arguments, new _(n2);
    }, O = v;
    O.l = S, O.i = p, O.w = function(t2, e2) {
      return w(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
    };
    var _ = function() {
      function M2(t2) {
        this.$L = S(t2.locale, null, true), this.parse(t2);
      }
      var m2 = M2.prototype;
      return m2.parse = function(t2) {
        this.$d = function(t3) {
          var { date: e2, utc: n2 } = t3;
          if (e2 === null)
            return new Date(NaN);
          if (O.u(e2))
            return new Date;
          if (e2 instanceof Date)
            return new Date(e2);
          if (typeof e2 == "string" && !/Z$/i.test(e2)) {
            var r2 = e2.match($);
            if (r2) {
              var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
              return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
            }
          }
          return new Date(e2);
        }(t2), this.$x = t2.x || {}, this.init();
      }, m2.init = function() {
        var t2 = this.$d;
        this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
      }, m2.$utils = function() {
        return O;
      }, m2.isValid = function() {
        return !(this.$d.toString() === l);
      }, m2.isSame = function(t2, e2) {
        var n2 = w(t2);
        return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
      }, m2.isAfter = function(t2, e2) {
        return w(t2) < this.startOf(e2);
      }, m2.isBefore = function(t2, e2) {
        return this.endOf(e2) < w(t2);
      }, m2.$g = function(t2, e2, n2) {
        return O.u(t2) ? this[e2] : this.set(n2, t2);
      }, m2.unix = function() {
        return Math.floor(this.valueOf() / 1000);
      }, m2.valueOf = function() {
        return this.$d.getTime();
      }, m2.startOf = function(t2, e2) {
        var n2 = this, r2 = !!O.u(e2) || e2, h2 = O.p(t2), l2 = function(t3, e3) {
          var i2 = O.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
          return r2 ? i2 : i2.endOf(a);
        }, $2 = function(t3, e3) {
          return O.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
        }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
        switch (h2) {
          case c:
            return r2 ? l2(1, 0) : l2(31, 11);
          case f:
            return r2 ? l2(1, M3) : l2(0, M3 + 1);
          case o:
            var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
            return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
          case a:
          case d:
            return $2(v2 + "Hours", 0);
          case u:
            return $2(v2 + "Minutes", 1);
          case s:
            return $2(v2 + "Seconds", 2);
          case i:
            return $2(v2 + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, m2.endOf = function(t2) {
        return this.startOf(t2, false);
      }, m2.$set = function(t2, e2) {
        var n2, o2 = O.p(t2), h2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = h2 + "Date", n2[d] = h2 + "Date", n2[f] = h2 + "Month", n2[c] = h2 + "FullYear", n2[u] = h2 + "Hours", n2[s] = h2 + "Minutes", n2[i] = h2 + "Seconds", n2[r] = h2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
        if (o2 === f || o2 === c) {
          var y2 = this.clone().set(d, 1);
          y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
        } else
          l2 && this.$d[l2]($2);
        return this.init(), this;
      }, m2.set = function(t2, e2) {
        return this.clone().$set(t2, e2);
      }, m2.get = function(t2) {
        return this[O.p(t2)]();
      }, m2.add = function(r2, h2) {
        var d2, l2 = this;
        r2 = Number(r2);
        var $2 = O.p(h2), y2 = function(t2) {
          var e2 = w(l2);
          return O.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
        };
        if ($2 === f)
          return this.set(f, this.$M + r2);
        if ($2 === c)
          return this.set(c, this.$y + r2);
        if ($2 === a)
          return y2(1);
        if ($2 === o)
          return y2(7);
        var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
        return O.w(m3, this);
      }, m2.subtract = function(t2, e2) {
        return this.add(-1 * t2, e2);
      }, m2.format = function(t2) {
        var e2 = this, n2 = this.$locale();
        if (!this.isValid())
          return n2.invalidDate || l;
        var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = O.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, f2 = n2.months, h2 = function(t3, n3, i3, s3) {
          return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
        }, c2 = function(t3) {
          return O.s(s2 % 12 || 12, t3, "0");
        }, d2 = n2.meridiem || function(t3, e3, n3) {
          var r3 = t3 < 12 ? "AM" : "PM";
          return n3 ? r3.toLowerCase() : r3;
        }, $2 = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a2 + 1, MM: O.s(a2 + 1, 2, "0"), MMM: h2(n2.monthsShort, a2, f2, 3), MMMM: h2(f2, a2), D: this.$D, DD: O.s(this.$D, 2, "0"), d: String(this.$W), dd: h2(n2.weekdaysMin, this.$W, o2, 2), ddd: h2(n2.weekdaysShort, this.$W, o2, 3), dddd: o2[this.$W], H: String(s2), HH: O.s(s2, 2, "0"), h: c2(1), hh: c2(2), a: d2(s2, u2, true), A: d2(s2, u2, false), m: String(u2), mm: O.s(u2, 2, "0"), s: String(this.$s), ss: O.s(this.$s, 2, "0"), SSS: O.s(this.$ms, 3, "0"), Z: i2 };
        return r2.replace(y, function(t3, e3) {
          return e3 || $2[t3] || i2.replace(":", "");
        });
      }, m2.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, m2.diff = function(r2, d2, l2) {
        var $2, y2 = O.p(d2), M3 = w(r2), m3 = (M3.utcOffset() - this.utcOffset()) * e, v2 = this - M3, g2 = O.m(this, M3);
        return g2 = ($2 = {}, $2[c] = g2 / 12, $2[f] = g2, $2[h] = g2 / 3, $2[o] = (v2 - m3) / 604800000, $2[a] = (v2 - m3) / 86400000, $2[u] = v2 / n, $2[s] = v2 / e, $2[i] = v2 / t, $2)[y2] || v2, l2 ? g2 : O.a(g2);
      }, m2.daysInMonth = function() {
        return this.endOf(f).$D;
      }, m2.$locale = function() {
        return D[this.$L];
      }, m2.locale = function(t2, e2) {
        if (!t2)
          return this.$L;
        var n2 = this.clone(), r2 = S(t2, e2, true);
        return r2 && (n2.$L = r2), n2;
      }, m2.clone = function() {
        return O.w(this.$d, this);
      }, m2.toDate = function() {
        return new Date(this.valueOf());
      }, m2.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, m2.toISOString = function() {
        return this.$d.toISOString();
      }, m2.toString = function() {
        return this.$d.toUTCString();
      }, M2;
    }(), T = _.prototype;
    return w.prototype = T, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", f], ["$y", c], ["$D", d]].forEach(function(t2) {
      T[t2[1]] = function(e2) {
        return this.$g(e2, t2[0], t2[1]);
      };
    }), w.extend = function(t2, e2) {
      return t2.$i || (t2(e2, _, w), t2.$i = true), w;
    }, w.locale = S, w.isDayjs = p, w.unix = function(t2) {
      return w(1000 * t2);
    }, w.en = D[g], w.Ls = D, w.p = {}, w;
  });
});

// node_modules/xml-parser-xo/dist/cjs/index.js
var require_cjs = __commonJS((exports, module) => {
  var nextChild = function() {
    return element(false) || text() || comment() || cdata();
  };
  var nextRootChild = function() {
    match(/\s*/);
    return element(true) || comment() || doctype() || processingInstruction(false);
  };
  var parseDocument = function() {
    const declaration = processingInstruction(true);
    const children = [];
    let documentRootNode;
    let child = nextRootChild();
    while (child) {
      if (child.node.type === "Element") {
        if (documentRootNode) {
          throw new Error("Found multiple root nodes");
        }
        documentRootNode = child.node;
      }
      if (!child.excluded) {
        children.push(child.node);
      }
      child = nextRootChild();
    }
    if (!documentRootNode) {
      throw new ParsingError("Failed to parse XML", "Root Element not found");
    }
    if (parsingState.xml.length !== 0) {
      throw new ParsingError("Failed to parse XML", "Not Well-Formed XML");
    }
    return {
      declaration: declaration ? declaration.node : null,
      root: documentRootNode,
      children
    };
  };
  var processingInstruction = function(matchDeclaration) {
    const m = matchDeclaration ? match(/^<\?(xml)\s*/) : match(/^<\?([\w-:.]+)\s*/);
    if (!m)
      return;
    const node = {
      name: m[1],
      type: "ProcessingInstruction",
      attributes: {}
    };
    while (!(eos() || is("?>"))) {
      const attr = attribute();
      if (attr) {
        node.attributes[attr.name] = attr.value;
      } else {
        return;
      }
    }
    match(/\?>/);
    return {
      excluded: matchDeclaration ? false : parsingState.options.filter(node) === false,
      node
    };
  };
  var element = function(matchRoot) {
    const m = match(/^<([^?!</>\s]+)\s*/);
    if (!m)
      return;
    const node = {
      type: "Element",
      name: m[1],
      attributes: {},
      children: []
    };
    const excluded = matchRoot ? false : parsingState.options.filter(node) === false;
    while (!(eos() || is(">") || is("?>") || is("/>"))) {
      const attr = attribute();
      if (attr) {
        node.attributes[attr.name] = attr.value;
      } else {
        return;
      }
    }
    if (match(/^\s*\/>/)) {
      node.children = null;
      return {
        excluded,
        node
      };
    }
    match(/\??>/);
    let child = nextChild();
    while (child) {
      if (!child.excluded) {
        node.children.push(child.node);
      }
      child = nextChild();
    }
    if (parsingState.options.strictMode) {
      const closingTag = `</${node.name}>`;
      if (parsingState.xml.startsWith(closingTag)) {
        parsingState.xml = parsingState.xml.slice(closingTag.length);
      } else {
        throw new ParsingError("Failed to parse XML", `Closing tag not matching "${closingTag}"`);
      }
    } else {
      match(/^<\/\s*[\w-:.\u00C0-\u00FF]+>/);
    }
    return {
      excluded,
      node
    };
  };
  var doctype = function() {
    const m = match(/^<!DOCTYPE\s+\S+\s+SYSTEM[^>]*>/) || match(/^<!DOCTYPE\s+\S+\s+PUBLIC[^>]*>/) || match(/^<!DOCTYPE\s+\S+\s+\[[^\]]*]>/);
    if (m) {
      const node = {
        type: "DocumentType",
        content: m[0]
      };
      return {
        excluded: parsingState.options.filter(node) === false,
        node
      };
    }
  };
  var cdata = function() {
    if (parsingState.xml.startsWith("<![CDATA[")) {
      const endPositionStart = parsingState.xml.indexOf("]]>");
      if (endPositionStart > -1) {
        const endPositionFinish = endPositionStart + 3;
        const node = {
          type: "CDATA",
          content: parsingState.xml.substring(0, endPositionFinish)
        };
        parsingState.xml = parsingState.xml.slice(endPositionFinish);
        return {
          excluded: parsingState.options.filter(node) === false,
          node
        };
      }
    }
  };
  var comment = function() {
    const m = match(/^<!--[\s\S]*?-->/);
    if (m) {
      const node = {
        type: "Comment",
        content: m[0]
      };
      return {
        excluded: parsingState.options.filter(node) === false,
        node
      };
    }
  };
  var text = function() {
    const m = match(/^([^<]+)/);
    if (m) {
      const node = {
        type: "Text",
        content: m[1]
      };
      return {
        excluded: parsingState.options.filter(node) === false,
        node
      };
    }
  };
  var attribute = function() {
    const m = match(/([^=]+)\s*=\s*("[^"]*"|'[^']*'|[^>\s]+)\s*/);
    if (m) {
      return {
        name: m[1].trim(),
        value: stripQuotes(m[2].trim())
      };
    }
  };
  var stripQuotes = function(val) {
    return val.replace(/^['"]|['"]$/g, "");
  };
  var match = function(re) {
    const m = parsingState.xml.match(re);
    if (m) {
      parsingState.xml = parsingState.xml.slice(m[0].length);
      return m;
    }
  };
  var eos = function() {
    return parsingState.xml.length === 0;
  };
  var is = function(prefix) {
    return parsingState.xml.indexOf(prefix) === 0;
  };
  var parseXml = function(xml, options = {}) {
    xml = xml.trim();
    const filter = options.filter || (() => true);
    parsingState = {
      xml,
      options: Object.assign(Object.assign({}, options), { filter, strictMode: options.strictMode === true })
    };
    return parseDocument();
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ParsingError = undefined;

  class ParsingError extends Error {
    constructor(message, cause) {
      super(message);
      this.cause = cause;
    }
  }
  exports.ParsingError = ParsingError;
  var parsingState;
  if (typeof module !== "undefined" && typeof exports === "object") {
    module.exports = parseXml;
  }
  exports.default = parseXml;
});

// node_modules/xml-formatter/dist/cjs/index.js
var require_cjs2 = __commonJS((exports, module) => {
  var newLine = function(state) {
    if (!state.options.indentation && !state.options.lineSeparator)
      return;
    state.content += state.options.lineSeparator;
    let i;
    for (i = 0;i < state.level; i++) {
      state.content += state.options.indentation;
    }
  };
  var indent = function(state) {
    state.content = state.content.replace(/ +$/, "");
    let i;
    for (i = 0;i < state.level; i++) {
      state.content += state.options.indentation;
    }
  };
  var appendContent = function(state, content) {
    state.content += content;
  };
  var processNode = function(node, state, preserveSpace) {
    if (typeof node.content === "string") {
      processContent(node.content, state, preserveSpace);
    } else if (node.type === "Element") {
      processElementNode(node, state, preserveSpace);
    } else if (node.type === "ProcessingInstruction") {
      processProcessingIntruction(node, state);
    } else {
      throw new Error("Unknown node type: " + node.type);
    }
  };
  var processContent = function(content, state, preserveSpace) {
    if (!preserveSpace) {
      const trimmedContent = content.trim();
      if (state.options.lineSeparator) {
        content = trimmedContent;
      } else if (trimmedContent.length === 0) {
        content = trimmedContent;
      }
    }
    if (content.length > 0) {
      if (!preserveSpace && state.content.length > 0) {
        newLine(state);
      }
      appendContent(state, content);
    }
  };
  var isPathMatchingIgnoredPaths = function(path, ignoredPaths) {
    const fullPath = "/" + path.join("/");
    const pathLastPart = path[path.length - 1];
    return ignoredPaths.includes(pathLastPart) || ignoredPaths.includes(fullPath);
  };
  var processElementNode = function(node, state, preserveSpace) {
    state.path.push(node.name);
    if (!preserveSpace && state.content.length > 0) {
      newLine(state);
    }
    appendContent(state, "<" + node.name);
    processAttributes(state, node.attributes);
    if (node.children === null) {
      const selfClosingNodeClosingTag = state.options.whiteSpaceAtEndOfSelfclosingTag ? " />" : "/>";
      appendContent(state, selfClosingNodeClosingTag);
    } else if (node.children.length === 0) {
      appendContent(state, "></" + node.name + ">");
    } else {
      const nodeChildren = node.children;
      appendContent(state, ">");
      state.level++;
      let nodePreserveSpace = node.attributes["xml:space"] === "preserve";
      let ignoredPath = false;
      if (!nodePreserveSpace && state.options.ignoredPaths) {
        ignoredPath = isPathMatchingIgnoredPaths(state.path, state.options.ignoredPaths);
        nodePreserveSpace = ignoredPath;
      }
      if (!nodePreserveSpace && state.options.collapseContent) {
        let containsTextNodes = false;
        let containsTextNodesWithLineBreaks = false;
        let containsNonTextNodes = false;
        nodeChildren.forEach(function(child, index) {
          if (child.type === "Text") {
            if (child.content.includes("\n")) {
              containsTextNodesWithLineBreaks = true;
              child.content = child.content.trim();
            } else if (index === 0 || index === nodeChildren.length - 1) {
              if (child.content.trim().length === 0) {
                child.content = "";
              }
            }
            if (child.content.trim().length > 0) {
              containsTextNodes = true;
            }
          } else if (child.type === "CDATA") {
            containsTextNodes = true;
          } else {
            containsNonTextNodes = true;
          }
        });
        if (containsTextNodes && (!containsNonTextNodes || !containsTextNodesWithLineBreaks)) {
          nodePreserveSpace = true;
        }
      }
      nodeChildren.forEach(function(child) {
        processNode(child, state, preserveSpace || nodePreserveSpace);
      });
      state.level--;
      if (!preserveSpace && !nodePreserveSpace) {
        newLine(state);
      }
      if (ignoredPath) {
        indent(state);
      }
      appendContent(state, "</" + node.name + ">");
    }
    state.path.pop();
  };
  var processAttributes = function(state, attributes) {
    Object.keys(attributes).forEach(function(attr) {
      const escaped = attributes[attr].replace(/"/g, "&quot;");
      appendContent(state, " " + attr + '="' + escaped + '"');
    });
  };
  var processProcessingIntruction = function(node, state) {
    if (state.content.length > 0) {
      newLine(state);
    }
    appendContent(state, "<?" + node.name);
    processAttributes(state, node.attributes);
    appendContent(state, "?>");
  };
  var formatXml = function(xml, options = {}) {
    options.indentation = ("indentation" in options) ? options.indentation : "    ";
    options.collapseContent = options.collapseContent === true;
    options.lineSeparator = ("lineSeparator" in options) ? options.lineSeparator : "\r\n";
    options.whiteSpaceAtEndOfSelfclosingTag = options.whiteSpaceAtEndOfSelfclosingTag === true;
    options.throwOnFailure = options.throwOnFailure !== false;
    try {
      const parsedXml = (0, xml_parser_xo_1.default)(xml, { filter: options.filter, strictMode: options.strictMode });
      const state = { content: "", level: 0, options, path: [] };
      if (parsedXml.declaration) {
        processProcessingIntruction(parsedXml.declaration, state);
      }
      parsedXml.children.forEach(function(child) {
        processNode(child, state, false);
      });
      if (!options.lineSeparator) {
        return state.content;
      }
      return state.content.replace(/\r\n/g, "\n").replace(/\n/g, options.lineSeparator);
    } catch (err) {
      if (options.throwOnFailure) {
        throw err;
      }
      return xml;
    }
  };
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var xml_parser_xo_1 = __importDefault(require_cjs());
  formatXml.minify = (xml, options = {}) => {
    return formatXml(xml, Object.assign(Object.assign({}, options), { indentation: "", lineSeparator: "" }));
  };
  if (typeof module !== "undefined" && typeof exports === "object") {
    module.exports = formatXml;
  }
  exports.default = formatXml;
});

// node_modules/stopwatch-node/dist/taskinfo.js
var require_taskinfo = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TaskInfo = undefined;

  class TaskInfo {
    constructor(taskName, timeMillis) {
      this._taskName = taskName;
      this._timeMillis = timeMillis;
    }
    get taskName() {
      return this._taskName;
    }
    get timeMills() {
      return this._timeMillis;
    }
    get percentage() {
      return this._percentage;
    }
    calculatePercentage(totalTimeMillis) {
      this._percentage = (this._timeMillis * 100 / totalTimeMillis).toFixed(2);
      return this._percentage;
    }
  }
  exports.TaskInfo = TaskInfo;
});

// node_modules/stopwatch-node/dist/stopwatch.js
var require_stopwatch = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.StopWatch = undefined;
  var taskinfo_1 = require_taskinfo();

  class StopWatch {
    constructor(id = "") {
      this.currentTaskName = null;
      this.startTimeMillis = 0;
      this.totalTimeMillis = 0;
      this.taskList = [];
      this.id = id;
    }
    start(taskName = "") {
      this.currentTaskName !== null && this.throwError("Can\'t start StopWatch: it\'s already running");
      this.currentTaskName = taskName;
      this.startTimeMillis = Date.now();
    }
    stop() {
      this.currentTaskName === null && this.throwError("Can\'t stop StopWatch: it\'s not running");
      const lastTime = Date.now() - this.startTimeMillis;
      this.totalTimeMillis += lastTime;
      const lastTaskInfo = new taskinfo_1.TaskInfo(this.currentTaskName, lastTime);
      this.taskList.push(lastTaskInfo);
      this.currentTaskName = null;
    }
    prettyPrint() {
      const output = [this.shortSummary()];
      if (this.taskList.length) {
        output.push("------------------------------------------");
        output.push("ms \t\t % \t\t Task name");
        output.push("------------------------------------------");
        this.taskList.forEach((task) => {
          let percentage = "0";
          try {
            percentage = task.calculatePercentage(this.totalTimeMillis);
          } catch (e) {
          }
          output.push(`${task.timeMills} \t\t ${percentage} \t\t ${task.taskName}`);
        });
      } else {
        output.push(StopWatch.NoTaskMessage);
      }
      const outputString = output.join("\n");
      console.info(outputString);
      return outputString;
    }
    getTask(taskName) {
      const task = this.taskList.find((task2) => task2.taskName === taskName);
      task === null || task === undefined || task.calculatePercentage(this.totalTimeMillis);
      return task;
    }
    getTotalTime() {
      return this.totalTimeMillis;
    }
    shortSummary() {
      return `StopWatch '${this.id}' running time (millis) = ${this.totalTimeMillis}`;
    }
    isRunning() {
      return this.currentTaskName !== null;
    }
    getTaskCount() {
      return this.taskList.length;
    }
    throwError(msg) {
      throw new Error(msg);
    }
  }
  exports.StopWatch = StopWatch;
  StopWatch.NoTaskMessage = "No task info kept";
});

// node_modules/crypt/crypt.js
var require_crypt = __commonJS((exports, module) => {
  (function() {
    var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", crypt = {
      rotl: function(n, b) {
        return n << b | n >>> 32 - b;
      },
      rotr: function(n, b) {
        return n << 32 - b | n >>> b;
      },
      endian: function(n) {
        if (n.constructor == Number) {
          return crypt.rotl(n, 8) & 16711935 | crypt.rotl(n, 24) & 4278255360;
        }
        for (var i = 0;i < n.length; i++)
          n[i] = crypt.endian(n[i]);
        return n;
      },
      randomBytes: function(n) {
        for (var bytes = [];n > 0; n--)
          bytes.push(Math.floor(Math.random() * 256));
        return bytes;
      },
      bytesToWords: function(bytes) {
        for (var words = [], i = 0, b = 0;i < bytes.length; i++, b += 8)
          words[b >>> 5] |= bytes[i] << 24 - b % 32;
        return words;
      },
      wordsToBytes: function(words) {
        for (var bytes = [], b = 0;b < words.length * 32; b += 8)
          bytes.push(words[b >>> 5] >>> 24 - b % 32 & 255);
        return bytes;
      },
      bytesToHex: function(bytes) {
        for (var hex = [], i = 0;i < bytes.length; i++) {
          hex.push((bytes[i] >>> 4).toString(16));
          hex.push((bytes[i] & 15).toString(16));
        }
        return hex.join("");
      },
      hexToBytes: function(hex) {
        for (var bytes = [], c = 0;c < hex.length; c += 2)
          bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
      },
      bytesToBase64: function(bytes) {
        for (var base64 = [], i = 0;i < bytes.length; i += 3) {
          var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
          for (var j = 0;j < 4; j++)
            if (i * 8 + j * 6 <= bytes.length * 8)
              base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 63));
            else
              base64.push("=");
        }
        return base64.join("");
      },
      base64ToBytes: function(base64) {
        base64 = base64.replace(/[^A-Z0-9+\/]/ig, "");
        for (var bytes = [], i = 0, imod4 = 0;i < base64.length; imod4 = ++i % 4) {
          if (imod4 == 0)
            continue;
          bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
        }
        return bytes;
      }
    };
    module.exports = crypt;
  })();
});

// node_modules/charenc/charenc.js
var require_charenc = __commonJS((exports, module) => {
  var charenc = {
    utf8: {
      stringToBytes: function(str) {
        return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
      },
      bytesToString: function(bytes) {
        return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
      }
    },
    bin: {
      stringToBytes: function(str) {
        for (var bytes = [], i = 0;i < str.length; i++)
          bytes.push(str.charCodeAt(i) & 255);
        return bytes;
      },
      bytesToString: function(bytes) {
        for (var str = [], i = 0;i < bytes.length; i++)
          str.push(String.fromCharCode(bytes[i]));
        return str.join("");
      }
    }
  };
  module.exports = charenc;
});

// node_modules/is-buffer/index.js
var require_is_buffer = __commonJS((exports, module) => {
  var isBuffer2 = function(obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
  };
  var isSlowBuffer = function(obj) {
    return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isBuffer2(obj.slice(0, 0));
  };
  /*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */
  module.exports = function(obj) {
    return obj != null && (isBuffer2(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
  };
});

// node_modules/md5/md5.js
var require_md5 = __commonJS((exports, module) => {
  (function() {
    var crypt = require_crypt(), utf8 = require_charenc().utf8, isBuffer2 = require_is_buffer(), bin = require_charenc().bin, md5 = function(message, options) {
      if (message.constructor == String)
        if (options && options.encoding === "binary")
          message = bin.stringToBytes(message);
        else
          message = utf8.stringToBytes(message);
      else if (isBuffer2(message))
        message = Array.prototype.slice.call(message, 0);
      else if (!Array.isArray(message) && message.constructor !== Uint8Array)
        message = message.toString();
      var m = crypt.bytesToWords(message), l = message.length * 8, a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
      for (var i = 0;i < m.length; i++) {
        m[i] = (m[i] << 8 | m[i] >>> 24) & 16711935 | (m[i] << 24 | m[i] >>> 8) & 4278255360;
      }
      m[l >>> 5] |= 128 << l % 32;
      m[(l + 64 >>> 9 << 4) + 14] = l;
      var { _ff: FF, _gg: GG, _hh: HH, _ii: II } = md5;
      for (var i = 0;i < m.length; i += 16) {
        var aa = a, bb = b, cc = c, dd = d;
        a = FF(a, b, c, d, m[i + 0], 7, -680876936);
        d = FF(d, a, b, c, m[i + 1], 12, -389564586);
        c = FF(c, d, a, b, m[i + 2], 17, 606105819);
        b = FF(b, c, d, a, m[i + 3], 22, -1044525330);
        a = FF(a, b, c, d, m[i + 4], 7, -176418897);
        d = FF(d, a, b, c, m[i + 5], 12, 1200080426);
        c = FF(c, d, a, b, m[i + 6], 17, -1473231341);
        b = FF(b, c, d, a, m[i + 7], 22, -45705983);
        a = FF(a, b, c, d, m[i + 8], 7, 1770035416);
        d = FF(d, a, b, c, m[i + 9], 12, -1958414417);
        c = FF(c, d, a, b, m[i + 10], 17, -42063);
        b = FF(b, c, d, a, m[i + 11], 22, -1990404162);
        a = FF(a, b, c, d, m[i + 12], 7, 1804603682);
        d = FF(d, a, b, c, m[i + 13], 12, -40341101);
        c = FF(c, d, a, b, m[i + 14], 17, -1502002290);
        b = FF(b, c, d, a, m[i + 15], 22, 1236535329);
        a = GG(a, b, c, d, m[i + 1], 5, -165796510);
        d = GG(d, a, b, c, m[i + 6], 9, -1069501632);
        c = GG(c, d, a, b, m[i + 11], 14, 643717713);
        b = GG(b, c, d, a, m[i + 0], 20, -373897302);
        a = GG(a, b, c, d, m[i + 5], 5, -701558691);
        d = GG(d, a, b, c, m[i + 10], 9, 38016083);
        c = GG(c, d, a, b, m[i + 15], 14, -660478335);
        b = GG(b, c, d, a, m[i + 4], 20, -405537848);
        a = GG(a, b, c, d, m[i + 9], 5, 568446438);
        d = GG(d, a, b, c, m[i + 14], 9, -1019803690);
        c = GG(c, d, a, b, m[i + 3], 14, -187363961);
        b = GG(b, c, d, a, m[i + 8], 20, 1163531501);
        a = GG(a, b, c, d, m[i + 13], 5, -1444681467);
        d = GG(d, a, b, c, m[i + 2], 9, -51403784);
        c = GG(c, d, a, b, m[i + 7], 14, 1735328473);
        b = GG(b, c, d, a, m[i + 12], 20, -1926607734);
        a = HH(a, b, c, d, m[i + 5], 4, -378558);
        d = HH(d, a, b, c, m[i + 8], 11, -2022574463);
        c = HH(c, d, a, b, m[i + 11], 16, 1839030562);
        b = HH(b, c, d, a, m[i + 14], 23, -35309556);
        a = HH(a, b, c, d, m[i + 1], 4, -1530992060);
        d = HH(d, a, b, c, m[i + 4], 11, 1272893353);
        c = HH(c, d, a, b, m[i + 7], 16, -155497632);
        b = HH(b, c, d, a, m[i + 10], 23, -1094730640);
        a = HH(a, b, c, d, m[i + 13], 4, 681279174);
        d = HH(d, a, b, c, m[i + 0], 11, -358537222);
        c = HH(c, d, a, b, m[i + 3], 16, -722521979);
        b = HH(b, c, d, a, m[i + 6], 23, 76029189);
        a = HH(a, b, c, d, m[i + 9], 4, -640364487);
        d = HH(d, a, b, c, m[i + 12], 11, -421815835);
        c = HH(c, d, a, b, m[i + 15], 16, 530742520);
        b = HH(b, c, d, a, m[i + 2], 23, -995338651);
        a = II(a, b, c, d, m[i + 0], 6, -198630844);
        d = II(d, a, b, c, m[i + 7], 10, 1126891415);
        c = II(c, d, a, b, m[i + 14], 15, -1416354905);
        b = II(b, c, d, a, m[i + 5], 21, -57434055);
        a = II(a, b, c, d, m[i + 12], 6, 1700485571);
        d = II(d, a, b, c, m[i + 3], 10, -1894986606);
        c = II(c, d, a, b, m[i + 10], 15, -1051523);
        b = II(b, c, d, a, m[i + 1], 21, -2054922799);
        a = II(a, b, c, d, m[i + 8], 6, 1873313359);
        d = II(d, a, b, c, m[i + 15], 10, -30611744);
        c = II(c, d, a, b, m[i + 6], 15, -1560198380);
        b = II(b, c, d, a, m[i + 13], 21, 1309151649);
        a = II(a, b, c, d, m[i + 4], 6, -145523070);
        d = II(d, a, b, c, m[i + 11], 10, -1120210379);
        c = II(c, d, a, b, m[i + 2], 15, 718787259);
        b = II(b, c, d, a, m[i + 9], 21, -343485551);
        a = a + aa >>> 0;
        b = b + bb >>> 0;
        c = c + cc >>> 0;
        d = d + dd >>> 0;
      }
      return crypt.endian([a, b, c, d]);
    };
    md5._ff = function(a, b, c, d, x, s, t) {
      var n = a + (b & c | ~b & d) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };
    md5._gg = function(a, b, c, d, x, s, t) {
      var n = a + (b & d | c & ~d) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };
    md5._hh = function(a, b, c, d, x, s, t) {
      var n = a + (b ^ c ^ d) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };
    md5._ii = function(a, b, c, d, x, s, t) {
      var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };
    md5._blocksize = 16;
    md5._digestsize = 16;
    module.exports = function(message, options) {
      if (message === undefined || message === null)
        throw new Error("Illegal argument " + message);
      var digestbytes = crypt.wordsToBytes(md5(message, options));
      return options && options.asBytes ? digestbytes : options && options.asString ? bin.bytesToString(digestbytes) : crypt.bytesToHex(digestbytes);
    };
  })();
});

// node_modules/node-ray/dist/web.esm.mjs
var _capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.substring(1);
};
var _getter = function(t, p) {
  return t[p];
};
var _xdr = function(url) {
  return globalThis.axios.get(url).then((response) => {
    if (response.status >= 200 && response.status < 300 || url.substr(0, 7) === "file://" && response.data) {
      return response.data;
    } else {
      throw new Error("HTTP status: " + response.status + " retrieving " + url);
    }
  }).catch((error) => {
    throw new Error("Error retrieving " + url + ": " + error.message);
  });
};
var getWindow = function() {
  return globalThis;
};
var _atob = function(b64str) {
  var _a, _b;
  if (typeof getWindow() !== "undefined" && ((_a = getWindow()) == null ? undefined : _a.atob)) {
    return (_b = getWindow()) == null ? undefined : _b.atob(b64str);
  } else {
    throw new Error("You must supply a polyfill for window.atob in this environment");
  }
};
var _parseJson = function(string) {
  if (typeof JSON !== "undefined" && JSON.parse) {
    return JSON.parse(string);
  } else {
    throw new Error("You must supply a polyfill for JSON.parse in this environment");
  }
};
var _findFunctionName = function(source, lineNumber) {
  const syntaxes = [
    /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/,
    /function\s+([^('"`]*?)\s*\(([^)]*)\)/,
    /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/,
    /\b(?!(?:if|for|switch|while|with|catch)\b)(?:(?:static)\s+)?([^('"`\s]+?)\s*\([^)]*\)\s*\{/,
    /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*\(.*?\)\s*=>/
  ];
  const lines = source.split("\n");
  let code = "";
  const maxLines = Math.min(lineNumber, 20);
  for (let i = 0;i < maxLines; ++i) {
    const line = lines[lineNumber - i - 1];
    const commentPos = line.indexOf("//");
    if (commentPos >= 0) {
      code = line.substr(0, commentPos);
    } else {
      code = line + code;
    }
    for (let j = 0;j < syntaxes.length; j++) {
      const m = syntaxes[j].exec(code);
      if (m && m[1]) {
        return m[1];
      }
    }
  }
  return;
};
var _ensureSupportedEnvironment = function() {
  if (typeof Object.defineProperty !== "function" || typeof Object.create !== "function") {
    throw new Error("Unable to consume source maps in older browsers");
  }
};
var _ensureStackFrameIsLegit = function(stackframe) {
  if (typeof stackframe !== "object") {
    throw new TypeError("Given StackFrame is not an object");
  } else if (typeof stackframe.fileName !== "string") {
    throw new TypeError("Given file name is not a String");
  } else if (typeof stackframe.lineNumber !== "number" || stackframe.lineNumber % 1 !== 0 || stackframe.lineNumber < 1) {
    throw new TypeError("Given line number must be a positive integer");
  } else if (typeof stackframe.columnNumber !== "number" || stackframe.columnNumber % 1 !== 0 || stackframe.columnNumber < 0) {
    throw new TypeError("Given column number must be a non-negative integer");
  }
  return true;
};
var _findSourceMappingURL = function(source) {
  const sourceMappingUrlRegExp = /\/\/[#@] ?sourceMappingURL=([^\s'"]+)\s*$/gm;
  let lastSourceMappingUrl;
  let matchSourceMappingUrl;
  while (matchSourceMappingUrl = sourceMappingUrlRegExp.exec(source)) {
    lastSourceMappingUrl = matchSourceMappingUrl[1];
  }
  if (lastSourceMappingUrl) {
    return lastSourceMappingUrl;
  } else {
    throw new Error("sourceMappingURL not found");
  }
};
var _extractLocationInfoFromSourceMapSource = function(stackframe, sourceMapConsumer, sourceCache) {
  return new Promise((resolve, reject) => {
    const loc = sourceMapConsumer.originalPositionFor({
      line: stackframe.lineNumber || 0,
      column: stackframe.columnNumber || 0
    });
    if (loc.source) {
      const mappedSource = sourceMapConsumer.sourceContentFor(loc.source);
      if (mappedSource) {
        sourceCache[loc.source] = mappedSource;
      }
      resolve(new stackframe_default({
        functionName: loc.name || stackframe.functionName,
        args: stackframe.args,
        fileName: loc.source,
        lineNumber: loc.line,
        columnNumber: loc.column
      }));
    } else {
      reject(new Error("Could not get original source for given stackframe and source map"));
    }
  });
};
var _generateError = function() {
  try {
    throw new Error;
  } catch (err) {
    return err;
  }
};
var _merge = function(first, second) {
  const target = {};
  for (const obj of [first, second]) {
    for (const prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        target[prop] = obj[prop];
      }
    }
  }
  return target;
};
var _isShapedLikeParsableError = function(err) {
  return err.stack || err["opera#sourceloc"];
};
var _filtered = function(stackframes, filter2) {
  if (typeof filter2 === "function") {
    return stackframes.filter(filter2);
  }
  return stackframes;
};
var Mixin = function(...constructors) {
  var _a, _b, _c;
  const prototypes = constructors.map((constructor) => constructor.prototype);
  const initFunctionName = settings.initFunction;
  if (initFunctionName !== null) {
    const initFunctions = prototypes.map((proto) => proto[initFunctionName]).filter((func) => typeof func === "function");
    const combinedInitFunction = __name2(function(...args) {
      for (let initFunction of initFunctions)
        initFunction.apply(this, args);
    }, "combinedInitFunction");
    const extraProto = { [initFunctionName]: combinedInitFunction };
    prototypes.push(extraProto);
  }
  function MixedClass(...args) {
    for (const constructor of constructors)
      copyProps(this, new constructor(...args));
    if (initFunctionName !== null && typeof this[initFunctionName] === "function")
      this[initFunctionName].apply(this, args);
  }
  __name2(MixedClass, "MixedClass");
  MixedClass.prototype = settings.prototypeStrategy === "copy" ? hardMixProtos(prototypes, MixedClass) : softMixProtos(prototypes, MixedClass);
  Object.setPrototypeOf(MixedClass, settings.staticsStrategy === "copy" ? hardMixProtos(constructors, null, ["prototype"]) : proxyMix(constructors, Function.prototype));
  let DecoratedMixedClass = MixedClass;
  if (settings.decoratorInheritance !== "none") {
    const classDecorators = settings.decoratorInheritance === "deep" ? deepDecoratorSearch(...constructors) : directDecoratorSearch(...constructors);
    for (let decorator of (_a = classDecorators === null || classDecorators === undefined ? undefined : classDecorators.class) !== null && _a !== undefined ? _a : []) {
      const result = decorator(DecoratedMixedClass);
      if (result) {
        DecoratedMixedClass = result;
      }
    }
    applyPropAndMethodDecorators((_b = classDecorators === null || classDecorators === undefined ? undefined : classDecorators.static) !== null && _b !== undefined ? _b : {}, DecoratedMixedClass);
    applyPropAndMethodDecorators((_c = classDecorators === null || classDecorators === undefined ? undefined : classDecorators.instance) !== null && _c !== undefined ? _c : {}, DecoratedMixedClass.prototype);
  }
  registerMixins(DecoratedMixedClass, constructors);
  return DecoratedMixedClass;
};

// node_modules/@permafrost-dev/pretty-format/dist/index.esm.mjs
var ansiRegexNs = __toESM(require_ansi_regex());
var import_ansi_styles = __toESM(require_ansi_styles());
var import_ansi_styles2 = __toESM(require_ansi_styles());
var printIteratorEntries = function(iterator, config, indentation, depth, refs, printer2, separator = ": ") {
  let result = "";
  let current = iterator.next();
  if (!current.done) {
    result += config.spacingOuter;
    const indentationNext = indentation + config.indent;
    while (!current.done) {
      const name = printer2(current.value[0], config, indentationNext, depth, refs);
      const value = printer2(current.value[1], config, indentationNext, depth, refs);
      result += indentationNext + name + separator + value;
      current = iterator.next();
      if (!current.done) {
        result += "," + config.spacingInner;
      } else if (!config.min) {
        result += ",";
      }
    }
    result += config.spacingOuter + indentation;
  }
  return result;
};
var printIteratorValues = function(iterator, config, indentation, depth, refs, printer2) {
  let result = "";
  let current = iterator.next();
  if (!current.done) {
    result += config.spacingOuter;
    const indentationNext = indentation + config.indent;
    while (!current.done) {
      result += indentationNext + printer2(current.value, config, indentationNext, depth, refs);
      current = iterator.next();
      if (!current.done) {
        result += "," + config.spacingInner;
      } else if (!config.min) {
        result += ",";
      }
    }
    result += config.spacingOuter + indentation;
  }
  return result;
};
var printListItems = function(list, config, indentation, depth, refs, printer2) {
  let result = "";
  if (list.length) {
    result += config.spacingOuter;
    const indentationNext = indentation + config.indent;
    for (let i = 0;i < list.length; i++) {
      result += indentationNext + printer2(list[i], config, indentationNext, depth, refs);
      if (i < list.length - 1) {
        result += "," + config.spacingInner;
      } else if (!config.min) {
        result += ",";
      }
    }
    result += config.spacingOuter + indentation;
  }
  return result;
};
var printObjectProperties = function(val, config, indentation, depth, refs, printer2) {
  let result = "";
  const keys = getKeysOfEnumerableProperties(val);
  if (keys.length) {
    result += config.spacingOuter;
    const indentationNext = indentation + config.indent;
    for (let i = 0;i < keys.length; i++) {
      const key = keys[i];
      const name = printer2(key, config, indentationNext, depth, refs);
      const value = printer2(val[key], config, indentationNext, depth, refs);
      result += indentationNext + name + ": " + value;
      if (i < keys.length - 1) {
        result += "," + config.spacingInner;
      } else if (!config.min) {
        result += ",";
      }
    }
    result += config.spacingOuter + indentation;
  }
  return result;
};
var escapeHTML = function(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};
var nodeIsText = function(node) {
  return node.nodeType === TEXT_NODE;
};
var nodeIsComment = function(node) {
  return node.nodeType === COMMENT_NODE;
};
var nodeIsFragment = function(node) {
  return node.nodeType === FRAGMENT_NODE;
};
var isToStringedArrayType = function(toStringed) {
  return toStringed === "[object Array]" || toStringed === "[object ArrayBuffer]" || toStringed === "[object DataView]" || toStringed === "[object Float32Array]" || toStringed === "[object Float64Array]" || toStringed === "[object Int8Array]" || toStringed === "[object Int16Array]" || toStringed === "[object Int32Array]" || toStringed === "[object Uint8Array]" || toStringed === "[object Uint8ClampedArray]" || toStringed === "[object Uint16Array]" || toStringed === "[object Uint32Array]";
};
var printNumber = function(val) {
  return Object.is(val, -0) ? "-0" : String(val);
};
var printBigInt = function(val) {
  return String(`${val}n`);
};
var printFunction = function(val, printFunctionName) {
  if (!printFunctionName) {
    return "[Function]";
  }
  return "[Function " + (val.name || "anonymous") + "]";
};
var printSymbol = function(val) {
  return String(val).replace(SYMBOL_REGEXP, "Symbol($1)");
};
var printError = function(val) {
  return "[" + errorToString.call(val) + "]";
};
var printBasicValue = function(val, printFunctionName, escapeRegex, escapeString) {
  if (val === true || val === false) {
    return "" + val;
  }
  if (val === undefined) {
    return "undefined";
  }
  if (val === null) {
    return "null";
  }
  const typeOf = typeof val;
  if (typeOf === "number") {
    return printNumber(val);
  }
  if (typeOf === "bigint") {
    return printBigInt(val);
  }
  if (typeOf === "string") {
    if (escapeString) {
      return '"' + val.replace(/"|\\/g, "\\$&") + '"';
    }
    return '"' + val + '"';
  }
  if (typeOf === "function") {
    return printFunction(val, printFunctionName);
  }
  if (typeOf === "symbol") {
    return printSymbol(val);
  }
  const toStringed = toString.call(val);
  if (toStringed === "[object WeakMap]") {
    return "WeakMap {}";
  }
  if (toStringed === "[object WeakSet]") {
    return "WeakSet {}";
  }
  if (toStringed === "[object Function]" || toStringed === "[object GeneratorFunction]") {
    return printFunction(val, printFunctionName);
  }
  if (toStringed === "[object Symbol]") {
    return printSymbol(val);
  }
  if (toStringed === "[object Date]") {
    return isNaN(+val) ? "Date { NaN }" : toISOString.call(val);
  }
  if (toStringed === "[object Error]") {
    return printError(val);
  }
  if (toStringed === "[object RegExp]") {
    if (escapeRegex) {
      return regExpToString.call(val).replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    return regExpToString.call(val);
  }
  if (val instanceof Error) {
    return printError(val);
  }
  return null;
};
var printComplexValue = function(val, config, indentation, depth, refs, hasCalledToJSON) {
  if (refs.indexOf(val) !== -1) {
    return "[Circular]";
  }
  refs = refs.slice();
  refs.push(val);
  const hitMaxDepth = ++depth > config.maxDepth;
  const min = config.min;
  if (config.callToJSON && !hitMaxDepth && val.toJSON && typeof val.toJSON === "function" && !hasCalledToJSON) {
    return printer(val.toJSON(), config, indentation, depth, refs, true);
  }
  const toStringed = toString.call(val);
  if (toStringed === "[object Arguments]") {
    return hitMaxDepth ? "[Arguments]" : (min ? "" : "Arguments ") + "[" + printListItems(val, config, indentation, depth, refs, printer) + "]";
  }
  if (isToStringedArrayType(toStringed)) {
    return hitMaxDepth ? "[" + val.constructor.name + "]" : (min ? "" : val.constructor.name + " ") + "[" + printListItems(val, config, indentation, depth, refs, printer) + "]";
  }
  if (toStringed === "[object Map]") {
    return hitMaxDepth ? "[Map]" : "Map {" + printIteratorEntries(val.entries(), config, indentation, depth, refs, printer, " => ") + "}";
  }
  if (toStringed === "[object Set]") {
    return hitMaxDepth ? "[Set]" : "Set {" + printIteratorValues(val.values(), config, indentation, depth, refs, printer) + "}";
  }
  return hitMaxDepth || isWindow(val) ? "[" + getConstructorName(val) + "]" : (min ? "" : getConstructorName(val) + " ") + "{" + printObjectProperties(val, config, indentation, depth, refs, printer) + "}";
};
var isNewPlugin = function(plugin4) {
  return plugin4.serialize != null;
};
var printPlugin = function(plugin4, val, config, indentation, depth, refs) {
  let printed;
  try {
    printed = isNewPlugin(plugin4) ? plugin4.serialize(val, config, indentation, depth, refs, printer) : plugin4.print(val, (valChild) => printer(valChild, config, indentation, depth, refs), (str) => {
      const indentationNext = indentation + config.indent;
      return indentationNext + str.replace(NEWLINE_REGEXP, "\n" + indentationNext);
    }, {
      edgeSpacing: config.spacingOuter,
      min: config.min,
      spacing: config.spacingInner
    }, config.colors);
  } catch (error) {
    throw new PrettyFormatPluginError(error.message, error.stack);
  }
  if (typeof printed !== "string") {
    throw new Error(`pretty-format: Plugin must return type "string" but instead returned "${typeof printed}".`);
  }
  return printed;
};
var findPlugin = function(plugins2, val) {
  for (let p = 0;p < plugins2.length; p++) {
    try {
      if (plugins2[p].test(val)) {
        return plugins2[p];
      }
    } catch (error) {
      throw new PrettyFormatPluginError(error.message, error.stack);
    }
  }
  return null;
};
var printer = function(val, config, indentation, depth, refs, hasCalledToJSON) {
  const plugin4 = findPlugin(config.plugins, val);
  if (plugin4 !== null) {
    return printPlugin(plugin4, val, config, indentation, depth, refs);
  }
  const basicResult = printBasicValue(val, config.printFunctionName, config.escapeRegex, config.escapeString);
  if (basicResult !== null) {
    return basicResult;
  }
  return printComplexValue(val, config, indentation, depth, refs, hasCalledToJSON);
};
var validateOptions = function(options) {
  Object.keys(options).forEach((key) => {
    if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
      throw new Error(`pretty-format: Unknown option "${key}".`);
    }
  });
  if (options.min && options.indent !== undefined && options.indent !== 0) {
    throw new Error('pretty-format: Options "min" and "indent" cannot be used together.');
  }
  if (options.theme !== undefined) {
    if (options.theme === null) {
      throw new Error(`pretty-format: Option "theme" must not be null.`);
    }
    if (typeof options.theme !== "object") {
      throw new Error(`pretty-format: Option "theme" must be of type "object" but instead received "${typeof options.theme}".`);
    }
  }
};
var createIndent = function(indent) {
  return new Array(indent + 1).join(" ");
};
var format = function(val, options) {
  if (options) {
    validateOptions(options);
    if (options.plugins) {
      const plugin4 = findPlugin(options.plugins, val);
      if (plugin4 !== null) {
        return printPlugin(plugin4, val, getConfig(options), "", 0, []);
      }
    }
  }
  const basicResult = printBasicValue(val, getPrintFunctionName(options), getEscapeRegex(options), getEscapeString(options));
  if (basicResult !== null) {
    return basicResult;
  }
  return printComplexValue(val, getConfig(options), "", 0, []);
};
var __defProp2 = Object.defineProperty;
var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
var getKeysOfEnumerableProperties = __name((object) => {
  const keys = Object.keys(object).sort();
  if (Object.getOwnPropertySymbols) {
    Object.getOwnPropertySymbols(object).forEach((symbol) => {
      if (Object.getOwnPropertyDescriptor(object, symbol).enumerable) {
        keys.push(symbol);
      }
    });
  }
  return keys;
}, "getKeysOfEnumerableProperties");
__name(printIteratorEntries, "printIteratorEntries");
__name(printIteratorValues, "printIteratorValues");
__name(printListItems, "printListItems");
__name(printObjectProperties, "printObjectProperties");
__name(escapeHTML, "escapeHTML");
var TEXT_NODE = 3;
var COMMENT_NODE = 8;
var FRAGMENT_NODE = 11;
__name(nodeIsText, "nodeIsText");
__name(nodeIsComment, "nodeIsComment");
__name(nodeIsFragment, "nodeIsFragment");
var toString = Object.prototype.toString;
var toISOString = Date.prototype.toISOString;
var errorToString = Error.prototype.toString;
var regExpToString = RegExp.prototype.toString;
var getConstructorName = __name((val) => typeof val.constructor === "function" && val.constructor.name || "Object", "getConstructorName");
var isWindow = __name((val) => typeof window !== "undefined" && val === window, "isWindow");
var SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
var NEWLINE_REGEXP = /\n/gi;
var PrettyFormatPluginError = class extends Error {
  constructor(message, stack) {
    super(message);
    this.stack = stack;
    this.name = this.constructor.name;
  }
};
__name(PrettyFormatPluginError, "PrettyFormatPluginError");
__name(isToStringedArrayType, "isToStringedArrayType");
__name(printNumber, "printNumber");
__name(printBigInt, "printBigInt");
__name(printFunction, "printFunction");
__name(printSymbol, "printSymbol");
__name(printError, "printError");
__name(printBasicValue, "printBasicValue");
__name(printComplexValue, "printComplexValue");
__name(isNewPlugin, "isNewPlugin");
__name(printPlugin, "printPlugin");
__name(findPlugin, "findPlugin");
__name(printer, "printer");
var DEFAULT_THEME = {
  comment: "gray",
  content: "reset",
  prop: "yellow",
  tag: "cyan",
  value: "green"
};
var DEFAULT_THEME_KEYS = Object.keys(DEFAULT_THEME);
var DEFAULT_OPTIONS = {
  callToJSON: true,
  escapeRegex: false,
  escapeString: true,
  highlight: false,
  indent: 2,
  maxDepth: Infinity,
  min: false,
  plugins: [],
  printFunctionName: true,
  theme: DEFAULT_THEME
};
__name(validateOptions, "validateOptions");
var getColorsHighlight = __name((options) => DEFAULT_THEME_KEYS.reduce((colors, key) => {
  const value = options.theme && options.theme[key] !== undefined ? options.theme[key] : DEFAULT_THEME[key];
  const color = value && import_ansi_styles2.default[value];
  if (color && typeof color.close === "string" && typeof color.open === "string") {
    colors[key] = color;
  } else {
    throw new Error(`pretty-format: Option "theme" has a key "${key}" whose value "${value}" is undefined in ansi-styles.`);
  }
  return colors;
}, Object.create(null)), "getColorsHighlight");
var getColorsEmpty = __name(() => DEFAULT_THEME_KEYS.reduce((colors, key) => {
  colors[key] = { close: "", open: "" };
  return colors;
}, Object.create(null)), "getColorsEmpty");
var getPrintFunctionName = __name((options) => options && options.printFunctionName !== undefined ? options.printFunctionName : DEFAULT_OPTIONS.printFunctionName, "getPrintFunctionName");
var getEscapeRegex = __name((options) => options && options.escapeRegex !== undefined ? options.escapeRegex : DEFAULT_OPTIONS.escapeRegex, "getEscapeRegex");
var getEscapeString = __name((options) => options && options.escapeString !== undefined ? options.escapeString : DEFAULT_OPTIONS.escapeString, "getEscapeString");
var getConfig = __name((options) => ({
  callToJSON: options && options.callToJSON !== undefined ? options.callToJSON : DEFAULT_OPTIONS.callToJSON,
  colors: options && options.highlight ? getColorsHighlight(options) : getColorsEmpty(),
  escapeRegex: getEscapeRegex(options),
  escapeString: getEscapeString(options),
  indent: options && options.min ? "" : createIndent(options && options.indent !== undefined ? options.indent : DEFAULT_OPTIONS.indent),
  maxDepth: options && options.maxDepth !== undefined ? options.maxDepth : DEFAULT_OPTIONS.maxDepth,
  min: options && options.min !== undefined ? options.min : DEFAULT_OPTIONS.min,
  plugins: options && options.plugins !== undefined ? options.plugins : DEFAULT_OPTIONS.plugins,
  printFunctionName: getPrintFunctionName(options),
  spacingInner: options && options.min ? " " : "\n",
  spacingOuter: options && options.min ? "" : "\n"
}), "getConfig");
__name(createIndent, "createIndent");
__name(format, "format");

// node_modules/node-ray/dist/web.esm.mjs
var dayjs = __toESM(require_dayjs_min());

// node_modules/uuid/dist/esm-browser/rng.js
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}

// node_modules/uuid/dist/esm-browser/stringify.js
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
var byteToHex = [];
for (let i = 0;i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}

// node_modules/uuid/dist/esm-browser/native.js
var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var native_default = {
  randomUUID
};

// node_modules/uuid/dist/esm-browser/v4.js
var v4 = function(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0;i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
};
var v4_default = v4;
// node_modules/node-ray/dist/web.esm.mjs
var import_xml_formatter = __toESM(require_cjs2());
var xmlfmt = __toESM(require_cjs2());
var randomInteger = function(minimum, maximum) {
  if (maximum === undefined) {
    maximum = minimum;
    minimum = 0;
  }
  if (typeof minimum !== "number" || typeof maximum !== "number") {
    throw new TypeError("Expected all arguments to be numbers");
  }
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
};

// node_modules/axios/lib/helpers/bind.js
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

// node_modules/axios/lib/utils.js
var isBuffer = function(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
};
var isArrayBufferView = function(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
};
var forEach = function(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i = 0, l = obj.length;i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0;i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
};
var findKey = function(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
};
var merge = function() {
  const { caseless } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length;i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
};
var isSpecCompliantForm = function(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
};
var { toString: toString2 } = Object.prototype;
var { getPrototypeOf } = Object;
var kindOf = ((cache) => (thing) => {
  const str = toString2.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));
var kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
var typeOfTest = (type) => (thing) => typeof thing === type;
var { isArray } = Array;
var isUndefined = typeOfTest("undefined");
var isArrayBuffer = kindOfTest("ArrayBuffer");
var isString = typeOfTest("string");
var isFunction = typeOfTest("function");
var isNumber = typeOfTest("number");
var isObject = (thing) => thing !== null && typeof thing === "object";
var isBoolean = (thing) => thing === true || thing === false;
var isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};
var isDate = kindOfTest("Date");
var isFile = kindOfTest("File");
var isBlob = kindOfTest("Blob");
var isFileList = kindOfTest("FileList");
var isStream = (val) => isObject(val) && isFunction(val.pipe);
var isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
};
var isURLSearchParams = kindOfTest("URLSearchParams");
var trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
var _global = (() => {
  if (typeof globalThis !== "undefined")
    return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
var isContextDefined = (context) => !isUndefined(context) && context !== _global;
var extend = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, { allOwnKeys });
  return a;
};
var stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
var inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
var toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null)
    return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
var endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
var toArray = (thing) => {
  if (!thing)
    return null;
  if (isArray(thing))
    return thing;
  let i = thing.length;
  if (!isNumber(i))
    return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
var isTypedArray = ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
var forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];
  const iterator = generator.call(obj);
  let result;
  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
var matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
var isHTMLForm = kindOfTest("HTMLFormElement");
var toCamelCase = (str) => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
    return p1.toUpperCase() + p2;
  });
};
var hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
var isRegExp = kindOfTest("RegExp");
var reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors, (descriptor, name) => {
    if (reducer(descriptor, name, obj) !== false) {
      reducedDescriptors[name] = descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
var freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction(value))
      return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method \'" + name + "\'");
      };
    }
  });
};
var toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define2 = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define2(arrayOrString) : define2(String(arrayOrString).split(delimiter));
  return obj;
};
var noop = () => {
};
var toFiniteNumber = (value, defaultValue) => {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
};
var ALPHA = "abcdefghijklmnopqrstuvwxyz";
var DIGIT = "0123456789";
var ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};
var generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = "";
  const { length } = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length | 0];
  }
  return str;
};
var toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (!("toJSON" in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i] = undefined;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
var isAsyncFn = kindOfTest("AsyncFunction");
var isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
var utils_default = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable
};

// node_modules/axios/lib/core/AxiosError.js
var AxiosError = function(message, code, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
};
utils_default.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: utils_default.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
var prototype = AxiosError.prototype;
var descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, "isAxiosError", { value: true });
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype);
  utils_default.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  AxiosError.call(axiosError, error.message, code, config, request, response);
  axiosError.cause = error;
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
var AxiosError_default = AxiosError;

// node_modules/axios/lib/helpers/null.js
var null_default = null;

// node_modules/axios/lib/helpers/toFormData.js
var isVisitable = function(thing) {
  return utils_default.isPlainObject(thing) || utils_default.isArray(thing);
};
var removeBrackets = function(key) {
  return utils_default.endsWith(key, "[]") ? key.slice(0, -2) : key;
};
var renderKey = function(path, key, dots) {
  if (!path)
    return key;
  return path.concat(key).map(function each(token, i) {
    token = removeBrackets(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
};
var isFlatArray = function(arr) {
  return utils_default.isArray(arr) && !arr.some(isVisitable);
};
var toFormData = function(obj, formData, options) {
  if (!utils_default.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new (null_default || FormData);
  options = utils_default.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils_default.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils_default.isSpecCompliantForm(formData);
  if (!utils_default.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null)
      return "";
    if (utils_default.isDate(value)) {
      return value.toISOString();
    }
    if (!useBlob && utils_default.isBlob(value)) {
      throw new AxiosError_default("Blob is not supported. Use a Buffer instead.");
    }
    if (utils_default.isArrayBuffer(value) || utils_default.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === "object") {
      if (utils_default.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils_default.isArray(value) && isFlatArray(value) || (utils_default.isFileList(value) || utils_default.endsWith(key, "[]")) && (arr = utils_default.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils_default.isUndefined(el) || el === null) && formData.append(indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]", convertValue(el));
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils_default.isUndefined(value))
      return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils_default.forEach(value, function each(el, key) {
      const result = !(utils_default.isUndefined(el) || el === null) && visitor.call(formData, el, utils_default.isString(key) ? key.trim() : key, path, exposedHelpers);
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils_default.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
};
var predicates = utils_default.toFlatObject(utils_default, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
var toFormData_default = toFormData;

// node_modules/axios/lib/helpers/AxiosURLSearchParams.js
var encode = function(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
};
var AxiosURLSearchParams = function(params, options) {
  this._pairs = [];
  params && toFormData_default(params, this, options);
};
var prototype2 = AxiosURLSearchParams.prototype;
prototype2.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype2.toString = function toString3(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode);
  } : encode;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
var AxiosURLSearchParams_default = AxiosURLSearchParams;

// node_modules/axios/lib/helpers/buildURL.js
var encode2 = function(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
};
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  const _encode = options && options.encode || encode2;
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils_default.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams_default(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}

// node_modules/axios/lib/core/InterceptorManager.js
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  forEach(fn) {
    utils_default.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}
var InterceptorManager_default = InterceptorManager;

// node_modules/axios/lib/defaults/transitional.js
var transitional_default = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

// node_modules/axios/lib/platform/browser/classes/URLSearchParams.js
var URLSearchParams_default = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams_default;

// node_modules/axios/lib/platform/browser/classes/FormData.js
var FormData_default = typeof FormData !== "undefined" ? FormData : null;

// node_modules/axios/lib/platform/browser/classes/Blob.js
var Blob_default = typeof Blob !== "undefined" ? Blob : null;

// node_modules/axios/lib/platform/browser/index.js
var isStandardBrowserEnv = (() => {
  let product;
  if (typeof navigator !== "undefined" && ((product = navigator.product) === "ReactNative" || product === "NativeScript" || product === "NS")) {
    return false;
  }
  return typeof window !== "undefined" && typeof document !== "undefined";
})();
var isStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
var browser_default = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams_default,
    FormData: FormData_default,
    Blob: Blob_default
  },
  isStandardBrowserEnv,
  isStandardBrowserWebWorkerEnv,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};

// node_modules/axios/lib/helpers/toURLEncodedForm.js
function toURLEncodedForm(data, options) {
  return toFormData_default(data, new browser_default.classes.URLSearchParams, Object.assign({
    visitor: function(value, key, path, helpers) {
      if (browser_default.isNode && utils_default.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}

// node_modules/axios/lib/helpers/formDataToJSON.js
var parsePropPath = function(name) {
  return utils_default.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
};
var arrayToObject = function(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0;i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
};
var formDataToJSON = function(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils_default.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils_default.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils_default.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils_default.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils_default.isFormData(formData) && utils_default.isFunction(formData.entries)) {
    const obj = {};
    utils_default.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
};
var formDataToJSON_default = formDataToJSON;

// node_modules/axios/lib/defaults/index.js
var stringifySafely = function(rawValue, parser, encoder) {
  if (utils_default.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils_default.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
};
var DEFAULT_CONTENT_TYPE = {
  "Content-Type": undefined
};
var defaults = {
  transitional: transitional_default,
  adapter: ["xhr", "http"],
  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils_default.isObject(data);
    if (isObjectPayload && utils_default.isHTMLForm(data)) {
      data = new FormData(data);
    }
    const isFormData2 = utils_default.isFormData(data);
    if (isFormData2) {
      if (!hasJSONContentType) {
        return data;
      }
      return hasJSONContentType ? JSON.stringify(formDataToJSON_default(data)) : data;
    }
    if (utils_default.isArrayBuffer(data) || utils_default.isBuffer(data) || utils_default.isStream(data) || utils_default.isFile(data) || utils_default.isBlob(data)) {
      return data;
    }
    if (utils_default.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils_default.isURLSearchParams(data)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }
      if ((isFileList2 = utils_default.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData_default(isFileList2 ? { "files[]": data } : data, _FormData && new _FormData, this.formSerializer);
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (data && utils_default.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError_default.from(e, AxiosError_default.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: browser_default.classes.FormData,
    Blob: browser_default.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  }
};
utils_default.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});
utils_default.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  defaults.headers[method] = utils_default.merge(DEFAULT_CONTENT_TYPE);
});
var defaults_default = defaults;

// node_modules/axios/lib/helpers/parseHeaders.js
var ignoreDuplicateOf = utils_default.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
var parseHeaders_default = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};

// node_modules/axios/lib/core/AxiosHeaders.js
var normalizeHeader = function(header) {
  return header && String(header).trim().toLowerCase();
};
var normalizeValue = function(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils_default.isArray(value) ? value.map(normalizeValue) : String(value);
};
var parseTokens = function(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
};
var matchHeaderValue = function(context, value, header, filter2, isHeaderNameFilter) {
  if (utils_default.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils_default.isString(value))
    return;
  if (utils_default.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils_default.isRegExp(filter2)) {
    return filter2.test(value);
  }
};
var formatHeader = function(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
    return char.toUpperCase() + str;
  });
};
var buildAccessors = function(obj, header) {
  const accessorName = utils_default.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
};
var $internals = Symbol("internals");
var isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils_default.findKey(self2, lHeader);
      if (!key || self2[key] === undefined || _rewrite === true || _rewrite === undefined && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils_default.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils_default.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils_default.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders_default(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils_default.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils_default.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils_default.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils_default.findKey(this, header);
      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils_default.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils_default.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;
    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format2) {
    const self2 = this;
    const headers = {};
    utils_default.forEach(this, (value, header) => {
      const key = utils_default.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format2 ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = Object.create(null);
    utils_default.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils_default.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype3 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype3, _header);
        accessors[lHeader] = true;
      }
    }
    utils_default.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
}
AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils_default.freezeMethods(AxiosHeaders.prototype);
utils_default.freezeMethods(AxiosHeaders);
var AxiosHeaders_default = AxiosHeaders;

// node_modules/axios/lib/core/transformData.js
function transformData(fns, response) {
  const config = this || defaults_default;
  const context = response || config;
  const headers = AxiosHeaders_default.from(context.headers);
  let data = context.data;
  utils_default.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });
  headers.normalize();
  return data;
}

// node_modules/axios/lib/cancel/isCancel.js
function isCancel(value) {
  return !!(value && value.__CANCEL__);
}

// node_modules/axios/lib/cancel/CanceledError.js
var CanceledError = function(message, config, request) {
  AxiosError_default.call(this, message == null ? "canceled" : message, AxiosError_default.ERR_CANCELED, config, request);
  this.name = "CanceledError";
};
utils_default.inherits(CanceledError, AxiosError_default, {
  __CANCEL__: true
});
var CanceledError_default = CanceledError;

// node_modules/axios/lib/core/settle.js
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError_default("Request failed with status code " + response.status, [AxiosError_default.ERR_BAD_REQUEST, AxiosError_default.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
  }
}

// node_modules/axios/lib/helpers/cookies.js
var cookies_default = browser_default.isStandardBrowserEnv ? function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      const cookie = [];
      cookie.push(name + "=" + encodeURIComponent(value));
      if (utils_default.isNumber(expires)) {
        cookie.push("expires=" + new Date(expires).toGMTString());
      }
      if (utils_default.isString(path)) {
        cookie.push("path=" + path);
      }
      if (utils_default.isString(domain)) {
        cookie.push("domain=" + domain);
      }
      if (secure === true) {
        cookie.push("secure");
      }
      document.cookie = cookie.join("; ");
    },
    read: function read(name) {
      const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, "", Date.now() - 86400000);
    }
  };
}() : function nonStandardBrowserEnv() {
  return {
    write: function write() {
    },
    read: function read() {
      return null;
    },
    remove: function remove() {
    }
  };
}();

// node_modules/axios/lib/helpers/isAbsoluteURL.js
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

// node_modules/axios/lib/helpers/combineURLs.js
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}

// node_modules/axios/lib/core/buildFullPath.js
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

// node_modules/axios/lib/helpers/isURLSameOrigin.js
var isURLSameOrigin_default = browser_default.isStandardBrowserEnv ? function standardBrowserEnv2() {
  const msie = /(msie|trident)/i.test(navigator.userAgent);
  const urlParsingNode = document.createElement("a");
  let originURL;
  function resolveURL(url) {
    let href = url;
    if (msie) {
      urlParsingNode.setAttribute("href", href);
      href = urlParsingNode.href;
    }
    urlParsingNode.setAttribute("href", href);
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
    };
  }
  originURL = resolveURL(window.location.href);
  return function isURLSameOrigin(requestURL) {
    const parsed = utils_default.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : function nonStandardBrowserEnv2() {
  return function isURLSameOrigin() {
    return true;
  };
}();

// node_modules/axios/lib/helpers/parseProtocol.js
function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || "";
}

// node_modules/axios/lib/helpers/speedometer.js
var speedometer = function(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== undefined ? min : 1000;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
};
var speedometer_default = speedometer;

// node_modules/axios/lib/adapters/xhr.js
var progressEventReducer = function(listener, isDownloadStream) {
  let bytesNotified = 0;
  const _speedometer = speedometer_default(50, 250);
  return (e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e
    };
    data[isDownloadStream ? "download" : "upload"] = true;
    listener(data);
  };
};
var isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
var xhr_default = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let requestData = config.data;
    const requestHeaders = AxiosHeaders_default.from(config.headers).normalize();
    const responseType = config.responseType;
    let onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }
      if (config.signal) {
        config.signal.removeEventListener("abort", onCanceled);
      }
    }
    if (utils_default.isFormData(requestData)) {
      if (browser_default.isStandardBrowserEnv || browser_default.isStandardBrowserWebWorkerEnv) {
        requestHeaders.setContentType(false);
      } else {
        requestHeaders.setContentType("multipart/form-data;", false);
      }
    }
    let request = new XMLHttpRequest;
    if (config.auth) {
      const username = config.auth.username || "";
      const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
      requestHeaders.set("Authorization", "Basic " + btoa(username + ":" + password));
    }
    const fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
    request.timeout = config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders_default.from(("getAllResponseHeaders" in request) && request.getAllResponseHeaders());
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError_default("Request aborted", AxiosError_default.ECONNABORTED, config, request));
      request = null;
    };
    request.onerror = function handleError() {
      reject(new AxiosError_default("Network Error", AxiosError_default.ERR_NETWORK, config, request));
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional3 = config.transitional || transitional_default;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError_default(timeoutErrorMessage, transitional3.clarifyTimeoutError ? AxiosError_default.ETIMEDOUT : AxiosError_default.ECONNABORTED, config, request));
      request = null;
    };
    if (browser_default.isStandardBrowserEnv) {
      const xsrfValue = (config.withCredentials || isURLSameOrigin_default(fullPath)) && config.xsrfCookieName && cookies_default.read(config.xsrfCookieName);
      if (xsrfValue) {
        requestHeaders.set(config.xsrfHeaderName, xsrfValue);
      }
    }
    requestData === undefined && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils_default.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils_default.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = config.responseType;
    }
    if (typeof config.onDownloadProgress === "function") {
      request.addEventListener("progress", progressEventReducer(config.onDownloadProgress, true));
    }
    if (typeof config.onUploadProgress === "function" && request.upload) {
      request.upload.addEventListener("progress", progressEventReducer(config.onUploadProgress));
    }
    if (config.cancelToken || config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError_default(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(fullPath);
    if (protocol && browser_default.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError_default("Unsupported protocol " + protocol + ":", AxiosError_default.ERR_BAD_REQUEST, config));
      return;
    }
    request.send(requestData || null);
  });
};

// node_modules/axios/lib/adapters/adapters.js
var knownAdapters = {
  http: null_default,
  xhr: xhr_default
};
utils_default.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
var adapters_default = {
  getAdapter: (adapters) => {
    adapters = utils_default.isArray(adapters) ? adapters : [adapters];
    const { length } = adapters;
    let nameOrAdapter;
    let adapter;
    for (let i = 0;i < length; i++) {
      nameOrAdapter = adapters[i];
      if (adapter = utils_default.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter) {
        break;
      }
    }
    if (!adapter) {
      if (adapter === false) {
        throw new AxiosError_default(`Adapter ${nameOrAdapter} is not supported by the environment`, "ERR_NOT_SUPPORT");
      }
      throw new Error(utils_default.hasOwnProp(knownAdapters, nameOrAdapter) ? `Adapter '${nameOrAdapter}' is not available in the build` : `Unknown adapter '${nameOrAdapter}'`);
    }
    if (!utils_default.isFunction(adapter)) {
      throw new TypeError("adapter is not a function");
    }
    return adapter;
  },
  adapters: knownAdapters
};

// node_modules/axios/lib/core/dispatchRequest.js
var throwIfCancellationRequested = function(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError_default(null, config);
  }
};
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders_default.from(config.headers);
  config.data = transformData.call(config, config.transformRequest);
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters_default.getAdapter(config.adapter || defaults_default.adapter);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(config, config.transformResponse, response);
    response.headers = AxiosHeaders_default.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(config, config.transformResponse, reason.response);
        reason.response.headers = AxiosHeaders_default.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}

// node_modules/axios/lib/core/mergeConfig.js
var headersToObject = (thing) => thing instanceof AxiosHeaders_default ? thing.toJSON() : thing;
function mergeConfig(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, caseless) {
    if (utils_default.isPlainObject(target) && utils_default.isPlainObject(source)) {
      return utils_default.merge.call({ caseless }, target, source);
    } else if (utils_default.isPlainObject(source)) {
      return utils_default.merge({}, source);
    } else if (utils_default.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b, caseless) {
    if (!utils_default.isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!utils_default.isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
    }
  }
  function valueFromConfig2(a, b) {
    if (!utils_default.isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }
  function defaultToConfig2(a, b) {
    if (!utils_default.isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!utils_default.isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
  };
  utils_default.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils_default.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}

// node_modules/axios/lib/env/data.js
var VERSION = "1.4.0";

// node_modules/axios/lib/helpers/validator.js
var assertOptions = function(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError_default("options must be an object", AxiosError_default.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError_default("option " + opt + " must be " + result, AxiosError_default.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError_default("Unknown option " + opt, AxiosError_default.ERR_BAD_OPTION);
    }
  }
};
var validators = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
  validators[type] = function validator(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
var deprecatedWarnings = {};
validators.transitional = function transitional3(validator, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option \'" + opt + "\'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator === false) {
      throw new AxiosError_default(formatMessage(opt, " has been removed" + (version ? " in " + version : "")), AxiosError_default.ERR_DEPRECATED);
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
    }
    return validator ? validator(value, opt, opts) : true;
  };
};
var validator_default = {
  assertOptions,
  validators
};

// node_modules/axios/lib/core/Axios.js
var validators2 = validator_default.validators;

class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager_default,
      response: new InterceptorManager_default
    };
  }
  request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig(this.defaults, config);
    const { transitional: transitional4, paramsSerializer, headers } = config;
    if (transitional4 !== undefined) {
      validator_default.assertOptions(transitional4, {
        silentJSONParsing: validators2.transitional(validators2.boolean),
        forcedJSONParsing: validators2.transitional(validators2.boolean),
        clarifyTimeoutError: validators2.transitional(validators2.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils_default.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator_default.assertOptions(paramsSerializer, {
          encode: validators2.function,
          serialize: validators2.function
        }, true);
      }
    }
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders;
    contextHeaders = headers && utils_default.merge(headers.common, headers[config.method]);
    contextHeaders && utils_default.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (method) => {
      delete headers[method];
    });
    config.headers = AxiosHeaders_default.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    i = 0;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}
utils_default.forEach(["delete", "get", "head", "options"], function forEachMethodNoData2(method) {
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils_default.forEach(["post", "put", "patch"], function forEachMethodWithData2(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data2, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data: data2
      }));
    };
  }
  Axios.prototype[method] = generateHTTPMethod();
  Axios.prototype[method + "Form"] = generateHTTPMethod(true);
});
var Axios_default = Axios;

// node_modules/axios/lib/cancel/CancelToken.js
class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners)
        return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError_default(message, config, request);
      resolvePromise(token.reason);
    });
  }
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
}
var CancelToken_default = CancelToken;

// node_modules/axios/lib/helpers/spread.js
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

// node_modules/axios/lib/helpers/isAxiosError.js
function isAxiosError(payload) {
  return utils_default.isObject(payload) && payload.isAxiosError === true;
}

// node_modules/axios/lib/helpers/HttpStatusCode.js
var HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});
var HttpStatusCode_default = HttpStatusCode;

// node_modules/axios/lib/axios.js
var createInstance = function(defaultConfig) {
  const context = new Axios_default(defaultConfig);
  const instance = bind(Axios_default.prototype.request, context);
  utils_default.extend(instance, Axios_default.prototype, context, { allOwnKeys: true });
  utils_default.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };
  return instance;
};
var axios = createInstance(defaults_default);
axios.Axios = Axios_default;
axios.CanceledError = CanceledError_default;
axios.CancelToken = CancelToken_default;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData_default;
axios.AxiosError = AxiosError_default;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;
axios.isAxiosError = isAxiosError;
axios.mergeConfig = mergeConfig;
axios.AxiosHeaders = AxiosHeaders_default;
axios.formToJSON = (thing) => formDataToJSON_default(utils_default.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.HttpStatusCode = HttpStatusCode_default;
axios.default = axios;
var axios_default = axios;

// node_modules/node-ray/dist/web.esm.mjs
var StopWatches = __toESM(require_stopwatch());
var import_dayjs = __toESM(require_dayjs_min());
var md5lib = __toESM(require_md5());
var standaloneInitialization = function() {
  if (typeof globalThis["window"] !== "undefined") {
    window["Ray"] = {
      ray,
      Ray
    };
    window["rayInit"] = standalone;
  }
};
var __create2 = Object.create;
var __defProp3 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf2 = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __name2 = (target, value) => __defProp3(target, "name", { value, configurable: true });
var __commonJS2 = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp3(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp3(target, "default", { value: mod, enumerable: true }) : target, mod));
var require_base64 = __commonJS2({
  "node_modules/source-map/lib/base64.js"(exports) {
    var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    exports.encode = function(number) {
      if (0 <= number && number < intToCharMap.length) {
        return intToCharMap[number];
      }
      throw new TypeError("Must be between 0 and 63: " + number);
    };
    exports.decode = function(charCode) {
      var bigA = 65;
      var bigZ = 90;
      var littleA = 97;
      var littleZ = 122;
      var zero = 48;
      var nine = 57;
      var plus = 43;
      var slash = 47;
      var littleOffset = 26;
      var numberOffset = 52;
      if (bigA <= charCode && charCode <= bigZ) {
        return charCode - bigA;
      }
      if (littleA <= charCode && charCode <= littleZ) {
        return charCode - littleA + littleOffset;
      }
      if (zero <= charCode && charCode <= nine) {
        return charCode - zero + numberOffset;
      }
      if (charCode == plus) {
        return 62;
      }
      if (charCode == slash) {
        return 63;
      }
      return -1;
    };
  }
});
var require_base64_vlq = __commonJS2({
  "node_modules/source-map/lib/base64-vlq.js"(exports) {
    var base64 = require_base64();
    var VLQ_BASE_SHIFT = 5;
    var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
    var VLQ_BASE_MASK = VLQ_BASE - 1;
    var VLQ_CONTINUATION_BIT = VLQ_BASE;
    function toVLQSigned(aValue) {
      return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
    }
    __name2(toVLQSigned, "toVLQSigned");
    function fromVLQSigned(aValue) {
      var isNegative = (aValue & 1) === 1;
      var shifted = aValue >> 1;
      return isNegative ? -shifted : shifted;
    }
    __name2(fromVLQSigned, "fromVLQSigned");
    exports.encode = __name2(function base64VLQ_encode(aValue) {
      var encoded = "";
      var digit;
      var vlq = toVLQSigned(aValue);
      do {
        digit = vlq & VLQ_BASE_MASK;
        vlq >>>= VLQ_BASE_SHIFT;
        if (vlq > 0) {
          digit |= VLQ_CONTINUATION_BIT;
        }
        encoded += base64.encode(digit);
      } while (vlq > 0);
      return encoded;
    }, "base64VLQ_encode");
    exports.decode = __name2(function base64VLQ_decode(aStr, aIndex, aOutParam) {
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
    }, "base64VLQ_decode");
  }
});
var require_util = __commonJS2({
  "node_modules/source-map/lib/util.js"(exports) {
    function getArg(aArgs, aName, aDefaultValue) {
      if (aName in aArgs) {
        return aArgs[aName];
      } else if (arguments.length === 3) {
        return aDefaultValue;
      } else {
        throw new Error('"' + aName + '" is a required argument.');
      }
    }
    __name2(getArg, "getArg");
    exports.getArg = getArg;
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
    __name2(urlParse, "urlParse");
    exports.urlParse = urlParse;
    function urlGenerate(aParsedUrl) {
      var url = "";
      if (aParsedUrl.scheme) {
        url += aParsedUrl.scheme + ":";
      }
      url += "//";
      if (aParsedUrl.auth) {
        url += aParsedUrl.auth + "@";
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
    __name2(urlGenerate, "urlGenerate");
    exports.urlGenerate = urlGenerate;
    function normalize(aPath) {
      var path = aPath;
      var url = urlParse(aPath);
      if (url) {
        if (!url.path) {
          return aPath;
        }
        path = url.path;
      }
      var isAbsolute = exports.isAbsolute(path);
      var parts = path.split(/\/+/);
      for (var part, up = 0, i = parts.length - 1;i >= 0; i--) {
        part = parts[i];
        if (part === ".") {
          parts.splice(i, 1);
        } else if (part === "..") {
          up++;
        } else if (up > 0) {
          if (part === "") {
            parts.splice(i + 1, up);
            up = 0;
          } else {
            parts.splice(i, 2);
            up--;
          }
        }
      }
      path = parts.join("/");
      if (path === "") {
        path = isAbsolute ? "/" : ".";
      }
      if (url) {
        url.path = path;
        return urlGenerate(url);
      }
      return path;
    }
    __name2(normalize, "normalize");
    exports.normalize = normalize;
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
        aRoot = aRootUrl.path || "/";
      }
      if (aPathUrl && !aPathUrl.scheme) {
        if (aRootUrl) {
          aPathUrl.scheme = aRootUrl.scheme;
        }
        return urlGenerate(aPathUrl);
      }
      if (aPathUrl || aPath.match(dataUrlRegexp)) {
        return aPath;
      }
      if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
        aRootUrl.host = aPath;
        return urlGenerate(aRootUrl);
      }
      var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
      if (aRootUrl) {
        aRootUrl.path = joined;
        return urlGenerate(aRootUrl);
      }
      return joined;
    }
    __name2(join, "join");
    exports.join = join;
    exports.isAbsolute = function(aPath) {
      return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
    };
    function relative(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      aRoot = aRoot.replace(/\/$/, "");
      var level = 0;
      while (aPath.indexOf(aRoot + "/") !== 0) {
        var index = aRoot.lastIndexOf("/");
        if (index < 0) {
          return aPath;
        }
        aRoot = aRoot.slice(0, index);
        if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
          return aPath;
        }
        ++level;
      }
      return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
    }
    __name2(relative, "relative");
    exports.relative = relative;
    var supportsNullProto = function() {
      var obj = Object.create(null);
      return !("__proto__" in obj);
    }();
    function identity(s) {
      return s;
    }
    __name2(identity, "identity");
    function toSetString(aStr) {
      if (isProtoString(aStr)) {
        return "$" + aStr;
      }
      return aStr;
    }
    __name2(toSetString, "toSetString");
    exports.toSetString = supportsNullProto ? identity : toSetString;
    function fromSetString(aStr) {
      if (isProtoString(aStr)) {
        return aStr.slice(1);
      }
      return aStr;
    }
    __name2(fromSetString, "fromSetString");
    exports.fromSetString = supportsNullProto ? identity : fromSetString;
    function isProtoString(s) {
      if (!s) {
        return false;
      }
      var length = s.length;
      if (length < 9) {
        return false;
      }
      if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) {
        return false;
      }
      for (var i = length - 10;i >= 0; i--) {
        if (s.charCodeAt(i) !== 36) {
          return false;
        }
      }
      return true;
    }
    __name2(isProtoString, "isProtoString");
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
    __name2(compareByOriginalPositions, "compareByOriginalPositions");
    exports.compareByOriginalPositions = compareByOriginalPositions;
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
    __name2(compareByGeneratedPositionsDeflated, "compareByGeneratedPositionsDeflated");
    exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
    function strcmp(aStr1, aStr2) {
      if (aStr1 === aStr2) {
        return 0;
      }
      if (aStr1 === null) {
        return 1;
      }
      if (aStr2 === null) {
        return -1;
      }
      if (aStr1 > aStr2) {
        return 1;
      }
      return -1;
    }
    __name2(strcmp, "strcmp");
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
    __name2(compareByGeneratedPositionsInflated, "compareByGeneratedPositionsInflated");
    exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
    function parseSourceMapInput(str) {
      return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
    }
    __name2(parseSourceMapInput, "parseSourceMapInput");
    exports.parseSourceMapInput = parseSourceMapInput;
    function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
      sourceURL = sourceURL || "";
      if (sourceRoot) {
        if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") {
          sourceRoot += "/";
        }
        sourceURL = sourceRoot + sourceURL;
      }
      if (sourceMapURL) {
        var parsed = urlParse(sourceMapURL);
        if (!parsed) {
          throw new Error("sourceMapURL could not be parsed");
        }
        if (parsed.path) {
          var index = parsed.path.lastIndexOf("/");
          if (index >= 0) {
            parsed.path = parsed.path.substring(0, index + 1);
          }
        }
        sourceURL = join(urlGenerate(parsed), sourceURL);
      }
      return normalize(sourceURL);
    }
    __name2(computeSourceURL, "computeSourceURL");
    exports.computeSourceURL = computeSourceURL;
  }
});
var require_array_set = __commonJS2({
  "node_modules/source-map/lib/array-set.js"(exports) {
    var util = require_util();
    var has = Object.prototype.hasOwnProperty;
    var hasNativeMap = typeof Map !== "undefined";
    function ArraySet() {
      this._array = [];
      this._set = hasNativeMap ? new Map : Object.create(null);
    }
    __name2(ArraySet, "ArraySet");
    ArraySet.fromArray = __name2(function ArraySet_fromArray(aArray, aAllowDuplicates) {
      var set = new ArraySet;
      for (var i = 0, len = aArray.length;i < len; i++) {
        set.add(aArray[i], aAllowDuplicates);
      }
      return set;
    }, "ArraySet_fromArray");
    ArraySet.prototype.size = __name2(function ArraySet_size() {
      return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
    }, "ArraySet_size");
    ArraySet.prototype.add = __name2(function ArraySet_add(aStr, aAllowDuplicates) {
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
    }, "ArraySet_add");
    ArraySet.prototype.has = __name2(function ArraySet_has(aStr) {
      if (hasNativeMap) {
        return this._set.has(aStr);
      } else {
        var sStr = util.toSetString(aStr);
        return has.call(this._set, sStr);
      }
    }, "ArraySet_has");
    ArraySet.prototype.indexOf = __name2(function ArraySet_indexOf(aStr) {
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
    }, "ArraySet_indexOf");
    ArraySet.prototype.at = __name2(function ArraySet_at(aIdx) {
      if (aIdx >= 0 && aIdx < this._array.length) {
        return this._array[aIdx];
      }
      throw new Error("No element indexed by " + aIdx);
    }, "ArraySet_at");
    ArraySet.prototype.toArray = __name2(function ArraySet_toArray() {
      return this._array.slice();
    }, "ArraySet_toArray");
    exports.ArraySet = ArraySet;
  }
});
var require_mapping_list = __commonJS2({
  "node_modules/source-map/lib/mapping-list.js"(exports) {
    var util = require_util();
    function generatedPositionAfter(mappingA, mappingB) {
      var lineA = mappingA.generatedLine;
      var lineB = mappingB.generatedLine;
      var columnA = mappingA.generatedColumn;
      var columnB = mappingB.generatedColumn;
      return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
    }
    __name2(generatedPositionAfter, "generatedPositionAfter");
    function MappingList() {
      this._array = [];
      this._sorted = true;
      this._last = { generatedLine: -1, generatedColumn: 0 };
    }
    __name2(MappingList, "MappingList");
    MappingList.prototype.unsortedForEach = __name2(function MappingList_forEach(aCallback, aThisArg) {
      this._array.forEach(aCallback, aThisArg);
    }, "MappingList_forEach");
    MappingList.prototype.add = __name2(function MappingList_add(aMapping) {
      if (generatedPositionAfter(this._last, aMapping)) {
        this._last = aMapping;
        this._array.push(aMapping);
      } else {
        this._sorted = false;
        this._array.push(aMapping);
      }
    }, "MappingList_add");
    MappingList.prototype.toArray = __name2(function MappingList_toArray() {
      if (!this._sorted) {
        this._array.sort(util.compareByGeneratedPositionsInflated);
        this._sorted = true;
      }
      return this._array;
    }, "MappingList_toArray");
    exports.MappingList = MappingList;
  }
});
var require_source_map_generator = __commonJS2({
  "node_modules/source-map/lib/source-map-generator.js"(exports) {
    var base64VLQ = require_base64_vlq();
    var util = require_util();
    var ArraySet = require_array_set().ArraySet;
    var MappingList = require_mapping_list().MappingList;
    function SourceMapGenerator(aArgs) {
      if (!aArgs) {
        aArgs = {};
      }
      this._file = util.getArg(aArgs, "file", null);
      this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
      this._skipValidation = util.getArg(aArgs, "skipValidation", false);
      this._sources = new ArraySet;
      this._names = new ArraySet;
      this._mappings = new MappingList;
      this._sourcesContents = null;
    }
    __name2(SourceMapGenerator, "SourceMapGenerator");
    SourceMapGenerator.prototype._version = 3;
    SourceMapGenerator.fromSourceMap = __name2(function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
      var sourceRoot = aSourceMapConsumer.sourceRoot;
      var generator = new SourceMapGenerator({
        file: aSourceMapConsumer.file,
        sourceRoot
      });
      aSourceMapConsumer.eachMapping(function(mapping) {
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
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
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
    }, "SourceMapGenerator_fromSourceMap");
    SourceMapGenerator.prototype.addMapping = __name2(function SourceMapGenerator_addMapping(aArgs) {
      var generated = util.getArg(aArgs, "generated");
      var original = util.getArg(aArgs, "original", null);
      var source = util.getArg(aArgs, "source", null);
      var name = util.getArg(aArgs, "name", null);
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
        source,
        name
      });
    }, "SourceMapGenerator_addMapping");
    SourceMapGenerator.prototype.setSourceContent = __name2(function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
      var source = aSourceFile;
      if (this._sourceRoot != null) {
        source = util.relative(this._sourceRoot, source);
      }
      if (aSourceContent != null) {
        if (!this._sourcesContents) {
          this._sourcesContents = Object.create(null);
        }
        this._sourcesContents[util.toSetString(source)] = aSourceContent;
      } else if (this._sourcesContents) {
        delete this._sourcesContents[util.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null;
        }
      }
    }, "SourceMapGenerator_setSourceContent");
    SourceMapGenerator.prototype.applySourceMap = __name2(function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
      var sourceFile = aSourceFile;
      if (aSourceFile == null) {
        if (aSourceMapConsumer.file == null) {
          throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);
        }
        sourceFile = aSourceMapConsumer.file;
      }
      var sourceRoot = this._sourceRoot;
      if (sourceRoot != null) {
        sourceFile = util.relative(sourceRoot, sourceFile);
      }
      var newSources = new ArraySet;
      var newNames = new ArraySet;
      this._mappings.unsortedForEach(function(mapping) {
        if (mapping.source === sourceFile && mapping.originalLine != null) {
          var original = aSourceMapConsumer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
          });
          if (original.source != null) {
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
      aSourceMapConsumer.sources.forEach(function(sourceFile2) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile2);
        if (content != null) {
          if (aSourceMapPath != null) {
            sourceFile2 = util.join(aSourceMapPath, sourceFile2);
          }
          if (sourceRoot != null) {
            sourceFile2 = util.relative(sourceRoot, sourceFile2);
          }
          this.setSourceContent(sourceFile2, content);
        }
      }, this);
    }, "SourceMapGenerator_applySourceMap");
    SourceMapGenerator.prototype._validateMapping = __name2(function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
      if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
        throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
      }
      if (aGenerated && ("line" in aGenerated) && ("column" in aGenerated) && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
        return;
      } else if (aGenerated && ("line" in aGenerated) && ("column" in aGenerated) && aOriginal && ("line" in aOriginal) && ("column" in aOriginal) && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
        return;
      } else {
        throw new Error("Invalid mapping: " + JSON.stringify({
          generated: aGenerated,
          source: aSource,
          original: aOriginal,
          name: aName
        }));
      }
    }, "SourceMapGenerator_validateMapping");
    SourceMapGenerator.prototype._serializeMappings = __name2(function SourceMapGenerator_serializeMappings() {
      var previousGeneratedColumn = 0;
      var previousGeneratedLine = 1;
      var previousOriginalColumn = 0;
      var previousOriginalLine = 0;
      var previousName = 0;
      var previousSource = 0;
      var result = "";
      var next;
      var mapping;
      var nameIdx;
      var sourceIdx;
      var mappings = this._mappings.toArray();
      for (var i = 0, len = mappings.length;i < len; i++) {
        mapping = mappings[i];
        next = "";
        if (mapping.generatedLine !== previousGeneratedLine) {
          previousGeneratedColumn = 0;
          while (mapping.generatedLine !== previousGeneratedLine) {
            next += ";";
            previousGeneratedLine++;
          }
        } else {
          if (i > 0) {
            if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
              continue;
            }
            next += ",";
          }
        }
        next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;
        if (mapping.source != null) {
          sourceIdx = this._sources.indexOf(mapping.source);
          next += base64VLQ.encode(sourceIdx - previousSource);
          previousSource = sourceIdx;
          next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
          previousOriginalLine = mapping.originalLine - 1;
          next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
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
    }, "SourceMapGenerator_serializeMappings");
    SourceMapGenerator.prototype._generateSourcesContent = __name2(function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
      return aSources.map(function(source) {
        if (!this._sourcesContents) {
          return null;
        }
        if (aSourceRoot != null) {
          source = util.relative(aSourceRoot, source);
        }
        var key = util.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
      }, this);
    }, "SourceMapGenerator_generateSourcesContent");
    SourceMapGenerator.prototype.toJSON = __name2(function SourceMapGenerator_toJSON() {
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
    }, "SourceMapGenerator_toJSON");
    SourceMapGenerator.prototype.toString = __name2(function SourceMapGenerator_toString() {
      return JSON.stringify(this.toJSON());
    }, "SourceMapGenerator_toString");
    exports.SourceMapGenerator = SourceMapGenerator;
  }
});
var require_binary_search = __commonJS2({
  "node_modules/source-map/lib/binary-search.js"(exports) {
    exports.GREATEST_LOWER_BOUND = 1;
    exports.LEAST_UPPER_BOUND = 2;
    function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
      var mid = Math.floor((aHigh - aLow) / 2) + aLow;
      var cmp = aCompare(aNeedle, aHaystack[mid], true);
      if (cmp === 0) {
        return mid;
      } else if (cmp > 0) {
        if (aHigh - mid > 1) {
          return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias == exports.LEAST_UPPER_BOUND) {
          return aHigh < aHaystack.length ? aHigh : -1;
        } else {
          return mid;
        }
      } else {
        if (mid - aLow > 1) {
          return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias == exports.LEAST_UPPER_BOUND) {
          return mid;
        } else {
          return aLow < 0 ? -1 : aLow;
        }
      }
    }
    __name2(recursiveSearch, "recursiveSearch");
    exports.search = __name2(function search(aNeedle, aHaystack, aCompare, aBias) {
      if (aHaystack.length === 0) {
        return -1;
      }
      var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);
      if (index < 0) {
        return -1;
      }
      while (index - 1 >= 0) {
        if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
          break;
        }
        --index;
      }
      return index;
    }, "search");
  }
});
var require_quick_sort = __commonJS2({
  "node_modules/source-map/lib/quick-sort.js"(exports) {
    function swap(ary, x, y) {
      var temp = ary[x];
      ary[x] = ary[y];
      ary[y] = temp;
    }
    __name2(swap, "swap");
    function randomIntInRange(low, high) {
      return Math.round(low + Math.random() * (high - low));
    }
    __name2(randomIntInRange, "randomIntInRange");
    function doQuickSort(ary, comparator, p, r) {
      if (p < r) {
        var pivotIndex = randomIntInRange(p, r);
        var i = p - 1;
        swap(ary, pivotIndex, r);
        var pivot = ary[r];
        for (var j = p;j < r; j++) {
          if (comparator(ary[j], pivot) <= 0) {
            i += 1;
            swap(ary, i, j);
          }
        }
        swap(ary, i + 1, j);
        var q = i + 1;
        doQuickSort(ary, comparator, p, q - 1);
        doQuickSort(ary, comparator, q + 1, r);
      }
    }
    __name2(doQuickSort, "doQuickSort");
    exports.quickSort = function(ary, comparator) {
      doQuickSort(ary, comparator, 0, ary.length - 1);
    };
  }
});
var require_source_map_consumer = __commonJS2({
  "node_modules/source-map/lib/source-map-consumer.js"(exports) {
    var util = require_util();
    var binarySearch = require_binary_search();
    var ArraySet = require_array_set().ArraySet;
    var base64VLQ = require_base64_vlq();
    var quickSort = require_quick_sort().quickSort;
    function SourceMapConsumer3(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
    }
    __name2(SourceMapConsumer3, "SourceMapConsumer");
    SourceMapConsumer3.fromSourceMap = function(aSourceMap, aSourceMapURL) {
      return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
    };
    SourceMapConsumer3.prototype._version = 3;
    SourceMapConsumer3.prototype.__generatedMappings = null;
    Object.defineProperty(SourceMapConsumer3.prototype, "_generatedMappings", {
      configurable: true,
      enumerable: true,
      get: function() {
        if (!this.__generatedMappings) {
          this._parseMappings(this._mappings, this.sourceRoot);
        }
        return this.__generatedMappings;
      }
    });
    SourceMapConsumer3.prototype.__originalMappings = null;
    Object.defineProperty(SourceMapConsumer3.prototype, "_originalMappings", {
      configurable: true,
      enumerable: true,
      get: function() {
        if (!this.__originalMappings) {
          this._parseMappings(this._mappings, this.sourceRoot);
        }
        return this.__originalMappings;
      }
    });
    SourceMapConsumer3.prototype._charIsMappingSeparator = __name2(function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
      var c = aStr.charAt(index);
      return c === ";" || c === ",";
    }, "SourceMapConsumer_charIsMappingSeparator");
    SourceMapConsumer3.prototype._parseMappings = __name2(function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      throw new Error("Subclasses must implement _parseMappings");
    }, "SourceMapConsumer_parseMappings");
    SourceMapConsumer3.GENERATED_ORDER = 1;
    SourceMapConsumer3.ORIGINAL_ORDER = 2;
    SourceMapConsumer3.GREATEST_LOWER_BOUND = 1;
    SourceMapConsumer3.LEAST_UPPER_BOUND = 2;
    SourceMapConsumer3.prototype.eachMapping = __name2(function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
      var context = aContext || null;
      var order = aOrder || SourceMapConsumer3.GENERATED_ORDER;
      var mappings;
      switch (order) {
        case SourceMapConsumer3.GENERATED_ORDER:
          mappings = this._generatedMappings;
          break;
        case SourceMapConsumer3.ORIGINAL_ORDER:
          mappings = this._originalMappings;
          break;
        default:
          throw new Error("Unknown order of iteration.");
      }
      var sourceRoot = this.sourceRoot;
      mappings.map(function(mapping) {
        var source = mapping.source === null ? null : this._sources.at(mapping.source);
        source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
        return {
          source,
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: mapping.name === null ? null : this._names.at(mapping.name)
        };
      }, this).forEach(aCallback, context);
    }, "SourceMapConsumer_eachMapping");
    SourceMapConsumer3.prototype.allGeneratedPositionsFor = __name2(function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
      var line = util.getArg(aArgs, "line");
      var needle = {
        source: util.getArg(aArgs, "source"),
        originalLine: line,
        originalColumn: util.getArg(aArgs, "column", 0)
      };
      needle.source = this._findSourceIndex(needle.source);
      if (needle.source < 0) {
        return [];
      }
      var mappings = [];
      var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, binarySearch.LEAST_UPPER_BOUND);
      if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (aArgs.column === undefined) {
          var originalLine = mapping.originalLine;
          while (mapping && mapping.originalLine === originalLine) {
            mappings.push({
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            });
            mapping = this._originalMappings[++index];
          }
        } else {
          var originalColumn = mapping.originalColumn;
          while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
            mappings.push({
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            });
            mapping = this._originalMappings[++index];
          }
        }
      }
      return mappings;
    }, "SourceMapConsumer_allGeneratedPositionsFor");
    exports.SourceMapConsumer = SourceMapConsumer3;
    function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      var version = util.getArg(sourceMap, "version");
      var sources = util.getArg(sourceMap, "sources");
      var names = util.getArg(sourceMap, "names", []);
      var sourceRoot = util.getArg(sourceMap, "sourceRoot", null);
      var sourcesContent = util.getArg(sourceMap, "sourcesContent", null);
      var mappings = util.getArg(sourceMap, "mappings");
      var file = util.getArg(sourceMap, "file", null);
      if (version != this._version) {
        throw new Error("Unsupported version: " + version);
      }
      if (sourceRoot) {
        sourceRoot = util.normalize(sourceRoot);
      }
      sources = sources.map(String).map(util.normalize).map(function(source) {
        return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
      });
      this._names = ArraySet.fromArray(names.map(String), true);
      this._sources = ArraySet.fromArray(sources, true);
      this._absoluteSources = this._sources.toArray().map(function(s) {
        return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
      });
      this.sourceRoot = sourceRoot;
      this.sourcesContent = sourcesContent;
      this._mappings = mappings;
      this._sourceMapURL = aSourceMapURL;
      this.file = file;
    }
    __name2(BasicSourceMapConsumer, "BasicSourceMapConsumer");
    BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer3.prototype);
    BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer3;
    BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
      var relativeSource = aSource;
      if (this.sourceRoot != null) {
        relativeSource = util.relative(this.sourceRoot, relativeSource);
      }
      if (this._sources.has(relativeSource)) {
        return this._sources.indexOf(relativeSource);
      }
      var i;
      for (i = 0;i < this._absoluteSources.length; ++i) {
        if (this._absoluteSources[i] == aSource) {
          return i;
        }
      }
      return -1;
    };
    BasicSourceMapConsumer.fromSourceMap = __name2(function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
      var smc = Object.create(BasicSourceMapConsumer.prototype);
      var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
      var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
      smc.sourceRoot = aSourceMap._sourceRoot;
      smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
      smc.file = aSourceMap._file;
      smc._sourceMapURL = aSourceMapURL;
      smc._absoluteSources = smc._sources.toArray().map(function(s) {
        return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
      });
      var generatedMappings = aSourceMap._mappings.toArray().slice();
      var destGeneratedMappings = smc.__generatedMappings = [];
      var destOriginalMappings = smc.__originalMappings = [];
      for (var i = 0, length = generatedMappings.length;i < length; i++) {
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
    }, "SourceMapConsumer_fromSourceMap");
    BasicSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", {
      get: function() {
        return this._absoluteSources.slice();
      }
    });
    function Mapping() {
      this.generatedLine = 0;
      this.generatedColumn = 0;
      this.source = null;
      this.originalLine = null;
      this.originalColumn = null;
      this.name = null;
    }
    __name2(Mapping, "Mapping");
    BasicSourceMapConsumer.prototype._parseMappings = __name2(function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
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
      var mapping, str, segment, end2, value;
      while (index < length) {
        if (aStr.charAt(index) === ";") {
          generatedLine++;
          index++;
          previousGeneratedColumn = 0;
        } else if (aStr.charAt(index) === ",") {
          index++;
        } else {
          mapping = new Mapping;
          mapping.generatedLine = generatedLine;
          for (end2 = index;end2 < length; end2++) {
            if (this._charIsMappingSeparator(aStr, end2)) {
              break;
            }
          }
          str = aStr.slice(index, end2);
          segment = cachedSegments[str];
          if (segment) {
            index += str.length;
          } else {
            segment = [];
            while (index < end2) {
              base64VLQ.decode(aStr, index, temp);
              value = temp.value;
              index = temp.rest;
              segment.push(value);
            }
            if (segment.length === 2) {
              throw new Error("Found a source, but no line and column");
            }
            if (segment.length === 3) {
              throw new Error("Found a source and line, but no column");
            }
            cachedSegments[str] = segment;
          }
          mapping.generatedColumn = previousGeneratedColumn + segment[0];
          previousGeneratedColumn = mapping.generatedColumn;
          if (segment.length > 1) {
            mapping.source = previousSource + segment[1];
            previousSource += segment[1];
            mapping.originalLine = previousOriginalLine + segment[2];
            previousOriginalLine = mapping.originalLine;
            mapping.originalLine += 1;
            mapping.originalColumn = previousOriginalColumn + segment[3];
            previousOriginalColumn = mapping.originalColumn;
            if (segment.length > 4) {
              mapping.name = previousName + segment[4];
              previousName += segment[4];
            }
          }
          generatedMappings.push(mapping);
          if (typeof mapping.originalLine === "number") {
            originalMappings.push(mapping);
          }
        }
      }
      quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
      this.__generatedMappings = generatedMappings;
      quickSort(originalMappings, util.compareByOriginalPositions);
      this.__originalMappings = originalMappings;
    }, "SourceMapConsumer_parseMappings");
    BasicSourceMapConsumer.prototype._findMapping = __name2(function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
      if (aNeedle[aLineName] <= 0) {
        throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
      }
      return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
    }, "SourceMapConsumer_findMapping");
    BasicSourceMapConsumer.prototype.computeColumnSpans = __name2(function SourceMapConsumer_computeColumnSpans() {
      for (var index = 0;index < this._generatedMappings.length; ++index) {
        var mapping = this._generatedMappings[index];
        if (index + 1 < this._generatedMappings.length) {
          var nextMapping = this._generatedMappings[index + 1];
          if (mapping.generatedLine === nextMapping.generatedLine) {
            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
            continue;
          }
        }
        mapping.lastGeneratedColumn = Infinity;
      }
    }, "SourceMapConsumer_computeColumnSpans");
    BasicSourceMapConsumer.prototype.originalPositionFor = __name2(function SourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, "line"),
        generatedColumn: util.getArg(aArgs, "column")
      };
      var index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util.compareByGeneratedPositionsDeflated, util.getArg(aArgs, "bias", SourceMapConsumer3.GREATEST_LOWER_BOUND));
      if (index >= 0) {
        var mapping = this._generatedMappings[index];
        if (mapping.generatedLine === needle.generatedLine) {
          var source = util.getArg(mapping, "source", null);
          if (source !== null) {
            source = this._sources.at(source);
            source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
          }
          var name = util.getArg(mapping, "name", null);
          if (name !== null) {
            name = this._names.at(name);
          }
          return {
            source,
            line: util.getArg(mapping, "originalLine", null),
            column: util.getArg(mapping, "originalColumn", null),
            name
          };
        }
      }
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }, "SourceMapConsumer_originalPositionFor");
    BasicSourceMapConsumer.prototype.hasContentsOfAllSources = __name2(function BasicSourceMapConsumer_hasContentsOfAllSources() {
      if (!this.sourcesContent) {
        return false;
      }
      return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
        return sc == null;
      });
    }, "BasicSourceMapConsumer_hasContentsOfAllSources");
    BasicSourceMapConsumer.prototype.sourceContentFor = __name2(function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
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
      if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
        var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
        if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) {
          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
        }
        if ((!url.path || url.path == "/") && this._sources.has("/" + relativeSource)) {
          return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
        }
      }
      if (nullOnMissing) {
        return null;
      } else {
        throw new Error('"' + relativeSource + '" is not in the SourceMap.');
      }
    }, "SourceMapConsumer_sourceContentFor");
    BasicSourceMapConsumer.prototype.generatedPositionFor = __name2(function SourceMapConsumer_generatedPositionFor(aArgs) {
      var source = util.getArg(aArgs, "source");
      source = this._findSourceIndex(source);
      if (source < 0) {
        return {
          line: null,
          column: null,
          lastColumn: null
        };
      }
      var needle = {
        source,
        originalLine: util.getArg(aArgs, "line"),
        originalColumn: util.getArg(aArgs, "column")
      };
      var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, util.getArg(aArgs, "bias", SourceMapConsumer3.GREATEST_LOWER_BOUND));
      if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (mapping.source === needle.source) {
          return {
            line: util.getArg(mapping, "generatedLine", null),
            column: util.getArg(mapping, "generatedColumn", null),
            lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
          };
        }
      }
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }, "SourceMapConsumer_generatedPositionFor");
    exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
    function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      var version = util.getArg(sourceMap, "version");
      var sections = util.getArg(sourceMap, "sections");
      if (version != this._version) {
        throw new Error("Unsupported version: " + version);
      }
      this._sources = new ArraySet;
      this._names = new ArraySet;
      var lastOffset = {
        line: -1,
        column: 0
      };
      this._sections = sections.map(function(s) {
        if (s.url) {
          throw new Error("Support for url field in sections not implemented.");
        }
        var offset = util.getArg(s, "offset");
        var offsetLine = util.getArg(offset, "line");
        var offsetColumn = util.getArg(offset, "column");
        if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) {
          throw new Error("Section offsets must be ordered and non-overlapping.");
        }
        lastOffset = offset;
        return {
          generatedOffset: {
            generatedLine: offsetLine + 1,
            generatedColumn: offsetColumn + 1
          },
          consumer: new SourceMapConsumer3(util.getArg(s, "map"), aSourceMapURL)
        };
      });
    }
    __name2(IndexedSourceMapConsumer, "IndexedSourceMapConsumer");
    IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer3.prototype);
    IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer3;
    IndexedSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", {
      get: function() {
        var sources = [];
        for (var i = 0;i < this._sections.length; i++) {
          for (var j = 0;j < this._sections[i].consumer.sources.length; j++) {
            sources.push(this._sections[i].consumer.sources[j]);
          }
        }
        return sources;
      }
    });
    IndexedSourceMapConsumer.prototype.originalPositionFor = __name2(function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, "line"),
        generatedColumn: util.getArg(aArgs, "column")
      };
      var sectionIndex = binarySearch.search(needle, this._sections, function(needle2, section2) {
        var cmp = needle2.generatedLine - section2.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }
        return needle2.generatedColumn - section2.generatedOffset.generatedColumn;
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
        line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
        column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
        bias: aArgs.bias
      });
    }, "IndexedSourceMapConsumer_originalPositionFor");
    IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = __name2(function IndexedSourceMapConsumer_hasContentsOfAllSources() {
      return this._sections.every(function(s) {
        return s.consumer.hasContentsOfAllSources();
      });
    }, "IndexedSourceMapConsumer_hasContentsOfAllSources");
    IndexedSourceMapConsumer.prototype.sourceContentFor = __name2(function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      for (var i = 0;i < this._sections.length; i++) {
        var section = this._sections[i];
        var content = section.consumer.sourceContentFor(aSource, true);
        if (content) {
          return content;
        }
      }
      if (nullOnMissing) {
        return null;
      } else {
        throw new Error('"' + aSource + '" is not in the SourceMap.');
      }
    }, "IndexedSourceMapConsumer_sourceContentFor");
    IndexedSourceMapConsumer.prototype.generatedPositionFor = __name2(function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
      for (var i = 0;i < this._sections.length; i++) {
        var section = this._sections[i];
        if (section.consumer._findSourceIndex(util.getArg(aArgs, "source")) === -1) {
          continue;
        }
        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
        if (generatedPosition) {
          var ret = {
            line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
            column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
          };
          return ret;
        }
      }
      return {
        line: null,
        column: null
      };
    }, "IndexedSourceMapConsumer_generatedPositionFor");
    IndexedSourceMapConsumer.prototype._parseMappings = __name2(function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      this.__generatedMappings = [];
      this.__originalMappings = [];
      for (var i = 0;i < this._sections.length; i++) {
        var section = this._sections[i];
        var sectionMappings = section.consumer._generatedMappings;
        for (var j = 0;j < sectionMappings.length; j++) {
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
          var adjustedMapping = {
            source,
            generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
            generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name
          };
          this.__generatedMappings.push(adjustedMapping);
          if (typeof adjustedMapping.originalLine === "number") {
            this.__originalMappings.push(adjustedMapping);
          }
        }
      }
      quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
      quickSort(this.__originalMappings, util.compareByOriginalPositions);
    }, "IndexedSourceMapConsumer_parseMappings");
    exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
  }
});
var require_source_node = __commonJS2({
  "node_modules/source-map/lib/source-node.js"(exports) {
    var SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
    var util = require_util();
    var REGEX_NEWLINE = /(\r?\n)/;
    var NEWLINE_CODE = 10;
    var isSourceNode = "$$$isSourceNode$$$";
    function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
      this.children = [];
      this.sourceContents = {};
      this.line = aLine == null ? null : aLine;
      this.column = aColumn == null ? null : aColumn;
      this.source = aSource == null ? null : aSource;
      this.name = aName == null ? null : aName;
      this[isSourceNode] = true;
      if (aChunks != null)
        this.add(aChunks);
    }
    __name2(SourceNode, "SourceNode");
    SourceNode.fromStringWithSourceMap = __name2(function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
      var node2 = new SourceNode;
      var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
      var remainingLinesIndex = 0;
      var shiftNextLine = __name2(function() {
        var lineContents = getNextLine();
        var newLine = getNextLine() || "";
        return lineContents + newLine;
        function getNextLine() {
          return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : undefined;
        }
        __name2(getNextLine, "getNextLine");
      }, "shiftNextLine");
      var lastGeneratedLine = 1, lastGeneratedColumn = 0;
      var lastMapping = null;
      aSourceMapConsumer.eachMapping(function(mapping) {
        if (lastMapping !== null) {
          if (lastGeneratedLine < mapping.generatedLine) {
            addMappingWithCode(lastMapping, shiftNextLine());
            lastGeneratedLine++;
            lastGeneratedColumn = 0;
          } else {
            var nextLine = remainingLines[remainingLinesIndex] || "";
            var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
            remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
            addMappingWithCode(lastMapping, code);
            lastMapping = mapping;
            return;
          }
        }
        while (lastGeneratedLine < mapping.generatedLine) {
          node2.add(shiftNextLine());
          lastGeneratedLine++;
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
          var nextLine = remainingLines[remainingLinesIndex] || "";
          node2.add(nextLine.substr(0, mapping.generatedColumn));
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
        }
        lastMapping = mapping;
      }, this);
      if (remainingLinesIndex < remainingLines.length) {
        if (lastMapping) {
          addMappingWithCode(lastMapping, shiftNextLine());
        }
        node2.add(remainingLines.splice(remainingLinesIndex).join(""));
      }
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aRelativePath != null) {
            sourceFile = util.join(aRelativePath, sourceFile);
          }
          node2.setSourceContent(sourceFile, content);
        }
      });
      return node2;
      function addMappingWithCode(mapping, code) {
        if (mapping === null || mapping.source === undefined) {
          node2.add(code);
        } else {
          var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
          node2.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
        }
      }
      __name2(addMappingWithCode, "addMappingWithCode");
    }, "SourceNode_fromStringWithSourceMap");
    SourceNode.prototype.add = __name2(function SourceNode_add(aChunk) {
      if (Array.isArray(aChunk)) {
        aChunk.forEach(function(chunk) {
          this.add(chunk);
        }, this);
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        if (aChunk) {
          this.children.push(aChunk);
        }
      } else {
        throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
      }
      return this;
    }, "SourceNode_add");
    SourceNode.prototype.prepend = __name2(function SourceNode_prepend(aChunk) {
      if (Array.isArray(aChunk)) {
        for (var i = aChunk.length - 1;i >= 0; i--) {
          this.prepend(aChunk[i]);
        }
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        this.children.unshift(aChunk);
      } else {
        throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
      }
      return this;
    }, "SourceNode_prepend");
    SourceNode.prototype.walk = __name2(function SourceNode_walk(aFn) {
      var chunk;
      for (var i = 0, len = this.children.length;i < len; i++) {
        chunk = this.children[i];
        if (chunk[isSourceNode]) {
          chunk.walk(aFn);
        } else {
          if (chunk !== "") {
            aFn(chunk, {
              source: this.source,
              line: this.line,
              column: this.column,
              name: this.name
            });
          }
        }
      }
    }, "SourceNode_walk");
    SourceNode.prototype.join = __name2(function SourceNode_join(aSep) {
      var newChildren;
      var i;
      var len = this.children.length;
      if (len > 0) {
        newChildren = [];
        for (i = 0;i < len - 1; i++) {
          newChildren.push(this.children[i]);
          newChildren.push(aSep);
        }
        newChildren.push(this.children[i]);
        this.children = newChildren;
      }
      return this;
    }, "SourceNode_join");
    SourceNode.prototype.replaceRight = __name2(function SourceNode_replaceRight(aPattern, aReplacement) {
      var lastChild = this.children[this.children.length - 1];
      if (lastChild[isSourceNode]) {
        lastChild.replaceRight(aPattern, aReplacement);
      } else if (typeof lastChild === "string") {
        this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
      } else {
        this.children.push("".replace(aPattern, aReplacement));
      }
      return this;
    }, "SourceNode_replaceRight");
    SourceNode.prototype.setSourceContent = __name2(function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
    }, "SourceNode_setSourceContent");
    SourceNode.prototype.walkSourceContents = __name2(function SourceNode_walkSourceContents(aFn) {
      for (var i = 0, len = this.children.length;i < len; i++) {
        if (this.children[i][isSourceNode]) {
          this.children[i].walkSourceContents(aFn);
        }
      }
      var sources = Object.keys(this.sourceContents);
      for (var i = 0, len = sources.length;i < len; i++) {
        aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
      }
    }, "SourceNode_walkSourceContents");
    SourceNode.prototype.toString = __name2(function SourceNode_toString() {
      var str = "";
      this.walk(function(chunk) {
        str += chunk;
      });
      return str;
    }, "SourceNode_toString");
    SourceNode.prototype.toStringWithSourceMap = __name2(function SourceNode_toStringWithSourceMap(aArgs) {
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
      this.walk(function(chunk, original) {
        generated.code += chunk;
        if (original.source !== null && original.line !== null && original.column !== null) {
          if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
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
        for (var idx = 0, length = chunk.length;idx < length; idx++) {
          if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
            generated.line++;
            generated.column = 0;
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
      this.walkSourceContents(function(sourceFile, sourceContent) {
        map.setSourceContent(sourceFile, sourceContent);
      });
      return { code: generated.code, map };
    }, "SourceNode_toStringWithSourceMap");
    exports.SourceNode = SourceNode;
  }
});
var require_source_map = __commonJS2({
  "node_modules/source-map/source-map.js"(exports) {
    exports.SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
    exports.SourceMapConsumer = require_source_map_consumer().SourceMapConsumer;
    exports.SourceNode = require_source_node().SourceNode;
  }
});
var RayScreenColors = class {
  screenColor(color) {
    return this;
  }
  screenGreen() {
    return this.screenColor("green");
  }
  screenOrange() {
    return this.screenColor("orange");
  }
  screenRed() {
    return this.screenColor("red");
  }
  screenPurple() {
    return this.screenColor("purple");
  }
  screenBlue() {
    return this.screenColor("blue");
  }
  screenGray() {
    return this.screenColor("gray");
  }
};
__name2(RayScreenColors, "RayScreenColors");
__name2(_capitalize, "_capitalize");
__name2(_getter, "_getter");
var booleanProps = ["isConstructor", "isEval", "isNative", "isToplevel"];
var numericProps = ["columnNumber", "lineNumber"];
var stringProps = ["fileName", "functionName", "source"];
var arrayProps = ["args"];
var objectProps = ["evalOrigin"];
var props = booleanProps.concat(numericProps, stringProps, arrayProps, objectProps);
var StackFrame = class {
  constructor(obj) {
    this.args = [];
    this.evalOrigin = {};
    this.fileName = "";
    this.functionName = "";
    this.isConstructor = false;
    this.isEval = false;
    this.isNative = false;
    this.isToplevel = false;
    this.lineNumber = 0;
    this.source = "";
    this.columnNumber = 0;
    if (!obj)
      return;
    for (let i = 0;i < props.length; i++) {
      if (obj[props[i]] !== undefined) {
        const fn = StackFrame.prototype["set" + _capitalize(props[i])];
        if (typeof fn === "function") {
          fn.call(this, obj[props[i]]);
        }
      }
    }
  }
  getArgs() {
    return this.args;
  }
  setArgs(v) {
    if (Object.prototype.toString.call(v) !== "[object Array]") {
      throw new TypeError("Args must be an Array");
    }
    this.args = v;
  }
  getEvalOrigin() {
    return this.evalOrigin;
  }
  setEvalOrigin(v) {
    if (v instanceof StackFrame) {
      this.evalOrigin = v;
    } else if (v instanceof Object) {
      this.evalOrigin = new StackFrame(v);
    } else {
      throw new TypeError("Eval Origin must be an Object or StackFrame");
    }
  }
  toString() {
    const fileName = this.getFileName() || "";
    const lineNumber = this.getLineNumber() || "";
    const columnNumber = this.getColumnNumber() || "";
    const functionName = this.getFunctionName() || "";
    if (this.getIsEval()) {
      if (fileName) {
        return "[eval] (" + fileName + ":" + lineNumber + ":" + columnNumber + ")";
      }
      return "[eval]:" + lineNumber + ":" + columnNumber;
    }
    if (functionName) {
      return functionName + " (" + fileName + ":" + lineNumber + ":" + columnNumber + ")";
    }
    return fileName + ":" + lineNumber + ":" + columnNumber;
  }
  getFileName() {
    return this.fileName;
  }
  getLineNumber() {
    return _getter(this, "lineNumber");
  }
  getColumnNumber() {
    return _getter(this, "columnNumber");
  }
  getFunctionName() {
    return _getter(this, "functionName");
  }
  getIsEval() {
    return _getter(this, "isEval");
  }
  setFileName(fileName) {
    this.fileName = fileName;
  }

  setLineNumber(lineNumber) {
    this.lineNumber = lineNumber
  }

  setColumnNumber(columnNumber) {
    this.columnNumber = columnNumber
  }

  setFunctionName(functionName) {
    this.functionName = functionName
  }

  setIsEval(isEval) {
    this.isEval = isEval
  }

  setSource(source) {
    this.source = source
  }
  fromString(str) {
    const argsStartIndex = str.indexOf("(");
    const argsEndIndex = str.lastIndexOf(")");
    const functionName = str.substring(0, argsStartIndex);
    const args = str.substring(argsStartIndex + 1, argsEndIndex).split(",");
    const locationString = str.substring(argsEndIndex + 1);
    let fileName = "", lineNumber = "", columnNumber = "";
    if (locationString.indexOf("@") === 0) {
      const parts = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(locationString) || [];
      fileName = parts[1];
      lineNumber = parts[2];
      columnNumber = parts[3];
    }
    return new StackFrame({
      functionName,
      args: args || undefined,
      fileName,
      lineNumber: lineNumber || undefined,
      columnNumber: columnNumber || undefined
    });
  }
};
__name2(StackFrame, "StackFrame");
var stackframe_default = StackFrame;
var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+:\d+/;
var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;
var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/;
var ErrorStackParser = class {
  static parse(error) {
    if (typeof error.stacktrace !== "undefined" || typeof error["opera#sourceloc"] !== "undefined") {
      return this.parseOpera(error);
    } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
      return this.parseV8OrIE(error);
    } else if (error.stack) {
      return this.parseFFOrSafari(error);
    } else {
      throw new Error("Cannot parse given Error object");
    }
  }
  static extractLocation(urlLike) {
    if (urlLike.indexOf(":") === -1) {
      return [urlLike];
    }
    const regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
    const parts = regExp.exec(urlLike.replace(/[()]/g, ""));
    if (!parts) {
      return [urlLike];
    }
    return [parts[1], parts[2] || undefined, parts[3] || undefined];
  }
  static parseV8OrIE(error) {
    const filtered = error.stack.split("\n").filter((line) => !!line.match(CHROME_IE_STACK_REGEXP));
    return filtered.map((line) => {
      if (line.indexOf("(eval ") > -1) {
        line = line.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(,.*$)/g, "");
      }
      let sanitizedLine = line.replace(/^\s+/, "").replace(/\(eval code/g, "(").replace(/^.*?\s+/, "");
      const location = sanitizedLine.match(/ (\(.+\)$)/);
      sanitizedLine = location ? sanitizedLine.replace(location[0], "") : sanitizedLine;
      const locationParts = this.extractLocation(location ? location[1] : sanitizedLine);
      const functionName = location && sanitizedLine || undefined;
      const fileName = ["eval", "<anonymous>"].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0];
      return new stackframe_default({
        functionName,
        fileName,
        lineNumber: locationParts[1],
        columnNumber: locationParts[2],
        source: line
      });
    });
  }
  static parseFFOrSafari(error) {
    const filtered = error.stack.split("\n").filter((line) => !line.match(SAFARI_NATIVE_CODE_REGEXP));
    return filtered.map((line) => {
      if (line.indexOf(" > eval") > -1) {
        line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1");
      }
      if (line.indexOf("@") === -1 && line.indexOf(":") === -1) {
        return new stackframe_default({
          functionName: line
        });
      } else {
        const functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
        const matches = line.match(functionNameRegex);
        const functionName = matches && matches[1] ? matches[1] : undefined;
        const locationParts = this.extractLocation(line.replace(functionNameRegex, ""));
        return new stackframe_default({
          functionName,
          fileName: locationParts[0],
          lineNumber: locationParts[1],
          columnNumber: locationParts[2],
          source: line
        });
      }
    });
  }
  static parseOpera(error) {
    if (!error.stacktrace || error.message.indexOf("\n") > -1 && error.message.split("\n").length > error.stacktrace.split("\n").length) {
      return this.parseOpera9(error);
    } else if (!error.stack) {
      return this.parseOpera10(error);
    } else {
      return this.parseOpera11(error);
    }
  }
  static parseOpera9(e) {
    const lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
    const lines = e.message.split("\n");
    const result = [];
    for (let i = 2, len = lines.length;i < len; i += 2) {
      const match = lineRE.exec(lines[i]);
      if (match) {
        result.push(new stackframe_default({
          fileName: match[2],
          lineNumber: match[1],
          source: lines[i]
        }));
      }
    }
    return result;
  }
  static parseOpera10(e) {
    const lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
    const lines = e.stacktrace.split("\n");
    const result = [];
    for (let i = 0, len = lines.length;i < len; i += 2) {
      const match = lineRE.exec(lines[i]);
      if (match) {
        result.push(new stackframe_default({
          functionName: match[3] || undefined,
          fileName: match[2],
          lineNumber: match[1],
          source: lines[i]
        }));
      }
    }
    return result;
  }
  static parseOpera11(error) {
    const filtered = error.stack.split("\n").filter((line) => !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/));
    return filtered.map((line) => {
      const tokens = line.split("@");
      const locationParts = this.extractLocation(tokens.pop());
      const functionCall = tokens.shift() || "";
      const functionName = functionCall.replace(/<anonymous function(: (\w+))?>/, "$2").replace(/\([^)]*\)/g, "") || undefined;
      const argsRaw = functionCall.match(/\(([^)]*)\)/) ? functionCall.replace(/^[^(]+\(([^)]*)\)$/, "$1") : undefined;
      const args = argsRaw === undefined || argsRaw === "[arguments not available]" ? undefined : argsRaw.split(",");
      return new stackframe_default({
        functionName,
        args,
        fileName: locationParts[0],
        lineNumber: locationParts[1],
        columnNumber: locationParts[2],
        source: line
      });
    });
  }
};
__name2(ErrorStackParser, "ErrorStackParser");
var ErrorStackParser_default = ErrorStackParser;
var StackGenerator = {
  backtrace: __name2(function StackGenerator$$backtrace(opts) {
    const stack = [];
    let maxStackSize = 10;
    if (typeof opts === "object" && typeof opts.maxStackSize === "number") {
      maxStackSize = opts.maxStackSize;
    }
    let curr = arguments.callee;
    while (curr && stack.length < maxStackSize && curr["arguments"]) {
      const args = new Array(curr["arguments"].length);
      for (let i = 0;i < args.length; ++i) {
        args[i] = curr["arguments"][i];
      }
      if (/function(?:\s+([\w$]+))+\s*\(/.test(curr.toString())) {
        stack.push(new stackframe_default({ functionName: RegExp.$1 || undefined, args }));
      } else {
        stack.push(new stackframe_default({ args }));
      }
      try {
        curr = curr.caller;
      } catch (e) {
        break;
      }
    }
    return stack;
  }, "StackGenerator$$backtrace")
};
var StackGenerator_default = StackGenerator;
var SourceMapConsumer = __toESM2(require_source_map());
__name2(_xdr, "_xdr");
__name2(getWindow, "getWindow");
__name2(_atob, "_atob");
__name2(_parseJson, "_parseJson");
__name2(_findFunctionName, "_findFunctionName");
__name2(_ensureSupportedEnvironment, "_ensureSupportedEnvironment");
__name2(_ensureStackFrameIsLegit, "_ensureStackFrameIsLegit");
__name2(_findSourceMappingURL, "_findSourceMappingURL");
__name2(_extractLocationInfoFromSourceMapSource, "_extractLocationInfoFromSourceMapSource");
var StackTraceGPS = class {
  constructor(opts) {
    this.opts = opts;
    this.opts = opts || {};
    this.sourceCache = this.opts.sourceCache || {};
    this.sourceMapConsumerCache = this.opts.sourceMapConsumerCache || {};
    this.ajax = this.opts.ajax || _xdr;
    this._atob = this.opts.atob || _atob;
  }
  _get(location) {
    return new Promise((resolve, reject) => {
      const isDataUrl = location.substr(0, 5) === "data:";
      if (this.sourceCache[location]) {
        resolve(this.sourceCache[location]);
      } else if (isDataUrl) {
        const supportedEncodingRegexp = /^data:application\/json;([\w=:"-]+;)*base64,/;
        const match = location.match(supportedEncodingRegexp);
        if (match) {
          const sourceMapStart = match[0].length;
          const encodedSource = location.substr(sourceMapStart);
          const source = this._atob(encodedSource);
          this.sourceCache[location] = source;
          resolve(source);
        } else {
          reject(new Error("The encoding of the inline sourcemap is not supported"));
        }
      } else {
        if (this.opts.offline && !isDataUrl) {
          reject(new Error("Cannot make network requests in offline mode"));
        } else {
          const xhrPromise = this.ajax(location);
          xhrPromise.then((s) => {
            this.sourceCache[location] = s;
            resolve(s);
          }, reject);
          xhrPromise.then(resolve, reject);
        }
      }
    });
  }
  _getSourceMapConsumer(sourceMappingURL, defaultSourceRoot) {
    return new Promise((resolve) => {
      if (this.sourceMapConsumerCache[sourceMappingURL]) {
        resolve(this.sourceMapConsumerCache[sourceMappingURL]);
      } else {
        const sourceMapConsumerPromise = new Promise((resolve2, reject) => {
          this._get(sourceMappingURL).then((sourceMapSource) => {
            if (typeof sourceMapSource === "string") {
              sourceMapSource = _parseJson(sourceMapSource.replace(/^\)\]\}'/, ""));
            }
            if (typeof sourceMapSource.sourceRoot === "undefined") {
              sourceMapSource.sourceRoot = defaultSourceRoot;
            }
            resolve2(new SourceMapConsumer.SourceMapConsumer(sourceMapSource));
          }).catch(reject);
        });
        this.sourceMapConsumerCache[sourceMappingURL] = sourceMapConsumerPromise;
        resolve(sourceMapConsumerPromise);
      }
    });
  }
  pinpoint(stackframe) {
    return new Promise((resolve, reject) => {
      this.getMappedLocation(stackframe).then((mappedStackFrame) => {
        this.findFunctionName(mappedStackFrame).then(resolve).catch(() => resolve(mappedStackFrame));
      }, reject);
    });
  }
  findFunctionName(stackframe) {
    return new Promise((resolve, reject) => {
      _ensureStackFrameIsLegit(stackframe);
      this._get(stackframe.fileName || "").then((source) => {
        const lineNumber = stackframe.lineNumber;
        const guessedFunctionName = _findFunctionName(source, lineNumber);
        if (guessedFunctionName) {
          resolve(new stackframe_default({
            functionName: guessedFunctionName,
            args: stackframe.args,
            fileName: stackframe.fileName,
            lineNumber,
            columnNumber: stackframe.columnNumber
          }));
        } else {
          resolve(stackframe);
        }
      }, reject).catch(reject);
    });
  }
  getMappedLocation(stackframe) {
    return new Promise((resolve, reject) => {
      _ensureSupportedEnvironment();
      _ensureStackFrameIsLegit(stackframe);
      const sourceCache = this.sourceCache;
      const fileName = stackframe.fileName || "";
      this._get(fileName).then((source) => {
        let sourceMappingURL = _findSourceMappingURL(source);
        const isDataUrl = sourceMappingURL.substr(0, 5) === "data:";
        const defaultSourceRoot = fileName == null ? undefined : fileName.substring(0, fileName.lastIndexOf("/") + 1);
        if (sourceMappingURL[0] !== "/" && !isDataUrl && !/^https?:\/\/|^\/\//i.test(sourceMappingURL)) {
          sourceMappingURL = defaultSourceRoot + sourceMappingURL;
        }
        this._getSourceMapConsumer(sourceMappingURL, defaultSourceRoot).then((sourceMapConsumer) => {
          _extractLocationInfoFromSourceMapSource(stackframe, sourceMapConsumer, sourceCache).then(resolve).catch(() => resolve(stackframe));
        }).catch(reject);
      }, reject).catch(reject);
    });
  }
};
__name2(StackTraceGPS, "StackTraceGPS");
var StackTraceGps_default = StackTraceGPS;
var _options = {
  filter: function(stackframe) {
    return (stackframe.functionName || "").indexOf("StackTrace$$") === -1 && (stackframe.functionName || "").indexOf("ErrorStackParser$$") === -1 && (stackframe.functionName || "").indexOf("StackTraceGPS$$") === -1 && (stackframe.functionName || "").indexOf("StackGenerator$$") === -1;
  },
  sourceCache: {}
};
__name2(_generateError, "_generateError");
__name2(_merge, "_merge");
__name2(_isShapedLikeParsableError, "_isShapedLikeParsableError");
__name2(_filtered, "_filtered");
var StackTrace = {
  StackFrame: typeof stackframe_default,
  get: __name2(function StackTrace$$get(opts) {
    const err = _generateError();
    return _isShapedLikeParsableError(err) ? this.fromError(err, opts) : this.generateArtificially(opts);
  }, "StackTrace$$get"),
  getSync: __name2(function StackTrace$$getSync(opts) {
    opts = _merge(_options, opts);
    const err = _generateError();
    const stack = _isShapedLikeParsableError(err) ? ErrorStackParser_default.parse(err) : StackGenerator_default.backtrace(opts);
    return _filtered(stack, opts.filter);
  }, "StackTrace$$getSync"),
  fromError: __name2(function StackTrace$$fromError(error, opts) {
    opts = _merge(_options, opts);
    const gps = new StackTraceGps_default(opts);
    return new Promise(function(resolve) {
      const stackframes = _filtered(ErrorStackParser_default.parse(error), opts.filter);
      resolve(Promise.all(stackframes.map(function(sf) {
        return new Promise(function(resolve2) {
          function resolveOriginal() {
            resolve2(sf);
          }
          __name2(resolveOriginal, "resolveOriginal");
          gps.pinpoint(sf).then(resolve2, resolveOriginal)["catch"](resolveOriginal);
        });
      })));
    }.bind(this));
  }, "StackTrace$$fromError"),
  generateArtificially: __name2(function StackTrace$$generateArtificially(opts) {
    opts = _merge(_options, opts);
    let stackFrames = StackGenerator_default.backtrace(opts);
    if (typeof opts.filter === "function") {
      stackFrames = stackFrames.filter(opts.filter);
    }
    return Promise.resolve(stackFrames);
  }, "StackTrace$$generateArtificially")
};
var copyProps = __name2((dest, src, exclude = []) => {
  const props2 = Object.getOwnPropertyDescriptors(src);
  for (let prop of exclude)
    delete props2[prop];
  Object.defineProperties(dest, props2);
}, "copyProps");
var protoChain = __name2((obj, currentChain = [obj]) => {
  const proto = Object.getPrototypeOf(obj);
  if (proto === null)
    return currentChain;
  return protoChain(proto, [...currentChain, proto]);
}, "protoChain");
var nearestCommonProto = __name2((...objs) => {
  if (objs.length === 0)
    return;
  let commonProto = undefined;
  const protoChains = objs.map((obj) => protoChain(obj));
  while (protoChains.every((protoChain2) => protoChain2.length > 0)) {
    const protos = protoChains.map((protoChain2) => protoChain2.pop());
    const potentialCommonProto = protos[0];
    if (protos.every((proto) => proto === potentialCommonProto))
      commonProto = potentialCommonProto;
    else
      break;
  }
  return commonProto;
}, "nearestCommonProto");
var hardMixProtos = __name2((ingredients, constructor, exclude = []) => {
  var _a;
  const base = (_a = nearestCommonProto(...ingredients)) !== null && _a !== undefined ? _a : Object.prototype;
  const mixedProto = Object.create(base);
  const visitedProtos = protoChain(base);
  for (let prototype3 of ingredients) {
    let protos = protoChain(prototype3);
    for (let i = protos.length - 1;i >= 0; i--) {
      let newProto = protos[i];
      if (visitedProtos.indexOf(newProto) === -1) {
        copyProps(mixedProto, newProto, ["constructor", ...exclude]);
        visitedProtos.push(newProto);
      }
    }
  }
  mixedProto.constructor = constructor;
  return mixedProto;
}, "hardMixProtos");
var unique = __name2((arr) => arr.filter((e, i) => arr.indexOf(e) == i), "unique");
var getIngredientWithProp = __name2((prop, ingredients) => {
  const protoChains = ingredients.map((ingredient) => protoChain(ingredient));
  let protoDepth = 0;
  let protosAreLeftToSearch = true;
  while (protosAreLeftToSearch) {
    protosAreLeftToSearch = false;
    for (let i = ingredients.length - 1;i >= 0; i--) {
      const searchTarget = protoChains[i][protoDepth];
      if (searchTarget !== undefined && searchTarget !== null) {
        protosAreLeftToSearch = true;
        if (Object.getOwnPropertyDescriptor(searchTarget, prop) != null) {
          return protoChains[i][0];
        }
      }
    }
    protoDepth++;
  }
  return;
}, "getIngredientWithProp");
var proxyMix = __name2((ingredients, prototype3 = Object.prototype) => new Proxy({}, {
  getPrototypeOf() {
    return prototype3;
  },
  setPrototypeOf() {
    throw Error("Cannot set prototype of Proxies created by ts-mixer");
  },
  getOwnPropertyDescriptor(_, prop) {
    return Object.getOwnPropertyDescriptor(getIngredientWithProp(prop, ingredients) || {}, prop);
  },
  defineProperty() {
    throw new Error("Cannot define new properties on Proxies created by ts-mixer");
  },
  has(_, prop) {
    return getIngredientWithProp(prop, ingredients) !== undefined || prototype3[prop] !== undefined;
  },
  get(_, prop) {
    return (getIngredientWithProp(prop, ingredients) || prototype3)[prop];
  },
  set(_, prop, val) {
    const ingredientWithProp = getIngredientWithProp(prop, ingredients);
    if (ingredientWithProp === undefined)
      throw new Error("Cannot set new properties on Proxies created by ts-mixer");
    ingredientWithProp[prop] = val;
    return true;
  },
  deleteProperty() {
    throw new Error("Cannot delete properties on Proxies created by ts-mixer");
  },
  ownKeys() {
    return ingredients.map(Object.getOwnPropertyNames).reduce((prev, curr) => curr.concat(prev.filter((key) => curr.indexOf(key) < 0)));
  }
}), "proxyMix");
var softMixProtos = __name2((ingredients, constructor) => proxyMix([...ingredients, { constructor }]), "softMixProtos");
var settings = {
  initFunction: null,
  staticsStrategy: "copy",
  prototypeStrategy: "copy",
  decoratorInheritance: "deep"
};
var mixins = new Map;
var getMixinsForClass = __name2((clazz) => mixins.get(clazz), "getMixinsForClass");
var registerMixins = __name2((mixedClass, constituents) => mixins.set(mixedClass, constituents), "registerMixins");
var mergeObjectsOfDecorators = __name2((o1, o2) => {
  var _a, _b;
  const allKeys = unique([...Object.getOwnPropertyNames(o1), ...Object.getOwnPropertyNames(o2)]);
  const mergedObject = {};
  for (let key of allKeys)
    mergedObject[key] = unique([...(_a = o1 === null || o1 === undefined ? undefined : o1[key]) !== null && _a !== undefined ? _a : [], ...(_b = o2 === null || o2 === undefined ? undefined : o2[key]) !== null && _b !== undefined ? _b : []]);
  return mergedObject;
}, "mergeObjectsOfDecorators");
var mergePropertyAndMethodDecorators = __name2((d1, d2) => {
  var _a, _b, _c, _d;
  return {
    property: mergeObjectsOfDecorators((_a = d1 === null || d1 === undefined ? undefined : d1.property) !== null && _a !== undefined ? _a : {}, (_b = d2 === null || d2 === undefined ? undefined : d2.property) !== null && _b !== undefined ? _b : {}),
    method: mergeObjectsOfDecorators((_c = d1 === null || d1 === undefined ? undefined : d1.method) !== null && _c !== undefined ? _c : {}, (_d = d2 === null || d2 === undefined ? undefined : d2.method) !== null && _d !== undefined ? _d : {})
  };
}, "mergePropertyAndMethodDecorators");
var mergeDecorators = __name2((d1, d2) => {
  var _a, _b, _c, _d, _e, _f;
  return {
    class: unique([...(_a = d1 === null || d1 === undefined ? undefined : d1.class) !== null && _a !== undefined ? _a : [], ...(_b = d2 === null || d2 === undefined ? undefined : d2.class) !== null && _b !== undefined ? _b : []]),
    static: mergePropertyAndMethodDecorators((_c = d1 === null || d1 === undefined ? undefined : d1.static) !== null && _c !== undefined ? _c : {}, (_d = d2 === null || d2 === undefined ? undefined : d2.static) !== null && _d !== undefined ? _d : {}),
    instance: mergePropertyAndMethodDecorators((_e = d1 === null || d1 === undefined ? undefined : d1.instance) !== null && _e !== undefined ? _e : {}, (_f = d2 === null || d2 === undefined ? undefined : d2.instance) !== null && _f !== undefined ? _f : {})
  };
}, "mergeDecorators");
var decorators = new Map;
var findAllConstituentClasses = __name2((...classes) => {
  var _a;
  const allClasses = new Set;
  const frontier = new Set([...classes]);
  while (frontier.size > 0) {
    for (let clazz of frontier) {
      const protoChainClasses = protoChain(clazz.prototype).map((proto) => proto.constructor);
      const mixinClasses = (_a = getMixinsForClass(clazz)) !== null && _a !== undefined ? _a : [];
      const potentiallyNewClasses = [...protoChainClasses, ...mixinClasses];
      const newClasses = potentiallyNewClasses.filter((c) => !allClasses.has(c));
      for (let newClass of newClasses)
        frontier.add(newClass);
      allClasses.add(clazz);
      frontier.delete(clazz);
    }
  }
  return [...allClasses];
}, "findAllConstituentClasses");
var deepDecoratorSearch = __name2((...classes) => {
  const decoratorsForClassChain = findAllConstituentClasses(...classes).map((clazz) => decorators.get(clazz)).filter((decorators2) => !!decorators2);
  if (decoratorsForClassChain.length == 0)
    return {};
  if (decoratorsForClassChain.length == 1)
    return decoratorsForClassChain[0];
  return decoratorsForClassChain.reduce((d1, d2) => mergeDecorators(d1, d2));
}, "deepDecoratorSearch");
var directDecoratorSearch = __name2((...classes) => {
  const classDecorators = classes.map((clazz) => getDecoratorsForClass(clazz));
  if (classDecorators.length === 0)
    return {};
  if (classDecorators.length === 1)
    return classDecorators[0];
  return classDecorators.reduce((d1, d2) => mergeDecorators(d1, d2));
}, "directDecoratorSearch");
var getDecoratorsForClass = __name2((clazz) => {
  let decoratorsForClass = decorators.get(clazz);
  if (!decoratorsForClass) {
    decoratorsForClass = {};
    decorators.set(clazz, decoratorsForClass);
  }
  return decoratorsForClass;
}, "getDecoratorsForClass");
__name2(Mixin, "Mixin");
var applyPropAndMethodDecorators = __name2((propAndMethodDecorators, target) => {
  const propDecorators = propAndMethodDecorators.property;
  const methodDecorators = propAndMethodDecorators.method;
  if (propDecorators)
    for (let key in propDecorators)
      for (let decorator of propDecorators[key])
        decorator(target, key);
  if (methodDecorators)
    for (let key in methodDecorators)
      for (let decorator of methodDecorators[key])
        decorator(target, key, Object.getOwnPropertyDescriptor(target, key));
}, "applyPropAndMethodDecorators");
var RayColors = class {
  color(name) {
    return this;
  }
  green() {
    return this.color("green");
  }
  orange() {
    return this.color("orange");
  }
  red() {
    return this.color("red");
  }
  purple() {
    return this.color("purple");
  }
  blue() {
    return this.color("blue");
  }
  gray() {
    return this.color("gray");
  }
};
__name2(RayColors, "RayColors");
var RaySizes = class {
  size(size) {
    return this;
  }
  small() {
    return this.size("sm");
  }
  large() {
    return this.size("lg");
  }
};
__name2(RaySizes, "RaySizes");
var RemovesRayFrames = class {
  static removeRayFrames(frames) {
    const result = frames.filter((frame) => !RemovesRayFrames.isRayFrame(frame) && !RemovesRayFrames.isNodeFrame(frame)).filter((frame) => {
      return !(!frame.fileName || !frame.functionName || !frame.source);
    });
    return result;
  }
  static isRayFrame(frame) {
    var _a;
    for (const rayNamespace of this.rayNamespaces()) {
      if ((_a = frame.fileName) == null ? undefined : _a.includes(rayNamespace)) {
        return true;
      }
    }
    return false;
  }
  static isNodeFrame(frame) {
    var _a;
    return ((_a = frame.fileName) == null ? undefined : _a.indexOf("node:")) === 0;
  }
  static rayNamespaces() {
    return ["ray-node/dist", "node-ray/dist", "vue-ray/dist"];
  }
};
__name2(RemovesRayFrames, "RemovesRayFrames");
var consoleLog = console.log.bind({});
var consoleWrapper = __name2((...args) => {
  if (typeof Ray.client !== "undefined" && Ray.client.isRayAvailable()) {
    Ray.create().send(...args);
  }
  consoleLog(...args);
}, "consoleWrapper");
var _ConsoleInterceptor = class {
  enable() {
    _ConsoleInterceptor.active = true;
    console.log = consoleWrapper;
  }
  disable() {
    _ConsoleInterceptor.active = false;
    console.log = consoleLog;
  }
  active() {
    return _ConsoleInterceptor.active;
  }
};
var ConsoleInterceptor = _ConsoleInterceptor;
__name2(ConsoleInterceptor, "ConsoleInterceptor");
ConsoleInterceptor.active = false;
var _Hostname = class {
  static get() {
    var _a;
    return (_a = _Hostname.hostname) != null ? _a : "remote";
  }
  static set(hostname) {
    _Hostname.hostname = hostname;
  }
};
var Hostname = _Hostname;
__name2(Hostname, "Hostname");
Hostname.hostname = null;
var prettyFormat = format;
var ArgumentConverter = class {
  static convertToPrimitive(arg) {
    if (arg === null) {
      return { value: null, isHtml: false };
    }
    if (typeof arg === "string") {
      return { value: arg, isHtml: false };
    }
    if (typeof arg === "number") {
      return { value: arg, isHtml: false };
    }
    if (typeof arg === "boolean") {
      return { value: arg, isHtml: false };
    }
    return { value: ArgumentConverter.prettyFormatForHtml(arg), isHtml: true };
  }
  static prettyFormatForHtml(arg) {
    const formatted = prettyFormat(arg, { indent: "    " }).replace(/ /g, "&nbsp;").replace(/\r\n|\r|\n/g, "<br>").replace(/("[^"]+")/g, '<code style="font-size: 0.8rem!important;" class="bold text-green-600 p-0">$1</code>').replace(/Array(&nbsp;|\s)+(\[[^\]]+\])/g, '<code style="font-size: 0.8rem!important;" class="text-gray-500 p-0">Array$1$2</code>').replace(/^(\[[^\]]+\])$/g, '<code style="font-size: 0.8rem!important;"class="text-gray-500 p-0">$1</code>').replace(/(\{.+\})/g, '<code style="font-size: 0.8rem!important;" class="text-gray-600 ">$1</code>').replace(/(Array|Object|Function|Circular|Symbol|WeakMap|Map)/g, '<span style="font-size: 0.8rem!important;" class="text-yellow-600 bold">$1</span>').replace(/(true|false|null)/g, '<span style="font-size: 0.8rem!important;" class="text-indigo-600 bold">$1</span>').replace(/(:&nbsp;|[,[\]{}])/g, '<span style="font-size: 0.8rem!important;" class="text-orange-400 bold">$1</span>');
    return `<code style="font-size: 0.8rem!important;">${formatted}</code>`;
  }
};
__name2(ArgumentConverter, "ArgumentConverter");
var Payload = class {
  constructor() {
    this.remotePath = null;
    this.localPath = null;
    this.initialized = false;
    this.data = {
      type: "",
      content: "",
      origin: { function_name: "", file: "", line_number: 0, hostname: "remote" }
    };
  }
  replaceRemotePathWithLocalPath(filePath) {
    if (this.remotePath === null || this.localPath === null) {
      return filePath;
    }
    const pattern = new RegExp("^" + this.remotePath);
    return filePath.replace(pattern, this.localPath);
  }
  getContent() {
    return {};
  }
  toArray() {
    if (!this.initialized) {
      this.initialized = true;
      this.data.type = this.getType();
      this.data.content = this.getContent();
      this.data.origin.file = this.replaceRemotePathWithLocalPath(this.data.origin.file);
    }
    return this.data;
  }
  toJson() {
    return JSON.stringify(this.toArray());
  }
};
__name2(Payload, "Payload");
var BoolPayload = class extends Payload {
  constructor(value) {
    super();
    this.value = value;
  }
  getType() {
    return "custom";
  }
  getContent() {
    return {
      content: this.value,
      label: "Boolean"
    };
  }
};
__name2(BoolPayload, "BoolPayload");
var HtmlPayload = class extends Payload {
  constructor(html = "") {
    super();
    this.html = html;
  }
  getType() {
    return "custom";
  }
  getContent() {
    return {
      content: this.html,
      label: "HTML"
    };
  }
};
__name2(HtmlPayload, "HtmlPayload");
var LogPayload = class extends Payload {
  constructor(values) {
    super();
    if (!Array.isArray(values)) {
      values = [values];
    }
    this.values = values;
  }
  static createForArguments(args) {
    const dumpedArguments = args.map((argument) => {
      return ArgumentConverter.convertToPrimitive(argument).value;
    });
    return new this(dumpedArguments);
  }
  getType() {
    return "log";
  }
  getContent() {
    return {
      values: this.values
    };
  }
};
__name2(LogPayload, "LogPayload");
var NullPayload = class extends Payload {
  getType() {
    return "custom";
  }
  getContent() {
    return {
      content: null,
      label: "Null"
    };
  }
};
__name2(NullPayload, "NullPayload");
var PayloadFactory = class {
  static createForValues(args) {
    return new this(args).getPayloads();
  }
  static registerPayloadFinder(callable) {
    this.payloadFinder = callable;
  }
  constructor(values) {
    this.values = values;
  }
  getPayloads() {
    return this.values.map((value) => {
      return this.getPayload(value);
    });
  }
  getPayload(value) {
    if (typeof value === "boolean") {
      return new BoolPayload(value);
    }
    if (value === null) {
      return new NullPayload;
    }
    const convertedResult = ArgumentConverter.convertToPrimitive(value);
    if (convertedResult.isHtml) {
      return new HtmlPayload(convertedResult.value);
    }
    return new LogPayload(convertedResult.value);
  }
};
__name2(PayloadFactory, "PayloadFactory");
PayloadFactory.payloadFinder = null;
var CallerPayload = class extends Payload {
  constructor(frames) {
    super();
    this.frames = RemovesRayFrames.removeRayFrames(frames);
  }
  getType() {
    return "caller";
  }
  getContent() {
    var _a, _b, _c, _d, _e, _f, _g;
    const frames = this.frames.slice(0);
    const frame = frames[0] || null;
    const funcNameParts = (_c = (_b = (_a = frame == null ? undefined : frame.getFunctionName()) == null ? undefined : _a.replace("Proxy.", "")) == null ? undefined : _b.split(".")) == null ? undefined : _c.slice(0);
    const className = (funcNameParts == null ? undefined : funcNameParts.length) ? funcNameParts.shift() : "";
    const methodName = (_d = funcNameParts == null ? undefined : funcNameParts.join(".")) != null ? _d : "";
    return {
      frame: {
        file_name: this.replaceRemotePathWithLocalPath((_e = frame == null ? undefined : frame.getFileName()) != null ? _e : ""),
        line_number: (frame == null ? undefined : frame.getLineNumber()) || 0,
        class: className,
        method: methodName,
        vendor_frame: (_g = (_f = frame == null ? undefined : frame.getFileName()) == null ? undefined : _f.includes("node_modules")) != null ? _g : false
      }
    };
  }
};
__name2(CallerPayload, "CallerPayload");
var ClearAllPayload = class extends Payload {
  getType() {
    return "clear_all";
  }
};
__name2(ClearAllPayload, "ClearAllPayload");
var ColorPayload = class extends Payload {
  constructor(color) {
    super();
    this.color = color;
  }
  getType() {
    return "color";
  }
  getContent() {
    return {
      color: this.color
    };
  }
};
__name2(ColorPayload, "ColorPayload");
var ConfettiPayload = class extends Payload {
  getType() {
    return "confetti";
  }
};
__name2(ConfettiPayload, "ConfettiPayload");
var CreateLockPayload = class extends Payload {
  constructor(name) {
    super();
    this.name = name;
  }
  getType() {
    return "create_lock";
  }
  getContent() {
    return {
      name: this.name
    };
  }
};
__name2(CreateLockPayload, "CreateLockPayload");
var CustomPayload = class extends Payload {
  constructor(content, label = "") {
    super();
    this.content = content;
    this.label = label;
  }
  getType() {
    return "custom";
  }
  getContent() {
    return {
      content: this.content,
      label: this.label
    };
  }
};
__name2(CustomPayload, "CustomPayload");
var DatePayload = class extends Payload {
  constructor(date, format2 = "YYYY-MM-DD hh:mm:ss") {
    super();
    this.date = date;
    this.format = format2;
  }
  getType() {
    return "carbon";
  }
  getContent() {
    return {
      formatted: this.date ? this.getFormatted() : null,
      timestamp: this.date ? this.getTimestamp() : null,
      timezone: this.date ? this.getTimezoneName() : null
    };
  }
  getTimestamp() {
    var _a;
    return dayjs.default((_a = this.date) == null ? undefined : _a.toISOString()).unix();
  }
  getFormatted() {
    var _a;
    return dayjs.default((_a = this.date) == null ? undefined : _a.toISOString()).format(this.format);
  }
  getTimezoneName() {
    if (this.date === null) {
      return "--";
    }
    const dateObj = this.date ? this.date : new Date;
    const matches = /\((.*)\)/.exec(dateObj.toString());
    return matches ? matches[1] : "--";
  }
};
__name2(DatePayload, "DatePayload");
var DecodedJsonPayload = class extends Payload {
  constructor(value) {
    super();
    this.value = value;
  }
  getType() {
    return "custom";
  }
  getContent() {
    const decodedJson = JSON.parse(this.value);
    return {
      content: decodedJson,
      label: "JSON"
    };
  }
};
__name2(DecodedJsonPayload, "DecodedJsonPayload");
var ErrorPayload = class extends Payload {
  constructor(err, label = "Error") {
    super();
    this.err = err;
    this.label = label;
  }
  getType() {
    return "custom";
  }
  getContent() {
    return {
      content: this.formatError(),
      label: this.label
    };
  }
  formatError() {
    return `<span class="text-red-400 bold">${this.err.name}</span>: <br><span class="pl-5 text-gray-500">${this.err.message}</span>`;
  }
};
__name2(ErrorPayload, "ErrorPayload");
var EventPayload = class extends Payload {
  constructor(eventName, payload) {
    super();
    this.eventName = eventName;
    this.payload = payload;
  }
  getType() {
    return "event";
  }
  getContent() {
    return {
      name: this.eventName,
      event: this.payload[0],
      payload: ArgumentConverter.convertToPrimitive(this.payload).value,
      class_based_event: true
    };
  }
};
__name2(EventPayload, "EventPayload");
var ExceptionPayload = class extends Payload {
  constructor(exception, meta = {}) {
    super();
    this.meta = {};
    this.stack = StackTrace.getSync({});
    this.exception = exception;
    this.meta = meta;
  }
  getType() {
    return "exception";
  }
  getContent() {
    return {
      class: this.exception.name,
      message: this.exception.message,
      frames: this.getFrames(),
      meta: this.meta
    };
  }
  getFrames() {
    return this.stack.slice(1).map((frame) => {
      var _a, _b, _c, _d;
      const funcNameParts = (_b = (_a = frame.functionName) == null ? undefined : _a.split(".")) != null ? _b : ["unknown", "unknown"];
      const methodName = funcNameParts.pop();
      let className = funcNameParts.pop();
      if (typeof className === "undefined") {
        className = "unknown";
      }
      return {
        file_name: this.replaceRemotePathWithLocalPath((_c = frame.getFileName()) != null ? _c : ""),
        line_number: frame.getLineNumber(),
        class: className,
        method: methodName,
        vendor_frame: (_d = frame.getFileName()) == null ? undefined : _d.includes("node_modules"),
        snippet: []
      };
    }).filter((obj) => !obj.file_name.startsWith("node:")).filter((obj) => !obj.file_name.includes("jest-circus")).filter((obj) => obj.class !== "Ray" && obj.method !== "exception");
  }
};
__name2(ExceptionPayload, "ExceptionPayload");
var HideAppPayload = class extends Payload {
  getType() {
    return "hide_app";
  }
};
__name2(HideAppPayload, "HideAppPayload");
var HidePayload = class extends Payload {
  getType() {
    return "hide";
  }
};
__name2(HidePayload, "HidePayload");
__name2(randomInteger, "randomInteger");
var sleep = __name2((seconds) => {
  return usleep(seconds * 1000);
}, "sleep");
var usleep = __name2((milliseconds) => {
  const start = (new Date()).getTime();
  while ((new Date()).getTime() < start + milliseconds) {
  }
}, "usleep");
var encodeHtmlEntities = __name2((str) => {
  const escapeChars = {
    "\xA2": "cent",
    "\xA3": "pound",
    "\xA5": "yen",
    "\u20AC": "euro",
    "\xA9": "copy",
    "\xAE": "reg",
    "<": "lt",
    ">": "gt",
    '"': "quot",
    "&": "amp",
    "'": "#39"
  };
  const chars = Object.keys(escapeChars);
  const regex = new RegExp(`[${chars.join("")}]`, "g");
  return str.replace(regex, (m) => `&${escapeChars[m]};`);
}, "encodeHtmlEntities");
var spacesToHtmlSpaces = __name2((spaces) => {
  return "&nbsp;".repeat(spaces.length);
}, "spacesToHtmlSpaces");
var encodeNewLinesToHtml = __name2((str) => {
  return str.replace(/(\r\n|\r|\n)/g, "<br>");
}, "encodeNewLinesToHtml");
var formatHtmlForDisplay = __name2((html, options = { encodeEntities: true }) => {
  if (options.encodeEntities) {
    html = encodeHtmlEntities(html);
  }
  return encodeNewLinesToHtml(html.replace(/^(\s+)/gm, (m) => `${spacesToHtmlSpaces(m)}`));
}, "formatHtmlForDisplay");
var nonCryptoUuidV4 = __name2(() => {
  const v4options = {
    random: [
      randomInteger(1, 255),
      randomInteger(1, 255),
      randomInteger(1, 255),
      randomInteger(1, 255),
      randomInteger(1, 255),
      randomInteger(1, 255),
      randomInteger(1, 255),
      randomInteger(1, 255),
      randomInteger(1, 255),
      randomInteger(1, 255),
      randomInteger(1, 255),
      randomInteger(1, 255),
      randomInteger(1, 255),
      randomInteger(1, 255),
      randomInteger(1, 255),
      randomInteger(1, 255)
    ]
  };
  return v4_default(v4options).toString();
}, "nonCryptoUuidV4");
var end = __name2((arr) => arr.length ? arr[arr.length - 1] : false, "end");
var HtmlMarkupPayload = class extends Payload {
  constructor(value, options = { highlight: "none" }) {
    super();
    this.value = value;
    this.options = options;
  }
  getType() {
    return "custom";
  }
  getContent() {
    const content = this.formatMarkupForDisplay(this.value);
    return {
      content,
      label: "Markup"
    };
  }
  formatMarkupForDisplay(markup) {
    const content = this.formatAndIndentMarkup(markup);
    return this.highlightHtmlMarkup(formatHtmlForDisplay(content, { encodeEntities: true }));
  }
  formatAndIndentMarkup(markup) {
    return import_xml_formatter.default(markup.toString(), {
      indentation: "    ",
      collapseContent: true,
      lineSeparator: "\n"
    });
  }
  highlightHtmlMarkup(markup) {
    return markup.replace(/&quot;/g, '"').replace(/="([^"]+)"/g, `=<span style='color:#16A34A;'>&quot;\$1&quot;</span>`).replace(/(&lt;[A-Za-z\d-]+)(\s|&nbsp;|&gt;)/g, '<span style="color:#1D4ED8;">$1</span>$2').replace(/(&lt;\/[A-Za-z\d-]+)(&gt;)/g, '<span style="color:#1D4ED8;">$1$2</span>');
  }
};
__name2(HtmlMarkupPayload, "HtmlMarkupPayload");
var ImagePayload = class extends Payload {
  constructor(location) {
    super();
    this.location = location;
  }
  getType() {
    return "custom";
  }
  getContent() {
    const location = this.location.replace('"', '\\\\"');
    return {
      content: `<img src="${location}" alt="" />`,
      label: "Image"
    };
  }
};
__name2(ImagePayload, "ImagePayload");
var JsonStringPayload = class extends Payload {
  constructor(value) {
    super();
    this.value = value;
  }
  getType() {
    return "json_string";
  }
  getContent() {
    return {
      value: JSON.stringify(this.value)
    };
  }
};
__name2(JsonStringPayload, "JsonStringPayload");
var LabelPayload = class extends Payload {
  constructor(label) {
    super();
    this.label = label;
  }
  getType() {
    return "label";
  }
  getContent() {
    return {
      label: this.label
    };
  }
};
__name2(LabelPayload, "LabelPayload");
var MeasurePayload = class extends Payload {
  constructor(name, stopwatchEvent) {
    super();
    this.isNewTimer = false;
    this.totalTime = 0;
    this.maxMemoryUsageDuringTotalTime = 0;
    this.timeSinceLastCall = 0;
    this.maxMemoryUsageSinceLastCall = 0;
    this.name = name;
    this.totalTime = stopwatchEvent.getDuration();
    this.maxMemoryUsageDuringTotalTime = stopwatchEvent.getMemory();
    const periods = stopwatchEvent.getPeriods();
    if (periods.length > 1) {
      this.timeSinceLastCall = end(periods);
      this.maxMemoryUsageSinceLastCall = 0;
    }
  }
  getType() {
    return "measure";
  }
  concernsNewTimer() {
    this.isNewTimer = true;
    this.totalTime = 0;
    this.maxMemoryUsageDuringTotalTime = 0;
    this.timeSinceLastCall = 0;
    this.maxMemoryUsageSinceLastCall = 0;
    return this;
  }
  getContent() {
    return {
      name: this.name,
      is_new_timer: this.isNewTimer,
      total_time: this.totalTime,
      max_memory_usage_during_total_time: this.maxMemoryUsageDuringTotalTime,
      time_since_last_call: this.timeSinceLastCall,
      max_memory_usage_since_last_call: this.maxMemoryUsageSinceLastCall
    };
  }
};
__name2(MeasurePayload, "MeasurePayload");
var NewScreenPayload = class extends Payload {
  constructor(name) {
    super();
    this.name = name;
  }
  getType() {
    return "new_screen";
  }
  getContent() {
    return {
      name: this.name
    };
  }
};
__name2(NewScreenPayload, "NewScreenPayload");
var NotifyPayload = class extends Payload {
  constructor(text) {
    super();
    this.text = text;
  }
  getType() {
    return "notify";
  }
  getContent() {
    return {
      value: this.text
    };
  }
};
__name2(NotifyPayload, "NotifyPayload");
var RemovePayload = class extends Payload {
  getType() {
    return "remove";
  }
};
__name2(RemovePayload, "RemovePayload");
var ScreenColorPayload = class extends Payload {
  constructor(color) {
    super();
    this.color = color;
  }
  getType() {
    return "screen_color";
  }
  getContent() {
    return {
      color: this.color
    };
  }
};
__name2(ScreenColorPayload, "ScreenColorPayload");
var SeparatorPayload = class extends Payload {
  getType() {
    return "separator";
  }
};
__name2(SeparatorPayload, "SeparatorPayload");
var ShowAppPayload = class extends Payload {
  getType() {
    return "show_app";
  }
};
__name2(ShowAppPayload, "ShowAppPayload");
var SizePayload = class extends Payload {
  constructor(size) {
    super();
    this.size = size;
  }
  getType() {
    return "size";
  }
  getContent() {
    return {
      size: this.size
    };
  }
};
__name2(SizePayload, "SizePayload");
var TablePayload = class extends Payload {
  constructor(values, label = "Table") {
    super();
    this.values = values;
    this.label = label;
  }
  getType() {
    return "table";
  }
  getContent() {
    const values = this.getValues();
    return {
      values,
      label: this.label
    };
  }
  getValues() {
    if (Array.isArray(this.values)) {
      return this.values.map((item) => {
        return ArgumentConverter.convertToPrimitive(item).value;
      });
    }
    const values = {};
    for (const prop in this.values) {
      values[prop] = ArgumentConverter.convertToPrimitive(this.values[prop]).value;
    }
    return values;
  }
};
__name2(TablePayload, "TablePayload");
var TextPayload = class extends Payload {
  constructor(text) {
    super();
    this.text = text;
  }
  getType() {
    return "custom";
  }
  getContent() {
    return {
      content: this.formatContent(),
      label: "Text"
    };
  }
  formatContent() {
    return formatHtmlForDisplay(this.text, { encodeEntities: true });
  }
};
__name2(TextPayload, "TextPayload");
var TracePayload = class extends Payload {
  constructor(frames) {
    super();
    this.startFromIndexNum = null;
    this.limitNum = null;
    this.frames = RemovesRayFrames.removeRayFrames(frames);
  }
  startFromIndex(index) {
    this.startFromIndexNum = index;
    return this;
  }
  limit(limit) {
    this.limitNum = limit;
    return this;
  }
  getType() {
    return "trace";
  }
  getContent() {
    var _a;
    let frames = this.frames.map((frame) => {
      var _a2, _b, _c, _d;
      const funcNameParts = (_a2 = frame.getFunctionName()) == null ? undefined : _a2.replace("Proxy.", "").split(".").slice(0);
      const className = (funcNameParts == null ? undefined : funcNameParts.length) ? funcNameParts.shift() : "";
      const methodName = (_b = funcNameParts == null ? undefined : funcNameParts.join(".")) != null ? _b : "";
      return {
        file_name: this.replaceRemotePathWithLocalPath((_c = frame.getFileName()) != null ? _c : ""),
        line_number: frame.getLineNumber(),
        class: className,
        method: methodName,
        vendor_frame: (_d = frame.getFileName()) == null ? undefined : _d.includes("node_modules")
      };
    });
    if (this.limitNum !== null) {
      frames = frames.slice((_a = this.startFromIndexNum) != null ? _a : 0, this.limitNum);
    }
    return { frames };
  }
};
__name2(TracePayload, "TracePayload");
var formatXml2 = xmlfmt.default;
var XmlPayload = class extends Payload {
  constructor(value) {
    super();
    this.value = value;
  }
  getType() {
    return "custom";
  }
  getContent() {
    const content = this.formatXmlForDisplay(this.value);
    return {
      content,
      label: "XML"
    };
  }
  formatXmlForDisplay(xml) {
    const content = this.formatAndIndentXml(xml);
    return this.encodeXml(content);
  }
  encodeXml(xml) {
    return formatHtmlForDisplay(xml, { encodeEntities: true });
  }
  formatAndIndentXml(xml) {
    return formatXml2(xml.toString(), {
      indentation: "    ",
      collapseContent: true,
      lineSeparator: "\n"
    });
  }
};
__name2(XmlPayload, "XmlPayload");
var Request = class {
  constructor(uuid, payloads, meta = []) {
    this.uuid = uuid;
    this.payloads = payloads;
    this.meta = meta;
  }
  toArray() {
    return {
      uuid: this.uuid,
      payloads: this.payloads.map((payload) => payload.toArray()),
      meta: this.meta
    };
  }
  toJson() {
    return JSON.stringify(this.toArray());
  }
};
__name2(Request, "Request");
var _Client = class {
  constructor(portNumber = 23517, host = "localhost", scheme = "http") {
    this.scheme = "http";
    this.portNumber = portNumber;
    this.host = host;
    this.scheme = scheme;
  }
  async init() {
    await this.updateRayAvailabilty();
  }
  isRayAvailable() {
    this.attemptAvailableReset();
    if (_Client.rayState === null) {
      this.updateRayAvailabilty();
    }
    if (_Client.rayState !== null) {
      return _Client.rayState;
    }
    return true;
  }
  attemptAvailableReset() {
    if (_Client.lastRayStateCheck !== null && (new Date()).getTime() - _Client.lastRayStateCheck >= 30000) {
      _Client.rayState = null;
    }
  }
  async updateRayAvailabilty() {
    let result = true;
    if (_Client.lastRayStateCheck !== null && (new Date()).getTime() - _Client.lastRayStateCheck < 30000) {
      return true;
    }
    _Client.lastRayStateCheck = (new Date()).getTime();
    try {
      await axios_default.get(this.getUrlForPath("/locks/__availabilty_check"), {});
    } catch (err) {
      if (err.response) {
        result = true;
      } else if (err.request) {
        result = false;
      } else {
        result = false;
      }
    } finally {
      _Client.rayState = result;
    }
  }
  getUrlForPath(path) {
    var _a;
    path = path.replace(/^\//, "");
    return `${(_a = this.scheme) != null ? _a : "http"}://${this.host}:${this.portNumber}/${path}`;
  }
  async send(request) {
    if (_Client.rayState === null || _Client.lastRayStateCheck === null) {
      this.updateRayAvailabilty();
    }
    try {
      request.payloads = this.ensureAllPayloadsHaveAnOrigin(request.payloads);
      await axios_default.post(this.getUrlForPath("/"), request.toArray(), { withCredentials: false });
    } catch (err) {
    }
  }
  ensureAllPayloadsHaveAnOrigin(payloads) {
    payloads.forEach((payload) => {
      if (payload.data.origin.file === null || payload.data.origin.file === "" || typeof payload.data.origin["file"] === "undefined") {
        payload.data.origin["file"] = "/unknown-file.js";
        payload.data.origin["line_number"] = 1;
        payload.data.origin["function_name"] = "unknown";
      }
    });
    return payloads;
  }
  async lockExists(lockName) {
    return new Promise(async (resolve, reject) => {
      let resp;
      try {
        resp = await axios_default.get(this.getUrlForPath(`/locks/${lockName}`));
      } catch (err) {
        return false;
      }
      if (resp.data.stop_execution) {
        reject(new Error("stopping execution"));
        return;
      }
      if (typeof resp.data["active"] === "undefined") {
        resolve(resp.data);
        return;
      }
      resolve(resp.data);
    });
  }
};
var Client = _Client;
__name2(Client, "Client");
Client.rayState = true;
Client.lastRayStateCheck = null;
var Settings = class {
  constructor(settings2) {
    this.enable = true;
    this._host = "localhost";
    this._port = 23517;
    this._scheme = "http";
    this.remote_path = null;
    this.local_path = null;
    this.always_send_raw_values = false;
    this.intercept_console_log = false;
    this.enabled_callback = null;
    this.sent_payload_callback = null;
    this.sending_payload_callback = null;
    this.originalSettings = Object.assign({}, settings2);
    for (const prop in settings2) {
      this[prop] = settings2[prop];
    }
  }
  set host(value) {
    this._host = value;
    Ray.useClient(new Client(this.port, this.host, this.scheme));
  }
  get host() {
    return this._host;
  }
  set port(value) {
    this._port = value;
    Ray.useClient(new Client(this.port, this.host, this.scheme));
  }
  get port() {
    return this._port;
  }
  get scheme() {
    return this._scheme;
  }
  set scheme(value) {
    this._scheme = value;
    Ray.useClient(new Client(this.port, this.host, this.scheme));
  }
  toObject() {
    return this.originalSettings;
  }
};
__name2(Settings, "Settings");
var StopwatchEvent2 = class {
  constructor(sw, lapTime = null) {
    this.laps = [];
    var _a;
    this.name = (_a = sw.name) == null ? undefined : _a.slice(0);
    this.laps = sw.laps.slice(0);
    this.startedAt = sw.startedAt;
    this.endedAt = sw.endedAt;
    this.lapTime = lapTime != null ? lapTime : (new Date()).getTime();
  }
  getDuration() {
    return this.laps.reduce((prev, cur) => cur + prev, 0);
  }
  getMemory() {
    return 0;
  }
  getPeriods() {
    return this.laps.slice();
  }
  getPreviousDuration() {
    return end(this.laps) - ((new Date()).getTime() - this.lapTime);
  }
};
__name2(StopwatchEvent2, "StopwatchEvent");
var Stopwatch2 = class {
  constructor(name = undefined) {
    this.laps = [];
    this.startedAt = 0;
    this.endedAt = 0;
    this.name = name;
    this.sw = new StopWatches.StopWatch(name);
    this.laps = [];
    this.startedAt = 0;
    this.endedAt = 0;
  }
  initialize(name) {
    this.name = name;
    this.sw = new StopWatches.StopWatch(name);
    this.laps = [];
    this.startedAt = 0;
    this.endedAt = 0;
  }
  start(name) {
    this.startedAt = (new Date()).getTime();
    this.sw.start(name);
    return new StopwatchEvent2(this);
  }
  lap() {
    const lapTime = (new Date()).getTime();
    const duration = lapTime - this.startedAt;
    this.laps.push(duration - this.totalDuration());
    return new StopwatchEvent2(this, lapTime);
  }
  stop() {
    this.sw.stop();
    this.endedAt = (new Date()).getTime();
    const duration = this.endedAt - this.startedAt;
    this.laps.push(duration - this.totalDuration());
    return new StopwatchEvent2(this);
  }
  totalDuration() {
    return this.laps.reduce((prev, cur) => {
      return cur + prev;
    }, 0);
  }
  reset() {
    this.initialize(this.name);
    return this;
  }
  getLaps() {
    return this.laps;
  }
};
__name2(Stopwatch2, "Stopwatch");
var Counters = class {
  constructor() {
    this.counters = {};
  }
  increment(name) {
    if (typeof this.counters[name] === "undefined") {
      this.counters[name] = [ray(), 0];
    }
    const data3 = this.counters[name];
    const ray2 = data3[0];
    const times = data3[1];
    const newTimes = times + 1;
    this.counters[name] = [ray2, newTimes];
    return [ray2, newTimes];
  }
  get(name) {
    if (typeof this.counters[name] === "undefined") {
      return 0;
    }
    return this.counters[name][1];
  }
  clear() {
    this.counters = [];
  }
  setRay(name, ray2) {
    this.counters[name][0] = ray2;
  }
  getCounters() {
    return this.counters;
  }
};
__name2(Counters, "Counters");
var Limiters = class {
  constructor() {
    this.counters = {};
  }
  initialize(origin, limit) {
    const fingerprint = `${origin.file}:${origin.line_number}`;
    if (typeof this.counters[fingerprint] === "undefined") {
      this.counters[fingerprint] = { counter: 0, limit, valid: true };
    }
    return this.counters[fingerprint];
  }
  increment(origin) {
    const name = `${origin.file}:${origin.line_number}`;
    if (typeof this.counters[name] === "undefined") {
      return { counter: 0, limit: 0, valid: false };
    }
    const { counter, limit, valid } = this.counters[name];
    this.counters[name] = { counter: counter + 1, limit, valid };
    return this.counters[name];
  }
  canSendPayload(origin) {
    const name = `${origin.file}:${origin.line_number}`;
    if (typeof this.counters[name] === "undefined") {
      return true;
    }
    const { counter, limit, valid } = this.counters[name];
    return valid && (counter < limit || limit <= 0);
  }
};
__name2(Limiters, "Limiters");
var CacheStore = class {
  constructor(clock) {
    this.store = [];
    this.clock = clock;
  }
  hit() {
    this.store.push(this.clock.now());
    return this;
  }
  clear() {
    this.store = [];
    return this;
  }
  count() {
    return this.store.length;
  }
  countLastSecond() {
    const lastSecond = this.clock.now().modify("-1 second");
    let amount = 0;
    this.store.forEach((item) => {
      if (this.isBetween(item, lastSecond, this.clock.now())) {
        amount++;
      }
    });
    return amount;
  }
  isBetween(toCheck, start, end2) {
    return toCheck.getTimestamp() >= start.getTimestamp() && toCheck.getTimestamp() <= end2.getTimestamp();
  }
};
__name2(CacheStore, "CacheStore");
var Clock2 = class {
};
__name2(Clock2, "Clock");
var DateImmutable3 = class {
  get date() {
    return import_dayjs.default(this.dateStr).toDate();
  }
  set date(value) {
    this.dateTs = value.getTime();
    this.dateStr = value.toISOString();
  }
  static createFrom(date) {
    return new DateImmutable3(date);
  }
  constructor(date = null) {
    this.date = date != null ? date : new Date;
    this.dateStr = this.date.toISOString();
    this.dateTs = this.date.getTime();
  }
  getTimestamp() {
    return Math.floor(this.dateTs / 1000);
  }
  modify(str) {
    const strParts = str.split(" ");
    const parts = [];
    for (let idx = 0;idx < strParts.length; idx++) {
      parts.push({
        value: Number(strParts[idx]),
        unit: strParts[idx + 1]
      });
      idx++;
    }
    let tempDate = import_dayjs.default(this.getTimestamp() * 1000);
    parts.forEach((part) => {
      tempDate = tempDate.add(part.value * 1000);
    });
    return DateImmutable3.createFrom(tempDate.toDate());
  }
};
__name2(DateImmutable3, "DateImmutable");
var SystemClock = class extends Clock2 {
  now() {
    return new DateImmutable3;
  }
};
__name2(SystemClock, "SystemClock");
var RateLimiter = class {
  constructor(maxCalls = null, maxPerSecond = null) {
    this.notified = false;
    this.maxCalls = maxCalls;
    this.maxPerSecond = maxPerSecond;
    this.cache = new CacheStore(new SystemClock);
  }
  static disabled() {
    return new RateLimiter(null, null);
  }
  hit() {
    this.cache.hit();
    return this;
  }
  max(maxCalls = null) {
    this.maxCalls = maxCalls;
    return this;
  }
  perSecond(callsPerSecond = null) {
    this.maxPerSecond = callsPerSecond;
    return this;
  }
  isMaxReached() {
    if (this.maxCalls === null) {
      return false;
    }
    const reached = this.cache.count() >= this.maxCalls;
    if (!reached) {
      this.notified = false;
    }
    return reached;
  }
  isMaxPerSecondReached() {
    if (this.maxPerSecond === null) {
      return false;
    }
    const reached = this.cache.countLastSecond() >= this.maxPerSecond;
    if (reached === false) {
      this.notified = false;
    }
    return reached;
  }
  clear() {
    this.maxCalls = null;
    this.maxPerSecond = null;
    this.cache.clear();
    return this;
  }
  isNotified() {
    return this.notified;
  }
  notify() {
    this.notified = true;
  }
  getCache() {
    return this.cache;
  }
};
__name2(RateLimiter, "RateLimiter");
var PACKAGE_VERSION = "__buildVersion__";
var version_default = PACKAGE_VERSION;
var BUILDING_STANDALONE_LIB = typeof __BUILDING_STANDALONE_LIB__ !== "undefined" && __BUILDING_STANDALONE_LIB__ === "true";
var md5 = md5lib.default;
var getSync = StackTrace.getSync;
var _Ray = class extends Mixin(RayColors, RaySizes, RayScreenColors) {
  constructor(settings2, client = null, uuid = null, inCallback = false) {
    var _a, _b, _c;
    super();
    this.inCallback = false;
    this.limitOrigin = null;
    this.canSendPayload = true;
    if (_Ray.defaultSettings.not_defined === true) {
      _Ray.defaultSettings = {
        enable: true,
        host: "localhost",
        port: 23517,
        scheme: "http",
        local_path: null,
        remote_path: null,
        always_send_raw_values: false,
        enabled_callback: null,
        sending_payload_callback: null,
        sent_payload_callback: null,
        not_defined: false
      };
    }
    this.inCallback = inCallback;
    this.settings = new Settings(_Ray.defaultSettings);
    if (_Ray.enabled === null) {
      _Ray.enabled = this.settings.enable !== false;
    }
    _Ray.client = (_a = client != null ? client : _Ray.client) != null ? _a : new Client(this.settings.port, this.settings.host);
    _Ray._rateLimiter = (_b = _Ray._rateLimiter) != null ? _b : RateLimiter.disabled();
    this.uuid = (_c = uuid != null ? uuid : _Ray.fakeUuid) != null ? _c : nonCryptoUuidV4();
    if (this.settings.intercept_console_log && !this.interceptor().active()) {
      this.interceptor().enable();
    }
    this.loadMacros();
  }
  static create(client = null, uuid = null) {
    if (_Ray.defaultSettings.not_defined === true) {
      _Ray.defaultSettings = {
        enable: true,
        host: "localhost",
        port: 23517,
        scheme: "http",
        local_path: null,
        remote_path: null,
        always_send_raw_values: false,
        not_defined: false,
        intercept_console_log: false,
        enabled_callback: null,
        sending_payload_callback: null,
        sent_payload_callback: null
      };
    }
    const settings2 = new Settings(_Ray.defaultSettings);
    return new this(settings2, client, uuid);
  }
  static useDefaultSettings(settings2) {
    if (_Ray.defaultSettings.not_defined === true) {
      _Ray.defaultSettings = {
        enable: true,
        host: "localhost",
        port: 23517,
        scheme: "http",
        local_path: null,
        remote_path: null,
        always_send_raw_values: false,
        enabled_callback: null,
        sending_payload_callback: null,
        sent_payload_callback: null,
        not_defined: false
      };
    }
    _Ray.defaultSettings = Object.assign({}, _Ray.defaultSettings, settings2);
    _Ray.defaultSettings.not_defined = false;
    _Ray.client = new Client(this.defaultSettings.port, this.defaultSettings.host);
    return this;
  }
  loadMacros() {
    for (const name in _Ray.macros) {
      const handler = _Ray.macros[name];
      this[name] = handler.bind(this);
    }
    return this;
  }
  interceptor() {
    return _Ray.interceptor;
  }
  client() {
    return _Ray.client;
  }
  enable() {
    _Ray.enabled = true;
    return this;
  }
  disable() {
    _Ray.enabled = false;
    return this;
  }
  enabled() {
    if (typeof this.settings.enabled_callback === "function") {
      return _Ray.enabled && this.settings.enabled_callback();
    }
    return _Ray.enabled;
  }
  disabled() {
    return !this.enabled();
  }
  static useClient(client) {
    this.client = client;
  }
  project(projectName) {
    _Ray.projectName = projectName;
    return this;
  }
  newScreen(name = "") {
    const payload = new NewScreenPayload(name);
    return this.sendRequest(payload);
  }
  clearAll() {
    const payload = new ClearAllPayload;
    return this.sendRequest(payload);
  }
  clearScreen() {
    return this.newScreen();
  }
  color(color) {
    const payload = new ColorPayload(color);
    return this.sendRequest(payload);
  }
  confetti() {
    const payload = new ConfettiPayload;
    return this.sendRequest(payload);
  }
  screenColor(color) {
    const payload = new ScreenColorPayload(color);
    return this.sendRequest(payload);
  }
  label(label) {
    const payload = new LabelPayload(label);
    return this.sendRequest(payload);
  }
  size(size) {
    const payload = new SizePayload(size);
    return this.sendRequest(payload);
  }
  remove() {
    const payload = new RemovePayload;
    return this.sendRequest(payload);
  }
  hide() {
    const payload = new HidePayload;
    return this.sendRequest(payload);
  }
  notify(text) {
    const payload = new NotifyPayload(text);
    return this.sendRequest(payload);
  }
  toJson(...values) {
    const payloads = values.map((value) => new JsonStringPayload(value));
    return this.sendRequest(payloads);
  }
  json(...jsons) {
    const payloads = jsons.map((json) => new DecodedJsonPayload(json));
    return this.sendRequest(payloads);
  }
  file(filename) {
    console.error(`file() unsupport on web (${filename})`);
    return this;
  }
  image(location) {
    const payload = new ImagePayload(location);
    return this.sendRequest(payload);
  }
  die(status = "") {
    throw new Error(`Ray.die() called: ${status ? status : "no message"}`);
  }
  className(object) {
    return this.send(object.constructor.name);
  }
  error(err) {
    const payload = new ErrorPayload(err, "Error");
    this.sendRequest(payload);
    this.red();
    return this;
  }
  event(eventName, data3 = []) {
    const payload = new EventPayload(eventName, data3);
    return this.sendRequest(payload);
  }
  exception(err, meta = {}) {
    const payload = new ExceptionPayload(err, meta);
    this.sendRequest(payload);
    this.red();
    return this;
  }
  showWhen(booleanOrCallable) {
    if (typeof booleanOrCallable === "function") {
      booleanOrCallable = booleanOrCallable();
    }
    if (!booleanOrCallable) {
      this.remove();
    }
    return this;
  }
  showIf(booleanOrCallable) {
    return this.showWhen(booleanOrCallable);
  }
  removeWhen(booleanOrCallable) {
    if (typeof booleanOrCallable === "function") {
      booleanOrCallable = booleanOrCallable();
    }
    if (booleanOrCallable) {
      this.remove();
    }
    return this;
  }
  removeIf(booleanOrCallable) {
    return this.removeWhen(booleanOrCallable);
  }
  ban() {
    return this.send("\uD83D\uDD76");
  }
  charles() {
    return this.send("\uD83C\uDFB6 \uD83C\uDFB9 \uD83C\uDFB7 \uD83D\uDD7A");
  }
  table(values, label = "Table") {
    const payload = new TablePayload(values, label);
    return this.sendRequest(payload);
  }
  count(name = null) {
    var _a, _b, _c;
    const fingerprint = md5(`${(_a = this.getCaller()) == null ? undefined : _a.getFileName()}${(_b = this.getCaller()) == null ? undefined : _b.getLineNumber()}`);
    const [ray2, times] = _Ray.counters.increment((_c = name != null ? name : fingerprint) != null ? _c : "none");
    let message = `Called `;
    if (name) {
      message += `'${name}' `;
    }
    message += `${times} ${times === 1 ? "time" : "times"}.`;
    ray2.sendCustom(message, "Count");
    return ray2;
  }
  clearCounters() {
    _Ray.counters.clear();
    return this;
  }
  async pause() {
    _Ray.lockCounter++;
    const lockName = md5(`${(new Date()).getTime()}-${_Ray.lockCounter}`);
    const payload = new CreateLockPayload(lockName);
    this.sendRequest(payload);
    return new Promise(async (resolve, reject) => {
      let exists;
      do {
        sleep(1);
        try {
          exists = await _Ray.client.lockExists(lockName);
        } catch (err) {
          reject(err);
          return false;
        }
        if (exists !== true && exists && exists.stop_execution) {
          reject(false);
          return false;
        }
      } while (exists.active);
      resolve(this);
    });
  }
  stopTime(stopwatchName = "") {
    if (stopwatchName === "") {
      _Ray.stopWatches = {};
      return this;
    }
    if (typeof _Ray.stopWatches[stopwatchName] !== "undefined") {
      delete _Ray.stopWatches[stopwatchName];
    }
    return this;
  }
  caller() {
    const backtrace = getSync({});
    const payload = new CallerPayload(backtrace);
    return this.sendRequest(payload);
  }
  trace() {
    const backtrace = getSync({});
    const payload = new TracePayload(backtrace);
    return this.sendRequest(payload);
  }
  measure(stopwatchName = "default") {
    if (stopwatchName instanceof Function) {
      return this.measureClosure(stopwatchName);
    }
    if (typeof _Ray.stopWatches[stopwatchName] === "undefined") {
      const stopwatch2 = this.getStopwatch(stopwatchName);
      _Ray.stopWatches[stopwatchName] = stopwatch2;
      const event2 = stopwatch2.start(stopwatchName);
      const payload2 = this.getMeasurePayload(stopwatchName, event2);
      payload2.concernsNewTimer();
      return this.sendRequest(payload2);
    }
    const stopwatch = _Ray.stopWatches[stopwatchName];
    const event = stopwatch.lap();
    const payload = this.getMeasurePayload(stopwatchName, event);
    return this.sendRequest(payload);
  }
  measureClosure(closure) {
    const stopwatch = this.getStopwatch("closure");
    stopwatch.start("closure");
    closure();
    const event = stopwatch.stop();
    const payload = this.getMeasurePayload("closure", event);
    return this.sendRequest(payload);
  }
  getStopwatch(name) {
    return new Stopwatch2(name);
  }
  getMeasurePayload(name, event) {
    return new MeasurePayload(name, event);
  }
  separator() {
    const payload = new SeparatorPayload;
    return this.sendRequest(payload);
  }
  xml(xml) {
    const payload = new XmlPayload(xml);
    return this.sendRequest(payload);
  }
  html(html = "") {
    const payload = new HtmlPayload(html);
    return this.sendRequest(payload);
  }
  text(text = "") {
    const payload = new TextPayload(text);
    return this.sendRequest(payload);
  }
  date(date) {
    const payload = new DatePayload(date);
    return this.sendRequest(payload);
  }
  raw(...args) {
    if (!args.length) {
      return this;
    }
    const payloads = args.map((arg) => LogPayload.createForArguments([arg]));
    return this.sendRequest(payloads);
  }
  send(...args) {
    if (!args.length) {
      return this;
    }
    if (this.settings.always_send_raw_values) {
      return this.raw(...args);
    }
    const payloads = PayloadFactory.createForValues(args);
    return this.sendRequest(payloads);
  }
  pass(argument) {
    this.send(argument);
    return argument;
  }
  showApp() {
    const payload = new ShowAppPayload;
    return this.sendRequest(payload);
  }
  hideApp() {
    const payload = new HideAppPayload;
    return this.sendRequest(payload);
  }
  macro(name, handler) {
    _Ray.macros[name] = handler;
    this[name] = handler.bind(this);
    return this;
  }
  htmlMarkup(html, options = {}) {
    const payload = new HtmlMarkupPayload(html, options);
    return this.sendRequest(payload);
  }
  if(boolOrCallable, callback = null) {
    if (typeof boolOrCallable === "function") {
      boolOrCallable = boolOrCallable();
    }
    if (boolOrCallable && callback !== null) {
      callback(this);
    }
    if (callback === null) {
      this.canSendPayload = boolOrCallable;
    }
    return this;
  }
  limit(count) {
    const frame = this.getOriginFrame();
    this.limitOrigin = {
      function_name: frame == null ? undefined : frame.getFunctionName(),
      file: frame == null ? undefined : frame.getFileName(),
      line_number: frame == null ? undefined : frame.getLineNumber(),
      hostname: Hostname.get()
    };
    _Ray.limiters.initialize(this.limitOrigin, count);
    return this;
  }
  once(...args) {
    const frame = this.getOriginFrame();
    this.limitOrigin = {
      function_name: frame == null ? undefined : frame.getFunctionName(),
      file: frame == null ? undefined : frame.getFileName(),
      line_number: frame == null ? undefined : frame.getLineNumber(),
      hostname: Hostname.get()
    };
    _Ray.limiters.initialize(this.limitOrigin, 1);
    if (args.length > 0) {
      return this.send(...args);
    }
    return this;
  }
  sendCustom(content, label = "") {
    const payload = new CustomPayload(content, label);
    return this.sendRequest(payload);
  }
  getOriginFrame() {
    const st = getSync({});
    let startFrameIndex = st.findIndex((frame) => {
      var _a;
      return (_a = frame.functionName) == null ? undefined : _a.includes("Ray.sendRequest");
    });
    if (startFrameIndex === -1) {
      startFrameIndex = 0;
    }
    const callerFrames = RemovesRayFrames.removeRayFrames(st.slice(startFrameIndex).filter((frame) => {
      var _a;
      return !((_a = frame.functionName) == null ? undefined : _a.includes("Ray."));
    }));
    return callerFrames.slice(0).shift();
  }
  getCaller() {
    const st = getSync({});
    let startFrameIndex = st.findIndex((frame) => {
      var _a;
      return (_a = frame.functionName) == null ? undefined : _a.includes("Ray.getCaller");
    });
    if (startFrameIndex === -1) {
      startFrameIndex = 0;
    }
    const callerFrames = st.slice(startFrameIndex);
    if (callerFrames.length === 1) {
      return callerFrames.shift();
    }
    return callerFrames.slice(2).shift();
  }
  getOriginData() {
    const frame = this.getOriginFrame();
    return {
      function_name: frame == null ? undefined : frame.getFunctionName(),
      file: frame == null ? undefined : frame.getFileName(),
      line_number: frame == null ? undefined : frame.getLineNumber(),
      hostname: Hostname.get()
    };
  }
  sendRequest(payloads, meta = []) {
    var _a;
    if (!this.enabled()) {
      return this;
    }
    if (!this.canSendPayload) {
      return this;
    }
    if (this.limitOrigin !== null) {
      if (!_Ray.limiters.canSendPayload(this.limitOrigin)) {
        return this;
      }
      _Ray.limiters.increment(this.limitOrigin);
    }
    if (!Array.isArray(payloads)) {
      payloads = [payloads];
    }
    if (this.rateLimiter().isMaxReached() || this.rateLimiter().isMaxPerSecondReached()) {
      this.notifyWhenRateLimitReached();
      return this;
    }
    const allMeta = Object.assign({}, {
      node_ray_package_version: version_default,
      project_name: _Ray.projectName
    }, meta);
    payloads.forEach((payload) => {
      payload.data.origin = this.getOriginData();
      payload.remotePath = this.settings.remote_path;
      payload.localPath = this.settings.local_path;
    });
    if (this.settings.sending_payload_callback !== null && !this.inCallback) {
      this.inCallback = true;
      this.settings.sending_payload_callback(new _Ray(this.settings, this.client(), this.uuid, true), payloads);
      this.inCallback = false;
    }
    const request = new Request(this.uuid, payloads, allMeta);
    (_a = _Ray.client) == null || _a.send(request);
    this.rateLimiter().hit();
    if (this.settings.sent_payload_callback !== null && !this.inCallback) {
      this.inCallback = true;
      this.settings.sent_payload_callback(this);
      this.inCallback = false;
    }
    return this;
  }
  rateLimiter() {
    return _Ray._rateLimiter;
  }
  notifyWhenRateLimitReached() {
    if (this.rateLimiter().isNotified()) {
      return;
    }
    const customPayload = new CustomPayload("Rate limit has been reached...", "Rate limit");
    const request = new Request(this.uuid, [customPayload], []);
    _Ray.client.send(request);
    this.rateLimiter().notify();
  }
  standalone(windowObject) {
    if (typeof windowObject !== "undefined") {
      windowObject["ray"] = ray;
      windowObject["Ray"] = _Ray;
    }
  }
};
var Ray = _Ray;
__name2(Ray, "Ray");
Ray.lockCounter = 0;
Ray.defaultSettings = { not_defined: true };
Ray.projectName = "";
Ray.counters = new Counters;
Ray.limiters = new Limiters;
Ray.interceptor = new ConsoleInterceptor;
Ray.stopWatches = {};
Ray.enabled = null;
Ray.macros = {};
Ray._rateLimiter = RateLimiter.disabled();
var ray = __name2((...args) => {
  return Ray.create().send(...args);
}, "ray");
var standalone = __name2((windowObject) => {
  if (typeof windowObject !== "undefined") {
    windowObject["ray"] = ray;
    windowObject["Ray"] = Ray;
  }
}, "standalone");
__name2(standaloneInitialization, "standaloneInitialization");

// src/index.ts
Ray.useDefaultSettings({
  remote_path: "webpack-internal:///(sc_server|sc_client|app-client)/.",
  local_path: process.env.LOCAL_PATH,
  sending_payload_callback: (instance, payloads) => {
    switch (payloads[0].data.origin.file.match(/webpack-internal:\/\/\/(?<type>sc_server|sc_client|app-client)\/\./).groups.type) {
      case "sc_server":
        payloads.push({ data: payloads[0].data, toArray: () => ({
          type: "label",
          content: { label: "RSC" },
          origin: payloads[0].data.origin
        }) });
        payloads.push({ data: payloads[0].data, toArray: () => ({
          type: "color",
          content: { color: "green" },
          origin: payloads[0].data.origin
        }) });
        break;
      case "sc_client":
        payloads.push({ data: payloads[0].data, toArray: () => ({
          type: "label",
          content: { label: "SSR" },
          origin: payloads[0].data.origin
        }) });
        payloads.push({ data: payloads[0].data, toArray: () => ({
          type: "color",
          content: { color: "orange" },
          origin: payloads[0].data.origin
        }) });
        break;
      case "app-client":
        payloads.push({ data: payloads[0].data, toArray: () => ({
          type: "label",
          content: { label: "Browser" },
          origin: payloads[0].data.origin
        }) });
        payloads.push({ data: payloads[0].data, toArray: () => ({
          type: "color",
          content: { color: "blue" },
          origin: payloads[0].data.origin
        }) });
        break;
    }
  }
});
var src_default = ray;

// src/client.tsx
import {useEffect, useLayoutEffect, useRef} from "react";

// node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1;i < arguments.length; i++) {
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

// node_modules/@radix-ui/react-slot/dist/index.module.js
import {forwardRef as $9IrjX$forwardRef, Children as $9IrjX$Children, isValidElement as $9IrjX$isValidElement, createElement as $9IrjX$createElement, cloneElement as $9IrjX$cloneElement, Fragment as $9IrjX$Fragment} from "react";

// node_modules/@radix-ui/react-compose-refs/dist/index.module.js
import {useCallback as $3vqmr$useCallback} from "react";
var $6ed0406888f73fc4$var$setRef = function(ref, value) {
  if (typeof ref === "function")
    ref(value);
  else if (ref !== null && ref !== undefined)
    ref.current = value;
};
var $6ed0406888f73fc4$export$43e446d32b3d21af = function(...refs) {
  return (node2) => refs.forEach((ref) => $6ed0406888f73fc4$var$setRef(ref, node2));
};

// node_modules/@radix-ui/react-slot/dist/index.module.js
var $5e63c961fc1ce211$var$isSlottable = function(child) {
  return $9IrjX$isValidElement(child) && child.type === $5e63c961fc1ce211$export$d9f1ccf0bdb05d45;
};
var $5e63c961fc1ce211$var$mergeProps = function(slotProps, childProps) {
  const overrideProps = {
    ...childProps
  };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue)
        overrideProps[propName] = (...args) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      else if (slotPropValue)
        overrideProps[propName] = slotPropValue;
    } else if (propName === "style")
      overrideProps[propName] = {
        ...slotPropValue,
        ...childPropValue
      };
    else if (propName === "className")
      overrideProps[propName] = [
        slotPropValue,
        childPropValue
      ].filter(Boolean).join(" ");
  }
  return {
    ...slotProps,
    ...overrideProps
  };
};
var $5e63c961fc1ce211$export$8c6ed5c666ac1360 = $9IrjX$forwardRef((props2, forwardedRef) => {
  const { children, ...slotProps } = props2;
  const childrenArray = $9IrjX$Children.toArray(children);
  const slottable = childrenArray.find($5e63c961fc1ce211$var$isSlottable);
  if (slottable) {
    const newElement = slottable.props.children;
    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        if ($9IrjX$Children.count(newElement) > 1)
          return $9IrjX$Children.only(null);
        return $9IrjX$isValidElement(newElement) ? newElement.props.children : null;
      } else
        return child;
    });
    return $9IrjX$createElement($5e63c961fc1ce211$var$SlotClone, _extends({}, slotProps, {
      ref: forwardedRef
    }), $9IrjX$isValidElement(newElement) ? $9IrjX$cloneElement(newElement, undefined, newChildren) : null);
  }
  return $9IrjX$createElement($5e63c961fc1ce211$var$SlotClone, _extends({}, slotProps, {
    ref: forwardedRef
  }), children);
});
$5e63c961fc1ce211$export$8c6ed5c666ac1360.displayName = "Slot";
var $5e63c961fc1ce211$var$SlotClone = $9IrjX$forwardRef((props2, forwardedRef) => {
  const { children, ...slotProps } = props2;
  if ($9IrjX$isValidElement(children))
    return $9IrjX$cloneElement(children, {
      ...$5e63c961fc1ce211$var$mergeProps(slotProps, children.props),
      ref: $6ed0406888f73fc4$export$43e446d32b3d21af(forwardedRef, children.ref)
    });
  return $9IrjX$Children.count(children) > 1 ? $9IrjX$Children.only(null) : null;
});
$5e63c961fc1ce211$var$SlotClone.displayName = "SlotClone";
var $5e63c961fc1ce211$export$d9f1ccf0bdb05d45 = ({ children }) => {
  return $9IrjX$createElement($9IrjX$Fragment, null, children);
};

// src/client.tsx
function useRay(value, options = { replace: true, type: "toJson" }) {
  const rayRef = useRef(src_default());
  useEffect(() => {
    if (options.replace !== true) {
      rayRef.current = src_default();
    }
    rayRef.current[options.type ?? "toJson"](value);
  }, [value]);
}
function useRayWithElement(ref, dependencies = [], options = { replace: true }) {
  const rayRef = useRef(src_default());
  useLayoutEffect(() => {
    if (!options.replace) {
      rayRef.current = src_default();
    }
    if (ref.current) {
      rayRef.current.html(ref.current.innerHTML);
    }
  }, dependencies);
}
function Ray2({ children, dependencies }) {
  const ref = useRef(null);
  useRayWithElement(ref, dependencies);
  return jsxDEV($5e63c961fc1ce211$export$8c6ed5c666ac1360, {
    ref,
    children
  }, undefined, false, undefined, this);
}
import {
jsxDEV
} from "react/jsx-dev-runtime";
var client_default = src_default;
export {
  useRayWithElement,
  useRay,
  client_default as default,
  Ray2 as Ray
};

//# debugId=8BF7053C70202D2664756e2164756e21
