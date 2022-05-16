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

$(document).ready(function() {
    $(document).keydown(handleKeyDown);
    $('#open-help-button').click(updateSpecialCharFreqDisp)
    $('#special-char-freq-input').keyup(validateSpecialCharFreqInput)
    $('#special-font-input').change(changeSelectedSpecialFont)

})

function getSelectedFont() {
    return $('#special-font-input').val();
}

function validateSpecialCharFreqInput() {
    var elem = $('#special-char-freq-input');
    var occNonNumeric = elem.val().search(/\D/);
    if (occNonNumeric > -1 || elem.val() > 100 || elem.val() < 0) {
        elem.addClass('is-invalid');
        elem.removeClass('is-valid');
    } else {
        elem.removeClass('is-invalid');
        elem.addClass('is-valid');
        special_font_frequency = elem.val() / 100;
    }
}

// // TODO fix maximum scroll top
function updateScroll() {
    $('#main-write').stop().animate({
        'scrollTop': '100000000px'
    }, 'fast', 'swing');
}

function updateSpecialCharFreqDisp() {
    $('#special-char-freq-input').val(special_font_frequency * 100)
    validatespecial-char-freq-input();
}

function changeSelectedSpecialFont() {
    var selectedFont = getSelectedFont();
    $('#specialFontInput').css('font-family', selectedFont);
    $('.special-font').css('font-family', selectedFont);
}

function writeToOutput(event) {
    var selectedFont = getSelectedFont();
    var rnd = Math.random();
    var newSpan = $('<span></span>')
    .text(event.key)

    if (rnd <= special_font_frequency) {
        newSpan.addClass('special-font');
        newSpan.css('font-family', selectedFont);
    } else {
        newSpan.addClass('normal-font');
    }
    $('#main-write').append(newSpan);
}

function handleKeyDown(event_jq) {
    var key = event_jq.which;
    var event = event_jq.originalEvent;

    updateScroll();

    // do not process keys if help modal is open
    if ($('#help-modal').hasClass('show')) {
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
        $('#main-write').empty();

    } else if (key == 8) {
        // handle backspace
        // remove last element
        $('#main-write').children().last().remove();
    } else if (key == 13) {
        $('#main-write').append($('<br>'))
    } else if ((key < 48 | key > 90) &
        !special_keys.includes(key) &
        !special_chars.includes(event.key)) {
        // non characters?
        // do nothing
    } else {
        writeToOutput(event);
    }
}