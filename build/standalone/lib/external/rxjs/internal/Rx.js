define(function(require,exports,module){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
// Subject imported before Observable to bypass circular dependency issue since
// Subject extends Observable and Observable references Subject in it's
// definition
var Subject_1 = require("./Subject");
exports.Subject = Subject_1.Subject;
exports.AnonymousSubject = Subject_1.AnonymousSubject;
/* tslint:enable:no-unused-variable */
var Observable_1 = require("./Observable");
exports.Observable = Observable_1.Observable;
var config_1 = require("./config");
exports.config = config_1.config;
// statics
/* tslint:disable:no-use-before-declare */
require("rxjs-compat/add/observable/bindCallback");
require("rxjs-compat/add/observable/bindNodeCallback");
require("rxjs-compat/add/observable/combineLatest");
require("rxjs-compat/add/observable/concat");
require("rxjs-compat/add/observable/defer");
require("rxjs-compat/add/observable/empty");
require("rxjs-compat/add/observable/forkJoin");
require("rxjs-compat/add/observable/from");
require("rxjs-compat/add/observable/fromEvent");
require("rxjs-compat/add/observable/fromEventPattern");
require("rxjs-compat/add/observable/fromPromise");
require("rxjs-compat/add/observable/generate");
require("rxjs-compat/add/observable/if");
require("rxjs-compat/add/observable/interval");
require("rxjs-compat/add/observable/merge");
require("rxjs-compat/add/observable/race");
require("rxjs-compat/add/observable/never");
require("rxjs-compat/add/observable/of");
require("rxjs-compat/add/observable/onErrorResumeNext");
require("rxjs-compat/add/observable/pairs");
require("rxjs-compat/add/observable/range");
require("rxjs-compat/add/observable/using");
require("rxjs-compat/add/observable/throw");
require("rxjs-compat/add/observable/timer");
require("rxjs-compat/add/observable/zip");
//dom
require("rxjs-compat/add/observable/dom/ajax");
require("rxjs-compat/add/observable/dom/webSocket");
//internal/operators
require("rxjs-compat/add/operator/buffer");
require("rxjs-compat/add/operator/bufferCount");
require("rxjs-compat/add/operator/bufferTime");
require("rxjs-compat/add/operator/bufferToggle");
require("rxjs-compat/add/operator/bufferWhen");
require("rxjs-compat/add/operator/catch");
require("rxjs-compat/add/operator/combineAll");
require("rxjs-compat/add/operator/combineLatest");
require("rxjs-compat/add/operator/concat");
require("rxjs-compat/add/operator/concatAll");
require("rxjs-compat/add/operator/concatMap");
require("rxjs-compat/add/operator/concatMapTo");
require("rxjs-compat/add/operator/count");
require("rxjs-compat/add/operator/dematerialize");
require("rxjs-compat/add/operator/debounce");
require("rxjs-compat/add/operator/debounceTime");
require("rxjs-compat/add/operator/defaultIfEmpty");
require("rxjs-compat/add/operator/delay");
require("rxjs-compat/add/operator/delayWhen");
require("rxjs-compat/add/operator/distinct");
require("rxjs-compat/add/operator/distinctUntilChanged");
require("rxjs-compat/add/operator/distinctUntilKeyChanged");
require("rxjs-compat/add/operator/do");
require("rxjs-compat/add/operator/exhaust");
require("rxjs-compat/add/operator/exhaustMap");
require("rxjs-compat/add/operator/expand");
require("rxjs-compat/add/operator/elementAt");
require("rxjs-compat/add/operator/filter");
require("rxjs-compat/add/operator/finally");
require("rxjs-compat/add/operator/find");
require("rxjs-compat/add/operator/findIndex");
require("rxjs-compat/add/operator/first");
require("rxjs-compat/add/operator/groupBy");
require("rxjs-compat/add/operator/ignoreElements");
require("rxjs-compat/add/operator/isEmpty");
require("rxjs-compat/add/operator/audit");
require("rxjs-compat/add/operator/auditTime");
require("rxjs-compat/add/operator/last");
require("rxjs-compat/add/operator/let");
require("rxjs-compat/add/operator/every");
require("rxjs-compat/add/operator/map");
require("rxjs-compat/add/operator/mapTo");
require("rxjs-compat/add/operator/materialize");
require("rxjs-compat/add/operator/max");
require("rxjs-compat/add/operator/merge");
require("rxjs-compat/add/operator/mergeAll");
require("rxjs-compat/add/operator/mergeMap");
require("rxjs-compat/add/operator/mergeMapTo");
require("rxjs-compat/add/operator/mergeScan");
require("rxjs-compat/add/operator/min");
require("rxjs-compat/add/operator/multicast");
require("rxjs-compat/add/operator/observeOn");
require("rxjs-compat/add/operator/onErrorResumeNext");
require("rxjs-compat/add/operator/pairwise");
require("rxjs-compat/add/operator/partition");
require("rxjs-compat/add/operator/pluck");
require("rxjs-compat/add/operator/publish");
require("rxjs-compat/add/operator/publishBehavior");
require("rxjs-compat/add/operator/publishReplay");
require("rxjs-compat/add/operator/publishLast");
require("rxjs-compat/add/operator/race");
require("rxjs-compat/add/operator/reduce");
require("rxjs-compat/add/operator/repeat");
require("rxjs-compat/add/operator/repeatWhen");
require("rxjs-compat/add/operator/retry");
require("rxjs-compat/add/operator/retryWhen");
require("rxjs-compat/add/operator/sample");
require("rxjs-compat/add/operator/sampleTime");
require("rxjs-compat/add/operator/scan");
require("rxjs-compat/add/operator/sequenceEqual");
require("rxjs-compat/add/operator/share");
require("rxjs-compat/add/operator/shareReplay");
require("rxjs-compat/add/operator/single");
require("rxjs-compat/add/operator/skip");
require("rxjs-compat/add/operator/skipLast");
require("rxjs-compat/add/operator/skipUntil");
require("rxjs-compat/add/operator/skipWhile");
require("rxjs-compat/add/operator/startWith");
require("rxjs-compat/add/operator/subscribeOn");
require("rxjs-compat/add/operator/switch");
require("rxjs-compat/add/operator/switchMap");
require("rxjs-compat/add/operator/switchMapTo");
require("rxjs-compat/add/operator/take");
require("rxjs-compat/add/operator/takeLast");
require("rxjs-compat/add/operator/takeUntil");
require("rxjs-compat/add/operator/takeWhile");
require("rxjs-compat/add/operator/throttle");
require("rxjs-compat/add/operator/throttleTime");
require("rxjs-compat/add/operator/timeInterval");
require("rxjs-compat/add/operator/timeout");
require("rxjs-compat/add/operator/timeoutWith");
require("rxjs-compat/add/operator/timestamp");
require("rxjs-compat/add/operator/toArray");
require("rxjs-compat/add/operator/toPromise");
require("rxjs-compat/add/operator/window");
require("rxjs-compat/add/operator/windowCount");
require("rxjs-compat/add/operator/windowTime");
require("rxjs-compat/add/operator/windowToggle");
require("rxjs-compat/add/operator/windowWhen");
require("rxjs-compat/add/operator/withLatestFrom");
require("rxjs-compat/add/operator/zip");
require("rxjs-compat/add/operator/zipAll");
var Subscription_1 = require("./Subscription");
exports.Subscription = Subscription_1.Subscription;
var Subscriber_1 = require("./Subscriber");
exports.Subscriber = Subscriber_1.Subscriber;
var AsyncSubject_1 = require("./AsyncSubject");
exports.AsyncSubject = AsyncSubject_1.AsyncSubject;
var ReplaySubject_1 = require("./ReplaySubject");
exports.ReplaySubject = ReplaySubject_1.ReplaySubject;
var BehaviorSubject_1 = require("./BehaviorSubject");
exports.BehaviorSubject = BehaviorSubject_1.BehaviorSubject;
var ConnectableObservable_1 = require("./observable/ConnectableObservable");
exports.ConnectableObservable = ConnectableObservable_1.ConnectableObservable;
var Notification_1 = require("./Notification");
exports.Notification = Notification_1.Notification;
var EmptyError_1 = require("./util/EmptyError");
exports.EmptyError = EmptyError_1.EmptyError;
var ArgumentOutOfRangeError_1 = require("./util/ArgumentOutOfRangeError");
exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
var ObjectUnsubscribedError_1 = require("./util/ObjectUnsubscribedError");
exports.ObjectUnsubscribedError = ObjectUnsubscribedError_1.ObjectUnsubscribedError;
var TimeoutError_1 = require("./util/TimeoutError");
exports.TimeoutError = TimeoutError_1.TimeoutError;
var UnsubscriptionError_1 = require("./util/UnsubscriptionError");
exports.UnsubscriptionError = UnsubscriptionError_1.UnsubscriptionError;
var timeInterval_1 = require("./operators/timeInterval");
exports.TimeInterval = timeInterval_1.TimeInterval;
var timestamp_1 = require("./operators/timestamp");
exports.Timestamp = timestamp_1.Timestamp;
var TestScheduler_1 = require("./testing/TestScheduler");
exports.TestScheduler = TestScheduler_1.TestScheduler;
var VirtualTimeScheduler_1 = require("./scheduler/VirtualTimeScheduler");
exports.VirtualTimeScheduler = VirtualTimeScheduler_1.VirtualTimeScheduler;
var AjaxObservable_1 = require("./observable/dom/AjaxObservable");
exports.AjaxResponse = AjaxObservable_1.AjaxResponse;
exports.AjaxError = AjaxObservable_1.AjaxError;
exports.AjaxTimeoutError = AjaxObservable_1.AjaxTimeoutError;
var pipe_1 = require("./util/pipe");
exports.pipe = pipe_1.pipe;
var asap_1 = require("./scheduler/asap");
var async_1 = require("./scheduler/async");
var queue_1 = require("./scheduler/queue");
var animationFrame_1 = require("./scheduler/animationFrame");
var rxSubscriber_1 = require("./symbol/rxSubscriber");
var iterator_1 = require("./symbol/iterator");
var observable_1 = require("./symbol/observable");
var _operators = require("./operators/index");
exports.operators = _operators;
/* tslint:enable:no-unused-variable */
/**
 * @typedef {Object} Rx.Scheduler
 * @property {Scheduler} queue Schedules on a queue in the current event frame
 * (trampoline scheduler). Use this for iteration operations.
 * @property {Scheduler} asap Schedules on the micro task queue, which uses the
 * fastest transport mechanism available, either Node.js' `process.nextTick()`
 * or Web Worker MessageChannel or setTimeout or others. Use this for
 * asynchronous conversions.
 * @property {Scheduler} async Schedules work with `setInterval`. Use this for
 * time-based operations.
 * @property {Scheduler} animationFrame Schedules work with `requestAnimationFrame`.
 * Use this for synchronizing with the platform's painting
 */
var Scheduler = {
    asap: asap_1.asap,
    queue: queue_1.queue,
    animationFrame: animationFrame_1.animationFrame,
    async: async_1.async
};
exports.Scheduler = Scheduler;
/**
 * @typedef {Object} Rx.Symbol
 * @property {Symbol|string} rxSubscriber A symbol to use as a property name to
 * retrieve an "Rx safe" Observer from an object. "Rx safety" can be defined as
 * an object that has all of the traits of an Rx Subscriber, including the
 * ability to add and remove subscriptions to the subscription chain and
 * guarantees involving event triggering (can't "next" after unsubscription,
 * etc).
 * @property {Symbol|string} observable A symbol to use as a property name to
 * retrieve an Observable as defined by the [ECMAScript "Observable" spec](https://github.com/zenparsing/es-observable).
 * @property {Symbol|string} iterator The ES6 symbol to use as a property name
 * to retrieve an iterator from an object.
 */
var Symbol = {
    rxSubscriber: rxSubscriber_1.rxSubscriber,
    observable: observable_1.observable,
    iterator: iterator_1.iterator
};
exports.Symbol = Symbol;
//# sourceMappingURL=Rx.js.map
return module.exports;

});
