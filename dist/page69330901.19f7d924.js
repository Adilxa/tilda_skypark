function t__paintIcons(e, t) {
    var r = document.querySelector("#rec" + e);
    if (r) {
        var a = r.querySelectorAll(t);
        a.length && a.forEach(function(e) {
            var t = e.getAttribute("data-original");
            if (t) {
                var r = e.getAttribute("data-color");
                if (r) {
                    var a = "IMG" === e.tagName, i, l = [
                        "/lib__tildaicon__",
                        "/lib/tildaicon/",
                        "/tild6164-3166-4434-b265-613330313930/circle.svg",
                        "/tild3435-3031-4565-b439-323735306565/star.svg",
                        "/tild3836-3733-4133-b431-346465373061/rhomb.svg",
                        "/tild3336-3766-4730-a266-626536316465/cross.svg",
                        "/tild3331-6332-4132-b565-663737653932/rhomb2.svg",
                        "/tild3834-3661-4635-b166-303739306635/arrow.svg",
                        "/tild3163-6165-4531-b437-616562623533/flake.svg",
                        "/tild3435-3465-4165-b231-623435653462/heart.svg",
                        "/lib/icons/",
                        "images/lib"
                    ].some(function(e) {
                        return t.indexOf(e) > -1;
                    }), o = t.includes("-/paint/");
                    if (l && !o) {
                        var n = new XMLHttpRequest;
                        n.open("GET", t), n.responseType = "document", n.onreadystatechange = function() {
                            if (n.readyState === XMLHttpRequest.DONE && 200 === n.status) {
                                var i, l = n.response.querySelector("svg"), o;
                                if (!l) return;
                                l.querySelectorAll("*:not(g):not(title):not(desc)").forEach(function(e) {
                                    e.style.fill = r;
                                });
                                var s = (new XMLSerializer).serializeToString(l), c = "data:image/svg+xml;base64," + window.btoa(s);
                                a ? e.src = c : e.style.backgroundImage = "url(" + c + ")", e.removeAttribute("data-original"), e.removeAttribute("data-color");
                            } else n.readyState === XMLHttpRequest.DONE && (a ? e.src = t : e.style.backgroundImage = "url(" + t + ")");
                        }, n.send();
                    } else a ? e.src = t : e.style.backgroundImage = "url(" + t + ")";
                }
            }
        });
    }
}

//# sourceMappingURL=page69330901.19f7d924.js.map
