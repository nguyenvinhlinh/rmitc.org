(function(e, t) {
    typeof module == "object" && typeof module.exports == "object" ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
})(typeof window != "undefined" ? window : this, function(window, noGlobal) {
    function isArraylike(e) {
        var t = e.length,
            n = jQuery.type(e);
        return n === "function" || jQuery.isWindow(e) ? !1 : e.nodeType === 1 && t ? !0 : n === "array" || t === 0 || typeof t == "number" && t > 0 && t - 1 in e
    }

    function winnow(e, t, n) {
        if (jQuery.isFunction(t)) return jQuery.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        });
        if (t.nodeType) return jQuery.grep(e, function(e) {
            return e === t !== n
        });
        if (typeof t == "string") {
            if (risSimple.test(t)) return jQuery.filter(t, e, n);
            t = jQuery.filter(t, e)
        }
        return jQuery.grep(e, function(e) {
            return indexOf.call(t, e) >= 0 !== n
        })
    }

    function sibling(e, t) {
        while ((e = e[t]) && e.nodeType !== 1);
        return e
    }

    function createOptions(e) {
        var t = optionsCache[e] = {};
        return jQuery.each(e.match(rnotwhite) || [], function(e, n) {
            t[n] = !0
        }), t
    }

    function completed() {
        document.removeEventListener("DOMContentLoaded", completed, !1), window.removeEventListener("load", completed, !1), jQuery.ready()
    }

    function Data() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {}
            }
        }), this.expando = jQuery.expando + Math.random()
    }

    function dataAttr(e, t, n) {
        var r;
        if (n === undefined && e.nodeType === 1) {
            r = "data-" + t.replace(rmultiDash, "-$1").toLowerCase(), n = e.getAttribute(r);
            if (typeof n == "string") {
                try {
                    n = n === "true" ? !0 : n === "false" ? !1 : n === "null" ? null : +n + "" === n ? +n : rbrace.test(n) ? jQuery.parseJSON(n) : n
                } catch (i) {}
                data_user.set(e, t, n)
            } else n = undefined
        }
        return n
    }

    function returnTrue() {
        return !0
    }

    function returnFalse() {
        return !1
    }

    function safeActiveElement() {
        try {
            return document.activeElement
        } catch (e) {}
    }

    function manipulationTarget(e, t) {
        return jQuery.nodeName(e, "table") && jQuery.nodeName(t.nodeType !== 11 ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function disableScript(e) {
        return e.type = (e.getAttribute("type") !== null) + "/" + e.type, e
    }

    function restoreScript(e) {
        var t = rscriptTypeMasked.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function setGlobalEval(e, t) {
        var n = 0,
            r = e.length;
        for (; n < r; n++) data_priv.set(e[n], "globalEval", !t || data_priv.get(t[n], "globalEval"))
    }

    function cloneCopyEvent(e, t) {
        var n, r, i, s, o, u, a, f;
        if (t.nodeType !== 1) return;
        if (data_priv.hasData(e)) {
            s = data_priv.access(e), o = data_priv.set(t, s), f = s.events;
            if (f) {
                delete o.handle, o.events = {};
                for (i in f)
                    for (n = 0, r = f[i].length; n < r; n++) jQuery.event.add(t, i, f[i][n])
            }
        }
        data_user.hasData(e) && (u = data_user.access(e), a = jQuery.extend({}, u), data_user.set(t, a))
    }

    function getAll(e, t) {
        var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return t === undefined || t && jQuery.nodeName(e, t) ? jQuery.merge([e], n) : n
    }

    function fixInput(e, t) {
        var n = t.nodeName.toLowerCase();
        if (n === "input" && rcheckableType.test(e.type)) t.checked = e.checked;
        else if (n === "input" || n === "textarea") t.defaultValue = e.defaultValue
    }

    function actualDisplay(e, t) {
        var n, r = jQuery(t.createElement(e)).appendTo(t.body),
            i = window.getDefaultComputedStyle && (n = window.getDefaultComputedStyle(r[0])) ? n.display : jQuery.css(r[0], "display");
        return r.detach(), i
    }

    function defaultDisplay(e) {
        var t = document,
            n = elemdisplay[e];
        if (!n) {
            n = actualDisplay(e, t);
            if (n === "none" || !n) iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = iframe[0].contentDocument, t.write(), t.close(), n = actualDisplay(e, t), iframe.detach();
            elemdisplay[e] = n
        }
        return n
    }

    function curCSS(e, t, n) {
        var r, i, s, o, u = e.style;
        return n = n || getStyles(e), n && (o = n.getPropertyValue(t) || n[t]), n && (o === "" && !jQuery.contains(e.ownerDocument, e) && (o = jQuery.style(e, t)), rnumnonpx.test(o) && rmargin.test(t) && (r = u.width, i = u.minWidth, s = u.maxWidth, u.minWidth = u.maxWidth = u.width = o, o = n.width, u.width = r, u.minWidth = i, u.maxWidth = s)), o !== undefined ? o + "" : o
    }

    function addGetHookIf(e, t) {
        return {
            get: function() {
                if (e()) {
                    delete this.get;
                    return
                }
                return (this.get = t).apply(this, arguments)
            }
        }
    }

    function vendorPropName(e, t) {
        if (t in e) return t;
        var n = t[0].toUpperCase() + t.slice(1),
            r = t,
            i = cssPrefixes.length;
        while (i--) {
            t = cssPrefixes[i] + n;
            if (t in e) return t
        }
        return r
    }

    function setPositiveNumber(e, t, n) {
        var r = rnumsplit.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function augmentWidthOrHeight(e, t, n, r, i) {
        var s = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0,
            o = 0;
        for (; s < 4; s += 2) n === "margin" && (o += jQuery.css(e, n + cssExpand[s], !0, i)), r ? (n === "content" && (o -= jQuery.css(e, "padding" + cssExpand[s], !0, i)), n !== "margin" && (o -= jQuery.css(e, "border" + cssExpand[s] + "Width", !0, i))) : (o += jQuery.css(e, "padding" + cssExpand[s], !0, i), n !== "padding" && (o += jQuery.css(e, "border" + cssExpand[s] + "Width", !0, i)));
        return o
    }

    function getWidthOrHeight(e, t, n) {
        var r = !0,
            i = t === "width" ? e.offsetWidth : e.offsetHeight,
            s = getStyles(e),
            o = jQuery.css(e, "boxSizing", !1, s) === "border-box";
        if (i <= 0 || i == null) {
            i = curCSS(e, t, s);
            if (i < 0 || i == null) i = e.style[t];
            if (rnumnonpx.test(i)) return i;
            r = o && (support.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + augmentWidthOrHeight(e, t, n || (o ? "border" : "content"), r, s) + "px"
    }

    function showHide(e, t) {
        var n, r, i, s = [],
            o = 0,
            u = e.length;
        for (; o < u; o++) {
            r = e[o];
            if (!r.style) continue;
            s[o] = data_priv.get(r, "olddisplay"), n = r.style.display, t ? (!s[o] && n === "none" && (r.style.display = ""), r.style.display === "" && isHidden(r) && (s[o] = data_priv.access(r, "olddisplay", defaultDisplay(r.nodeName)))) : (i = isHidden(r), (n !== "none" || !i) && data_priv.set(r, "olddisplay", i ? n : jQuery.css(r, "display")))
        }
        for (o = 0; o < u; o++) {
            r = e[o];
            if (!r.style) continue;
            if (!t || r.style.display === "none" || r.style.display === "") r.style.display = t ? s[o] || "" : "none"
        }
        return e
    }

    function Tween(e, t, n, r, i) {
        return new Tween.prototype.init(e, t, n, r, i)
    }

    function createFxNow() {
        return setTimeout(function() {
            fxNow = undefined
        }), fxNow = jQuery.now()
    }

    function genFx(e, t) {
        var n, r = 0,
            i = {
                height: e
            };
        t = t ? 1 : 0;
        for (; r < 4; r += 2 - t) n = cssExpand[r], i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function createTween(e, t, n) {
        var r, i = (tweeners[t] || []).concat(tweeners["*"]),
            s = 0,
            o = i.length;
        for (; s < o; s++)
            if (r = i[s].call(n, t, e)) return r
    }

    function defaultPrefilter(e, t, n) {
        var r, i, s, o, u, a, f, l, c = this,
            h = {},
            p = e.style,
            d = e.nodeType && isHidden(e),
            v = data_priv.get(e, "fxshow");
        n.queue || (u = jQuery._queueHooks(e, "fx"), u.unqueued == null && (u.unqueued = 0, a = u.empty.fire, u.empty.fire = function() {
            u.unqueued || a()
        }), u.unqueued++, c.always(function() {
            c.always(function() {
                u.unqueued--, jQuery.queue(e, "fx").length || u.empty.fire()
            })
        })), e.nodeType === 1 && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], f = jQuery.css(e, "display"), l = f === "none" ? data_priv.get(e, "olddisplay") || defaultDisplay(e.nodeName) : f, l === "inline" && jQuery.css(e, "float") === "none" && (p.display = "inline-block")), n.overflow && (p.overflow = "hidden", c.always(function() {
            p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
        }));
        for (r in t) {
            i = t[r];
            if (rfxtypes.exec(i)) {
                delete t[r], s = s || i === "toggle";
                if (i === (d ? "hide" : "show")) {
                    if (i !== "show" || !v || v[r] === undefined) continue;
                    d = !0
                }
                h[r] = v && v[r] || jQuery.style(e, r)
            } else f = undefined
        }
        if (!jQuery.isEmptyObject(h)) {
            v ? "hidden" in v && (d = v.hidden) : v = data_priv.access(e, "fxshow", {}), s && (v.hidden = !d), d ? jQuery(e).show() : c.done(function() {
                jQuery(e).hide()
            }), c.done(function() {
                var t;
                data_priv.remove(e, "fxshow");
                for (t in h) jQuery.style(e, t, h[t])
            });
            for (r in h) o = createTween(d ? v[r] : 0, r, c), r in v || (v[r] = o.start, d && (o.end = o.start, o.start = r === "width" || r === "height" ? 1 : 0))
        } else(f === "none" ? defaultDisplay(e.nodeName) : f) === "inline" && (p.display = f)
    }

    function propFilter(e, t) {
        var n, r, i, s, o;
        for (n in e) {
            r = jQuery.camelCase(n), i = t[r], s = e[n], jQuery.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = jQuery.cssHooks[r];
            if (o && "expand" in o) {
                s = o.expand(s), delete e[r];
                for (n in s) n in e || (e[n] = s[n], t[n] = i)
            } else t[r] = i
        }
    }

    function Animation(e, t, n) {
        var r, i, s = 0,
            o = animationPrefilters.length,
            u = jQuery.Deferred().always(function() {
                delete a.elem
            }),
            a = function() {
                if (i) return !1;
                var t = fxNow || createFxNow(),
                    n = Math.max(0, f.startTime + f.duration - t),
                    r = n / f.duration || 0,
                    s = 1 - r,
                    o = 0,
                    a = f.tweens.length;
                for (; o < a; o++) f.tweens[o].run(s);
                return u.notifyWith(e, [f, s, n]), s < 1 && a ? n : (u.resolveWith(e, [f]), !1)
            },
            f = u.promise({
                elem: e,
                props: jQuery.extend({}, t),
                opts: jQuery.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: fxNow || createFxNow(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var r = jQuery.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
                    return f.tweens.push(r), r
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? f.tweens.length : 0;
                    if (i) return this;
                    i = !0;
                    for (; n < r; n++) f.tweens[n].run(1);
                    return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this
                }
            }),
            l = f.props;
        propFilter(l, f.opts.specialEasing);
        for (; s < o; s++) {
            r = animationPrefilters[s].call(f, e, l, f.opts);
            if (r) return r
        }
        return jQuery.map(l, createTween, f), jQuery.isFunction(f.opts.start) && f.opts.start.call(e, f), jQuery.fx.timer(jQuery.extend(a, {
            elem: e,
            anim: f,
            queue: f.opts.queue
        })), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
    }

    function addToPrefiltersOrTransports(e) {
        return function(t, n) {
            typeof t != "string" && (n = t, t = "*");
            var r, i = 0,
                s = t.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(n))
                while (r = s[i++]) r[0] === "+" ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function inspectPrefiltersOrTransports(e, t, n, r) {
        function o(u) {
            var a;
            return i[u] = !0, jQuery.each(e[u] || [], function(e, u) {
                var f = u(t, n, r);
                if (typeof f == "string" && !s && !i[f]) return t.dataTypes.unshift(f), o(f), !1;
                if (s) return !(a = f)
            }), a
        }
        var i = {},
            s = e === transports;
        return o(t.dataTypes[0]) || !i["*"] && o("*")
    }

    function ajaxExtend(e, t) {
        var n, r, i = jQuery.ajaxSettings.flatOptions || {};
        for (n in t) t[n] !== undefined && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && jQuery.extend(!0, e, r), e
    }

    function ajaxHandleResponses(e, t, n) {
        var r, i, s, o, u = e.contents,
            a = e.dataTypes;
        while (a[0] === "*") a.shift(), r === undefined && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r)
            for (i in u)
                if (u[i] && u[i].test(r)) {
                    a.unshift(i);
                    break
                }
        if (a[0] in n) s = a[0];
        else {
            for (i in n) {
                if (!a[0] || e.converters[i + " " + a[0]]) {
                    s = i;
                    break
                }
                o || (o = i)
            }
            s = s || o
        } if (s) return s !== a[0] && a.unshift(s), n[s]
    }

    function ajaxConvert(e, t, n, r) {
        var i, s, o, u, a, f = {},
            l = e.dataTypes.slice();
        if (l[1])
            for (o in e.converters) f[o.toLowerCase()] = e.converters[o];
        s = l.shift();
        while (s) {
            e.responseFields[s] && (n[e.responseFields[s]] = t), !a && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), a = s, s = l.shift();
            if (s)
                if (s === "*") s = a;
                else if (a !== "*" && a !== s) {
                o = f[a + " " + s] || f["* " + s];
                if (!o)
                    for (i in f) {
                        u = i.split(" ");
                        if (u[1] === s) {
                            o = f[a + " " + u[0]] || f["* " + u[0]];
                            if (o) {
                                o === !0 ? o = f[i] : f[i] !== !0 && (s = u[0], l.unshift(u[1]));
                                break
                            }
                        }
                    }
                if (o !== !0)
                    if (o && e["throws"]) t = o(t);
                    else try {
                        t = o(t)
                    } catch (c) {
                        return {
                            state: "parsererror",
                            error: o ? c : "No conversion from " + a + " to " + s
                        }
                    }
            }
        }
        return {
            state: "success",
            data: t
        }
    }

    function buildParams(e, t, n, r) {
        var i;
        if (jQuery.isArray(t)) jQuery.each(t, function(t, i) {
            n || rbracket.test(e) ? r(e, i) : buildParams(e + "[" + (typeof i == "object" ? t : "") + "]", i, n, r)
        });
        else if (!n && jQuery.type(t) === "object")
            for (i in t) buildParams(e + "[" + i + "]", t[i], n, r);
        else r(e, t)
    }

    function getWindow(e) {
        return jQuery.isWindow(e) ? e : e.nodeType === 9 && e.defaultView
    }
    var arr = [],
        slice = arr.slice,
        concat = arr.concat,
        push = arr.push,
        indexOf = arr.indexOf,
        class2type = {},
        toString = class2type.toString,
        hasOwn = class2type.hasOwnProperty,
        support = {},
        document = window.document,
        version = "2.1.1",
        jQuery = function(e, t) {
            return new jQuery.fn.init(e, t)
        },
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,
        fcamelCase = function(e, t) {
            return t.toUpperCase()
        };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return slice.call(this)
        },
        get: function(e) {
            return e != null ? e < 0 ? this[e + this.length] : this[e] : slice.call(this)
        },
        pushStack: function(e) {
            var t = jQuery.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function(e, t) {
            return jQuery.each(this, e, t)
        },
        map: function(e) {
            return this.pushStack(jQuery.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: push,
        sort: arr.sort,
        splice: arr.splice
    }, jQuery.extend = jQuery.fn.extend = function() {
        var e, t, n, r, i, s, o = arguments[0] || {},
            u = 1,
            a = arguments.length,
            f = !1;
        typeof o == "boolean" && (f = o, o = arguments[u] || {}, u++), typeof o != "object" && !jQuery.isFunction(o) && (o = {}), u === a && (o = this, u--);
        for (; u < a; u++)
            if ((e = arguments[u]) != null)
                for (t in e) {
                    n = o[t], r = e[t];
                    if (o === r) continue;
                    f && r && (jQuery.isPlainObject(r) || (i = jQuery.isArray(r))) ? (i ? (i = !1, s = n && jQuery.isArray(n) ? n : []) : s = n && jQuery.isPlainObject(n) ? n : {}, o[t] = jQuery.extend(f, s, r)) : r !== undefined && (o[t] = r)
                }
            return o
    }, jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return jQuery.type(e) === "function"
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return e != null && e === e.window
        },
        isNumeric: function(e) {
            return !jQuery.isArray(e) && e - parseFloat(e) >= 0
        },
        isPlainObject: function(e) {
            return jQuery.type(e) !== "object" || e.nodeType || jQuery.isWindow(e) ? !1 : e.constructor && !hasOwn.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        type: function(e) {
            return e == null ? e + "" : typeof e == "object" || typeof e == "function" ? class2type[toString.call(e)] || "object" : typeof e
        },
        globalEval: function(code) {
            var script, indirect = eval;
            code = jQuery.trim(code), code && (code.indexOf("use strict") === 1 ? (script = document.createElement("script"), script.text = code, document.head.appendChild(script).parentNode.removeChild(script)) : indirect(code))
        },
        camelCase: function(e) {
            return e.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t, n) {
            var r, i = 0,
                s = e.length,
                o = isArraylike(e);
            if (n)
                if (o)
                    for (; i < s; i++) {
                        r = t.apply(e[i], n);
                        if (r === !1) break
                    } else
                        for (i in e) {
                            r = t.apply(e[i], n);
                            if (r === !1) break
                        } else if (o)
                            for (; i < s; i++) {
                                r = t.call(e[i], i, e[i]);
                                if (r === !1) break
                            } else
                                for (i in e) {
                                    r = t.call(e[i], i, e[i]);
                                    if (r === !1) break
                                }
                        return e
        },
        trim: function(e) {
            return e == null ? "" : (e + "").replace(rtrim, "")
        },
        makeArray: function(e, t) {
            var n = t || [];
            return e != null && (isArraylike(Object(e)) ? jQuery.merge(n, typeof e == "string" ? [e] : e) : push.call(n, e)), n
        },
        inArray: function(e, t, n) {
            return t == null ? -1 : indexOf.call(t, e, n)
        },
        merge: function(e, t) {
            var n = +t.length,
                r = 0,
                i = e.length;
            for (; r < n; r++) e[i++] = t[r];
            return e.length = i, e
        },
        grep: function(e, t, n) {
            var r, i = [],
                s = 0,
                o = e.length,
                u = !n;
            for (; s < o; s++) r = !t(e[s], s), r !== u && i.push(e[s]);
            return i
        },
        map: function(e, t, n) {
            var r, i = 0,
                s = e.length,
                o = isArraylike(e),
                u = [];
            if (o)
                for (; i < s; i++) r = t(e[i], i, n), r != null && u.push(r);
            else
                for (i in e) r = t(e[i], i, n), r != null && u.push(r);
            return concat.apply([], u)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, r, i;
            return typeof t == "string" && (n = e[t], t = e, e = n), jQuery.isFunction(e) ? (r = slice.call(arguments, 2), i = function() {
                return e.apply(t || this, r.concat(slice.call(arguments)))
            }, i.guid = e.guid = e.guid || jQuery.guid++, i) : undefined
        },
        now: Date.now,
        support: support
    }), jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
        class2type["[object " + t + "]"] = t.toLowerCase()
    });
    var Sizzle = function(e) {
        function st(e, t, r, i) {
            var s, u, f, l, c, d, g, y, S, x;
            (t ? t.ownerDocument || t : E) !== p && h(t), t = t || p, r = r || [];
            if (!e || typeof e != "string") return r;
            if ((l = t.nodeType) !== 1 && l !== 9) return [];
            if (v && !i) {
                if (s = Z.exec(e))
                    if (f = s[1]) {
                        if (l === 9) {
                            u = t.getElementById(f);
                            if (!u || !u.parentNode) return r;
                            if (u.id === f) return r.push(u), r
                        } else if (t.ownerDocument && (u = t.ownerDocument.getElementById(f)) && b(t, u) && u.id === f) return r.push(u), r
                    } else {
                        if (s[2]) return P.apply(r, t.getElementsByTagName(e)), r;
                        if ((f = s[3]) && n.getElementsByClassName && t.getElementsByClassName) return P.apply(r, t.getElementsByClassName(f)), r
                    }
                if (n.qsa && (!m || !m.test(e))) {
                    y = g = w, S = t, x = l === 9 && e;
                    if (l === 1 && t.nodeName.toLowerCase() !== "object") {
                        d = o(e), (g = t.getAttribute("id")) ? y = g.replace(tt, "\\$&") : t.setAttribute("id", y), y = "[id='" + y + "'] ", c = d.length;
                        while (c--) d[c] = y + mt(d[c]);
                        S = et.test(e) && dt(t.parentNode) || t, x = d.join(",")
                    }
                    if (x) try {
                        return P.apply(r, S.querySelectorAll(x)), r
                    } catch (T) {} finally {
                        g || t.removeAttribute("id")
                    }
                }
            }
            return a(e.replace(z, "$1"), t, r, i)
        }

        function ot() {
            function t(n, i) {
                return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i
            }
            var e = [];
            return t
        }

        function ut(e) {
            return e[w] = !0, e
        }

        function at(e) {
            var t = p.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function ft(e, t) {
            var n = e.split("|"),
                i = e.length;
            while (i--) r.attrHandle[n[i]] = t
        }

        function lt(e, t) {
            var n = t && e,
                r = n && e.nodeType === 1 && t.nodeType === 1 && (~t.sourceIndex || A) - (~e.sourceIndex || A);
            if (r) return r;
            if (n)
                while (n = n.nextSibling)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function ct(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return n === "input" && t.type === e
            }
        }

        function ht(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return (n === "input" || n === "button") && t.type === e
            }
        }

        function pt(e) {
            return ut(function(t) {
                return t = +t, ut(function(n, r) {
                    var i, s = e([], n.length, t),
                        o = s.length;
                    while (o--) n[i = s[o]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function dt(e) {
            return e && typeof e.getElementsByTagName !== L && e
        }

        function vt() {}

        function mt(e) {
            var t = 0,
                n = e.length,
                r = "";
            for (; t < n; t++) r += e[t].value;
            return r
        }

        function gt(e, t, n) {
            var r = t.dir,
                i = n && r === "parentNode",
                s = x++;
            return t.first ? function(t, n, s) {
                while (t = t[r])
                    if (t.nodeType === 1 || i) return e(t, n, s)
            } : function(t, n, o) {
                var u, a, f = [S, s];
                if (o) {
                    while (t = t[r])
                        if (t.nodeType === 1 || i)
                            if (e(t, n, o)) return !0
                } else
                    while (t = t[r])
                        if (t.nodeType === 1 || i) {
                            a = t[w] || (t[w] = {});
                            if ((u = a[r]) && u[0] === S && u[1] === s) return f[2] = u[2];
                            a[r] = f;
                            if (f[2] = e(t, n, o)) return !0
                        }
            }
        }

        function yt(e) {
            return e.length > 1 ? function(t, n, r) {
                var i = e.length;
                while (i--)
                    if (!e[i](t, n, r)) return !1;
                return !0
            } : e[0]
        }

        function bt(e, t, n) {
            var r = 0,
                i = t.length;
            for (; r < i; r++) st(e, t[r], n);
            return n
        }

        function wt(e, t, n, r, i) {
            var s, o = [],
                u = 0,
                a = e.length,
                f = t != null;
            for (; u < a; u++)
                if (s = e[u])
                    if (!n || n(s, r, i)) o.push(s), f && t.push(u);
            return o
        }

        function Et(e, t, n, r, i, s) {
            return r && !r[w] && (r = Et(r)), i && !i[w] && (i = Et(i, s)), ut(function(s, o, u, a) {
                var f, l, c, h = [],
                    p = [],
                    d = o.length,
                    v = s || bt(t || "*", u.nodeType ? [u] : u, []),
                    m = e && (s || !t) ? wt(v, h, e, u, a) : v,
                    g = n ? i || (s ? e : d || r) ? [] : o : m;
                n && n(m, g, u, a);
                if (r) {
                    f = wt(g, p), r(f, [], u, a), l = f.length;
                    while (l--)
                        if (c = f[l]) g[p[l]] = !(m[p[l]] = c)
                }
                if (s) {
                    if (i || e) {
                        if (i) {
                            f = [], l = g.length;
                            while (l--)(c = g[l]) && f.push(m[l] = c);
                            i(null, g = [], f, a)
                        }
                        l = g.length;
                        while (l--)(c = g[l]) && (f = i ? B.call(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
                    }
                } else g = wt(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : P.apply(o, g)
            })
        }

        function St(e) {
            var t, n, i, s = e.length,
                o = r.relative[e[0].type],
                u = o || r.relative[" "],
                a = o ? 1 : 0,
                l = gt(function(e) {
                    return e === t
                }, u, !0),
                c = gt(function(e) {
                    return B.call(t, e) > -1
                }, u, !0),
                h = [
                    function(e, n, r) {
                        return !o && (r || n !== f) || ((t = n).nodeType ? l(e, n, r) : c(e, n, r))
                    }
                ];
            for (; a < s; a++)
                if (n = r.relative[e[a].type]) h = [gt(yt(h), n)];
                else {
                    n = r.filter[e[a].type].apply(null, e[a].matches);
                    if (n[w]) {
                        i = ++a;
                        for (; i < s; i++)
                            if (r.relative[e[i].type]) break;
                        return Et(a > 1 && yt(h), a > 1 && mt(e.slice(0, a - 1).concat({
                            value: e[a - 2].type === " " ? "*" : ""
                        })).replace(z, "$1"), n, a < i && St(e.slice(a, i)), i < s && St(e = e.slice(i)), i < s && mt(e))
                    }
                    h.push(n)
                }
            return yt(h)
        }

        function xt(e, t) {
            var n = t.length > 0,
                i = e.length > 0,
                s = function(s, o, u, a, l) {
                    var c, h, d, v = 0,
                        m = "0",
                        g = s && [],
                        y = [],
                        b = f,
                        w = s || i && r.find.TAG("*", l),
                        E = S += b == null ? 1 : Math.random() || .1,
                        x = w.length;
                    l && (f = o !== p && o);
                    for (; m !== x && (c = w[m]) != null; m++) {
                        if (i && c) {
                            h = 0;
                            while (d = e[h++])
                                if (d(c, o, u)) {
                                    a.push(c);
                                    break
                                }
                            l && (S = E)
                        }
                        n && ((c = !d && c) && v--, s && g.push(c))
                    }
                    v += m;
                    if (n && m !== v) {
                        h = 0;
                        while (d = t[h++]) d(g, y, o, u);
                        if (s) {
                            if (v > 0)
                                while (m--)!g[m] && !y[m] && (y[m] = _.call(a));
                            y = wt(y)
                        }
                        P.apply(a, y), l && !s && y.length > 0 && v + t.length > 1 && st.uniqueSort(a)
                    }
                    return l && (S = E, f = b), g
                };
            return n ? ut(s) : s
        }
        var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w = "sizzle" + -(new Date),
            E = e.document,
            S = 0,
            x = 0,
            T = ot(),
            N = ot(),
            C = ot(),
            k = function(e, t) {
                return e === t && (c = !0), 0
            },
            L = typeof undefined,
            A = 1 << 31,
            O = {}.hasOwnProperty,
            M = [],
            _ = M.pop,
            D = M.push,
            P = M.push,
            H = M.slice,
            B = M.indexOf || function(e) {
                var t = 0,
                    n = this.length;
                for (; t < n; t++)
                    if (this[t] === e) return t;
                return -1
            },
            j = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            F = "[\\x20\\t\\r\\n\\f]",
            I = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            q = I.replace("w", "w#"),
            R = "\\[" + F + "*(" + I + ")(?:" + F + "*([*^$|!~]?=)" + F + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + q + "))|)" + F + "*\\]",
            U = ":(" + I + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + R + ")*)|" + ".*" + ")\\)|)",
            z = new RegExp("^" + F + "+|((?:^|[^\\\\])(?:\\\\.)*)" + F + "+$", "g"),
            W = new RegExp("^" + F + "*," + F + "*"),
            X = new RegExp("^" + F + "*([>+~]|" + F + ")" + F + "*"),
            V = new RegExp("=" + F + "*([^\\]'\"]*?)" + F + "*\\]", "g"),
            $ = new RegExp(U),
            J = new RegExp("^" + q + "$"),
            K = {
                ID: new RegExp("^#(" + I + ")"),
                CLASS: new RegExp("^\\.(" + I + ")"),
                TAG: new RegExp("^(" + I.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + R),
                PSEUDO: new RegExp("^" + U),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + F + "*(even|odd|(([+-]|)(\\d*)n|)" + F + "*(?:([+-]|)" + F + "*(\\d+)|))" + F + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + j + ")$", "i"),
                needsContext: new RegExp("^" + F + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + F + "*((?:-\\d)?\\d*)" + F + "*\\)|)(?=[^-]|$)", "i")
            },
            Q = /^(?:input|select|textarea|button)$/i,
            G = /^h\d$/i,
            Y = /^[^{]+\{\s*\[native \w/,
            Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            et = /[+~]/,
            tt = /'|\\/g,
            nt = new RegExp("\\\\([\\da-f]{1,6}" + F + "?|(" + F + ")|.)", "ig"),
            rt = function(e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, r & 1023 | 56320)
            };
        try {
            P.apply(M = H.call(E.childNodes), E.childNodes), M[E.childNodes.length].nodeType
        } catch (it) {
            P = {
                apply: M.length ? function(e, t) {
                    D.apply(e, H.call(t))
                } : function(e, t) {
                    var n = e.length,
                        r = 0;
                    while (e[n++] = t[r++]);
                    e.length = n - 1
                }
            }
        }
        n = st.support = {}, s = st.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? t.nodeName !== "HTML" : !1
        }, h = st.setDocument = function(e) {
            var t, i = e ? e.ownerDocument || e : E,
                o = i.defaultView;
            if (i === p || i.nodeType !== 9 || !i.documentElement) return p;
            p = i, d = i.documentElement, v = !s(i), o && o !== o.top && (o.addEventListener ? o.addEventListener("unload", function() {
                h()
            }, !1) : o.attachEvent && o.attachEvent("onunload", function() {
                h()
            })), n.attributes = at(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), n.getElementsByTagName = at(function(e) {
                return e.appendChild(i.createComment("")), !e.getElementsByTagName("*").length
            }), n.getElementsByClassName = Y.test(i.getElementsByClassName) && at(function(e) {
                return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", e.getElementsByClassName("i").length === 2
            }), n.getById = at(function(e) {
                return d.appendChild(e).id = w, !i.getElementsByName || !i.getElementsByName(w).length
            }), n.getById ? (r.find.ID = function(e, t) {
                if (typeof t.getElementById !== L && v) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, r.filter.ID = function(e) {
                var t = e.replace(nt, rt);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete r.find.ID, r.filter.ID = function(e) {
                var t = e.replace(nt, rt);
                return function(e) {
                    var n = typeof e.getAttributeNode !== L && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), r.find.TAG = n.getElementsByTagName ? function(e, t) {
                if (typeof t.getElementsByTagName !== L) return t.getElementsByTagName(e)
            } : function(e, t) {
                var n, r = [],
                    i = 0,
                    s = t.getElementsByTagName(e);
                if (e === "*") {
                    while (n = s[i++]) n.nodeType === 1 && r.push(n);
                    return r
                }
                return s
            }, r.find.CLASS = n.getElementsByClassName && function(e, t) {
                if (typeof t.getElementsByClassName !== L && v) return t.getElementsByClassName(e)
            }, g = [], m = [];
            if (n.qsa = Y.test(i.querySelectorAll)) at(function(e) {
                e.innerHTML = "<select msallowclip=''><option selected=''></option></select>", e.querySelectorAll("[msallowclip^='']").length && m.push("[*^$]=" + F + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || m.push("\\[" + F + "*(?:value|" + j + ")"), e.querySelectorAll(":checked").length || m.push(":checked")
            }), at(function(e) {
                var t = i.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && m.push("name" + F + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || m.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), m.push(",.*:")
            });
            return (n.matchesSelector = Y.test(y = d.matches || d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.msMatchesSelector)) && at(function(e) {
                n.disconnectedMatch = y.call(e, "div"), y.call(e, "[s!='']:x"), g.push("!=", U)
            }), m = m.length && new RegExp(m.join("|")), g = g.length && new RegExp(g.join("|")), t = Y.test(d.compareDocumentPosition), b = t || Y.test(d.contains) ? function(e, t) {
                var n = e.nodeType === 9 ? e.documentElement : e,
                    r = t && t.parentNode;
                return e === r || !!r && r.nodeType === 1 && !!(n.contains ? n.contains(r) : e.compareDocumentPosition && e.compareDocumentPosition(r) & 16)
            } : function(e, t) {
                if (t)
                    while (t = t.parentNode)
                        if (t === e) return !0;
                return !1
            }, k = t ? function(e, t) {
                if (e === t) return c = !0, 0;
                var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return r ? r : (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, r & 1 || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === i || e.ownerDocument === E && b(E, e) ? -1 : t === i || t.ownerDocument === E && b(E, t) ? 1 : l ? B.call(l, e) - B.call(l, t) : 0 : r & 4 ? -1 : 1)
            } : function(e, t) {
                if (e === t) return c = !0, 0;
                var n, r = 0,
                    s = e.parentNode,
                    o = t.parentNode,
                    u = [e],
                    a = [t];
                if (!s || !o) return e === i ? -1 : t === i ? 1 : s ? -1 : o ? 1 : l ? B.call(l, e) - B.call(l, t) : 0;
                if (s === o) return lt(e, t);
                n = e;
                while (n = n.parentNode) u.unshift(n);
                n = t;
                while (n = n.parentNode) a.unshift(n);
                while (u[r] === a[r]) r++;
                return r ? lt(u[r], a[r]) : u[r] === E ? -1 : a[r] === E ? 1 : 0
            }, i
        }, st.matches = function(e, t) {
            return st(e, null, null, t)
        }, st.matchesSelector = function(e, t) {
            (e.ownerDocument || e) !== p && h(e), t = t.replace(V, "='$1']");
            if (n.matchesSelector && v && (!g || !g.test(t)) && (!m || !m.test(t))) try {
                var r = y.call(e, t);
                if (r || n.disconnectedMatch || e.document && e.document.nodeType !== 11) return r
            } catch (i) {}
            return st(t, p, null, [e]).length > 0
        }, st.contains = function(e, t) {
            return (e.ownerDocument || e) !== p && h(e), b(e, t)
        }, st.attr = function(e, t) {
            (e.ownerDocument || e) !== p && h(e);
            var i = r.attrHandle[t.toLowerCase()],
                s = i && O.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !v) : undefined;
            return s !== undefined ? s : n.attributes || !v ? e.getAttribute(t) : (s = e.getAttributeNode(t)) && s.specified ? s.value : null
        }, st.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, st.uniqueSort = function(e) {
            var t, r = [],
                i = 0,
                s = 0;
            c = !n.detectDuplicates, l = !n.sortStable && e.slice(0), e.sort(k);
            if (c) {
                while (t = e[s++]) t === e[s] && (i = r.push(s));
                while (i--) e.splice(r[i], 1)
            }
            return l = null, e
        }, i = st.getText = function(e) {
            var t, n = "",
                r = 0,
                s = e.nodeType;
            if (!s)
                while (t = e[r++]) n += i(t);
            else if (s === 1 || s === 9 || s === 11) {
                if (typeof e.textContent == "string") return e.textContent;
                for (e = e.firstChild; e; e = e.nextSibling) n += i(e)
            } else if (s === 3 || s === 4) return e.nodeValue;
            return n
        }, r = st.selectors = {
            cacheLength: 50,
            createPseudo: ut,
            match: K,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(nt, rt), e[3] = (e[3] || e[4] || e[5] || "").replace(nt, rt), e[2] === "~=" && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), e[1].slice(0, 3) === "nth" ? (e[3] || st.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === "even" || e[3] === "odd")), e[5] = +(e[7] + e[8] || e[3] === "odd")) : e[3] && st.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return K.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && $.test(n) && (t = o(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(nt, rt).toLowerCase();
                    return e === "*" ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = T[e + " "];
                    return t || (t = new RegExp("(^|" + F + ")" + e + "(" + F + "|$)")) && T(e, function(e) {
                        return t.test(typeof e.className == "string" && e.className || typeof e.getAttribute !== L && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, t, n) {
                    return function(r) {
                        var i = st.attr(r, e);
                        return i == null ? t === "!=" : t ? (i += "", t === "=" ? i === n : t === "!=" ? i !== n : t === "^=" ? n && i.indexOf(n) === 0 : t === "*=" ? n && i.indexOf(n) > -1 : t === "$=" ? n && i.slice(-n.length) === n : t === "~=" ? (" " + i + " ").indexOf(n) > -1 : t === "|=" ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
                    }
                },
                CHILD: function(e, t, n, r, i) {
                    var s = e.slice(0, 3) !== "nth",
                        o = e.slice(-4) !== "last",
                        u = t === "of-type";
                    return r === 1 && i === 0 ? function(e) {
                        return !!e.parentNode
                    } : function(t, n, a) {
                        var f, l, c, h, p, d, v = s !== o ? "nextSibling" : "previousSibling",
                            m = t.parentNode,
                            g = u && t.nodeName.toLowerCase(),
                            y = !a && !u;
                        if (m) {
                            if (s) {
                                while (v) {
                                    c = t;
                                    while (c = c[v])
                                        if (u ? c.nodeName.toLowerCase() === g : c.nodeType === 1) return !1;
                                    d = v = e === "only" && !d && "nextSibling"
                                }
                                return !0
                            }
                            d = [o ? m.firstChild : m.lastChild];
                            if (o && y) {
                                l = m[w] || (m[w] = {}), f = l[e] || [], p = f[0] === S && f[1], h = f[0] === S && f[2], c = p && m.childNodes[p];
                                while (c = ++p && c && c[v] || (h = p = 0) || d.pop())
                                    if (c.nodeType === 1 && ++h && c === t) {
                                        l[e] = [S, p, h];
                                        break
                                    }
                            } else if (y && (f = (t[w] || (t[w] = {}))[e]) && f[0] === S) h = f[1];
                            else
                                while (c = ++p && c && c[v] || (h = p = 0) || d.pop())
                                    if ((u ? c.nodeName.toLowerCase() === g : c.nodeType === 1) && ++h) {
                                        y && ((c[w] || (c[w] = {}))[e] = [S, h]);
                                        if (c === t) break
                                    } return h -= i, h === r || h % r === 0 && h / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, t) {
                    var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || st.error("unsupported pseudo: " + e);
                    return i[w] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? ut(function(e, n) {
                        var r, s = i(e, t),
                            o = s.length;
                        while (o--) r = B.call(e, s[o]), e[r] = !(n[r] = s[o])
                    }) : function(e) {
                        return i(e, 0, n)
                    }) : i
                }
            },
            pseudos: {
                not: ut(function(e) {
                    var t = [],
                        n = [],
                        r = u(e.replace(z, "$1"));
                    return r[w] ? ut(function(e, t, n, i) {
                        var s, o = r(e, null, i, []),
                            u = e.length;
                        while (u--)
                            if (s = o[u]) e[u] = !(t[u] = s)
                    }) : function(e, i, s) {
                        return t[0] = e, r(t, null, s, n), !n.pop()
                    }
                }),
                has: ut(function(e) {
                    return function(t) {
                        return st(e, t).length > 0
                    }
                }),
                contains: ut(function(e) {
                    return function(t) {
                        return (t.textContent || t.innerText || i(t)).indexOf(e) > -1
                    }
                }),
                lang: ut(function(e) {
                    return J.test(e || "") || st.error("unsupported lang: " + e), e = e.replace(nt, rt).toLowerCase(),
                        function(t) {
                            var n;
                            do
                                if (n = v ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || n.indexOf(e + "-") === 0;
                            while ((t = t.parentNode) && t.nodeType === 1);
                            return !1
                        }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === d
                },
                focus: function(e) {
                    return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return t === "input" && !!e.checked || t === "option" && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function(e) {
                    return !r.pseudos.empty(e)
                },
                header: function(e) {
                    return G.test(e.nodeName)
                },
                input: function(e) {
                    return Q.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return t === "input" && e.type === "button" || t === "button"
                },
                text: function(e) {
                    var t;
                    return e.nodeName.toLowerCase() === "input" && e.type === "text" && ((t = e.getAttribute("type")) == null || t.toLowerCase() === "text")
                },
                first: pt(function() {
                    return [0]
                }),
                last: pt(function(e, t) {
                    return [t - 1]
                }),
                eq: pt(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: pt(function(e, t) {
                    var n = 0;
                    for (; n < t; n += 2) e.push(n);
                    return e
                }),
                odd: pt(function(e, t) {
                    var n = 1;
                    for (; n < t; n += 2) e.push(n);
                    return e
                }),
                lt: pt(function(e, t, n) {
                    var r = n < 0 ? n + t : n;
                    for (; --r >= 0;) e.push(r);
                    return e
                }),
                gt: pt(function(e, t, n) {
                    var r = n < 0 ? n + t : n;
                    for (; ++r < t;) e.push(r);
                    return e
                })
            }
        }, r.pseudos.nth = r.pseudos.eq;
        for (t in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) r.pseudos[t] = ct(t);
        for (t in {
            submit: !0,
            reset: !0
        }) r.pseudos[t] = ht(t);
        return vt.prototype = r.filters = r.pseudos, r.setFilters = new vt, o = st.tokenize = function(e, t) {
            var n, i, s, o, u, a, f, l = N[e + " "];
            if (l) return t ? 0 : l.slice(0);
            u = e, a = [], f = r.preFilter;
            while (u) {
                if (!n || (i = W.exec(u))) i && (u = u.slice(i[0].length) || u), a.push(s = []);
                n = !1;
                if (i = X.exec(u)) n = i.shift(), s.push({
                    value: n,
                    type: i[0].replace(z, " ")
                }), u = u.slice(n.length);
                for (o in r.filter)(i = K[o].exec(u)) && (!f[o] || (i = f[o](i))) && (n = i.shift(), s.push({
                    value: n,
                    type: o,
                    matches: i
                }), u = u.slice(n.length));
                if (!n) break
            }
            return t ? u.length : u ? st.error(e) : N(e, a).slice(0)
        }, u = st.compile = function(e, t) {
            var n, r = [],
                i = [],
                s = C[e + " "];
            if (!s) {
                t || (t = o(e)), n = t.length;
                while (n--) s = St(t[n]), s[w] ? r.push(s) : i.push(s);
                s = C(e, xt(i, r)), s.selector = e
            }
            return s
        }, a = st.select = function(e, t, i, s) {
            var a, f, l, c, h, p = typeof e == "function" && e,
                d = !s && o(e = p.selector || e);
            i = i || [];
            if (d.length === 1) {
                f = d[0] = d[0].slice(0);
                if (f.length > 2 && (l = f[0]).type === "ID" && n.getById && t.nodeType === 9 && v && r.relative[f[1].type]) {
                    t = (r.find.ID(l.matches[0].replace(nt, rt), t) || [])[0];
                    if (!t) return i;
                    p && (t = t.parentNode), e = e.slice(f.shift().value.length)
                }
                a = K.needsContext.test(e) ? 0 : f.length;
                while (a--) {
                    l = f[a];
                    if (r.relative[c = l.type]) break;
                    if (h = r.find[c])
                        if (s = h(l.matches[0].replace(nt, rt), et.test(f[0].type) && dt(t.parentNode) || t)) {
                            f.splice(a, 1), e = s.length && mt(f);
                            if (!e) return P.apply(i, s), i;
                            break
                        }
                }
            }
            return (p || u(e, d))(s, t, !v, i, et.test(e) && dt(t.parentNode) || t), i
        }, n.sortStable = w.split("").sort(k).join("") === w, n.detectDuplicates = !!c, h(), n.sortDetached = at(function(e) {
            return e.compareDocumentPosition(p.createElement("div")) & 1
        }), at(function(e) {
            return e.innerHTML = "<a href='#'></a>", e.firstChild.getAttribute("href") === "#"
        }) || ft("type|href|height|width", function(e, t, n) {
            if (!n) return e.getAttribute(t, t.toLowerCase() === "type" ? 1 : 2)
        }), (!n.attributes || !at(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), e.firstChild.getAttribute("value") === ""
        })) && ft("value", function(e, t, n) {
            if (!n && e.nodeName.toLowerCase() === "input") return e.defaultValue
        }), at(function(e) {
            return e.getAttribute("disabled") == null
        }) || ft(j, function(e, t, n) {
            var r;
            if (!n) return e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), st
    }(window);
    jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains;
    var rneedsContext = jQuery.expr.match.needsContext,
        rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        risSimple = /^.[^:#\[\.,]*$/;
    jQuery.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), t.length === 1 && r.nodeType === 1 ? jQuery.find.matchesSelector(r, e) ? [r] : [] : jQuery.find.matches(e, jQuery.grep(t, function(e) {
            return e.nodeType === 1
        }))
    }, jQuery.fn.extend({
        find: function(e) {
            var t, n = this.length,
                r = [],
                i = this;
            if (typeof e != "string") return this.pushStack(jQuery(e).filter(function() {
                for (t = 0; t < n; t++)
                    if (jQuery.contains(i[t], this)) return !0
            }));
            for (t = 0; t < n; t++) jQuery.find(e, i[t], r);
            return r = this.pushStack(n > 1 ? jQuery.unique(r) : r), r.selector = this.selector ? this.selector + " " + e : e, r
        },
        filter: function(e) {
            return this.pushStack(winnow(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(winnow(this, e || [], !0))
        },
        is: function(e) {
            return !!winnow(this, typeof e == "string" && rneedsContext.test(e) ? jQuery(e) : e || [], !1).length
        }
    });
    var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        init = jQuery.fn.init = function(e, t) {
            var n, r;
            if (!e) return this;
            if (typeof e == "string") {
                e[0] === "<" && e[e.length - 1] === ">" && e.length >= 3 ? n = [null, e, null] : n = rquickExpr.exec(e);
                if (n && (n[1] || !t)) {
                    if (n[1]) {
                        t = t instanceof jQuery ? t[0] : t, jQuery.merge(this, jQuery.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : document, !0));
                        if (rsingleTag.test(n[1]) && jQuery.isPlainObject(t))
                            for (n in t) jQuery.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                        return this
                    }
                    return r = document.getElementById(n[2]), r && r.parentNode && (this.length = 1, this[0] = r), this.context = document, this.selector = e, this
                }
                return !t || t.jquery ? (t || rootjQuery).find(e) : this.constructor(t).find(e)
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : jQuery.isFunction(e) ? typeof rootjQuery.ready != "undefined" ? rootjQuery.ready(e) : e(jQuery) : (e.selector !== undefined && (this.selector = e.selector, this.context = e.context), jQuery.makeArray(e, this))
        };
    init.prototype = jQuery.fn, rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/,
        guaranteedUnique = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    jQuery.extend({
        dir: function(e, t, n) {
            var r = [],
                i = n !== undefined;
            while ((e = e[t]) && e.nodeType !== 9)
                if (e.nodeType === 1) {
                    if (i && jQuery(e).is(n)) break;
                    r.push(e)
                }
            return r
        },
        sibling: function(e, t) {
            var n = [];
            for (; e; e = e.nextSibling) e.nodeType === 1 && e !== t && n.push(e);
            return n
        }
    }), jQuery.fn.extend({
        has: function(e) {
            var t = jQuery(e, this),
                n = t.length;
            return this.filter(function() {
                var e = 0;
                for (; e < n; e++)
                    if (jQuery.contains(this, t[e])) return !0
            })
        },
        closest: function(e, t) {
            var n, r = 0,
                i = this.length,
                s = [],
                o = rneedsContext.test(e) || typeof e != "string" ? jQuery(e, t || this.context) : 0;
            for (; r < i; r++)
                for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (o ? o.index(n) > -1 : n.nodeType === 1 && jQuery.find.matchesSelector(n, e))) {
                        s.push(n);
                        break
                    }
            return this.pushStack(s.length > 1 ? jQuery.unique(s) : s)
        },
        index: function(e) {
            return e ? typeof e == "string" ? indexOf.call(jQuery(e), this[0]) : indexOf.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(e, t))))
        },
        addBack: function(e) {
            return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
        }
    }), jQuery.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && t.nodeType !== 11 ? t : null
        },
        parents: function(e) {
            return jQuery.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return jQuery.dir(e, "parentNode", n)
        },
        next: function(e) {
            return sibling(e, "nextSibling")
        },
        prev: function(e) {
            return sibling(e, "previousSibling")
        },
        nextAll: function(e) {
            return jQuery.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return jQuery.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return jQuery.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return jQuery.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return jQuery.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return jQuery.sibling(e.firstChild)
        },
        contents: function(e) {
            return e.contentDocument || jQuery.merge([], e.childNodes)
        }
    }, function(e, t) {
        jQuery.fn[e] = function(n, r) {
            var i = jQuery.map(this, t, n);
            return e.slice(-5) !== "Until" && (r = n), r && typeof r == "string" && (i = jQuery.filter(r, i)), this.length > 1 && (guaranteedUnique[e] || jQuery.unique(i), rparentsprev.test(e) && i.reverse()), this.pushStack(i)
        }
    });
    var rnotwhite = /\S+/g,
        optionsCache = {};
    jQuery.Callbacks = function(e) {
        e = typeof e == "string" ? optionsCache[e] || createOptions(e) : jQuery.extend({}, e);
        var t, n, r, i, s, o, u = [],
            a = !e.once && [],
            f = function(c) {
                t = e.memory && c, n = !0, o = i || 0, i = 0, s = u.length, r = !0;
                for (; u && o < s; o++)
                    if (u[o].apply(c[0], c[1]) === !1 && e.stopOnFalse) {
                        t = !1;
                        break
                    }
                r = !1, u && (a ? a.length && f(a.shift()) : t ? u = [] : l.disable())
            },
            l = {
                add: function() {
                    if (u) {
                        var n = u.length;
                        (function o(t) {
                            jQuery.each(t, function(t, n) {
                                var r = jQuery.type(n);
                                r === "function" ? (!e.unique || !l.has(n)) && u.push(n) : n && n.length && r !== "string" && o(n)
                            })
                        })(arguments), r ? s = u.length : t && (i = n, f(t))
                    }
                    return this
                },
                remove: function() {
                    return u && jQuery.each(arguments, function(e, t) {
                        var n;
                        while ((n = jQuery.inArray(t, u, n)) > -1) u.splice(n, 1), r && (n <= s && s--, n <= o && o--)
                    }), this
                },
                has: function(e) {
                    return e ? jQuery.inArray(e, u) > -1 : !!u && !!u.length
                },
                empty: function() {
                    return u = [], s = 0, this
                },
                disable: function() {
                    return u = a = t = undefined, this
                },
                disabled: function() {
                    return !u
                },
                lock: function() {
                    return a = undefined, t || l.disable(), this
                },
                locked: function() {
                    return !a
                },
                fireWith: function(e, t) {
                    return u && (!n || a) && (t = t || [], t = [e, t.slice ? t.slice() : t], r ? a.push(t) : f(t)), this
                },
                fire: function() {
                    return l.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!n
                }
            };
        return l
    }, jQuery.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", jQuery.Callbacks("memory")]
                ],
                n = "pending",
                r = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return i.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return jQuery.Deferred(function(n) {
                            jQuery.each(t, function(t, s) {
                                var o = jQuery.isFunction(e[t]) && e[t];
                                i[s[1]](function() {
                                    var e = o && o.apply(this, arguments);
                                    e && jQuery.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s[0] + "With"](this === r ? n.promise() : this, o ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return e != null ? jQuery.extend(e, r) : r
                    }
                },
                i = {};
            return r.pipe = r.then, jQuery.each(t, function(e, s) {
                var o = s[2],
                    u = s[3];
                r[s[1]] = o.add, u && o.add(function() {
                    n = u
                }, t[e ^ 1][2].disable, t[2][2].lock), i[s[0]] = function() {
                    return i[s[0] + "With"](this === i ? r : this, arguments), this
                }, i[s[0] + "With"] = o.fireWith
            }), r.promise(i), e && e.call(i, i), i
        },
        when: function(e) {
            var t = 0,
                n = slice.call(arguments),
                r = n.length,
                i = r !== 1 || e && jQuery.isFunction(e.promise) ? r : 0,
                s = i === 1 ? e : jQuery.Deferred(),
                o = function(e, t, n) {
                    return function(r) {
                        t[e] = this, n[e] = arguments.length > 1 ? slice.call(arguments) : r, n === u ? s.notifyWith(t, n) : --i || s.resolveWith(t, n)
                    }
                },
                u, a, f;
            if (r > 1) {
                u = new Array(r), a = new Array(r), f = new Array(r);
                for (; t < r; t++) n[t] && jQuery.isFunction(n[t].promise) ? n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u)) : --i
            }
            return i || s.resolveWith(f, n), s.promise()
        }
    });
    var readyList;
    jQuery.fn.ready = function(e) {
        return jQuery.ready.promise().done(e), this
    }, jQuery.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? jQuery.readyWait++ : jQuery.ready(!0)
        },
        ready: function(e) {
            if (e === !0 ? --jQuery.readyWait : jQuery.isReady) return;
            jQuery.isReady = !0;
            if (e !== !0 && --jQuery.readyWait > 0) return;
            readyList.resolveWith(document, [jQuery]), jQuery.fn.triggerHandler && (jQuery(document).triggerHandler("ready"), jQuery(document).off("ready"))
        }
    }), jQuery.ready.promise = function(e) {
        return readyList || (readyList = jQuery.Deferred(), document.readyState === "complete" ? setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed, !1), window.addEventListener("load", completed, !1))), readyList.promise(e)
    }, jQuery.ready.promise();
    var access = jQuery.access = function(e, t, n, r, i, s, o) {
        var u = 0,
            a = e.length,
            f = n == null;
        if (jQuery.type(n) === "object") {
            i = !0;
            for (u in n) jQuery.access(e, t, u, n[u], !0, s, o)
        } else if (r !== undefined) {
            i = !0, jQuery.isFunction(r) || (o = !0), f && (o ? (t.call(e, r), t = null) : (f = t, t = function(e, t, n) {
                return f.call(jQuery(e), n)
            }));
            if (t)
                for (; u < a; u++) t(e[u], n, o ? r : r.call(e[u], u, t(e[u], n)))
        }
        return i ? e : f ? t.call(e) : a ? t(e[0], n) : s
    };
    jQuery.acceptData = function(e) {
        return e.nodeType === 1 || e.nodeType === 9 || !+e.nodeType
    }, Data.uid = 1, Data.accepts = jQuery.acceptData, Data.prototype = {
        key: function(e) {
            if (!Data.accepts(e)) return 0;
            var t = {},
                n = e[this.expando];
            if (!n) {
                n = Data.uid++;
                try {
                    t[this.expando] = {
                        value: n
                    }, Object.defineProperties(e, t)
                } catch (r) {
                    t[this.expando] = n, jQuery.extend(e, t)
                }
            }
            return this.cache[n] || (this.cache[n] = {}), n
        },
        set: function(e, t, n) {
            var r, i = this.key(e),
                s = this.cache[i];
            if (typeof t == "string") s[t] = n;
            else if (jQuery.isEmptyObject(s)) jQuery.extend(this.cache[i], t);
            else
                for (r in t) s[r] = t[r];
            return s
        },
        get: function(e, t) {
            var n = this.cache[this.key(e)];
            return t === undefined ? n : n[t]
        },
        access: function(e, t, n) {
            var r;
            return t === undefined || t && typeof t == "string" && n === undefined ? (r = this.get(e, t), r !== undefined ? r : this.get(e, jQuery.camelCase(t))) : (this.set(e, t, n), n !== undefined ? n : t)
        },
        remove: function(e, t) {
            var n, r, i, s = this.key(e),
                o = this.cache[s];
            if (t === undefined) this.cache[s] = {};
            else {
                jQuery.isArray(t) ? r = t.concat(t.map(jQuery.camelCase)) : (i = jQuery.camelCase(t), t in o ? r = [t, i] : (r = i, r = r in o ? [r] : r.match(rnotwhite) || [])), n = r.length;
                while (n--) delete o[r[n]]
            }
        },
        hasData: function(e) {
            return !jQuery.isEmptyObject(this.cache[e[this.expando]] || {})
        },
        discard: function(e) {
            e[this.expando] && delete this.cache[e[this.expando]]
        }
    };
    var data_priv = new Data,
        data_user = new Data,
        rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /([A-Z])/g;
    jQuery.extend({
        hasData: function(e) {
            return data_user.hasData(e) || data_priv.hasData(e)
        },
        data: function(e, t, n) {
            return data_user.access(e, t, n)
        },
        removeData: function(e, t) {
            data_user.remove(e, t)
        },
        _data: function(e, t, n) {
            return data_priv.access(e, t, n)
        },
        _removeData: function(e, t) {
            data_priv.remove(e, t)
        }
    }), jQuery.fn.extend({
        data: function(e, t) {
            var n, r, i, s = this[0],
                o = s && s.attributes;
            if (e === undefined) {
                if (this.length) {
                    i = data_user.get(s);
                    if (s.nodeType === 1 && !data_priv.get(s, "hasDataAttrs")) {
                        n = o.length;
                        while (n--) o[n] && (r = o[n].name, r.indexOf("data-") === 0 && (r = jQuery.camelCase(r.slice(5)), dataAttr(s, r, i[r])));
                        data_priv.set(s, "hasDataAttrs", !0)
                    }
                }
                return i
            }
            return typeof e == "object" ? this.each(function() {
                data_user.set(this, e)
            }) : access(this, function(t) {
                var n, r = jQuery.camelCase(e);
                if (s && t === undefined) {
                    n = data_user.get(s, e);
                    if (n !== undefined) return n;
                    n = data_user.get(s, r);
                    if (n !== undefined) return n;
                    n = dataAttr(s, r, undefined);
                    if (n !== undefined) return n;
                    return
                }
                this.each(function() {
                    var n = data_user.get(this, r);
                    data_user.set(this, r, t), e.indexOf("-") !== -1 && n !== undefined && data_user.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                data_user.remove(this, e)
            })
        }
    }), jQuery.extend({
        queue: function(e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue", r = data_priv.get(e, t), n && (!r || jQuery.isArray(n) ? r = data_priv.access(e, t, jQuery.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = jQuery.queue(e, t),
                r = n.length,
                i = n.shift(),
                s = jQuery._queueHooks(e, t),
                o = function() {
                    jQuery.dequeue(e, t)
                };
            i === "inprogress" && (i = n.shift(), r--), i && (t === "fx" && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return data_priv.get(e, n) || data_priv.access(e, n, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    data_priv.remove(e, [t + "queue", n])
                })
            })
        }
    }), jQuery.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return typeof e != "string" && (t = e, e = "fx", n--), arguments.length < n ? jQuery.queue(this[0], e) : t === undefined ? this : this.each(function() {
                var n = jQuery.queue(this, e, t);
                jQuery._queueHooks(this, e), e === "fx" && n[0] !== "inprogress" && jQuery.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                jQuery.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1,
                i = jQuery.Deferred(),
                s = this,
                o = this.length,
                u = function() {
                    --r || i.resolveWith(s, [s])
                };
            typeof e != "string" && (t = e, e = undefined), e = e || "fx";
            while (o--) n = data_priv.get(s[o], e + "queueHooks"), n && n.empty && (r++, n.empty.add(u));
            return u(), i.promise(t)
        }
    });
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        cssExpand = ["Top", "Right", "Bottom", "Left"],
        isHidden = function(e, t) {
            return e = t || e, jQuery.css(e, "display") === "none" || !jQuery.contains(e.ownerDocument, e)
        },
        rcheckableType = /^(?:checkbox|radio)$/i;
    (function() {
        var e = document.createDocumentFragment(),
            t = e.appendChild(document.createElement("div")),
            n = document.createElement("input");
        n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), support.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
    })();
    var strundefined = typeof undefined;
    support.focusinBubbles = "onfocusin" in window;
    var rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    jQuery.event = {
        global: {},
        add: function(e, t, n, r, i) {
            var s, o, u, a, f, l, c, h, p, d, v, m = data_priv.get(e);
            if (!m) return;
            n.handler && (s = n, n = s.handler, i = s.selector), n.guid || (n.guid = jQuery.guid++), (a = m.events) || (a = m.events = {}), (o = m.handle) || (o = m.handle = function(t) {
                return typeof jQuery !== strundefined && jQuery.event.triggered !== t.type ? jQuery.event.dispatch.apply(e, arguments) : undefined
            }), t = (t || "").match(rnotwhite) || [""], f = t.length;
            while (f--) {
                u = rtypenamespace.exec(t[f]) || [], p = v = u[1], d = (u[2] || "").split(".").sort();
                if (!p) continue;
                c = jQuery.event.special[p] || {}, p = (i ? c.delegateType : c.bindType) || p, c = jQuery.event.special[p] || {}, l = jQuery.extend({
                    type: p,
                    origType: v,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && jQuery.expr.match.needsContext.test(i),
                    namespace: d.join(".")
                }, s), (h = a[p]) || (h = a[p] = [], h.delegateCount = 0, (!c.setup || c.setup.call(e, r, d, o) === !1) && e.addEventListener && e.addEventListener(p, o, !1)), c.add && (c.add.call(e, l), l.handler.guid || (l.handler.guid = n.guid)), i ? h.splice(h.delegateCount++, 0, l) : h.push(l), jQuery.event.global[p] = !0
            }
        },
        remove: function(e, t, n, r, i) {
            var s, o, u, a, f, l, c, h, p, d, v, m = data_priv.hasData(e) && data_priv.get(e);
            if (!m || !(a = m.events)) return;
            t = (t || "").match(rnotwhite) || [""], f = t.length;
            while (f--) {
                u = rtypenamespace.exec(t[f]) || [], p = v = u[1], d = (u[2] || "").split(".").sort();
                if (!p) {
                    for (p in a) jQuery.event.remove(e, p + t[f], n, r, !0);
                    continue
                }
                c = jQuery.event.special[p] || {}, p = (r ? c.delegateType : c.bindType) || p, h = a[p] || [], u = u[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), o = s = h.length;
                while (s--) l = h[s], (i || v === l.origType) && (!n || n.guid === l.guid) && (!u || u.test(l.namespace)) && (!r || r === l.selector || r === "**" && l.selector) && (h.splice(s, 1), l.selector && h.delegateCount--, c.remove && c.remove.call(e, l));
                o && !h.length && ((!c.teardown || c.teardown.call(e, d, m.handle) === !1) && jQuery.removeEvent(e, p, m.handle), delete a[p])
            }
            jQuery.isEmptyObject(a) && (delete m.handle, data_priv.remove(e, "events"))
        },
        trigger: function(e, t, n, r) {
            var i, s, o, u, a, f, l, c = [n || document],
                h = hasOwn.call(e, "type") ? e.type : e,
                p = hasOwn.call(e, "namespace") ? e.namespace.split(".") : [];
            s = o = n = n || document;
            if (n.nodeType === 3 || n.nodeType === 8) return;
            if (rfocusMorph.test(h + jQuery.event.triggered)) return;
            h.indexOf(".") >= 0 && (p = h.split("."), h = p.shift(), p.sort()), a = h.indexOf(":") < 0 && "on" + h, e = e[jQuery.expando] ? e : new jQuery.Event(h, typeof e == "object" && e), e.isTrigger = r ? 2 : 3, e.namespace = p.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = undefined, e.target || (e.target = n), t = t == null ? [e] : jQuery.makeArray(t, [e]), l = jQuery.event.special[h] || {};
            if (!r && l.trigger && l.trigger.apply(n, t) === !1) return;
            if (!r && !l.noBubble && !jQuery.isWindow(n)) {
                u = l.delegateType || h, rfocusMorph.test(u + h) || (s = s.parentNode);
                for (; s; s = s.parentNode) c.push(s), o = s;
                o === (n.ownerDocument || document) && c.push(o.defaultView || o.parentWindow || window)
            }
            i = 0;
            while ((s = c[i++]) && !e.isPropagationStopped()) e.type = i > 1 ? u : l.bindType || h, f = (data_priv.get(s, "events") || {})[e.type] && data_priv.get(s, "handle"), f && f.apply(s, t), f = a && s[a], f && f.apply && jQuery.acceptData(s) && (e.result = f.apply(s, t), e.result === !1 && e.preventDefault());
            return e.type = h, !r && !e.isDefaultPrevented() && (!l._default || l._default.apply(c.pop(), t) === !1) && jQuery.acceptData(n) && a && jQuery.isFunction(n[h]) && !jQuery.isWindow(n) && (o = n[a], o && (n[a] = null), jQuery.event.triggered = h, n[h](), jQuery.event.triggered = undefined, o && (n[a] = o)), e.result
        },
        dispatch: function(e) {
            e = jQuery.event.fix(e);
            var t, n, r, i, s, o = [],
                u = slice.call(arguments),
                a = (data_priv.get(this, "events") || {})[e.type] || [],
                f = jQuery.event.special[e.type] || {};
            u[0] = e, e.delegateTarget = this;
            if (f.preDispatch && f.preDispatch.call(this, e) === !1) return;
            o = jQuery.event.handlers.call(this, e, a), t = 0;
            while ((i = o[t++]) && !e.isPropagationStopped()) {
                e.currentTarget = i.elem, n = 0;
                while ((s = i.handlers[n++]) && !e.isImmediatePropagationStopped())
                    if (!e.namespace_re || e.namespace_re.test(s.namespace)) e.handleObj = s, e.data = s.data, r = ((jQuery.event.special[s.origType] || {}).handle || s.handler).apply(i.elem, u), r !== undefined && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation())
            }
            return f.postDispatch && f.postDispatch.call(this, e), e.result
        },
        handlers: function(e, t) {
            var n, r, i, s, o = [],
                u = t.delegateCount,
                a = e.target;
            if (u && a.nodeType && (!e.button || e.type !== "click"))
                for (; a !== this; a = a.parentNode || this)
                    if (a.disabled !== !0 || e.type !== "click") {
                        r = [];
                        for (n = 0; n < u; n++) s = t[n], i = s.selector + " ", r[i] === undefined && (r[i] = s.needsContext ? jQuery(i, this).index(a) >= 0 : jQuery.find(i, this, null, [a]).length), r[i] && r.push(s);
                        r.length && o.push({
                            elem: a,
                            handlers: r
                        })
                    }
            return u < t.length && o.push({
                elem: this,
                handlers: t.slice(u)
            }), o
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, r, i, s = t.button;
                return e.pageX == null && t.clientX != null && (n = e.target.ownerDocument || document, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), !e.which && s !== undefined && (e.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), e
            }
        },
        fix: function(e) {
            if (e[jQuery.expando]) return e;
            var t, n, r, i = e.type,
                s = e,
                o = this.fixHooks[i];
            o || (this.fixHooks[i] = o = rmouseEvent.test(i) ? this.mouseHooks : rkeyEvent.test(i) ? this.keyHooks : {}), r = o.props ? this.props.concat(o.props) : this.props, e = new jQuery.Event(s), t = r.length;
            while (t--) n = r[t], e[n] = s[n];
            return e.target || (e.target = document), e.target.nodeType === 3 && (e.target = e.target.parentNode), o.filter ? o.filter(e, s) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) return this.focus(), !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === safeActiveElement() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) return this.click(), !1
                },
                _default: function(e) {
                    return jQuery.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    e.result !== undefined && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = jQuery.extend(new jQuery.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? jQuery.event.trigger(i, null, t) : jQuery.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, jQuery.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    }, jQuery.Event = function(e, t) {
        if (!(this instanceof jQuery.Event)) return new jQuery.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === undefined && e.returnValue === !1 ? returnTrue : returnFalse) : this.type = e, t && jQuery.extend(this, t), this.timeStamp = e && e.timeStamp || jQuery.now(), this[jQuery.expando] = !0
    }, jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue, e && e.preventDefault && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue, e && e.stopPropagation && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        jQuery.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                    i = e.relatedTarget,
                    s = e.handleObj;
                if (!i || i !== r && !jQuery.contains(r, i)) e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t;
                return n
            }
        }
    }), support.focusinBubbles || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            jQuery.event.simulate(t, e.target, jQuery.event.fix(e), !0)
        };
        jQuery.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this,
                    i = data_priv.access(r, t);
                i || r.addEventListener(e, n, !0), data_priv.access(r, t, (i || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this,
                    i = data_priv.access(r, t) - 1;
                i ? data_priv.access(r, t, i) : (r.removeEventListener(e, n, !0), data_priv.remove(r, t))
            }
        }
    }), jQuery.fn.extend({
        on: function(e, t, n, r, i) {
            var s, o;
            if (typeof e == "object") {
                typeof t != "string" && (n = n || t, t = undefined);
                for (o in e) this.on(o, t, n, e[o], i);
                return this
            }
            n == null && r == null ? (r = t, n = t = undefined) : r == null && (typeof t == "string" ? (r = n, n = undefined) : (r = n, n = t, t = undefined));
            if (r === !1) r = returnFalse;
            else if (!r) return this;
            return i === 1 && (s = r, r = function(e) {
                return jQuery().off(e), s.apply(this, arguments)
            }, r.guid = s.guid || (s.guid = jQuery.guid++)), this.each(function() {
                jQuery.event.add(this, e, r, n, t)
            })
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, jQuery(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if (typeof e == "object") {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            if (t === !1 || typeof t == "function") n = t, t = undefined;
            return n === !1 && (n = returnFalse), this.each(function() {
                jQuery.event.remove(this, e, n, t)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                jQuery.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n) return jQuery.event.trigger(e, t, n, !0)
        }
    });
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style|link)/i,
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /^$|\/(?:java|ecma)script/i,
        rscriptTypeMasked = /^true\/(.*)/,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        wrapMap = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td, jQuery.extend({
        clone: function(e, t, n) {
            var r, i, s, o, u = e.cloneNode(!0),
                a = jQuery.contains(e.ownerDocument, e);
            if (!support.noCloneChecked && (e.nodeType === 1 || e.nodeType === 11) && !jQuery.isXMLDoc(e)) {
                o = getAll(u), s = getAll(e);
                for (r = 0, i = s.length; r < i; r++) fixInput(s[r], o[r])
            }
            if (t)
                if (n) {
                    s = s || getAll(e), o = o || getAll(u);
                    for (r = 0, i = s.length; r < i; r++) cloneCopyEvent(s[r], o[r])
                } else cloneCopyEvent(e, u);
            return o = getAll(u, "script"), o.length > 0 && setGlobalEval(o, !a && getAll(e, "script")), u
        },
        buildFragment: function(e, t, n, r) {
            var i, s, o, u, a, f, l = t.createDocumentFragment(),
                c = [],
                h = 0,
                p = e.length;
            for (; h < p; h++) {
                i = e[h];
                if (i || i === 0)
                    if (jQuery.type(i) === "object") jQuery.merge(c, i.nodeType ? [i] : i);
                    else if (!rhtml.test(i)) c.push(t.createTextNode(i));
                else {
                    s = s || l.appendChild(t.createElement("div")), o = (rtagName.exec(i) || ["", ""])[1].toLowerCase(), u = wrapMap[o] || wrapMap._default, s.innerHTML = u[1] + i.replace(rxhtmlTag, "<$1></$2>") + u[2], f = u[0];
                    while (f--) s = s.lastChild;
                    jQuery.merge(c, s.childNodes), s = l.firstChild, s.textContent = ""
                }
            }
            l.textContent = "", h = 0;
            while (i = c[h++]) {
                if (r && jQuery.inArray(i, r) !== -1) continue;
                a = jQuery.contains(i.ownerDocument, i), s = getAll(l.appendChild(i), "script"), a && setGlobalEval(s);
                if (n) {
                    f = 0;
                    while (i = s[f++]) rscriptType.test(i.type || "") && n.push(i)
                }
            }
            return l
        },
        cleanData: function(e) {
            var t, n, r, i, s = jQuery.event.special,
                o = 0;
            for (;
                (n = e[o]) !== undefined; o++) {
                if (jQuery.acceptData(n)) {
                    i = n[data_priv.expando];
                    if (i && (t = data_priv.cache[i])) {
                        if (t.events)
                            for (r in t.events) s[r] ? jQuery.event.remove(n, r) : jQuery.removeEvent(n, r, t.handle);
                        data_priv.cache[i] && delete data_priv.cache[i]
                    }
                }
                delete data_user.cache[n[data_user.expando]]
            }
        }
    }), jQuery.fn.extend({
        text: function(e) {
            return access(this, function(e) {
                return e === undefined ? jQuery.text(this) : this.empty().each(function() {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) this.textContent = e
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var t = manipulationTarget(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var t = manipulationTarget(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function(e, t) {
            var n, r = e ? jQuery.filter(e, this) : this,
                i = 0;
            for (;
                (n = r[i]) != null; i++)!t && n.nodeType === 1 && jQuery.cleanData(getAll(n)), n.parentNode && (t && jQuery.contains(n.ownerDocument, n) && setGlobalEval(getAll(n, "script")), n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            var e, t = 0;
            for (;
                (e = this[t]) != null; t++) e.nodeType === 1 && (jQuery.cleanData(getAll(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function() {
                return jQuery.clone(this, e, t)
            })
        },
        html: function(e) {
            return access(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (e === undefined && t.nodeType === 1) return t.innerHTML;
                if (typeof e == "string" && !rnoInnerhtml.test(e) && !wrapMap[(rtagName.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (; n < r; n++) t = this[n] || {}, t.nodeType === 1 && (jQuery.cleanData(getAll(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (i) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = arguments[0];
            return this.domManip(arguments, function(t) {
                e = this.parentNode, jQuery.cleanData(getAll(this)), e && e.replaceChild(t, this)
            }), e && (e.length || e.nodeType) ? this : this.remove()
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, t) {
            e = concat.apply([], e);
            var n, r, i, s, o, u, a = 0,
                f = this.length,
                l = this,
                c = f - 1,
                h = e[0],
                p = jQuery.isFunction(h);
            if (p || f > 1 && typeof h == "string" && !support.checkClone && rchecked.test(h)) return this.each(function(n) {
                var r = l.eq(n);
                p && (e[0] = h.call(this, n, r.html())), r.domManip(e, t)
            });
            if (f) {
                n = jQuery.buildFragment(e, this[0].ownerDocument, !1, this), r = n.firstChild, n.childNodes.length === 1 && (n = r);
                if (r) {
                    i = jQuery.map(getAll(n, "script"), disableScript), s = i.length;
                    for (; a < f; a++) o = n, a !== c && (o = jQuery.clone(o, !0, !0), s && jQuery.merge(i, getAll(o, "script"))), t.call(this[a], o, a);
                    if (s) {
                        u = i[i.length - 1].ownerDocument, jQuery.map(i, restoreScript);
                        for (a = 0; a < s; a++) o = i[a], rscriptType.test(o.type || "") && !data_priv.access(o, "globalEval") && jQuery.contains(u, o) && (o.src ? jQuery._evalUrl && jQuery._evalUrl(o.src) : jQuery.globalEval(o.textContent.replace(rcleanScript, "")))
                    }
                }
            }
            return this
        }
    }), jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        jQuery.fn[e] = function(e) {
            var n, r = [],
                i = jQuery(e),
                s = i.length - 1,
                o = 0;
            for (; o <= s; o++) n = o === s ? this : this.clone(!0), jQuery(i[o])[t](n), push.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var iframe, elemdisplay = {},
        rmargin = /^margin/,
        rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"),
        getStyles = function(e) {
            return e.ownerDocument.defaultView.getComputedStyle(e, null)
        };
    (function() {
        function s() {
            i.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", i.innerHTML = "", n.appendChild(r);
            var s = window.getComputedStyle(i, null);
            e = s.top !== "1%", t = s.width === "4px", n.removeChild(r)
        }
        var e, t, n = document.documentElement,
            r = document.createElement("div"),
            i = document.createElement("div");
        if (!i.style) return;
        i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", support.clearCloneStyle = i.style.backgroundClip === "content-box", r.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", r.appendChild(i), window.getComputedStyle && jQuery.extend(support, {
            pixelPosition: function() {
                return s(), e
            },
            boxSizingReliable: function() {
                return t == null && s(), t
            },
            reliableMarginRight: function() {
                var e, t = i.appendChild(document.createElement("div"));
                return t.style.cssText = i.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", t.style.marginRight = t.style.width = "0", i.style.width = "1px", n.appendChild(r), e = !parseFloat(window.getComputedStyle(t, null).marginRight), n.removeChild(r), e
            }
        })
    })(), jQuery.swap = function(e, t, n, r) {
        var i, s, o = {};
        for (s in t) o[s] = e.style[s], e.style[s] = t[s];
        i = n.apply(e, r || []);
        for (s in t) e.style[s] = o[s];
        return i
    };
    var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
        rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),
        cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        cssNormalTransform = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        cssPrefixes = ["Webkit", "O", "Moz", "ms"];
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = curCSS(e, "opacity");
                        return n === "" ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(e, t, n, r) {
            if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) return;
            var i, s, o, u = jQuery.camelCase(t),
                a = e.style;
            t = jQuery.cssProps[u] || (jQuery.cssProps[u] = vendorPropName(a, u)), o = jQuery.cssHooks[t] || jQuery.cssHooks[u];
            if (n === undefined) return o && "get" in o && (i = o.get(e, !1, r)) !== undefined ? i : a[t];
            s = typeof n, s === "string" && (i = rrelNum.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(jQuery.css(e, t)), s = "number");
            if (n == null || n !== n) return;
            s === "number" && !jQuery.cssNumber[u] && (n += "px"), !support.clearCloneStyle && n === "" && t.indexOf("background") === 0 && (a[t] = "inherit");
            if (!o || !("set" in o) || (n = o.set(e, n, r)) !== undefined) a[t] = n
        },
        css: function(e, t, n, r) {
            var i, s, o, u = jQuery.camelCase(t);
            return t = jQuery.cssProps[u] || (jQuery.cssProps[u] = vendorPropName(e.style, u)), o = jQuery.cssHooks[t] || jQuery.cssHooks[u], o && "get" in o && (i = o.get(e, !0, n)), i === undefined && (i = curCSS(e, t, r)), i === "normal" && t in cssNormalTransform && (i = cssNormalTransform[t]), n === "" || n ? (s = parseFloat(i), n === !0 || jQuery.isNumeric(s) ? s || 0 : i) : i
        }
    }), jQuery.each(["height", "width"], function(e, t) {
        jQuery.cssHooks[t] = {
            get: function(e, n, r) {
                if (n) return rdisplayswap.test(jQuery.css(e, "display")) && e.offsetWidth === 0 ? jQuery.swap(e, cssShow, function() {
                    return getWidthOrHeight(e, t, r)
                }) : getWidthOrHeight(e, t, r)
            },
            set: function(e, n, r) {
                var i = r && getStyles(e);
                return setPositiveNumber(e, n, r ? augmentWidthOrHeight(e, t, r, jQuery.css(e, "boxSizing", !1, i) === "border-box", i) : 0)
            }
        }
    }), jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(e, t) {
        if (t) return jQuery.swap(e, {
            display: "inline-block"
        }, curCSS, [e, "marginRight"])
    }), jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        jQuery.cssHooks[e + t] = {
            expand: function(n) {
                var r = 0,
                    i = {},
                    s = typeof n == "string" ? n.split(" ") : [n];
                for (; r < 4; r++) i[e + cssExpand[r] + t] = s[r] || s[r - 2] || s[0];
                return i
            }
        }, rmargin.test(e) || (jQuery.cssHooks[e + t].set = setPositiveNumber)
    }), jQuery.fn.extend({
        css: function(e, t) {
            return access(this, function(e, t, n) {
                var r, i, s = {},
                    o = 0;
                if (jQuery.isArray(t)) {
                    r = getStyles(e), i = t.length;
                    for (; o < i; o++) s[t[o]] = jQuery.css(e, t[o], !1, r);
                    return s
                }
                return n !== undefined ? jQuery.style(e, t, n) : jQuery.css(e, t)
            }, e, t, arguments.length > 1)
        },
        show: function() {
            return showHide(this, !0)
        },
        hide: function() {
            return showHide(this)
        },
        toggle: function(e) {
            return typeof e == "boolean" ? e ? this.show() : this.hide() : this.each(function() {
                isHidden(this) ? jQuery(this).show() : jQuery(this).hide()
            })
        }
    }), jQuery.Tween = Tween, Tween.prototype = {
        constructor: Tween,
        init: function(e, t, n, r, i, s) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (jQuery.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = Tween.propHooks[this.prop];
            return e && e.get ? e.get(this) : Tween.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = Tween.propHooks[this.prop];
            return this.options.duration ? this.pos = t = jQuery.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Tween.propHooks._default.set(this), this
        }
    }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return e.elem[e.prop] == null || !!e.elem.style && e.elem.style[e.prop] != null ? (t = jQuery.css(e.elem, e.prop, ""), !t || t === "auto" ? 0 : t) : e.elem[e.prop]
            },
            set: function(e) {
                jQuery.fx.step[e.prop] ? jQuery.fx.step[e.prop](e) : e.elem.style && (e.elem.style[jQuery.cssProps[e.prop]] != null || jQuery.cssHooks[e.prop]) ? jQuery.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, jQuery.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
        rrun = /queueHooks$/,
        animationPrefilters = [defaultPrefilter],
        tweeners = {
            "*": [
                function(e, t) {
                    var n = this.createTween(e, t),
                        r = n.cur(),
                        i = rfxnum.exec(t),
                        s = i && i[3] || (jQuery.cssNumber[e] ? "" : "px"),
                        o = (jQuery.cssNumber[e] || s !== "px" && +r) && rfxnum.exec(jQuery.css(n.elem, e)),
                        u = 1,
                        a = 20;
                    if (o && o[3] !== s) {
                        s = s || o[3], i = i || [], o = +r || 1;
                        do u = u || ".5", o /= u, jQuery.style(n.elem, e, o + s); while (u !== (u = n.cur() / r) && u !== 1 && --a)
                    }
                    return i && (o = n.start = +o || +r || 0, n.unit = s, n.end = i[1] ? o + (i[1] + 1) * i[2] : +i[2]), n
                }
            ]
        };
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(e, t) {
            jQuery.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            var n, r = 0,
                i = e.length;
            for (; r < i; r++) n = e[r], tweeners[n] = tweeners[n] || [], tweeners[n].unshift(t)
        },
        prefilter: function(e, t) {
            t ? animationPrefilters.unshift(e) : animationPrefilters.push(e)
        }
    }), jQuery.speed = function(e, t, n) {
        var r = e && typeof e == "object" ? jQuery.extend({}, e) : {
            complete: n || !n && t || jQuery.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !jQuery.isFunction(t) && t
        };
        r.duration = jQuery.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in jQuery.fx.speeds ? jQuery.fx.speeds[r.duration] : jQuery.fx.speeds._default;
        if (r.queue == null || r.queue === !0) r.queue = "fx";
        return r.old = r.complete, r.complete = function() {
            jQuery.isFunction(r.old) && r.old.call(this), r.queue && jQuery.dequeue(this, r.queue)
        }, r
    }, jQuery.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(e, t, n, r) {
            var i = jQuery.isEmptyObject(e),
                s = jQuery.speed(t, n, r),
                o = function() {
                    var t = Animation(this, jQuery.extend({}, e), s);
                    (i || data_priv.get(this, "finish")) && t.stop(!0)
                };
            return o.finish = o, i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
        },
        stop: function(e, t, n) {
            var r = function(e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return typeof e != "string" && (n = t, t = e, e = undefined), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                var t = !0,
                    i = e != null && e + "queueHooks",
                    s = jQuery.timers,
                    o = data_priv.get(this);
                if (i) o[i] && o[i].stop && r(o[i]);
                else
                    for (i in o) o[i] && o[i].stop && rrun.test(i) && r(o[i]);
                for (i = s.length; i--;) s[i].elem === this && (e == null || s[i].queue === e) && (s[i].anim.stop(n), t = !1, s.splice(i, 1));
                (t || !n) && jQuery.dequeue(this, e)
            })
        },
        finish: function(e) {
            return e !== !1 && (e = e || "fx"), this.each(function() {
                var t, n = data_priv.get(this),
                    r = n[e + "queue"],
                    i = n[e + "queueHooks"],
                    s = jQuery.timers,
                    o = r ? r.length : 0;
                n.finish = !0, jQuery.queue(this, e, []), i && i.stop && i.stop.call(this, !0);
                for (t = s.length; t--;) s[t].elem === this && s[t].queue === e && (s[t].anim.stop(!0), s.splice(t, 1));
                for (t = 0; t < o; t++) r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    }), jQuery.each(["toggle", "show", "hide"], function(e, t) {
        var n = jQuery.fn[t];
        jQuery.fn[t] = function(e, r, i) {
            return e == null || typeof e == "boolean" ? n.apply(this, arguments) : this.animate(genFx(t, !0), e, r, i)
        }
    }), jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        jQuery.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), jQuery.timers = [], jQuery.fx.tick = function() {
        var e, t = 0,
            n = jQuery.timers;
        fxNow = jQuery.now();
        for (; t < n.length; t++) e = n[t], !e() && n[t] === e && n.splice(t--, 1);
        n.length || jQuery.fx.stop(), fxNow = undefined
    }, jQuery.fx.timer = function(e) {
        jQuery.timers.push(e), e() ? jQuery.fx.start() : jQuery.timers.pop()
    }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
        timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval))
    }, jQuery.fx.stop = function() {
        clearInterval(timerId), timerId = null
    }, jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, jQuery.fn.delay = function(e, t) {
        return e = jQuery.fx ? jQuery.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
            var r = setTimeout(t, e);
            n.stop = function() {
                clearTimeout(r)
            }
        })
    },
    function() {
        var e = document.createElement("input"),
            t = document.createElement("select"),
            n = t.appendChild(document.createElement("option"));
        e.type = "checkbox", support.checkOn = e.value !== "", support.optSelected = n.selected, t.disabled = !0, support.optDisabled = !n.disabled, e = document.createElement("input"), e.value = "t", e.type = "radio", support.radioValue = e.value === "t"
    }();
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle;
    jQuery.fn.extend({
        attr: function(e, t) {
            return access(this, jQuery.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                jQuery.removeAttr(this, e)
            })
        }
    }), jQuery.extend({
        attr: function(e, t, n) {
            var r, i, s = e.nodeType;
            if (!e || s === 3 || s === 8 || s === 2) return;
            if (typeof e.getAttribute === strundefined) return jQuery.prop(e, t, n);
            if (s !== 1 || !jQuery.isXMLDoc(e)) t = t.toLowerCase(), r = jQuery.attrHooks[t] || (jQuery.expr.match.bool.test(t) ? boolHook : nodeHook);
            if (n === undefined) return r && "get" in r && (i = r.get(e, t)) !== null ? i : (i = jQuery.find.attr(e, t), i == null ? undefined : i);
            if (n !== null) return r && "set" in r && (i = r.set(e, n, t)) !== undefined ? i : (e.setAttribute(t, n + ""), n);
            jQuery.removeAttr(e, t)
        },
        removeAttr: function(e, t) {
            var n, r, i = 0,
                s = t && t.match(rnotwhite);
            if (s && e.nodeType === 1)
                while (n = s[i++]) r = jQuery.propFix[n] || n, jQuery.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!support.radioValue && t === "radio" && jQuery.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        }
    }), boolHook = {
        set: function(e, t, n) {
            return t === !1 ? jQuery.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = attrHandle[t] || jQuery.find.attr;
        attrHandle[t] = function(e, t, r) {
            var i, s;
            return r || (s = attrHandle[t], attrHandle[t] = i, i = n(e, t, r) != null ? t.toLowerCase() : null, attrHandle[t] = s), i
        }
    });
    var rfocusable = /^(?:input|select|textarea|button)$/i;
    jQuery.fn.extend({
        prop: function(e, t) {
            return access(this, jQuery.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[jQuery.propFix[e] || e]
            })
        }
    }), jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, t, n) {
            var r, i, s, o = e.nodeType;
            if (!e || o === 3 || o === 8 || o === 2) return;
            return s = o !== 1 || !jQuery.isXMLDoc(e), s && (t = jQuery.propFix[t] || t, i = jQuery.propHooks[t]), n !== undefined ? i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n : i && "get" in i && (r = i.get(e, t)) !== null ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    return e.hasAttribute("tabindex") || rfocusable.test(e.nodeName) || e.href ? e.tabIndex : -1
                }
            }
        }
    }), support.optSelected || (jQuery.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        }
    }), jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        jQuery.propFix[this.toLowerCase()] = this
    });
    var rclass = /[\t\r\n\f]/g;
    jQuery.fn.extend({
        addClass: function(e) {
            var t, n, r, i, s, o, u = typeof e == "string" && e,
                a = 0,
                f = this.length;
            if (jQuery.isFunction(e)) return this.each(function(t) {
                jQuery(this).addClass(e.call(this, t, this.className))
            });
            if (u) {
                t = (e || "").match(rnotwhite) || [];
                for (; a < f; a++) {
                    n = this[a], r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(rclass, " ") : " ");
                    if (r) {
                        s = 0;
                        while (i = t[s++]) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                        o = jQuery.trim(r), n.className !== o && (n.className = o)
                    }
                }
            }
            return this
        },
        removeClass: function(e) {
            var t, n, r, i, s, o, u = arguments.length === 0 || typeof e == "string" && e,
                a = 0,
                f = this.length;
            if (jQuery.isFunction(e)) return this.each(function(t) {
                jQuery(this).removeClass(e.call(this, t, this.className))
            });
            if (u) {
                t = (e || "").match(rnotwhite) || [];
                for (; a < f; a++) {
                    n = this[a], r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(rclass, " ") : "");
                    if (r) {
                        s = 0;
                        while (i = t[s++])
                            while (r.indexOf(" " + i + " ") >= 0) r = r.replace(" " + i + " ", " ");
                        o = e ? jQuery.trim(r) : "", n.className !== o && (n.className = o)
                    }
                }
            }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return typeof t == "boolean" && n === "string" ? t ? this.addClass(e) : this.removeClass(e) : jQuery.isFunction(e) ? this.each(function(n) {
                jQuery(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function() {
                if (n === "string") {
                    var t, r = 0,
                        i = jQuery(this),
                        s = e.match(rnotwhite) || [];
                    while (t = s[r++]) i.hasClass(t) ? i.removeClass(t) : i.addClass(t)
                } else if (n === strundefined || n === "boolean") this.className && data_priv.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : data_priv.get(this, "__className__") || ""
            })
        },
        hasClass: function(e) {
            var t = " " + e + " ",
                n = 0,
                r = this.length;
            for (; n < r; n++)
                if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(rclass, " ").indexOf(t) >= 0) return !0;
            return !1
        }
    });
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(e) {
            var t, n, r, i = this[0];
            if (!arguments.length) {
                if (i) return t = jQuery.valHooks[i.type] || jQuery.valHooks[i.nodeName.toLowerCase()], t && "get" in t && (n = t.get(i, "value")) !== undefined ? n : (n = i.value, typeof n == "string" ? n.replace(rreturn, "") : n == null ? "" : n);
                return
            }
            return r = jQuery.isFunction(e), this.each(function(n) {
                var i;
                if (this.nodeType !== 1) return;
                r ? i = e.call(this, n, jQuery(this).val()) : i = e, i == null ? i = "" : typeof i == "number" ? i += "" : jQuery.isArray(i) && (i = jQuery.map(i, function(e) {
                    return e == null ? "" : e + ""
                })), t = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!t || !("set" in t) || t.set(this, i, "value") === undefined) this.value = i
            })
        }
    }), jQuery.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = jQuery.find.attr(e, "value");
                    return t != null ? t : jQuery.trim(jQuery.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t, n, r = e.options,
                        i = e.selectedIndex,
                        s = e.type === "select-one" || i < 0,
                        o = s ? null : [],
                        u = s ? i + 1 : r.length,
                        a = i < 0 ? u : s ? i : 0;
                    for (; a < u; a++) {
                        n = r[a];
                        if ((n.selected || a === i) && (support.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !jQuery.nodeName(n.parentNode, "optgroup"))) {
                            t = jQuery(n).val();
                            if (s) return t;
                            o.push(t)
                        }
                    }
                    return o
                },
                set: function(e, t) {
                    var n, r, i = e.options,
                        s = jQuery.makeArray(t),
                        o = i.length;
                    while (o--) {
                        r = i[o];
                        if (r.selected = jQuery.inArray(r.value, s) >= 0) n = !0
                    }
                    return n || (e.selectedIndex = -1), s
                }
            }
        }
    }), jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = {
            set: function(e, t) {
                if (jQuery.isArray(t)) return e.checked = jQuery.inArray(jQuery(e).val(), t) >= 0
            }
        }, support.checkOn || (jQuery.valHooks[this].get = function(e) {
            return e.getAttribute("value") === null ? "on" : e.value
        })
    }), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        jQuery.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), jQuery.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var nonce = jQuery.now(),
        rquery = /\?/;
    jQuery.parseJSON = function(e) {
        return JSON.parse(e + "")
    }, jQuery.parseXML = function(e) {
        var t, n;
        if (!e || typeof e != "string") return null;
        try {
            n = new DOMParser, t = n.parseFromString(e, "text/xml")
        } catch (r) {
            t = undefined
        }
        return (!t || t.getElementsByTagName("parsererror").length) && jQuery.error("Invalid XML: " + e), t
    };
    var ajaxLocParts, ajaxLocation, rhash = /#.*$/,
        rts = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        prefilters = {},
        transports = {},
        allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href
    } catch (e) {
        ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? ajaxExtend(ajaxExtend(e, jQuery.ajaxSettings), t) : ajaxExtend(jQuery.ajaxSettings, e)
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(e, t) {
            function S(e, t, s, u) {
                var f, m, g, b, E, S = t;
                if (y === 2) return;
                y = 2, o && clearTimeout(o), n = undefined, i = u || "", w.readyState = e > 0 ? 4 : 0, f = e >= 200 && e < 300 || e === 304, s && (b = ajaxHandleResponses(l, w, s)), b = ajaxConvert(l, b, w, f);
                if (f) l.ifModified && (E = w.getResponseHeader("Last-Modified"), E && (jQuery.lastModified[r] = E), E = w.getResponseHeader("etag"), E && (jQuery.etag[r] = E)), e === 204 || l.type === "HEAD" ? S = "nocontent" : e === 304 ? S = "notmodified" : (S = b.state, m = b.data, g = b.error, f = !g);
                else {
                    g = S;
                    if (e || !S) S = "error", e < 0 && (e = 0)
                }
                w.status = e, w.statusText = (t || S) + "", f ? p.resolveWith(c, [m, S, w]) : p.rejectWith(c, [w, S, g]), w.statusCode(v), v = undefined, a && h.trigger(f ? "ajaxSuccess" : "ajaxError", [w, l, f ? m : g]), d.fireWith(c, [w, S]), a && (h.trigger("ajaxComplete", [w, l]), --jQuery.active || jQuery.event.trigger("ajaxStop"))
            }
            typeof e == "object" && (t = e, e = undefined), t = t || {};
            var n, r, i, s, o, u, a, f, l = jQuery.ajaxSetup({}, t),
                c = l.context || l,
                h = l.context && (c.nodeType || c.jquery) ? jQuery(c) : jQuery.event,
                p = jQuery.Deferred(),
                d = jQuery.Callbacks("once memory"),
                v = l.statusCode || {},
                m = {},
                g = {},
                y = 0,
                b = "canceled",
                w = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (y === 2) {
                            if (!s) {
                                s = {};
                                while (t = rheaders.exec(i)) s[t[1].toLowerCase()] = t[2]
                            }
                            t = s[e.toLowerCase()]
                        }
                        return t == null ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return y === 2 ? i : null
                    },
                    setRequestHeader: function(e, t) {
                        var n = e.toLowerCase();
                        return y || (e = g[n] = g[n] || e, m[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return y || (l.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (y < 2)
                                for (t in e) v[t] = [v[t], e[t]];
                            else w.always(e[w.status]);
                        return this
                    },
                    abort: function(e) {
                        var t = e || b;
                        return n && n.abort(t), S(0, t), this
                    }
                };
            p.promise(w).complete = d.add, w.success = w.done, w.error = w.fail, l.url = ((e || l.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), l.type = t.method || t.type || l.method || l.type, l.dataTypes = jQuery.trim(l.dataType || "*").toLowerCase().match(rnotwhite) || [""], l.crossDomain == null && (u = rurl.exec(l.url.toLowerCase()), l.crossDomain = !(!u || u[1] === ajaxLocParts[1] && u[2] === ajaxLocParts[2] && (u[3] || (u[1] === "http:" ? "80" : "443")) === (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443")))), l.data && l.processData && typeof l.data != "string" && (l.data = jQuery.param(l.data, l.traditional)), inspectPrefiltersOrTransports(prefilters, l, t, w);
            if (y === 2) return w;
            a = l.global, a && jQuery.active++ === 0 && jQuery.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !rnoContent.test(l.type), r = l.url, l.hasContent || (l.data && (r = l.url += (rquery.test(r) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = rts.test(r) ? r.replace(rts, "$1_=" + nonce++) : r + (rquery.test(r) ? "&" : "?") + "_=" + nonce++)), l.ifModified && (jQuery.lastModified[r] && w.setRequestHeader("If-Modified-Since", jQuery.lastModified[r]), jQuery.etag[r] && w.setRequestHeader("If-None-Match", jQuery.etag[r])), (l.data && l.hasContent && l.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", l.contentType), w.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + (l.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : l.accepts["*"]);
            for (f in l.headers) w.setRequestHeader(f, l.headers[f]);
            if (!l.beforeSend || l.beforeSend.call(c, w, l) !== !1 && y !== 2) {
                b = "abort";
                for (f in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) w[f](l[f]);
                n = inspectPrefiltersOrTransports(transports, l, t, w);
                if (!n) S(-1, "No Transport");
                else {
                    w.readyState = 1, a && h.trigger("ajaxSend", [w, l]), l.async && l.timeout > 0 && (o = setTimeout(function() {
                        w.abort("timeout")
                    }, l.timeout));
                    try {
                        y = 1, n.send(m, S)
                    } catch (E) {
                        if (!(y < 2)) throw E;
                        S(-1, E)
                    }
                }
                return w
            }
            return w.abort()
        },
        getJSON: function(e, t, n) {
            return jQuery.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return jQuery.get(e, undefined, t, "script")
        }
    }), jQuery.each(["get", "post"], function(e, t) {
        jQuery[t] = function(e, n, r, i) {
            return jQuery.isFunction(n) && (i = i || r, r = n, n = undefined), jQuery.ajax({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            })
        }
    }), jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        jQuery.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), jQuery._evalUrl = function(e) {
        return jQuery.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, jQuery.fn.extend({
        wrapAll: function(e) {
            var t;
            return jQuery.isFunction(e) ? this.each(function(t) {
                jQuery(this).wrapAll(e.call(this, t))
            }) : (this[0] && (t = jQuery(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                var e = this;
                while (e.firstElementChild) e = e.firstElementChild;
                return e
            }).append(this)), this)
        },
        wrapInner: function(e) {
            return jQuery.isFunction(e) ? this.each(function(t) {
                jQuery(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = jQuery(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = jQuery.isFunction(e);
            return this.each(function(n) {
                jQuery(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes)
            }).end()
        }
    }), jQuery.expr.filters.hidden = function(e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0
    }, jQuery.expr.filters.visible = function(e) {
        return !jQuery.expr.filters.hidden(e)
    };
    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.param = function(e, t) {
        var n, r = [],
            i = function(e, t) {
                t = jQuery.isFunction(t) ? t() : t == null ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        t === undefined && (t = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional);
        if (jQuery.isArray(e) || e.jquery && !jQuery.isPlainObject(e)) jQuery.each(e, function() {
            i(this.name, this.value)
        });
        else
            for (n in e) buildParams(n, e[n], t, i);
        return r.join("&").replace(r20, "+")
    }, jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = jQuery.prop(this, "elements");
                return e ? jQuery.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(e) && (this.checked || !rcheckableType.test(e))
            }).map(function(e, t) {
                var n = jQuery(this).val();
                return n == null ? null : jQuery.isArray(n) ? jQuery.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(rCRLF, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(rCRLF, "\r\n")
                }
            }).get()
        }
    }), jQuery.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch (e) {}
    };
    var xhrId = 0,
        xhrCallbacks = {},
        xhrSuccessStatus = {
            0: 200,
            1223: 204
        },
        xhrSupported = jQuery.ajaxSettings.xhr();
    window.ActiveXObject && jQuery(window).on("unload", function() {
        for (var e in xhrCallbacks) xhrCallbacks[e]()
    }), support.cors = !!xhrSupported && "withCredentials" in xhrSupported, support.ajax = xhrSupported = !!xhrSupported, jQuery.ajaxTransport(function(e) {
        var t;
        if (support.cors || xhrSupported && !e.crossDomain) return {
            send: function(n, r) {
                var i, s = e.xhr(),
                    o = ++xhrId;
                s.open(e.type, e.url, e.async, e.username, e.password);
                if (e.xhrFields)
                    for (i in e.xhrFields) s[i] = e.xhrFields[i];
                e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), !e.crossDomain && !n["X-Requested-With"] && (n["X-Requested-With"] = "XMLHttpRequest");
                for (i in n) s.setRequestHeader(i, n[i]);
                t = function(e) {
                    return function() {
                        t && (delete xhrCallbacks[o], t = s.onload = s.onerror = null, e === "abort" ? s.abort() : e === "error" ? r(s.status, s.statusText) : r(xhrSuccessStatus[s.status] || s.status, s.statusText, typeof s.responseText == "string" ? {
                            text: s.responseText
                        } : undefined, s.getAllResponseHeaders()))
                    }
                }, s.onload = t(), s.onerror = t("error"), t = xhrCallbacks[o] = t("abort");
                try {
                    s.send(e.hasContent && e.data || null)
                } catch (u) {
                    if (t) throw u
                }
            },
            abort: function() {
                t && t()
            }
        }
    }), jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return jQuery.globalEval(e), e
            }
        }
    }), jQuery.ajaxPrefilter("script", function(e) {
        e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), jQuery.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(r, i) {
                    t = jQuery("<script>").prop({
                        async: !0,
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(), n = null, e && i(e.type === "error" ? 404 : 200, e.type)
                    }), document.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            return this[e] = !0, e
        }
    }), jQuery.ajaxPrefilter("json jsonp", function(e, t, n) {
        var r, i, s, o = e.jsonp !== !1 && (rjsonp.test(e.url) ? "url" : typeof e.data == "string" && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(e.data) && "data");
        if (o || e.dataTypes[0] === "jsonp") return r = e.jsonpCallback = jQuery.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, o ? e[o] = e[o].replace(rjsonp, "$1" + r) : e.jsonp !== !1 && (e.url += (rquery.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function() {
            return s || jQuery.error(r + " was not called"), s[0]
        }, e.dataTypes[0] = "json", i = window[r], window[r] = function() {
            s = arguments
        }, n.always(function() {
            window[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, oldCallbacks.push(r)), s && jQuery.isFunction(i) && i(s[0]), s = i = undefined
        }), "script"
    }), jQuery.parseHTML = function(e, t, n) {
        if (!e || typeof e != "string") return null;
        typeof t == "boolean" && (n = t, t = !1), t = t || document;
        var r = rsingleTag.exec(e),
            i = !n && [];
        return r ? [t.createElement(r[1])] : (r = jQuery.buildFragment([e], t, i), i && i.length && jQuery(i).remove(), jQuery.merge([], r.childNodes))
    };
    var _load = jQuery.fn.load;
    jQuery.fn.load = function(e, t, n) {
        if (typeof e != "string" && _load) return _load.apply(this, arguments);
        var r, i, s, o = this,
            u = e.indexOf(" ");
        return u >= 0 && (r = jQuery.trim(e.slice(u)), e = e.slice(0, u)), jQuery.isFunction(t) ? (n = t, t = undefined) : t && typeof t == "object" && (i = "POST"), o.length > 0 && jQuery.ajax({
            url: e,
            type: i,
            dataType: "html",
            data: t
        }).done(function(e) {
            s = arguments, o.html(r ? jQuery("<div>").append(jQuery.parseHTML(e)).find(r) : e)
        }).complete(n && function(e, t) {
            o.each(n, s || [e.responseText, t, e])
        }), this
    }, jQuery.expr.filters.animated = function(e) {
        return jQuery.grep(jQuery.timers, function(t) {
            return e === t.elem
        }).length
    };
    var docElem = window.document.documentElement;
    jQuery.offset = {
        setOffset: function(e, t, n) {
            var r, i, s, o, u, a, f, l = jQuery.css(e, "position"),
                c = jQuery(e),
                h = {};
            l === "static" && (e.style.position = "relative"), u = c.offset(), s = jQuery.css(e, "top"), a = jQuery.css(e, "left"), f = (l === "absolute" || l === "fixed") && (s + a).indexOf("auto") > -1, f ? (r = c.position(), o = r.top, i = r.left) : (o = parseFloat(s) || 0, i = parseFloat(a) || 0), jQuery.isFunction(t) && (t = t.call(e, n, u)), t.top != null && (h.top = t.top - u.top + o), t.left != null && (h.left = t.left - u.left + i), "using" in t ? t.using.call(e, h) : c.css(h)
        }
    }, jQuery.fn.extend({
        offset: function(e) {
            if (arguments.length) return e === undefined ? this : this.each(function(t) {
                jQuery.offset.setOffset(this, e, t)
            });
            var t, n, r = this[0],
                i = {
                    top: 0,
                    left: 0
                },
                s = r && r.ownerDocument;
            if (!s) return;
            return t = s.documentElement, jQuery.contains(t, r) ? (typeof r.getBoundingClientRect !== strundefined && (i = r.getBoundingClientRect()), n = getWindow(s), {
                top: i.top + n.pageYOffset - t.clientTop,
                left: i.left + n.pageXOffset - t.clientLeft
            }) : i
        },
        position: function() {
            if (!this[0]) return;
            var e, t, n = this[0],
                r = {
                    top: 0,
                    left: 0
                };
            return jQuery.css(n, "position") === "fixed" ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), jQuery.nodeName(e[0], "html") || (r = e.offset()), r.top += jQuery.css(e[0], "borderTopWidth", !0), r.left += jQuery.css(e[0], "borderLeftWidth", !0)), {
                top: t.top - r.top - jQuery.css(n, "marginTop", !0),
                left: t.left - r.left - jQuery.css(n, "marginLeft", !0)
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent || docElem;
                while (e && !jQuery.nodeName(e, "html") && jQuery.css(e, "position") === "static") e = e.offsetParent;
                return e || docElem
            })
        }
    }), jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = "pageYOffset" === t;
        jQuery.fn[e] = function(r) {
            return access(this, function(e, r, i) {
                var s = getWindow(e);
                if (i === undefined) return s ? s[t] : e[r];
                s ? s.scrollTo(n ? window.pageXOffset : i, n ? i : window.pageYOffset) : e[r] = i
            }, e, r, arguments.length, null)
        }
    }), jQuery.each(["top", "left"], function(e, t) {
        jQuery.cssHooks[t] = addGetHookIf(support.pixelPosition, function(e, n) {
            if (n) return n = curCSS(e, t), rnumnonpx.test(n) ? jQuery(e).position()[t] + "px" : n
        })
    }), jQuery.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        jQuery.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            jQuery.fn[r] = function(r, i) {
                var s = arguments.length && (n || typeof r != "boolean"),
                    o = n || (r === !0 || i === !0 ? "margin" : "border");
                return access(this, function(t, n, r) {
                    var i;
                    return jQuery.isWindow(t) ? t.document.documentElement["client" + e] : t.nodeType === 9 ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : r === undefined ? jQuery.css(t, n, o) : jQuery.style(t, n, r, o)
                }, t, s ? r : undefined, s, null)
            }
        })
    }), jQuery.fn.size = function() {
        return this.length
    }, jQuery.fn.andSelf = jQuery.fn.addBack, typeof define == "function" && define.amd && define("jquery", [], function() {
        return jQuery
    });
    var _jQuery = window.jQuery,
        _$ = window.$;
    return jQuery.noConflict = function(e) {
        return window.$ === jQuery && (window.$ = _$), e && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery
    }, typeof noGlobal === strundefined && (window.jQuery = window.$ = jQuery), jQuery
}), define("jquery", function() {}),
function(e, t, n) {
    "use strict";

    function $(n) {
        u = t.documentElement, a = t.body, z(), bt = this, n = n || {}, Ct = n.constants || {};
        if (n.easing)
            for (var r in n.easing) V[r] = n.easing[r];
        qt = n.edgeStrategy || "set", St = {
            beforerender: n.beforerender,
            render: n.render,
            keyframe: n.keyframe
        }, xt = n.forceHeight !== !1, xt && (Nt = n.scale || 1), kt = n.mobileDeceleration || x, Ht = n.smoothScrolling !== !1, Bt = n.smoothScrollingDuration || T, jt = {
            targetTop: bt.getScrollTop()
        }, Rt = (n.mobileCheck || function() {
            return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || e.opera)
        })(), Rt ? (Et = t.getElementById("skrollr-body"), Et && st(), J(), dt(u, [g, w], [y])) : dt(u, [g, b], [y]), bt.refresh(), ot(e, "resize orientationchange", function() {
            var e = u.clientWidth,
                t = u.clientHeight;
            if (t !== _t || e !== Mt) _t = t, Mt = e, Dt = !0
        });
        var i = W();
        return function s() {
            G(), Xt = i(s)
        }(), bt
    }
    var r = {
            get: function() {
                return bt
            },
            init: function(e) {
                return bt || new $(e)
            },
            VERSION: "0.6.26"
        },
        i = Object.prototype.hasOwnProperty,
        s = e.Math,
        o = e.getComputedStyle,
        u, a, f = "touchstart",
        l = "touchmove",
        c = "touchcancel",
        h = "touchend",
        p = "skrollable",
        d = p + "-before",
        v = p + "-between",
        m = p + "-after",
        g = "skrollr",
        y = "no-" + g,
        b = g + "-desktop",
        w = g + "-mobile",
        E = "linear",
        S = 1e3,
        x = .004,
        T = 200,
        N = "start",
        C = "end",
        k = "center",
        L = "bottom",
        A = "___skrollable_id",
        O = /^(?:input|textarea|button|select)$/i,
        M = /^\s+|\s+$/g,
        _ = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,
        D = /\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,
        P = /^(@?[a-z\-]+)\[(\w+)\]$/,
        H = /-([a-z0-9_])/g,
        B = function(e, t) {
            return t.toUpperCase()
        },
        j = /[\-+]?[\d]*\.?[\d]+/g,
        F = /\{\?\}/g,
        I = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,
        q = /[a-z\-]+-gradient/g,
        R = "",
        U = "",
        z = function() {
            var e = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
            if (!o) return;
            var t = o(a, null);
            for (var n in t) {
                R = n.match(e) || +n == n && t[n].match(e);
                if (R) break
            }
            if (!R) {
                R = U = "";
                return
            }
            R = R[0], R.slice(0, 1) === "-" ? (U = R, R = {
                "-webkit-": "webkit",
                "-moz-": "Moz",
                "-ms-": "ms",
                "-o-": "O"
            }[R]) : U = "-" + R.toLowerCase() + "-"
        },
        W = function() {
            var t = e.requestAnimationFrame || e[R.toLowerCase() + "RequestAnimationFrame"],
                n = gt();
            if (Rt || !t) t = function(t) {
                var r = gt() - n,
                    i = s.max(0, 1e3 / 60 - r);
                return e.setTimeout(function() {
                    n = gt(), t()
                }, i)
            };
            return t
        },
        X = function() {
            var t = e.cancelAnimationFrame || e[R.toLowerCase() + "CancelAnimationFrame"];
            if (Rt || !t) t = function(t) {
                return e.clearTimeout(t)
            };
            return t
        },
        V = {
            begin: function() {
                return 0
            },
            end: function() {
                return 1
            },
            linear: function(e) {
                return e
            },
            quadratic: function(e) {
                return e * e
            },
            cubic: function(e) {
                return e * e * e
            },
            swing: function(e) {
                return -s.cos(e * s.PI) / 2 + .5
            },
            sqrt: function(e) {
                return s.sqrt(e)
            },
            outCubic: function(e) {
                return s.pow(e - 1, 3) + 1
            },
            bounce: function(e) {
                var t;
                if (e <= .5083) t = 3;
                else if (e <= .8489) t = 9;
                else if (e <= .96208) t = 27;
                else {
                    if (!(e <= .99981)) return 1;
                    t = 91
                }
                return 1 - s.abs(3 * s.cos(e * t * 1.028) / t)
            }
        };
    $.prototype.refresh = function(e) {
        var r, i, s = !1;
        e === n ? (s = !0, wt = [], It = 0, e = t.getElementsByTagName("*")) : e.length === n && (e = [e]), r = 0, i = e.length;
        for (; r < i; r++) {
            var o = e[r],
                u = o,
                a = [],
                f = Ht,
                l = qt,
                c = !1;
            s && A in o && delete o[A];
            if (!o.attributes) continue;
            var h = 0,
                d = o.attributes.length;
            for (; h < d; h++) {
                var v = o.attributes[h];
                if (v.name === "data-anchor-target") {
                    u = t.querySelector(v.value);
                    if (u === null) throw 'Unable to find anchor target "' + v.value + '"';
                    continue
                }
                if (v.name === "data-smooth-scrolling") {
                    f = v.value !== "off";
                    continue
                }
                if (v.name === "data-edge-strategy") {
                    l = v.value;
                    continue
                }
                if (v.name === "data-emit-events") {
                    c = !0;
                    continue
                }
                var m = v.name.match(_);
                if (m === null) continue;
                var g = {
                    props: v.value,
                    element: o,
                    eventType: v.name.replace(H, B)
                };
                a.push(g);
                var y = m[1];
                y && (g.constant = y.substr(1));
                var b = m[2];
                /p$/.test(b) ? (g.isPercentage = !0, g.offset = (b.slice(0, -1) | 0) / 100) : g.offset = b | 0;
                var w = m[3],
                    E = m[4] || w;
                !w || w === N || w === C ? (g.mode = "absolute", w === C ? g.isEnd = !0 : g.isPercentage || (g.offset = g.offset * Nt)) : (g.mode = "relative", g.anchors = [w, E])
            }
            if (!a.length) continue;
            var S, x, T;
            !s && A in o ? (T = o[A], S = wt[T].styleAttr, x = wt[T].classAttr) : (T = o[A] = It++, S = o.style.cssText, x = pt(o)), wt[T] = {
                element: o,
                styleAttr: S,
                classAttr: x,
                anchorTarget: u,
                keyFrames: a,
                smoothScrolling: f,
                edgeStrategy: l,
                emitEvents: c,
                lastFrameIndex: -1
            }, dt(o, [p], [])
        }
        lt(), r = 0, i = e.length;
        for (; r < i; r++) {
            var k = wt[e[r][A]];
            if (k === n) continue;
            Y(k), et(k)
        }
        return bt
    }, $.prototype.relativeToAbsolute = function(e, t, n) {
        var r = u.clientHeight,
            i = e.getBoundingClientRect(),
            s = i.top,
            o = i.bottom - i.top;
        return t === L ? s -= r : t === k && (s -= r / 2), n === L ? s += o : n === k && (s += o / 2), s += bt.getScrollTop(), s + .5 | 0
    }, $.prototype.animateTo = function(e, t) {
        t = t || {};
        var r = gt(),
            i = bt.getScrollTop();
        return Pt = {
            startTop: i,
            topDiff: e - i,
            targetTop: e,
            duration: t.duration || S,
            startTime: r,
            endTime: r + (t.duration || S),
            easing: V[t.easing || E],
            done: t.done
        }, Pt.topDiff || (Pt.done && Pt.done.call(bt, !1), Pt = n), bt
    }, $.prototype.stopAnimateTo = function() {
        Pt && Pt.done && Pt.done.call(bt, !0), Pt = n
    }, $.prototype.isAnimatingTo = function() {
        return !!Pt
    }, $.prototype.isMobile = function() {
        return Rt
    }, $.prototype.setScrollTop = function(t, n) {
        return Ft = n === !0, Rt ? Ut = s.min(s.max(t, 0), Tt) : e.scrollTo(0, t), bt
    }, $.prototype.getScrollTop = function() {
        return Rt ? Ut : e.pageYOffset || u.scrollTop || a.scrollTop || 0
    }, $.prototype.getMaxScrollTop = function() {
        return Tt
    }, $.prototype.on = function(e, t) {
        return St[e] = t, bt
    }, $.prototype.off = function(e) {
        return delete St[e], bt
    }, $.prototype.destroy = function() {
        var e = X();
        e(Xt), at(), dt(u, [y], [g, b, w]);
        var t = 0,
            i = wt.length;
        for (; t < i; t++) it(wt[t].element);
        u.style.overflow = a.style.overflow = "", u.style.height = a.style.height = "", Et && r.setStyle(Et, "transform", "none"), bt = n, Et = n, St = n, xt = n, Tt = 0, Nt = 1, Ct = n, kt = n, Lt = "down", At = -1, Mt = 0, _t = 0, Dt = !1, Pt = n, Ht = n, Bt = n, jt = n, Ft = n, It = 0, qt = n, Rt = !1, Ut = 0, zt = n
    };
    var J = function() {
            var r, i, o, p, d, v, m, g, y, b, w, E;
            ot(u, [f, l, c, h].join(" "), function(e) {
                var u = e.changedTouches[0];
                p = e.target;
                while (p.nodeType === 3) p = p.parentNode;
                d = u.clientY, v = u.clientX, b = e.timeStamp, O.test(p.tagName) || e.preventDefault();
                switch (e.type) {
                    case f:
                        r && r.blur(), bt.stopAnimateTo(), r = p, i = m = d, o = v, y = b;
                        break;
                    case l:
                        O.test(p.tagName) && t.activeElement !== p && e.preventDefault(), g = d - m, E = b - w, bt.setScrollTop(Ut - g, !0), m = d, w = b;
                        break;
                    default:
                    case c:
                    case h:
                        var a = i - d,
                            S = o - v,
                            x = S * S + a * a;
                        if (x < 49) {
                            if (!O.test(r.tagName)) {
                                r.focus();
                                var T = t.createEvent("MouseEvents");
                                T.initMouseEvent("click", !0, !0, e.view, 1, u.screenX, u.screenY, u.clientX, u.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null), r.dispatchEvent(T)
                            }
                            return
                        }
                        r = n;
                        var N = g / E;
                        N = s.max(s.min(N, 3), -3);
                        var C = s.abs(N / kt),
                            k = N * C + .5 * kt * C * C,
                            L = bt.getScrollTop() - k,
                            A = 0;
                        L > Tt ? (A = (Tt - L) / k, L = Tt) : L < 0 && (A = -L / k, L = 0), C *= 1 - A, bt.animateTo(L + .5 | 0, {
                            easing: "outCubic",
                            duration: C
                        })
                }
            }), e.scrollTo(0, 0), u.style.overflow = a.style.overflow = "hidden"
        },
        K = function() {
            var e = u.clientHeight,
                t = ct(),
                n, r, i, o, a, f, l, c, h, p, d;
            c = 0, h = wt.length;
            for (; c < h; c++) {
                n = wt[c], r = n.element, i = n.anchorTarget, o = n.keyFrames, a = 0, f = o.length;
                for (; a < f; a++) l = o[a], p = l.offset, d = t[l.constant] || 0, l.frame = p, l.isPercentage && (p *= e, l.frame = p), l.mode === "relative" && (it(r), l.frame = bt.relativeToAbsolute(i, l.anchors[0], l.anchors[1]) - p, it(r, !0)), l.frame += d, xt && !l.isEnd && l.frame > Tt && (Tt = l.frame)
            }
            Tt = s.max(Tt, ht()), c = 0, h = wt.length;
            for (; c < h; c++) {
                n = wt[c], o = n.keyFrames, a = 0, f = o.length;
                for (; a < f; a++) l = o[a], d = t[l.constant] || 0, l.isEnd && (l.frame = Tt - l.offset + d);
                n.keyFrames.sort(yt)
            }
        },
        Q = function(e, t) {
            var n = 0,
                s = wt.length;
            for (; n < s; n++) {
                var o = wt[n],
                    u = o.element,
                    a = o.smoothScrolling ? e : t,
                    f = o.keyFrames,
                    l = f.length,
                    c = f[0],
                    h = f[f.length - 1],
                    g = a < c.frame,
                    y = a > h.frame,
                    b = g ? c : h,
                    w = o.emitEvents,
                    E = o.lastFrameIndex,
                    S, x;
                if (g || y) {
                    if (g && o.edge === -1 || y && o.edge === 1) continue;
                    g ? (dt(u, [d], [m, v]), w && E > -1 && (ft(u, c.eventType, Lt), o.lastFrameIndex = -1)) : (dt(u, [m], [d, v]), w && E < l && (ft(u, h.eventType, Lt), o.lastFrameIndex = l)), o.edge = g ? -1 : 1;
                    switch (o.edgeStrategy) {
                        case "reset":
                            it(u);
                            continue;
                        case "ease":
                            a = b.frame;
                            break;
                        default:
                        case "set":
                            var T = b.props;
                            for (S in T) i.call(T, S) && (x = rt(T[S].value), S.indexOf("@") === 0 ? u.setAttribute(S.substr(1), x) : r.setStyle(u, S, x));
                            continue
                    }
                } else o.edge !== 0 && (dt(u, [p, v], [d, m]), o.edge = 0);
                var N = 0;
                for (; N < l - 1; N++)
                    if (a >= f[N].frame && a <= f[N + 1].frame) {
                        var C = f[N],
                            k = f[N + 1];
                        for (S in C.props)
                            if (i.call(C.props, S)) {
                                var L = (a - C.frame) / (k.frame - C.frame);
                                L = C.props[S].easing(L), x = nt(C.props[S].value, k.props[S].value, L), x = rt(x), S.indexOf("@") === 0 ? u.setAttribute(S.substr(1), x) : r.setStyle(u, S, x)
                            }
                        w && E !== N && (Lt === "down" ? ft(u, C.eventType, Lt) : ft(u, k.eventType, Lt), o.lastFrameIndex = N);
                        break
                    }
            }
        },
        G = function() {
            Dt && (Dt = !1, lt());
            var e = bt.getScrollTop(),
                t, i = gt(),
                s;
            if (Pt) i >= Pt.endTime ? (e = Pt.targetTop, t = Pt.done, Pt = n) : (s = Pt.easing((i - Pt.startTime) / Pt.duration), e = Pt.startTop + s * Pt.topDiff | 0), bt.setScrollTop(e, !0);
            else if (!Ft) {
                var o = jt.targetTop - e;
                o && (jt = {
                    startTop: At,
                    topDiff: e - At,
                    targetTop: e,
                    startTime: Ot,
                    endTime: Ot + Bt
                }), i <= jt.endTime && (s = V.sqrt((i - jt.startTime) / Bt), e = jt.startTop + s * jt.topDiff | 0)
            }
            Rt && Et && r.setStyle(Et, "transform", "translate(0, " + -Ut + "px) " + zt);
            if (Ft || At !== e) {
                Lt = e > At ? "down" : e < At ? "up" : Lt, Ft = !1;
                var u = {
                        curTop: e,
                        lastTop: At,
                        maxTop: Tt,
                        direction: Lt
                    },
                    a = St.beforerender && St.beforerender.call(bt, u);
                a !== !1 && (Q(e, bt.getScrollTop()), At = e, St.render && St.render.call(bt, u)), t && t.call(bt, !1)
            }
            Ot = i
        },
        Y = function(e) {
            var t = 0,
                n = e.keyFrames.length;
            for (; t < n; t++) {
                var r = e.keyFrames[t],
                    i, s, o, u = {},
                    a;
                while ((a = D.exec(r.props)) !== null) o = a[1], s = a[2], i = o.match(P), i !== null ? (o = i[1], i = i[2]) : i = E, s = s.indexOf("!") ? Z(s) : [s.slice(1)], u[o] = {
                    value: s,
                    easing: V[i]
                };
                r.props = u
            }
        },
        Z = function(e) {
            var t = [];
            return I.lastIndex = 0, e = e.replace(I, function(e) {
                return e.replace(j, function(e) {
                    return e / 255 * 100 + "%"
                })
            }), U && (q.lastIndex = 0, e = e.replace(q, function(e) {
                return U + e
            })), e = e.replace(j, function(e) {
                return t.push(+e), "{?}"
            }), t.unshift(e), t
        },
        et = function(e) {
            var t = {},
                n, r;
            n = 0, r = e.keyFrames.length;
            for (; n < r; n++) tt(e.keyFrames[n], t);
            t = {}, n = e.keyFrames.length - 1;
            for (; n >= 0; n--) tt(e.keyFrames[n], t)
        },
        tt = function(e, t) {
            var n;
            for (n in t) i.call(e.props, n) || (e.props[n] = t[n]);
            for (n in e.props) t[n] = e.props[n]
        },
        nt = function(e, t, n) {
            var r, i = e.length;
            if (i !== t.length) throw "Can't interpolate between \"" + e[0] + '" and "' + t[0] + '"';
            var s = [e[0]];
            r = 1;
            for (; r < i; r++) s[r] = e[r] + (t[r] - e[r]) * n;
            return s
        },
        rt = function(e) {
            var t = 1;
            return F.lastIndex = 0, e[0].replace(F, function() {
                return e[t++]
            })
        },
        it = function(e, t) {
            e = [].concat(e);
            var n, r, i = 0,
                s = e.length;
            for (; i < s; i++) {
                r = e[i], n = wt[r[A]];
                if (!n) continue;
                t ? (r.style.cssText = n.dirtyStyleAttr, dt(r, n.dirtyClassAttr)) : (n.dirtyStyleAttr = r.style.cssText, n.dirtyClassAttr = pt(r), r.style.cssText = n.styleAttr, dt(r, n.classAttr))
            }
        },
        st = function() {
            zt = "translateZ(0)", r.setStyle(Et, "transform", zt);
            var e = o(Et),
                t = e.getPropertyValue("transform"),
                n = e.getPropertyValue(U + "transform"),
                i = t && t !== "none" || n && n !== "none";
            i || (zt = "")
        };
    r.setStyle = function(e, t, n) {
        var r = e.style;
        t = t.replace(H, B).replace("-", "");
        if (t === "zIndex") isNaN(n) ? r[t] = n : r[t] = "" + (n | 0);
        else if (t === "float") r.styleFloat = r.cssFloat = n;
        else try {
            R && (r[R + t.slice(0, 1).toUpperCase() + t.slice(1)] = n), r[t] = n
        } catch (i) {}
    };
    var ot = r.addEvent = function(t, n, r) {
            var i = function(t) {
                return t = t || e.event, t.target || (t.target = t.srcElement), t.preventDefault || (t.preventDefault = function() {
                    t.returnValue = !1, t.defaultPrevented = !0
                }), r.call(this, t)
            };
            n = n.split(" ");
            var s, o = 0,
                u = n.length;
            for (; o < u; o++) s = n[o], t.addEventListener ? t.addEventListener(s, r, !1) : t.attachEvent("on" + s, i), Wt.push({
                element: t,
                name: s,
                listener: r
            })
        },
        ut = r.removeEvent = function(e, t, n) {
            t = t.split(" ");
            var r = 0,
                i = t.length;
            for (; r < i; r++) e.removeEventListener ? e.removeEventListener(t[r], n, !1) : e.detachEvent("on" + t[r], n)
        },
        at = function() {
            var e, t = 0,
                n = Wt.length;
            for (; t < n; t++) e = Wt[t], ut(e.element, e.name, e.listener);
            Wt = []
        },
        ft = function(e, t, n) {
            St.keyframe && St.keyframe.call(bt, e, t, n)
        },
        lt = function() {
            var e = bt.getScrollTop();
            Tt = 0, xt && !Rt && (a.style.height = ""), K(), xt && !Rt && (a.style.height = Tt + u.clientHeight + "px"), Rt ? bt.setScrollTop(s.min(bt.getScrollTop(), Tt)) : bt.setScrollTop(e, !0), Ft = !0
        },
        ct = function() {
            var e = u.clientHeight,
                t = {},
                n, r;
            for (n in Ct) r = Ct[n], typeof r == "function" ? r = r.call(bt) : /p$/.test(r) && (r = r.slice(0, -1) / 100 * e), t[n] = r;
            return t
        },
        ht = function() {
            var e = Et && Et.offsetHeight || 0,
                t = s.max(e, a.scrollHeight, a.offsetHeight, u.scrollHeight, u.offsetHeight, u.clientHeight);
            return t - u.clientHeight
        },
        pt = function(t) {
            var n = "className";
            return e.SVGElement && t instanceof e.SVGElement && (t = t[n], n = "baseVal"), t[n]
        },
        dt = function(t, r, i) {
            var s = "className";
            e.SVGElement && t instanceof e.SVGElement && (t = t[s], s = "baseVal");
            if (i === n) {
                t[s] = r;
                return
            }
            var o = t[s],
                u = 0,
                a = i.length;
            for (; u < a; u++) o = mt(o).replace(mt(i[u]), " ");
            o = vt(o);
            var f = 0,
                l = r.length;
            for (; f < l; f++) mt(o).indexOf(mt(r[f])) === -1 && (o += " " + r[f]);
            t[s] = vt(o)
        },
        vt = function(e) {
            return e.replace(M, "")
        },
        mt = function(e) {
            return " " + e + " "
        },
        gt = Date.now || function() {
            return +(new Date)
        },
        yt = function(e, t) {
            return e.frame - t.frame
        },
        bt, wt, Et, St, xt, Tt = 0,
        Nt = 1,
        Ct, kt, Lt = "down",
        At = -1,
        Ot = gt(),
        Mt = 0,
        _t = 0,
        Dt = !1,
        Pt, Ht, Bt, jt, Ft, It = 0,
        qt, Rt = !1,
        Ut = 0,
        zt, Wt = [],
        Xt;
    typeof define == "function" && define.amd ? define("skrollr", [], function() {
        return r
    }) : typeof module != "undefined" && module.exports ? module.exports = r : e.skrollr = r
}(window, document),
function(e) {
    "use strict";
    typeof define == "function" && define.amd ? define("slick", ["jquery"], e) : e(jQuery)
}(function(e) {
    "use strict";
    var t = window.Slick || {};
    t = function() {
        function n(n, r) {
            var i = this,
                s, o;
            i.defaults = {
                accessibility: !0,
                arrows: !0,
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(e, t) {
                    return '<button type="button">' + (t + 1) + "</button>"
                },
                dots: !1,
                draggable: !0,
                easing: "linear",
                fade: !1,
                infinite: !0,
                lazyLoad: "ondemand",
                onBeforeChange: null,
                onAfterChange: null,
                onInit: null,
                onReInit: null,
                pauseOnHover: !0,
                responsive: null,
                slide: "div",
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 300,
                swipe: !0,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                vertical: !1
            }, i.initials = {
                animating: !1,
                autoPlayTimer: null,
                currentSlide: 0,
                currentLeft: null,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1
            }, e.extend(i, i.initials), i.activeBreakpoint = null, i.animType = null, i.animProp = null, i.breakpoints = [], i.breakpointSettings = [], i.cssTransitions = !1, i.paused = !1, i.positionProp = null, i.$slider = e(n), i.$slidesCache = null, i.transformType = null, i.transitionType = null, i.windowWidth = 0, i.windowTimer = null, i.options = e.extend({}, i.defaults, r), i.originalSettings = i.options, s = i.options.responsive || null;
            if (s && s.length > -1) {
                for (o in s) s.hasOwnProperty(o) && (i.breakpoints.push(s[o].breakpoint), i.breakpointSettings[s[o].breakpoint] = s[o].settings);
                i.breakpoints.sort(function(e, t) {
                    return t - e
                })
            }
            i.autoPlay = e.proxy(i.autoPlay, i), i.autoPlayClear = e.proxy(i.autoPlayClear, i), i.changeSlide = e.proxy(i.changeSlide, i), i.setPosition = e.proxy(i.setPosition, i), i.swipeHandler = e.proxy(i.swipeHandler, i), i.dragHandler = e.proxy(i.dragHandler, i), i.keyHandler = e.proxy(i.keyHandler, i), i.autoPlayIterator = e.proxy(i.autoPlayIterator, i), i.instanceUid = t++, i.init()
        }
        var t = 0;
        return n
    }(), t.prototype.addSlide = function(t, n, r) {
        var i = this;
        if (typeof n == "boolean") r = n, n = null;
        else if (n < 0 || n >= i.slideCount) return !1;
        i.unload(), typeof n == "number" ? n === 0 && i.$slides.length === 0 ? e(t).appendTo(i.$slideTrack) : r ? e(t).insertBefore(i.$slides.eq(n)) : e(t).insertAfter(i.$slides.eq(n)) : r === !0 ? e(t).prependTo(i.$slideTrack) : e(t).appendTo(i.$slideTrack), i.$slides = i.$slideTrack.children(this.options.slide), i.$slideTrack.children(this.options.slide).remove(), i.$slideTrack.append(i.$slides), i.$slidesCache = i.$slides, i.reinit()
    }, t.prototype.animateSlide = function(t, n) {
        var r = {},
            i = this;
        i.transformsEnabled === !1 ? i.options.vertical === !1 ? i.$slideTrack.animate({
            left: t
        }, i.options.speed, i.options.easing, n) : i.$slideTrack.animate({
            top: t
        }, i.options.speed, i.options.easing, n) : i.cssTransitions === !1 ? e({
            animStart: i.currentLeft
        }).animate({
            animStart: t
        }, {
            duration: i.options.speed,
            easing: i.options.easing,
            step: function(e) {
                i.options.vertical === !1 ? (r[i.animType] = "translate(" + e + "px, 0px)", i.$slideTrack.css(r)) : (r[i.animType] = "translate(0px," + e + "px)", i.$slideTrack.css(r))
            },
            complete: function() {
                n && n.call()
            }
        }) : (i.applyTransition(), i.options.vertical === !1 ? r[i.animType] = "translate3d(" + t + "px, 0px, 0px)" : r[i.animType] = "translate3d(0px," + t + "px, 0px)", i.$slideTrack.css(r), n && setTimeout(function() {
            i.disableTransition(), n.call()
        }, i.options.speed))
    }, t.prototype.applyTransition = function(e) {
        var t = this,
            n = {};
        t.options.fade === !1 ? n[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : n[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, t.options.fade === !1 ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
    }, t.prototype.autoPlay = function() {
        var e = this;
        e.autoPlayTimer && clearInterval(e.autoPlayTimer), e.slideCount > e.options.slidesToShow && e.paused !== !0 && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
    }, t.prototype.autoPlayClear = function() {
        var e = this;
        e.autoPlayTimer && clearInterval(e.autoPlayTimer)
    }, t.prototype.autoPlayIterator = function() {
        var e = this;
        e.options.infinite === !1 ? e.direction === 1 ? (e.currentSlide + 1 === e.slideCount - 1 && (e.direction = 0), e.slideHandler(e.currentSlide + e.options.slidesToScroll)) : (e.currentSlide - 1 === 0 && (e.direction = 1), e.slideHandler(e.currentSlide - e.options.slidesToScroll)) : e.slideHandler(e.currentSlide + e.options.slidesToScroll)
    }, t.prototype.buildArrows = function() {
        var t = this;
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow = e('<button type="button" class="slick-prev">Previous</button>').appendTo(t.$slider), t.$nextArrow = e('<button type="button" class="slick-next">Next</button>').appendTo(t.$slider), t.options.infinite !== !0 && t.$prevArrow.addClass("slick-disabled"))
    }, t.prototype.buildDots = function() {
        var t = this,
            n, r;
        if (t.options.dots === !0 && t.slideCount > t.options.slidesToShow) {
            r = '<ul class="slick-dots">';
            for (n = 0; n <= t.getDotCount(); n += 1) r += "<li>" + t.options.customPaging.call(this, t, n) + "</li>";
            r += "</ul>", t.$dots = e(r).appendTo(t.$slider), t.$dots.find("li").first().addClass("slick-active")
        }
    }, t.prototype.buildOut = function() {
        var t = this;
        t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slidesCache = t.$slides, t.$slider.addClass("slick-slider"), t.$slideTrack = t.slideCount === 0 ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), t.options.centerMode === !0 && (t.options.infinite = !0, t.options.slidesToScroll = 1, t.options.slidesToShow % 2 === 0 && (t.options.slidesToShow = 3)), e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.options.accessibility === !0 && t.$list.prop("tabIndex", 0), t.setSlideClasses(0), t.options.draggable === !0 && t.$list.addClass("draggable")
    }, t.prototype.checkResponsive = function() {
        var t = this,
            n, r;
        if (t.originalSettings.responsive && t.originalSettings.responsive.length > -1 && t.originalSettings.responsive !== null) {
            r = null;
            for (n in t.breakpoints) t.breakpoints.hasOwnProperty(n) && e(window).width() < t.breakpoints[n] && (r = t.breakpoints[n]);
            r !== null ? t.activeBreakpoint !== null ? r !== t.activeBreakpoint && (t.activeBreakpoint = r, t.options = e.extend({}, t.defaults, t.breakpointSettings[r]), t.refresh()) : (t.activeBreakpoint = r, t.options = e.extend({}, t.defaults, t.breakpointSettings[r]), t.refresh()) : t.activeBreakpoint !== null && (t.activeBreakpoint = null, t.options = e.extend({}, t.defaults, t.originalSettings), t.refresh())
        }
    }, t.prototype.changeSlide = function(t) {
        var n = this;
        switch (t.data.message) {
            case "previous":
                n.slideHandler(n.currentSlide - n.options.slidesToScroll);
                break;
            case "next":
                n.slideHandler(n.currentSlide + n.options.slidesToScroll);
                break;
            case "index":
                n.slideHandler(e(t.target).parent().index() * n.options.slidesToScroll);
                break;
            default:
                return !1
        }
    }, t.prototype.destroy = function() {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && (t.$prevArrow.remove(), t.$nextArrow.remove()), t.$slides.unwrap().unwrap(), t.$slides.removeClass("slick-slide slick-active slick-visible").removeAttr("style"), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$list.off(".slick"), e(window).off(".slick-" + t.instanceUid)
    }, t.prototype.disableTransition = function(e) {
        var t = this,
            n = {};
        n[t.transitionType] = "", t.options.fade === !1 ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
    }, t.prototype.fadeSlide = function(e, t) {
        var n = this;
        n.cssTransitions === !1 ? (n.$slides.eq(e).css({
            zIndex: 1e3
        }), n.$slides.eq(e).animate({
            opacity: 1
        }, n.options.speed, n.options.easing, t)) : (n.applyTransition(e), n.$slides.eq(e).css({
            opacity: 1,
            zIndex: 1e3
        }), t && setTimeout(function() {
            n.disableTransition(e), t.call()
        }, n.options.speed))
    }, t.prototype.filterSlides = function(e) {
        var t = this;
        e !== null && (t.unload(), t.$slideTrack.children(this.options.slide).remove(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
    }, t.prototype.getCurrent = function() {
        var e = this;
        return e.currentSlide
    }, t.prototype.getDotCount = function() {
        var e = this,
            t = 0,
            n = 0,
            r = 0,
            i;
        i = e.options.infinite === !0 ? e.slideCount + e.options.slidesToShow - e.options.slidesToScroll : e.slideCount;
        while (t < i) r++, n += e.options.slidesToScroll, t = n + e.options.slidesToShow;
        return r
    }, t.prototype.getLeft = function(e) {
        var t = this,
            n, r, i = 0;
        return t.slideOffset = 0, r = t.$slides.first().outerHeight(), t.options.infinite === !0 ? (t.slideCount > t.options.slidesToShow && (t.slideOffset = t.slideWidth * t.options.slidesToShow * -1, i = r * t.options.slidesToShow * -1), t.slideCount % t.options.slidesToScroll !== 0 && e + t.options.slidesToScroll > t.slideCount && t.slideCount > t.options.slidesToShow && (t.slideOffset = t.slideCount % t.options.slidesToShow * t.slideWidth * -1, i = t.slideCount % t.options.slidesToShow * r * -1)) : t.slideCount % t.options.slidesToShow !== 0 && e + t.options.slidesToScroll > t.slideCount && t.slideCount > t.options.slidesToShow && (t.slideOffset = t.options.slidesToShow * t.slideWidth - t.slideCount % t.options.slidesToShow * t.slideWidth, i = t.slideCount % t.options.slidesToShow * r), t.options.centerMode === !0 && (t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2) - t.slideWidth), t.options.vertical === !1 ? n = e * t.slideWidth * -1 + t.slideOffset : n = e * r * -1 + i, n
    }, t.prototype.init = function() {
        var t = this;
        e(t.$slider).hasClass("slick-initialized") || (e(t.$slider).addClass("slick-initialized"), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.checkResponsive()), t.options.onInit !== null && t.options.onInit.call(this, t)
    }, t.prototype.initArrowEvents = function() {
        var e = this;
        e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.on("click.slick", {
            message: "previous"
        }, e.changeSlide), e.$nextArrow.on("click.slick", {
            message: "next"
        }, e.changeSlide))
    }, t.prototype.initDotEvents = function() {
        var t = this;
        t.options.dots === !0 && t.slideCount > t.options.slidesToShow && e("li", t.$dots).on("click.slick", {
            message: "index"
        }, t.changeSlide)
    }, t.prototype.initializeEvents = function() {
        var t = this;
        t.initArrowEvents(), t.initDotEvents(), t.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, t.swipeHandler), t.options.pauseOnHover === !0 && t.options.autoplay === !0 && (t.$list.on("mouseenter.slick", t.autoPlayClear), t.$list.on("mouseleave.slick", t.autoPlay)), t.options.accessibility === !0 && t.$list.on("keydown.slick", t.keyHandler), e(window).on("orientationchange.slick.slick-" + t.instanceUid, function() {
            t.checkResponsive(), t.setPosition()
        }), e(window).on("resize.slick.slick-" + t.instanceUid, function() {
            e(window).width !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
                t.windowWidth = e(window).width(), t.checkResponsive(), t.setPosition()
            }, 50))
        }), e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition)
    }, t.prototype.initUI = function() {
        var e = this;
        e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), e.options.dots === !0 && e.slideCount > e.options.slidesToShow && e.$dots.show(), e.options.autoplay === !0 && e.autoPlay()
    }, t.prototype.keyHandler = function(e) {
        var t = this;
        e.keyCode === 37 ? t.changeSlide({
            data: {
                message: "previous"
            }
        }) : e.keyCode === 39 && t.changeSlide({
            data: {
                message: "next"
            }
        })
    }, t.prototype.lazyLoad = function() {
        var t = this,
            n, r, i, s;
        t.options.centerMode === !0 ? (i = t.options.slidesToShow + t.currentSlide - 1, s = i + t.options.slidesToShow + 2) : (i = t.options.infinite ? t.options.slidesToShow + t.currentSlide : t.currentSlide, s = i + t.options.slidesToShow), n = t.$slider.find(".slick-slide").slice(i, s), e("img[data-lazy]", n).not("[src]").each(function() {
            e(this).css({
                opacity: 0
            }).attr("src", e(this).attr("data-lazy")).removeClass("slick-loading").load(function() {
                e(this).animate({
                    opacity: 1
                }, 200)
            })
        }), t.currentSlide >= t.slideCount - t.options.slidesToShow ? (r = t.$slider.find(".slick-cloned").slice(0, t.options.slidesToShow), e("img[data-lazy]", r).not("[src]").each(function() {
            e(this).css({
                opacity: 0
            }).attr("src", e(this).attr("data-lazy")).removeClass("slick-loading").load(function() {
                e(this).animate({
                    opacity: 1
                }, 200)
            })
        })) : t.currentSlide === 0 && (r = t.$slider.find(".slick-cloned").slice(t.options.slidesToShow * -1), e("img[data-lazy]", r).not("[src]").each(function() {
            e(this).css({
                opacity: 0
            }).attr("src", e(this).attr("data-lazy")).removeClass("slick-loading").load(function() {
                e(this).animate({
                    opacity: 1
                }, 200)
            })
        }))
    }, t.prototype.loadSlider = function() {
        var e = this;
        e.setPosition(), e.$slideTrack.css({
            opacity: 1
        }), e.$slider.removeClass("slick-loading"), e.initUI(), e.options.lazyLoad === "progressive" && e.progressiveLazyLoad()
    }, t.prototype.postSlide = function(e) {
        var t = this;
        t.options.onAfterChange !== null && t.options.onAfterChange.call(this, t, e), t.animating = !1, t.setPosition(), t.swipeLeft = null, t.options.autoplay === !0 && t.paused === !1 && t.autoPlay()
    }, t.prototype.progressiveLazyLoad = function() {
        var t = this,
            n, r;
        n = e("img[data-lazy]").not("[src]").length, n > 0 && (r = e(e("img[data-lazy]", t.$slider).not("[src]").get(0)), r.attr("src", r.attr("data-lazy")).removeClass("slick-loading").load(function() {
            t.progressiveLazyLoad()
        }))
    }, t.prototype.refresh = function() {
        var t = this;
        t.destroy(), e.extend(t, t.initials), t.init()
    }, t.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && e.currentSlide !== 0 && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.setSlideClasses(0), e.setPosition(), e.options.onReInit !== null && e.options.onReInit.call(this, e)
    }, t.prototype.removeSlide = function(e, t) {
        var n = this;
        typeof e == "boolean" ? (t = e, e = t === !0 ? 0 : n.slideCount - 1) : e = t === !0 ? --e : e;
        if (n.slideCount < 1 || e < 0 || e > n.slideCount - 1) return !1;
        n.unload(), n.$slideTrack.children(this.options.slide).eq(e).remove(), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).remove(), n.$slideTrack.append(n.$slides), n.$slidesCache = n.$slides, n.reinit()
    }, t.prototype.setCSS = function(e) {
        var t = this,
            n = {},
            r, i;
        r = t.positionProp == "left" ? e + "px" : "0px", i = t.positionProp == "top" ? e + "px" : "0px", n[t.positionProp] = e, t.transformsEnabled === !1 ? t.$slideTrack.css(n) : (n = {}, t.cssTransitions === !1 ? (n[t.animType] = "translate(" + r + ", " + i + ")", t.$slideTrack.css(n)) : (n[t.animType] = "translate3d(" + r + ", " + i + ", 0px)", t.$slideTrack.css(n)))
    }, t.prototype.setDimensions = function() {
        var e = this;
        e.options.centerMode === !0 ? e.$slideTrack.children(".slick-slide").width(e.slideWidth) : e.$slideTrack.children(".slick-slide").width(e.slideWidth), e.options.vertical === !1 ? (e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length)), e.options.centerMode === !0 && e.$list.css({
            padding: "0px " + e.options.centerPadding
        })) : (e.$list.height(e.$slides.first().outerHeight() * e.options.slidesToShow), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight() * e.$slideTrack.children(".slick-slide").length)), e.options.centerMode === !0 && e.$list.css({
            padding: e.options.centerPadding + " 0px"
        }))
    }, t.prototype.setFade = function() {
        var t = this,
            n;
        t.$slides.each(function(r, i) {
            n = t.slideWidth * r * -1, e(i).css({
                position: "relative",
                left: n,
                top: 0,
                zIndex: 800,
                opacity: 0
            })
        }), t.$slides.eq(t.currentSlide).css({
            zIndex: 900,
            opacity: 1
        })
    }, t.prototype.setPosition = function() {
        var e = this;
        e.setValues(), e.setDimensions(), e.options.fade === !1 ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade()
    }, t.prototype.setProps = function() {
        var e = this;
        e.positionProp = e.options.vertical === !0 ? "top" : "left", e.positionProp === "top" ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), (document.body.style.WebkitTransition !== undefined || document.body.style.MozTransition !== undefined || document.body.style.msTransition !== undefined) && e.options.useCSS === !0 && (e.cssTransitions = !0), document.body.style.MozTransform !== undefined && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition"), document.body.style.webkitTransform !== undefined && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition"), document.body.style.msTransform !== undefined && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.animType !== null
    }, t.prototype.setValues = function() {
        var e = this;
        e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), e.options.vertical === !1 ? e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow) : e.slideWidth = Math.ceil(e.listWidth)
    }, t.prototype.setSlideClasses = function(e) {
        var t = this,
            n, r, i;
        t.$slider.find(".slick-slide").removeClass("slick-active").removeClass("slick-center"), r = t.$slider.find(".slick-slide"), t.options.centerMode === !0 ? (n = Math.floor(t.options.slidesToShow / 2), e >= n && e <= t.slideCount - 1 - n ? t.$slides.slice(e - n, e + n + 1).addClass("slick-active") : (i = t.options.slidesToShow + e, r.slice(i - n + 1, i + n + 2).addClass("slick-active")), e === 0 ? r.eq(r.length - 1 - t.options.slidesToShow).addClass("slick-center") : e === t.slideCount - 1 && r.eq(t.options.slidesToShow).addClass("slick-center"), t.$slides.eq(e).addClass("slick-center")) : e > 0 && e < t.slideCount - t.options.slidesToShow ? t.$slides.slice(e, e + t.options.slidesToShow).addClass("slick-active") : (i = t.options.infinite === !0 ? t.options.slidesToShow + e : e, r.slice(i, i + t.options.slidesToShow).addClass("slick-active")), t.options.lazyLoad === "ondemand" && t.lazyLoad()
    }, t.prototype.setupInfinite = function() {
        var t = this,
            n, r, i;
        if (t.options.fade === !0 || t.options.vertical === !0) t.options.centerMode = !1;
        if (t.options.infinite === !0 && t.options.fade === !1) {
            r = null;
            if (t.slideCount > t.options.slidesToShow) {
                t.options.centerMode === !0 ? i = t.options.slidesToShow + 1 : i = t.options.slidesToShow;
                for (n = t.slideCount; n > t.slideCount - i; n -= 1) r = n - 1, e(t.$slides[r]).clone().attr("id", "").prependTo(t.$slideTrack).addClass("slick-cloned");
                for (n = 0; n < i; n += 1) r = n, e(t.$slides[r]).clone().attr("id", "").appendTo(t.$slideTrack).addClass("slick-cloned");
                t.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    e(this).attr("id", "")
                })
            }
        }
    }, t.prototype.slideHandler = function(e) {
        var t, n, r, i, s = null,
            o = this;
        if (o.animating === !0) return !1;
        t = e, s = o.getLeft(t), r = o.getLeft(o.currentSlide), i = o.slideCount % o.options.slidesToScroll !== 0 ? o.options.slidesToScroll : 0, o.currentLeft = o.swipeLeft === null ? r : o.swipeLeft;
        if (o.options.infinite === !1 && (e < 0 || e > o.slideCount - o.options.slidesToShow + i)) return o.options.fade === !1 && (t = o.currentSlide, o.animateSlide(r, function() {
            o.postSlide(t)
        })), !1;
        o.options.autoplay === !0 && clearInterval(o.autoPlayTimer), t < 0 ? o.slideCount % o.options.slidesToScroll !== 0 ? n = o.slideCount - o.slideCount % o.options.slidesToScroll : n = o.slideCount - o.options.slidesToScroll : t > o.slideCount - 1 ? n = 0 : n = t, o.animating = !0, o.options.onBeforeChange !== null && e !== o.currentSlide && o.options.onBeforeChange.call(this, o, o.currentSlide, n), o.currentSlide = n, o.setSlideClasses(o.currentSlide), o.updateDots(), o.updateArrows();
        if (o.options.fade === !0) return o.fadeSlide(n, function() {
            o.postSlide(n)
        }), !1;
        o.animateSlide(s, function() {
            o.postSlide(n)
        })
    }, t.prototype.startLoad = function() {
        var e = this;
        e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), e.options.dots === !0 && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
    }, t.prototype.swipeDirection = function() {
        var e, t, n, r, i = this;
        return e = i.touchObject.startX - i.touchObject.curX, t = i.touchObject.startY - i.touchObject.curY, n = Math.atan2(t, e), r = Math.round(n * 180 / Math.PI), r < 0 && (r = 360 - Math.abs(r)), r <= 45 && r >= 0 ? "left" : r <= 360 && r >= 315 ? "left" : r >= 135 && r <= 225 ? "right" : "vertical"
    }, t.prototype.swipeEnd = function(t) {
        var n = this;
        n.$list.removeClass("dragging");
        if (n.touchObject.curX === undefined) return !1;
        if (n.touchObject.swipeLength >= n.touchObject.minSwipe) {
            e(t.target).on("click.slick", function(t) {
                t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault(), e(t.target).off("click.slick")
            });
            switch (n.swipeDirection()) {
                case "left":
                    n.slideHandler(n.currentSlide + n.options.slidesToScroll), n.touchObject = {};
                    break;
                case "right":
                    n.slideHandler(n.currentSlide - n.options.slidesToScroll), n.touchObject = {}
            }
        } else n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide), n.touchObject = {})
    }, t.prototype.swipeHandler = function(e) {
        var t = this;
        if ("ontouchend" in document && t.options.swipe === !1) return !1;
        if (t.options.draggable === !1 && !e.originalEvent.touches) return !0;
        t.touchObject.fingerCount = e.originalEvent && e.originalEvent.touches !== undefined ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold;
        switch (e.data.action) {
            case "start":
                t.swipeStart(e);
                break;
            case "move":
                t.swipeMove(e);
                break;
            case "end":
                t.swipeEnd(e)
        }
    }, t.prototype.swipeMove = function(e) {
        var t = this,
            n, r, i, s;
        s = e.originalEvent !== undefined ? e.originalEvent.touches : null, n = t.getLeft(t.currentSlide);
        if (!t.$list.hasClass("dragging") || s && s.length !== 1) return !1;
        t.touchObject.curX = s !== undefined ? s[0].pageX : e.clientX, t.touchObject.curY = s !== undefined ? s[0].pageY : e.clientY, t.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(t.touchObject.curX - t.touchObject.startX, 2))), r = t.swipeDirection();
        if (r === "vertical") return;
        e.originalEvent !== undefined && t.touchObject.swipeLength > 4 && e.preventDefault(), i = t.touchObject.curX > t.touchObject.startX ? 1 : -1, t.options.vertical === !1 ? t.swipeLeft = n + t.touchObject.swipeLength * i : t.swipeLeft = n + t.touchObject.swipeLength * (t.$list.height() / t.listWidth) * i;
        if (t.options.fade === !0 || t.options.touchMove === !1) return !1;
        if (t.animating === !0) return t.swipeLeft = null, !1;
        t.setCSS(t.swipeLeft)
    }, t.prototype.swipeStart = function(e) {
        var t = this,
            n;
        if (t.touchObject.fingerCount !== 1 || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
        e.originalEvent !== undefined && e.originalEvent.touches !== undefined && (n = e.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = n !== undefined ? n.pageX : e.clientX, t.touchObject.startY = t.touchObject.curY = n !== undefined ? n.pageY : e.clientY, t.$list.addClass("dragging")
    }, t.prototype.unfilterSlides = function() {
        var e = this;
        e.$slidesCache !== null && (e.unload(), e.$slideTrack.children(this.options.slide).remove(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
    }, t.prototype.unload = function() {
        var t = this;
        e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && (t.$prevArrow.remove(), t.$nextArrow.remove()), t.$slides.removeClass("slick-slide slick-active slick-visible").removeAttr("style")
    }, t.prototype.updateArrows = function() {
        var e = this;
        e.options.arrows === !0 && e.options.infinite !== !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.removeClass("slick-disabled"), e.$nextArrow.removeClass("slick-disabled"), e.currentSlide === 0 ? (e.$prevArrow.addClass("slick-disabled"), e.$nextArrow.removeClass("slick-disabled")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && (e.$nextArrow.addClass("slick-disabled"), e.$prevArrow.removeClass("slick-disabled")))
    }, t.prototype.updateDots = function() {
        var e = this;
        e.$dots !== null && (e.$dots.find("li").removeClass("slick-active"), e.$dots.find("li").eq(e.currentSlide / e.options.slidesToScroll).addClass("slick-active"))
    }, e.fn.slick = function(e) {
        var n = this;
        return n.each(function(n, r) {
            r.slick = new t(r, e)
        })
    }, e.fn.slickAdd = function(e, t, n) {
        var r = this;
        return r.each(function(r, i) {
            i.slick.addSlide(e, t, n)
        })
    }, e.fn.slickCurrentSlide = function() {
        var e = this;
        return e.get(0).slick.getCurrent()
    }, e.fn.slickFilter = function(e) {
        var t = this;
        return t.each(function(t, n) {
            n.slick.filterSlides(e)
        })
    }, e.fn.slickGoTo = function(e) {
        var t = this;
        return t.each(function(t, n) {
            n.slick.slideHandler(e)
        })
    }, e.fn.slickNext = function() {
        var e = this;
        return e.each(function(e, t) {
            t.slick.changeSlide({
                data: {
                    message: "next"
                }
            })
        })
    }, e.fn.slickPause = function() {
        var e = this;
        return e.each(function(e, t) {
            t.slick.autoPlayClear(), t.slick.paused = !0
        })
    }, e.fn.slickPlay = function() {
        var e = this;
        return e.each(function(e, t) {
            t.slick.paused = !1, t.slick.autoPlay()
        })
    }, e.fn.slickPrev = function() {
        var e = this;
        return e.each(function(e, t) {
            t.slick.changeSlide({
                data: {
                    message: "previous"
                }
            })
        })
    }, e.fn.slickRemove = function(e, t) {
        var n = this;
        return n.each(function(n, r) {
            r.slick.removeSlide(e, t)
        })
    }, e.fn.slickSetOption = function(e, t, n) {
        var r = this;
        return r.each(function(r, i) {
            i.slick.options[e] = t, n === !0 && (i.slick.unload(), i.slick.reinit())
        })
    }, e.fn.slickUnfilter = function() {
        var e = this;
        return e.each(function(e, t) {
            t.slick.unfilterSlides()
        })
    }, e.fn.unslick = function() {
        var e = this;
        return e.each(function(e, t) {
            t.slick.destroy()
        })
    }
}), window.Modernizr = function(e, t, n) {
    function A(e) {
        f.cssText = e
    }

    function O(e, t) {
        return A(p.join(e + ";") + (t || ""))
    }

    function M(e, t) {
        return typeof e === t
    }

    function _(e, t) {
        return !!~("" + e).indexOf(t)
    }

    function D(e, t) {
        for (var r in e) {
            var i = e[r];
            if (!_(i, "-") && f[i] !== n) return t == "pfx" ? i : !0
        }
        return !1
    }

    function P(e, t, r) {
        for (var i in e) {
            var s = t[e[i]];
            if (s !== n) return r === !1 ? e[i] : M(s, "function") ? s.bind(r || t) : s
        }
        return !1
    }

    function H(e, t, n) {
        var r = e.charAt(0).toUpperCase() + e.slice(1),
            i = (e + " " + v.join(r + " ") + r).split(" ");
        return M(t, "string") || M(t, "undefined") ? D(i, t) : (i = (e + " " + m.join(r + " ") + r).split(" "), P(i, t, n))
    }

    function B() {
        i.input = function(n) {
            for (var r = 0, i = n.length; r < i; r++) w[n[r]] = n[r] in l;
            return w.list && (w.list = !!t.createElement("datalist") && !!e.HTMLDataListElement), w
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), i.inputtypes = function(e) {
            for (var r = 0, i, s, u, a = e.length; r < a; r++) l.setAttribute("type", s = e[r]), i = l.type !== "text", i && (l.value = c, l.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(s) && l.style.WebkitAppearance !== n ? (o.appendChild(l), u = t.defaultView, i = u.getComputedStyle && u.getComputedStyle(l, null).WebkitAppearance !== "textfield" && l.offsetHeight !== 0, o.removeChild(l)) : /^(search|tel)$/.test(s) || (/^(url|email)$/.test(s) ? i = l.checkValidity && l.checkValidity() === !1 : i = l.value != c)), b[e[r]] = !!i;
            return b
        }("search tel url email datetime date month week time datetime-local number range color".split(" "))
    }
    var r = "2.8.2",
        i = {},
        s = !0,
        o = t.documentElement,
        u = "modernizr",
        a = t.createElement(u),
        f = a.style,
        l = t.createElement("input"),
        c = ":)",
        h = {}.toString,
        p = " -webkit- -moz- -o- -ms- ".split(" "),
        d = "Webkit Moz O ms",
        v = d.split(" "),
        m = d.toLowerCase().split(" "),
        g = {
            svg: "http://www.w3.org/2000/svg"
        },
        y = {},
        b = {},
        w = {},
        E = [],
        S = E.slice,
        x, T = function(e, n, r, i) {
            var s, a, f, l, c = t.createElement("div"),
                h = t.body,
                p = h || t.createElement("body");
            if (parseInt(r, 10))
                while (r--) f = t.createElement("div"), f.id = i ? i[r] : u + (r + 1), c.appendChild(f);
            return s = ["&#173;", '<style id="s', u, '">', e, "</style>"].join(""), c.id = u, (h ? c : p).innerHTML += s, p.appendChild(c), h || (p.style.background = "", p.style.overflow = "hidden", l = o.style.overflow, o.style.overflow = "hidden", o.appendChild(p)), a = n(c, e), h ? c.parentNode.removeChild(c) : (p.parentNode.removeChild(p), o.style.overflow = l), !!a
        },
        N = function(t) {
            var n = e.matchMedia || e.msMatchMedia;
            if (n) return n(t) && n(t).matches || !1;
            var r;
            return T("@media " + t + " { #" + u + " { position: absolute; } }", function(t) {
                r = (e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle)["position"] == "absolute"
            }), r
        },
        C = function() {
            function r(r, i) {
                i = i || t.createElement(e[r] || "div"), r = "on" + r;
                var s = r in i;
                return s || (i.setAttribute || (i = t.createElement("div")), i.setAttribute && i.removeAttribute && (i.setAttribute(r, ""), s = M(i[r], "function"), M(i[r], "undefined") || (i[r] = n), i.removeAttribute(r))), i = null, s
            }
            var e = {
                select: "input",
                change: "input",
                submit: "form",
                reset: "form",
                error: "img",
                load: "img",
                abort: "img"
            };
            return r
        }(),
        k = {}.hasOwnProperty,
        L;
    !M(k, "undefined") && !M(k.call, "undefined") ? L = function(e, t) {
        return k.call(e, t)
    } : L = function(e, t) {
        return t in e && M(e.constructor.prototype[t], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function(t) {
        var n = this;
        if (typeof n != "function") throw new TypeError;
        var r = S.call(arguments, 1),
            i = function() {
                if (this instanceof i) {
                    var e = function() {};
                    e.prototype = n.prototype;
                    var s = new e,
                        o = n.apply(s, r.concat(S.call(arguments)));
                    return Object(o) === o ? o : s
                }
                return n.apply(t, r.concat(S.call(arguments)))
            };
        return i
    }), y.flexbox = function() {
        return H("flexWrap")
    }, y.flexboxlegacy = function() {
        return H("boxDirection")
    }, y.canvas = function() {
        var e = t.createElement("canvas");
        return !!e.getContext && !!e.getContext("2d")
    }, y.canvastext = function() {
        return !!i.canvas && !!M(t.createElement("canvas").getContext("2d").fillText, "function")
    }, y.webgl = function() {
        return !!e.WebGLRenderingContext
    }, y.touch = function() {
        var n;
        return "ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch ? n = !0 : T(["@media (", p.join("touch-enabled),("), u, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(e) {
            n = e.offsetTop === 9
        }), n
    }, y.geolocation = function() {
        return "geolocation" in navigator
    }, y.postmessage = function() {
        return !!e.postMessage
    }, y.websqldatabase = function() {
        return !!e.openDatabase
    }, y.indexedDB = function() {
        return !!H("indexedDB", e)
    }, y.hashchange = function() {
        return C("hashchange", e) && (t.documentMode === n || t.documentMode > 7)
    }, y.history = function() {
        return !!e.history && !!history.pushState
    }, y.draganddrop = function() {
        var e = t.createElement("div");
        return "draggable" in e || "ondragstart" in e && "ondrop" in e
    }, y.websockets = function() {
        return "WebSocket" in e || "MozWebSocket" in e
    }, y.rgba = function() {
        return A("background-color:rgba(150,255,150,.5)"), _(f.backgroundColor, "rgba")
    }, y.hsla = function() {
        return A("background-color:hsla(120,40%,100%,.5)"), _(f.backgroundColor, "rgba") || _(f.backgroundColor, "hsla")
    }, y.multiplebgs = function() {
        return A("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(f.background)
    }, y.backgroundsize = function() {
        return H("backgroundSize")
    }, y.borderimage = function() {
        return H("borderImage")
    }, y.borderradius = function() {
        return H("borderRadius")
    }, y.boxshadow = function() {
        return H("boxShadow")
    }, y.textshadow = function() {
        return t.createElement("div").style.textShadow === ""
    }, y.opacity = function() {
        return O("opacity:.55"), /^0.55$/.test(f.opacity)
    }, y.cssanimations = function() {
        return H("animationName")
    }, y.csscolumns = function() {
        return H("columnCount")
    }, y.cssgradients = function() {
        var e = "background-image:",
            t = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
            n = "linear-gradient(left top,#9f9, white);";
        return A((e + "-webkit- ".split(" ").join(t + e) + p.join(n + e)).slice(0, -e.length)), _(f.backgroundImage, "gradient")
    }, y.cssreflections = function() {
        return H("boxReflect")
    }, y.csstransforms = function() {
        return !!H("transform")
    }, y.csstransforms3d = function() {
        var e = !!H("perspective");
        return e && "webkitPerspective" in o.style && T("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(t, n) {
            e = t.offsetLeft === 9 && t.offsetHeight === 3
        }), e
    }, y.csstransitions = function() {
        return H("transition")
    }, y.fontface = function() {
        var e;
        return T('@font-face {font-family:"font";src:url("https://")}', function(n, r) {
            var i = t.getElementById("smodernizr"),
                s = i.sheet || i.styleSheet,
                o = s ? s.cssRules && s.cssRules[0] ? s.cssRules[0].cssText : s.cssText || "" : "";
            e = /src/i.test(o) && o.indexOf(r.split(" ")[0]) === 0
        }), e
    }, y.generatedcontent = function() {
        var e;
        return T(["#", u, "{font:0/0 a}#", u, ':after{content:"', c, '";visibility:hidden;font:3px/1 a}'].join(""), function(t) {
            e = t.offsetHeight >= 3
        }), e
    }, y.video = function() {
        var e = t.createElement("video"),
            n = !1;
        try {
            if (n = !!e.canPlayType) n = new Boolean(n), n.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), n.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), n.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "")
        } catch (r) {}
        return n
    }, y.audio = function() {
        var e = t.createElement("audio"),
            n = !1;
        try {
            if (n = !!e.canPlayType) n = new Boolean(n), n.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), n.mp3 = e.canPlayType("audio/mpeg;").replace(/^no$/, ""), n.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), n.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, "")
        } catch (r) {}
        return n
    }, y.localstorage = function() {
        try {
            return localStorage.setItem(u, u), localStorage.removeItem(u), !0
        } catch (e) {
            return !1
        }
    }, y.sessionstorage = function() {
        try {
            return sessionStorage.setItem(u, u), sessionStorage.removeItem(u), !0
        } catch (e) {
            return !1
        }
    }, y.webworkers = function() {
        return !!e.Worker
    }, y.applicationcache = function() {
        return !!e.applicationCache
    }, y.svg = function() {
        return !!t.createElementNS && !!t.createElementNS(g.svg, "svg").createSVGRect
    }, y.inlinesvg = function() {
        var e = t.createElement("div");
        return e.innerHTML = "<svg/>", (e.firstChild && e.firstChild.namespaceURI) == g.svg
    }, y.smil = function() {
        return !!t.createElementNS && /SVGAnimate/.test(h.call(t.createElementNS(g.svg, "animate")))
    }, y.svgclippaths = function() {
        return !!t.createElementNS && /SVGClipPath/.test(h.call(t.createElementNS(g.svg, "clipPath")))
    };
    for (var j in y) L(y, j) && (x = j.toLowerCase(), i[x] = y[j](), E.push((i[x] ? "" : "no-") + x));
    return i.input || B(), i.addTest = function(e, t) {
            if (typeof e == "object")
                for (var r in e) L(e, r) && i.addTest(r, e[r]);
            else {
                e = e.toLowerCase();
                if (i[e] !== n) return i;
                t = typeof t == "function" ? t() : t, typeof s != "undefined" && s && (o.className += " " + (t ? "" : "no-") + e), i[e] = t
            }
            return i
        }, A(""), a = l = null,
        function(e, t) {
            function c(e, t) {
                var n = e.createElement("p"),
                    r = e.getElementsByTagName("head")[0] || e.documentElement;
                return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild)
            }

            function h() {
                var e = y.elements;
                return typeof e == "string" ? e.split(" ") : e
            }

            function p(e) {
                var t = f[e[u]];
                return t || (t = {}, a++, e[u] = a, f[a] = t), t
            }

            function d(e, n, r) {
                n || (n = t);
                if (l) return n.createElement(e);
                r || (r = p(n));
                var o;
                return r.cache[e] ? o = r.cache[e].cloneNode() : s.test(e) ? o = (r.cache[e] = r.createElem(e)).cloneNode() : o = r.createElem(e), o.canHaveChildren && !i.test(e) && !o.tagUrn ? r.frag.appendChild(o) : o
            }

            function v(e, n) {
                e || (e = t);
                if (l) return e.createDocumentFragment();
                n = n || p(e);
                var r = n.frag.cloneNode(),
                    i = 0,
                    s = h(),
                    o = s.length;
                for (; i < o; i++) r.createElement(s[i]);
                return r
            }

            function m(e, t) {
                t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function(n) {
                    return y.shivMethods ? d(n, e, t) : t.createElem(n)
                }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + h().join().replace(/[\w\-]+/g, function(e) {
                    return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
                }) + ");return n}")(y, t.frag)
            }

            function g(e) {
                e || (e = t);
                var n = p(e);
                return y.shivCSS && !o && !n.hasCSS && (n.hasCSS = !!c(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), l || m(e, n), e
            }
            var n = "3.7.0",
                r = e.html5 || {},
                i = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                s = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                o, u = "_html5shiv",
                a = 0,
                f = {},
                l;
            (function() {
                try {
                    var e = t.createElement("a");
                    e.innerHTML = "<xyz></xyz>", o = "hidden" in e, l = e.childNodes.length == 1 || function() {
                        t.createElement("a");
                        var e = t.createDocumentFragment();
                        return typeof e.cloneNode == "undefined" || typeof e.createDocumentFragment == "undefined" || typeof e.createElement == "undefined"
                    }()
                } catch (n) {
                    o = !0, l = !0
                }
            })();
            var y = {
                elements: r.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                version: n,
                shivCSS: r.shivCSS !== !1,
                supportsUnknownElements: l,
                shivMethods: r.shivMethods !== !1,
                type: "default",
                shivDocument: g,
                createElement: d,
                createDocumentFragment: v
            };
            e.html5 = y, g(t)
        }(this, t), i._version = r, i._prefixes = p, i._domPrefixes = m, i._cssomPrefixes = v, i.mq = N, i.hasEvent = C, i.testProp = function(e) {
            return D([e])
        }, i.testAllProps = H, i.testStyles = T, i.prefixed = function(e, t, n) {
            return t ? H(e, t, n) : H(e, "pfx")
        }, o.className = o.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (s ? " js " + E.join(" ") : ""), i
}(this, this.document), define("modernizr", function() {});
if (typeof jQuery == "undefined") throw new Error("Bootstrap requires jQuery"); + function(e) {
    "use strict";

    function t() {
        var e = document.createElement("bootstrap"),
            t = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var n in t)
            if (e.style[n] !== undefined) return {
                end: t[n]
            }
    }
    e.fn.emulateTransitionEnd = function(t) {
        var n = !1,
            r = this;
        e(this).one(e.support.transition.end, function() {
            n = !0
        });
        var i = function() {
            n || e(r).trigger(e.support.transition.end)
        };
        return setTimeout(i, t), this
    }, e(function() {
        e.support.transition = t()
    })
}(jQuery), + function(e) {
    "use strict";
    var t = '[data-dismiss="alert"]',
        n = function(n) {
            e(n).on("click", t, this.close)
        };
    n.prototype.close = function(t) {
        function s() {
            i.trigger("closed.bs.alert").remove()
        }
        var n = e(this),
            r = n.attr("data-target");
        r || (r = n.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
        var i = e(r);
        t && t.preventDefault(), i.length || (i = n.hasClass("alert") ? n : n.parent()), i.trigger(t = e.Event("close.bs.alert"));
        if (t.isDefaultPrevented()) return;
        i.removeClass("in"), e.support.transition && i.hasClass("fade") ? i.one(e.support.transition.end, s).emulateTransitionEnd(150) : s()
    };
    var r = e.fn.alert;
    e.fn.alert = function(t) {
        return this.each(function() {
            var r = e(this),
                i = r.data("bs.alert");
            i || r.data("bs.alert", i = new n(this)), typeof t == "string" && i[t].call(r)
        })
    }, e.fn.alert.Constructor = n, e.fn.alert.noConflict = function() {
        return e.fn.alert = r, this
    }, e(document).on("click.bs.alert.data-api", t, n.prototype.close)
}(jQuery), + function(e) {
    "use strict";
    var t = function(n, r) {
        this.$element = e(n), this.options = e.extend({}, t.DEFAULTS, r)
    };
    t.DEFAULTS = {
        loadingText: "loading..."
    }, t.prototype.setState = function(e) {
        var t = "disabled",
            n = this.$element,
            r = n.is("input") ? "val" : "html",
            i = n.data();
        e += "Text", i.resetText || n.data("resetText", n[r]()), n[r](i[e] || this.options[e]), setTimeout(function() {
            e == "loadingText" ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t)
        }, 0)
    }, t.prototype.toggle = function() {
        var e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var t = this.$element.find("input").prop("checked", !this.$element.hasClass("active")).trigger("change");
            t.prop("type") === "radio" && e.find(".active").removeClass("active")
        }
        this.$element.toggleClass("active")
    };
    var n = e.fn.button;
    e.fn.button = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("bs.button"),
                s = typeof n == "object" && n;
            i || r.data("bs.button", i = new t(this, s)), n == "toggle" ? i.toggle() : n && i.setState(n)
        })
    }, e.fn.button.Constructor = t, e.fn.button.noConflict = function() {
        return e.fn.button = n, this
    }, e(document).on("click.bs.button.data-api", "[data-toggle^=button]", function(t) {
        var n = e(t.target);
        n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle"), t.preventDefault()
    })
}(jQuery), + function(e) {
    "use strict";
    var t = function(t, n) {
        this.$element = e(t), this.$indicators = this.$element.find(".carousel-indicators"), this.options = n, this.paused = this.sliding = this.interval = this.$active = this.$items = null, this.options.pause == "hover" && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this))
    };
    t.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    }, t.prototype.cycle = function(t) {
        return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this
    }, t.prototype.getActiveIndex = function() {
        return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
    }, t.prototype.to = function(t) {
        var n = this,
            r = this.getActiveIndex();
        if (t > this.$items.length - 1 || t < 0) return;
        return this.sliding ? this.$element.one("slid", function() {
            n.to(t)
        }) : r == t ? this.pause().cycle() : this.slide(t > r ? "next" : "prev", e(this.$items[t]))
    }, t.prototype.pause = function(t) {
        return t || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition.end && (this.$element.trigger(e.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, t.prototype.next = function() {
        if (this.sliding) return;
        return this.slide("next")
    }, t.prototype.prev = function() {
        if (this.sliding) return;
        return this.slide("prev")
    }, t.prototype.slide = function(t, n) {
        var r = this.$element.find(".item.active"),
            i = n || r[t](),
            s = this.interval,
            o = t == "next" ? "left" : "right",
            u = t == "next" ? "first" : "last",
            a = this;
        if (!i.length) {
            if (!this.options.wrap) return;
            i = this.$element.find(".item")[u]()
        }
        this.sliding = !0, s && this.pause();
        var f = e.Event("slide.bs.carousel", {
            relatedTarget: i[0],
            direction: o
        });
        if (i.hasClass("active")) return;
        this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function() {
            var t = e(a.$indicators.children()[a.getActiveIndex()]);
            t && t.addClass("active")
        }));
        if (e.support.transition && this.$element.hasClass("slide")) {
            this.$element.trigger(f);
            if (f.isDefaultPrevented()) return;
            i.addClass(t), i[0].offsetWidth, r.addClass(o), i.addClass(o), r.one(e.support.transition.end, function() {
                i.removeClass([t, o].join(" ")).addClass("active"), r.removeClass(["active", o].join(" ")), a.sliding = !1, setTimeout(function() {
                    a.$element.trigger("slid")
                }, 0)
            }).emulateTransitionEnd(600)
        } else {
            this.$element.trigger(f);
            if (f.isDefaultPrevented()) return;
            r.removeClass("active"), i.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
        }
        return s && this.cycle(), this
    };
    var n = e.fn.carousel;
    e.fn.carousel = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("bs.carousel"),
                s = e.extend({}, t.DEFAULTS, r.data(), typeof n == "object" && n),
                o = typeof n == "string" ? n : s.slide;
            i || r.data("bs.carousel", i = new t(this, s)), typeof n == "number" ? i.to(n) : o ? i[o]() : s.interval && i.pause().cycle()
        })
    }, e.fn.carousel.Constructor = t, e.fn.carousel.noConflict = function() {
        return e.fn.carousel = n, this
    }, e(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(t) {
        var n = e(this),
            r, i = e(n.attr("data-target") || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, "")),
            s = e.extend({}, i.data(), n.data()),
            o = n.attr("data-slide-to");
        o && (s.interval = !1), i.carousel(s), (o = n.attr("data-slide-to")) && i.data("bs.carousel").to(o), t.preventDefault()
    }), e(window).on("load", function() {
        e('[data-ride="carousel"]').each(function() {
            var t = e(this);
            t.carousel(t.data())
        })
    })
}(jQuery), + function(e) {
    "use strict";
    var t = function(n, r) {
        this.$element = e(n), this.options = e.extend({}, t.DEFAULTS, r), this.transitioning = null, this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle()
    };
    t.DEFAULTS = {
        toggle: !0
    }, t.prototype.dimension = function() {
        var e = this.$element.hasClass("width");
        return e ? "width" : "height"
    }, t.prototype.show = function() {
        if (this.transitioning || this.$element.hasClass("in")) return;
        var t = e.Event("show.bs.collapse");
        this.$element.trigger(t);
        if (t.isDefaultPrevented()) return;
        var n = this.$parent && this.$parent.find("> .panel > .in");
        if (n && n.length) {
            var r = n.data("bs.collapse");
            if (r && r.transitioning) return;
            n.collapse("hide"), r || n.data("bs.collapse", null)
        }
        var i = this.dimension();
        this.$element.removeClass("collapse").addClass("collapsing")[i](0), this.transitioning = 1;
        var s = function() {
            this.$element.removeClass("collapsing").addClass("in")[i]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
        };
        if (!e.support.transition) return s.call(this);
        var o = e.camelCase(["scroll", i].join("-"));
        this.$element.one(e.support.transition.end, e.proxy(s, this)).emulateTransitionEnd(350)[i](this.$element[0][o])
    }, t.prototype.hide = function() {
        if (this.transitioning || !this.$element.hasClass("in")) return;
        var t = e.Event("hide.bs.collapse");
        this.$element.trigger(t);
        if (t.isDefaultPrevented()) return;
        var n = this.dimension();
        this.$element[n](this.$element[n]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
        var r = function() {
            this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
        };
        if (!e.support.transition) return r.call(this);
        this.$element[n](0).one(e.support.transition.end, e.proxy(r, this)).emulateTransitionEnd(350)
    }, t.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var n = e.fn.collapse;
    e.fn.collapse = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("bs.collapse"),
                s = e.extend({}, t.DEFAULTS, r.data(), typeof n == "object" && n);
            i || r.data("bs.collapse", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.collapse.Constructor = t, e.fn.collapse.noConflict = function() {
        return e.fn.collapse = n, this
    }, e(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(t) {
        var n = e(this),
            r, i = n.attr("data-target") || t.preventDefault() || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, ""),
            s = e(i),
            o = s.data("bs.collapse"),
            u = o ? "toggle" : n.data(),
            a = n.attr("data-parent"),
            f = a && e(a);
        if (!o || !o.transitioning) f && f.find('[data-toggle=collapse][data-parent="' + a + '"]').not(n).addClass("collapsed"), n[s.hasClass("in") ? "addClass" : "removeClass"]("collapsed");
        s.collapse(u)
    })
}(jQuery), + function(e) {
    "use strict";

    function i() {
        e(t).remove(), e(n).each(function(t) {
            var n = s(e(this));
            if (!n.hasClass("open")) return;
            n.trigger(t = e.Event("hide.bs.dropdown"));
            if (t.isDefaultPrevented()) return;
            n.removeClass("open").trigger("hidden.bs.dropdown")
        })
    }

    function s(t) {
        var n = t.attr("data-target");
        n || (n = t.attr("href"), n = n && /#/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
        var r = n && e(n);
        return r && r.length ? r : t.parent()
    }
    var t = ".dropdown-backdrop",
        n = "[data-toggle=dropdown]",
        r = function(t) {
            var n = e(t).on("click.bs.dropdown", this.toggle)
        };
    r.prototype.toggle = function(t) {
        var n = e(this);
        if (n.is(".disabled, :disabled")) return;
        var r = s(n),
            o = r.hasClass("open");
        i();
        if (!o) {
            "ontouchstart" in document.documentElement && !r.closest(".navbar-nav").length && e('<div class="dropdown-backdrop"/>').insertAfter(e(this)).on("click", i), r.trigger(t = e.Event("show.bs.dropdown"));
            if (t.isDefaultPrevented()) return;
            r.toggleClass("open").trigger("shown.bs.dropdown"), n.focus()
        }
        return !1
    }, r.prototype.keydown = function(t) {
        if (!/(38|40|27)/.test(t.keyCode)) return;
        var r = e(this);
        t.preventDefault(), t.stopPropagation();
        if (r.is(".disabled, :disabled")) return;
        var i = s(r),
            o = i.hasClass("open");
        if (!o || o && t.keyCode == 27) return t.which == 27 && i.find(n).focus(), r.click();
        var u = e("[role=menu] li:not(.divider):visible a", i);
        if (!u.length) return;
        var a = u.index(u.filter(":focus"));
        t.keyCode == 38 && a > 0 && a--, t.keyCode == 40 && a < u.length - 1 && a++, ~a || (a = 0), u.eq(a).focus()
    };
    var o = e.fn.dropdown;
    e.fn.dropdown = function(t) {
        return this.each(function() {
            var n = e(this),
                i = n.data("dropdown");
            i || n.data("dropdown", i = new r(this)), typeof t == "string" && i[t].call(n)
        })
    }, e.fn.dropdown.Constructor = r, e.fn.dropdown.noConflict = function() {
        return e.fn.dropdown = o, this
    }, e(document).on("click.bs.dropdown.data-api", i).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
        e.stopPropagation()
    }).on("click.bs.dropdown.data-api", n, r.prototype.toggle).on("keydown.bs.dropdown.data-api", n + ", [role=menu]", r.prototype.keydown)
}(jQuery), + function(e) {
    "use strict";
    var t = function(t, n) {
        this.options = n, this.$element = e(t), this.$backdrop = this.isShown = null, this.options.remote && this.$element.load(this.options.remote)
    };
    t.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, t.prototype.toggle = function(e) {
        return this[this.isShown ? "hide" : "show"](e)
    }, t.prototype.show = function(t) {
        var n = this,
            r = e.Event("show.bs.modal", {
                relatedTarget: t
            });
        this.$element.trigger(r);
        if (this.isShown || r.isDefaultPrevented()) return;
        this.isShown = !0, this.escape(), this.$element.on("click.dismiss.modal", '[data-dismiss="modal"]', e.proxy(this.hide, this)), this.backdrop(function() {
            var r = e.support.transition && n.$element.hasClass("fade");
            n.$element.parent().length || n.$element.appendTo(document.body), n.$element.show(), r && n.$element[0].offsetWidth, n.$element.addClass("in").attr("aria-hidden", !1), n.enforceFocus();
            var i = e.Event("shown.bs.modal", {
                relatedTarget: t
            });
            r ? n.$element.find(".modal-dialog").one(e.support.transition.end, function() {
                n.$element.focus().trigger(i)
            }).emulateTransitionEnd(300) : n.$element.focus().trigger(i)
        })
    }, t.prototype.hide = function(t) {
        t && t.preventDefault(), t = e.Event("hide.bs.modal"), this.$element.trigger(t);
        if (!this.isShown || t.isDefaultPrevented()) return;
        this.isShown = !1, this.escape(), e(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.modal"), e.support.transition && this.$element.hasClass("fade") ? this.$element.one(e.support.transition.end, e.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal()
    }, t.prototype.enforceFocus = function() {
        e(document).off("focusin.bs.modal").on("focusin.bs.modal", e.proxy(function(e) {
            this.$element[0] !== e.target && !this.$element.has(e.target).length && this.$element.focus()
        }, this))
    }, t.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", e.proxy(function(e) {
            e.which == 27 && this.hide()
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }, t.prototype.hideModal = function() {
        var e = this;
        this.$element.hide(), this.backdrop(function() {
            e.removeBackdrop(), e.$element.trigger("hidden.bs.modal")
        })
    }, t.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, t.prototype.backdrop = function(t) {
        var n = this,
            r = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var i = e.support.transition && r;
            this.$backdrop = e('<div class="modal-backdrop ' + r + '" />').appendTo(document.body), this.$element.on("click.dismiss.modal", e.proxy(function(e) {
                if (e.target !== e.currentTarget) return;
                this.options.backdrop == "static" ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this)
            }, this)), i && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in");
            if (!t) return;
            i ? this.$backdrop.one(e.support.transition.end, t).emulateTransitionEnd(150) : t()
        } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, t).emulateTransitionEnd(150) : t()) : t && t()
    };
    var n = e.fn.modal;
    e.fn.modal = function(n, r) {
        return this.each(function() {
            var i = e(this),
                s = i.data("bs.modal"),
                o = e.extend({}, t.DEFAULTS, i.data(), typeof n == "object" && n);
            s || i.data("bs.modal", s = new t(this, o)), typeof n == "string" ? s[n](r) : o.show && s.show(r)
        })
    }, e.fn.modal.Constructor = t, e.fn.modal.noConflict = function() {
        return e.fn.modal = n, this
    }, e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(t) {
        var n = e(this),
            r = n.attr("href"),
            i = e(n.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")),
            s = i.data("modal") ? "toggle" : e.extend({
                remote: !/#/.test(r) && r
            }, i.data(), n.data());
        t.preventDefault(), i.modal(s, this).one("hide", function() {
            n.is(":visible") && n.focus()
        })
    }), e(document).on("show.bs.modal", ".modal", function() {
        e(document.body).addClass("modal-open")
    }).on("hidden.bs.modal", ".modal", function() {
        e(document.body).removeClass("modal-open")
    })
}(jQuery), + function(e) {
    "use strict";
    var t = function(e, t) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", e, t)
    };
    t.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, t.prototype.init = function(t, n, r) {
        this.enabled = !0, this.type = t, this.$element = e(n), this.options = this.getOptions(r);
        var i = this.options.trigger.split(" ");
        for (var s = i.length; s--;) {
            var o = i[s];
            if (o == "click") this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this));
            else if (o != "manual") {
                var u = o == "hover" ? "mouseenter" : "focus",
                    a = o == "hover" ? "mouseleave" : "blur";
                this.$element.on(u + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(a + "." + this.type, this.options.selector, e.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = e.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, t.prototype.getDefaults = function() {
        return t.DEFAULTS
    }, t.prototype.getOptions = function(t) {
        return t = e.extend({}, this.getDefaults(), this.$element.data(), t), t.delay && typeof t.delay == "number" && (t.delay = {
            show: t.delay,
            hide: t.delay
        }), t
    }, t.prototype.getDelegateOptions = function() {
        var t = {},
            n = this.getDefaults();
        return this._options && e.each(this._options, function(e, r) {
            n[e] != r && (t[e] = r)
        }), t
    }, t.prototype.enter = function(t) {
        var n = t instanceof this.constructor ? t : e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        clearTimeout(n.timeout), n.hoverState = "in";
        if (!n.options.delay || !n.options.delay.show) return n.show();
        n.timeout = setTimeout(function() {
            n.hoverState == "in" && n.show()
        }, n.options.delay.show)
    }, t.prototype.leave = function(t) {
        var n = t instanceof this.constructor ? t : e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        clearTimeout(n.timeout), n.hoverState = "out";
        if (!n.options.delay || !n.options.delay.hide) return n.hide();
        n.timeout = setTimeout(function() {
            n.hoverState == "out" && n.hide()
        }, n.options.delay.hide)
    }, t.prototype.show = function() {
        var t = e.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(t);
            if (t.isDefaultPrevented()) return;
            var n = this.tip();
            this.setContent(), this.options.animation && n.addClass("fade");
            var r = typeof this.options.placement == "function" ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement,
                i = /\s?auto?\s?/i,
                s = i.test(r);
            s && (r = r.replace(i, "") || "top"), n.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(r), this.options.container ? n.appendTo(this.options.container) : n.insertAfter(this.$element);
            var o = this.getPosition(),
                u = n[0].offsetWidth,
                a = n[0].offsetHeight;
            if (s) {
                var f = this.$element.parent(),
                    l = r,
                    c = document.documentElement.scrollTop || document.body.scrollTop,
                    h = this.options.container == "body" ? window.innerWidth : f.outerWidth(),
                    p = this.options.container == "body" ? window.innerHeight : f.outerHeight(),
                    d = this.options.container == "body" ? 0 : f.offset().left;
                r = r == "bottom" && o.top + o.height + a - c > p ? "top" : r == "top" && o.top - c - a < 0 ? "bottom" : r == "right" && o.right + u > h ? "left" : r == "left" && o.left - u < d ? "right" : r, n.removeClass(l).addClass(r)
            }
            var v = this.getCalculatedOffset(r, o, u, a);
            this.applyPlacement(v, r), this.$element.trigger("shown.bs." + this.type)
        }
    }, t.prototype.applyPlacement = function(e, t) {
        var n, r = this.tip(),
            i = r[0].offsetWidth,
            s = r[0].offsetHeight,
            o = parseInt(r.css("margin-top"), 10),
            u = parseInt(r.css("margin-left"), 10);
        isNaN(o) && (o = 0), isNaN(u) && (u = 0), e.top = e.top + o, e.left = e.left + u, r.offset(e).addClass("in");
        var a = r[0].offsetWidth,
            f = r[0].offsetHeight;
        t == "top" && f != s && (n = !0, e.top = e.top + s - f);
        if (/bottom|top/.test(t)) {
            var l = 0;
            e.left < 0 && (l = e.left * -2, e.left = 0, r.offset(e), a = r[0].offsetWidth, f = r[0].offsetHeight), this.replaceArrow(l - i + a, a, "left")
        } else this.replaceArrow(f - s, f, "top");
        n && r.offset(e)
    }, t.prototype.replaceArrow = function(e, t, n) {
        this.arrow().css(n, e ? 50 * (1 - e / t) + "%" : "")
    }, t.prototype.setContent = function() {
        var e = this.tip(),
            t = this.getTitle();
        e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right")
    }, t.prototype.hide = function() {
        function i() {
            t.hoverState != "in" && n.detach()
        }
        var t = this,
            n = this.tip(),
            r = e.Event("hide.bs." + this.type);
        this.$element.trigger(r);
        if (r.isDefaultPrevented()) return;
        return n.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? n.one(e.support.transition.end, i).emulateTransitionEnd(150) : i(), this.$element.trigger("hidden.bs." + this.type), this
    }, t.prototype.fixTitle = function() {
        var e = this.$element;
        (e.attr("title") || typeof e.attr("data-original-title") != "string") && e.attr("data-original-title", e.attr("title") || "").attr("title", "")
    }, t.prototype.hasContent = function() {
        return this.getTitle()
    }, t.prototype.getPosition = function() {
        var t = this.$element[0];
        return e.extend({}, typeof t.getBoundingClientRect == "function" ? t.getBoundingClientRect() : {
            width: t.offsetWidth,
            height: t.offsetHeight
        }, this.$element.offset())
    }, t.prototype.getCalculatedOffset = function(e, t, n, r) {
        return e == "bottom" ? {
            top: t.top + t.height,
            left: t.left + t.width / 2 - n / 2
        } : e == "top" ? {
            top: t.top - r,
            left: t.left + t.width / 2 - n / 2
        } : e == "left" ? {
            top: t.top + t.height / 2 - r / 2,
            left: t.left - n
        } : {
            top: t.top + t.height / 2 - r / 2,
            left: t.left + t.width
        }
    }, t.prototype.getTitle = function() {
        var e, t = this.$element,
            n = this.options;
        return e = t.attr("data-original-title") || (typeof n.title == "function" ? n.title.call(t[0]) : n.title), e
    }, t.prototype.tip = function() {
        return this.$tip = this.$tip || e(this.options.template)
    }, t.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, t.prototype.validate = function() {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, t.prototype.enable = function() {
        this.enabled = !0
    }, t.prototype.disable = function() {
        this.enabled = !1
    }, t.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, t.prototype.toggle = function(t) {
        var n = t ? e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
        n.tip().hasClass("in") ? n.leave(n) : n.enter(n)
    }, t.prototype.destroy = function() {
        this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var n = e.fn.tooltip;
    e.fn.tooltip = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("bs.tooltip"),
                s = typeof n == "object" && n;
            i || r.data("bs.tooltip", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.tooltip.Constructor = t, e.fn.tooltip.noConflict = function() {
        return e.fn.tooltip = n, this
    }
}(jQuery), + function(e) {
    "use strict";
    var t = function(e, t) {
        this.init("popover", e, t)
    };
    if (!e.fn.tooltip) throw new Error("Popover requires tooltip.js");
    t.DEFAULTS = e.extend({}, e.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype), t.prototype.constructor = t, t.prototype.getDefaults = function() {
        return t.DEFAULTS
    }, t.prototype.setContent = function() {
        var e = this.tip(),
            t = this.getTitle(),
            n = this.getContent();
        e.find(".popover-title")[this.options.html ? "html" : "text"](t), e.find(".popover-content")[this.options.html ? "html" : "text"](n), e.removeClass("fade top bottom left right in"), e.find(".popover-title").html() || e.find(".popover-title").hide()
    }, t.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, t.prototype.getContent = function() {
        var e = this.$element,
            t = this.options;
        return e.attr("data-content") || (typeof t.content == "function" ? t.content.call(e[0]) : t.content)
    }, t.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, t.prototype.tip = function() {
        return this.$tip || (this.$tip = e(this.options.template)), this.$tip
    };
    var n = e.fn.popover;
    e.fn.popover = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("bs.popover"),
                s = typeof n == "object" && n;
            i || r.data("bs.popover", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.popover.Constructor = t, e.fn.popover.noConflict = function() {
        return e.fn.popover = n, this
    }
}(jQuery), + function(e) {
    "use strict";

    function t(n, r) {
        var i, s = e.proxy(this.process, this);
        this.$element = e(n).is("body") ? e(window) : e(n), this.$body = e("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", s), this.options = e.extend({}, t.DEFAULTS, r), this.selector = (this.options.target || (i = e(n).attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.offsets = e([]), this.targets = e([]), this.activeTarget = null, this.refresh(), this.process()
    }
    t.DEFAULTS = {
        offset: 10
    }, t.prototype.refresh = function() {
        var t = this.$element[0] == window ? "offset" : "position";
        this.offsets = e([]), this.targets = e([]);
        var n = this,
            r = this.$body.find(this.selector).map(function() {
                var r = e(this),
                    i = r.data("target") || r.attr("href"),
                    s = /^#\w/.test(i) && e(i);
                return s && s.length && [
                    [s[t]().top + (!e.isWindow(n.$scrollElement.get(0)) && n.$scrollElement.scrollTop()), i]
                ] || null
            }).sort(function(e, t) {
                return e[0] - t[0]
            }).each(function() {
                n.offsets.push(this[0]), n.targets.push(this[1])
            })
    }, t.prototype.process = function() {
        var e = this.$scrollElement.scrollTop() + this.options.offset,
            t = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
            n = t - this.$scrollElement.height(),
            r = this.offsets,
            i = this.targets,
            s = this.activeTarget,
            o;
        if (e >= n) return s != (o = i.last()[0]) && this.activate(o);
        for (o = r.length; o--;) s != i[o] && e >= r[o] && (!r[o + 1] || e <= r[o + 1]) && this.activate(i[o])
    }, t.prototype.activate = function(t) {
        this.activeTarget = t, e(this.selector).parents(".active").removeClass("active");
        var n = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
            r = e(n).parents("li").addClass("active");
        r.parent(".dropdown-menu").length && (r = r.closest("li.dropdown").addClass("active")), r.trigger("activate")
    };
    var n = e.fn.scrollspy;
    e.fn.scrollspy = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("bs.scrollspy"),
                s = typeof n == "object" && n;
            i || r.data("bs.scrollspy", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.noConflict = function() {
        return e.fn.scrollspy = n, this
    }, e(window).on("load", function() {
        e('[data-spy="scroll"]').each(function() {
            var t = e(this);
            t.scrollspy(t.data())
        })
    })
}(jQuery), + function(e) {
    "use strict";
    var t = function(t) {
        this.element = e(t)
    };
    t.prototype.show = function() {
        var t = this.element,
            n = t.closest("ul:not(.dropdown-menu)"),
            r = t.data("target");
        r || (r = t.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
        if (t.parent("li").hasClass("active")) return;
        var i = n.find(".active:last a")[0],
            s = e.Event("show.bs.tab", {
                relatedTarget: i
            });
        t.trigger(s);
        if (s.isDefaultPrevented()) return;
        var o = e(r);
        this.activate(t.parent("li"), n), this.activate(o, o.parent(), function() {
            t.trigger({
                type: "shown.bs.tab",
                relatedTarget: i
            })
        })
    }, t.prototype.activate = function(t, n, r) {
        function o() {
            i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), t.addClass("active"), s ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), r && r()
        }
        var i = n.find("> .active"),
            s = r && e.support.transition && i.hasClass("fade");
        s ? i.one(e.support.transition.end, o).emulateTransitionEnd(150) : o(), i.removeClass("in")
    };
    var n = e.fn.tab;
    e.fn.tab = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("bs.tab");
            i || r.data("bs.tab", i = new t(this)), typeof n == "string" && i[n]()
        })
    }, e.fn.tab.Constructor = t, e.fn.tab.noConflict = function() {
        return e.fn.tab = n, this
    }, e(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(t) {
        t.preventDefault(), e(this).tab("show")
    })
}(jQuery), + function(e) {
    "use strict";
    var t = function(n, r) {
        this.options = e.extend({}, t.DEFAULTS, r), this.$window = e(window).on("scroll.bs.affix.data-api", e.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", e.proxy(this.checkPositionWithEventLoop, this)), this.$element = e(n), this.affixed = this.unpin = null, this.checkPosition()
    };
    t.RESET = "affix affix-top affix-bottom", t.DEFAULTS = {
        offset: 0
    }, t.prototype.checkPositionWithEventLoop = function() {
        setTimeout(e.proxy(this.checkPosition, this), 1)
    }, t.prototype.checkPosition = function() {
        if (!this.$element.is(":visible")) return;
        var n = e(document).height(),
            r = this.$window.scrollTop(),
            i = this.$element.offset(),
            s = this.options.offset,
            o = s.top,
            u = s.bottom;
        typeof s != "object" && (u = o = s), typeof o == "function" && (o = s.top()), typeof u == "function" && (u = s.bottom());
        var a = this.unpin != null && r + this.unpin <= i.top ? !1 : u != null && i.top + this.$element.height() >= n - u ? "bottom" : o != null && r <= o ? "top" : !1;
        if (this.affixed === a) return;
        this.unpin && this.$element.css("top", ""), this.affixed = a, this.unpin = a == "bottom" ? i.top - r : null, this.$element.removeClass(t.RESET).addClass("affix" + (a ? "-" + a : "")), a == "bottom" && this.$element.offset({
            top: document.body.offsetHeight - u - this.$element.height()
        })
    };
    var n = e.fn.affix;
    e.fn.affix = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("bs.affix"),
                s = typeof n == "object" && n;
            i || r.data("bs.affix", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.affix.Constructor = t, e.fn.affix.noConflict = function() {
        return e.fn.affix = n, this
    }, e(window).on("load", function() {
        e('[data-spy="affix"]').each(function() {
            var t = e(this),
                n = t.data();
            n.offset = n.offset || {}, n.offsetBottom && (n.offset.bottom = n.offsetBottom), n.offsetTop && (n.offset.top = n.offsetTop), t.affix(n)
        })
    })
}(jQuery), define("bootstrap", function() {}), require(["jquery", "skrollr", "slick", "modernizr", "bootstrap"], function(e, t) {
    "use strict";
    e(document).ready(function() {
        e(".single").slick(), e(".multiple-items").slick({
            infinite: !0,
            slidesToShow: 3,
            slidesToScroll: 3
        }), window.skrollr = t;
        var n = t.init();
        require(["skrollrmenu"], function() {
            t.menu.init(n, {
                animate: !0,
                easing: "sqrt",
                scale: 2,
                duration: function(e, t) {
                    return 500
                }
            })
        })
    })
}), define("main", function() {});