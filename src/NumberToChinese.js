/**
 * 数字转中文
 */
function intToChinese(num, digits, units, minus, isCheque) {
  let str = '';
  let n = Math.floor(Math.abs(num));
  if(n < 1) {
    return `${((num < 0) ? minus : "")}${digits[0]}`;
  }

  let uc = units.slice();
  while(n > 0) {
    let u = uc.shift();
    let d = n % 10;
    str = `${digits[d]}${u}${str}`;
    n = Math.floor(n / 10);
  }

  const smallUnit = `${units[1]}${units[2]}${units[3]}`;
  const bigUnit = `${units[4]}${units[8]}`;
  const digWioutZero=`${digits.slice(1).join('')}`;
  const zero = digits[0];

  str = str.replace(new RegExp(`(${zero})[${smallUnit}]`, 'g'), '$1')
  .replace(new RegExp(`([${bigUnit}])[^${smallUnit}${digWioutZero}]+([${bigUnit}])`, 'g'), `$1${zero}`)
  .replace(new RegExp(`([${smallUnit}])${zero}+([${bigUnit}])`, 'g'), `$1$2${zero}`)
  .replace(new RegExp(`(${zero})+`, 'g'), '$1')
  .replace(new RegExp(`${zero}+$`), "");

  if(isCheque != true) {
    str = str.replace(new RegExp(`^${digits[1]}${units[1]}`), units[1]);
  }
  
  return `${num < 0 ? minus : ""}${str}`;
}

function floatToChinese(num, digits, point) {
  if(num % 1 === 0) {
    return '';
  }
  let str = '';
  let f = parseInt(Math.abs(num).toString().replace(/\d+./i, '1'));
  while(f > 0) {
    let d = f % 10;
    str = `${digits[d]}${str}`;
    f = Math.floor(f / 10);
  }
  str = str.replace(new RegExp(`^${digits[1]}`, 'i'), "");
  return `${point}${str}`;
}

export default class NumberToChinese {
  static labels = {
    digits: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
    units: ["", "十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千"],
    point: '点',
    minus: '负',
  }
  static toWords(num) {
    const regx = new RegExp('^([-+])?\\d+(.\\d+)?$');
    if(regx.test(num)) {
      const {digits, units, minus, point} = NumberToChinese.labels;
      return intToChinese(num, digits, units, minus) + floatToChinese(num, digits, point);
    } else {
      return "";
    }
  }
}
