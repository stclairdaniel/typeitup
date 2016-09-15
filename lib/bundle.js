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
	
	// checkbox for capital, punctuation
	// best/worst keys
	// add click handlers for main menu

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _game3 = __webpack_require__(2);
	
	var _game4 = _interopRequireDefault(_game3);
	
	var _song3 = __webpack_require__(3);
	
	var _song4 = _interopRequireDefault(_song3);
	
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
	    this.click = this.click.bind(this);
	    this.hover = this.hover.bind(this);
	    this.caps = true;
	    this.punctuation = true;
	  }
	
	  _createClass(Menu, [{
	    key: 'keypress',
	    value: function keypress(e) {
	      if (e.key === "ArrowDown") {
	        this.selected += 1;
	        this.selected = this.selected % 5;
	      }
	      if (e.key === "ArrowUp") {
	        this.selected -= 1;
	        if (this.selected === -1) {
	          this.selected = 4;
	        }
	      }
	      if (e.key === "Enter" && this.selected <= 2) {
	        window.clearInterval(this.drawMenu);
	        this.playSong(this.selected);
	      } else if (e.key === "Enter" && this.selected === 3) {
	        this.punctuation = !this.punctuation;
	      } else if (e.key === "Enter" && this.selected === 4) {
	        this.caps = !this.caps;
	      }
	    }
	  }, {
	    key: 'click',
	    value: function click(e) {
	      console.log(e);
	      if (e.screenX > 121 && e.screenX < 440) {
	        if (e.screenY > 258 && e.screenY < 282) {
	          window.clearInterval(this.drawMenu);
	          this.playSong(0);
	        }
	        if (e.screenY > 295 && e.screenY < 336) {
	          window.clearInterval(this.drawMenu);
	          this.playSong(1);
	        }
	        if (e.screenY > 342 && e.screenY < 384) {
	          window.clearInterval(this.drawMenu);
	          this.playSong(2);
	        }
	      }
	      if (e.screenX > 485 && e.screenX < 700) {
	        if (e.screenY > 278 && e.screenY < 307) {
	          this.punctuation = !this.punctuation;
	        }
	        if (e.screenY > 321 && e.screenY < 357) {
	          this.caps = !this.caps;
	        }
	      }
	    }
	  }, {
	    key: 'hover',
	    value: function hover(e) {
	      if (e.screenX > 121 && e.screenX < 440) {
	        if (e.screenY > 258 && e.screenY < 282) {
	          this.selected = 0;
	        }
	        if (e.screenY > 295 && e.screenY < 336) {
	          this.selected = 1;
	        }
	        if (e.screenY > 342 && e.screenY < 384) {
	          this.selected = 2;
	        }
	      }
	      if (e.screenX > 485 && e.screenX < 700) {
	        if (e.screenY > 278 && e.screenY < 307) {
	          this.selected = 3;
	        }
	        if (e.screenY > 321 && e.screenY < 357) {
	          this.selected = 4;
	        }
	      }
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      var _this = this;
	
	      // move up and down through menu. Enter starts a song and clears menu draw
	      document.addEventListener("keydown", this.keypress, false);
	      document.addEventListener("click", this.click, false);
	      document.addEventListener("mousemove", this.hover, false);
	
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
	        _this2.ctx.fillText("Easy        (24 WPM)", 100, 150);
	        if (_this2.selected === 1) {
	          _this2.ctx.fillStyle = "white";
	        } else {
	          _this2.ctx.fillStyle = "black";
	        }
	        _this2.ctx.fillText("Medium  (40 WPM)", 100, 200);
	        if (_this2.selected === 2) {
	          _this2.ctx.fillStyle = "white";
	        } else {
	          _this2.ctx.fillStyle = "black";
	        }
	        _this2.ctx.fillText("Hard        (60 WPM)", 100, 250);
	        if (_this2.selected === 3) {
	          _this2.ctx.fillStyle = "white";
	        } else {
	          _this2.ctx.fillStyle = "black";
	        }
	        if (_this2.punctuation) {
	          _this2.ctx.fillText("Punctuation On", 450, 150);
	        } else {
	          _this2.ctx.fillText("Punctuation Off", 450, 150);
	        }
	        if (_this2.selected === 4) {
	          _this2.ctx.fillStyle = "white";
	        } else {
	          _this2.ctx.fillStyle = "black";
	        }
	        if (_this2.caps) {
	          _this2.ctx.fillText("Capitalization On", 450, 200);
	        } else {
	          _this2.ctx.fillText("Capitalization Off", 450, 200);
	        }
	        _this2.ctx.fillStyle = "black";
	        _this2.ctx.fillText("How to Play:", 300, 400);
	        _this2.ctx.fillText("Type the scrolling letters to the beat!", 300, 450);
	        _this2.ctx.fillText("Press the spacebar when you see ⎵", 300, 500);
	      };
	      baseImage.src = 'assets/menuBG.jpg';
	    }
	  }, {
	    key: 'playSong',
	    value: function playSong(selected) {
	      document.removeEventListener("keydown", this.keypress, false);
	      document.removeEventListener("click", this.click, false);
	      document.removeEventListener("mousemove", this.hover, false);
	
	      var text = _text2.default[Math.floor(Math.random() * (_text2.default.length - 1))];
	      if (selected === 0) {
	        var song = new _song4.default('http://res.cloudinary.com/loudsounds/video/upload/v1473962530/easy_c6pnms.mp3', 95, 120, 3185, 100, text, 144, 20.345, this.caps, this.punctuation);
	        var game = new _game4.default(song, 'assets/easy.jpg');
	        game.start();
	      }
	      if (selected === 1) {
	        var _song = new _song4.default('http://res.cloudinary.com/loudsounds/video/upload/v1473962527/medium_fppvup.mp3', 88, 200, 2725, 100, text, 255, 10.85, this.caps, this.punctuation);
	        var _game = new _game4.default(_song, 'assets/medium.jpg');
	        _game.start();
	      }
	      if (selected === 2) {
	        var _song2 = new _song4.default('http://res.cloudinary.com/loudsounds/video/upload/v1473962535/hard_xkhdjp.mp3', 100, 300, 2365, 100, text, 464, 6.55, this.caps, this.punctuation);
	        var _game2 = new _game4.default(_song2, 'assets/hard.jpg');
	        _game2.start();
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
	  function Game(song, background) {
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
	    this.judge = new Image();
	    this.judge.src = 'assets/judge.png';
	    this.background = background;
	  }
	
	  _createClass(Game, [{
	    key: 'createAudio',
	    value: function createAudio() {
	      var game = document.querySelector('div');
	      var audio = document.createElement('audio');
	      audio.src = '' + this.song.path;
	      audio.controls = true;
	      audio.autoplay = false;
	      game.appendChild(audio);
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
	      var i = (time - this.song.timeOffset) / this.song.secondsPerBeat;
	      if (this.song.letters[Math.round(i)] === e.key) {
	        this.sCtx.clearRect(0, 0, this.sCanvas.width, this.sCanvas.height);
	        this.sCtx.drawImage(this.judge, 50, 200, 500, 150, 100, 125, 250, 75);
	        this.letters[Math.round(i)] = "@";
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
	      var i = (time - this.song.timeOffset) / this.song.secondsPerBeat;
	      if (this.letters[Math.round(i) - 1] !== "@" && Math.round(i) - 1 > 0 && Math.round(i) <= this.song.letters.length) {
	        this.sCtx.clearRect(0, 0, this.sCanvas.width, this.sCanvas.height);
	        this.sCtx.drawImage(this.judge, 50, 1000, 500, 150, 100, 125, 250, 75);
	        if (this.life > 0.05) {
	          this.life -= 0.05;
	        } else {
	          this.gameover("failed", this.song, this.score, this.background);
	        }
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      var _this2 = this;
	
	      var baseImage = new Image();
	      var audio = document.querySelector('audio');
	      var time = audio.currentTime;
	      baseImage.onload = function () {
	        _this2.ctx.drawImage(baseImage, 0, 0);
	        _this2.ctx.fillStyle = "black";
	        _this2.ctx.fillRect(100, 200, 2, 150);
	        _this2.ctx.fillRect(150, 200, 2, 150);
	        _this2.song.drawText();
	        _this2.ctx.fillStyle = "black";
	        _this2.ctx.font = "32px 'Anton'";
	        _this2.ctx.fillText('Score: ' + _this2.score, 700, 100);
	        _this2.ctx.fillStyle = "green";
	        _this2.ctx.fillRect(300, 75, _this2.life * 325, 25);
	        _this2.ctx.fillStyle = "red";
	        _this2.ctx.fillRect(300 + _this2.life * 325, 75, (1 - _this2.life) * 325, 25);
	        _this2.ctx.fillStyle = "black";
	        _this2.ctx.font = "48px 'Anton'";
	        if (time < _this2.song.timeOffset - 12 * _this2.song.secondsPerBeat) {
	          _this2.ctx.fillText("Get Ready To Type!", 400, 500);
	        } else if (time < _this2.song.timeOffset - 8 * _this2.song.secondsPerBeat) {
	          _this2.ctx.fillText("3...", 300, 500);
	        } else if (time < _this2.song.timeOffset - 4 * _this2.song.secondsPerBeat) {
	          _this2.ctx.fillText("2...", 300, 500);
	        } else if (time < _this2.song.timeOffset) {
	          _this2.ctx.fillText("1...", 300, 500);
	        } else if (time > _this2.song.timeOffset) {
	          _this2.ctx.fillText("", 300, 500);
	        }
	      };
	      baseImage.src = this.background;
	    }
	  }, {
	    key: 'gameover',
	    value: function gameover(failStatus, song, score, background) {
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
	      var gameoverScreen = new _gameover2.default(failStatus, song, score, background);
	      gameoverScreen.start();
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      var _this3 = this;
	
	      //Initialize audio player
	
	      this.createAudio();
	
	      var audio = document.querySelector('audio');
	
	      //begin drawing
	      this.drawGame = window.setInterval(function () {
	        _this3.draw();
	      }, 20);
	
	      audio.addEventListener('loadeddata', function () {
	        //if music ready, begin song
	        if (audio.readyState === 4) {
	
	          audio.play();
	
	          //start song text scrolling
	          _this3.song.startScroll();
	
	          //start hit/miss detection
	          _this3.checkScore();
	        }
	      });
	
	      //end drawing and draw gameover screen if song is over
	      this.goToMenu = window.setInterval(function () {
	        var time = audio.currentTime;
	        if (time > _this3.song.time) {
	          _this3.gameover("passed", _this3.song, _this3.score, _this3.background);
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
	  function Song(path, time, bpm, offset, hSpace, text, beats, timeOffset, caps, punctuation) {
	    var _this = this;
	
	    _classCallCheck(this, Song);
	
	    // offset is how far the first letter starts to the right of the edge
	    // it needs to be manually set for each song
	    // hSpace is the number of pixels between letters.
	    // It can be adjusted for slower/faster scrolling
	    // timeOffset is the amount of time between track start and the first letter
	    // Find by looking at waveform in Audacity
	    // Only use songs with multiples of the following BPMs to prevent fractional
	    // intervals
	    // 100, 120, 125, 150
	    this.path = path;
	    this.time = time;
	    this.bpm = bpm;
	    this.offset = offset;
	    this.hSpace = hSpace;
	    this.text = text;
	    this.beats = beats;
	    this.timeOffset = timeOffset;
	    this.caps = caps;
	    this.punctuation = punctuation;
	
	    this.hAdjust = 0;
	
	    this.canvas = document.getElementById("text-canvas");
	    this.ctx = this.canvas.getContext("2d");
	
	    //find the total number of letters to take from the text
	    this.letters = text.split("").slice(0, this.beats);
	
	    // caps mapping
	    this.letters = this.letters.map(function (letter) {
	      if (!_this.caps) {
	        return letter.toLowerCase();
	      } else {
	        return letter;
	      }
	    });
	
	    // punctuation filtering
	    if (!this.punctuation) {
	      this.letters = this.letters.filter(function (letter) {
	        return !letter.match(/[.,\/#!$%\^&\*;:{}=\-_`~()]/);
	      });
	    }
	
	    // space bar symbol mapping
	    this.drawLetters = this.letters.map(function (letter) {
	      if (letter === " ") {
	        return "⎵";
	      } else {
	        return letter;
	      }
	    });
	
	    // calculate "speed" - num ms for each letter to move one hSpace
	    this.secondsPerBeat = 60 / bpm;
	    this.hAdjustIntervalTime = this.secondsPerBeat / hSpace * 1000;
	  }
	
	  _createClass(Song, [{
	    key: "startScroll",
	    value: function startScroll() {
	      var _this2 = this;
	
	      //Start hAdjust interval to move letters across the screen
	      //Multiply by 3 to increase to over minimum of 10ms
	      //Older browsers can't support <10ms intervals
	      this.hAdjustInterval = window.setInterval(function () {
	        _this2.hAdjust += 3;
	      }, this.hAdjustIntervalTime * 3);
	    }
	  }, {
	    key: "drawText",
	    value: function drawText() {
	      this.ctx.font = "72px 'Anonymous Pro', monospace";
	      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	      for (var i = 0; i < this.letters.length; i++) {
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
	  function Gameover(failStatus, song, score, background) {
	    _classCallCheck(this, Gameover);
	
	    this.failStatus = failStatus;
	    this.song = song;
	    this.score = score;
	    this.background = background;
	    this.canvas = document.getElementById("game-canvas");
	    this.ctx = this.canvas.getContext("2d");
	    this.tCanvas = document.getElementById("text-canvas");
	    this.tCtx = this.tCanvas.getContext("2d");
	    this.selected = 0;
	    this.keypress = this.keypress.bind(this);
	    this.click = this.click.bind(this);
	    this.hover = this.hover.bind(this);
	  }
	
	  _createClass(Gameover, [{
	    key: 'retry',
	    value: function retry() {
	      document.removeEventListener("keydown", this.keypress, false);
	      document.removeEventListener("click", this.click, false);
	      document.removeEventListener("mousemove", this.hover, false);
	      window.clearInterval(this.drawGameover);
	      //Not sure why I need a new song, but starting a new game
	      //with old song messed up timings
	      var song = new _song2.default(this.song.path, this.song.time, this.song.bpm, this.song.offset, this.song.hSpace, this.song.text, this.song.beats, this.song.timeOffset, this.song.caps, this.song.punctuation);
	      var game = new _game2.default(song, this.background);
	      game.start();
	    }
	  }, {
	    key: 'goToMenu',
	    value: function goToMenu() {
	      document.removeEventListener("keydown", this.keypress, false);
	      document.removeEventListener("click", this.click, false);
	      document.removeEventListener("mousemove", this.hover, false);
	      window.clearInterval(this.drawGameover);
	      var menu = new _menu2.default();
	      menu.start();
	    }
	  }, {
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
	        this.retry();
	      }
	      if (e.key === "Enter" && this.selected === 1) {
	        this.goToMenu();
	      }
	    }
	  }, {
	    key: 'click',
	    value: function click(e) {
	      if (e.screenX > 495 && e.screenX < 564) {
	        if (e.screenY > 292 && e.screenY < 325) {
	          this.retry();
	        }
	        if (e.screenY > 345 && e.screenY < 374) {
	          this.goToMenu();
	        }
	      }
	    }
	  }, {
	    key: 'hover',
	    value: function hover(e) {
	      if (e.screenX > 495 && e.screenX < 564) {
	        if (e.screenY > 292 && e.screenY < 325) {
	          this.selected = 0;
	        }
	        if (e.screenY > 345 && e.screenY < 374) {
	          this.selected = 1;
	        }
	      }
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      var _this = this;
	
	      // move up and down through menu. Enter starts a song and clears menu draw
	      document.addEventListener("keydown", this.keypress, false);
	      document.addEventListener("click", this.click, false);
	      document.addEventListener("mousemove", this.hover, false);
	
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
	      baseImage.src = this.background;
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
	var textArray = ["An invitation to dinner was soon afterwards dispatched; and already had Mrs. Bennet planned the courses that were to do credit to her housekeeping, when an answer arrived which deferred it all. Mr. Bingley was obliged to be in town the following day, and, consequently, unable to accept the honour of their invitation, etc. Mrs. Bennet was quite disconcerted. She could not imagine what business he could have in town so soon after his arrival in Hertfordshire; and she began to fear that he might be always flying about from one place to another, and never settled at Netherfield as he ought to be.", "Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, 'and what is the use of a book,' thought Alice 'without pictures or conversations?' So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.", "To Sherlock Holmes she is always the woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex. It was not that he felt any emotion akin to love for Irene Adler. All emotions, and that one particularly, were abhorrent to his cold, precise but admirably balanced mind. He was, I take it, the most perfect reasoning and observing machine that the world has seen, but as a lover he would have placed himself in a false position.", "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. What's happened to me? he thought. It wasn't a dream.", "There were a king with a large jaw and a queen with a plain face, on the throne of England; there were a king with a large jaw and a queen with a fair face, on the throne of France. In both countries it was clearer than crystal to the lords of the State preserves of loaves and fishes, that things in general were settled for ever. It was the year of Our Lord one thousand seven hundred and seventy-five. Spiritual revelations were conceded to England at that favoured period, as at this. Mrs. Southcott had recently attained her five-and-twentieth blessed birthday, of whom a prophetic private in the Life Guards had heralded the sublime appearance by announcing that arrangements were made for the swallowing up of London and Westminster.", "A certain king had a beautiful garden, and in the garden stood a tree which bore golden apples. These apples were always counted, and about the time when they began to grow ripe it was found that every night one of them was gone. The king became very angry at this, and ordered the gardener to keep watch all night under the tree. The gardener set his eldest son to watch; but about twelve o'clock he fell asleep, and in the morning another of the apples was missing.  Then the second son was ordered to watch; and at midnight he too fell asleep, and in the morning another apple was gone. Then the third son offered to keep watch; but the gardener at first would not let him, for fear some harm should come to him: however, at last he consented, and the young man laid himself under the tree to watch.", "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people's hats off—then, I account it high time to get to sea as soon as I can.", "You don’t know about me without you have read a book by the name of The Adventures of Tom Sawyer; but that ain’t no matter.  That book was made by Mr. Mark Twain, and he told the truth, mainly.  There was things which he stretched, but mainly he told the truth.  That is nothing.  I never seen anybody but lied one time or another, without it was Aunt Polly, or the widow, or maybe Mary. Aunt Polly—Tom’s Aunt Polly, she is—and Mary, and the Widow Douglas is all told about in that book, which is mostly a true book, with some stretchers, as I said before."];
	
	exports.default = textArray;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map