var output;
var input;

window.onload = function () {
    output = document.getElementById('main_write');
    input = document.getElementById('main_input');
    input.onkeydown = logKey;
}

window.onbeforeunload = function() {
    input.value = '';
}

function logKey(event) {
    if (event.keyCode == 8) {
        // handle backspace
        output.removeChild(
            output.childNodes[output.childNodes.length-1]
        );
        return;
    } else if ((event.keyCode < 48 | event.keyCode > 90) &
        event.keyCode != 32) {
            // non characters?
        return;
    }

    var rnd = Math.random();

    var spanElem = document.createElement('span');
    spanElem.textContent = event.key;
    if (rnd > 0.5) {
        spanElem.className = 'special-font';
    } else {
        spanElem.className = 'normal-font';
    }
    output.appendChild(spanElem);

}