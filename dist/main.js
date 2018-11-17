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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _texturepacker_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./texturepacker-parser */ "./src/texturepacker-parser.js");


var can = document.querySelector('canvas');
var ctx = can.getContext('2d');
var where = './assets/images/robowalk/';
var assets = [
    'robowalk00.png', 'robowalk01.png', 'robowalk02.png',
    'robowalk03.png', 'robowalk04.png', 'robowalk05.png',
    'robowalk06.png', 'robowalk07.png', 'robowalk08.png',
    'robowalk09.png', 'robowalk10.png', 'robowalk11.png',
    'robowalk12.png', 'robowalk13.png', 'robowalk14.png',
    'robowalk15.png', 'robowalk16.png', 'robowalk17.png',
    'robowalk18.png'
];
var images = [];
var frameRate = 1000 / 30;
var frameTime = 0;
var frame = 0;
var timestamp = 0, timeOfLastUpdate = 0, dt = 0;
var gritsEffectsTexturePack = new _texturepacker_parser__WEBPACK_IMPORTED_MODULE_0__["default"]();

function setFullscreenSizeForCanvas() {
    can.width = window.innerWidth;
    can.height = window.innerHeight;
}

function makeAlwaysCanvasFullscreen() {
    setFullscreenSizeForCanvas();
    window.addEventListener('resize', setFullscreenSizeForCanvas);
}

function loadImage(filename) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = err => reject(err);
        img.src = filename;
    });
}

function update() {
    frameTime += dt;
    if (frameTime > frameRate) {
        frame = (frame + 1) % images.length;
        frameTime = 0;
    }
}

function draw() {
    ctx.clearRect(0, 0, can.width, can.height);
    ctx.drawImage(images[frame], 50, 50);
}

async function main() {
    makeAlwaysCanvasFullscreen();

    var promises = [];
    for(var filename of assets) {
        promises.push(loadImage(where + filename));
    }
    images = await Promise.all(promises);

    await gritsEffectsTexturePack.loadAndParse("./assets/json/grits_effects.json");
    console.log('./assets/json/grits_effects.json parsed:');
    console.log(gritsEffectsTexturePack.sprites);
    console.log(gritsEffectsTexturePack.sprites[123]);

    // mainloop
    function go() {
        timestamp = performance.now();
        dt = timestamp - timeOfLastUpdate;
        timeOfLastUpdate = timestamp;
        update();
        draw();
        requestAnimationFrame(go);
    }
    timeOfLastUpdate = performance.now();
    requestAnimationFrame(go);
}

main();


/***/ }),

/***/ "./src/texturepacker-parser.js":
/*!*************************************!*\
  !*** ./src/texturepacker-parser.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TexturepackerParser; });

class TexturepackerParser {
    constructor() {
        this.sprites = [];
    }
    async loadAndParse(filename) {
        var res = await fetch(filename);
        this.parseAtlasDefinition(await res.json());
    }
    defSprite(name, x, y, w, h, cx, cy) {
        var spt = {
            id: name,
            x, y, w, h,
            cx: cx == null ? 0 : cx,
            cy: cy == null ? 0 : cy
        };
        this.sprites.push(spt);
    }
    parseAtlasDefinition(atlasJSON) {
        for (var name in atlasJSON.frames) {
            var sprite = atlasJSON.frames[name];
            var cx = -sprite.frame.w / 2;
            var cy = -sprite.frame.h / 2;
            this.defSprite(
                name,
                sprite.frame.x, sprite.frame.y,
                sprite.frame.w, sprite.frame.h,
                cx, cy
            );
        }
    }
}


/***/ })

/******/ });
//# sourceMappingURL=main.js.map