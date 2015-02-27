Medium Text
===========
A rough JavaScript implementation of Medium's typography and typesetting rules as described at
[Death to typewriters](https://medium.com/@mwichary/death-to-typewriters-technical-supplement-8f3c754626f2 "Death to typewriters")

Demo
---
Open medium-text-demo.html in your browser and type in the text area. 

Correct quotes and dashes will be inserted as you type, and characters outlined in the medium post above will be inserted. For example, <3 will be replaced with ❤, --> will be replaced with →, and :) will be replaced with ☺.

Usage
-----
1. include the script
2. call `MediumText.parse(text, caretIndex, checkAll)` as text is typed or pasted into textarea

Options
-------
*parse* accepts three parameters:

- text *(string)* : the text to check - the text in the text area, or text from the clipboard
- caretIndex *(number)* : the current index of the caret in the text
- checkAll *(boolean)* : **false** - text is only checked at the caret (for checking during typing), **true** - will check the whole string (for checking a block of text from the clipboard)

*parse* returns an object containing two properties

`{
  text: "resulting text",
  caretOffset: 0
}`

- text *(string)* : the resulting updated text
- caretOffset *(number)* : the number of places the caret has moved due to the char replacements (eg the three characters *[hyphen][hyphen][greater than]* are replaced with a single → character, so the caret will move back -2 places in the text
