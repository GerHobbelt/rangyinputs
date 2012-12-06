/**
 * @license Rangy Text Inputs, a cross-browser textarea and text input library plug-in for jQuery.
 * http://code.google.com/p/rangyinputs/
 *
 * Depends on jQuery 1.0 or later.
 *
 * Related project: Rangy, a cross-browser JavaScript range and selection library
 * http://code.google.com/p/rangyinputs/
 *
 * Copyright %%build:year%%, Tim Down
 * Licensed under the MIT license.
 * Version: %%build:version%%
 * Build date: %%build:date%%
 */
(function($) {
    $(document).ready(function() {
        if (!$.fn.rangyInputs) {
            if (window.console && window.console.log) {
                window.console.log("The RangyInputs indentation plug-in depends on the base RangyInputs jQuery plug-in");
            }
        }

        // Test to see what character(s) is/are used for new lines in textareas in the current browser
        var testTextArea = document.createElement("textarea");
        document.body.appendChild(testTextArea);
        testTextArea.value = "1\r\n2";
        var newLine = testTextArea.value.match(/\r\n|\n|\r/)[0], newLineLen = newLine.length;
        document.body.removeChild(testTextArea);

        function prepareToIndentOrOutdent(el, sel) {
            var val = el.value, firstNewLineIndex = val.indexOf(newLine);
            if (firstNewLineIndex > -1) {
                var valBeforeSel = val.slice(0, sel.start);
                var valToMutateStart, valToMutateEnd, valBefore, valAfter;

                if (firstNewLineIndex >= sel.start) {
                    valToMutateStart = 0;
                    valBefore = "";
                } else {
                    var lastNewLineBeforeSelIndex = valBeforeSel.lastIndexOf(newLine);
                    valToMutateStart = lastNewLineBeforeSelIndex + newLineLen;
                    valBefore = val.slice(0, valToMutateStart);
                }

                var firstNewLineAfterSelIndex = val.indexOf(newLine, sel.end - newLineLen);
                if (firstNewLineAfterSelIndex > -1) {
                    valToMutateEnd = firstNewLineAfterSelIndex;
                    valAfter = val.slice(firstNewLineAfterSelIndex + newLineLen);
                } else {
                    valToMutateEnd = val.length;
                    valAfter = "";
                }

                return {
                    val: val,
                    valToMutateStart: valToMutateStart,
                    valToMutateEnd: valToMutateEnd,
                    valToMutate: val.slice(valToMutateStart, valToMutateEnd),
                    valBefore: valBefore,
                    valAfter: valAfter
                }
            }
            return null;
        }

        function indentSelection(el, sel, indentation) {
            var info = prepareToIndentOrOutdent(el, sel);
            if (info) {
                var lines = info.valToMutate.split(newLine);
                var indented = indentation + lines.join(newLine + indentation) + newLine;
                var newSelStart = info.valToMutateStart == sel.start ? sel.start : sel.start + indentation.length;
                var newSelEnd = sel.end + lines.length * indentation.length;

                el.value = info.valBefore + indented + info.valAfter;
                $.fn.rangyInputs.setSelection(el, newSelStart, newSelEnd);
            }
        }

        function outdentSelection(el, sel, indentation) {
            var info = prepareToIndentOrOutdent(el, sel);
            if (info) {
                var lines = info.valToMutate.split(newLine);
                var outdentedLines = [], indentationLength = indentation.length, charsRemovedCount = 0, firstLineCharsRemovedCount;
                for (var i = 0, len = lines.length, lineCharsToRemoveCount; i < len; ++i) {
                    lineCharsToRemoveCount = Math.min(lines[i].match(/^\s*/)[0].length, indentationLength);
                    if (i == 0) {
                        firstLineCharsRemovedCount = lineCharsToRemoveCount;
                    }
                    charsRemovedCount += lineCharsToRemoveCount;
                    outdentedLines[i] = lines[i].slice(lineCharsToRemoveCount) + newLine;
                }
                var outdented = outdentedLines.join("");
                var newSelStart = Math.max(info.valToMutateStart == sel.start ? sel.start : sel.start - firstLineCharsRemovedCount, info.valToMutateStart);
                var newSelEnd = Math.max(sel.end - charsRemovedCount, info.valToMutateStart);

                el.value = info.valBefore + outdented + info.valAfter;
                $.fn.rangyInputs.setSelection(el, newSelStart, newSelEnd);
            }
        }

        function enableTabIndentation(el, indentation) {
            var $el = $(el);

            $el.keydown(function(e) {
                if (e.which == 9) {
                    var sel = $el.getSelection();
                    if (e.shiftKey) {
                        outdentSelection($el[0], sel, indentation);
                    } else if (sel.length) {
                        indentSelection($el[0], sel, indentation);
                    } else {
                        $el.insertText("\t", sel.end, true);
                    }
                    return false;
                }
            });

            // For Opera, which only allows suppression of keypress events, not keydown
            $el.keypress(function(e) {
                if (e.which == 9) {
                    return false;
                }
            });
        }

        $.fn.enableTabIndentation = function(indentation) {
            if (this.jquery) {
                this.each(function() {
                    if (this.nodeType == 1) {
                        var nodeName = this.nodeName.toLowerCase();
                        if (nodeName == "textarea" || (nodeName == "input" && this.type == "text")) {
                            enableTabIndentation(this, indentation || "  ");
                        }
                    }
                })
            }
            return this;
        }



    });

})(jQuery);