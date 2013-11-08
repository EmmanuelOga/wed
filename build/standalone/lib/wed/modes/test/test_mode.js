/**
 * @module modes/test/test_mode
 * @desc A mode for testing.
 * @author Louis-Dominique Dubeau
 * @license MPL 2.0
 * @copyright 2013 Mangalam Research Center for Buddhist Languages
 */
define(/** @lends module:modes/test/test_mode*/
function (require, exports, module) {
'use strict';

var $ = require("jquery");
var util = require("wed/util");
var log = require("wed/log");
var Mode = require("wed/modes/generic/generic").Mode;
var oop = require("wed/oop");
var transformation = require("wed/transformation");
var rangy = require("rangy");
var tei_meta = require("wed/modes/generic/metas/tei_meta");
var domutil = require("wed/domutil");
var TestDecorator = require("./test_decorator").TestDecorator;

/**
 * This mode is purely designed to help test wed, and nothing
 * else. Don't derive anything from it and don't use it for editing.
 *
 * @class
 * @extends module:modes/generic/generic~Mode
 * @param {Object} options The options for the mode.
 */
function TestMode () {
    Mode.apply(this, arguments);
    this._contextual_menu_items = [];
}

oop.inherit(TestMode, Mode);

TestMode.optionResolver = Mode.optionResolver;

TestMode.prototype.makeDecorator = function () {
    var obj = Object.create(TestDecorator.prototype);
    var args = Array.prototype.slice.call(arguments);
    args = [this, this._meta, this._options].concat(args);
    TestDecorator.apply(obj, args);
    return obj;
};


exports.Mode = TestMode;

});

//  LocalWords:  domutil metas tei oop util jquery Mangalam MPL
//  LocalWords:  Dubeau