var output;
// var input;

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

window.onload = function () {
    output = document.getElementById('main_write');
    // input = document.getElementById('main_input');
    // input.onkeydown = logKey;
    window.onkeydown = logKey;
}

window.onbeforeunload = function() {
    input.value = '';
}

function logKey(event) {
    console.log(event);

    key = event.keyCode;

    if (key == 8) {
        // handle backspace
        output.removeChild(
            output.childNodes[output.childNodes.length-1]
        );
        return;
    } else if (event.key == "ü" && 
                (event.ctrlKey | event.metaKey)) {
        output.innerHTML = '';
        return;
    } else if ((key < 48 | key > 90) &
        !special_keys.includes(key) & 
        !special_chars.includes(event.key)) {
            // non characters?
        return;
    }

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