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
    $('#openHelpButton').click(updateSpecialCharFreqDisp)
    $('#specialCharFreqInput').keyup(validateSpecialCharFreqInput)
    $('#specialFontInput').change(changeSelectedSpecialFont)

})

function getSelectedFont() {
    return $('#specialFontInput').val();
}

function validateSpecialCharFreqInput() {
    var elem = $('#specialCharFreqInput');
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
    $('#main_write').stop().animate({
        'scrollTop': '100000000px'
    }, 'fast', 'swing');
}

function updateSpecialCharFreqDisp() {
    $('#specialCharFreqInput').val(special_font_frequency * 100)
    validateSpecialCharFreqInput();
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
    $('#main_write').append(newSpan);
}

function handleKeyDown(event_jq) {
    var key = event_jq.which;
    var event = event_jq.originalEvent;

    updateScroll();

    // do not process keys if help modal is open
    if ($('#helpModal').hasClass('show')) {
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
        $('#main_write').clear();

    } else if (key == 8) {
        // handle backspace
        // remove last element
        $('#main_write').children().last().remove();
    } else if (key == 13) {
        $('#main_write').append($('<br>'))
    } else if ((key < 48 | key > 90) &
        !special_keys.includes(key) &
        !special_chars.includes(event.key)) {
        // non characters?
        // do nothing
    } else {
        writeToOutput(event);
    }
}