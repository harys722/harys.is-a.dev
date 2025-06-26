
/* ORIGINAL CODE REFERENCES */
/*! 
 *==============================================================
 *  EMBED BUILDER
 * ==============================================================
 * Author: Glitchii <https://github.com/Glitchii/embedbuilder>
 * License: MIT
 * --------------------------------------------------------------
 */

/*!
 * ==============================================================
 *  COLOR PICKER 2.1.6
 * ==============================================================
 * Author: Taufik Nurrohman <https://github.com/taufik-nurrohman>
 * License: MIT
 * --------------------------------------------------------------
 */
((e, t, n) => {
    let r = t.documentElement,
        i = "HEX",
        o = "top",
        u = "right",
        c = "left",
        l = "px",
        f = e.setTimeout,
        s = ["touchstart", "mousedown"],
        a = ["touchmove", "mousemove"],
        d = ["orientationchange", "resize"],
        h = ["touchend", "mouseup"];
    function p(e) {
        let t,
            n,
            r,
            i,
            o,
            u,
            c,
            l,
            f = +e[0],
            s = +e[1],
            a = +e[2];
        switch (((u = a * (1 - s)), (c = a * (1 - (o = 6 * f - (i = Math.floor(6 * f))) * s)), (l = a * (1 - (1 - o) * s)), (i = i || 0), (c = c || 0), (l = l || 0), i % 6)) {
            case 0:
                (t = a), (n = l), (r = u);
                break;
            case 1:
                (t = c), (n = a), (r = u);
                break;
            case 2:
                (t = u), (n = a), (r = l);
                break;
            case 3:
                (t = u), (n = c), (r = a);
                break;
            case 4:
                (t = l), (n = u), (r = a);
                break;
            case 5:
                (t = a), (n = u), (r = c);
        }
        return [L(255 * t), L(255 * n), L(255 * r), w(e[3]) ? +e[3] : 1];
    }
    function g(e) {
        let t,
            n,
            r = +e[0] / 255,
            i = +e[1] / 255,
            o = +e[2] / 255,
            u = Math.max(r, i, o),
            c = Math.min(r, i, o),
            l = u,
            f = u - c;
        if (((n = 0 === u ? 0 : f / u), u === c)) t = 0;
        else {
            switch (u) {
                case r:
                    t = (i - o) / f + (i < o ? 6 : 0);
                    break;
                case i:
                    t = (o - r) / f + 2;
                    break;
                case o:
                    t = (r - i) / f + 4;
            }
            t /= 6;
        }
        return [t, n, l, w(e[3]) ? +e[3] : 1];
    }
    function v(e, t) {
        let n = t.touches ? t.touches[0].clientX : t.clientX,
            r = t.touches ? t.touches[0].clientY : t.clientY,
            i = E(e);
        return [n - i[0], r - i[1]];
    }
    function b(e, t) {
        if (e === t) return e;
        for (; (e = e.parentElement) && e !== t; );
        return e;
    }
    function m(e) {
        e && e.preventDefault();
    }
    function C(e, t, n) {
        for (let r = 0, i = t.length; r < i; ++r) e.removeEventListener(t[r], n, !1);
    }
    function k(e, t, n) {
        for (let r = 0, i = t.length; r < i; ++r) e.addEventListener(t[r], n, !1);
    }
    function y(e) {
        return "function" == typeof e;
    }
    function w(e) {
        return void 0 !== e && null !== e;
    }
    function x(e) {
        return "string" == typeof e;
    }
    function E(t) {
        let n, i, o;
        return t === e ? ((n = e.pageXOffset || r.scrollLeft), (i = e.pageYOffset || r.scrollTop)) : ((n = (o = t.getBoundingClientRect()).left), (i = o.top)), [n, i];
    }
    function P(t) {
        return t === e ? [e.innerWidth, e.innerHeight] : [t.offsetWidth, t.offsetHeight];
    }
    function H(e, t, n) {
        e.style[t] = n;
    }
    function M(e, t) {
        return e < t[0] ? t[0] : e > t[1] ? t[1] : e;
    }
    function O(e, t) {
        return parseInt(e, t || 10);
    }
    function X(e, n, r) {
        return (e = t.createElement(e)), n && n.appendChild(e), r && (e.className = r), e;
    }
    function L(e) {
        return Math.round(e);
    }
    function Y(e, t) {
        return e.toString(t);
    }
    ((e) => {
        (e[i] = (e) => {
            if (x(e)) {
                let t = (e = e.trim()).length;
                if ((4 !== t && 7 !== t) || "#" !== e[0]) {
                    if ((5 === t || 9 === t) && "#" === e[0] && /^#([a-f\d]{3,4}){1,2}$/i.test(e))
                        return 5 === t ? [O(e[1] + e[1], 16), O(e[2] + e[2], 16), O(e[3] + e[3], 16), O(e[4] + e[4], 16) / 255] : [O(e[1] + e[2], 16), O(e[3] + e[4], 16), O(e[5] + e[6], 16), O(e[7] + e[8], 16) / 255];
                } else if (/^#([a-f\d]{3}){1,2}$/i.test(e)) return 4 === t ? [O(e[1] + e[1], 16), O(e[2] + e[2], 16), O(e[3] + e[3], 16), 1] : [O(e[1] + e[2], 16), O(e[3] + e[4], 16), O(e[5] + e[6], 16), 1];
                return [0, 0, 0, 1];
            }
            return "#" + ("000000" + Y(+e[2] | (+e[1] << 8) | (+e[0] << 16), 16)).slice(-6) + (w(e[3]) && e[3] < 1 ? Y(L(255 * e[3]) + 65536, 16).substr(-2) : "");
        }),
            (e.instances = {}),
            (e.state = { class: "color-picker", color: i, parent: null }),
            (e.version = "2.1.6");
    })(
        (e.CP = function (n, O) {
            if (!n) return;
            let L = this,
                Y = e.CP,
                I = {},
                N = Object.assign({}, Y.state, x(O) ? { color: O } : O || {}),
                T = N.class,
                W = X("div", 0, T);
            if (n.CP) return L;
            if (!(L instanceof Y)) return new Y(n, O);
            (Y.instances[n.id || n.name || Object.keys(Y.instances).length] = L), (n.CP = 1), (L.visible = !1);
            let $,
                z,
                B,
                D,
                R = t.body,
                S = le(),
                q = g(S),
                A = X("div", W),
                F = X("div", A, T + ":sv"),
                G = X("div", A, T + ":h"),
                J = X("div", A, T + ":a"),
                K = X("div", F),
                Q = (X("div", F), X("div", F), X("i", F)),
                U = (X("div", G), X("i", G)),
                V = X("div", J),
                Z = (X("div", J), X("i", J)),
                _ = 0,
                ee = 0,
                te = 0,
                ne = 0,
                re = 0,
                ie = 0;
            function oe(e) {
                if (I.focus) ue("focus", S);
                else {
                    let t = e.target;
                    n === b(t, n) ? !ce() && $(N.parent) : z();
                }
            }
            function ue(e, t) {
                if (!w(I[e])) return L;
                for (let n = 0, r = I[e].length; n < r; ++n) I[e][n].apply(L, t);
                return L;
            }
            function ce() {
                return W.parentNode;
            }
            function le(e) {
                let t,
                    r = Y[y(Y[N.color]) ? N.color : i];
                return (t = n.dataset.color) ? (w(e) ? (n.dataset.color = r(t)) : r(t)) : (t = n.value) ? (w(e) ? (n.value = r(t)) : r(t)) : (t = n.textContent) ? (w(e) ? (n.textContent = r(t)) : r(t)) : w(e) ? void 0 : [0, 0, 0, 1];
            }
            !(function i(y, x) {
                (q = g((S = le()))),
                    y || ((x || N.parent || R).appendChild(W), (L.visible = !0)),
                    ($ = (e) => (i(0, e), ue("enter", S), L)),
                    (z = () => {
                        let n = ce();
                        return n && (n.removeChild(W), (L.current = null), (L.visible = !1)), C(F, s, ge), C(G, s, ve), C(J, s, be), C(t, a, he), C(t, h, pe), C(e, d, D), ue("exit", S), L;
                    }),
                    (B = (t) => {
                        let i = P(e),
                            u = P(r),
                            f = i[0] - u[0],
                            s = i[1] - r.clientHeight,
                            a = E(e),
                            d = E(n),
                            h = P(W),
                            p = h[0],
                            g = h[1],
                            v = d[0] + a[0],
                            b = d[1] + a[1] + P(n)[1];
                        if ("object" == typeof t) w(t[0]) && (v = t[0]), w(t[1]) && (b = t[1]);
                        else {
                            let e = a[0],
                                t = a[1],
                                n = a[0] + i[0] - p - f,
                                r = a[1] + i[1] - g - s;
                            (v = M(v, [e, n]) >> 0), (b = M(b, [t, r]) >> 0);
                        }
                        return H(W, c, v + l), H(W, o, b + l), ue("fit", S), L;
                    }),
                    (D = () => B());
                let j = P(F),
                    O = j[0],
                    X = j[1],
                    Y = P(Q),
                    T = Y[0],
                    A = Y[1],
                    fe = P(G)[1],
                    se = P(U)[1],
                    ae = P(J)[1],
                    de = P(Z)[1];
                function he(e) {
                    ne &&
                        (function (e) {
                            let t = v(F, e),
                                n = M(t[0], [0, O]),
                                r = M(t[1], [0, X]);
                            (q[1] = 1 - (O - n) / O), (q[2] = (X - r) / X), me();
                        })(e),
                        re &&
                            (function (e) {
                                (q[0] = (fe - M(v(G, e)[1], [0, fe])) / fe), me();
                            })(e),
                        ie &&
                            (function (e) {
                                (q[3] = (ae - M(v(J, e)[1], [0, ae])) / ae), me();
                            })(e),
                        (S = p(q)),
                        (ne || re || ie) && (ue(_ || ee || te ? "start" : "drag", S), ue("change", S)),
                        (_ = ee = te = 0);
                }
                function pe(e) {
                    S = p(q);
                    let t = e.target,
                        r = n === b(t, n),
                        i = W === b(t, W);
                    (L.current = null), r || i ? i && (ne || re || ie) && ue("stop", S) : I.blur ? ue("blur", S) : ce() && z(), (ne = re = ie = 0);
                }
                function ge(e) {
                    (L.current = F), (_ = ne = 1), he(e), m(e);
                }
                function ve(e) {
                    (L.current = G), (ee = re = 1), he(e), m(e);
                }
                function be(e) {
                    (L.current = J), (te = ie = 1), he(e), m(e);
                }
                function me() {
                    var e;
                    w((e = q)[1]) && H(Q, u, O - T / 2 - O * +e[1] + l), w(e[2]) && H(Q, o, X - A / 2 - X * +e[2] + l), w(e[0]) && H(U, o, fe - se / 2 - fe * +e[0] + l), w(e[3]) && H(Z, o, ae - de / 2 - ae * +e[3] + l);
                    let t = p(q),
                        n = p([q[0], 1, 1]);
                    H(K, "backgroundColor", "rgb(" + n[0] + "," + n[1] + "," + n[2] + ")"), H(V, "backgroundImage", "linear-gradient(rgb(" + t[0] + "," + t[1] + "," + t[2] + "),transparent)");
                }
                y
                    ? (k(n, s, oe),
                      f(() => {
                          ue("change", S);
                      }, 1))
                    : (k(F, s, ge), k(G, s, ve), k(J, s, be), k(t, a, he), k(t, h, pe), k(e, d, D), B()),
                    (L.get = () => le()),
                    (L.set = (e, t, n, r) => ((q = g([e, t, n, r])), me(), L)),
                    me();
            })(1),
                (L.color = (e, t, n, r) => Y[y(Y[N.color]) ? N.color : i]([e, t, n, r])),
                (L.current = null),
                (L.enter = $),
                (L.exit = z),
                (L.fire = ue),
                (L.fit = B),
                (L.hooks = I),
                (L.off = function (e, t) {
                    if (!w(e)) return (I = {}), L;
                    if (w(I[e]))
                        if (w(t)) {
                            for (let n = 0, r = I[e].length; n < r; ++n) t === I[e][n] && I[e].splice(n, 1);
                            0 === j && delete I[e];
                        } else delete I[e];
                    return L;
                }),
                (L.on = function (e, t) {
                    return w(I[e]) || (I[e] = []), w(t) && I[e].push(t), L;
                }),
                (L.pop = () => (n.CP ? (delete n.CP, C(n, s, oe), z(), ue("pop", S)) : L)),
                (L.self = W),
                (L.source = n),
                (L.state = N),
                (L.value = (e, t, n, r) => (L.set(e, t, n, r), ue("change", [e, t, n, r])));
        })
    );
})(window, document);

var emojis = {
    "open_hands": "👐",
    "open_hands_tone1": "👐🏻",
    "open_hands_tone2": "👐🏼",
    "open_hands_tone3": "👐🏽",
    "open_hands_tone4": "👐🏾",
    "open_hands_tone5": "👐🏿",
    "raised_hands": "🙌",
    "raised_hands_tone1": "🙌🏻",
    "raised_hands_tone2": "🙌🏼",
    "raised_hands_tone3": "🙌🏽",
    "raised_hands_tone4": "🙌🏾",
    "raised_hands_tone5": "🙌🏿",
    "clap": "👏",
    "clap_tone1": "👏🏻",
    "clap_tone2": "👏🏼",
    "clap_tone3": "👏🏽",
    "clap_tone4": "👏🏾",
    "clap_tone5": "👏🏿",
    "handshake": "🤝",
    "shaking_hands": "🤝",
    "thumbsup": "👍",
    "+1": "👍",
    "thumbup": "👍",
    "thumbsup_tone1": "👍🏻",
    "+1_tone1": "👍🏻",
    "thumbup_tone1": "👍🏻",
    "thumbsup_tone2": "👍🏼",
    "+1_tone2": "👍🏼",
    "thumbup_tone2": "👍🏼",
    "thumbsup_tone3": "👍🏽",
    "+1_tone3": "👍🏽",
    "thumbup_tone3": "👍🏽",
    "thumbsup_tone4": "👍🏾",
    "+1_tone4": "👍🏾",
    "thumbup_tone4": "👍🏾",
    "thumbsup_tone5": "👍🏿",
    "+1_tone5": "👍🏿",
    "thumbup_tone5": "👍🏿",
    "thumbsdown": "👎",
    "-1": "👎",
    "thumbdown": "👎",
    "thumbsdown_tone1": "👎🏻",
    "_1_tone1": "👎🏻",
    "thumbdown_tone1": "👎🏻",
    "thumbsdown_tone2": "👎🏼",
    "_1_tone2": "👎🏼",
    "thumbdown_tone2": "👎🏼",
    "thumbsdown_tone3": "👎🏽",
    "_1_tone3": "👎🏽",
    "thumbdown_tone3": "👎🏽",
    "thumbsdown_tone4": "👎🏾",
    "_1_tone4": "👎🏾",
    "thumbdown_tone4": "👎🏾",
    "thumbsdown_tone5": "👎🏿",
    "_1_tone5": "👎🏿",
    "thumbdown_tone5": "👎🏿",
    "punch": "👊",
    "punch_tone1": "👊🏻",
    "punch_tone2": "👊🏼",
    "punch_tone3": "👊🏽",
    "punch_tone4": "👊🏾",
    "punch_tone5": "👊🏿",
    "fist": "✊",
    "fist_tone1": "✊🏻",
    "fist_tone2": "✊🏼",
    "fist_tone3": "✊🏽",
    "fist_tone4": "✊🏾",
    "fist_tone5": "✊🏿",
    "left_facing_fist": "🤛",
    "left_fist": "🤛",
    "left_facing_fist_tone1": "🤛🏻",
    "left_fist_tone1": "🤛🏻",
    "left_facing_fist_tone2": "🤛🏼",
    "left_fist_tone2": "🤛🏼",
    "left_facing_fist_tone3": "🤛🏽",
    "left_fist_tone3": "🤛🏽",
    "left_facing_fist_tone4": "🤛🏾",
    "left_fist_tone4": "🤛🏾",
    "left_facing_fist_tone5": "🤛🏿",
    "left_fist_tone5": "🤛🏿",
    "right_facing_fist": "🤜",
    "right_fist": "🤜",
    "right_facing_fist_tone1": "🤜🏻",
    "right_fist_tone1": "🤜🏻",
    "right_facing_fist_tone2": "🤜🏼",
    "right_fist_tone2": "🤜🏼",
    "right_facing_fist_tone3": "🤜🏽",
    "right_fist_tone3": "🤜🏽",
    "right_facing_fist_tone4": "🤜🏾",
    "right_fist_tone4": "🤜🏾",
    "right_facing_fist_tone5": "🤜🏿",
    "right_fist_tone5": "🤜🏿",
    "fingers_crossed": "🤞",
    "hand_with_index_and_middle_finger_crossed": "🤞",
    "fingers_crossed_tone1": "🤞🏻",
    "hand_with_index_and_middle_fingers_crossed_tone1": "🤞🏻",
    "fingers_crossed_tone2": "🤞🏼",
    "hand_with_index_and_middle_fingers_crossed_tone2": "🤞🏼",
    "fingers_crossed_tone3": "🤞🏽",
    "hand_with_index_and_middle_fingers_crossed_tone3": "🤞🏽",
    "fingers_crossed_tone4": "🤞🏾",
    "hand_with_index_and_middle_fingers_crossed_tone4": "🤞🏾",
    "fingers_crossed_tone5": "🤞🏿",
    "hand_with_index_and_middle_fingers_crossed_tone5": "🤞🏿",
    "v": "✌️",
    "v_tone1": "✌🏻",
    "v_tone2": "✌🏼",
    "v_tone3": "✌🏽",
    "v_tone4": "✌🏾",
    "v_tone5": "✌🏿",
    "love_you_gesture": "🤟",
    "love_you_gesture_tone1": "🤟🏻",
    "love_you_gesture_light_skin_tone": "🤟🏻",
    "love_you_gesture_tone2": "🤟🏼",
    "love_you_gesture_medium_light_skin_tone": "🤟🏼",
    "love_you_gesture_tone3": "🤟🏽",
    "love_you_gesture_medium_skin_tone": "🤟🏽",
    "love_you_gesture_tone4": "🤟🏾",
    "love_you_gesture_medium_dark_skin_tone": "🤟🏾",
    "love_you_gesture_tone5": "🤟🏿",
    "love_you_gesture_dark_skin_tone": "🤟🏿",
    "metal": "🤘",
    "sign_of_the_horns": "🤘",
    "metal_tone1": "🤘🏻",
    "sign_of_the_horns_tone1": "🤘🏻",
    "metal_tone2": "🤘🏼",
    "sign_of_the_horns_tone2": "🤘🏼",
    "metal_tone3": "🤘🏽",
    "sign_of_the_horns_tone3": "🤘🏽",
    "metal_tone4": "🤘🏾",
    "sign_of_the_horns_tone4": "🤘🏾",
    "metal_tone5": "🤘🏿",
    "sign_of_the_horns_tone5": "🤘🏿",
    "ok_hand": "👌",
    "ok_hand_tone1": "👌🏻",
    "ok_hand_tone2": "👌🏼",
    "ok_hand_tone3": "👌🏽",
    "ok_hand_tone4": "👌🏾",
    "ok_hand_tone5": "👌🏿",
    "pinching_hand": "🤏",
    "pinching_hand_tone1": "🤏🏻",
    "pinching_hand_light_skin_tone": "🤏🏻",
    "pinching_hand_tone2": "🤏🏼",
    "pinching_hand_medium_light_skin_tone": "🤏🏼",
    "pinching_hand_tone3": "🤏🏽",
    "pinching_hand_medium_skin_tone": "🤏🏽",
    "pinching_hand_tone4": "🤏🏾",
    "pinching_hand_medium_dark_skin_tone": "🤏🏾",
    "pinching_hand_tone5": "🤏🏿",
    "pinching_hand_dark_skin_tone": "🤏🏿",
    "pinched_fingers": "🤌",
    "pinched_fingers_tone2": "🤌🏼",
    "pinched_fingers_medium_light_skin_tone": "🤌🏼",
    "pinched_fingers_tone1": "🤌🏻",
    "pinched_fingers_light_skin_tone": "🤌🏻",
    "pinched_fingers_tone3": "🤌🏽",
    "pinched_fingers_medium_skin_tone": "🤌🏽",
    "pinched_fingers_tone4": "🤌🏾",
    "pinched_fingers_medium_dark_skin_tone": "🤌🏾",
    "pinched_fingers_tone5": "🤌🏿",
    "pinched_fingers_dark_skin_tone": "🤌🏿",
    "point_left": "👈",
    "point_left_tone1": "👈🏻",
    "point_left_tone2": "👈🏼",
    "point_left_tone3": "👈🏽",
    "point_left_tone4": "👈🏾",
    "point_left_tone5": "👈🏿",
    "point_right": "👉",
    "point_right_tone1": "👉🏻",
    "point_right_tone2": "👉🏼",
    "point_right_tone3": "👉🏽",
    "point_right_tone4": "👉🏾",
    "point_right_tone5": "👉🏿",
    "point_up_2": "👆",
    "point_up_2_tone1": "👆🏻",
    "point_up_2_tone2": "👆🏼",
    "point_up_2_tone3": "👆🏽",
    "point_up_2_tone4": "👆🏾",
    "point_up_2_tone5": "👆🏿",
    "point_down": "👇",
    "point_down_tone1": "👇🏻",
    "point_down_tone2": "👇🏼",
    "point_down_tone3": "👇🏽",
    "point_down_tone4": "👇🏾",
    "point_down_tone5": "👇🏿",
    "point_up": "☝️",
    "point_up_tone1": "☝🏻",
    "point_up_tone2": "☝🏼",
    "point_up_tone3": "☝🏽",
    "point_up_tone4": "☝🏾",
    "point_up_tone5": "☝🏿",
    "raised_hand": "✋",
    "raised_hand_tone1": "✋🏻",
    "raised_hand_tone2": "✋🏼",
    "raised_hand_tone3": "✋🏽",
    "raised_hand_tone4": "✋🏾",
    "raised_hand_tone5": "✋🏿",
    "raised_back_of_hand": "🤚",
    "back_of_hand": "🤚",
    "raised_back_of_hand_tone1": "🤚🏻",
    "back_of_hand_tone1": "🤚🏻",
    "raised_back_of_hand_tone2": "🤚🏼",
    "back_of_hand_tone2": "🤚🏼",
    "raised_back_of_hand_tone3": "🤚🏽",
    "back_of_hand_tone3": "🤚🏽",
    "raised_back_of_hand_tone4": "🤚🏾",
    "back_of_hand_tone4": "🤚🏾",
    "raised_back_of_hand_tone5": "🤚🏿",
    "back_of_hand_tone5": "🤚🏿",
    "hand_splayed": "🖐️",
    "raised_hand_with_fingers_splayed": "🖐️",
    "hand_splayed_tone1": "🖐🏻",
    "raised_hand_with_fingers_splayed_tone1": "🖐🏻",
    "hand_splayed_tone2": "🖐🏼",
    "raised_hand_with_fingers_splayed_tone2": "🖐🏼",
    "hand_splayed_tone3": "🖐🏽",
    "raised_hand_with_fingers_splayed_tone3": "🖐🏽",
    "hand_splayed_tone4": "🖐🏾",
    "raised_hand_with_fingers_splayed_tone4": "🖐🏾",
    "hand_splayed_tone5": "🖐🏿",
    "raised_hand_with_fingers_splayed_tone5": "🖐🏿",
    "vulcan": "🖖",
    "raised_hand_with_part_between_middle_and_ring_fingers": "🖖",
    "vulcan_tone1": "🖖🏻",
    "raised_hand_with_part_between_middle_and_ring_fingers_tone1": "🖖🏻",
    "vulcan_tone2": "🖖🏼",
    "raised_hand_with_part_between_middle_and_ring_fingers_tone2": "🖖🏼",
    "vulcan_tone3": "🖖🏽",
    "raised_hand_with_part_between_middle_and_ring_fingers_tone3": "🖖🏽",
    "vulcan_tone4": "🖖🏾",
    "raised_hand_with_part_between_middle_and_ring_fingers_tone4": "🖖🏾",
    "vulcan_tone5": "🖖🏿",
    "raised_hand_with_part_between_middle_and_ring_fingers_tone5": "🖖🏿",
    "wave": "👋",
    "wave_tone1": "👋🏻",
    "wave_tone2": "👋🏼",
    "wave_tone3": "👋🏽",
    "wave_tone4": "👋🏾",
    "wave_tone5": "👋🏿",
    "call_me": "🤙",
    "call_me_hand": "🤙",
    "call_me_tone1": "🤙🏻",
    "call_me_hand_tone1": "🤙🏻",
    "call_me_tone2": "🤙🏼",
    "call_me_hand_tone2": "🤙🏼",
    "call_me_tone3": "🤙🏽",
    "call_me_hand_tone3": "🤙🏽",
    "call_me_tone4": "🤙🏾",
    "call_me_hand_tone4": "🤙🏾",
    "call_me_tone5": "🤙🏿",
    "call_me_hand_tone5": "🤙🏿",
    "muscle": "💪",
    "muscle_tone1": "💪🏻",
    "muscle_tone2": "💪🏼",
    "muscle_tone3": "💪🏽",
    "muscle_tone4": "💪🏾",
    "muscle_tone5": "💪🏿",
    "mechanical_arm": "🦾",
    "middle_finger": "🖕",
    "reversed_hand_with_middle_finger_extended": "🖕",
    "middle_finger_tone1": "🖕🏻",
    "reversed_hand_with_middle_finger_extended_tone1": "🖕🏻",
    "middle_finger_tone2": "🖕🏼",
    "reversed_hand_with_middle_finger_extended_tone2": "🖕🏼",
    "middle_finger_tone3": "🖕🏽",
    "reversed_hand_with_middle_finger_extended_tone3": "🖕🏽",
    "middle_finger_tone4": "🖕🏾",
    "reversed_hand_with_middle_finger_extended_tone4": "🖕🏾",
    "middle_finger_tone5": "🖕🏿",
    "reversed_hand_with_middle_finger_extended_tone5": "🖕🏿",
    "writing_hand": "✍️",
    "writing_hand_tone1": "✍🏻",
    "writing_hand_tone2": "✍🏼",
    "writing_hand_tone3": "✍🏽",
    "writing_hand_tone4": "✍🏾",
    "writing_hand_tone5": "✍🏿",
    "pray": "🙏",
    "pray_tone1": "🙏🏻",
    "pray_tone2": "🙏🏼",
    "pray_tone3": "🙏🏽",
    "pray_tone4": "🙏🏾",
    "pray_tone5": "🙏🏿",
    "foot": "🦶",
    "foot_tone1": "🦶🏻",
    "foot_light_skin_tone": "🦶🏻",
    "foot_tone2": "🦶🏼",
    "foot_medium_light_skin_tone": "🦶🏼",
    "foot_tone3": "🦶🏽",
    "foot_medium_skin_tone": "🦶🏽",
    "foot_tone4": "🦶🏾",
    "foot_medium_dark_skin_tone": "🦶🏾",
    "foot_tone5": "🦶🏿",
    "foot_dark_skin_tone": "🦶🏿",
    "leg": "🦵",
    "leg_tone1": "🦵🏻",
    "leg_light_skin_tone": "🦵🏻",
    "leg_tone2": "🦵🏼",
    "leg_medium_light_skin_tone": "🦵🏼",
    "leg_tone3": "🦵🏽",
    "leg_medium_skin_tone": "🦵🏽",
    "leg_tone4": "🦵🏾",
    "leg_medium_dark_skin_tone": "🦵🏾",
    "leg_tone5": "🦵🏿",
    "leg_dark_skin_tone": "🦵🏿",
    "mechanical_leg": "🦿",
    "lipstick": "💄",
    "kiss": "💋",
    "lips": "👄",
    "tooth": "🦷",
    "bone": "🦴",
    "tongue": "👅",
    "ear": "👂",
    "ear_tone1": "👂🏻",
    "ear_tone2": "👂🏼",
    "ear_tone3": "👂🏽",
    "ear_tone4": "👂🏾",
    "ear_tone5": "👂🏿",
    "ear_with_hearing_aid": "🦻",
    "ear_with_hearing_aid_tone1": "🦻🏻",
    "ear_with_hearing_aid_light_skin_tone": "🦻🏻",
    "ear_with_hearing_aid_tone2": "🦻🏼",
    "ear_with_hearing_aid_medium_light_skin_tone": "🦻🏼",
    "ear_with_hearing_aid_tone3": "🦻🏽",
    "ear_with_hearing_aid_medium_skin_tone": "🦻🏽",
    "ear_with_hearing_aid_tone4": "🦻🏾",
    "ear_with_hearing_aid_medium_dark_skin_tone": "🦻🏾",
    "ear_with_hearing_aid_tone5": "🦻🏿",
    "ear_with_hearing_aid_dark_skin_tone": "🦻🏿",
    "nose": "👃",
    "nose_tone1": "👃🏻",
    "nose_tone2": "👃🏼",
    "nose_tone3": "👃🏽",
    "nose_tone4": "👃🏾",
    "nose_tone5": "👃🏿",
    "footprints": "👣",
    "eye": "👁️",
    "eyes": "👀",
    "brain": "🧠",
    "anatomical_heart": "🫀",
    "lungs": "🫁",
    "speaking_head": "🗣️",
    "speaking_head_in_silhouette": "🗣️",
    "bust_in_silhouette": "👤",
    "busts_in_silhouette": "👥",
    "people_hugging": "🫂",
    "baby": "👶",
    "baby_tone1": "👶🏻",
    "baby_tone2": "👶🏼",
    "baby_tone3": "👶🏽",
    "baby_tone4": "👶🏾",
    "baby_tone5": "👶🏿",
    "girl": "👧",
    "girl_tone1": "👧🏻",
    "girl_tone2": "👧🏼",
    "girl_tone3": "👧🏽",
    "girl_tone4": "👧🏾",
    "girl_tone5": "👧🏿",
    "child": "🧒",
    "child_tone1": "🧒🏻",
    "child_light_skin_tone": "🧒🏻",
    "child_tone2": "🧒🏼",
    "child_medium_light_skin_tone": "🧒🏼",
    "child_tone3": "🧒🏽",
    "child_medium_skin_tone": "🧒🏽",
    "child_tone4": "🧒🏾",
    "child_medium_dark_skin_tone": "🧒🏾",
    "child_tone5": "🧒🏿",
    "child_dark_skin_tone": "🧒🏿",
    "boy": "👦",
    "boy_tone1": "👦🏻",
    "boy_tone2": "👦🏼",
    "boy_tone3": "👦🏽",
    "boy_tone4": "👦🏾",
    "boy_tone5": "👦🏿",
    "woman": "👩",
    "woman_tone1": "👩🏻",
    "woman_tone2": "👩🏼",
    "woman_tone3": "👩🏽",
    "woman_tone4": "👩🏾",
    "woman_tone5": "👩🏿",
    "adult": "🧑",
    "adult_tone1": "🧑🏻",
    "adult_light_skin_tone": "🧑🏻",
    "adult_tone2": "🧑🏼",
    "adult_medium_light_skin_tone": "🧑🏼",
    "adult_tone3": "🧑🏽",
    "adult_medium_skin_tone": "🧑🏽",
    "adult_tone4": "🧑🏾",
    "adult_medium_dark_skin_tone": "🧑🏾",
    "adult_tone5": "🧑🏿",
    "adult_dark_skin_tone": "🧑🏿",
    "man": "👨",
    "man_tone1": "👨🏻",
    "man_tone2": "👨🏼",
    "man_tone3": "👨🏽",
    "man_tone4": "👨🏾",
    "man_tone5": "👨🏿",
    "person_curly_hair": "🧑‍🦱",
    "person_tone1_curly_hair": "🧑🏻‍🦱",
    "person_light_skin_tone_curly_hair": "🧑🏻‍🦱",
    "person_tone2_curly_hair": "🧑🏼‍🦱",
    "person_medium_light_skin_tone_curly_hair": "🧑🏼‍🦱",
    "person_tone3_curly_hair": "🧑🏽‍🦱",
    "person_medium_skin_tone_curly_hair": "🧑🏽‍🦱",
    "person_tone4_curly_hair": "🧑🏾‍🦱",
    "person_medium_dark_skin_tone_curly_hair": "🧑🏾‍🦱",
    "person_tone5_curly_hair": "🧑🏿‍🦱",
    "person_dark_skin_tone_curly_hair": "🧑🏿‍🦱",
    "woman_curly_haired": "👩‍🦱",
    "woman_curly_haired_tone1": "👩🏻‍🦱",
    "woman_curly_haired_light_skin_tone": "👩🏻‍🦱",
    "woman_curly_haired_tone2": "👩🏼‍🦱",
    "woman_curly_haired_medium_light_skin_tone": "👩🏼‍🦱",
    "woman_curly_haired_tone3": "👩🏽‍🦱",
    "woman_curly_haired_medium_skin_tone": "👩🏽‍🦱",
    "woman_curly_haired_tone4": "👩🏾‍🦱",
    "woman_curly_haired_medium_dark_skin_tone": "👩🏾‍🦱",
    "woman_curly_haired_tone5": "👩🏿‍🦱",
    "woman_curly_haired_dark_skin_tone": "👩🏿‍🦱",
    "man_curly_haired": "👨‍🦱",
    "man_curly_haired_tone1": "👨🏻‍🦱",
    "man_curly_haired_light_skin_tone": "👨🏻‍🦱",
    "man_curly_haired_tone2": "👨🏼‍🦱",
    "man_curly_haired_medium_light_skin_tone": "👨🏼‍🦱",
    "man_curly_haired_tone3": "👨🏽‍🦱",
    "man_curly_haired_medium_skin_tone": "👨🏽‍🦱",
    "man_curly_haired_tone4": "👨🏾‍🦱",
    "man_curly_haired_medium_dark_skin_tone": "👨🏾‍🦱",
    "man_curly_haired_tone5": "👨🏿‍🦱",
    "man_curly_haired_dark_skin_tone": "👨🏿‍🦱",
    "person_red_hair": "🧑‍🦰",
    "person_tone1_red_hair": "🧑🏻‍🦰",
    "person_light_skin_tone_red_hair": "🧑🏻‍🦰",
    "person_tone2_red_hair": "🧑🏼‍🦰",
    "person_medium_light_skin_tone_red_hair": "🧑🏼‍🦰",
    "person_tone3_red_hair": "🧑🏽‍🦰",
    "person_medium_skin_tone_red_hair": "🧑🏽‍🦰",
    "person_tone4_red_hair": "🧑🏾‍🦰",
    "person_medium_dark_skin_tone_red_hair": "🧑🏾‍🦰",
    "person_tone5_red_hair": "🧑🏿‍🦰",
    "person_dark_skin_tone_red_hair": "🧑🏿‍🦰",
    "woman_red_haired": "👩‍🦰",
    "woman_red_haired_tone1": "👩🏻‍🦰",
    "woman_red_haired_light_skin_tone": "👩🏻‍🦰",
    "woman_red_haired_tone2": "👩🏼‍🦰",
    "woman_red_haired_medium_light_skin_tone": "👩🏼‍🦰",
    "woman_red_haired_tone3": "👩🏽‍🦰",
    "woman_red_haired_medium_skin_tone": "👩🏽‍🦰",
    "woman_red_haired_tone4": "👩🏾‍🦰",
    "woman_red_haired_medium_dark_skin_tone": "👩🏾‍🦰",
    "woman_red_haired_tone5": "👩🏿‍🦰",
    "woman_red_haired_dark_skin_tone": "👩🏿‍🦰",
    "man_red_haired": "👨‍🦰",
    "man_red_haired_tone1": "👨🏻‍🦰",
    "man_red_haired_light_skin_tone": "👨🏻‍🦰",
    "man_red_haired_tone2": "👨🏼‍🦰",
    "man_red_haired_medium_light_skin_tone": "👨🏼‍🦰",
    "man_red_haired_tone3": "👨🏽‍🦰",
    "man_red_haired_medium_skin_tone": "👨🏽‍🦰",
    "man_red_haired_tone4": "👨🏾‍🦰",
    "man_red_haired_medium_dark_skin_tone": "👨🏾‍🦰",
    "man_red_haired_tone5": "👨🏿‍🦰",
    "man_red_haired_dark_skin_tone": "👨🏿‍🦰",
    "blond_haired_woman": "👱‍♀️",
    "blond_haired_woman_tone1": "👱🏻‍♀️",
    "blond_haired_woman_light_skin_tone": "👱🏻‍♀️",
    "blond_haired_woman_tone2": "👱🏼‍♀️",
    "blond_haired_woman_medium_light_skin_tone": "👱🏼‍♀️",
    "blond_haired_woman_tone3": "👱🏽‍♀️",
    "blond_haired_woman_medium_skin_tone": "👱🏽‍♀️",
    "blond_haired_woman_tone4": "👱🏾‍♀️",
    "blond_haired_woman_medium_dark_skin_tone": "👱🏾‍♀️",
    "blond_haired_woman_tone5": "👱🏿‍♀️",
    "blond_haired_woman_dark_skin_tone": "👱🏿‍♀️",
    "blond_haired_person": "👱",
    "person_with_blond_hair": "👱",
    "blond_haired_person_tone1": "👱🏻",
    "person_with_blond_hair_tone1": "👱🏻",
    "blond_haired_person_tone2": "👱🏼",
    "person_with_blond_hair_tone2": "👱🏼",
    "blond_haired_person_tone3": "👱🏽",
    "person_with_blond_hair_tone3": "👱🏽",
    "blond_haired_person_tone4": "👱🏾",
    "person_with_blond_hair_tone4": "👱🏾",
    "blond_haired_person_tone5": "👱🏿",
    "person_with_blond_hair_tone5": "👱🏿",
    "blond_haired_man": "👱‍♂️",
    "blond_haired_man_tone1": "👱🏻‍♂️",
    "blond_haired_man_light_skin_tone": "👱🏻‍♂️",
    "blond_haired_man_tone2": "👱🏼‍♂️",
    "blond_haired_man_medium_light_skin_tone": "👱🏼‍♂️",
    "blond_haired_man_tone3": "👱🏽‍♂️",
    "blond_haired_man_medium_skin_tone": "👱🏽‍♂️",
    "blond_haired_man_tone4": "👱🏾‍♂️",
    "blond_haired_man_medium_dark_skin_tone": "👱🏾‍♂️",
    "blond_haired_man_tone5": "👱🏿‍♂️",
    "blond_haired_man_dark_skin_tone": "👱🏿‍♂️",
    "person_white_hair": "🧑‍🦳",
    "person_tone1_white_hair": "🧑🏻‍🦳",
    "person_light_skin_tone_white_hair": "🧑🏻‍🦳",
    "person_tone2_white_hair": "🧑🏼‍🦳",
    "person_medium_light_skin_tone_white_hair": "🧑🏼‍🦳",
    "person_tone3_white_hair": "🧑🏽‍🦳",
    "person_medium_skin_tone_white_hair": "🧑🏽‍🦳",
    "person_tone4_white_hair": "🧑🏾‍🦳",
    "person_medium_dark_skin_tone_white_hair": "🧑🏾‍🦳",
    "person_tone5_white_hair": "🧑🏿‍🦳",
    "person_dark_skin_tone_white_hair": "🧑🏿‍🦳",
    "woman_white_haired": "👩‍🦳",
    "woman_white_haired_tone1": "👩🏻‍🦳",
    "woman_white_haired_light_skin_tone": "👩🏻‍🦳",
    "woman_white_haired_tone2": "👩🏼‍🦳",
    "woman_white_haired_medium_light_skin_tone": "👩🏼‍🦳",
    "woman_white_haired_tone3": "👩🏽‍🦳",
    "woman_white_haired_medium_skin_tone": "👩🏽‍🦳",
    "woman_white_haired_tone4": "👩🏾‍🦳",
    "woman_white_haired_medium_dark_skin_tone": "👩🏾‍🦳",
    "woman_white_haired_tone5": "👩🏿‍🦳",
    "woman_white_haired_dark_skin_tone": "👩🏿‍🦳",
    "man_white_haired": "👨‍🦳",
    "man_white_haired_tone1": "👨🏻‍🦳",
    "man_white_haired_light_skin_tone": "👨🏻‍🦳",
    "man_white_haired_tone2": "👨🏼‍🦳",
    "man_white_haired_medium_light_skin_tone": "👨🏼‍🦳",
    "man_white_haired_tone3": "👨🏽‍🦳",
    "man_white_haired_medium_skin_tone": "👨🏽‍🦳",
    "man_white_haired_tone4": "👨🏾‍🦳",
    "man_white_haired_medium_dark_skin_tone": "👨🏾‍🦳",
    "man_white_haired_tone5": "👨🏿‍🦳",
    "man_white_haired_dark_skin_tone": "👨🏿‍🦳",
    "person_bald": "🧑‍🦲",
    "person_tone1_bald": "🧑🏻‍🦲",
    "person_light_skin_tone_bald": "🧑🏻‍🦲",
    "person_tone2_bald": "🧑🏼‍🦲",
    "person_medium_light_skin_tone_bald": "🧑🏼‍🦲",
    "person_tone3_bald": "🧑🏽‍🦲",
    "person_medium_skin_tone_bald": "🧑🏽‍🦲",
    "person_tone4_bald": "🧑🏾‍🦲",
    "person_medium_dark_skin_tone_bald": "🧑🏾‍🦲",
    "person_tone5_bald": "🧑🏿‍🦲",
    "person_dark_skin_tone_bald": "🧑🏿‍🦲",
    "woman_bald": "👩‍🦲",
    "woman_bald_tone1": "👩🏻‍🦲",
    "woman_bald_light_skin_tone": "👩🏻‍🦲",
    "woman_bald_tone2": "👩🏼‍🦲",
    "woman_bald_medium_light_skin_tone": "👩🏼‍🦲",
    "woman_bald_tone3": "👩🏽‍🦲",
    "woman_bald_medium_skin_tone": "👩🏽‍🦲",
    "woman_bald_tone4": "👩🏾‍🦲",
    "woman_bald_medium_dark_skin_tone": "👩🏾‍🦲",
    "woman_bald_tone5": "👩🏿‍🦲",
    "woman_bald_dark_skin_tone": "👩🏿‍🦲",
    "man_bald": "👨‍🦲",
    "man_bald_tone1": "👨🏻‍🦲",
    "man_bald_light_skin_tone": "👨🏻‍🦲",
    "man_bald_tone2": "👨🏼‍🦲",
    "man_bald_medium_light_skin_tone": "👨🏼‍🦲",
    "man_bald_tone3": "👨🏽‍🦲",
    "man_bald_medium_skin_tone": "👨🏽‍🦲",
    "man_bald_tone4": "👨🏾‍🦲",
    "man_bald_medium_dark_skin_tone": "👨🏾‍🦲",
    "man_bald_tone5": "👨🏿‍🦲",
    "man_bald_dark_skin_tone": "👨🏿‍🦲",
    "bearded_person": "🧔",
    "bearded_person_tone1": "🧔🏻",
    "bearded_person_light_skin_tone": "🧔🏻",
    "bearded_person_tone2": "🧔🏼",
    "bearded_person_medium_light_skin_tone": "🧔🏼",
    "bearded_person_tone3": "🧔🏽",
    "bearded_person_medium_skin_tone": "🧔🏽",
    "bearded_person_tone4": "🧔🏾",
    "bearded_person_medium_dark_skin_tone": "🧔🏾",
    "bearded_person_tone5": "🧔🏿",
    "bearded_person_dark_skin_tone": "🧔🏿",
    "older_woman": "👵",
    "grandma": "👵",
    "older_woman_tone1": "👵🏻",
    "grandma_tone1": "👵🏻",
    "older_woman_tone2": "👵🏼",
    "grandma_tone2": "👵🏼",
    "older_woman_tone3": "👵🏽",
    "grandma_tone3": "👵🏽",
    "older_woman_tone4": "👵🏾",
    "grandma_tone4": "👵🏾",
    "older_woman_tone5": "👵🏿",
    "grandma_tone5": "👵🏿",
    "older_adult": "🧓",
    "older_adult_tone1": "🧓🏻",
    "older_adult_light_skin_tone": "🧓🏻",
    "older_adult_tone2": "🧓🏼",
    "older_adult_medium_light_skin_tone": "🧓🏼",
    "older_adult_tone3": "🧓🏽",
    "older_adult_medium_skin_tone": "🧓🏽",
    "older_adult_tone4": "🧓🏾",
    "older_adult_medium_dark_skin_tone": "🧓🏾",
    "older_adult_tone5": "🧓🏿",
    "older_adult_dark_skin_tone": "🧓🏿",
    "older_man": "👴",
    "older_man_tone1": "👴🏻",
    "older_man_tone2": "👴🏼",
    "older_man_tone3": "👴🏽",
    "older_man_tone4": "👴🏾",
    "older_man_tone5": "👴🏿",
    "man_with_chinese_cap": "👲",
    "man_with_gua_pi_mao": "👲",
    "man_with_chinese_cap_tone1": "👲🏻",
    "man_with_gua_pi_mao_tone1": "👲🏻",
    "man_with_chinese_cap_tone2": "👲🏼",
    "man_with_gua_pi_mao_tone2": "👲🏼",
    "man_with_chinese_cap_tone3": "👲🏽",
    "man_with_gua_pi_mao_tone3": "👲🏽",
    "man_with_chinese_cap_tone4": "👲🏾",
    "man_with_gua_pi_mao_tone4": "👲🏾",
    "man_with_chinese_cap_tone5": "👲🏿",
    "man_with_gua_pi_mao_tone5": "👲🏿",
    "person_wearing_turban": "👳",
    "man_with_turban": "👳",
    "person_wearing_turban_tone1": "👳🏻",
    "man_with_turban_tone1": "👳🏻",
    "person_wearing_turban_tone2": "👳🏼",
    "man_with_turban_tone2": "👳🏼",
    "person_wearing_turban_tone3": "👳🏽",
    "man_with_turban_tone3": "👳🏽",
    "person_wearing_turban_tone4": "👳🏾",
    "man_with_turban_tone4": "👳🏾",
    "person_wearing_turban_tone5": "👳🏿",
    "man_with_turban_tone5": "👳🏿",
    "woman_wearing_turban": "👳‍♀️",
    "woman_wearing_turban_tone1": "👳🏻‍♀️",
    "woman_wearing_turban_light_skin_tone": "👳🏻‍♀️",
    "woman_wearing_turban_tone2": "👳🏼‍♀️",
    "woman_wearing_turban_medium_light_skin_tone": "👳🏼‍♀️",
    "woman_wearing_turban_tone3": "👳🏽‍♀️",
    "woman_wearing_turban_medium_skin_tone": "👳🏽‍♀️",
    "woman_wearing_turban_tone4": "👳🏾‍♀️",
    "woman_wearing_turban_medium_dark_skin_tone": "👳🏾‍♀️",
    "woman_wearing_turban_tone5": "👳🏿‍♀️",
    "woman_wearing_turban_dark_skin_tone": "👳🏿‍♀️",
    "man_wearing_turban": "👳‍♂️",
    "man_wearing_turban_tone1": "👳🏻‍♂️",
    "man_wearing_turban_light_skin_tone": "👳🏻‍♂️",
    "man_wearing_turban_tone2": "👳🏼‍♂️",
    "man_wearing_turban_medium_light_skin_tone": "👳🏼‍♂️",
    "man_wearing_turban_tone3": "👳🏽‍♂️",
    "man_wearing_turban_medium_skin_tone": "👳🏽‍♂️",
    "man_wearing_turban_tone4": "👳🏾‍♂️",
    "man_wearing_turban_medium_dark_skin_tone": "👳🏾‍♂️",
    "man_wearing_turban_tone5": "👳🏿‍♂️",
    "man_wearing_turban_dark_skin_tone": "👳🏿‍♂️",
    "woman_with_headscarf": "🧕",
    "woman_with_headscarf_tone1": "🧕🏻",
    "woman_with_headscarf_light_skin_tone": "🧕🏻",
    "woman_with_headscarf_tone2": "🧕🏼",
    "woman_with_headscarf_medium_light_skin_tone": "🧕🏼",
    "woman_with_headscarf_tone3": "🧕🏽",
    "woman_with_headscarf_medium_skin_tone": "🧕🏽",
    "woman_with_headscarf_tone4": "🧕🏾",
    "woman_with_headscarf_medium_dark_skin_tone": "🧕🏾",
    "woman_with_headscarf_tone5": "🧕🏿",
    "woman_with_headscarf_dark_skin_tone": "🧕🏿",
    "police_officer": "👮",
    "cop": "👮",
    "police_officer_tone1": "👮🏻",
    "cop_tone1": "👮🏻",
    "police_officer_tone2": "👮🏼",
    "cop_tone2": "👮🏼",
    "police_officer_tone3": "👮🏽",
    "cop_tone3": "👮🏽",
    "police_officer_tone4": "👮🏾",
    "cop_tone4": "👮🏾",
    "police_officer_tone5": "👮🏿",
    "cop_tone5": "👮🏿",
    "woman_police_officer": "👮‍♀️",
    "woman_police_officer_tone1": "👮🏻‍♀️",
    "woman_police_officer_light_skin_tone": "👮🏻‍♀️",
    "woman_police_officer_tone2": "👮🏼‍♀️",
    "woman_police_officer_medium_light_skin_tone": "👮🏼‍♀️",
    "woman_police_officer_tone3": "👮🏽‍♀️",
    "woman_police_officer_medium_skin_tone": "👮🏽‍♀️",
    "woman_police_officer_tone4": "👮🏾‍♀️",
    "woman_police_officer_medium_dark_skin_tone": "👮🏾‍♀️",
    "woman_police_officer_tone5": "👮🏿‍♀️",
    "woman_police_officer_dark_skin_tone": "👮🏿‍♀️",
    "man_police_officer": "👮‍♂️",
    "man_police_officer_tone1": "👮🏻‍♂️",
    "man_police_officer_light_skin_tone": "👮🏻‍♂️",
    "man_police_officer_tone2": "👮🏼‍♂️",
    "man_police_officer_medium_light_skin_tone": "👮🏼‍♂️",
    "man_police_officer_tone3": "👮🏽‍♂️",
    "man_police_officer_medium_skin_tone": "👮🏽‍♂️",
    "man_police_officer_tone4": "👮🏾‍♂️",
    "man_police_officer_medium_dark_skin_tone": "👮🏾‍♂️",
    "man_police_officer_tone5": "👮🏿‍♂️",
    "man_police_officer_dark_skin_tone": "👮🏿‍♂️",
    "construction_worker": "👷",
    "construction_worker_tone1": "👷🏻",
    "construction_worker_tone2": "👷🏼",
    "construction_worker_tone3": "👷🏽",
    "construction_worker_tone4": "👷🏾",
    "construction_worker_tone5": "👷🏿",
    "woman_construction_worker": "👷‍♀️",
    "woman_construction_worker_tone1": "👷🏻‍♀️",
    "woman_construction_worker_light_skin_tone": "👷🏻‍♀️",
    "woman_construction_worker_tone2": "👷🏼‍♀️",
    "woman_construction_worker_medium_light_skin_tone": "👷🏼‍♀️",
    "woman_construction_worker_tone3": "👷🏽‍♀️",
    "woman_construction_worker_medium_skin_tone": "👷🏽‍♀️",
    "woman_construction_worker_tone4": "👷🏾‍♀️",
    "woman_construction_worker_medium_dark_skin_tone": "👷🏾‍♀️",
    "woman_construction_worker_tone5": "👷🏿‍♀️",
    "woman_construction_worker_dark_skin_tone": "👷🏿‍♀️",
    "man_construction_worker": "👷‍♂️",
    "man_construction_worker_tone1": "👷🏻‍♂️",
    "man_construction_worker_light_skin_tone": "👷🏻‍♂️",
    "man_construction_worker_tone2": "👷🏼‍♂️",
    "man_construction_worker_medium_light_skin_tone": "👷🏼‍♂️",
    "man_construction_worker_tone3": "👷🏽‍♂️",
    "man_construction_worker_medium_skin_tone": "👷🏽‍♂️",
    "man_construction_worker_tone4": "👷🏾‍♂️",
    "man_construction_worker_medium_dark_skin_tone": "👷🏾‍♂️",
    "man_construction_worker_tone5": "👷🏿‍♂️",
    "man_construction_worker_dark_skin_tone": "👷🏿‍♂️",
    "guard": "💂",
    "guardsman": "💂",
    "guard_tone1": "💂🏻",
    "guardsman_tone1": "💂🏻",
    "guard_tone2": "💂🏼",
    "guardsman_tone2": "💂🏼",
    "guard_tone3": "💂🏽",
    "guardsman_tone3": "💂🏽",
    "guard_tone4": "💂🏾",
    "guardsman_tone4": "💂🏾",
    "guard_tone5": "💂🏿",
    "guardsman_tone5": "💂🏿",
    "woman_guard": "💂‍♀️",
    "woman_guard_tone1": "💂🏻‍♀️",
    "woman_guard_light_skin_tone": "💂🏻‍♀️",
    "woman_guard_tone2": "💂🏼‍♀️",
    "woman_guard_medium_light_skin_tone": "💂🏼‍♀️",
    "woman_guard_tone3": "💂🏽‍♀️",
    "woman_guard_medium_skin_tone": "💂🏽‍♀️",
    "woman_guard_tone4": "💂🏾‍♀️",
    "woman_guard_medium_dark_skin_tone": "💂🏾‍♀️",
    "woman_guard_tone5": "💂🏿‍♀️",
    "woman_guard_dark_skin_tone": "💂🏿‍♀️",
    "man_guard": "💂‍♂️",
    "man_guard_tone1": "💂🏻‍♂️",
    "man_guard_light_skin_tone": "💂🏻‍♂️",
    "man_guard_tone2": "💂🏼‍♂️",
    "man_guard_medium_light_skin_tone": "💂🏼‍♂️",
    "man_guard_tone3": "💂🏽‍♂️",
    "man_guard_medium_skin_tone": "💂🏽‍♂️",
    "man_guard_tone4": "💂🏾‍♂️",
    "man_guard_medium_dark_skin_tone": "💂🏾‍♂️",
    "man_guard_tone5": "💂🏿‍♂️",
    "man_guard_dark_skin_tone": "💂🏿‍♂️",
    "detective": "🕵️",
    "spy": "🕵️",
    "sleuth_or_spy": "🕵️",
    "detective_tone1": "🕵🏻",
    "spy_tone1": "🕵🏻",
    "sleuth_or_spy_tone1": "🕵🏻",
    "detective_tone2": "🕵🏼",
    "spy_tone2": "🕵🏼",
    "sleuth_or_spy_tone2": "🕵🏼",
    "detective_tone3": "🕵🏽",
    "spy_tone3": "🕵🏽",
    "sleuth_or_spy_tone3": "🕵🏽",
    "detective_tone4": "🕵🏾",
    "spy_tone4": "🕵🏾",
    "sleuth_or_spy_tone4": "🕵🏾",
    "detective_tone5": "🕵🏿",
    "spy_tone5": "🕵🏿",
    "sleuth_or_spy_tone5": "🕵🏿",
    "woman_detective": "🕵️‍♀️",
    "woman_detective_tone1": "🕵🏻‍♀️",
    "woman_detective_light_skin_tone": "🕵🏻‍♀️",
    "woman_detective_tone2": "🕵🏼‍♀️",
    "woman_detective_medium_light_skin_tone": "🕵🏼‍♀️",
    "woman_detective_tone3": "🕵🏽‍♀️",
    "woman_detective_medium_skin_tone": "🕵🏽‍♀️",
    "woman_detective_tone4": "🕵🏾‍♀️",
    "woman_detective_medium_dark_skin_tone": "🕵🏾‍♀️",
    "woman_detective_tone5": "🕵🏿‍♀️",
    "woman_detective_dark_skin_tone": "🕵🏿‍♀️",
    "man_detective": "🕵️‍♂️",
    "man_detective_tone1": "🕵🏻‍♂️",
    "man_detective_light_skin_tone": "🕵🏻‍♂️",
    "man_detective_tone2": "🕵🏼‍♂️",
    "man_detective_medium_light_skin_tone": "🕵🏼‍♂️",
    "man_detective_tone3": "🕵🏽‍♂️",
    "man_detective_medium_skin_tone": "🕵🏽‍♂️",
    "man_detective_tone4": "🕵🏾‍♂️",
    "man_detective_medium_dark_skin_tone": "🕵🏾‍♂️",
    "man_detective_tone5": "🕵🏿‍♂️",
    "man_detective_dark_skin_tone": "🕵🏿‍♂️",
    "health_worker": "🧑‍⚕️",
    "health_worker_tone1": "🧑🏻‍⚕️",
    "health_worker_light_skin_tone": "🧑🏻‍⚕️",
    "health_worker_tone2": "🧑🏼‍⚕️",
    "health_worker_medium_light_skin_tone": "🧑🏼‍⚕️",
    "health_worker_tone3": "🧑🏽‍⚕️",
    "health_worker_medium_skin_tone": "🧑🏽‍⚕️",
    "health_worker_tone4": "🧑🏾‍⚕️",
    "health_worker_medium_dark_skin_tone": "🧑🏾‍⚕️",
    "health_worker_tone5": "🧑🏿‍⚕️",
    "health_worker_dark_skin_tone": "🧑🏿‍⚕️",
    "woman_health_worker": "👩‍⚕️",
    "woman_health_worker_tone1": "👩🏻‍⚕️",
    "woman_health_worker_light_skin_tone": "👩🏻‍⚕️",
    "woman_health_worker_tone2": "👩🏼‍⚕️",
    "woman_health_worker_medium_light_skin_tone": "👩🏼‍⚕️",
    "woman_health_worker_tone3": "👩🏽‍⚕️",
    "woman_health_worker_medium_skin_tone": "👩🏽‍⚕️",
    "woman_health_worker_tone4": "👩🏾‍⚕️",
    "woman_health_worker_medium_dark_skin_tone": "👩🏾‍⚕️",
    "woman_health_worker_tone5": "👩🏿‍⚕️",
    "woman_health_worker_dark_skin_tone": "👩🏿‍⚕️",
    "man_health_worker": "👨‍⚕️",
    "man_health_worker_tone1": "👨🏻‍⚕️",
    "man_health_worker_light_skin_tone": "👨🏻‍⚕️",
    "man_health_worker_tone2": "👨🏼‍⚕️",
    "man_health_worker_medium_light_skin_tone": "👨🏼‍⚕️",
    "man_health_worker_tone3": "👨🏽‍⚕️",
    "man_health_worker_medium_skin_tone": "👨🏽‍⚕️",
    "man_health_worker_tone4": "👨🏾‍⚕️",
    "man_health_worker_medium_dark_skin_tone": "👨🏾‍⚕️",
    "man_health_worker_tone5": "👨🏿‍⚕️",
    "man_health_worker_dark_skin_tone": "👨🏿‍⚕️",
    "farmer": "🧑‍🌾",
    "farmer_tone1": "🧑🏻‍🌾",
    "farmer_light_skin_tone": "🧑🏻‍🌾",
    "farmer_tone2": "🧑🏼‍🌾",
    "farmer_medium_light_skin_tone": "🧑🏼‍🌾",
    "farmer_tone3": "🧑🏽‍🌾",
    "farmer_medium_skin_tone": "🧑🏽‍🌾",
    "farmer_tone4": "🧑🏾‍🌾",
    "farmer_medium_dark_skin_tone": "🧑🏾‍🌾",
    "farmer_tone5": "🧑🏿‍🌾",
    "farmer_dark_skin_tone": "🧑🏿‍🌾",
    "woman_farmer": "👩‍🌾",
    "woman_farmer_tone1": "👩🏻‍🌾",
    "woman_farmer_light_skin_tone": "👩🏻‍🌾",
    "woman_farmer_tone2": "👩🏼‍🌾",
    "woman_farmer_medium_light_skin_tone": "👩🏼‍🌾",
    "woman_farmer_tone3": "👩🏽‍🌾",
    "woman_farmer_medium_skin_tone": "👩🏽‍🌾",
    "woman_farmer_tone4": "👩🏾‍🌾",
    "woman_farmer_medium_dark_skin_tone": "👩🏾‍🌾",
    "woman_farmer_tone5": "👩🏿‍🌾",
    "woman_farmer_dark_skin_tone": "👩🏿‍🌾",
    "man_farmer": "👨‍🌾",
    "man_farmer_tone1": "👨🏻‍🌾",
    "man_farmer_light_skin_tone": "👨🏻‍🌾",
    "man_farmer_tone2": "👨🏼‍🌾",
    "man_farmer_medium_light_skin_tone": "👨🏼‍🌾",
    "man_farmer_tone3": "👨🏽‍🌾",
    "man_farmer_medium_skin_tone": "👨🏽‍🌾",
    "man_farmer_tone4": "👨🏾‍🌾",
    "man_farmer_medium_dark_skin_tone": "👨🏾‍🌾",
    "man_farmer_tone5": "👨🏿‍🌾",
    "man_farmer_dark_skin_tone": "👨🏿‍🌾",
    "cook": "🧑‍🍳",
    "cook_tone1": "🧑🏻‍🍳",
    "cook_light_skin_tone": "🧑🏻‍🍳",
    "cook_tone2": "🧑🏼‍🍳",
    "cook_medium_light_skin_tone": "🧑🏼‍🍳",
    "cook_tone3": "🧑🏽‍🍳",
    "cook_medium_skin_tone": "🧑🏽‍🍳",
    "cook_tone4": "🧑🏾‍🍳",
    "cook_medium_dark_skin_tone": "🧑🏾‍🍳",
    "cook_tone5": "🧑🏿‍🍳",
    "cook_dark_skin_tone": "🧑🏿‍🍳",
    "woman_cook": "👩‍🍳",
    "woman_cook_tone1": "👩🏻‍🍳",
    "woman_cook_light_skin_tone": "👩🏻‍🍳",
    "woman_cook_tone2": "👩🏼‍🍳",
    "woman_cook_medium_light_skin_tone": "👩🏼‍🍳",
    "woman_cook_tone3": "👩🏽‍🍳",
    "woman_cook_medium_skin_tone": "👩🏽‍🍳",
    "woman_cook_tone4": "👩🏾‍🍳",
    "woman_cook_medium_dark_skin_tone": "👩🏾‍🍳",
    "woman_cook_tone5": "👩🏿‍🍳",
    "woman_cook_dark_skin_tone": "👩🏿‍🍳",
    "man_cook": "👨‍🍳",
    "man_cook_tone1": "👨🏻‍🍳",
    "man_cook_light_skin_tone": "👨🏻‍🍳",
    "man_cook_tone2": "👨🏼‍🍳",
    "man_cook_medium_light_skin_tone": "👨🏼‍🍳",
    "man_cook_tone3": "👨🏽‍🍳",
    "man_cook_medium_skin_tone": "👨🏽‍🍳",
    "man_cook_tone4": "👨🏾‍🍳",
    "man_cook_medium_dark_skin_tone": "👨🏾‍🍳",
    "man_cook_tone5": "👨🏿‍🍳",
    "man_cook_dark_skin_tone": "👨🏿‍🍳",
    "student": "🧑‍🎓",
    "student_tone1": "🧑🏻‍🎓",
    "student_light_skin_tone": "🧑🏻‍🎓",
    "student_tone2": "🧑🏼‍🎓",
    "student_medium_light_skin_tone": "🧑🏼‍🎓",
    "student_tone3": "🧑🏽‍🎓",
    "student_medium_skin_tone": "🧑🏽‍🎓",
    "student_tone4": "🧑🏾‍🎓",
    "student_medium_dark_skin_tone": "🧑🏾‍🎓",
    "student_tone5": "🧑🏿‍🎓",
    "student_dark_skin_tone": "🧑🏿‍🎓",
    "woman_student": "👩‍🎓",
    "woman_student_tone1": "👩🏻‍🎓",
    "woman_student_light_skin_tone": "👩🏻‍🎓",
    "woman_student_tone2": "👩🏼‍🎓",
    "woman_student_medium_light_skin_tone": "👩🏼‍🎓",
    "woman_student_tone3": "👩🏽‍🎓",
    "woman_student_medium_skin_tone": "👩🏽‍🎓",
    "woman_student_tone4": "👩🏾‍🎓",
    "woman_student_medium_dark_skin_tone": "👩🏾‍🎓",
    "woman_student_tone5": "👩🏿‍🎓",
    "woman_student_dark_skin_tone": "👩🏿‍🎓",
    "man_student": "👨‍🎓",
    "man_student_tone1": "👨🏻‍🎓",
    "man_student_light_skin_tone": "👨🏻‍🎓",
    "man_student_tone2": "👨🏼‍🎓",
    "man_student_medium_light_skin_tone": "👨🏼‍🎓",
    "man_student_tone3": "👨🏽‍🎓",
    "man_student_medium_skin_tone": "👨🏽‍🎓",
    "man_student_tone4": "👨🏾‍🎓",
    "man_student_medium_dark_skin_tone": "👨🏾‍🎓",
    "man_student_tone5": "👨🏿‍🎓",
    "man_student_dark_skin_tone": "👨🏿‍🎓",
    "singer": "🧑‍🎤",
    "singer_tone1": "🧑🏻‍🎤",
    "singer_light_skin_tone": "🧑🏻‍🎤",
    "singer_tone2": "🧑🏼‍🎤",
    "singer_medium_light_skin_tone": "🧑🏼‍🎤",
    "singer_tone3": "🧑🏽‍🎤",
    "singer_medium_skin_tone": "🧑🏽‍🎤",
    "singer_tone4": "🧑🏾‍🎤",
    "singer_medium_dark_skin_tone": "🧑🏾‍🎤",
    "singer_tone5": "🧑🏿‍🎤",
    "singer_dark_skin_tone": "🧑🏿‍🎤",
    "woman_singer": "👩‍🎤",
    "woman_singer_tone1": "👩🏻‍🎤",
    "woman_singer_light_skin_tone": "👩🏻‍🎤",
    "woman_singer_tone2": "👩🏼‍🎤",
    "woman_singer_medium_light_skin_tone": "👩🏼‍🎤",
    "woman_singer_tone3": "👩🏽‍🎤",
    "woman_singer_medium_skin_tone": "👩🏽‍🎤",
    "woman_singer_tone4": "👩🏾‍🎤",
    "woman_singer_medium_dark_skin_tone": "👩🏾‍🎤",
    "woman_singer_tone5": "👩🏿‍🎤",
    "woman_singer_dark_skin_tone": "👩🏿‍🎤",
    "man_singer": "👨‍🎤",
    "man_singer_tone1": "👨🏻‍🎤",
    "man_singer_light_skin_tone": "👨🏻‍🎤",
    "man_singer_tone2": "👨🏼‍🎤",
    "man_singer_medium_light_skin_tone": "👨🏼‍🎤",
    "man_singer_tone3": "👨🏽‍🎤",
    "man_singer_medium_skin_tone": "👨🏽‍🎤",
    "man_singer_tone4": "👨🏾‍🎤",
    "man_singer_medium_dark_skin_tone": "👨🏾‍🎤",
    "man_singer_tone5": "👨🏿‍🎤",
    "man_singer_dark_skin_tone": "👨🏿‍🎤",
    "teacher": "🧑‍🏫",
    "teacher_tone1": "🧑🏻‍🏫",
    "teacher_light_skin_tone": "🧑🏻‍🏫",
    "teacher_tone2": "🧑🏼‍🏫",
    "teacher_medium_light_skin_tone": "🧑🏼‍🏫",
    "teacher_tone3": "🧑🏽‍🏫",
    "teacher_medium_skin_tone": "🧑🏽‍🏫",
    "teacher_tone4": "🧑🏾‍🏫",
    "teacher_medium_dark_skin_tone": "🧑🏾‍🏫",
    "teacher_tone5": "🧑🏿‍🏫",
    "teacher_dark_skin_tone": "🧑🏿‍🏫",
    "woman_teacher": "👩‍🏫",
    "woman_teacher_tone1": "👩🏻‍🏫",
    "woman_teacher_light_skin_tone": "👩🏻‍🏫",
    "woman_teacher_tone2": "👩🏼‍🏫",
    "woman_teacher_medium_light_skin_tone": "👩🏼‍🏫",
    "woman_teacher_tone3": "👩🏽‍🏫",
    "woman_teacher_medium_skin_tone": "👩🏽‍🏫",
    "woman_teacher_tone4": "👩🏾‍🏫",
    "woman_teacher_medium_dark_skin_tone": "👩🏾‍🏫",
    "woman_teacher_tone5": "👩🏿‍🏫",
    "woman_teacher_dark_skin_tone": "👩🏿‍🏫",
    "man_teacher": "👨‍🏫",
    "man_teacher_tone1": "👨🏻‍🏫",
    "man_teacher_light_skin_tone": "👨🏻‍🏫",
    "man_teacher_tone2": "👨🏼‍🏫",
    "man_teacher_medium_light_skin_tone": "👨🏼‍🏫",
    "man_teacher_tone3": "👨🏽‍🏫",
    "man_teacher_medium_skin_tone": "👨🏽‍🏫",
    "man_teacher_tone4": "👨🏾‍🏫",
    "man_teacher_medium_dark_skin_tone": "👨🏾‍🏫",
    "man_teacher_tone5": "👨🏿‍🏫",
    "man_teacher_dark_skin_tone": "👨🏿‍🏫",
    "factory_worker": "🧑‍🏭",
    "factory_worker_tone1": "🧑🏻‍🏭",
    "factory_worker_light_skin_tone": "🧑🏻‍🏭",
    "factory_worker_tone2": "🧑🏼‍🏭",
    "factory_worker_medium_light_skin_tone": "🧑🏼‍🏭",
    "factory_worker_tone3": "🧑🏽‍🏭",
    "factory_worker_medium_skin_tone": "🧑🏽‍🏭",
    "factory_worker_tone4": "🧑🏾‍🏭",
    "factory_worker_medium_dark_skin_tone": "🧑🏾‍🏭",
    "factory_worker_tone5": "🧑🏿‍🏭",
    "factory_worker_dark_skin_tone": "🧑🏿‍🏭",
    "woman_factory_worker": "👩‍🏭",
    "woman_factory_worker_tone1": "👩🏻‍🏭",
    "woman_factory_worker_light_skin_tone": "👩🏻‍🏭",
    "woman_factory_worker_tone2": "👩🏼‍🏭",
    "woman_factory_worker_medium_light_skin_tone": "👩🏼‍🏭",
    "woman_factory_worker_tone3": "👩🏽‍🏭",
    "woman_factory_worker_medium_skin_tone": "👩🏽‍🏭",
    "woman_factory_worker_tone4": "👩🏾‍🏭",
    "woman_factory_worker_medium_dark_skin_tone": "👩🏾‍🏭",
    "woman_factory_worker_tone5": "👩🏿‍🏭",
    "woman_factory_worker_dark_skin_tone": "👩🏿‍🏭",
    "man_factory_worker": "👨‍🏭",
    "man_factory_worker_tone1": "👨🏻‍🏭",
    "man_factory_worker_light_skin_tone": "👨🏻‍🏭",
    "man_factory_worker_tone2": "👨🏼‍🏭",
    "man_factory_worker_medium_light_skin_tone": "👨🏼‍🏭",
    "man_factory_worker_tone3": "👨🏽‍🏭",
    "man_factory_worker_medium_skin_tone": "👨🏽‍🏭",
    "man_factory_worker_tone4": "👨🏾‍🏭",
    "man_factory_worker_medium_dark_skin_tone": "👨🏾‍🏭",
    "man_factory_worker_tone5": "👨🏿‍🏭",
    "man_factory_worker_dark_skin_tone": "👨🏿‍🏭",
    "technologist": "🧑‍💻",
    "technologist_tone1": "🧑🏻‍💻",
    "technologist_light_skin_tone": "🧑🏻‍💻",
    "technologist_tone2": "🧑🏼‍💻",
    "technologist_medium_light_skin_tone": "🧑🏼‍💻",
    "technologist_tone3": "🧑🏽‍💻",
    "technologist_medium_skin_tone": "🧑🏽‍💻",
    "technologist_tone4": "🧑🏾‍💻",
    "technologist_medium_dark_skin_tone": "🧑🏾‍💻",
    "technologist_tone5": "🧑🏿‍💻",
    "technologist_dark_skin_tone": "🧑🏿‍💻",
    "woman_technologist": "👩‍💻",
    "woman_technologist_tone1": "👩🏻‍💻",
    "woman_technologist_light_skin_tone": "👩🏻‍💻",
    "woman_technologist_tone2": "👩🏼‍💻",
    "woman_technologist_medium_light_skin_tone": "👩🏼‍💻",
    "woman_technologist_tone3": "👩🏽‍💻",
    "woman_technologist_medium_skin_tone": "👩🏽‍💻",
    "woman_technologist_tone4": "👩🏾‍💻",
    "woman_technologist_medium_dark_skin_tone": "👩🏾‍💻",
    "woman_technologist_tone5": "👩🏿‍💻",
    "woman_technologist_dark_skin_tone": "👩🏿‍💻",
    "man_technologist": "👨‍💻",
    "man_technologist_tone1": "👨🏻‍💻",
    "man_technologist_light_skin_tone": "👨🏻‍💻",
    "man_technologist_tone2": "👨🏼‍💻",
    "man_technologist_medium_light_skin_tone": "👨🏼‍💻",
    "man_technologist_tone3": "👨🏽‍💻",
    "man_technologist_medium_skin_tone": "👨🏽‍💻",
    "man_technologist_tone4": "👨🏾‍💻",
    "man_technologist_medium_dark_skin_tone": "👨🏾‍💻",
    "man_technologist_tone5": "👨🏿‍💻",
    "man_technologist_dark_skin_tone": "👨🏿‍💻",
    "office_worker": "🧑‍💼",
    "office_worker_tone1": "🧑🏻‍💼",
    "office_worker_light_skin_tone": "🧑🏻‍💼",
    "office_worker_tone2": "🧑🏼‍💼",
    "office_worker_medium_light_skin_tone": "🧑🏼‍💼",
    "office_worker_tone3": "🧑🏽‍💼",
    "office_worker_medium_skin_tone": "🧑🏽‍💼",
    "office_worker_tone4": "🧑🏾‍💼",
    "office_worker_medium_dark_skin_tone": "🧑🏾‍💼",
    "office_worker_tone5": "🧑🏿‍💼",
    "office_worker_dark_skin_tone": "🧑🏿‍💼",
    "woman_office_worker": "👩‍💼",
    "woman_office_worker_tone1": "👩🏻‍💼",
    "woman_office_worker_light_skin_tone": "👩🏻‍💼",
    "woman_office_worker_tone2": "👩🏼‍💼",
    "woman_office_worker_medium_light_skin_tone": "👩🏼‍💼",
    "woman_office_worker_tone3": "👩🏽‍💼",
    "woman_office_worker_medium_skin_tone": "👩🏽‍💼",
    "woman_office_worker_tone4": "👩🏾‍💼",
    "woman_office_worker_medium_dark_skin_tone": "👩🏾‍💼",
    "woman_office_worker_tone5": "👩🏿‍💼",
    "woman_office_worker_dark_skin_tone": "👩🏿‍💼",
    "man_office_worker": "👨‍💼",
    "man_office_worker_tone1": "👨🏻‍💼",
    "man_office_worker_light_skin_tone": "👨🏻‍💼",
    "man_office_worker_tone2": "👨🏼‍💼",
    "man_office_worker_medium_light_skin_tone": "👨🏼‍💼",
    "man_office_worker_tone3": "👨🏽‍💼",
    "man_office_worker_medium_skin_tone": "👨🏽‍💼",
    "man_office_worker_tone4": "👨🏾‍💼",
    "man_office_worker_medium_dark_skin_tone": "👨🏾‍💼",
    "man_office_worker_tone5": "👨🏿‍💼",
    "man_office_worker_dark_skin_tone": "👨🏿‍💼",
    "mechanic": "🧑‍🔧",
    "mechanic_tone1": "🧑🏻‍🔧",
    "mechanic_light_skin_tone": "🧑🏻‍🔧",
    "mechanic_tone2": "🧑🏼‍🔧",
    "mechanic_medium_light_skin_tone": "🧑🏼‍🔧",
    "mechanic_tone3": "🧑🏽‍🔧",
    "mechanic_medium_skin_tone": "🧑🏽‍🔧",
    "mechanic_tone4": "🧑🏾‍🔧",
    "mechanic_medium_dark_skin_tone": "🧑🏾‍🔧",
    "mechanic_tone5": "🧑🏿‍🔧",
    "mechanic_dark_skin_tone": "🧑🏿‍🔧",
    "woman_mechanic": "👩‍🔧",
    "woman_mechanic_tone1": "👩🏻‍🔧",
    "woman_mechanic_light_skin_tone": "👩🏻‍🔧",
    "woman_mechanic_tone2": "👩🏼‍🔧",
    "woman_mechanic_medium_light_skin_tone": "👩🏼‍🔧",
    "woman_mechanic_tone3": "👩🏽‍🔧",
    "woman_mechanic_medium_skin_tone": "👩🏽‍🔧",
    "woman_mechanic_tone4": "👩🏾‍🔧",
    "woman_mechanic_medium_dark_skin_tone": "👩🏾‍🔧",
    "woman_mechanic_tone5": "👩🏿‍🔧",
    "woman_mechanic_dark_skin_tone": "👩🏿‍🔧",
    "man_mechanic": "👨‍🔧",
    "man_mechanic_tone1": "👨🏻‍🔧",
    "man_mechanic_light_skin_tone": "👨🏻‍🔧",
    "man_mechanic_tone2": "👨🏼‍🔧",
    "man_mechanic_medium_light_skin_tone": "👨🏼‍🔧",
    "man_mechanic_tone3": "👨🏽‍🔧",
    "man_mechanic_medium_skin_tone": "👨🏽‍🔧",
    "man_mechanic_tone4": "👨🏾‍🔧",
    "man_mechanic_medium_dark_skin_tone": "👨🏾‍🔧",
    "man_mechanic_tone5": "👨🏿‍🔧",
    "man_mechanic_dark_skin_tone": "👨🏿‍🔧",
    "scientist": "🧑‍🔬",
    "scientist_tone1": "🧑🏻‍🔬",
    "scientist_light_skin_tone": "🧑🏻‍🔬",
    "scientist_tone2": "🧑🏼‍🔬",
    "scientist_medium_light_skin_tone": "🧑🏼‍🔬",
    "scientist_tone3": "🧑🏽‍🔬",
    "scientist_medium_skin_tone": "🧑🏽‍🔬",
    "scientist_tone4": "🧑🏾‍🔬",
    "scientist_medium_dark_skin_tone": "🧑🏾‍🔬",
    "scientist_tone5": "🧑🏿‍🔬",
    "scientist_dark_skin_tone": "🧑🏿‍🔬",
    "woman_scientist": "👩‍🔬",
    "woman_scientist_tone1": "👩🏻‍🔬",
    "woman_scientist_light_skin_tone": "👩🏻‍🔬",
    "woman_scientist_tone2": "👩🏼‍🔬",
    "woman_scientist_medium_light_skin_tone": "👩🏼‍🔬",
    "woman_scientist_tone3": "👩🏽‍🔬",
    "woman_scientist_medium_skin_tone": "👩🏽‍🔬",
    "woman_scientist_tone4": "👩🏾‍🔬",
    "woman_scientist_medium_dark_skin_tone": "👩🏾‍🔬",
    "woman_scientist_tone5": "👩🏿‍🔬",
    "woman_scientist_dark_skin_tone": "👩🏿‍🔬",
    "man_scientist": "👨‍🔬",
    "man_scientist_tone1": "👨🏻‍🔬",
    "man_scientist_light_skin_tone": "👨🏻‍🔬",
    "man_scientist_tone2": "👨🏼‍🔬",
    "man_scientist_medium_light_skin_tone": "👨🏼‍🔬",
    "man_scientist_tone3": "👨🏽‍🔬",
    "man_scientist_medium_skin_tone": "👨🏽‍🔬",
    "man_scientist_tone4": "👨🏾‍🔬",
    "man_scientist_medium_dark_skin_tone": "👨🏾‍🔬",
    "man_scientist_tone5": "👨🏿‍🔬",
    "man_scientist_dark_skin_tone": "👨🏿‍🔬",
    "artist": "🧑‍🎨",
    "artist_tone1": "🧑🏻‍🎨",
    "artist_light_skin_tone": "🧑🏻‍🎨",
    "artist_tone2": "🧑🏼‍🎨",
    "artist_medium_light_skin_tone": "🧑🏼‍🎨",
    "artist_tone3": "🧑🏽‍🎨",
    "artist_medium_skin_tone": "🧑🏽‍🎨",
    "artist_tone4": "🧑🏾‍🎨",
    "artist_medium_dark_skin_tone": "🧑🏾‍🎨",
    "artist_tone5": "🧑🏿‍🎨",
    "artist_dark_skin_tone": "🧑🏿‍🎨",
    "woman_artist": "👩‍🎨",
    "woman_artist_tone1": "👩🏻‍🎨",
    "woman_artist_light_skin_tone": "👩🏻‍🎨",
    "woman_artist_tone2": "👩🏼‍🎨",
    "woman_artist_medium_light_skin_tone": "👩🏼‍🎨",
    "woman_artist_tone3": "👩🏽‍🎨",
    "woman_artist_medium_skin_tone": "👩🏽‍🎨",
    "woman_artist_tone4": "👩🏾‍🎨",
    "woman_artist_medium_dark_skin_tone": "👩🏾‍🎨",
    "woman_artist_tone5": "👩🏿‍🎨",
    "woman_artist_dark_skin_tone": "👩🏿‍🎨",
    "man_artist": "👨‍🎨",
    "man_artist_tone1": "👨🏻‍🎨",
    "man_artist_light_skin_tone": "👨🏻‍🎨",
    "man_artist_tone2": "👨🏼‍🎨",
    "man_artist_medium_light_skin_tone": "👨🏼‍🎨",
    "man_artist_tone3": "👨🏽‍🎨",
    "man_artist_medium_skin_tone": "👨🏽‍🎨",
    "man_artist_tone4": "👨🏾‍🎨",
    "man_artist_medium_dark_skin_tone": "👨🏾‍🎨",
    "man_artist_tone5": "👨🏿‍🎨",
    "man_artist_dark_skin_tone": "👨🏿‍🎨",
    "firefighter": "🧑‍🚒",
    "firefighter_tone1": "🧑🏻‍🚒",
    "firefighter_light_skin_tone": "🧑🏻‍🚒",
    "firefighter_tone2": "🧑🏼‍🚒",
    "firefighter_medium_light_skin_tone": "🧑🏼‍🚒",
    "firefighter_tone3": "🧑🏽‍🚒",
    "firefighter_medium_skin_tone": "🧑🏽‍🚒",
    "firefighter_tone4": "🧑🏾‍🚒",
    "firefighter_medium_dark_skin_tone": "🧑🏾‍🚒",
    "firefighter_tone5": "🧑🏿‍🚒",
    "firefighter_dark_skin_tone": "🧑🏿‍🚒",
    "woman_firefighter": "👩‍🚒",
    "woman_firefighter_tone1": "👩🏻‍🚒",
    "woman_firefighter_light_skin_tone": "👩🏻‍🚒",
    "woman_firefighter_tone2": "👩🏼‍🚒",
    "woman_firefighter_medium_light_skin_tone": "👩🏼‍🚒",
    "woman_firefighter_tone3": "👩🏽‍🚒",
    "woman_firefighter_medium_skin_tone": "👩🏽‍🚒",
    "woman_firefighter_tone4": "👩🏾‍🚒",
    "woman_firefighter_medium_dark_skin_tone": "👩🏾‍🚒",
    "woman_firefighter_tone5": "👩🏿‍🚒",
    "woman_firefighter_dark_skin_tone": "👩🏿‍🚒",
    "man_firefighter": "👨‍🚒",
    "man_firefighter_tone1": "👨🏻‍🚒",
    "man_firefighter_light_skin_tone": "👨🏻‍🚒",
    "man_firefighter_tone2": "👨🏼‍🚒",
    "man_firefighter_medium_light_skin_tone": "👨🏼‍🚒",
    "man_firefighter_tone3": "👨🏽‍🚒",
    "man_firefighter_medium_skin_tone": "👨🏽‍🚒",
    "man_firefighter_tone4": "👨🏾‍🚒",
    "man_firefighter_medium_dark_skin_tone": "👨🏾‍🚒",
    "man_firefighter_tone5": "👨🏿‍🚒",
    "man_firefighter_dark_skin_tone": "👨🏿‍🚒",
    "pilot": "🧑‍✈️",
    "pilot_tone1": "🧑🏻‍✈️",
    "pilot_light_skin_tone": "🧑🏻‍✈️",
    "pilot_tone2": "🧑🏼‍✈️",
    "pilot_medium_light_skin_tone": "🧑🏼‍✈️",
    "pilot_tone3": "🧑🏽‍✈️",
    "pilot_medium_skin_tone": "🧑🏽‍✈️",
    "pilot_tone4": "🧑🏾‍✈️",
    "pilot_medium_dark_skin_tone": "🧑🏾‍✈️",
    "pilot_tone5": "🧑🏿‍✈️",
    "pilot_dark_skin_tone": "🧑🏿‍✈️",
    "woman_pilot": "👩‍✈️",
    "woman_pilot_tone1": "👩🏻‍✈️",
    "woman_pilot_light_skin_tone": "👩🏻‍✈️",
    "woman_pilot_tone2": "👩🏼‍✈️",
    "woman_pilot_medium_light_skin_tone": "👩🏼‍✈️",
    "woman_pilot_tone3": "👩🏽‍✈️",
    "woman_pilot_medium_skin_tone": "👩🏽‍✈️",
    "woman_pilot_tone4": "👩🏾‍✈️",
    "woman_pilot_medium_dark_skin_tone": "👩🏾‍✈️",
    "woman_pilot_tone5": "👩🏿‍✈️",
    "woman_pilot_dark_skin_tone": "👩🏿‍✈️",
    "man_pilot": "👨‍✈️",
    "man_pilot_tone1": "👨🏻‍✈️",
    "man_pilot_light_skin_tone": "👨🏻‍✈️",
    "man_pilot_tone2": "👨🏼‍✈️",
    "man_pilot_medium_light_skin_tone": "👨🏼‍✈️",
    "man_pilot_tone3": "👨🏽‍✈️",
    "man_pilot_medium_skin_tone": "👨🏽‍✈️",
    "man_pilot_tone4": "👨🏾‍✈️",
    "man_pilot_medium_dark_skin_tone": "👨🏾‍✈️",
    "man_pilot_tone5": "👨🏿‍✈️",
    "man_pilot_dark_skin_tone": "👨🏿‍✈️",
    "astronaut": "🧑‍🚀",
    "astronaut_tone1": "🧑🏻‍🚀",
    "astronaut_light_skin_tone": "🧑🏻‍🚀",
    "astronaut_tone2": "🧑🏼‍🚀",
    "astronaut_medium_light_skin_tone": "🧑🏼‍🚀",
    "astronaut_tone3": "🧑🏽‍🚀",
    "astronaut_medium_skin_tone": "🧑🏽‍🚀",
    "astronaut_tone4": "🧑🏾‍🚀",
    "astronaut_medium_dark_skin_tone": "🧑🏾‍🚀",
    "astronaut_tone5": "🧑🏿‍🚀",
    "astronaut_dark_skin_tone": "🧑🏿‍🚀",
    "woman_astronaut": "👩‍🚀",
    "woman_astronaut_tone1": "👩🏻‍🚀",
    "woman_astronaut_light_skin_tone": "👩🏻‍🚀",
    "woman_astronaut_tone2": "👩🏼‍🚀",
    "woman_astronaut_medium_light_skin_tone": "👩🏼‍🚀",
    "woman_astronaut_tone3": "👩🏽‍🚀",
    "woman_astronaut_medium_skin_tone": "👩🏽‍🚀",
    "woman_astronaut_tone4": "👩🏾‍🚀",
    "woman_astronaut_medium_dark_skin_tone": "👩🏾‍🚀",
    "woman_astronaut_tone5": "👩🏿‍🚀",
    "woman_astronaut_dark_skin_tone": "👩🏿‍🚀",
    "man_astronaut": "👨‍🚀",
    "man_astronaut_tone1": "👨🏻‍🚀",
    "man_astronaut_light_skin_tone": "👨🏻‍🚀",
    "man_astronaut_tone2": "👨🏼‍🚀",
    "man_astronaut_medium_light_skin_tone": "👨🏼‍🚀",
    "man_astronaut_tone3": "👨🏽‍🚀",
    "man_astronaut_medium_skin_tone": "👨🏽‍🚀",
    "man_astronaut_tone4": "👨🏾‍🚀",
    "man_astronaut_medium_dark_skin_tone": "👨🏾‍🚀",
    "man_astronaut_tone5": "👨🏿‍🚀",
    "man_astronaut_dark_skin_tone": "👨🏿‍🚀",
    "judge": "🧑‍⚖️",
    "judge_tone1": "🧑🏻‍⚖️",
    "judge_light_skin_tone": "🧑🏻‍⚖️",
    "judge_tone2": "🧑🏼‍⚖️",
    "judge_medium_light_skin_tone": "🧑🏼‍⚖️",
    "judge_tone3": "🧑🏽‍⚖️",
    "judge_medium_skin_tone": "🧑🏽‍⚖️",
    "judge_tone4": "🧑🏾‍⚖️",
    "judge_medium_dark_skin_tone": "🧑🏾‍⚖️",
    "judge_tone5": "🧑🏿‍⚖️",
    "judge_dark_skin_tone": "🧑🏿‍⚖️",
    "woman_judge": "👩‍⚖️",
    "woman_judge_tone1": "👩🏻‍⚖️",
    "woman_judge_light_skin_tone": "👩🏻‍⚖️",
    "woman_judge_tone2": "👩🏼‍⚖️",
    "woman_judge_medium_light_skin_tone": "👩🏼‍⚖️",
    "woman_judge_tone3": "👩🏽‍⚖️",
    "woman_judge_medium_skin_tone": "👩🏽‍⚖️",
    "woman_judge_tone4": "👩🏾‍⚖️",
    "woman_judge_medium_dark_skin_tone": "👩🏾‍⚖️",
    "woman_judge_tone5": "👩🏿‍⚖️",
    "woman_judge_dark_skin_tone": "👩🏿‍⚖️",
    "man_judge": "👨‍⚖️",
    "man_judge_tone1": "👨🏻‍⚖️",
    "man_judge_light_skin_tone": "👨🏻‍⚖️",
    "man_judge_tone2": "👨🏼‍⚖️",
    "man_judge_medium_light_skin_tone": "👨🏼‍⚖️",
    "man_judge_tone3": "👨🏽‍⚖️",
    "man_judge_medium_skin_tone": "👨🏽‍⚖️",
    "man_judge_tone4": "👨🏾‍⚖️",
    "man_judge_medium_dark_skin_tone": "👨🏾‍⚖️",
    "man_judge_tone5": "👨🏿‍⚖️",
    "man_judge_dark_skin_tone": "👨🏿‍⚖️",
    "person_with_veil": "👰",
    "person_with_veil_tone1": "👰🏻",
    "person_with_veil_tone2": "👰🏼",
    "person_with_veil_tone3": "👰🏽",
    "person_with_veil_tone4": "👰🏾",
    "person_with_veil_tone5": "👰🏿",
    "woman_with_veil": "👰‍♀️",
    "bride_with_veil": "👰‍♀️",
    "woman_with_veil_tone1": "👰🏻‍♀️",
    "woman_with_veil_light_skin_tone": "👰🏻‍♀️",
    "woman_with_veil_tone2": "👰🏼‍♀️",
    "woman_with_veil_medium_light_skin_tone": "👰🏼‍♀️",
    "woman_with_veil_tone3": "👰🏽‍♀️",
    "woman_with_veil_medium_skin_tone": "👰🏽‍♀️",
    "woman_with_veil_tone4": "👰🏾‍♀️",
    "woman_with_veil_medium_dark_skin_tone": "👰🏾‍♀️",
    "woman_with_veil_tone5": "👰🏿‍♀️",
    "woman_with_veil_dark_skin_tone": "👰🏿‍♀️",
    "man_with_veil": "👰‍♂️",
    "man_with_veil_tone1": "👰🏻‍♂️",
    "man_with_veil_light_skin_tone": "👰🏻‍♂️",
    "man_with_veil_tone2": "👰🏼‍♂️",
    "man_with_veil_medium_light_skin_tone": "👰🏼‍♂️",
    "man_with_veil_tone3": "👰🏽‍♂️",
    "man_with_veil_medium_skin_tone": "👰🏽‍♂️",
    "man_with_veil_tone4": "👰🏾‍♂️",
    "man_with_veil_medium_dark_skin_tone": "👰🏾‍♂️",
    "man_with_veil_tone5": "👰🏿‍♂️",
    "man_with_veil_dark_skin_tone": "👰🏿‍♂️",
    "person_in_tuxedo": "🤵",
    "person_in_tuxedo_tone1": "🤵🏻",
    "tuxedo_tone1": "🤵🏻",
    "person_in_tuxedo_tone2": "🤵🏼",
    "tuxedo_tone2": "🤵🏼",
    "person_in_tuxedo_tone3": "🤵🏽",
    "tuxedo_tone3": "🤵🏽",
    "person_in_tuxedo_tone4": "🤵🏾",
    "tuxedo_tone4": "🤵🏾",
    "person_in_tuxedo_tone5": "🤵🏿",
    "tuxedo_tone5": "🤵🏿",
    "woman_in_tuxedo": "🤵‍♀️",
    "woman_in_tuxedo_tone1": "🤵🏻‍♀️",
    "woman_in_tuxedo_light_skin_tone": "🤵🏻‍♀️",
    "woman_in_tuxedo_tone2": "🤵🏼‍♀️",
    "woman_in_tuxedo_medium_light_skin_tone": "🤵🏼‍♀️",
    "woman_in_tuxedo_tone3": "🤵🏽‍♀️",
    "woman_in_tuxedo_medium_skin_tone": "🤵🏽‍♀️",
    "woman_in_tuxedo_tone4": "🤵🏾‍♀️",
    "woman_in_tuxedo_medium_dark_skin_tone": "🤵🏾‍♀️",
    "woman_in_tuxedo_tone5": "🤵🏿‍♀️",
    "woman_in_tuxedo_dark_skin_tone": "🤵🏿‍♀️",
    "man_in_tuxedo": "🤵‍♂️",
    "man_in_tuxedo_tone1": "🤵🏻‍♂️",
    "man_in_tuxedo_light_skin_tone": "🤵🏻‍♂️",
    "man_in_tuxedo_tone2": "🤵🏼‍♂️",
    "man_in_tuxedo_medium_light_skin_tone": "🤵🏼‍♂️",
    "man_in_tuxedo_tone3": "🤵🏽‍♂️",
    "man_in_tuxedo_medium_skin_tone": "🤵🏽‍♂️",
    "man_in_tuxedo_tone4": "🤵🏾‍♂️",
    "man_in_tuxedo_medium_dark_skin_tone": "🤵🏾‍♂️",
    "man_in_tuxedo_tone5": "🤵🏿‍♂️",
    "man_in_tuxedo_dark_skin_tone": "🤵🏿‍♂️",
    "princess": "👸",
    "princess_tone1": "👸🏻",
    "princess_tone2": "👸🏼",
    "princess_tone3": "👸🏽",
    "princess_tone4": "👸🏾",
    "princess_tone5": "👸🏿",
    "prince": "🤴",
    "prince_tone1": "🤴🏻",
    "prince_tone2": "🤴🏼",
    "prince_tone3": "🤴🏽",
    "prince_tone4": "🤴🏾",
    "prince_tone5": "🤴🏿",
    "superhero": "🦸",
    "superhero_tone1": "🦸🏻",
    "superhero_light_skin_tone": "🦸🏻",
    "superhero_tone2": "🦸🏼",
    "superhero_medium_light_skin_tone": "🦸🏼",
    "superhero_tone3": "🦸🏽",
    "superhero_medium_skin_tone": "🦸🏽",
    "superhero_tone4": "🦸🏾",
    "superhero_medium_dark_skin_tone": "🦸🏾",
    "superhero_tone5": "🦸🏿",
    "superhero_dark_skin_tone": "🦸🏿",
    "woman_superhero": "🦸‍♀️",
    "woman_superhero_tone1": "🦸🏻‍♀️",
    "woman_superhero_light_skin_tone": "🦸🏻‍♀️",
    "woman_superhero_tone2": "🦸🏼‍♀️",
    "woman_superhero_medium_light_skin_tone": "🦸🏼‍♀️",
    "woman_superhero_tone3": "🦸🏽‍♀️",
    "woman_superhero_medium_skin_tone": "🦸🏽‍♀️",
    "woman_superhero_tone4": "🦸🏾‍♀️",
    "woman_superhero_medium_dark_skin_tone": "🦸🏾‍♀️",
    "woman_superhero_tone5": "🦸🏿‍♀️",
    "woman_superhero_dark_skin_tone": "🦸🏿‍♀️",
    "man_superhero": "🦸‍♂️",
    "man_superhero_tone1": "🦸🏻‍♂️",
    "man_superhero_light_skin_tone": "🦸🏻‍♂️",
    "man_superhero_tone2": "🦸🏼‍♂️",
    "man_superhero_medium_light_skin_tone": "🦸🏼‍♂️",
    "man_superhero_tone3": "🦸🏽‍♂️",
    "man_superhero_medium_skin_tone": "🦸🏽‍♂️",
    "man_superhero_tone4": "🦸🏾‍♂️",
    "man_superhero_medium_dark_skin_tone": "🦸🏾‍♂️",
    "man_superhero_tone5": "🦸🏿‍♂️",
    "man_superhero_dark_skin_tone": "🦸🏿‍♂️",
    "supervillain": "🦹",
    "supervillain_tone1": "🦹🏻",
    "supervillain_light_skin_tone": "🦹🏻",
    "supervillain_tone2": "🦹🏼",
    "supervillain_medium_light_skin_tone": "🦹🏼",
    "supervillain_tone3": "🦹🏽",
    "supervillain_medium_skin_tone": "🦹🏽",
    "supervillain_tone4": "🦹🏾",
    "supervillain_medium_dark_skin_tone": "🦹🏾",
    "supervillain_tone5": "🦹🏿",
    "supervillain_dark_skin_tone": "🦹🏿",
    "woman_supervillain": "🦹‍♀️",
    "woman_supervillain_tone1": "🦹🏻‍♀️",
    "woman_supervillain_light_skin_tone": "🦹🏻‍♀️",
    "woman_supervillain_tone2": "🦹🏼‍♀️",
    "woman_supervillain_medium_light_skin_tone": "🦹🏼‍♀️",
    "woman_supervillain_tone3": "🦹🏽‍♀️",
    "woman_supervillain_medium_skin_tone": "🦹🏽‍♀️",
    "woman_supervillain_tone4": "🦹🏾‍♀️",
    "woman_supervillain_medium_dark_skin_tone": "🦹🏾‍♀️",
    "woman_supervillain_tone5": "🦹🏿‍♀️",
    "woman_supervillain_dark_skin_tone": "🦹🏿‍♀️",
    "man_supervillain": "🦹‍♂️",
    "man_supervillain_tone1": "🦹🏻‍♂️",
    "man_supervillain_light_skin_tone": "🦹🏻‍♂️",
    "man_supervillain_tone2": "🦹🏼‍♂️",
    "man_supervillain_medium_light_skin_tone": "🦹🏼‍♂️",
    "man_supervillain_tone3": "🦹🏽‍♂️",
    "man_supervillain_medium_skin_tone": "🦹🏽‍♂️",
    "man_supervillain_tone4": "🦹🏾‍♂️",
    "man_supervillain_medium_dark_skin_tone": "🦹🏾‍♂️",
    "man_supervillain_tone5": "🦹🏿‍♂️",
    "man_supervillain_dark_skin_tone": "🦹🏿‍♂️",
    "ninja": "🥷",
    "ninja_tone1": "🥷🏻",
    "ninja_light_skin_tone": "🥷🏻",
    "ninja_tone2": "🥷🏼",
    "ninja_medium_light_skin_tone": "🥷🏼",
    "ninja_tone3": "🥷🏽",
    "ninja_medium_skin_tone": "🥷🏽",
    "ninja_tone4": "🥷🏾",
    "ninja_medium_dark_skin_tone": "🥷🏾",
    "ninja_tone5": "🥷🏿",
    "ninja_dark_skin_tone": "🥷🏿",
    "mx_claus": "🧑‍🎄",
    "mx_claus_tone1": "🧑🏻‍🎄",
    "mx_claus_light_skin_tone": "🧑🏻‍🎄",
    "mx_claus_tone2": "🧑🏼‍🎄",
    "mx_claus_medium_light_skin_tone": "🧑🏼‍🎄",
    "mx_claus_tone3": "🧑🏽‍🎄",
    "mx_claus_medium_skin_tone": "🧑🏽‍🎄",
    "mx_claus_tone4": "🧑🏾‍🎄",
    "mx_claus_medium_dark_skin_tone": "🧑🏾‍🎄",
    "mx_claus_tone5": "🧑🏿‍🎄",
    "mx_claus_dark_skin_tone": "🧑🏿‍🎄",
    "mrs_claus": "🤶",
    "mother_christmas": "🤶",
    "mrs_claus_tone1": "🤶🏻",
    "mother_christmas_tone1": "🤶🏻",
    "mrs_claus_tone2": "🤶🏼",
    "mother_christmas_tone2": "🤶🏼",
    "mrs_claus_tone3": "🤶🏽",
    "mother_christmas_tone3": "🤶🏽",
    "mrs_claus_tone4": "🤶🏾",
    "mother_christmas_tone4": "🤶🏾",
    "mrs_claus_tone5": "🤶🏿",
    "mother_christmas_tone5": "🤶🏿",
    "santa": "🎅",
    "santa_tone1": "🎅🏻",
    "santa_tone2": "🎅🏼",
    "santa_tone3": "🎅🏽",
    "santa_tone4": "🎅🏾",
    "santa_tone5": "🎅🏿",
    "mage": "🧙",
    "mage_tone1": "🧙🏻",
    "mage_light_skin_tone": "🧙🏻",
    "mage_tone2": "🧙🏼",
    "mage_medium_light_skin_tone": "🧙🏼",
    "mage_tone3": "🧙🏽",
    "mage_medium_skin_tone": "🧙🏽",
    "mage_tone4": "🧙🏾",
    "mage_medium_dark_skin_tone": "🧙🏾",
    "mage_tone5": "🧙🏿",
    "mage_dark_skin_tone": "🧙🏿",
    "woman_mage": "🧙‍♀️",
    "woman_mage_tone1": "🧙🏻‍♀️",
    "woman_mage_light_skin_tone": "🧙🏻‍♀️",
    "woman_mage_tone2": "🧙🏼‍♀️",
    "woman_mage_medium_light_skin_tone": "🧙🏼‍♀️",
    "woman_mage_tone3": "🧙🏽‍♀️",
    "woman_mage_medium_skin_tone": "🧙🏽‍♀️",
    "woman_mage_tone4": "🧙🏾‍♀️",
    "woman_mage_medium_dark_skin_tone": "🧙🏾‍♀️",
    "woman_mage_tone5": "🧙🏿‍♀️",
    "woman_mage_dark_skin_tone": "🧙🏿‍♀️",
    "man_mage": "🧙‍♂️",
    "man_mage_tone1": "🧙🏻‍♂️",
    "man_mage_light_skin_tone": "🧙🏻‍♂️",
    "man_mage_tone2": "🧙🏼‍♂️",
    "man_mage_medium_light_skin_tone": "🧙🏼‍♂️",
    "man_mage_tone3": "🧙🏽‍♂️",
    "man_mage_medium_skin_tone": "🧙🏽‍♂️",
    "man_mage_tone4": "🧙🏾‍♂️",
    "man_mage_medium_dark_skin_tone": "🧙🏾‍♂️",
    "man_mage_tone5": "🧙🏿‍♂️",
    "man_mage_dark_skin_tone": "🧙🏿‍♂️",
    "elf": "🧝",
    "elf_tone1": "🧝🏻",
    "elf_light_skin_tone": "🧝🏻",
    "elf_tone2": "🧝🏼",
    "elf_medium_light_skin_tone": "🧝🏼",
    "elf_tone3": "🧝🏽",
    "elf_medium_skin_tone": "🧝🏽",
    "elf_tone4": "🧝🏾",
    "elf_medium_dark_skin_tone": "🧝🏾",
    "elf_tone5": "🧝🏿",
    "elf_dark_skin_tone": "🧝🏿",
    "woman_elf": "🧝‍♀️",
    "woman_elf_tone1": "🧝🏻‍♀️",
    "woman_elf_light_skin_tone": "🧝🏻‍♀️",
    "woman_elf_tone2": "🧝🏼‍♀️",
    "woman_elf_medium_light_skin_tone": "🧝🏼‍♀️",
    "woman_elf_tone3": "🧝🏽‍♀️",
    "woman_elf_medium_skin_tone": "🧝🏽‍♀️",
    "woman_elf_tone4": "🧝🏾‍♀️",
    "woman_elf_medium_dark_skin_tone": "🧝🏾‍♀️",
    "woman_elf_tone5": "🧝🏿‍♀️",
    "woman_elf_dark_skin_tone": "🧝🏿‍♀️",
    "man_elf": "🧝‍♂️",
    "man_elf_tone1": "🧝🏻‍♂️",
    "man_elf_light_skin_tone": "🧝🏻‍♂️",
    "man_elf_tone2": "🧝🏼‍♂️",
    "man_elf_medium_light_skin_tone": "🧝🏼‍♂️",
    "man_elf_tone3": "🧝🏽‍♂️",
    "man_elf_medium_skin_tone": "🧝🏽‍♂️",
    "man_elf_tone4": "🧝🏾‍♂️",
    "man_elf_medium_dark_skin_tone": "🧝🏾‍♂️",
    "man_elf_tone5": "🧝🏿‍♂️",
    "man_elf_dark_skin_tone": "🧝🏿‍♂️",
    "vampire": "🧛",
    "vampire_tone1": "🧛🏻",
    "vampire_light_skin_tone": "🧛🏻",
    "vampire_tone2": "🧛🏼",
    "vampire_medium_light_skin_tone": "🧛🏼",
    "vampire_tone3": "🧛🏽",
    "vampire_medium_skin_tone": "🧛🏽",
    "vampire_tone4": "🧛🏾",
    "vampire_medium_dark_skin_tone": "🧛🏾",
    "vampire_tone5": "🧛🏿",
    "vampire_dark_skin_tone": "🧛🏿",
    "woman_vampire": "🧛‍♀️",
    "woman_vampire_tone1": "🧛🏻‍♀️",
    "woman_vampire_light_skin_tone": "🧛🏻‍♀️",
    "woman_vampire_tone2": "🧛🏼‍♀️",
    "woman_vampire_medium_light_skin_tone": "🧛🏼‍♀️",
    "woman_vampire_tone3": "🧛🏽‍♀️",
    "woman_vampire_medium_skin_tone": "🧛🏽‍♀️",
    "woman_vampire_tone4": "🧛🏾‍♀️",
    "woman_vampire_medium_dark_skin_tone": "🧛🏾‍♀️",
    "woman_vampire_tone5": "🧛🏿‍♀️",
    "woman_vampire_dark_skin_tone": "🧛🏿‍♀️",
    "man_vampire": "🧛‍♂️",
    "man_vampire_tone1": "🧛🏻‍♂️",
    "man_vampire_light_skin_tone": "🧛🏻‍♂️",
    "man_vampire_tone2": "🧛🏼‍♂️",
    "man_vampire_medium_light_skin_tone": "🧛🏼‍♂️",
    "man_vampire_tone3": "🧛🏽‍♂️",
    "man_vampire_medium_skin_tone": "🧛🏽‍♂️",
    "man_vampire_tone4": "🧛🏾‍♂️",
    "man_vampire_medium_dark_skin_tone": "🧛🏾‍♂️",
    "man_vampire_tone5": "🧛🏿‍♂️",
    "man_vampire_dark_skin_tone": "🧛🏿‍♂️",
    "zombie": "🧟",
    "woman_zombie": "🧟‍♀️",
    "man_zombie": "🧟‍♂️",
    "genie": "🧞",
    "woman_genie": "🧞‍♀️",
    "man_genie": "🧞‍♂️",
    "merperson": "🧜",
    "merperson_tone1": "🧜🏻",
    "merperson_light_skin_tone": "🧜🏻",
    "merperson_tone2": "🧜🏼",
    "merperson_medium_light_skin_tone": "🧜🏼",
    "merperson_tone3": "🧜🏽",
    "merperson_medium_skin_tone": "🧜🏽",
    "merperson_tone4": "🧜🏾",
    "merperson_medium_dark_skin_tone": "🧜🏾",
    "merperson_tone5": "🧜🏿",
    "merperson_dark_skin_tone": "🧜🏿",
    "mermaid": "🧜‍♀️",
    "mermaid_tone1": "🧜🏻‍♀️",
    "mermaid_light_skin_tone": "🧜🏻‍♀️",
    "mermaid_tone2": "🧜🏼‍♀️",
    "mermaid_medium_light_skin_tone": "🧜🏼‍♀️",
    "mermaid_tone3": "🧜🏽‍♀️",
    "mermaid_medium_skin_tone": "🧜🏽‍♀️",
    "mermaid_tone4": "🧜🏾‍♀️",
    "mermaid_medium_dark_skin_tone": "🧜🏾‍♀️",
    "mermaid_tone5": "🧜🏿‍♀️",
    "mermaid_dark_skin_tone": "🧜🏿‍♀️",
    "merman": "🧜‍♂️",
    "merman_tone1": "🧜🏻‍♂️",
    "merman_light_skin_tone": "🧜🏻‍♂️",
    "merman_tone2": "🧜🏼‍♂️",
    "merman_medium_light_skin_tone": "🧜🏼‍♂️",
    "merman_tone3": "🧜🏽‍♂️",
    "merman_medium_skin_tone": "🧜🏽‍♂️",
    "merman_tone4": "🧜🏾‍♂️",
    "merman_medium_dark_skin_tone": "🧜🏾‍♂️",
    "merman_tone5": "🧜🏿‍♂️",
    "merman_dark_skin_tone": "🧜🏿‍♂️",
    "fairy": "🧚",
    "fairy_tone1": "🧚🏻",
    "fairy_light_skin_tone": "🧚🏻",
    "fairy_tone2": "🧚🏼",
    "fairy_medium_light_skin_tone": "🧚🏼",
    "fairy_tone3": "🧚🏽",
    "fairy_medium_skin_tone": "🧚🏽",
    "fairy_tone4": "🧚🏾",
    "fairy_medium_dark_skin_tone": "🧚🏾",
    "fairy_tone5": "🧚🏿",
    "fairy_dark_skin_tone": "🧚🏿",
    "woman_fairy": "🧚‍♀️",
    "woman_fairy_tone1": "🧚🏻‍♀️",
    "woman_fairy_light_skin_tone": "🧚🏻‍♀️",
    "woman_fairy_tone2": "🧚🏼‍♀️",
    "woman_fairy_medium_light_skin_tone": "🧚🏼‍♀️",
    "woman_fairy_tone3": "🧚🏽‍♀️",
    "woman_fairy_medium_skin_tone": "🧚🏽‍♀️",
    "woman_fairy_tone4": "🧚🏾‍♀️",
    "woman_fairy_medium_dark_skin_tone": "🧚🏾‍♀️",
    "woman_fairy_tone5": "🧚🏿‍♀️",
    "woman_fairy_dark_skin_tone": "🧚🏿‍♀️",
    "man_fairy": "🧚‍♂️",
    "man_fairy_tone1": "🧚🏻‍♂️",
    "man_fairy_light_skin_tone": "🧚🏻‍♂️",
    "man_fairy_tone2": "🧚🏼‍♂️",
    "man_fairy_medium_light_skin_tone": "🧚🏼‍♂️",
    "man_fairy_tone3": "🧚🏽‍♂️",
    "man_fairy_medium_skin_tone": "🧚🏽‍♂️",
    "man_fairy_tone4": "🧚🏾‍♂️",
    "man_fairy_medium_dark_skin_tone": "🧚🏾‍♂️",
    "man_fairy_tone5": "🧚🏿‍♂️",
    "man_fairy_dark_skin_tone": "🧚🏿‍♂️",
    "angel": "👼",
    "angel_tone1": "👼🏻",
    "angel_tone2": "👼🏼",
    "angel_tone3": "👼🏽",
    "angel_tone4": "👼🏾",
    "angel_tone5": "👼🏿",
    "pregnant_woman": "🤰",
    "expecting_woman": "🤰",
    "pregnant_woman_tone1": "🤰🏻",
    "expecting_woman_tone1": "🤰🏻",
    "pregnant_woman_tone2": "🤰🏼",
    "expecting_woman_tone2": "🤰🏼",
    "pregnant_woman_tone3": "🤰🏽",
    "expecting_woman_tone3": "🤰🏽",
    "pregnant_woman_tone4": "🤰🏾",
    "expecting_woman_tone4": "🤰🏾",
    "pregnant_woman_tone5": "🤰🏿",
    "expecting_woman_tone5": "🤰🏿",
    "breast_feeding": "🤱",
    "breast_feeding_tone1": "🤱🏻",
    "breast_feeding_light_skin_tone": "🤱🏻",
    "breast_feeding_tone2": "🤱🏼",
    "breast_feeding_medium_light_skin_tone": "🤱🏼",
    "breast_feeding_tone3": "🤱🏽",
    "breast_feeding_medium_skin_tone": "🤱🏽",
    "breast_feeding_tone4": "🤱🏾",
    "breast_feeding_medium_dark_skin_tone": "🤱🏾",
    "breast_feeding_tone5": "🤱🏿",
    "breast_feeding_dark_skin_tone": "🤱🏿",
    "person_feeding_baby": "🧑‍🍼",
    "person_feeding_baby_tone1": "🧑🏻‍🍼",
    "person_feeding_baby_light_skin_tone": "🧑🏻‍🍼",
    "person_feeding_baby_tone2": "🧑🏼‍🍼",
    "person_feeding_baby_medium_light_skin_tone": "🧑🏼‍🍼",
    "person_feeding_baby_tone3": "🧑🏽‍🍼",
    "person_feeding_baby_medium_skin_tone": "🧑🏽‍🍼",
    "person_feeding_baby_tone4": "🧑🏾‍🍼",
    "person_feeding_baby_medium_dark_skin_tone": "🧑🏾‍🍼",
    "person_feeding_baby_tone5": "🧑🏿‍🍼",
    "person_feeding_baby_dark_skin_tone": "🧑🏿‍🍼",
    "woman_feeding_baby": "👩‍🍼",
    "woman_feeding_baby_tone1": "👩🏻‍🍼",
    "woman_feeding_baby_light_skin_tone": "👩🏻‍🍼",
    "woman_feeding_baby_tone2": "👩🏼‍🍼",
    "woman_feeding_baby_medium_light_skin_tone": "👩🏼‍🍼",
    "woman_feeding_baby_tone3": "👩🏽‍🍼",
    "woman_feeding_baby_medium_skin_tone": "👩🏽‍🍼",
    "woman_feeding_baby_tone4": "👩🏾‍🍼",
    "woman_feeding_baby_medium_dark_skin_tone": "👩🏾‍🍼",
    "woman_feeding_baby_tone5": "👩🏿‍🍼",
    "woman_feeding_baby_dark_skin_tone": "👩🏿‍🍼",
    "man_feeding_baby": "👨‍🍼",
    "man_feeding_baby_tone1": "👨🏻‍🍼",
    "man_feeding_baby_light_skin_tone": "👨🏻‍🍼",
    "man_feeding_baby_tone2": "👨🏼‍🍼",
    "man_feeding_baby_medium_light_skin_tone": "👨🏼‍🍼",
    "man_feeding_baby_tone3": "👨🏽‍🍼",
    "man_feeding_baby_medium_skin_tone": "👨🏽‍🍼",
    "man_feeding_baby_tone4": "👨🏾‍🍼",
    "man_feeding_baby_medium_dark_skin_tone": "👨🏾‍🍼",
    "man_feeding_baby_tone5": "👨🏿‍🍼",
    "man_feeding_baby_dark_skin_tone": "👨🏿‍🍼",
    "person_bowing": "🙇",
    "bow": "🙇",
    "person_bowing_tone1": "🙇🏻",
    "bow_tone1": "🙇🏻",
    "person_bowing_tone2": "🙇🏼",
    "bow_tone2": "🙇🏼",
    "person_bowing_tone3": "🙇🏽",
    "bow_tone3": "🙇🏽",
    "person_bowing_tone4": "🙇🏾",
    "bow_tone4": "🙇🏾",
    "person_bowing_tone5": "🙇🏿",
    "bow_tone5": "🙇🏿",
    "woman_bowing": "🙇‍♀️",
    "woman_bowing_tone1": "🙇🏻‍♀️",
    "woman_bowing_light_skin_tone": "🙇🏻‍♀️",
    "woman_bowing_tone2": "🙇🏼‍♀️",
    "woman_bowing_medium_light_skin_tone": "🙇🏼‍♀️",
    "woman_bowing_tone3": "🙇🏽‍♀️",
    "woman_bowing_medium_skin_tone": "🙇🏽‍♀️",
    "woman_bowing_tone4": "🙇🏾‍♀️",
    "woman_bowing_medium_dark_skin_tone": "🙇🏾‍♀️",
    "woman_bowing_tone5": "🙇🏿‍♀️",
    "woman_bowing_dark_skin_tone": "🙇🏿‍♀️",
    "man_bowing": "🙇‍♂️",
    "man_bowing_tone1": "🙇🏻‍♂️",
    "man_bowing_light_skin_tone": "🙇🏻‍♂️",
    "man_bowing_tone2": "🙇🏼‍♂️",
    "man_bowing_medium_light_skin_tone": "🙇🏼‍♂️",
    "man_bowing_tone3": "🙇🏽‍♂️",
    "man_bowing_medium_skin_tone": "🙇🏽‍♂️",
    "man_bowing_tone4": "🙇🏾‍♂️",
    "man_bowing_medium_dark_skin_tone": "🙇🏾‍♂️",
    "man_bowing_tone5": "🙇🏿‍♂️",
    "man_bowing_dark_skin_tone": "🙇🏿‍♂️",
    "person_tipping_hand": "💁",
    "information_desk_person": "💁",
    "person_tipping_hand_tone1": "💁🏻",
    "information_desk_person_tone1": "💁🏻",
    "person_tipping_hand_tone2": "💁🏼",
    "information_desk_person_tone2": "💁🏼",
    "person_tipping_hand_tone3": "💁🏽",
    "information_desk_person_tone3": "💁🏽",
    "person_tipping_hand_tone4": "💁🏾",
    "information_desk_person_tone4": "💁🏾",
    "person_tipping_hand_tone5": "💁🏿",
    "information_desk_person_tone5": "💁🏿",
    "woman_tipping_hand": "💁‍♀️",
    "woman_tipping_hand_tone1": "💁🏻‍♀️",
    "woman_tipping_hand_light_skin_tone": "💁🏻‍♀️",
    "woman_tipping_hand_tone2": "💁🏼‍♀️",
    "woman_tipping_hand_medium_light_skin_tone": "💁🏼‍♀️",
    "woman_tipping_hand_tone3": "💁🏽‍♀️",
    "woman_tipping_hand_medium_skin_tone": "💁🏽‍♀️",
    "woman_tipping_hand_tone4": "💁🏾‍♀️",
    "woman_tipping_hand_medium_dark_skin_tone": "💁🏾‍♀️",
    "woman_tipping_hand_tone5": "💁🏿‍♀️",
    "woman_tipping_hand_dark_skin_tone": "💁🏿‍♀️",
    "man_tipping_hand": "💁‍♂️",
    "man_tipping_hand_tone1": "💁🏻‍♂️",
    "man_tipping_hand_light_skin_tone": "💁🏻‍♂️",
    "man_tipping_hand_tone2": "💁🏼‍♂️",
    "man_tipping_hand_medium_light_skin_tone": "💁🏼‍♂️",
    "man_tipping_hand_tone3": "💁🏽‍♂️",
    "man_tipping_hand_medium_skin_tone": "💁🏽‍♂️",
    "man_tipping_hand_tone4": "💁🏾‍♂️",
    "man_tipping_hand_medium_dark_skin_tone": "💁🏾‍♂️",
    "man_tipping_hand_tone5": "💁🏿‍♂️",
    "man_tipping_hand_dark_skin_tone": "💁🏿‍♂️",
    "person_gesturing_no": "🙅",
    "no_good": "🙅",
    "person_gesturing_no_tone1": "🙅🏻",
    "no_good_tone1": "🙅🏻",
    "person_gesturing_no_tone2": "🙅🏼",
    "no_good_tone2": "🙅🏼",
    "person_gesturing_no_tone3": "🙅🏽",
    "no_good_tone3": "🙅🏽",
    "person_gesturing_no_tone4": "🙅🏾",
    "no_good_tone4": "🙅🏾",
    "person_gesturing_no_tone5": "🙅🏿",
    "no_good_tone5": "🙅🏿",
    "woman_gesturing_no": "🙅‍♀️",
    "woman_gesturing_no_tone1": "🙅🏻‍♀️",
    "woman_gesturing_no_light_skin_tone": "🙅🏻‍♀️",
    "woman_gesturing_no_tone2": "🙅🏼‍♀️",
    "woman_gesturing_no_medium_light_skin_tone": "🙅🏼‍♀️",
    "woman_gesturing_no_tone3": "🙅🏽‍♀️",
    "woman_gesturing_no_medium_skin_tone": "🙅🏽‍♀️",
    "woman_gesturing_no_tone4": "🙅🏾‍♀️",
    "woman_gesturing_no_medium_dark_skin_tone": "🙅🏾‍♀️",
    "woman_gesturing_no_tone5": "🙅🏿‍♀️",
    "woman_gesturing_no_dark_skin_tone": "🙅🏿‍♀️",
    "man_gesturing_no": "🙅‍♂️",
    "man_gesturing_no_tone1": "🙅🏻‍♂️",
    "man_gesturing_no_light_skin_tone": "🙅🏻‍♂️",
    "man_gesturing_no_tone2": "🙅🏼‍♂️",
    "man_gesturing_no_medium_light_skin_tone": "🙅🏼‍♂️",
    "man_gesturing_no_tone3": "🙅🏽‍♂️",
    "man_gesturing_no_medium_skin_tone": "🙅🏽‍♂️",
    "man_gesturing_no_tone4": "🙅🏾‍♂️",
    "man_gesturing_no_medium_dark_skin_tone": "🙅🏾‍♂️",
    "man_gesturing_no_tone5": "🙅🏿‍♂️",
    "man_gesturing_no_dark_skin_tone": "🙅🏿‍♂️",
    "person_gesturing_ok": "🙆",
    "ok_woman": "🙆",
    "person_gesturing_ok_tone1": "🙆🏻",
    "ok_woman_tone1": "🙆🏻",
    "person_gesturing_ok_tone2": "🙆🏼",
    "ok_woman_tone2": "🙆🏼",
    "person_gesturing_ok_tone3": "🙆🏽",
    "ok_woman_tone3": "🙆🏽",
    "person_gesturing_ok_tone4": "🙆🏾",
    "ok_woman_tone4": "🙆🏾",
    "person_gesturing_ok_tone5": "🙆🏿",
    "ok_woman_tone5": "🙆🏿",
    "woman_gesturing_ok": "🙆‍♀️",
    "woman_gesturing_ok_tone1": "🙆🏻‍♀️",
    "woman_gesturing_ok_light_skin_tone": "🙆🏻‍♀️",
    "woman_gesturing_ok_tone2": "🙆🏼‍♀️",
    "woman_gesturing_ok_medium_light_skin_tone": "🙆🏼‍♀️",
    "woman_gesturing_ok_tone3": "🙆🏽‍♀️",
    "woman_gesturing_ok_medium_skin_tone": "🙆🏽‍♀️",
    "woman_gesturing_ok_tone4": "🙆🏾‍♀️",
    "woman_gesturing_ok_medium_dark_skin_tone": "🙆🏾‍♀️",
    "woman_gesturing_ok_tone5": "🙆🏿‍♀️",
    "woman_gesturing_ok_dark_skin_tone": "🙆🏿‍♀️",
    "man_gesturing_ok": "🙆‍♂️",
    "man_gesturing_ok_tone1": "🙆🏻‍♂️",
    "man_gesturing_ok_light_skin_tone": "🙆🏻‍♂️",
    "man_gesturing_ok_tone2": "🙆🏼‍♂️",
    "man_gesturing_ok_medium_light_skin_tone": "🙆🏼‍♂️",
    "man_gesturing_ok_tone3": "🙆🏽‍♂️",
    "man_gesturing_ok_medium_skin_tone": "🙆🏽‍♂️",
    "man_gesturing_ok_tone4": "🙆🏾‍♂️",
    "man_gesturing_ok_medium_dark_skin_tone": "🙆🏾‍♂️",
    "man_gesturing_ok_tone5": "🙆🏿‍♂️",
    "man_gesturing_ok_dark_skin_tone": "🙆🏿‍♂️",
    "person_raising_hand": "🙋",
    "raising_hand": "🙋",
    "person_raising_hand_tone1": "🙋🏻",
    "raising_hand_tone1": "🙋🏻",
    "person_raising_hand_tone2": "🙋🏼",
    "raising_hand_tone2": "🙋🏼",
    "person_raising_hand_tone3": "🙋🏽",
    "raising_hand_tone3": "🙋🏽",
    "person_raising_hand_tone4": "🙋🏾",
    "raising_hand_tone4": "🙋🏾",
    "person_raising_hand_tone5": "🙋🏿",
    "raising_hand_tone5": "🙋🏿",
    "woman_raising_hand": "🙋‍♀️",
    "woman_raising_hand_tone1": "🙋🏻‍♀️",
    "woman_raising_hand_light_skin_tone": "🙋🏻‍♀️",
    "woman_raising_hand_tone2": "🙋🏼‍♀️",
    "woman_raising_hand_medium_light_skin_tone": "🙋🏼‍♀️",
    "woman_raising_hand_tone3": "🙋🏽‍♀️",
    "woman_raising_hand_medium_skin_tone": "🙋🏽‍♀️",
    "woman_raising_hand_tone4": "🙋🏾‍♀️",
    "woman_raising_hand_medium_dark_skin_tone": "🙋🏾‍♀️",
    "woman_raising_hand_tone5": "🙋🏿‍♀️",
    "woman_raising_hand_dark_skin_tone": "🙋🏿‍♀️",
    "man_raising_hand": "🙋‍♂️",
    "man_raising_hand_tone1": "🙋🏻‍♂️",
    "man_raising_hand_light_skin_tone": "🙋🏻‍♂️",
    "man_raising_hand_tone2": "🙋🏼‍♂️",
    "man_raising_hand_medium_light_skin_tone": "🙋🏼‍♂️",
    "man_raising_hand_tone3": "🙋🏽‍♂️",
    "man_raising_hand_medium_skin_tone": "🙋🏽‍♂️",
    "man_raising_hand_tone4": "🙋🏾‍♂️",
    "man_raising_hand_medium_dark_skin_tone": "🙋🏾‍♂️",
    "man_raising_hand_tone5": "🙋🏿‍♂️",
    "man_raising_hand_dark_skin_tone": "🙋🏿‍♂️",
    "deaf_person": "🧏",
    "deaf_person_tone1": "🧏🏻",
    "deaf_person_light_skin_tone": "🧏🏻",
    "deaf_person_tone2": "🧏🏼",
    "deaf_person_medium_light_skin_tone": "🧏🏼",
    "deaf_person_tone3": "🧏🏽",
    "deaf_person_medium_skin_tone": "🧏🏽",
    "deaf_person_tone4": "🧏🏾",
    "deaf_person_medium_dark_skin_tone": "🧏🏾",
    "deaf_person_tone5": "🧏🏿",
    "deaf_person_dark_skin_tone": "🧏🏿",
    "deaf_woman": "🧏‍♀️",
    "deaf_woman_tone1": "🧏🏻‍♀️",
    "deaf_woman_light_skin_tone": "🧏🏻‍♀️",
    "deaf_woman_tone2": "🧏🏼‍♀️",
    "deaf_woman_medium_light_skin_tone": "🧏🏼‍♀️",
    "deaf_woman_tone3": "🧏🏽‍♀️",
    "deaf_woman_medium_skin_tone": "🧏🏽‍♀️",
    "deaf_woman_tone4": "🧏🏾‍♀️",
    "deaf_woman_medium_dark_skin_tone": "🧏🏾‍♀️",
    "deaf_woman_tone5": "🧏🏿‍♀️",
    "deaf_woman_dark_skin_tone": "🧏🏿‍♀️",
    "deaf_man": "🧏‍♂️",
    "deaf_man_tone1": "🧏🏻‍♂️",
    "deaf_man_light_skin_tone": "🧏🏻‍♂️",
    "deaf_man_tone2": "🧏🏼‍♂️",
    "deaf_man_medium_light_skin_tone": "🧏🏼‍♂️",
    "deaf_man_tone3": "🧏🏽‍♂️",
    "deaf_man_medium_skin_tone": "🧏🏽‍♂️",
    "deaf_man_tone4": "🧏🏾‍♂️",
    "deaf_man_medium_dark_skin_tone": "🧏🏾‍♂️",
    "deaf_man_tone5": "🧏🏿‍♂️",
    "deaf_man_dark_skin_tone": "🧏🏿‍♂️",
    "person_facepalming": "🤦",
    "face_palm": "🤦",
    "facepalm": "🤦",
    "person_facepalming_tone1": "🤦🏻",
    "face_palm_tone1": "🤦🏻",
    "facepalm_tone1": "🤦🏻",
    "person_facepalming_tone2": "🤦🏼",
    "face_palm_tone2": "🤦🏼",
    "facepalm_tone2": "🤦🏼",
    "person_facepalming_tone3": "🤦🏽",
    "face_palm_tone3": "🤦🏽",
    "facepalm_tone3": "🤦🏽",
    "person_facepalming_tone4": "🤦🏾",
    "face_palm_tone4": "🤦🏾",
    "facepalm_tone4": "🤦🏾",
    "person_facepalming_tone5": "🤦🏿",
    "face_palm_tone5": "🤦🏿",
    "facepalm_tone5": "🤦🏿",
    "woman_facepalming": "🤦‍♀️",
    "woman_facepalming_tone1": "🤦🏻‍♀️",
    "woman_facepalming_light_skin_tone": "🤦🏻‍♀️",
    "woman_facepalming_tone2": "🤦🏼‍♀️",
    "woman_facepalming_medium_light_skin_tone": "🤦🏼‍♀️",
    "woman_facepalming_tone3": "🤦🏽‍♀️",
    "woman_facepalming_medium_skin_tone": "🤦🏽‍♀️",
    "woman_facepalming_tone4": "🤦🏾‍♀️",
    "woman_facepalming_medium_dark_skin_tone": "🤦🏾‍♀️",
    "woman_facepalming_tone5": "🤦🏿‍♀️",
    "woman_facepalming_dark_skin_tone": "🤦🏿‍♀️",
    "man_facepalming": "🤦‍♂️",
    "man_facepalming_tone1": "🤦🏻‍♂️",
    "man_facepalming_light_skin_tone": "🤦🏻‍♂️",
    "man_facepalming_tone2": "🤦🏼‍♂️",
    "man_facepalming_medium_light_skin_tone": "🤦🏼‍♂️",
    "man_facepalming_tone3": "🤦🏽‍♂️",
    "man_facepalming_medium_skin_tone": "🤦🏽‍♂️",
    "man_facepalming_tone4": "🤦🏾‍♂️",
    "man_facepalming_medium_dark_skin_tone": "🤦🏾‍♂️",
    "man_facepalming_tone5": "🤦🏿‍♂️",
    "man_facepalming_dark_skin_tone": "🤦🏿‍♂️",
    "person_shrugging": "🤷",
    "shrug": "🤷",
    "person_shrugging_tone1": "🤷🏻",
    "shrug_tone1": "🤷🏻",
    "person_shrugging_tone2": "🤷🏼",
    "shrug_tone2": "🤷🏼",
    "person_shrugging_tone3": "🤷🏽",
    "shrug_tone3": "🤷🏽",
    "person_shrugging_tone4": "🤷🏾",
    "shrug_tone4": "🤷🏾",
    "person_shrugging_tone5": "🤷🏿",
    "shrug_tone5": "🤷🏿",
    "woman_shrugging": "🤷‍♀️",
    "woman_shrugging_tone1": "🤷🏻‍♀️",
    "woman_shrugging_light_skin_tone": "🤷🏻‍♀️",
    "woman_shrugging_tone2": "🤷🏼‍♀️",
    "woman_shrugging_medium_light_skin_tone": "🤷🏼‍♀️",
    "woman_shrugging_tone3": "🤷🏽‍♀️",
    "woman_shrugging_medium_skin_tone": "🤷🏽‍♀️",
    "woman_shrugging_tone4": "🤷🏾‍♀️",
    "woman_shrugging_medium_dark_skin_tone": "🤷🏾‍♀️",
    "woman_shrugging_tone5": "🤷🏿‍♀️",
    "woman_shrugging_dark_skin_tone": "🤷🏿‍♀️",
    "man_shrugging": "🤷‍♂️",
    "man_shrugging_tone1": "🤷🏻‍♂️",
    "man_shrugging_light_skin_tone": "🤷🏻‍♂️",
    "man_shrugging_tone2": "🤷🏼‍♂️",
    "man_shrugging_medium_light_skin_tone": "🤷🏼‍♂️",
    "man_shrugging_tone3": "🤷🏽‍♂️",
    "man_shrugging_medium_skin_tone": "🤷🏽‍♂️",
    "man_shrugging_tone4": "🤷🏾‍♂️",
    "man_shrugging_medium_dark_skin_tone": "🤷🏾‍♂️",
    "man_shrugging_tone5": "🤷🏿‍♂️",
    "man_shrugging_dark_skin_tone": "🤷🏿‍♂️",
    "person_pouting": "🙎",
    "person_with_pouting_face": "🙎",
    "person_pouting_tone1": "🙎🏻",
    "person_with_pouting_face_tone1": "🙎🏻",
    "person_pouting_tone2": "🙎🏼",
    "person_with_pouting_face_tone2": "🙎🏼",
    "person_pouting_tone3": "🙎🏽",
    "person_with_pouting_face_tone3": "🙎🏽",
    "person_pouting_tone4": "🙎🏾",
    "person_with_pouting_face_tone4": "🙎🏾",
    "person_pouting_tone5": "🙎🏿",
    "person_with_pouting_face_tone5": "🙎🏿",
    "woman_pouting": "🙎‍♀️",
    "woman_pouting_tone1": "🙎🏻‍♀️",
    "woman_pouting_light_skin_tone": "🙎🏻‍♀️",
    "woman_pouting_tone2": "🙎🏼‍♀️",
    "woman_pouting_medium_light_skin_tone": "🙎🏼‍♀️",
    "woman_pouting_tone3": "🙎🏽‍♀️",
    "woman_pouting_medium_skin_tone": "🙎🏽‍♀️",
    "woman_pouting_tone4": "🙎🏾‍♀️",
    "woman_pouting_medium_dark_skin_tone": "🙎🏾‍♀️",
    "woman_pouting_tone5": "🙎🏿‍♀️",
    "woman_pouting_dark_skin_tone": "🙎🏿‍♀️",
    "man_pouting": "🙎‍♂️",
    "man_pouting_tone1": "🙎🏻‍♂️",
    "man_pouting_light_skin_tone": "🙎🏻‍♂️",
    "man_pouting_tone2": "🙎🏼‍♂️",
    "man_pouting_medium_light_skin_tone": "🙎🏼‍♂️",
    "man_pouting_tone3": "🙎🏽‍♂️",
    "man_pouting_medium_skin_tone": "🙎🏽‍♂️",
    "man_pouting_tone4": "🙎🏾‍♂️",
    "man_pouting_medium_dark_skin_tone": "🙎🏾‍♂️",
    "man_pouting_tone5": "🙎🏿‍♂️",
    "man_pouting_dark_skin_tone": "🙎🏿‍♂️",
    "person_frowning": "🙍",
    "person_frowning_tone1": "🙍🏻",
    "person_frowning_tone2": "🙍🏼",
    "person_frowning_tone3": "🙍🏽",
    "person_frowning_tone4": "🙍🏾",
    "person_frowning_tone5": "🙍🏿",
    "woman_frowning": "🙍‍♀️",
    "woman_frowning_tone1": "🙍🏻‍♀️",
    "woman_frowning_light_skin_tone": "🙍🏻‍♀️",
    "woman_frowning_tone2": "🙍🏼‍♀️",
    "woman_frowning_medium_light_skin_tone": "🙍🏼‍♀️",
    "woman_frowning_tone3": "🙍🏽‍♀️",
    "woman_frowning_medium_skin_tone": "🙍🏽‍♀️",
    "woman_frowning_tone4": "🙍🏾‍♀️",
    "woman_frowning_medium_dark_skin_tone": "🙍🏾‍♀️",
    "woman_frowning_tone5": "🙍🏿‍♀️",
    "woman_frowning_dark_skin_tone": "🙍🏿‍♀️",
    "man_frowning": "🙍‍♂️",
    "man_frowning_tone1": "🙍🏻‍♂️",
    "man_frowning_light_skin_tone": "🙍🏻‍♂️",
    "man_frowning_tone2": "🙍🏼‍♂️",
    "man_frowning_medium_light_skin_tone": "🙍🏼‍♂️",
    "man_frowning_tone3": "🙍🏽‍♂️",
    "man_frowning_medium_skin_tone": "🙍🏽‍♂️",
    "man_frowning_tone4": "🙍🏾‍♂️",
    "man_frowning_medium_dark_skin_tone": "🙍🏾‍♂️",
    "man_frowning_tone5": "🙍🏿‍♂️",
    "man_frowning_dark_skin_tone": "🙍🏿‍♂️",
    "person_getting_haircut": "💇",
    "haircut": "💇",
    "person_getting_haircut_tone1": "💇🏻",
    "haircut_tone1": "💇🏻",
    "person_getting_haircut_tone2": "💇🏼",
    "haircut_tone2": "💇🏼",
    "person_getting_haircut_tone3": "💇🏽",
    "haircut_tone3": "💇🏽",
    "person_getting_haircut_tone4": "💇🏾",
    "haircut_tone4": "💇🏾",
    "person_getting_haircut_tone5": "💇🏿",
    "haircut_tone5": "💇🏿",
    "woman_getting_haircut": "💇‍♀️",
    "woman_getting_haircut_tone1": "💇🏻‍♀️",
    "woman_getting_haircut_light_skin_tone": "💇🏻‍♀️",
    "woman_getting_haircut_tone2": "💇🏼‍♀️",
    "woman_getting_haircut_medium_light_skin_tone": "💇🏼‍♀️",
    "woman_getting_haircut_tone3": "💇🏽‍♀️",
    "woman_getting_haircut_medium_skin_tone": "💇🏽‍♀️",
    "woman_getting_haircut_tone4": "💇🏾‍♀️",
    "woman_getting_haircut_medium_dark_skin_tone": "💇🏾‍♀️",
    "woman_getting_haircut_tone5": "💇🏿‍♀️",
    "woman_getting_haircut_dark_skin_tone": "💇🏿‍♀️",
    "man_getting_haircut": "💇‍♂️",
    "man_getting_haircut_tone1": "💇🏻‍♂️",
    "man_getting_haircut_light_skin_tone": "💇🏻‍♂️",
    "man_getting_haircut_tone2": "💇🏼‍♂️",
    "man_getting_haircut_medium_light_skin_tone": "💇🏼‍♂️",
    "man_getting_haircut_tone3": "💇🏽‍♂️",
    "man_getting_haircut_medium_skin_tone": "💇🏽‍♂️",
    "man_getting_haircut_tone4": "💇🏾‍♂️",
    "man_getting_haircut_medium_dark_skin_tone": "💇🏾‍♂️",
    "man_getting_haircut_tone5": "💇🏿‍♂️",
    "man_getting_haircut_dark_skin_tone": "💇🏿‍♂️",
    "person_getting_massage": "💆",
    "massage": "💆",
    "person_getting_massage_tone1": "💆🏻",
    "massage_tone1": "💆🏻",
    "person_getting_massage_tone2": "💆🏼",
    "massage_tone2": "💆🏼",
    "person_getting_massage_tone3": "💆🏽",
    "massage_tone3": "💆🏽",
    "person_getting_massage_tone4": "💆🏾",
    "massage_tone4": "💆🏾",
    "person_getting_massage_tone5": "💆🏿",
    "massage_tone5": "💆🏿",
    "woman_getting_face_massage": "💆‍♀️",
    "woman_getting_face_massage_tone1": "💆🏻‍♀️",
    "woman_getting_face_massage_light_skin_tone": "💆🏻‍♀️",
    "woman_getting_face_massage_tone2": "💆🏼‍♀️",
    "woman_getting_face_massage_medium_light_skin_tone": "💆🏼‍♀️",
    "woman_getting_face_massage_tone3": "💆🏽‍♀️",
    "woman_getting_face_massage_medium_skin_tone": "💆🏽‍♀️",
    "woman_getting_face_massage_tone4": "💆🏾‍♀️",
    "woman_getting_face_massage_medium_dark_skin_tone": "💆🏾‍♀️",
    "woman_getting_face_massage_tone5": "💆🏿‍♀️",
    "woman_getting_face_massage_dark_skin_tone": "💆🏿‍♀️",
    "man_getting_face_massage": "💆‍♂️",
    "man_getting_face_massage_tone1": "💆🏻‍♂️",
    "man_getting_face_massage_light_skin_tone": "💆🏻‍♂️",
    "man_getting_face_massage_tone2": "💆🏼‍♂️",
    "man_getting_face_massage_medium_light_skin_tone": "💆🏼‍♂️",
    "man_getting_face_massage_tone3": "💆🏽‍♂️",
    "man_getting_face_massage_medium_skin_tone": "💆🏽‍♂️",
    "man_getting_face_massage_tone4": "💆🏾‍♂️",
    "man_getting_face_massage_medium_dark_skin_tone": "💆🏾‍♂️",
    "man_getting_face_massage_tone5": "💆🏿‍♂️",
    "man_getting_face_massage_dark_skin_tone": "💆🏿‍♂️",
    "person_in_steamy_room": "🧖",
    "person_in_steamy_room_tone1": "🧖🏻",
    "person_in_steamy_room_light_skin_tone": "🧖🏻",
    "person_in_steamy_room_tone2": "🧖🏼",
    "person_in_steamy_room_medium_light_skin_tone": "🧖🏼",
    "person_in_steamy_room_tone3": "🧖🏽",
    "person_in_steamy_room_medium_skin_tone": "🧖🏽",
    "person_in_steamy_room_tone4": "🧖🏾",
    "person_in_steamy_room_medium_dark_skin_tone": "🧖🏾",
    "person_in_steamy_room_tone5": "🧖🏿",
    "person_in_steamy_room_dark_skin_tone": "🧖🏿",
    "woman_in_steamy_room": "🧖‍♀️",
    "woman_in_steamy_room_tone1": "🧖🏻‍♀️",
    "woman_in_steamy_room_light_skin_tone": "🧖🏻‍♀️",
    "woman_in_steamy_room_tone2": "🧖🏼‍♀️",
    "woman_in_steamy_room_medium_light_skin_tone": "🧖🏼‍♀️",
    "woman_in_steamy_room_tone3": "🧖🏽‍♀️",
    "woman_in_steamy_room_medium_skin_tone": "🧖🏽‍♀️",
    "woman_in_steamy_room_tone4": "🧖🏾‍♀️",
    "woman_in_steamy_room_medium_dark_skin_tone": "🧖🏾‍♀️",
    "woman_in_steamy_room_tone5": "🧖🏿‍♀️",
    "woman_in_steamy_room_dark_skin_tone": "🧖🏿‍♀️",
    "man_in_steamy_room": "🧖‍♂️",
    "man_in_steamy_room_tone1": "🧖🏻‍♂️",
    "man_in_steamy_room_light_skin_tone": "🧖🏻‍♂️",
    "man_in_steamy_room_tone2": "🧖🏼‍♂️",
    "man_in_steamy_room_medium_light_skin_tone": "🧖🏼‍♂️",
    "man_in_steamy_room_tone3": "🧖🏽‍♂️",
    "man_in_steamy_room_medium_skin_tone": "🧖🏽‍♂️",
    "man_in_steamy_room_tone4": "🧖🏾‍♂️",
    "man_in_steamy_room_medium_dark_skin_tone": "🧖🏾‍♂️",
    "man_in_steamy_room_tone5": "🧖🏿‍♂️",
    "man_in_steamy_room_dark_skin_tone": "🧖🏿‍♂️",
    "nail_care": "💅",
    "nail_care_tone1": "💅🏻",
    "nail_care_tone2": "💅🏼",
    "nail_care_tone3": "💅🏽",
    "nail_care_tone4": "💅🏾",
    "nail_care_tone5": "💅🏿",
    "selfie": "🤳",
    "selfie_tone1": "🤳🏻",
    "selfie_tone2": "🤳🏼",
    "selfie_tone3": "🤳🏽",
    "selfie_tone4": "🤳🏾",
    "selfie_tone5": "🤳🏿",
    "dancer": "💃",
    "dancer_tone1": "💃🏻",
    "dancer_tone2": "💃🏼",
    "dancer_tone3": "💃🏽",
    "dancer_tone4": "💃🏾",
    "dancer_tone5": "💃🏿",
    "man_dancing": "🕺",
    "male_dancer": "🕺",
    "man_dancing_tone1": "🕺🏻",
    "male_dancer_tone1": "🕺🏻",
    "man_dancing_tone2": "🕺🏼",
    "male_dancer_tone2": "🕺🏼",
    "man_dancing_tone3": "🕺🏽",
    "male_dancer_tone3": "🕺🏽",
    "man_dancing_tone5": "🕺🏿",
    "male_dancer_tone5": "🕺🏿",
    "man_dancing_tone4": "🕺🏾",
    "male_dancer_tone4": "🕺🏾",
    "people_with_bunny_ears_partying": "👯",
    "dancers": "👯",
    "women_with_bunny_ears_partying": "👯‍♀️",
    "men_with_bunny_ears_partying": "👯‍♂️",
    "levitate": "🕴️",
    "man_in_business_suit_levitating": "🕴️",
    "levitate_tone1": "🕴🏻",
    "man_in_business_suit_levitating_tone1": "🕴🏻",
    "man_in_business_suit_levitating_light_skin_tone": "🕴🏻",
    "levitate_tone2": "🕴🏼",
    "man_in_business_suit_levitating_tone2": "🕴🏼",
    "man_in_business_suit_levitating_medium_light_skin_tone": "🕴🏼",
    "levitate_tone3": "🕴🏽",
    "man_in_business_suit_levitating_tone3": "🕴🏽",
    "man_in_business_suit_levitating_medium_skin_tone": "🕴🏽",
    "levitate_tone4": "🕴🏾",
    "man_in_business_suit_levitating_tone4": "🕴🏾",
    "man_in_business_suit_levitating_medium_dark_skin_tone": "🕴🏾",
    "levitate_tone5": "🕴🏿",
    "man_in_business_suit_levitating_tone5": "🕴🏿",
    "man_in_business_suit_levitating_dark_skin_tone": "🕴🏿",
    "person_in_manual_wheelchair": "🧑‍🦽",
    "person_in_manual_wheelchair_tone1": "🧑🏻‍🦽",
    "person_in_manual_wheelchair_light_skin_tone": "🧑🏻‍🦽",
    "person_in_manual_wheelchair_tone2": "🧑🏼‍🦽",
    "person_in_manual_wheelchair_medium_light_skin_tone": "🧑🏼‍🦽",
    "person_in_manual_wheelchair_tone3": "🧑🏽‍🦽",
    "person_in_manual_wheelchair_medium_skin_tone": "🧑🏽‍🦽",
    "person_in_manual_wheelchair_tone4": "🧑🏾‍🦽",
    "person_in_manual_wheelchair_medium_dark_skin_tone": "🧑🏾‍🦽",
    "person_in_manual_wheelchair_tone5": "🧑🏿‍🦽",
    "person_in_manual_wheelchair_dark_skin_tone": "🧑🏿‍🦽",
    "woman_in_manual_wheelchair": "👩‍🦽",
    "woman_in_manual_wheelchair_tone1": "👩🏻‍🦽",
    "woman_in_manual_wheelchair_light_skin_tone": "👩🏻‍🦽",
    "woman_in_manual_wheelchair_tone2": "👩🏼‍🦽",
    "woman_in_manual_wheelchair_medium_light_skin_tone": "👩🏼‍🦽",
    "woman_in_manual_wheelchair_tone3": "👩🏽‍🦽",
    "woman_in_manual_wheelchair_medium_skin_tone": "👩🏽‍🦽",
    "woman_in_manual_wheelchair_tone4": "👩🏾‍🦽",
    "woman_in_manual_wheelchair_medium_dark_skin_tone": "👩🏾‍🦽",
    "woman_in_manual_wheelchair_tone5": "👩🏿‍🦽",
    "woman_in_manual_wheelchair_dark_skin_tone": "👩🏿‍🦽",
    "man_in_manual_wheelchair": "👨‍🦽",
    "man_in_manual_wheelchair_tone1": "👨🏻‍🦽",
    "man_in_manual_wheelchair_light_skin_tone": "👨🏻‍🦽",
    "man_in_manual_wheelchair_tone2": "👨🏼‍🦽",
    "man_in_manual_wheelchair_medium_light_skin_tone": "👨🏼‍🦽",
    "man_in_manual_wheelchair_tone3": "👨🏽‍🦽",
    "man_in_manual_wheelchair_medium_skin_tone": "👨🏽‍🦽",
    "man_in_manual_wheelchair_tone4": "👨🏾‍🦽",
    "man_in_manual_wheelchair_medium_dark_skin_tone": "👨🏾‍🦽",
    "man_in_manual_wheelchair_tone5": "👨🏿‍🦽",
    "man_in_manual_wheelchair_dark_skin_tone": "👨🏿‍🦽",
    "person_in_motorized_wheelchair": "🧑‍🦼",
    "person_in_motorized_wheelchair_tone1": "🧑🏻‍🦼",
    "person_in_motorized_wheelchair_light_skin_tone": "🧑🏻‍🦼",
    "person_in_motorized_wheelchair_tone2": "🧑🏼‍🦼",
    "person_in_motorized_wheelchair_medium_light_skin_tone": "🧑🏼‍🦼",
    "person_in_motorized_wheelchair_tone3": "🧑🏽‍🦼",
    "person_in_motorized_wheelchair_medium_skin_tone": "🧑🏽‍🦼",
    "person_in_motorized_wheelchair_tone4": "🧑🏾‍🦼",
    "person_in_motorized_wheelchair_medium_dark_skin_tone": "🧑🏾‍🦼",
    "person_in_motorized_wheelchair_tone5": "🧑🏿‍🦼",
    "person_in_motorized_wheelchair_dark_skin_tone": "🧑🏿‍🦼",
    "woman_in_motorized_wheelchair": "👩‍🦼",
    "woman_in_motorized_wheelchair_tone1": "👩🏻‍🦼",
    "woman_in_motorized_wheelchair_light_skin_tone": "👩🏻‍🦼",
    "woman_in_motorized_wheelchair_tone2": "👩🏼‍🦼",
    "woman_in_motorized_wheelchair_medium_light_skin_tone": "👩🏼‍🦼",
    "woman_in_motorized_wheelchair_tone3": "👩🏽‍🦼",
    "woman_in_motorized_wheelchair_medium_skin_tone": "👩🏽‍🦼",
    "woman_in_motorized_wheelchair_tone4": "👩🏾‍🦼",
    "woman_in_motorized_wheelchair_medium_dark_skin_tone": "👩🏾‍🦼",
    "woman_in_motorized_wheelchair_tone5": "👩🏿‍🦼",
    "woman_in_motorized_wheelchair_dark_skin_tone": "👩🏿‍🦼",
    "man_in_motorized_wheelchair": "👨‍🦼",
    "man_in_motorized_wheelchair_tone1": "👨🏻‍🦼",
    "man_in_motorized_wheelchair_light_skin_tone": "👨🏻‍🦼",
    "man_in_motorized_wheelchair_tone2": "👨🏼‍🦼",
    "man_in_motorized_wheelchair_medium_light_skin_tone": "👨🏼‍🦼",
    "man_in_motorized_wheelchair_tone3": "👨🏽‍🦼",
    "man_in_motorized_wheelchair_medium_skin_tone": "👨🏽‍🦼",
    "man_in_motorized_wheelchair_tone4": "👨🏾‍🦼",
    "man_in_motorized_wheelchair_medium_dark_skin_tone": "👨🏾‍🦼",
    "man_in_motorized_wheelchair_tone5": "👨🏿‍🦼",
    "man_in_motorized_wheelchair_dark_skin_tone": "👨🏿‍🦼",
    "person_walking": "🚶",
    "walking": "🚶",
    "person_walking_tone1": "🚶🏻",
    "walking_tone1": "🚶🏻",
    "person_walking_tone2": "🚶🏼",
    "walking_tone2": "🚶🏼",
    "person_walking_tone3": "🚶🏽",
    "walking_tone3": "🚶🏽",
    "person_walking_tone4": "🚶🏾",
    "walking_tone4": "🚶🏾",
    "person_walking_tone5": "🚶🏿",
    "walking_tone5": "🚶🏿",
    "woman_walking": "🚶‍♀️",
    "woman_walking_tone1": "🚶🏻‍♀️",
    "woman_walking_light_skin_tone": "🚶🏻‍♀️",
    "woman_walking_tone2": "🚶🏼‍♀️",
    "woman_walking_medium_light_skin_tone": "🚶🏼‍♀️",
    "woman_walking_tone3": "🚶🏽‍♀️",
    "woman_walking_medium_skin_tone": "🚶🏽‍♀️",
    "woman_walking_tone4": "🚶🏾‍♀️",
    "woman_walking_medium_dark_skin_tone": "🚶🏾‍♀️",
    "woman_walking_tone5": "🚶🏿‍♀️",
    "woman_walking_dark_skin_tone": "🚶🏿‍♀️",
    "man_walking": "🚶‍♂️",
    "man_walking_tone1": "🚶🏻‍♂️",
    "man_walking_light_skin_tone": "🚶🏻‍♂️",
    "man_walking_tone2": "🚶🏼‍♂️",
    "man_walking_medium_light_skin_tone": "🚶🏼‍♂️",
    "man_walking_tone3": "🚶🏽‍♂️",
    "man_walking_medium_skin_tone": "🚶🏽‍♂️",
    "man_walking_tone4": "🚶🏾‍♂️",
    "man_walking_medium_dark_skin_tone": "🚶🏾‍♂️",
    "man_walking_tone5": "🚶🏿‍♂️",
    "man_walking_dark_skin_tone": "🚶🏿‍♂️",
    "person_with_probing_cane": "🧑‍🦯",
    "person_with_probing_cane_tone1": "🧑🏻‍🦯",
    "person_with_probing_cane_light_skin_tone": "🧑🏻‍🦯",
    "person_with_probing_cane_tone2": "🧑🏼‍🦯",
    "person_with_probing_cane_medium_light_skin_tone": "🧑🏼‍🦯",
    "person_with_probing_cane_tone3": "🧑🏽‍🦯",
    "person_with_probing_cane_medium_skin_tone": "🧑🏽‍🦯",
    "person_with_probing_cane_tone4": "🧑🏾‍🦯",
    "person_with_probing_cane_medium_dark_skin_tone": "🧑🏾‍🦯",
    "person_with_probing_cane_tone5": "🧑🏿‍🦯",
    "person_with_probing_cane_dark_skin_tone": "🧑🏿‍🦯",
    "woman_with_probing_cane": "👩‍🦯",
    "woman_with_probing_cane_tone1": "👩🏻‍🦯",
    "woman_with_probing_cane_light_skin_tone": "👩🏻‍🦯",
    "woman_with_probing_cane_tone2": "👩🏼‍🦯",
    "woman_with_probing_cane_medium_light_skin_tone": "👩🏼‍🦯",
    "woman_with_probing_cane_tone3": "👩🏽‍🦯",
    "woman_with_probing_cane_medium_skin_tone": "👩🏽‍🦯",
    "woman_with_probing_cane_tone4": "👩🏾‍🦯",
    "woman_with_probing_cane_medium_dark_skin_tone": "👩🏾‍🦯",
    "woman_with_probing_cane_tone5": "👩🏿‍🦯",
    "woman_with_probing_cane_dark_skin_tone": "👩🏿‍🦯",
    "man_with_probing_cane": "👨‍🦯",
    "man_with_probing_cane_tone1": "👨🏻‍🦯",
    "man_with_probing_cane_light_skin_tone": "👨🏻‍🦯",
    "man_with_probing_cane_tone3": "👨🏽‍🦯",
    "man_with_probing_cane_medium_skin_tone": "👨🏽‍🦯",
    "man_with_probing_cane_tone2": "👨🏼‍🦯",
    "man_with_probing_cane_medium_light_skin_tone": "👨🏼‍🦯",
    "man_with_probing_cane_tone4": "👨🏾‍🦯",
    "man_with_probing_cane_medium_dark_skin_tone": "👨🏾‍🦯",
    "man_with_probing_cane_tone5": "👨🏿‍🦯",
    "man_with_probing_cane_dark_skin_tone": "👨🏿‍🦯",
    "person_kneeling": "🧎",
    "person_kneeling_tone1": "🧎🏻",
    "person_kneeling_light_skin_tone": "🧎🏻",
    "person_kneeling_tone2": "🧎🏼",
    "person_kneeling_medium_light_skin_tone": "🧎🏼",
    "person_kneeling_tone3": "🧎🏽",
    "person_kneeling_medium_skin_tone": "🧎🏽",
    "person_kneeling_tone4": "🧎🏾",
    "person_kneeling_medium_dark_skin_tone": "🧎🏾",
    "person_kneeling_tone5": "🧎🏿",
    "person_kneeling_dark_skin_tone": "🧎🏿",
    "woman_kneeling": "🧎‍♀️",
    "woman_kneeling_tone1": "🧎🏻‍♀️",
    "woman_kneeling_light_skin_tone": "🧎🏻‍♀️",
    "woman_kneeling_tone2": "🧎🏼‍♀️",
    "woman_kneeling_medium_light_skin_tone": "🧎🏼‍♀️",
    "woman_kneeling_tone3": "🧎🏽‍♀️",
    "woman_kneeling_medium_skin_tone": "🧎🏽‍♀️",
    "woman_kneeling_tone4": "🧎🏾‍♀️",
    "woman_kneeling_medium_dark_skin_tone": "🧎🏾‍♀️",
    "woman_kneeling_tone5": "🧎🏿‍♀️",
    "woman_kneeling_dark_skin_tone": "🧎🏿‍♀️",
    "man_kneeling": "🧎‍♂️",
    "man_kneeling_tone1": "🧎🏻‍♂️",
    "man_kneeling_light_skin_tone": "🧎🏻‍♂️",
    "man_kneeling_tone2": "🧎🏼‍♂️",
    "man_kneeling_medium_light_skin_tone": "🧎🏼‍♂️",
    "man_kneeling_tone3": "🧎🏽‍♂️",
    "man_kneeling_medium_skin_tone": "🧎🏽‍♂️",
    "man_kneeling_tone4": "🧎🏾‍♂️",
    "man_kneeling_medium_dark_skin_tone": "🧎🏾‍♂️",
    "man_kneeling_tone5": "🧎🏿‍♂️",
    "man_kneeling_dark_skin_tone": "🧎🏿‍♂️",
    "person_running": "🏃",
    "runner": "🏃",
    "person_running_tone1": "🏃🏻",
    "runner_tone1": "🏃🏻",
    "person_running_tone2": "🏃🏼",
    "runner_tone2": "🏃🏼",
    "person_running_tone3": "🏃🏽",
    "runner_tone3": "🏃🏽",
    "person_running_tone4": "🏃🏾",
    "runner_tone4": "🏃🏾",
    "person_running_tone5": "🏃🏿",
    "runner_tone5": "🏃🏿",
    "woman_running": "🏃‍♀️",
    "woman_running_tone1": "🏃🏻‍♀️",
    "woman_running_light_skin_tone": "🏃🏻‍♀️",
    "woman_running_tone2": "🏃🏼‍♀️",
    "woman_running_medium_light_skin_tone": "🏃🏼‍♀️",
    "woman_running_tone3": "🏃🏽‍♀️",
    "woman_running_medium_skin_tone": "🏃🏽‍♀️",
    "woman_running_tone4": "🏃🏾‍♀️",
    "woman_running_medium_dark_skin_tone": "🏃🏾‍♀️",
    "woman_running_tone5": "🏃🏿‍♀️",
    "woman_running_dark_skin_tone": "🏃🏿‍♀️",
    "man_running": "🏃‍♂️",
    "man_running_tone1": "🏃🏻‍♂️",
    "man_running_light_skin_tone": "🏃🏻‍♂️",
    "man_running_tone2": "🏃🏼‍♂️",
    "man_running_medium_light_skin_tone": "🏃🏼‍♂️",
    "man_running_tone3": "🏃🏽‍♂️",
    "man_running_medium_skin_tone": "🏃🏽‍♂️",
    "man_running_tone4": "🏃🏾‍♂️",
    "man_running_medium_dark_skin_tone": "🏃🏾‍♂️",
    "man_running_tone5": "🏃🏿‍♂️",
    "man_running_dark_skin_tone": "🏃🏿‍♂️",
    "person_standing": "🧍",
    "person_standing_tone1": "🧍🏻",
    "person_standing_light_skin_tone": "🧍🏻",
    "person_standing_tone2": "🧍🏼",
    "person_standing_medium_light_skin_tone": "🧍🏼",
    "person_standing_tone3": "🧍🏽",
    "person_standing_medium_skin_tone": "🧍🏽",
    "person_standing_tone4": "🧍🏾",
    "person_standing_medium_dark_skin_tone": "🧍🏾",
    "person_standing_tone5": "🧍🏿",
    "person_standing_dark_skin_tone": "🧍🏿",
    "woman_standing": "🧍‍♀️",
    "woman_standing_tone1": "🧍🏻‍♀️",
    "woman_standing_light_skin_tone": "🧍🏻‍♀️",
    "woman_standing_tone2": "🧍🏼‍♀️",
    "woman_standing_medium_light_skin_tone": "🧍🏼‍♀️",
    "woman_standing_tone3": "🧍🏽‍♀️",
    "woman_standing_medium_skin_tone": "🧍🏽‍♀️",
    "woman_standing_tone4": "🧍🏾‍♀️",
    "woman_standing_medium_dark_skin_tone": "🧍🏾‍♀️",
    "woman_standing_tone5": "🧍🏿‍♀️",
    "woman_standing_dark_skin_tone": "🧍🏿‍♀️",
    "man_standing": "🧍‍♂️",
    "man_standing_tone1": "🧍🏻‍♂️",
    "man_standing_light_skin_tone": "🧍🏻‍♂️",
    "man_standing_tone2": "🧍🏼‍♂️",
    "man_standing_medium_light_skin_tone": "🧍🏼‍♂️",
    "man_standing_tone3": "🧍🏽‍♂️",
    "man_standing_medium_skin_tone": "🧍🏽‍♂️",
    "man_standing_tone4": "🧍🏾‍♂️",
    "man_standing_medium_dark_skin_tone": "🧍🏾‍♂️",
    "man_standing_tone5": "🧍🏿‍♂️",
    "man_standing_dark_skin_tone": "🧍🏿‍♂️",
    "people_holding_hands": "🧑‍🤝‍🧑",
    "people_holding_hands_tone1": "🧑🏻‍🤝‍🧑🏻",
    "people_holding_hands_light_skin_tone": "🧑🏻‍🤝‍🧑🏻",
    "people_holding_hands_tone1_tone2": "🧑🏻‍🤝‍🧑🏼",
    "people_holding_hands_light_skin_tone_medium_light_skin_tone": "🧑🏻‍🤝‍🧑🏼",
    "people_holding_hands_tone1_tone3": "🧑🏻‍🤝‍🧑🏽",
    "people_holding_hands_light_skin_tone_medium_skin_tone": "🧑🏻‍🤝‍🧑🏽",
    "people_holding_hands_tone1_tone4": "🧑🏻‍🤝‍🧑🏾",
    "people_holding_hands_light_skin_tone_medium_dark_skin_tone": "🧑🏻‍🤝‍🧑🏾",
    "people_holding_hands_tone1_tone5": "🧑🏻‍🤝‍🧑🏿",
    "people_holding_hands_light_skin_tone_dark_skin_tone": "🧑🏻‍🤝‍🧑🏿",
    "people_holding_hands_tone2_tone1": "🧑🏼‍🤝‍🧑🏻",
    "people_holding_hands_medium_light_skin_tone_light_skin_tone": "🧑🏼‍🤝‍🧑🏻",
    "people_holding_hands_tone2": "🧑🏼‍🤝‍🧑🏼",
    "people_holding_hands_medium_light_skin_tone": "🧑🏼‍🤝‍🧑🏼",
    "people_holding_hands_tone2_tone3": "🧑🏼‍🤝‍🧑🏽",
    "people_holding_hands_medium_light_skin_tone_medium_skin_tone": "🧑🏼‍🤝‍🧑🏽",
    "people_holding_hands_tone2_tone4": "🧑🏼‍🤝‍🧑🏾",
    "people_holding_hands_medium_light_skin_tone_medium_dark_skin_tone": "🧑🏼‍🤝‍🧑🏾",
    "people_holding_hands_tone2_tone5": "🧑🏼‍🤝‍🧑🏿",
    "people_holding_hands_medium_light_skin_tone_dark_skin_tone": "🧑🏼‍🤝‍🧑🏿",
    "people_holding_hands_tone3_tone1": "🧑🏽‍🤝‍🧑🏻",
    "people_holding_hands_medium_skin_tone_light_skin_tone": "🧑🏽‍🤝‍🧑🏻",
    "people_holding_hands_tone3_tone2": "🧑🏽‍🤝‍🧑🏼",
    "people_holding_hands_medium_skin_tone_medium_light_skin_tone": "🧑🏽‍🤝‍🧑🏼",
    "people_holding_hands_tone3": "🧑🏽‍🤝‍🧑🏽",
    "people_holding_hands_medium_skin_tone": "🧑🏽‍🤝‍🧑🏽",
    "people_holding_hands_tone3_tone4": "🧑🏽‍🤝‍🧑🏾",
    "people_holding_hands_medium_skin_tone_medium_dark_skin_tone": "🧑🏽‍🤝‍🧑🏾",
    "people_holding_hands_tone3_tone5": "🧑🏽‍🤝‍🧑🏿",
    "people_holding_hands_medium_skin_tone_dark_skin_tone": "🧑🏽‍🤝‍🧑🏿",
    "people_holding_hands_tone4_tone1": "🧑🏾‍🤝‍🧑🏻",
    "people_holding_hands_medium_dark_skin_tone_light_skin_tone": "🧑🏾‍🤝‍🧑🏻",
    "people_holding_hands_tone4_tone2": "🧑🏾‍🤝‍🧑🏼",
    "people_holding_hands_medium_dark_skin_tone_medium_light_skin_tone": "🧑🏾‍🤝‍🧑🏼",
    "people_holding_hands_tone4_tone3": "🧑🏾‍🤝‍🧑🏽",
    "people_holding_hands_medium_dark_skin_tone_medium_skin_tone": "🧑🏾‍🤝‍🧑🏽",
    "people_holding_hands_tone4": "🧑🏾‍🤝‍🧑🏾",
    "people_holding_hands_medium_dark_skin_tone": "🧑🏾‍🤝‍🧑🏾",
    "people_holding_hands_tone4_tone5": "🧑🏾‍🤝‍🧑🏿",
    "people_holding_hands_medium_dark_skin_tone_dark_skin_tone": "🧑🏾‍🤝‍🧑🏿",
    "people_holding_hands_tone5_tone1": "🧑🏿‍🤝‍🧑🏻",
    "people_holding_hands_dark_skin_tone_light_skin_tone": "🧑🏿‍🤝‍🧑🏻",
    "people_holding_hands_tone5_tone2": "🧑🏿‍🤝‍🧑🏼",
    "people_holding_hands_dark_skin_tone_medium_light_skin_tone": "🧑🏿‍🤝‍🧑🏼",
    "people_holding_hands_tone5_tone3": "🧑🏿‍🤝‍🧑🏽",
    "people_holding_hands_dark_skin_tone_medium_skin_tone": "🧑🏿‍🤝‍🧑🏽",
    "people_holding_hands_tone5_tone4": "🧑🏿‍🤝‍🧑🏾",
    "people_holding_hands_dark_skin_tone_medium_dark_skin_tone": "🧑🏿‍🤝‍🧑🏾",
    "people_holding_hands_tone5": "🧑🏿‍🤝‍🧑🏿",
    "people_holding_hands_dark_skin_tone": "🧑🏿‍🤝‍🧑🏿",
    "couple": "👫",
    "woman_and_man_holding_hands_tone1": "👫🏻",
    "woman_and_man_holding_hands_light_skin_tone": "👫🏻",
    "woman_and_man_holding_hands_tone1_tone2": "👩🏻‍🤝‍👨🏼",
    "woman_and_man_holding_hands_light_skin_tone_medium_light_skin_tone": "👩🏻‍🤝‍👨🏼",
    "woman_and_man_holding_hands_tone1_tone3": "👩🏻‍🤝‍👨🏽",
    "woman_and_man_holding_hands_light_skin_tone_medium_skin_tone": "👩🏻‍🤝‍👨🏽",
    "woman_and_man_holding_hands_tone1_tone4": "👩🏻‍🤝‍👨🏾",
    "woman_and_man_holding_hands_light_skin_tone_medium_dark_skin_tone": "👩🏻‍🤝‍👨🏾",
    "woman_and_man_holding_hands_tone1_tone5": "👩🏻‍🤝‍👨🏿",
    "woman_and_man_holding_hands_light_skin_tone_dark_skin_tone": "👩🏻‍🤝‍👨🏿",
    "woman_and_man_holding_hands_tone2_tone1": "👩🏼‍🤝‍👨🏻",
    "woman_and_man_holding_hands_medium_light_skin_tone_light_skin_tone": "👩🏼‍🤝‍👨🏻",
    "woman_and_man_holding_hands_tone2": "👫🏼",
    "woman_and_man_holding_hands_medium_light_skin_tone": "👫🏼",
    "woman_and_man_holding_hands_tone2_tone3": "👩🏼‍🤝‍👨🏽",
    "woman_and_man_holding_hands_medium_light_skin_tone_medium_skin_tone": "👩🏼‍🤝‍👨🏽",
    "woman_and_man_holding_hands_tone2_tone4": "👩🏼‍🤝‍👨🏾",
    "woman_and_man_holding_hands_medium_light_skin_tone_medium_dark_skin_tone": "👩🏼‍🤝‍👨🏾",
    "woman_and_man_holding_hands_tone2_tone5": "👩🏼‍🤝‍👨🏿",
    "woman_and_man_holding_hands_medium_light_skin_tone_dark_skin_tone": "👩🏼‍🤝‍👨🏿",
    "woman_and_man_holding_hands_tone3_tone1": "👩🏽‍🤝‍👨🏻",
    "woman_and_man_holding_hands_medium_skin_tone_light_skin_tone": "👩🏽‍🤝‍👨🏻",
    "woman_and_man_holding_hands_tone3_tone2": "👩🏽‍🤝‍👨🏼",
    "woman_and_man_holding_hands_medium_skin_tone_medium_light_skin_tone": "👩🏽‍🤝‍👨🏼",
    "woman_and_man_holding_hands_tone3": "👫🏽",
    "woman_and_man_holding_hands_medium_skin_tone": "👫🏽",
    "woman_and_man_holding_hands_tone3_tone4": "👩🏽‍🤝‍👨🏾",
    "woman_and_man_holding_hands_medium_skin_tone_medium_dark_skin_tone": "👩🏽‍🤝‍👨🏾",
    "woman_and_man_holding_hands_tone3_tone5": "👩🏽‍🤝‍👨🏿",
    "woman_and_man_holding_hands_medium_skin_tone_dark_skin_tone": "👩🏽‍🤝‍👨🏿",
    "woman_and_man_holding_hands_tone4_tone1": "👩🏾‍🤝‍👨🏻",
    "woman_and_man_holding_hands_medium_dark_skin_tone_light_skin_tone": "👩🏾‍🤝‍👨🏻",
    "woman_and_man_holding_hands_tone4_tone2": "👩🏾‍🤝‍👨🏼",
    "woman_and_man_holding_hands_medium_dark_skin_tone_medium_light_skin_tone": "👩🏾‍🤝‍👨🏼",
    "woman_and_man_holding_hands_tone4_tone3": "👩🏾‍🤝‍👨🏽",
    "woman_and_man_holding_hands_medium_dark_skin_tone_medium_skin_tone": "👩🏾‍🤝‍👨🏽",
    "woman_and_man_holding_hands_tone4": "👫🏾",
    "woman_and_man_holding_hands_medium_dark_skin_tone": "👫🏾",
    "woman_and_man_holding_hands_tone4_tone5": "👩🏾‍🤝‍👨🏿",
    "woman_and_man_holding_hands_medium_dark_skin_tone_dark_skin_tone": "👩🏾‍🤝‍👨🏿",
    "woman_and_man_holding_hands_tone5_tone1": "👩🏿‍🤝‍👨🏻",
    "woman_and_man_holding_hands_dark_skin_tone_light_skin_tone": "👩🏿‍🤝‍👨🏻",
    "woman_and_man_holding_hands_tone5_tone2": "👩🏿‍🤝‍👨🏼",
    "woman_and_man_holding_hands_dark_skin_tone_medium_light_skin_tone": "👩🏿‍🤝‍👨🏼",
    "woman_and_man_holding_hands_tone5_tone3": "👩🏿‍🤝‍👨🏽",
    "woman_and_man_holding_hands_dark_skin_tone_medium_skin_tone": "👩🏿‍🤝‍👨🏽",
    "woman_and_man_holding_hands_tone5_tone4": "👩🏿‍🤝‍👨🏾",
    "woman_and_man_holding_hands_dark_skin_tone_medium_dark_skin_tone": "👩🏿‍🤝‍👨🏾",
    "woman_and_man_holding_hands_tone5": "👫🏿",
    "woman_and_man_holding_hands_dark_skin_tone": "👫🏿",
    "two_women_holding_hands": "👭",
    "women_holding_hands_tone1": "👭🏻",
    "women_holding_hands_light_skin_tone": "👭🏻",
    "women_holding_hands_tone1_tone2": "👩🏻‍🤝‍👩🏼",
    "women_holding_hands_light_skin_tone_medium_light_skin_tone": "👩🏻‍🤝‍👩🏼",
    "women_holding_hands_tone1_tone3": "👩🏻‍🤝‍👩🏽",
    "women_holding_hands_light_skin_tone_medium_skin_tone": "👩🏻‍🤝‍👩🏽",
    "women_holding_hands_tone1_tone4": "👩🏻‍🤝‍👩🏾",
    "women_holding_hands_light_skin_tone_medium_dark_skin_tone": "👩🏻‍🤝‍👩🏾",
    "women_holding_hands_tone1_tone5": "👩🏻‍🤝‍👩🏿",
    "women_holding_hands_light_skin_tone_dark_skin_tone": "👩🏻‍🤝‍👩🏿",
    "women_holding_hands_tone2_tone1": "👩🏼‍🤝‍👩🏻",
    "women_holding_hands_medium_light_skin_tone_light_skin_tone": "👩🏼‍🤝‍👩🏻",
    "women_holding_hands_tone2": "👭🏼",
    "women_holding_hands_medium_light_skin_tone": "👭🏼",
    "women_holding_hands_tone2_tone3": "👩🏼‍🤝‍👩🏽",
    "women_holding_hands_medium_light_skin_tone_medium_skin_tone": "👩🏼‍🤝‍👩🏽",
    "women_holding_hands_tone2_tone4": "👩🏼‍🤝‍👩🏾",
    "women_holding_hands_medium_light_skin_tone_medium_dark_skin_tone": "👩🏼‍🤝‍👩🏾",
    "women_holding_hands_tone2_tone5": "👩🏼‍🤝‍👩🏿",
    "women_holding_hands_medium_light_skin_tone_dark_skin_tone": "👩🏼‍🤝‍👩🏿",
    "women_holding_hands_tone3_tone1": "👩🏽‍🤝‍👩🏻",
    "women_holding_hands_medium_skin_tone_light_skin_tone": "👩🏽‍🤝‍👩🏻",
    "women_holding_hands_tone3_tone2": "👩🏽‍🤝‍👩🏼",
    "women_holding_hands_medium_skin_tone_medium_light_skin_tone": "👩🏽‍🤝‍👩🏼",
    "women_holding_hands_tone3": "👭🏽",
    "women_holding_hands_medium_skin_tone": "👭🏽",
    "women_holding_hands_tone3_tone4": "👩🏽‍🤝‍👩🏾",
    "women_holding_hands_medium_skin_tone_medium_dark_skin_tone": "👩🏽‍🤝‍👩🏾",
    "women_holding_hands_tone3_tone5": "👩🏽‍🤝‍👩🏿",
    "women_holding_hands_medium_skin_tone_dark_skin_tone": "👩🏽‍🤝‍👩🏿",
    "women_holding_hands_tone4_tone1": "👩🏾‍🤝‍👩🏻",
    "women_holding_hands_medium_dark_skin_tone_light_skin_tone": "👩🏾‍🤝‍👩🏻",
    "women_holding_hands_tone4_tone2": "👩🏾‍🤝‍👩🏼",
    "women_holding_hands_medium_dark_skin_tone_medium_light_skin_tone": "👩🏾‍🤝‍👩🏼",
    "women_holding_hands_tone4_tone3": "👩🏾‍🤝‍👩🏽",
    "women_holding_hands_medium_dark_skin_tone_medium_skin_tone": "👩🏾‍🤝‍👩🏽",
    "women_holding_hands_tone4": "👭🏾",
    "women_holding_hands_medium_dark_skin_tone": "👭🏾",
    "women_holding_hands_tone4_tone5": "👩🏾‍🤝‍👩🏿",
    "women_holding_hands_medium_dark_skin_tone_dark_skin_tone": "👩🏾‍🤝‍👩🏿",
    "women_holding_hands_tone5_tone1": "👩🏿‍🤝‍👩🏻",
    "women_holding_hands_dark_skin_tone_light_skin_tone": "👩🏿‍🤝‍👩🏻",
    "women_holding_hands_tone5_tone2": "👩🏿‍🤝‍👩🏼",
    "women_holding_hands_dark_skin_tone_medium_light_skin_tone": "👩🏿‍🤝‍👩🏼",
    "women_holding_hands_tone5_tone3": "👩🏿‍🤝‍👩🏽",
    "women_holding_hands_dark_skin_tone_medium_skin_tone": "👩🏿‍🤝‍👩🏽",
    "women_holding_hands_tone5_tone4": "👩🏿‍🤝‍👩🏾",
    "women_holding_hands_dark_skin_tone_medium_dark_skin_tone": "👩🏿‍🤝‍👩🏾",
    "women_holding_hands_tone5": "👭🏿",
    "women_holding_hands_dark_skin_tone": "👭🏿",
    "two_men_holding_hands": "👬",
    "men_holding_hands_tone1": "👬🏻",
    "men_holding_hands_light_skin_tone": "👬🏻",
    "men_holding_hands_tone1_tone2": "👨🏻‍🤝‍👨🏼",
    "men_holding_hands_light_skin_tone_medium_light_skin_tone": "👨🏻‍🤝‍👨🏼",
    "men_holding_hands_tone1_tone3": "👨🏻‍🤝‍👨🏽",
    "men_holding_hands_light_skin_tone_medium_skin_tone": "👨🏻‍🤝‍👨🏽",
    "men_holding_hands_tone1_tone4": "👨🏻‍🤝‍👨🏾",
    "men_holding_hands_light_skin_tone_medium_dark_skin_tone": "👨🏻‍🤝‍👨🏾",
    "men_holding_hands_tone1_tone5": "👨🏻‍🤝‍👨🏿",
    "men_holding_hands_light_skin_tone_dark_skin_tone": "👨🏻‍🤝‍👨🏿",
    "men_holding_hands_tone2_tone1": "👨🏼‍🤝‍👨🏻",
    "men_holding_hands_medium_light_skin_tone_light_skin_tone": "👨🏼‍🤝‍👨🏻",
    "men_holding_hands_tone2": "👬🏼",
    "men_holding_hands_medium_light_skin_tone": "👬🏼",
    "men_holding_hands_tone2_tone3": "👨🏼‍🤝‍👨🏽",
    "men_holding_hands_medium_light_skin_tone_medium_skin_tone": "👨🏼‍🤝‍👨🏽",
    "men_holding_hands_tone2_tone4": "👨🏼‍🤝‍👨🏾",
    "men_holding_hands_medium_light_skin_tone_medium_dark_skin_tone": "👨🏼‍🤝‍👨🏾",
    "men_holding_hands_tone2_tone5": "👨🏼‍🤝‍👨🏿",
    "men_holding_hands_medium_light_skin_tone_dark_skin_tone": "👨🏼‍🤝‍👨🏿",
    "men_holding_hands_tone3_tone1": "👨🏽‍🤝‍👨🏻",
    "men_holding_hands_medium_skin_tone_light_skin_tone": "👨🏽‍🤝‍👨🏻",
    "men_holding_hands_tone3_tone2": "👨🏽‍🤝‍👨🏼",
    "men_holding_hands_medium_skin_tone_medium_light_skin_tone": "👨🏽‍🤝‍👨🏼",
    "men_holding_hands_tone3": "👬🏽",
    "men_holding_hands_medium_skin_tone": "👬🏽",
    "men_holding_hands_tone3_tone4": "👨🏽‍🤝‍👨🏾",
    "men_holding_hands_medium_skin_tone_medium_dark_skin_tone": "👨🏽‍🤝‍👨🏾",
    "men_holding_hands_tone3_tone5": "👨🏽‍🤝‍👨🏿",
    "men_holding_hands_medium_skin_tone_dark_skin_tone": "👨🏽‍🤝‍👨🏿",
    "men_holding_hands_tone4_tone1": "👨🏾‍🤝‍👨🏻",
    "men_holding_hands_medium_dark_skin_tone_light_skin_tone": "👨🏾‍🤝‍👨🏻",
    "men_holding_hands_tone4_tone2": "👨🏾‍🤝‍👨🏼",
    "men_holding_hands_medium_dark_skin_tone_medium_light_skin_tone": "👨🏾‍🤝‍👨🏼",
    "men_holding_hands_tone4_tone3": "👨🏾‍🤝‍👨🏽",
    "men_holding_hands_medium_dark_skin_tone_medium_skin_tone": "👨🏾‍🤝‍👨🏽",
    "men_holding_hands_tone4": "👬🏾",
    "men_holding_hands_medium_dark_skin_tone": "👬🏾",
    "men_holding_hands_tone4_tone5": "👨🏾‍🤝‍👨🏿",
    "men_holding_hands_medium_dark_skin_tone_dark_skin_tone": "👨🏾‍🤝‍👨🏿",
    "men_holding_hands_tone5_tone1": "👨🏿‍🤝‍👨🏻",
    "men_holding_hands_dark_skin_tone_light_skin_tone": "👨🏿‍🤝‍👨🏻",
    "men_holding_hands_tone5_tone2": "👨🏿‍🤝‍👨🏼",
    "men_holding_hands_dark_skin_tone_medium_light_skin_tone": "👨🏿‍🤝‍👨🏼",
    "men_holding_hands_tone5_tone3": "👨🏿‍🤝‍👨🏽",
    "men_holding_hands_dark_skin_tone_medium_skin_tone": "👨🏿‍🤝‍👨🏽",
    "men_holding_hands_tone5_tone4": "👨🏿‍🤝‍👨🏾",
    "men_holding_hands_dark_skin_tone_medium_dark_skin_tone": "👨🏿‍🤝‍👨🏾",
    "men_holding_hands_tone5": "👬🏿",
    "men_holding_hands_dark_skin_tone": "👬🏿",
    "couple_with_heart": "💑",
    "couple_with_heart_woman_man": "👩‍❤️‍👨",
    "couple_ww": "👩‍❤️‍👩",
    "couple_with_heart_ww": "👩‍❤️‍👩",
    "couple_mm": "👨‍❤️‍👨",
    "couple_with_heart_mm": "👨‍❤️‍👨",
    "couplekiss": "💏",
    "kiss_woman_man": "👩‍❤️‍💋‍👨",
    "kiss_ww": "👩‍❤️‍💋‍👩",
    "couplekiss_ww": "👩‍❤️‍💋‍👩",
    "kiss_mm": "👨‍❤️‍💋‍👨",
    "couplekiss_mm": "👨‍❤️‍💋‍👨",
    "family": "👪",
    "family_man_woman_boy": "👨‍👩‍👦",
    "family_mwg": "👨‍👩‍👧",
    "family_mwgb": "👨‍👩‍👧‍👦",
    "family_mwbb": "👨‍👩‍👦‍👦",
    "family_mwgg": "👨‍👩‍👧‍👧",
    "family_wwb": "👩‍👩‍👦",
    "family_wwg": "👩‍👩‍👧",
    "family_wwgb": "👩‍👩‍👧‍👦",
    "family_wwbb": "👩‍👩‍👦‍👦",
    "family_wwgg": "👩‍👩‍👧‍👧",
    "family_mmb": "👨‍👨‍👦",
    "family_mmg": "👨‍👨‍👧",
    "family_mmgb": "👨‍👨‍👧‍👦",
    "family_mmbb": "👨‍👨‍👦‍👦",
    "family_mmgg": "👨‍👨‍👧‍👧",
    "family_woman_boy": "👩‍👦",
    "family_woman_girl": "👩‍👧",
    "family_woman_girl_boy": "👩‍👧‍👦",
    "family_woman_boy_boy": "👩‍👦‍👦",
    "family_woman_girl_girl": "👩‍👧‍👧",
    "family_man_boy": "👨‍👦",
    "family_man_girl": "👨‍👧",
    "family_man_girl_boy": "👨‍👧‍👦",
    "family_man_boy_boy": "👨‍👦‍👦",
    "family_man_girl_girl": "👨‍👧‍👧",
    "yarn": "🧶",
    "thread": "🧵",
    "coat": "🧥",
    "lab_coat": "🥼",
    "safety_vest": "🦺",
    "womans_clothes": "👚",
    "shirt": "👕",
    "jeans": "👖",
    "briefs": "🩲",
    "shorts": "🩳",
    "necktie": "👔",
    "dress": "👗",
    "bikini": "👙",
    "one_piece_swimsuit": "🩱",
    "kimono": "👘",
    "sari": "🥻",
    "womans_flat_shoe": "🥿",
    "high_heel": "👠",
    "sandal": "👡",
    "boot": "👢",
    "mans_shoe": "👞",
    "athletic_shoe": "👟",
    "hiking_boot": "🥾",
    "thong_sandal": "🩴",
    "socks": "🧦",
    "gloves": "🧤",
    "scarf": "🧣",
    "tophat": "🎩",
    "billed_cap": "🧢",
    "womans_hat": "👒",
    "mortar_board": "🎓",
    "helmet_with_cross": "⛑️",
    "helmet_with_white_cross": "⛑️",
    "military_helmet": "🪖",
    "crown": "👑",
    "ring": "💍",
    "pouch": "👝",
    "purse": "👛",
    "handbag": "👜",
    "briefcase": "💼",
    "school_satchel": "🎒",
    "luggage": "🧳",
    "eyeglasses": "👓",
    "dark_sunglasses": "🕶️",
    "goggles": "🥽",
    "closed_umbrella": "🌂",
    "dog": "🐶",
    "cat": "🐱",
    "mouse": "🐭",
    "hamster": "🐹",
    "rabbit": "🐰",
    "fox": "🦊",
    "fox_face": "🦊",
    "bear": "🐻",
    "panda_face": "🐼",
    "polar_bear": "🐻‍❄️",
    "koala": "🐨",
    "tiger": "🐯",
    "lion_face": "🦁",
    "lion": "🦁",
    "cow": "🐮",
    "pig": "🐷",
    "pig_nose": "🐽",
    "frog": "🐸",
    "monkey_face": "🐵",
    "see_no_evil": "🙈",
    "hear_no_evil": "🙉",
    "speak_no_evil": "🙊",
    "monkey": "🐒",
    "chicken": "🐔",
    "penguin": "🐧",
    "bird": "🐦",
    "baby_chick": "🐤",
    "hatching_chick": "🐣",
    "hatched_chick": "🐥",
    "duck": "🦆",
    "dodo": "🦤",
    "eagle": "🦅",
    "owl": "🦉",
    "bat": "🦇",
    "wolf": "🐺",
    "boar": "🐗",
    "horse": "🐴",
    "unicorn": "🦄",
    "unicorn_face": "🦄",
    "bee": "🐝",
    "bug": "🐛",
    "butterfly": "🦋",
    "snail": "🐌",
    "worm": "🪱",
    "lady_beetle": "🐞",
    "ant": "🐜",
    "fly": "🪰",
    "mosquito": "🦟",
    "cockroach": "🪳",
    "beetle": "🪲",
    "cricket": "🦗",
    "spider": "🕷️",
    "spider_web": "🕸️",
    "scorpion": "🦂",
    "turtle": "🐢",
    "snake": "🐍",
    "lizard": "🦎",
    "t_rex": "🦖",
    "sauropod": "🦕",
    "octopus": "🐙",
    "squid": "🦑",
    "shrimp": "🦐",
    "lobster": "🦞",
    "crab": "🦀",
    "blowfish": "🐡",
    "tropical_fish": "🐠",
    "fish": "🐟",
    "seal": "🦭",
    "dolphin": "🐬",
    "whale": "🐳",
    "whale2": "🐋",
    "shark": "🦈",
    "crocodile": "🐊",
    "tiger2": "🐅",
    "leopard": "🐆",
    "zebra": "🦓",
    "gorilla": "🦍",
    "orangutan": "🦧",
    "elephant": "🐘",
    "mammoth": "🦣",
    "bison": "🦬",
    "hippopotamus": "🦛",
    "rhino": "🦏",
    "rhinoceros": "🦏",
    "dromedary_camel": "🐪",
    "camel": "🐫",
    "giraffe": "🦒",
    "kangaroo": "🦘",
    "water_buffalo": "🐃",
    "ox": "🐂",
    "cow2": "🐄",
    "racehorse": "🐎",
    "pig2": "🐖",
    "ram": "🐏",
    "sheep": "🐑",
    "llama": "🦙",
    "goat": "🐐",
    "deer": "🦌",
    "dog2": "🐕",
    "poodle": "🐩",
    "guide_dog": "🦮",
    "service_dog": "🐕‍🦺",
    "cat2": "🐈",
    "black_cat": "🐈‍⬛",
    "rooster": "🐓",
    "turkey": "🦃",
    "peacock": "🦚",
    "parrot": "🦜",
    "swan": "🦢",
    "flamingo": "🦩",
    "dove": "🕊️",
    "dove_of_peace": "🕊️",
    "rabbit2": "🐇",
    "raccoon": "🦝",
    "skunk": "🦨",
    "badger": "🦡",
    "beaver": "🦫",
    "otter": "🦦",
    "sloth": "🦥",
    "mouse2": "🐁",
    "rat": "🐀",
    "chipmunk": "🐿️",
    "hedgehog": "🦔",
    "feet": "🐾",
    "paw_prints": "🐾",
    "dragon": "🐉",
    "dragon_face": "🐲",
    "cactus": "🌵",
    "christmas_tree": "🎄",
    "evergreen_tree": "🌲",
    "deciduous_tree": "🌳",
    "palm_tree": "🌴",
    "seedling": "🌱",
    "herb": "🌿",
    "shamrock": "☘️",
    "four_leaf_clover": "🍀",
    "bamboo": "🎍",
    "tanabata_tree": "🎋",
    "leaves": "🍃",
    "fallen_leaf": "🍂",
    "maple_leaf": "🍁",
    "feather": "🪶",
    "mushroom": "🍄",
    "shell": "🐚",
    "rock": "🪨",
    "wood": "🪵",
    "ear_of_rice": "🌾",
    "potted_plant": "🪴",
    "bouquet": "💐",
    "tulip": "🌷",
    "rose": "🌹",
    "wilted_rose": "🥀",
    "wilted_flower": "🥀",
    "wink": "😉",
    "unamused": "😒",
    "sweat_smile": "😅",
    "sweat": "😓",
    "sunglasses": "😎",
    "stuck_out_tongue": "😛",
    "sob": "😭",
    "smiling_imp": "😈",
    "slight_smile": "🙂",
    "pensive": "😔",
    "angry": "😠",
    "blush": "😊",
    "confused": "😕",
    "cry": "😢",
    "frowning": "😦",
    "frowning2": "☹️",
    "imp": "👿",
    "innocent": "😇",
    "joy": "😂",
    "kissing": "😗",
    "laughing": "😆",
    "neutral_face": "😐",
    "open_mouth": "😮",
    "rage": "😡",
    "smile": "😄",
    "stuck_out_tongue_winking_eye": "😜",
    "hibiscus": "🌺",
    "cherry_blossom": "🌸",
    "blossom": "🌼",
    "sunflower": "🌻",
    "sun_with_face": "🌞",
    "full_moon_with_face": "🌝",
    "first_quarter_moon_with_face": "🌛",
    "last_quarter_moon_with_face": "🌜",
    "new_moon_with_face": "🌚",
    "full_moon": "🌕",
    "waning_gibbous_moon": "🌖",
    "last_quarter_moon": "🌗",
    "waning_crescent_moon": "🌘",
    "new_moon": "🌑",
    "waxing_crescent_moon": "🌒",
    "first_quarter_moon": "🌓",
    "waxing_gibbous_moon": "🌔",
    "crescent_moon": "🌙",
    "earth_americas": "🌎",
    "earth_africa": "🌍",
    "earth_asia": "🌏",
    "ringed_planet": "🪐",
    "dizzy": "💫",
    "star": "⭐",
    "star2": "🌟",
    "sparkles": "✨",
    "zap": "⚡",
    "comet": "☄️",
    "boom": "💥",
    "fire": "🔥",
    "flame": "🔥",
    "cloud_tornado": "🌪️",
    "cloud_with_tornado": "🌪️",
    "rainbow": "🌈",
    "sunny": "☀️",
    "white_sun_small_cloud": "🌤️",
    "white_sun_with_small_cloud": "🌤️",
    "partly_sunny": "⛅",
    "white_sun_cloud": "🌥️",
    "white_sun_behind_cloud": "🌥️",
    "cloud": "☁️",
    "white_sun_rain_cloud": "🌦️",
    "white_sun_behind_cloud_with_rain": "🌦️",
    "cloud_rain": "🌧️",
    "cloud_with_rain": "🌧️",
    "thunder_cloud_rain": "⛈️",
    "thunder_cloud_and_rain": "⛈️",
    "cloud_lightning": "🌩️",
    "cloud_with_lightning": "🌩️",
    "cloud_snow": "🌨️",
    "cloud_with_snow": "🌨️",
    "snowflake": "❄️",
    "snowman2": "☃️",
    "snowman": "⛄",
    "wind_blowing_face": "🌬️",
    "dash": "💨",
    "droplet": "💧",
    "sweat_drops": "💦",
    "umbrella": "☔",
    "umbrella2": "☂️",
    "ocean": "🌊",
    "fog": "🌫️",
    "green_apple": "🍏",
    "apple": "🍎",
    "pear": "🍐",
    "tangerine": "🍊",
    "lemon": "🍋",
    "banana": "🍌",
    "watermelon": "🍉",
    "grapes": "🍇",
    "blueberries": "🫐",
    "strawberry": "🍓",
    "melon": "🍈",
    "cherries": "🍒",
    "peach": "🍑",
    "mango": "🥭",
    "pineapple": "🍍",
    "coconut": "🥥",
    "kiwi": "🥝",
    "kiwifruit": "🥝",
    "tomato": "🍅",
    "eggplant": "🍆",
    "avocado": "🥑",
    "olive": "🫒",
    "broccoli": "🥦",
    "leafy_green": "🥬",
    "bell_pepper": "🫑",
    "cucumber": "🥒",
    "hot_pepper": "🌶️",
    "corn": "🌽",
    "carrot": "🥕",
    "garlic": "🧄",
    "onion": "🧅",
    "potato": "🥔",
    "sweet_potato": "🍠",
    "croissant": "🥐",
    "bagel": "🥯",
    "bread": "🍞",
    "french_bread": "🥖",
    "baguette_bread": "🥖",
    "flatbread": "🫓",
    "pretzel": "🥨",
    "cheese": "🧀",
    "cheese_wedge": "🧀",
    "egg": "🥚",
    "cooking": "🍳",
    "butter": "🧈",
    "pancakes": "🥞",
    "waffle": "🧇",
    "bacon": "🥓",
    "cut_of_meat": "🥩",
    "poultry_leg": "🍗",
    "meat_on_bone": "🍖",
    "hotdog": "🌭",
    "hot_dog": "🌭",
    "hamburger": "🍔",
    "fries": "🍟",
    "pizza": "🍕",
    "sandwich": "🥪",
    "stuffed_flatbread": "🥙",
    "stuffed_pita": "🥙",
    "falafel": "🧆",
    "taco": "🌮",
    "burrito": "🌯",
    "tamale": "🫔",
    "salad": "🥗",
    "green_salad": "🥗",
    "shallow_pan_of_food": "🥘",
    "paella": "🥘",
    "fondue": "🫕",
    "canned_food": "🥫",
    "spaghetti": "🍝",
    "ramen": "🍜",
    "stew": "🍲",
    "curry": "🍛",
    "sushi": "🍣",
    "bento": "🍱",
    "dumpling": "🥟",
    "oyster": "🦪",
    "fried_shrimp": "🍤",
    "rice_ball": "🍙",
    "rice": "🍚",
    "rice_cracker": "🍘",
    "fish_cake": "🍥",
    "fortune_cookie": "🥠",
    "moon_cake": "🥮",
    "oden": "🍢",
    "dango": "🍡",
    "shaved_ice": "🍧",
    "ice_cream": "🍨",
    "icecream": "🍦",
    "pie": "🥧",
    "cupcake": "🧁",
    "cake": "🍰",
    "birthday": "🎂",
    "custard": "🍮",
    "pudding": "🍮",
    "flan": "🍮",
    "lollipop": "🍭",
    "candy": "🍬",
    "chocolate_bar": "🍫",
    "popcorn": "🍿",
    "doughnut": "🍩",
    "cookie": "🍪",
    "chestnut": "🌰",
    "peanuts": "🥜",
    "shelled_peanut": "🥜",
    "honey_pot": "🍯",
    "milk": "🥛",
    "glass_of_milk": "🥛",
    "baby_bottle": "🍼",
    "coffee": "☕",
    "tea": "🍵",
    "teapot": "🫖",
    "mate": "🧉",
    "bubble_tea": "🧋",
    "beverage_box": "🧃",
    "cup_with_straw": "🥤",
    "sake": "🍶",
    "beer": "🍺",
    "beers": "🍻",
    "champagne_glass": "🥂",
    "clinking_glass": "🥂",
    "wine_glass": "🍷",
    "tumbler_glass": "🥃",
    "whisky": "🥃",
    "cocktail": "🍸",
    "tropical_drink": "🍹",
    "champagne": "🍾",
    "bottle_with_popping_cork": "🍾",
    "ice_cube": "🧊",
    "spoon": "🥄",
    "fork_and_knife": "🍴",
    "fork_knife_plate": "🍽️",
    "fork_and_knife_with_plate": "🍽️",
    "bowl_with_spoon": "🥣",
    "takeout_box": "🥡",
    "chopsticks": "🥢",
    "salt": "🧂",
    "soccer": "⚽",
    "basketball": "🏀",
    "football": "🏈",
    "baseball": "⚾",
    "softball": "🥎",
    "tennis": "🎾",
    "volleyball": "🏐",
    "rugby_football": "🏉",
    "flying_disc": "🥏",
    "boomerang": "🪃",
    "8ball": "🎱",
    "yo_yo": "🪀",
    "ping_pong": "🏓",
    "table_tennis": "🏓",
    "badminton": "🏸",
    "hockey": "🏒",
    "field_hockey": "🏑",
    "lacrosse": "🥍",
    "cricket_game": "🏏",
    "cricket_bat_ball": "🏏",
    "goal": "🥅",
    "goal_net": "🥅",
    "golf": "⛳",
    "kite": "🪁",
    "bow_and_arrow": "🏹",
    "archery": "🏹",
    "fishing_pole_and_fish": "🎣",
    "diving_mask": "🤿",
    "boxing_glove": "🥊",
    "boxing_gloves": "🥊",
    "martial_arts_uniform": "🥋",
    "karate_uniform": "🥋",
    "running_shirt_with_sash": "🎽",
    "skateboard": "🛹",
    "roller_skate": "🛼",
    "sled": "🛷",
    "ice_skate": "⛸️",
    "curling_stone": "🥌",
    "ski": "🎿",
    "skier": "⛷️",
    "snowboarder": "🏂",
    "snowboarder_tone1": "🏂🏻",
    "snowboarder_light_skin_tone": "🏂🏻",
    "snowboarder_tone2": "🏂🏼",
    "snowboarder_medium_light_skin_tone": "🏂🏼",
    "snowboarder_tone3": "🏂🏽",
    "snowboarder_medium_skin_tone": "🏂🏽",
    "snowboarder_tone4": "🏂🏾",
    "snowboarder_medium_dark_skin_tone": "🏂🏾",
    "snowboarder_tone5": "🏂🏿",
    "snowboarder_dark_skin_tone": "🏂🏿",
    "parachute": "🪂",
    "person_lifting_weights": "🏋️",
    "lifter": "🏋️",
    "weight_lifter": "🏋️",
    "person_lifting_weights_tone1": "🏋🏻",
    "lifter_tone1": "🏋🏻",
    "weight_lifter_tone1": "🏋🏻",
    "person_lifting_weights_tone2": "🏋🏼",
    "lifter_tone2": "🏋🏼",
    "weight_lifter_tone2": "🏋🏼",
    "person_lifting_weights_tone3": "🏋🏽",
    "lifter_tone3": "🏋🏽",
    "weight_lifter_tone3": "🏋🏽",
    "person_lifting_weights_tone4": "🏋🏾",
    "lifter_tone4": "🏋🏾",
    "weight_lifter_tone4": "🏋🏾",
    "person_lifting_weights_tone5": "🏋🏿",
    "lifter_tone5": "🏋🏿",
    "weight_lifter_tone5": "🏋🏿",
    "woman_lifting_weights": "🏋️‍♀️",
    "woman_lifting_weights_tone1": "🏋🏻‍♀️",
    "woman_lifting_weights_light_skin_tone": "🏋🏻‍♀️",
    "woman_lifting_weights_tone2": "🏋🏼‍♀️",
    "woman_lifting_weights_medium_light_skin_tone": "🏋🏼‍♀️",
    "woman_lifting_weights_tone3": "🏋🏽‍♀️",
    "woman_lifting_weights_medium_skin_tone": "🏋🏽‍♀️",
    "woman_lifting_weights_tone4": "🏋🏾‍♀️",
    "woman_lifting_weights_medium_dark_skin_tone": "🏋🏾‍♀️",
    "woman_lifting_weights_tone5": "🏋🏿‍♀️",
    "woman_lifting_weights_dark_skin_tone": "🏋🏿‍♀️",
    "man_lifting_weights": "🏋️‍♂️",
    "man_lifting_weights_tone1": "🏋🏻‍♂️",
    "man_lifting_weights_light_skin_tone": "🏋🏻‍♂️",
    "man_lifting_weights_tone2": "🏋🏼‍♂️",
    "man_lifting_weights_medium_light_skin_tone": "🏋🏼‍♂️",
    "man_lifting_weights_tone3": "🏋🏽‍♂️",
    "man_lifting_weights_medium_skin_tone": "🏋🏽‍♂️",
    "man_lifting_weights_tone4": "🏋🏾‍♂️",
    "man_lifting_weights_medium_dark_skin_tone": "🏋🏾‍♂️",
    "man_lifting_weights_tone5": "🏋🏿‍♂️",
    "man_lifting_weights_dark_skin_tone": "🏋🏿‍♂️",
    "people_wrestling": "🤼",
    "wrestlers": "🤼",
    "wrestling": "🤼",
    "women_wrestling": "🤼‍♀️",
    "men_wrestling": "🤼‍♂️",
    "person_doing_cartwheel": "🤸",
    "cartwheel": "🤸",
    "person_doing_cartwheel_tone1": "🤸🏻",
    "cartwheel_tone1": "🤸🏻",
    "person_doing_cartwheel_tone2": "🤸🏼",
    "cartwheel_tone2": "🤸🏼",
    "person_doing_cartwheel_tone3": "🤸🏽",
    "cartwheel_tone3": "🤸🏽",
    "person_doing_cartwheel_tone4": "🤸🏾",
    "cartwheel_tone4": "🤸🏾",
    "person_doing_cartwheel_tone5": "🤸🏿",
    "cartwheel_tone5": "🤸🏿",
    "woman_cartwheeling": "🤸‍♀️",
    "woman_cartwheeling_tone1": "🤸🏻‍♀️",
    "woman_cartwheeling_light_skin_tone": "🤸🏻‍♀️",
    "woman_cartwheeling_tone2": "🤸🏼‍♀️",
    "woman_cartwheeling_medium_light_skin_tone": "🤸🏼‍♀️",
    "woman_cartwheeling_tone3": "🤸🏽‍♀️",
    "woman_cartwheeling_medium_skin_tone": "🤸🏽‍♀️",
    "woman_cartwheeling_tone4": "🤸🏾‍♀️",
    "woman_cartwheeling_medium_dark_skin_tone": "🤸🏾‍♀️",
    "woman_cartwheeling_tone5": "🤸🏿‍♀️",
    "woman_cartwheeling_dark_skin_tone": "🤸🏿‍♀️",
    "man_cartwheeling": "🤸‍♂️",
    "man_cartwheeling_tone1": "🤸🏻‍♂️",
    "man_cartwheeling_light_skin_tone": "🤸🏻‍♂️",
    "man_cartwheeling_tone2": "🤸🏼‍♂️",
    "man_cartwheeling_medium_light_skin_tone": "🤸🏼‍♂️",
    "man_cartwheeling_tone3": "🤸🏽‍♂️",
    "man_cartwheeling_medium_skin_tone": "🤸🏽‍♂️",
    "man_cartwheeling_tone4": "🤸🏾‍♂️",
    "man_cartwheeling_medium_dark_skin_tone": "🤸🏾‍♂️",
    "man_cartwheeling_tone5": "🤸🏿‍♂️",
    "man_cartwheeling_dark_skin_tone": "🤸🏿‍♂️",
    "person_bouncing_ball": "⛹️",
    "basketball_player": "⛹️",
    "person_with_ball": "⛹️",
    "person_bouncing_ball_tone1": "⛹🏻",
    "basketball_player_tone1": "⛹🏻",
    "person_with_ball_tone1": "⛹🏻",
    "person_bouncing_ball_tone2": "⛹🏼",
    "basketball_player_tone2": "⛹🏼",
    "person_with_ball_tone2": "⛹🏼",
    "person_bouncing_ball_tone3": "⛹🏽",
    "basketball_player_tone3": "⛹🏽",
    "person_with_ball_tone3": "⛹🏽",
    "person_bouncing_ball_tone4": "⛹🏾",
    "basketball_player_tone4": "⛹🏾",
    "person_with_ball_tone4": "⛹🏾",
    "person_bouncing_ball_tone5": "⛹🏿",
    "basketball_player_tone5": "⛹🏿",
    "person_with_ball_tone5": "⛹🏿",
    "woman_bouncing_ball": "⛹️‍♀️",
    "woman_bouncing_ball_tone1": "⛹🏻‍♀️",
    "woman_bouncing_ball_light_skin_tone": "⛹🏻‍♀️",
    "woman_bouncing_ball_tone2": "⛹🏼‍♀️",
    "woman_bouncing_ball_medium_light_skin_tone": "⛹🏼‍♀️",
    "woman_bouncing_ball_tone3": "⛹🏽‍♀️",
    "woman_bouncing_ball_medium_skin_tone": "⛹🏽‍♀️",
    "woman_bouncing_ball_tone4": "⛹🏾‍♀️",
    "woman_bouncing_ball_medium_dark_skin_tone": "⛹🏾‍♀️",
    "woman_bouncing_ball_tone5": "⛹🏿‍♀️",
    "woman_bouncing_ball_dark_skin_tone": "⛹🏿‍♀️",
    "man_bouncing_ball": "⛹️‍♂️",
    "man_bouncing_ball_tone1": "⛹🏻‍♂️",
    "man_bouncing_ball_light_skin_tone": "⛹🏻‍♂️",
    "man_bouncing_ball_tone2": "⛹🏼‍♂️",
    "man_bouncing_ball_medium_light_skin_tone": "⛹🏼‍♂️",
    "man_bouncing_ball_tone3": "⛹🏽‍♂️",
    "man_bouncing_ball_medium_skin_tone": "⛹🏽‍♂️",
    "man_bouncing_ball_tone4": "⛹🏾‍♂️",
    "man_bouncing_ball_medium_dark_skin_tone": "⛹🏾‍♂️",
    "man_bouncing_ball_tone5": "⛹🏿‍♂️",
    "man_bouncing_ball_dark_skin_tone": "⛹🏿‍♂️",
    "person_fencing": "🤺",
    "fencer": "🤺",
    "fencing": "🤺",
    "person_playing_handball": "🤾",
    "handball": "🤾",
    "person_playing_handball_tone1": "🤾🏻",
    "handball_tone1": "🤾🏻",
    "person_playing_handball_tone2": "🤾🏼",
    "handball_tone2": "🤾🏼",
    "person_playing_handball_tone3": "🤾🏽",
    "handball_tone3": "🤾🏽",
    "person_playing_handball_tone4": "🤾🏾",
    "handball_tone4": "🤾🏾",
    "person_playing_handball_tone5": "🤾🏿",
    "handball_tone5": "🤾🏿",
    "woman_playing_handball": "🤾‍♀️",
    "woman_playing_handball_tone1": "🤾🏻‍♀️",
    "woman_playing_handball_light_skin_tone": "🤾🏻‍♀️",
    "woman_playing_handball_tone2": "🤾🏼‍♀️",
    "woman_playing_handball_medium_light_skin_tone": "🤾🏼‍♀️",
    "woman_playing_handball_tone3": "🤾🏽‍♀️",
    "woman_playing_handball_medium_skin_tone": "🤾🏽‍♀️",
    "woman_playing_handball_tone4": "🤾🏾‍♀️",
    "woman_playing_handball_medium_dark_skin_tone": "🤾🏾‍♀️",
    "woman_playing_handball_tone5": "🤾🏿‍♀️",
    "woman_playing_handball_dark_skin_tone": "🤾🏿‍♀️",
    "man_playing_handball": "🤾‍♂️",
    "man_playing_handball_tone1": "🤾🏻‍♂️",
    "man_playing_handball_light_skin_tone": "🤾🏻‍♂️",
    "man_playing_handball_tone2": "🤾🏼‍♂️",
    "man_playing_handball_medium_light_skin_tone": "🤾🏼‍♂️",
    "man_playing_handball_tone3": "🤾🏽‍♂️",
    "man_playing_handball_medium_skin_tone": "🤾🏽‍♂️",
    "man_playing_handball_tone4": "🤾🏾‍♂️",
    "man_playing_handball_medium_dark_skin_tone": "🤾🏾‍♂️",
    "man_playing_handball_tone5": "🤾🏿‍♂️",
    "man_playing_handball_dark_skin_tone": "🤾🏿‍♂️",
    "person_golfing": "🏌️",
    "golfer": "🏌️",
    "person_golfing_tone1": "🏌🏻",
    "person_golfing_light_skin_tone": "🏌🏻",
    "person_golfing_tone2": "🏌🏼",
    "person_golfing_medium_light_skin_tone": "🏌🏼",
    "person_golfing_tone3": "🏌🏽",
    "person_golfing_medium_skin_tone": "🏌🏽",
    "person_golfing_tone4": "🏌🏾",
    "person_golfing_medium_dark_skin_tone": "🏌🏾",
    "person_golfing_tone5": "🏌🏿",
    "person_golfing_dark_skin_tone": "🏌🏿",
    "woman_golfing": "🏌️‍♀️",
    "woman_golfing_tone1": "🏌🏻‍♀️",
    "woman_golfing_light_skin_tone": "🏌🏻‍♀️",
    "woman_golfing_tone2": "🏌🏼‍♀️",
    "woman_golfing_medium_light_skin_tone": "🏌🏼‍♀️",
    "woman_golfing_tone3": "🏌🏽‍♀️",
    "woman_golfing_medium_skin_tone": "🏌🏽‍♀️",
    "woman_golfing_tone4": "🏌🏾‍♀️",
    "woman_golfing_medium_dark_skin_tone": "🏌🏾‍♀️",
    "woman_golfing_tone5": "🏌🏿‍♀️",
    "woman_golfing_dark_skin_tone": "🏌🏿‍♀️",
    "man_golfing": "🏌️‍♂️",
    "man_golfing_tone1": "🏌🏻‍♂️",
    "man_golfing_light_skin_tone": "🏌🏻‍♂️",
    "man_golfing_tone2": "🏌🏼‍♂️",
    "man_golfing_medium_light_skin_tone": "🏌🏼‍♂️",
    "man_golfing_tone3": "🏌🏽‍♂️",
    "man_golfing_medium_skin_tone": "🏌🏽‍♂️",
    "man_golfing_tone4": "🏌🏾‍♂️",
    "man_golfing_medium_dark_skin_tone": "🏌🏾‍♂️",
    "man_golfing_tone5": "🏌🏿‍♂️",
    "man_golfing_dark_skin_tone": "🏌🏿‍♂️",
    "horse_racing": "🏇",
    "horse_racing_tone1": "🏇🏻",
    "horse_racing_tone2": "🏇🏼",
    "horse_racing_tone3": "🏇🏽",
    "horse_racing_tone4": "🏇🏾",
    "horse_racing_tone5": "🏇🏿",
    "person_in_lotus_position": "🧘",
    "person_in_lotus_position_tone1": "🧘🏻",
    "person_in_lotus_position_light_skin_tone": "🧘🏻",
    "person_in_lotus_position_tone2": "🧘🏼",
    "person_in_lotus_position_medium_light_skin_tone": "🧘🏼",
    "person_in_lotus_position_tone3": "🧘🏽",
    "person_in_lotus_position_medium_skin_tone": "🧘🏽",
    "person_in_lotus_position_tone4": "🧘🏾",
    "person_in_lotus_position_medium_dark_skin_tone": "🧘🏾",
    "person_in_lotus_position_tone5": "🧘🏿",
    "person_in_lotus_position_dark_skin_tone": "🧘🏿",
    "woman_in_lotus_position": "🧘‍♀️",
    "woman_in_lotus_position_tone1": "🧘🏻‍♀️",
    "woman_in_lotus_position_light_skin_tone": "🧘🏻‍♀️",
    "woman_in_lotus_position_tone2": "🧘🏼‍♀️",
    "woman_in_lotus_position_medium_light_skin_tone": "🧘🏼‍♀️",
    "woman_in_lotus_position_tone3": "🧘🏽‍♀️",
    "woman_in_lotus_position_medium_skin_tone": "🧘🏽‍♀️",
    "woman_in_lotus_position_tone4": "🧘🏾‍♀️",
    "woman_in_lotus_position_medium_dark_skin_tone": "🧘🏾‍♀️",
    "woman_in_lotus_position_tone5": "🧘🏿‍♀️",
    "woman_in_lotus_position_dark_skin_tone": "🧘🏿‍♀️",
    "man_in_lotus_position": "🧘‍♂️",
    "man_in_lotus_position_tone1": "🧘🏻‍♂️",
    "man_in_lotus_position_light_skin_tone": "🧘🏻‍♂️",
    "man_in_lotus_position_tone2": "🧘🏼‍♂️",
    "man_in_lotus_position_medium_light_skin_tone": "🧘🏼‍♂️",
    "man_in_lotus_position_tone3": "🧘🏽‍♂️",
    "man_in_lotus_position_medium_skin_tone": "🧘🏽‍♂️",
    "man_in_lotus_position_tone4": "🧘🏾‍♂️",
    "man_in_lotus_position_medium_dark_skin_tone": "🧘🏾‍♂️",
    "man_in_lotus_position_tone5": "🧘🏿‍♂️",
    "man_in_lotus_position_dark_skin_tone": "🧘🏿‍♂️",
    "person_surfing": "🏄",
    "surfer": "🏄",
    "person_surfing_tone1": "🏄🏻",
    "surfer_tone1": "🏄🏻",
    "person_surfing_tone2": "🏄🏼",
    "surfer_tone2": "🏄🏼",
    "person_surfing_tone3": "🏄🏽",
    "surfer_tone3": "🏄🏽",
    "person_surfing_tone4": "🏄🏾",
    "surfer_tone4": "🏄🏾",
    "person_surfing_tone5": "🏄🏿",
    "surfer_tone5": "🏄🏿",
    "woman_surfing": "🏄‍♀️",
    "woman_surfing_tone1": "🏄🏻‍♀️",
    "woman_surfing_light_skin_tone": "🏄🏻‍♀️",
    "woman_surfing_tone2": "🏄🏼‍♀️",
    "woman_surfing_medium_light_skin_tone": "🏄🏼‍♀️",
    "woman_surfing_tone3": "🏄🏽‍♀️",
    "woman_surfing_medium_skin_tone": "🏄🏽‍♀️",
    "woman_surfing_tone4": "🏄🏾‍♀️",
    "woman_surfing_medium_dark_skin_tone": "🏄🏾‍♀️",
    "woman_surfing_tone5": "🏄🏿‍♀️",
    "woman_surfing_dark_skin_tone": "🏄🏿‍♀️",
    "man_surfing": "🏄‍♂️",
    "man_surfing_tone1": "🏄🏻‍♂️",
    "man_surfing_light_skin_tone": "🏄🏻‍♂️",
    "man_surfing_tone2": "🏄🏼‍♂️",
    "man_surfing_medium_light_skin_tone": "🏄🏼‍♂️",
    "man_surfing_tone3": "🏄🏽‍♂️",
    "man_surfing_medium_skin_tone": "🏄🏽‍♂️",
    "man_surfing_tone4": "🏄🏾‍♂️",
    "man_surfing_medium_dark_skin_tone": "🏄🏾‍♂️",
    "man_surfing_tone5": "🏄🏿‍♂️",
    "man_surfing_dark_skin_tone": "🏄🏿‍♂️",
    "person_swimming": "🏊",
    "swimmer": "🏊",
    "person_swimming_tone1": "🏊🏻",
    "swimmer_tone1": "🏊🏻",
    "person_swimming_tone2": "🏊🏼",
    "swimmer_tone2": "🏊🏼",
    "person_swimming_tone3": "🏊🏽",
    "swimmer_tone3": "🏊🏽",
    "person_swimming_tone4": "🏊🏾",
    "swimmer_tone4": "🏊🏾",
    "person_swimming_tone5": "🏊🏿",
    "swimmer_tone5": "🏊🏿",
    "woman_swimming": "🏊‍♀️",
    "woman_swimming_tone1": "🏊🏻‍♀️",
    "woman_swimming_light_skin_tone": "🏊🏻‍♀️",
    "woman_swimming_tone2": "🏊🏼‍♀️",
    "woman_swimming_medium_light_skin_tone": "🏊🏼‍♀️",
    "woman_swimming_tone3": "🏊🏽‍♀️",
    "woman_swimming_medium_skin_tone": "🏊🏽‍♀️",
    "woman_swimming_tone4": "🏊🏾‍♀️",
    "woman_swimming_medium_dark_skin_tone": "🏊🏾‍♀️",
    "woman_swimming_tone5": "🏊🏿‍♀️",
    "woman_swimming_dark_skin_tone": "🏊🏿‍♀️",
    "man_swimming": "🏊‍♂️",
    "man_swimming_tone1": "🏊🏻‍♂️",
    "man_swimming_light_skin_tone": "🏊🏻‍♂️",
    "man_swimming_tone2": "🏊🏼‍♂️",
    "man_swimming_medium_light_skin_tone": "🏊🏼‍♂️",
    "man_swimming_tone3": "🏊🏽‍♂️",
    "man_swimming_medium_skin_tone": "🏊🏽‍♂️",
    "man_swimming_tone4": "🏊🏾‍♂️",
    "man_swimming_medium_dark_skin_tone": "🏊🏾‍♂️",
    "man_swimming_tone5": "🏊🏿‍♂️",
    "man_swimming_dark_skin_tone": "🏊🏿‍♂️",
    "person_playing_water_polo": "🤽",
    "water_polo": "🤽",
    "person_playing_water_polo_tone1": "🤽🏻",
    "water_polo_tone1": "🤽🏻",
    "person_playing_water_polo_tone2": "🤽🏼",
    "water_polo_tone2": "🤽🏼",
    "person_playing_water_polo_tone3": "🤽🏽",
    "water_polo_tone3": "🤽🏽",
    "person_playing_water_polo_tone4": "🤽🏾",
    "water_polo_tone4": "🤽🏾",
    "person_playing_water_polo_tone5": "🤽🏿",
    "water_polo_tone5": "🤽🏿",
    "woman_playing_water_polo": "🤽‍♀️",
    "woman_playing_water_polo_tone1": "🤽🏻‍♀️",
    "woman_playing_water_polo_light_skin_tone": "🤽🏻‍♀️",
    "woman_playing_water_polo_tone2": "🤽🏼‍♀️",
    "woman_playing_water_polo_medium_light_skin_tone": "🤽🏼‍♀️",
    "woman_playing_water_polo_tone3": "🤽🏽‍♀️",
    "woman_playing_water_polo_medium_skin_tone": "🤽🏽‍♀️",
    "woman_playing_water_polo_tone4": "🤽🏾‍♀️",
    "woman_playing_water_polo_medium_dark_skin_tone": "🤽🏾‍♀️",
    "woman_playing_water_polo_tone5": "🤽🏿‍♀️",
    "woman_playing_water_polo_dark_skin_tone": "🤽🏿‍♀️",
    "man_playing_water_polo": "🤽‍♂️",
    "man_playing_water_polo_tone1": "🤽🏻‍♂️",
    "man_playing_water_polo_light_skin_tone": "🤽🏻‍♂️",
    "man_playing_water_polo_tone2": "🤽🏼‍♂️",
    "man_playing_water_polo_medium_light_skin_tone": "🤽🏼‍♂️",
    "man_playing_water_polo_tone3": "🤽🏽‍♂️",
    "man_playing_water_polo_medium_skin_tone": "🤽🏽‍♂️",
    "man_playing_water_polo_tone4": "🤽🏾‍♂️",
    "man_playing_water_polo_medium_dark_skin_tone": "🤽🏾‍♂️",
    "man_playing_water_polo_tone5": "🤽🏿‍♂️",
    "man_playing_water_polo_dark_skin_tone": "🤽🏿‍♂️",
    "person_rowing_boat": "🚣",
    "rowboat": "🚣",
    "person_rowing_boat_tone1": "🚣🏻",
    "rowboat_tone1": "🚣🏻",
    "person_rowing_boat_tone2": "🚣🏼",
    "rowboat_tone2": "🚣🏼",
    "person_rowing_boat_tone3": "🚣🏽",
    "rowboat_tone3": "🚣🏽",
    "person_rowing_boat_tone4": "🚣🏾",
    "rowboat_tone4": "🚣🏾",
    "person_rowing_boat_tone5": "🚣🏿",
    "rowboat_tone5": "🚣🏿",
    "woman_rowing_boat": "🚣‍♀️",
    "woman_rowing_boat_tone1": "🚣🏻‍♀️",
    "woman_rowing_boat_light_skin_tone": "🚣🏻‍♀️",
    "woman_rowing_boat_tone2": "🚣🏼‍♀️",
    "woman_rowing_boat_medium_light_skin_tone": "🚣🏼‍♀️",
    "woman_rowing_boat_tone3": "🚣🏽‍♀️",
    "woman_rowing_boat_medium_skin_tone": "🚣🏽‍♀️",
    "woman_rowing_boat_tone4": "🚣🏾‍♀️",
    "woman_rowing_boat_medium_dark_skin_tone": "🚣🏾‍♀️",
    "woman_rowing_boat_tone5": "🚣🏿‍♀️",
    "woman_rowing_boat_dark_skin_tone": "🚣🏿‍♀️",
    "man_rowing_boat": "🚣‍♂️",
    "man_rowing_boat_tone1": "🚣🏻‍♂️",
    "man_rowing_boat_light_skin_tone": "🚣🏻‍♂️",
    "man_rowing_boat_tone2": "🚣🏼‍♂️",
    "man_rowing_boat_medium_light_skin_tone": "🚣🏼‍♂️",
    "man_rowing_boat_tone3": "🚣🏽‍♂️",
    "man_rowing_boat_medium_skin_tone": "🚣🏽‍♂️",
    "man_rowing_boat_tone4": "🚣🏾‍♂️",
    "man_rowing_boat_medium_dark_skin_tone": "🚣🏾‍♂️",
    "man_rowing_boat_tone5": "🚣🏿‍♂️",
    "man_rowing_boat_dark_skin_tone": "🚣🏿‍♂️",
    "person_climbing": "🧗",
    "person_climbing_tone1": "🧗🏻",
    "person_climbing_light_skin_tone": "🧗🏻",
    "person_climbing_tone2": "🧗🏼",
    "person_climbing_medium_light_skin_tone": "🧗🏼",
    "person_climbing_tone3": "🧗🏽",
    "person_climbing_medium_skin_tone": "🧗🏽",
    "person_climbing_tone4": "🧗🏾",
    "person_climbing_medium_dark_skin_tone": "🧗🏾",
    "person_climbing_tone5": "🧗🏿",
    "person_climbing_dark_skin_tone": "🧗🏿",
    "woman_climbing": "🧗‍♀️",
    "woman_climbing_tone1": "🧗🏻‍♀️",
    "woman_climbing_light_skin_tone": "🧗🏻‍♀️",
    "woman_climbing_tone2": "🧗🏼‍♀️",
    "woman_climbing_medium_light_skin_tone": "🧗🏼‍♀️",
    "woman_climbing_tone3": "🧗🏽‍♀️",
    "woman_climbing_medium_skin_tone": "🧗🏽‍♀️",
    "woman_climbing_tone4": "🧗🏾‍♀️",
    "woman_climbing_medium_dark_skin_tone": "🧗🏾‍♀️",
    "woman_climbing_tone5": "🧗🏿‍♀️",
    "woman_climbing_dark_skin_tone": "🧗🏿‍♀️",
    "man_climbing": "🧗‍♂️",
    "man_climbing_tone1": "🧗🏻‍♂️",
    "man_climbing_light_skin_tone": "🧗🏻‍♂️",
    "man_climbing_tone2": "🧗🏼‍♂️",
    "man_climbing_medium_light_skin_tone": "🧗🏼‍♂️",
    "man_climbing_tone3": "🧗🏽‍♂️",
    "man_climbing_medium_skin_tone": "🧗🏽‍♂️",
    "man_climbing_tone4": "🧗🏾‍♂️",
    "man_climbing_medium_dark_skin_tone": "🧗🏾‍♂️",
    "man_climbing_tone5": "🧗🏿‍♂️",
    "man_climbing_dark_skin_tone": "🧗🏿‍♂️",
    "person_mountain_biking": "🚵",
    "mountain_bicyclist": "🚵",
    "person_mountain_biking_tone1": "🚵🏻",
    "mountain_bicyclist_tone1": "🚵🏻",
    "person_mountain_biking_tone2": "🚵🏼",
    "mountain_bicyclist_tone2": "🚵🏼",
    "person_mountain_biking_tone3": "🚵🏽",
    "mountain_bicyclist_tone3": "🚵🏽",
    "person_mountain_biking_tone4": "🚵🏾",
    "mountain_bicyclist_tone4": "🚵🏾",
    "person_mountain_biking_tone5": "🚵🏿",
    "mountain_bicyclist_tone5": "🚵🏿",
    "woman_mountain_biking": "🚵‍♀️",
    "woman_mountain_biking_tone1": "🚵🏻‍♀️",
    "woman_mountain_biking_light_skin_tone": "🚵🏻‍♀️",
    "woman_mountain_biking_tone2": "🚵🏼‍♀️",
    "woman_mountain_biking_medium_light_skin_tone": "🚵🏼‍♀️",
    "woman_mountain_biking_tone3": "🚵🏽‍♀️",
    "woman_mountain_biking_medium_skin_tone": "🚵🏽‍♀️",
    "woman_mountain_biking_tone4": "🚵🏾‍♀️",
    "woman_mountain_biking_medium_dark_skin_tone": "🚵🏾‍♀️",
    "woman_mountain_biking_tone5": "🚵🏿‍♀️",
    "woman_mountain_biking_dark_skin_tone": "🚵🏿‍♀️",
    "man_mountain_biking": "🚵‍♂️",
    "man_mountain_biking_tone1": "🚵🏻‍♂️",
    "man_mountain_biking_light_skin_tone": "🚵🏻‍♂️",
    "man_mountain_biking_tone2": "🚵🏼‍♂️",
    "man_mountain_biking_medium_light_skin_tone": "🚵🏼‍♂️",
    "man_mountain_biking_tone3": "🚵🏽‍♂️",
    "man_mountain_biking_medium_skin_tone": "🚵🏽‍♂️",
    "man_mountain_biking_tone4": "🚵🏾‍♂️",
    "man_mountain_biking_medium_dark_skin_tone": "🚵🏾‍♂️",
    "man_mountain_biking_tone5": "🚵🏿‍♂️",
    "man_mountain_biking_dark_skin_tone": "🚵🏿‍♂️",
    "person_biking": "🚴",
    "bicyclist": "🚴",
    "person_biking_tone1": "🚴🏻",
    "bicyclist_tone1": "🚴🏻",
    "person_biking_tone2": "🚴🏼",
    "bicyclist_tone2": "🚴🏼",
    "person_biking_tone3": "🚴🏽",
    "bicyclist_tone3": "🚴🏽",
    "person_biking_tone4": "🚴🏾",
    "bicyclist_tone4": "🚴🏾",
    "person_biking_tone5": "🚴🏿",
    "bicyclist_tone5": "🚴🏿",
    "woman_biking": "🚴‍♀️",
    "woman_biking_tone1": "🚴🏻‍♀️",
    "woman_biking_light_skin_tone": "🚴🏻‍♀️",
    "woman_biking_tone2": "🚴🏼‍♀️",
    "woman_biking_medium_light_skin_tone": "🚴🏼‍♀️",
    "woman_biking_tone3": "🚴🏽‍♀️",
    "woman_biking_medium_skin_tone": "🚴🏽‍♀️",
    "woman_biking_tone4": "🚴🏾‍♀️",
    "woman_biking_medium_dark_skin_tone": "🚴🏾‍♀️",
    "woman_biking_tone5": "🚴🏿‍♀️",
    "woman_biking_dark_skin_tone": "🚴🏿‍♀️",
    "man_biking": "🚴‍♂️",
    "man_biking_tone1": "🚴🏻‍♂️",
    "man_biking_light_skin_tone": "🚴🏻‍♂️",
    "man_biking_tone2": "🚴🏼‍♂️",
    "man_biking_medium_light_skin_tone": "🚴🏼‍♂️",
    "man_biking_tone3": "🚴🏽‍♂️",
    "man_biking_medium_skin_tone": "🚴🏽‍♂️",
    "man_biking_tone4": "🚴🏾‍♂️",
    "man_biking_medium_dark_skin_tone": "🚴🏾‍♂️",
    "man_biking_tone5": "🚴🏿‍♂️",
    "man_biking_dark_skin_tone": "🚴🏿‍♂️",
    "trophy": "🏆",
    "first_place": "🥇",
    "first_place_medal": "🥇",
    "second_place": "🥈",
    "second_place_medal": "🥈",
    "third_place": "🥉",
    "third_place_medal": "🥉",
    "medal": "🏅",
    "sports_medal": "🏅",
    "military_medal": "🎖️",
    "rosette": "🏵️",
    "reminder_ribbon": "🎗️",
    "ticket": "🎫",
    "tickets": "🎟️",
    "admission_tickets": "🎟️",
    "circus_tent": "🎪",
    "person_juggling": "🤹",
    "juggling": "🤹",
    "juggler": "🤹",
    "person_juggling_tone1": "🤹🏻",
    "juggling_tone1": "🤹🏻",
    "juggler_tone1": "🤹🏻",
    "person_juggling_tone2": "🤹🏼",
    "juggling_tone2": "🤹🏼",
    "juggler_tone2": "🤹🏼",
    "person_juggling_tone3": "🤹🏽",
    "juggling_tone3": "🤹🏽",
    "juggler_tone3": "🤹🏽",
    "person_juggling_tone4": "🤹🏾",
    "juggling_tone4": "🤹🏾",
    "juggler_tone4": "🤹🏾",
    "person_juggling_tone5": "🤹🏿",
    "juggling_tone5": "🤹🏿",
    "juggler_tone5": "🤹🏿",
    "woman_juggling": "🤹‍♀️",
    "woman_juggling_tone1": "🤹🏻‍♀️",
    "woman_juggling_light_skin_tone": "🤹🏻‍♀️",
    "woman_juggling_tone2": "🤹🏼‍♀️",
    "woman_juggling_medium_light_skin_tone": "🤹🏼‍♀️",
    "woman_juggling_tone3": "🤹🏽‍♀️",
    "woman_juggling_medium_skin_tone": "🤹🏽‍♀️",
    "woman_juggling_tone4": "🤹🏾‍♀️",
    "woman_juggling_medium_dark_skin_tone": "🤹🏾‍♀️",
    "woman_juggling_tone5": "🤹🏿‍♀️",
    "woman_juggling_dark_skin_tone": "🤹🏿‍♀️",
    "man_juggling": "🤹‍♂️",
    "man_juggling_tone1": "🤹🏻‍♂️",
    "man_juggling_light_skin_tone": "🤹🏻‍♂️",
    "man_juggling_tone2": "🤹🏼‍♂️",
    "man_juggling_medium_light_skin_tone": "🤹🏼‍♂️",
    "man_juggling_tone3": "🤹🏽‍♂️",
    "man_juggling_medium_skin_tone": "🤹🏽‍♂️",
    "man_juggling_tone4": "🤹🏾‍♂️",
    "man_juggling_medium_dark_skin_tone": "🤹🏾‍♂️",
    "man_juggling_tone5": "🤹🏿‍♂️",
    "man_juggling_dark_skin_tone": "🤹🏿‍♂️",
    "performing_arts": "🎭",
    "ballet_shoes": "🩰",
    "art": "🎨",
    "clapper": "🎬",
    "microphone": "🎤",
    "headphones": "🎧",
    "musical_score": "🎼",
    "musical_keyboard": "🎹",
    "drum": "🥁",
    "drum_with_drumsticks": "🥁",
    "long_drum": "🪘",
    "saxophone": "🎷",
    "trumpet": "🎺",
    "guitar": "🎸",
    "banjo": "🪕",
    "violin": "🎻",
    "accordion": "🪗",
    "game_die": "🎲",
    "chess_pawn": "♟️",
    "dart": "🎯",
    "bowling": "🎳",
    "video_game": "🎮",
    "slot_machine": "🎰",
    "jigsaw": "🧩",
    "red_car": "🚗",
    "taxi": "🚕",
    "blue_car": "🚙",
    "pickup_truck": "🛻",
    "bus": "🚌",
    "trolleybus": "🚎",
    "race_car": "🏎️",
    "racing_car": "🏎️",
    "police_car": "🚓",
    "ambulance": "🚑",
    "fire_engine": "🚒",
    "minibus": "🚐",
    "truck": "🚚",
    "articulated_lorry": "🚛",
    "tractor": "🚜",
    "probing_cane": "🦯",
    "manual_wheelchair": "🦽",
    "motorized_wheelchair": "🦼",
    "scooter": "🛴",
    "bike": "🚲",
    "motor_scooter": "🛵",
    "motorbike": "🛵",
    "motorcycle": "🏍️",
    "racing_motorcycle": "🏍️",
    "auto_rickshaw": "🛺",
    "rotating_light": "🚨",
    "oncoming_police_car": "🚔",
    "oncoming_bus": "🚍",
    "oncoming_automobile": "🚘",
    "oncoming_taxi": "🚖",
    "aerial_tramway": "🚡",
    "mountain_cableway": "🚠",
    "suspension_railway": "🚟",
    "railway_car": "🚃",
    "train": "🚋",
    "mountain_railway": "🚞",
    "monorail": "🚝",
    "bullettrain_side": "🚄",
    "bullettrain_front": "🚅",
    "light_rail": "🚈",
    "steam_locomotive": "🚂",
    "train2": "🚆",
    "metro": "🚇",
    "tram": "🚊",
    "station": "🚉",
    "airplane": "✈️",
    "airplane_departure": "🛫",
    "airplane_arriving": "🛬",
    "airplane_small": "🛩️",
    "small_airplane": "🛩️",
    "seat": "💺",
    "satellite_orbital": "🛰️",
    "rocket": "🚀",
    "flying_saucer": "🛸",
    "helicopter": "🚁",
    "canoe": "🛶",
    "kayak": "🛶",
    "sailboat": "⛵",
    "speedboat": "🚤",
    "motorboat": "🛥️",
    "cruise_ship": "🛳️",
    "passenger_ship": "🛳️",
    "ferry": "⛴️",
    "ship": "🚢",
    "anchor": "⚓",
    "fuelpump": "⛽",
    "construction": "🚧",
    "vertical_traffic_light": "🚦",
    "traffic_light": "🚥",
    "busstop": "🚏",
    "map": "🗺️",
    "world_map": "🗺️",
    "moyai": "🗿",
    "statue_of_liberty": "🗽",
    "tokyo_tower": "🗼",
    "european_castle": "🏰",
    "japanese_castle": "🏯",
    "stadium": "🏟️",
    "ferris_wheel": "🎡",
    "roller_coaster": "🎢",
    "carousel_horse": "🎠",
    "fountain": "⛲",
    "beach_umbrella": "⛱️",
    "umbrella_on_ground": "⛱️",
    "beach": "🏖️",
    "beach_with_umbrella": "🏖️",
    "island": "🏝️",
    "desert_island": "🏝️",
    "desert": "🏜️",
    "volcano": "🌋",
    "mountain": "⛰️",
    "mountain_snow": "🏔️",
    "snow_capped_mountain": "🏔️",
    "mount_fuji": "🗻",
    "camping": "🏕️",
    "tent": "⛺",
    "house": "🏠",
    "house_with_garden": "🏡",
    "homes": "🏘️",
    "house_buildings": "🏘️",
    "house_abandoned": "🏚️",
    "derelict_house_building": "🏚️",
    "hut": "🛖",
    "construction_site": "🏗️",
    "building_construction": "🏗️",
    "factory": "🏭",
    "office": "🏢",
    "department_store": "🏬",
    "post_office": "🏣",
    "european_post_office": "🏤",
    "hospital": "🏥",
    "bank": "🏦",
    "hotel": "🏨",
    "convenience_store": "🏪",
    "school": "🏫",
    "love_hotel": "🏩",
    "wedding": "💒",
    "classical_building": "🏛️",
    "church": "⛪",
    "mosque": "🕌",
    "synagogue": "🕍",
    "hindu_temple": "🛕",
    "kaaba": "🕋",
    "shinto_shrine": "⛩️",
    "railway_track": "🛤️",
    "railroad_track": "🛤️",
    "motorway": "🛣️",
    "japan": "🗾",
    "rice_scene": "🎑",
    "park": "🏞️",
    "national_park": "🏞️",
    "sunrise": "🌅",
    "sunrise_over_mountains": "🌄",
    "stars": "🌠",
    "sparkler": "🎇",
    "fireworks": "🎆",
    "city_sunset": "🌇",
    "city_sunrise": "🌇",
    "city_dusk": "🌆",
    "cityscape": "🏙️",
    "night_with_stars": "🌃",
    "milky_way": "🌌",
    "bridge_at_night": "🌉",
    "foggy": "🌁",
    "watch": "⌚",
    "mobile_phone": "📱",
    "iphone": "📱",
    "calling": "📲",
    "computer": "💻",
    "keyboard": "⌨️",
    "desktop": "🖥️",
    "desktop_computer": "🖥️",
    "printer": "🖨️",
    "mouse_three_button": "🖱️",
    "three_button_mouse": "🖱️",
    "trackball": "🖲️",
    "joystick": "🕹️",
    "compression": "🗜️",
    "minidisc": "💽",
    "floppy_disk": "💾",
    "cd": "💿",
    "dvd": "📀",
    "vhs": "📼",
    "camera": "📷",
    "camera_with_flash": "📸",
    "video_camera": "📹",
    "movie_camera": "🎥",
    "projector": "📽️",
    "film_projector": "📽️",
    "film_frames": "🎞️",
    "telephone_receiver": "📞",
    "telephone": "☎️",
    "pager": "📟",
    "fax": "📠",
    "tv": "📺",
    "radio": "📻",
    "microphone2": "🎙️",
    "studio_microphone": "🎙️",
    "level_slider": "🎚️",
    "control_knobs": "🎛️",
    "compass": "🧭",
    "stopwatch": "⏱️",
    "timer": "⏲️",
    "timer_clock": "⏲️",
    "alarm_clock": "⏰",
    "clock": "🕰️",
    "mantlepiece_clock": "🕰️",
    "hourglass": "⌛",
    "hourglass_flowing_sand": "⏳",
    "satellite": "📡",
    "battery": "🔋",
    "electric_plug": "🔌",
    "bulb": "💡",
    "flashlight": "🔦",
    "candle": "🕯️",
    "diya_lamp": "🪔",
    "fire_extinguisher": "🧯",
    "oil": "🛢️",
    "oil_drum": "🛢️",
    "money_with_wings": "💸",
    "dollar": "💵",
    "yen": "💴",
    "euro": "💶",
    "pound": "💷",
    "coin": "🪙",
    "moneybag": "💰",
    "credit_card": "💳",
    "gem": "💎",
    "scales": "⚖️",
    "ladder": "🪜",
    "toolbox": "🧰",
    "screwdriver": "🪛",
    "wrench": "🔧",
    "hammer": "🔨",
    "hammer_pick": "⚒️",
    "hammer_and_pick": "⚒️",
    "tools": "🛠️",
    "hammer_and_wrench": "🛠️",
    "pick": "⛏️",
    "nut_and_bolt": "🔩",
    "gear": "⚙️",
    "bricks": "🧱",
    "chains": "⛓️",
    "hook": "🪝",
    "knot": "🪢",
    "magnet": "🧲",
    "gun": "🔫",
    "bomb": "💣",
    "firecracker": "🧨",
    "axe": "🪓",
    "carpentry_saw": "🪚",
    "knife": "🔪",
    "dagger": "🗡️",
    "dagger_knife": "🗡️",
    "crossed_swords": "⚔️",
    "shield": "🛡️",
    "smoking": "🚬",
    "coffin": "⚰️",
    "headstone": "🪦",
    "urn": "⚱️",
    "funeral_urn": "⚱️",
    "amphora": "🏺",
    "magic_wand": "🪄",
    "crystal_ball": "🔮",
    "prayer_beads": "📿",
    "nazar_amulet": "🧿",
    "barber": "💈",
    "alembic": "⚗️",
    "telescope": "🔭",
    "microscope": "🔬",
    "hole": "🕳️",
    "window": "🪟",
    "adhesive_bandage": "🩹",
    "stethoscope": "🩺",
    "pill": "💊",
    "syringe": "💉",
    "drop_of_blood": "🩸",
    "dna": "🧬",
    "microbe": "🦠",
    "petri_dish": "🧫",
    "test_tube": "🧪",
    "thermometer": "🌡️",
    "mouse_trap": "🪤",
    "broom": "🧹",
    "basket": "🧺",
    "sewing_needle": "🪡",
    "roll_of_paper": "🧻",
    "toilet": "🚽",
    "plunger": "🪠",
    "bucket": "🪣",
    "potable_water": "🚰",
    "shower": "🚿",
    "bathtub": "🛁",
    "bath": "🛀",
    "bath_tone1": "🛀🏻",
    "bath_tone2": "🛀🏼",
    "bath_tone3": "🛀🏽",
    "bath_tone4": "🛀🏾",
    "bath_tone5": "🛀🏿",
    "toothbrush": "🪥",
    "soap": "🧼",
    "razor": "🪒",
    "sponge": "🧽",
    "squeeze_bottle": "🧴",
    "bellhop": "🛎️",
    "bellhop_bell": "🛎️",
    "key": "🔑",
    "key2": "🗝️",
    "old_key": "🗝️",
    "door": "🚪",
    "chair": "🪑",
    "mirror": "🪞",
    "couch": "🛋️",
    "couch_and_lamp": "🛋️",
    "bed": "🛏️",
    "sleeping_accommodation": "🛌",
    "person_in_bed_tone1": "🛌🏻",
    "person_in_bed_light_skin_tone": "🛌🏻",
    "person_in_bed_tone2": "🛌🏼",
    "person_in_bed_medium_light_skin_tone": "🛌🏼",
    "person_in_bed_tone3": "🛌🏽",
    "person_in_bed_medium_skin_tone": "🛌🏽",
    "person_in_bed_tone4": "🛌🏾",
    "person_in_bed_medium_dark_skin_tone": "🛌🏾",
    "person_in_bed_tone5": "🛌🏿",
    "person_in_bed_dark_skin_tone": "🛌🏿",
    "teddy_bear": "🧸",
    "frame_photo": "🖼️",
    "frame_with_picture": "🖼️",
    "shopping_bags": "🛍️",
    "shopping_cart": "🛒",
    "shopping_trolley": "🛒",
    "gift": "🎁",
    "balloon": "🎈",
    "flags": "🎏",
    "ribbon": "🎀",
    "confetti_ball": "🎊",
    "tada": "🎉",
    "piñata": "🪅",
    "nesting_dolls": "🪆",
    "dolls": "🎎",
    "izakaya_lantern": "🏮",
    "wind_chime": "🎐",
    "red_envelope": "🧧",
    "envelope": "✉️",
    "envelope_with_arrow": "📩",
    "incoming_envelope": "📨",
    "e_mail": "📧",
    "email": "📧",
    "love_letter": "💌",
    "inbox_tray": "📥",
    "outbox_tray": "📤",
    "package": "📦",
    "label": "🏷️",
    "mailbox_closed": "📪",
    "mailbox": "📫",
    "mailbox_with_mail": "📬",
    "mailbox_with_no_mail": "📭",
    "postbox": "📮",
    "postal_horn": "📯",
    "placard": "🪧",
    "scroll": "📜",
    "page_with_curl": "📃",
    "page_facing_up": "📄",
    "bookmark_tabs": "📑",
    "receipt": "🧾",
    "bar_chart": "📊",
    "chart_with_upwards_trend": "📈",
    "chart_with_downwards_trend": "📉",
    "notepad_spiral": "🗒️",
    "spiral_note_pad": "🗒️",
    "calendar_spiral": "🗓️",
    "spiral_calendar_pad": "🗓️",
    "calendar": "📆",
    "date": "📅",
    "wastebasket": "🗑️",
    "card_index": "📇",
    "card_box": "🗃️",
    "card_file_box": "🗃️",
    "ballot_box": "🗳️",
    "ballot_box_with_ballot": "🗳️",
    "file_cabinet": "🗄️",
    "clipboard": "📋",
    "file_folder": "📁",
    "open_file_folder": "📂",
    "dividers": "🗂️",
    "card_index_dividers": "🗂️",
    "newspaper2": "🗞️",
    "rolled_up_newspaper": "🗞️",
    "newspaper": "📰",
    "notebook": "📓",
    "notebook_with_decorative_cover": "📔",
    "ledger": "📒",
    "closed_book": "📕",
    "green_book": "📗",
    "blue_book": "📘",
    "orange_book": "📙",
    "books": "📚",
    "book": "📖",
    "bookmark": "🔖",
    "safety_pin": "🧷",
    "link": "🔗",
    "paperclip": "📎",
    "paperclips": "🖇️",
    "linked_paperclips": "🖇️",
    "triangular_ruler": "📐",
    "straight_ruler": "📏",
    "abacus": "🧮",
    "pushpin": "📌",
    "round_pushpin": "📍",
    "scissors": "✂️",
    "pen_ballpoint": "🖊️",
    "lower_left_ballpoint_pen": "🖊️",
    "pen_fountain": "🖋️",
    "lower_left_fountain_pen": "🖋️",
    "black_nib": "✒️",
    "paintbrush": "🖌️",
    "lower_left_paintbrush": "🖌️",
    "crayon": "🖍️",
    "lower_left_crayon": "🖍️",
    "pencil": "📝",
    "memo": "📝",
    "pencil2": "✏️",
    "mag": "🔍",
    "mag_right": "🔎",
    "lock_with_ink_pen": "🔏",
    "closed_lock_with_key": "🔐",
    "lock": "🔒",
    "unlock": "🔓",
    "heart": "❤️",
    "orange_heart": "🧡",
    "yellow_heart": "💛",
    "green_heart": "💚",
    "blue_heart": "💙",
    "purple_heart": "💜",
    "black_heart": "🖤",
    "brown_heart": "🤎",
    "white_heart": "🤍",
    "broken_heart": "💔",
    "heart_exclamation": "❣️",
    "heavy_heart_exclamation_mark_ornament": "❣️",
    "two_hearts": "💕",
    "revolving_hearts": "💞",
    "heartbeat": "💓",
    "heartpulse": "💗",
    "sparkling_heart": "💖",
    "cupid": "💘",
    "gift_heart": "💝",
    "heart_decoration": "💟",
    "peace": "☮️",
    "peace_symbol": "☮️",
    "cross": "✝️",
    "latin_cross": "✝️",
    "star_and_crescent": "☪️",
    "om_symbol": "🕉️",
    "wheel_of_dharma": "☸️",
    "star_of_david": "✡️",
    "six_pointed_star": "🔯",
    "menorah": "🕎",
    "yin_yang": "☯️",
    "orthodox_cross": "☦️",
    "place_of_worship": "🛐",
    "worship_symbol": "🛐",
    "ophiuchus": "⛎",
    "aries": "♈",
    "taurus": "♉",
    "gemini": "♊",
    "cancer": "♋",
    "leo": "♌",
    "virgo": "♍",
    "libra": "♎",
    "scorpius": "♏",
    "sagittarius": "♐",
    "capricorn": "♑",
    "aquarius": "♒",
    "pisces": "♓",
    "id": "🆔",
    "atom": "⚛️",
    "atom_symbol": "⚛️",
    "accept": "🉑",
    "radioactive": "☢️",
    "radioactive_sign": "☢️",
    "biohazard": "☣️",
    "biohazard_sign": "☣️",
    "mobile_phone_off": "📴",
    "vibration_mode": "📳",
    "u6709": "🈶",
    "u7121": "🈚",
    "u7533": "🈸",
    "u55b6": "🈺",
    "u6708": "🈷️",
    "eight_pointed_black_star": "✴️",
    "vs": "🆚",
    "white_flower": "💮",
    "ideograph_advantage": "🉐",
    "secret": "㊙️",
    "congratulations": "㊗️",
    "u5408": "🈴",
    "u6e80": "🈵",
    "u5272": "🈹",
    "u7981": "🈲",
    "a": "🅰️",
    "b": "🅱️",
    "ab": "🆎",
    "cl": "🆑",
    "o2": "🅾️",
    "sos": "🆘",
    "x": "❌",
    "o": "⭕",
    "octagonal_sign": "🛑",
    "stop_sign": "🛑",
    "no_entry": "⛔",
    "name_badge": "📛",
    "no_entry_sign": "🚫",
    "100": "💯",
    "anger": "💢",
    "hotsprings": "♨️",
    "no_pedestrians": "🚷",
    "do_not_litter": "🚯",
    "no_bicycles": "🚳",
    "non_potable_water": "🚱",
    "underage": "🔞",
    "no_mobile_phones": "📵",
    "no_smoking": "🚭",
    "exclamation": "❗",
    "grey_exclamation": "❕",
    "question": "❓",
    "grey_question": "❔",
    "bangbang": "‼️",
    "interrobang": "⁉️",
    "low_brightness": "🔅",
    "high_brightness": "🔆",
    "part_alternation_mark": "〽️",
    "warning": "⚠️",
    "children_crossing": "🚸",
    "trident": "🔱",
    "fleur_de_lis": "⚜️",
    "beginner": "🔰",
    "recycle": "♻️",
    "white_check_mark": "✅",
    "u6307": "🈯",
    "chart": "💹",
    "sparkle": "❇️",
    "eight_spoked_asterisk": "✳️",
    "negative_squared_cross_mark": "❎",
    "globe_with_meridians": "🌐",
    "diamond_shape_with_a_dot_inside": "💠",
    "m": "Ⓜ️",
    "cyclone": "🌀",
    "zzz": "💤",
    "atm": "🏧",
    "wc": "🚾",
    "wheelchair": "♿",
    "parking": "🅿️",
    "u7a7a": "🈳",
    "sa": "🈂️",
    "passport_control": "🛂",
    "customs": "🛃",
    "baggage_claim": "🛄",
    "left_luggage": "🛅",
    "elevator": "🛗",
    "mens": "🚹",
    "womens": "🚺",
    "baby_symbol": "🚼",
    "restroom": "🚻",
    "put_litter_in_its_place": "🚮",
    "cinema": "🎦",
    "signal_strength": "📶",
    "koko": "🈁",
    "symbols": "🔣",
    "information_source": "ℹ️",
    "abc": "🔤",
    "abcd": "🔡",
    "capital_abcd": "🔠",
    "ng": "🆖",
    "ok": "🆗",
    "up": "🆙",
    "cool": "🆒",
    "new": "🆕",
    "free": "🆓",
    "zero": "0️⃣",
    "one": "1️⃣",
    "two": "2️⃣",
    "three": "3️⃣",
    "four": "4️⃣",
    "five": "5️⃣",
    "six": "6️⃣",
    "seven": "7️⃣",
    "eight": "8️⃣",
    "nine": "9️⃣",
    "keycap_ten": "🔟",
    "1234": "🔢",
    "hash": "#️⃣",
    "asterisk": "*️⃣",
    "keycap_asterisk": "*️⃣",
    "eject": "⏏️",
    "eject_symbol": "⏏️",
    "arrow_forward": "▶️",
    "pause_button": "⏸️",
    "double_vertical_bar": "⏸️",
    "play_pause": "⏯️",
    "stop_button": "⏹️",
    "record_button": "⏺️",
    "track_next": "⏭️",
    "next_track": "⏭️",
    "track_previous": "⏮️",
    "previous_track": "⏮️",
    "fast_forward": "⏩",
    "rewind": "⏪",
    "arrow_double_up": "⏫",
    "arrow_double_down": "⏬",
    "arrow_backward": "◀️",
    "arrow_up_small": "🔼",
    "arrow_down_small": "🔽",
    "arrow_right": "➡️",
    "arrow_left": "⬅️",
    "arrow_up": "⬆️",
    "arrow_down": "⬇️",
    "arrow_upper_right": "↗️",
    "arrow_lower_right": "↘️",
    "arrow_lower_left": "↙️",
    "arrow_upper_left": "↖️",
    "arrow_up_down": "↕️",
    "left_right_arrow": "↔️",
    "arrow_right_hook": "↪️",
    "leftwards_arrow_with_hook": "↩️",
    "arrow_heading_up": "⤴️",
    "arrow_heading_down": "⤵️",
    "twisted_rightwards_arrows": "🔀",
    "repeat": "🔁",
    "repeat_one": "🔂",
    "arrows_counterclockwise": "🔄",
    "arrows_clockwise": "🔃",
    "musical_note": "🎵",
    "notes": "🎶",
    "heavy_plus_sign": "➕",
    "heavy_minus_sign": "➖",
    "heavy_division_sign": "➗",
    "heavy_multiplication_x": "✖️",
    "infinity": "♾️",
    "heavy_dollar_sign": "💲",
    "currency_exchange": "💱",
    "tm": "™️",
    "copyright": "©️",
    "registered": "®️",
    "wavy_dash": "〰️",
    "curly_loop": "➰",
    "loop": "➿",
    "end": "🔚",
    "back": "🔙",
    "on": "🔛",
    "top": "🔝",
    "soon": "🔜",
    "heavy_check_mark": "✔️",
    "ballot_box_with_check": "☑️",
    "radio_button": "🔘",
    "white_circle": "⚪",
    "black_circle": "⚫",
    "red_circle": "🔴",
    "blue_circle": "🔵",
    "brown_circle": "🟤",
    "purple_circle": "🟣",
    "green_circle": "🟢",
    "yellow_circle": "🟡",
    "orange_circle": "🟠",
    "small_red_triangle": "🔺",
    "small_red_triangle_down": "🔻",
    "small_orange_diamond": "🔸",
    "small_blue_diamond": "🔹",
    "large_orange_diamond": "🔶",
    "large_blue_diamond": "🔷",
    "white_square_button": "🔳",
    "black_square_button": "🔲",
    "black_small_square": "▪️",
    "white_small_square": "▫️",
    "black_medium_small_square": "◾",
    "white_medium_small_square": "◽",
    "black_medium_square": "◼️",
    "white_medium_square": "◻️",
    "black_large_square": "⬛",
    "white_large_square": "⬜",
    "orange_square": "🟧",
    "blue_square": "🟦",
    "red_square": "🟥",
    "brown_square": "🟫",
    "purple_square": "🟪",
    "green_square": "🟩",
    "yellow_square": "🟨",
    "speaker": "🔈",
    "mute": "🔇",
    "sound": "🔉",
    "loud_sound": "🔊",
    "bell": "🔔",
    "no_bell": "🔕",
    "mega": "📣",
    "loudspeaker": "📢",
    "speech_left": "🗨️",
    "left_speech_bubble": "🗨️",
    "eye_in_speech_bubble": "👁‍🗨",
    "speech_balloon": "💬",
    "thought_balloon": "💭",
    "anger_right": "🗯️",
    "right_anger_bubble": "🗯️",
    "spades": "♠️",
    "clubs": "♣️",
    "hearts": "♥️",
    "diamonds": "♦️",
    "black_joker": "🃏",
    "flower_playing_cards": "🎴",
    "mahjong": "🀄",
    "clock1": "🕐",
    "clock2": "🕑",
    "clock3": "🕒",
    "clock4": "🕓",
    "clock5": "🕔",
    "clock6": "🕕",
    "clock7": "🕖",
    "clock8": "🕗",
    "clock9": "🕘",
    "clock10": "🕙",
    "clock11": "🕚",
    "clock12": "🕛",
    "clock130": "🕜",
    "clock230": "🕝",
    "clock330": "🕞",
    "clock430": "🕟",
    "clock530": "🕠",
    "clock630": "🕡",
    "clock730": "🕢",
    "clock830": "🕣",
    "clock930": "🕤",
    "clock1030": "🕥",
    "clock1130": "🕦",
    "clock1230": "🕧",
    "female_sign": "♀️",
    "male_sign": "♂️",
    "transgender_symbol": "⚧",
    "medical_symbol": "⚕️",
    "regional_indicator_z": "🇿",
    "regional_indicator_y": "🇾",
    "regional_indicator_x": "🇽",
    "regional_indicator_w": "🇼",
    "regional_indicator_v": "🇻",
    "regional_indicator_u": "🇺",
    "regional_indicator_t": "🇹",
    "regional_indicator_s": "🇸",
    "regional_indicator_r": "🇷",
    "regional_indicator_q": "🇶",
    "regional_indicator_p": "🇵",
    "regional_indicator_o": "🇴",
    "regional_indicator_n": "🇳",
    "regional_indicator_m": "🇲",
    "regional_indicator_l": "🇱",
    "regional_indicator_k": "🇰",
    "regional_indicator_j": "🇯",
    "regional_indicator_i": "🇮",
    "regional_indicator_h": "🇭",
    "regional_indicator_g": "🇬",
    "regional_indicator_f": "🇫",
    "regional_indicator_e": "🇪",
    "regional_indicator_d": "🇩",
    "regional_indicator_c": "🇨",
    "regional_indicator_b": "🇧",
    "regional_indicator_a": "🇦",
    "flag_white": "🏳️",
    "flag_black": "🏴",
    "checkered_flag": "🏁",
    "triangular_flag_on_post": "🚩",
    "rainbow_flag": "🏳️‍🌈",
    "gay_pride_flag": "🏳️‍🌈",
    "transgender_flag": "🏳️‍⚧️",
    "pirate_flag": "🏴‍☠️",
    "flag_af": "🇦🇫",
    "flag_ax": "🇦🇽",
    "flag_al": "🇦🇱",
    "flag_dz": "🇩🇿",
    "flag_as": "🇦🇸",
    "flag_ad": "🇦🇩",
    "flag_ao": "🇦🇴",
    "flag_ai": "🇦🇮",
    "flag_aq": "🇦🇶",
    "flag_ag": "🇦🇬",
    "flag_ar": "🇦🇷",
    "flag_am": "🇦🇲",
    "flag_aw": "🇦🇼",
    "flag_au": "🇦🇺",
    "flag_at": "🇦🇹",
    "flag_az": "🇦🇿",
    "flag_bs": "🇧🇸",
    "flag_bh": "🇧🇭",
    "flag_bd": "🇧🇩",
    "flag_bb": "🇧🇧",
    "flag_by": "🇧🇾",
    "flag_be": "🇧🇪",
    "flag_bz": "🇧🇿",
    "flag_bj": "🇧🇯",
    "flag_bm": "🇧🇲",
    "flag_bt": "🇧🇹",
    "flag_bo": "🇧🇴",
    "flag_ba": "🇧🇦",
    "flag_bw": "🇧🇼",
    "flag_br": "🇧🇷",
    "flag_io": "🇮🇴",
    "flag_vg": "🇻🇬",
    "flag_bn": "🇧🇳",
    "flag_bg": "🇧🇬",
    "flag_bf": "🇧🇫",
    "flag_bi": "🇧🇮",
    "flag_kh": "🇰🇭",
    "flag_cm": "🇨🇲",
    "flag_ca": "🇨🇦",
    "flag_ic": "🇮🇨",
    "flag_cv": "🇨🇻",
    "flag_bq": "🇧🇶",
    "flag_ky": "🇰🇾",
    "flag_cf": "🇨🇫",
    "flag_td": "🇹🇩",
    "flag_cl": "🇨🇱",
    "flag_cn": "🇨🇳",
    "flag_cx": "🇨🇽",
    "flag_cc": "🇨🇨",
    "flag_co": "🇨🇴",
    "flag_km": "🇰🇲",
    "flag_cg": "🇨🇬",
    "flag_cd": "🇨🇩",
    "flag_ck": "🇨🇰",
    "flag_cr": "🇨🇷",
    "flag_ci": "🇨🇮",
    "flag_hr": "🇭🇷",
    "flag_cu": "🇨🇺",
    "flag_cw": "🇨🇼",
    "flag_cy": "🇨🇾",
    "flag_cz": "🇨🇿",
    "flag_dk": "🇩🇰",
    "flag_dj": "🇩🇯",
    "flag_dm": "🇩🇲",
    "flag_do": "🇩🇴",
    "flag_ec": "🇪🇨",
    "flag_eg": "🇪🇬",
    "flag_sv": "🇸🇻",
    "flag_gq": "🇬🇶",
    "flag_er": "🇪🇷",
    "flag_ee": "🇪🇪",
    "flag_et": "🇪🇹",
    "flag_eu": "🇪🇺",
    "flag_fk": "🇫🇰",
    "flag_fo": "🇫🇴",
    "flag_fj": "🇫🇯",
    "flag_fi": "🇫🇮",
    "flag_fr": "🇫🇷",
    "flag_gf": "🇬🇫",
    "flag_pf": "🇵🇫",
    "flag_tf": "🇹🇫",
    "flag_ga": "🇬🇦",
    "flag_gm": "🇬🇲",
    "flag_ge": "🇬🇪",
    "flag_de": "🇩🇪",
    "flag_gh": "🇬🇭",
    "flag_gi": "🇬🇮",
    "flag_gr": "🇬🇷",
    "flag_gl": "🇬🇱",
    "flag_gd": "🇬🇩",
    "flag_gp": "🇬🇵",
    "flag_gu": "🇬🇺",
    "flag_gt": "🇬🇹",
    "flag_gg": "🇬🇬",
    "flag_gn": "🇬🇳",
    "flag_gw": "🇬🇼",
    "flag_gy": "🇬🇾",
    "flag_ht": "🇭🇹",
    "flag_hn": "🇭🇳",
    "flag_hk": "🇭🇰",
    "flag_hu": "🇭🇺",
    "flag_is": "🇮🇸",
    "flag_in": "🇮🇳",
    "flag_id": "🇮🇩",
    "flag_ir": "🇮🇷",
    "flag_iq": "🇮🇶",
    "flag_ie": "🇮🇪",
    "flag_im": "🇮🇲",
    "flag_il": "🇮🇱",
    "flag_it": "🇮🇹",
    "flag_jm": "🇯🇲",
    "flag_jp": "🇯🇵",
    "crossed_flags": "🎌",
    "flag_je": "🇯🇪",
    "flag_jo": "🇯🇴",
    "flag_kz": "🇰🇿",
    "flag_ke": "🇰🇪",
    "flag_ki": "🇰🇮",
    "flag_xk": "🇽🇰",
    "flag_kw": "🇰🇼",
    "flag_kg": "🇰🇬",
    "flag_la": "🇱🇦",
    "flag_lv": "🇱🇻",
    "flag_lb": "🇱🇧",
    "flag_ls": "🇱🇸",
    "flag_lr": "🇱🇷",
    "flag_ly": "🇱🇾",
    "flag_li": "🇱🇮",
    "flag_lt": "🇱🇹",
    "flag_lu": "🇱🇺",
    "flag_mo": "🇲🇴",
    "flag_mk": "🇲🇰",
    "flag_mg": "🇲🇬",
    "flag_mw": "🇲🇼",
    "flag_my": "🇲🇾",
    "flag_mv": "🇲🇻",
    "flag_ml": "🇲🇱",
    "flag_mt": "🇲🇹",
    "flag_mh": "🇲🇭",
    "flag_mq": "🇲🇶",
    "flag_mr": "🇲🇷",
    "flag_mu": "🇲🇺",
    "flag_yt": "🇾🇹",
    "flag_mx": "🇲🇽",
    "flag_fm": "🇫🇲",
    "flag_md": "🇲🇩",
    "flag_mc": "🇲🇨",
    "flag_mn": "🇲🇳",
    "flag_me": "🇲🇪",
    "flag_ms": "🇲🇸",
    "flag_ma": "🇲🇦",
    "flag_mz": "🇲🇿",
    "flag_mm": "🇲🇲",
    "flag_na": "🇳🇦",
    "flag_nr": "🇳🇷",
    "flag_np": "🇳🇵",
    "flag_nl": "🇳🇱",
    "flag_nc": "🇳🇨",
    "flag_nz": "🇳🇿",
    "flag_ni": "🇳🇮",
    "flag_ne": "🇳🇪",
    "flag_ng": "🇳🇬",
    "flag_nu": "🇳🇺",
    "flag_nf": "🇳🇫",
    "flag_kp": "🇰🇵",
    "flag_mp": "🇲🇵",
    "flag_no": "🇳🇴",
    "flag_om": "🇴🇲",
    "flag_pk": "🇵🇰",
    "flag_pw": "🇵🇼",
    "flag_ps": "🇵🇸",
    "flag_pa": "🇵🇦",
    "flag_pg": "🇵🇬",
    "flag_py": "🇵🇾",
    "flag_pe": "🇵🇪",
    "flag_ph": "🇵🇭",
    "flag_pn": "🇵🇳",
    "flag_pl": "🇵🇱",
    "flag_pt": "🇵🇹",
    "flag_pr": "🇵🇷",
    "flag_qa": "🇶🇦",
    "flag_re": "🇷🇪",
    "flag_ro": "🇷🇴",
    "flag_ru": "🇷🇺",
    "flag_rw": "🇷🇼",
    "flag_ws": "🇼🇸",
    "flag_sm": "🇸🇲",
    "flag_st": "🇸🇹",
    "flag_sa": "🇸🇦",
    "flag_sn": "🇸🇳",
    "flag_rs": "🇷🇸",
    "flag_sc": "🇸🇨",
    "flag_sl": "🇸🇱",
    "flag_sg": "🇸🇬",
    "flag_sx": "🇸🇽",
    "flag_sk": "🇸🇰",
    "flag_si": "🇸🇮",
    "flag_gs": "🇬🇸",
    "flag_sb": "🇸🇧",
    "flag_so": "🇸🇴",
    "flag_za": "🇿🇦",
    "flag_kr": "🇰🇷",
    "flag_ss": "🇸🇸",
    "flag_es": "🇪🇸",
    "flag_lk": "🇱🇰",
    "flag_bl": "🇧🇱",
    "flag_sh": "🇸🇭",
    "flag_kn": "🇰🇳",
    "flag_lc": "🇱🇨",
    "flag_pm": "🇵🇲",
    "flag_vc": "🇻🇨",
    "flag_sd": "🇸🇩",
    "flag_sr": "🇸🇷",
    "flag_sz": "🇸🇿",
    "flag_se": "🇸🇪",
    "flag_ch": "🇨🇭",
    "flag_sy": "🇸🇾",
    "flag_tw": "🇹🇼",
    "flag_tj": "🇹🇯",
    "flag_tz": "🇹🇿",
    "flag_th": "🇹🇭",
    "flag_tl": "🇹🇱",
    "flag_tg": "🇹🇬",
    "flag_tk": "🇹🇰",
    "flag_to": "🇹🇴",
    "flag_tt": "🇹🇹",
    "flag_tn": "🇹🇳",
    "flag_tr": "🇹🇷",
    "flag_tm": "🇹🇲",
    "flag_tc": "🇹🇨",
    "flag_vi": "🇻🇮",
    "flag_tv": "🇹🇻",
    "flag_ug": "🇺🇬",
    "flag_ua": "🇺🇦",
    "flag_ae": "🇦🇪",
    "flag_gb": "🇬🇧",
    "england": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "scotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    "wales": "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
    "flag_us": "🇺🇸",
    "flag_uy": "🇺🇾",
    "flag_uz": "🇺🇿",
    "flag_vu": "🇻🇺",
    "flag_va": "🇻🇦",
    "flag_ve": "🇻🇪",
    "flag_vn": "🇻🇳",
    "flag_wf": "🇼🇫",
    "flag_eh": "🇪🇭",
    "flag_ye": "🇾🇪",
    "flag_zm": "🇿🇲",
    "flag_zw": "🇿🇼",
    "flag_ac": "🇦🇨",
    "flag_bv": "🇧🇻",
    "flag_cp": "🇨🇵",
    "flag_ea": "🇪🇦",
    "flag_dg": "🇩🇬",
    "flag_hm": "🇭🇲",
    "flag_mf": "🇲🇫",
    "flag_sj": "🇸🇯",
    "flag_ta": "🇹🇦",
    "flag_um": "🇺🇲",
    "united_nations": "🇺🇳"
}

/**
 * This script file will (or atleast should) run before the main script file runs.
 * This file should contain stuff like options, global variables (etc.) to be used by the main script.
 */

// Options

// URL options can override the options below.
// Options set through the menu can override both until the page is refreshed.
options = {
    username: 'Discord Bot',
    avatar: 'https://cdn.discordapp.com/embed/avatars/1.png',
    verified: false,
    noUser: false,
    data: null,
    guiTabs: ['author', 'description'],
    useJsonEditor: false,
    reverseColumns: false,
    allowPlaceholders: false,
    autoUpdateURL: false,
    autoParams: false,
    hideEditor: false,
    hidePreview: false,
    hideMenu: false,
    single: false,
    noMultiEmbedsOption: false,
    sourceOption: false, // Display link to source code in menu.
}

// Default JSON object

// json = {
//     content: "Hello world",
//     embed: {
//         title: "A title",
//         description: "A description",
//     }
// }


// Write any code under the 'DOMContentLoaded' event to run after the page has loaded.
addEventListener('DOMContentLoaded', () => {
    // console.log('Hello 👋');

    // Remove the colour picker
    // document.querySelector('.colors').remove()
})

/**
 * Discord Embed Builder
 * Contribute or report issues at
 * https://github.com/Glitchii/embedbuilder
 */

window.options ??= {};
window.inIframe ??= top !== self;
mainHost = "glitchii.github.io";

let params = new URLSearchParams(location.search),
    hasParam = param => params.get(param) !== null,
    dataSpecified = options.data || params.get('data'),
    username = params.get('username') || options.username,
    avatar = params.get('avatar') || options.avatar,
    guiTabs = params.get('guitabs') || options.guiTabs,
    useJsonEditor = params.get('editor') === 'json' || options.useJsonEditor,
    verified = hasParam('verified') || options.verified,
    reverseColumns = hasParam('reverse') || options.reverseColumns,
    noUser = localStorage.getItem('noUser') || hasParam('nouser') || options.noUser,
    onlyEmbed = hasParam('embed') || options.onlyEmbed,
    allowPlaceholders = hasParam('placeholders') || options.allowPlaceholders,
    autoUpdateURL = localStorage.getItem('autoUpdateURL') || options.autoUpdateURL,
    noMultiEmbedsOption = localStorage.getItem('noMultiEmbedsOption') || hasParam('nomultiembedsoption') || options.noMultiEmbedsOption,
    single = noMultiEmbedsOption ? options.single ?? true : (localStorage.getItem('single') || hasParam('single') || options.single) ?? false,
    multiEmbeds = !single,
    autoParams = localStorage.getItem('autoParams') || hasParam('autoparams') || options.autoParams,
    hideEditor = localStorage.getItem('hideeditor') || hasParam('hideeditor') || options.hideEditor,
    hidePreview = localStorage.getItem('hidepreview') || hasParam('hidepreview') || options.hidePreview,
    hideMenu = localStorage.getItem('hideMenu') || hasParam('hidemenu') || options.hideMenu,
    sourceOption = localStorage.getItem('sourceOption') || hasParam('sourceoption') || options.sourceOption,
    // sourceInMenu = localStorage.getItem('sourceInMenu') || hasParam('sourceInMenu') || options.sourceInMenu || top.location.host === mainHost,
    validationError, activeFields, lastActiveGuiEmbedIndex = -1, lastGuiJson, colNum = 1, num = 0;

const guiEmbedIndex = guiEl => {
    const guiEmbed = guiEl?.closest('.guiEmbed');
    const gui = guiEmbed?.closest('.gui')

    return !gui ? -1 : Array.from(gui.querySelectorAll('.guiEmbed')).indexOf(guiEmbed)
}

const toggleStored = item => {
    const found = localStorage.getItem(item);
    if (!found)
        return localStorage.setItem(item, true);

    localStorage.removeItem(item);
    return found;
};

const createElement = object => {
    let element;
    for (const tag in object) {
        element = document.createElement(tag);

        for (const attr in object[tag])
            if (attr !== 'children') element[attr] = object[tag][attr];
            else for (const child of object[tag][attr])
                element.appendChild(createElement(child));

    }

    return element;
}

const encodeJson = (jsonCode, withURL = false, redirect = false) => {
    let data = btoa(encodeURIComponent((JSON.stringify(typeof jsonCode === 'object' ? jsonCode : json))));
    let url = new URL(location.href);

    if (withURL) {
        url.searchParams.set('data', data);
        if (redirect)
            return top.location.href = url;

        data = url.href
            // Replace %3D ('=' url encoded) with '='
            .replace(/data=\w+(?:%3D)+/g, 'data=' + data);
    }

    return data;
};

const decodeJson = data => {
    const jsonData = decodeURIComponent(atob(data || dataSpecified));
    return typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
};

// IMPORTANT: jsonToBase64 and base64ToJson are subject to removal.
// Use encodeJson and decodeJson instead, they are aliases.
let jsonToBase64 = encodeJson, base64ToJson = decodeJson;


const toRGB = (hex, reversed, integer) => {
    if (reversed) return '#' + hex.match(/\d+/g).map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
    if (integer) return parseInt(hex.match(/\d+/g).map(x => parseInt(x).toString(16).padStart(2, '0')).join(''), 16);
    if (hex.includes(',')) return hex.match(/\d+/g);
    hex = hex.replace('#', '').match(/.{1,2}/g)
    return [parseInt(hex[0], 16), parseInt(hex[1], 16), parseInt(hex[2], 16), 1];
};

const reverse = (reversed, callback) => {
    const side = document.querySelector(reversed ? '.side2' : '.side1');
    if (side.nextElementSibling) side.parentElement.insertBefore(side.nextElementSibling, side);
    else side.parentElement.insertBefore(side, side.parentElement.firstElementChild);

    const isReversed = document.body.classList.toggle('reversed');
    if (autoParams) isReversed ? urlOptions({ set: ['reverse', ''] }) : urlOptions({ remove: 'reverse' });
};

const urlOptions = ({ remove, set }) => {
    const url = new URL(location.href);
    if (remove) url.searchParams.delete(remove);
    if (set) url.searchParams.set(set[0], set[1]);
    
    try {
        history.replaceState(null, null, url.href.replace(/(?<!data=[^=]+|=)=(&|$)/g, x => x === '=' ? '' : '&'));
    } catch (e) {
        // 'SecurityError' when trying to change the url of a different origin
        // e.g. when trying to change the url of the parent window from an iframe
        console.info(e);
    }
};

const animateGuiEmbedNameAt = (i, text) => {
    const guiEmbedName = document.querySelectorAll('.gui .guiEmbedName')?.[i];
    // Shake animation
    guiEmbedName?.animate(
        [{ transform: 'translate(0, 0)' },
        { transform: 'translate(10px, 0)' },
        { transform: 'translate(0, 0)' }],
        { duration: 100, iterations: 3 });

    text && (guiEmbedName?.style.setProperty('--text', `"${text}"`));

    guiEmbedName?.scrollIntoView({ behavior: "smooth", block: "center" });
    guiEmbedName?.classList.remove('empty');
    setTimeout(() => guiEmbedName?.classList.add('empty'), 10);
}

const indexOfEmptyGuiEmbed = text => {
    for (const [i, element] of document.querySelectorAll('.msgEmbed>.container .embed').entries())
        if (element.classList.contains('emptyEmbed')) {
            text !== false && animateGuiEmbedNameAt(i, text);
            return i;
        }

    for (const [i, embedObj] of (json.embeds || []).entries())
        if (!(0 in Object.keys(embedObj))) {
            text !== false && animateGuiEmbedNameAt(i, text);
            return i;
        }

    return -1;
}

const changeLastActiveGuiEmbed = index => {
    const pickerEmbedText = document.querySelector('.colors .cTop .embedText>span');

    if (index === -1) {
        lastActiveGuiEmbedIndex = -1;
        return pickerEmbedText.textContent = '';
    }

    lastActiveGuiEmbedIndex = index;

    if (pickerEmbedText) {
        pickerEmbedText.textContent = index + 1;

        const guiEmbedNames = document.querySelectorAll('.gui .item.guiEmbedName');
        pickerEmbedText.onclick = () => {
            const newIndex = parseInt(prompt('Enter an embed number' + (guiEmbedNames.length > 1 ? `, 1 - ${guiEmbedNames.length}` : ''), index + 1));
            if (isNaN(newIndex)) return;
            if (newIndex < 1 || newIndex > guiEmbedNames.length)
                return error(guiEmbedNames.length === 1 ? `'${newIndex}' is not a valid embed number` : `'${newIndex}' doesn't seem like a number between 1 and ${guiEmbedNames.length}`);

            changeLastActiveGuiEmbed(newIndex - 1);
        }
    }
}

// Called after building embed for extra work.
const afterBuilding = () => autoUpdateURL && urlOptions({ set: ['data', encodeJson(json)] });
// Parses emojis to images and adds code highlighting.
const externalParsing = ({ noEmojis, element } = {}) => {
    !noEmojis && twemoji.parse(element || document.querySelector('.msgEmbed'), { base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/' });
    for (const block of document.querySelectorAll('.markup pre > code'))
        hljs.highlightBlock(block);

    const embed = element?.closest('.embed');
    if (embed?.innerText.trim())
        (multiEmbeds ? embed : document.body).classList.remove('emptyEmbed');

    afterBuilding()
};

let embedKeys = ["author", "footer", "color", "thumbnail", "image", "fields", "title", "description", "url", "timestamp"];
let mainKeys = ["embed", "embeds", "content"];
let allJsonKeys = [...mainKeys, ...embedKeys];

// 'jsonObject' is used internally, do not change it's value. Assign to 'json' instead.
// 'json' is the object that is used to build the embed. Assigning to it also updates the editor.
let jsonObject = window.json || {
    content: "You can~~not~~ do `this`.<:FunCool:1376871513537646723>\n# Header 1\n## Header 2\n### Header 3\n```py\nAnd this.\nprint('Hi')```*italics* or _italics_     __*underline italics*__\n**bold**     __**underline bold**__\n***bold italics***  __***underline bold italics***__\n__underline__     ~~Strikethrough~~\n> Make it a Quote! :speech_balloon:",
    embed: {
        title: "Hello ~~people~~ world :wave:",
        description: "You can use [links](https://discord.com) or emojis :smile: 😎\n```\nAnd also code blocks\n```",
        color: 0x41f097,
        timestamp: new Date().toISOString(),
        url: "https://discord.com",
        author: {
            name: "Author name",
            url: "https://discord.com",
            icon_url: "https://harys.is-a.dev/images/discord.png"
        },
        thumbnail: {
            url: "https://harys.is-a.dev/images/discord.png"
        },
        image: {
            url: "https://harys.is-a.dev/images/galaxy.png"
        },
        footer: {
            text: "Footer text",
            icon_url: "https://harys.is-a.dev/images/discord.png"
        },
        fields: [
            {
                name: "Field 1, *lorem* **ipsum**, ~~dolor~~",
                value: "Field value"
            },
            {
                name: "Field 2",
                value: "You can use custom emojis <:FunKing:1377372822095138880>. <:FunGoodVibes:1376800965197565992>",
                inline: false
            },
            {
                name: "Inline field",
                value: "Fields can be inline",
                inline: true
            },
            {
                name: "Inline field",
                value: "*Lorem ipsum*",
                inline: true
            },
            {
                name: "Inline field",
                value: "value",
                inline: true
            },
            {
                name: "Another field",
                value: "> Nope, didn't forget about this",
                inline: false
            }
        ]
    }
}

if (dataSpecified)
    jsonObject = decodeJson();

if (allowPlaceholders)
    allowPlaceholders = params.get('placeholders') === 'errors' ? 1 : 2;

// Even if not in multi-embed mode, 'jsonObject' should always have an array 'embeds'
// To get the right json object that includes either 'embeds' or 'embed' if not in multi-embed mode,
// print 'json' (global variable) instead of 'jsonObject', jsonObject is used internally, you shouldn't modify it.
if (multiEmbeds && !jsonObject.embeds?.length)
    jsonObject.embeds = jsonObject.embed ? [jsonObject.embed] : [];
else if (!multiEmbeds)
    jsonObject.embeds = jsonObject.embeds?.[0] ? [jsonObject.embeds[0]] : jsonObject.embed ? [jsonObject.embed] : [];

delete jsonObject.embed;

addEventListener('DOMContentLoaded', () => {
    if (reverseColumns || localStorage.getItem('reverseColumns'))
        reverse();
    if (autoParams)
        document.querySelector('.item.auto-params > input').checked = true;
    if (hideMenu)
        document.querySelector('.top-btn.menu')?.classList.add('hidden');
    if (noMultiEmbedsOption)
        document.querySelector('.box .item.multi')?.remove();
    if (inIframe)
        // Remove menu options that don't work in iframe.
        for (const e of document.querySelectorAll('.no-frame'))
            e.remove();

    if (autoUpdateURL) {
        document.body.classList.add('autoUpdateURL');
        document.querySelector('.item.auto > input').checked = true;
    }

    if (single) {
        document.body.classList.add('single');
        if (autoParams)
            single ? urlOptions({ set: ['single', ''] }) : urlOptions({ remove: 'single' });
    }

    if (hideEditor) {
        document.body.classList.add('no-editor');
        document.querySelector('.toggle .toggles .editor input').checked = false;
    }

    if (hidePreview) {
        document.body.classList.add('no-preview');
        document.querySelector('.toggle .toggles .preview input').checked = false;
    }

    if (onlyEmbed) document.body.classList.add('only-embed');
    else {
        document.querySelector('.side1.noDisplay')?.classList.remove('noDisplay');
        if (useJsonEditor)
            document.body.classList.remove('gui');
    }

    if (noUser) {
        document.body.classList.add('no-user');
        if (autoParams)
            noUser ? urlOptions({ set: ['nouser', ''] }) : urlOptions({ remove: 'nouser' });
    }

    else {
        if (username) document.querySelector('.username').textContent = username;
        if (avatar) document.querySelector('.avatar').src = avatar;
        if (verified) document.querySelector('.msgEmbed > .contents').classList.add('verified');
    }

    for (const e of document.querySelectorAll('.clickable > img'))
        e.parentElement.addEventListener('mouseup', el => window.open(el.target.src));

    const editorHolder = document.querySelector('.editorHolder'),
        guiParent = document.querySelector('.top'),
        embedContent = document.querySelector('.messageContent'),
        embedCont = document.querySelector('.msgEmbed>.container'),
        gui = guiParent.querySelector('.gui:first-of-type');

    editor = CodeMirror(elt => editorHolder.parentNode.replaceChild(elt, editorHolder), {
        value: JSON.stringify(json, null, 4),
        gutters: ["CodeMirror-foldgutter", "CodeMirror-lint-markers"],
        scrollbarStyle: "overlay",
        mode: "application/json",
        theme: 'material-darker',
        matchBrackets: true,
        foldGutter: true,
        lint: true,
        extraKeys: {
            // Fill in indent spaces on a new line when enter (return) key is pressed.
            Enter: _ => {
                const cursor = editor.getCursor();
                const end = editor.getLine(cursor.line);
                const leadingSpaces = end.replace(/\S($|.)+/g, '') || '    \n';
                const nextLine = editor.getLine(cursor.line + 1);

                if ((nextLine === undefined || !nextLine.trim()) && !end.substr(cursor.ch).trim())
                    editor.replaceRange('\n', { line: cursor.line, ch: cursor.ch });
                else
                    editor.replaceRange(`\n${end.endsWith('{') ? leadingSpaces + '    ' : leadingSpaces}`, {
                        line: cursor.line,
                        ch: cursor.ch
                    });
            },
        }
    });

    editor.focus();

    const notif = document.querySelector('.notification');

    error = (msg, time = '5s') => {
        notif.innerHTML = msg;
        notif.style.removeProperty('--startY');
        notif.style.removeProperty('--startOpacity');
        notif.style.setProperty('--time', time);
        notif.onanimationend = () => notif.style.display = null;

        // If notification element is not already visible, (no other message is already displayed), display it.
        if (!notif.style.display)
            return notif.style.display = 'block', false;

        // If there's a message already displayed, update it and delay animating out.
        notif.style.setProperty('--startY', 0);
        notif.style.setProperty('--startOpacity', 1);
        notif.style.display = null;
        setTimeout(() => notif.style.display = 'block', .5);

        return false;
    };

    const url = (url) => /^(https?:)?\/\//g.exec(url) ? url : '//' + url;

    const makeShort = (txt, length, mediaWidth) => {
        if (mediaWidth && matchMedia(`(max-width:${mediaWidth}px)`).matches)
            return txt.length > (length - 3) ? txt.substring(0, length - 3) + '...' : txt;
        return txt;
    }

    const allGood = embedObj => {
        let invalid, err;
        let str = JSON.stringify(embedObj, null, 4)
        let re = /("(?:icon_)?url": *")((?!\w+?:\/\/).+)"/g.exec(str);

        if (embedObj.timestamp && new Date(embedObj.timestamp).toString() === "Invalid Date") {
            if (allowPlaceholders === 2) return true;
            if (!allowPlaceholders) invalid = true, err = 'Timestamp is invalid';
        } else if (re) { // If a URL is found without a protocol
            if (!/\w+:|\/\/|^\//g.exec(re[2]) && re[2].includes('.')) {
                let activeInput = document.querySelector('input[class$="link" i]:focus')
                if (activeInput && !allowPlaceholders) {
                    lastPos = activeInput.selectionStart + 7;
                    activeInput.value = `http://${re[2]}`;
                    activeInput.setSelectionRange(lastPos, lastPos)
                    return true;
                }
            }
            if (allowPlaceholders !== 2)
                invalid = true, err = (`URL should have a protocol. Did you mean <span class="inline full short">http://${makeShort(re[2], 30, 600).replace(' ', '')}</span>?`);
        }

        if (invalid) {
            validationError = true;
            return error(err);
        }

        return true;
    }

    const markup = (txt, { replaceEmojis, inlineBlock, inEmbed }) => {
        if (replaceEmojis)
            txt = txt.replace(/(?<!code(?: \w+=".+")?>[^>]+)(?<!\/[^\s"]+?):((?!\/)\w+):/g, (match, p) => p && emojis[p] ? emojis[p] : match);

        txt = txt
            /** Markdown */
            .replace(/&#60;:\w+:(\d{17,19})&#62;/g, '<img class="emoji" src="https://cdn.discordapp.com/emojis/$1.png"/>')
            .replace(/&#60;a:\w+:(\d{17,20})&#62;/g, '<img class="emoji" src="https://cdn.discordapp.com/emojis/$1.gif"/>')
            .replace(/~~(.+?)~~/g, '<s>$1</s>')
            .replace(/\*\*\*(.+?)\*\*\*/g, '<em><strong>$1</strong></em>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/__(.+?)__/g, '<u>$1</u>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/_(.+?)_/g, '<em>$1</em>')
            //headings
            .replace(/^# (.*)$/gm, '<h1 class="heading1">$1</h1>')
            .replace(/^## (.*)$/gm, '<h2 class="heading2">$1</h2>')
            .replace(/^### (.*)$/gm, '<h3 class="heading3">$1</h3>')
            // Replace >>> and > with block-quotes. &#62; is HTML code for >
            .replace(/^(?: *&#62;&#62;&#62; ([\s\S]*))|(?:^ *&#62;(?!&#62;&#62;) +.+\n)+(?:^ *&#62;(?!&#62;&#62;) .+\n?)+|^(?: *&#62;(?!&#62;&#62;) ([^\n]*))(\n?)/mg, (all, match1, match2, newLine) => {
                return `<div class="blockquote"><div class="blockquoteDivider"></div><blockquote>${match1 || match2 || newLine ? match1 || match2 : all.replace(/^ *&#62; /gm, '')}</blockquote></div>`;
            })

            /** Mentions */
            .replace(/&#60;#\d+&#62;/g, () => `<span class="mention channel interactive">channel</span>`)
            .replace(/&#60;@(?:&#38;|!)?\d+&#62;|@(?:everyone|here)/g, match => {
                if (match.startsWith('@')) return `<span class="mention">${match}</span>`
                else return `<span class="mention interactive">@${match.includes('&#38;') ? 'role' : 'user'}</span>`
            })

            // parse text in brackets and then the URL in parentheses.
            .replace(/\[([^\[\]]+)\]\((.+?)\)/g, `<a title="$1" target="_blank" class="anchor" href="$2">$1</a>`)
    
        if (inlineBlock)
            // Treat both inline code and code blocks as inline code
            txt = txt.replace(/`([^`]+?)`|``([^`]+?)``|```((?:\n|.)+?)```/g, (m, x, y, z) => x ? `<code class="inline">${x}</code>` : y ? `<code class="inline">${y}</code>` : z ? `<code class="inline">${z}</code>` : m);
        else {
            // Code block
            txt = txt.replace(/```(?:([a-z0-9_+\-.]+?)\n)?\n*([^\n][^]*?)\n*```/ig, (m, w, x) => {
                if (w) return `<pre><code class="${w}">${x.trim()}</code></pre>`
                else return `<pre><code class="hljs nohighlight">${x.trim()}</code></pre>`
            });
            // Inline code
            txt = txt.replace(/`([^`]+?)`|``([^`]+?)``/g, (m, x, y, z) => x ? `<code class="inline">${x}</code>` : y ? `<code class="inline">${y}</code>` : z ? `<code class="inline">${z}</code>` : m)
        }
        return txt;
    }


    const createEmbedFields = (fields, embedFields) => {
        embedFields.innerHTML = '';
        let index, gridCol;

        for (const [i, f] of fields.entries()) {
            if (f.name && f.value) {
                const fieldElement = embedFields.insertBefore(document.createElement('div'), null);
                // Figuring out if there are only two fields on a row to give them more space.
                // e.fields = json.embeds.fields.

                // if both the field of index 'i' and the next field on it's right are inline and -
                if (fields[i].inline && fields[i + 1]?.inline &&
                    // it's the first field in the embed or -
                    ((i === 0 && fields[i + 2] && !fields[i + 2].inline) || ((
                        // it's not the first field in the embed but the previous field is not inline or - 
                        i > 0 && !fields[i - 1].inline ||
                        // it has 3 or more fields behind it and 3 of those are inline except the 4th one back if it exists -
                        i >= 3 && fields[i - 1].inline && fields[i - 2].inline && fields[i - 3].inline && (fields[i - 4] ? !fields[i - 4].inline : !fields[i - 4])
                        // or it's the first field on the last row or the last field on the last row is not inline or it's the first field in a row and it's the last field on the last row.
                    ) && (i == fields.length - 2 || !fields[i + 2].inline))) || i % 3 === 0 && i == fields.length - 2) {
                    // then make the field halfway (and the next field will take the other half of the embed).
                    index = i, gridCol = '1 / 7';
                }
                // The next field.
                if (index === i - 1)
                    gridCol = '7 / 13';

                if (!f.inline)
                    fieldElement.outerHTML = `
                        <div class="embedField" style="grid-column: 1 / 13;">
                            <div class="embedFieldName">${markup(encodeHTML(f.name), { inEmbed: true, replaceEmojis: true, inlineBlock: true })}</div>
                            <div class="embedFieldValue">${markup(encodeHTML(f.value), { inEmbed: true, replaceEmojis: true })}</div>
                        </div>`;
                else {
                    if (i && !fields[i - 1].inline) colNum = 1;

                    fieldElement.outerHTML = `
                        <div class="embedField ${num}${gridCol ? ' colNum-2' : ''}" style="grid-column: ${gridCol || (colNum + ' / ' + (colNum + 4))};">
                            <div class="embedFieldName">${markup(encodeHTML(f.name), { inEmbed: true, replaceEmojis: true, inlineBlock: true })}</div>
                            <div class="embedFieldValue">${markup(encodeHTML(f.value), { inEmbed: true, replaceEmojis: true })}</div>
                        </div>`;

                    if (index !== i) gridCol = false;
                }

                colNum = (colNum === 9 ? 1 : colNum + 4);
                num++;
            };
        };


        for (const e of document.querySelectorAll('.embedField[style="grid-column: 1 / 5;"]'))
            if (!e.nextElementSibling || e.nextElementSibling.style.gridColumn === '1 / 13')
                e.style.gridColumn = '1 / 13';
        colNum = 1;

        display(embedFields, undefined, 'grid');
    }

    const smallerScreen = matchMedia('(max-width: 1015px)');

    const encodeHTML = str => str.replace(/[\u00A0-\u9999<>\&]/g, i => '&#' + i.charCodeAt(0) + ';');

    const timestamp = stringISO => {
        const date = stringISO ? new Date(stringISO) : new Date(),
            dateArray = date.toLocaleString('en-US', { hour: 'numeric', hour12: false, minute: 'numeric' }),
            today = new Date(),
            yesterday = new Date(new Date().setDate(today.getDate() - 1)),
            tommorrow = new Date(new Date().setDate(today.getDate() + 1));

        return today.toDateString() === date.toDateString() ? `Today at ${dateArray}` :
            yesterday.toDateString() === date.toDateString() ? `Yesterday at ${dateArray}` :
                tommorrow.toDateString() === date.toDateString() ? `Tomorrow at ${dateArray}` :
                    `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
    }

    const display = (el, data, displayType) => {
        if (data) el.innerHTML = data;
        el.style.display = displayType || "unset";
    }

    const hide = el => el.style.removeProperty('display'),
        imgSrc = (elm, src, remove) => remove ? elm.style.removeProperty('content') : elm.style.content = `url(${src})`;

    const [guiFragment, fieldFragment, embedFragment, guiEmbedAddFragment] = Array.from({ length: 4 }, () => document.createDocumentFragment());
    embedFragment.appendChild(document.querySelector('.embed.markup').cloneNode(true));
    guiEmbedAddFragment.appendChild(document.querySelector('.guiEmbedAdd').cloneNode(true));
    fieldFragment.appendChild(document.querySelector('.edit>.fields>.field').cloneNode(true));

    document.querySelector('.embed.markup').remove();
    gui.querySelector('.edit>.fields>.field').remove();

    for (const child of gui.childNodes)
        guiFragment.appendChild(child.cloneNode(true));

    // Renders the GUI editor with json data from 'jsonObject'.
    buildGui = (object = jsonObject, opts) => {
        gui.innerHTML = '';
        gui.appendChild(guiEmbedAddFragment.firstChild.cloneNode(true))
            .addEventListener('click', () => {
                if (indexOfEmptyGuiEmbed('(empty embed)') !== -1) return;
                jsonObject.embeds.push({});
                buildGui();
            });

        for (const child of Array.from(guiFragment.childNodes)) {
            if (child.classList?.[1] === 'content')
                gui.insertBefore(gui.appendChild(child.cloneNode(true)), gui.appendChild(child.nextElementSibling.cloneNode(true))).nextElementSibling.firstElementChild.value = object.content || '';
            else if (child.classList?.[1] === 'guiEmbedName') {
                for (const [i, embed] of (object.embeds.length ? object.embeds : [{}]).entries()) {
                    const guiEmbedName = gui.appendChild(child.cloneNode(true))

                    guiEmbedName.querySelector('.text').innerHTML = `Embed ${i + 1}${embed.title ? `: <span>${embed.title}</span>` : ''}`;
                    guiEmbedName.querySelector('.icon').addEventListener('click', () => {
                        object.embeds.splice(i, 1);
                        buildGui();
                        buildEmbed();
                    });

                    const guiEmbed = gui.appendChild(createElement({ 'div': { className: 'guiEmbed' } }));
                    const guiEmbedTemplate = child.nextElementSibling;

                    for (const child2 of Array.from(guiEmbedTemplate.children)) {
                        if (!child2?.classList.contains('edit')) {
                            const row = guiEmbed.appendChild(child2.cloneNode(true));
                            const edit = child2.nextElementSibling?.cloneNode(true);
                            edit?.classList.contains('edit') && guiEmbed.appendChild(edit);

                            switch (child2.classList[1]) {
                                case 'author':
                                    const authorURL = embed?.author?.icon_url || '';
                                    if (authorURL)
                                        edit.querySelector('.imgParent').style.content = 'url(' + encodeHTML(authorURL) + ')';
                                    edit.querySelector('.editAuthorLink').value = authorURL;
                                    edit.querySelector('.editAuthorName').value = embed?.author?.name || '';
                                    break;
                                case 'title':
                                    row.querySelector('.editTitle').value = embed?.title || '';
                                    break;
                                case 'description':
                                    edit.querySelector('.editDescription').value = embed?.description || '';
                                    break;
                                case 'thumbnail':
                                    const thumbnailURL = embed?.thumbnail?.url || '';
                                    if (thumbnailURL)
                                        edit.querySelector('.imgParent').style.content = 'url(' + encodeHTML(thumbnailURL) + ')';
                                    edit.querySelector('.editThumbnailLink').value = thumbnailURL;
                                    break;
                                case 'image':
                                    const imageURL = embed?.image?.url || '';
                                    if (imageURL)
                                        edit.querySelector('.imgParent').style.content = 'url(' + encodeHTML(imageURL) + ')';
                                    edit.querySelector('.editImageLink').value = imageURL;
                                    break;
                                case 'footer':
                                    const footerURL = embed?.footer?.icon_url || '';
                                    if (footerURL)
                                        edit.querySelector('.imgParent').style.content = 'url(' + encodeHTML(footerURL) + ')';
                                    edit.querySelector('.editFooterLink').value = footerURL;
                                    edit.querySelector('.editFooterText').value = embed?.footer?.text || '';
                                    break;
                                case 'fields':
                                    for (const f of embed?.fields || []) {
                                        const fields = edit.querySelector('.fields');
                                        const field = fields.appendChild(createElement({ 'div': { className: 'field' } }));

                                        for (const child of Array.from(fieldFragment.firstChild.children)) {
                                            const newChild = field.appendChild(child.cloneNode(true));

                                            if (child.classList.contains('inlineCheck'))
                                                newChild.querySelector('input').checked = !!f.inline;

                                            else if (f.value && child.classList?.contains('fieldInner'))
                                                newChild.querySelector('.designerFieldName input').value = f.name || '',
                                                    newChild.querySelector('.designerFieldValue textarea').value = f.value || '';
                                        }
                                    }
                            }
                        }
                    }
                }
            }

            // Expand last embed in GUI
            const names = gui.querySelectorAll('.guiEmbedName');
            names[names.length - 1]?.classList.add('active');
        }

        for (const e of document.querySelectorAll('.top>.gui .item'))
            e.addEventListener('click', el => {
                if (e?.classList.contains('active'))
                    getSelection().anchorNode !== e && e.classList.remove('active');
                else if (e) {
                    const inlineField = e.closest('.inlineField'),
                        input = e.nextElementSibling?.querySelector('input[type="text"]'),
                        txt = e.nextElementSibling?.querySelector('textarea');

                    e.classList.add('active');
                    if (e.classList.contains('guiEmbedName'))
                        return changeLastActiveGuiEmbed(guiEmbedIndex(e));

                    else if (inlineField)
                        inlineField.querySelector('.ttle~input').focus();

                    else if (e.classList.contains('footer')) {
                        const date = new Date(jsonObject.embeds[guiEmbedIndex(e)]?.timestamp || new Date());
                        const textElement = e.nextElementSibling.querySelector('svg>text');
                        const dateInput = textElement.closest('.footerDate').querySelector('input');

                        return (
                            textElement.textContent = (date.getDate() + '').padStart(2, 0),
                            dateInput.value = date.toISOString().substring(0, 19)
                        );
                    }

                    else if (input) {
                        !smallerScreen.matches && input.focus();
                        input.selectionStart = input.selectionEnd = input.value.length;
                    }

                    else if (txt && !smallerScreen.matches)
                        txt.focus();

                    if (e.classList.contains('fields')) {
                        if (reverseColumns && smallerScreen.matches)
                            // return elm.nextElementSibling.scrollIntoView({ behavior: 'smooth', block: "end" });
                            return e.parentNode.scrollTop = e.offsetTop;

                        e.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                }
            })

        content = gui.querySelector('.editContent');
        title = gui.querySelector('.editTitle');
        authorName = gui.querySelector('.editAuthorName');
        authorLink = gui.querySelector('.editAuthorLink');
        desc = gui.querySelector('.editDescription');
        thumbLink = gui.querySelector('.editThumbnailLink');
        imgLink = gui.querySelector('.editImageLink');
        footerText = gui.querySelector('.editFooterText');
        footerLink = gui.querySelector('.editFooterLink');

        // Scroll into view when tabs are opened in the GUI.
        const lastTabs = Array.from(document.querySelectorAll('.footer.rows2, .image.largeImg'));
        const requiresView = matchMedia(`${smallerScreen.media}, (max-height: 845px)`);
        const addGuiEventListeners = () => {
            for (const e of document.querySelectorAll('.gui .item:not(.fields)'))
                e.onclick = () => {
                    if (lastTabs.includes(e) || requiresView.matches) {
                        if (!reverseColumns || !smallerScreen.matches)
                            e.scrollIntoView({ behavior: 'smooth', block: "center" });
                        else if (e.nextElementSibling.classList.contains('edit') && e.classList.contains('active'))
                            // e.nextElementSibling.scrollIntoView({ behavior: 'smooth', block: "end" });
                            e.parentNode.scrollTop = e.offsetTop;
                    }
                };

            for (const e of document.querySelectorAll('.addField'))
                e.onclick = () => {
                    const guiEmbed = e.closest('.guiEmbed');
                    const indexOfGuiEmbed = Array.from(gui.querySelectorAll('.guiEmbed')).indexOf(guiEmbed);
                    if (indexOfGuiEmbed === -1) return error('Could not find the embed to add the field to.');

                    const fieldsObj = (jsonObject.embeds[indexOfGuiEmbed] ??= {}).fields ??= [];
                    if (fieldsObj.length >= 25) return error('Cannot have more than 25 fields');
                    fieldsObj.push({ name: "Field name", value: "Field value", inline: false });

                    const newField = guiEmbed?.querySelector('.item.fields+.edit>.fields')?.appendChild(fieldFragment.firstChild.cloneNode(true));

                    buildEmbed();
                    addGuiEventListeners();

                    newField.scrollIntoView({ behavior: "smooth", block: "center" });
                    if (!smallerScreen.matches) {
                        const firstFieldInput = newField.querySelector('.designerFieldName input');

                        firstFieldInput?.setSelectionRange(firstFieldInput.value.length, firstFieldInput.value.length);
                        firstFieldInput?.focus();
                    }
                };

            for (const e of document.querySelectorAll('.fields .field .removeBtn'))
                e.onclick = () => {
                    const embedIndex = guiEmbedIndex(e);
                    const fieldIndex = Array.from(e.closest('.fields').children).indexOf(e.closest('.field'));

                    if (jsonObject.embeds[embedIndex]?.fields[fieldIndex] === -1)
                        return error('Failed to find the index of the field to remove.');

                    jsonObject.embeds[embedIndex].fields.splice(fieldIndex, 1);

                    buildEmbed();
                    e.closest('.field').remove();
                };

            for (const e of gui.querySelectorAll('textarea, input'))
                e.oninput = el => {
                    const value = el.target.value;
                    const index = guiEmbedIndex(el.target);
                    const field = el.target.closest('.field');
                    const fields = field?.closest('.fields');
                    const embedObj = jsonObject.embeds[index] ??= {};

                    if (field) {
                        console.log(field)
                        const fieldIndex = Array.from(fields.children).indexOf(field);
                        const jsonField = embedObj.fields[fieldIndex];
                        const embedFields = document.querySelectorAll('.container>.embed')[index]?.querySelector('.embedFields');

                        if (jsonField) {
                            if (el.target.type === 'text') jsonField.name = value;
                            else if (el.target.type === 'textarea') jsonField.value = value;
                            else jsonField.inline = el.target.checked;
                            createEmbedFields(embedObj.fields, embedFields);
                        }
                    } else {
                        switch (el.target.classList?.[0]) {
                            case 'editContent':
                                jsonObject.content = value;
                                buildEmbed({ only: 'content' });
                                break;
                            case 'editTitle':
                                embedObj.title = value;
                                const guiEmbedName = el.target.closest('.guiEmbed')?.previousElementSibling;
                                if (guiEmbedName?.classList.contains('guiEmbedName'))
                                    guiEmbedName.querySelector('.text').innerHTML = `${guiEmbedName.innerText.split(':')[0]}${value ? `: <span>${value}</span>` : ''}`;
                                buildEmbed({ only: 'embedTitle', index: guiEmbedIndex(el.target) });
                                break;
                            case 'editAuthorName':
                                embedObj.author ??= {}, embedObj.author.name = value;
                                buildEmbed({ only: 'embedAuthorName', index: guiEmbedIndex(el.target) });
                                break;
                            case 'editAuthorLink': embedObj.author ??= {}, embedObj.author.icon_url = value;
                                imgSrc(el.target.previousElementSibling, value);
                                buildEmbed({ only: 'embedAuthorLink', index: guiEmbedIndex(el.target) });
                                break;
                            case 'editDescription': embedObj.description = value;
                                buildEmbed({ only: 'embedDescription', index: guiEmbedIndex(el.target) });
                                break;
                            case 'editThumbnailLink':
                                embedObj.thumbnail ??= {}, embedObj.thumbnail.url = value;
                                imgSrc(el.target.closest('.editIcon').querySelector('.imgParent'), value);
                                buildEmbed({ only: 'embedThumbnail', index: guiEmbedIndex(el.target) });
                                break;
                            case 'editImageLink':
                                embedObj.image ??= {}, embedObj.image.url = value;
                                imgSrc(el.target.closest('.editIcon').querySelector('.imgParent'), value);
                                buildEmbed({ only: 'embedImageLink', index: guiEmbedIndex(el.target) });
                                break;
                            case 'editFooterText':
                                embedObj.footer ??= {}, embedObj.footer.text = value;
                                buildEmbed({ only: 'embedFooterText', index: guiEmbedIndex(el.target) });
                                break;
                            case 'editFooterLink':
                                embedObj.footer ??= {}, embedObj.footer.icon_url = value;
                                imgSrc(el.target.previousElementSibling, value);
                                buildEmbed({ only: 'embedFooterLink', index: guiEmbedIndex(el.target) });
                                break;
                            case 'embedFooterTimestamp':
                                const date = new Date(value);
                                if (isNaN(date.getTime())) return error('Invalid date');

                                embedObj.timestamp = date;
                                el.target.parentElement.querySelector('svg>text').textContent = (date.getDate() + '').padStart(2, 0);
                                buildEmbed({ only: 'embedFooterTimestamp', index: guiEmbedIndex(el.target) });
                                break;
                        }

                        // Find and filter out any empty objects ({}) in the embeds array as Discord doesn't like them.
                        const nonEmptyEmbedObjects = json.embeds?.filter(o => 0 in Object.keys(o));
                        if (nonEmptyEmbedObjects?.length)
                            json.embeds = nonEmptyEmbedObjects;
                    }

                    // Display embed elements hidden due to not having content. '.msgEmbed>.container' is embed container.
                    document.querySelectorAll('.msgEmbed>.container')[guiEmbedIndex(el.target)]?.querySelector('.emptyEmbed')?.classList.remove('emptyEmbed');
                }

            const uploadError = (message, browse, sleepTime) => {
                browse.classList.remove('loading');
                browse.classList.add('error');

                const p = browse.parentElement.querySelector('.browse.error>p')
                p.dataset.error = message;

                setTimeout(() => {
                    browse.classList.remove('error');
                    delete p.dataset.error;
                }, sleepTime ?? 7000);
            }

            for (const browse of document.querySelectorAll('.browse'))
                browse.onclick = e => {
                    const formData = new FormData();
                    const fileInput = createElement({ 'input': { type: 'file', accept: 'image/*' } });
                    const edit = browse.closest('.edit');
                    const expiration = 7 * 24 * 60 * 60;

                    fileInput.onchange = el => {
                        if (el.target.files[0].size > 32 * 1024 * 1024)
                            return uploadError('File is too large. Maximum size is 32 MB.', browse, 5000);

                        formData.append("expiration", expiration); // Expire after 7 days. Discord caches files.
                        formData.append("key", options.uploadKey || "93385e22b0619db73a5525140b13491c"); // Add your own key through the uploadKey option.
                        formData.append("image", el.target.files[0]);
                        // formData.append("name", ""); // Uses original file name if no "name" is not specified.

                        browse.classList.add('loading');

                        fetch('https://api.imgbb.com/1/upload', { method: 'POST', body: formData })
                            .then(res => res.json())
                            .then(res => {
                                browse.classList.remove('loading');
                                if (!res.success) {
                                    console.log('Upload failed:', res.data?.error || res.error?.message || res);
                                    return uploadError(res.data?.error || res.error?.message || "Request failed. (Check dev-console)", browse);
                                }

                                imgSrc(edit.querySelector('.editIcon > .imgParent'), res.data.url);
                                const linkInput = edit.querySelector('input[type=text]');
                                const textInput = edit.querySelector('input[class$=Name], input[class$=Text]');

                                linkInput.value = res.data.url;
                                // focus on the next empty input if the field requires a name or text to display eg. footer or author.
                                !textInput?.value && textInput?.focus();

                                console.info(`${res.data.url} will be deleted in ${expiration / 60 / 60} hours. To delete it now, visit ${res.data.delete_url} and scroll down to find the delete button.`);

                                linkInput.dispatchEvent(new Event('input'));
                            }).catch(err => {
                                browse.classList.remove('loading');
                                error(`Request failed with error: ${err}`)
                            })
                    }

                    fileInput.click();
                }

            if (multiEmbeds) {
                for (const e of document.querySelectorAll('.guiEmbed'))
                    e.onclick = () => {
                        const guiEmbed = e.closest('.guiEmbed');
                        const indexOfGuiEmbed = Array.from(gui.querySelectorAll('.guiEmbed')).indexOf(guiEmbed);
                        if (indexOfGuiEmbed === -1) return error('Could not find the embed to add the field to.');

                        changeLastActiveGuiEmbed(indexOfGuiEmbed);
                    };


                if (!jsonObject.embeds[lastActiveGuiEmbedIndex])
                    changeLastActiveGuiEmbed(
                        jsonObject.embeds[lastActiveGuiEmbedIndex - 1] ?
                            lastActiveGuiEmbedIndex - 1 :
                            jsonObject.embeds.length ? 0 : -1
                    );
            } else {
                changeLastActiveGuiEmbed(-1);
            }
        }

        addGuiEventListeners();

        let activeGuiEmbed;

        if (opts?.guiEmbedIndex) {
            activeGuiEmbed = Array.from(document.querySelectorAll('.gui .item.guiEmbedName'))[opts.guiEmbedIndex];
            activeGuiEmbed?.classList.add('active');
            activeGuiEmbed = activeGuiEmbed?.nextElementSibling;
        }


        if (opts?.activateClassNames)
            for (const cName of opts.activateClassNames)
                for (const e of document.getElementsByClassName(cName))
                    e.classList.add('active');

        else if (opts?.guiTabs) {
            const tabs = (opts.guiTabs.split?.(/, */) || opts.guiTabs).filter(item => item);
            const bottomKeys = ['footer', 'image'];
            const topKeys = ['author', 'content'];

            // Deactivate the default activated GUI fields
            for (const e of gui.querySelectorAll('.item:not(.guiEmbedName).active'))
                e.classList.remove('active');

            // Activate wanted GUI fields
            if (tabs.length)
                for (const e of document.querySelectorAll(`.${tabs.join(', .')}`))
                    e.classList.add('active');

            // Autoscroll GUI to the bottom if necessary.
            if (!tabs.some(item => topKeys.includes(item)) && tabs.some(item => bottomKeys.includes(item))) {
                const gui2 = document.querySelector('.top .gui');
                gui2.scrollTo({ top: gui2.scrollHeight });
            }
        }

        else if (opts?.activate)
            for (const clss of Array.from(opts.activate).map(el => el.className).map(clss => '.' + clss.split(' ').slice(0, 2).join('.')))
                for (const e of document.querySelectorAll(clss))
                    e.classList.add('active');

        else for (const clss of document.querySelectorAll('.item.author, .item.description'))
            clss.classList.add('active');
    }

    buildGui(jsonObject, { guiTabs });
    gui.classList.remove('hidden');

    fields = gui.querySelector('.fields ~ .edit .fields');

    // Renders embed and message content.
    buildEmbed = ({ jsonData, only, index = 0 } = {}) => {
        if (jsonData) json = jsonData;
        if (!jsonObject.embeds?.length) document.body.classList.add('emptyEmbed');

        try {
            // If there's no message content, hide the message content HTML element.
            if (!jsonObject.content) document.body.classList.add('emptyContent');
            else {
                // Update embed content in render
                embedContent.innerHTML = markup(encodeHTML(jsonObject.content), { replaceEmojis: true });
                document.body.classList.remove('emptyContent');
            }

            const embed = document.querySelectorAll('.container>.embed')[index];
            const embedObj = jsonObject.embeds[index];

            if (only && (!embed || !embedObj)) return buildEmbed();

            switch (only) {
                // If only updating the message content and nothing else, return here.
                case 'content': return externalParsing({ element: embedContent });
                case 'embedTitle':
                    const embedTitle = embed?.querySelector('.embedTitle');
                    if (!embedTitle) return buildEmbed();
                    if (!embedObj.title) hide(embedTitle);
                    else display(embedTitle, markup(`${embedObj.url ? '<a class="anchor" target="_blank" href="' + encodeHTML(url(embedObj.url)) + '">' + encodeHTML(embedObj.title) + '</a>' : encodeHTML(embedObj.title)}`, { replaceEmojis: true, inlineBlock: true }));

                    return externalParsing({ element: embedTitle });
                case 'embedAuthorName':
                case 'embedAuthorLink':
                    const embedAuthor = embed?.querySelector('.embedAuthor');
                    if (!embedAuthor) return buildEmbed();
                    if (!embedObj.author?.name) hide(embedAuthor);
                    else display(embedAuthor, `
                        ${embedObj.author.icon_url ? '<img class="embedAuthorIcon embedAuthorLink" src="' + encodeHTML(url(embedObj.author.icon_url)) + '">' : ''}
                        ${embedObj.author.url ? '<a class="embedAuthorNameLink embedLink embedAuthorName" href="' + encodeHTML(url(embedObj.author.url)) + '" target="_blank">' + encodeHTML(embedObj.author.name) + '</a>' : '<span class="embedAuthorName">' + encodeHTML(embedObj.author.name) + '</span>'}`, 'flex');

                    return externalParsing({ element: embedAuthor });
                case 'embedDescription':
                    const embedDescription = embed?.querySelector('.embedDescription');
                    if (!embedDescription) return buildEmbed();
                    if (!embedObj.description) hide(embedDescription);
                    else display(embedDescription, markup(encodeHTML(embedObj.description), { inEmbed: true, replaceEmojis: true }));

                    return externalParsing({ element: embedDescription });
                case 'embedThumbnail':
                    const embedThumbnailLink = embed?.querySelector('.embedThumbnailLink');
                    if (!embedThumbnailLink) return buildEmbed();
                    const pre = embed.querySelector('.embedGrid .markup pre');
                    if (embedObj.thumbnail?.url) {
                        embedThumbnailLink.src = embedObj.thumbnail.url;
                        embedThumbnailLink.parentElement.style.display = 'block';
                        if (pre) pre.style.maxWidth = '90%';
                    } else {
                        hide(embedThumbnailLink.parentElement);
                        pre?.style.removeProperty('max-width');
                    }

                    return afterBuilding();
                case 'embedImage':
                    const embedImageLink = embed?.querySelector('.embedImageLink');
                    if (!embedImageLink) return buildEmbed();
                    if (!embedObj.image?.url) hide(embedImageLink.parentElement);
                    else embedImageLink.src = embedObj.image.url,
                        embedImageLink.parentElement.style.display = 'block';

                    return afterBuilding();
                case 'embedFooterText':
                case 'embedFooterLink':
                case 'embedFooterTimestamp':
                    const embedFooter = embed?.querySelector('.embedFooter');
                    if (!embedFooter) return buildEmbed();
                    if (!embedObj.footer?.text) hide(embedFooter);
                    else display(embedFooter, `
                        ${embedObj.footer.icon_url ? '<img class="embedFooterIcon embedFooterLink" src="' + encodeHTML(url(embedObj.footer.icon_url)) + '">' : ''}<span class="embedFooterText">
                        ${encodeHTML(embedObj.footer.text)}
                        ${embedObj.timestamp ? '<span class="embedFooterSeparator">•</span>' + encodeHTML(timestamp(embedObj.timestamp)) : ''}</span></div>`, 'flex');

                    return externalParsing({ element: embedFooter });
            }

            if (multiEmbeds) embedCont.innerHTML = '';

            for (const embedObj of jsonObject.embeds) {
                if (!allGood(embedObj)) continue;
                if (!multiEmbeds) embedCont.innerHTML = '';

                validationError = false;

                const embedElement = embedCont.appendChild(embedFragment.firstChild.cloneNode(true));
                const embedGrid = embedElement.querySelector('.embedGrid');
                const msgEmbed = embedElement.querySelector('.msgEmbed');
                const embedTitle = embedElement.querySelector('.embedTitle');
                const embedDescription = embedElement.querySelector('.embedDescription');
                const embedAuthor = embedElement.querySelector('.embedAuthor');
                const embedFooter = embedElement.querySelector('.embedFooter');
                const embedImage = embedElement.querySelector('.embedImage > img');
                const embedThumbnail = embedElement.querySelector('.embedThumbnail > img');
                const embedFields = embedElement.querySelector('.embedFields');

                if (embedObj.title) display(embedTitle, markup(`${embedObj.url ? '<a class="anchor" target="_blank" href="' + encodeHTML(url(embedObj.url)) + '">' + encodeHTML(embedObj.title) + '</a>' : encodeHTML(embedObj.title)}`, { replaceEmojis: true, inlineBlock: true }));
                else hide(embedTitle);

                if (embedObj.description) display(embedDescription, markup(encodeHTML(embedObj.description), { inEmbed: true, replaceEmojis: true }));
                else hide(embedDescription);

                if (embedObj.color) embedGrid.closest('.embed').style.borderColor = (typeof embedObj.color === 'number' ? '#' + embedObj.color.toString(16).padStart(6, "0") : embedObj.color);
                else embedGrid.closest('.embed').style.removeProperty('border-color');

                if (embedObj.author?.name) display(embedAuthor, `
                    ${embedObj.author.icon_url ? '<img class="embedAuthorIcon embedAuthorLink" src="' + encodeHTML(url(embedObj.author.icon_url)) + '">' : ''}
                    ${embedObj.author.url ? '<a class="embedAuthorNameLink embedLink embedAuthorName" href="' + encodeHTML(url(embedObj.author.url)) + '" target="_blank">' + encodeHTML(embedObj.author.name) + '</a>' : '<span class="embedAuthorName">' + encodeHTML(embedObj.author.name) + '</span>'}`, 'flex');
                else hide(embedAuthor);

                const pre = embedGrid.querySelector('.markup pre');
                if (embedObj.thumbnail?.url) {
                    embedThumbnail.src = embedObj.thumbnail.url;
                    embedThumbnail.parentElement.style.display = 'block';
                    if (pre) pre.style.maxWidth = '90%';
                } else {
                    hide(embedThumbnail.parentElement);
                    if (pre) pre.style.removeProperty('max-width');
                }

                if (embedObj.image?.url)
                    embedImage.src = embedObj.image.url,
                        embedImage.parentElement.style.display = 'block';
                else hide(embedImage.parentElement);

                if (embedObj.footer?.text) display(embedFooter, `
                    ${embedObj.footer.icon_url ? '<img class="embedFooterIcon embedFooterLink" src="' + encodeHTML(url(embedObj.footer.icon_url)) + '">' : ''}<span class="embedFooterText">
                        ${encodeHTML(embedObj.footer.text)}
                    ${embedObj.timestamp ? '<span class="embedFooterSeparator">•</span>' + encodeHTML(timestamp(embedObj.timestamp)) : ''}</span></div>`, 'flex');
                else if (embedObj.timestamp) display(embedFooter, `<span class="embedFooterText">${encodeHTML(timestamp(embedObj.timestamp))}</span></div>`, 'flex');
                else hide(embedFooter);

                if (embedObj.fields) createEmbedFields(embedObj.fields, embedFields);
                else hide(embedFields);

                document.body.classList.remove('emptyEmbed');
                externalParsing();

                if (embedElement.innerText.trim() || embedElement.querySelector('.embedGrid > [style*=display] img'))
                    embedElement.classList.remove('emptyEmbed');
                else
                    embedElement.classList.add('emptyEmbed');
            }

            // Make sure that the embed has no text or any visible images such as custom emojis before hiding.
            if (!multiEmbeds && !embedCont.innerText.trim() && !embedCont.querySelector('.embedGrid > [style*=display] img'))
                document.body.classList.add('emptyEmbed');

            afterBuilding()
        } catch (e) {
            console.error(e);
            error(e);
        }
    }

    editor.on('change', editor => {
        // If the editor value is not set by the user, return.
        if (JSON.stringify(json, null, 4) === editor.getValue()) return;

        try {
            // Autofill when " is typed on new line
            const line = editor.getCursor().line;
            const text = editor.getLine(line)

            if (text.trim() === '"') {
                editor.replaceRange(text.trim() + ':', { line, ch: line.length });
                editor.setCursor(line, text.length)
            }

            json = JSON.parse(editor.getValue());
            const dataKeys = Object.keys(json);

            if (dataKeys.length && !allJsonKeys.some(key => dataKeys.includes(key))) {
                const usedKeys = dataKeys.filter(key => !allJsonKeys.includes(key));
                if (usedKeys.length > 2)
                    return error(`'${usedKeys[0] + "', '" + usedKeys.slice(1, usedKeys.length - 1).join("', '")}', and '${usedKeys[usedKeys.length - 1]}' are invalid keys.`);
                return error(`'${usedKeys.length == 2 ? usedKeys[0] + "' and '" + usedKeys[usedKeys.length - 1] + "' are invalid keys." : usedKeys[0] + "' is an invalid key."}`);
            }

            buildEmbed();

        } catch (e) {
            if (editor.getValue()) return;
            document.body.classList.add('emptyEmbed');
            embedContent.innerHTML = '';
        }
    });

    const picker = new CP(document.querySelector('.picker'), state = { parent: document.querySelector('.cTop') });

    picker.fire?.('change', toRGB('#41f097'));

    const colors = document.querySelector('.colors');
    const hexInput = colors?.querySelector('.hex>div input');

    let typingHex = true, exit = false;

    removePicker = () => {
        if (exit) return exit = false;
        if (typingHex) picker.enter();
        else {
            typingHex = false, exit = true;
            colors.classList.remove('picking');
            picker.exit();
        }
    }

    document.querySelector('.colBack')?.addEventListener('click', () => {
        picker.self.remove();
        typingHex = false;
        removePicker();
    })

    picker.on?.('exit', removePicker);
    picker.on?.('enter', () => {
        const embedIndex = multiEmbeds && lastActiveGuiEmbedIndex !== -1 ? lastActiveGuiEmbedIndex : 0;
        if (jsonObject?.embeds[embedIndex]?.color) {
            hexInput.value = jsonObject.embeds[embedIndex].color.toString(16).padStart(6, '0');
            document.querySelector('.hex.incorrect')?.classList.remove('incorrect');
        }
        colors.classList.add('picking')
    })

    document.querySelectorAll('.color').forEach(e => e.addEventListener('click', el => {
        const embedIndex = multiEmbeds && lastActiveGuiEmbedIndex !== -1 ? lastActiveGuiEmbedIndex : 0;
        const embed = document.querySelectorAll('.msgEmbed .container>.embed')[embedIndex];
        const embedObj = jsonObject.embeds[embedIndex] ??= {};
        const color = el.target.closest('.color');

        embedObj.color = toRGB(color.style.backgroundColor, false, true);
        embed && (embed.style.borderColor = color.style.backgroundColor);
        picker.source.style.removeProperty('background');
    }))

    hexInput?.addEventListener('focus', () => typingHex = true);
    setTimeout(() => {
        picker.on?.('change', function (r, g, b, a) {
            const embedIndex = multiEmbeds && lastActiveGuiEmbedIndex !== -1 ? lastActiveGuiEmbedIndex : 0;
            const embed = document.querySelectorAll('.msgEmbed .container>.embed')[embedIndex];
            const embedObj = jsonObject.embeds[embedIndex];

            picker.source.style.background = this.color(r, g, b);
            embedObj.color = parseInt(this.color(r, g, b).slice(1), 16);
            embed.style.borderColor = this.color(r, g, b);
            hexInput.value = embedObj.color.toString(16).padStart(6, '0');
        })
    }, 1000)

    document.querySelector('.timeText').innerText = timestamp();

    for (const block of document.querySelectorAll('.markup pre > code'))
        hljs.highlightBlock(block);

    document.querySelector('.opt.gui').addEventListener('click', () => {
        if (lastGuiJson && lastGuiJson !== JSON.stringify(json, null, 4))
            buildGui();

        lastGuiJson = false
        activeFields = null;

        document.body.classList.add('gui');
        if (pickInGuiMode) {
            pickInGuiMode = false;
            togglePicker();
        }
    })

    document.querySelector('.opt.json').addEventListener('click', () => {
        const emptyEmbedIndex = indexOfEmptyGuiEmbed(false);
        if (emptyEmbedIndex !== -1)
            // Clicked GUI tab while a blank embed is added from GUI.
            return error(gui.querySelectorAll('.item.guiEmbedName')[emptyEmbedIndex].innerText.split(':')[0] + ' should not be empty.', '3s');

        const jsonStr = JSON.stringify(json, null, 4);
        lastGuiJson = jsonStr;

        document.body.classList.remove('gui');
        editor.setValue(jsonStr === '{}' ? '{\n\t\n}' : jsonStr);
        editor.refresh();
        editor.focus();

        activeFields = document.querySelectorAll('.gui > .item.active');
        if (document.querySelector('section.side1.low'))
            togglePicker(true);
    })

    document.querySelector('.clear').addEventListener('click', () => {
        json = {};

        picker.source.style.removeProperty('background');
        document.querySelector('.msgEmbed .container>.embed')?.remove();

        buildEmbed();
        buildGui();

        const jsonStr = JSON.stringify(json, null, 4);
        editor.setValue(jsonStr === '{}' ? '{\n\t\n}' : jsonStr);

        for (const e of document.querySelectorAll('.gui .item'))
            e.classList.add('active');

        if (!smallerScreen.matches)
            content.focus();
    })

    document.querySelector('.top-btn.menu')?.addEventListener('click', e => {
        if (e.target.closest('.item.dataLink')) {
            const data = encodeJson(json, true).replace(/(?<!data=[^=]+|=)=(&|$)/g, x => x === '=' ? '' : '&');
            if (!window.chrome)
                // With long text inside a 'prompt' on Chromium based browsers, some text will be trimmed off and replaced with '...'.
                return prompt('Here\'s the current URL with base64 embed data:', data);

            // So, for the Chromium users, we copy to clipboard instead of showing a prompt.
            try {
                // Clipboard API might only work on HTTPS protocol.
                navigator.clipboard.writeText(data);
            } catch {
                const input = document.body.appendChild(document.createElement('input'));
                input.value = data;
                input.select();
                document.setSelectionRange(0, 50000);
                document.execCommand('copy');
                document.body.removeChild(input);
            }

            return alert('Copied to clipboard.');
        }

        if (e.target.closest('.item.download'))
            return createElement({ a: { download: 'embed' + '.json', href: 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json, null, 4)) } }).click();

        const input = e.target.closest('.item')?.querySelector('input');
        if (input) input.checked = !input.checked;

        if (e.target.closest('.item.auto')) {
            autoUpdateURL = document.body.classList.toggle('autoUpdateURL');
            if (autoUpdateURL) localStorage.setItem('autoUpdateURL', true);
            else localStorage.removeItem('autoUpdateURL');
            urlOptions({ set: ['data', encodeJson(json)] });
        } else if (e.target.closest('.item.reverse')) {
            reverse(reverseColumns);
            reverseColumns = !reverseColumns;
            toggleStored('reverseColumns');
        } else if (e.target.closest('.item.noUser')) {
            if (options.avatar) document.querySelector('img.avatar').src = options.avatar;

            const noUser = document.body.classList.toggle('no-user');
            if (autoParams) noUser ? urlOptions({ set: ['nouser', ''] }) : urlOptions({ remove: 'nouser' });
            toggleStored('noUser');
        } else if (e.target.closest('.item.auto-params')) {
            if (input.checked) localStorage.setItem('autoParams', true);
            else localStorage.removeItem('autoParams');
            autoParams = input.checked;
        } else if (e.target.closest('.toggles>.item')) {
            const win = input.closest('.item').classList[2];

            if (input.checked) {
                document.body.classList.remove(`no-${win}`);
                localStorage.removeItem(`hide${win}`);
            } else {
                document.body.classList.add(`no-${win}`);
                localStorage.setItem(`hide${win}`, true);
            }
        } else if (e.target.closest('.item.multi') && !noMultiEmbedsOption) {
            multiEmbeds = !document.body.classList.toggle('single');
            activeFields = document.querySelectorAll('.gui > .item.active');

            if (autoParams) !multiEmbeds ? urlOptions({ set: ['single', ''] }) : urlOptions({ remove: 'single' });
            if (multiEmbeds) localStorage.setItem('multiEmbeds', true);
            else {
                localStorage.removeItem('multiEmbeds');
                jsonObject.embeds = [jsonObject.embeds?.[0] || {}];
            }

            buildGui();
            buildEmbed();
            editor.setValue(JSON.stringify(json, null, 4));
        }

        e.target.closest('.top-btn')?.classList.toggle('active')
    })

    document.querySelectorAll('.img').forEach(e => {
        if (e.nextElementSibling?.classList.contains('spinner-container'))
            e.addEventListener('error', el => {
                el.target.style.removeProperty('display');
                el.target.nextElementSibling.style.display = 'block';
            })
    })

    let pickInGuiMode = false;
    togglePicker = pickLater => {
        colors.classList.toggle('display');
        document.querySelector('.side1').classList.toggle('low');
        if (pickLater) pickInGuiMode = true;
    };

    document.querySelector('.pickerToggle').addEventListener('click', () => togglePicker());
    buildEmbed();

    document.body.addEventListener('click', e => {
        if (e.target.classList.contains('low') || (e.target.classList.contains('top') && colors.classList.contains('display')))
            togglePicker();
    })

    // #0070ff, #5865f2
    document.querySelector('.colors .hex>div')?.addEventListener('input', e => {
        let inputValue = e.target.value;

        if (inputValue.startsWith('#'))
            e.target.value = inputValue.slice(1), inputValue = e.target.value;
        if (inputValue.length !== 6 || !/^[a-zA-Z0-9]{6}$/g.test(inputValue))
            return e.target.closest('.hex').classList.add('incorrect');

        e.target.closest('.hex').classList.remove('incorrect');

        const embedIndex = multiEmbeds && lastActiveGuiEmbedIndex !== -1 ? lastActiveGuiEmbedIndex : 0;
        jsonObject.embeds[embedIndex].color = parseInt(inputValue, 16);
        picker.fire?.('change', toRGB(inputValue));

        buildEmbed();
    })

    if (onlyEmbed) document.querySelector('.side1')?.remove();

    const menuMore = document.querySelector('.item.section .inner.more');
    const menuSource = menuMore?.querySelector('.source');

    if (!sourceOption) menuSource.remove();
    if (menuMore.childElementCount < 2) menuMore?.classList.add('invisible');
    if (menuMore.parentElement.childElementCount < 1) menuMore?.parentElement.classList.add('invisible');

    document.querySelector('.top-btn.copy').addEventListener('click', e => {
        const mark = e.target.closest('.top-btn.copy').querySelector('.mark'),
            jsonData = JSON.stringify(json, null, 4),
            next = () => {
                mark?.classList.remove('hidden');
                mark?.previousElementSibling?.classList.add('hidden');

                setTimeout(() => {
                    mark?.classList.add('hidden');
                    mark?.previousElementSibling?.classList.remove('hidden');
                }, 1500);
            }

        if (!navigator.clipboard?.writeText(jsonData).then(next).catch(err => console.log('Could not copy to clipboard: ' + err.message))) {
            const textarea = document.body.appendChild(document.createElement('textarea'));

            textarea.value = jsonData;
            textarea.select();
            textarea.setSelectionRange(0, 50000);
            document.execCommand('copy');
            document.body.removeChild(textarea);
            next();
        }
    });
});

// Don't assign to 'jsonObject', assign to 'json' instead.
// 'jsonObject' is used to store the final json object and used internally.
// Below is the getter and setter for 'json' which formats the value properly into and out of 'jsonObject'.
Object.defineProperty(window, 'json', {
    configurable: true,
    // Getter to format 'jsonObject' properly depending on options and other factors
    // eg. using 'embeds' or 'embed' in output depending on 'multiEmbeds' option.
    get() {
        const json = {};

        if (jsonObject.content)
            json.content = jsonObject.content;

        // If 'jsonObject.embeds' array is set and has content. Empty braces ({}) will be filtered as not content.
        if (jsonObject.embeds?.length)
            if (multiEmbeds) json.embeds = jsonObject.embeds.map(cleanEmbed);
            else json.embed = cleanEmbed(jsonObject.embeds[0]);

        return json;
    },

    // Setter for 'json' which formats the value properly into 'jsonObject'.
    set(val) {
        // Filter out items which are not objects and not empty objects.
        const embedObjects = val.embeds?.filter(j => j.constructor === Object && 0 in Object.keys(j));
        // Convert 'embed' to 'embeds' and delete 'embed' or validate and use 'embeds' if provided.
        const embeds = val.embed ? [val.embed] : embedObjects?.length ? embedObjects : []
        // Convert objects used as values to string and trim whitespace.
        const content = val.content?.toString().trim();

        jsonObject = {
            ...(content && { content }),
            embeds: embeds.map(cleanEmbed),
        };

        buildEmbed();
        buildGui();
    },
});

// Props used to validate embed properties.
window.embedObjectsProps ??= {
    author: ["name", "url", "icon_url",],
    thumbnail: ["url", "proxy_url", "height", "width",],
    image: ["url", "proxy_url", "height", "width",],
    fields: { items: ["name", "value", "inline",], },
    footer: ["text", "icon_url",],
}

function cleanEmbed(obj, recursing = false) {
    if (!recursing)
        // Remove all invalid properties from embed object.
        for (const key in obj)
            if (!embedKeys.includes(key))
                delete obj[key];
            else if (obj[key].constructor === Object) // Value is an object. eg. 'author'
                // Remove items that are not in the props of the current key.
                for (const item in obj[key])
                    !embedObjectsProps[key].includes(item) && delete obj[key][item];

            else if (obj[key].constructor === Array) // Value is an array. eg. 'fields'
                // Remove items that are not in the props of the current key.
                for (const item of obj[key])
                    for (const i in item)
                        !embedObjectsProps[key].items.includes(i) && delete item[i];

    // Remove empty properties from embed object.
    for (const [key, val] of Object.entries(obj))
        if (val === undefined || val.trim?.() === "")
            // Remove the key if value is empty
            delete obj[key];
        else if (val.constructor === Object)
            // Remove object (val) if it has no keys or recursively remove empty keys from objects.
            (!Object.keys(val).length && delete obj[key]) || (obj[key] = cleanEmbed(val, true));
        else if (val.constructor === Array)
            // Remove array (val) if it has no keys or recursively remove empty keys from objects in array.
            !val.length && delete obj[key] || (obj[key] = val.map(k => cleanEmbed(k, true)));
        else
            // If object isn't a string, boolean, number, array or object, convert it to string.
            if (!['string', 'boolean', 'number'].includes(typeof val))
                obj[key] = val.toString();

    return obj;
}
