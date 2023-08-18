"use strict";
(self.webpackChunktravel_website = self.webpackChunktravel_website || []).push([
  [179],
  {
    149: () => {
      function re(e) {
        return "function" == typeof e;
      }
      function ni(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const yo = ni(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, i) => `${i + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function ri(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class ht {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const o of n) o.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (re(r))
              try {
                r();
              } catch (o) {
                t = o instanceof yo ? o.errors : [o];
              }
            const { _finalizers: i } = this;
            if (i) {
              this._finalizers = null;
              for (const o of i)
                try {
                  Ed(o);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof yo ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new yo(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) Ed(t);
            else {
              if (t instanceof ht) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && ri(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && ri(n, t), t instanceof ht && t._removeParent(this);
        }
      }
      ht.EMPTY = (() => {
        const e = new ht();
        return (e.closed = !0), e;
      })();
      const Cd = ht.EMPTY;
      function _d(e) {
        return (
          e instanceof ht ||
          (e && "closed" in e && re(e.remove) && re(e.add) && re(e.unsubscribe))
        );
      }
      function Ed(e) {
        re(e) ? e() : e.unsubscribe();
      }
      const Nn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        vo = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = vo;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = vo;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function bd(e) {
        vo.setTimeout(() => {
          const { onUnhandledError: t } = Nn;
          if (!t) throw e;
          t(e);
        });
      }
      function Id() {}
      const VD = ya("C", void 0, void 0);
      function ya(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let kn = null;
      function Do(e) {
        if (Nn.useDeprecatedSynchronousErrorHandling) {
          const t = !kn;
          if ((t && (kn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = kn;
            if (((kn = null), n)) throw r;
          }
        } else e();
      }
      class va extends ht {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), _d(t) && t.add(this))
              : (this.destination = WD);
        }
        static create(t, n, r) {
          return new ii(t, n, r);
        }
        next(t) {
          this.isStopped
            ? wa(
                (function BD(e) {
                  return ya("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? wa(
                (function $D(e) {
                  return ya("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? wa(VD, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const UD = Function.prototype.bind;
      function Da(e, t) {
        return UD.call(e, t);
      }
      class zD {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              wo(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              wo(r);
            }
          else wo(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              wo(n);
            }
        }
      }
      class ii extends va {
        constructor(t, n, r) {
          let i;
          if ((super(), re(t) || !t))
            i = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let o;
            this && Nn.useDeprecatedNextContext
              ? ((o = Object.create(t)),
                (o.unsubscribe = () => this.unsubscribe()),
                (i = {
                  next: t.next && Da(t.next, o),
                  error: t.error && Da(t.error, o),
                  complete: t.complete && Da(t.complete, o),
                }))
              : (i = t);
          }
          this.destination = new zD(i);
        }
      }
      function wo(e) {
        Nn.useDeprecatedSynchronousErrorHandling
          ? (function HD(e) {
              Nn.useDeprecatedSynchronousErrorHandling &&
                kn &&
                ((kn.errorThrown = !0), (kn.error = e));
            })(e)
          : bd(e);
      }
      function wa(e, t) {
        const { onStoppedNotification: n } = Nn;
        n && vo.setTimeout(() => n(e, t));
      }
      const WD = {
          closed: !0,
          next: Id,
          error: function GD(e) {
            throw e;
          },
          complete: Id,
        },
        Ca =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Pn(e) {
        return e;
      }
      function Sd(e) {
        return 0 === e.length
          ? Pn
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, i) => i(r), n);
            };
      }
      let _e = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, i) {
            const o = (function QD(e) {
              return (
                (e && e instanceof va) ||
                ((function ZD(e) {
                  return e && re(e.next) && re(e.error) && re(e.complete);
                })(e) &&
                  _d(e))
              );
            })(n)
              ? n
              : new ii(n, r, i);
            return (
              Do(() => {
                const { operator: s, source: a } = this;
                o.add(
                  s
                    ? s.call(o, a)
                    : a
                    ? this._subscribe(o)
                    : this._trySubscribe(o)
                );
              }),
              o
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = Md(r))((i, o) => {
              const s = new ii({
                next: (a) => {
                  try {
                    n(a);
                  } catch (l) {
                    o(l), s.unsubscribe();
                  }
                },
                error: o,
                complete: i,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [Ca]() {
            return this;
          }
          pipe(...n) {
            return Sd(n)(this);
          }
          toPromise(n) {
            return new (n = Md(n))((r, i) => {
              let o;
              this.subscribe(
                (s) => (o = s),
                (s) => i(s),
                () => r(o)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function Md(e) {
        var t;
        return null !== (t = e ?? Nn.Promise) && void 0 !== t ? t : Promise;
      }
      const KD = ni(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Lt = (() => {
        class e extends _e {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new Td(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new KD();
          }
          next(n) {
            Do(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            Do(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Do(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: i, observers: o } = this;
            return r || i
              ? Cd
              : ((this.currentObservers = null),
                o.push(n),
                new ht(() => {
                  (this.currentObservers = null), ri(o, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: i, isStopped: o } = this;
            r ? n.error(i) : o && n.complete();
          }
          asObservable() {
            const n = new _e();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new Td(t, n)), e;
      })();
      class Td extends Lt {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : Cd;
        }
      }
      function xd(e) {
        return re(e?.lift);
      }
      function Ae(e) {
        return (t) => {
          if (xd(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Re(e, t, n, r, i) {
        return new YD(e, t, n, r, i);
      }
      class YD extends va {
        constructor(t, n, r, i, o, s) {
          super(t),
            (this.onFinalize = o),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (l) {
                    t.error(l);
                  }
                }
              : super._next),
            (this._error = i
              ? function (a) {
                  try {
                    i(a);
                  } catch (l) {
                    t.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function K(e, t) {
        return Ae((n, r) => {
          let i = 0;
          n.subscribe(
            Re(r, (o) => {
              r.next(e.call(t, o, i++));
            })
          );
        });
      }
      function Fn(e) {
        return this instanceof Fn ? ((this.v = e), this) : new Fn(e);
      }
      function ew(e, t, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var i,
          r = n.apply(e, t || []),
          o = [];
        return (
          (i = {}),
          s("next"),
          s("throw"),
          s("return"),
          (i[Symbol.asyncIterator] = function () {
            return this;
          }),
          i
        );
        function s(h) {
          r[h] &&
            (i[h] = function (m) {
              return new Promise(function (y, v) {
                o.push([h, m, y, v]) > 1 || a(h, m);
              });
            });
        }
        function a(h, m) {
          try {
            !(function l(h) {
              h.value instanceof Fn
                ? Promise.resolve(h.value.v).then(u, c)
                : d(o[0][2], h);
            })(r[h](m));
          } catch (y) {
            d(o[0][3], y);
          }
        }
        function u(h) {
          a("next", h);
        }
        function c(h) {
          a("throw", h);
        }
        function d(h, m) {
          h(m), o.shift(), o.length && a(o[0][0], o[0][1]);
        }
      }
      function tw(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function Nd(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(o) {
          n[o] =
            e[o] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function i(o, s, a, l) {
                  Promise.resolve(l).then(function (u) {
                    o({ value: u, done: a });
                  }, s);
                })(a, l, (s = e[o](s)).done, s.value);
              });
            };
        }
      }
      const kd = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function Pd(e) {
        return re(e?.then);
      }
      function Fd(e) {
        return re(e[Ca]);
      }
      function Od(e) {
        return Symbol.asyncIterator && re(e?.[Symbol.asyncIterator]);
      }
      function Ld(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const jd = (function rw() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Vd(e) {
        return re(e?.[jd]);
      }
      function $d(e) {
        return ew(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: i } = yield Fn(n.read());
              if (i) return yield Fn(void 0);
              yield yield Fn(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Bd(e) {
        return re(e?.getReader);
      }
      function jt(e) {
        if (e instanceof _e) return e;
        if (null != e) {
          if (Fd(e))
            return (function iw(e) {
              return new _e((t) => {
                const n = e[Ca]();
                if (re(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (kd(e))
            return (function ow(e) {
              return new _e((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (Pd(e))
            return (function sw(e) {
              return new _e((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, bd);
              });
            })(e);
          if (Od(e)) return Hd(e);
          if (Vd(e))
            return (function aw(e) {
              return new _e((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (Bd(e))
            return (function lw(e) {
              return Hd($d(e));
            })(e);
        }
        throw Ld(e);
      }
      function Hd(e) {
        return new _e((t) => {
          (function uw(e, t) {
            var n, r, i, o;
            return (function JD(e, t, n, r) {
              return new (n || (n = Promise))(function (o, s) {
                function a(c) {
                  try {
                    u(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  try {
                    u(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  c.done
                    ? o(c.value)
                    : (function i(o) {
                        return o instanceof n
                          ? o
                          : new n(function (s) {
                              s(o);
                            });
                      })(c.value).then(a, l);
                }
                u((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = tw(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                i = { error: s };
              } finally {
                try {
                  r && !r.done && (o = n.return) && (yield o.call(n));
                } finally {
                  if (i) throw i.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function Zt(e, t, n, r = 0, i = !1) {
        const o = t.schedule(function () {
          n(), i ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(o), !i)) return o;
      }
      function ke(e, t, n = 1 / 0) {
        return re(t)
          ? ke((r, i) => K((o, s) => t(r, o, i, s))(jt(e(r, i))), n)
          : ("number" == typeof t && (n = t),
            Ae((r, i) =>
              (function cw(e, t, n, r, i, o, s, a) {
                const l = [];
                let u = 0,
                  c = 0,
                  d = !1;
                const h = () => {
                    d && !l.length && !u && t.complete();
                  },
                  m = (v) => (u < r ? y(v) : l.push(v)),
                  y = (v) => {
                    o && t.next(v), u++;
                    let D = !1;
                    jt(n(v, c++)).subscribe(
                      Re(
                        t,
                        (_) => {
                          i?.(_), o ? m(_) : t.next(_);
                        },
                        () => {
                          D = !0;
                        },
                        void 0,
                        () => {
                          if (D)
                            try {
                              for (u--; l.length && u < r; ) {
                                const _ = l.shift();
                                s ? Zt(t, s, () => y(_)) : y(_);
                              }
                              h();
                            } catch (_) {
                              t.error(_);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    Re(t, m, () => {
                      (d = !0), h();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, i, e, n)
            ));
      }
      function sr(e = 1 / 0) {
        return ke(Pn, e);
      }
      const Qt = new _e((e) => e.complete());
      function Ea(e) {
        return e[e.length - 1];
      }
      function oi(e) {
        return (function fw(e) {
          return e && re(e.schedule);
        })(Ea(e))
          ? e.pop()
          : void 0;
      }
      function Ud(e, t = 0) {
        return Ae((n, r) => {
          n.subscribe(
            Re(
              r,
              (i) => Zt(r, e, () => r.next(i), t),
              () => Zt(r, e, () => r.complete(), t),
              (i) => Zt(r, e, () => r.error(i), t)
            )
          );
        });
      }
      function zd(e, t = 0) {
        return Ae((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function Gd(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new _e((n) => {
          Zt(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            Zt(
              n,
              t,
              () => {
                r.next().then((i) => {
                  i.done ? n.complete() : n.next(i.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Ee(e, t) {
        return t
          ? (function ww(e, t) {
              if (null != e) {
                if (Fd(e))
                  return (function gw(e, t) {
                    return jt(e).pipe(zd(t), Ud(t));
                  })(e, t);
                if (kd(e))
                  return (function yw(e, t) {
                    return new _e((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (Pd(e))
                  return (function mw(e, t) {
                    return jt(e).pipe(zd(t), Ud(t));
                  })(e, t);
                if (Od(e)) return Gd(e, t);
                if (Vd(e))
                  return (function vw(e, t) {
                    return new _e((n) => {
                      let r;
                      return (
                        Zt(n, t, () => {
                          (r = e[jd]()),
                            Zt(
                              n,
                              t,
                              () => {
                                let i, o;
                                try {
                                  ({ value: i, done: o } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                o ? n.complete() : n.next(i);
                              },
                              0,
                              !0
                            );
                        }),
                        () => re(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (Bd(e))
                  return (function Dw(e, t) {
                    return Gd($d(e), t);
                  })(e, t);
              }
              throw Ld(e);
            })(e, t)
          : jt(e);
      }
      function ba(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new ii({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return t(...n).subscribe(r);
      }
      function te(e) {
        for (let t in e) if (e[t] === te) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function ne(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(ne).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function Sa(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const Ew = te({ __forward_ref__: te });
      function Ma(e) {
        return (
          (e.__forward_ref__ = Ma),
          (e.toString = function () {
            return ne(this());
          }),
          e
        );
      }
      function F(e) {
        return (function Ta(e) {
          return (
            "function" == typeof e &&
            e.hasOwnProperty(Ew) &&
            e.__forward_ref__ === Ma
          );
        })(e)
          ? e()
          : e;
      }
      class S extends Error {
        constructor(t, n) {
          super(
            (function Co(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function j(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function _o(e, t) {
        throw new S(-201, !1);
      }
      function ot(e, t) {
        null == e &&
          (function X(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function U(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function pt(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Eo(e) {
        return Wd(e, bo) || Wd(e, Zd);
      }
      function Wd(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function qd(e) {
        return e && (e.hasOwnProperty(xa) || e.hasOwnProperty(Nw))
          ? e[xa]
          : null;
      }
      const bo = te({ ɵprov: te }),
        xa = te({ ɵinj: te }),
        Zd = te({ ngInjectableDef: te }),
        Nw = te({ ngInjectorDef: te });
      var k = (() => (
        ((k = k || {})[(k.Default = 0)] = "Default"),
        (k[(k.Host = 1)] = "Host"),
        (k[(k.Self = 2)] = "Self"),
        (k[(k.SkipSelf = 4)] = "SkipSelf"),
        (k[(k.Optional = 8)] = "Optional"),
        k
      ))();
      let Aa;
      function gt(e) {
        const t = Aa;
        return (Aa = e), t;
      }
      function Qd(e, t, n) {
        const r = Eo(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & k.Optional
          ? null
          : void 0 !== t
          ? t
          : void _o(ne(e));
      }
      function gn(e) {
        return { toString: e }.toString();
      }
      var _t = (() => (
          ((_t = _t || {})[(_t.OnPush = 0)] = "OnPush"),
          (_t[(_t.Default = 1)] = "Default"),
          _t
        ))(),
        Vt = (() => {
          return (
            ((e = Vt || (Vt = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            Vt
          );
          var e;
        })();
      const ie = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        ar = {},
        J = [],
        Io = te({ ɵcmp: te }),
        Ra = te({ ɵdir: te }),
        Na = te({ ɵpipe: te }),
        Kd = te({ ɵmod: te }),
        Yt = te({ ɵfac: te }),
        si = te({ __NG_ELEMENT_ID__: te });
      let Pw = 0;
      function Ke(e) {
        return gn(() => {
          const n = !0 === e.standalone,
            r = {},
            i = {
              type: e.type,
              providersResolver: null,
              decls: e.decls,
              vars: e.vars,
              factory: null,
              template: e.template || null,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              hostBindings: e.hostBindings || null,
              hostVars: e.hostVars || 0,
              hostAttrs: e.hostAttrs || null,
              contentQueries: e.contentQueries || null,
              declaredInputs: r,
              inputs: null,
              outputs: null,
              exportAs: e.exportAs || null,
              onPush: e.changeDetection === _t.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              standalone: n,
              dependencies: (n && e.dependencies) || null,
              getStandaloneInjector: null,
              selectors: e.selectors || J,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || Vt.Emulated,
              id: "c" + Pw++,
              styles: e.styles || J,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
            },
            o = e.dependencies,
            s = e.features;
          return (
            (i.inputs = Xd(e.inputs, r)),
            (i.outputs = Xd(e.outputs)),
            s && s.forEach((a) => a(i)),
            (i.directiveDefs = o
              ? () => ("function" == typeof o ? o() : o).map(Yd).filter(Jd)
              : null),
            (i.pipeDefs = o
              ? () => ("function" == typeof o ? o() : o).map(Ue).filter(Jd)
              : null),
            i
          );
        });
      }
      function Yd(e) {
        return ee(e) || He(e);
      }
      function Jd(e) {
        return null !== e;
      }
      function Et(e) {
        return gn(() => ({
          type: e.type,
          bootstrap: e.bootstrap || J,
          declarations: e.declarations || J,
          imports: e.imports || J,
          exports: e.exports || J,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Xd(e, t) {
        if (null == e) return ar;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let i = e[r],
              o = i;
            Array.isArray(i) && ((o = i[1]), (i = i[0])),
              (n[i] = r),
              t && (t[i] = o);
          }
        return n;
      }
      const Oe = Ke;
      function ee(e) {
        return e[Io] || null;
      }
      function He(e) {
        return e[Ra] || null;
      }
      function Ue(e) {
        return e[Na] || null;
      }
      function st(e, t) {
        const n = e[Kd] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${ne(e)} does not have '\u0275mod' property.`);
        return n;
      }
      const B = 11;
      function Je(e) {
        return Array.isArray(e) && "object" == typeof e[1];
      }
      function It(e) {
        return Array.isArray(e) && !0 === e[1];
      }
      function Fa(e) {
        return 0 != (8 & e.flags);
      }
      function xo(e) {
        return 2 == (2 & e.flags);
      }
      function Ao(e) {
        return 1 == (1 & e.flags);
      }
      function St(e) {
        return null !== e.template;
      }
      function $w(e) {
        return 0 != (256 & e[2]);
      }
      function $n(e, t) {
        return e.hasOwnProperty(Yt) ? e[Yt] : null;
      }
      class Uw {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Bn() {
        return nf;
      }
      function nf(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = Gw), zw;
      }
      function zw() {
        const e = sf(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === ar) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function Gw(e, t, n, r) {
        const i =
            sf(e) ||
            (function Ww(e, t) {
              return (e[rf] = t);
            })(e, { previous: ar, current: null }),
          o = i.current || (i.current = {}),
          s = i.previous,
          a = this.declaredInputs[n],
          l = s[a];
        (o[a] = new Uw(l && l.currentValue, t, s === ar)), (e[r] = t);
      }
      Bn.ngInherit = !0;
      const rf = "__ngSimpleChanges__";
      function sf(e) {
        return e[rf] || null;
      }
      function ye(e) {
        for (; Array.isArray(e); ) e = e[0];
        return e;
      }
      function lt(e, t) {
        return ye(t[e.index]);
      }
      function $a(e, t) {
        return e.data[t];
      }
      function ut(e, t) {
        const n = t[e];
        return Je(n) ? n : n[0];
      }
      function No(e) {
        return 64 == (64 & e[2]);
      }
      function mn(e, t) {
        return null == t ? null : e[t];
      }
      function af(e) {
        e[18] = 0;
      }
      function Ba(e, t) {
        e[5] += t;
        let n = e,
          r = e[3];
        for (
          ;
          null !== r && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

        )
          (r[5] += t), (n = r), (r = r[3]);
      }
      const L = { lFrame: yf(null), bindingsEnabled: !0 };
      function uf() {
        return L.bindingsEnabled;
      }
      function C() {
        return L.lFrame.lView;
      }
      function Z() {
        return L.lFrame.tView;
      }
      function be() {
        let e = cf();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function cf() {
        return L.lFrame.currentTNode;
      }
      function $t(e, t) {
        const n = L.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function Ha() {
        return L.lFrame.isParent;
      }
      function hr() {
        return L.lFrame.bindingIndex++;
      }
      function c0(e, t) {
        const n = L.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), za(t);
      }
      function za(e) {
        L.lFrame.currentDirectiveIndex = e;
      }
      function Wa(e) {
        L.lFrame.currentQueryIndex = e;
      }
      function f0(e) {
        const t = e[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null;
      }
      function gf(e, t, n) {
        if (n & k.SkipSelf) {
          let i = t,
            o = e;
          for (
            ;
            !((i = i.parent),
            null !== i ||
              n & k.Host ||
              ((i = f0(o)), null === i || ((o = o[15]), 10 & i.type)));

          );
          if (null === i) return !1;
          (t = i), (e = o);
        }
        const r = (L.lFrame = mf());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function qa(e) {
        const t = mf(),
          n = e[1];
        (L.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function mf() {
        const e = L.lFrame,
          t = null === e ? null : e.child;
        return null === t ? yf(e) : t;
      }
      function yf(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function vf() {
        const e = L.lFrame;
        return (
          (L.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Df = vf;
      function Za() {
        const e = vf();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Ge() {
        return L.lFrame.selectedIndex;
      }
      function yn(e) {
        L.lFrame.selectedIndex = e;
      }
      function ue() {
        const e = L.lFrame;
        return $a(e.tView, e.selectedIndex);
      }
      function ce() {
        L.lFrame.currentNamespace = "svg";
      }
      function Ie() {
        !(function m0() {
          L.lFrame.currentNamespace = null;
        })();
      }
      function ko(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const o = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: u,
              ngOnDestroy: c,
            } = o;
          s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
            l && (e.viewHooks || (e.viewHooks = [])).push(-n, l),
            u &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, u),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, u)),
            null != c && (e.destroyHooks || (e.destroyHooks = [])).push(n, c);
        }
      }
      function Po(e, t, n) {
        wf(e, t, 3, n);
      }
      function Fo(e, t, n, r) {
        (3 & e[2]) === n && wf(e, t, n, r);
      }
      function Qa(e, t) {
        let n = e[2];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n));
      }
      function wf(e, t, n, r) {
        const o = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let l = void 0 !== r ? 65535 & e[18] : 0; l < s; l++)
          if ("number" == typeof t[l + 1]) {
            if (((a = t[l]), null != r && a >= r)) break;
          } else
            t[l] < 0 && (e[18] += 65536),
              (a < o || -1 == o) &&
                (D0(e, n, t, l), (e[18] = (4294901760 & e[18]) + l + 2)),
              l++;
      }
      function D0(e, t, n, r) {
        const i = n[r] < 0,
          o = n[r + 1],
          a = e[i ? -n[r] : n[r]];
        if (i) {
          if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
            e[2] += 2048;
            try {
              o.call(a);
            } finally {
            }
          }
        } else
          try {
            o.call(a);
          } finally {
          }
      }
      class fi {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Oo(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const i = n[r];
          if ("number" == typeof i) {
            if (0 !== i) break;
            r++;
            const o = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, o);
          } else {
            const o = i,
              s = n[++r];
            _f(o) ? e.setProperty(t, o, s) : e.setAttribute(t, o, s), r++;
          }
        }
        return r;
      }
      function Cf(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function _f(e) {
        return 64 === e.charCodeAt(0);
      }
      function Lo(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const i = t[r];
              "number" == typeof i
                ? (n = i)
                : 0 === n ||
                  Ef(e, n, i, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Ef(e, t, n, r, i) {
        let o = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; o < e.length; ) {
            const a = e[o++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = o - 1;
                break;
              }
            }
          }
        for (; o < e.length; ) {
          const a = e[o];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== i && (e[o + 1] = i));
            if (r === e[o + 1]) return void (e[o + 2] = i);
          }
          o++, null !== r && o++, null !== i && o++;
        }
        -1 !== s && (e.splice(s, 0, t), (o = s + 1)),
          e.splice(o++, 0, n),
          null !== r && e.splice(o++, 0, r),
          null !== i && e.splice(o++, 0, i);
      }
      function bf(e) {
        return -1 !== e;
      }
      function pr(e) {
        return 32767 & e;
      }
      function gr(e, t) {
        let n = (function b0(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let Ya = !0;
      function jo(e) {
        const t = Ya;
        return (Ya = e), t;
      }
      let I0 = 0;
      const Bt = {};
      function pi(e, t) {
        const n = Xa(e, t);
        if (-1 !== n) return n;
        const r = t[1];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Ja(r.data, e),
          Ja(t, null),
          Ja(r.blueprint, null));
        const i = Vo(e, t),
          o = e.injectorIndex;
        if (bf(i)) {
          const s = pr(i),
            a = gr(i, t),
            l = a[1].data;
          for (let u = 0; u < 8; u++) t[o + u] = a[s + u] | l[s + u];
        }
        return (t[o + 8] = i), o;
      }
      function Ja(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Xa(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Vo(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          i = t;
        for (; null !== i; ) {
          if (((r = kf(i)), null === r)) return -1;
          if ((n++, (i = i[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return -1;
      }
      function $o(e, t, n) {
        !(function S0(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(si) && (r = n[si]),
            null == r && (r = n[si] = I0++);
          const i = 255 & r;
          t.data[e + (i >> 5)] |= 1 << i;
        })(e, t, n);
      }
      function Mf(e, t, n) {
        if (n & k.Optional || void 0 !== e) return e;
        _o();
      }
      function Tf(e, t, n, r) {
        if (
          (n & k.Optional && void 0 === r && (r = null),
          0 == (n & (k.Self | k.Host)))
        ) {
          const i = e[9],
            o = gt(void 0);
          try {
            return i ? i.get(t, r, n & k.Optional) : Qd(t, r, n & k.Optional);
          } finally {
            gt(o);
          }
        }
        return Mf(r, 0, n);
      }
      function xf(e, t, n, r = k.Default, i) {
        if (null !== e) {
          if (1024 & t[2]) {
            const s = (function N0(e, t, n, r, i) {
              let o = e,
                s = t;
              for (
                ;
                null !== o && null !== s && 1024 & s[2] && !(256 & s[2]);

              ) {
                const a = Af(o, s, n, r | k.Self, Bt);
                if (a !== Bt) return a;
                let l = o.parent;
                if (!l) {
                  const u = s[21];
                  if (u) {
                    const c = u.get(n, Bt, r);
                    if (c !== Bt) return c;
                  }
                  (l = kf(s)), (s = s[15]);
                }
                o = l;
              }
              return i;
            })(e, t, n, r, Bt);
            if (s !== Bt) return s;
          }
          const o = Af(e, t, n, r, Bt);
          if (o !== Bt) return o;
        }
        return Tf(t, n, r, i);
      }
      function Af(e, t, n, r, i) {
        const o = (function x0(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(si) ? e[si] : void 0;
          return "number" == typeof t ? (t >= 0 ? 255 & t : A0) : t;
        })(n);
        if ("function" == typeof o) {
          if (!gf(t, e, r)) return r & k.Host ? Mf(i, 0, r) : Tf(t, n, r, i);
          try {
            const s = o(r);
            if (null != s || r & k.Optional) return s;
            _o();
          } finally {
            Df();
          }
        } else if ("number" == typeof o) {
          let s = null,
            a = Xa(e, t),
            l = -1,
            u = r & k.Host ? t[16][6] : null;
          for (
            (-1 === a || r & k.SkipSelf) &&
            ((l = -1 === a ? Vo(e, t) : t[a + 8]),
            -1 !== l && Nf(r, !1)
              ? ((s = t[1]), (a = pr(l)), (t = gr(l, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[1];
            if (Rf(o, a, c.data)) {
              const d = T0(a, t, n, s, r, u);
              if (d !== Bt) return d;
            }
            (l = t[a + 8]),
              -1 !== l && Nf(r, t[1].data[a + 8] === u) && Rf(o, a, t)
                ? ((s = c), (a = pr(l)), (t = gr(l, t)))
                : (a = -1);
          }
        }
        return i;
      }
      function T0(e, t, n, r, i, o) {
        const s = t[1],
          a = s.data[e + 8],
          c = (function Bo(e, t, n, r, i) {
            const o = e.providerIndexes,
              s = t.data,
              a = 1048575 & o,
              l = e.directiveStart,
              c = o >> 20,
              h = i ? a + c : e.directiveEnd;
            for (let m = r ? a : a + c; m < h; m++) {
              const y = s[m];
              if ((m < l && n === y) || (m >= l && y.type === n)) return m;
            }
            if (i) {
              const m = s[l];
              if (m && St(m) && m.type === n) return l;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? xo(a) && Ya : r != s && 0 != (3 & a.type),
            i & k.Host && o === a
          );
        return null !== c ? gi(t, s, c, a) : Bt;
      }
      function gi(e, t, n, r) {
        let i = e[n];
        const o = t.data;
        if (
          (function w0(e) {
            return e instanceof fi;
          })(i)
        ) {
          const s = i;
          s.resolving &&
            (function bw(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new S(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function Y(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : j(e);
              })(o[n])
            );
          const a = jo(s.canSeeViewProviders);
          s.resolving = !0;
          const l = s.injectImpl ? gt(s.injectImpl) : null;
          gf(e, r, k.Default);
          try {
            (i = e[n] = s.factory(void 0, o, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function v0(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: i,
                    ngDoCheck: o,
                  } = t.type.prototype;
                  if (r) {
                    const s = nf(t);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  i &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, i),
                    o &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, o),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, o));
                })(n, o[n], t);
          } finally {
            null !== l && gt(l), jo(a), (s.resolving = !1), Df();
          }
        }
        return i;
      }
      function Rf(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e));
      }
      function Nf(e, t) {
        return !(e & k.Self || (e & k.Host && t));
      }
      class mr {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return xf(this._tNode, this._lView, t, r, n);
        }
      }
      function A0() {
        return new mr(be(), C());
      }
      function kf(e) {
        const t = e[1],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[6] : null;
      }
      const vr = "__parameters__";
      function wr(e, t, n) {
        return gn(() => {
          const r = (function tl(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const i in r) this[i] = r[i];
              }
            };
          })(t);
          function i(...o) {
            if (this instanceof i) return r.apply(this, o), this;
            const s = new i(...o);
            return (a.annotation = s), a;
            function a(l, u, c) {
              const d = l.hasOwnProperty(vr)
                ? l[vr]
                : Object.defineProperty(l, vr, { value: [] })[vr];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), l;
            }
          }
          return (
            n && (i.prototype = Object.create(n.prototype)),
            (i.prototype.ngMetadataName = e),
            (i.annotationCls = i),
            i
          );
        });
      }
      class O {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = U({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function en(e, t) {
        e.forEach((n) => (Array.isArray(n) ? en(n, t) : t(n)));
      }
      function Ff(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Ho(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      const wi = {},
        ol = "__NG_DI_FLAG__",
        zo = "ngTempTokenPath",
        z0 = /\n/gm,
        Vf = "__source";
      let Ci;
      function _r(e) {
        const t = Ci;
        return (Ci = e), t;
      }
      function W0(e, t = k.Default) {
        if (void 0 === Ci) throw new S(-203, !1);
        return null === Ci
          ? Qd(e, void 0, t)
          : Ci.get(e, t & k.Optional ? null : void 0, t);
      }
      function R(e, t = k.Default) {
        return (
          (function kw() {
            return Aa;
          })() || W0
        )(F(e), t);
      }
      function pe(e, t = k.Default) {
        return (
          "number" != typeof t &&
            (t =
              0 |
              (t.optional && 8) |
              (t.host && 1) |
              (t.self && 2) |
              (t.skipSelf && 4)),
          R(e, t)
        );
      }
      function sl(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = F(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new S(900, !1);
            let i,
              o = k.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                l = q0(a);
              "number" == typeof l
                ? -1 === l
                  ? (i = a.token)
                  : (o |= l)
                : (i = a);
            }
            t.push(R(i, o));
          } else t.push(R(r));
        }
        return t;
      }
      function _i(e, t) {
        return (e[ol] = t), (e.prototype[ol] = t), e;
      }
      function q0(e) {
        return e[ol];
      }
      const Ei = _i(wr("Optional"), 8),
        bi = _i(wr("SkipSelf"), 4);
      var Xe = (() => (
        ((Xe = Xe || {})[(Xe.Important = 1)] = "Important"),
        (Xe[(Xe.DashCase = 2)] = "DashCase"),
        Xe
      ))();
      const dl = new Map();
      let dC = 0;
      const hl = "__ngContext__";
      function Ve(e, t) {
        Je(t)
          ? ((e[hl] = t[20]),
            (function hC(e) {
              dl.set(e[20], e);
            })(t))
          : (e[hl] = t);
      }
      function gl(e, t) {
        return undefined(e, t);
      }
      function Ti(e) {
        const t = e[3];
        return It(t) ? t[3] : t;
      }
      function ml(e) {
        return sh(e[13]);
      }
      function yl(e) {
        return sh(e[4]);
      }
      function sh(e) {
        for (; null !== e && !It(e); ) e = e[4];
        return e;
      }
      function br(e, t, n, r, i) {
        if (null != r) {
          let o,
            s = !1;
          It(r) ? (o = r) : Je(r) && ((s = !0), (r = r[0]));
          const a = ye(r);
          0 === e && null !== n
            ? null == i
              ? fh(t, n, a)
              : Hn(t, n, a, i || null, !0)
            : 1 === e && null !== n
            ? Hn(t, n, a, i || null, !0)
            : 2 === e
            ? (function bl(e, t, n) {
                const r = qo(e, t);
                r &&
                  (function FC(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != o &&
              (function jC(e, t, n, r, i) {
                const o = n[7];
                o !== ye(n) && br(t, e, r, o, i);
                for (let a = 10; a < n.length; a++) {
                  const l = n[a];
                  xi(l[1], l, e, t, r, o);
                }
              })(t, e, o, n, i);
        }
      }
      function Dl(e, t, n) {
        return e.createElement(t, n);
      }
      function lh(e, t) {
        const n = e[9],
          r = n.indexOf(t),
          i = t[3];
        512 & t[2] && ((t[2] &= -513), Ba(i, -1)), n.splice(r, 1);
      }
      function wl(e, t) {
        if (e.length <= 10) return;
        const n = 10 + t,
          r = e[n];
        if (r) {
          const i = r[17];
          null !== i && i !== e && lh(i, r), t > 0 && (e[n - 1][4] = r[4]);
          const o = Ho(e, 10 + t);
          !(function MC(e, t) {
            xi(e, t, t[B], 2, null, null), (t[0] = null), (t[6] = null);
          })(r[1], r);
          const s = o[19];
          null !== s && s.detachView(o[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -65);
        }
        return r;
      }
      function uh(e, t) {
        if (!(128 & t[2])) {
          const n = t[B];
          n.destroyNode && xi(e, t, n, 3, null, null),
            (function AC(e) {
              let t = e[13];
              if (!t) return Cl(e[1], e);
              for (; t; ) {
                let n = null;
                if (Je(t)) n = t[13];
                else {
                  const r = t[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    Je(t) && Cl(t[1], t), (t = t[3]);
                  null === t && (t = e), Je(t) && Cl(t[1], t), (n = t && t[4]);
                }
                t = n;
              }
            })(t);
        }
      }
      function Cl(e, t) {
        if (!(128 & t[2])) {
          (t[2] &= -65),
            (t[2] |= 128),
            (function PC(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const i = t[n[r]];
                  if (!(i instanceof fi)) {
                    const o = n[r + 1];
                    if (Array.isArray(o))
                      for (let s = 0; s < o.length; s += 2) {
                        const a = i[o[s]],
                          l = o[s + 1];
                        try {
                          l.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        o.call(i);
                      } finally {
                      }
                  }
                }
            })(e, t),
            (function kC(e, t) {
              const n = e.cleanup,
                r = t[7];
              let i = -1;
              if (null !== n)
                for (let o = 0; o < n.length - 1; o += 2)
                  if ("string" == typeof n[o]) {
                    const s = n[o + 1],
                      a = "function" == typeof s ? s(t) : ye(t[s]),
                      l = r[(i = n[o + 2])],
                      u = n[o + 3];
                    "boolean" == typeof u
                      ? a.removeEventListener(n[o], l, u)
                      : u >= 0
                      ? r[(i = u)]()
                      : r[(i = -u)].unsubscribe(),
                      (o += 2);
                  } else {
                    const s = r[(i = n[o + 1])];
                    n[o].call(s);
                  }
              if (null !== r) {
                for (let o = i + 1; o < r.length; o++) (0, r[o])();
                t[7] = null;
              }
            })(e, t),
            1 === t[1].type && t[B].destroy();
          const n = t[17];
          if (null !== n && It(t[3])) {
            n !== t[3] && lh(n, t);
            const r = t[19];
            null !== r && r.detachView(e);
          }
          !(function pC(e) {
            dl.delete(e[20]);
          })(t);
        }
      }
      function ch(e, t, n) {
        return (function dh(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const i = e.data[r.directiveStart].encapsulation;
            if (i === Vt.None || i === Vt.Emulated) return null;
          }
          return lt(r, n);
        })(e, t.parent, n);
      }
      function Hn(e, t, n, r, i) {
        e.insertBefore(t, n, r, i);
      }
      function fh(e, t, n) {
        e.appendChild(t, n);
      }
      function hh(e, t, n, r, i) {
        null !== r ? Hn(e, t, n, r, i) : fh(e, t, n);
      }
      function qo(e, t) {
        return e.parentNode(t);
      }
      let Tl,
        mh = function gh(e, t, n) {
          return 40 & e.type ? lt(e, n) : null;
        };
      function Zo(e, t, n, r) {
        const i = ch(e, r, t),
          o = t[B],
          a = (function ph(e, t, n) {
            return mh(e, t, n);
          })(r.parent || t[6], r, t);
        if (null != i)
          if (Array.isArray(n))
            for (let l = 0; l < n.length; l++) hh(o, i, n[l], a, !1);
          else hh(o, i, n, a, !1);
      }
      function Qo(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return lt(t, e);
          if (4 & n) return El(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Qo(e, r);
            {
              const i = e[t.index];
              return It(i) ? El(-1, i) : ye(i);
            }
          }
          if (32 & n) return gl(t, e)() || ye(e[t.index]);
          {
            const r = vh(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Qo(Ti(e[16]), r)
              : Qo(e, t.next);
          }
        }
        return null;
      }
      function vh(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null;
      }
      function El(e, t) {
        const n = 10 + e + 1;
        if (n < t.length) {
          const r = t[n],
            i = r[1].firstChild;
          if (null !== i) return Qo(r, i);
        }
        return t[7];
      }
      function Il(e, t, n, r, i, o, s) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          if (
            (s && 0 === t && (a && Ve(ye(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & l) Il(e, t, n.child, r, i, o, !1), br(t, e, i, a, o);
            else if (32 & l) {
              const u = gl(n, r);
              let c;
              for (; (c = u()); ) br(t, e, i, c, o);
              br(t, e, i, a, o);
            } else 16 & l ? Dh(e, t, r, n, i, o) : br(t, e, i, a, o);
          n = s ? n.projectionNext : n.next;
        }
      }
      function xi(e, t, n, r, i, o) {
        Il(n, r, e.firstChild, t, i, o, !1);
      }
      function Dh(e, t, n, r, i, o) {
        const s = n[16],
          l = s[6].projection[r.projection];
        if (Array.isArray(l))
          for (let u = 0; u < l.length; u++) br(t, e, i, l[u], o);
        else Il(e, t, l, s[3], i, o, !0);
      }
      function wh(e, t, n) {
        e.setAttribute(t, "style", n);
      }
      function Sl(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      class Ih {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      const XC =
        /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
      var ve = (() => (
        ((ve = ve || {})[(ve.NONE = 0)] = "NONE"),
        (ve[(ve.HTML = 1)] = "HTML"),
        (ve[(ve.STYLE = 2)] = "STYLE"),
        (ve[(ve.SCRIPT = 3)] = "SCRIPT"),
        (ve[(ve.URL = 4)] = "URL"),
        (ve[(ve.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        ve
      ))();
      function nn(e) {
        const t = (function Ni() {
          const e = C();
          return e && e[12];
        })();
        return t
          ? t.sanitize(ve.URL, e) || ""
          : (function Ai(e, t) {
              const n = (function QC(e) {
                return (e instanceof Ih && e.getTypeName()) || null;
              })(e);
              if (null != n && n !== t) {
                if ("ResourceURL" === n && "URL" === t) return !0;
                throw new Error(
                  `Required a safe ${t}, got a ${n} (see https://g.co/ng/security#xss)`
                );
              }
              return n === t;
            })(e, "URL")
          ? (function Dn(e) {
              return e instanceof Ih
                ? e.changingThisBreaksApplicationSecurity
                : e;
            })(e)
          : (function Al(e) {
              return (e = String(e)).match(XC) ? e : "unsafe:" + e;
            })(j(e));
      }
      const Pl = new O("ENVIRONMENT_INITIALIZER"),
        kh = new O("INJECTOR", -1),
        Ph = new O("INJECTOR_DEF_TYPES");
      class Fh {
        get(t, n = wi) {
          if (n === wi) {
            const r = new Error(`NullInjectorError: No provider for ${ne(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function h_(...e) {
        return { ɵproviders: Oh(0, e) };
      }
      function Oh(e, ...t) {
        const n = [],
          r = new Set();
        let i;
        return (
          en(t, (o) => {
            const s = o;
            Fl(s, n, [], r) && (i || (i = []), i.push(s));
          }),
          void 0 !== i && Lh(i, n),
          n
        );
      }
      function Lh(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: i } = e[n];
          en(i, (o) => {
            t.push(o);
          });
        }
      }
      function Fl(e, t, n, r) {
        if (!(e = F(e))) return !1;
        let i = null,
          o = qd(e);
        const s = !o && ee(e);
        if (o || s) {
          if (s && !s.standalone) return !1;
          i = e;
        } else {
          const l = e.ngModule;
          if (((o = qd(l)), !o)) return !1;
          i = l;
        }
        const a = r.has(i);
        if (s) {
          if (a) return !1;
          if ((r.add(i), s.dependencies)) {
            const l =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const u of l) Fl(u, t, n, r);
          }
        } else {
          if (!o) return !1;
          {
            if (null != o.imports && !a) {
              let u;
              r.add(i);
              try {
                en(o.imports, (c) => {
                  Fl(c, t, n, r) && (u || (u = []), u.push(c));
                });
              } finally {
              }
              void 0 !== u && Lh(u, t);
            }
            if (!a) {
              const u = $n(i) || (() => new i());
              t.push(
                { provide: i, useFactory: u, deps: J },
                { provide: Ph, useValue: i, multi: !0 },
                { provide: Pl, useValue: () => R(i), multi: !0 }
              );
            }
            const l = o.providers;
            null == l ||
              a ||
              en(l, (c) => {
                t.push(c);
              });
          }
        }
        return i !== e && void 0 !== e.providers;
      }
      const p_ = te({ provide: String, useValue: te });
      function Ol(e) {
        return null !== e && "object" == typeof e && p_ in e;
      }
      function zn(e) {
        return "function" == typeof e;
      }
      const Ll = new O("Set Injector scope."),
        Xo = {},
        m_ = {};
      let jl;
      function es() {
        return void 0 === jl && (jl = new Fh()), jl;
      }
      class wn {}
      class $h extends wn {
        constructor(t, n, r, i) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = i),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            $l(t, (s) => this.processProvider(s)),
            this.records.set(kh, Ir(void 0, this)),
            i.has("environment") && this.records.set(wn, Ir(void 0, this));
          const o = this.records.get(Ll);
          null != o && "string" == typeof o.value && this.scopes.add(o.value),
            (this.injectorDefTypes = new Set(this.get(Ph.multi, J, k.Self)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = _r(this),
            r = gt(void 0);
          try {
            return t();
          } finally {
            _r(n), gt(r);
          }
        }
        get(t, n = wi, r = k.Default) {
          this.assertNotDestroyed();
          const i = _r(this),
            o = gt(void 0);
          try {
            if (!(r & k.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const l =
                  (function C_(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof O)
                    );
                  })(t) && Eo(t);
                (a = l && this.injectableDefInScope(l) ? Ir(Vl(t), Xo) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & k.Self ? es() : this.parent).get(
              t,
              (n = r & k.Optional && n === wi ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[zo] = s[zo] || []).unshift(ne(t)), i)) throw s;
              return (function Z0(e, t, n, r) {
                const i = e[zo];
                throw (
                  (t[Vf] && i.unshift(t[Vf]),
                  (e.message = (function Q0(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let i = ne(t);
                    if (Array.isArray(t)) i = t.map(ne).join(" -> ");
                    else if ("object" == typeof t) {
                      let o = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          o.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : ne(a))
                          );
                        }
                      i = `{${o.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${i}]: ${e.replace(
                      z0,
                      "\n  "
                    )}`;
                  })("\n" + e.message, i, n, r)),
                  (e.ngTokenPath = i),
                  (e[zo] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            gt(o), _r(i);
          }
        }
        resolveInjectorInitializers() {
          const t = _r(this),
            n = gt(void 0);
          try {
            const r = this.get(Pl.multi, J, k.Self);
            for (const i of r) i();
          } finally {
            _r(t), gt(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(ne(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new S(205, !1);
        }
        processProvider(t) {
          let n = zn((t = F(t))) ? t : F(t && t.provide);
          const r = (function v_(e) {
            return Ol(e)
              ? Ir(void 0, e.useValue)
              : Ir(
                  (function Bh(e, t, n) {
                    let r;
                    if (zn(e)) {
                      const i = F(e);
                      return $n(i) || Vl(i);
                    }
                    if (Ol(e)) r = () => F(e.useValue);
                    else if (
                      (function Vh(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...sl(e.deps || []));
                    else if (
                      (function jh(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => R(F(e.useExisting));
                    else {
                      const i = F(e && (e.useClass || e.provide));
                      if (
                        !(function D_(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return $n(i) || Vl(i);
                      r = () => new i(...sl(e.deps));
                    }
                    return r;
                  })(e),
                  Xo
                );
          })(t);
          if (zn(t) || !0 !== t.multi) this.records.get(n);
          else {
            let i = this.records.get(n);
            i ||
              ((i = Ir(void 0, Xo, !0)),
              (i.factory = () => sl(i.multi)),
              this.records.set(n, i)),
              (n = t),
              i.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === Xo && ((n.value = m_), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function w_(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = F(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function Vl(e) {
        const t = Eo(e),
          n = null !== t ? t.factory : $n(e);
        if (null !== n) return n;
        if (e instanceof O) throw new S(204, !1);
        if (e instanceof Function)
          return (function y_(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function Di(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new S(204, !1))
              );
            const n = (function Aw(e) {
              const t = e && (e[bo] || e[Zd]);
              if (t) {
                const n = (function Rw(e) {
                  if (e.hasOwnProperty("name")) return e.name;
                  const t = ("" + e).match(/^function\s*([^\s(]+)/);
                  return null === t ? "" : t[1];
                })(e);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  t
                );
              }
              return null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new S(204, !1);
      }
      function Ir(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function __(e) {
        return !!e.ɵproviders;
      }
      function $l(e, t) {
        for (const n of e)
          Array.isArray(n) ? $l(n, t) : __(n) ? $l(n.ɵproviders, t) : t(n);
      }
      class Hh {}
      class I_ {
        resolveComponentFactory(t) {
          throw (function b_(e) {
            const t = Error(
              `No component factory found for ${ne(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let ki = (() => {
        class e {}
        return (e.NULL = new I_()), e;
      })();
      function S_() {
        return Sr(be(), C());
      }
      function Sr(e, t) {
        return new Cn(lt(e, t));
      }
      let Cn = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = S_), e;
      })();
      class zh {}
      let x_ = (() => {
        class e {}
        return (
          (e.ɵprov = U({ token: e, providedIn: "root", factory: () => null })),
          e
        );
      })();
      class ns {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const A_ = new ns("14.3.0"),
        Bl = {};
      function Ul(e) {
        return e.ngOriginalError;
      }
      class Mr {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && Ul(t);
          for (; n && Ul(n); ) n = Ul(n);
          return n || null;
        }
      }
      function rn(e) {
        return e instanceof Function ? e() : e;
      }
      function Wh(e, t, n) {
        let r = e.length;
        for (;;) {
          const i = e.indexOf(t, n);
          if (-1 === i) return i;
          if (0 === i || e.charCodeAt(i - 1) <= 32) {
            const o = t.length;
            if (i + o === r || e.charCodeAt(i + o) <= 32) return i;
          }
          n = i + 1;
        }
      }
      const qh = "ng-template";
      function B_(e, t, n) {
        let r = 0;
        for (; r < e.length; ) {
          let i = e[r++];
          if (n && "class" === i) {
            if (((i = e[r]), -1 !== Wh(i.toLowerCase(), t, 0))) return !0;
          } else if (1 === i) {
            for (; r < e.length && "string" == typeof (i = e[r++]); )
              if (i.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function Zh(e) {
        return 4 === e.type && e.value !== qh;
      }
      function H_(e, t, n) {
        return t === (4 !== e.type || n ? e.value : qh);
      }
      function U_(e, t, n) {
        let r = 4;
        const i = e.attrs || [],
          o = (function W_(e) {
            for (let t = 0; t < e.length; t++) if (Cf(e[t])) return t;
            return e.length;
          })(i);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const l = t[a];
          if ("number" != typeof l) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !H_(e, l, n)) || ("" === l && 1 === t.length))
                ) {
                  if (Mt(r)) return !1;
                  s = !0;
                }
              } else {
                const u = 8 & r ? l : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!B_(e.attrs, u, n)) {
                    if (Mt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = z_(8 & r ? "class" : l, i, Zh(e), n);
                if (-1 === d) {
                  if (Mt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== u) {
                  let h;
                  h = d > o ? "" : i[d + 1].toLowerCase();
                  const m = 8 & r ? h : null;
                  if ((m && -1 !== Wh(m, u, 0)) || (2 & r && u !== h)) {
                    if (Mt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !Mt(r) && !Mt(l)) return !1;
            if (s && Mt(l)) continue;
            (s = !1), (r = l | (1 & r));
          }
        }
        return Mt(r) || s;
      }
      function Mt(e) {
        return 0 == (1 & e);
      }
      function z_(e, t, n, r) {
        if (null === t) return -1;
        let i = 0;
        if (r || !n) {
          let o = !1;
          for (; i < t.length; ) {
            const s = t[i];
            if (s === e) return i;
            if (3 === s || 6 === s) o = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++i];
                for (; "string" == typeof a; ) a = t[++i];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                i += 4;
                continue;
              }
            }
            i += o ? 1 : 2;
          }
          return -1;
        }
        return (function q_(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Qh(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (U_(e, t[r], n)) return !0;
        return !1;
      }
      function Kh(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function Q_(e) {
        let t = e[0],
          n = 1,
          r = 2,
          i = "",
          o = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              i += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (i += "." + s) : 4 & r && (i += " " + s);
          else
            "" !== i && !Mt(s) && ((t += Kh(o, i)), (i = "")),
              (r = s),
              (o = o || !Mt(r));
          n++;
        }
        return "" !== i && (t += Kh(o, i)), t;
      }
      const V = {};
      function W(e) {
        Yh(Z(), C(), Ge() + e, !1);
      }
      function Yh(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[2])) {
            const o = e.preOrderCheckHooks;
            null !== o && Po(t, o, n);
          } else {
            const o = e.preOrderHooks;
            null !== o && Fo(t, o, 0, n);
          }
        yn(n);
      }
      function tp(e, t = null, n = null, r) {
        const i = np(e, t, n, r);
        return i.resolveInjectorInitializers(), i;
      }
      function np(e, t = null, n = null, r, i = new Set()) {
        const o = [n || J, h_(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : ne(e))),
          new $h(o, t || es(), r || null, i)
        );
      }
      let Tt = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return tp({ name: "" }, r, n, "");
            {
              const i = n.name ?? "";
              return tp({ name: i }, n.parent, n.providers, i);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = wi),
          (e.NULL = new Fh()),
          (e.ɵprov = U({ token: e, providedIn: "any", factory: () => R(kh) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function T(e, t = k.Default) {
        const n = C();
        return null === n ? R(e, t) : xf(be(), n, F(e), t);
      }
      function Zl() {
        throw new Error("invalid");
      }
      function Dp(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r],
              o = n[r + 1];
            if (-1 !== o) {
              const s = e.data[o];
              Wa(i), s.contentQueries(2, t[o], o);
            }
          }
      }
      function as(e, t, n, r, i, o, s, a, l, u, c) {
        const d = t.blueprint.slice();
        return (
          (d[0] = i),
          (d[2] = 76 | r),
          (null !== c || (e && 1024 & e[2])) && (d[2] |= 1024),
          af(d),
          (d[3] = d[15] = e),
          (d[8] = n),
          (d[10] = s || (e && e[10])),
          (d[B] = a || (e && e[B])),
          (d[12] = l || (e && e[12]) || null),
          (d[9] = u || (e && e[9]) || null),
          (d[6] = o),
          (d[20] = (function fC() {
            return dC++;
          })()),
          (d[21] = c),
          (d[16] = 2 == t.type ? e[16] : d),
          d
        );
      }
      function Ar(e, t, n, r, i) {
        let o = e.data[t];
        if (null === o)
          (o = (function ou(e, t, n, r, i) {
            const o = cf(),
              s = Ha(),
              l = (e.data[t] = (function R1(e, t, n, r, i, o) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: i,
                  attrs: o,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? o : o && o.parent, n, t, r, i));
            return (
              null === e.firstChild && (e.firstChild = l),
              null !== o &&
                (s
                  ? null == o.child && null !== l.parent && (o.child = l)
                  : null === o.next && (o.next = l)),
              l
            );
          })(e, t, n, r, i)),
            (function u0() {
              return L.lFrame.inI18n;
            })() && (o.flags |= 64);
        else if (64 & o.type) {
          (o.type = n), (o.value = r), (o.attrs = i);
          const s = (function di() {
            const e = L.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          o.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return $t(o, !0), o;
      }
      function Rr(e, t, n, r) {
        if (0 === n) return -1;
        const i = t.length;
        for (let o = 0; o < n; o++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return i;
      }
      function su(e, t, n) {
        qa(t);
        try {
          const r = e.viewQuery;
          null !== r && pu(1, r, n);
          const i = e.template;
          null !== i && wp(e, t, i, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Dp(e, t),
            e.staticViewQueries && pu(2, e.viewQuery, n);
          const o = e.components;
          null !== o &&
            (function T1(e, t) {
              for (let n = 0; n < t.length; n++) q1(e, t[n]);
            })(t, o);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[2] &= -5), Za();
        }
      }
      function ls(e, t, n, r) {
        const i = t[2];
        if (128 != (128 & i)) {
          qa(t);
          try {
            af(t),
              (function ff(e) {
                return (L.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && wp(e, t, n, 2, r);
            const s = 3 == (3 & i);
            if (s) {
              const u = e.preOrderCheckHooks;
              null !== u && Po(t, u, null);
            } else {
              const u = e.preOrderHooks;
              null !== u && Fo(t, u, 0, null), Qa(t, 0);
            }
            if (
              ((function G1(e) {
                for (let t = ml(e); null !== t; t = yl(t)) {
                  if (!t[2]) continue;
                  const n = t[9];
                  for (let r = 0; r < n.length; r++) {
                    const i = n[r],
                      o = i[3];
                    0 == (512 & i[2]) && Ba(o, 1), (i[2] |= 512);
                  }
                }
              })(t),
              (function z1(e) {
                for (let t = ml(e); null !== t; t = yl(t))
                  for (let n = 10; n < t.length; n++) {
                    const r = t[n],
                      i = r[1];
                    No(r) && ls(i, r, i.template, r[8]);
                  }
              })(t),
              null !== e.contentQueries && Dp(e, t),
              s)
            ) {
              const u = e.contentCheckHooks;
              null !== u && Po(t, u);
            } else {
              const u = e.contentHooks;
              null !== u && Fo(t, u, 1), Qa(t, 1);
            }
            !(function S1(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const i = n[r];
                    if (i < 0) yn(~i);
                    else {
                      const o = i,
                        s = n[++r],
                        a = n[++r];
                      c0(s, o), a(2, t[o]);
                    }
                  }
                } finally {
                  yn(-1);
                }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function M1(e, t) {
                for (let n = 0; n < t.length; n++) W1(e, t[n]);
              })(t, a);
            const l = e.viewQuery;
            if ((null !== l && pu(2, l, r), s)) {
              const u = e.viewCheckHooks;
              null !== u && Po(t, u);
            } else {
              const u = e.viewHooks;
              null !== u && Fo(t, u, 2), Qa(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[2] &= -41),
              512 & t[2] && ((t[2] &= -513), Ba(t[3], -1));
          } finally {
            Za();
          }
        }
      }
      function wp(e, t, n, r, i) {
        const o = Ge(),
          s = 2 & r;
        try {
          yn(-1), s && t.length > 22 && Yh(e, t, 22, !1), n(r, i);
        } finally {
          yn(o);
        }
      }
      function au(e, t, n) {
        !uf() ||
          ((function O1(e, t, n, r) {
            const i = n.directiveStart,
              o = n.directiveEnd;
            e.firstCreatePass || pi(n, t), Ve(r, t);
            const s = n.initialInputs;
            for (let a = i; a < o; a++) {
              const l = e.data[a],
                u = St(l);
              u && B1(t, n, l);
              const c = gi(t, e, a, n);
              Ve(c, t),
                null !== s && H1(0, a - i, c, l, 0, s),
                u && (ut(n.index, t)[8] = c);
            }
          })(e, t, n, lt(n, t)),
          128 == (128 & n.flags) &&
            (function L1(e, t, n) {
              const r = n.directiveStart,
                i = n.directiveEnd,
                o = n.index,
                s = (function d0() {
                  return L.lFrame.currentDirectiveIndex;
                })();
              try {
                yn(o);
                for (let a = r; a < i; a++) {
                  const l = e.data[a],
                    u = t[a];
                  za(a),
                    (null !== l.hostBindings ||
                      0 !== l.hostVars ||
                      null !== l.hostAttrs) &&
                      Tp(l, u);
                }
              } finally {
                yn(-1), za(s);
              }
            })(e, t, n));
      }
      function lu(e, t, n = lt) {
        const r = t.localNames;
        if (null !== r) {
          let i = t.index + 1;
          for (let o = 0; o < r.length; o += 2) {
            const s = r[o + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[i++] = a;
          }
        }
      }
      function _p(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = uu(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function uu(e, t, n, r, i, o, s, a, l, u) {
        const c = 22 + r,
          d = c + i,
          h = (function x1(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : V);
            return n;
          })(c, d),
          m = "function" == typeof u ? u() : u;
        return (h[1] = {
          type: e,
          blueprint: h,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: h.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof o ? o() : o,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: m,
          incompleteFirstPass: !1,
        });
      }
      function bp(e, t, n) {
        for (let r in e)
          if (e.hasOwnProperty(r)) {
            const i = e[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(t, i)
              : (n[r] = [t, i]);
          }
        return n;
      }
      function Ip(e, t) {
        const r = t.directiveEnd,
          i = e.data,
          o = t.attrs,
          s = [];
        let a = null,
          l = null;
        for (let u = t.directiveStart; u < r; u++) {
          const c = i[u],
            d = c.inputs,
            h = null === o || Zh(t) ? null : U1(d, o);
          s.push(h), (a = bp(d, u, a)), (l = bp(c.outputs, u, l));
        }
        null !== a &&
          (a.hasOwnProperty("class") && (t.flags |= 16),
          a.hasOwnProperty("style") && (t.flags |= 32)),
          (t.initialInputs = s),
          (t.inputs = a),
          (t.outputs = l);
      }
      function ft(e, t, n, r, i, o, s, a) {
        const l = lt(t, n);
        let c,
          u = t.inputs;
        !a && null != u && (c = u[r])
          ? (gu(e, n, c, r, i), xo(t) && Sp(n, t.index))
          : 3 & t.type &&
            ((r = (function N1(e) {
              return "class" === e
                ? "className"
                : "for" === e
                ? "htmlFor"
                : "formaction" === e
                ? "formAction"
                : "innerHtml" === e
                ? "innerHTML"
                : "readonly" === e
                ? "readOnly"
                : "tabindex" === e
                ? "tabIndex"
                : e;
            })(r)),
            (i = null != s ? s(i, t.value || "", r) : i),
            o.setProperty(l, r, i));
      }
      function Sp(e, t) {
        const n = ut(t, e);
        16 & n[2] || (n[2] |= 32);
      }
      function cu(e, t, n, r) {
        let i = !1;
        if (uf()) {
          const o = (function j1(e, t, n) {
              const r = e.directiveRegistry;
              let i = null;
              if (r)
                for (let o = 0; o < r.length; o++) {
                  const s = r[o];
                  Qh(n, s.selectors, !1) &&
                    (i || (i = []),
                    $o(pi(n, t), e, s.type),
                    St(s) ? (xp(e, n), i.unshift(s)) : i.push(s));
                }
              return i;
            })(e, t, n),
            s = null === r ? null : { "": -1 };
          if (null !== o) {
            (i = !0), Ap(n, e.data.length, o.length);
            for (let c = 0; c < o.length; c++) {
              const d = o[c];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              l = !1,
              u = Rr(e, t, o.length, null);
            for (let c = 0; c < o.length; c++) {
              const d = o[c];
              (n.mergedAttrs = Lo(n.mergedAttrs, d.hostAttrs)),
                Rp(e, n, t, u, d),
                $1(u, d, s),
                null !== d.contentQueries && (n.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (n.flags |= 128);
              const h = d.type.prototype;
              !a &&
                (h.ngOnChanges || h.ngOnInit || h.ngDoCheck) &&
                ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
                (a = !0)),
                !l &&
                  (h.ngOnChanges || h.ngDoCheck) &&
                  ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (l = !0)),
                u++;
            }
            Ip(e, n);
          }
          s &&
            (function V1(e, t, n) {
              if (t) {
                const r = (e.localNames = []);
                for (let i = 0; i < t.length; i += 2) {
                  const o = n[t[i + 1]];
                  if (null == o) throw new S(-301, !1);
                  r.push(t[i], o);
                }
              }
            })(n, r, s);
        }
        return (n.mergedAttrs = Lo(n.mergedAttrs, n.attrs)), i;
      }
      function Mp(e, t, n, r, i, o) {
        const s = o.hostBindings;
        if (s) {
          let a = e.hostBindingOpCodes;
          null === a && (a = e.hostBindingOpCodes = []);
          const l = ~t.index;
          (function F1(e) {
            let t = e.length;
            for (; t > 0; ) {
              const n = e[--t];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(a) != l && a.push(l),
            a.push(r, i, s);
        }
      }
      function Tp(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function xp(e, t) {
        (t.flags |= 2), (e.components || (e.components = [])).push(t.index);
      }
      function $1(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          St(t) && (n[""] = e);
        }
      }
      function Ap(e, t, n) {
        (e.flags |= 1),
          (e.directiveStart = t),
          (e.directiveEnd = t + n),
          (e.providerIndexes = t);
      }
      function Rp(e, t, n, r, i) {
        e.data[r] = i;
        const o = i.factory || (i.factory = $n(i.type)),
          s = new fi(o, St(i), T);
        (e.blueprint[r] = s),
          (n[r] = s),
          Mp(e, t, 0, r, Rr(e, n, i.hostVars, V), i);
      }
      function B1(e, t, n) {
        const r = lt(t, e),
          i = _p(n),
          o = e[10],
          s = us(
            e,
            as(
              e,
              i,
              null,
              n.onPush ? 32 : 16,
              r,
              t,
              o,
              o.createRenderer(r, n),
              null,
              null,
              null
            )
          );
        e[t.index] = s;
      }
      function Ht(e, t, n, r, i, o) {
        const s = lt(e, t);
        !(function du(e, t, n, r, i, o, s) {
          if (null == o) e.removeAttribute(t, i, n);
          else {
            const a = null == s ? j(o) : s(o, r || "", i);
            e.setAttribute(t, i, a, n);
          }
        })(t[B], s, o, e.value, n, r, i);
      }
      function H1(e, t, n, r, i, o) {
        const s = o[t];
        if (null !== s) {
          const a = r.setInput;
          for (let l = 0; l < s.length; ) {
            const u = s[l++],
              c = s[l++],
              d = s[l++];
            null !== a ? r.setInput(n, d, u, c) : (n[c] = d);
          }
        }
      }
      function U1(e, t) {
        let n = null,
          r = 0;
        for (; r < t.length; ) {
          const i = t[r];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              e.hasOwnProperty(i) &&
                (null === n && (n = []), n.push(i, e[i], t[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function Np(e, t, n, r) {
        return new Array(e, !0, !1, t, null, 0, r, n, null, null);
      }
      function W1(e, t) {
        const n = ut(t, e);
        if (No(n)) {
          const r = n[1];
          48 & n[2] ? ls(r, n, r.template, n[8]) : n[5] > 0 && fu(n);
        }
      }
      function fu(e) {
        for (let r = ml(e); null !== r; r = yl(r))
          for (let i = 10; i < r.length; i++) {
            const o = r[i];
            if (No(o))
              if (512 & o[2]) {
                const s = o[1];
                ls(s, o, s.template, o[8]);
              } else o[5] > 0 && fu(o);
          }
        const n = e[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const i = ut(n[r], e);
            No(i) && i[5] > 0 && fu(i);
          }
      }
      function q1(e, t) {
        const n = ut(t, e),
          r = n[1];
        (function Z1(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          su(r, n, n[8]);
      }
      function us(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
      }
      function hu(e) {
        for (; e; ) {
          e[2] |= 32;
          const t = Ti(e);
          if ($w(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function cs(e, t, n, r = !0) {
        const i = t[10];
        i.begin && i.begin();
        try {
          ls(e, t, e.template, n);
        } catch (s) {
          throw (r && Op(t, s), s);
        } finally {
          i.end && i.end();
        }
      }
      function pu(e, t, n) {
        Wa(0), t(e, n);
      }
      function kp(e) {
        return e[7] || (e[7] = []);
      }
      function Pp(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function Op(e, t) {
        const n = e[9],
          r = n ? n.get(Mr, null) : null;
        r && r.handleError(t);
      }
      function gu(e, t, n, r, i) {
        for (let o = 0; o < n.length; ) {
          const s = n[o++],
            a = n[o++],
            l = t[s],
            u = e.data[s];
          null !== u.setInput ? u.setInput(l, i, r, a) : (l[a] = i);
        }
      }
      function sn(e, t, n) {
        const r = (function Ro(e, t) {
          return ye(t[e]);
        })(t, e);
        !(function ah(e, t, n) {
          e.setValue(t, n);
        })(e[B], r, n);
      }
      function ds(e, t, n) {
        let r = n ? e.styles : null,
          i = n ? e.classes : null,
          o = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (o = a)
              : 1 == o
              ? (i = Sa(i, a))
              : 2 == o && (r = Sa(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = i) : (e.classesWithoutHost = i);
      }
      function fs(e, t, n, r, i = !1) {
        for (; null !== n; ) {
          const o = t[n.index];
          if ((null !== o && r.push(ye(o)), It(o)))
            for (let a = 10; a < o.length; a++) {
              const l = o[a],
                u = l[1].firstChild;
              null !== u && fs(l[1], l, u, r);
            }
          const s = n.type;
          if (8 & s) fs(e, t, n.child, r);
          else if (32 & s) {
            const a = gl(n, t);
            let l;
            for (; (l = a()); ) r.push(l);
          } else if (16 & s) {
            const a = vh(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const l = Ti(t[16]);
              fs(l[1], l, a, r, !0);
            }
          }
          n = i ? n.projectionNext : n.next;
        }
        return r;
      }
      class Pi {
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            n = t[1];
          return fs(n, t, n.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (It(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (wl(t, r), Ho(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          uh(this._lView[1], this._lView);
        }
        onDestroy(t) {
          !(function Ep(e, t, n, r) {
            const i = kp(t);
            null === n
              ? i.push(r)
              : (i.push(n), e.firstCreatePass && Pp(e).push(r, i.length - 1));
          })(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          hu(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -65;
        }
        reattach() {
          this._lView[2] |= 64;
        }
        detectChanges() {
          cs(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new S(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function xC(e, t) {
              xi(e, t, t[B], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new S(902, !1);
          this._appRef = t;
        }
      }
      class Q1 extends Pi {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          cs(t[1], t, t[8], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class mu extends ki {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = ee(t);
          return new Fi(n, this.ngModule);
        }
      }
      function Lp(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class Y1 {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          const i = this.injector.get(t, Bl, r);
          return i !== Bl || n === Bl ? i : this.parentInjector.get(t, n, r);
        }
      }
      class Fi extends Hh {
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function K_(e) {
              return e.map(Q_).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        get inputs() {
          return Lp(this.componentDef.inputs);
        }
        get outputs() {
          return Lp(this.componentDef.outputs);
        }
        create(t, n, r, i) {
          let o = (i = i || this.ngModule) instanceof wn ? i : i?.injector;
          o &&
            null !== this.componentDef.getStandaloneInjector &&
            (o = this.componentDef.getStandaloneInjector(o) || o);
          const s = o ? new Y1(t, o) : t,
            a = s.get(zh, null);
          if (null === a) throw new S(407, !1);
          const l = s.get(x_, null),
            u = a.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function A1(e, t, n) {
                  return e.selectRootElement(t, n === Vt.ShadowDom);
                })(u, r, this.componentDef.encapsulation)
              : Dl(
                  u,
                  c,
                  (function K1(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(c)
                ),
            h = this.componentDef.onPush ? 288 : 272,
            m = uu(0, null, null, 1, 0, null, null, null, null, null),
            y = as(null, m, null, h, null, null, a, u, l, s, null);
          let v, D;
          qa(y);
          try {
            const _ = (function eE(e, t, n, r, i, o) {
              const s = n[1];
              n[22] = e;
              const l = Ar(s, 22, 2, "#host", null),
                u = (l.mergedAttrs = t.hostAttrs);
              null !== u &&
                (ds(l, u, !0),
                null !== e &&
                  (Oo(i, e, u),
                  null !== l.classes && Sl(i, e, l.classes),
                  null !== l.styles && wh(i, e, l.styles)));
              const c = r.createRenderer(e, t),
                d = as(
                  n,
                  _p(t),
                  null,
                  t.onPush ? 32 : 16,
                  n[22],
                  l,
                  r,
                  c,
                  o || null,
                  null,
                  null
                );
              return (
                s.firstCreatePass &&
                  ($o(pi(l, n), s, t.type), xp(s, l), Ap(l, n.length, 1)),
                us(n, d),
                (n[22] = d)
              );
            })(d, this.componentDef, y, a, u);
            if (d)
              if (r) Oo(u, d, ["ng-version", A_.full]);
              else {
                const { attrs: E, classes: w } = (function Y_(e) {
                  const t = [],
                    n = [];
                  let r = 1,
                    i = 2;
                  for (; r < e.length; ) {
                    let o = e[r];
                    if ("string" == typeof o)
                      2 === i
                        ? "" !== o && t.push(o, e[++r])
                        : 8 === i && n.push(o);
                    else {
                      if (!Mt(i)) break;
                      i = o;
                    }
                    r++;
                  }
                  return { attrs: t, classes: n };
                })(this.componentDef.selectors[0]);
                E && Oo(u, d, E), w && w.length > 0 && Sl(u, d, w.join(" "));
              }
            if (((D = $a(m, 22)), void 0 !== n)) {
              const E = (D.projection = []);
              for (let w = 0; w < this.ngContentSelectors.length; w++) {
                const x = n[w];
                E.push(null != x ? Array.from(x) : null);
              }
            }
            (v = (function tE(e, t, n, r) {
              const i = n[1],
                o = (function P1(e, t, n) {
                  const r = be();
                  e.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Rp(e, r, t, Rr(e, t, 1, null), n),
                    Ip(e, r));
                  const i = gi(t, e, r.directiveStart, r);
                  Ve(i, t);
                  const o = lt(r, t);
                  return o && Ve(o, t), i;
                })(i, n, t);
              if (((e[8] = n[8] = o), null !== r)) for (const a of r) a(o, t);
              if (t.contentQueries) {
                const a = be();
                t.contentQueries(1, o, a.directiveStart);
              }
              const s = be();
              return (
                !i.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (yn(s.index),
                  Mp(n[1], s, 0, s.directiveStart, s.directiveEnd, t),
                  Tp(t, o)),
                o
              );
            })(_, this.componentDef, y, [nE])),
              su(m, y, null);
          } finally {
            Za();
          }
          return new X1(this.componentType, v, Sr(D, y), y, D);
        }
      }
      class X1 extends class E_ {} {
        constructor(t, n, r, i, o) {
          super(),
            (this.location = r),
            (this._rootLView = i),
            (this._tNode = o),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new Q1(i)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let i;
          if (null !== r && (i = r[t])) {
            const o = this._rootLView;
            gu(o[1], o, i, t, n), Sp(o, this._tNode.index);
          }
        }
        get injector() {
          return new mr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function nE() {
        const e = be();
        ko(C()[1], e);
      }
      let hs = null;
      function Gn() {
        if (!hs) {
          const e = ie.Symbol;
          if (e && e.iterator) hs = e.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let n = 0; n < t.length; ++n) {
              const r = t[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (hs = r);
            }
          }
        }
        return hs;
      }
      function Oi(e) {
        return (
          !!(function vu(e) {
            return (
              null !== e && ("function" == typeof e || "object" == typeof e)
            );
          })(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Gn() in e))
        );
      }
      function $e(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function Du(e, t, n, r) {
        const i = C();
        return $e(i, hr(), t) && (Z(), Ht(ue(), i, e, t, n, r)), Du;
      }
      function kr(e, t, n, r) {
        return $e(e, hr(), n) ? t + j(n) + r : V;
      }
      function qn(e, t, n, r, i, o, s, a) {
        const l = C(),
          u = Z(),
          c = e + 22,
          d = u.firstCreatePass
            ? (function pE(e, t, n, r, i, o, s, a, l) {
                const u = t.consts,
                  c = Ar(t, e, 4, s || null, mn(u, a));
                cu(t, n, c, mn(u, l)), ko(t, c);
                const d = (c.tViews = uu(
                  2,
                  c,
                  r,
                  i,
                  o,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  u
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, c),
                    (d.queries = t.queries.embeddedTView(c))),
                  c
                );
              })(c, u, l, t, n, r, i, o, s)
            : u.data[c];
        $t(d, !1);
        const h = l[B].createComment("");
        Zo(u, l, h, d),
          Ve(h, l),
          us(l, (l[c] = Np(h, l, h, d))),
          Ao(d) && au(u, l, d),
          null != s && lu(l, d, a);
      }
      function bn(e, t, n) {
        const r = C();
        return $e(r, hr(), t) && ft(Z(), ue(), r, e, t, r[B], n, !1), bn;
      }
      function wu(e, t, n, r, i) {
        const s = i ? "class" : "style";
        gu(e, n, t.inputs[s], s, r);
      }
      function f(e, t, n, r) {
        const i = C(),
          o = Z(),
          s = 22 + e,
          a = i[B],
          l = (i[s] = Dl(
            a,
            t,
            (function y0() {
              return L.lFrame.currentNamespace;
            })()
          )),
          u = o.firstCreatePass
            ? (function yE(e, t, n, r, i, o, s) {
                const a = t.consts,
                  u = Ar(t, e, 2, i, mn(a, o));
                return (
                  cu(t, n, u, mn(a, s)),
                  null !== u.attrs && ds(u, u.attrs, !1),
                  null !== u.mergedAttrs && ds(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(s, o, i, 0, t, n, r)
            : o.data[s];
        $t(u, !0);
        const c = u.mergedAttrs;
        null !== c && Oo(a, l, c);
        const d = u.classes;
        null !== d && Sl(a, l, d);
        const h = u.styles;
        return (
          null !== h && wh(a, l, h),
          64 != (64 & u.flags) && Zo(o, i, l, u),
          0 ===
            (function e0() {
              return L.lFrame.elementDepthCount;
            })() && Ve(l, i),
          (function t0() {
            L.lFrame.elementDepthCount++;
          })(),
          Ao(u) &&
            (au(o, i, u),
            (function Cp(e, t, n) {
              if (Fa(t)) {
                const i = t.directiveEnd;
                for (let o = t.directiveStart; o < i; o++) {
                  const s = e.data[o];
                  s.contentQueries && s.contentQueries(1, n[o], o);
                }
              }
            })(o, u, i)),
          null !== r && lu(i, u),
          f
        );
      }
      function p() {
        let e = be();
        Ha()
          ? (function Ua() {
              L.lFrame.isParent = !1;
            })()
          : ((e = e.parent), $t(e, !1));
        const t = e;
        !(function n0() {
          L.lFrame.elementDepthCount--;
        })();
        const n = Z();
        return (
          n.firstCreatePass && (ko(n, e), Fa(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function _0(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            wu(n, t, C(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function E0(e) {
              return 0 != (32 & e.flags);
            })(t) &&
            wu(n, t, C(), t.stylesWithoutHost, !1),
          p
        );
      }
      function M(e, t, n, r) {
        return f(e, t, n, r), p(), M;
      }
      function gs(e) {
        return !!e && "function" == typeof e.then;
      }
      const Yp = function Kp(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function et(e, t, n, r) {
        const i = C(),
          o = Z(),
          s = be();
        return (
          (function Xp(e, t, n, r, i, o, s, a) {
            const l = Ao(r),
              c = e.firstCreatePass && Pp(e),
              d = t[8],
              h = kp(t);
            let m = !0;
            if (3 & r.type || a) {
              const D = lt(r, t),
                _ = a ? a(D) : D,
                E = h.length,
                w = a ? (Q) => a(ye(Q[r.index])) : r.index;
              let x = null;
              if (
                (!a &&
                  l &&
                  (x = (function wE(e, t, n, r) {
                    const i = e.cleanup;
                    if (null != i)
                      for (let o = 0; o < i.length - 1; o += 2) {
                        const s = i[o];
                        if (s === n && i[o + 1] === r) {
                          const a = t[7],
                            l = i[o + 2];
                          return a.length > l ? a[l] : null;
                        }
                        "string" == typeof s && (o += 2);
                      }
                    return null;
                  })(e, t, i, r.index)),
                null !== x)
              )
                ((x.__ngLastListenerFn__ || x).__ngNextListenerFn__ = o),
                  (x.__ngLastListenerFn__ = o),
                  (m = !1);
              else {
                o = tg(r, t, d, o, !1);
                const Q = n.listen(_, i, o);
                h.push(o, Q), c && c.push(i, w, E, E + 1);
              }
            } else o = tg(r, t, d, o, !1);
            const y = r.outputs;
            let v;
            if (m && null !== y && (v = y[i])) {
              const D = v.length;
              if (D)
                for (let _ = 0; _ < D; _ += 2) {
                  const le = t[v[_]][v[_ + 1]].subscribe(o),
                    or = h.length;
                  h.push(o, le), c && c.push(i, r.index, or, -(or + 1));
                }
            }
          })(o, i, i[B], s, e, t, 0, r),
          et
        );
      }
      function eg(e, t, n, r) {
        try {
          return !1 !== n(r);
        } catch (i) {
          return Op(e, i), !1;
        }
      }
      function tg(e, t, n, r, i) {
        return function o(s) {
          if (s === Function) return r;
          hu(2 & e.flags ? ut(e.index, t) : t);
          let l = eg(t, 0, r, s),
            u = o.__ngNextListenerFn__;
          for (; u; ) (l = eg(t, 0, u, s) && l), (u = u.__ngNextListenerFn__);
          return i && !1 === l && (s.preventDefault(), (s.returnValue = !1)), l;
        };
      }
      function tt(e, t, n) {
        return Eu(e, "", t, "", n), tt;
      }
      function Eu(e, t, n, r, i) {
        const o = C(),
          s = kr(o, t, n, r);
        return s !== V && ft(Z(), ue(), o, e, s, o[B], i, !1), Eu;
      }
      function g(e, t = "") {
        const n = C(),
          r = Z(),
          i = e + 22,
          o = r.firstCreatePass ? Ar(r, i, 1, t, null) : r.data[i],
          s = (n[i] = (function vl(e, t) {
            return e.createText(t);
          })(n[B], t));
        Zo(r, n, s, o), $t(o, !1);
      }
      function De(e) {
        return an("", e, ""), De;
      }
      function an(e, t, n) {
        const r = C(),
          i = kr(r, e, t, n);
        return i !== V && sn(r, Ge(), i), an;
      }
      const Ur = "en-US";
      let Wg = Ur;
      class Qn {}
      class vm {}
      class Dm extends Qn {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new mu(this));
          const r = st(t);
          (this._bootstrapComponents = rn(r.bootstrap)),
            (this._r3Injector = np(
              t,
              n,
              [
                { provide: Qn, useValue: this },
                { provide: ki, useValue: this.componentFactoryResolver },
              ],
              ne(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Ru extends vm {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new Dm(this.moduleType, t);
        }
      }
      class uI extends Qn {
        constructor(t, n, r) {
          super(),
            (this.componentFactoryResolver = new mu(this)),
            (this.instance = null);
          const i = new $h(
            [
              ...t,
              { provide: Qn, useValue: this },
              { provide: ki, useValue: this.componentFactoryResolver },
            ],
            n || es(),
            r,
            new Set(["environment"])
          );
          (this.injector = i), i.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function Cs(e, t, n = null) {
        return new uI(e, t, n).injector;
      }
      let cI = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n.id)) {
              const r = Oh(0, n.type),
                i =
                  r.length > 0
                    ? Cs([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n.id, i);
            }
            return this.cachedInjectors.get(n.id);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.ɵprov = U({
            token: e,
            providedIn: "environment",
            factory: () => new e(R(wn)),
          })),
          e
        );
      })();
      function wm(e) {
        e.getStandaloneInjector = (t) =>
          t.get(cI).getOrCreateStandaloneInjector(e);
      }
      function ku(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const Ze = class OI extends Lt {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let i = t,
            o = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const l = t;
            (i = l.next?.bind(l)),
              (o = l.error?.bind(l)),
              (s = l.complete?.bind(l));
          }
          this.__isAsync && ((o = ku(o)), i && (i = ku(i)), s && (s = ku(s)));
          const a = super.subscribe({ next: i, error: o, complete: s });
          return t instanceof ht && t.add(a), a;
        }
      };
      let ln = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = $I), e;
      })();
      const jI = ln,
        VI = class extends jI {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tViews,
              i = as(
                this._declarationLView,
                r,
                t,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                n || null
              );
            i[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (i[19] = s.createEmbeddedView(r)),
              su(r, i, t),
              new Pi(i)
            );
          }
        };
      function $I() {
        return (function _s(e, t) {
          return 4 & e.type ? new VI(t, e, Sr(e, t)) : null;
        })(be(), C());
      }
      let Nt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = BI), e;
      })();
      function BI() {
        return (function Pm(e, t) {
          let n;
          const r = t[e.index];
          if (It(r)) n = r;
          else {
            let i;
            if (8 & e.type) i = ye(r);
            else {
              const o = t[B];
              i = o.createComment("");
              const s = lt(e, t);
              Hn(
                o,
                qo(o, s),
                i,
                (function OC(e, t) {
                  return e.nextSibling(t);
                })(o, s),
                !1
              );
            }
            (t[e.index] = n = Np(r, t, i, e)), us(t, n);
          }
          return new Nm(n, e, t);
        })(be(), C());
      }
      const HI = Nt,
        Nm = class extends HI {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Sr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new mr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Vo(this._hostTNode, this._hostLView);
            if (bf(t)) {
              const n = gr(t, this._hostLView),
                r = pr(t);
              return new mr(n[1].data[r + 8], n);
            }
            return new mr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = km(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(t, n, r) {
            let i, o;
            "number" == typeof r
              ? (i = r)
              : null != r && ((i = r.index), (o = r.injector));
            const s = t.createEmbeddedView(n || {}, o);
            return this.insert(s, i), s;
          }
          createComponent(t, n, r, i, o) {
            const s =
              t &&
              !(function vi(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (i = d.projectableNodes),
                (o = d.environmentInjector || d.ngModuleRef);
            }
            const l = s ? t : new Fi(ee(t)),
              u = r || this.parentInjector;
            if (!o && null == l.ngModule) {
              const h = (s ? u : this.parentInjector).get(wn, null);
              h && (o = h);
            }
            const c = l.create(u, i, void 0, o);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              i = r[1];
            if (
              (function Xw(e) {
                return It(e[3]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[3],
                  h = new Nm(d, d[6], d[3]);
                h.detach(h.indexOf(t));
              }
            }
            const o = this._adjustIndex(n),
              s = this._lContainer;
            !(function RC(e, t, n, r) {
              const i = 10 + r,
                o = n.length;
              r > 0 && (n[i - 1][4] = t),
                r < o - 10
                  ? ((t[4] = n[i]), Ff(n, 10 + r, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n);
              const s = t[17];
              null !== s &&
                n !== s &&
                (function NC(e, t) {
                  const n = e[9];
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t);
                })(s, t);
              const a = t[19];
              null !== a && a.insertView(e), (t[2] |= 64);
            })(i, r, s, o);
            const a = El(o, s),
              l = r[B],
              u = qo(l, s[7]);
            return (
              null !== u &&
                (function TC(e, t, n, r, i, o) {
                  (r[0] = i), (r[6] = t), xi(e, r, n, 1, i, o);
                })(i, s[6], l, r, u, a),
              t.attachToViewContainerRef(),
              Ff(Fu(s), o, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = km(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = wl(this._lContainer, n);
            r && (Ho(Fu(this._lContainer), n), uh(r[1], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = wl(this._lContainer, n);
            return r && null != Ho(Fu(this._lContainer), n) ? new Pi(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function km(e) {
        return e[8];
      }
      function Fu(e) {
        return e[8] || (e[8] = []);
      }
      function bs(...e) {}
      const Is = new O("Application Initializer");
      let Ss = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = bs),
              (this.reject = bs),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, i) => {
                (this.resolve = r), (this.reject = i);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let i = 0; i < this.appInits.length; i++) {
                const o = this.appInits[i]();
                if (gs(o)) n.push(o);
                else if (Yp(o)) {
                  const s = new Promise((a, l) => {
                    o.subscribe({ complete: a, error: l });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((i) => {
                this.reject(i);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(Is, 8));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const qi = new O("AppId", {
        providedIn: "root",
        factory: function iy() {
          return `${Zu()}${Zu()}${Zu()}`;
        },
      });
      function Zu() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const oy = new O("Platform Initializer"),
        sy = new O("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        ay = new O("appBootstrapListener");
      let vS = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      const un = new O("LocaleId", {
        providedIn: "root",
        factory: () =>
          pe(un, k.Optional | k.SkipSelf) ||
          (function DS() {
            return (typeof $localize < "u" && $localize.locale) || Ur;
          })(),
      });
      class CS {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let Qu = (() => {
        class e {
          compileModuleSync(n) {
            return new Ru(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              o = rn(st(n).declarations).reduce((s, a) => {
                const l = ee(a);
                return l && s.push(new Fi(l)), s;
              }, []);
            return new CS(r, o);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const bS = (() => Promise.resolve(0))();
      function Ku(e) {
        typeof Zone > "u"
          ? bS.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class Te {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Ze(!1)),
            (this.onMicrotaskEmpty = new Ze(!1)),
            (this.onStable = new Ze(!1)),
            (this.onError = new Ze(!1)),
            typeof Zone > "u")
          )
            throw new S(908, !1);
          Zone.assertZonePatched();
          const i = this;
          if (
            ((i._nesting = 0),
            (i._outer = i._inner = Zone.current),
            Zone.AsyncStackTaggingZoneSpec)
          ) {
            const o = Zone.AsyncStackTaggingZoneSpec;
            i._inner = i._inner.fork(new o("Angular"));
          }
          Zone.TaskTrackingZoneSpec &&
            (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
            (i.shouldCoalesceEventChangeDetection = !r && n),
            (i.shouldCoalesceRunChangeDetection = r),
            (i.lastRequestAnimationFrameId = -1),
            (i.nativeRequestAnimationFrame = (function IS() {
              let e = ie.requestAnimationFrame,
                t = ie.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function TS(e) {
              const t = () => {
                !(function MS(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(ie, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Ju(e),
                                (e.isCheckStableRunning = !0),
                                Yu(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Ju(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, i, o, s, a) => {
                  try {
                    return cy(e), n.invokeTask(i, o, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === o.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      dy(e);
                  }
                },
                onInvoke: (n, r, i, o, s, a, l) => {
                  try {
                    return cy(e), n.invoke(i, o, s, a, l);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), dy(e);
                  }
                },
                onHasTask: (n, r, i, o) => {
                  n.hasTask(i, o),
                    r === i &&
                      ("microTask" == o.change
                        ? ((e._hasPendingMicrotasks = o.microTask),
                          Ju(e),
                          Yu(e))
                        : "macroTask" == o.change &&
                          (e.hasPendingMacrotasks = o.macroTask));
                },
                onHandleError: (n, r, i, o) => (
                  n.handleError(i, o),
                  e.runOutsideAngular(() => e.onError.emit(o)),
                  !1
                ),
              });
            })(i);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Te.isInAngularZone()) throw new S(909, !1);
        }
        static assertNotInAngularZone() {
          if (Te.isInAngularZone()) throw new S(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, i) {
          const o = this._inner,
            s = o.scheduleEventTask("NgZoneEvent: " + i, t, SS, bs, bs);
          try {
            return o.runTask(s, n, r);
          } finally {
            o.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const SS = {};
      function Yu(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Ju(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function cy(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function dy(e) {
        e._nesting--, Yu(e);
      }
      class xS {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Ze()),
            (this.onMicrotaskEmpty = new Ze()),
            (this.onStable = new Ze()),
            (this.onError = new Ze());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, i) {
          return t.apply(n, r);
        }
      }
      const fy = new O(""),
        Ms = new O("");
      let tc,
        Xu = (() => {
          class e {
            constructor(n, r, i) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                tc ||
                  ((function AS(e) {
                    tc = e;
                  })(i),
                  i.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Te.assertNotInAngularZone(),
                        Ku(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Ku(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, i) {
              let o = -1;
              r &&
                r > 0 &&
                (o = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== o
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: o, updateCb: i });
            }
            whenStable(n, r, i) {
              if (i && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, i), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, i) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(Te), R(ec), R(Ms));
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        ec = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return tc?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = U({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })(),
        In = null;
      const hy = new O("AllowMultipleToken"),
        nc = new O("PlatformDestroyListeners");
      class py {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function my(e, t, n = []) {
        const r = `Platform: ${t}`,
          i = new O(r);
        return (o = []) => {
          let s = rc();
          if (!s || s.injector.get(hy, !1)) {
            const a = [...n, ...o, { provide: i, useValue: !0 }];
            e
              ? e(a)
              : (function kS(e) {
                  if (In && !In.get(hy, !1)) throw new S(400, !1);
                  In = e;
                  const t = e.get(vy);
                  (function gy(e) {
                    const t = e.get(oy, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function yy(e = [], t) {
                    return Tt.create({
                      name: t,
                      providers: [
                        { provide: Ll, useValue: "platform" },
                        { provide: nc, useValue: new Set([() => (In = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function FS(e) {
            const t = rc();
            if (!t) throw new S(401, !1);
            return t;
          })();
        };
      }
      function rc() {
        return In?.get(vy) ?? null;
      }
      let vy = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const i = (function wy(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new xS()
                      : ("zone.js" === e ? void 0 : e) || new Te(t)),
                  n
                );
              })(
                r?.ngZone,
                (function Dy(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              o = [{ provide: Te, useValue: i }];
            return i.run(() => {
              const s = Tt.create({
                  providers: o,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                a = n.create(s),
                l = a.injector.get(Mr, null);
              if (!l) throw new S(402, !1);
              return (
                i.runOutsideAngular(() => {
                  const u = i.onError.subscribe({
                    next: (c) => {
                      l.handleError(c);
                    },
                  });
                  a.onDestroy(() => {
                    xs(this._modules, a), u.unsubscribe();
                  });
                }),
                (function Cy(e, t, n) {
                  try {
                    const r = n();
                    return gs(r)
                      ? r.catch((i) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(i)), i)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(l, i, () => {
                  const u = a.injector.get(Ss);
                  return (
                    u.runInitializers(),
                    u.donePromise.then(
                      () => (
                        (function qg(e) {
                          ot(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Wg = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(un, Ur) || Ur),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const i = _y({}, r);
            return (function RS(e, t, n) {
              const r = new Ru(n);
              return Promise.resolve(r);
            })(0, 0, n).then((o) => this.bootstrapModuleFactory(o, i));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Ts);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((i) => r.bootstrap(i));
            else {
              if (!n.instance.ngDoBootstrap) throw new S(403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new S(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(nc, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(Tt));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function _y(e, t) {
        return Array.isArray(t) ? t.reduce(_y, e) : { ...e, ...t };
      }
      let Ts = (() => {
        class e {
          constructor(n, r, i) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = i),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const o = new _e((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new _e((a) => {
                let l;
                this._zone.runOutsideAngular(() => {
                  l = this._zone.onStable.subscribe(() => {
                    Te.assertNotInAngularZone(),
                      Ku(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const u = this._zone.onUnstable.subscribe(() => {
                  Te.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  l.unsubscribe(), u.unsubscribe();
                };
              });
            this.isStable = (function Cw(...e) {
              const t = oi(e),
                n = (function pw(e, t) {
                  return "number" == typeof Ea(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? jt(r[0])
                  : sr(n)(Ee(r, t))
                : Qt;
            })(
              o,
              s.pipe(
                (function _w(e = {}) {
                  const {
                    connector: t = () => new Lt(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: i = !0,
                  } = e;
                  return (o) => {
                    let s,
                      a,
                      l,
                      u = 0,
                      c = !1,
                      d = !1;
                    const h = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      m = () => {
                        h(), (s = l = void 0), (c = d = !1);
                      },
                      y = () => {
                        const v = s;
                        m(), v?.unsubscribe();
                      };
                    return Ae((v, D) => {
                      u++, !d && !c && h();
                      const _ = (l = l ?? t());
                      D.add(() => {
                        u--, 0 === u && !d && !c && (a = ba(y, i));
                      }),
                        _.subscribe(D),
                        !s &&
                          u > 0 &&
                          ((s = new ii({
                            next: (E) => _.next(E),
                            error: (E) => {
                              (d = !0), h(), (a = ba(m, n, E)), _.error(E);
                            },
                            complete: () => {
                              (c = !0), h(), (a = ba(m, r)), _.complete();
                            },
                          })),
                          jt(v).subscribe(s));
                    })(o);
                  };
                })()
              )
            );
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, r) {
            const i = n instanceof Hh;
            if (!this._injector.get(Ss).done)
              throw (
                (!i &&
                  (function lr(e) {
                    const t = ee(e) || He(e) || Ue(e);
                    return null !== t && t.standalone;
                  })(n),
                new S(405, false))
              );
            let s;
            (s = i ? n : this._injector.get(ki).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function NS(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Qn),
              u = s.create(Tt.NULL, [], r || s.selector, a),
              c = u.location.nativeElement,
              d = u.injector.get(fy, null);
            return (
              d?.registerApplication(c),
              u.onDestroy(() => {
                this.detachView(u.hostView),
                  xs(this.components, u),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(u),
              u
            );
          }
          tick() {
            if (this._runningTick) throw new S(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            xs(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(ay, [])
                .concat(this._bootstrapListeners)
                .forEach((i) => i(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => xs(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new S(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(Te), R(wn), R(Mr));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function xs(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let by = !0,
        ic = (() => {
          class e {}
          return (e.__NG_ELEMENT_ID__ = jS), e;
        })();
      function jS(e) {
        return (function VS(e, t, n) {
          if (xo(e) && !n) {
            const r = ut(e.index, t);
            return new Pi(r, r);
          }
          return 47 & e.type ? new Pi(t[16], t) : null;
        })(be(), C(), 16 == (16 & e));
      }
      class xy {
        constructor() {}
        supports(t) {
          return Oi(t);
        }
        create(t) {
          return new GS(t);
        }
      }
      const zS = (e, t) => t;
      class GS {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || zS);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            i = 0,
            o = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < Ry(r, i, o)) ? n : r,
              a = Ry(s, i, o),
              l = s.currentIndex;
            if (s === r) i--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) i++;
            else {
              o || (o = []);
              const u = a - i,
                c = l - i;
              if (u != c) {
                for (let h = 0; h < u; h++) {
                  const m = h < o.length ? o[h] : (o[h] = 0),
                    y = m + h;
                  c <= y && y < u && (o[h] = m + 1);
                }
                o[s.previousIndex] = c - u;
              }
            }
            a !== l && t(s, a, l);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !Oi(t))) throw new S(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let i,
            o,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (o = t[a]),
                (s = this._trackByFn(a, o)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, o, s, a)),
                    Object.is(n.item, o) || this._addIdentityChange(n, o))
                  : ((n = this._mismatch(n, o, s, a)), (r = !0)),
                (n = n._next);
          } else
            (i = 0),
              (function dE(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Gn()]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(i, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, i)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, i)), (r = !0)),
                  (n = n._next),
                  i++;
              }),
              (this.length = i);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, i) {
          let o;
          return (
            null === t ? (o = this._itTail) : ((o = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, o, i))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, i))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, o, i))
              : (t = this._addAfter(new WS(n, r), o, i)),
            t
          );
        }
        _verifyReinsertion(t, n, r, i) {
          let o =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== o
              ? (t = this._reinsertAfter(o, t._prev, i))
              : t.currentIndex != i &&
                ((t.currentIndex = i), this._addToMoves(t, i)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const i = t._prevRemoved,
            o = t._nextRemoved;
          return (
            null === i ? (this._removalsHead = o) : (i._nextRemoved = o),
            null === o ? (this._removalsTail = i) : (o._prevRemoved = i),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const i = null === n ? this._itHead : n._next;
          return (
            (t._next = i),
            (t._prev = n),
            null === i ? (this._itTail = t) : (i._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Ay()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Ay()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class WS {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class qS {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class Ay {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new qS()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const i = this.map.get(t);
          return i ? i.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Ry(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let i = 0;
        return n && r < n.length && (i = n[r]), r + t + i;
      }
      function ky() {
        return new Ns([new xy()]);
      }
      let Ns = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const i = r.factories.slice();
              n = n.concat(i);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || ky()),
              deps: [[e, new bi(), new Ei()]],
            };
          }
          find(n) {
            const r = this.factories.find((i) => i.supports(n));
            if (null != r) return r;
            throw new S(901, !1);
          }
        }
        return (e.ɵprov = U({ token: e, providedIn: "root", factory: ky })), e;
      })();
      const JS = my(null, "core", []);
      let XS = (() => {
        class e {
          constructor(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(Ts));
          }),
          (e.ɵmod = Et({ type: e })),
          (e.ɵinj = pt({})),
          e
        );
      })();
      function Wr(e) {
        return "boolean" == typeof e ? e : null != e && "false" !== e;
      }
      let ks = null;
      function Sn() {
        return ks;
      }
      const nt = new O("DocumentToken");
      let uc = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = U({
            token: e,
            factory: function () {
              return (function rM() {
                return R(Fy);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const iM = new O("Location Initialized");
      let Fy = (() => {
        class e extends uc {
          constructor(n) {
            super(), (this._doc = n), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Sn().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = Sn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = Sn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(n) {
            this.location.pathname = n;
          }
          pushState(n, r, i) {
            Oy() ? this._history.pushState(n, r, i) : (this.location.hash = i);
          }
          replaceState(n, r, i) {
            Oy()
              ? this._history.replaceState(n, r, i)
              : (this.location.hash = i);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(nt));
          }),
          (e.ɵprov = U({
            token: e,
            factory: function () {
              return (function oM() {
                return new Fy(R(nt));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function Oy() {
        return !!window.history.pushState;
      }
      function cc(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function Ly(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function dn(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let Yn = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = U({
            token: e,
            factory: function () {
              return pe(Vy);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const jy = new O("appBaseHref");
      let Vy = (() => {
          class e extends Yn {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  pe(nt).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return cc(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  dn(this._platformLocation.search),
                i = this._platformLocation.hash;
              return i && n ? `${r}${i}` : r;
            }
            pushState(n, r, i, o) {
              const s = this.prepareExternalUrl(i + dn(o));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, i, o) {
              const s = this.prepareExternalUrl(i + dn(o));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(uc), R(jy, 8));
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        sM = (() => {
          class e extends Yn {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = cc(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, i, o) {
              let s = this.prepareExternalUrl(i + dn(o));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, i, o) {
              let s = this.prepareExternalUrl(i + dn(o));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(uc), R(jy, 8));
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        dc = (() => {
          class e {
            constructor(n) {
              (this._subject = new Ze()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._baseHref = Ly($y(r))),
                this._locationStrategy.onPopState((i) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: i.state,
                    type: i.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + dn(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function lM(e, t) {
                  return e && t.startsWith(e) ? t.substring(e.length) : t;
                })(this._baseHref, $y(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", i = null) {
              this._locationStrategy.pushState(i, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + dn(r)),
                  i
                );
            }
            replaceState(n, r = "", i = null) {
              this._locationStrategy.replaceState(i, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + dn(r)),
                  i
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((i) => i(n, r));
            }
            subscribe(n, r, i) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: i,
              });
            }
          }
          return (
            (e.normalizeQueryParams = dn),
            (e.joinWithSlash = cc),
            (e.stripTrailingSlash = Ly),
            (e.ɵfac = function (n) {
              return new (n || e)(R(Yn));
            }),
            (e.ɵprov = U({
              token: e,
              factory: function () {
                return (function aM() {
                  return new dc(R(Yn));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function $y(e) {
        return e.replace(/\/index.html$/, "");
      }
      class ZM {
        constructor(t, n, r, i) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = i);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let Jn = (() => {
        class e {
          constructor(n, r, i) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = i),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((i, o, s) => {
              if (null == i.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new ZM(i.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === o ? void 0 : o);
              else if (null !== o) {
                const a = r.get(o);
                r.move(a, s), Yy(a, i);
              }
            });
            for (let i = 0, o = r.length; i < o; i++) {
              const a = r.get(i).context;
              (a.index = i), (a.count = o), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((i) => {
              Yy(r.get(i.currentIndex), i);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(Nt), T(ln), T(Ns));
          }),
          (e.ɵdir = Oe({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          e
        );
      })();
      function Yy(e, t) {
        e.context.$implicit = t.item;
      }
      let Ic = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Et({ type: e })),
          (e.ɵinj = pt({})),
          e
        );
      })();
      let MT = (() => {
        class e {}
        return (
          (e.ɵprov = U({
            token: e,
            providedIn: "root",
            factory: () => new TT(R(nt), window),
          })),
          e
        );
      })();
      class TT {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function xT(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let i = r.currentNode;
              for (; i; ) {
                const o = i.shadowRoot;
                if (o) {
                  const s =
                    o.getElementById(t) || o.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                i = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            i = n.top + this.window.pageYOffset,
            o = this.offset();
          this.window.scrollTo(r - o[0], i - o[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              nv(this.window.history) ||
              nv(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function nv(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class Tc extends class rx extends class nM {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function tM(e) {
            ks || (ks = e);
          })(new Tc());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function ix() {
            return (
              (Ji = Ji || document.querySelector("base")),
              Ji ? Ji.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function ox(e) {
                (Gs = Gs || document.createElement("a")),
                  Gs.setAttribute("href", e);
                const t = Gs.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          Ji = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function GM(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
              const r = n.indexOf("="),
                [i, o] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (i.trim() === t) return decodeURIComponent(o);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let Gs,
        Ji = null;
      const av = new O("TRANSITION_ID"),
        ax = [
          {
            provide: Is,
            useFactory: function sx(e, t, n) {
              return () => {
                n.get(Ss).donePromise.then(() => {
                  const r = Sn(),
                    i = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let o = 0; o < i.length; o++) r.remove(i[o]);
                });
              };
            },
            deps: [av, nt, Tt],
            multi: !0,
          },
        ];
      let ux = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Ws = new O("EventManagerPlugins");
      let qs = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((i) => (i.manager = this)),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, i) {
            return this._findPluginFor(r).addEventListener(n, r, i);
          }
          addGlobalEventListener(n, r, i) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, i);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const i = this._plugins;
            for (let o = 0; o < i.length; o++) {
              const s = i[o];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(Ws), R(Te));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class lv {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const i = Sn().getGlobalEventTarget(this._doc, t);
          if (!i)
            throw new Error(`Unsupported event target ${i} for event ${n}`);
          return this.addEventListener(i, n, r);
        }
      }
      let uv = (() => {
          class e {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(n) {
              const r = new Set();
              n.forEach((i) => {
                this._stylesSet.has(i) || (this._stylesSet.add(i), r.add(i));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Xi = (() => {
          class e extends uv {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, []);
            }
            _addStylesToHost(n, r, i) {
              n.forEach((o) => {
                const s = this._doc.createElement("style");
                (s.textContent = o), i.push(r.appendChild(s));
              });
            }
            addHost(n) {
              const r = [];
              this._addStylesToHost(this._stylesSet, n, r),
                this._hostNodes.set(n, r);
            }
            removeHost(n) {
              const r = this._hostNodes.get(n);
              r && r.forEach(cv), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, i) => {
                this._addStylesToHost(n, i, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(cv));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(nt));
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      function cv(e) {
        Sn().remove(e);
      }
      const xc = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Ac = /%COMP%/g;
      function Zs(e, t, n) {
        for (let r = 0; r < t.length; r++) {
          let i = t[r];
          Array.isArray(i) ? Zs(e, i, n) : ((i = i.replace(Ac, e)), n.push(i));
        }
        return n;
      }
      function hv(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let Rc = (() => {
        class e {
          constructor(n, r, i) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = i),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Nc(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case Vt.Emulated: {
                let i = this.rendererByCompId.get(r.id);
                return (
                  i ||
                    ((i = new gx(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, i)),
                  i.applyToHost(n),
                  i
                );
              }
              case 1:
              case Vt.ShadowDom:
                return new mx(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const i = Zs(r.id, r.styles, []);
                  this.sharedStylesHost.addStyles(i),
                    this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(qs), R(Xi), R(qi));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Nc {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(xc[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          (gv(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (gv(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, i) {
          if (i) {
            n = i + ":" + n;
            const o = xc[i];
            o ? t.setAttributeNS(o, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const i = xc[r];
            i ? t.removeAttributeNS(i, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, i) {
          i & (Xe.DashCase | Xe.Important)
            ? t.style.setProperty(n, r, i & Xe.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & Xe.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, hv(r))
            : this.eventManager.addEventListener(t, n, hv(r));
        }
      }
      function gv(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class gx extends Nc {
        constructor(t, n, r, i) {
          super(t), (this.component = r);
          const o = Zs(i + "-" + r.id, r.styles, []);
          n.addStyles(o),
            (this.contentAttr = (function fx(e) {
              return "_ngcontent-%COMP%".replace(Ac, e);
            })(i + "-" + r.id)),
            (this.hostAttr = (function hx(e) {
              return "_nghost-%COMP%".replace(Ac, e);
            })(i + "-" + r.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      class mx extends Nc {
        constructor(t, n, r, i) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const o = Zs(i.id, i.styles, []);
          for (let s = 0; s < o.length; s++) {
            const a = document.createElement("style");
            (a.textContent = o[s]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let yx = (() => {
        class e extends lv {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, i) {
            return (
              n.addEventListener(r, i, !1),
              () => this.removeEventListener(n, r, i)
            );
          }
          removeEventListener(n, r, i) {
            return n.removeEventListener(r, i);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(nt));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const mv = ["alt", "control", "meta", "shift"],
        vx = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        Dx = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let wx = (() => {
        class e extends lv {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, i) {
            const o = e.parseEventName(r),
              s = e.eventCallback(o.fullKey, i, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Sn().onAndCancel(n, o.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              i = r.shift();
            if (0 === r.length || ("keydown" !== i && "keyup" !== i))
              return null;
            const o = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              mv.forEach((u) => {
                const c = r.indexOf(u);
                c > -1 && (r.splice(c, 1), (s += u + "."));
              }),
              (s += o),
              0 != r.length || 0 === o.length)
            )
              return null;
            const l = {};
            return (l.domEventName = i), (l.fullKey = s), l;
          }
          static matchEventFullKeyCode(n, r) {
            let i = vx[n.key] || n.key,
              o = "";
            return (
              r.indexOf("code.") > -1 && ((i = n.code), (o = "code.")),
              !(null == i || !i) &&
                ((i = i.toLowerCase()),
                " " === i ? (i = "space") : "." === i && (i = "dot"),
                mv.forEach((s) => {
                  s !== i && (0, Dx[s])(n) && (o += s + ".");
                }),
                (o += i),
                o === r)
            );
          }
          static eventCallback(n, r, i) {
            return (o) => {
              e.matchEventFullKeyCode(o, n) && i.runGuarded(() => r(o));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(nt));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const bx = my(JS, "browser", [
          { provide: sy, useValue: "browser" },
          {
            provide: oy,
            useValue: function Cx() {
              Tc.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: nt,
            useFactory: function Ex() {
              return (
                (function UC(e) {
                  Tl = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        Dv = new O(""),
        wv = [
          {
            provide: Ms,
            useClass: class lx {
              addToWindow(t) {
                (ie.getAngularTestability = (r, i = !0) => {
                  const o = t.findTestabilityInTree(r, i);
                  if (null == o)
                    throw new Error("Could not find testability for element.");
                  return o;
                }),
                  (ie.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (ie.getAllAngularRootElements = () => t.getAllRootElements()),
                  ie.frameworkStabilizers || (ie.frameworkStabilizers = []),
                  ie.frameworkStabilizers.push((r) => {
                    const i = ie.getAllAngularTestabilities();
                    let o = i.length,
                      s = !1;
                    const a = function (l) {
                      (s = s || l), o--, 0 == o && r(s);
                    };
                    i.forEach(function (l) {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? Sn().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: fy, useClass: Xu, deps: [Te, ec, Ms] },
          { provide: Xu, useClass: Xu, deps: [Te, ec, Ms] },
        ],
        Cv = [
          { provide: Ll, useValue: "root" },
          {
            provide: Mr,
            useFactory: function _x() {
              return new Mr();
            },
            deps: [],
          },
          { provide: Ws, useClass: yx, multi: !0, deps: [nt, Te, sy] },
          { provide: Ws, useClass: wx, multi: !0, deps: [nt] },
          { provide: Rc, useClass: Rc, deps: [qs, Xi, qi] },
          { provide: zh, useExisting: Rc },
          { provide: uv, useExisting: Xi },
          { provide: Xi, useClass: Xi, deps: [nt] },
          { provide: qs, useClass: qs, deps: [Ws, Te] },
          { provide: class AT {}, useClass: ux, deps: [] },
          [],
        ];
      let Ix = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: qi, useValue: n.appId },
                  { provide: av, useExisting: qi },
                  ax,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(Dv, 12));
            }),
            (e.ɵmod = Et({ type: e })),
            (e.ɵinj = pt({ providers: [...Cv, ...wv], imports: [Ic, XS] })),
            e
          );
        })(),
        _v = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(nt));
            }),
            (e.ɵprov = U({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function Mx() {
                        return new _v(R(nt));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function A(...e) {
        return Ee(e, oi(e));
      }
      typeof window < "u" && window;
      class Ot extends Lt {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const Qs = ni(
          (e) =>
            function () {
              e(this),
                (this.name = "EmptyError"),
                (this.message = "no elements in sequence");
            }
        ),
        { isArray: Fx } = Array,
        { getPrototypeOf: Ox, prototype: Lx, keys: jx } = Object;
      const { isArray: Bx } = Array;
      function Iv(...e) {
        const t = oi(e),
          n = (function hw(e) {
            return re(Ea(e)) ? e.pop() : void 0;
          })(e),
          { args: r, keys: i } = (function Vx(e) {
            if (1 === e.length) {
              const t = e[0];
              if (Fx(t)) return { args: t, keys: null };
              if (
                (function $x(e) {
                  return e && "object" == typeof e && Ox(e) === Lx;
                })(t)
              ) {
                const n = jx(t);
                return { args: n.map((r) => t[r]), keys: n };
              }
            }
            return { args: e, keys: null };
          })(e);
        if (0 === r.length) return Ee([], t);
        const o = new _e(
          (function Gx(e, t, n = Pn) {
            return (r) => {
              Sv(
                t,
                () => {
                  const { length: i } = e,
                    o = new Array(i);
                  let s = i,
                    a = i;
                  for (let l = 0; l < i; l++)
                    Sv(
                      t,
                      () => {
                        const u = Ee(e[l], t);
                        let c = !1;
                        u.subscribe(
                          Re(
                            r,
                            (d) => {
                              (o[l] = d),
                                c || ((c = !0), a--),
                                a || r.next(n(o.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(
            r,
            t,
            i
              ? (s) =>
                  (function zx(e, t) {
                    return e.reduce((n, r, i) => ((n[r] = t[i]), n), {});
                  })(i, s)
              : Pn
          )
        );
        return n
          ? o.pipe(
              (function Ux(e) {
                return K((t) =>
                  (function Hx(e, t) {
                    return Bx(t) ? e(...t) : e(t);
                  })(e, t)
                );
              })(n)
            )
          : o;
      }
      function Sv(e, t, n) {
        e ? Zt(n, e, t) : t();
      }
      function Fc(...e) {
        return (function Wx() {
          return sr(1);
        })()(Ee(e, oi(e)));
      }
      function Mv(e) {
        return new _e((t) => {
          jt(e()).subscribe(t);
        });
      }
      function eo(e, t) {
        const n = re(e) ? e : () => e,
          r = (i) => i.error(n());
        return new _e(t ? (i) => t.schedule(r, 0, i) : r);
      }
      function Oc() {
        return Ae((e, t) => {
          let n = null;
          e._refCount++;
          const r = Re(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const i = e._connection,
              o = n;
            (n = null),
              i && (!o || i === o) && i.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class Tv extends _e {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            xd(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new ht();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                Re(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = ht.EMPTY));
          }
          return t;
        }
        refCount() {
          return Oc()(this);
        }
      }
      function Wt(e, t) {
        return Ae((n, r) => {
          let i = null,
            o = 0,
            s = !1;
          const a = () => s && !i && r.complete();
          n.subscribe(
            Re(
              r,
              (l) => {
                i?.unsubscribe();
                let u = 0;
                const c = o++;
                jt(e(l, c)).subscribe(
                  (i = Re(
                    r,
                    (d) => r.next(t ? t(l, d, c, u++) : d),
                    () => {
                      (i = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function to(e) {
        return e <= 0
          ? () => Qt
          : Ae((t, n) => {
              let r = 0;
              t.subscribe(
                Re(n, (i) => {
                  ++r <= e && (n.next(i), e <= r && n.complete());
                })
              );
            });
      }
      function Tn(e, t) {
        return Ae((n, r) => {
          let i = 0;
          n.subscribe(Re(r, (o) => e.call(t, o, i++) && r.next(o)));
        });
      }
      function Ks(e) {
        return Ae((t, n) => {
          let r = !1;
          t.subscribe(
            Re(
              n,
              (i) => {
                (r = !0), n.next(i);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function xv(e = Zx) {
        return Ae((t, n) => {
          let r = !1;
          t.subscribe(
            Re(
              n,
              (i) => {
                (r = !0), n.next(i);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function Zx() {
        return new Qs();
      }
      function xn(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? Tn((i, o) => e(i, o, r)) : Pn,
            to(1),
            n ? Ks(t) : xv(() => new Qs())
          );
      }
      function Xn(e, t) {
        return re(t) ? ke(e, t, 1) : ke(e, 1);
      }
      function Be(e, t, n) {
        const r = re(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? Ae((i, o) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              i.subscribe(
                Re(
                  o,
                  (l) => {
                    var u;
                    null === (u = r.next) || void 0 === u || u.call(r, l),
                      o.next(l);
                  },
                  () => {
                    var l;
                    (a = !1),
                      null === (l = r.complete) || void 0 === l || l.call(r),
                      o.complete();
                  },
                  (l) => {
                    var u;
                    (a = !1),
                      null === (u = r.error) || void 0 === u || u.call(r, l),
                      o.error(l);
                  },
                  () => {
                    var l, u;
                    a &&
                      (null === (l = r.unsubscribe) ||
                        void 0 === l ||
                        l.call(r)),
                      null === (u = r.finalize) || void 0 === u || u.call(r);
                  }
                )
              );
            })
          : Pn;
      }
      function An(e) {
        return Ae((t, n) => {
          let o,
            r = null,
            i = !1;
          (r = t.subscribe(
            Re(n, void 0, void 0, (s) => {
              (o = jt(e(s, An(e)(t)))),
                r ? (r.unsubscribe(), (r = null), o.subscribe(n)) : (i = !0);
            })
          )),
            i && (r.unsubscribe(), (r = null), o.subscribe(n));
        });
      }
      function Qx(e, t, n, r, i) {
        return (o, s) => {
          let a = n,
            l = t,
            u = 0;
          o.subscribe(
            Re(
              s,
              (c) => {
                const d = u++;
                (l = a ? e(l, c, d) : ((a = !0), c)), r && s.next(l);
              },
              i &&
                (() => {
                  a && s.next(l), s.complete();
                })
            )
          );
        };
      }
      function Av(e, t) {
        return Ae(Qx(e, t, arguments.length >= 2, !0));
      }
      function Lc(e) {
        return e <= 0
          ? () => Qt
          : Ae((t, n) => {
              let r = [];
              t.subscribe(
                Re(
                  n,
                  (i) => {
                    r.push(i), e < r.length && r.shift();
                  },
                  () => {
                    for (const i of r) n.next(i);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function Rv(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? Tn((i, o) => e(i, o, r)) : Pn,
            Lc(1),
            n ? Ks(t) : xv(() => new Qs())
          );
      }
      function jc(e) {
        return Ae((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      const z = "primary",
        no = Symbol("RouteTitle");
      class Jx {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function qr(e) {
        return new Jx(e);
      }
      function Xx(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const i = {};
        for (let o = 0; o < r.length; o++) {
          const s = r[o],
            a = e[o];
          if (s.startsWith(":")) i[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: i };
      }
      function qt(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let i;
        for (let o = 0; o < n.length; o++)
          if (((i = n[o]), !Nv(e[i], t[i]))) return !1;
        return !0;
      }
      function Nv(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((i, o) => r[o] === i);
        }
        return e === t;
      }
      function kv(e) {
        return Array.prototype.concat.apply([], e);
      }
      function Pv(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Pe(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function Rn(e) {
        return Yp(e) ? e : gs(e) ? Ee(Promise.resolve(e)) : A(e);
      }
      const nA = {
          exact: function Lv(e, t, n) {
            if (
              !tr(e.segments, t.segments) ||
              !Ys(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !Lv(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: jv,
        },
        Fv = {
          exact: function rA(e, t) {
            return qt(e, t);
          },
          subset: function iA(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => Nv(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function Ov(e, t, n) {
        return (
          nA[n.paths](e.root, t.root, n.matrixParams) &&
          Fv[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function jv(e, t, n) {
        return Vv(e, t, t.segments, n);
      }
      function Vv(e, t, n, r) {
        if (e.segments.length > n.length) {
          const i = e.segments.slice(0, n.length);
          return !(!tr(i, n) || t.hasChildren() || !Ys(i, n, r));
        }
        if (e.segments.length === n.length) {
          if (!tr(e.segments, n) || !Ys(e.segments, n, r)) return !1;
          for (const i in t.children)
            if (!e.children[i] || !jv(e.children[i], t.children[i], r))
              return !1;
          return !0;
        }
        {
          const i = n.slice(0, e.segments.length),
            o = n.slice(e.segments.length);
          return (
            !!(tr(e.segments, i) && Ys(e.segments, i, r) && e.children[z]) &&
            Vv(e.children[z], t, o, r)
          );
        }
      }
      function Ys(e, t, n) {
        return t.every((r, i) => Fv[n](e[i].parameters, r.parameters));
      }
      class er {
        constructor(t, n, r) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = qr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return aA.serialize(this);
        }
      }
      class G {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Pe(n, (r, i) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Js(this);
        }
      }
      class ro {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = qr(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return Uv(this);
        }
      }
      function tr(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let $v = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = U({
            token: e,
            factory: function () {
              return new $c();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class $c {
        parse(t) {
          const n = new mA(t);
          return new er(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${io(t.root, !0)}`,
            r = (function cA(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((i) => `${Xs(n)}=${Xs(i)}`).join("&")
                    : `${Xs(n)}=${Xs(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function lA(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const aA = new $c();
      function Js(e) {
        return e.segments.map((t) => Uv(t)).join("/");
      }
      function io(e, t) {
        if (!e.hasChildren()) return Js(e);
        if (t) {
          const n = e.children[z] ? io(e.children[z], !1) : "",
            r = [];
          return (
            Pe(e.children, (i, o) => {
              o !== z && r.push(`${o}:${io(i, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function sA(e, t) {
            let n = [];
            return (
              Pe(e.children, (r, i) => {
                i === z && (n = n.concat(t(r, i)));
              }),
              Pe(e.children, (r, i) => {
                i !== z && (n = n.concat(t(r, i)));
              }),
              n
            );
          })(e, (r, i) =>
            i === z ? [io(e.children[z], !1)] : [`${i}:${io(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[z]
            ? `${Js(e)}/${n[0]}`
            : `${Js(e)}/(${n.join("//")})`;
        }
      }
      function Bv(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Xs(e) {
        return Bv(e).replace(/%3B/gi, ";");
      }
      function Bc(e) {
        return Bv(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function ea(e) {
        return decodeURIComponent(e);
      }
      function Hv(e) {
        return ea(e.replace(/\+/g, "%20"));
      }
      function Uv(e) {
        return `${Bc(e.path)}${(function uA(e) {
          return Object.keys(e)
            .map((t) => `;${Bc(t)}=${Bc(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const dA = /^[^\/()?;=#]+/;
      function ta(e) {
        const t = e.match(dA);
        return t ? t[0] : "";
      }
      const fA = /^[^=?&#]+/,
        pA = /^[^&#]+/;
      class mA {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new G([], {})
              : new G([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[z] = new G(t, n)),
            r
          );
        }
        parseSegment() {
          const t = ta(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new S(4009, !1);
          return this.capture(t), new ro(ea(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = ta(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const i = ta(this.remaining);
            i && ((r = i), this.capture(r));
          }
          t[ea(n)] = ea(r);
        }
        parseQueryParam(t) {
          const n = (function hA(e) {
            const t = e.match(fA);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function gA(e) {
              const t = e.match(pA);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const i = Hv(n),
            o = Hv(r);
          if (t.hasOwnProperty(i)) {
            let s = t[i];
            Array.isArray(s) || ((s = [s]), (t[i] = s)), s.push(o);
          } else t[i] = o;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = ta(this.remaining),
              i = this.remaining[r.length];
            if ("/" !== i && ")" !== i && ";" !== i) throw new S(4010, !1);
            let o;
            r.indexOf(":") > -1
              ? ((o = r.slice(0, r.indexOf(":"))),
                this.capture(o),
                this.capture(":"))
              : t && (o = z);
            const s = this.parseChildren();
            (n[o] = 1 === Object.keys(s).length ? s[z] : new G([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new S(4011, !1);
        }
      }
      function Hc(e) {
        return e.segments.length > 0 ? new G([], { [z]: e }) : e;
      }
      function na(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const o = na(e.children[r]);
          (o.segments.length > 0 || o.hasChildren()) && (t[r] = o);
        }
        return (function yA(e) {
          if (1 === e.numberOfChildren && e.children[z]) {
            const t = e.children[z];
            return new G(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new G(e.segments, t));
      }
      function nr(e) {
        return e instanceof er;
      }
      function wA(e, t, n, r, i) {
        if (0 === n.length) return Zr(t.root, t.root, t.root, r, i);
        const o = (function Wv(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new Gv(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((i, o, s) => {
            if ("object" == typeof o && null != o) {
              if (o.outlets) {
                const a = {};
                return (
                  Pe(o.outlets, (l, u) => {
                    a[u] = "string" == typeof l ? l.split("/") : l;
                  }),
                  [...i, { outlets: a }]
                );
              }
              if (o.segmentPath) return [...i, o.segmentPath];
            }
            return "string" != typeof o
              ? [...i, o]
              : 0 === s
              ? (o.split("/").forEach((a, l) => {
                  (0 == l && "." === a) ||
                    (0 == l && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && i.push(a));
                }),
                i)
              : [...i, o];
          }, []);
          return new Gv(n, t, r);
        })(n);
        return o.toRoot()
          ? Zr(t.root, t.root, new G([], {}), r, i)
          : (function s(l) {
              const u = (function _A(e, t, n, r) {
                  if (e.isAbsolute) return new Qr(t.root, !0, 0);
                  if (-1 === r) return new Qr(n, n === t.root, 0);
                  return (function qv(e, t, n) {
                    let r = e,
                      i = t,
                      o = n;
                    for (; o > i; ) {
                      if (((o -= i), (r = r.parent), !r)) throw new S(4005, !1);
                      i = r.segments.length;
                    }
                    return new Qr(r, !1, i - o);
                  })(n, r + (oo(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
                })(o, t, e.snapshot?._urlSegment, l),
                c = u.processChildren
                  ? ao(u.segmentGroup, u.index, o.commands)
                  : zc(u.segmentGroup, u.index, o.commands);
              return Zr(t.root, u.segmentGroup, c, r, i);
            })(e.snapshot?._lastPathIndex);
      }
      function oo(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function so(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function Zr(e, t, n, r, i) {
        let s,
          o = {};
        r &&
          Pe(r, (l, u) => {
            o[u] = Array.isArray(l) ? l.map((c) => `${c}`) : `${l}`;
          }),
          (s = e === t ? n : zv(e, t, n));
        const a = Hc(na(s));
        return new er(a, o, i);
      }
      function zv(e, t, n) {
        const r = {};
        return (
          Pe(e.children, (i, o) => {
            r[o] = i === t ? n : zv(i, t, n);
          }),
          new G(e.segments, r)
        );
      }
      class Gv {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && oo(r[0]))
          )
            throw new S(4003, !1);
          const i = r.find(so);
          if (i && i !== Pv(r)) throw new S(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Qr {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function zc(e, t, n) {
        if (
          (e || (e = new G([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return ao(e, t, n);
        const r = (function bA(e, t, n) {
            let r = 0,
              i = t;
            const o = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; i < e.segments.length; ) {
              if (r >= n.length) return o;
              const s = e.segments[i],
                a = n[r];
              if (so(a)) break;
              const l = `${a}`,
                u = r < n.length - 1 ? n[r + 1] : null;
              if (i > 0 && void 0 === l) break;
              if (l && u && "object" == typeof u && void 0 === u.outlets) {
                if (!Qv(l, u, s)) return o;
                r += 2;
              } else {
                if (!Qv(l, {}, s)) return o;
                r++;
              }
              i++;
            }
            return { match: !0, pathIndex: i, commandIndex: r };
          })(e, t, n),
          i = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const o = new G(e.segments.slice(0, r.pathIndex), {});
          return (
            (o.children[z] = new G(e.segments.slice(r.pathIndex), e.children)),
            ao(o, 0, i)
          );
        }
        return r.match && 0 === i.length
          ? new G(e.segments, {})
          : r.match && !e.hasChildren()
          ? Gc(e, t, n)
          : r.match
          ? ao(e, 0, i)
          : Gc(e, t, n);
      }
      function ao(e, t, n) {
        if (0 === n.length) return new G(e.segments, {});
        {
          const r = (function EA(e) {
              return so(e[0]) ? e[0].outlets : { [z]: e };
            })(n),
            i = {};
          return (
            Pe(r, (o, s) => {
              "string" == typeof o && (o = [o]),
                null !== o && (i[s] = zc(e.children[s], t, o));
            }),
            Pe(e.children, (o, s) => {
              void 0 === r[s] && (i[s] = o);
            }),
            new G(e.segments, i)
          );
        }
      }
      function Gc(e, t, n) {
        const r = e.segments.slice(0, t);
        let i = 0;
        for (; i < n.length; ) {
          const o = n[i];
          if (so(o)) {
            const l = IA(o.outlets);
            return new G(r, l);
          }
          if (0 === i && oo(n[0])) {
            r.push(new ro(e.segments[t].path, Zv(n[0]))), i++;
            continue;
          }
          const s = so(o) ? o.outlets[z] : `${o}`,
            a = i < n.length - 1 ? n[i + 1] : null;
          s && a && oo(a)
            ? (r.push(new ro(s, Zv(a))), (i += 2))
            : (r.push(new ro(s, {})), i++);
        }
        return new G(r, {});
      }
      function IA(e) {
        const t = {};
        return (
          Pe(e, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = Gc(new G([], {}), 0, n));
          }),
          t
        );
      }
      function Zv(e) {
        const t = {};
        return Pe(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function Qv(e, t, n) {
        return e == n.path && qt(t, n.parameters);
      }
      class hn {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class Wc extends hn {
        constructor(t, n, r = "imperative", i = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = i);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class rr extends hn {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class ra extends hn {
        constructor(t, n, r, i) {
          super(t, n), (this.reason = r), (this.code = i), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Kv extends hn {
        constructor(t, n, r, i) {
          super(t, n), (this.error = r), (this.target = i), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class SA extends hn {
        constructor(t, n, r, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class MA extends hn {
        constructor(t, n, r, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class TA extends hn {
        constructor(t, n, r, i, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.shouldActivate = o),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class xA extends hn {
        constructor(t, n, r, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class AA extends hn {
        constructor(t, n, r, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class RA {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class NA {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class kA {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class PA {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class FA {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class OA {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Yv {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class Jv {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = qc(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = qc(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = Zc(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((i) => i.value)
                .filter((i) => i !== t);
        }
        pathFromRoot(t) {
          return Zc(t, this._root).map((n) => n.value);
        }
      }
      function qc(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = qc(e, n);
          if (r) return r;
        }
        return null;
      }
      function Zc(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = Zc(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class pn {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Kr(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class Xv extends Jv {
        constructor(t, n) {
          super(t), (this.snapshot = n), Qc(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function eD(e, t) {
        const n = (function jA(e, t) {
            const s = new ia([], {}, {}, "", {}, z, t, null, e.root, -1, {});
            return new nD("", new pn(s, []));
          })(e, t),
          r = new Ot([new ro("", {})]),
          i = new Ot({}),
          o = new Ot({}),
          s = new Ot({}),
          a = new Ot(""),
          l = new ir(r, i, s, a, o, z, t, n.root);
        return (l.snapshot = n.root), new Xv(new pn(l, []), n);
      }
      class ir {
        constructor(t, n, r, i, o, s, a, l) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = o),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.pipe(K((u) => u[no])) ?? A(void 0)),
            (this._futureSnapshot = l);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(K((t) => qr(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(K((t) => qr(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function tD(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const i = n[r],
              o = n[r - 1];
            if (i.routeConfig && "" === i.routeConfig.path) r--;
            else {
              if (o.component) break;
              r--;
            }
          }
        return (function VA(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class ia {
        constructor(t, n, r, i, o, s, a, l, u, c, d, h) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = o),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.[no]),
            (this.routeConfig = l),
            (this._urlSegment = u),
            (this._lastPathIndex = c),
            (this._correctedLastPathIndex = h ?? c),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = qr(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = qr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class nD extends Jv {
        constructor(t, n) {
          super(n), (this.url = t), Qc(this, n);
        }
        toString() {
          return rD(this._root);
        }
      }
      function Qc(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => Qc(e, n));
      }
      function rD(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(rD).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function Kc(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            qt(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            qt(t.params, n.params) || e.params.next(n.params),
            (function eA(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!qt(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            qt(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function Yc(e, t) {
        const n =
          qt(e.params, t.params) &&
          (function oA(e, t) {
            return (
              tr(e, t) && e.every((n, r) => qt(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || Yc(e.parent, t.parent))
        );
      }
      function lo(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const i = (function BA(e, t, n) {
            return t.children.map((r) => {
              for (const i of n.children)
                if (e.shouldReuseRoute(r.value, i.value.snapshot))
                  return lo(e, r, i);
              return lo(e, r);
            });
          })(e, t, n);
          return new pn(r, i);
        }
        {
          if (e.shouldAttach(t.value)) {
            const o = e.retrieve(t.value);
            if (null !== o) {
              const s = o.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => lo(e, a))),
                s
              );
            }
          }
          const r = (function HA(e) {
              return new ir(
                new Ot(e.url),
                new Ot(e.params),
                new Ot(e.queryParams),
                new Ot(e.fragment),
                new Ot(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            i = t.children.map((o) => lo(e, o));
          return new pn(r, i);
        }
      }
      const Jc = "ngNavigationCancelingError";
      function iD(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = nr(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          i = oD(!1, 0, t);
        return (i.url = n), (i.navigationBehaviorOptions = r), i;
      }
      function oD(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[Jc] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function sD(e) {
        return aD(e) && nr(e.url);
      }
      function aD(e) {
        return e && e[Jc];
      }
      class UA {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new uo()),
            (this.attachRef = null);
        }
      }
      let uo = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const i = this.getOrCreateContext(n);
            (i.outlet = r), this.contexts.set(n, i);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new UA()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const oa = !1;
      let co = (() => {
        class e {
          constructor(n, r, i, o, s) {
            (this.parentContexts = n),
              (this.location = r),
              (this.changeDetector = o),
              (this.environmentInjector = s),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new Ze()),
              (this.deactivateEvents = new Ze()),
              (this.attachEvents = new Ze()),
              (this.detachEvents = new Ze()),
              (this.name = i || z),
              n.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.getContext(this.name)?.outlet === this &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const n = this.parentContexts.getContext(this.name);
              n &&
                n.route &&
                (n.attachRef
                  ? this.attach(n.attachRef, n.route)
                  : this.activateWith(n.route, n.injector));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new S(4012, oa);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new S(4012, oa);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new S(4012, oa);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new S(4013, oa);
            this._activatedRoute = n;
            const i = this.location,
              s = n._futureSnapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new zA(n, a, i.injector);
            if (
              r &&
              (function GA(e) {
                return !!e.resolveComponentFactory;
              })(r)
            ) {
              const u = r.resolveComponentFactory(s);
              this.activated = i.createComponent(u, i.length, l);
            } else
              this.activated = i.createComponent(s, {
                index: i.length,
                injector: l,
                environmentInjector: r ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(
              T(uo),
              T(Nt),
              (function mi(e) {
                return (function M0(e, t) {
                  if ("class" === t) return e.classes;
                  if ("style" === t) return e.styles;
                  const n = e.attrs;
                  if (n) {
                    const r = n.length;
                    let i = 0;
                    for (; i < r; ) {
                      const o = n[i];
                      if (Cf(o)) break;
                      if (0 === o) i += 2;
                      else if ("number" == typeof o)
                        for (i++; i < r && "string" == typeof n[i]; ) i++;
                      else {
                        if (o === t) return n[i + 1];
                        i += 2;
                      }
                    }
                  }
                  return null;
                })(be(), e);
              })("name"),
              T(ic),
              T(wn)
            );
          }),
          (e.ɵdir = Oe({
            type: e,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
          })),
          e
        );
      })();
      class zA {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === ir
            ? this.route
            : t === uo
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      let Xc = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Ke({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [wm],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && M(0, "router-outlet");
            },
            dependencies: [co],
            encapsulation: 2,
          })),
          e
        );
      })();
      function lD(e, t) {
        return (
          e.providers &&
            !e._injector &&
            (e._injector = Cs(e.providers, t, `Route: ${e.path}`)),
          e._injector ?? t
        );
      }
      function td(e) {
        const t = e.children && e.children.map(td),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== z &&
            (n.component = Xc),
          n
        );
      }
      function Ct(e) {
        return e.outlet || z;
      }
      function uD(e, t) {
        const n = e.filter((r) => Ct(r) === t);
        return n.push(...e.filter((r) => Ct(r) !== t)), n;
      }
      function fo(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class KA {
        constructor(t, n, r, i) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = i);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            Kc(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const i = Kr(n);
          t.children.forEach((o) => {
            const s = o.value.outlet;
            this.deactivateRoutes(o, i[s], r), delete i[s];
          }),
            Pe(i, (o, s) => {
              this.deactivateRouteAndItsChildren(o, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const i = t.value,
            o = n ? n.value : null;
          if (i === o)
            if (i.component) {
              const s = r.getContext(i.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else o && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            i = r && t.value.component ? r.children : n,
            o = Kr(t);
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], i);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            i = r && t.value.component ? r.children : n,
            o = Kr(t);
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], i);
          r &&
            r.outlet &&
            (r.outlet.deactivate(),
            r.children.onOutletDeactivated(),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const i = Kr(n);
          t.children.forEach((o) => {
            this.activateRoutes(o, i[o.value.outlet], r),
              this.forwardEvent(new OA(o.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new PA(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const i = t.value,
            o = n ? n.value : null;
          if ((Kc(i), i === o))
            if (i.component) {
              const s = r.getOrCreateContext(i.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (i.component) {
            const s = r.getOrCreateContext(i.outlet);
            if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(i.snapshot);
              this.routeReuseStrategy.store(i.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                Kc(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = fo(i.snapshot),
                l = a?.get(ki) ?? null;
              (s.attachRef = null),
                (s.route = i),
                (s.resolver = l),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(i, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class cD {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class sa {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function YA(e, t, n) {
        const r = e._root;
        return ho(r, t ? t._root : null, n, [r.value]);
      }
      function Yr(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function xw(e) {
              return null !== Eo(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function ho(
        e,
        t,
        n,
        r,
        i = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const o = Kr(t);
        return (
          e.children.forEach((s) => {
            (function XA(
              e,
              t,
              n,
              r,
              i = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const o = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && o.routeConfig === s.routeConfig) {
                const l = (function eR(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !tr(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !tr(e.url, t.url) || !qt(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !Yc(e, t) || !qt(e.queryParams, t.queryParams);
                    default:
                      return !Yc(e, t);
                  }
                })(s, o, o.routeConfig.runGuardsAndResolvers);
                l
                  ? i.canActivateChecks.push(new cD(r))
                  : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
                  ho(e, t, o.component ? (a ? a.children : null) : n, r, i),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    i.canDeactivateChecks.push(new sa(a.outlet.component, s));
              } else
                s && po(t, a, i),
                  i.canActivateChecks.push(new cD(r)),
                  ho(e, null, o.component ? (a ? a.children : null) : n, r, i);
            })(s, o[s.value.outlet], n, r.concat([s.value]), i),
              delete o[s.value.outlet];
          }),
          Pe(o, (s, a) => po(s, n.getContext(a), i)),
          i
        );
      }
      function po(e, t, n) {
        const r = Kr(e),
          i = e.value;
        Pe(r, (o, s) => {
          po(o, i.component ? (t ? t.children.getContext(s) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new sa(
              i.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              i
            )
          );
      }
      function go(e) {
        return "function" == typeof e;
      }
      function nd(e) {
        return e instanceof Qs || "EmptyError" === e?.name;
      }
      const aa = Symbol("INITIAL_VALUE");
      function Jr() {
        return Wt((e) =>
          Iv(
            e.map((t) =>
              t.pipe(
                to(1),
                (function qx(...e) {
                  const t = oi(e);
                  return Ae((n, r) => {
                    (t ? Fc(e, n, t) : Fc(e, n)).subscribe(r);
                  });
                })(aa)
              )
            )
          ).pipe(
            K((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === aa) return aa;
                  if (!1 === n || n instanceof er) return n;
                }
              return !0;
            }),
            Tn((t) => t !== aa),
            to(1)
          )
        );
      }
      function dD(e) {
        return (function qD(...e) {
          return Sd(e);
        })(
          Be((t) => {
            if (nr(t)) throw iD(0, t);
          }),
          K((t) => !0 === t)
        );
      }
      const rd = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function fD(e, t, n, r, i) {
        const o = id(e, t, n);
        return o.matched
          ? (function yR(e, t, n, r) {
              const i = t.canMatch;
              return i && 0 !== i.length
                ? A(
                    i.map((s) => {
                      const a = Yr(s, e);
                      return Rn(
                        (function sR(e) {
                          return e && go(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(Jr(), dD())
                : A(!0);
            })((r = lD(t, r)), t, n).pipe(K((s) => (!0 === s ? o : { ...rd })))
          : A(o);
      }
      function id(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...rd }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const i = (t.matcher || Xx)(n, e, t);
        if (!i) return { ...rd };
        const o = {};
        Pe(i.posParams, (a, l) => {
          o[l] = a.path;
        });
        const s =
          i.consumed.length > 0
            ? { ...o, ...i.consumed[i.consumed.length - 1].parameters }
            : o;
        return {
          matched: !0,
          consumedSegments: i.consumed,
          remainingSegments: n.slice(i.consumed.length),
          parameters: s,
          positionalParamSegments: i.posParams ?? {},
        };
      }
      function la(e, t, n, r, i = "corrected") {
        if (
          n.length > 0 &&
          (function wR(e, t, n) {
            return n.some((r) => ua(e, t, r) && Ct(r) !== z);
          })(e, n, r)
        ) {
          const s = new G(
            t,
            (function DR(e, t, n, r) {
              const i = {};
              (i[z] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const o of n)
                if ("" === o.path && Ct(o) !== z) {
                  const s = new G([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = t.length),
                    (i[Ct(o)] = s);
                }
              return i;
            })(e, t, r, new G(n, e.children))
          );
          return (
            (s._sourceSegment = e),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function CR(e, t, n) {
            return n.some((r) => ua(e, t, r));
          })(e, n, r)
        ) {
          const s = new G(
            e.segments,
            (function vR(e, t, n, r, i, o) {
              const s = {};
              for (const a of r)
                if (ua(e, n, a) && !i[Ct(a)]) {
                  const l = new G([], {});
                  (l._sourceSegment = e),
                    (l._segmentIndexShift =
                      "legacy" === o ? e.segments.length : t.length),
                    (s[Ct(a)] = l);
                }
              return { ...i, ...s };
            })(e, t, n, r, e.children, i)
          );
          return (
            (s._sourceSegment = e),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: n }
          );
        }
        const o = new G(e.segments, e.children);
        return (
          (o._sourceSegment = e),
          (o._segmentIndexShift = t.length),
          { segmentGroup: o, slicedSegments: n }
        );
      }
      function ua(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function hD(e, t, n, r) {
        return (
          !!(Ct(e) === r || (r !== z && ua(t, n, e))) &&
          ("**" === e.path || id(t, e, n).matched)
        );
      }
      function pD(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      const ca = !1;
      class da {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class gD {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function mo(e) {
        return eo(new da(e));
      }
      function mD(e) {
        return eo(new gD(e));
      }
      class IR {
        constructor(t, n, r, i, o) {
          (this.injector = t),
            (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = i),
            (this.config = o),
            (this.allowRedirects = !0);
        }
        apply() {
          const t = la(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new G(t.segments, t.children);
          return this.expandSegmentGroup(this.injector, this.config, n, z)
            .pipe(
              K((o) =>
                this.createUrlTree(
                  na(o),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              An((o) => {
                if (o instanceof gD)
                  return (this.allowRedirects = !1), this.match(o.urlTree);
                throw o instanceof da ? this.noMatchError(o) : o;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.injector, this.config, t.root, z)
            .pipe(
              K((i) => this.createUrlTree(na(i), t.queryParams, t.fragment))
            )
            .pipe(
              An((i) => {
                throw i instanceof da ? this.noMatchError(i) : i;
              })
            );
        }
        noMatchError(t) {
          return new S(4002, ca);
        }
        createUrlTree(t, n, r) {
          const i = Hc(t);
          return new er(i, n, r);
        }
        expandSegmentGroup(t, n, r, i) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(K((o) => new G([], o)))
            : this.expandSegment(t, r, n, r.segments, i, !0);
        }
        expandChildren(t, n, r) {
          const i = [];
          for (const o of Object.keys(r.children))
            "primary" === o ? i.unshift(o) : i.push(o);
          return Ee(i).pipe(
            Xn((o) => {
              const s = r.children[o],
                a = uD(n, o);
              return this.expandSegmentGroup(t, a, s, o).pipe(
                K((l) => ({ segment: l, outlet: o }))
              );
            }),
            Av((o, s) => ((o[s.outlet] = s.segment), o), {}),
            Rv()
          );
        }
        expandSegment(t, n, r, i, o, s) {
          return Ee(r).pipe(
            Xn((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, i, o, s).pipe(
                An((u) => {
                  if (u instanceof da) return A(null);
                  throw u;
                })
              )
            ),
            xn((a) => !!a),
            An((a, l) => {
              if (nd(a)) return pD(n, i, o) ? A(new G([], {})) : mo(n);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, i, o, s, a) {
          return hD(i, n, o, s)
            ? void 0 === i.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, i, o, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s)
              : mo(n)
            : mo(n);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s) {
          return "**" === i.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, i, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                i,
                o,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, i) {
          const o = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? mD(o)
            : this.lineralizeSegments(r, o).pipe(
                ke((s) => {
                  const a = new G(s, {});
                  return this.expandSegment(t, a, n, s, i, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s) {
          const {
            matched: a,
            consumedSegments: l,
            remainingSegments: u,
            positionalParamSegments: c,
          } = id(n, i, o);
          if (!a) return mo(n);
          const d = this.applyRedirectCommands(l, i.redirectTo, c);
          return i.redirectTo.startsWith("/")
            ? mD(d)
            : this.lineralizeSegments(i, d).pipe(
                ke((h) => this.expandSegment(t, n, r, h.concat(u), s, !1))
              );
        }
        matchSegmentAgainstRoute(t, n, r, i, o) {
          return "**" === r.path
            ? ((t = lD(r, t)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? A({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector,
                      })
                    : this.configLoader.loadChildren(t, r)
                  ).pipe(
                    K(
                      (a) => (
                        (r._loadedRoutes = a.routes),
                        (r._loadedInjector = a.injector),
                        new G(i, {})
                      )
                    )
                  )
                : A(new G(i, {})))
            : fD(n, r, i, t).pipe(
                Wt(
                  ({ matched: s, consumedSegments: a, remainingSegments: l }) =>
                    s
                      ? this.getChildConfig((t = r._injector ?? t), r, i).pipe(
                          ke((c) => {
                            const d = c.injector ?? t,
                              h = c.routes,
                              { segmentGroup: m, slicedSegments: y } = la(
                                n,
                                a,
                                l,
                                h
                              ),
                              v = new G(m.segments, m.children);
                            if (0 === y.length && v.hasChildren())
                              return this.expandChildren(d, h, v).pipe(
                                K((w) => new G(a, w))
                              );
                            if (0 === h.length && 0 === y.length)
                              return A(new G(a, {}));
                            const D = Ct(r) === o;
                            return this.expandSegment(
                              d,
                              v,
                              h,
                              y,
                              D ? z : o,
                              !0
                            ).pipe(
                              K((E) => new G(a.concat(E.segments), E.children))
                            );
                          })
                        )
                      : mo(n)
                )
              );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? A({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? A({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function mR(e, t, n, r) {
                  const i = t.canLoad;
                  return void 0 === i || 0 === i.length
                    ? A(!0)
                    : A(
                        i.map((s) => {
                          const a = Yr(s, e);
                          return Rn(
                            (function nR(e) {
                              return e && go(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(Jr(), dD());
                })(t, n, r).pipe(
                  ke((i) =>
                    i
                      ? this.configLoader.loadChildren(t, n).pipe(
                          Be((o) => {
                            (n._loadedRoutes = o.routes),
                              (n._loadedInjector = o.injector);
                          })
                        )
                      : (function ER(e) {
                          return eo(oD(ca, 3));
                        })()
                  )
                )
            : A({ routes: [], injector: t });
        }
        lineralizeSegments(t, n) {
          let r = [],
            i = n.root;
          for (;;) {
            if (((r = r.concat(i.segments)), 0 === i.numberOfChildren))
              return A(r);
            if (i.numberOfChildren > 1 || !i.children[z])
              return eo(new S(4e3, ca));
            i = i.children[z];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, i) {
          const o = this.createSegmentGroup(t, n.root, r, i);
          return new er(
            o,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Pe(t, (i, o) => {
              if ("string" == typeof i && i.startsWith(":")) {
                const a = i.substring(1);
                r[o] = n[a];
              } else r[o] = i;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, i) {
          const o = this.createSegments(t, n.segments, r, i);
          let s = {};
          return (
            Pe(n.children, (a, l) => {
              s[l] = this.createSegmentGroup(t, a, r, i);
            }),
            new G(o, s)
          );
        }
        createSegments(t, n, r, i) {
          return n.map((o) =>
            o.path.startsWith(":")
              ? this.findPosParam(t, o, i)
              : this.findOrReturn(o, r)
          );
        }
        findPosParam(t, n, r) {
          const i = r[n.path.substring(1)];
          if (!i) throw new S(4001, ca);
          return i;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const i of n) {
            if (i.path === t.path) return n.splice(r), i;
            r++;
          }
          return t;
        }
      }
      class MR {}
      class AR {
        constructor(t, n, r, i, o, s, a, l) {
          (this.injector = t),
            (this.rootComponentType = n),
            (this.config = r),
            (this.urlTree = i),
            (this.url = o),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = a),
            (this.urlSerializer = l);
        }
        recognize() {
          const t = la(
            this.urlTree.root,
            [],
            [],
            this.config.filter((n) => void 0 === n.redirectTo),
            this.relativeLinkResolution
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            z
          ).pipe(
            K((n) => {
              if (null === n) return null;
              const r = new ia(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  z,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                i = new pn(r, n),
                o = new nD(this.url, i);
              return this.inheritParamsAndData(o._root), o;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = tD(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((i) => this.inheritParamsAndData(i));
        }
        processSegmentGroup(t, n, r, i) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, i);
        }
        processChildren(t, n, r) {
          return Ee(Object.keys(r.children)).pipe(
            Xn((i) => {
              const o = r.children[i],
                s = uD(n, i);
              return this.processSegmentGroup(t, s, o, i);
            }),
            Av((i, o) => (i && o ? (i.push(...o), i) : null)),
            (function Kx(e, t = !1) {
              return Ae((n, r) => {
                let i = 0;
                n.subscribe(
                  Re(r, (o) => {
                    const s = e(o, i++);
                    (s || t) && r.next(o), !s && r.complete();
                  })
                );
              });
            })((i) => null !== i),
            Ks(null),
            Rv(),
            K((i) => {
              if (null === i) return null;
              const o = yD(i);
              return (
                (function RR(e) {
                  e.sort((t, n) =>
                    t.value.outlet === z
                      ? -1
                      : n.value.outlet === z
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(o),
                o
              );
            })
          );
        }
        processSegment(t, n, r, i, o) {
          return Ee(n).pipe(
            Xn((s) =>
              this.processSegmentAgainstRoute(s._injector ?? t, s, r, i, o)
            ),
            xn((s) => !!s),
            An((s) => {
              if (nd(s)) return pD(r, i, o) ? A([]) : A(null);
              throw s;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, i, o) {
          if (n.redirectTo || !hD(n, r, i, o)) return A(null);
          let s;
          if ("**" === n.path) {
            const a = i.length > 0 ? Pv(i).parameters : {},
              l = DD(r) + i.length;
            s = A({
              snapshot: new ia(
                i,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                CD(n),
                Ct(n),
                n.component ?? n._loadedComponent ?? null,
                n,
                vD(r),
                l,
                _D(n),
                l
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            s = fD(r, n, i, t).pipe(
              K(
                ({
                  matched: a,
                  consumedSegments: l,
                  remainingSegments: u,
                  parameters: c,
                }) => {
                  if (!a) return null;
                  const d = DD(r) + l.length;
                  return {
                    snapshot: new ia(
                      l,
                      c,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      CD(n),
                      Ct(n),
                      n.component ?? n._loadedComponent ?? null,
                      n,
                      vD(r),
                      d,
                      _D(n),
                      d
                    ),
                    consumedSegments: l,
                    remainingSegments: u,
                  };
                }
              )
            );
          return s.pipe(
            Wt((a) => {
              if (null === a) return A(null);
              const {
                snapshot: l,
                consumedSegments: u,
                remainingSegments: c,
              } = a;
              t = n._injector ?? t;
              const d = n._loadedInjector ?? t,
                h = (function NR(e) {
                  return e.children
                    ? e.children
                    : e.loadChildren
                    ? e._loadedRoutes
                    : [];
                })(n),
                { segmentGroup: m, slicedSegments: y } = la(
                  r,
                  u,
                  c,
                  h.filter((D) => void 0 === D.redirectTo),
                  this.relativeLinkResolution
                );
              if (0 === y.length && m.hasChildren())
                return this.processChildren(d, h, m).pipe(
                  K((D) => (null === D ? null : [new pn(l, D)]))
                );
              if (0 === h.length && 0 === y.length) return A([new pn(l, [])]);
              const v = Ct(n) === o;
              return this.processSegment(d, h, m, y, v ? z : o).pipe(
                K((D) => (null === D ? null : [new pn(l, D)]))
              );
            })
          );
        }
      }
      function kR(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function yD(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!kR(r)) {
            t.push(r);
            continue;
          }
          const i = t.find((o) => r.value.routeConfig === o.value.routeConfig);
          void 0 !== i ? (i.children.push(...r.children), n.add(i)) : t.push(r);
        }
        for (const r of n) {
          const i = yD(r.children);
          t.push(new pn(r.value, i));
        }
        return t.filter((r) => !n.has(r));
      }
      function vD(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function DD(e) {
        let t = e,
          n = t._segmentIndexShift ?? 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment), (n += t._segmentIndexShift ?? 0);
        return n - 1;
      }
      function CD(e) {
        return e.data || {};
      }
      function _D(e) {
        return e.resolve || {};
      }
      function ED(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function od(e) {
        return Wt((t) => {
          const n = e(t);
          return n ? Ee(n).pipe(K(() => t)) : A(t);
        });
      }
      let bD = (() => {
          class e {
            buildTitle(n) {
              let r,
                i = n.root;
              for (; void 0 !== i; )
                (r = this.getResolvedTitleForRoute(i) ?? r),
                  (i = i.children.find((o) => o.outlet === z));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[no];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = U({
              token: e,
              factory: function () {
                return pe(ID);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        ID = (() => {
          class e extends bD {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(_v));
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      class BR {}
      class UR extends class HR {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      } {}
      const ha = new O("", { providedIn: "root", factory: () => ({}) }),
        sd = new O("ROUTES");
      let ad = (() => {
        class e {
          constructor(n, r) {
            (this.injector = n),
              (this.compiler = r),
              (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap());
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return A(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = Rn(n.loadComponent()).pipe(
                Be((o) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = o);
                }),
                jc(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              i = new Tv(r, () => new Lt()).pipe(Oc());
            return this.componentLoaders.set(n, i), i;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return A({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const o = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                K((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let l,
                    u,
                    c = !1;
                  Array.isArray(a)
                    ? (u = a)
                    : ((l = a.create(n).injector),
                      (u = kv(l.get(sd, [], k.Self | k.Optional))));
                  return { routes: u.map(td), injector: l };
                }),
                jc(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new Tv(o, () => new Lt()).pipe(Oc());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(n) {
            return Rn(n()).pipe(
              ke((r) =>
                r instanceof vm || Array.isArray(r)
                  ? A(r)
                  : Ee(this.compiler.compileModuleAsync(r))
              )
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(Tt), R(Qu));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class GR {}
      class WR {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, n) {
          return t;
        }
      }
      function qR(e) {
        throw e;
      }
      function ZR(e, t, n) {
        return t.parse("/");
      }
      const QR = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        KR = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      function MD() {
        const e = pe($v),
          t = pe(uo),
          n = pe(dc),
          r = pe(Tt),
          i = pe(Qu),
          o = pe(sd, { optional: !0 }) ?? [],
          s = pe(ha, { optional: !0 }) ?? {},
          a = pe(ID),
          l = pe(bD, { optional: !0 }),
          u = pe(GR, { optional: !0 }),
          c = pe(BR, { optional: !0 }),
          d = new Fe(null, e, t, n, r, i, kv(o));
        return (
          u && (d.urlHandlingStrategy = u),
          c && (d.routeReuseStrategy = c),
          (d.titleStrategy = l ?? a),
          (function YR(e, t) {
            e.errorHandler && (t.errorHandler = e.errorHandler),
              e.malformedUriErrorHandler &&
                (t.malformedUriErrorHandler = e.malformedUriErrorHandler),
              e.onSameUrlNavigation &&
                (t.onSameUrlNavigation = e.onSameUrlNavigation),
              e.paramsInheritanceStrategy &&
                (t.paramsInheritanceStrategy = e.paramsInheritanceStrategy),
              e.relativeLinkResolution &&
                (t.relativeLinkResolution = e.relativeLinkResolution),
              e.urlUpdateStrategy &&
                (t.urlUpdateStrategy = e.urlUpdateStrategy),
              e.canceledNavigationResolution &&
                (t.canceledNavigationResolution =
                  e.canceledNavigationResolution);
          })(s, d),
          d
        );
      }
      let Fe = (() => {
        class e {
          constructor(n, r, i, o, s, a, l) {
            (this.rootComponentType = n),
              (this.urlSerializer = r),
              (this.rootContexts = i),
              (this.location = o),
              (this.config = l),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new Lt()),
              (this.errorHandler = qR),
              (this.malformedUriErrorHandler = ZR),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.afterPreactivation = () => A(void 0)),
              (this.urlHandlingStrategy = new WR()),
              (this.routeReuseStrategy = new UR()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "corrected"),
              (this.canceledNavigationResolution = "replace"),
              (this.configLoader = s.get(ad)),
              (this.configLoader.onLoadEndListener = (h) =>
                this.triggerEvent(new NA(h))),
              (this.configLoader.onLoadStartListener = (h) =>
                this.triggerEvent(new RA(h))),
              (this.ngModule = s.get(Qn)),
              (this.console = s.get(vS));
            const d = s.get(Te);
            (this.isNgZoneEnabled = d instanceof Te && Te.isInAngularZone()),
              this.resetConfig(l),
              (this.currentUrlTree = (function tA() {
                return new er(new G([], {}), {}, null);
              })()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = eD(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new Ot({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          get browserPageId() {
            return this.location.getState()?.ɵrouterPageId;
          }
          setupNavigations(n) {
            const r = this.events;
            return n.pipe(
              Tn((i) => 0 !== i.id),
              K((i) => ({
                ...i,
                extractedUrl: this.urlHandlingStrategy.extract(i.rawUrl),
              })),
              Wt((i) => {
                let o = !1,
                  s = !1;
                return A(i).pipe(
                  Be((a) => {
                    this.currentNavigation = {
                      id: a.id,
                      initialUrl: a.rawUrl,
                      extractedUrl: a.extractedUrl,
                      trigger: a.source,
                      extras: a.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? {
                            ...this.lastSuccessfulNavigation,
                            previousNavigation: null,
                          }
                        : null,
                    };
                  }),
                  Wt((a) => {
                    const l = this.browserUrlTree.toString(),
                      u =
                        !this.navigated ||
                        a.extractedUrl.toString() !== l ||
                        l !== this.currentUrlTree.toString();
                    if (
                      ("reload" === this.onSameUrlNavigation || u) &&
                      this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl)
                    )
                      return (
                        TD(a.source) && (this.browserUrlTree = a.extractedUrl),
                        A(a).pipe(
                          Wt((d) => {
                            const h = this.transitions.getValue();
                            return (
                              r.next(
                                new Wc(
                                  d.id,
                                  this.serializeUrl(d.extractedUrl),
                                  d.source,
                                  d.restoredState
                                )
                              ),
                              h !== this.transitions.getValue()
                                ? Qt
                                : Promise.resolve(d)
                            );
                          }),
                          (function SR(e, t, n, r) {
                            return Wt((i) =>
                              (function bR(e, t, n, r, i) {
                                return new IR(e, t, n, r, i).apply();
                              })(e, t, n, i.extractedUrl, r).pipe(
                                K((o) => ({ ...i, urlAfterRedirects: o }))
                              )
                            );
                          })(
                            this.ngModule.injector,
                            this.configLoader,
                            this.urlSerializer,
                            this.config
                          ),
                          Be((d) => {
                            (this.currentNavigation = {
                              ...this.currentNavigation,
                              finalUrl: d.urlAfterRedirects,
                            }),
                              (i.urlAfterRedirects = d.urlAfterRedirects);
                          }),
                          (function FR(e, t, n, r, i, o) {
                            return ke((s) =>
                              (function xR(
                                e,
                                t,
                                n,
                                r,
                                i,
                                o,
                                s = "emptyOnly",
                                a = "legacy"
                              ) {
                                return new AR(e, t, n, r, i, s, a, o)
                                  .recognize()
                                  .pipe(
                                    Wt((l) =>
                                      null === l
                                        ? (function TR(e) {
                                            return new _e((t) => t.error(e));
                                          })(new MR())
                                        : A(l)
                                    )
                                  );
                              })(
                                e,
                                t,
                                n,
                                s.urlAfterRedirects,
                                r.serialize(s.urlAfterRedirects),
                                r,
                                i,
                                o
                              ).pipe(K((a) => ({ ...s, targetSnapshot: a })))
                            );
                          })(
                            this.ngModule.injector,
                            this.rootComponentType,
                            this.config,
                            this.urlSerializer,
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          Be((d) => {
                            if (
                              ((i.targetSnapshot = d.targetSnapshot),
                              "eager" === this.urlUpdateStrategy)
                            ) {
                              if (!d.extras.skipLocationChange) {
                                const m = this.urlHandlingStrategy.merge(
                                  d.urlAfterRedirects,
                                  d.rawUrl
                                );
                                this.setBrowserUrl(m, d);
                              }
                              this.browserUrlTree = d.urlAfterRedirects;
                            }
                            const h = new SA(
                              d.id,
                              this.serializeUrl(d.extractedUrl),
                              this.serializeUrl(d.urlAfterRedirects),
                              d.targetSnapshot
                            );
                            r.next(h);
                          })
                        )
                      );
                    if (
                      u &&
                      this.rawUrlTree &&
                      this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                    ) {
                      const {
                          id: h,
                          extractedUrl: m,
                          source: y,
                          restoredState: v,
                          extras: D,
                        } = a,
                        _ = new Wc(h, this.serializeUrl(m), y, v);
                      r.next(_);
                      const E = eD(m, this.rootComponentType).snapshot;
                      return A(
                        (i = {
                          ...a,
                          targetSnapshot: E,
                          urlAfterRedirects: m,
                          extras: {
                            ...D,
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          },
                        })
                      );
                    }
                    return (this.rawUrlTree = a.rawUrl), a.resolve(null), Qt;
                  }),
                  Be((a) => {
                    const l = new MA(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    );
                    this.triggerEvent(l);
                  }),
                  K(
                    (a) =>
                      (i = {
                        ...a,
                        guards: YA(
                          a.targetSnapshot,
                          a.currentSnapshot,
                          this.rootContexts
                        ),
                      })
                  ),
                  (function lR(e, t) {
                    return ke((n) => {
                      const {
                        targetSnapshot: r,
                        currentSnapshot: i,
                        guards: {
                          canActivateChecks: o,
                          canDeactivateChecks: s,
                        },
                      } = n;
                      return 0 === s.length && 0 === o.length
                        ? A({ ...n, guardsResult: !0 })
                        : (function uR(e, t, n, r) {
                            return Ee(e).pipe(
                              ke((i) =>
                                (function gR(e, t, n, r, i) {
                                  const o =
                                    t && t.routeConfig
                                      ? t.routeConfig.canDeactivate
                                      : null;
                                  return o && 0 !== o.length
                                    ? A(
                                        o.map((a) => {
                                          const l = fo(t) ?? i,
                                            u = Yr(a, l);
                                          return Rn(
                                            (function oR(e) {
                                              return e && go(e.canDeactivate);
                                            })(u)
                                              ? u.canDeactivate(e, t, n, r)
                                              : l.runInContext(() =>
                                                  u(e, t, n, r)
                                                )
                                          ).pipe(xn());
                                        })
                                      ).pipe(Jr())
                                    : A(!0);
                                })(i.component, i.route, n, t, r)
                              ),
                              xn((i) => !0 !== i, !0)
                            );
                          })(s, r, i, e).pipe(
                            ke((a) =>
                              a &&
                              (function tR(e) {
                                return "boolean" == typeof e;
                              })(a)
                                ? (function cR(e, t, n, r) {
                                    return Ee(t).pipe(
                                      Xn((i) =>
                                        Fc(
                                          (function fR(e, t) {
                                            return (
                                              null !== e && t && t(new kA(e)),
                                              A(!0)
                                            );
                                          })(i.route.parent, r),
                                          (function dR(e, t) {
                                            return (
                                              null !== e && t && t(new FA(e)),
                                              A(!0)
                                            );
                                          })(i.route, r),
                                          (function pR(e, t, n) {
                                            const r = t[t.length - 1],
                                              o = t
                                                .slice(0, t.length - 1)
                                                .reverse()
                                                .map((s) =>
                                                  (function JA(e) {
                                                    const t = e.routeConfig
                                                      ? e.routeConfig
                                                          .canActivateChild
                                                      : null;
                                                    return t && 0 !== t.length
                                                      ? { node: e, guards: t }
                                                      : null;
                                                  })(s)
                                                )
                                                .filter((s) => null !== s)
                                                .map((s) =>
                                                  Mv(() =>
                                                    A(
                                                      s.guards.map((l) => {
                                                        const u =
                                                            fo(s.node) ?? n,
                                                          c = Yr(l, u);
                                                        return Rn(
                                                          (function iR(e) {
                                                            return (
                                                              e &&
                                                              go(
                                                                e.canActivateChild
                                                              )
                                                            );
                                                          })(c)
                                                            ? c.canActivateChild(
                                                                r,
                                                                e
                                                              )
                                                            : u.runInContext(
                                                                () => c(r, e)
                                                              )
                                                        ).pipe(xn());
                                                      })
                                                    ).pipe(Jr())
                                                  )
                                                );
                                            return A(o).pipe(Jr());
                                          })(e, i.path, n),
                                          (function hR(e, t, n) {
                                            const r = t.routeConfig
                                              ? t.routeConfig.canActivate
                                              : null;
                                            if (!r || 0 === r.length)
                                              return A(!0);
                                            const i = r.map((o) =>
                                              Mv(() => {
                                                const s = fo(t) ?? n,
                                                  a = Yr(o, s);
                                                return Rn(
                                                  (function rR(e) {
                                                    return (
                                                      e && go(e.canActivate)
                                                    );
                                                  })(a)
                                                    ? a.canActivate(t, e)
                                                    : s.runInContext(() =>
                                                        a(t, e)
                                                      )
                                                ).pipe(xn());
                                              })
                                            );
                                            return A(i).pipe(Jr());
                                          })(e, i.route, n)
                                        )
                                      ),
                                      xn((i) => !0 !== i, !0)
                                    );
                                  })(r, o, e, t)
                                : A(a)
                            ),
                            K((a) => ({ ...n, guardsResult: a }))
                          );
                    });
                  })(this.ngModule.injector, (a) => this.triggerEvent(a)),
                  Be((a) => {
                    if (((i.guardsResult = a.guardsResult), nr(a.guardsResult)))
                      throw iD(0, a.guardsResult);
                    const l = new TA(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot,
                      !!a.guardsResult
                    );
                    this.triggerEvent(l);
                  }),
                  Tn(
                    (a) =>
                      !!a.guardsResult ||
                      (this.restoreHistory(a),
                      this.cancelNavigationTransition(a, "", 3),
                      !1)
                  ),
                  od((a) => {
                    if (a.guards.canActivateChecks.length)
                      return A(a).pipe(
                        Be((l) => {
                          const u = new xA(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(u);
                        }),
                        Wt((l) => {
                          let u = !1;
                          return A(l).pipe(
                            (function OR(e, t) {
                              return ke((n) => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: i },
                                } = n;
                                if (!i.length) return A(n);
                                let o = 0;
                                return Ee(i).pipe(
                                  Xn((s) =>
                                    (function LR(e, t, n, r) {
                                      const i = e.routeConfig,
                                        o = e._resolve;
                                      return (
                                        void 0 !== i?.title &&
                                          !ED(i) &&
                                          (o[no] = i.title),
                                        (function jR(e, t, n, r) {
                                          const i = (function VR(e) {
                                            return [
                                              ...Object.keys(e),
                                              ...Object.getOwnPropertySymbols(
                                                e
                                              ),
                                            ];
                                          })(e);
                                          if (0 === i.length) return A({});
                                          const o = {};
                                          return Ee(i).pipe(
                                            ke((s) =>
                                              (function $R(e, t, n, r) {
                                                const i = fo(t) ?? r,
                                                  o = Yr(e, i);
                                                return Rn(
                                                  o.resolve
                                                    ? o.resolve(t, n)
                                                    : i.runInContext(() =>
                                                        o(t, n)
                                                      )
                                                );
                                              })(e[s], t, n, r).pipe(
                                                xn(),
                                                Be((a) => {
                                                  o[s] = a;
                                                })
                                              )
                                            ),
                                            Lc(1),
                                            (function Yx(e) {
                                              return K(() => e);
                                            })(o),
                                            An((s) => (nd(s) ? Qt : eo(s)))
                                          );
                                        })(o, e, t, r).pipe(
                                          K(
                                            (s) => (
                                              (e._resolvedData = s),
                                              (e.data = tD(e, n).resolve),
                                              i &&
                                                ED(i) &&
                                                (e.data[no] = i.title),
                                              null
                                            )
                                          )
                                        )
                                      );
                                    })(s.route, r, e, t)
                                  ),
                                  Be(() => o++),
                                  Lc(1),
                                  ke((s) => (o === i.length ? A(n) : Qt))
                                );
                              });
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            Be({
                              next: () => (u = !0),
                              complete: () => {
                                u ||
                                  (this.restoreHistory(l),
                                  this.cancelNavigationTransition(l, "", 2));
                              },
                            })
                          );
                        }),
                        Be((l) => {
                          const u = new AA(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(u);
                        })
                      );
                  }),
                  od((a) => {
                    const l = (u) => {
                      const c = [];
                      u.routeConfig?.loadComponent &&
                        !u.routeConfig._loadedComponent &&
                        c.push(
                          this.configLoader.loadComponent(u.routeConfig).pipe(
                            Be((d) => {
                              u.component = d;
                            }),
                            K(() => {})
                          )
                        );
                      for (const d of u.children) c.push(...l(d));
                      return c;
                    };
                    return Iv(l(a.targetSnapshot.root)).pipe(Ks(), to(1));
                  }),
                  od(() => this.afterPreactivation()),
                  K((a) => {
                    const l = (function $A(e, t, n) {
                      const r = lo(e, t._root, n ? n._root : void 0);
                      return new Xv(r, t);
                    })(
                      this.routeReuseStrategy,
                      a.targetSnapshot,
                      a.currentRouterState
                    );
                    return (i = { ...a, targetRouterState: l });
                  }),
                  Be((a) => {
                    (this.currentUrlTree = a.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        a.urlAfterRedirects,
                        a.rawUrl
                      )),
                      (this.routerState = a.targetRouterState),
                      "deferred" === this.urlUpdateStrategy &&
                        (a.extras.skipLocationChange ||
                          this.setBrowserUrl(this.rawUrlTree, a),
                        (this.browserUrlTree = a.urlAfterRedirects));
                  }),
                  ((e, t, n) =>
                    K(
                      (r) => (
                        new KA(
                          t,
                          r.targetRouterState,
                          r.currentRouterState,
                          n
                        ).activate(e),
                        r
                      )
                    ))(this.rootContexts, this.routeReuseStrategy, (a) =>
                    this.triggerEvent(a)
                  ),
                  Be({
                    next() {
                      o = !0;
                    },
                    complete() {
                      o = !0;
                    },
                  }),
                  jc(() => {
                    o || s || this.cancelNavigationTransition(i, "", 1),
                      this.currentNavigation?.id === i.id &&
                        (this.currentNavigation = null);
                  }),
                  An((a) => {
                    if (((s = !0), aD(a))) {
                      sD(a) ||
                        ((this.navigated = !0), this.restoreHistory(i, !0));
                      const l = new ra(
                        i.id,
                        this.serializeUrl(i.extractedUrl),
                        a.message,
                        a.cancellationCode
                      );
                      if ((r.next(l), sD(a))) {
                        const u = this.urlHandlingStrategy.merge(
                            a.url,
                            this.rawUrlTree
                          ),
                          c = {
                            skipLocationChange: i.extras.skipLocationChange,
                            replaceUrl:
                              "eager" === this.urlUpdateStrategy ||
                              TD(i.source),
                          };
                        this.scheduleNavigation(u, "imperative", null, c, {
                          resolve: i.resolve,
                          reject: i.reject,
                          promise: i.promise,
                        });
                      } else i.resolve(!1);
                    } else {
                      this.restoreHistory(i, !0);
                      const l = new Kv(
                        i.id,
                        this.serializeUrl(i.extractedUrl),
                        a,
                        i.targetSnapshot ?? void 0
                      );
                      r.next(l);
                      try {
                        i.resolve(this.errorHandler(a));
                      } catch (u) {
                        i.reject(u);
                      }
                    }
                    return Qt;
                  })
                );
              })
            );
          }
          resetRootComponentType(n) {
            (this.rootComponentType = n),
              (this.routerState.root.component = this.rootComponentType);
          }
          setTransition(n) {
            this.transitions.next({ ...this.transitions.value, ...n });
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId &&
                this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    const i = { replaceUrl: !0 },
                      o = n.state?.navigationId ? n.state : null;
                    if (o) {
                      const a = { ...o };
                      delete a.navigationId,
                        delete a.ɵrouterPageId,
                        0 !== Object.keys(a).length && (i.state = a);
                    }
                    const s = this.parseUrl(n.url);
                    this.scheduleNavigation(s, r, o, i);
                  }, 0);
              }));
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.currentNavigation;
          }
          triggerEvent(n) {
            this.events.next(n);
          }
          resetConfig(n) {
            (this.config = n.map(td)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.transitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: i,
                queryParams: o,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: l,
              } = r,
              u = i || this.routerState.root,
              c = l ? this.currentUrlTree.fragment : s;
            let d = null;
            switch (a) {
              case "merge":
                d = { ...this.currentUrlTree.queryParams, ...o };
                break;
              case "preserve":
                d = this.currentUrlTree.queryParams;
                break;
              default:
                d = o || null;
            }
            return (
              null !== d && (d = this.removeEmptyProps(d)),
              wA(u, this.currentUrlTree, n, d, c ?? null)
            );
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const i = nr(n) ? n : this.parseUrl(n),
              o = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
            return this.scheduleNavigation(o, "imperative", null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function JR(e) {
                for (let t = 0; t < e.length; t++) {
                  if (null == e[t]) throw new S(4008, false);
                }
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (i) {
              r = this.malformedUriErrorHandler(i, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let i;
            if (((i = !0 === r ? { ...QR } : !1 === r ? { ...KR } : r), nr(n)))
              return Ov(this.currentUrlTree, n, i);
            const o = this.parseUrl(n);
            return Ov(this.currentUrlTree, o, i);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, i) => {
              const o = n[i];
              return null != o && (r[i] = o), r;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              (n) => {
                (this.navigated = !0),
                  (this.lastSuccessfulId = n.id),
                  (this.currentPageId = n.targetPageId),
                  this.events.next(
                    new rr(
                      n.id,
                      this.serializeUrl(n.extractedUrl),
                      this.serializeUrl(this.currentUrlTree)
                    )
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  this.titleStrategy?.updateTitle(this.routerState.snapshot),
                  n.resolve(!0);
              },
              (n) => {
                this.console.warn(`Unhandled Navigation Error: ${n}`);
              }
            );
          }
          scheduleNavigation(n, r, i, o, s) {
            if (this.disposed) return Promise.resolve(!1);
            let a, l, u;
            s
              ? ((a = s.resolve), (l = s.reject), (u = s.promise))
              : (u = new Promise((h, m) => {
                  (a = h), (l = m);
                }));
            const c = ++this.navigationId;
            let d;
            return (
              "computed" === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (i = this.location.getState()),
                  (d =
                    i && i.ɵrouterPageId
                      ? i.ɵrouterPageId
                      : o.replaceUrl || o.skipLocationChange
                      ? this.browserPageId ?? 0
                      : (this.browserPageId ?? 0) + 1))
                : (d = 0),
              this.setTransition({
                id: c,
                targetPageId: d,
                source: r,
                restoredState: i,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: n,
                extras: o,
                resolve: a,
                reject: l,
                promise: u,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              u.catch((h) => Promise.reject(h))
            );
          }
          setBrowserUrl(n, r) {
            const i = this.urlSerializer.serialize(n),
              o = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, r.targetPageId),
              };
            this.location.isCurrentPathEqualTo(i) || r.extras.replaceUrl
              ? this.location.replaceState(i, "", o)
              : this.location.go(i, "", o);
          }
          restoreHistory(n, r = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const i = this.currentPageId - n.targetPageId;
              ("popstate" !== n.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !== this.currentNavigation?.finalUrl) ||
              0 === i
                ? this.currentUrlTree === this.currentNavigation?.finalUrl &&
                  0 === i &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(i);
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          cancelNavigationTransition(n, r, i) {
            const o = new ra(n.id, this.serializeUrl(n.extractedUrl), r, i);
            this.triggerEvent(o), n.resolve(!1);
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
        }
        return (
          (e.ɵfac = function (n) {
            Zl();
          }),
          (e.ɵprov = U({
            token: e,
            factory: function () {
              return MD();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      function TD(e) {
        return "imperative" !== e;
      }
      let Xr = (() => {
        class e {
          constructor(n, r, i) {
            (this.router = n),
              (this.route = r),
              (this.locationStrategy = i),
              (this._preserveFragment = !1),
              (this._skipLocationChange = !1),
              (this._replaceUrl = !1),
              (this.commands = null),
              (this.href = null),
              (this.onChanges = new Lt()),
              (this.subscription = n.events.subscribe((o) => {
                o instanceof rr && this.updateTargetUrlAndHref();
              }));
          }
          set preserveFragment(n) {
            this._preserveFragment = Wr(n);
          }
          get preserveFragment() {
            return this._preserveFragment;
          }
          set skipLocationChange(n) {
            this._skipLocationChange = Wr(n);
          }
          get skipLocationChange() {
            return this._skipLocationChange;
          }
          set replaceUrl(n) {
            this._replaceUrl = Wr(n);
          }
          get replaceUrl() {
            return this._replaceUrl;
          }
          set routerLink(n) {
            this.commands = null != n ? (Array.isArray(n) ? n : [n]) : null;
          }
          ngOnChanges(n) {
            this.updateTargetUrlAndHref(), this.onChanges.next(this);
          }
          ngOnDestroy() {
            this.subscription.unsubscribe();
          }
          onClick(n, r, i, o, s) {
            return (
              !!(
                0 !== n ||
                r ||
                i ||
                o ||
                s ||
                ("string" == typeof this.target && "_self" != this.target) ||
                null === this.urlTree
              ) ||
              (this.router.navigateByUrl(this.urlTree, {
                skipLocationChange: this.skipLocationChange,
                replaceUrl: this.replaceUrl,
                state: this.state,
              }),
              !1)
            );
          }
          updateTargetUrlAndHref() {
            this.href =
              null !== this.urlTree
                ? this.locationStrategy.prepareExternalUrl(
                    this.router.serializeUrl(this.urlTree)
                  )
                : null;
          }
          get urlTree() {
            return null === this.commands
              ? null
              : this.router.createUrlTree(this.commands, {
                  relativeTo:
                    void 0 !== this.relativeTo ? this.relativeTo : this.route,
                  queryParams: this.queryParams,
                  fragment: this.fragment,
                  queryParamsHandling: this.queryParamsHandling,
                  preserveFragment: this.preserveFragment,
                });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(Fe), T(ir), T(Yn));
          }),
          (e.ɵdir = Oe({
            type: e,
            selectors: [
              ["a", "routerLink", ""],
              ["area", "routerLink", ""],
            ],
            hostVars: 2,
            hostBindings: function (n, r) {
              1 & n &&
                et("click", function (o) {
                  return r.onClick(
                    o.button,
                    o.ctrlKey,
                    o.shiftKey,
                    o.altKey,
                    o.metaKey
                  );
                }),
                2 & n && Du("target", r.target)("href", r.href, nn);
            },
            inputs: {
              target: "target",
              queryParams: "queryParams",
              fragment: "fragment",
              queryParamsHandling: "queryParamsHandling",
              state: "state",
              relativeTo: "relativeTo",
              preserveFragment: "preserveFragment",
              skipLocationChange: "skipLocationChange",
              replaceUrl: "replaceUrl",
              routerLink: "routerLink",
            },
            standalone: !0,
            features: [Bn],
          })),
          e
        );
      })();
      class xD {}
      let tN = (() => {
        class e {
          constructor(n, r, i, o, s) {
            (this.router = n),
              (this.injector = i),
              (this.preloadingStrategy = o),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                Tn((n) => n instanceof rr),
                Xn(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const i = [];
            for (const o of r) {
              o.providers &&
                !o._injector &&
                (o._injector = Cs(o.providers, n, `Route: ${o.path}`));
              const s = o._injector ?? n,
                a = o._loadedInjector ?? s;
              (o.loadChildren && !o._loadedRoutes && void 0 === o.canLoad) ||
              (o.loadComponent && !o._loadedComponent)
                ? i.push(this.preloadConfig(s, o))
                : (o.children || o._loadedRoutes) &&
                  i.push(this.processRoutes(a, o.children ?? o._loadedRoutes));
            }
            return Ee(i).pipe(sr());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let i;
              i =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : A(null);
              const o = i.pipe(
                ke((s) =>
                  null === s
                    ? A(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? n, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? Ee([o, this.loader.loadComponent(r)]).pipe(sr())
                : o;
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(Fe), R(Qu), R(wn), R(xD), R(ad));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const ud = new O("");
      let AD = (() => {
        class e {
          constructor(n, r, i = {}) {
            (this.router = n),
              (this.viewportScroller = r),
              (this.options = i),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (i.scrollPositionRestoration =
                i.scrollPositionRestoration || "disabled"),
              (i.anchorScrolling = i.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.router.events.subscribe((n) => {
              n instanceof Wc
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof rr &&
                  ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.router.parseUrl(n.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.router.events.subscribe((n) => {
              n instanceof Yv &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.router.triggerEvent(
              new Yv(
                n,
                "popstate" === this.lastSource
                  ? this.store[this.restoredId]
                  : null,
                r
              )
            );
          }
          ngOnDestroy() {
            this.routerEventsSubscription &&
              this.routerEventsSubscription.unsubscribe(),
              this.scrollEventsSubscription &&
                this.scrollEventsSubscription.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            Zl();
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function ei(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function cd(e) {
        return [{ provide: sd, multi: !0, useValue: e }];
      }
      function ND() {
        const e = pe(Tt);
        return (t) => {
          const n = e.get(Ts);
          if (t !== n.components[0]) return;
          const r = e.get(Fe),
            i = e.get(kD);
          1 === e.get(dd) && r.initialNavigation(),
            e.get(PD, null, k.Optional)?.setUpPreloading(),
            e.get(ud, null, k.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            i.closed || (i.next(), i.unsubscribe());
        };
      }
      const kD = new O("", { factory: () => new Lt() }),
        dd = new O("", { providedIn: "root", factory: () => 1 });
      const PD = new O("");
      function oN(e) {
        return ei(0, [
          { provide: PD, useExisting: tN },
          { provide: xD, useExisting: e },
        ]);
      }
      const FD = new O("ROUTER_FORROOT_GUARD"),
        sN = [
          dc,
          { provide: $v, useClass: $c },
          { provide: Fe, useFactory: MD },
          uo,
          {
            provide: ir,
            useFactory: function RD(e) {
              return e.routerState.root;
            },
            deps: [Fe],
          },
          ad,
        ];
      function aN() {
        return new py("Router", Fe);
      }
      let ti = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                sN,
                [],
                cd(n),
                {
                  provide: FD,
                  useFactory: dN,
                  deps: [[Fe, new Ei(), new bi()]],
                },
                { provide: ha, useValue: r || {} },
                r?.useHash
                  ? { provide: Yn, useClass: sM }
                  : { provide: Yn, useClass: Vy },
                {
                  provide: ud,
                  useFactory: () => {
                    const e = pe(Fe),
                      t = pe(MT),
                      n = pe(ha);
                    return (
                      n.scrollOffset && t.setOffset(n.scrollOffset),
                      new AD(e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? oN(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: py, multi: !0, useFactory: aN },
                r?.initialNavigation ? fN(r) : [],
                [
                  { provide: OD, useFactory: ND },
                  { provide: ay, multi: !0, useExisting: OD },
                ],
              ],
            };
          }
          static forChild(n) {
            return { ngModule: e, providers: [cd(n)] };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(FD, 8));
          }),
          (e.ɵmod = Et({ type: e })),
          (e.ɵinj = pt({ imports: [Xc] })),
          e
        );
      })();
      function dN(e) {
        return "guarded";
      }
      function fN(e) {
        return [
          "disabled" === e.initialNavigation
            ? ei(3, [
                {
                  provide: Is,
                  multi: !0,
                  useFactory: () => {
                    const t = pe(Fe);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: dd, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? ei(2, [
                { provide: dd, useValue: 0 },
                {
                  provide: Is,
                  multi: !0,
                  deps: [Tt],
                  useFactory: (t) => {
                    const n = t.get(iM, Promise.resolve());
                    let r = !1;
                    return () =>
                      n.then(
                        () =>
                          new Promise((o) => {
                            const s = t.get(Fe),
                              a = t.get(kD);
                            (function i(o) {
                              t.get(Fe)
                                .events.pipe(
                                  Tn(
                                    (a) =>
                                      a instanceof rr ||
                                      a instanceof ra ||
                                      a instanceof Kv
                                  ),
                                  K(
                                    (a) =>
                                      a instanceof rr ||
                                      (a instanceof ra &&
                                        (0 === a.code || 1 === a.code) &&
                                        null)
                                  ),
                                  Tn((a) => null !== a),
                                  to(1)
                                )
                                .subscribe(() => {
                                  o();
                                });
                            })(() => {
                              o(!0), (r = !0);
                            }),
                              (s.afterPreactivation = () => (
                                o(!0), r || a.closed ? A(void 0) : a
                              )),
                              s.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const OD = new O("");
      let pN = (() => {
        class e {
          constructor() {}
          ngOnInit() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Ke({
            type: e,
            selectors: [["app-home"]],
            decls: 295,
            vars: 0,
            consts: [
              [1, "hero-section"],
              [1, "wrapper"],
              [1, "wrapper-shadow"],
              ["id", "img-layering"],
              [1, "hero-msg"],
              [1, "hero--title"],
              [1, "accent-clr"],
              ["href", "#", 1, "hero-btn"],
              [1, "pack-section", "discover"],
              [1, "tour-feature", "packages"],
              [1, "section-heading", "w-80"],
              [1, "section-para"],
              [1, "tour-block"],
              [
                "src",
                "../assets/Images/Around the Globe.png",
                "alt",
                "Globe",
                1,
                "tour-globe-img",
              ],
              [1, "tour-data"],
              [1, "section-heading"],
              [1, "section-para", "foot-link"],
              [1, "pack-section"],
              [1, "packages", "pop-att"],
              [1, "section-btns"],
              ["href", "#", 1, "btn-link", "active"],
              ["href", "#", 1, "btn-link"],
              [1, "pack-cards"],
              [1, "card"],
              [
                "src",
                "../assets/Images/Jaipur/Amber Fort.jpg",
                "alt",
                "Amber Fort",
                1,
                "pack-img",
              ],
              [1, "card-pad"],
              [1, "card-title"],
              [1, "card-para"],
              [1, "tour-days"],
              [1, "tour-det"],
              [1, "tour-price"],
              ["href", "#", 1, "explore-btn"],
              [
                "src",
                "../assets/Images/Jaipur/jal mahal.jpeg",
                "alt",
                "Jal Mahal",
                1,
                "pack-img",
              ],
              [
                "src",
                "../assets/Images/Jaipur/hawa mahal.jpg",
                "alt",
                "Hawa Mahal",
                1,
                "pack-img",
              ],
              [
                "src",
                "../assets/Images/kerala blackwaters.jpg",
                "alt",
                "Hawa Mahal",
                1,
                "pack-img",
              ],
              [1, "pop-pack", "packages"],
              [
                "src",
                "../assets/Images/Jaipur.jpg",
                "alt",
                "Jaipur",
                1,
                "pack-img",
              ],
              [1, "tour-offers"],
              [1, "offer"],
              [
                "src",
                "../assets/Images/kerala.jpg",
                "alt",
                "Kerala",
                1,
                "pack-img",
              ],
              ["src", "../assets/Images/goa.jpg", "alt", "Goa", 1, "pack-img"],
              [
                "src",
                "../assets/Images/rajasthan.jpg",
                "alt",
                "Goa",
                1,
                "pack-img",
              ],
              [1, "footer", "body-font"],
              [
                1,
                "container",
                "px-5",
                "py-24",
                "mx-auto",
                "flex",
                "md:items-center",
                "lg:items-start",
                "md:flex-row",
                "md:flex-nowrap",
                "flex-wrap",
                "flex-col",
              ],
              [
                1,
                "w-64",
                "flex-shrink-0",
                "md:mx-0",
                "mx-auto",
                "text-center",
                "md:text-left",
              ],
              [
                1,
                "flex",
                "title-font",
                "font-medium",
                "items-center",
                "md:justify-start",
                "justify-center",
              ],
              [
                "src",
                "../assets/Images/logo.png",
                "alt",
                "Logo",
                1,
                "footer-logo",
                "w-12",
              ],
              [1, "ml-3", "text-xl"],
              [
                1,
                "flex-grow",
                "flex",
                "flex-wrap",
                "md:pl-20",
                "-mb-10",
                "md:mt-0",
                "mt-10",
                "md:text-left",
                "justify-end",
                "text-center",
              ],
              [1, "lg:w-1/4", "md:w-1/2", "w-full", "px-4"],
              [1, "foot-heading"],
              [1, "list-none", "mb-10"],
              [1, "section-para", "flex-wrapper", "foot-link"],
              [
                "src",
                "../assets/Images/Location.png",
                "alt",
                "Location",
                1,
                "foot-img",
              ],
              [1, "foot-link"],
              [
                "src",
                "../assets/Images/Mail.png",
                "alt",
                "Mail",
                1,
                "foot-img",
              ],
              [
                "src",
                "../assets/Images/Phone.png",
                "alt",
                "Phone",
                1,
                "foot-img",
              ],
              [1, "bg-gray-100"],
              [
                1,
                "container",
                "mx-auto",
                "py-4",
                "px-5",
                "flex",
                "flex-wrap",
                "flex-col",
                "sm:flex-row",
              ],
              [1, "text-gray-500", "text-sm", "text-center", "sm:text-left"],
              [
                "href",
                "https://twitter.com/knyttneve",
                "rel",
                "noopener noreferrer",
                "target",
                "_blank",
                1,
                "ml-1",
              ],
              [
                1,
                "inline-flex",
                "sm:ml-auto",
                "sm:mt-0",
                "mt-2",
                "justify-center",
                "sm:justify-start",
              ],
              [1, "text-gray-500"],
              [
                "fill",
                "currentColor",
                "stroke-linecap",
                "round",
                "stroke-linejoin",
                "round",
                "stroke-width",
                "2",
                "viewBox",
                "0 0 24 24",
                1,
                "w-5",
                "h-5",
              ],
              [
                "d",
                "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
              ],
              [1, "ml-3", "text-gray-500"],
              [
                "d",
                "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
              ],
              [
                "fill",
                "none",
                "stroke",
                "currentColor",
                "stroke-linecap",
                "round",
                "stroke-linejoin",
                "round",
                "stroke-width",
                "2",
                "viewBox",
                "0 0 24 24",
                1,
                "w-5",
                "h-5",
              ],
              [
                "width",
                "20",
                "height",
                "20",
                "x",
                "2",
                "y",
                "2",
                "rx",
                "5",
                "ry",
                "5",
              ],
              ["d", "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"],
              [
                "fill",
                "currentColor",
                "stroke",
                "currentColor",
                "stroke-linecap",
                "round",
                "stroke-linejoin",
                "round",
                "stroke-width",
                "0",
                "viewBox",
                "0 0 24 24",
                1,
                "w-5",
                "h-5",
              ],
              [
                "stroke",
                "none",
                "d",
                "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z",
              ],
              ["cx", "4", "cy", "4", "r", "2", "stroke", "none"],
            ],
            template: function (n, r) {
              1 & n &&
                (f(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(
                  4,
                  "div",
                  4
                )(5, "h1", 5),
                g(6, " Explore the World's Best-Kept "),
                f(7, "span", 6),
                g(8, "Secrets"),
                p()(),
                f(9, "a", 7),
                g(10, "Explore"),
                p()()()()()(),
                f(11, "section", 8)(12, "div", 1)(13, "div", 9)(14, "h2", 10),
                g(15, " Discover Your Perfect Sphere of Travel with "),
                f(16, "span", 6),
                g(17, "Travel Sphere"),
                p(),
                g(18, ". "),
                p(),
                f(19, "p", 11),
                g(
                  20,
                  " Are you ready to experience the thrill of travel? Our website offers a wide range of destinations to suit every taste and budget. Whether you're looking to relax on a tropical beach or explore a bustling metropolis, our team is here to help you plan your perfect trip. Let's turn your wanderlust into reality! "
                ),
                p(),
                f(21, "div", 12),
                M(22, "img", 13),
                f(23, "div", 14)(24, "div", 15),
                g(25, "6,870"),
                p(),
                f(26, "div", 16),
                g(27, "Successful tours."),
                p()()()()()(),
                f(28, "section", 17)(29, "div", 1)(30, "div", 18)(31, "h2", 15),
                g(32, "Popular Attractions"),
                p(),
                f(33, "div", 19)(34, "a", 20),
                g(35, "India"),
                p(),
                f(36, "a", 21),
                g(37, "France"),
                p(),
                f(38, "a", 21),
                g(39, "Spain"),
                p(),
                f(40, "a", 21),
                g(41, "Japan"),
                p(),
                f(42, "a", 21),
                g(43, "Italy"),
                p(),
                f(44, "a", 21),
                g(45, "See more"),
                p()(),
                f(46, "div", 22)(47, "div", 23),
                M(48, "img", 24),
                f(49, "div", 25)(50, "h3", 26),
                g(51, "Amber Fort"),
                p(),
                f(52, "p", 27),
                g(
                  53,
                  " The Amber Fort in Jaipur is a 16th-century fort featuring stunning Hindu and Mughal architecture, beautiful courtyards, and gardens. "
                ),
                p(),
                f(54, "p", 28),
                g(55, "3 Days from"),
                p(),
                f(56, "div", 29)(57, "p", 30),
                g(58, "\u20b920,000"),
                p(),
                f(59, "a", 31),
                g(60, "Explore"),
                p()()()(),
                f(61, "div", 23),
                M(62, "img", 32),
                f(63, "div", 25)(64, "h3", 26),
                g(65, "Jal Mahal"),
                p(),
                f(66, "p", 27),
                g(
                  67,
                  " Jal Mahal is a palace located in a lake in Jaipur, India. It was built in the 18th century and features a fusion of Rajput and Mughal architectural styles. "
                ),
                p(),
                f(68, "p", 28),
                g(69, "6 Days from"),
                p(),
                f(70, "div", 29)(71, "p", 30),
                g(72, "\u20b955,000"),
                p(),
                f(73, "a", 31),
                g(74, "Explore"),
                p()()()(),
                f(75, "div", 23),
                M(76, "img", 33),
                f(77, "div", 25)(78, "h3", 26),
                g(79, "Hawa Mahal"),
                p(),
                f(80, "p", 27),
                g(
                  81,
                  " Hawa Mahal is a palace in Jaipur, India, known for its distinctive honeycomb-shaped fa\xe7ade and cooling design, representing the city's cultural heritage. "
                ),
                p(),
                f(82, "p", 28),
                g(83, "7 Days from"),
                p(),
                f(84, "div", 29)(85, "p", 30),
                g(86, "\u20b985,000"),
                p(),
                f(87, "a", 31),
                g(88, "Explore"),
                p()()()(),
                f(89, "div", 23),
                M(90, "img", 34),
                f(91, "div", 25)(92, "h3", 26),
                g(93, "blackwater Kerala"),
                p(),
                f(94, "p", 27),
                g(
                  95,
                  " Kerala's backwaters are a serene and picturesque network of canals, lagoons, and lakes, providing a tranquil escape from the city and a popular attraction for tourists. "
                ),
                p(),
                f(96, "p", 28),
                g(97, "8 Days from"),
                p(),
                f(98, "div", 29)(99, "p", 30),
                g(100, "\u20b980,000"),
                p(),
                f(101, "a", 31),
                g(102, "Explore"),
                p()()()()()()()(),
                f(103, "section", 17)(104, "div", 1)(105, "div", 35)(
                  106,
                  "h2",
                  15
                ),
                g(107, "Popular Packages"),
                p(),
                f(108, "div", 19)(109, "a", 21),
                g(110, "India"),
                p(),
                f(111, "a", 21),
                g(112, "France"),
                p(),
                f(113, "a", 21),
                g(114, "Spain"),
                p(),
                f(115, "a", 21),
                g(116, "Japan"),
                p(),
                f(117, "a", 21),
                g(118, "Italy"),
                p(),
                f(119, "a", 21),
                g(120, "See more"),
                p()(),
                f(121, "div", 22)(122, "div", 23),
                M(123, "img", 36),
                f(124, "div", 25)(125, "h3", 26),
                g(126, "Jaipur"),
                p(),
                f(127, "p", 27),
                g(
                  128,
                  " Discover the magic of Jaipur with our travel packages, featuring the city's rich culture and heritage. "
                ),
                p(),
                f(129, "ul", 37)(130, "li", 38),
                g(131, "Return Flight"),
                p(),
                f(132, "li", 38),
                g(133, "16 Days and 17 Nights in hotel"),
                p(),
                f(134, "li", 38),
                g(135, "20 Meals: 12 Breakfast & 8 Dinner"),
                p()(),
                f(136, "p", 28),
                g(137, "16 Days from"),
                p(),
                f(138, "div", 29)(139, "p", 30),
                g(140, "\u20b91,20,000"),
                p(),
                f(141, "a", 31),
                g(142, "Explore"),
                p()()()(),
                f(143, "div", 23),
                M(144, "img", 39),
                f(145, "div", 25)(146, "h3", 26),
                g(147, "Kerala"),
                p(),
                f(148, "p", 27),
                g(
                  149,
                  " Discover the beauty and charm of Kerala with our travel package, featuring serene backwaters, lush landscapes, and vibrant cultural experiences "
                ),
                p(),
                f(150, "ul", 37)(151, "li", 38),
                g(152, "Return Flight"),
                p(),
                f(153, "li", 38),
                g(154, "14 Days and 15 Nights in hotel"),
                p(),
                f(155, "li", 38),
                g(156, "20 Meals: 10 Breakfast & 10 Dinner"),
                p()(),
                f(157, "p", 28),
                g(158, "14 Days from"),
                p(),
                f(159, "div", 29)(160, "p", 30),
                g(161, "\u20b91,40,000"),
                p(),
                f(162, "a", 31),
                g(163, "Explore"),
                p()()()(),
                f(164, "div", 23),
                M(165, "img", 40),
                f(166, "div", 25)(167, "h3", 26),
                g(168, "Goa"),
                p(),
                f(169, "p", 27),
                g(
                  170,
                  " A former Portuguese colony, Goa is a popular beach destination known for its stunning coastline, nightlife, and fusion cuisine. "
                ),
                p(),
                f(171, "ul", 37)(172, "li", 38),
                g(173, "Return Flight"),
                p(),
                f(174, "li", 38),
                g(175, "20 Days and 21 Nights in hotel"),
                p(),
                f(176, "li", 38),
                g(177, "20 Meals: 10 Breakfast & 15 Dinner"),
                p()(),
                f(178, "p", 28),
                g(179, "20 Days from"),
                p(),
                f(180, "div", 29)(181, "p", 30),
                g(182, "\u20b91,55,000"),
                p(),
                f(183, "a", 31),
                g(184, "Explore"),
                p()()()(),
                f(185, "div", 23),
                M(186, "img", 41),
                f(187, "div", 25)(188, "h3", 26),
                g(189, "Rajasthan"),
                p(),
                f(190, "p", 27),
                g(
                  191,
                  " Rajasthan is a state in northern India known for its vibrant culture, rich history, and stunning architecture. It is home to numerous palaces, forts, and temples that offer a glimpse into India's royal past. "
                ),
                p(),
                f(192, "ul", 37)(193, "li", 38),
                g(194, "Return Flight"),
                p(),
                f(195, "li", 38),
                g(196, "20 Days and 21 Nights in hotel"),
                p(),
                f(197, "li", 38),
                g(198, "22 Meals: 10 Breakfast & 17 Dinner"),
                p()(),
                f(199, "p", 28),
                g(200, "20 Days from"),
                p(),
                f(201, "div", 29)(202, "p", 30),
                g(203, "\u20b91,35,000"),
                p(),
                f(204, "a", 31),
                g(205, "Explore"),
                p()()()()()()()(),
                f(206, "footer", 42)(207, "div", 1)(208, "div", 43)(
                  209,
                  "div",
                  44
                )(210, "a", 45),
                M(211, "img", 46),
                f(212, "span", 47),
                g(213, "Travel Sphere"),
                p()(),
                f(214, "p", 27),
                g(
                  215,
                  " We have a strong, enthusiastic and dedicated team of hard core tourism professionals who are committed to provide the best services and hospitality. "
                ),
                p()(),
                f(216, "div", 48)(217, "div", 49)(218, "h2", 50),
                g(219, "Browse"),
                p(),
                f(220, "nav", 51)(221, "li")(222, "a", 16),
                g(223, "Home"),
                p()(),
                f(224, "li")(225, "a", 16),
                g(226, "Destination"),
                p()(),
                f(227, "li")(228, "a", 16),
                g(229, "Landmarks"),
                p()(),
                f(230, "li")(231, "a", 16),
                g(232, "Honeymoon"),
                p()(),
                f(233, "li")(234, "a", 16),
                g(235, "About Us"),
                p()()()(),
                f(236, "div", 49)(237, "h2", 50),
                g(238, "Explore"),
                p(),
                f(239, "nav", 51)(240, "li")(241, "a", 16),
                g(242, "Cruise Tour"),
                p()(),
                f(243, "li")(244, "a", 16),
                g(245, "Rail Tour"),
                p()(),
                f(246, "li")(247, "a", 16),
                g(248, "Cultural Tour"),
                p()(),
                f(249, "li")(250, "a", 16),
                g(251, "Beach Tour"),
                p()(),
                f(252, "li")(253, "a", 16),
                g(254, "Nature Tour"),
                p()()()(),
                f(255, "div", 49)(256, "h2", 50),
                g(257, "Contact"),
                p(),
                f(258, "nav", 51)(259, "li")(260, "a", 52),
                M(261, "img", 53),
                f(262, "p", 54),
                g(263, "Pune, India."),
                p()()(),
                f(264, "li")(265, "a", 52),
                M(266, "img", 55),
                f(267, "span", 54),
                g(268, "info@travelsphereindia.com"),
                p()()(),
                f(269, "li")(270, "a", 52),
                M(271, "img", 56),
                f(272, "span", 54),
                g(273, "9999 9999 99"),
                p()()()()()()(),
                f(274, "div", 57)(275, "div", 58)(276, "p", 59),
                g(277, " \xa9 Copyright \u2014 "),
                f(278, "a", 60),
                g(279, "Travel Sphere"),
                p()(),
                f(280, "span", 61)(281, "a", 62),
                ce(),
                f(282, "svg", 63),
                M(283, "path", 64),
                p()(),
                Ie(),
                f(284, "a", 65),
                ce(),
                f(285, "svg", 63),
                M(286, "path", 66),
                p()(),
                Ie(),
                f(287, "a", 65),
                ce(),
                f(288, "svg", 67),
                M(289, "rect", 68)(290, "path", 69),
                p()(),
                Ie(),
                f(291, "a", 65),
                ce(),
                f(292, "svg", 70),
                M(293, "path", 71)(294, "circle", 72),
                p()()()()()()());
            },
          })),
          e
        );
      })();
      function mN(e, t) {
        if (
          (1 & e &&
            (f(0, "div", 2),
            M(1, "img", 3),
            f(2, "div", 4)(3, "h3", 5),
            g(4),
            p(),
            f(5, "p", 6),
            g(6),
            p(),
            f(7, "p", 7),
            g(8),
            p(),
            f(9, "div", 8)(10, "p", 9),
            g(11),
            p(),
            f(12, "a", 10),
            g(13, "Explore"),
            p()()()()),
          2 & e)
        ) {
          const n = t.$implicit;
          W(1),
            tt("src", n.Img, nn),
            tt("alt", n.packName),
            W(3),
            De(n.packName),
            W(2),
            an(" ", n.des, " "),
            W(2),
            De(n.days),
            W(3),
            De(n.price);
        }
      }
      function vN(e, t) {
        if (
          (1 & e &&
            (f(0, "div", 2),
            M(1, "img", 3),
            f(2, "div", 4)(3, "h3", 5),
            g(4),
            p(),
            f(5, "p", 6),
            g(6),
            p(),
            f(7, "p", 7),
            g(8),
            p(),
            f(9, "div", 8)(10, "p", 9),
            g(11),
            p(),
            f(12, "a", 10),
            g(13, "Explore"),
            p()()()()),
          2 & e)
        ) {
          const n = t.$implicit;
          W(1),
            tt("src", n.Img, nn),
            tt("alt", n.packName),
            W(3),
            De(n.packName),
            W(2),
            an(" ", n.des, " "),
            W(2),
            De(n.days),
            W(3),
            De(n.price);
        }
      }
      function wN(e, t) {
        if (
          (1 & e &&
            (f(0, "div", 2),
            M(1, "img", 3),
            f(2, "div", 4)(3, "h3", 5),
            g(4),
            p(),
            f(5, "p", 6),
            g(6),
            p(),
            f(7, "p", 7),
            g(8),
            p(),
            f(9, "div", 8)(10, "p", 9),
            g(11),
            p(),
            f(12, "a", 10),
            g(13, "Explore"),
            p()()()()),
          2 & e)
        ) {
          const n = t.$implicit;
          W(1),
            tt("src", n.Img, nn),
            tt("alt", n.packName),
            W(3),
            De(n.packName),
            W(2),
            an(" ", n.des, " "),
            W(2),
            De(n.days),
            W(3),
            De(n.price);
        }
      }
      const CN = [
        {
          path: "destination",
          component: (() => {
            class e {
              changeColorSideNav(n) {
                const r = Array.from(
                  document.querySelectorAll(".l-nav-bar ul li a")
                );
                r.forEach((i) => {
                  i.addEventListener("click", (o) => {
                    o.preventDefault(),
                      r.forEach((s) => {
                        s.classList.remove("active");
                      }),
                      i.classList.add("active");
                  });
                });
              }
            }
            return (
              (e.ɵfac = function (n) {
                return new (n || e)();
              }),
              (e.ɵcmp = Ke({
                type: e,
                selectors: [["app-destination"]],
                decls: 130,
                vars: 0,
                consts: [
                  [1, "main-region-d"],
                  [1, "wrapper"],
                  [1, "wrapper-shadow"],
                  [1, "l-nav"],
                  [1, "l-nav-bar"],
                  [1, "l-nav-list"],
                  [1, "l-nav-item"],
                  [
                    "routerLink",
                    "/destination/",
                    1,
                    "l-nav-link",
                    "active",
                    3,
                    "click",
                  ],
                  [
                    "routerLink",
                    "/destination/australia",
                    1,
                    "l-nav-link",
                    3,
                    "click",
                  ],
                  [
                    "routerLink",
                    "/destination/united",
                    1,
                    "l-nav-link",
                    3,
                    "click",
                  ],
                  ["href", "#", 1, "l-nav-link"],
                  [1, "right-nav"],
                  [1, "footer", "body-font"],
                  [
                    1,
                    "container",
                    "px-5",
                    "py-24",
                    "mx-auto",
                    "flex",
                    "md:items-center",
                    "lg:items-start",
                    "md:flex-row",
                    "md:flex-nowrap",
                    "flex-wrap",
                    "flex-col",
                  ],
                  [
                    1,
                    "w-64",
                    "flex-shrink-0",
                    "md:mx-0",
                    "mx-auto",
                    "text-center",
                    "md:text-left",
                  ],
                  [
                    1,
                    "flex",
                    "title-font",
                    "font-medium",
                    "items-center",
                    "md:justify-start",
                    "justify-center",
                  ],
                  [
                    "src",
                    "../assets/Images/logo.png",
                    "alt",
                    "Logo",
                    1,
                    "footer-logo",
                    "w-12",
                  ],
                  [1, "ml-3", "text-xl"],
                  [1, "card-para"],
                  [
                    1,
                    "flex-grow",
                    "flex",
                    "flex-wrap",
                    "-mb-10",
                    "md:mt-0",
                    "mt-10",
                    "md:text-left",
                    "justify-center",
                    "text-center",
                  ],
                  [1, "lg:w-1/4", "md:w-1/2", "w-full", "px-4"],
                  [1, "foot-heading"],
                  [1, "list-none", "mb-10"],
                  [1, "section-para", "foot-link"],
                  [1, "section-para", "flex-wrapper", "foot-link"],
                  [
                    "src",
                    "../assets/Images/Location.png",
                    "alt",
                    "Location",
                    1,
                    "foot-img",
                  ],
                  [1, "foot-link"],
                  [
                    "src",
                    "../assets/Images/Mail.png",
                    "alt",
                    "Mail",
                    1,
                    "foot-img",
                  ],
                  [
                    "src",
                    "../assets/Images/Phone.png",
                    "alt",
                    "Phone",
                    1,
                    "foot-img",
                  ],
                  [1, "bg-gray-100"],
                  [
                    1,
                    "container",
                    "mx-auto",
                    "py-4",
                    "px-5",
                    "flex",
                    "flex-wrap",
                    "flex-col",
                    "sm:flex-row",
                  ],
                  [
                    1,
                    "text-gray-500",
                    "text-sm",
                    "text-center",
                    "sm:text-left",
                  ],
                  [
                    "href",
                    "https://twitter.com/knyttneve",
                    "rel",
                    "noopener noreferrer",
                    "target",
                    "_blank",
                    1,
                    "ml-1",
                  ],
                  [
                    1,
                    "inline-flex",
                    "sm:ml-auto",
                    "sm:mt-0",
                    "mt-2",
                    "justify-center",
                    "sm:justify-start",
                  ],
                  [1, "text-gray-500"],
                  [
                    "fill",
                    "currentColor",
                    "stroke-linecap",
                    "round",
                    "stroke-linejoin",
                    "round",
                    "stroke-width",
                    "2",
                    "viewBox",
                    "0 0 24 24",
                    1,
                    "w-5",
                    "h-5",
                  ],
                  [
                    "d",
                    "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
                  ],
                  [1, "ml-3", "text-gray-500"],
                  [
                    "d",
                    "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
                  ],
                  [
                    "fill",
                    "none",
                    "stroke",
                    "currentColor",
                    "stroke-linecap",
                    "round",
                    "stroke-linejoin",
                    "round",
                    "stroke-width",
                    "2",
                    "viewBox",
                    "0 0 24 24",
                    1,
                    "w-5",
                    "h-5",
                  ],
                  [
                    "width",
                    "20",
                    "height",
                    "20",
                    "x",
                    "2",
                    "y",
                    "2",
                    "rx",
                    "5",
                    "ry",
                    "5",
                  ],
                  [
                    "d",
                    "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01",
                  ],
                  [
                    "fill",
                    "currentColor",
                    "stroke",
                    "currentColor",
                    "stroke-linecap",
                    "round",
                    "stroke-linejoin",
                    "round",
                    "stroke-width",
                    "0",
                    "viewBox",
                    "0 0 24 24",
                    1,
                    "w-5",
                    "h-5",
                  ],
                  [
                    "stroke",
                    "none",
                    "d",
                    "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z",
                  ],
                  ["cx", "4", "cy", "4", "r", "2", "stroke", "none"],
                ],
                template: function (n, r) {
                  1 & n &&
                    (f(0, "section", 0)(1, "div", 1)(2, "div", 2)(
                      3,
                      "aside",
                      3
                    )(4, "nav", 4)(5, "ul", 5)(6, "li", 6)(7, "a", 7),
                    et("click", function (o) {
                      return r.changeColorSideNav(o);
                    }),
                    g(8, " India "),
                    p()(),
                    f(9, "li", 6)(10, "a", 8),
                    et("click", function (o) {
                      return r.changeColorSideNav(o);
                    }),
                    g(11, "Australia"),
                    p()(),
                    f(12, "li", 6)(13, "a", 9),
                    et("click", function (o) {
                      return r.changeColorSideNav(o);
                    }),
                    g(14, "United Kingdom"),
                    p()(),
                    f(15, "li", 6)(16, "a", 10),
                    g(17, "USA"),
                    p()(),
                    f(18, "li", 6)(19, "a", 10),
                    g(20, "Italy"),
                    p()(),
                    f(21, "li", 6)(22, "a", 10),
                    g(23, "France"),
                    p()(),
                    f(24, "li", 6)(25, "a", 10),
                    g(26, "Japan"),
                    p()(),
                    f(27, "li", 6)(28, "a", 10),
                    g(29, "Spain"),
                    p()(),
                    f(30, "li", 6)(31, "a", 10),
                    g(32, "Germany"),
                    p()(),
                    f(33, "li", 6)(34, "a", 10),
                    g(35, "Greenland"),
                    p()(),
                    f(36, "li", 6)(37, "a", 10),
                    g(38, "Iceland"),
                    p()()()()(),
                    f(39, "div", 11),
                    M(40, "router-outlet"),
                    f(41, "footer", 12)(42, "div", 1)(43, "div", 13)(
                      44,
                      "div",
                      14
                    )(45, "a", 15),
                    M(46, "img", 16),
                    f(47, "span", 17),
                    g(48, "Travel Sphere"),
                    p()(),
                    f(49, "p", 18),
                    g(
                      50,
                      " We have a strong, enthusiastic and dedicated team of hard core tourism professionals who are committed to provide the best services and hospitality. "
                    ),
                    p()(),
                    f(51, "div", 19)(52, "div", 20)(53, "h2", 21),
                    g(54, "Browse"),
                    p(),
                    f(55, "nav", 22)(56, "li")(57, "a", 23),
                    g(58, "Home"),
                    p()(),
                    f(59, "li")(60, "a", 23),
                    g(61, "Destination"),
                    p()(),
                    f(62, "li")(63, "a", 23),
                    g(64, "Landmarks"),
                    p()(),
                    f(65, "li")(66, "a", 23),
                    g(67, "Honeymoon"),
                    p()(),
                    f(68, "li")(69, "a", 23),
                    g(70, "About Us"),
                    p()()()(),
                    f(71, "div", 20)(72, "h2", 21),
                    g(73, "Explore"),
                    p(),
                    f(74, "nav", 22)(75, "li")(76, "a", 23),
                    g(77, "Cruise Tour"),
                    p()(),
                    f(78, "li")(79, "a", 23),
                    g(80, "Rail Tour"),
                    p()(),
                    f(81, "li")(82, "a", 23),
                    g(83, "Cultural Tour"),
                    p()(),
                    f(84, "li")(85, "a", 23),
                    g(86, "Beach Tour"),
                    p()(),
                    f(87, "li")(88, "a", 23),
                    g(89, "Nature Tour"),
                    p()()()(),
                    f(90, "div", 20)(91, "h2", 21),
                    g(92, "Contact"),
                    p(),
                    f(93, "nav", 22)(94, "li")(95, "a", 24),
                    M(96, "img", 25),
                    f(97, "p", 26),
                    g(98, "Pune, India."),
                    p()()(),
                    f(99, "li")(100, "a", 24),
                    M(101, "img", 27),
                    f(102, "span", 26),
                    g(103, "info@travelsphereindia.com"),
                    p()()(),
                    f(104, "li")(105, "a", 24),
                    M(106, "img", 28),
                    f(107, "span", 26),
                    g(108, "9999 9999 99"),
                    p()()()()()()(),
                    f(109, "div", 29)(110, "div", 30)(111, "p", 31),
                    g(112, " \xa9 Copyright \u2014 "),
                    f(113, "a", 32),
                    g(114, "Travel Sphere"),
                    p()(),
                    f(115, "span", 33)(116, "a", 34),
                    ce(),
                    f(117, "svg", 35),
                    M(118, "path", 36),
                    p()(),
                    Ie(),
                    f(119, "a", 37),
                    ce(),
                    f(120, "svg", 35),
                    M(121, "path", 38),
                    p()(),
                    Ie(),
                    f(122, "a", 37),
                    ce(),
                    f(123, "svg", 39),
                    M(124, "rect", 40)(125, "path", 41),
                    p()(),
                    Ie(),
                    f(126, "a", 37),
                    ce(),
                    f(127, "svg", 42),
                    M(128, "path", 43)(129, "circle", 44),
                    p()()()()()()()()()()());
                },
                dependencies: [co, Xr],
              })),
              e
            );
          })(),
          children: [
            {
              path: "",
              component: (() => {
                class e {
                  constructor() {
                    this.packs = [
                      {
                        Img: "../../assets/Images/Jaipur/Amber Fort.jpg",
                        packName: "Amber Fort",
                        des: "The Amber Fort in Jaipur is a 16th-century fort featuring\n        stunning Hindu and Mughal architecture, beautiful courtyards,\n        and gardens.",
                        days: "3 Days from",
                        price: "\u20b920,000",
                      },
                      {
                        Img: "../../assets/Images/Jaipur/jal mahal.jpeg",
                        packName: "Jal Mahal",
                        des: "Jal Mahal is a palace located in a lake in Jaipur, India. It was\n        built in the 18th century and features a fusion of Rajput and\n        Mughal architectural styles.",
                        days: "3 Days from",
                        price: "\u20b920,000",
                      },
                      {
                        Img: "../../assets/Images/Jaipur/Amber Fort.jpg",
                        packName: "Amber Fort",
                        des: "The Amber Fort in Jaipur is a 16th-century fort featuring\n        stunning Hindu and Mughal architecture, beautiful courtyards,\n        and gardens.",
                        days: "6 Days from",
                        price: "\u20b955,000",
                      },
                      {
                        Img: "../../assets/Images/Jaipur/hawa mahal.jpg",
                        packName: "Hawa Mahal",
                        des: "Hawa Mahal is a palace in Jaipur, India, known for its\n        distinctive honeycomb-shaped fa\xe7ade and cooling design,\n        representing the city's cultural heritage.",
                        days: "7 Days from",
                        price: "\u20b9\u20b985,000",
                      },
                    ];
                  }
                  ngOnInit() {}
                }
                return (
                  (e.ɵfac = function (n) {
                    return new (n || e)();
                  }),
                  (e.ɵcmp = Ke({
                    type: e,
                    selectors: [["app-india"]],
                    decls: 2,
                    vars: 1,
                    consts: [
                      [1, "r-pack-cards"],
                      ["class", "card", 4, "ngFor", "ngForOf"],
                      [1, "card"],
                      [1, "pack-img", 3, "src", "alt"],
                      [1, "card-pad"],
                      [1, "card-title"],
                      [1, "card-para"],
                      [1, "tour-days"],
                      [1, "tour-det"],
                      [1, "tour-price"],
                      ["href", "#", 1, "explore-btn"],
                    ],
                    template: function (n, r) {
                      1 & n &&
                        (f(0, "div", 0), qn(1, mN, 14, 6, "div", 1), p()),
                        2 & n && (W(1), bn("ngForOf", r.packs));
                    },
                    dependencies: [Jn],
                  })),
                  e
                );
              })(),
            },
            {
              path: "australia",
              component: (() => {
                class e {
                  constructor() {
                    this.packs = [
                      {
                        Img: "../../assets/Images/opera house.jpg",
                        packName: "Opera House",
                        des: "An opera house is a theater designed for opera, ballet, and classical music concerts with ornate interiors, excellent acoustics and a rich history of preserving cultural heritage and artistic\xa0expression.",
                        days: "4 Days from",
                        price: "\u20b91,20,000",
                      },
                      {
                        Img: "../../assets/Images/Bondi Beach.jpg",
                        packName: "Bondi Beach",
                        des: "Bondi Beach is a world-famous beach in Sydney, Australia, known for its stunning scenery, surfing, and lively atmosphere with plenty of shops, restaurants,\xa0and\xa0cafes.",
                        days: "8 Days from",
                        price: "\u20b91,40,000",
                      },
                      {
                        Img: "../../assets/Images/Darling Harbour.jpg",
                        packName: "Darling Harbour",
                        des: "Darling Harbour is a vibrant waterfront precinct in Sydney, Australia, featuring numerous attractions such as museums, restaurants, bars, and shops, as well as a variety of entertainment options and stunning views of the\xa0city\xa0skyline.",
                        days: "6 Days from",
                        price: "\u20b91,55,000",
                      },
                      {
                        Img: "../../assets/Images/great barrier.jpg",
                        packName: "Great Barrier Reef",
                        des: "The Great Barrier Reef is the world's largest coral reef system, stretching over 2,300 kilometers along the coast of Australia, and is home to a diverse array of marine life, making it a popular destination for diving, snorkeling, and other aquatic\xa0activities.",
                        days: "7 Days from",
                        price: "\u20b91,85,000",
                      },
                      {
                        Img: "../../assets/Images/Uluru.jpg",
                        packName: "Uluru",
                        des: "Uluru, also known as Ayers Rock, is a massive sandstone monolith located in Australia's Red Centre, a sacred site to the Anangu people, and a popular tourist destination known for its stunning natural beauty and spiritual significance.",
                        days: "7 Days from",
                        price: "\u20b91,15,000",
                      },
                    ];
                  }
                  ngOnInit() {}
                }
                return (
                  (e.ɵfac = function (n) {
                    return new (n || e)();
                  }),
                  (e.ɵcmp = Ke({
                    type: e,
                    selectors: [["app-australia"]],
                    decls: 2,
                    vars: 1,
                    consts: [
                      [1, "r-pack-cards"],
                      ["class", "card", 4, "ngFor", "ngForOf"],
                      [1, "card"],
                      [1, "pack-img", 3, "src", "alt"],
                      [1, "card-pad"],
                      [1, "card-title"],
                      [1, "card-para"],
                      [1, "tour-days"],
                      [1, "tour-det"],
                      [1, "tour-price"],
                      ["href", "#", 1, "explore-btn"],
                    ],
                    template: function (n, r) {
                      1 & n &&
                        (f(0, "div", 0), qn(1, vN, 14, 6, "div", 1), p()),
                        2 & n && (W(1), bn("ngForOf", r.packs));
                    },
                    dependencies: [Jn],
                  })),
                  e
                );
              })(),
            },
            {
              path: "united",
              component: (() => {
                class e {
                  constructor() {
                    this.packs = [
                      {
                        Img: "../../assets/Images/British Museum.jpg",
                        packName: "British Museum",
                        des: "The British Museum is a famous museum in London that houses a vast collection of artifacts from around the world, including the Rosetta Stone and the Parthenon\xa0sculptures.",
                        days: "4 Days from",
                        price: "\u20b91,20,000",
                      },
                      {
                        Img: "../../assets/Images/Tower of London.jpg",
                        packName: "Tower of London",
                        des: "The Tower of London is a historic castle located in central London that has served many purposes throughout its long history, including as a royal palace, prison, and place\xa0of\xa0execution.",
                        days: "8 Days from",
                        price: "\u20b91,40,000",
                      },
                      {
                        Img: "../../assets/Images/Giant Causeway.jpg",
                        packName: "Giant's Causeway",
                        des: "The Giant's Causeway is a natural wonder located on the coast of Northern Ireland, made up of thousands of interlocking basalt columns formed by ancient volcanic\xa0activity.",
                        days: "6 Days from",
                        price: "\u20b91,55,000",
                      },
                      {
                        Img: "../../assets/Images/Stonehenge.jpg",
                        packName: "Stonehenge in Wiltshire",
                        des: "Stonehenge is a prehistoric monument in Wiltshire, England, consisting of a ring of standing stones believed to have been built around\xa02500\xa0BCE.",
                        days: "7 Days from",
                        price: "\u20b91,85,000",
                      },
                      {
                        Img: "../../assets/Images/Edinburgh Castle.jpg",
                        packName: "Edinburgh Castle",
                        des: "Edinburgh Castle is a historic fortress located on a hill in the city of Edinburgh, Scotland, that has served as a royal residence, military barracks,\xa0and\xa0prison.",
                        days: "7 Days from",
                        price: "\u20b91,15,000",
                      },
                    ];
                  }
                  ngOnInit() {}
                }
                return (
                  (e.ɵfac = function (n) {
                    return new (n || e)();
                  }),
                  (e.ɵcmp = Ke({
                    type: e,
                    selectors: [["app-united"]],
                    decls: 2,
                    vars: 1,
                    consts: [
                      [1, "r-pack-cards"],
                      ["class", "card", 4, "ngFor", "ngForOf"],
                      [1, "card"],
                      [1, "pack-img", 3, "src", "alt"],
                      [1, "card-pad"],
                      [1, "card-title"],
                      [1, "card-para"],
                      [1, "tour-days"],
                      [1, "tour-det"],
                      [1, "tour-price"],
                      ["href", "#", 1, "explore-btn"],
                    ],
                    template: function (n, r) {
                      1 & n &&
                        (f(0, "div", 0), qn(1, wN, 14, 6, "div", 1), p()),
                        2 & n && (W(1), bn("ngForOf", r.packs));
                    },
                    dependencies: [Jn],
                  })),
                  e
                );
              })(),
            },
          ],
        },
      ];
      let LD = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Et({ type: e })),
          (e.ɵinj = pt({ imports: [ti.forChild(CN), ti] })),
          e
        );
      })();
      function EN(e, t) {
        if (
          (1 & e &&
            (f(0, "div", 2),
            M(1, "img", 3),
            f(2, "div", 4)(3, "h3", 5),
            g(4),
            p(),
            f(5, "p", 6),
            g(6),
            p(),
            f(7, "p", 7),
            g(8),
            p(),
            f(9, "div", 8)(10, "p", 9),
            g(11),
            p(),
            f(12, "a", 10),
            g(13, "Explore"),
            p()()()()),
          2 & e)
        ) {
          const n = t.$implicit;
          W(1),
            tt("src", n.Img, nn),
            tt("alt", n.packName),
            W(3),
            De(n.packName),
            W(2),
            an(" ", n.des, " "),
            W(2),
            De(n.days),
            W(3),
            De(n.price);
        }
      }
      function IN(e, t) {
        if (
          (1 & e &&
            (f(0, "div", 2),
            M(1, "img", 3),
            f(2, "div", 4)(3, "h3", 5),
            g(4),
            p(),
            f(5, "p", 6),
            g(6),
            p(),
            f(7, "p", 7),
            g(8),
            p(),
            f(9, "div", 8)(10, "p", 9),
            g(11),
            p(),
            f(12, "a", 10),
            g(13, "Explore"),
            p()()()()),
          2 & e)
        ) {
          const n = t.$implicit;
          W(1),
            tt("src", n.Img, nn),
            tt("alt", n.packName),
            W(3),
            De(n.packName),
            W(2),
            an(" ", n.des, " "),
            W(2),
            De(n.days),
            W(3),
            De(n.price);
        }
      }
      function MN(e, t) {
        if (
          (1 & e &&
            (f(0, "div", 2),
            M(1, "img", 3),
            f(2, "div", 4)(3, "h3", 5),
            g(4),
            p(),
            f(5, "p", 6),
            g(6),
            p(),
            f(7, "p", 7),
            g(8),
            p(),
            f(9, "div", 8)(10, "p", 9),
            g(11),
            p(),
            f(12, "a", 10),
            g(13, "Explore"),
            p()()()()),
          2 & e)
        ) {
          const n = t.$implicit;
          W(1),
            tt("src", n.Img, nn),
            tt("alt", n.packName),
            W(3),
            De(n.packName),
            W(2),
            an(" ", n.des, " "),
            W(2),
            De(n.days),
            W(3),
            De(n.price);
        }
      }
      const TN = [
        {
          path: "landmark",
          component: (() => {
            class e {
              constructor() {}
              changeColorSideNav(n) {
                const r = Array.from(
                  document.querySelectorAll(".l-nav-bar ul li a")
                );
                r.forEach((i) => {
                  i.addEventListener("click", (o) => {
                    o.preventDefault(),
                      r.forEach((s) => {
                        s.classList.remove("active");
                      }),
                      i.classList.add("active");
                  });
                });
              }
              ngOnInit() {}
            }
            return (
              (e.ɵfac = function (n) {
                return new (n || e)();
              }),
              (e.ɵcmp = Ke({
                type: e,
                selectors: [["app-landmark"]],
                decls: 115,
                vars: 0,
                consts: [
                  [1, "main-region-d"],
                  [1, "wrapper"],
                  [1, "wrapper-shadow"],
                  [1, "l-nav"],
                  [1, "l-nav-bar"],
                  [1, "l-nav-list"],
                  [1, "l-nav-item"],
                  [
                    "routerLink",
                    "/landmark/",
                    1,
                    "l-nav-link",
                    "active",
                    3,
                    "click",
                  ],
                  [
                    "routerLink",
                    "/landmark/cultural",
                    1,
                    "l-nav-link",
                    3,
                    "click",
                  ],
                  [
                    "routerLink",
                    "/landmark/manMade",
                    1,
                    "l-nav-link",
                    3,
                    "click",
                  ],
                  ["href", "#", 1, "l-nav-link"],
                  [1, "right-nav"],
                  [1, "footer", "body-font"],
                  [
                    1,
                    "container",
                    "px-5",
                    "py-24",
                    "mx-auto",
                    "flex",
                    "md:items-center",
                    "lg:items-start",
                    "md:flex-row",
                    "md:flex-nowrap",
                    "flex-wrap",
                    "flex-col",
                  ],
                  [
                    1,
                    "w-64",
                    "flex-shrink-0",
                    "md:mx-0",
                    "mx-auto",
                    "text-center",
                    "md:text-left",
                  ],
                  [
                    1,
                    "flex",
                    "title-font",
                    "font-medium",
                    "items-center",
                    "md:justify-start",
                    "justify-center",
                  ],
                  [
                    "src",
                    "../assets/Images/logo.png",
                    "alt",
                    "Logo",
                    1,
                    "footer-logo",
                    "w-12",
                  ],
                  [1, "ml-3", "text-xl"],
                  [1, "card-para"],
                  [
                    1,
                    "flex-grow",
                    "flex",
                    "flex-wrap",
                    "-mb-10",
                    "md:mt-0",
                    "mt-10",
                    "md:text-left",
                    "justify-center",
                    "text-center",
                  ],
                  [1, "lg:w-1/4", "md:w-1/2", "w-full", "px-4"],
                  [1, "foot-heading"],
                  [1, "list-none", "mb-10"],
                  [1, "section-para", "foot-link"],
                  [1, "section-para", "flex-wrapper", "foot-link"],
                  [
                    "src",
                    "../assets/Images/Location.png",
                    "alt",
                    "Location",
                    1,
                    "foot-img",
                  ],
                  [1, "foot-link"],
                  [
                    "src",
                    "../assets/Images/Mail.png",
                    "alt",
                    "Mail",
                    1,
                    "foot-img",
                  ],
                  [
                    "src",
                    "../assets/Images/Phone.png",
                    "alt",
                    "Phone",
                    1,
                    "foot-img",
                  ],
                  [1, "bg-gray-100"],
                  [
                    1,
                    "container",
                    "mx-auto",
                    "py-4",
                    "px-5",
                    "flex",
                    "flex-wrap",
                    "flex-col",
                    "sm:flex-row",
                  ],
                  [
                    1,
                    "text-gray-500",
                    "text-sm",
                    "text-center",
                    "sm:text-left",
                  ],
                  [
                    "href",
                    "https://twitter.com/knyttneve",
                    "rel",
                    "noopener noreferrer",
                    "target",
                    "_blank",
                    1,
                    "ml-1",
                  ],
                  [
                    1,
                    "inline-flex",
                    "sm:ml-auto",
                    "sm:mt-0",
                    "mt-2",
                    "justify-center",
                    "sm:justify-start",
                  ],
                  [1, "text-gray-500"],
                  [
                    "fill",
                    "currentColor",
                    "stroke-linecap",
                    "round",
                    "stroke-linejoin",
                    "round",
                    "stroke-width",
                    "2",
                    "viewBox",
                    "0 0 24 24",
                    1,
                    "w-5",
                    "h-5",
                  ],
                  [
                    "d",
                    "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
                  ],
                  [1, "ml-3", "text-gray-500"],
                  [
                    "d",
                    "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
                  ],
                  [
                    "fill",
                    "none",
                    "stroke",
                    "currentColor",
                    "stroke-linecap",
                    "round",
                    "stroke-linejoin",
                    "round",
                    "stroke-width",
                    "2",
                    "viewBox",
                    "0 0 24 24",
                    1,
                    "w-5",
                    "h-5",
                  ],
                  [
                    "width",
                    "20",
                    "height",
                    "20",
                    "x",
                    "2",
                    "y",
                    "2",
                    "rx",
                    "5",
                    "ry",
                    "5",
                  ],
                  [
                    "d",
                    "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01",
                  ],
                  [
                    "fill",
                    "currentColor",
                    "stroke",
                    "currentColor",
                    "stroke-linecap",
                    "round",
                    "stroke-linejoin",
                    "round",
                    "stroke-width",
                    "0",
                    "viewBox",
                    "0 0 24 24",
                    1,
                    "w-5",
                    "h-5",
                  ],
                  [
                    "stroke",
                    "none",
                    "d",
                    "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z",
                  ],
                  ["cx", "4", "cy", "4", "r", "2", "stroke", "none"],
                ],
                template: function (n, r) {
                  1 & n &&
                    (f(0, "section", 0)(1, "div", 1)(2, "div", 2)(
                      3,
                      "aside",
                      3
                    )(4, "nav", 4)(5, "ul", 5)(6, "li", 6)(7, "a", 7),
                    et("click", function (o) {
                      return r.changeColorSideNav(o);
                    }),
                    g(8, " Nature "),
                    p()(),
                    f(9, "li", 6)(10, "a", 8),
                    et("click", function (o) {
                      return r.changeColorSideNav(o);
                    }),
                    g(11, " Cultural "),
                    p()(),
                    f(12, "li", 6)(13, "a", 9),
                    et("click", function (o) {
                      return r.changeColorSideNav(o);
                    }),
                    g(14, "Man-Made"),
                    p()(),
                    f(15, "li", 6)(16, "a", 10),
                    g(17, "Historical"),
                    p()(),
                    f(18, "li", 6)(19, "a", 10),
                    g(20, "Oceanica"),
                    p()(),
                    f(21, "li", 6)(22, "a", 10),
                    g(23, "RailRoute"),
                    p()()()()(),
                    f(24, "div", 11),
                    M(25, "router-outlet"),
                    f(26, "footer", 12)(27, "div", 1)(28, "div", 13)(
                      29,
                      "div",
                      14
                    )(30, "a", 15),
                    M(31, "img", 16),
                    f(32, "span", 17),
                    g(33, "Travel Sphere"),
                    p()(),
                    f(34, "p", 18),
                    g(
                      35,
                      " We have a strong, enthusiastic and dedicated team of hard core tourism professionals who are committed to provide the best services and hospitality. "
                    ),
                    p()(),
                    f(36, "div", 19)(37, "div", 20)(38, "h2", 21),
                    g(39, "Browse"),
                    p(),
                    f(40, "nav", 22)(41, "li")(42, "a", 23),
                    g(43, "Home"),
                    p()(),
                    f(44, "li")(45, "a", 23),
                    g(46, "Destination"),
                    p()(),
                    f(47, "li")(48, "a", 23),
                    g(49, "Landmarks"),
                    p()(),
                    f(50, "li")(51, "a", 23),
                    g(52, "Honeymoon"),
                    p()(),
                    f(53, "li")(54, "a", 23),
                    g(55, "About Us"),
                    p()()()(),
                    f(56, "div", 20)(57, "h2", 21),
                    g(58, "Explore"),
                    p(),
                    f(59, "nav", 22)(60, "li")(61, "a", 23),
                    g(62, "Cruise Tour"),
                    p()(),
                    f(63, "li")(64, "a", 23),
                    g(65, "Rail Tour"),
                    p()(),
                    f(66, "li")(67, "a", 23),
                    g(68, "Cultural Tour"),
                    p()(),
                    f(69, "li")(70, "a", 23),
                    g(71, "Beach Tour"),
                    p()(),
                    f(72, "li")(73, "a", 23),
                    g(74, "Nature Tour"),
                    p()()()(),
                    f(75, "div", 20)(76, "h2", 21),
                    g(77, "Contact"),
                    p(),
                    f(78, "nav", 22)(79, "li")(80, "a", 24),
                    M(81, "img", 25),
                    f(82, "p", 26),
                    g(83, "Pune, India."),
                    p()()(),
                    f(84, "li")(85, "a", 24),
                    M(86, "img", 27),
                    f(87, "span", 26),
                    g(88, "info@travelsphereindia.com"),
                    p()()(),
                    f(89, "li")(90, "a", 24),
                    M(91, "img", 28),
                    f(92, "span", 26),
                    g(93, "9999 9999 99"),
                    p()()()()()()(),
                    f(94, "div", 29)(95, "div", 30)(96, "p", 31),
                    g(97, " \xa9 Copyright \u2014 "),
                    f(98, "a", 32),
                    g(99, "Travel Sphere"),
                    p()(),
                    f(100, "span", 33)(101, "a", 34),
                    ce(),
                    f(102, "svg", 35),
                    M(103, "path", 36),
                    p()(),
                    Ie(),
                    f(104, "a", 37),
                    ce(),
                    f(105, "svg", 35),
                    M(106, "path", 38),
                    p()(),
                    Ie(),
                    f(107, "a", 37),
                    ce(),
                    f(108, "svg", 39),
                    M(109, "rect", 40)(110, "path", 41),
                    p()(),
                    Ie(),
                    f(111, "a", 37),
                    ce(),
                    f(112, "svg", 42),
                    M(113, "path", 43)(114, "circle", 44),
                    p()()()()()()()()()()());
                },
                dependencies: [co, Xr],
              })),
              e
            );
          })(),
          children: [
            {
              path: "",
              component: (() => {
                class e {
                  constructor() {
                    this.packs = [
                      {
                        Img: "../../assets/Images/Victoria Falls.jpg",
                        packName: "Victoria Falls",
                        des: "Victoria Falls is a waterfall on the Zambezi River at the border of Zambia and Zimbabwe, considered one of the world's largest\xa0waterfalls.",
                        days: "4 Days from",
                        price: "\u20b91,10,000",
                      },
                      {
                        Img: "../../assets/Images/Mount Everest.jpg",
                        packName: "Mount Everest",
                        des: "Mount Everest, located in the Himalayas on the border between Nepal and China, is the world's highest\xa0mountain\xa0peak.",
                        days: "8 Days from",
                        price: "\u20b91,40,000",
                      },
                      {
                        Img: "../../assets/Images/Amazon Rainforest.jpg",
                        packName: " Amazon Rainforest",
                        des: "The Amazon Rainforest is a vast tropical rainforest that covers much of the Amazon Basin in South America, known for its unparalleled\xa0biodiversity.",
                        days: "6 Days from",
                        price: "\u20b91,55,000",
                      },
                      {
                        Img: "../../assets/Images/Niagara Falls.jpg",
                        packName: "Niagara Falls",
                        des: "Niagara Falls is a group of three waterfalls located on the Niagara River at the border of the United States and Canada, known for its spectacular beauty and as a major tourist\xa0destination.",
                        days: "7 Days from",
                        price: "\u20b91,85,000",
                      },
                      {
                        Img: "../../assets/Images/Grand Canyon.jpg",
                        packName: "Grand Canyon",
                        des: "The Grand Canyon, located in Arizona, USA, is a massive, steep-sided gorge that was carved by the Colorado River over millions of years, and is considered one of the most spectacular natural wonders\xa0of\xa0the\xa0world",
                        days: "7 Days from",
                        price: "\u20b91,35,000",
                      },
                      {
                        Img: "../../assets/Images/Aurora Borealis.jpg",
                        packName: "Aurora Borealis",
                        des: "Aurora Borealis, or the Northern Lights, is a natural light display in the Arctic Circle due to solar particles colliding with the earth's\xa0magnetic\xa0field.",
                        days: "7 Days from",
                        price: "\u20b91,95,000",
                      },
                      {
                        Img: "../../assets/Images/Cliffs of Moher.jpg",
                        packName: "Cliffs of Moher",
                        des: "The Cliffs of Moher, located in County Clare, Ireland, are a breathtaking natural wonder that rise over 700 feet above the Atlantic Ocean and offer stunning views of the surrounding\xa0landscape.",
                        days: "7 Days from",
                        price: "\u20b91,20,000",
                      },
                      {
                        Img: "../../assets/Images/Victoria Peak.jpg",
                        packName: "Victoria Peak",
                        des: "Victoria Peak, the highest point on Hong Kong Island, offers breathtaking views of the city's skyline and is a popular tourist\xa0destination",
                        days: "7 Days from",
                        price: "\u20b91,85,000",
                      },
                    ];
                  }
                  ngOnInit() {}
                }
                return (
                  (e.ɵfac = function (n) {
                    return new (n || e)();
                  }),
                  (e.ɵcmp = Ke({
                    type: e,
                    selectors: [["app-natural"]],
                    decls: 2,
                    vars: 1,
                    consts: [
                      [1, "r-pack-cards"],
                      ["class", "card", 4, "ngFor", "ngForOf"],
                      [1, "card"],
                      [1, "pack-img", 3, "src", "alt"],
                      [1, "card-pad"],
                      [1, "card-title"],
                      [1, "card-para"],
                      [1, "tour-days"],
                      [1, "tour-det"],
                      [1, "tour-price"],
                      ["href", "#", 1, "explore-btn"],
                    ],
                    template: function (n, r) {
                      1 & n &&
                        (f(0, "div", 0), qn(1, EN, 14, 6, "div", 1), p()),
                        2 & n && (W(1), bn("ngForOf", r.packs));
                    },
                    dependencies: [Jn],
                  })),
                  e
                );
              })(),
            },
            {
              path: "cultural",
              component: (() => {
                class e {
                  constructor() {
                    this.packs = [
                      {
                        Img: "../../assets/Images/Great Wall of China.jpg",
                        packName: "Great Wall of China ",
                        des: "The Great Wall of China is a series of fortifications built across the northern borders of China to protect against invasions, and is considered one of the world's greatest architectural\xa0achievements.",
                        days: "4 Days from",
                        price: "\u20b91,10,000",
                      },
                      {
                        Img: "../../assets/Images/Eiffel Tower.jpg",
                        packName: "Eiffel Tower",
                        des: "The Eiffel Tower is a wrought-iron lattice tower located in Paris, France, and is one of the most recognizable landmarks in the world, known for its stunning views and romantic\xa0ambiance.",
                        days: "8 Days from",
                        price: "\u20b91,40,000",
                      },
                      {
                        Img: "../../assets/Images/Pyramids of Giza.jpg",
                        packName: " Pyramids of Giza",
                        des: "The Pyramids of Giza are ancient monumental structures located in Egypt, considered one of the world's most iconic and mysterious cultural landmarks, and recognized as a UNESCO World\xa0Heritage\xa0Site.",
                        days: "6 Days from",
                        price: "\u20b91,55,000",
                      },
                      {
                        Img: "../../assets/Images/taj mahal.jpg",
                        packName: "Taj Mahal",
                        des: "The Taj Mahal is a mausoleum located in Agra, India, built by the Mughal emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, and is regarded as one of the most beautiful buildings\xa0in\xa0the\xa0world.",
                        days: "7 Days from",
                        price: "\u20b91,85,000",
                      },
                      {
                        Img: "../../assets/Images/Palace of Versailles.jpg",
                        packName: "Palace of Versailles",
                        des: "The Palace of Versailles, located near Paris, France, is a magnificent royal ch\xe2teau that served as the center of political power in the country for\xa0over\xa0a\xa0century",
                        days: "7 Days from",
                        price: "\u20b91,85,000",
                      },
                    ];
                  }
                  ngOnInit() {}
                }
                return (
                  (e.ɵfac = function (n) {
                    return new (n || e)();
                  }),
                  (e.ɵcmp = Ke({
                    type: e,
                    selectors: [["app-cultural"]],
                    decls: 2,
                    vars: 1,
                    consts: [
                      [1, "r-pack-cards"],
                      ["class", "card", 4, "ngFor", "ngForOf"],
                      [1, "card"],
                      [1, "pack-img", 3, "src", "alt"],
                      [1, "card-pad"],
                      [1, "card-title"],
                      [1, "card-para"],
                      [1, "tour-days"],
                      [1, "tour-det"],
                      [1, "tour-price"],
                      ["href", "#", 1, "explore-btn"],
                    ],
                    template: function (n, r) {
                      1 & n &&
                        (f(0, "div", 0), qn(1, IN, 14, 6, "div", 1), p()),
                        2 & n && (W(1), bn("ngForOf", r.packs));
                    },
                    dependencies: [Jn],
                  })),
                  e
                );
              })(),
            },
            {
              path: "manMade",
              component: (() => {
                class e {
                  constructor() {
                    this.packs = [
                      {
                        Img: "../../assets/Images/Statue of Liberty.jpg",
                        packName: "Statue of Liberty",
                        des: "The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor, gifted by France to the United States, and is a symbol of freedom\xa0and\xa0democracy.",
                        days: "4 Days from",
                        price: "\u20b91,10,000",
                      },
                      {
                        Img: "../../assets/Images/Colosseum.jpg",
                        packName: "Colosseum",
                        des: "The Colosseum is an amphitheater located in Rome, Italy, and is considered one of the greatest works of Roman architecture and engineering, and a major cultural landmark of the\xa0Western\xa0world.",
                        days: "8 Days from",
                        price: "\u20b91,40,000",
                      },
                      {
                        Img: "../../assets/Images/Burj Khalifa.jpg",
                        packName: "Burj Khalifa",
                        des: "Burj Khalifa is a skyscraper located in Dubai, United Arab Emirates, and is the world's tallest building, known for its stunning design and panoramic views from the observation\xa0decks.",
                        days: "6 Days from",
                        price: "\u20b91,55,000",
                      },
                      {
                        Img: "../../assets/Images/Petra.jpg",
                        packName: "Petra",
                        des: "Petra is an ancient city carved into sandstone cliffs in Jordan, and is a UNESCO World Heritage Site and one of the new Seven Wonders of the World, known for its fascinating history and stunning rock-cut\xa0architecture.",
                        days: "7 Days from",
                        price: "\u20b91,85,000",
                      },
                      {
                        Img: "../../assets/Images/Louvre Museum.jpg",
                        packName: "Louvre Museum",
                        des: "The Louvre Museum, located in Paris, France, is the world's largest art museum with an extensive collection of over 38,000 works of art, including the famous Mona\xa0Lisa\xa0painting.",
                        days: "7 Days from",
                        price: "\u20b91,85,000",
                      },
                    ];
                  }
                  ngOnInit() {}
                }
                return (
                  (e.ɵfac = function (n) {
                    return new (n || e)();
                  }),
                  (e.ɵcmp = Ke({
                    type: e,
                    selectors: [["app-man-made"]],
                    decls: 2,
                    vars: 1,
                    consts: [
                      [1, "r-pack-cards"],
                      ["class", "card", 4, "ngFor", "ngForOf"],
                      [1, "card"],
                      [1, "pack-img", 3, "src", "alt"],
                      [1, "card-pad"],
                      [1, "card-title"],
                      [1, "card-para"],
                      [1, "tour-days"],
                      [1, "tour-det"],
                      [1, "tour-price"],
                      ["href", "#", 1, "explore-btn"],
                    ],
                    template: function (n, r) {
                      1 & n &&
                        (f(0, "div", 0), qn(1, MN, 14, 6, "div", 1), p()),
                        2 & n && (W(1), bn("ngForOf", r.packs));
                    },
                    dependencies: [Jn],
                  })),
                  e
                );
              })(),
            },
          ],
        },
      ];
      let jD = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Et({ type: e })),
          (e.ɵinj = pt({ imports: [ti.forChild(TN), ti] })),
          e
        );
      })();
      const xN = [
        { path: "", component: pN },
        {
          path: "about",
          component: (() => {
            class e {
              constructor() {}
              ngOnInit() {}
            }
            return (
              (e.ɵfac = function (n) {
                return new (n || e)();
              }),
              (e.ɵcmp = Ke({
                type: e,
                selectors: [["app-about"]],
                decls: 178,
                vars: 0,
                consts: [
                  [1, "text-gray-600", "body-font"],
                  [1, "wrapper"],
                  [1, "wrapper-shadow"],
                  [
                    1,
                    "container",
                    "px-5",
                    "py-24",
                    "mx-auto",
                    "flex",
                    "flex-wrap",
                  ],
                  [
                    1,
                    "lg:w-1/2",
                    "w-full",
                    "mb-10",
                    "lg:mb-0",
                    "rounded-lg",
                    "overflow-hidden",
                  ],
                  [
                    "alt",
                    "feature",
                    "src",
                    "../../assets/Images/about.jpg",
                    1,
                    "object-cover",
                    "object-center",
                    "h-full",
                    "w-full",
                  ],
                  [
                    1,
                    "flex",
                    "flex-col",
                    "flex-wrap",
                    "lg:py-6",
                    "-mb-10",
                    "lg:w-1/2",
                    "lg:pl-12",
                    "lg:text-left",
                    "text-center",
                  ],
                  [
                    1,
                    "flex",
                    "flex-col",
                    "mb-10",
                    "lg:items-start",
                    "items-center",
                  ],
                  [
                    1,
                    "w-12",
                    "h-12",
                    "inline-flex",
                    "items-center",
                    "justify-center",
                    "rounded-full",
                    "text-indigo-500",
                    "mb-5",
                    2,
                    "background-color",
                    "#fd632f33",
                  ],
                  [
                    "fill",
                    "none",
                    "stroke",
                    "#fd632f",
                    "stroke-linecap",
                    "round",
                    "stroke-linejoin",
                    "round",
                    "stroke-width",
                    "2",
                    "viewBox",
                    "0 0 24 24",
                    1,
                    "w-6",
                    "h-6",
                  ],
                  ["d", "M22 12h-4l-3 9L9 3l-3 9H2"],
                  [1, "flex-grow"],
                  [
                    1,
                    "text-gray-900",
                    "text-lg",
                    "title-font",
                    "font-medium",
                    "mb-3",
                  ],
                  [1, "leading-relaxed", "text-base"],
                  [1, "mt-3", "text-indigo-500", "inline-flex", "items-center"],
                  [
                    "fill",
                    "none",
                    "stroke",
                    "currentColor",
                    "stroke-linecap",
                    "round",
                    "stroke-linejoin",
                    "round",
                    "stroke-width",
                    "2",
                    "viewBox",
                    "0 0 24 24",
                    1,
                    "w-4",
                    "h-4",
                    "ml-2",
                  ],
                  ["d", "M5 12h14M12 5l7 7-7 7"],
                  [
                    1,
                    "w-12",
                    "h-12",
                    "inline-flex",
                    "items-center",
                    "justify-center",
                    "rounded-full",
                    "bg-indigo-100",
                    "text-indigo-500",
                    "mb-5",
                    2,
                    "background-color",
                    "#fd632f33",
                  ],
                  ["cx", "6", "cy", "6", "r", "3"],
                  ["cx", "6", "cy", "18", "r", "3"],
                  ["d", "M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"],
                  ["d", "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"],
                  ["cx", "12", "cy", "7", "r", "4"],
                  [1, "text-gray-600", "body-font", "relative"],
                  [
                    1,
                    "container",
                    "px-5",
                    "py-24",
                    "mx-auto",
                    "flex",
                    "sm:flex-nowrap",
                    "flex-wrap",
                  ],
                  [
                    1,
                    "lg:w-2/3",
                    "md:w-1/2",
                    "bg-gray-300",
                    "rounded-lg",
                    "overflow-hidden",
                    "sm:mr-10",
                    "p-10",
                    "flex",
                    "items-end",
                    "justify-start",
                    "relative",
                  ],
                  [
                    "width",
                    "100%",
                    "height",
                    "100%",
                    "frameborder",
                    "0",
                    "title",
                    "map",
                    "marginheight",
                    "0",
                    "marginwidth",
                    "0",
                    "scrolling",
                    "no",
                    "src",
                    "https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed",
                    1,
                    "absolute",
                    "inset-0",
                    2,
                    "filter",
                    "grayscale(1) contrast(1.2) opacity(0.4)",
                  ],
                  [
                    1,
                    "bg-white",
                    "relative",
                    "flex",
                    "flex-wrap",
                    "py-6",
                    "rounded",
                    "shadow-md",
                  ],
                  [1, "lg:w-1/2", "px-6"],
                  [
                    1,
                    "title-font",
                    "font-semibold",
                    "text-gray-900",
                    "tracking-widest",
                    "text-xs",
                  ],
                  [1, "mt-1"],
                  [1, "lg:w-1/2", "px-6", "mt-4", "lg:mt-0"],
                  [1, "text-indigo-500", "leading-relaxed"],
                  [
                    1,
                    "title-font",
                    "font-semibold",
                    "text-gray-900",
                    "tracking-widest",
                    "text-xs",
                    "mt-4",
                  ],
                  [1, "leading-relaxed"],
                  [
                    1,
                    "lg:w-1/3",
                    "md:w-1/2",
                    "bg-white",
                    "flex",
                    "flex-col",
                    "md:ml-auto",
                    "w-full",
                    "md:py-8",
                    "mt-8",
                    "md:mt-0",
                  ],
                  [
                    1,
                    "text-gray-900",
                    "text-lg",
                    "mb-1",
                    "font-medium",
                    "title-font",
                  ],
                  [1, "leading-relaxed", "mb-5", "text-gray-600"],
                  [1, "relative", "mb-4"],
                  ["for", "name", 1, "leading-7", "text-sm", "text-gray-600"],
                  [
                    "type",
                    "text",
                    "id",
                    "name",
                    "name",
                    "name",
                    1,
                    "w-full",
                    "bg-white",
                    "rounded",
                    "border",
                    "border-gray-300",
                    "focus:border-indigo-500",
                    "focus:ring-2",
                    "focus:ring-indigo-200",
                    "text-base",
                    "outline-none",
                    "text-gray-700",
                    "py-1",
                    "px-3",
                    "leading-8",
                    "transition-colors",
                    "duration-200",
                    "ease-in-out",
                  ],
                  ["for", "email", 1, "leading-7", "text-sm", "text-gray-600"],
                  [
                    "type",
                    "email",
                    "id",
                    "email",
                    "name",
                    "email",
                    1,
                    "w-full",
                    "bg-white",
                    "rounded",
                    "border",
                    "border-gray-300",
                    "focus:border-indigo-500",
                    "focus:ring-2",
                    "focus:ring-indigo-200",
                    "text-base",
                    "outline-none",
                    "text-gray-700",
                    "py-1",
                    "px-3",
                    "leading-8",
                    "transition-colors",
                    "duration-200",
                    "ease-in-out",
                  ],
                  [
                    "for",
                    "message",
                    1,
                    "leading-7",
                    "text-sm",
                    "text-gray-600",
                  ],
                  [
                    "id",
                    "message",
                    "name",
                    "message",
                    1,
                    "w-full",
                    "bg-white",
                    "rounded",
                    "border",
                    "border-gray-300",
                    "focus:border-indigo-500",
                    "focus:ring-2",
                    "focus:ring-indigo-200",
                    "h-32",
                    "text-base",
                    "outline-none",
                    "text-gray-700",
                    "py-1",
                    "px-3",
                    "resize-none",
                    "leading-6",
                    "transition-colors",
                    "duration-200",
                    "ease-in-out",
                  ],
                  [
                    1,
                    "text-white",
                    "bg-indigo-500",
                    "border-0",
                    "py-2",
                    "px-6",
                    "focus:outline-none",
                    "hover:bg-indigo-600",
                    "rounded",
                    "text-lg",
                  ],
                  [1, "text-xs", "text-gray-500", "mt-3"],
                  [1, "footer", "body-font"],
                  [
                    1,
                    "container",
                    "px-5",
                    "py-24",
                    "mx-auto",
                    "flex",
                    "md:items-center",
                    "lg:items-start",
                    "md:flex-row",
                    "md:flex-nowrap",
                    "flex-wrap",
                    "flex-col",
                  ],
                  [
                    1,
                    "w-64",
                    "flex-shrink-0",
                    "md:mx-0",
                    "mx-auto",
                    "text-center",
                    "md:text-left",
                  ],
                  [
                    1,
                    "flex",
                    "title-font",
                    "font-medium",
                    "items-center",
                    "md:justify-start",
                    "justify-center",
                  ],
                  [
                    "src",
                    "../assets/Images/logo.png",
                    "alt",
                    "Logo",
                    1,
                    "footer-logo",
                    "w-12",
                  ],
                  [1, "ml-3", "text-xl"],
                  [1, "card-para"],
                  [
                    1,
                    "flex-grow",
                    "flex",
                    "flex-wrap",
                    "md:pl-20",
                    "-mb-10",
                    "md:mt-0",
                    "mt-10",
                    "md:text-left",
                    "justify-end",
                    "text-center",
                  ],
                  [1, "lg:w-1/4", "md:w-1/2", "w-full", "px-4"],
                  [1, "foot-heading"],
                  [1, "list-none", "mb-10"],
                  [1, "section-para", "foot-link"],
                  [1, "section-para", "flex-wrapper", "foot-link"],
                  [
                    "src",
                    "../assets/Images/Location.png",
                    "alt",
                    "Location",
                    1,
                    "foot-img",
                  ],
                  [1, "foot-link"],
                  [
                    "src",
                    "../assets/Images/Mail.png",
                    "alt",
                    "Mail",
                    1,
                    "foot-img",
                  ],
                  [
                    "src",
                    "../assets/Images/Phone.png",
                    "alt",
                    "Phone",
                    1,
                    "foot-img",
                  ],
                  [1, "bg-gray-100"],
                  [
                    1,
                    "container",
                    "mx-auto",
                    "py-4",
                    "px-5",
                    "flex",
                    "flex-wrap",
                    "flex-col",
                    "sm:flex-row",
                  ],
                  [
                    1,
                    "text-gray-500",
                    "text-sm",
                    "text-center",
                    "sm:text-left",
                  ],
                  [
                    "href",
                    "https://twitter.com/knyttneve",
                    "rel",
                    "noopener noreferrer",
                    "target",
                    "_blank",
                    1,
                    "ml-1",
                  ],
                  [
                    1,
                    "inline-flex",
                    "sm:ml-auto",
                    "sm:mt-0",
                    "mt-2",
                    "justify-center",
                    "sm:justify-start",
                  ],
                  [1, "text-gray-500"],
                  [
                    "fill",
                    "currentColor",
                    "stroke-linecap",
                    "round",
                    "stroke-linejoin",
                    "round",
                    "stroke-width",
                    "2",
                    "viewBox",
                    "0 0 24 24",
                    1,
                    "w-5",
                    "h-5",
                  ],
                  [
                    "d",
                    "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
                  ],
                  [1, "ml-3", "text-gray-500"],
                  [
                    "d",
                    "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
                  ],
                  [
                    "fill",
                    "none",
                    "stroke",
                    "currentColor",
                    "stroke-linecap",
                    "round",
                    "stroke-linejoin",
                    "round",
                    "stroke-width",
                    "2",
                    "viewBox",
                    "0 0 24 24",
                    1,
                    "w-5",
                    "h-5",
                  ],
                  [
                    "width",
                    "20",
                    "height",
                    "20",
                    "x",
                    "2",
                    "y",
                    "2",
                    "rx",
                    "5",
                    "ry",
                    "5",
                  ],
                  [
                    "d",
                    "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01",
                  ],
                  [
                    "fill",
                    "currentColor",
                    "stroke",
                    "currentColor",
                    "stroke-linecap",
                    "round",
                    "stroke-linejoin",
                    "round",
                    "stroke-width",
                    "0",
                    "viewBox",
                    "0 0 24 24",
                    1,
                    "w-5",
                    "h-5",
                  ],
                  [
                    "stroke",
                    "none",
                    "d",
                    "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z",
                  ],
                  ["cx", "4", "cy", "4", "r", "2", "stroke", "none"],
                ],
                template: function (n, r) {
                  1 & n &&
                    (f(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(
                      4,
                      "div",
                      4
                    ),
                    M(5, "img", 5),
                    p(),
                    f(6, "div", 6)(7, "div", 7)(8, "div", 8),
                    ce(),
                    f(9, "svg", 9),
                    M(10, "path", 10),
                    p()(),
                    Ie(),
                    f(11, "div", 11)(12, "h2", 12),
                    g(13, " Get an authentic taste of the world "),
                    p(),
                    f(14, "p", 13),
                    g(
                      15,
                      " Tasting local cuisine is a highlight of any holiday - sharing it with others is even better! "
                    ),
                    p(),
                    f(16, "a", 14),
                    g(17, "Learn More "),
                    ce(),
                    f(18, "svg", 15),
                    M(19, "path", 16),
                    p()()()(),
                    Ie(),
                    f(20, "div", 7)(21, "div", 17),
                    ce(),
                    f(22, "svg", 9),
                    M(23, "circle", 18)(24, "circle", 19)(25, "path", 20),
                    p()(),
                    Ie(),
                    f(26, "div", 11)(27, "h2", 12),
                    g(28, " Genuinely incredible experiences "),
                    p(),
                    f(29, "p", 13),
                    g(
                      30,
                      " We do everything we can to make sure you have the holiday of a lifetime, every time. That's why so many incredible experiences are included in each and every one of our holidays. "
                    ),
                    p(),
                    f(31, "a", 14),
                    g(32, "Learn More "),
                    ce(),
                    f(33, "svg", 15),
                    M(34, "path", 16),
                    p()()()(),
                    Ie(),
                    f(35, "div", 7)(36, "div", 17),
                    ce(),
                    f(37, "svg", 9),
                    M(38, "path", 21)(39, "circle", 22),
                    p()(),
                    Ie(),
                    f(40, "div", 11)(41, "h2", 12),
                    g(42, " Reasons to book, reasons to smile "),
                    p(),
                    f(43, "p", 13),
                    g(
                      44,
                      " We include so much in every holiday, but that''s not all.... With our unrivalled Rock-Solid Guarantees and incredible offers, there are so many reasons to book with Travelsphere. "
                    ),
                    p(),
                    f(45, "a", 14),
                    g(46, "Learn More "),
                    ce(),
                    f(47, "svg", 15),
                    M(48, "path", 16),
                    p()()()()()(),
                    Ie(),
                    f(49, "section", 23)(50, "div", 24)(51, "div", 25),
                    M(52, "iframe", 26),
                    f(53, "div", 27)(54, "div", 28)(55, "h2", 29),
                    g(56, " ADDRESS "),
                    p(),
                    f(57, "p", 30),
                    g(58, "M.G Road City, Pune - 6."),
                    p()(),
                    f(59, "div", 31)(60, "h2", 29),
                    g(61, " EMAIL "),
                    p(),
                    f(62, "a", 32),
                    g(63, "info@travelsphereindia.com"),
                    p(),
                    f(64, "h2", 33),
                    g(65, " PHONE "),
                    p(),
                    f(66, "p", 34),
                    g(67, "123-456-7890"),
                    p()()()(),
                    f(68, "div", 35)(69, "h2", 36),
                    g(70, " Feedback "),
                    p(),
                    f(71, "p", 37),
                    g(
                      72,
                      " Post-ironic portland shabby chic echo park, banjo fashion axe "
                    ),
                    p(),
                    f(73, "div", 38)(74, "label", 39),
                    g(75, "Name"),
                    p(),
                    M(76, "input", 40),
                    p(),
                    f(77, "div", 38)(78, "label", 41),
                    g(79, "Email"),
                    p(),
                    M(80, "input", 42),
                    p(),
                    f(81, "div", 38)(82, "label", 43),
                    g(83, "Message"),
                    p(),
                    M(84, "textarea", 44),
                    p(),
                    f(85, "button", 45),
                    g(86, " Button "),
                    p(),
                    f(87, "p", 46),
                    g(
                      88,
                      " Chicharrones blog helvetica normcore iceland tousled brook viral artisan. "
                    ),
                    p()()()()()()(),
                    f(89, "footer", 47)(90, "div", 1)(91, "div", 48)(
                      92,
                      "div",
                      49
                    )(93, "a", 50),
                    M(94, "img", 51),
                    f(95, "span", 52),
                    g(96, "Travel Sphere"),
                    p()(),
                    f(97, "p", 53),
                    g(
                      98,
                      " We have a strong, enthusiastic and dedicated team of hard core tourism professionals who are committed to provide the best services and hospitality. "
                    ),
                    p()(),
                    f(99, "div", 54)(100, "div", 55)(101, "h2", 56),
                    g(102, "Browse"),
                    p(),
                    f(103, "nav", 57)(104, "li")(105, "a", 58),
                    g(106, "Home"),
                    p()(),
                    f(107, "li")(108, "a", 58),
                    g(109, "Destination"),
                    p()(),
                    f(110, "li")(111, "a", 58),
                    g(112, "Landmarks"),
                    p()(),
                    f(113, "li")(114, "a", 58),
                    g(115, "Honeymoon"),
                    p()(),
                    f(116, "li")(117, "a", 58),
                    g(118, "About Us"),
                    p()()()(),
                    f(119, "div", 55)(120, "h2", 56),
                    g(121, "Explore"),
                    p(),
                    f(122, "nav", 57)(123, "li")(124, "a", 58),
                    g(125, "Cruise Tour"),
                    p()(),
                    f(126, "li")(127, "a", 58),
                    g(128, "Rail Tour"),
                    p()(),
                    f(129, "li")(130, "a", 58),
                    g(131, "Cultural Tour"),
                    p()(),
                    f(132, "li")(133, "a", 58),
                    g(134, "Beach Tour"),
                    p()(),
                    f(135, "li")(136, "a", 58),
                    g(137, "Nature Tour"),
                    p()()()(),
                    f(138, "div", 55)(139, "h2", 56),
                    g(140, "Contact"),
                    p(),
                    f(141, "nav", 57)(142, "li")(143, "a", 59),
                    M(144, "img", 60),
                    f(145, "p", 61),
                    g(146, "Pune, India."),
                    p()()(),
                    f(147, "li")(148, "a", 59),
                    M(149, "img", 62),
                    f(150, "span", 61),
                    g(151, "info@travelsphereindia.com"),
                    p()()(),
                    f(152, "li")(153, "a", 59),
                    M(154, "img", 63),
                    f(155, "span", 61),
                    g(156, "9999 9999 99"),
                    p()()()()()()(),
                    f(157, "div", 64)(158, "div", 65)(159, "p", 66),
                    g(160, " \xa9 Copyright \u2014 "),
                    f(161, "a", 67),
                    g(162, "Travel Sphere"),
                    p()(),
                    f(163, "span", 68)(164, "a", 69),
                    ce(),
                    f(165, "svg", 70),
                    M(166, "path", 71),
                    p()(),
                    Ie(),
                    f(167, "a", 72),
                    ce(),
                    f(168, "svg", 70),
                    M(169, "path", 73),
                    p()(),
                    Ie(),
                    f(170, "a", 72),
                    ce(),
                    f(171, "svg", 74),
                    M(172, "rect", 75)(173, "path", 76),
                    p()(),
                    Ie(),
                    f(174, "a", 72),
                    ce(),
                    f(175, "svg", 77),
                    M(176, "path", 78)(177, "circle", 79),
                    p()()()()()()());
                },
              })),
              e
            );
          })(),
        },
      ];
      let AN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Et({ type: e })),
            (e.ɵinj = pt({ imports: [ti.forRoot(xN), LD, jD, ti] })),
            e
          );
        })(),
        RN = (() => {
          class e {
            constructor() {
              this.title = "travel-website";
            }
            ngOnInit() {
              (this.navbar = document.querySelector("nav")),
                this.navbar &&
                  window.addEventListener("scroll", () => {
                    10 > window.pageYOffset
                      ? this.navbar.classList.remove("fixed")
                      : this.navbar.classList.add("fixed");
                  }),
                window.addEventListener(
                  "scroll",
                  this.changeCss.bind(this),
                  !1
                );
            }
            ngOnDestroy() {
              window.removeEventListener(
                "scroll",
                this.changeCss.bind(this),
                !1
              );
            }
            changeCss() {
              document.querySelector(".destination-body"),
                document.querySelector("nav");
              const i = document.querySelector(".l-nav");
              document.querySelector("nav"),
                window,
                window,
                (i.style.top = window.scrollY > 20 ? "40px" : "85px");
            }
            changeColorNav(n) {
              const r = Array.from(document.querySelectorAll("nav a"));
              r.forEach((i) => {
                i.addEventListener("click", (o) => {
                  o.preventDefault(),
                    r.forEach((s) => {
                      s.classList.remove("active");
                    }),
                    i.classList.add("active");
                });
              });
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Ke({
              type: e,
              selectors: [["app-root"]],
              decls: 27,
              vars: 0,
              consts: [
                [1, "region-header"],
                [1, "wrapper"],
                [1, "wrapper-shadow"],
                [1, "site-header"],
                ["href", "#", 1, "site-logo"],
                [1, "site-name-container"],
                [1, "header-title"],
                ["href", "#", 1, "acc-btn"],
                [
                  "src",
                  "../assets/Images/account icon.png",
                  "alt",
                  "Icon",
                  1,
                  "acc-icon",
                ],
                [1, "nav-txt"],
                [1, "nav"],
                [1, "nav-bar"],
                ["routerLink", "", 1, "nav-links", "active", 3, "click"],
                ["routerLink", "/destination", 1, "nav-links", 3, "click"],
                ["routerLink", "/landmark", 1, "nav-links", 3, "click"],
                ["href", "#", 1, "nav-links"],
                [
                  "routerLink",
                  "/about",
                  1,
                  "nav-links",
                  2,
                  "float",
                  "right",
                  3,
                  "click",
                ],
                ["name", "primary"],
              ],
              template: function (n, r) {
                1 & n &&
                  (f(0, "header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3),
                  M(4, "a", 4),
                  f(5, "div", 5)(6, "h2", 6),
                  g(7, "Sphere up Your Journey..."),
                  p()(),
                  f(8, "a", 7),
                  M(9, "img", 8),
                  f(10, "span", 9),
                  g(11, "My Account"),
                  p()()()()()(),
                  f(12, "nav", 10)(13, "div", 1)(14, "div", 2)(15, "div", 11)(
                    16,
                    "a",
                    12
                  ),
                  et("click", function (o) {
                    return r.changeColorNav(o);
                  }),
                  g(17, "Home"),
                  p(),
                  f(18, "a", 13),
                  et("click", function (o) {
                    return r.changeColorNav(o);
                  }),
                  g(19, "Destination"),
                  p(),
                  f(20, "a", 14),
                  et("click", function (o) {
                    return r.changeColorNav(o);
                  }),
                  g(21, "Landmarks"),
                  p(),
                  f(22, "a", 15),
                  g(23, "Honeymoon"),
                  p(),
                  f(24, "a", 16),
                  et("click", function (o) {
                    return r.changeColorNav(o);
                  }),
                  g(25, "About Us"),
                  p()()()()(),
                  M(26, "router-outlet", 17));
              },
              dependencies: [co, Xr],
            })),
            e
          );
        })(),
        NN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Et({ type: e })),
            (e.ɵinj = pt({ imports: [Ic, LD] })),
            e
          );
        })(),
        kN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Et({ type: e })),
            (e.ɵinj = pt({ imports: [Ic, jD] })),
            e
          );
        })(),
        PN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Et({ type: e, bootstrap: [RN] })),
            (e.ɵinj = pt({ imports: [Ix, AN, NN, kN] })),
            e
          );
        })();
      (function LS() {
        by = !1;
      })(),
        bx()
          .bootstrapModule(PN)
          .catch((e) => console.error(e));
    },
  },
  (re) => {
    re((re.s = 149));
  },
]);
