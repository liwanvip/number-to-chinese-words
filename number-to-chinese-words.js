'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NumberToChineseWords = function () {
  function NumberToChineseWords() {
    _classCallCheck(this, NumberToChineseWords);
  }

  _createClass(NumberToChineseWords, null, [{
    key: 'toOrdinal',
    value: function toOrdinal(num) {
      return NumberToChineseWords.ordinal + num;
    }
  }, {
    key: 'toWords',
    value: function toWords(num) {
      return NumberToChineseWords.intToChinese(num, NumberToChineseWords.digits, NumberToChineseWords.units) + NumberToChineseWords.floatToChinese(num, NumberToChineseWords.digits);
    }
  }, {
    key: 'toWordsOrdinal',
    value: function toWordsOrdinal(num) {
      return NumberToChineseWords.ordinal + NumberToChineseWords.intToChinese(num, NumberToChineseWords.digits, NumberToChineseWords.units);
    }
  }, {
    key: 'intToChinese',
    value: function intToChinese(num, digits, units) {
      var str = '';
      var n = Math.floor(num);
      while (n > 0) {
        var u = units.shift();
        var d = n % 10;
        str = digits[d] + (d > 0 ? u : '') + str;
        n = Math.floor(n / 10);
      }

      return (num < 0 ? NumberToChineseWords.minus : "") + (num < 1 ? digits[0] : str.replace(new RegExp(NumberToChineseWords.digits[0] + "+$", "i"), '').replace(new RegExp("^" + NumberToChineseWords.digits[1] + NumberToChineseWords.units[1], "i"), NumberToChineseWords.units[1]));
    }
  }, {
    key: 'floatToChinese',
    value: function floatToChinese(num, digits) {
      if (num % 1 == 0) return;

      var str = '';
      var f = parseInt(num.toString().replace(/\d+./i, '1'));
      while (f > 0) {
        var d = f % 10;
        str = digits[d] + str;
        f = Math.floor(f / 10);
      }

      return NumberToChineseWords.point + str.replace(new RegExp("^" + NumberToChineseWords.digits[1], "i"), "");
    }
  }]);

  return NumberToChineseWords;
}();

exports.default = NumberToChineseWords;


NumberToChineseWords.digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
NumberToChineseWords.units = ['', '十', '百', '千', '萬', '十', '百', '千', '億', '十', '百', '千', '萬'];
NumberToChineseWords.ordinal = "第";
NumberToChineseWords.point = "點";
NumberToChineseWords.minus = "負";
