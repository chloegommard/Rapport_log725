(window.CodeMirror = (function () {
  "use strict";
  function a(e, f) {
    if (!(this instanceof a)) return new a(e, f);
    this.options = f = f || {};
    for (var h in _d)
      !f.hasOwnProperty(h) && _d.hasOwnProperty(h) && (f[h] = _d[h]);
    l(f);
    var j = (this.display = b(e));
    (j.wrapper.CodeMirror = this),
      i(this),
      f.autofocus && !Rd && _(this),
      (this.view = c(new Dc([new Cc([rc("", null, R(j))])]))),
      (this.nextOpId = 0),
      d(this),
      g(this),
      f.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"),
      this.setValue(f.value || ""),
      Ed && setTimeout(ed($, this, !0), 20),
      (this.view.history = Kc()),
      bb(this);
    var k;
    try {
      k = document.activeElement == j.input;
    } catch (m) {}
    k || (f.autofocus && !Rd) ? setTimeout(ed(rb, this), 20) : sb(this),
      V(this, function () {
        for (var a in $d) $d.propertyIsEnumerable(a) && $d[a](this, f[a], ae);
        for (var b = 0; b < ee.length; ++b) ee[b](this);
      })();
  }
  function b(a) {
    var b = {},
      c = (b.input = hd(
        "textarea",
        null,
        null,
        "position: absolute; padding: 0; width: 1px; height: 1em; outline: none;",
      ));
    c.setAttribute("wrap", "off"),
      c.setAttribute("autocorrect", "off"),
      c.setAttribute("autocapitalize", "off"),
      (b.inputDiv = hd(
        "div",
        [c],
        null,
        "overflow: hidden; position: relative; width: 3px; height: 0px;",
      )),
      (b.scrollbarH = hd(
        "div",
        [hd("div", null, null, "height: 1px")],
        "CodeMirror-hscrollbar",
      )),
      (b.scrollbarV = hd(
        "div",
        [hd("div", null, null, "width: 1px")],
        "CodeMirror-vscrollbar",
      )),
      (b.scrollbarFiller = hd("div", null, "CodeMirror-scrollbar-filler")),
      (b.lineDiv = hd("div")),
      (b.selectionDiv = hd(
        "div",
        null,
        null,
        "position: relative; z-index: 1",
      )),
      (b.cursor = hd("pre", " ", "CodeMirror-cursor")),
      (b.otherCursor = hd(
        "pre",
        " ",
        "CodeMirror-cursor CodeMirror-secondarycursor",
      )),
      (b.measure = hd("div", null, "CodeMirror-measure")),
      (b.lineSpace = hd(
        "div",
        [b.measure, b.selectionDiv, b.lineDiv, b.cursor, b.otherCursor],
        null,
        "position: relative; outline: none",
      )),
      (b.mover = hd(
        "div",
        [hd("div", [b.lineSpace], "CodeMirror-lines")],
        null,
        "position: relative",
      )),
      (b.sizer = hd("div", [b.mover], "CodeMirror-sizer")),
      (b.heightForcer = hd(
        "div",
        " ",
        null,
        "position: absolute; height: " + je + "px",
      )),
      (b.gutters = hd("div", null, "CodeMirror-gutters")),
      (b.lineGutter = null);
    var d = hd(
      "div",
      [b.sizer, b.heightForcer, b.gutters],
      null,
      "position: relative; min-height: 100%",
    );
    return (
      (b.scroller = hd("div", [d], "CodeMirror-scroll")),
      b.scroller.setAttribute("tabIndex", "-1"),
      (b.wrapper = hd(
        "div",
        [b.inputDiv, b.scrollbarH, b.scrollbarV, b.scrollbarFiller, b.scroller],
        "CodeMirror",
      )),
      Fd &&
        ((b.gutters.style.zIndex = -1), (b.scroller.style.paddingRight = 0)),
      a.appendChild ? a.appendChild(b.wrapper) : a(b.wrapper),
      Qd && (c.style.width = "0px"),
      Hd || (b.scroller.draggable = !0),
      Md
        ? ((b.inputDiv.style.height = "1px"),
          (b.inputDiv.style.position = "absolute"))
        : Fd &&
          (b.scrollbarH.style.minWidth = b.scrollbarV.style.minWidth = "18px"),
      (b.viewOffset = b.showingFrom = b.showingTo = b.lastSizeC = 0),
      (b.lineNumWidth = b.lineNumInnerWidth = b.lineNumChars = null),
      (b.prevInput = ""),
      (b.alignWidgets = !1),
      (b.pollingFast = !1),
      (b.poll = new Zc()),
      (b.draggingText = !1),
      (b.cachedCharWidth = b.cachedTextHeight = null),
      (b.measureLineCache = []),
      (b.measureLineCachePos = 0),
      (b.inaccurateSelection = !1),
      (b.pasteIncoming = !1),
      b
    );
  }
  function c(a) {
    var b = { line: 0, ch: 0 };
    return {
      doc: a,
      frontier: 0,
      highlight: new Zc(),
      sel: { from: b, to: b, head: b, anchor: b, shift: !1, extend: !1 },
      scrollTop: 0,
      scrollLeft: 0,
      overwrite: !1,
      focused: !1,
      maxLine: Ec(a, 0),
      maxLineLength: 0,
      maxLineChanged: !1,
      suppressEdits: !1,
      goalColumn: null,
      cantEdit: !1,
      keyMaps: [],
    };
  }
  function d(b) {
    var c = b.view.doc;
    (b.view.mode = a.getMode(b.options, b.options.mode)),
      c.iter(0, c.size, function (a) {
        a.stateAfter = null;
      }),
      (b.view.frontier = 0),
      C(b, 100);
  }
  function e(a) {
    var b = a.view.doc,
      c = R(a.display);
    if (a.options.lineWrapping) {
      a.display.wrapper.className += " CodeMirror-wrap";
      var d = a.display.scroller.clientWidth / S(a.display) - 3;
      b.iter(0, b.size, function (a) {
        if (0 != a.height) {
          var b = Math.ceil(a.text.length / d) || 1;
          1 != b && Fc(a, b * c);
        }
      }),
        (a.display.sizer.style.minWidth = "");
    } else
      (a.display.wrapper.className = a.display.wrapper.className.replace(
        " CodeMirror-wrap",
        "",
      )),
        k(a.view),
        b.iter(0, b.size, function (a) {
          0 != a.height && Fc(a, c);
        });
    W(a, 0, b.size),
      L(a),
      setTimeout(function () {
        m(a.display, a.view.doc.height);
      }, 100);
  }
  function f(a) {
    var b = ge[a.options.keyMap].style;
    a.display.wrapper.className =
      a.display.wrapper.className.replace(/\s*cm-keymap-\S+/g, "") +
      (b ? " cm-keymap-" + b : "");
  }
  function g(a) {
    (a.display.wrapper.className =
      a.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") +
      a.options.theme.replace(/(^|\s)\s*/g, " cm-s-")),
      L(a);
  }
  function h(a) {
    i(a), s(a, !0);
  }
  function i(a) {
    var b = a.display.gutters,
      c = a.options.gutters;
    id(b);
    for (var d = 0; d < c.length; ++d) {
      var e = c[d],
        f = b.appendChild(hd("div", null, "CodeMirror-gutter " + e));
      "CodeMirror-linenumbers" == e &&
        ((a.display.lineGutter = f),
        (f.style.width = (a.display.lineNumWidth || 1) + "px"));
    }
    b.style.display = d ? "" : "none";
  }
  function j(a, b) {
    if (0 == b.height) return 0;
    for (var c, d = b.text.length, e = b; (c = hc(e)); ) {
      var f = c.find();
      (e = Ec(a, f.from.line)), (d += f.from.ch - f.to.ch);
    }
    for (e = b; (c = ic(e)); ) {
      var f = c.find();
      (d -= e.text.length - f.from.ch),
        (e = Ec(a, f.to.line)),
        (d += e.text.length - f.to.ch);
    }
    return d;
  }
  function k(a) {
    (a.maxLine = Ec(a.doc, 0)),
      (a.maxLineLength = j(a.doc, a.maxLine)),
      (a.maxLineChanged = !0),
      a.doc.iter(1, a.doc.size, function (b) {
        var c = j(a.doc, b);
        c > a.maxLineLength && ((a.maxLineLength = c), (a.maxLine = b));
      });
  }
  function l(a) {
    for (var b = !1, c = 0; c < a.gutters.length; ++c)
      "CodeMirror-linenumbers" == a.gutters[c] &&
        (a.lineNumbers ? (b = !0) : a.gutters.splice(c--, 1));
    !b && a.lineNumbers && a.gutters.push("CodeMirror-linenumbers");
  }
  function m(a, b) {
    var c = b + 2 * G(a);
    a.sizer.style.minHeight = a.heightForcer.style.top = c + "px";
    var d = Math.max(c, a.scroller.scrollHeight),
      e = a.scroller.scrollWidth > a.scroller.clientWidth,
      f = d > a.scroller.clientHeight;
    f
      ? ((a.scrollbarV.style.display = "block"),
        (a.scrollbarV.style.bottom = e ? ld(a.measure) + "px" : "0"),
        (a.scrollbarV.firstChild.style.height =
          d - a.scroller.clientHeight + a.scrollbarV.clientHeight + "px"))
      : (a.scrollbarV.style.display = ""),
      e
        ? ((a.scrollbarH.style.display = "block"),
          (a.scrollbarH.style.right = f ? ld(a.measure) + "px" : "0"),
          (a.scrollbarH.firstChild.style.width =
            a.scroller.scrollWidth -
            a.scroller.clientWidth +
            a.scrollbarH.clientWidth +
            "px"))
        : (a.scrollbarH.style.display = ""),
      e && f
        ? ((a.scrollbarFiller.style.display = "block"),
          (a.scrollbarFiller.style.height = a.scrollbarFiller.style.width =
            ld(a.measure) + "px"))
        : (a.scrollbarFiller.style.display = ""),
      Nd &&
        0 === ld(a.measure) &&
        (a.scrollbarV.style.minWidth = a.scrollbarH.style.minHeight =
          Od ? "18px" : "12px");
  }
  function n(a, b, c) {
    var d = a.scroller.scrollTop,
      e = a.wrapper.clientHeight;
    "number" == typeof c ? (d = c) : c && ((d = c.top), (e = c.bottom - c.top)),
      (d = Math.floor(d - G(a)));
    var f = Math.ceil(d + e);
    return { from: Hc(b, d), to: Hc(b, f) };
  }
  function o(a) {
    var b = a.display;
    if (b.alignWidgets || b.gutters.firstChild) {
      for (
        var c = r(b) - b.scroller.scrollLeft + a.view.scrollLeft,
          d = b.gutters.offsetWidth,
          e = c + "px",
          f = b.lineDiv.firstChild;
        f;
        f = f.nextSibling
      )
        if (f.alignable)
          for (var g = 0, h = f.alignable; g < h.length; ++g)
            h[g].style.left = e;
      b.gutters.style.left = c + d + "px";
    }
  }
  function p(a) {
    if (!a.options.lineNumbers) return !1;
    var b = a.view.doc,
      c = q(a.options, b.size - 1),
      d = a.display;
    if (c.length != d.lineNumChars) {
      var e = d.measure.appendChild(
          hd(
            "div",
            [hd("div", c)],
            "CodeMirror-linenumber CodeMirror-gutter-elt",
          ),
        ),
        f = e.firstChild.offsetWidth,
        g = e.offsetWidth - f;
      return (
        (d.lineGutter.style.width = ""),
        (d.lineNumInnerWidth = Math.max(f, d.lineGutter.offsetWidth - g)),
        (d.lineNumWidth = d.lineNumInnerWidth + g),
        (d.lineNumChars = d.lineNumInnerWidth ? c.length : -1),
        (d.lineGutter.style.width = d.lineNumWidth + "px"),
        !0
      );
    }
    return !1;
  }
  function q(a, b) {
    return String(a.lineNumberFormatter(b + a.firstLineNumber));
  }
  function r(a) {
    return (
      a.scroller.getBoundingClientRect().left -
      a.sizer.getBoundingClientRect().left
    );
  }
  function s(a, b, c) {
    var d = a.display.showingFrom,
      e = a.display.showingTo,
      f = t(a, b, c);
    return (
      f &&
        (Xc(a, a, "update", a),
        (a.display.showingFrom != d || a.display.showingTo != e) &&
          Xc(
            a,
            a,
            "viewportChange",
            a,
            a.display.showingFrom,
            a.display.showingTo,
          )),
      y(a),
      m(a.display, a.view.doc.height),
      f
    );
  }
  function t(a, b, c) {
    var d = a.display,
      e = a.view.doc;
    if (!d.wrapper.clientWidth)
      return (d.showingFrom = d.showingTo = d.viewOffset = 0), void 0;
    var f = n(d, e, c);
    if (
      !(
        b !== !0 &&
        0 == b.length &&
        f.from > d.showingFrom &&
        f.to < d.showingTo
      )
    ) {
      if (
        (b && p(a) && (b = !0),
        (d.sizer.style.marginLeft = d.scrollbarH.style.left =
          d.gutters.offsetWidth + "px"),
        b !== !0 && Ud)
      )
        for (var g = 0; g < b.length; ++g)
          for (var h, i = b[g]; (h = hc(Ec(e, i.from))); ) {
            var j = h.find().from.line;
            i.diff && (i.diff -= i.from - j), (i.from = j);
          }
      var k = b === !0 ? 0 : 1 / 0;
      if (a.options.lineNumbers && b && b !== !0)
        for (var g = 0; g < b.length; ++g)
          if (b[g].diff) {
            k = b[g].from;
            break;
          }
      var j = Math.max(f.from - a.options.viewportMargin, 0),
        l = Math.min(e.size, f.to + a.options.viewportMargin);
      if (
        (d.showingFrom < j && j - d.showingFrom < 20 && (j = d.showingFrom),
        d.showingTo > l &&
          d.showingTo - l < 20 &&
          (l = Math.min(e.size, d.showingTo)),
        Ud)
      )
        for (j = Gc(jc(e, Ec(e, j))); l < e.size && kc(Ec(e, l)); ) ++l;
      for (
        var m =
            b === !0 ? [] : u([{ from: d.showingFrom, to: d.showingTo }], b),
          o = 0,
          g = 0;
        g < m.length;
        ++g
      ) {
        var q = m[g];
        q.from < j && (q.from = j),
          q.to > l && (q.to = l),
          q.from >= q.to ? m.splice(g--, 1) : (o += q.to - q.from);
      }
      if (o != l - j || j != d.showingFrom || l != d.showingTo) {
        m.sort(function (a, b) {
          return a.from - b.from;
        }),
          0.7 * (l - j) > o && (d.lineDiv.style.display = "none"),
          w(a, j, l, m, k),
          (d.lineDiv.style.display = "");
        var r =
          j != d.showingFrom ||
          l != d.showingTo ||
          d.lastSizeC != d.wrapper.clientHeight;
        r && (d.lastSizeC = d.wrapper.clientHeight),
          (d.showingFrom = j),
          (d.showingTo = l),
          C(a, 100);
        for (
          var s, t = d.lineDiv.offsetTop, v = d.lineDiv.firstChild;
          v;
          v = v.nextSibling
        )
          if (v.lineObj) {
            if (Fd) {
              var x = v.offsetTop + v.offsetHeight;
              (s = x - t), (t = x);
            } else {
              var y = v.getBoundingClientRect();
              s = y.bottom - y.top;
            }
            var z = v.lineObj.height - s;
            2 > s && (s = R(d)), (z > 0.001 || -0.001 > z) && Fc(v.lineObj, s);
          }
        return (
          (d.viewOffset = Ic(a, Ec(e, j))),
          (d.mover.style.top = d.viewOffset + "px"),
          !0
        );
      }
    }
  }
  function u(a, b) {
    for (var c = 0, d = b.length || 0; d > c; ++c) {
      for (
        var e = b[c], f = [], g = e.diff || 0, h = 0, i = a.length;
        i > h;
        ++h
      ) {
        var j = a[h];
        e.to <= j.from && e.diff
          ? f.push({ from: j.from + g, to: j.to + g })
          : e.to <= j.from || e.from >= j.to
            ? f.push(j)
            : (e.from > j.from && f.push({ from: j.from, to: e.from }),
              e.to < j.to && f.push({ from: e.to + g, to: j.to + g }));
      }
      a = f;
    }
    return a;
  }
  function v(a) {
    for (
      var b = a.display, c = {}, d = {}, e = b.gutters.firstChild, f = 0;
      e;
      e = e.nextSibling, ++f
    )
      (c[a.options.gutters[f]] = e.offsetLeft),
        (d[a.options.gutters[f]] = e.offsetWidth);
    return {
      fixedPos: r(b),
      gutterTotalWidth: b.gutters.offsetWidth,
      gutterLeft: c,
      gutterWidth: d,
      wrapperWidth: b.wrapper.clientWidth,
    };
  }
  function w(a, b, c, d, e) {
    function f(b) {
      var c = b.nextSibling;
      return (
        Hd && Sd && a.display.currentWheelTarget == b
          ? ((b.style.display = "none"), (b.lineObj = null))
          : j.removeChild(b),
        c
      );
    }
    var g = v(a),
      h = a.display,
      i = a.options.lineNumbers;
    d.length || Ed || (Hd && a.display.currentWheelTarget) || id(h.lineDiv);
    var j = h.lineDiv,
      k = j.firstChild,
      l = d.shift(),
      m = b;
    for (
      a.view.doc.iter(b, c, function (b) {
        if ((l && l.to == m && (l = d.shift()), kc(b)))
          0 != b.height && Fc(b, 0);
        else if (l && l.from <= m && l.to > m) {
          for (; k.lineObj != b; ) k = f(k);
          i && m >= e && k.lineNumber && kd(k.lineNumber, q(a.options, m)),
            (k = k.nextSibling);
        } else {
          var c = x(a, b, m, g);
          j.insertBefore(c, k), (c.lineObj = b);
        }
        ++m;
      });
      k;

    )
      k = f(k);
  }
  function x(a, b, c, d) {
    var e = xc(a, b),
      f = b.gutterMarkers,
      g = a.display;
    if (
      !(
        a.options.lineNumbers ||
        f ||
        b.bgClass ||
        b.wrapClass ||
        (b.widgets && b.widgets.length)
      )
    )
      return e;
    var h = hd("div", null, b.wrapClass, "position: relative");
    if (a.options.lineNumbers || f) {
      var i = h.appendChild(
        hd("div", null, null, "position: absolute; left: " + d.fixedPos + "px"),
      );
      if (
        ((h.alignable = [i]),
        !a.options.lineNumbers ||
          (f && f["CodeMirror-linenumbers"]) ||
          (h.lineNumber = i.appendChild(
            hd(
              "div",
              q(a.options, c),
              "CodeMirror-linenumber CodeMirror-gutter-elt",
              "left: " +
                d.gutterLeft["CodeMirror-linenumbers"] +
                "px; width: " +
                g.lineNumInnerWidth +
                "px",
            ),
          )),
        f)
      )
        for (var j = 0; j < a.options.gutters.length; ++j) {
          var k = a.options.gutters[j],
            l = f.hasOwnProperty(k) && f[k];
          l &&
            i.appendChild(
              hd(
                "div",
                [l],
                "CodeMirror-gutter-elt",
                "left: " +
                  d.gutterLeft[k] +
                  "px; width: " +
                  d.gutterWidth[k] +
                  "px",
              ),
            );
        }
    }
    if (
      (b.bgClass &&
        h.appendChild(hd("div", " ", b.bgClass + " CodeMirror-linebackground")),
      h.appendChild(e),
      b.widgets)
    )
      for (var m = 0, n = b.widgets; m < n.length; ++m) {
        var o = n[m],
          p = hd("div", [o.node], "CodeMirror-linewidget");
        if (((p.widget = o), o.noHScroll)) {
          (h.alignable || (h.alignable = [])).push(p);
          var r = d.wrapperWidth;
          (p.style.left = d.fixedPos + "px"),
            o.coverGutter ||
              ((r -= d.gutterTotalWidth),
              (p.style.paddingLeft = d.gutterTotalWidth + "px")),
            (p.style.width = r + "px");
        }
        o.coverGutter &&
          ((p.style.zIndex = 5),
          (p.style.position = "relative"),
          o.noHScroll || (p.style.marginLeft = -d.gutterTotalWidth + "px")),
          o.above
            ? h.insertBefore(p, a.options.lineNumbers && 0 != b.height ? i : e)
            : h.appendChild(p);
      }
    return Fd && (h.style.zIndex = 2), h;
  }
  function y(a) {
    var b = a.display,
      c = zb(a.view.sel.from, a.view.sel.to);
    c || a.options.showCursorWhenSelecting
      ? z(a)
      : (b.cursor.style.display = b.otherCursor.style.display = "none"),
      c ? (b.selectionDiv.style.display = "none") : A(a);
    var d = O(a, a.view.sel.head, "div"),
      e = b.wrapper.getBoundingClientRect(),
      f = b.lineDiv.getBoundingClientRect();
    (b.inputDiv.style.top =
      Math.max(
        0,
        Math.min(b.wrapper.clientHeight - 10, d.top + f.top - e.top),
      ) + "px"),
      (b.inputDiv.style.left =
        Math.max(
          0,
          Math.min(b.wrapper.clientWidth - 10, d.left + f.left - e.left),
        ) + "px");
  }
  function z(a) {
    var b = a.display,
      c = O(a, a.view.sel.head, "div");
    (b.cursor.style.left = c.left + "px"),
      (b.cursor.style.top = c.top + "px"),
      (b.cursor.style.height =
        Math.max(0, c.bottom - c.top) * a.options.cursorHeight + "px"),
      (b.cursor.style.display = ""),
      c.other
        ? ((b.otherCursor.style.display = ""),
          (b.otherCursor.style.left = c.other.left + "px"),
          (b.otherCursor.style.top = c.other.top + "px"),
          (b.otherCursor.style.height =
            0.85 * (c.other.bottom - c.other.top) + "px"))
        : (b.otherCursor.style.display = "none");
  }
  function A(a) {
    function b(a, b, c, d) {
      0 > b && (b = 0),
        g.appendChild(
          hd(
            "div",
            null,
            "CodeMirror-selected",
            "position: absolute; left: " +
              a +
              "px; top: " +
              b +
              "px; width: " +
              (null == c ? h - a : c) +
              "px; height: " +
              (d - b) +
              "px",
          ),
        );
    }
    function c(c, d, f, g) {
      function j(b) {
        return N(a, { line: c, ch: b }, "div", k);
      }
      var k = Ec(e, c),
        l = k.text.length,
        m = g ? 1 / 0 : -1 / 0;
      return (
        nd(Jc(k), d || 0, null == f ? l : f, function (a, c, e) {
          var k = j("rtl" == e ? c - 1 : a),
            n = j("rtl" == e ? a : c - 1),
            o = k.left,
            p = n.right;
          n.top - k.top > 3 &&
            (b(o, k.top, null, k.bottom),
            (o = i),
            k.bottom < n.top && b(o, k.bottom, null, n.top)),
            null == f && c == l && (p = h),
            null == d && 0 == a && (o = i),
            (m = g ? Math.min(n.top, m) : Math.max(n.bottom, m)),
            i + 1 > o && (o = i),
            b(o, n.top, p - o, n.bottom);
        }),
        m
      );
    }
    var d = a.display,
      e = a.view.doc,
      f = a.view.sel,
      g = document.createDocumentFragment(),
      h = d.lineSpace.offsetWidth,
      i = H(a.display);
    if (f.from.line == f.to.line) c(f.from.line, f.from.ch, f.to.ch);
    else {
      for (
        var j, k, l = Ec(e, f.from.line), m = l, n = [f.from.line, f.from.ch];
        (j = ic(m));

      ) {
        var o = j.find();
        if ((n.push(o.from.ch, o.to.line, o.to.ch), o.to.line == f.to.line)) {
          n.push(f.to.ch), (k = !0);
          break;
        }
        m = Ec(e, o.to.line);
      }
      if (k) for (var p = 0; p < n.length; p += 3) c(n[p], n[p + 1], n[p + 2]);
      else {
        var q,
          r,
          s = Ec(e, f.to.line);
        (q = f.from.ch
          ? c(f.from.line, f.from.ch, null, !1)
          : Ic(a, l) - d.viewOffset),
          (r = f.to.ch
            ? c(f.to.line, hc(s) ? null : 0, f.to.ch, !0)
            : Ic(a, s) - d.viewOffset),
          r > q && b(i, q, null, r);
      }
    }
    jd(d.selectionDiv, g), (d.selectionDiv.style.display = "");
  }
  function B(a) {
    var b = a.display;
    clearInterval(b.blinker);
    var c = !0;
    (b.cursor.style.visibility = b.otherCursor.style.visibility = ""),
      (b.blinker = setInterval(function () {
        b.cursor.offsetHeight &&
          (b.cursor.style.visibility = b.otherCursor.style.visibility =
            (c = !c) ? "" : "hidden");
      }, a.options.cursorBlinkRate));
  }
  function C(a, b) {
    a.view.frontier < a.display.showingTo && a.view.highlight.set(b, ed(D, a));
  }
  function D(a) {
    var b = a.view,
      c = b.doc;
    if (!(b.frontier >= a.display.showingTo)) {
      var d,
        e = +new Date() + a.options.workTime,
        f = Tb(b.mode, F(a, b.frontier)),
        g = [];
      c.iter(
        b.frontier,
        Math.min(c.size, a.display.showingTo + 500),
        function (c) {
          return (
            b.frontier >= a.display.showingFrom
              ? (uc(a, c, f) &&
                  b.frontier >= a.display.showingFrom &&
                  (d && d.end == b.frontier
                    ? d.end++
                    : g.push((d = { start: b.frontier, end: b.frontier + 1 }))),
                (c.stateAfter = Tb(b.mode, f)))
              : (vc(a, c, f),
                (c.stateAfter = b.frontier % 5 == 0 ? Tb(b.mode, f) : null)),
            ++b.frontier,
            +new Date() > e ? (C(a, a.options.workDelay), !0) : void 0
          );
        },
      ),
        g.length &&
          V(a, function () {
            for (var a = 0; a < g.length; ++a) W(this, g[a].start, g[a].end);
          })();
    }
  }
  function E(a, b) {
    for (var c, d, e = a.view.doc, f = b, g = b - 100; f > g; --f) {
      if (0 == f) return 0;
      var h = Ec(e, f - 1);
      if (h.stateAfter) return f;
      var i = $c(h.text, null, a.options.tabSize);
      (null == d || c > i) && ((d = f - 1), (c = i));
    }
    return d;
  }
  function F(a, b) {
    var c = a.view,
      d = E(a, b),
      e = d && Ec(c.doc, d - 1).stateAfter;
    return (
      (e = e ? Tb(c.mode, e) : Ub(c.mode)),
      c.doc.iter(d, b, function (f) {
        vc(a, f, e);
        var g =
          d == b - 1 || d % 5 == 0 || (d >= c.showingFrom && d < c.showingTo);
        (f.stateAfter = g ? Tb(c.mode, e) : null), ++d;
      }),
      e
    );
  }
  function G(a) {
    return a.lineSpace.offsetTop;
  }
  function H(a) {
    var b = jd(a.measure, hd("pre")).appendChild(hd("span", "x"));
    return b.offsetLeft;
  }
  function I(a, b, c, d) {
    for (var d = d || J(a, b), e = -1, f = c; ; f += e) {
      var g = d[f];
      if (g) break;
      0 > e && 0 == f && (e = 1);
    }
    return {
      left: c > f ? g.right : g.left,
      right: f > c ? g.left : g.right,
      top: g.top,
      bottom: g.bottom,
    };
  }
  function J(a, b) {
    for (
      var c = a.display, d = a.display.measureLineCache, e = 0;
      e < d.length;
      ++e
    ) {
      var f = d[e];
      if (
        f.text == b.text &&
        f.markedSpans == b.markedSpans &&
        c.scroller.clientWidth == f.width
      )
        return f.measure;
    }
    var g = K(a, b),
      f = {
        text: b.text,
        width: c.scroller.clientWidth,
        markedSpans: b.markedSpans,
        measure: g,
      };
    return (
      16 == d.length ? (d[++c.measureLineCachePos % 16] = f) : d.push(f), g
    );
  }
  function K(a, b) {
    var c = a.display,
      d = dd(b.text.length),
      e = xc(a, b, d);
    if (Ed && !Fd && !a.options.lineWrapping && e.childNodes.length > 100) {
      for (
        var f = document.createDocumentFragment(),
          g = 10,
          h = e.childNodes.length,
          i = 0,
          j = Math.ceil(h / g);
        j > i;
        ++i
      ) {
        for (
          var k = hd("div", null, null, "display: inline-block"), l = 0;
          g > l && h;
          ++l
        )
          k.appendChild(e.firstChild), --h;
        f.appendChild(k);
      }
      e.appendChild(f);
    }
    jd(c.measure, e);
    for (
      var m,
        n = c.lineDiv.getBoundingClientRect(),
        o = [],
        p = dd(b.text.length),
        q = e.offsetHeight,
        i = 0;
      i < d.length;
      ++i
    )
      if ((m = d[i])) {
        for (
          var r = m.getBoundingClientRect(),
            s = Math.max(0, r.top - n.top),
            t = Math.min(r.bottom - n.top, q),
            l = 0;
          l < o.length;
          l += 2
        ) {
          var u = o[l],
            v = o[l + 1];
          if (
            !(u > t || s > v) &&
            ((s >= u && v >= t) ||
              (u >= s && t >= v) ||
              Math.min(t, v) - Math.max(s, u) >= (t - s) >> 1)
          ) {
            (o[l] = Math.min(s, u)), (o[l + 1] = Math.max(t, v));
            break;
          }
        }
        l == o.length && o.push(s, t),
          (p[i] = { left: r.left - n.left, right: r.right - n.left, top: l });
      }
    for (var m, i = 0; i < p.length; ++i)
      if ((m = p[i])) {
        var w = m.top;
        (m.top = o[w]), (m.bottom = o[w + 1]);
      }
    return p;
  }
  function L(a) {
    (a.display.measureLineCache.length = a.display.measureLineCachePos = 0),
      (a.display.cachedCharWidth = a.display.cachedTextHeight = null),
      (a.view.maxLineChanged = !0);
  }
  function M(a, b, c, d) {
    if (b.widgets)
      for (var e = 0; e < b.widgets.length; ++e)
        if (b.widgets[e].above) {
          var f = b.widgets[e].node.offsetHeight;
          (c.top += f), (c.bottom += f);
        }
    if ("line" == d) return c;
    d || (d = "local");
    var g = Ic(a, b);
    if (("local" != d && (g -= a.display.viewOffset), "page" == d)) {
      var h = a.display.lineSpace.getBoundingClientRect();
      g +=
        h.top +
        (window.pageYOffset ||
          (document.documentElement || document.body).scrollTop);
      var i =
        h.left +
        (window.pageXOffset ||
          (document.documentElement || document.body).scrollLeft);
      (c.left += i), (c.right += i);
    }
    return (c.top += g), (c.bottom += g), c;
  }
  function N(a, b, c, d) {
    return d || (d = Ec(a.view.doc, b.line)), M(a, d, I(a, d, b.ch), c);
  }
  function O(a, b, c, d, e) {
    function f(b, f) {
      var g = I(a, d, b, e);
      return f ? (g.left = g.right) : (g.right = g.left), M(a, d, g, c);
    }
    (d = d || Ec(a.view.doc, b.line)), e || (e = J(a, d));
    var g = Jc(d),
      h = b.ch;
    if (!g) return f(h);
    for (var i, j, k = g[0].level, l = 0; l < g.length; ++l) {
      var m,
        n,
        o = g[l],
        p = o.level % 2;
      if (o.from < h && o.to > h) return f(h, p);
      var q = p ? o.to : o.from,
        r = p ? o.from : o.to;
      if (q == h)
        (n =
          l && o.level < (m = g[l - 1]).level
            ? f(m.level % 2 ? m.from : m.to - 1, !0)
            : f(p && o.from != o.to ? h - 1 : h)),
          p == k ? (i = n) : (j = n);
      else if (r == h) {
        var m = l < g.length - 1 && g[l + 1];
        if (!p && m && m.from == m.to) continue;
        (n =
          m && o.level < m.level
            ? f(m.level % 2 ? m.to - 1 : m.from)
            : f(p ? h : h - 1, !0)),
          p == k ? (i = n) : (j = n);
      }
    }
    return k && !h && (j = f(g[0].to - 1)), i ? (j && (i.other = j), i) : j;
  }
  function P(a, b, c) {
    var d = a.view.doc;
    if (((c += a.display.viewOffset), 0 > c))
      return { line: 0, ch: 0, outside: !0 };
    var e = Hc(d, c);
    if (e >= d.size)
      return { line: d.size - 1, ch: Ec(d, d.size - 1).text.length };
    for (0 > b && (b = 0); ; ) {
      var f = Ec(d, e),
        g = Q(a, f, e, b, c),
        h = ic(f);
      if (!h || g.ch != rd(f)) return g;
      e = h.find().to.line;
    }
  }
  function Q(a, b, c, d, e) {
    function f(d) {
      var e = O(a, { line: c, ch: d }, "line", b, j);
      return (
        (h = !0),
        g > e.bottom
          ? Math.max(0, e.left - i)
          : g < e.top
            ? e.left + i
            : ((h = !1), e.left)
      );
    }
    var g = e - Ic(a, b),
      h = !1,
      i = a.display.wrapper.clientWidth,
      j = J(a, b),
      k = Jc(b),
      l = b.text.length,
      m = qd(b),
      n = rd(b),
      o = H(a.display),
      p = f(n);
    if (d > p) return { line: c, ch: n, outside: h };
    for (;;) {
      if (k ? n == m || n == ud(b, m, 1) : 1 >= n - m) {
        for (var q = p - d > d - o, r = q ? m : n; ne.test(b.text.charAt(r)); )
          ++r;
        return { line: c, ch: r, after: q, outside: h };
      }
      var s = Math.ceil(l / 2),
        t = m + s;
      if (k) {
        t = m;
        for (var u = 0; s > u; ++u) t = ud(b, t, 1);
      }
      var v = f(t);
      v > d
        ? ((n = t), (p = v), h && (p += 1e3), (l -= s))
        : ((m = t), (o = v), (l = s));
    }
  }
  function R(a) {
    if (null != a.cachedTextHeight) return a.cachedTextHeight;
    if (null == wd) {
      wd = hd("pre");
      for (var b = 0; 49 > b; ++b)
        wd.appendChild(document.createTextNode("x")), wd.appendChild(hd("br"));
      wd.appendChild(document.createTextNode("x"));
    }
    jd(a.measure, wd);
    var c = wd.offsetHeight / 50;
    return c > 3 && (a.cachedTextHeight = c), id(a.measure), c || 1;
  }
  function S(a) {
    if (null != a.cachedCharWidth) return a.cachedCharWidth;
    var b = hd("span", "x"),
      c = hd("pre", [b]);
    jd(a.measure, c);
    var d = b.offsetWidth;
    return d > 2 && (a.cachedCharWidth = d), d || 10;
  }
  function T(a) {
    a.curOp
      ? ++a.curOp.depth
      : (a.curOp = {
          depth: 1,
          changes: [],
          delayedCallbacks: [],
          updateInput: null,
          userSelChange: null,
          textChanged: null,
          selectionChanged: !1,
          updateMaxLine: !1,
          id: ++a.nextOpId,
        });
  }
  function U(a) {
    var b = a.curOp;
    if (!--b.depth) {
      a.curOp = null;
      var c = a.view,
        d = a.display;
      if (
        (b.updateMaxLine && k(c), c.maxLineChanged && !a.options.lineWrapping)
      ) {
        var e = I(a, c.maxLine, c.maxLine.text.length).right;
        (d.sizer.style.minWidth = e + 3 + je + "px"), (c.maxLineChanged = !1);
      }
      var f, g;
      if (b.selectionChanged) {
        var h = O(a, c.sel.head);
        f = Mb(a, h.left, h.top, h.left, h.bottom);
      }
      (b.changes.length || (f && null != f.scrollTop)) &&
        (g = s(a, b.changes, f && f.scrollTop)),
        !g && b.selectionChanged && y(a),
        f && Jb(a),
        b.selectionChanged && B(a),
        c.focused && b.updateInput && $(a, b.userSelChange),
        b.textChanged && Wc(a, "change", a, b.textChanged),
        b.selectionChanged && Wc(a, "cursorActivity", a);
      for (var i = 0; i < b.delayedCallbacks.length; ++i)
        b.delayedCallbacks[i](a);
    }
  }
  function V(a, b) {
    return function () {
      var c = a || this;
      T(c);
      try {
        var d = b.apply(c, arguments);
      } finally {
        U(c);
      }
      return d;
    };
  }
  function W(a, b, c, d) {
    a.curOp.changes.push({ from: b, to: c, diff: d });
  }
  function X(a) {
    a.view.pollingFast ||
      a.display.poll.set(a.options.pollInterval, function () {
        Z(a), a.view.focused && X(a);
      });
  }
  function Y(a) {
    function b() {
      var d = Z(a);
      d || c
        ? ((a.display.pollingFast = !1), X(a))
        : ((c = !0), a.display.poll.set(60, b));
    }
    var c = !1;
    (a.display.pollingFast = !0), a.display.poll.set(20, b);
  }
  function Z(a) {
    var b = a.display.input,
      c = a.display.prevInput,
      d = a.view,
      e = d.sel;
    if (!d.focused || te(b) || ab(a)) return !1;
    var f = b.value;
    if (f == c && zb(e.from, e.to)) return !1;
    T(a), (d.sel.shift = !1);
    for (var g = 0, h = Math.min(c.length, f.length); h > g && c[g] == f[g]; )
      ++g;
    var i = e.from,
      j = e.to;
    g < c.length
      ? (i = { line: i.line, ch: i.ch - (c.length - g) })
      : d.overwrite &&
        zb(i, j) &&
        !a.display.pasteIncoming &&
        (j = {
          line: j.line,
          ch: Math.min(
            Ec(a.view.doc, j.line).text.length,
            j.ch + (f.length - g),
          ),
        });
    var k = a.curOp.updateInput;
    return (
      ub(
        a,
        i,
        j,
        se(f.slice(g)),
        "end",
        a.display.pasteIncoming ? "paste" : "input",
        { from: i, to: j },
      ),
      (a.curOp.updateInput = k),
      f.length > 1e3
        ? (b.value = a.display.prevInput = "")
        : (a.display.prevInput = f),
      U(a),
      (a.display.pasteIncoming = !1),
      !0
    );
  }
  function $(a, b) {
    var c,
      d,
      e = a.view;
    zb(e.sel.from, e.sel.to)
      ? b && (a.display.prevInput = a.display.input.value = "")
      : ((a.display.prevInput = ""),
        (c =
          ue &&
          (e.sel.to.line - e.sel.from.line > 100 ||
            (d = a.getSelection()).length > 1e3)),
        (a.display.input.value = c ? "-" : d || a.getSelection()),
        e.focused && bd(a.display.input)),
      (a.display.inaccurateSelection = c);
  }
  function _(a) {
    "nocursor" == a.options.readOnly ||
      (!Ed && document.activeElement == a.display.input) ||
      a.display.input.focus();
  }
  function ab(a) {
    return a.options.readOnly || a.view.cantEdit;
  }
  function bb(a) {
    function b() {
      a.view.focused && setTimeout(ed(_, a), 0);
    }
    function c(b) {
      (a.options.onDragEvent && a.options.onDragEvent(a, Nc(b))) || Qc(b);
    }
    function d() {
      e.inaccurateSelection &&
        ((e.prevInput = ""),
        (e.inaccurateSelection = !1),
        (e.input.value = a.getSelection()),
        bd(e.input));
    }
    var e = a.display;
    Uc(e.scroller, "mousedown", V(a, eb)),
      Uc(e.scroller, "dblclick", V(a, Oc)),
      Uc(e.lineSpace, "selectstart", function (a) {
        cb(e, a) || Oc(a);
      }),
      Dd ||
        Uc(e.scroller, "contextmenu", function (b) {
          tb(a, b);
        }),
      Uc(e.scroller, "scroll", function () {
        ib(a, e.scroller.scrollTop),
          jb(a, e.scroller.scrollLeft, !0),
          Wc(a, "scroll", a);
      }),
      Uc(e.scrollbarV, "scroll", function () {
        ib(a, e.scrollbarV.scrollTop);
      }),
      Uc(e.scrollbarH, "scroll", function () {
        jb(a, e.scrollbarH.scrollLeft);
      }),
      Uc(e.scroller, "mousewheel", function (b) {
        kb(a, b);
      }),
      Uc(e.scroller, "DOMMouseScroll", function (b) {
        kb(a, b);
      }),
      Uc(e.scrollbarH, "mousedown", b),
      Uc(e.scrollbarV, "mousedown", b),
      Uc(e.wrapper, "scroll", function () {
        e.wrapper.scrollTop = e.wrapper.scrollLeft = 0;
      }),
      Uc(window, "resize", function f() {
        (e.cachedCharWidth = e.cachedTextHeight = null),
          L(a),
          e.wrapper.parentNode ? s(a, !0) : Vc(window, "resize", f);
      }),
      Uc(
        e.input,
        "keyup",
        V(a, function (b) {
          (a.options.onKeyEvent && a.options.onKeyEvent(a, Nc(b))) ||
            (16 == Tc(b, "keyCode") && (a.view.sel.shift = !1));
        }),
      ),
      Uc(e.input, "input", ed(Y, a)),
      Uc(e.input, "keydown", V(a, pb)),
      Uc(e.input, "keypress", V(a, qb)),
      Uc(e.input, "focus", ed(rb, a)),
      Uc(e.input, "blur", ed(sb, a)),
      a.options.dragDrop &&
        (Uc(e.scroller, "dragstart", function (b) {
          hb(a, b);
        }),
        Uc(e.scroller, "dragenter", c),
        Uc(e.scroller, "dragover", c),
        Uc(e.scroller, "drop", V(a, fb))),
      Uc(e.scroller, "paste", function () {
        _(a), Y(a);
      }),
      Uc(e.input, "paste", function () {
        (e.pasteIncoming = !0), Y(a);
      }),
      Uc(e.input, "cut", d),
      Uc(e.input, "copy", d),
      Md &&
        Uc(e.sizer, "mouseup", function () {
          document.activeElement == e.input && e.input.blur(), _(a);
        });
  }
  function cb(a, b) {
    for (var c = Rc(b); c != a.wrapper; c = c.parentNode)
      if (
        /\bCodeMirror-(?:line)?widget\b/.test(c.className) ||
        (c.parentNode == a.sizer && c != a.mover)
      )
        return !0;
  }
  function db(a, b, c) {
    var d = a.display;
    if (!c) {
      var e = Rc(b);
      if (
        e == d.scrollbarH ||
        e == d.scrollbarH.firstChild ||
        e == d.scrollbarV ||
        e == d.scrollbarV.firstChild ||
        e == d.scrollbarFiller
      )
        return null;
    }
    var f,
      g,
      h = d.lineSpace.getBoundingClientRect();
    try {
      (f = b.clientX), (g = b.clientY);
    } catch (b) {
      return null;
    }
    return P(a, f - h.left, g - h.top);
  }
  function eb(a) {
    function b(a) {
      if ("single" == l) return Fb(e, Db(i, j), a), void 0;
      if (((q = Db(i, q)), (r = Db(i, r)), "double" == l)) {
        var b = Qb(Ec(i, a.line).text, a);
        Ab(a, q) ? Fb(e, b.from, r) : Fb(e, q, b.to);
      } else
        "triple" == l &&
          (Ab(a, q)
            ? Fb(e, r, Db(i, { line: a.line, ch: 0 }))
            : Fb(e, q, Db(i, { line: a.line + 1, ch: 0 })));
    }
    function c(a) {
      var d = ++t,
        h = db(e, a, !0);
      if (h)
        if (zb(h, o)) {
          var j = a.clientY < s.top ? -20 : a.clientY > s.bottom ? 20 : 0;
          j &&
            setTimeout(
              V(e, function () {
                t == d && ((f.scroller.scrollTop += j), c(a));
              }),
              50,
            );
        } else {
          g.focused || rb(e), (o = h), b(h);
          var k = n(f, i);
          (h.line >= k.to || h.line < k.from) &&
            setTimeout(
              V(e, function () {
                t == d && c(a);
              }),
              150,
            );
        }
    }
    function d(a) {
      t = 1 / 0;
      var c = db(e, a);
      c && b(c),
        Oc(a),
        _(e),
        Vc(document, "mousemove", u),
        Vc(document, "mouseup", v);
    }
    var e = this,
      f = e.display,
      g = e.view,
      h = g.sel,
      i = g.doc;
    if (((h.shift = Tc(a, "shiftKey")), cb(f, a)))
      return (
        Hd ||
          ((f.scroller.draggable = !1),
          setTimeout(function () {
            f.scroller.draggable = !0;
          }, 100)),
        void 0
      );
    if (!gb(e, a)) {
      var j = db(e, a);
      switch (Sc(a)) {
        case 3:
          return Dd && tb.call(e, e, a), void 0;
        case 2:
          return j && Fb(e, j), setTimeout(ed(_, e), 20), Oc(a), void 0;
      }
      if (!j) return Rc(a) == f.scroller && Oc(a), void 0;
      g.focused || rb(e);
      var k = +new Date(),
        l = "single";
      if (yd && yd.time > k - 400 && zb(yd.pos, j))
        (l = "triple"), Oc(a), setTimeout(ed(_, e), 20), Rb(e, j.line);
      else if (xd && xd.time > k - 400 && zb(xd.pos, j)) {
        (l = "double"), (yd = { time: k, pos: j }), Oc(a);
        var m = Qb(Ec(i, j.line).text, j);
        Fb(e, m.from, m.to);
      } else xd = { time: k, pos: j };
      var o = j;
      if (
        e.options.dragDrop &&
        oe &&
        !ab(e) &&
        !zb(h.from, h.to) &&
        !Ab(j, h.from) &&
        !Ab(h.to, j) &&
        "single" == l
      ) {
        var p = V(e, function (b) {
          Hd && (f.scroller.draggable = !1),
            (g.draggingText = !1),
            Vc(document, "mouseup", p),
            Vc(f.scroller, "drop", p),
            Math.abs(a.clientX - b.clientX) + Math.abs(a.clientY - b.clientY) <
              10 && (Oc(b), Fb(e, j), _(e));
        });
        return (
          Hd && (f.scroller.draggable = !0),
          (g.draggingText = p),
          f.scroller.dragDrop && f.scroller.dragDrop(),
          Uc(document, "mouseup", p),
          Uc(f.scroller, "drop", p),
          void 0
        );
      }
      Oc(a), "single" == l && Fb(e, Db(i, j));
      var q = h.from,
        r = h.to,
        s = f.wrapper.getBoundingClientRect(),
        t = 0,
        u = V(e, function (a) {
          Ed || Sc(a) ? c(a) : d(a);
        }),
        v = V(e, d);
      Uc(document, "mousemove", u), Uc(document, "mouseup", v);
    }
  }
  function fb(a) {
    var b = this;
    if (!b.options.onDragEvent || !b.options.onDragEvent(b, Nc(a))) {
      Oc(a);
      var c = db(b, a, !0),
        d = a.dataTransfer.files;
      if (c && !ab(b))
        if (d && d.length && window.FileReader && window.File)
          for (
            var e = d.length,
              f = Array(e),
              g = 0,
              h = function (a, d) {
                var h = new FileReader();
                (h.onload = function () {
                  (f[d] = h.result),
                    ++g == e &&
                      ((c = Db(b.view.doc, c)),
                      V(b, function () {
                        var a = yb(b, f.join(""), c, c, "paste");
                        Gb(b, c, a);
                      })());
                }),
                  h.readAsText(a);
              },
              i = 0;
            e > i;
            ++i
          )
            h(d[i], i);
        else {
          if (
            b.view.draggingText &&
            !Ab(c, b.view.sel.from) &&
            !Ab(b.view.sel.to, c)
          )
            return (
              b.view.draggingText(a), Ed && setTimeout(ed(_, b), 50), void 0
            );
          try {
            var f = a.dataTransfer.getData("Text");
            if (f) {
              var j = b.view.sel.from,
                k = b.view.sel.to;
              Gb(b, c, c),
                b.view.draggingText && yb(b, "", j, k, "paste"),
                b.replaceSelection(f, null, "paste"),
                _(b),
                rb(b);
            }
          } catch (a) {}
        }
    }
  }
  function gb(a, b) {
    var c = a.display;
    try {
      var d = b.clientX,
        e = b.clientY;
    } catch (b) {
      return !1;
    }
    if (d >= Math.floor(c.gutters.getBoundingClientRect().right)) return !1;
    if ((Oc(b), !Yc(a, "gutterClick"))) return !0;
    var f = c.lineDiv.getBoundingClientRect();
    if (e > f.bottom) return !0;
    e -= f.top - c.viewOffset;
    for (var g = 0; g < a.options.gutters.length; ++g) {
      var h = c.gutters.childNodes[g];
      if (h && h.getBoundingClientRect().right >= d) {
        var i = Hc(a.view.doc, e),
          j = a.options.gutters[g];
        Xc(a, a, "gutterClick", a, i, j, b);
        break;
      }
    }
    return !0;
  }
  function hb(a, b) {
    var c = a.getSelection();
    b.dataTransfer.setData("Text", c),
      b.dataTransfer.setDragImage &&
        !Ld &&
        b.dataTransfer.setDragImage(hd("img"), 0, 0);
  }
  function ib(a, b) {
    Math.abs(a.view.scrollTop - b) < 2 ||
      ((a.view.scrollTop = b),
      Dd || s(a, [], b),
      a.display.scroller.scrollTop != b && (a.display.scroller.scrollTop = b),
      a.display.scrollbarV.scrollTop != b &&
        (a.display.scrollbarV.scrollTop = b),
      Dd && s(a, []));
  }
  function jb(a, b, c) {
    (c ? b == a.view.scrollLeft : Math.abs(a.view.scrollLeft - b) < 2) ||
      ((a.view.scrollLeft = b),
      o(a),
      a.display.scroller.scrollLeft != b && (a.display.scroller.scrollLeft = b),
      a.display.scrollbarH.scrollLeft != b &&
        (a.display.scrollbarH.scrollLeft = b));
  }
  function kb(a, b) {
    var c = b.wheelDeltaX,
      d = b.wheelDeltaY;
    if (
      (null == c && b.detail && b.axis == b.HORIZONTAL_AXIS && (c = b.detail),
      null == d && b.detail && b.axis == b.VERTICAL_AXIS
        ? (d = b.detail)
        : null == d && (d = b.wheelDelta),
      d && Sd && Hd)
    )
      for (var e = b.target; e != f; e = e.parentNode)
        if (e.lineObj) {
          a.display.currentWheelTarget = e;
          break;
        }
    var f = a.display.scroller;
    if (c && !Dd && !Kd && null != Wd)
      return (
        d &&
          ib(
            a,
            Math.max(
              0,
              Math.min(f.scrollTop + d * Wd, f.scrollHeight - f.clientHeight),
            ),
          ),
        jb(
          a,
          Math.max(
            0,
            Math.min(f.scrollLeft + c * Wd, f.scrollWidth - f.clientWidth),
          ),
        ),
        Oc(b),
        (Bd = null),
        void 0
      );
    if (d && null != Wd) {
      var g = d * Wd,
        h = a.view.scrollTop,
        i = h + a.display.wrapper.clientHeight;
      0 > g
        ? (h = Math.max(0, h + g - 50))
        : (i = Math.min(a.view.doc.height, i + g + 50)),
        s(a, [], { top: h, bottom: i });
    }
    20 > Vd &&
      (null == Bd
        ? ((Bd = f.scrollLeft),
          (Cd = f.scrollTop),
          (zd = c),
          (Ad = d),
          setTimeout(function () {
            if (null != Bd) {
              var a = f.scrollLeft - Bd,
                b = f.scrollTop - Cd,
                c = (b && Ad && b / Ad) || (a && zd && a / zd);
              (Bd = Cd = null), c && ((Wd = (Wd * Vd + c) / (Vd + 1)), ++Vd);
            }
          }, 200))
        : ((zd += c), (Ad += d)));
  }
  function lb(a, b, c) {
    if ("string" == typeof b && ((b = fe[b]), !b)) return !1;
    a.display.pollingFast && Z(a) && (a.display.pollingFast = !1);
    var d = a.view,
      e = d.sel.shift;
    try {
      ab(a) && (d.suppressEdits = !0), c && (d.sel.shift = !1), b(a);
    } catch (f) {
      if (f != ke) throw f;
      return !1;
    } finally {
      (d.sel.shift = e), (d.suppressEdits = !1);
    }
    return !0;
  }
  function mb(a) {
    var b = a.view.keyMaps.slice(0);
    return (
      b.push(a.options.keyMap),
      a.options.extraKeys && b.unshift(a.options.extraKeys),
      b
    );
  }
  function nb(a, b) {
    function c() {
      i = !0;
    }
    var d = Vb(a.options.keyMap),
      e = d.auto;
    clearTimeout(Xd),
      e &&
        !Xb(b) &&
        (Xd = setTimeout(function () {
          Vb(a.options.keyMap) == d &&
            (a.options.keyMap = e.call ? e.call(null, a) : e);
        }, 50));
    var f = ve[Tc(b, "keyCode")],
      g = !1,
      h = Sd && (Kd || Id);
    if (null == f || b.altGraphKey) return !1;
    Tc(b, "altKey") && (f = "Alt-" + f),
      Tc(b, h ? "metaKey" : "ctrlKey") && (f = "Ctrl-" + f),
      Tc(b, h ? "ctrlKey" : "metaKey") && (f = "Cmd-" + f);
    var i = !1,
      j = mb(a);
    return (
      (g = Tc(b, "shiftKey")
        ? Wb(
            "Shift-" + f,
            j,
            function (b) {
              return lb(a, b, !0);
            },
            c,
          ) ||
          Wb(
            f,
            j,
            function (b) {
              return "string" == typeof b && /^go[A-Z]/.test(b)
                ? lb(a, b)
                : void 0;
            },
            c,
          )
        : Wb(
            f,
            j,
            function (b) {
              return lb(a, b);
            },
            c,
          )),
      i && (g = !1),
      g && (Oc(b), B(a), Gd && ((b.oldKeyCode = b.keyCode), (b.keyCode = 0))),
      g
    );
  }
  function ob(a, b, c) {
    var d = Wb("'" + c + "'", mb(a), function (b) {
      return lb(a, b, !0);
    });
    return d && (Oc(b), B(a)), d;
  }
  function pb(a) {
    var b = this;
    if (
      (b.view.focused || rb(b),
      Ed && 27 == a.keyCode && (a.returnValue = !1),
      !b.options.onKeyEvent || !b.options.onKeyEvent(b, Nc(a)))
    ) {
      var c = Tc(a, "keyCode");
      b.view.sel.shift = 16 == c || Tc(a, "shiftKey");
      var d = nb(b, a);
      Kd &&
        ((Zd = d ? c : null),
        d ||
          88 != c ||
          ue ||
          !Tc(a, Sd ? "metaKey" : "ctrlKey") ||
          b.replaceSelection(""));
    }
  }
  function qb(a) {
    var b = this;
    if (!b.options.onKeyEvent || !b.options.onKeyEvent(b, Nc(a))) {
      var c = Tc(a, "keyCode"),
        d = Tc(a, "charCode");
      if (Kd && c == Zd) return (Zd = null), Oc(a), void 0;
      if (!((Kd && (!a.which || a.which < 10)) || Md) || !nb(b, a)) {
        var e = String.fromCharCode(null == d ? c : d);
        this.options.electricChars &&
          this.view.mode.electricChars &&
          this.options.smartIndent &&
          !ab(this) &&
          this.view.mode.electricChars.indexOf(e) > -1 &&
          setTimeout(
            V(b, function () {
              Nb(b, b.view.sel.to.line, "smart");
            }),
            75,
          ),
          ob(b, a, e) || Y(b);
      }
    }
  }
  function rb(a) {
    "nocursor" != a.options.readOnly &&
      (a.view.focused ||
        (Wc(a, "focus", a),
        (a.view.focused = !0),
        -1 == a.display.scroller.className.search(/\bCodeMirror-focused\b/) &&
          (a.display.scroller.className += " CodeMirror-focused"),
        $(a, !0)),
      X(a),
      B(a));
  }
  function sb(a) {
    a.view.focused &&
      (Wc(a, "blur", a),
      (a.view.focused = !1),
      (a.display.scroller.className = a.display.scroller.className.replace(
        " CodeMirror-focused",
        "",
      ))),
      clearInterval(a.display.blinker),
      setTimeout(function () {
        a.view.focused || (a.view.sel.shift = !1);
      }, 150);
  }
  function tb(a, b) {
    function c() {
      if (
        ((d.inputDiv.style.position = "relative"),
        (d.input.style.cssText = h),
        Gd && (d.scrollbarV.scrollTop = d.scroller.scrollTop = g),
        X(a),
        null != d.input.selectionStart)
      ) {
        clearTimeout(Yd);
        var b = (d.input.value = " " + (zb(e.from, e.to) ? "" : d.input.value)),
          c = 0;
        (d.prevInput = " "),
          (d.input.selectionStart = 1),
          (d.input.selectionEnd = b.length),
          (Yd = setTimeout(function f() {
            " " == d.prevInput && 0 == d.input.selectionStart
              ? V(a, fe.selectAll)(a)
              : c++ < 10
                ? (Yd = setTimeout(f, 500))
                : $(a);
          }, 200));
      }
    }
    var d = a.display,
      e = a.view.sel,
      f = db(a, b),
      g = d.scroller.scrollTop;
    if (f && !Kd) {
      (zb(e.from, e.to) || Ab(f, e.from) || !Ab(f, e.to)) && V(a, Gb)(a, f, f);
      var h = d.input.style.cssText;
      (d.inputDiv.style.position = "absolute"),
        (d.input.style.cssText =
          "position: fixed; width: 30px; height: 30px; top: " +
          (b.clientY - 5) +
          "px; left: " +
          (b.clientX - 5) +
          "px; z-index: 1000; background: white; outline: none;border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);"),
        _(a),
        $(a, !0),
        zb(e.from, e.to) && (d.input.value = d.prevInput = " "),
        Dd
          ? (Qc(b),
            Uc(window, "mouseup", function i() {
              Vc(window, "mouseup", i), setTimeout(c, 20);
            }))
          : setTimeout(c, 50);
    }
  }
  function ub(a, b, c, d, e, f) {
    var g = Td && fc(a.view.doc, b, c);
    if (!g) return vb(a, b, c, d, e, f);
    for (var h = g.length - 1; h >= 1; --h) vb(a, g[h].from, g[h].to, [""], f);
    return g.length ? vb(a, g[0].from, g[0].to, d, e, f) : void 0;
  }
  function vb(a, b, c, d, e, f) {
    if (!a.view.suppressEdits) {
      var g = a.view,
        h = g.doc,
        i = [];
      h.iter(b.line, c.line + 1, function (a) {
        i.push(oc(a.text, a.markedSpans));
      });
      var j = g.sel.from,
        k = g.sel.to,
        l = ec(nc(i[0]), nc(ad(i)), b.ch, c.ch, d),
        m = xb(a, b, c, l, e, f);
      return (
        g.history && Lc(a, b.line, d.length, i, f, j, k, g.sel.from, g.sel.to),
        m
      );
    }
  }
  function wb(a, b) {
    var c = a.view.doc,
      d = a.view.history,
      e = ("undo" == b ? d.done : d.undone).pop();
    if (e) {
      for (
        var f = {
            events: [],
            fromBefore: e.fromAfter,
            toBefore: e.toAfter,
            fromAfter: e.fromBefore,
            toAfter: e.toBefore,
          },
          g = e.events.length - 1;
        g >= 0;
        g -= 1
      ) {
        d.dirtyCounter += "undo" == b ? -1 : 1;
        var h = e.events[g],
          i = [],
          j = h.start + h.added;
        c.iter(h.start, j, function (a) {
          i.push(oc(a.text, a.markedSpans));
        }),
          f.events.push({ start: h.start, added: h.old.length, old: i });
        var k = g ? null : { from: e.fromBefore, to: e.toBefore };
        xb(
          a,
          { line: h.start, ch: 0 },
          { line: j - 1, ch: Ec(c, j - 1).text.length },
          h.old,
          k,
          b,
        );
      }
      ("undo" == b ? d.undone : d.done).push(f);
    }
  }
  function xb(a, b, c, d, e, f) {
    var g = a.view,
      h = g.doc,
      i = a.display;
    if (!g.suppressEdits) {
      var k = c.line - b.line,
        l = Ec(h, b.line),
        m = Ec(h, c.line),
        n = !1,
        o = b.line;
      a.options.lineWrapping ||
        ((o = Gc(jc(h, l))),
        h.iter(o, c.line + 1, function (a) {
          return j(h, a) == g.maxLineLength ? ((n = !0), !0) : void 0;
        }));
      var p = ad(d),
        q = R(i);
      if (0 == b.ch && 0 == c.ch && "" == mc(p)) {
        for (var r = [], s = 0, t = d.length - 1; t > s; ++s)
          r.push(rc(mc(d[s]), nc(d[s]), q));
        sc(a, m, m.text, nc(p)),
          k && h.remove(b.line, k, a),
          r.length && h.insert(b.line, r);
      } else if (l == m)
        if (1 == d.length)
          sc(
            a,
            l,
            l.text.slice(0, b.ch) + mc(d[0]) + l.text.slice(c.ch),
            nc(d[0]),
          );
        else {
          for (var r = [], s = 1, t = d.length - 1; t > s; ++s)
            r.push(rc(mc(d[s]), nc(d[s]), q));
          r.push(rc(mc(p) + l.text.slice(c.ch), nc(p), q)),
            sc(a, l, l.text.slice(0, b.ch) + mc(d[0]), nc(d[0])),
            h.insert(b.line + 1, r);
        }
      else if (1 == d.length)
        sc(
          a,
          l,
          l.text.slice(0, b.ch) + mc(d[0]) + m.text.slice(c.ch),
          nc(d[0]),
        ),
          h.remove(b.line + 1, k, a);
      else {
        var r = [];
        sc(a, l, l.text.slice(0, b.ch) + mc(d[0]), nc(d[0])),
          sc(a, m, mc(p) + m.text.slice(c.ch), nc(p));
        for (var s = 1, t = d.length - 1; t > s; ++s)
          r.push(rc(mc(d[s]), nc(d[s]), q));
        k > 1 && h.remove(b.line + 1, k - 1, a), h.insert(b.line + 1, r);
      }
      if (a.options.lineWrapping) {
        var u = Math.max(5, i.scroller.clientWidth / S(i) - 3);
        h.iter(b.line, b.line + d.length, function (a) {
          if (0 != a.height) {
            var b = (Math.ceil(a.text.length / u) || 1) * q;
            b != a.height && Fc(a, b);
          }
        });
      } else
        h.iter(o, b.line + d.length, function (a) {
          var b = j(h, a);
          b > g.maxLineLength &&
            ((g.maxLine = a),
            (g.maxLineLength = b),
            (g.maxLineChanged = !0),
            (n = !1));
        }),
          n && (a.curOp.updateMaxLine = !0);
      (g.frontier = Math.min(g.frontier, b.line)), C(a, 400);
      var v = d.length - k - 1;
      if ((W(a, b.line, c.line + 1, v), Yc(a, "change"))) {
        for (var s = 0; s < d.length; ++s)
          "string" != typeof d[s] && (d[s] = d[s].text);
        var w = { from: b, to: c, text: d, origin: f };
        if (a.curOp.textChanged) {
          for (var x = a.curOp.textChanged; x.next; x = x.next);
          x.next = w;
        } else a.curOp.textChanged = w;
      }
      var y,
        z,
        A = {
          line: b.line + d.length - 1,
          ch: mc(p).length + (1 == d.length ? b.ch : 0),
        };
      if (e && "string" != typeof e)
        e.from ? ((y = e.from), (z = e.to)) : (y = z = e);
      else if ("end" == e) y = z = A;
      else if ("start" == e) y = z = b;
      else if ("around" == e) (y = b), (z = A);
      else {
        var B = function (a) {
          if (Ab(a, b)) return a;
          if (!Ab(c, a)) return A;
          var d = a.line + v,
            e = a.ch;
          return (
            a.line == c.line &&
              (e += mc(p).length - (c.ch - (c.line == b.line ? b.ch : 0))),
            { line: d, ch: e }
          );
        };
        (y = B(g.sel.from)), (z = B(g.sel.to));
      }
      return Gb(a, y, z, null, !0), A;
    }
  }
  function yb(a, b, c, d, e) {
    if ((d || (d = c), Ab(d, c))) {
      var f = d;
      (d = c), (c = f);
    }
    return ub(a, c, d, se(b), null, e);
  }
  function zb(a, b) {
    return a.line == b.line && a.ch == b.ch;
  }
  function Ab(a, b) {
    return a.line < b.line || (a.line == b.line && a.ch < b.ch);
  }
  function Bb(a) {
    return { line: a.line, ch: a.ch };
  }
  function Cb(a, b) {
    return Math.max(0, Math.min(b, a.size - 1));
  }
  function Db(a, b) {
    if (b.line < 0) return { line: 0, ch: 0 };
    if (b.line >= a.size)
      return { line: a.size - 1, ch: Ec(a, a.size - 1).text.length };
    var c = b.ch,
      d = Ec(a, b.line).text.length;
    return null == c || c > d
      ? { line: b.line, ch: d }
      : 0 > c
        ? { line: b.line, ch: 0 }
        : b;
  }
  function Eb(a, b) {
    return b >= 0 && b < a.size;
  }
  function Fb(a, b, c, d) {
    var e = a.view.sel;
    if (e.shift || e.extend) {
      var f = e.anchor;
      if (c) {
        var g = Ab(b, f);
        g != Ab(c, f) ? ((f = b), (b = c)) : g != Ab(b, c) && (b = c);
      }
      Gb(a, f, b, d);
    } else Gb(a, b, c || b, d);
    a.curOp.userSelChange = !0;
  }
  function Gb(a, b, c, d, e) {
    a.view.goalColumn = null;
    var f = a.view.sel;
    if (
      ((e || !zb(b, f.anchor)) && (b = Ib(a, b, d, "push" != e)),
      (e || !zb(c, f.head)) && (c = Ib(a, c, d, "push" != e)),
      !zb(f.anchor, b) || !zb(f.head, c))
    ) {
      (f.anchor = b), (f.head = c);
      var g = Ab(c, b);
      (f.from = g ? c : b),
        (f.to = g ? b : c),
        (a.curOp.updateInput = !0),
        (a.curOp.selectionChanged = !0);
    }
  }
  function Hb(a) {
    Gb(a, a.view.sel.from, a.view.sel.to, null, "push");
  }
  function Ib(a, b, c, d) {
    var e = a.view.doc,
      f = !1,
      g = b,
      h = c || 1;
    a.view.cantEdit = !1;
    a: for (;;) {
      var i,
        j = Ec(e, g.line);
      if (j.markedSpans) {
        for (var k = 0; k < j.markedSpans.length; ++k) {
          var l = j.markedSpans[k],
            m = l.marker;
          if (
            (null == l.from ||
              (m.inclusiveLeft ? l.from <= g.ch : l.from < g.ch)) &&
            (null == l.to || (m.inclusiveRight ? l.to >= g.ch : l.to > g.ch))
          ) {
            if (d && m.clearOnEnter) {
              (i || (i = [])).push(m);
              continue;
            }
            if (!m.atomic) continue;
            var n = m.find()[0 > h ? "from" : "to"];
            if (
              zb(n, g) &&
              ((n.ch += h),
              n.ch < 0
                ? (n = n.line ? Db(e, { line: n.line - 1 }) : null)
                : n.ch > j.text.length &&
                  (n =
                    n.line < e.size - 1 ? { line: n.line + 1, ch: 0 } : null),
              !n)
            ) {
              if (f)
                return d
                  ? ((a.view.cantEdit = !0), { line: 0, ch: 0 })
                  : Ib(a, b, c, !0);
              (f = !0), (n = b), (h = -h);
            }
            g = n;
            continue a;
          }
        }
        if (i) for (var k = 0; k < i.length; ++k) i[k].clear();
      }
      return g;
    }
  }
  function Jb(a) {
    var b = a.view,
      c = Kb(a, b.sel.head);
    if (b.focused) {
      var d = a.display,
        e = d.sizer.getBoundingClientRect(),
        f = null;
      if (
        (c.top + e.top < 0
          ? (f = !0)
          : c.bottom + e.top >
              (window.innerHeight || document.documentElement.clientHeight) &&
            (f = !1),
        null != f && !Pd)
      ) {
        var g = "none" == d.cursor.style.display;
        g &&
          ((d.cursor.style.display = ""),
          (d.cursor.style.left = c.left + "px"),
          (d.cursor.style.top = c.top - d.viewOffset + "px")),
          d.cursor.scrollIntoView(f),
          g && (d.cursor.style.display = "none");
      }
    }
  }
  function Kb(a, b) {
    for (;;) {
      var c = !1,
        d = O(a, b),
        e = Mb(a, d.left, d.top, d.left, d.bottom),
        f = a.view.scrollTop,
        g = a.view.scrollLeft;
      if (
        (null != e.scrollTop &&
          (ib(a, e.scrollTop), Math.abs(a.view.scrollTop - f) > 1 && (c = !0)),
        null != e.scrollLeft &&
          (jb(a, e.scrollLeft),
          Math.abs(a.view.scrollLeft - g) > 1 && (c = !0)),
        !c)
      )
        return d;
    }
  }
  function Lb(a, b, c, d, e) {
    var f = Mb(a, b, c, d, e);
    null != f.scrollTop && ib(a, f.scrollTop),
      null != f.scrollLeft && jb(a, f.scrollLeft);
  }
  function Mb(a, b, c, d, e) {
    var f = a.display,
      g = G(f);
    (c += g), (e += g);
    var h = f.scroller.clientHeight - je,
      i = f.scroller.scrollTop,
      j = {},
      k = a.view.doc.height + 2 * g,
      l = g + 10 > c,
      m = e + g > k - 10;
    i > c
      ? (j.scrollTop = l ? 0 : Math.max(0, c))
      : e > i + h && (j.scrollTop = (m ? k : e) - h);
    var n = f.scroller.clientWidth - je,
      o = f.scroller.scrollLeft;
    (b += f.gutters.offsetWidth), (d += f.gutters.offsetWidth);
    var p = f.gutters.offsetWidth,
      q = p + 10 > b;
    return (
      o + p > b || q
        ? (q && (b = 0), (j.scrollLeft = Math.max(0, b - 10 - p)))
        : d > n + o - 3 && (j.scrollLeft = d + 10 - n),
      j
    );
  }
  function Nb(a, b, c, d) {
    var e = a.view.doc;
    if ((c || (c = "add"), "smart" == c))
      if (a.view.mode.indent) var f = F(a, b);
      else c = "prev";
    var g,
      h = a.options.tabSize,
      i = Ec(e, b),
      j = $c(i.text, null, h),
      k = i.text.match(/^\s*/)[0];
    if (
      "smart" == c &&
      ((g = a.view.mode.indent(f, i.text.slice(k.length), i.text)), g == ke)
    ) {
      if (!d) return;
      c = "prev";
    }
    "prev" == c
      ? (g = b ? $c(Ec(e, b - 1).text, null, h) : 0)
      : "add" == c
        ? (g = j + a.options.indentUnit)
        : "subtract" == c && (g = j - a.options.indentUnit),
      (g = Math.max(0, g));
    var l = "",
      m = 0;
    if (a.options.indentWithTabs)
      for (var n = Math.floor(g / h); n; --n) (m += h), (l += "	");
    g > m && (l += _c(g - m)),
      l != k &&
        yb(a, l, { line: b, ch: 0 }, { line: b, ch: k.length }, "input"),
      (i.stateAfter = null);
  }
  function Ob(a, b, c) {
    var d = b,
      e = b,
      f = a.view.doc;
    return (
      "number" == typeof b ? (e = Ec(f, Cb(f, b))) : (d = Gc(b)),
      null == d ? null : c(e, d) ? (W(a, d, d + 1), e) : null
    );
  }
  function Pb(a, b, c, d) {
    function e() {
      var a = i + b;
      return 0 > a || a == g.size ? !1 : ((i = a), (k = Ec(g, a)));
    }
    function f(a) {
      var c = (d ? ud : vd)(k, j, b, !0);
      if (null == c) {
        if (a || !e()) return !1;
        j = d ? (0 > b ? rd : qd)(k) : 0 > b ? k.text.length : 0;
      } else j = c;
      return !0;
    }
    var g = a.view.doc,
      h = a.view.sel.head,
      i = h.line,
      j = h.ch,
      k = Ec(g, i);
    if ("char" == c) f();
    else if ("column" == c) f(!0);
    else if ("word" == c)
      for (var l = !1; !(0 > b) || f(); ) {
        if (fd(k.text.charAt(j))) l = !0;
        else if (l) {
          0 > b && ((b = 1), f());
          break;
        }
        if (b > 0 && !f()) break;
      }
    return Ib(a, { line: i, ch: j }, b, !0);
  }
  function Qb(a, b) {
    var c = b.ch,
      d = b.ch;
    if (a) {
      b.after === !1 || d == a.length ? --c : ++d;
      for (
        var e = a.charAt(c),
          f = fd(e)
            ? fd
            : /\s/.test(e)
              ? function (a) {
                  return /\s/.test(a);
                }
              : function (a) {
                  return !/\s/.test(a) && !fd(a);
                };
        c > 0 && f(a.charAt(c - 1));

      )
        --c;
      for (; d < a.length && f(a.charAt(d)); ) ++d;
    }
    return { from: { line: b.line, ch: c }, to: { line: b.line, ch: d } };
  }
  function Rb(a, b) {
    Fb(a, { line: b, ch: 0 }, Db(a.view.doc, { line: b + 1, ch: 0 }));
  }
  function Sb(b, c, d, e) {
    (a.defaults[b] = c),
      d &&
        ($d[b] = e
          ? function (a, b, c) {
              c != ae && d(a, b, c);
            }
          : d);
  }
  function Tb(a, b) {
    if (b === !0) return b;
    if (a.copyState) return a.copyState(b);
    var c = {};
    for (var d in b) {
      var e = b[d];
      e instanceof Array && (e = e.concat([])), (c[d] = e);
    }
    return c;
  }
  function Ub(a, b, c) {
    return a.startState ? a.startState(b, c) : !0;
  }
  function Vb(a) {
    return "string" == typeof a ? ge[a] : a;
  }
  function Wb(a, b, c, d) {
    function e(b) {
      b = Vb(b);
      var f = b[a];
      if (f === !1) return d && d(), !0;
      if (null != f && c(f)) return !0;
      if (b.nofallthrough) return d && d(), !0;
      var g = b.fallthrough;
      if (null == g) return !1;
      if ("[object Array]" != Object.prototype.toString.call(g)) return e(g);
      for (var h = 0, i = g.length; i > h; ++h) if (e(g[h])) return !0;
      return !1;
    }
    for (var f = 0; f < b.length; ++f) if (e(b[f])) return !0;
  }
  function Xb(a) {
    var b = ve[Tc(a, "keyCode")];
    return "Ctrl" == b || "Alt" == b || "Shift" == b || "Mod" == b;
  }
  function Yb(a, b) {
    (this.pos = this.start = 0), (this.string = a), (this.tabSize = b || 8);
  }
  function Zb(a, b) {
    (this.lines = []), (this.type = b), (this.cm = a);
  }
  function $b(a, b, c, d, e) {
    var f = a.view.doc,
      g = new Zb(a, e);
    if ("range" == e && !Ab(b, c)) return g;
    if (d) for (var h in d) d.hasOwnProperty(h) && (g[h] = d[h]);
    g.replacedWith &&
      ((g.collapsed = !0),
      (g.replacedWith = hd("span", [g.replacedWith], "CodeMirror-widget"))),
      g.collapsed && (Ud = !0);
    var i,
      j,
      k = b.line,
      l = 0;
    if (
      (f.iter(k, c.line + 1, function (a) {
        var d = { from: null, to: null, marker: g };
        (l += a.text.length),
          k == b.line && ((d.from = b.ch), (l -= b.ch)),
          k == c.line && ((d.to = c.ch), (l -= a.text.length - c.ch)),
          g.collapsed &&
            (k == c.line && (j = gc(a, c.ch)),
            k == b.line ? (i = gc(a, b.ch)) : Fc(a, 0)),
          bc(a, d),
          g.collapsed && k == b.line && kc(a) && Fc(a, 0),
          ++k;
      }),
      g.readOnly &&
        ((Td = !0),
        (a.view.history.done.length || a.view.history.undone.length) &&
          a.clearHistory()),
      g.collapsed)
    ) {
      if (i != j)
        throw new Error(
          "Inserting collapsed marker overlapping an existing one",
        );
      (g.size = l), (g.atomic = !0);
    }
    return (
      (g.className || g.startStyle || g.endStyle || g.collapsed) &&
        W(a, b.line, c.line + 1),
      g.atomic && Hb(a),
      g
    );
  }
  function _b(a, b) {
    if (a)
      for (var c = 0; c < a.length; ++c) {
        var d = a[c];
        if (d.marker == b) return d;
      }
  }
  function ac(a, b) {
    for (var c, d = 0; d < a.length; ++d)
      a[d] != b && (c || (c = [])).push(a[d]);
    return c;
  }
  function bc(a, b) {
    (a.markedSpans = a.markedSpans ? a.markedSpans.concat([b]) : [b]),
      b.marker.lines.push(a);
  }
  function cc(a, b) {
    if (a)
      for (var c, d = 0; d < a.length; ++d) {
        var e = a[d],
          f = e.marker,
          g = null == e.from || (f.inclusiveLeft ? e.from <= b : e.from < b);
        if (g || ("bookmark" == f.type && e.from == b)) {
          var h = null == e.to || (f.inclusiveRight ? e.to >= b : e.to > b);
          (c || (c = [])).push({
            from: e.from,
            to: h ? null : e.to,
            marker: f,
          });
        }
      }
    return c;
  }
  function dc(a, b, c) {
    if (a)
      for (var d, e = 0; e < a.length; ++e) {
        var f = a[e],
          g = f.marker,
          h = null == f.to || (g.inclusiveRight ? f.to >= c : f.to > c);
        if (h || ("bookmark" == g.type && f.from == c && f.from != b)) {
          var i =
            null == f.from || (g.inclusiveLeft ? f.from <= c : f.from < c);
          (d || (d = [])).push({
            from: i ? null : f.from - c,
            to: null == f.to ? null : f.to - c,
            marker: g,
          });
        }
      }
    return d;
  }
  function ec(a, b, c, d, e) {
    if (!a && !b) return e;
    var f = cc(a, c),
      g = dc(b, c, d),
      h = 1 == e.length,
      i = ad(e).length + (h ? c : 0);
    if (f)
      for (var j = 0; j < f.length; ++j) {
        var k = f[j];
        if (null == k.to) {
          var l = _b(g, k.marker);
          l ? h && (k.to = null == l.to ? null : l.to + i) : (k.to = c);
        }
      }
    if (g)
      for (var j = 0; j < g.length; ++j) {
        var k = g[j];
        if ((null != k.to && (k.to += i), null == k.from)) {
          var l = _b(f, k.marker);
          l || ((k.from = i), h && (f || (f = [])).push(k));
        } else (k.from += i), h && (f || (f = [])).push(k);
      }
    var m = [oc(e[0], f)];
    if (!h) {
      var n,
        o = e.length - 2;
      if (o > 0 && f)
        for (var j = 0; j < f.length; ++j)
          null == f[j].to &&
            (n || (n = [])).push({ from: null, to: null, marker: f[j].marker });
      for (var j = 0; o > j; ++j) m.push(oc(e[j + 1], n));
      m.push(oc(ad(e), g));
    }
    return m;
  }
  function fc(a, b, c) {
    var d = null;
    if (
      (a.iter(b.line, c.line + 1, function (a) {
        if (a.markedSpans)
          for (var b = 0; b < a.markedSpans.length; ++b) {
            var c = a.markedSpans[b].marker;
            !c.readOnly || (d && -1 != cd(d, c)) || (d || (d = [])).push(c);
          }
      }),
      !d)
    )
      return null;
    for (var e = [{ from: b, to: c }], f = 0; f < d.length; ++f)
      for (var g = d[f].find(), h = 0; h < e.length; ++h) {
        var i = e[h];
        if (Ab(g.from, i.to) && !Ab(g.to, i.from)) {
          var j = [h, 1];
          Ab(i.from, g.from) && j.push({ from: i.from, to: g.from }),
            Ab(g.to, i.to) && j.push({ from: g.to, to: i.to }),
            e.splice.apply(e, j),
            (h += j.length - 1);
        }
      }
    return e;
  }
  function gc(a, b) {
    var c,
      d = Ud && a.markedSpans;
    if (d)
      for (var e, f = 0; f < d.length; ++f)
        (e = d[f]),
          e.marker.collapsed &&
            (null == e.from || e.from < b) &&
            (null == e.to || e.to > b) &&
            (!c || c.width < e.marker.width) &&
            (c = e.marker);
    return c;
  }
  function hc(a) {
    return gc(a, -1);
  }
  function ic(a) {
    return gc(a, a.text.length + 1);
  }
  function jc(a, b) {
    for (var c; (c = hc(b)); ) b = Ec(a, c.find().from.line);
    return b;
  }
  function kc(a) {
    var b = Ud && a.markedSpans;
    if (b)
      for (var c, d = 0; d < b.length; ++d)
        if (((c = b[d]), c.marker.collapsed)) {
          if (null == c.from) return !0;
          if (0 == c.from && c.marker.inclusiveLeft && lc(a, c)) return !0;
        }
  }
  function lc(a, b) {
    if (null == b.to || (b.marker.inclusiveRight && b.to == a.text.length))
      return !0;
    for (var c, d = 0; d < a.markedSpans.length; ++d)
      if (
        ((c = a.markedSpans[d]),
        c.marker.collapsed &&
          c.from == b.to &&
          (c.marker.inclusiveLeft || b.marker.inclusiveRight) &&
          lc(a, c))
      )
        return !0;
  }
  function mc(a) {
    return "string" == typeof a ? a : a.text;
  }
  function nc(a) {
    if ("string" == typeof a) return null;
    for (var b = a.markedSpans, c = null, d = 0; d < b.length; ++d)
      b[d].marker.explicitlyCleared
        ? c || (c = b.slice(0, d))
        : c && c.push(b[d]);
    return c ? (c.length ? c : null) : b;
  }
  function oc(a, b) {
    return b ? { text: a, markedSpans: b } : a;
  }
  function pc(a) {
    var b = a.markedSpans;
    if (b) {
      for (var c = 0; c < b.length; ++c) {
        var d = b[c].marker.lines,
          e = cd(d, a);
        d.splice(e, 1);
      }
      a.markedSpans = null;
    }
  }
  function qc(a, b) {
    if (b) {
      for (var c = 0; c < b.length; ++c) b[c].marker.lines.push(a);
      a.markedSpans = b;
    }
  }
  function rc(a, b, c) {
    var d = { text: a, height: c };
    return qc(d, b), kc(d) && (d.height = 0), d;
  }
  function sc(a, b, c, d) {
    (b.text = c),
      (b.stateAfter = b.styles = null),
      null != b.order && (b.order = null),
      pc(b),
      qc(b, d),
      kc(b) ? (b.height = 0) : b.height || (b.height = R(a.display)),
      Xc(a, b, "change");
  }
  function tc(a) {
    (a.parent = null), pc(a);
  }
  function uc(a, b, c) {
    var d = a.view.mode,
      e = a.options.flattenSpans,
      f = !b.styles,
      g = 0,
      h = "",
      i = null,
      j = new Yb(b.text, a.options.tabSize),
      k = b.styles || (b.styles = []);
    for ("" == b.text && d.blankLine && d.blankLine(c); !j.eol(); ) {
      var l = d.token(j, c),
        m = j.current();
      if (
        ((j.start = j.pos),
        e && i == l
          ? (h += m)
          : (h &&
              ((f = f || g >= k.length || h != k[g] || i != k[g + 1]),
              (k[g++] = h),
              (k[g++] = i)),
            (h = m),
            (i = l)),
        j.pos > 5e3)
      )
        break;
    }
    return (
      h &&
        ((f = f || g >= k.length || h != k[g] || i != k[g + 1]),
        (k[g++] = h),
        (k[g++] = i)),
      j.pos > 5e3 && ((k[g++] = b.text.slice(j.pos)), (k[g++] = null)),
      g != k.length && ((k.length = g), (f = !0)),
      f
    );
  }
  function vc(a, b, c) {
    var d = a.view.mode,
      e = new Yb(b.text, a.options.tabSize);
    for (
      "" == b.text && d.blankLine && d.blankLine(c);
      !e.eol() && e.pos <= 5e3;

    )
      d.token(e, c), (e.start = e.pos);
  }
  function wc(a) {
    return a ? he[a] || (he[a] = "cm-" + a.replace(/ +/g, " cm-")) : null;
  }
  function xc(a, b, c) {
    for (var d, e, f, g = b, h = !0; (d = hc(g)); )
      (h = !1), (g = Ec(a.view.doc, d.find().from.line)), e || (e = g);
    var i = {
      pre: hd("pre"),
      col: 0,
      pos: 0,
      display: !c,
      measure: null,
      addedOne: !1,
      cm: a,
    };
    g.textClass && (i.pre.className = g.textClass);
    do {
      g.styles || uc(a, g, (g.stateAfter = F(a, Gc(g)))),
        (i.measure = g == b && c),
        (i.pos = 0),
        (i.addToken = i.measure ? zc : yc),
        c &&
          f &&
          g != b &&
          !i.addedOne &&
          ((c[0] = i.pre.appendChild(md(a.display.measure))),
          (i.addedOne = !0));
      var j = Bc(g, i);
      (f = g == e), j && ((g = Ec(a.view.doc, j.to.line)), (h = !1));
    } while (j);
    return (
      c &&
        !i.addedOne &&
        (c[0] = i.pre.appendChild(h ? hd("span", " ") : md(a.display.measure))),
      i.pre.firstChild ||
        kc(b) ||
        i.pre.appendChild(document.createTextNode(" ")),
      i.pre
    );
  }
  function yc(a, b, c, d, e) {
    if (b) {
      if (ie.test(b))
        for (var f = document.createDocumentFragment(), g = 0; ; ) {
          ie.lastIndex = g;
          var h = ie.exec(b),
            i = h ? h.index - g : b.length - g;
          if (
            (i &&
              (f.appendChild(document.createTextNode(b.slice(g, g + i))),
              (a.col += i)),
            !h)
          )
            break;
          if (((g += i + 1), "	" == h[0])) {
            var j = a.cm.options.tabSize,
              k = j - (a.col % j);
            f.appendChild(hd("span", _c(k), "cm-tab")), (a.col += k);
          } else {
            var l = hd("span", "•", "cm-invalidchar");
            (l.title = "\\u" + h[0].charCodeAt(0).toString(16)),
              f.appendChild(l),
              (a.col += 1);
          }
        }
      else {
        a.col += b.length;
        var f = document.createTextNode(b);
      }
      if (c || d || e || a.measure) {
        var m = c || "";
        return (
          d && (m += d), e && (m += e), a.pre.appendChild(hd("span", [f], m))
        );
      }
      a.pre.appendChild(f);
    }
  }
  function zc(a, b, c, d, e) {
    for (var f = 0; f < b.length; ++f)
      f &&
        f < b.length - 1 &&
        a.cm.options.lineWrapping &&
        pe.test(b.slice(f - 1, f + 1)) &&
        a.pre.appendChild(hd("wbr")),
        (a.measure[a.pos++] = yc(
          a,
          b.charAt(f),
          c,
          0 == f && d,
          f == b.length - 1 && e,
        ));
    b.length && (a.addedOne = !0);
  }
  function Ac(a, b, c) {
    c &&
      (a.display || (c = c.cloneNode(!0)),
      a.pre.appendChild(c),
      a.measure && b && ((a.measure[a.pos] = c), (a.addedOne = !0))),
      (a.pos += b);
  }
  function Bc(a, b) {
    var c = a.styles,
      d = a.markedSpans;
    if (d)
      for (
        var e,
          f,
          g,
          h,
          i,
          j = a.text,
          k = j.length,
          l = 0,
          m = 0,
          n = "",
          o = 0;
        ;

      ) {
        if (o == l) {
          (f = g = h = ""), (i = null), (o = 1 / 0);
          for (var p = null, q = 0; q < d.length; ++q) {
            var r = d[q],
              s = r.marker;
            r.from <= l && (null == r.to || r.to > l)
              ? (null != r.to && o > r.to && ((o = r.to), (g = "")),
                s.className && (f += " " + s.className),
                s.startStyle && r.from == l && (h += " " + s.startStyle),
                s.endStyle && r.to == o && (g += " " + s.endStyle),
                s.collapsed && (!i || i.marker.width < s.width) && (i = r))
              : r.from > l && o > r.from && (o = r.from),
              "bookmark" == s.type &&
                r.from == l &&
                s.replacedWith &&
                (p = s.replacedWith);
          }
          if (
            i &&
            (i.from || 0) == l &&
            (Ac(
              b,
              (null == i.to ? k : i.to) - l,
              null != i.from && i.marker.replacedWith,
            ),
            null == i.to)
          )
            return i.marker.find();
          p && !i && Ac(b, 0, p);
        }
        if (l >= k) break;
        for (var t = Math.min(k, o); ; ) {
          if (n) {
            var u = l + n.length;
            if (!i) {
              var v = u > t ? n.slice(0, t - l) : n;
              b.addToken(b, v, e + f, h, l + v.length == o ? g : "");
            }
            if (u >= t) {
              (n = n.slice(t - l)), (l = t);
              break;
            }
            (l = u), (h = "");
          }
          (n = c[m++]), (e = wc(c[m++]));
        }
      }
    else
      for (var m = 0; m < c.length; m += 2) b.addToken(b, c[m], wc(c[m + 1]));
  }
  function Cc(a) {
    (this.lines = a), (this.parent = null);
    for (var b = 0, c = a.length, d = 0; c > b; ++b)
      (a[b].parent = this), (d += a[b].height);
    this.height = d;
  }
  function Dc(a) {
    this.children = a;
    for (var b = 0, c = 0, d = 0, e = a.length; e > d; ++d) {
      var f = a[d];
      (b += f.chunkSize()), (c += f.height), (f.parent = this);
    }
    (this.size = b), (this.height = c), (this.parent = null);
  }
  function Ec(a, b) {
    for (; !a.lines; )
      for (var c = 0; ; ++c) {
        var d = a.children[c],
          e = d.chunkSize();
        if (e > b) {
          a = d;
          break;
        }
        b -= e;
      }
    return a.lines[b];
  }
  function Fc(a, b) {
    for (var c = b - a.height, d = a; d; d = d.parent) d.height += c;
  }
  function Gc(a) {
    if (null == a.parent) return null;
    for (
      var b = a.parent, c = cd(b.lines, a), d = b.parent;
      d;
      b = d, d = d.parent
    )
      for (var e = 0; d.children[e] != b; ++e) c += d.children[e].chunkSize();
    return c;
  }
  function Hc(a, b) {
    var c = 0;
    a: do {
      for (var d = 0, e = a.children.length; e > d; ++d) {
        var f = a.children[d],
          g = f.height;
        if (g > b) {
          a = f;
          continue a;
        }
        (b -= g), (c += f.chunkSize());
      }
      return c;
    } while (!a.lines);
    for (var d = 0, e = a.lines.length; e > d; ++d) {
      var h = a.lines[d],
        i = h.height;
      if (i > b) break;
      b -= i;
    }
    return c + d;
  }
  function Ic(a, b) {
    b = jc(a.view.doc, b);
    for (var c = 0, d = b.parent, e = 0; e < d.lines.length; ++e) {
      var f = d.lines[e];
      if (f == b) break;
      c += f.height;
    }
    for (var g = d.parent; g; d = g, g = d.parent)
      for (var e = 0; e < g.children.length; ++e) {
        var h = g.children[e];
        if (h == d) break;
        c += h.height;
      }
    return c;
  }
  function Jc(a) {
    var b = a.order;
    return null == b && (b = a.order = we(a.text)), b;
  }
  function Kc() {
    return {
      done: [],
      undone: [],
      lastTime: 0,
      lastOp: null,
      lastOrigin: null,
      dirtyCounter: 0,
    };
  }
  function Lc(a, b, c, d, e, f, g, h, i) {
    var j = a.view.history;
    j.undone.length = 0;
    var k = +new Date(),
      l = ad(j.done);
    if (
      l &&
      (j.lastOp == a.curOp.id ||
        (j.lastOrigin == e &&
          ("input" == e || "delete" == e) &&
          j.lastTime > k - 600))
    ) {
      var m = ad(l.events);
      if (m.start > b + d.length || m.start + m.added < b)
        l.events.push({ start: b, added: c, old: d });
      else {
        for (
          var n = Math.max(0, m.start - b),
            o = Math.max(0, b + d.length - (m.start + m.added)),
            p = n;
          p > 0;
          --p
        )
          m.old.unshift(d[p - 1]);
        for (var p = o; p > 0; --p) m.old.push(d[d.length - p]);
        n && (m.start = b), (m.added += c - (d.length - n - o));
      }
      (l.fromAfter = h), (l.toAfter = i);
    } else {
      for (
        l = {
          events: [{ start: b, added: c, old: d }],
          fromBefore: f,
          toBefore: g,
          fromAfter: h,
          toAfter: i,
        },
          j.done.push(l);
        j.done.length > a.options.undoDepth;

      )
        j.done.shift();
      j.dirtyCounter < 0 ? (j.dirtyCounter = 0 / 0) : j.dirtyCounter++;
    }
    (j.lastTime = k), (j.lastOp = a.curOp.id), (j.lastOrigin = e);
  }
  function Mc() {
    Qc(this);
  }
  function Nc(a) {
    return a.stop || (a.stop = Mc), a;
  }
  function Oc(a) {
    a.preventDefault ? a.preventDefault() : (a.returnValue = !1);
  }
  function Pc(a) {
    a.stopPropagation ? a.stopPropagation() : (a.cancelBubble = !0);
  }
  function Qc(a) {
    Oc(a), Pc(a);
  }
  function Rc(a) {
    return a.target || a.srcElement;
  }
  function Sc(a) {
    var b = a.which;
    return (
      null == b &&
        (1 & a.button
          ? (b = 1)
          : 2 & a.button
            ? (b = 3)
            : 4 & a.button && (b = 2)),
      Sd && a.ctrlKey && 1 == b && (b = 3),
      b
    );
  }
  function Tc(a, b) {
    var c = a.override && a.override.hasOwnProperty(b);
    return c ? a.override[b] : a[b];
  }
  function Uc(a, b, c) {
    if (a.addEventListener) a.addEventListener(b, c, !1);
    else if (a.attachEvent) a.attachEvent("on" + b, c);
    else {
      var d = a._handlers || (a._handlers = {}),
        e = d[b] || (d[b] = []);
      e.push(c);
    }
  }
  function Vc(a, b, c) {
    if (a.removeEventListener) a.removeEventListener(b, c, !1);
    else if (a.detachEvent) a.detachEvent("on" + b, c);
    else {
      var d = a._handlers && a._handlers[b];
      if (!d) return;
      for (var e = 0; e < d.length; ++e)
        if (d[e] == c) {
          d.splice(e, 1);
          break;
        }
    }
  }
  function Wc(a, b) {
    var c = a._handlers && a._handlers[b];
    if (c)
      for (
        var d = Array.prototype.slice.call(arguments, 2), e = 0;
        e < c.length;
        ++e
      )
        c[e].apply(null, d);
  }
  function Xc(a, b, c) {
    function d(a) {
      return function () {
        a.apply(null, f);
      };
    }
    var e = b._handlers && b._handlers[c];
    if (e)
      for (
        var f = Array.prototype.slice.call(arguments, 3),
          g = a.curOp && a.curOp.delayedCallbacks,
          h = 0;
        h < e.length;
        ++h
      )
        g ? g.push(d(e[h])) : e[h].apply(null, f);
  }
  function Yc(a, b) {
    var c = a._handlers && a._handlers[b];
    return c && c.length > 0;
  }
  function Zc() {
    this.id = null;
  }
  function $c(a, b, c) {
    null == b && ((b = a.search(/[^\s\u00a0]/)), -1 == b && (b = a.length));
    for (var d = 0, e = 0; b > d; ++d)
      "	" == a.charAt(d) ? (e += c - (e % c)) : ++e;
    return e;
  }
  function _c(a) {
    for (; le.length <= a; ) le.push(ad(le) + " ");
    return le[a];
  }
  function ad(a) {
    return a[a.length - 1];
  }
  function bd(a) {
    Qd
      ? ((a.selectionStart = 0), (a.selectionEnd = a.value.length))
      : a.select();
  }
  function cd(a, b) {
    if (a.indexOf) return a.indexOf(b);
    for (var c = 0, d = a.length; d > c; ++c) if (a[c] == b) return c;
    return -1;
  }
  function dd(a) {
    for (var b = [], c = 0; a > c; ++c) b.push(void 0);
    return b;
  }
  function ed(a) {
    var b = Array.prototype.slice.call(arguments, 1);
    return function () {
      return a.apply(null, b);
    };
  }
  function fd(a) {
    return (
      /\w/.test(a) ||
      (a > "" && (a.toUpperCase() != a.toLowerCase() || me.test(a)))
    );
  }
  function gd(a) {
    var b = 0;
    for (var c in a) a.hasOwnProperty(c) && a[c] && ++b;
    return !b;
  }
  function hd(a, b, c, d) {
    var e = document.createElement(a);
    if (
      (c && (e.className = c), d && (e.style.cssText = d), "string" == typeof b)
    )
      kd(e, b);
    else if (b) for (var f = 0; f < b.length; ++f) e.appendChild(b[f]);
    return e;
  }
  function id(a) {
    return (a.innerHTML = ""), a;
  }
  function jd(a, b) {
    return id(a).appendChild(b);
  }
  function kd(a, b) {
    Gd
      ? ((a.innerHTML = ""), a.appendChild(document.createTextNode(b)))
      : (a.textContent = b);
  }
  function ld(a) {
    if (null != qe) return qe;
    var b = hd(
      "div",
      null,
      null,
      "width: 50px; height: 50px; overflow-x: scroll",
    );
    return (
      jd(a, b), b.offsetWidth && (qe = b.offsetHeight - b.clientHeight), qe || 0
    );
  }
  function md(a) {
    if (null == re) {
      var b = hd("span", "​");
      jd(a, hd("span", [b, document.createTextNode("x")])),
        0 != a.firstChild.offsetHeight &&
          (re = b.offsetWidth <= 1 && b.offsetHeight > 2 && !Fd);
    }
    return re
      ? hd("span", "​")
      : hd(
          "span",
          " ",
          null,
          "display: inline-block; width: 1px; margin-right: -1px",
        );
  }
  function nd(a, b, c, d) {
    if (!a) return d(b, c, "ltr");
    for (var e = 0; e < a.length; ++e) {
      var f = a[e];
      f.from < c &&
        f.to > b &&
        d(Math.max(f.from, b), Math.min(f.to, c), 1 == f.level ? "rtl" : "ltr");
    }
  }
  function od(a) {
    return a.level % 2 ? a.to : a.from;
  }
  function pd(a) {
    return a.level % 2 ? a.from : a.to;
  }
  function qd(a) {
    var b = Jc(a);
    return b ? od(b[0]) : 0;
  }
  function rd(a) {
    var b = Jc(a);
    return b ? pd(ad(b)) : a.text.length;
  }
  function sd(a, b) {
    var c = Ec(a.view.doc, b),
      d = jc(a.view.doc, c);
    d != c && (b = Gc(d));
    var e = Jc(d),
      f = e ? (e[0].level % 2 ? rd(d) : qd(d)) : 0;
    return { line: b, ch: f };
  }
  function td(a, b) {
    for (var c, d; (c = ic((d = Ec(a.view.doc, b)))); ) b = c.find().to.line;
    var e = Jc(d),
      f = e ? (e[0].level % 2 ? qd(d) : rd(d)) : d.text.length;
    return { line: b, ch: f };
  }
  function ud(a, b, c, d) {
    var e = Jc(a);
    if (!e) return vd(a, b, c, d);
    for (
      var f = d
          ? function (b, c) {
              do b += c;
              while (b > 0 && ne.test(a.text.charAt(b)));
              return b;
            }
          : function (a, b) {
              return a + b;
            },
        g = e[0].level,
        h = 0;
      h < e.length;
      ++h
    ) {
      var i = e[h],
        j = i.level % 2 == g;
      if ((i.from < b && i.to > b) || (j && (i.from == b || i.to == b))) break;
    }
    for (var k = f(b, i.level % 2 ? -c : c); null != k; )
      if (i.level % 2 == g) {
        if (!(k < i.from || k > i.to)) break;
        (i = e[(h += c)]),
          (k = i && (c > 0 == i.level % 2 ? f(i.to, -1) : f(i.from, 1)));
      } else if (k == od(i)) (i = e[--h]), (k = i && pd(i));
      else {
        if (k != pd(i)) break;
        (i = e[++h]), (k = i && od(i));
      }
    return 0 > k || k > a.text.length ? null : k;
  }
  function vd(a, b, c, d) {
    var e = b + c;
    if (d) for (; e > 0 && ne.test(a.text.charAt(e)); ) e += c;
    return 0 > e || e > a.text.length ? null : e;
  }
  var wd,
    xd,
    yd,
    zd,
    Ad,
    Bd,
    Cd,
    Dd = /gecko\/\d/i.test(navigator.userAgent),
    Ed = /MSIE \d/.test(navigator.userAgent),
    Fd = /MSIE [1-7]\b/.test(navigator.userAgent),
    Gd = /MSIE [1-8]\b/.test(navigator.userAgent),
    Hd = /WebKit\//.test(navigator.userAgent),
    Id = Hd && /Qt\/\d+\.\d+/.test(navigator.userAgent),
    Jd = /Chrome\//.test(navigator.userAgent),
    Kd = /Opera\//.test(navigator.userAgent),
    Ld = /Apple Computer/.test(navigator.vendor),
    Md = /KHTML\//.test(navigator.userAgent),
    Nd = /Mac OS X 1\d\D([7-9]|\d\d)\D/.test(navigator.userAgent),
    Od = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent),
    Pd = /PhantomJS/.test(navigator.userAgent),
    Qd =
      /AppleWebKit/.test(navigator.userAgent) &&
      /Mobile\/\w+/.test(navigator.userAgent),
    Rd =
      Qd ||
      /Android|webOS|BlackBerry|Opera Mini|IEMobile/i.test(navigator.userAgent),
    Sd = Qd || /Mac/.test(navigator.platform),
    Td = !1,
    Ud = !1,
    Vd = 0,
    Wd = null;
  Ed ? (Wd = -0.53) : Dd ? (Wd = 15) : Jd ? (Wd = -0.7) : Ld && (Wd = -1 / 3);
  var Xd,
    Yd,
    Zd = null;
  a.prototype = {
    getValue: function (a) {
      var b = [],
        c = this.view.doc;
      return (
        c.iter(0, c.size, function (a) {
          b.push(a.text);
        }),
        b.join(a || "\n")
      );
    },
    setValue: V(null, function (a) {
      var b = this.view.doc,
        c = { line: 0, ch: 0 },
        d = Ec(b, b.size - 1).text.length;
      vb(this, c, { line: b.size - 1, ch: d }, se(a), c, c, "setValue");
    }),
    getSelection: function (a) {
      return this.getRange(this.view.sel.from, this.view.sel.to, a);
    },
    replaceSelection: V(null, function (a, b, c) {
      var d = this.view.sel;
      ub(this, d.from, d.to, se(a), b || "around", c);
    }),
    focus: function () {
      window.focus(), _(this), rb(this), Y(this);
    },
    setOption: function (a, b) {
      var c = this.options,
        d = c[a];
      (c[a] != b || "mode" == a) &&
        ((c[a] = b), $d.hasOwnProperty(a) && V(this, $d[a])(this, b, d));
    },
    getOption: function (a) {
      return this.options[a];
    },
    getMode: function () {
      return this.view.mode;
    },
    addKeyMap: function (a) {
      this.view.keyMaps.push(a);
    },
    removeKeyMap: function (a) {
      for (var b = this.view.keyMaps, c = 0; c < b.length; ++c)
        if (("string" == typeof a ? b[c].name : b[c]) == a)
          return b.splice(c, 1), !0;
    },
    undo: V(null, function () {
      wb(this, "undo");
    }),
    redo: V(null, function () {
      wb(this, "redo");
    }),
    indentLine: V(null, function (a, b, c) {
      "string" != typeof b &&
        (b =
          null == b
            ? this.options.smartIndent
              ? "smart"
              : "prev"
            : b
              ? "add"
              : "subtract"),
        Eb(this.view.doc, a) && Nb(this, a, b, c);
    }),
    indentSelection: V(null, function (a) {
      var b = this.view.sel;
      if (zb(b.from, b.to)) return Nb(this, b.from.line, a);
      for (var c = b.to.line - (b.to.ch ? 0 : 1), d = b.from.line; c >= d; ++d)
        Nb(this, d, a);
    }),
    historySize: function () {
      var a = this.view.history;
      return { undo: a.done.length, redo: a.undone.length };
    },
    clearHistory: function () {
      this.view.history = Kc();
    },
    markClean: function () {
      (this.view.history.dirtyCounter = 0),
        (this.view.history.lastOp = this.view.history.lastOrigin = null);
    },
    isClean: function () {
      return 0 == this.view.history.dirtyCounter;
    },
    getHistory: function () {
      function a(a) {
        for (var b, c = 0, d = []; c < a.length; ++c) {
          var e = a[c];
          d.push({
            events: (b = []),
            fromBefore: e.fromBefore,
            toBefore: e.toBefore,
            fromAfter: e.fromAfter,
            toAfter: e.toAfter,
          });
          for (var f = 0, g = e.events; f < g.length; ++f) {
            var h = [],
              i = g[f];
            b.push({ start: i.start, added: i.added, old: h });
            for (var j = 0; j < i.old.length; ++j) h.push(mc(i.old[j]));
          }
        }
        return d;
      }
      var b = this.view.history;
      return { done: a(b.done), undone: a(b.undone) };
    },
    setHistory: function (a) {
      var b = (this.view.history = Kc());
      (b.done = a.done), (b.undone = a.undone);
    },
    getTokenAt: function (a) {
      var b = this.view.doc;
      a = Db(b, a);
      for (
        var c = F(this, a.line),
          d = this.view.mode,
          e = Ec(b, a.line),
          f = new Yb(e.text, this.options.tabSize);
        f.pos < a.ch && !f.eol();

      ) {
        f.start = f.pos;
        var g = d.token(f, c);
      }
      return {
        start: f.start,
        end: f.pos,
        string: f.current(),
        className: g || null,
        type: g || null,
        state: c,
      };
    },
    getStateAfter: function (a) {
      var b = this.view.doc;
      return (a = Cb(b, null == a ? b.size - 1 : a)), F(this, a + 1);
    },
    cursorCoords: function (a, b) {
      var c,
        d = this.view.sel;
      return (
        (c =
          null == a
            ? d.head
            : "object" == typeof a
              ? Db(this.view.doc, a)
              : a
                ? d.from
                : d.to),
        O(this, c, b || "page")
      );
    },
    charCoords: function (a, b) {
      return N(this, Db(this.view.doc, a), b || "page");
    },
    coordsChar: function (a) {
      var b = this.display.lineSpace.getBoundingClientRect();
      return P(this, a.left - b.left, a.top - b.top);
    },
    defaultTextHeight: function () {
      return R(this.display);
    },
    markText: V(null, function (a, b, c) {
      return $b(this, Db(this.view.doc, a), Db(this.view.doc, b), c, "range");
    }),
    setBookmark: V(null, function (a, b) {
      return (
        (a = Db(this.view.doc, a)),
        $b(this, a, a, b ? { replacedWith: b } : {}, "bookmark")
      );
    }),
    findMarksAt: function (a) {
      var b = this.view.doc;
      a = Db(b, a);
      var c = [],
        d = Ec(b, a.line).markedSpans;
      if (d)
        for (var e = 0; e < d.length; ++e) {
          var f = d[e];
          (null == f.from || f.from <= a.ch) &&
            (null == f.to || f.to >= a.ch) &&
            c.push(f.marker);
        }
      return c;
    },
    setGutterMarker: V(null, function (a, b, c) {
      return Ob(this, a, function (a) {
        var d = a.gutterMarkers || (a.gutterMarkers = {});
        return (d[b] = c), !c && gd(d) && (a.gutterMarkers = null), !0;
      });
    }),
    clearGutter: V(null, function (a) {
      var b = 0,
        c = this,
        d = c.view.doc;
      d.iter(0, d.size, function (d) {
        d.gutterMarkers &&
          d.gutterMarkers[a] &&
          ((d.gutterMarkers[a] = null),
          W(c, b, b + 1),
          gd(d.gutterMarkers) && (d.gutterMarkers = null)),
          ++b;
      });
    }),
    addLineClass: V(null, function (a, b, c) {
      return Ob(this, a, function (a) {
        var d =
          "text" == b
            ? "textClass"
            : "background" == b
              ? "bgClass"
              : "wrapClass";
        if (a[d]) {
          if (new RegExp("\\b" + c + "\\b").test(a[d])) return !1;
          a[d] += " " + c;
        } else a[d] = c;
        return !0;
      });
    }),
    removeLineClass: V(null, function (a, b, c) {
      return Ob(this, a, function (a) {
        var d =
            "text" == b
              ? "textClass"
              : "background" == b
                ? "bgClass"
                : "wrapClass",
          e = a[d];
        if (!e) return !1;
        if (null == c) a[d] = null;
        else {
          var f = e.replace(
            new RegExp("^" + c + "\\b\\s*|\\s*\\b" + c + "\\b"),
            "",
          );
          if (f == e) return !1;
          a[d] = f || null;
        }
        return !0;
      });
    }),
    addLineWidget: V(null, function (a, b, c) {
      var d = c || {};
      return (
        (d.node = b),
        d.noHScroll && (this.display.alignWidgets = !0),
        Ob(this, a, function (a) {
          return (a.widgets || (a.widgets = [])).push(d), (d.line = a), !0;
        }),
        d
      );
    }),
    removeLineWidget: V(null, function (a) {
      var b = a.line.widgets,
        c = Gc(a.line);
      if (null != c) {
        for (var d = 0; d < b.length; ++d) b[d] == a && b.splice(d--, 1);
        W(this, c, c + 1);
      }
    }),
    lineInfo: function (a) {
      if ("number" == typeof a) {
        if (!Eb(this.view.doc, a)) return null;
        var b = a;
        if (((a = Ec(this.view.doc, a)), !a)) return null;
      } else {
        var b = Gc(a);
        if (null == b) return null;
      }
      return {
        line: b,
        handle: a,
        text: a.text,
        gutterMarkers: a.gutterMarkers,
        textClass: a.textClass,
        bgClass: a.bgClass,
        wrapClass: a.wrapClass,
        widgets: a.widgets,
      };
    },
    getViewport: function () {
      return { from: this.display.showingFrom, to: this.display.showingTo };
    },
    addWidget: function (a, b, c, d, e) {
      var f = this.display;
      a = O(this, Db(this.view.doc, a));
      var g = a.top,
        h = a.left;
      if (
        ((b.style.position = "absolute"), f.sizer.appendChild(b), "over" == d)
      )
        g = a.top;
      else if ("near" == d) {
        var i = Math.max(f.wrapper.clientHeight, this.view.doc.height),
          j = Math.max(f.sizer.clientWidth, f.lineSpace.clientWidth);
        a.bottom + b.offsetHeight > i &&
          a.top > b.offsetHeight &&
          (g = a.top - b.offsetHeight),
          h + b.offsetWidth > j && (h = j - b.offsetWidth);
      }
      (b.style.top = g + G(f) + "px"),
        (b.style.left = b.style.right = ""),
        "right" == e
          ? ((h = f.sizer.clientWidth - b.offsetWidth), (b.style.right = "0px"))
          : ("left" == e
              ? (h = 0)
              : "middle" == e &&
                (h = (f.sizer.clientWidth - b.offsetWidth) / 2),
            (b.style.left = h + "px")),
        c && Lb(this, h, g, h + b.offsetWidth, g + b.offsetHeight);
    },
    lineCount: function () {
      return this.view.doc.size;
    },
    clipPos: function (a) {
      return Db(this.view.doc, a);
    },
    getCursor: function (a) {
      var b,
        c = this.view.sel;
      return (
        (b =
          null == a || "head" == a
            ? c.head
            : "anchor" == a
              ? c.anchor
              : "end" == a || a === !1
                ? c.to
                : c.from),
        Bb(b)
      );
    },
    somethingSelected: function () {
      return !zb(this.view.sel.from, this.view.sel.to);
    },
    setCursor: V(null, function (a, b, c) {
      var d = Db(
        this.view.doc,
        "number" == typeof a ? { line: a, ch: b || 0 } : a,
      );
      c ? Fb(this, d) : Gb(this, d, d);
    }),
    setSelection: V(null, function (a, b) {
      var c = this.view.doc;
      Gb(this, Db(c, a), Db(c, b || a));
    }),
    extendSelection: V(null, function (a, b) {
      var c = this.view.doc;
      Fb(this, Db(c, a), b && Db(c, b));
    }),
    setExtending: function (a) {
      this.view.sel.extend = a;
    },
    getLine: function (a) {
      var b = this.getLineHandle(a);
      return b && b.text;
    },
    getLineHandle: function (a) {
      var b = this.view.doc;
      return Eb(b, a) ? Ec(b, a) : void 0;
    },
    getLineNumber: function (a) {
      return Gc(a);
    },
    setLine: V(null, function (a, b) {
      Eb(this.view.doc, a) &&
        yb(
          this,
          b,
          { line: a, ch: 0 },
          { line: a, ch: Ec(this.view.doc, a).text.length },
        );
    }),
    removeLine: V(null, function (a) {
      Eb(this.view.doc, a) &&
        yb(
          this,
          "",
          { line: a, ch: 0 },
          Db(this.view.doc, { line: a + 1, ch: 0 }),
        );
    }),
    replaceRange: V(null, function (a, b, c) {
      var d = this.view.doc;
      return (b = Db(d, b)), (c = c ? Db(d, c) : b), yb(this, a, b, c);
    }),
    getRange: function (a, b, c) {
      var d = this.view.doc;
      (a = Db(d, a)), (b = Db(d, b));
      var e = a.line,
        f = b.line;
      if (e == f) return Ec(d, e).text.slice(a.ch, b.ch);
      var g = [Ec(d, e).text.slice(a.ch)];
      return (
        d.iter(e + 1, f, function (a) {
          g.push(a.text);
        }),
        g.push(Ec(d, f).text.slice(0, b.ch)),
        g.join(c || "\n")
      );
    },
    triggerOnKeyDown: V(null, pb),
    execCommand: function (a) {
      return fe[a](this);
    },
    moveH: V(null, function (a, b) {
      var c = this.view.sel,
        d = 0 > a ? c.from : c.to;
      (c.shift || c.extend || zb(c.from, c.to)) && (d = Pb(this, a, b, !0)),
        Fb(this, d, d, a);
    }),
    deleteH: V(null, function (a, b) {
      var c = this.view.sel;
      zb(c.from, c.to)
        ? yb(this, "", c.from, Pb(this, a, b, !1), "delete")
        : yb(this, "", c.from, c.to, "delete"),
        (this.curOp.userSelChange = !0);
    }),
    moveV: V(null, function (a, b) {
      var c,
        d = this.view,
        e = d.doc,
        f = this.display,
        g = d.sel.head,
        h = O(this, g, "div"),
        i = h.left;
      if ((null != d.goalColumn && (i = d.goalColumn), "page" == b)) {
        var j = Math.min(
          f.wrapper.clientHeight,
          window.innerHeight || document.documentElement.clientHeight,
        );
        c = h.top + a * j;
      } else "line" == b && (c = a > 0 ? h.bottom + 3 : h.top - 3);
      do {
        var k = P(this, i, c);
        c += 5 * a;
      } while (k.outside && (0 > a ? c > 0 : c < e.height));
      "page" == b && (f.scrollbarV.scrollTop += N(this, k, "div").top - h.top),
        Fb(this, k, k, a),
        (d.goalColumn = i);
    }),
    toggleOverwrite: function () {
      (this.view.overwrite = !this.view.overwrite)
        ? (this.display.cursor.className += " CodeMirror-overwrite")
        : (this.display.cursor.className =
            this.display.cursor.className.replace(" CodeMirror-overwrite", ""));
    },
    posFromIndex: function (a) {
      var b,
        c = 0,
        d = this.view.doc;
      return (
        d.iter(0, d.size, function (d) {
          var e = d.text.length + 1;
          return e > a ? ((b = a), !0) : ((a -= e), ++c, void 0);
        }),
        Db(d, { line: c, ch: b })
      );
    },
    indexFromPos: function (a) {
      if (a.line < 0 || a.ch < 0) return 0;
      var b = a.ch;
      return (
        this.view.doc.iter(0, a.line, function (a) {
          b += a.text.length + 1;
        }),
        b
      );
    },
    scrollTo: function (a, b) {
      null != a &&
        (this.display.scrollbarH.scrollLeft = this.display.scroller.scrollLeft =
          a),
        null != b &&
          (this.display.scrollbarV.scrollTop = this.display.scroller.scrollTop =
            b),
        s(this, []);
    },
    getScrollInfo: function () {
      var a = this.display.scroller,
        b = je;
      return {
        left: a.scrollLeft,
        top: a.scrollTop,
        height: a.scrollHeight - b,
        width: a.scrollWidth - b,
        clientHeight: a.clientHeight - b,
        clientWidth: a.clientWidth - b,
      };
    },
    scrollIntoView: function (a) {
      "number" == typeof a && (a = { line: a, ch: 0 }),
        (a = a ? Db(this.view.doc, a) : this.view.sel.head),
        Kb(this, a);
    },
    setSize: function (a, b) {
      function c(a) {
        return "number" == typeof a || /^\d+$/.test(String(a)) ? a + "px" : a;
      }
      null != a && (this.display.wrapper.style.width = c(a)),
        null != b && (this.display.wrapper.style.height = c(b)),
        this.refresh();
    },
    on: function (a, b) {
      Uc(this, a, b);
    },
    off: function (a, b) {
      Vc(this, a, b);
    },
    operation: function (a) {
      return V(this, a)();
    },
    refresh: function () {
      L(this),
        this.display.scroller.scrollHeight > this.view.scrollTop &&
          (this.display.scrollbarV.scrollTop = this.display.scroller.scrollTop =
            this.view.scrollTop),
        s(this, !0);
    },
    getInputField: function () {
      return this.display.input;
    },
    getWrapperElement: function () {
      return this.display.wrapper;
    },
    getScrollerElement: function () {
      return this.display.scroller;
    },
    getGutterElement: function () {
      return this.display.gutters;
    },
  };
  var $d = (a.optionHandlers = {}),
    _d = (a.defaults = {}),
    ae = (a.Init = {
      toString: function () {
        return "CodeMirror.Init";
      },
    });
  Sb(
    "value",
    "",
    function (a, b) {
      a.setValue(b);
    },
    !0,
  ),
    Sb("mode", null, d, !0),
    Sb("indentUnit", 2, d, !0),
    Sb("indentWithTabs", !1),
    Sb("smartIndent", !0),
    Sb(
      "tabSize",
      4,
      function (a) {
        d(a), L(a), s(a, !0);
      },
      !0,
    ),
    Sb("electricChars", !0),
    Sb(
      "theme",
      "default",
      function (a) {
        g(a), h(a);
      },
      !0,
    ),
    Sb("keyMap", "default", f),
    Sb("extraKeys", null),
    Sb("onKeyEvent", null),
    Sb("onDragEvent", null),
    Sb("lineWrapping", !1, e, !0),
    Sb(
      "gutters",
      [],
      function (a) {
        l(a.options), h(a);
      },
      !0,
    ),
    Sb(
      "lineNumbers",
      !1,
      function (a) {
        l(a.options), h(a);
      },
      !0,
    ),
    Sb("firstLineNumber", 1, h, !0),
    Sb(
      "lineNumberFormatter",
      function (a) {
        return a;
      },
      h,
      !0,
    ),
    Sb("showCursorWhenSelecting", !1, y, !0),
    Sb("readOnly", !1, function (a, b) {
      "nocursor" == b ? (sb(a), a.display.input.blur()) : b || $(a, !0);
    }),
    Sb("dragDrop", !0),
    Sb("cursorBlinkRate", 530),
    Sb("cursorHeight", 1),
    Sb("workTime", 100),
    Sb("workDelay", 100),
    Sb("flattenSpans", !0),
    Sb("pollInterval", 100),
    Sb("undoDepth", 40),
    Sb(
      "viewportMargin",
      10,
      function (a) {
        a.refresh();
      },
      !0,
    ),
    Sb("tabindex", null, function (a, b) {
      a.display.input.tabIndex = b || "";
    }),
    Sb("autofocus", null);
  var be = (a.modes = {}),
    ce = (a.mimeModes = {});
  (a.defineMode = function (b, c) {
    if (
      (a.defaults.mode || "null" == b || (a.defaults.mode = b),
      arguments.length > 2)
    ) {
      c.dependencies = [];
      for (var d = 2; d < arguments.length; ++d)
        c.dependencies.push(arguments[d]);
    }
    be[b] = c;
  }),
    (a.defineMIME = function (a, b) {
      ce[a] = b;
    }),
    (a.resolveMode = function (b) {
      if ("string" == typeof b && ce.hasOwnProperty(b)) b = ce[b];
      else if ("string" == typeof b && /^[\w\-]+\/[\w\-]+\+xml$/.test(b))
        return a.resolveMode("application/xml");
      return "string" == typeof b ? { name: b } : b || { name: "null" };
    }),
    (a.getMode = function (b, c) {
      var c = a.resolveMode(c),
        d = be[c.name];
      if (!d) return a.getMode(b, "text/plain");
      var e = d(b, c);
      if (de.hasOwnProperty(c.name)) {
        var f = de[c.name];
        for (var g in f)
          f.hasOwnProperty(g) &&
            (e.hasOwnProperty(g) && (e["_" + g] = e[g]), (e[g] = f[g]));
      }
      return (e.name = c.name), e;
    }),
    a.defineMode("null", function () {
      return {
        token: function (a) {
          a.skipToEnd();
        },
      };
    }),
    a.defineMIME("text/plain", "null");
  var de = (a.modeExtensions = {});
  (a.extendMode = function (a, b) {
    var c = de.hasOwnProperty(a) ? de[a] : (de[a] = {});
    for (var d in b) b.hasOwnProperty(d) && (c[d] = b[d]);
  }),
    (a.defineExtension = function (b, c) {
      a.prototype[b] = c;
    }),
    (a.defineOption = Sb);
  var ee = [];
  (a.defineInitHook = function (a) {
    ee.push(a);
  }),
    (a.copyState = Tb),
    (a.startState = Ub),
    (a.innerMode = function (a, b) {
      for (; a.innerMode; ) {
        var c = a.innerMode(b);
        (b = c.state), (a = c.mode);
      }
      return c || { mode: a, state: b };
    });
  var fe = (a.commands = {
      selectAll: function (a) {
        a.setSelection({ line: 0, ch: 0 }, { line: a.lineCount() - 1 });
      },
      killLine: function (a) {
        var b = a.getCursor(!0),
          c = a.getCursor(!1),
          d = !zb(b, c);
        d || a.getLine(b.line).length != b.ch
          ? a.replaceRange("", b, d ? c : { line: b.line }, "delete")
          : a.replaceRange("", b, { line: b.line + 1, ch: 0 }, "delete");
      },
      deleteLine: function (a) {
        var b = a.getCursor().line;
        a.replaceRange("", { line: b, ch: 0 }, { line: b }, "delete");
      },
      undo: function (a) {
        a.undo();
      },
      redo: function (a) {
        a.redo();
      },
      goDocStart: function (a) {
        a.extendSelection({ line: 0, ch: 0 });
      },
      goDocEnd: function (a) {
        a.extendSelection({ line: a.lineCount() - 1 });
      },
      goLineStart: function (a) {
        a.extendSelection(sd(a, a.getCursor().line));
      },
      goLineStartSmart: function (a) {
        var b = a.getCursor(),
          c = sd(a, b.line),
          d = a.getLineHandle(c.line),
          e = Jc(d);
        if (e && 0 != e[0].level) a.extendSelection(c);
        else {
          var f = Math.max(0, d.text.search(/\S/)),
            g = b.line == c.line && b.ch <= f && b.ch;
          a.extendSelection({ line: c.line, ch: g ? 0 : f });
        }
      },
      goLineEnd: function (a) {
        a.extendSelection(td(a, a.getCursor().line));
      },
      goLineUp: function (a) {
        a.moveV(-1, "line");
      },
      goLineDown: function (a) {
        a.moveV(1, "line");
      },
      goPageUp: function (a) {
        a.moveV(-1, "page");
      },
      goPageDown: function (a) {
        a.moveV(1, "page");
      },
      goCharLeft: function (a) {
        a.moveH(-1, "char");
      },
      goCharRight: function (a) {
        a.moveH(1, "char");
      },
      goColumnLeft: function (a) {
        a.moveH(-1, "column");
      },
      goColumnRight: function (a) {
        a.moveH(1, "column");
      },
      goWordLeft: function (a) {
        a.moveH(-1, "word");
      },
      goWordRight: function (a) {
        a.moveH(1, "word");
      },
      delCharBefore: function (a) {
        a.deleteH(-1, "char");
      },
      delCharAfter: function (a) {
        a.deleteH(1, "char");
      },
      delWordBefore: function (a) {
        a.deleteH(-1, "word");
      },
      delWordAfter: function (a) {
        a.deleteH(1, "word");
      },
      indentAuto: function (a) {
        a.indentSelection("smart");
      },
      indentMore: function (a) {
        a.indentSelection("add");
      },
      indentLess: function (a) {
        a.indentSelection("subtract");
      },
      insertTab: function (a) {
        a.replaceSelection("	", "end", "input");
      },
      defaultTab: function (a) {
        a.somethingSelected()
          ? a.indentSelection("add")
          : a.replaceSelection("	", "end", "input");
      },
      transposeChars: function (a) {
        var b = a.getCursor(),
          c = a.getLine(b.line);
        b.ch > 0 &&
          b.ch < c.length - 1 &&
          a.replaceRange(
            c.charAt(b.ch) + c.charAt(b.ch - 1),
            { line: b.line, ch: b.ch - 1 },
            { line: b.line, ch: b.ch + 1 },
          );
      },
      newlineAndIndent: function (a) {
        V(a, function () {
          a.replaceSelection("\n", "end", "input"),
            a.indentLine(a.getCursor().line, null, !0);
        })();
      },
      toggleOverwrite: function (a) {
        a.toggleOverwrite();
      },
    }),
    ge = (a.keyMap = {});
  (ge.basic = {
    Left: "goCharLeft",
    Right: "goCharRight",
    Up: "goLineUp",
    Down: "goLineDown",
    End: "goLineEnd",
    Home: "goLineStartSmart",
    PageUp: "goPageUp",
    PageDown: "goPageDown",
    Delete: "delCharAfter",
    Backspace: "delCharBefore",
    Tab: "defaultTab",
    "Shift-Tab": "indentAuto",
    Enter: "newlineAndIndent",
    Insert: "toggleOverwrite",
  }),
    (ge.pcDefault = {
      "Ctrl-A": "selectAll",
      "Ctrl-D": "deleteLine",
      "Ctrl-Z": "undo",
      "Shift-Ctrl-Z": "redo",
      "Ctrl-Y": "redo",
      "Ctrl-Home": "goDocStart",
      "Alt-Up": "goDocStart",
      "Ctrl-End": "goDocEnd",
      "Ctrl-Down": "goDocEnd",
      "Ctrl-Left": "goWordLeft",
      "Ctrl-Right": "goWordRight",
      "Alt-Left": "goLineStart",
      "Alt-Right": "goLineEnd",
      "Ctrl-Backspace": "delWordBefore",
      "Ctrl-Delete": "delWordAfter",
      "Ctrl-S": "save",
      "Ctrl-F": "find",
      "Ctrl-G": "findNext",
      "Shift-Ctrl-G": "findPrev",
      "Shift-Ctrl-F": "replace",
      "Shift-Ctrl-R": "replaceAll",
      "Ctrl-[": "indentLess",
      "Ctrl-]": "indentMore",
      fallthrough: "basic",
    }),
    (ge.macDefault = {
      "Cmd-A": "selectAll",
      "Cmd-D": "deleteLine",
      "Cmd-Z": "undo",
      "Shift-Cmd-Z": "redo",
      "Cmd-Y": "redo",
      "Cmd-Up": "goDocStart",
      "Cmd-End": "goDocEnd",
      "Cmd-Down": "goDocEnd",
      "Alt-Left": "goWordLeft",
      "Alt-Right": "goWordRight",
      "Cmd-Left": "goLineStart",
      "Cmd-Right": "goLineEnd",
      "Alt-Backspace": "delWordBefore",
      "Ctrl-Alt-Backspace": "delWordAfter",
      "Alt-Delete": "delWordAfter",
      "Cmd-S": "save",
      "Cmd-F": "find",
      "Cmd-G": "findNext",
      "Shift-Cmd-G": "findPrev",
      "Cmd-Alt-F": "replace",
      "Shift-Cmd-Alt-F": "replaceAll",
      "Cmd-[": "indentLess",
      "Cmd-]": "indentMore",
      fallthrough: ["basic", "emacsy"],
    }),
    (ge["default"] = Sd ? ge.macDefault : ge.pcDefault),
    (ge.emacsy = {
      "Ctrl-F": "goCharRight",
      "Ctrl-B": "goCharLeft",
      "Ctrl-P": "goLineUp",
      "Ctrl-N": "goLineDown",
      "Alt-F": "goWordRight",
      "Alt-B": "goWordLeft",
      "Ctrl-A": "goLineStart",
      "Ctrl-E": "goLineEnd",
      "Ctrl-V": "goPageDown",
      "Shift-Ctrl-V": "goPageUp",
      "Ctrl-D": "delCharAfter",
      "Ctrl-H": "delCharBefore",
      "Alt-D": "delWordAfter",
      "Alt-Backspace": "delWordBefore",
      "Ctrl-K": "killLine",
      "Ctrl-T": "transposeChars",
    }),
    (a.isModifierKey = Xb),
    (a.fromTextArea = function (b, c) {
      function d() {
        b.value = i.getValue();
      }
      if (
        (c || (c = {}),
        (c.value = b.value),
        !c.tabindex && b.tabindex && (c.tabindex = b.tabindex),
        null == c.autofocus)
      ) {
        var e = document.body;
        try {
          e = document.activeElement;
        } catch (f) {}
        c.autofocus =
          e == b || (null != b.getAttribute("autofocus") && e == document.body);
      }
      if (b.form) {
        Uc(b.form, "submit", d);
        var g = b.form,
          h = g.submit;
        try {
          g.submit = function j() {
            d(), (g.submit = h), g.submit(), (g.submit = j);
          };
        } catch (f) {}
      }
      b.style.display = "none";
      var i = a(function (a) {
        b.parentNode.insertBefore(a, b.nextSibling);
      }, c);
      return (
        (i.save = d),
        (i.getTextArea = function () {
          return b;
        }),
        (i.toTextArea = function () {
          d(),
            b.parentNode.removeChild(i.getWrapperElement()),
            (b.style.display = ""),
            b.form &&
              (Vc(b.form, "submit", d),
              "function" == typeof b.form.submit && (b.form.submit = h));
        }),
        i
      );
    }),
    (Yb.prototype = {
      eol: function () {
        return this.pos >= this.string.length;
      },
      sol: function () {
        return 0 == this.pos;
      },
      peek: function () {
        return this.string.charAt(this.pos) || void 0;
      },
      next: function () {
        return this.pos < this.string.length
          ? this.string.charAt(this.pos++)
          : void 0;
      },
      eat: function (a) {
        var b = this.string.charAt(this.pos);
        if ("string" == typeof a) var c = b == a;
        else var c = b && (a.test ? a.test(b) : a(b));
        return c ? (++this.pos, b) : void 0;
      },
      eatWhile: function (a) {
        for (var b = this.pos; this.eat(a); );
        return this.pos > b;
      },
      eatSpace: function () {
        for (
          var a = this.pos;
          /[\s\u00a0]/.test(this.string.charAt(this.pos));

        )
          ++this.pos;
        return this.pos > a;
      },
      skipToEnd: function () {
        this.pos = this.string.length;
      },
      skipTo: function (a) {
        var b = this.string.indexOf(a, this.pos);
        return b > -1 ? ((this.pos = b), !0) : void 0;
      },
      backUp: function (a) {
        this.pos -= a;
      },
      column: function () {
        return $c(this.string, this.start, this.tabSize);
      },
      indentation: function () {
        return $c(this.string, null, this.tabSize);
      },
      match: function (a, b, c) {
        if ("string" != typeof a) {
          var d = this.string.slice(this.pos).match(a);
          return d && d.index > 0
            ? null
            : (d && b !== !1 && (this.pos += d[0].length), d);
        }
        var e = function (a) {
          return c ? a.toLowerCase() : a;
        };
        return e(this.string).indexOf(e(a), this.pos) == this.pos
          ? (b !== !1 && (this.pos += a.length), !0)
          : void 0;
      },
      current: function () {
        return this.string.slice(this.start, this.pos);
      },
    }),
    (a.StringStream = Yb),
    (Zb.prototype.clear = function () {
      if (!this.explicitlyCleared) {
        T(this.cm);
        for (var a = null, b = null, c = 0; c < this.lines.length; ++c) {
          var d = this.lines[c],
            e = _b(d.markedSpans, this);
          null != e.to && (b = Gc(d)),
            (d.markedSpans = ac(d.markedSpans, e)),
            null != e.from
              ? (a = Gc(d))
              : this.collapsed && !kc(d) && Fc(d, R(this.cm.display));
        }
        null != a && W(this.cm, a, b + 1),
          (this.lines.length = 0),
          (this.explicitlyCleared = !0),
          this.collapsed &&
            this.cm.view.cantEdit &&
            ((this.cm.view.cantEdit = !1), Hb(this.cm)),
          U(this.cm),
          Xc(this.cm, this, "clear");
      }
    }),
    (Zb.prototype.find = function () {
      for (var a, b, c = 0; c < this.lines.length; ++c) {
        var d = this.lines[c],
          e = _b(d.markedSpans, this);
        if (null != e.from || null != e.to) {
          var f = Gc(d);
          null != e.from && (a = { line: f, ch: e.from }),
            null != e.to && (b = { line: f, ch: e.to });
        }
      }
      return "bookmark" == this.type ? a : a && { from: a, to: b };
    }),
    (window.lineIsHidden = kc);
  var he = {},
    ie = /[\t\u0000-\u0019\u200b\u2028\u2029\uFEFF]/g;
  (Cc.prototype = {
    chunkSize: function () {
      return this.lines.length;
    },
    remove: function (a, b, c) {
      for (var d = a, e = a + b; e > d; ++d) {
        var f = this.lines[d];
        (this.height -= f.height), tc(f), Xc(c, f, "delete");
      }
      this.lines.splice(a, b);
    },
    collapse: function (a) {
      a.splice.apply(a, [a.length, 0].concat(this.lines));
    },
    insertHeight: function (a, b, c) {
      (this.height += c),
        (this.lines = this.lines
          .slice(0, a)
          .concat(b)
          .concat(this.lines.slice(a)));
      for (var d = 0, e = b.length; e > d; ++d) b[d].parent = this;
    },
    iterN: function (a, b, c) {
      for (var d = a + b; d > a; ++a) if (c(this.lines[a])) return !0;
    },
  }),
    (Dc.prototype = {
      chunkSize: function () {
        return this.size;
      },
      remove: function (a, b, c) {
        this.size -= b;
        for (var d = 0; d < this.children.length; ++d) {
          var e = this.children[d],
            f = e.chunkSize();
          if (f > a) {
            var g = Math.min(b, f - a),
              h = e.height;
            if (
              (e.remove(a, g, c),
              (this.height -= h - e.height),
              f == g && (this.children.splice(d--, 1), (e.parent = null)),
              0 == (b -= g))
            )
              break;
            a = 0;
          } else a -= f;
        }
        if (this.size - b < 25) {
          var i = [];
          this.collapse(i),
            (this.children = [new Cc(i)]),
            (this.children[0].parent = this);
        }
      },
      collapse: function (a) {
        for (var b = 0, c = this.children.length; c > b; ++b)
          this.children[b].collapse(a);
      },
      insert: function (a, b) {
        for (var c = 0, d = 0, e = b.length; e > d; ++d) c += b[d].height;
        this.insertHeight(a, b, c);
      },
      insertHeight: function (a, b, c) {
        (this.size += b.length), (this.height += c);
        for (var d = 0, e = this.children.length; e > d; ++d) {
          var f = this.children[d],
            g = f.chunkSize();
          if (g >= a) {
            if ((f.insertHeight(a, b, c), f.lines && f.lines.length > 50)) {
              for (; f.lines.length > 50; ) {
                var h = f.lines.splice(f.lines.length - 25, 25),
                  i = new Cc(h);
                (f.height -= i.height),
                  this.children.splice(d + 1, 0, i),
                  (i.parent = this);
              }
              this.maybeSpill();
            }
            break;
          }
          a -= g;
        }
      },
      maybeSpill: function () {
        if (!(this.children.length <= 10)) {
          var a = this;
          do {
            var b = a.children.splice(a.children.length - 5, 5),
              c = new Dc(b);
            if (a.parent) {
              (a.size -= c.size), (a.height -= c.height);
              var d = cd(a.parent.children, a);
              a.parent.children.splice(d + 1, 0, c);
            } else {
              var e = new Dc(a.children);
              (e.parent = a), (a.children = [e, c]), (a = e);
            }
            c.parent = a.parent;
          } while (a.children.length > 10);
          a.parent.maybeSpill();
        }
      },
      iter: function (a, b, c) {
        this.iterN(a, b - a, c);
      },
      iterN: function (a, b, c) {
        for (var d = 0, e = this.children.length; e > d; ++d) {
          var f = this.children[d],
            g = f.chunkSize();
          if (g > a) {
            var h = Math.min(b, g - a);
            if (f.iterN(a, h, c)) return !0;
            if (0 == (b -= h)) break;
            a = 0;
          } else a -= g;
        }
      },
    }),
    (a.e_stop = Qc),
    (a.e_preventDefault = Oc),
    (a.e_stopPropagation = Pc),
    (a.on = Uc),
    (a.off = Vc),
    (a.signal = Wc);
  var je = 30,
    ke = (a.Pass = {
      toString: function () {
        return "CodeMirror.Pass";
      },
    });
  (Zc.prototype = {
    set: function (a, b) {
      clearTimeout(this.id), (this.id = setTimeout(b, a));
    },
  }),
    (a.countColumn = $c);
  var le = [""],
    me = /[\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc]/,
    ne =
      /[\u0300-\u036F\u0483-\u0487\u0488-\u0489\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED\uA66F\uA670-\uA672\uA674-\uA67D\uA69F]/,
    oe = (function () {
      if (Gd) return !1;
      var a = hd("div");
      return "draggable" in a || "dragDrop" in a;
    })(),
    pe = /^$/;
  Dd
    ? (pe = /$'/)
    : Ld
      ? (pe = /\-[^ \-?]|\?[^ !'\"\),.\-\/:;\?\]\}]/)
      : Jd &&
        (pe =
          /\-[^ \-\.?]|\?[^ \-\.?\]\}:;!'\"\),\/]|[\.!\"#&%\)*+,:;=>\]|\}~][\(\{\[<]|\$'/);
  var qe,
    re,
    se =
      3 != "\n\nb".split(/\n/).length
        ? function (a) {
            for (var b = 0, c = [], d = a.length; d >= b; ) {
              var e = a.indexOf("\n", b);
              -1 == e && (e = a.length);
              var f = a.slice(b, "\r" == a.charAt(e - 1) ? e - 1 : e),
                g = f.indexOf("\r");
              -1 != g
                ? (c.push(f.slice(0, g)), (b += g + 1))
                : (c.push(f), (b = e + 1));
            }
            return c;
          }
        : function (a) {
            return a.split(/\r\n?|\n/);
          };
  a.splitLines = se;
  var te = window.getSelection
      ? function (a) {
          try {
            return a.selectionStart != a.selectionEnd;
          } catch (b) {
            return !1;
          }
        }
      : function (a) {
          try {
            var b = a.ownerDocument.selection.createRange();
          } catch (c) {}
          return b && b.parentElement() == a
            ? 0 != b.compareEndPoints("StartToEnd", b)
            : !1;
        },
    ue = (function () {
      var a = hd("div");
      return "oncopy" in a
        ? !0
        : (a.setAttribute("oncopy", "return;"), "function" == typeof a.oncopy);
    })(),
    ve = {
      3: "Enter",
      8: "Backspace",
      9: "Tab",
      13: "Enter",
      16: "Shift",
      17: "Ctrl",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Esc",
      32: "Space",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "Left",
      38: "Up",
      39: "Right",
      40: "Down",
      44: "PrintScrn",
      45: "Insert",
      46: "Delete",
      59: ";",
      91: "Mod",
      92: "Mod",
      93: "Mod",
      109: "-",
      107: "=",
      127: "Delete",
      186: ";",
      187: "=",
      188: ",",
      189: "-",
      190: ".",
      191: "/",
      192: "`",
      219: "[",
      220: "\\",
      221: "]",
      222: "'",
      63276: "PageUp",
      63277: "PageDown",
      63275: "End",
      63273: "Home",
      63234: "Left",
      63232: "Up",
      63235: "Right",
      63233: "Down",
      63302: "Insert",
      63272: "Delete",
    };
  (a.keyNames = ve),
    (function () {
      for (var a = 0; 10 > a; a++) ve[a + 48] = String(a);
      for (var a = 65; 90 >= a; a++) ve[a] = String.fromCharCode(a);
      for (var a = 1; 12 >= a; a++) ve[a + 111] = ve[a + 63235] = "F" + a;
    })();
  var we = (function () {
    function a(a) {
      return 255 >= a
        ? b.charAt(a)
        : a >= 1424 && 1524 >= a
          ? "R"
          : a >= 1536 && 1791 >= a
            ? c.charAt(a - 1536)
            : a >= 1792 && 2220 >= a
              ? "r"
              : "L";
    }
    var b =
        "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLL",
      c =
        "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmmrrrrrrrrrrrrrrrrrr",
      d = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
      e = /[stwN]/,
      f = /[LRr]/,
      g = /[Lb1n]/,
      h = /[1n]/;
    return function (b) {
      if (!d.test(b)) return !1;
      for (var c, i = b.length, j = [], k = null, l = 0; i > l; ++l)
        j.push((c = a(b.charCodeAt(l)))),
          null == k &&
            ("L" == c ? (k = "L") : ("R" == c || "r" == c) && (k = "R"));
      null == k && (k = "L");
      for (var l = 0, m = k; i > l; ++l) {
        var c = j[l];
        "m" == c ? (j[l] = m) : (m = c);
      }
      for (var l = 0, n = k; i > l; ++l) {
        var c = j[l];
        "1" == c && "r" == n
          ? (j[l] = "n")
          : f.test(c) && ((n = c), "r" == c && (j[l] = "R"));
      }
      for (var l = 1, m = j[0]; i - 1 > l; ++l) {
        var c = j[l];
        "+" == c && "1" == m && "1" == j[l + 1]
          ? (j[l] = "1")
          : "," != c || m != j[l + 1] || ("1" != m && "n" != m) || (j[l] = m),
          (m = c);
      }
      for (var l = 0; i > l; ++l) {
        var c = j[l];
        if ("," == c) j[l] = "N";
        else if ("%" == c) {
          for (var o = l + 1; i > o && "%" == j[o]; ++o);
          for (
            var p =
                (l && "!" == j[l - 1]) || (i - 1 > o && "1" == j[o])
                  ? "1"
                  : "N",
              q = l;
            o > q;
            ++q
          )
            j[q] = p;
          l = o - 1;
        }
      }
      for (var l = 0, n = k; i > l; ++l) {
        var c = j[l];
        "L" == n && "1" == c ? (j[l] = "L") : f.test(c) && (n = c);
      }
      for (var l = 0; i > l; ++l)
        if (e.test(j[l])) {
          for (var o = l + 1; i > o && e.test(j[o]); ++o);
          for (
            var r = "L" == (l ? j[l - 1] : k),
              s = "L" == (i - 1 > o ? j[o] : k),
              p = r || s ? "L" : "R",
              q = l;
            o > q;
            ++q
          )
            j[q] = p;
          l = o - 1;
        }
      for (var t, u = [], l = 0; i > l; )
        if (g.test(j[l])) {
          var v = l;
          for (++l; i > l && g.test(j[l]); ++l);
          u.push({ from: v, to: l, level: 0 });
        } else {
          var w = l,
            x = u.length;
          for (++l; i > l && "L" != j[l]; ++l);
          for (var q = w; l > q; )
            if (h.test(j[q])) {
              q > w && u.splice(x, 0, { from: w, to: q, level: 1 });
              var y = q;
              for (++q; l > q && h.test(j[q]); ++q);
              u.splice(x, 0, { from: y, to: q, level: 2 }), (w = q);
            } else ++q;
          l > w && u.splice(x, 0, { from: w, to: l, level: 1 });
        }
      return (
        1 == u[0].level &&
          (t = b.match(/^\s+/)) &&
          ((u[0].from = t[0].length),
          u.unshift({ from: 0, to: t[0].length, level: 0 })),
        1 == ad(u).level &&
          (t = b.match(/\s+$/)) &&
          ((ad(u).to -= t[0].length),
          u.push({ from: i - t[0].length, to: i, level: 0 })),
        u[0].level != ad(u).level &&
          u.push({ from: i, to: i, level: u[0].level }),
        u
      );
    };
  })();
  return (a.version = "3.0"), a;
})()),
  CodeMirror.defineMode("javascript", function (a, b) {
    function c(a, b, c) {
      return (b.tokenize = c), c(a, b);
    }
    function d(a, b) {
      for (var c, d = !1; null != (c = a.next()); ) {
        if (c == b && !d) return !1;
        d = !d && "\\" == c;
      }
      return d;
    }
    function e(a, b, c) {
      return (M = a), (N = c), b;
    }
    function f(a, b) {
      var f = a.next();
      if ('"' == f || "'" == f) return c(a, b, g(f));
      if (/[\[\]{}\(\),;\:\.]/.test(f)) return e(f);
      if ("0" == f && a.eat(/x/i))
        return a.eatWhile(/[\da-f]/i), e("number", "number");
      if (/\d/.test(f) || ("-" == f && a.eat(/\d/)))
        return (
          a.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/), e("number", "number")
        );
      if ("/" == f)
        return a.eat("*")
          ? c(a, b, h)
          : a.eat("/")
            ? (a.skipToEnd(), e("comment", "comment"))
            : "operator" == b.lastType ||
                "keyword c" == b.lastType ||
                /^[\[{}\(,;:]$/.test(b.lastType)
              ? (d(a, "/"), a.eatWhile(/[gimy]/), e("regexp", "string-2"))
              : (a.eatWhile(S), e("operator", null, a.current()));
      if ("#" == f) return a.skipToEnd(), e("error", "error");
      if (S.test(f)) return a.eatWhile(S), e("operator", null, a.current());
      a.eatWhile(/[\w\$_]/);
      var i = a.current(),
        j = R.propertyIsEnumerable(i) && R[i];
      return j && "." != b.lastType
        ? e(j.type, j.style, i)
        : e("variable", "variable", i);
    }
    function g(a) {
      return function (b, c) {
        return d(b, a) || (c.tokenize = f), e("string", "string");
      };
    }
    function h(a, b) {
      for (var c, d = !1; (c = a.next()); ) {
        if ("/" == c && d) {
          b.tokenize = f;
          break;
        }
        d = "*" == c;
      }
      return e("comment", "comment");
    }
    function i(a, b, c, d, e, f) {
      (this.indented = a),
        (this.column = b),
        (this.type = c),
        (this.prev = e),
        (this.info = f),
        null != d && (this.align = d);
    }
    function j(a, b) {
      for (var c = a.localVars; c; c = c.next) if (c.name == b) return !0;
    }
    function k(a, b, c, d, e) {
      var f = a.cc;
      for (
        U.state = a,
          U.stream = e,
          U.marked = null,
          U.cc = f,
          a.lexical.hasOwnProperty("align") || (a.lexical.align = !0);
        ;

      ) {
        var g = f.length ? f.pop() : P ? u : t;
        if (g(c, d)) {
          for (; f.length && f[f.length - 1].lex; ) f.pop()();
          return U.marked
            ? U.marked
            : "variable" == c && j(a, d)
              ? "variable-2"
              : b;
        }
      }
    }
    function l() {
      for (var a = arguments.length - 1; a >= 0; a--) U.cc.push(arguments[a]);
    }
    function m() {
      return l.apply(null, arguments), !0;
    }
    function n(a) {
      var b = U.state;
      if (b.context) {
        U.marked = "def";
        for (var c = b.localVars; c; c = c.next) if (c.name == a) return;
        b.localVars = { name: a, next: b.localVars };
      }
    }
    function o() {
      (U.state.context = { prev: U.state.context, vars: U.state.localVars }),
        (U.state.localVars = V);
    }
    function p() {
      (U.state.localVars = U.state.context.vars),
        (U.state.context = U.state.context.prev);
    }
    function q(a, b) {
      var c = function () {
        var c = U.state;
        c.lexical = new i(c.indented, U.stream.column(), a, null, c.lexical, b);
      };
      return (c.lex = !0), c;
    }
    function r() {
      var a = U.state;
      a.lexical.prev &&
        (")" == a.lexical.type && (a.indented = a.lexical.indented),
        (a.lexical = a.lexical.prev));
    }
    function s(a) {
      return function (b) {
        return b == a ? m() : ";" == a ? l() : m(arguments.callee);
      };
    }
    function t(a) {
      return "var" == a
        ? m(q("vardef"), E, s(";"), r)
        : "keyword a" == a
          ? m(q("form"), u, t, r)
          : "keyword b" == a
            ? m(q("form"), t, r)
            : "{" == a
              ? m(q("}"), B, r)
              : ";" == a
                ? m()
                : "function" == a
                  ? m(K)
                  : "for" == a
                    ? m(q("form"), s("("), q(")"), G, s(")"), r, t, r)
                    : "variable" == a
                      ? m(q("stat"), x)
                      : "switch" == a
                        ? m(q("form"), u, q("}", "switch"), s("{"), B, r, r)
                        : "case" == a
                          ? m(u, s(":"))
                          : "default" == a
                            ? m(s(":"))
                            : "catch" == a
                              ? m(q("form"), o, s("("), L, s(")"), t, r, p)
                              : l(q("stat"), u, s(";"), r);
    }
    function u(a) {
      return T.hasOwnProperty(a)
        ? m(w)
        : "function" == a
          ? m(K)
          : "keyword c" == a
            ? m(v)
            : "(" == a
              ? m(q(")"), v, s(")"), r, w)
              : "operator" == a
                ? m(u)
                : "[" == a
                  ? m(q("]"), A(u, "]"), r, w)
                  : "{" == a
                    ? m(q("}"), A(z, "}"), r, w)
                    : m();
    }
    function v(a) {
      return a.match(/[;\}\)\],]/) ? l() : l(u);
    }
    function w(a, b) {
      if ("operator" == a && /\+\+|--/.test(b)) return m(w);
      if ("operator" == a && "?" == b) return m(u, s(":"), u);
      if (";" != a)
        return "(" == a
          ? m(q(")"), A(u, ")"), r, w)
          : "." == a
            ? m(y, w)
            : "[" == a
              ? m(q("]"), u, s("]"), r, w)
              : void 0;
    }
    function x(a) {
      return ":" == a ? m(r, t) : l(w, s(";"), r);
    }
    function y(a) {
      return "variable" == a ? ((U.marked = "property"), m()) : void 0;
    }
    function z(a) {
      return (
        "variable" == a && (U.marked = "property"),
        T.hasOwnProperty(a) ? m(s(":"), u) : void 0
      );
    }
    function A(a, b) {
      function c(d) {
        return "," == d ? m(a, c) : d == b ? m() : m(s(b));
      }
      return function (d) {
        return d == b ? m() : l(a, c);
      };
    }
    function B(a) {
      return "}" == a ? m() : l(t, B);
    }
    function C(a) {
      return ":" == a ? m(D) : l();
    }
    function D(a) {
      return "variable" == a ? ((U.marked = "variable-3"), m()) : l();
    }
    function E(a, b) {
      return "variable" == a ? (n(b), Q ? m(C, F) : m(F)) : l();
    }
    function F(a, b) {
      return "=" == b ? m(u, F) : "," == a ? m(E) : void 0;
    }
    function G(a) {
      return "var" == a
        ? m(E, s(";"), I)
        : ";" == a
          ? m(I)
          : "variable" == a
            ? m(H)
            : m(I);
    }
    function H(a, b) {
      return "in" == b ? m(u) : m(w, I);
    }
    function I(a, b) {
      return ";" == a ? m(J) : "in" == b ? m(u) : m(u, s(";"), J);
    }
    function J(a) {
      ")" != a && m(u);
    }
    function K(a, b) {
      return "variable" == a
        ? (n(b), m(K))
        : "(" == a
          ? m(q(")"), o, A(L, ")"), r, t, p)
          : void 0;
    }
    function L(a, b) {
      return "variable" == a ? (n(b), Q ? m(C) : m()) : void 0;
    }
    var M,
      N,
      O = a.indentUnit,
      P = b.json,
      Q = b.typescript,
      R = (function () {
        function a(a) {
          return { type: a, style: "keyword" };
        }
        var b = a("keyword a"),
          c = a("keyword b"),
          d = a("keyword c"),
          e = a("operator"),
          f = { type: "atom", style: "atom" },
          g = {
            if: b,
            while: b,
            with: b,
            else: c,
            do: c,
            try: c,
            finally: c,
            return: d,
            break: d,
            continue: d,
            new: d,
            delete: d,
            throw: d,
            var: a("var"),
            const: a("var"),
            let: a("var"),
            function: a("function"),
            catch: a("catch"),
            for: a("for"),
            switch: a("switch"),
            case: a("case"),
            default: a("default"),
            in: e,
            typeof: e,
            instanceof: e,
            true: f,
            false: f,
            null: f,
            undefined: f,
            NaN: f,
            Infinity: f,
          };
        if (Q) {
          var h = { type: "variable", style: "variable-3" },
            i = {
              interface: a("interface"),
              class: a("class"),
              extends: a("extends"),
              constructor: a("constructor"),
              public: a("public"),
              private: a("private"),
              protected: a("protected"),
              static: a("static"),
              super: a("super"),
              string: h,
              number: h,
              bool: h,
              any: h,
            };
          for (var j in i) g[j] = i[j];
        }
        return g;
      })(),
      S = /[+\-*&%=<>!?|]/,
      T = { atom: !0, number: !0, variable: !0, string: !0, regexp: !0 },
      U = { state: null, column: null, marked: null, cc: null },
      V = { name: "this", next: { name: "arguments" } };
    return (
      (r.lex = !0),
      {
        startState: function (a) {
          return {
            tokenize: f,
            lastType: null,
            cc: [],
            lexical: new i((a || 0) - O, 0, "block", !1),
            localVars: b.localVars,
            context: b.localVars && { vars: b.localVars },
            indented: 0,
          };
        },
        token: function (a, b) {
          if (
            (a.sol() &&
              (b.lexical.hasOwnProperty("align") || (b.lexical.align = !1),
              (b.indented = a.indentation())),
            a.eatSpace())
          )
            return null;
          var c = b.tokenize(a, b);
          return "comment" == M ? c : ((b.lastType = M), k(b, c, M, N, a));
        },
        indent: function (a, b) {
          if (a.tokenize == h) return CodeMirror.Pass;
          if (a.tokenize != f) return 0;
          var c = b && b.charAt(0),
            d = a.lexical;
          "stat" == d.type && "}" == c && (d = d.prev);
          var e = d.type,
            g = c == e;
          return "vardef" == e
            ? d.indented +
                ("operator" == a.lastType || "," == a.lastType ? 4 : 0)
            : "form" == e && "{" == c
              ? d.indented
              : "form" == e
                ? d.indented + O
                : "stat" == e
                  ? d.indented +
                    ("operator" == a.lastType || "," == a.lastType ? O : 0)
                  : "switch" != d.info || g
                    ? d.align
                      ? d.column + (g ? 0 : 1)
                      : d.indented + (g ? 0 : O)
                    : d.indented + (/^(?:case|default)\b/.test(b) ? O : 2 * O);
        },
        electricChars: ":{}",
        jsonMode: P,
      }
    );
  }),
  CodeMirror.defineMIME("text/javascript", "javascript"),
  CodeMirror.defineMIME("application/json", { name: "javascript", json: !0 }),
  CodeMirror.defineMIME("text/typescript", {
    name: "javascript",
    typescript: !0,
  }),
  CodeMirror.defineMIME("application/typescript", {
    name: "javascript",
    typescript: !0,
  }),
  (function () {
    function a(a, b, c, d) {
      if (
        ((this.atOccurrence = !1),
        (this.cm = a),
        null == d && "string" == typeof b && (d = !1),
        (c = c ? a.clipPos(c) : { line: 0, ch: 0 }),
        (this.pos = { from: c, to: c }),
        "string" != typeof b)
      )
        b.global || (b = new RegExp(b.source, b.ignoreCase ? "ig" : "g")),
          (this.matches = function (c, d) {
            if (c) {
              b.lastIndex = 0;
              for (
                var e = a.getLine(d.line).slice(0, d.ch), f = b.exec(e), g = 0;
                f;

              ) {
                (g += f.index + 1), (e = e.slice(g)), (b.lastIndex = 0);
                var h = b.exec(e);
                if (!h) break;
                f = h;
              }
              g--;
            } else {
              b.lastIndex = d.ch;
              var e = a.getLine(d.line),
                f = b.exec(e),
                g = f && f.index;
            }
            return f
              ? {
                  from: { line: d.line, ch: g },
                  to: { line: d.line, ch: g + f[0].length },
                  match: f,
                }
              : void 0;
          });
      else {
        d && (b = b.toLowerCase());
        var e = d
            ? function (a) {
                return a.toLowerCase();
              }
            : function (a) {
                return a;
              },
          f = b.split("\n");
        this.matches =
          1 == f.length
            ? function (c, d) {
                var f,
                  g = e(a.getLine(d.line)),
                  h = b.length;
                return (
                  c
                    ? d.ch >= h && -1 != (f = g.lastIndexOf(b, d.ch - h))
                    : -1 != (f = g.indexOf(b, d.ch))
                )
                  ? {
                      from: { line: d.line, ch: f },
                      to: { line: d.line, ch: f + h },
                    }
                  : void 0;
              }
            : function (b, c) {
                var d = c.line,
                  g = b ? f.length - 1 : 0,
                  h = f[g],
                  i = e(a.getLine(d)),
                  j = b ? i.indexOf(h) + h.length : i.lastIndexOf(h);
                if (
                  !(b
                    ? j >= c.ch || j != h.length
                    : j <= c.ch || j != i.length - h.length)
                )
                  for (;;) {
                    if (b ? !d : d == a.lineCount() - 1) return;
                    if (
                      ((i = e(a.getLine((d += b ? -1 : 1)))),
                      (h = f[b ? --g : ++g]),
                      !(g > 0 && g < f.length - 1))
                    ) {
                      var k = b ? i.lastIndexOf(h) : i.indexOf(h) + h.length;
                      if (b ? k != i.length - h.length : k != h.length) return;
                      var l = { line: c.line, ch: j },
                        m = { line: d, ch: k };
                      return { from: b ? m : l, to: b ? l : m };
                    }
                    if (i != h) return;
                  }
              };
      }
    }
    (a.prototype = {
      findNext: function () {
        return this.find(!1);
      },
      findPrevious: function () {
        return this.find(!0);
      },
      find: function (a) {
        function b(a) {
          var b = { line: a, ch: 0 };
          return (c.pos = { from: b, to: b }), (c.atOccurrence = !1), !1;
        }
        for (
          var c = this, d = this.cm.clipPos(a ? this.pos.from : this.pos.to);
          ;

        ) {
          if ((this.pos = this.matches(a, d)))
            return (this.atOccurrence = !0), this.pos.match || !0;
          if (a) {
            if (!d.line) return b(0);
            d = { line: d.line - 1, ch: this.cm.getLine(d.line - 1).length };
          } else {
            var e = this.cm.lineCount();
            if (d.line == e - 1) return b(e);
            d = { line: d.line + 1, ch: 0 };
          }
        }
      },
      from: function () {
        return this.atOccurrence ? this.pos.from : void 0;
      },
      to: function () {
        return this.atOccurrence ? this.pos.to : void 0;
      },
      replace: function (a) {
        var b = this;
        this.atOccurrence &&
          (b.pos.to = this.cm.replaceRange(a, b.pos.from, b.pos.to));
      },
    }),
      CodeMirror.defineExtension("getSearchCursor", function (b, c, d) {
        return new a(this, b, c, d);
      });
  })();
