define(function(require,exports,module){

import { CombineLatestOperator } from '../operators/combineLatest';
export function combineAll(project) {
    return (source) => source.lift(new CombineLatestOperator(project));
}
//# sourceMappingURL=combineAll.js.map
return module.exports;

});
