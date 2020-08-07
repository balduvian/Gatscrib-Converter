
'てᕈꝒⴳ𐒐ⴴກᕞᏡνꕈᕠЯ𝛶൪ሎαẟนⵍᏲഠ'

'°ᓒᑦޏᐢʭ|ⵜכઝ'

const map = new Array<{result: string, vowel: boolean} | undefined>(256);
const doubles = new Array<{key: string, result: string}>();

let mapFirst = 255;
let mapLast = 0;

const addToMap = (char: string, replacement: string, vowel?: boolean) => {
	const index = char.charCodeAt(0);

	map[index] = {result: replacement, vowel: vowel || false};

	if (index < mapFirst) mapFirst = index;
	if (index + 1 > mapLast) mapLast = index + 1;
}

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
addToMap('h', 'խ');
addToMap('j', 'ⴴ');
addToMap('k', 'ກ');
addToMap('l', 'ᕞ');
addToMap('m', 'Ꮱ');
addToMap('n', 'ν');
addToMap('p', 'ꕈ');
addToMap('r', 'ᕠ');
addToMap('s', 'ମ');
addToMap('t', '⥾');
addToMap('v', 'ꕃ');
addToMap('w', 'ሎ');
addToMap('y', 'α');
addToMap('z', 'ẟ');

doubles.push({ key: 'th', result: 'น'});
doubles.push({ key: 'zh', result: 'ⵍ'});
doubles.push({ key: 'ch', result: 'Ᏺ'});
doubles.push({ key: 'sh', result: '൪'});

const input = document.getElementById('input') as HTMLTextAreaElement;
const output = document.getElementById('output') as HTMLTextAreaElement;
const button = document.getElementById('switch') as HTMLButtonElement;

let mode = true;

const latinToGatscrib = (text: string) => {
	let str = '';
	let lastIsConst = false;

	for (let i = 0; i < text.length; ++i) {
		const current = text.charAt(i);

		if (i !== text.length - 1) {
			/* see if this is a double char code */
			if (!doubles.every(double => {
				if (current === double.key[0] && text[i + 1] === double.key[1]) {
					str += double.result;
					++i;
					lastIsConst = true;

					return false;
				}

				return true;
			})) continue;
		}
	
		const code = text.charCodeAt(i);

		if (code < 256 && map[code] !== undefined) {
			if (map[code].vowel) {
				/* add blank consonant placeholder */
				if (!lastIsConst) str += 'ഠ';

				str += map[code].result;
				lastIsConst = false;
			} else {
				/* palce regular consonant */
				str += map[code].result;
				lastIsConst = true;
			}
		} else {
			/* space or otherwise */
			lastIsConst = false;
			str += text.charAt(i);
		}
	}

	return str;
}

const gatscribToLatin = (text: string) => {
	let str = '';

	for (let i = 0; i < text.length; ++i) {
		const current = text.charAt(i);

		if (current === 'ഠ') continue;

		let found = false;

		for (let j = mapFirst; j < mapLast && !found; ++j) {
			const mapItem = map[j];
			if (mapItem === undefined) continue;

			/* t and h do not work for some reason */

			if (mapItem.result === current) {
				str += String.fromCharCode(j);
				found = true;
			}
		}

		if (!found) {
			for (let j = 0; j < doubles.length && !found; ++j) {
				const double = doubles[j];

				if (current === double.result) {
					str += double.key;
					found = true;
				}
			}
		}

		if (!found) {
			str += current;
		}
	}

	return str;
}

const setButtonText = (mode: boolean) => {
	button.textContent = mode ? 'Latin to Gatscrib' : 'Gatscrib to Latin';
}

const convert = (text: string, mode: boolean) => {
	return mode ? latinToGatscrib(text) : gatscribToLatin(text);
}

setButtonText(mode);

button.onclick = () => {
	mode = !mode;

	setButtonText(mode);

	input.value = output.value;
	output.value = convert(input.value, mode);
}

input.onchange = () => {
	output.value = convert(input.value, mode);
}
