/**
 * promise实现注意以下几点：
 * 1，promise实例状态只能由resolve/reject改变
 * 2, promise中resolve方法解释：
 *  返回一个状态由给定value决定的Promise对象。如果该值是一个Promise对象，则直接返回该对象；
 *  如果该值是thenable(即，带有then方法的对象)，返回的Promise对象的最终状态由then方法执行决定；
 *  否则的话(该value为空，基本类型或者不带then方法的对象),返回的Promise对象状态为fulfilled，
 *  并且将该value传递给对应的then方法。通常而言，如果你不知道一个值是否是Promise对象，
 *  使用Promise.resolve(value) 来返回一个Promise对象,这样就能将该value以Promise对象形式使用。
 * 3，promise状态一旦发生改变，就不会再变
 * 4，then返回新的promise的实例状态由then的回调函数决定：
 *  如果then中的回调函数返回一个值，那么then返回的Promise将会成为接受状态，并且将返回的值作为接受状态的回调函数的参数值。
 *  如果then中的回调函数抛出一个错误，那么then返回的Promise将会成为拒绝状态，并且将抛出的错误作为拒绝状态的回调函数的参数值。
 *  如果then中的回调函数返回一个已经是接受状态的Promise，那么then返回的Promise也会成为接受状态，
 *  并且将那个Promise的接受状态的回调函数的参数值作为该被返回的Promise的接受状态回调函数的参数值。
 *  如果then中的回调函数返回一个已经是拒绝状态的Promise，那么then返回的Promise也会成为拒绝状态，
 *  并且将那个Promise的拒绝状态的回调函数的参数值作为该被返回的Promise的拒绝状态回调函数的参数值。
 *  如果then中的回调函数返回一个未定状态（pending）的Promise，那么then返回Promise的状态也是未定的，
 *  并且它的终态与那个Promise的终态相同；同时，它变为终态时调用的回调函数参数与那个Promise变为终态时的回调函数的参数是相同的。
 *
 * @param {any} fn
 */
function _Promise(fn) {
  this.state = "pending";
  this.data = null;
  this.resolveCbs = [];
  this.rejectCbs = [];
  this.finallyCb = null;

  const handle = (state, arr) => {
    if (cb instanceof _Promise) {
      return cb;
    } else if (this.state !== "pending") {
      return;
    } else {
      if (this.state === "pending") {
        this.state = state;
        this.data = cb;
        while (arr.length) {
          arr.shift()();
        }
      }
      this.finallyCb && this.finallyCb();
    }
  };

  const resolve = () => handle("resolve", this.resolveCbs);
  const reject = () => handle("reject", this.rejectCbs);

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

_Promise.prototype.then = function(success, fail) {
  return new _Promise((resolve, reject) => {
    let { data, state, resolveCbs, rejectCbs } = this;

    const handleAsync = fn => {
      if (typeof fn !== "function") {
        return resolve(data);
      }
      resolve(fn(data));
    };

    switch (state) {
      case "pending":
        rejectCbs.push(() => handleAsync(success));
        rejectCbs.push(() => handleAsync(fail));
        break;

      case "resolve":
        handleAsync(success);
        break;

      case "reject":
        handleAsync(fail);
        break;
    }
  });
};

_Promise.prototype.catch = function(fail) {
  _Promise.prototype.then.apply(this, null, fail);
};

_Promise.prototype.finally = function(cb) {
  let { state, finallyCb } = this;

  const handleAsync = fn => {
    if (typeof fn !== "function") {
      return;
    }
    fn();
  };

  if (state === "pending") {
    finallyCb = () => handleAsync(cb);
  } else {
    handleAsync(cb);
  }
};

_Promise.resolve = function(cb) {
  if (cb instanceof _promise) {
    return cb;
  }
  return new _Promise(resolve => {
    resolve(cb);
  });
};

_Promise.reject = function(cb) {
  if (cb instanceof _promise) {
    return cb;
  }
  return new _Promise((resolve, reject) => {
    reject(cb);
  });
};

_Promise.all = function(arr) {
  return new _Promise((resolve, reject) => {
    let resolveArr = [];
    let rejectArr = [];
    const handleState = () => {
      if (resolveArr.length === arr.length)
    }
    arr.forEach(ele => {

    })
  })
}

class MiniPromise {
  /**
   * A Promise is nothing more than an object that holds some states and wraps
   * the callback to make it looks better.
   *
   * promise.then(fn1, fn2) may get called for multiple times, use array to
   * store those functions.
   *
   * @param {Function} fn
   */
  constructor(fn) {
    if (!isFunction(fn))
      throw new TypeError("Pass function object to create a Promise object");

    this.fnArr = { fulfilled: [], rejected: [] };
    this.status = "pending";

    const res = handle.bind(this, "fulfilled");
    const rej = handle.bind(this, "rejected");

    setTimeout(fn, null, res, rej);
    //fn(res, rej);

    function handle(status, val) {
      if (this.status !== "pending") return;

      this.status = status;
      this.v = val;
      var fn;
      while ((fn = this.fnArr[status].shift())) fn.call(this, val);
    }
  }

  /**
   * `promise.then` is the most important method for Promise. It's the key to
   * hold a Promise chain.
   *
   * If resFn or rejFn is not function, just ignore them, and pass value of
   * the previous promise directly to the next promise. Just like you didn't
   * write this `then`.
   */
  then(resFn, rejFn) {
    return new MiniPromise((res, rej) => {
      function realResFn(v) {
        if (!isFunction(resFn)) return res(v);

        try {
          var r = resFn(v);
          if (isThenable(r)) r.then(res, rej);
          else res(r);
        } catch (e) {
          rej(e);
        }
      }

      function realRejFn(v) {
        if (!isFunction(rejFn)) return rej(v);

        try {
          var r = rejFn(v);
          if (isThenable(r)) r.then(res, rej);
          else res(r);
        } catch (e) {
          rej(e);
        }
      }

      switch (this.status) {
        case "pending":
          this.fnArr.fulfilled.push(realResFn);
          this.fnArr.rejected.push(realRejFn);
          break;

        case "fulfilled":
          realResFn(this.v);
          break;

        case "rejected":
          realRejFn(this.v);
          break;
      }
    });
  }

  /**
   * `promise.catch(rejFn)` is nothing but `promise.then(null, rejFn)`
   */
  catch(rejFn) {
    return this.then(null, rejFn);
  }

  /**
   * Execute an array of Promise objects, collect all result(call `then`) and
   * return them in an array.
   *
   * But if any one of the objects triggered reject, just ignore the result
   * and reject directly.
   */
  static all(promiseArr) {
    if (!Array.isArray(promiseArr))
      throw new TypeError("Promise.all need Array object as argument");

    return new MiniPromise((res, rej) => {
      var count = promiseArr.length;
      const result = [];

      promiseArr.forEach((p, idx) => {
        p.then(handle(idx), rej);
      });

      /* Use closure to hold index */
      function handle(idx) {
        return v => {
          result[idx] = v;

          if (--count === 0) res(result);
        };
      }
    });
  }

  /**
   * Execute an array of Promise objects, only return the result of the one
   * who call `then` first.
   */
  static race(promiseArr) {
    if (!Array.isArray(promiseArr))
      throw new TypeError("Promise.race need Array object as argument");

    return new MiniPromise((res, rej) => {
      promiseArr.forEach(p => p.then(res, rej));
    });
  }

  /**
   * If you need to start a Promise chain from a basic value, just use this.
   * e.g. Promise.resolve(1).then(console.log);
   */
  static resolve(v) {
    return new MiniPromise((res, _) => res(v));
  }

  /**
   * Just like Promise.resolve, but start with an rejection.
   */
  static reject(v) {
    return new MiniPromise((_, rej) => rej(v));
  }
}

/**
 * Some utilitiy functions who is needed for multiple times.
 */
function isThenable(obj) {
  return obj && isFunction(obj.then);
}

function isFunction(obj) {
  return typeof obj === "function";
}
