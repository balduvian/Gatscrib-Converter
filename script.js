'てᕈꝒⴳ𐒐ⴴກᕞᏡνꕈᕠЯ𝛶൪ሎαẟนⵍᏲഠ';
'°ᓒᑦޏᐢʭ|ⵜכઝ';
var map = new Array(256);
var doubles = new Array();
var addToMap = function (char, replacement, vowel) {
    map[char.charCodeAt(0)] = { result: replacement, vowel: vowel || false };
};
addToMap('i', '°', true);
addToMap('I', 'ᓒ', true);
addToMap('e', 'ᑦ', true);
addToMap('E', 'ޏ', true);
addToMap('a', 'ᐢ', true);
addToMap('A', 'ʭ', true);
addToMap('o', '|', true);
addToMap('O', 'ⵜ', true);
addToMap('u', 'כ', true);
addToMap('U', 'ઝ', true);
addToMap('b', 'て');
addToMap('d', 'ᕈ');
addToMap('f', 'Ꝓ');
addToMap('g', 'ⴳ');
addToMap('h', '𐒐');
addToMap('j', 'ⴴ');
addToMap('k', 'ກ');
addToMap('l', 'ᕞ');
addToMap('m', 'Ꮱ');
addToMap('n', 'ν');
addToMap('p', 'ꕈ');
addToMap('r', 'ᕠ');
addToMap('s', 'ମ');
addToMap('t', '𝛶');
addToMap('v', 'ꕃ');
addToMap('w', 'ሎ');
addToMap('y', 'α');
addToMap('z', 'ẟ');
doubles.push({ key: 'th', result: 'น' });
doubles.push({ key: 'zh', result: 'ⵍ' });
doubles.push({ key: 'ch', result: 'Ᏺ' });
doubles.push({ key: 'sh', result: '൪' });
var input = document.getElementById('input');
var output = document.getElementById('output');
input.onchange = function () {
    var str = '';
    var lastIsConst = false;
    var _loop_1 = function (i) {
        var current = input.value.charAt(i);
        if (i !== input.value.length - 1) {
            /* see if this is a double char code */
            if (!doubles.every(function (double) {
                if (current === double.key[0] && input.value[i + 1] === double.key[1]) {
                    str += double.result;
                    ++i;
                    lastIsConst = true;
                    return false;
                }
                return true;
            }))
                return out_i_1 = i, "continue";
        }
        var code = input.value.charCodeAt(i);
        if (code < 256 && map[code] !== undefined) {
            if (map[code].vowel) {
                /* add blank consonant placeholder */
                if (!lastIsConst)
                    str += 'ഠ';
                str += map[code].result;
                lastIsConst = false;
            }
            else {
                /* palce regular consonant */
                str += map[code].result;
                lastIsConst = true;
            }
        }
        else {
            /* space or otherwise */
            lastIsConst = false;
            str += input.value.charAt(i);
        }
        out_i_1 = i;
    };
    var out_i_1;
    for (var i = 0; i < input.value.length; ++i) {
        _loop_1(i);
        i = out_i_1;
    }
    output.value = str;
};
