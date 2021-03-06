// Generated by CoffeeScript 1.6.3
(function() {
  var A, DOWN, Paddle, Q, UP, displacement, doc, keys, lhs, move, paddle1, paddle2, rhs, withEvents,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  withEvents = function(emitter, event) {
    var data, pipeline, reset, run;
    pipeline = [];
    data = [];
    reset = function() {
      return pipeline = [];
    };
    run = function() {
      var processor, result, _i, _len;
      result = data;
      for (_i = 0, _len = pipeline.length; _i < _len; _i++) {
        processor = pipeline[_i];
        if (processor.filter != null) {
          result = result.filter(processor.filter);
        } else if (processor.map != null) {
          result = result.map(processor.map);
        }
      }
      return result;
    };
    emitter.on(event, function(datum) {
      return data.push(datum);
    });
    return {
      filter: function(filter) {
        pipeline.push({
          filter: filter
        });
        return this;
      },
      map: function(map) {
        pipeline.push({
          map: map
        });
        return this;
      },
      drain: function(fn) {
        return emitter.on(event, function(datum) {
          var result;
          result = run();
          data = [];
          return fn(result);
        });
      },
      evaluate: function() {
        var result;
        result = run();
        reset();
        return result;
      }
    };
  };

  UP = 38;

  DOWN = 40;

  Q = 81;

  A = 65;

  doc = {
    on: function(event, fn) {
      var old;
      old = document["on" + event] || function() {};
      return document["on" + event] = function(e) {
        old(e);
        return fn(e);
      };
    }
  };

  Paddle = (function() {
    function Paddle(top, left) {
      this.top = top != null ? top : 0;
      this.left = left != null ? left : 0;
      this.render();
    }

    Paddle.prototype.move = function(displacement) {
      this.top += displacement * 5;
      return this.paddle.style.top = this.top + 'px';
    };

    Paddle.prototype.render = function() {
      this.paddle = document.createElement('div');
      this.paddle.className = 'paddle';
      this.paddle.style.backgroundColor = 'black';
      this.paddle.style.position = 'absolute';
      this.paddle.style.top = "" + this.top + "px";
      this.paddle.style.left = "" + this.left + "px";
      this.paddle.style.width = '20px';
      this.paddle.style.height = '100px';
      return document.querySelector('#pong').appendChild(this.paddle);
    };

    return Paddle;

  })();

  displacement = function(_arg) {
    var down, up;
    up = _arg[0], down = _arg[1];
    return function(event) {
      switch (event.keyCode) {
        case up:
          return -1;
        case down:
          return 1;
        default:
          return 0;
      }
    };
  };

  move = function(paddle) {
    return function(moves) {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = moves.length; _i < _len; _i++) {
        displacement = moves[_i];
        _results.push(paddle.move(displacement));
      }
      return _results;
    };
  };

  keys = function(expected) {
    return function(pressed) {
      var _ref;
      return _ref = pressed.keyCode, __indexOf.call(expected, _ref) >= 0;
    };
  };

  lhs = 0;

  rhs = document.body.offsetWidth;

  paddle1 = new Paddle(0, lhs);

  paddle1.keys = [Q, A];

  paddle2 = new Paddle(0, rhs - 20);

  paddle2.keys = [UP, DOWN];

  withEvents(doc, 'keydown').filter(keys(paddle1.keys)).map(displacement(paddle1.keys)).drain(move(paddle1));

  withEvents(doc, 'keydown').filter(keys(paddle2.keys)).map(displacement(paddle2.keys)).drain(move(paddle2));

}).call(this);
