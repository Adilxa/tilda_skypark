function t_lazyload_update() {
    "undefined" != typeof lazyload_cover && lazyload_cover.update(), "undefined" != typeof lazyload_img && lazyload_img.update(), "undefined" != typeof lazyload_bgimg && lazyload_bgimg.update(), "undefined" != typeof lazyload_iframe && lazyload_iframe.update();
}
function t_lazyload_updateResize_elem(e) {
    if (window.jQuery && e instanceof jQuery) {
        if (0 == e.length) return;
        e = e.get(0);
    }
    if (null != e) {
        var t = e.tagName;
        if ("IMG" == t) var o = e.getAttribute("src"), n = "-/resize/";
        else if ("undefined" != typeof getComputedStyle) {
            var o = getComputedStyle(e)["background-image"].replace("url(", "").replace(")", "").replace(/"/gi, ""), i;
            if ("contain" == getComputedStyle(e)["background-size"]) var n = "-/contain/";
            else var n = "-/cover/";
        } else var n = "-/cover/";
        if (!(null == o || -1 === o.indexOf(n) || o.indexOf(".svg") > 0 || o.indexOf(".gif") > 0 || o.indexOf(".ico") > 0 || -1 === o.indexOf("thumb.tildacdn.com") || o.indexOf("-/empty/") > 0 && o.indexOf("-/resizeb/") > 0)) {
            var l = o.indexOf(n) + n.length, a = o.indexOf("/", l);
            if (l > 0 && a > 0) {
                var r = o.slice(l, a).split("x"), s = e.clientWidth, c = e.clientHeight;
                if (s > 0 && c > 0 && (r[0] > 0 || r[1] > 0) && (r[0] > 0 && s > r[0] || r[1] > 0 && c > r[1]) && (r[0] > 0 && s - r[0] > 100 || r[1] > 0 && c - r[1] > 100)) {
                    var d = o.slice(0, l) + (r[0] > 0 ? s : "") + "x" + (r[1] > 0 ? c : "") + o.substring(a);
                    "IMG" == t ? e.setAttribute("src", d) : e.style.backgroundImage = "url('" + d + "')";
                }
            }
        }
    }
}
!function(e, t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : e.LazyLoad = t();
}(window, function() {
    function e() {
        m || (h = {
            elements_selector: "img",
            container: window,
            threshold: 300,
            throttle: 50,
            data_src: "original",
            data_srcset: "original-set",
            class_loading: "loading",
            class_loaded: "loaded",
            skip_invisible: !0,
            show_while_loading: !0,
            callback_load: null,
            callback_error: null,
            callback_set: null,
            callback_processed: null,
            placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        }, p = !!window.addEventListener, f = !!window.attachEvent, g = !!document.body.classList, m = !0);
    }
    function t(e, t, o) {
        var n;
        p ? e.addEventListener(t, o) : f && (e.attachEvent("on" + t, (n = e, function() {
            o.call(n, window.event);
        })), e = null);
    }
    function o(e, t, o) {
        p ? e.removeEventListener(t, o) : f && e.detachEvent("on" + t, o);
    }
    function n(e, t, o) {
        var n, i, l;
        function a() {
            return window.innerWidth || n.documentElement.clientWidth || document.body.clientWidth;
        }
        function r() {
            return window.innerHeight || n.documentElement.clientHeight || document.body.clientHeight;
        }
        function s(e) {
            return e.getBoundingClientRect().top + i - n.documentElement.clientTop;
        }
        function c(e) {
            return e.getBoundingClientRect().left + l - n.documentElement.clientLeft;
        }
        function d() {
            var n;
            return (n = t === window ? r() + i : s(t) + t.offsetHeight) <= s(e) - o;
        }
        function u() {
            var n;
            return (n = t === window ? a() + window.pageXOffset : c(t) + a()) <= c(e) - o;
        }
        function _() {
            var o, n = 1200;
            return (o = t === window ? i : s(t)) >= s(e) + n + e.offsetHeight;
        }
        function h() {
            var n;
            return (n = t === window ? l : c(t)) >= c(e) + o + e.offsetWidth;
        }
        return n = e.ownerDocument, i = window.pageYOffset || n.body.scrollTop, l = window.pageXOffset || n.body.scrollLeft, "fixed" === e.getAttribute("data-content-cover-parallax") && e.closest && e.closest(".t-cover__container") && (e = e.closest(".t-cover__container")), !(d() || _() || u() || h());
    }
    function i() {
        var e;
        return (new Date).getTime();
    }
    function l(e, t) {
        var o = {}, n;
        for(n in e)e.hasOwnProperty(n) && (o[n] = e[n]);
        for(n in t)t.hasOwnProperty(n) && (o[n] = t[n]);
        return o;
    }
    function a(e) {
        var t;
        try {
            t = Array.prototype.slice.call(e);
        } catch (l) {
            var o = [], n, i = e.length;
            for(n = 0; n < i; n++)o.push(e[n]);
            t = o;
        }
        return t.forEach(function(e) {
            e.isSkipByPosition = null === e.offsetParent && 0 === r(e, ".t396__carrier-wrapper").length && "fixed" !== e.getAttribute("data-content-cover-parallax"), e.isNotUnderScreenRange = 0 === r(e, ".t-rec[data-screen-max]").length && 0 === r(e, ".t-rec[data-screen-min]").length;
        }), t;
    }
    function r(e, t) {
        for(var o = []; (e = e.parentNode) && e !== document;)t && !e.matches(t) || o.unshift(e);
        return o;
    }
    function s(e, t) {
        g ? e.classList.add(t) : e.className += (e.className ? " " : "") + t;
    }
    function c(e, t) {
        g ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
    }
    function d(e, t, o, n) {
        var i = t.getAttribute("data-" + n), l = t.getAttribute("data-" + o), a = e.tagName;
        return "IMG" === a ? (l && e.setAttribute("srcset", l), void (i && e.setAttribute("src", i))) : "IFRAME" === a ? void (i && e.setAttribute("src", i)) : void (e.style.backgroundImage = "url(" + i + ")");
    }
    function u(e, t) {
        return function() {
            return e.apply(t, arguments);
        };
    }
    function _(o) {
        e(), this._settings = l(h, o), this._queryOriginNode = this._settings.container === window ? document : this._settings.container, this._previousLoopTime = 0, this._loopTimeout = null, this._handleScrollFn = u(this.handleScroll, this), t(window, "resize", this._handleScrollFn), this.update();
    }
    window.t_lazyload_setSources = d;
    var h, p, f, g, m = !1;
    return _.prototype._showOnLoad = function(e) {
        function n() {
            null !== l && (l.callback_load && l.callback_load(e), d(e, e, l.data_srcset, l.data_src), l.callback_set && l.callback_set(e), c(e, l.class_loading), s(e, l.class_loaded), o(i, "load", n));
        }
        var i, l = this._settings;
        e.getAttribute("src") || e.setAttribute("src", l.placeholder), t(i = document.createElement("img"), "load", n), t(i, "error", function() {
            c(e, l.class_loading), l.callback_error && l.callback_error(e);
        }), s(e, l.class_loading), d(i, e, l.data_srcset, l.data_src);
    }, _.prototype._showOnAppear = function(e) {
        function n() {
            null !== i && (i.callback_load && i.callback_load(e), c(e, i.class_loading), s(e, i.class_loaded), o(e, "load", n));
        }
        var i = this._settings;
        ("IMG" === e.tagName || "IFRAME" === e.tagName) && (t(e, "load", n), t(e, "error", function() {
            o(e, "load", n), c(e, i.class_loading), i.callback_error && i.callback_error(e);
        }), s(e, i.class_loading)), d(e, e, i.data_srcset, i.data_src), i.callback_set && i.callback_set(e);
    }, _.prototype._loopThroughElements = function() {
        var e, t, o = this._settings, i = this._elements, l = i ? i.length : 0, a = [];
        for(e = 0; l > e; e++)t = i[e], o.skip_invisible && t.isSkipByPosition || n(t, o.container, o.threshold) && (o.show_while_loading ? this._showOnAppear(t) : this._showOnLoad(t), a.push(e), t.wasProcessed = !0);
        for(; a.length > 0;)i.splice(a.pop(), 1), o.callback_processed && o.callback_processed(i.length);
        0 === l && this._stopScrollHandler();
    }, _.prototype._purgeElements = function() {
        var e, t, o = this._elements, n = o.length, i = [];
        for(e = 0; n > e; e++)(t = o[e]).wasProcessed && i.push(e);
        for(; i.length > 0;)o.splice(i.pop(), 1);
    }, _.prototype._startScrollHandler = function() {
        this._isHandlingScroll || (this._isHandlingScroll = !0, t(this._settings.container, "scroll", this._handleScrollFn));
    }, _.prototype._stopScrollHandler = function() {
        this._isHandlingScroll && (this._isHandlingScroll = !1, o(this._settings.container, "scroll", this._handleScrollFn));
    }, _.prototype.handleScroll = function() {
        var e, t, o;
        this._settings && (t = i(), 0 !== (o = this._settings.throttle) ? 0 >= (e = o - (t - this._previousLoopTime)) || e > o ? (this._loopTimeout && (clearTimeout(this._loopTimeout), this._loopTimeout = null), this._previousLoopTime = t, this._loopThroughElements()) : this._loopTimeout || (this._loopTimeout = setTimeout(u(function() {
            this._previousLoopTime = i(), this._loopTimeout = null, this._loopThroughElements();
        }, this), e)) : this._loopThroughElements());
    }, _.prototype.update = function() {
        this._elements = a(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)), this._purgeElements(), this._loopThroughElements(), this._startScrollHandler();
    }, _.prototype.destroy = function() {
        o(window, "resize", this._handleScrollFn), this._loopTimeout && (clearTimeout(this._loopTimeout), this._loopTimeout = null), this._stopScrollHandler(), this._elements = null, this._queryOriginNode = null, this._settings = null;
    }, _;
}), window.lazy = "y", t_onReady(function() {
    setTimeout(function() {
        lazyload_cover = new LazyLoad({
            elements_selector: ".t-cover__carrier",
            show_while_loading: !1,
            data_src: "content-cover-bg",
            placeholder: "",
            threshold: 700
        });
    }, 100), setTimeout(function() {
        if (lazyload_img = new LazyLoad({
            elements_selector: ".t-img",
            threshold: 800
        }), lazyload_bgimg = new LazyLoad({
            elements_selector: ".t-bgimg",
            show_while_loading: !1,
            placeholder: "",
            threshold: 800
        }), lazyload_iframe = new LazyLoad({
            elements_selector: ".t-iframe"
        }), document.addEventListener("slide.bs.carousel", function(e) {
            setTimeout(function() {
                lazyload_cover.update(), lazyload_img.update(), lazyload_bgimg.update();
            }, 500);
        }), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && !document.body.classList) {
            var e = document.createElement("div");
            e.classList.add("t-mbfix"), document.body.appendChild(e);
            var t = document.querySelector(".t-mbfix");
            setTimeout(function() {
                t.classList.add("t-mbfix_hide");
            }, 50), setTimeout(function() {
                null !== t.parentNode && t.parentNode.removeChild(t);
            }, 1e3);
        }
    }, 500);
});

//# sourceMappingURL=page69100279.ebc99d9b.js.map
