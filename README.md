Medium Text
===========
A rough JavaScript implementation of Medium's typography and typesetting rules as described at:
https://medium.com/@mwichary/death-to-typewriters-technical-supplement-8f3c754626f2

Demo
====
Open medium-text-demo.html in your browser and type in the text area. correct qoutes and dashes will be inserted as you type, and characters outlined in the medium post above will be inserted such as <3 for a heart, and :) for a smiley.

Usage
=====
- include the script
- call MediumText.parse(text, caretIndex, checkAll) as text is typed or pasted into textarea
- parse will return an object containing two properties - text: the resulting updated text, caretOffset: the number of places the caret has moved due to the char replacements (eg the three character --> are replaced with a single → character, so the caret will move back -2 places in the text

Options
=======
parse accepts three parameters:

- text (string) : the text to check - the text in the text area, or text from the clipboard
- caretIndex (number) : the current index of the caret in the text
- checkAll (boolean) : false - text is only checked at the caret (for checking during typing), true - will check the whole string (for checking a block of text from the clipboard)