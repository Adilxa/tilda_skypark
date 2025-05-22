function t_throttle(fn, threshhold, scope) {
    var last;
    var deferTimer;
    threshhold || (threshhold = 250);
    return function() {
        var context = scope || this;
        var now = +new Date();
        var args = arguments;
        if (last && now < last + threshhold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function() {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}
function t734_init(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec) return;
    var coverBlock = document.querySelector('.t830');
    if (coverBlock) {
        var slidesWrapper = rec.querySelector('.t-slds__items-wrapper');
        if (slidesWrapper && slidesWrapper.classList.contains('t-slds_animated-none')) t_onFuncLoad('t_sldsInit', function() {
            t_sldsInit(recid);
        });
        else setTimeout(function() {
            t_onFuncLoad('t_sldsInit', function() {
                t_sldsInit(recid);
            });
        }, 500);
    } else t_onFuncLoad('t_sldsInit', function() {
        t_sldsInit(recid);
    });
    var currentCoverBlock = rec.querySelector('.t734');
    if (currentCoverBlock) currentCoverBlock.addEventListener('displayChanged', function() {
        t_onFuncLoad('t_slds_updateSlider', function() {
            t_slds_updateSlider(recid);
        });
    });
}
function t678_onSuccess(form) {
    t_onFuncLoad('t_forms__onSuccess', function() {
        t_forms__onSuccess(form);
    });
}
function t570_init(recid) {
    if (window.innerWidth > 750) {
        t570_setMapHeight(recid);
        window.onload = function() {
            t570_setMapHeight(recid);
        };
        window.addEventListener('resize', function() {
            t570_setMapHeight(recid);
        });
    }
}
function t570_setMapHeight(recid) {
    var rec = document.querySelector('#rec' + recid);
    if (!rec) return;
    var mapElement = rec.querySelector('.t-map');
    var textElement = rec.querySelector('.t570__col_text');
    if (!mapElement || !textElement) return;
    var paddingTop = parseInt(textElement.style.paddingTop, 10) || 0;
    var paddingBottom = parseInt(textElement.style.paddingBottom, 10) || 0;
    var textHeight = textElement.clientHeight - (paddingTop + paddingBottom);
    mapElement.style.height = textHeight + 'px';
    var event = document.createEvent('HTMLEvents');
    event.initEvent('sizechange', !0, !1);
    mapElement.dispatchEvent(event);
}

//# sourceMappingURL=page69100279.49e45772.js.map
