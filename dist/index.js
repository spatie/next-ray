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
var _filtered = function(stackframes, filter) {
  if (typeof filter === "function") {
    return stackframes.filter(filter);
  }
  return stackframes;
};
var Mixin = function(...constructors) {
  var _a, _b, _c;
  const prototypes = constructors.map((constructor) => constructor.prototype);
  const initFunctionName = settings.initFunction;
  if (initFunctionName !== null) {
    const initFunctions = prototypes.map((proto) => proto[initFunctionName]).filter((func) => typeof func === "function");
    const combinedInitFunction = __name(function(...args) {
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
  __name(MixedClass, "MixedClass");
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
import {format} from "@permafrost-dev/pretty-format";
import * as dayjs from "dayjs";
import {v4 as uuidv4} from "uuid";
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
import formatXml from "xml-formatter";
import * as xmlfmt from "xml-formatter";
import axios from "axios";
import * as StopWatches from "stopwatch-node/dist/stopwatch";
import dayjs2 from "dayjs";
import * as md5lib from "md5";
var standaloneInitialization = function() {
  if (typeof globalThis["window"] !== "undefined") {
    window["Ray"] = {
      ray,
      Ray
    };
    window["rayInit"] = standalone;
  }
};
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var require_base64 = __commonJS({
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
var require_base64_vlq = __commonJS({
  "node_modules/source-map/lib/base64-vlq.js"(exports) {
    var base64 = require_base64();
    var VLQ_BASE_SHIFT = 5;
    var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
    var VLQ_BASE_MASK = VLQ_BASE - 1;
    var VLQ_CONTINUATION_BIT = VLQ_BASE;
    function toVLQSigned(aValue) {
      return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
    }
    __name(toVLQSigned, "toVLQSigned");
    function fromVLQSigned(aValue) {
      var isNegative = (aValue & 1) === 1;
      var shifted = aValue >> 1;
      return isNegative ? -shifted : shifted;
    }
    __name(fromVLQSigned, "fromVLQSigned");
    exports.encode = __name(function base64VLQ_encode(aValue) {
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
    exports.decode = __name(function base64VLQ_decode(aStr, aIndex, aOutParam) {
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
var require_util = __commonJS({
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
    __name(getArg, "getArg");
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
    __name(urlParse, "urlParse");
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
    __name(urlGenerate, "urlGenerate");
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
    __name(normalize, "normalize");
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
    __name(join, "join");
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
    __name(relative, "relative");
    exports.relative = relative;
    var supportsNullProto = function() {
      var obj = Object.create(null);
      return !("__proto__" in obj);
    }();
    function identity(s) {
      return s;
    }
    __name(identity, "identity");
    function toSetString(aStr) {
      if (isProtoString(aStr)) {
        return "$" + aStr;
      }
      return aStr;
    }
    __name(toSetString, "toSetString");
    exports.toSetString = supportsNullProto ? identity : toSetString;
    function fromSetString(aStr) {
      if (isProtoString(aStr)) {
        return aStr.slice(1);
      }
      return aStr;
    }
    __name(fromSetString, "fromSetString");
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
    __name(isProtoString, "isProtoString");
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
    __name(compareByOriginalPositions, "compareByOriginalPositions");
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
    __name(compareByGeneratedPositionsDeflated, "compareByGeneratedPositionsDeflated");
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
    __name(strcmp, "strcmp");
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
    __name(compareByGeneratedPositionsInflated, "compareByGeneratedPositionsInflated");
    exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
    function parseSourceMapInput(str) {
      return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
    }
    __name(parseSourceMapInput, "parseSourceMapInput");
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
    __name(computeSourceURL, "computeSourceURL");
    exports.computeSourceURL = computeSourceURL;
  }
});
var require_array_set = __commonJS({
  "node_modules/source-map/lib/array-set.js"(exports) {
    var util = require_util();
    var has = Object.prototype.hasOwnProperty;
    var hasNativeMap = typeof Map !== "undefined";
    function ArraySet() {
      this._array = [];
      this._set = hasNativeMap ? new Map : Object.create(null);
    }
    __name(ArraySet, "ArraySet");
    ArraySet.fromArray = __name(function ArraySet_fromArray(aArray, aAllowDuplicates) {
      var set = new ArraySet;
      for (var i = 0, len = aArray.length;i < len; i++) {
        set.add(aArray[i], aAllowDuplicates);
      }
      return set;
    }, "ArraySet_fromArray");
    ArraySet.prototype.size = __name(function ArraySet_size() {
      return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
    }, "ArraySet_size");
    ArraySet.prototype.add = __name(function ArraySet_add(aStr, aAllowDuplicates) {
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
    ArraySet.prototype.has = __name(function ArraySet_has(aStr) {
      if (hasNativeMap) {
        return this._set.has(aStr);
      } else {
        var sStr = util.toSetString(aStr);
        return has.call(this._set, sStr);
      }
    }, "ArraySet_has");
    ArraySet.prototype.indexOf = __name(function ArraySet_indexOf(aStr) {
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
    ArraySet.prototype.at = __name(function ArraySet_at(aIdx) {
      if (aIdx >= 0 && aIdx < this._array.length) {
        return this._array[aIdx];
      }
      throw new Error("No element indexed by " + aIdx);
    }, "ArraySet_at");
    ArraySet.prototype.toArray = __name(function ArraySet_toArray() {
      return this._array.slice();
    }, "ArraySet_toArray");
    exports.ArraySet = ArraySet;
  }
});
var require_mapping_list = __commonJS({
  "node_modules/source-map/lib/mapping-list.js"(exports) {
    var util = require_util();
    function generatedPositionAfter(mappingA, mappingB) {
      var lineA = mappingA.generatedLine;
      var lineB = mappingB.generatedLine;
      var columnA = mappingA.generatedColumn;
      var columnB = mappingB.generatedColumn;
      return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
    }
    __name(generatedPositionAfter, "generatedPositionAfter");
    function MappingList() {
      this._array = [];
      this._sorted = true;
      this._last = { generatedLine: -1, generatedColumn: 0 };
    }
    __name(MappingList, "MappingList");
    MappingList.prototype.unsortedForEach = __name(function MappingList_forEach(aCallback, aThisArg) {
      this._array.forEach(aCallback, aThisArg);
    }, "MappingList_forEach");
    MappingList.prototype.add = __name(function MappingList_add(aMapping) {
      if (generatedPositionAfter(this._last, aMapping)) {
        this._last = aMapping;
        this._array.push(aMapping);
      } else {
        this._sorted = false;
        this._array.push(aMapping);
      }
    }, "MappingList_add");
    MappingList.prototype.toArray = __name(function MappingList_toArray() {
      if (!this._sorted) {
        this._array.sort(util.compareByGeneratedPositionsInflated);
        this._sorted = true;
      }
      return this._array;
    }, "MappingList_toArray");
    exports.MappingList = MappingList;
  }
});
var require_source_map_generator = __commonJS({
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
    __name(SourceMapGenerator, "SourceMapGenerator");
    SourceMapGenerator.prototype._version = 3;
    SourceMapGenerator.fromSourceMap = __name(function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
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
    SourceMapGenerator.prototype.addMapping = __name(function SourceMapGenerator_addMapping(aArgs) {
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
    SourceMapGenerator.prototype.setSourceContent = __name(function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
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
    SourceMapGenerator.prototype.applySourceMap = __name(function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
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
    SourceMapGenerator.prototype._validateMapping = __name(function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
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
    SourceMapGenerator.prototype._serializeMappings = __name(function SourceMapGenerator_serializeMappings() {
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
    SourceMapGenerator.prototype._generateSourcesContent = __name(function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
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
    SourceMapGenerator.prototype.toJSON = __name(function SourceMapGenerator_toJSON() {
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
    SourceMapGenerator.prototype.toString = __name(function SourceMapGenerator_toString() {
      return JSON.stringify(this.toJSON());
    }, "SourceMapGenerator_toString");
    exports.SourceMapGenerator = SourceMapGenerator;
  }
});
var require_binary_search = __commonJS({
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
    __name(recursiveSearch, "recursiveSearch");
    exports.search = __name(function search(aNeedle, aHaystack, aCompare, aBias) {
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
var require_quick_sort = __commonJS({
  "node_modules/source-map/lib/quick-sort.js"(exports) {
    function swap(ary, x, y) {
      var temp = ary[x];
      ary[x] = ary[y];
      ary[y] = temp;
    }
    __name(swap, "swap");
    function randomIntInRange(low, high) {
      return Math.round(low + Math.random() * (high - low));
    }
    __name(randomIntInRange, "randomIntInRange");
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
    __name(doQuickSort, "doQuickSort");
    exports.quickSort = function(ary, comparator) {
      doQuickSort(ary, comparator, 0, ary.length - 1);
    };
  }
});
var require_source_map_consumer = __commonJS({
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
    __name(SourceMapConsumer3, "SourceMapConsumer");
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
    SourceMapConsumer3.prototype._charIsMappingSeparator = __name(function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
      var c = aStr.charAt(index);
      return c === ";" || c === ",";
    }, "SourceMapConsumer_charIsMappingSeparator");
    SourceMapConsumer3.prototype._parseMappings = __name(function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      throw new Error("Subclasses must implement _parseMappings");
    }, "SourceMapConsumer_parseMappings");
    SourceMapConsumer3.GENERATED_ORDER = 1;
    SourceMapConsumer3.ORIGINAL_ORDER = 2;
    SourceMapConsumer3.GREATEST_LOWER_BOUND = 1;
    SourceMapConsumer3.LEAST_UPPER_BOUND = 2;
    SourceMapConsumer3.prototype.eachMapping = __name(function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
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
    SourceMapConsumer3.prototype.allGeneratedPositionsFor = __name(function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
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
    __name(BasicSourceMapConsumer, "BasicSourceMapConsumer");
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
    BasicSourceMapConsumer.fromSourceMap = __name(function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
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
    __name(Mapping, "Mapping");
    BasicSourceMapConsumer.prototype._parseMappings = __name(function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
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
    BasicSourceMapConsumer.prototype._findMapping = __name(function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
      if (aNeedle[aLineName] <= 0) {
        throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
      }
      return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
    }, "SourceMapConsumer_findMapping");
    BasicSourceMapConsumer.prototype.computeColumnSpans = __name(function SourceMapConsumer_computeColumnSpans() {
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
    BasicSourceMapConsumer.prototype.originalPositionFor = __name(function SourceMapConsumer_originalPositionFor(aArgs) {
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
    BasicSourceMapConsumer.prototype.hasContentsOfAllSources = __name(function BasicSourceMapConsumer_hasContentsOfAllSources() {
      if (!this.sourcesContent) {
        return false;
      }
      return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
        return sc == null;
      });
    }, "BasicSourceMapConsumer_hasContentsOfAllSources");
    BasicSourceMapConsumer.prototype.sourceContentFor = __name(function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
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
    BasicSourceMapConsumer.prototype.generatedPositionFor = __name(function SourceMapConsumer_generatedPositionFor(aArgs) {
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
    __name(IndexedSourceMapConsumer, "IndexedSourceMapConsumer");
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
    IndexedSourceMapConsumer.prototype.originalPositionFor = __name(function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
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
    IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = __name(function IndexedSourceMapConsumer_hasContentsOfAllSources() {
      return this._sections.every(function(s) {
        return s.consumer.hasContentsOfAllSources();
      });
    }, "IndexedSourceMapConsumer_hasContentsOfAllSources");
    IndexedSourceMapConsumer.prototype.sourceContentFor = __name(function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
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
    IndexedSourceMapConsumer.prototype.generatedPositionFor = __name(function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
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
    IndexedSourceMapConsumer.prototype._parseMappings = __name(function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
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
var require_source_node = __commonJS({
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
    __name(SourceNode, "SourceNode");
    SourceNode.fromStringWithSourceMap = __name(function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
      var node = new SourceNode;
      var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
      var remainingLinesIndex = 0;
      var shiftNextLine = __name(function() {
        var lineContents = getNextLine();
        var newLine = getNextLine() || "";
        return lineContents + newLine;
        function getNextLine() {
          return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : undefined;
        }
        __name(getNextLine, "getNextLine");
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
          node.add(shiftNextLine());
          lastGeneratedLine++;
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
          var nextLine = remainingLines[remainingLinesIndex] || "";
          node.add(nextLine.substr(0, mapping.generatedColumn));
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
        }
        lastMapping = mapping;
      }, this);
      if (remainingLinesIndex < remainingLines.length) {
        if (lastMapping) {
          addMappingWithCode(lastMapping, shiftNextLine());
        }
        node.add(remainingLines.splice(remainingLinesIndex).join(""));
      }
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
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
          var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
          node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
        }
      }
      __name(addMappingWithCode, "addMappingWithCode");
    }, "SourceNode_fromStringWithSourceMap");
    SourceNode.prototype.add = __name(function SourceNode_add(aChunk) {
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
    SourceNode.prototype.prepend = __name(function SourceNode_prepend(aChunk) {
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
    SourceNode.prototype.walk = __name(function SourceNode_walk(aFn) {
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
    SourceNode.prototype.join = __name(function SourceNode_join(aSep) {
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
    SourceNode.prototype.replaceRight = __name(function SourceNode_replaceRight(aPattern, aReplacement) {
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
    SourceNode.prototype.setSourceContent = __name(function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
    }, "SourceNode_setSourceContent");
    SourceNode.prototype.walkSourceContents = __name(function SourceNode_walkSourceContents(aFn) {
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
    SourceNode.prototype.toString = __name(function SourceNode_toString() {
      var str = "";
      this.walk(function(chunk) {
        str += chunk;
      });
      return str;
    }, "SourceNode_toString");
    SourceNode.prototype.toStringWithSourceMap = __name(function SourceNode_toStringWithSourceMap(aArgs) {
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
var require_source_map = __commonJS({
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
__name(RayScreenColors, "RayScreenColors");
__name(_capitalize, "_capitalize");
__name(_getter, "_getter");
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
__name(StackFrame, "StackFrame");
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
__name(ErrorStackParser, "ErrorStackParser");
var ErrorStackParser_default = ErrorStackParser;
var StackGenerator = {
  backtrace: __name(function StackGenerator$$backtrace(opts) {
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
var SourceMapConsumer = __toESM(require_source_map());
__name(_xdr, "_xdr");
__name(getWindow, "getWindow");
__name(_atob, "_atob");
__name(_parseJson, "_parseJson");
__name(_findFunctionName, "_findFunctionName");
__name(_ensureSupportedEnvironment, "_ensureSupportedEnvironment");
__name(_ensureStackFrameIsLegit, "_ensureStackFrameIsLegit");
__name(_findSourceMappingURL, "_findSourceMappingURL");
__name(_extractLocationInfoFromSourceMapSource, "_extractLocationInfoFromSourceMapSource");
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
__name(StackTraceGPS, "StackTraceGPS");
var StackTraceGps_default = StackTraceGPS;
var _options = {
  filter: function(stackframe) {
    return (stackframe.functionName || "").indexOf("StackTrace$$") === -1 && (stackframe.functionName || "").indexOf("ErrorStackParser$$") === -1 && (stackframe.functionName || "").indexOf("StackTraceGPS$$") === -1 && (stackframe.functionName || "").indexOf("StackGenerator$$") === -1;
  },
  sourceCache: {}
};
__name(_generateError, "_generateError");
__name(_merge, "_merge");
__name(_isShapedLikeParsableError, "_isShapedLikeParsableError");
__name(_filtered, "_filtered");
var StackTrace = {
  StackFrame: typeof stackframe_default,
  get: __name(function StackTrace$$get(opts) {
    const err = _generateError();
    return _isShapedLikeParsableError(err) ? this.fromError(err, opts) : this.generateArtificially(opts);
  }, "StackTrace$$get"),
  getSync: __name(function StackTrace$$getSync(opts) {
    opts = _merge(_options, opts);
    const err = _generateError();
    const stack = _isShapedLikeParsableError(err) ? ErrorStackParser_default.parse(err) : StackGenerator_default.backtrace(opts);
    return _filtered(stack, opts.filter);
  }, "StackTrace$$getSync"),
  fromError: __name(function StackTrace$$fromError(error, opts) {
    opts = _merge(_options, opts);
    const gps = new StackTraceGps_default(opts);
    return new Promise(function(resolve) {
      const stackframes = _filtered(ErrorStackParser_default.parse(error), opts.filter);
      resolve(Promise.all(stackframes.map(function(sf) {
        return new Promise(function(resolve2) {
          function resolveOriginal() {
            resolve2(sf);
          }
          __name(resolveOriginal, "resolveOriginal");
          gps.pinpoint(sf).then(resolve2, resolveOriginal)["catch"](resolveOriginal);
        });
      })));
    }.bind(this));
  }, "StackTrace$$fromError"),
  generateArtificially: __name(function StackTrace$$generateArtificially(opts) {
    opts = _merge(_options, opts);
    let stackFrames = StackGenerator_default.backtrace(opts);
    if (typeof opts.filter === "function") {
      stackFrames = stackFrames.filter(opts.filter);
    }
    return Promise.resolve(stackFrames);
  }, "StackTrace$$generateArtificially")
};
var copyProps = __name((dest, src, exclude = []) => {
  const props2 = Object.getOwnPropertyDescriptors(src);
  for (let prop of exclude)
    delete props2[prop];
  Object.defineProperties(dest, props2);
}, "copyProps");
var protoChain = __name((obj, currentChain = [obj]) => {
  const proto = Object.getPrototypeOf(obj);
  if (proto === null)
    return currentChain;
  return protoChain(proto, [...currentChain, proto]);
}, "protoChain");
var nearestCommonProto = __name((...objs) => {
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
var hardMixProtos = __name((ingredients, constructor, exclude = []) => {
  var _a;
  const base = (_a = nearestCommonProto(...ingredients)) !== null && _a !== undefined ? _a : Object.prototype;
  const mixedProto = Object.create(base);
  const visitedProtos = protoChain(base);
  for (let prototype of ingredients) {
    let protos = protoChain(prototype);
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
var unique = __name((arr) => arr.filter((e, i) => arr.indexOf(e) == i), "unique");
var getIngredientWithProp = __name((prop, ingredients) => {
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
var proxyMix = __name((ingredients, prototype = Object.prototype) => new Proxy({}, {
  getPrototypeOf() {
    return prototype;
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
    return getIngredientWithProp(prop, ingredients) !== undefined || prototype[prop] !== undefined;
  },
  get(_, prop) {
    return (getIngredientWithProp(prop, ingredients) || prototype)[prop];
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
var softMixProtos = __name((ingredients, constructor) => proxyMix([...ingredients, { constructor }]), "softMixProtos");
var settings = {
  initFunction: null,
  staticsStrategy: "copy",
  prototypeStrategy: "copy",
  decoratorInheritance: "deep"
};
var mixins = new Map;
var getMixinsForClass = __name((clazz) => mixins.get(clazz), "getMixinsForClass");
var registerMixins = __name((mixedClass, constituents) => mixins.set(mixedClass, constituents), "registerMixins");
var mergeObjectsOfDecorators = __name((o1, o2) => {
  var _a, _b;
  const allKeys = unique([...Object.getOwnPropertyNames(o1), ...Object.getOwnPropertyNames(o2)]);
  const mergedObject = {};
  for (let key of allKeys)
    mergedObject[key] = unique([...(_a = o1 === null || o1 === undefined ? undefined : o1[key]) !== null && _a !== undefined ? _a : [], ...(_b = o2 === null || o2 === undefined ? undefined : o2[key]) !== null && _b !== undefined ? _b : []]);
  return mergedObject;
}, "mergeObjectsOfDecorators");
var mergePropertyAndMethodDecorators = __name((d1, d2) => {
  var _a, _b, _c, _d;
  return {
    property: mergeObjectsOfDecorators((_a = d1 === null || d1 === undefined ? undefined : d1.property) !== null && _a !== undefined ? _a : {}, (_b = d2 === null || d2 === undefined ? undefined : d2.property) !== null && _b !== undefined ? _b : {}),
    method: mergeObjectsOfDecorators((_c = d1 === null || d1 === undefined ? undefined : d1.method) !== null && _c !== undefined ? _c : {}, (_d = d2 === null || d2 === undefined ? undefined : d2.method) !== null && _d !== undefined ? _d : {})
  };
}, "mergePropertyAndMethodDecorators");
var mergeDecorators = __name((d1, d2) => {
  var _a, _b, _c, _d, _e, _f;
  return {
    class: unique([...(_a = d1 === null || d1 === undefined ? undefined : d1.class) !== null && _a !== undefined ? _a : [], ...(_b = d2 === null || d2 === undefined ? undefined : d2.class) !== null && _b !== undefined ? _b : []]),
    static: mergePropertyAndMethodDecorators((_c = d1 === null || d1 === undefined ? undefined : d1.static) !== null && _c !== undefined ? _c : {}, (_d = d2 === null || d2 === undefined ? undefined : d2.static) !== null && _d !== undefined ? _d : {}),
    instance: mergePropertyAndMethodDecorators((_e = d1 === null || d1 === undefined ? undefined : d1.instance) !== null && _e !== undefined ? _e : {}, (_f = d2 === null || d2 === undefined ? undefined : d2.instance) !== null && _f !== undefined ? _f : {})
  };
}, "mergeDecorators");
var decorators = new Map;
var findAllConstituentClasses = __name((...classes) => {
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
var deepDecoratorSearch = __name((...classes) => {
  const decoratorsForClassChain = findAllConstituentClasses(...classes).map((clazz) => decorators.get(clazz)).filter((decorators2) => !!decorators2);
  if (decoratorsForClassChain.length == 0)
    return {};
  if (decoratorsForClassChain.length == 1)
    return decoratorsForClassChain[0];
  return decoratorsForClassChain.reduce((d1, d2) => mergeDecorators(d1, d2));
}, "deepDecoratorSearch");
var directDecoratorSearch = __name((...classes) => {
  const classDecorators = classes.map((clazz) => getDecoratorsForClass(clazz));
  if (classDecorators.length === 0)
    return {};
  if (classDecorators.length === 1)
    return classDecorators[0];
  return classDecorators.reduce((d1, d2) => mergeDecorators(d1, d2));
}, "directDecoratorSearch");
var getDecoratorsForClass = __name((clazz) => {
  let decoratorsForClass = decorators.get(clazz);
  if (!decoratorsForClass) {
    decoratorsForClass = {};
    decorators.set(clazz, decoratorsForClass);
  }
  return decoratorsForClass;
}, "getDecoratorsForClass");
__name(Mixin, "Mixin");
var applyPropAndMethodDecorators = __name((propAndMethodDecorators, target) => {
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
__name(RayColors, "RayColors");
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
__name(RaySizes, "RaySizes");
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
__name(RemovesRayFrames, "RemovesRayFrames");
var consoleLog = console.log.bind({});
var consoleWrapper = __name((...args) => {
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
__name(ConsoleInterceptor, "ConsoleInterceptor");
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
__name(Hostname, "Hostname");
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
__name(ArgumentConverter, "ArgumentConverter");
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
__name(Payload, "Payload");
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
__name(BoolPayload, "BoolPayload");
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
__name(HtmlPayload, "HtmlPayload");
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
__name(LogPayload, "LogPayload");
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
__name(NullPayload, "NullPayload");
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
__name(PayloadFactory, "PayloadFactory");
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
__name(CallerPayload, "CallerPayload");
var ClearAllPayload = class extends Payload {
  getType() {
    return "clear_all";
  }
};
__name(ClearAllPayload, "ClearAllPayload");
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
__name(ColorPayload, "ColorPayload");
var ConfettiPayload = class extends Payload {
  getType() {
    return "confetti";
  }
};
__name(ConfettiPayload, "ConfettiPayload");
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
__name(CreateLockPayload, "CreateLockPayload");
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
__name(CustomPayload, "CustomPayload");
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
__name(DatePayload, "DatePayload");
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
__name(DecodedJsonPayload, "DecodedJsonPayload");
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
__name(ErrorPayload, "ErrorPayload");
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
__name(EventPayload, "EventPayload");
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
__name(ExceptionPayload, "ExceptionPayload");
var HideAppPayload = class extends Payload {
  getType() {
    return "hide_app";
  }
};
__name(HideAppPayload, "HideAppPayload");
var HidePayload = class extends Payload {
  getType() {
    return "hide";
  }
};
__name(HidePayload, "HidePayload");
__name(randomInteger, "randomInteger");
var sleep = __name((seconds) => {
  return usleep(seconds * 1000);
}, "sleep");
var usleep = __name((milliseconds) => {
  const start = (new Date()).getTime();
  while ((new Date()).getTime() < start + milliseconds) {
  }
}, "usleep");
var encodeHtmlEntities = __name((str) => {
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
var spacesToHtmlSpaces = __name((spaces) => {
  return "&nbsp;".repeat(spaces.length);
}, "spacesToHtmlSpaces");
var encodeNewLinesToHtml = __name((str) => {
  return str.replace(/(\r\n|\r|\n)/g, "<br>");
}, "encodeNewLinesToHtml");
var formatHtmlForDisplay = __name((html, options = { encodeEntities: true }) => {
  if (options.encodeEntities) {
    html = encodeHtmlEntities(html);
  }
  return encodeNewLinesToHtml(html.replace(/^(\s+)/gm, (m) => `${spacesToHtmlSpaces(m)}`));
}, "formatHtmlForDisplay");
var nonCryptoUuidV4 = __name(() => {
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
  return uuidv4(v4options).toString();
}, "nonCryptoUuidV4");
var end = __name((arr) => arr.length ? arr[arr.length - 1] : false, "end");
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
    return formatXml(markup.toString(), {
      indentation: "    ",
      collapseContent: true,
      lineSeparator: "\n"
    });
  }
  highlightHtmlMarkup(markup) {
    return markup.replace(/&quot;/g, '"').replace(/="([^"]+)"/g, `=<span style='color:#16A34A;'>&quot;\$1&quot;</span>`).replace(/(&lt;[A-Za-z\d-]+)(\s|&nbsp;|&gt;)/g, '<span style="color:#1D4ED8;">$1</span>$2').replace(/(&lt;\/[A-Za-z\d-]+)(&gt;)/g, '<span style="color:#1D4ED8;">$1$2</span>');
  }
};
__name(HtmlMarkupPayload, "HtmlMarkupPayload");
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
__name(ImagePayload, "ImagePayload");
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
__name(JsonStringPayload, "JsonStringPayload");
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
__name(LabelPayload, "LabelPayload");
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
__name(MeasurePayload, "MeasurePayload");
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
__name(NewScreenPayload, "NewScreenPayload");
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
__name(NotifyPayload, "NotifyPayload");
var RemovePayload = class extends Payload {
  getType() {
    return "remove";
  }
};
__name(RemovePayload, "RemovePayload");
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
__name(ScreenColorPayload, "ScreenColorPayload");
var SeparatorPayload = class extends Payload {
  getType() {
    return "separator";
  }
};
__name(SeparatorPayload, "SeparatorPayload");
var ShowAppPayload = class extends Payload {
  getType() {
    return "show_app";
  }
};
__name(ShowAppPayload, "ShowAppPayload");
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
__name(SizePayload, "SizePayload");
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
__name(TablePayload, "TablePayload");
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
__name(TextPayload, "TextPayload");
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
__name(TracePayload, "TracePayload");
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
__name(XmlPayload, "XmlPayload");
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
__name(Request, "Request");
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
      await axios.get(this.getUrlForPath("/locks/__availabilty_check"), {});
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
      await axios.post(this.getUrlForPath("/"), request.toArray(), { withCredentials: false });
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
        resp = await axios.get(this.getUrlForPath(`/locks/${lockName}`));
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
__name(Client, "Client");
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
__name(Settings, "Settings");
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
__name(StopwatchEvent2, "StopwatchEvent");
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
__name(Stopwatch2, "Stopwatch");
var Counters = class {
  constructor() {
    this.counters = {};
  }
  increment(name) {
    if (typeof this.counters[name] === "undefined") {
      this.counters[name] = [ray(), 0];
    }
    const data = this.counters[name];
    const ray2 = data[0];
    const times = data[1];
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
__name(Counters, "Counters");
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
__name(Limiters, "Limiters");
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
__name(CacheStore, "CacheStore");
var Clock2 = class {
};
__name(Clock2, "Clock");
var DateImmutable3 = class {
  get date() {
    return dayjs2(this.dateStr).toDate();
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
    let tempDate = dayjs2(this.getTimestamp() * 1000);
    parts.forEach((part) => {
      tempDate = tempDate.add(part.value * 1000);
    });
    return DateImmutable3.createFrom(tempDate.toDate());
  }
};
__name(DateImmutable3, "DateImmutable");
var SystemClock = class extends Clock2 {
  now() {
    return new DateImmutable3;
  }
};
__name(SystemClock, "SystemClock");
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
__name(RateLimiter, "RateLimiter");
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
  event(eventName, data = []) {
    const payload = new EventPayload(eventName, data);
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
__name(Ray, "Ray");
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
var ray = __name((...args) => {
  return Ray.create().send(...args);
}, "ray");
var standalone = __name((windowObject) => {
  if (typeof windowObject !== "undefined") {
    windowObject["ray"] = ray;
    windowObject["Ray"] = Ray;
  }
}, "standalone");
__name(standaloneInitialization, "standaloneInitialization");

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
export {
  src_default as default
};

//# debugId=227E7B5B6B8765CD64756e2164756e21
