// defines the probability of rendering a character in special font
var special_font_frequency = 0.2;

var special_keys = [
    8, // backspace
    32 // space
]

var special_chars = [
    ",", ";", ".", ":", "-", "_",
    "<", ">", "^", "°", "´", "`",
    "#", "'", "~", "|", "+", "*",
    "ö", "ä", "ü", "Ö", "Ä", "Ü"
]

var output = document.getElementById('main_write');
window.onkeydown = logKey;

document.getElementById('openHelpButton').addEventListener('click', updateSpecialCharFreqDisp)
document.getElementById('specialCharFreqInput').addEventListener('keyup', validateSpecialCharFreqInput);

function validateSpecialCharFreqInput() {
    const elem = document.getElementById('specialCharFreqInput');
    var occNonNumeric = elem.value.search(/\D/);
    if(occNonNumeric > -1 || elem.value > 100 || elem.value < 0) {
        elem.classList.add('is-invalid');
        elem.classList.remove('is-valid');
    } else {
        elem.classList.remove('is-invalid');
        elem.classList.add('is-valid');
        special_font_frequency = elem.value / 100;
    }
}

function updateSpecialCharFreqDisp() {
    document.getElementById('specialCharFreqInput').value = special_font_frequency * 100;
    validateSpecialCharFreqInput();
}

function clear_element(elem) {
    elem.innerHTML = '';
}

function logKey(event) {
    key = event.keyCode;

    // do not process keys if help modal is open
    if(document.getElementById('helpModal').classList.contains('show')) {
        return;
    }

    if (event.key == "ü" &&
        (event.ctrlKey | event.metaKey)) {
        // reset output
        clear_element(output);

    } else if (key == 8) {
        // handle backspace
        // remove last element
        output.removeChild(
            output.childNodes[output.childNodes.length - 1]
        );
    } else if (key == 13) {
        output.appendChild(
            document.createElement('br')
        );
    } else if ((key < 48 | key > 90) &
        !special_keys.includes(key) &
        !special_chars.includes(event.key)) {
        // non characters?
        // do nothing
    } else {
        var rnd = Math.random();

        var spanElem = document.createElement('span');
        spanElem.textContent = event.key;
        if (rnd <= special_font_frequency) {
            spanElem.className = 'special-font';
        } else {
            spanElem.className = 'normal-font';
        }
        output.appendChild(spanElem);
    }
}