rangyinputs
===========

A small cross-browser JavaScript library for obtaining and manipulating selections within &lt;textarea> and &lt;input type="text"> HTML elements.

jQuery rangyinputs: a clone of https://code.google.com/p/rangyinputs/


Introduction
------------

Rangyinputs is a small, cross-browser script for manipulating selections within text inputs and textareas. It is currently available only as a jQuery plug-in.

For manipulating selections and ranges within regular HTML, see Rangyinputs' larger twin project, [Rangy](../Rangy/).


Examples
--------

Imagine a simple textarea such as:

```
&lt;textarea id="test">Foo bar&lt;/textarea>
```

You can get the user's selection using

```
var sel = $("#test").getSelection();
alert(sel.start + ", " + sel.end);
```

To select the word "bar":

```
$("#test").setSelection(4, 7);
```

Other methods are listed below. Example code refers to the example textarea above.


API
---

Rangyinputs provides the following extensions to all jQuery objects wrapping a single text input or textarea.

Note that in IE, the element must have the focus for any of the following methods to work, which can be achieved by calling its focus() method before calling the method.


### getSelection()

Returns an object representing the user selection within the text input or textarea element.

The object returned has the following properties:

- start: The character index of the start position of the selection
- end: The character index of the end position of the selection
- length: The number of characters selected
- text: The selected text

Note that in IE the textarea or text input must have the focus before calling this method. You can ensure this by calling the focus() method of the element (or its jQuery object).

#### Example

```
$("#test").focus();
var sel = $("#test").getSelection();
alert(sel.start + ", " + sel.end);
setSelection(Number start, Number end)
```

Selects the text within the text input or textarea element between the specified start and end character indices.

Returns a reference to the original jQuery object for the element.


#### Example

To select the word "bar":

```
$("#test").setSelection(4, 7);
collapseSelection(Boolean toStart)
```

Collapses the selection to an insertion point (caret) either at the start of the current selection if toStart is true or the end of the current selection otherwise.

Returns a reference to the original jQuery object for the element.


#### Example

To collapse the selection to the start:

```
$("#test").collapseSelection(true);
deleteText(Number start, Number end, Boolean moveSelection)
```

Deletes the text within the text input or textarea element between the specified start and end character indices and optionally places the caret at the position where the deleted text had been if moveSelection is true.

Returns a reference to the original jQuery object for the element.


#### Example

To delete the word "foo" from the example and place the caret where "foo" had been:

```
$("#test").deleteText(0, 3, true);
deleteSelectedText()
```

Deletes the currently selected text within the text input or textarea element and places the caret at the position where the deleted text had been.

Returns a reference to the original jQuery object for the element.


#### Example

```
$("#test").deleteSelectedText();
extractSelectedText()
```

Deletes the currently selected text within the text input or textarea element, places the caret at the position where the deleted text had been and returns the text that was deleted.


#### Example

```
var extracted = $("#test").extractSelectedText();
alert(extracted);
insertText(String text, Number pos, Boolean moveSelection)
```

Inserts the specified text at the specified character position within the text input or textarea element and optionally places the caret at the end of the inserted text if moveSelection is true.

Returns a reference to the original jQuery object for the element.


#### Example

To insert the word "baz" between "foo" and "bar" and place the caret immediately after "baz":

```
$("#test").insertText(" baz", 3, true);
replaceSelectedText(String text)
```

Replaces the currently selected text in the text input or textarea element with the specified text and places the caret at the end of the inserted text.

Returns a reference to the original jQuery object for the element.


#### Example

To replace the selection with the word "baz" (or insert "baz" at the the caret position if no text is selected):

```
$("#test").replaceSelectedText("baz");
surroundSelectedText(String textBefore, String textAfter)
```

Surrounds the currently selected text in the text input or textarea element with the specified pieces of text and moves the selection to encompass the text that was previously selected.

Returns a reference to the original jQuery object for the element.


#### Example

To surround the selection with HTML &lt;b> tags:

```
$("#test").surroundSelectedText("&lt;b>", "&lt;/b>");
```
