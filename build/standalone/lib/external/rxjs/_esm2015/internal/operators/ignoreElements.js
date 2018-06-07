define(function(require,exports,module){

import { Subscriber } from '../Subscriber';
/**
 * Ignores all items emitted by the source Observable and only passes calls of `complete` or `error`.
 *
 * <img src="./img/ignoreElements.png" width="100%">
 *
 * @return {Observable} An empty Observable that only calls `complete`
 * or `error`, based on which one is called by the source Observable.
 * @method ignoreElements
 * @owner Observable
 */
export function ignoreElements() {
    return function ignoreElementsOperatorFunction(source) {
        return source.lift(new IgnoreElementsOperator());
    };
}
class IgnoreElementsOperator {
    call(subscriber, source) {
        return source.subscribe(new IgnoreElementsSubscriber(subscriber));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class IgnoreElementsSubscriber extends Subscriber {
    _next(unused) {
        // Do nothing
    }
}
//# sourceMappingURL=ignoreElements.js.map
return module.exports;

});
