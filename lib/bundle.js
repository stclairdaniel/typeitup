/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _menu = __webpack_require__(1);
	
	var _menu2 = _interopRequireDefault(_menu);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
	  var menu = new _menu2.default();
	  menu.start();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _game2 = __webpack_require__(2);
	
	var _game3 = _interopRequireDefault(_game2);
	
	var _song2 = __webpack_require__(3);
	
	var _song3 = _interopRequireDefault(_song2);
	
	var _text = __webpack_require__(5);
	
	var _text2 = _interopRequireDefault(_text);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Menu = function () {
	  function Menu() {
	    _classCallCheck(this, Menu);
	
	    this.canvas = document.getElementById("game-canvas");
	    this.ctx = this.canvas.getContext("2d");
	    this.selected = 0;
	    this.keypress = this.keypress.bind(this);
	  }
	
	  _createClass(Menu, [{
	    key: 'keypress',
	    value: function keypress(e) {
	      if (e.key === "ArrowDown") {
	        this.selected += 1;
	        this.selected = this.selected % 3;
	      }
	      if (e.key === "ArrowUp") {
	        this.selected -= 1;
	        if (this.selected === -1) {
	          this.selected = 2;
	        }
	      }
	      if (e.key === "Enter") {
	        window.clearInterval(this.drawMenu);
	        this.playSong();
	      }
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      var _this = this;
	
	      // move up and down through menu. Enter starts a song and clears menu draw
	      document.addEventListener("keydown", this.keypress, false);
	
	      // begin drawing menu
	      this.drawMenu = window.setInterval(function () {
	        _this.draw();
	      }, 20);
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      var _this2 = this;
	
	      var baseImage = new Image();
	      baseImage.onload = function () {
	        _this2.ctx.clearRect(0, 0, _this2.canvas.width, _this2.canvas.height);
	        _this2.ctx.drawImage(baseImage, 0, 0);
	        _this2.ctx.font = "48px 'Anton'";
	        _this2.ctx.fillStyle = "black";
	        _this2.ctx.fillText("Type It Up!", 100, 70);
	        _this2.ctx.font = "32px 'Anton'";
	        _this2.ctx.fillText("Select Difficulty:", 100, 100);
	        if (_this2.selected === 0) {
	          _this2.ctx.fillStyle = "white";
	        } else {
	          _this2.ctx.fillStyle = "black";
	        }
	        _this2.ctx.fillText("Easy (24 WPM)", 100, 150);
	        if (_this2.selected === 1) {
	          _this2.ctx.fillStyle = "white";
	        } else {
	          _this2.ctx.fillStyle = "black";
	        }
	        _this2.ctx.fillText("Medium", 100, 200);
	        if (_this2.selected === 2) {
	          _this2.ctx.fillStyle = "white";
	        } else {
	          _this2.ctx.fillStyle = "black";
	        }
	        _this2.ctx.fillText("Hard", 100, 250);
	        _this2.ctx.fillStyle = "black";
	        _this2.ctx.fillText("How to Play:", 300, 400);
	        _this2.ctx.fillText("Type the letters you see to the beat!", 300, 450);
	        _this2.ctx.fillText("Don't forget the spacebar", 300, 500);
	      };
	      baseImage.src = 'assets/background.jpg';
	    }
	  }, {
	    key: 'playSong',
	    value: function playSong() {
	      document.removeEventListener("keydown", this.keypress, false);
	      var text = _text2.default[Math.floor(Math.random() * (_text2.default.length - 1))];
	      // const text = "I had seen little of Holmes lately. My marriage had drifted us away from each other. My own complete happiness, and the home-centred interests which rise up around the man who first finds himself master of his own establishment, were sufficient to absorb all my attention, while Holmes, who loathed every form of society with his whole Bohemian soul, remained in our lodgings in Baker Street, buried among his old books, and alternating from week to week between cocaine and ambition, the drowsiness of the drug, and the fierce energy of his own keen nature."
	
	      if (this.selected === 0) {
	        var song = new _song3.default('assets/test.mp3', 95, 120, 3185, 100, text, 8, 144);
	        var game = new _game3.default(song);
	        game.start();
	      }
	      if (this.selected === 1) {
	        var _song = new _song3.default('assets/short.mp3', 8, 120, 3325, 100, text, 7, 144);
	        var _game = new _game3.default(_song);
	        _game.start();
	      }
	    }
	  }]);
	
	  return Menu;
	}();
	
	exports.default = Menu;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _song = __webpack_require__(3);
	
	var _song2 = _interopRequireDefault(_song);
	
	var _gameover = __webpack_require__(4);
	
	var _gameover2 = _interopRequireDefault(_gameover);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game(song) {
	    _classCallCheck(this, Game);
	
	    this.canvas = document.getElementById("game-canvas");
	    this.ctx = this.canvas.getContext("2d");
	    this.tCanvas = document.getElementById("text-canvas");
	    this.tCtx = this.tCanvas.getContext("2d");
	    this.sCanvas = document.getElementById("score-canvas");
	    this.sCtx = this.sCanvas.getContext("2d");
	    this.song = song;
	    this.letters = song.letters;
	    this.checkHit = this.checkHit.bind(this);
	    this.score = 0;
	    this.life = 1;
	  }
	
	  _createClass(Game, [{
	    key: 'startSong',
	    value: function startSong() {
	      var body = document.querySelector('body');
	      var audio = document.createElement('audio');
	      audio.src = '' + this.song.path;
	      audio.controls = true;
	      audio.autoplay = true;
	      body.appendChild(audio);
	    }
	  }, {
	    key: 'checkScore',
	    value: function checkScore() {
	      var _this = this;
	
	      document.addEventListener("keypress", this.checkHit, false);
	      this.checkMissInterval = window.setInterval(function () {
	        _this.checkMiss();
	      }, this.song.secondsPerBeat * 1000);
	    }
	  }, {
	    key: 'checkHit',
	    value: function checkHit(e) {
	      var audio = document.querySelector('audio');
	      var time = audio.currentTime;
	      var beatOffset = this.song.offset / this.song.hSpace;
	      var timeOffset = beatOffset / (this.song.bpm / 60);
	      var i = (time - timeOffset) / this.song.secondsPerBeat;
	      if (this.song.letters[Math.floor(i) - this.song.nudge] === e.key) {
	        this.sCtx.clearRect(0, 0, this.sCanvas.width, this.sCanvas.height);
	        this.sCtx.font = "48px 'Anton'";
	        this.sCtx.fillStyle = "darkgreen";
	        this.sCtx.fillText("PERFECT!", 125, 175);
	        this.letters[Math.floor(i) - this.song.nudge] = "@";
	        this.score += 100;
	        if (this.life < 1) {
	          this.life += 0.01;
	        }
	      }
	    }
	  }, {
	    key: 'checkMiss',
	    value: function checkMiss() {
	      var audio = document.querySelector('audio');
	      var time = audio.currentTime;
	      var beatOffset = this.song.offset / this.song.hSpace;
	      var timeOffset = beatOffset / (this.song.bpm / 60);
	      var i = (time - timeOffset) / this.song.secondsPerBeat;
	      if (this.letters[Math.floor(i) - 1 - this.song.nudge] !== "@" && Math.floor(i) - 1 - this.song.nudge > 0 && Math.floor(i) <= this.song.letters.length) {
	        this.sCtx.clearRect(0, 0, this.sCanvas.width, this.sCanvas.height);
	        this.sCtx.font = "48px 'Anton'";
	        this.sCtx.fillStyle = "red";
	        this.sCtx.fillText("MISS", 125, 175);
	        if (this.life > 0.05) {
	          this.life -= 0.05;
	        } else {
	          this.gameover("failed", this.song, this.score);
	        }
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      var _this2 = this;
	
	      var baseImage = new Image();
	      baseImage.onload = function () {
	        _this2.ctx.drawImage(baseImage, 0, 0);
	        _this2.ctx.fillStyle = "darkgreen";
	        _this2.ctx.fillRect(100, 250, 2, 100);
	        _this2.ctx.fillRect(150, 250, 2, 100);
	        _this2.song.drawText();
	        _this2.ctx.fillStyle = "black";
	        _this2.ctx.font = "32px 'Anton'";
	        _this2.ctx.fillText('Score: ' + _this2.score, 700, 100);
	        _this2.ctx.fillStyle = "green";
	        _this2.ctx.fillRect(300, 75, _this2.life * 325, 25);
	        _this2.ctx.fillStyle = "red";
	        _this2.ctx.fillRect(300 + _this2.life * 325, 75, (1 - _this2.life) * 325, 25);
	      };
	      baseImage.src = 'assets/background.jpg';
	    }
	  }, {
	    key: 'gameover',
	    value: function gameover(failStatus, song, score) {
	      window.clearInterval(this.goToMenu);
	      window.clearInterval(this.drawGame);
	      window.clearInterval(this.checkMissInterval);
	      window.clearInterval(this.song.hAdjustInterval);
	      var audio = document.querySelector('audio');
	      audio.remove();
	      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	      this.tCtx.clearRect(0, 0, this.tCanvas.width, this.tCanvas.height);
	      this.sCtx.clearRect(0, 0, this.sCanvas.width, this.sCanvas.height);
	      document.removeEventListener("keypress", this.checkHit, false);
	      var gameoverScreen = new _gameover2.default(failStatus, song, score);
	      gameoverScreen.start();
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      var _this3 = this;
	
	      //begin drawing
	      this.drawGame = window.setInterval(function () {
	        _this3.draw();
	      }, 20);
	
	      //play music
	      this.startSong();
	
	      //start song text scrolling
	      this.song.start();
	
	      //start score
	      this.checkScore();
	
	      //end drawing and draw gameover screen if song is over
	      this.goToMenu = window.setInterval(function () {
	        var audio = document.querySelector('audio');
	        var time = audio.currentTime;
	        if (time > _this3.song.time) {
	          _this3.gameover("passed", _this3.song, _this3.score);
	        }
	      }, 1000);
	    }
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Song = function () {
	  function Song(path, time, bpm, offset, hSpace, text, nudge, beats) {
	    _classCallCheck(this, Song);
	
	    // offset is how far the first letter starts to the right of the edge
	    // hSpacing is the number of pixels between letters.
	    // It can be adjusted for slower/faster scrolling
	    // nudge is a magic number that helps sync letters array with start of song
	    this.path = path;
	    this.time = time;
	    this.bpm = bpm;
	    this.offset = offset;
	    this.hSpace = hSpace;
	    this.hAdjust = 0;
	    this.nudge = nudge;
	    this.beats = beats;
	    this.text = text;
	
	    this.canvas = document.getElementById("text-canvas");
	    this.ctx = this.canvas.getContext("2d");
	
	    //find the total number of letters to take from the text
	    this.letters = text.split("").slice(0, this.beats);
	    this.drawLetters = this.letters.map(function (letter) {
	      if (letter === " ") {
	        return "⌾";
	        // maybes: ⌴ ⌾ ⎵
	      } else {
	        return letter;
	      }
	    });
	
	    // calculate "speed" - num ms for each letter to move one hSpace
	    this.secondsPerBeat = 60 / bpm;
	    this.hAdjustInterval = this.secondsPerBeat / hSpace * 1000;
	  }
	
	  _createClass(Song, [{
	    key: "start",
	    value: function start() {
	      var _this = this;
	
	      //reset hAdjust
	      this.hAdjust = 0;
	      //Start hAdjust interval to move letters across the screen
	      this.hAdjustInterval = window.setInterval(function () {
	        _this.hAdjust++;
	      }, this.hAdjustInterval);
	      // set text to start
	      this.startPos = 0;
	    }
	  }, {
	    key: "drawText",
	    value: function drawText() {
	      this.ctx.font = "48px 'Anonymous Pro', monospace";
	      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	      for (var i = this.startPos; i < this.letters.length; i++) {
	        var hPos = this.canvas.width + this.offset + this.hSpace * i - this.hAdjust;
	        if (this.letters[i] !== "@" && hPos > 0 && hPos < this.canvas.width) {
	          this.ctx.fillText(this.drawLetters[i], hPos, this.canvas.height / 2);
	        }
	      }
	    }
	  }]);
	
	  return Song;
	}();
	
	exports.default = Song;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _menu = __webpack_require__(1);
	
	var _menu2 = _interopRequireDefault(_menu);
	
	var _game = __webpack_require__(2);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _song = __webpack_require__(3);
	
	var _song2 = _interopRequireDefault(_song);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Gameover = function () {
	  function Gameover(failStatus, song, score) {
	    _classCallCheck(this, Gameover);
	
	    this.failStatus = failStatus;
	    this.song = song;
	    this.score = score;
	    this.canvas = document.getElementById("game-canvas");
	    this.ctx = this.canvas.getContext("2d");
	    this.tCanvas = document.getElementById("text-canvas");
	    this.tCtx = this.tCanvas.getContext("2d");
	    this.selected = 0;
	    this.keypress = this.keypress.bind(this);
	  }
	
	  _createClass(Gameover, [{
	    key: 'keypress',
	    value: function keypress(e) {
	      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
	        if (this.selected === 0) {
	          this.selected = 1;
	        } else {
	          this.selected = 0;
	        }
	      }
	      if (e.key === "Enter" && this.selected === 0) {
	        document.removeEventListener("keydown", this.keypress, false);
	        window.clearInterval(this.drawGameover);
	        //Not sure why I need a new song, but starting a new game
	        //with old song messed up timings
	        var song = new _song2.default(this.song.path, this.song.time, this.song.bpm, this.song.offset, this.song.hSpace, this.song.text, this.song.nudge, this.song.beats);
	        var game = new _game2.default(song);
	        game.start();
	      }
	      if (e.key === "Enter" && this.selected === 1) {
	        document.removeEventListener("keydown", this.keypress, false);
	        window.clearInterval(this.drawGameover);
	        var menu = new _menu2.default();
	        menu.start();
	      }
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      var _this = this;
	
	      // move up and down through menu. Enter starts a song and clears menu draw
	      document.addEventListener("keydown", this.keypress, false);
	
	      // begin drawing menu
	      this.drawGameover = window.setInterval(function () {
	        _this.draw();
	      }, 20);
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      var _this2 = this;
	
	      var baseImage = new Image();
	      baseImage.onload = function () {
	        _this2.ctx.clearRect(0, 0, _this2.canvas.width, _this2.canvas.height);
	        _this2.tCtx.clearRect(0, 0, _this2.tCanvas.width, _this2.tCanvas.height);
	        _this2.ctx.drawImage(baseImage, 0, 0);
	        _this2.ctx.font = "48px 'Anton'";
	        _this2.ctx.fillStyle = "black";
	        var message = void 0;
	        if (_this2.failStatus === "failed") {
	          message = "Game over. Not feeling the rhythm?";
	        } else {
	          message = 'Nice job! You got ' + _this2.score + ' points';
	        }
	        _this2.ctx.fillText(message, 200, 70);
	        _this2.ctx.font = "32px 'Anton'";
	        if (_this2.selected === 0) {
	          _this2.ctx.fillStyle = "white";
	        } else {
	          _this2.ctx.fillStyle = "black";
	        }
	        _this2.ctx.fillText("Retry", 400, 200);
	        if (_this2.selected === 1) {
	          _this2.ctx.fillStyle = "white";
	        } else {
	          _this2.ctx.fillStyle = "black";
	        }
	        _this2.ctx.fillText("Menu", 400, 250);
	      };
	      baseImage.src = 'assets/background.jpg';
	    }
	  }]);
	
	  return Gameover;
	}();
	
	exports.default = Gameover;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var textArray = ["I oo OO textI oo OO textI oo OO textI oo OO textI oo OO textI oo OO textI am OO textI am OO textI am some textI am some textI am some textI am some textI am some textI am some textI am some textI am some textI am some text"];
	
	exports.default = textArray;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map