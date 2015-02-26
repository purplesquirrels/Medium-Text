Medium Text
===========
A rough JavaScript implementation of Medium's typography and typesetting rules as described at:
https://medium.com/@mwichary/death-to-typewriters-technical-supplement-8f3c754626f2

Usage
=====
- include the script
- call MediumText.parse(text, caretIndex, checkAll) as text is typed or pasted into textarea

Options
=======
parse accepts three parameters:

text (string) : the text to check - the text in the text area, or text from the clipboard
caretIndex (number) : the current index of the caret in the text
checkAll (boolean) : false - text is only checked at the caret (for checking during typing), true - will check the whole string (for checking a block of text from the clipboard)