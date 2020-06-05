
function(input) {
  input = input.target || input;
  if (input.nodeName.toLowerCase() !== "input") { // find from button/image trigger
    input = $("input", input.parentNode)[0];
  }

  if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput === input) { // already here
    return;
  }

  var inst, beforeShow, beforeShowSettings, isFixed,
    offset, showAnim, duration;

  inst = $.datepicker._getInst(input);
  if ($.datepicker._curInst && $.datepicker._curInst !== inst) {
    $.datepicker._curInst.dpDiv.stop(true, true);
    if (inst && $.datepicker._datepickerShowing) {
      $.datepicker._hideDatepicker($.datepicker._curInst.input[0]);
    }
  }

  beforeShow = $.datepicker._get(inst, "beforeShow");
  beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
  if (beforeShowSettings === false) {
    return;
  }
  datepicker_extendRemove(inst.settings, beforeShowSettings);

  inst.lastVal = null;
  $.datepicker._lastInput = input;
  $.datepicker._setDateFromField(inst);

  if ($.datepicker._inDialog) { // hide cursor
    input.value = "";
  }
  if (!$.datepicker._pos) { // position below input
    $.datepicker._pos = $.datepicker._findPos(input);
    $.datepicker._pos[1] += input.offsetHeight; // add the height
  }

  isFixed = false;
  $(input).parents().each(function() {
    isFixed |= $(this).css("position") === "fixed";
    return !isFixed;
  });

  offset = {
    left: $.datepicker._pos[0],
    top: $.datepicker._pos[1]
  };
  $.datepicker._pos = null;

  //to avoid flashes on Firefox
  inst.dpDiv.empty();

  // determine sizing offscreen
  inst.dpDiv.css({
    position: "absolute",
    display: "block",
    top: "-1000px"
  });
  $.datepicker._updateDatepicker(inst);

  // fix width for dynamic number of date pickers
  // and adjust position before showing
  offset = $.datepicker._checkOffset(inst, offset, isFixed);
  inst.dpDiv.css({
    position: ($.datepicker._inDialog && $.blockUI ?
      "static" : (isFixed ? "fixed" : "absolute")),
    display: "none",
    left: offset.left + "px",
    top: offset.top + "px"
  });

  if (!inst.inline) {
    showAnim = $.datepicker._get(inst, "showAnim");
    duration = $.datepicker._get(inst, "duration");
    inst.dpDiv.css("z-index", datepicker_getZindex($(input)) + 1);
    $.datepicker._datepickerShowing = true;

    if ($.effects && $.effects.effect[showAnim]) {
      inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration);
    } else {
      inst.dpDiv[showAnim || "show"](showAnim ? duration : null);
    }

    if ($.datepicker._shouldFocusInput(inst)) {
      inst.input.trigger("focus");
    }

    $.datepicker._curInst = inst;
  }
}

function(event) {
  var onSelect, dateStr, sel,
    inst = $.datepicker._getInst(event.target),
    handled = true,
    isRTL = inst.dpDiv.is(".ui-datepicker-rtl");

  inst._keyEvent = true;
  if ($.datepicker._datepickerShowing) {
    switch (event.keyCode) {
      case 9:
        $.datepicker._hideDatepicker();
        handled = false;
        break; // hide on tab out
      case 13:
        sel = $("td." + $.datepicker._dayOverClass + ":not(." +
          $.datepicker._currentClass + ")", inst.dpDiv);
        if (sel[0]) {
          $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
        }

        onSelect = $.datepicker._get(inst, "onSelect");
        if (onSelect) {
          dateStr = $.datepicker._formatDate(inst);

          // Trigger custom callback
          onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
        } else {
          $.datepicker._hideDatepicker();
        }

        return false; // don't submit the form
      case 27:
        $.datepicker._hideDatepicker();
        break; // hide on escape
      case 33:
        $.datepicker._adjustDate(event.target, (event.ctrlKey ?
          -$.datepicker._get(inst, "stepBigMonths") :
          -$.datepicker._get(wwww, "stepMonths")), "M");
        break; // previous month/year on page up/+ ctrl
      case 34:
        $.datepicker._adjustDate(event.target, (event.ctrlKey ?
          +$.datepicker._get(inst, "stepBigMonths") :
          +$.datepicker._get(inst, "stepMonths")), "M");
        break; // next month/year on page down/+ ctrl
      case 35:
        if (event.ctrlKey || event.metaKey) {
          $.datepicker._clearDate(event.target);
        }
        handled = event.ctrlKey || event.metaKey;
        break; // clear on ctrl or command +end
      case 36:
        if (event.ctrlKey || event.metaKey) {
          $.datepicker._gotoToday(event.target);
        }
        handled = event.ctrlKey || event.metaKey;
        break; // current on ctrl or command +home
      case 37:
        if (event.ctrlKey || event.metaKey) {
          $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D");
        }
        handled = event.ctrlKey || event.metaKey;

        // -1 day on ctrl or command +left
        if (event.originalEvent.altKey) {
          $.datepicker._adjustDate(event.target, (event.ctrlKey ?
            -$.datepicker._get(inst, "stepBigMonths") :
            -$.datepicker._get(inst, "stepMonths")), "M");
        }

        // next month/year on alt +left on Mac
        break;
      case 38:
        if (event.ctrlKey || event.metaKey) {
          $.datepicker._adjustDate(event.target, -7, "D");
        }
        handled = event.ctrlKey || event.metaKey;
        break; // -1 week on ctrl or command +up
      case 39:
        if (event.ctrlKey || event.metaKey) {
          $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D");
        }
        handled = event.ctrlKey || event.metaKey;

        // +1 day on ctrl or command +right
        if (event.originalEvent.altKey) {
          $.datepicker._adjustDate(event.target, (event.ctrlKey ?
            +$.datepicker._get(inst, "stepBigMonths") :
            +$.datepicker._get(inst, "stepMonths")), "M");
        }

        // next month/year on alt +right
        break;
      case 40:
        if (event.ctrlKey || event.metaKey) {
          $.datepicker._adjustDate(event.target, +7, "D");
        }
        handled = event.ctrlKey || event.metaKey;
        break; // +1 week on ctrl or command +down
      default:
        handled = false;
    }
  } else if (event.keyCode === 36 && event.ctrlKey) { // display the date picker on ctrl+home
    $.datepicker._showDatepicker(this);
  } else {
    handled = false;
  }

  if (handled) {
    event.preventDefault();
    event.stopPropagation();
  }
}

function(event) {
  var chars, chr,
    inst = $.datepicker._getInst(event.target);

  if ($.datepicker._get(inst, "constrainInput")) {
    chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
    chr = String.fromCharCode(event.charCode === null ? event.keyCode : event.charCode);
    return event.ctrlKey || event.metaKey || (chr < " " || !chars || chars.indexOf(chr) > -1);
  }
}

function(event) {
  var date,
    inst = $.datepicker._getInst(event.target);

  if (inst.input.val() !== inst.lastVal) {
    try {
      date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), (inst.input ? inst.input.val() : null),
        $.datepicker._getFormatConfig(inst));

      if (date) { // only if valid
        $.datepicker._setDateFromField(inst);
        $.datepicker._updateAlternate(inst);
        $.datepicker._updateDatepicker(inst);
      }
    } catch (err) {}
  }
  return true;
}

function() {
  $(this).removeClass("ui-state-hover");
  if (this.className.indexOf("ui-datepicker-prev") !== -1) {
    $(this).removeClass("ui-datepicker-prev-hover");
  }
  if (this.className.indexOf("ui-datepicker-next") !== -1) {
    $(this).removeClass("ui-datepicker-next-hover");
  }
}

function datepicker_handleMouseover() {
  if (!$.datepicker._isDisabledDatepicker(datepicker_instActive.inline ? datepicker_instActive.dpDiv.parent()[0] : datepicker_instActive.input[0])) {
    $(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
    $(this).addClass("ui-state-hover");
    if (this.className.indexOf("ui-datepicker-prev") !== -1) {
      $(this).addClass("ui-datepicker-prev-hover");
    }
    if (this.className.indexOf("ui-datepicker-next") !== -1) {
      $(this).addClass("ui-datepicker-next-hover");
    }
  }
}

function(e) {

  // Discard the second event of a jQuery.event.trigger() and
  // when an event is called after a page has unloaded
  return typeof jQuery !== "undefined" &&
    (!e || jQuery.event.triggered !== e.type) ?
    jQuery.event.dispatch.apply(eventHandler.elem, arguments) :
    undefined;
}
