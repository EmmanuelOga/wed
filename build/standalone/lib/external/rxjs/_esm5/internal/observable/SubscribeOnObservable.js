define(function(require,exports,module){

/** PURE_IMPORTS_START tslib,_Observable,_scheduler_asap,_util_isNumeric PURE_IMPORTS_END */
import * as tslib_1 from "tslib";
import { Observable } from '../Observable';
import { asap } from '../scheduler/asap';
import { isNumeric } from '../util/isNumeric';
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var SubscribeOnObservable = /*@__PURE__*/ (function (_super) {
    tslib_1.__extends(SubscribeOnObservable, _super);
    function SubscribeOnObservable(source, delayTime, scheduler) {
        if (delayTime === void 0) {
            delayTime = 0;
        }
        if (scheduler === void 0) {
            scheduler = asap;
        }
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.delayTime = delayTime;
        _this.scheduler = scheduler;
        if (!isNumeric(delayTime) || delayTime < 0) {
            _this.delayTime = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            _this.scheduler = asap;
        }
        return _this;
    }
    /** @nocollapse */
    SubscribeOnObservable.create = function (source, delay, scheduler) {
        if (delay === void 0) {
            delay = 0;
        }
        if (scheduler === void 0) {
            scheduler = asap;
        }
        return new SubscribeOnObservable(source, delay, scheduler);
    };
    /** @nocollapse */
    SubscribeOnObservable.dispatch = function (arg) {
        var source = arg.source, subscriber = arg.subscriber;
        return this.add(source.subscribe(subscriber));
    };
    /** @deprecated This is an internal implementation detail, do not use. */
    SubscribeOnObservable.prototype._subscribe = function (subscriber) {
        var delay = this.delayTime;
        var source = this.source;
        var scheduler = this.scheduler;
        return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
            source: source, subscriber: subscriber
        });
    };
    return SubscribeOnObservable;
}(Observable));
export { SubscribeOnObservable };
//# sourceMappingURL=SubscribeOnObservable.js.map

return module.exports;

});
