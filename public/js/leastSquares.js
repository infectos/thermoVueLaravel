/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/leastSquares.js":
/*!**************************************!*\
  !*** ./resources/js/leastSquares.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function LeastSquares(X, Y) {
  var ret = {};
  var sumX = 0;
  var sumY = 0;
  var sumXY = 0;
  var sumXSq = 0;
  var N = X.length;

  for (var i = 0; i < N; ++i) {
    sumX += X[i];
    sumY += Y[i];
    sumXY += X[i] * Y[i];
    sumXSq += X[i] * X[i];
  }

  ret.m = (sumXY - sumX * sumY / N) / (sumXSq - sumX * sumX / N);
  ret.b = sumY / N - ret.m * sumX / N;

  if (true) {
    var varSum = 0;

    for (var j = 0; j < N; ++j) {
      varSum += (Y[j] - ret.b - ret.m * X[j]) * (Y[j] - ret.b - ret.m * X[j]);
    }

    var delta = N * sumXSq - sumX * sumX;
    var vari = 1.0 / (N - 2.0) * varSum;
    ret.bErr = Math.sqrt(vari / delta * sumXSq);
    ret.mErr = Math.sqrt(N / delta * vari);
  }

  ret.calculate = function (x) {
    return this.m * x + this.b;
  };

  ret.toString = function () {
    return "y=".concat(this.m.toFixed(2), "*x+").concat(this.b.toFixed(2));
  };

  return ret;
}

/***/ }),

/***/ 1:
/*!********************************************!*\
  !*** multi ./resources/js/leastSquares.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/infectos/Projects/php/thermo/resources/js/leastSquares.js */"./resources/js/leastSquares.js");


/***/ })

/******/ });