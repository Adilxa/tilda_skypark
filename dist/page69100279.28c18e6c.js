function t_cover__parallax(e) {
    var t = window.innerHeight;
    window.addEventListener("resize", function() {
        t = window.innerHeight;
    }), document.body.style.webkitTransform && (e.style.position = "relative");
    var o = t_cover__getFullHeight(e), r = .2, n;
    [
        "scroll",
        "resize"
    ].forEach(function(n) {
        window.addEventListener(n, function() {
            t_cover__parallaxUpdate(e, r, t, o);
        });
    }), "complete" !== document.readyState && window.addEventListener("load", function() {
        t_cover__parallaxUpdate(e, r, t, o);
    }), t_cover__parallaxUpdate(e, r, t, o);
}
function t_cover__parallaxUpdate(e, t, o, r) {
    var n = window.pageYOffset, i = e.getBoundingClientRect().top + n, c = e.getBoundingClientRect().top, a, d;
    if (!(i + r < n || i > n + o)) {
        var _ = -1 * Math.round(c * t);
        document.body.style.webkitTransform ? e.style.webkitTransform = "translateY(" + _ + "px)" : e.style.top = _ + "px";
    }
}
function cover_init(e) {
    var t = document.getElementById("allrecords"), o = !!t && "yes" === t.getAttribute("data-tilda-lazy"), r = document.getElementById("rec" + e), n = document.getElementById("coverCarry" + e), i = r ? r.querySelector("img[data-hook-clogo]") : null;
    if (n) {
        var c = {
            "cover-bg": "",
            "cover-height": "",
            "cover-parallax": "",
            "video-url-mp4": "",
            "video-url-webm": "",
            "video-url-youtube": "",
            "video-url-vimeo": "",
            "video-url-rutube": "",
            "video-url-kinescope": "",
            "video-url-vkvideo": "",
            "video-noloop": "",
            "video-nomute": "",
            "video-nocover": "",
            "bg-base64": "",
            "use-image-for-mobile-cover": ""
        };
        for(var a in c){
            var d = n.getAttribute("data-content-" + a);
            (d || "use-image-for-mobile-cover" === a) && (c[a] = d);
        }
        var _ = r ? r.getAttribute("data-bg-color") : "";
        _ && (c["parent-bg"] = _);
        var u = [
            "mp4",
            "webm",
            "youtube",
            "vimeo",
            "rutube",
            "kinescope",
            "vkvideo"
        ];
        "yes" === c["video-nocover"] ? u.forEach(function(e) {
            c["video-url-" + e] = "";
        }) : c["video-nomute"] = "";
        var v = u.some(function(e) {
            return !!c["video-url-" + e];
        });
        (window.t_cover__isMobile || "ontouchend" in document) && v && !o && (n.style.backgroundImage = 'url("' + c["cover-bg"] + '")'), setTimeout(function() {
            t_cover__recalcContentHeight(e, !1, 0), t_cover__fixBgFixedNode(e);
        }, 300), i && (i.onload = function() {
            t_cover__recalcContentHeight(e, !1, 500);
        }), window.t_cover__isMobile || "ontouchend" in document ? window.addEventListener("orientationchange", function() {
            t_cover__recalcContentHeight(e, !0, 200);
        }) : window.addEventListener("resize", function() {
            t_cover__recalcContentHeight(e, !1, 0);
        }), t_cover__setListenerToArrow(e), t_cover__setCoverParams(n, c, v), n.addEventListener("displayChanged", function() {
            t_cover__recalcContentHeight(e, !1, 0);
        });
    }
}
function t_cover__recalcContentHeight(e, t, o) {
    o ? setTimeout(function() {
        t_cover__fixBgFixedStyles(e), t_cover__recalcCoverHeight(e, t);
    }, o) : (t_cover__fixBgFixedStyles(e), t_cover__recalcCoverHeight(e, t));
}
function t_cover__setCoverParams(e, t, o) {
    var r = "fixed" === t["cover-parallax"], n = "dynamic" === t["cover-parallax"], i = "yes" === t["bg-base64"], c;
    if (t["parent-bg"]) {
        var a = e.closest(".t-cover");
        a && a.classList.add("t-cover__transparent");
    }
    if (t_cover__setCoverVideoParams(e, t, o, r), r && window.isOpera && (e.style.transform = "unset"), n && !window.t_cover__isMobile) {
        var d = t_cover__getPureHeight(e);
        if (d < window.innerHeight) {
            var _ = .2 * window.innerHeight;
            e.style.height = d + _ + "px";
        }
        t_cover__parallax(e);
    }
    if (i && t["cover-bg"] && !o) {
        var u = !1, v = document.createElement("img");
        v.src = t["cover-bg"], v.onload = function() {
            v.parentElement && v.parentElement.removeChild(v), e.style.backgroundImage = 'url("' + t["cover-bg"] + '")', e.style.opacity = "1", u = !0;
        }, u || (e.style.backgroundImage = "", e.style.opacity = "0", e.style.transition = "opacity 25ms");
    }
}
function t_cover__setCoverVideoParams(e, t, o, r) {
    var n = "";
    if (t["video-url-youtube"] && (n = "youtube"), (t["video-url-vimeo"] || t["video-url-rutube"] || t["video-url-kinescope"] || t["video-url-vkvideo"]) && (n = "iframe"), (!window.t_cover__isMobile && !("ontouchend" in document) || -1 === [
        "on",
        null
    ].indexOf(t["use-image-for-mobile-cover"])) && o) switch(t_cover__setStylesForCoverVideo(e, "youtube" === n ? "youtube" : ""), n){
        case "youtube":
            t_cover__processYouTubeVideo(e, t);
            break;
        case "iframe":
            t_cover__processIframeVideo(e, t);
            break;
        default:
            t_cover__processHTML5Video(e, t, r);
    }
}
function t_cover__processYouTubeVideo(e, t) {
    var o;
    "IntersectionObserver" in window ? new IntersectionObserver(function(e, o) {
        e.forEach(function(e) {
            if (e.isIntersecting) {
                var r = e.target;
                o.unobserve(r), t_onFuncLoad("processYoutubeVideo", function() {
                    window.processYoutubeVideo(r, t["cover-height"]);
                });
            }
        });
    }).observe(e) : (t_cover__createYoutubeCover(e, t["cover-height"]), window.addEventListener("scroll", t_throttle(function() {
        t_cover__createYoutubeCover(e, t["cover-height"]);
    }, 100)));
}
function t_cover__processHTML5Video(e, t, o) {
    e.style.backgroundSize = "auto";
    var r, n = !!(-1 !== t["cover-height"].indexOf("vh")) && parseInt(t["cover-height"], 10) > 100, i, c = !!(-1 !== t["cover-height"].indexOf("px")) && parseInt(t["cover-height"], 10) > window.innerHeight, a = !1;
    o && (n || c) && (e.style.height = "100vh", a = !0);
    var d = !t["video-noloop"], _ = !t["video-nomute"], u;
    "IntersectionObserver" in window ? new IntersectionObserver(function(e, o) {
        e.forEach(function(e) {
            if (e.isIntersecting) {
                var r = e.target;
                o.unobserve(r), t_cover__createAndProcessHTML5Video(r, t, d, _);
            }
        });
    }).observe(e) : (t_cover__createHTMLVideoCover(e, t, a, o, d, _), window.addEventListener("scroll", t_throttle(function() {
        t_cover__createHTMLVideoCover(e, t, a, o, d, _);
    }, 100)));
    window.addEventListener("scroll", function() {
        if (o && a) {
            var t = e.parentElement, r = window.pageYOffset, n, i = r + window.innerHeight, c = t_cover__getPureHeight(t), d = t.getBoundingClientRect().top + r, _;
            i >= d + c ? (e.style.position = "absolute", e.style.bottom = "0px", e.style.top = "auto") : r >= d ? (e.style.position = "fixed", e.style.top = "0px") : r < d && (e.style.position = "relative", e.style.top = "auto");
        }
    });
}
function t_cover__processIframeVideo(e, t) {
    var o;
    "IntersectionObserver" in window ? new IntersectionObserver(function(e, o) {
        e.forEach(function(e) {
            if (e.isIntersecting) {
                var r = e.target;
                o.unobserve(r), t_onFuncLoad("t_videoprocessor__processIframeVideo", function() {
                    window.t_videoprocessor__processIframeVideo(r, t);
                });
            }
        });
    }).observe(e) : (t_cover__createIframeCover(e, t), window.addEventListener("scroll", t_throttle(function() {
        t_cover__createIframeCover(e, t);
    }, 100)));
}
function t_cover__setStylesForCoverVideo(e, t) {
    e.style.backgroundColor = "#000000", e.style.backgroundImage = "youtube" === t ? "" : 'url("https://tilda.ws/img/spinner-white.gif")', e.style.backgroundSize = "youtube" === t ? "" : "unset", e.style.backgroundPosition = "youtube" === t ? "" : "center", e.style.backgroundRepeat = "youtube" === t ? "" : "no-repeat", e.setAttribute("data-content-cover-bg", "");
}
function t_cover__setListenerToArrow(e) {
    var t = document.getElementById("rec" + e);
    if (t) {
        var o = t.querySelector(".t-cover__arrow-wrapper");
        o && o.addEventListener("click", function() {
            var e, o;
            t.offsetHeight && t_cover__scrollToNextSection(t.offsetHeight + t.getBoundingClientRect().top + window.pageYOffset);
        });
    }
}
function t_cover__initCovers() {
    var e = document.querySelector(".t-records"), t, o;
    e && "edit" === e.getAttribute("data-tilda-mode") || Array.from(document.querySelectorAll(".t-cover__carrier")).forEach(function(e) {
        var t = e.getAttribute("data-content-cover-id");
        t && cover_init(t);
    });
}
function t_cover__setWordWrapOnInit() {
    var e = Array.from(document.querySelectorAll(".t-cover__wrapper")), t = window.t_cover__isMobile ? document.documentElement.clientWidth : window.innerWidth;
    e.forEach(function(e) {
        e.closest(".t-slds") || Math.floor(e.getBoundingClientRect().right) > t && (e.style.wordBreak = "break-all");
    });
}
function t_cover__createYoutubeCover(e, t) {
    if (!e.querySelector("iframe")) {
        var o = window.pageYOffset, r = window.innerHeight, n = t_cover__getPureHeight(e), i = e.getBoundingClientRect().top + o, c, a, d = 500;
        o + r > i - d && i + n + d >= o && t_onFuncLoad("processYoutubeVideo", function() {
            window.processYoutubeVideo(e, t);
        });
    }
}
function t_cover__createHTMLVideoCover(e, t, o, r, n, i) {
    if (!e.querySelector("video")) {
        var c = window.pageYOffset, a = window.innerHeight, d = t_cover__getPureHeight(e), _ = e.getBoundingClientRect().top + c, u, v, l = 500;
        c + a > _ - l && c <= d + _ + l && t_cover__createAndProcessHTML5Video(e, t, n, i);
    }
}
function t_cover__createIframeCover(e, t) {
    if (!e.querySelector("iframe")) {
        var o = window.pageYOffset, r = window.innerHeight, n = t_cover__getPureHeight(e), i = e.getBoundingClientRect().top + o, c, a, d = 500;
        o + r > i - d && i + n + d >= o && t_onFuncLoad("t_videoprocessor__processIframeVideo", function() {
            window.t_videoprocessor__processIframeVideo(e, t);
        });
    }
}
function t_cover__createAndProcessHTML5Video(e, t, o, r) {
    t_onFuncLoad("t_videoprocessor__processHTML5Video", function() {
        t_videoprocessor__processHTML5Video(e, {
            mp4: t["video-url-mp4"],
            ogv: "",
            webm: t["video-url-webm"],
            poster: "",
            autoplay: !0,
            loop: o,
            scale: !0,
            position: "absolute",
            opacity: 1,
            textReplacement: !1,
            zIndex: 0,
            width: "100%",
            height: 0,
            volume: 1,
            muted: r,
            fullscreen: !1,
            imgFallback: !0
        });
    });
}
function t_cover__recalcCoverHeight(e, t) {
    var o = document.getElementById("rec" + e);
    if (o) {
        var r = o.querySelector(".t-cover"), n = o.getAttribute("data-record-type");
        if (r && "935" !== n) {
            var i = o.querySelector(".t-cover__carrier"), c = i ? i.getAttribute("data-content-cover-height") : "";
            if (!c) {
                var a = o.querySelector("[data-content-cover-height]");
                c = a ? a.getAttribute("data-content-cover-height") : "";
            }
            var d = "y" === o.getAttribute("data-fixed-bg"), _ = [
                ".t-cover",
                ".t-cover__filter",
                ".t-cover__carrier",
                ".t-cover__wrapper"
            ];
            ("734" === n || o.querySelector(".t734")) && _.push(".t-slds__items-wrapper");
            var u = "dynamic" === i.getAttribute("data-content-cover-parallax"), v = t_cover__getHeightFromAttr(c);
            v && _.forEach(function(e) {
                var t;
                u && ".t-cover__carrier" === e || Array.prototype.slice.call(o.querySelectorAll(e)).forEach(function(e) {
                    e && (e.style.height = Math.round(v) + "px");
                });
            });
            var l = t_cover__getHeightFromAttr(c), s = t_cover__getPureHeight(r), g = l || s;
            if (!d) {
                var f = r.style.height;
                r.style.height = "", g = s, f && (r.style.height = f);
            }
            var h = t_cover__getContentHeight(o), p = 40, m = 300, y = !!i && "100vh" === i.getAttribute("data-content-cover-height");
            h > m && g < h + p || d || (window.t_cover__isMobile || "ontouchend" in document) && t ? (t_cover__setRecalculatedHeight(o, h), t_cover__updateResizeElem(o)) : window.t_cover__isMobile && y ? _.forEach(function(e) {
                var t = o.querySelector(e);
                t && (t.style.height = document.documentElement.clientHeight + "px");
            }) : g > h + p && (t_cover__setRecalculatedHeight(o, h), t_cover__updateResizeElem(o));
        }
    }
}
function t_cover__getContentHeight(e) {
    var t = Array.prototype.slice.call(e.querySelectorAll("div[data-hook-content]"));
    if (t.length <= 1) return t_cover__getPureHeight(t[0]);
    var o = t.map(function(e) {
        return t_cover__getPureHeight(e);
    });
    return o.sort(function(e, t) {
        return t - e;
    }), o[0] || 0;
}
function t_cover__getHeightFromAttr(e) {
    return e ? -1 !== e.indexOf("vh") ? parseInt(e, 10) * document.documentElement.clientHeight / 100 : parseInt(e, 10) : 0;
}
function t_cover__setRecalculatedHeight(e, t) {
    var o = e.querySelector(".t-cover__carrier"), r = o ? o.getAttribute("data-content-cover-height") : "";
    if (!r) {
        var n = e.querySelector("[data-content-cover-height]");
        r = n ? n.getAttribute("data-content-cover-height") : "0";
    }
    var i = t_cover__getHeightFromAttr(r), c = o ? "dynamic" === o.getAttribute("data-content-cover-parallax") : "", a = "734" === e.getAttribute("data-record-type"), d = window.innerWidth <= 568 ? 40 : 120, _ = window.innerWidth <= 568 ? 50 : 100;
    a && (d = 0, _ = 0), (t += d) > 1e3 && (t += _);
    var u = t > i ? t : i, v = 0, l = [
        ".t-cover",
        ".t-cover__filter",
        ".t-cover__carrier",
        ".t-cover__wrapper"
    ];
    (a || e.querySelector(".t734")) && l.push(".t-slds__items-wrapper"), l.forEach(function(t) {
        var o;
        Array.prototype.slice.call(e.querySelectorAll(t)).forEach(function(e) {
            c && e && e.classList.contains("t-cover__carrier") && u < document.documentElement.clientHeight ? (v = .2 * document.documentElement.clientHeight, e.style.height = u + v + "px") : e && (e.style.height = u + "px");
        });
    }), o.setAttribute("data-content-cover-updated-height", u + v + "px");
    var s = document.createEvent("Event");
    s.initEvent("coverHeightUpdated", !0, !0), o.dispatchEvent(s);
}
function t_cover__updateResizeElem(e) {
    var t = document.getElementById("allrecords"), o;
    if (!!t && "yes" === t.getAttribute("data-tilda-lazy")) {
        var r = e.querySelector(".t-cover__carrier");
        t_onFuncLoad("t_lazyload_updateResize_elem", function() {
            t_lazyload_updateResize_elem(r);
        });
    }
}
function t_cover__checkIsFixForBgNeeded(e) {
    var t = document.getElementById("rec" + e), o = t ? t.querySelector(".t-cover__carrier") : null;
    if (!o) return !1;
    var r = "y" === t.getAttribute("data-fixed-bg"), n = [
        "mp4",
        "webm",
        "youtube",
        "vimeo",
        "rutube",
        "kinescope",
        "vkvideo",
        "boomstream"
    ];
    n = n.map(function(e) {
        return o.getAttribute("data-content-video-url-" + e);
    });
    var i = "fixed" === o.getAttribute("data-content-cover-parallax"), c = n.some(function(e) {
        return e;
    }), a = window.t_cover__isMobile || "ontouchend" in document;
    return i && window.isSafari && !a && !c && !r;
}
function t_cover__fixBgFixedNode(e) {
    var t = t_cover__checkIsFixForBgNeeded(e), o = document.getElementById("rec" + e);
    if (t && o) {
        var r = o.getAttribute("data-record-type"), n = o.querySelector(".t-cover"), i = n ? n.parentElement : null;
        if (!document.getElementById("fixed-bg-cover")) {
            var c = document.createElement("style");
            c.id = "fixed-bg-cover";
            var a = "";
            a += ".t-cover__container {", a += "position: relative;", a += "}", a += ".t-cover__container .t-cover {", a += "clip: rect(0, auto, auto, 0);", a += "position: absolute;", a += "top: 0;", a += "left: 0;", a += "width: 100%;", a += "height: 100% !important;", a += "}", a += ".t-cover__container .t-cover .t-cover__carrier {", a += "position: fixed;", a += "display: block;", a += "top: 0;", a += "left: 0;", a += "width: 100%;", a += "height: 100% !important;", a += "background-size: cover;", a += "background-position: center center;", a += "transform: translateZ(0);", a += "will-change: transform;", a += "}", c.textContent = a, document.head.insertAdjacentElement("beforeend", c);
        }
        var d = document.createElement("div");
        d.classList.add("t-cover__container"), i.insertAdjacentElement("afterbegin", d), d.style.height = t_cover__getPureHeight(n) + "px", d.appendChild(n);
        var _, u = {
            275: ".t256__video-container",
            286: ".t266__video-container",
            337: ".t-container",
            906: ".t906__video-container"
        }[r], v = u ? o.querySelector(u) : null;
        v && d.appendChild(v);
    }
}
function t_cover__fixBgFixedStyles(e) {
    var t = document.getElementById("rec" + e), o = t_cover__checkIsFixForBgNeeded(e), r = t ? t.querySelector(".t-cover") : null, n = t ? t.querySelector(".t-cover__container") : null;
    if (o && n && r) {
        var i = r.style.height;
        r.style.height = 0, n.style.height = i, t.setAttribute("data-fixed-bg", "y");
    }
}
function t_cover__getPureHeight(e) {
    if (!e) return 0;
    var t = parseInt(e.style.paddingTop) || 0, o = parseInt(e.style.paddingBottom) || 0;
    return e.clientHeight ? e.clientHeight - (t + o) : parseInt(window.getComputedStyle(e).height, 10);
}
function t_cover__getFullHeight(e) {
    var t, o, r;
    return e ? e.offsetHeight + (parseInt(e.style.marginTop) || 0) + (parseInt(e.style.marginBottom) || 0) : 0;
}
function t_cover__scrollToNextSection(e) {
    var t, o = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight;
    if (e > o && (e = o), e === window.pageYOffset) return !1;
    var r = window.pageYOffset, n = (e - r) / 30, i = window.pageYOffset, c = setInterval(function() {
        i += n, window.scrollTo(0, i), document.body.setAttribute("data-scrollable", "true"), (e - r < 0 && window.pageYOffset <= e || e - r > 0 && window.pageYOffset >= e) && (clearInterval(c), document.body.removeAttribute("data-scrollable"));
    }, 10);
}
function cover_setRecalculatedCoverHeight(e, t) {
    t_cover__setRecalculatedHeight(e, t);
}
function t_cover__getHeightWithoutPadding(e) {
    return t_cover__getPureHeight(e);
}
window.t_cover__isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), t_onReady(function() {
    t_onFuncLoad("t_cover__initCovers", function() {
        t_cover__initCovers(), "complete" === document.readyState ? t_cover__setWordWrapOnInit() : window.addEventListener("load", t_cover__setWordWrapOnInit);
    });
});

//# sourceMappingURL=page69100279.28c18e6c.js.map
