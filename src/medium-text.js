/*

test:

<-- --> :) :( <3 abc-abc abc - abc -- abc '78 'abc' "abc" 45' 45" 6-5 abc

*/
;(function(window) {

    function parseInput(text, checkIndex, checkAll) {
        if (checkAll) {
            var result, i;

            for (i = 0; i < text.length; ++i) {
                result = parseInput(text, i, false);

                text = result.text;
                i += result.caretOffset;
            }

            return {
                text: text,
                caretOffset: text.length
            }
        }

        var caret = checkIndex;
        var char = text.charAt(caret-1);
        var caretOffset = 0;
        var charMinus = text.substring(caret, caret-5).split("").reverse();

        // On inserting hyphen
        if (char == "-") {
            // If the previous character is a hyphen, and the one before that is a less-than (<), turn them all into a left arrow glyph (←).
            if (charMinus[1] == "-" && charMinus[2] == "<") {
                text = text.substring(0, caret-3) + "←" + text.substring(caret);
                caretOffset = -2;
            }
            // If the previous character is a hyphen, simulate inserting an em dash
            else if (charMinus[1] == "-") {
                if (charMinus[2] == " " || caret-3 < 0) {
                    text = text.substring(0, caret-2) + "— " + text.substring(caret); // em dash
                    caretOffset = 0;
                } else {
                    text = text.substring(0, caret-2) + " — " + text.substring(caret); // em dash
                    caretOffset = 1;
                }
            }
        }
        // On inserting an em dash
        /*else if (char == "—") // THIS IS CAUSING BACKSPACE NO TO WORK WHEN ENCOUNTERING AN EM DASH
        {
            if (text.charAt(caret-2) == " " || caret-2 < 0)
            {
                text = text.substring(0, caret-2) + "— " + text.substring(caret); // em dash
                caretOffset = 0;
            }
            else
            {
                text = text.substring(0, caret-2) + " — " + text.substring(caret); // em dash
                caretOffset = 1;
            }
        }*/
        //On inserting a space
        else if (char == " ") {
            // If the previous character is a space or a non-breakable space, don’t insert a new one
            if (charMinus[1] == " " || charMinus[1] == " " || charMinus[1] ==  " ") {// " " non-breaking space
                // dont allow duplicate space
                text = text.substring(0, caret-1) + text.substring(caret);
                caretOffset = -1;
            }
            // If the previous character is a hyphen (-) or an en dash (–), and the one before is a space (or non-breakable space), replace with an em dash.
            else if ((charMinus[1] == "-" || charMinus[1] == "–")
                    && (charMinus[2] == " " || charMinus[2] == " ")) {
                text = text.substring(0, caret-2) + "— " + text.substring(caret); // em dash
                caretOffset = 0;
            }
        }
        // On inserting a digit
        else if (char.match(/\d/) || char == "½" || char == "¼" || char == "¾") {
            // If the previous character is a hyphen, and the one before that is a digit, change the hyphen to be an en dash
            if (charMinus[1] == "-" && charMinus[2].match(/\d/)) {
                text = text.substring(0, caret-2) + "–" + char + text.substring(caret); // en dash
                caretOffset = 0;
            }
            // If the previous character is a space, the one before is an em dash, the one before is a space,
            else if (charMinus[1] == " " && charMinus[2] == "—" && charMinus[3] == " ") {
                text = text.substring(0, caret-4) + "–" + char + text.substring(caret); // en dash
                caretOffset = -2;
            }

            // On inserting a digit 3
            if (char == "3") {
                // If the previous character was a less-than sign (<), it is removed and heart (❤) is inserted instead.
                if (charMinus[1] == "<") {
                    text = text.substring(0, caret-2) + "❤" + text.substring(caret);
                    caretOffset = -1;
                }
            }
        } else if (char == "'") {
            // If the previous character is empty (doesn’t exist), (, [, {, space, or non-breakable space, we insert an opening quote (‘).
            if (caret-2 < 0 || charMinus[1] == "(" ||
                charMinus[1] == "[" || charMinus[1] == "{" ||
                charMinus[1] == " " || charMinus[1] == " ") { // space on non breaking space
                text = text.substring(0, caret-1) + "‘" + text.substring(caret); 
                caretOffset = 0;
            }
            // If the previous character is a digit, keep the original double quote/prime (= feet).
            else if (charMinus[1].match(/\d/) != null) {
                text = text.substring(0, caret-1) + "′" + text.substring(caret);
                caretOffset = 0;
            }
            // Otherwise, use a closing quote (’).
            else {
                text = text.substring(0, caret-1) + "’" + text.substring(caret);
                caretOffset = 0;
            }
        }
        // On inserting a double quote (″)
        else if (char == '"') {
            // If the previous character is empty (doesn’t exist), (, [, {, space, or non-breakable space, we insert an opening quote (“).
            if (caret-2 < 0 || charMinus[1] == "(" ||
                charMinus[1] == "[" || charMinus[1] == "{" ||
                charMinus[1] == " " || charMinus[1] == " ") { // space on non breaking space
                text = text.substring(0, caret-1) + "“" + text.substring(caret); 
                caretOffset = 0;
            }
            // If the previous character is a digit, keep the original double quote/prime (= inches).
            else if (charMinus[1].match(/\d/) != null) {
                text = text.substring(0, caret-1) + "″" + text.substring(caret);
                caretOffset = 0;
            }
            // Otherwise, use a closing quote (”).
            else {
                text = text.substring(0, caret-1) + "”" + text.substring(caret);
                caretOffset = 0;
            }
        }
        // On inserting a period
        else if (char == ".") {
            // If the two characters before were also periods, they are removed, and ellipsis (…) is inserted instead.
            if (charMinus[1] == "." && charMinus[2] == ".") {
                text = text.substring(0, caret-3) + "…" + text.substring(caret);
                caretOffset = -2;
            }
        }
        // On inserting a right paren
        else if (char == ")") {
            // If the previous character is a colon ( : ), it’s removed, and a smiley face (☺) is inserted instead.
            if (charMinus[1] == ":") {
                text = text.substring(0, caret-2) + "☺" + text.substring(caret);
                caretOffset = -1;
            }
        }
        // On inserting a left paren
        else if (char == "(") {
            // If the previous character is a colon ( : ), it’s removed, and a frowny face (☹) is inserted instead.
            if (charMinus[1] == ":") {
                text = text.substring(0, caret-2) + "☹" + text.substring(caret);
                caretOffset = -1;
            }
        }
        // On inserting greater-than
        else if (char == ">") {
            // If the previous character is the em dash (substituted from two hyphens), then it’s removed and a right arrow (→) is inserted instead.
            if (charMinus[1] == " " && charMinus[2] == "—") {
                text = text.substring(0, caret-3) + "→" + text.substring(caret);
                caretOffset = -2;
            }
        }

        // [space][em dash][space] is changed to [hair space][em dash][hair space].
        text = text.replace(/([ ]{1})([—]{1})([ ]{1})/g, " $2 ")

        // [space][punctuation] is replaced by [non-breakable space][punctuation] This change prevents punctuation from traveling alone to the next line
        text = text.replace(/([ ]{1})([\!\?\:\;\.\,\‽\»]{1})/g, " $2");

        // [punctuation][space] is replaced by [punctuation][non-breakable space] for the same reasons. For this feature, punctuation is defined as: « ¿ ¡
        text = text.replace(/([\«\¿\¡]{1})([ ]{1})/g, "$1 ");

        // [space][‘][digit][digit] is replaced with [space][’][digit][digit] for proper formatting of year shorthand… (“This was a year ’90.”)
        text = text.replace(/([ ]{1})(‘{1})(\d{2})/g, "$1’$3");

        return {
            text: text,
            caretOffset: caretOffset
        }
    }
    
    window.MediumText = {
        parse: parseInput   
    };
}(window));