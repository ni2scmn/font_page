// defines the probability of rendering a character in special font
var special_font_frequency = 0.2;

// var print_prepared = false;

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

window.onkeydown = handleKeyDown;
document.getElementById('openHelpButton').addEventListener('click', updateSpecialCharFreqDisp)
document.getElementById('specialCharFreqInput').addEventListener('keyup', validateSpecialCharFreqInput);
document.getElementById('specialFontInput').addEventListener('change', changeSelectedSpecialFont);

var selectedFont = document.getElementById('specialFontInput').value;

function validateSpecialCharFreqInput() {
    const elem = document.getElementById('specialCharFreqInput');
    var occNonNumeric = elem.value.search(/\D/);
    if (occNonNumeric > -1 || elem.value > 100 || elem.value < 0) {
        elem.classList.add('is-invalid');
        elem.classList.remove('is-valid');
    } else {
        elem.classList.remove('is-invalid');
        elem.classList.add('is-valid');
        special_font_frequency = elem.value / 100;
    }
}

// TODO fix maximum scroll top
function updateScroll() {
    var element = document.getElementById("main_write");
    $('#main_write').stop().animate({
        'scrollTop': '100000000px'
    }, 'fast', 'swing');
}

function updateSpecialCharFreqDisp() {
    document.getElementById('specialCharFreqInput').value = special_font_frequency * 100;
    validateSpecialCharFreqInput();
}

function changeSelectedSpecialFont() {
    selectedFont = document.getElementById('specialFontInput').value;
    document.getElementById('specialFontInput').style.fontFamily = selectedFont;
    var es = document.getElementsByClassName('special-font');
    for (i = 0; i < es.length; i++) {
        es[i].style.fontFamily = selectedFont;
    }
}

function clear_element(elem) {
    elem.innerHTML = '';
}

function writeToOutput(event) {
    var rnd = Math.random();
    var spanElem = document.createElement('span');
    spanElem.textContent = event.key;
    if (rnd <= special_font_frequency) {
        spanElem.className = 'special-font';
        spanElem.style.fontFamily = selectedFont;
    } else {
        spanElem.className = 'normal-font';
    }
    output.appendChild(spanElem);
}

function handleKeyDown(event) {
    key = event.keyCode;

    updateScroll();

    // do not process keys if help modal is open
    if (document.getElementById('helpModal').classList.contains('show')) {
        return;
    }

    if (event.key == "ä" &&
        (event.ctrlKey | event.metaKey)) {
            // TODO disabled until fixed
        // if (!print_prepared) {
        //     document.getElementById('openHelpButton').style.display = 'none';
        //     output.style.top = 'auto';
        //     output.style.transform = 'translate(-50%, 10%)';
        //     print_prepared = true;
        // } else {
        //     document.getElementById('openHelpButton').style.display = null;
        //     output.style.top = null;
        //     output.style.transform = null;
        //     print_prepared = false;
        // }
    } else if (event.key == "ü" &&
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
        writeToOutput(event);
    }
}