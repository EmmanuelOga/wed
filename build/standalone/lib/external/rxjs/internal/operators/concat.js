define(function(require,exports,module){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var concat_1 = require("../observable/concat");
/* tslint:enable:max-line-length */
/**
 * @deprecated Deprecated in favor of static concat.
 */
function concat() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    return function (source) { return source.lift.call(concat_1.concat.apply(void 0, [source].concat(observables))); };
}
exports.concat = concat;
//# sourceMappingURL=concat.js.map
return module.exports;

});
