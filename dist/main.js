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

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! exports provided: canvas, context, setFullscreenSizeForCanvas, makeAlwaysCanvasFullscreen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvas", function() { return canvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "context", function() { return context; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFullscreenSizeForCanvas", function() { return setFullscreenSizeForCanvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeAlwaysCanvasFullscreen", function() { return makeAlwaysCanvasFullscreen; });

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

function setFullscreenSizeForCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function makeAlwaysCanvasFullscreen() {
    setFullscreenSizeForCanvas();
    window.addEventListener('resize', setFullscreenSizeForCanvas);
}


/***/ }),

/***/ "./src/images.js":
/*!***********************!*\
  !*** ./src/images.js ***!
  \***********************/
/*! exports provided: robowalkImages, images, loadImage, loadAllImages */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "robowalkImages", function() { return robowalkImages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "images", function() { return images; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadImage", function() { return loadImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadAllImages", function() { return loadAllImages; });

var robowalkWhere = './assets/images/robowalk/';
var robowalkAssets = [
    'robowalk00.png', 'robowalk01.png', 'robowalk02.png',
    'robowalk03.png', 'robowalk04.png', 'robowalk05.png',
    'robowalk06.png', 'robowalk07.png', 'robowalk08.png',
    'robowalk09.png', 'robowalk10.png', 'robowalk11.png',
    'robowalk12.png', 'robowalk13.png', 'robowalk14.png',
    'robowalk15.png', 'robowalk16.png', 'robowalk17.png',
    'robowalk18.png',
];

var imagesWhere = './assets/images/';
var imagesAssets = [
    "robowalk/robowalk00.png", "robowalk/robowalk01.png", "robowalk/robowalk02.png",
    "robowalk/robowalk03.png", "robowalk/robowalk04.png", "robowalk/robowalk05.png",
    "robowalk/robowalk06.png", "robowalk/robowalk07.png", "robowalk/robowalk08.png",
    "robowalk/robowalk09.png", "robowalk/robowalk10.png", "robowalk/robowalk11.png",
    "robowalk/robowalk12.png", "robowalk/robowalk13.png", "robowalk/robowalk14.png",
    "robowalk/robowalk15.png", "robowalk/robowalk16.png", "robowalk/robowalk17.png",
    "robowalk/robowalk18.png",
    'grits_effects.png',
    'grits_master.png',
    'ralphyrobot.png',
];

var robowalkImages = [];

var images = {};

function loadImage(filename) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = err => reject(err);
        img.src = filename;
    });
}

async function loadAllImages() {
    // Load robowalk images
    var promises = [];
    for (var filename of robowalkAssets) {
        promises.push(loadImage(robowalkWhere + filename));
    }
    robowalkImages = await Promise.all(promises);
    // Load other images
    promises = [];
    for (var filename of imagesAssets) {
        promises.push(loadImage(imagesWhere + filename));
    }
    var imagesArr = await Promise.all(promises);
    for (var i = 0; i < imagesAssets.length; i++) {
        images[imagesAssets[i]] = imagesArr[i];
    }
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _texturepacker_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./texturepacker-parser */ "./src/texturepacker-parser.js");
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas */ "./src/canvas.js");
/* harmony import */ var _images__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images */ "./src/images.js");




var frameRate = 1000 / 30;
var frameTime = 0;
var frame = 0;
var timestamp = 0, timeOfLastUpdate = 0, dt = 0;
var gritsEffectsTexturePack = new _texturepacker_parser__WEBPACK_IMPORTED_MODULE_0__["default"]();
var spriteSheets = {};

function update() {
    frameTime += dt;
    if (frameTime > frameRate) {
        frame = (frame + 1) % _images__WEBPACK_IMPORTED_MODULE_2__["robowalkImages"].length;
        frameTime = 0;
    }
}

function draw() {
    _canvas__WEBPACK_IMPORTED_MODULE_1__["context"].clearRect(0, 0, _canvas__WEBPACK_IMPORTED_MODULE_1__["canvas"].width, _canvas__WEBPACK_IMPORTED_MODULE_1__["canvas"].height);
    _canvas__WEBPACK_IMPORTED_MODULE_1__["context"].drawImage(_images__WEBPACK_IMPORTED_MODULE_2__["robowalkImages"][frame], 50, 50);
    drawSprite('walk_down_0000.png', 200, 50);
}

function drawSprite(spriteName, posX, posY) {
    for (var sheetName in spriteSheets) {
        var sheet = spriteSheets[sheetName];
        var sprite = sheet.getStats(spriteName);
        if (sprite == null) continue;
        __drawSpriteInternal(sprite, sheet, posX, posY);
    }
}

function __drawSpriteInternal(spt, sheet, posX, posY) {
    if (spt == null || sheet == null) return;
    var hlf = {
        x: spt.cx, y: spt.cy
    };
    _canvas__WEBPACK_IMPORTED_MODULE_1__["context"].drawImage(
        sheet.img,
        spt.x, spt.y, spt.w, spt.h,
        posX + hlf.x, posY + hlf.y, spt.w, spt.h
    );
}

async function main() {
    Object(_canvas__WEBPACK_IMPORTED_MODULE_1__["makeAlwaysCanvasFullscreen"])();
    await Object(_images__WEBPACK_IMPORTED_MODULE_2__["loadAllImages"])();

    spriteSheets['grits_effects'] = new _texturepacker_parser__WEBPACK_IMPORTED_MODULE_0__["default"]('./assets/json/grits_effects.json');
    await spriteSheets['grits_effects'].loadAndParse();

    console.log('./assets/json/grits_effects.json parsed:');
    console.log(spriteSheets['grits_effects']);
    console.log(spriteSheets['grits_effects'].sprites);
    console.log(spriteSheets['grits_effects'].sprites[123]);

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
/* harmony import */ var _images__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./images */ "./src/images.js");


class TexturepackerParser {
    constructor(filename) {
        this.filename = filename;
        this.sprites = [];
        this.atlasJSON = null;
        this.img = null;
    }
    getStats(name) {
        for(var sprite of this.sprites) {
            if (sprite.id == name) {
                return sprite;
            }
        }
        return null;
    }
    async loadAndParse(filename) {
        if (filename) {
            this.filename = filename;
        }
        var res = await fetch(this.filename);
        this.atlasJSON = await res.json();
        this.parseAtlasDefinition();
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
    parseAtlasDefinition() {
        this.img = _images__WEBPACK_IMPORTED_MODULE_0__["images"][this.atlasJSON.meta.image];
        for (var name in this.atlasJSON.frames) {
            var sprite = this.atlasJSON.frames[name];
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