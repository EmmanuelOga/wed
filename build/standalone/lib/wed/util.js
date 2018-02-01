/**
 * Various utilities for wed.
 * @author Louis-Dominique Dubeau
 * @license MPL 2.0
 * @copyright Mangalam Research Center for Buddhist Languages
 */
define(["require", "exports", "diff"], function (require, exports, diff_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Calculates the distance on the basis of two deltas. This would typically be
     * called with the difference of X coordinates and the difference of Y
     * coordinates.
     *
     * @param delta1 The first delta.
     *
     * @param delta2 The second delta.
     *
     * @returns The distance.
     */
    function distFromDeltas(delta1, delta2) {
        return Math.sqrt(delta1 * delta1 + delta2 * delta2);
    }
    exports.distFromDeltas = distFromDeltas;
    /**
     * Measures the distance of a point from a rectangle. If the point is in the
     * rectangle or touches it, the distance is 0. In the nomenclature below, left
     * and right are on the X axis and top and bottom on the Y axis.
     *
     * @param x The x coordinate of the point.
     *
     * @param y The y coordinate of the point.
     *
     * @param left The left coordinate of the rectangle.
     *
     * @param top The top coordinate of the rectangle.
     *
     * @param right The right coordinate of the rectangle.
     *
     * @param bottom The bottom coordinate of the rectangle.
     *
     * @returns The distance.
     */
    function distFromRect(x, y, left, top, right, bottom) {
        var topDelta = y - top;
        var leftDelta = x - left;
        var bottomDelta = y - bottom;
        var rightDelta = x - right;
        var above = topDelta < 0;
        var below = bottomDelta > 0;
        // Neologism used to avoid conflict with left above.
        var lefter = leftDelta < 0;
        var righter = rightDelta > 0;
        var deltaX = lefter ? leftDelta : (righter ? rightDelta : 0);
        var deltaY = above ? topDelta : (below ? bottomDelta : 0);
        return distFromDeltas(deltaX, deltaY);
    }
    exports.distFromRect = distFromRect;
    /**
     * Measures the absolute horizontal and vertical distances of a point from a
     * rectangle. If the point is in the rectangle or touches it, the distance is
     * 0. In the nomenclature below, left and right are on the X axis and top and
     * bottom on the Y axis.
     *
     * @param x The x coordinate of the point.
     *
     * @param y The y coordinate of the point.
     *
     * @param left The left coordinate of the rectangle.
     *
     * @param top The top coordinate of the rectangle.
     *
     * @param right The right coordinate of the rectangle.
     *
     * @param bottom The bottom coordinate of the rectangle.
     *
     * @returns The distance.
     */
    function distsFromRect(x, y, left, top, right, bottom) {
        var topDelta = y - top;
        var leftDelta = x - left;
        var bottomDelta = y - bottom;
        var rightDelta = x - right;
        var above = topDelta < 0;
        var below = bottomDelta > 0;
        // Neologism used to avoid conflict with left above.
        var lefter = leftDelta < 0;
        var righter = rightDelta > 0;
        var deltaX = lefter ? leftDelta : (righter ? rightDelta : 0);
        var deltaY = above ? topDelta : (below ? bottomDelta : 0);
        return { x: Math.abs(deltaX), y: Math.abs(deltaY) };
    }
    exports.distsFromRect = distsFromRect;
    /**
     * Escape character in CSS class that could cause trouble in CSS
     * selectors. *This is not a general solution.* It supports enough for the needs
     * of wed.
     *
     * @param cls The class
     *
     * @returns The escaped class.
     */
    function escapeCSSClass(cls) {
        // We should investigate replacing this with CSS.escape whenever the spec for
        // that function becomes stable.
        return cls.replace(/([\][\\/!"#$%&'()*+,.:;<=>?@^`{|}~])/g, "\\$1");
    }
    exports.escapeCSSClass = escapeCSSClass;
    /**
     * Get the original element name of a node created for wed's data tree.
     *
     * @param el The element whose name we want.
     *
     * @returns The name.
     */
    function getOriginalName(el) {
        // The original name is the first class name of the element that was created.
        return el.classList[0];
    }
    exports.getOriginalName = getOriginalName;
    /**
     * Makes a class string for a node in wed's data tree. The string is meant to be
     * used for the corresponding node in wed's GUI tree.
     *
     * @param name The original element name.
     *
     * @param namespaces The namespaces that are known. This is used to convert
     * element name prefixes to namespace URIs.
     *
     * @returns The class string.
     */
    function classFromOriginalName(name, namespaces) {
        // Special case if we want to match all
        if (name === "*") {
            return "._real";
        }
        var _a = name.split(":"), prefix = _a[0], localName = _a[1];
        if (localName === undefined) {
            localName = prefix;
            prefix = "";
        }
        var ns = namespaces[prefix];
        if (ns === undefined) {
            throw new Error("prefix " + prefix + " is not defined in namespaces");
        }
        // We do not output `.${escapeCSSClass(name)}` because that's redundant for a
        // search.
        return "._local_" + escapeCSSClass(localName) + "._xmlns_" + escapeCSSClass(ns) + "._real";
    }
    exports.classFromOriginalName = classFromOriginalName;
    /**
     * Convert a string to a sequence of char codes. Each char code will be preceded
     * by the character ``x``. The char codes are converted to hexadecimal.
     *
     * This is meant to be used by wed's internal code.
     *
     * @private
     *
     * @param str The string to encode.
     *
     * @returns The encoded string.
     */
    function stringToCodeSequence(str) {
        var encoded = "";
        for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
            var char = str_1[_i];
            encoded += "x" + char.charCodeAt(0).toString(16);
        }
        return encoded;
    }
    exports.stringToCodeSequence = stringToCodeSequence;
    var ENCODED_RE = /^(?:x[a-f0-9]+)+$/;
    /**
     * Convert a code sequence created with [[stringToCodeSequence]] to a string.
     *
     * This is meant to be used by wed's internal code.
     *
     * @private
     *
     * @param str The sequence to decode.
     *
     * @returns The decoded string.
     */
    function codeSequenceToString(str) {
        if (!ENCODED_RE.test(str)) {
            throw new Error("badly encoded string");
        }
        var decoded = "";
        // We slice to skip the initial x, and not get a first part which is "".
        for (var _i = 0, _a = str.slice(1).split("x"); _i < _a.length; _i++) {
            var code = _a[_i];
            decoded += String.fromCharCode(parseInt(code, 16));
        }
        return decoded;
    }
    exports.codeSequenceToString = codeSequenceToString;
    /**
     * Encode the difference between an original string, and a modified string. This
     * is a specialized function designed to handle the difference between the name
     * we want to set for an attribute, and the name that HTML actually records.
     *
     * This function records the difference as a series of steps to recover the
     * original string:
     *
     * - ``g[number]`` means take ``[number]`` characters from the modified string
     *   as they are.
     *
     * - ``m[number]`` means remove ``[number]`` characters from the modified
     *   string.
     *
     * - ``p[codes]`` means add the codes ``[codes]`` to the modified string.
     *
     * - ``u[number]`` means convert ``[number]`` characters from the modified
     *   string to uppercase.
     *
     * This is meant to be used by wed's internal code.
     *
     * @private
     *
     * @param orig The original.
     *
     * @param modified The modified string.
     *
     * @returns The difference, encoded as a string.
     */
    function encodeDiff(orig, modified) {
        var diff = "";
        if (orig !== modified) {
            var results = diff_1.diffChars(modified, orig);
            var last = results[results.length - 1];
            for (var ix = 0; ix < results.length; ++ix) {
                var result = results[ix];
                if (result.added === true) {
                    diff += "p" + stringToCodeSequence(result.value);
                }
                else if (result.removed === true) {
                    var next = results[ix + 1];
                    if ((next !== undefined && next.added === true) &&
                        (result.value.toUpperCase() === next.value)) {
                        diff += "u" + result.value.length;
                        ix++;
                    }
                    else {
                        diff += "m" + result.value.length;
                    }
                }
                else {
                    // We don't output this if it is last, as it is implied.
                    if (result !== last) {
                        diff += "g" + result.value.length;
                    }
                }
            }
        }
        return diff;
    }
    exports.encodeDiff = encodeDiff;
    var OP_RE = /^(?:p([xa-f0-9]+))|(?:[gmu](\d+))/;
    /**
     * Decode the diff produced with [[encodeDiff]].
     *
     * This is meant to be used by wed's internal code.
     *
     * @private
     *
     * @param name The name, after encoding.
     *
     * @param diff The diff.
     *
     * @returns The decoded attribute name.
     */
    function decodeDiff(name, diff) {
        if (diff === "") {
            return name;
        }
        var nameIndex = 0;
        var result = "";
        while (diff.length > 0) {
            var match = diff.match(OP_RE);
            if (match !== null) {
                diff = diff.slice(match[0].length);
                var op = match[0][0];
                switch (op) {
                    case "g":
                    case "m":
                    case "u":
                        var length_1 = parseInt(match[2]);
                        switch (op) {
                            case "g":
                                result += name.slice(nameIndex, nameIndex + length_1);
                                break;
                            case "u":
                                result += name.slice(nameIndex, nameIndex + length_1).toUpperCase();
                                break;
                            case "m":
                                break;
                            default:
                                throw new Error("internal error: unexpected op " + op);
                        }
                        nameIndex += length_1;
                        break;
                    case "p":
                        result += codeSequenceToString(match[1]);
                        break;
                    default:
                        throw new Error("unexpected operator " + op);
                }
            }
            // Nothing matched
            if (match === null) {
                throw new Error("cannot parse diff: " + diff);
            }
        }
        // It is implied that the rest of the name is added.
        result += name.slice(nameIndex);
        return result;
    }
    exports.decodeDiff = decodeDiff;
    /**
     * Transforms an attribute name from wed's data tree to the original attribute
     * name before the data was transformed for use with wed. This reverses the
     * transformation done with [[encodeAttrName]].
     *
     * @param encoded The encoded name.
     *
     * @returns A structure containing the decoded name the optional qualifier.
     */
    function decodeAttrName(encoded) {
        var match = /^data-wed-(.+)-([^-]*?)$/.exec(encoded);
        if (match === null) {
            throw new Error("malformed name");
        }
        // tslint:disable-next-line:prefer-const
        var name = match[1], diff = match[2];
        var qualifier;
        // qualifier
        if (name[0] === "-") {
            var parts = /^-(.+?)-(.+)$/.exec(name);
            if (parts === null) {
                throw new Error("malformed name");
            }
            qualifier = parts[1], name = parts[2];
        }
        name = name.replace(/---/, ":").replace(/---(-+)/g, "--$1");
        if (diff !== "") {
            name = decodeDiff(name, diff);
        }
        return { name: name, qualifier: qualifier };
    }
    exports.decodeAttrName = decodeAttrName;
    /**
     * Transforms an attribute name from its unencoded form in the original XML data
     * (before transformation for use with wed) to its encoded name.
     *
     * The first thing this algorithm does is compute a difference between the
     * original XML name and how HTML will record it. The issue here is that XML
     * allows more characters in a name than what HTML allows and doing
     * ``setAttribute(name, value)`` will silently convert ``name`` to something
     * HTML likes. The issue most frequently encountered is that uppercase letters
     * are encoded as lowercase. This is especially vexing seeing as XML allows the
     * attribute names ``x`` and ``X`` to exist as different attributes, whereas
     * HTML does not. For HTML ``x`` and ``X`` are the same attribute. This function
     * records any differences between the original name and the way HTML records it
     * with a diff string that is appended to the final name after a dash. If
     * nothing appears after the final dash, then the HTML name and the XML name are
     * the same.
     *
     * A sequence of three dashes or more is converted by adding another dash. (So
     * sequences of single dash, or a pair of dashes remain unchanged. But all
     * sequences of 3 dashes or more gets an additional dash.)
     *
     * A colon (``:``) is converted to three dashes ``---``.
     *
     * After transformation above the name is prepended with ``data-wed-`` and it is
     * appended with the diff described above.
     *
     * Examples:
     *
     * - ``foo:bar`` becomes ``data-wed-foo---bar-``. Note how the diff is
     *    empty, because ``foo:bar`` can be represented as-is in HTML.
     *
     * - ``MOO:aBc---def`` becomes ``data-wed-moo---abc----def-u3g2u1``. Note the
     *   diff suffix, which allows restoring the orignal case.
     *
     * When ``qualifier`` is used, the qualifier is added just after ``data-wed-``
     * and is prepended and appended with a dash. So ``foo:bar`` with the qualifier
     * ``ns`` would become ``data-wed--ns-foo---bar-``. The addition of a dash in
     * front of the qualifier makes it impossible to confuse an encoding that has a
     * qualifier from one that does not, as XML attribute names are not allowed to
     * start with a dash.
     *
     * @param name The unencoded name (i.e. the attribute name as it is in XML).
     *
     * @param qualifier An optional qualifier.
     *
     * @returns The encoded name.
     */
    function encodeAttrName(name, qualifier) {
        var el = document.createElement("div");
        // We havve to add the "data-" prefix to guard against some problems. IE11,
        // for instance, will choke if we set an attribute with the name "style". It
        // simply does not generally allow ``setAttribute("style", ...)``. Adding the
        // prefix, works around the problem. And we know "data-" will not be mangled,
        // so we can just strip it afterwards.
        el.setAttribute("data-" + name, "");
        // Slice it to remove the "data-" prefix.
        var attrName = el.attributes[0].name.slice(5);
        var sanitized = attrName.replace(/--(-+)/g, "---$1").replace(/:/, "---");
        qualifier = qualifier === undefined ? "" : "-" + qualifier + "-";
        return "data-wed-" + qualifier + sanitized + "-" + encodeDiff(name, attrName);
    }
    exports.encodeAttrName = encodeAttrName;
    /**
     * Determines whether a ``data-wed-`` attribute corresponds to an XML attribute.
     */
    function isXMLAttrName(name) {
        return /^data-wed-(?!-)/.test(name);
    }
    exports.isXMLAttrName = isXMLAttrName;
    /**
     * Gets all the attributes of the node that were "original" attributes in the
     * XML document being edited, by opposition to those attributes that exist only
     * for HTML rendering.
     *
     * @param node The node to process.
     *
     * @returns An object whose keys are attribute names and values are attribute
     * values.
     */
    function getOriginalAttributes(node) {
        var original = Object.create(null);
        var attributes = node.attributes;
        for (var i = 0; i < attributes.length; ++i) {
            var attr = attributes[i];
            var localName = attr.localName;
            if (isXMLAttrName(localName)) {
                original[decodeAttrName(localName).name] = attr.value;
            }
        }
        return original;
    }
    exports.getOriginalAttributes = getOriginalAttributes;
    var nextID = 0;
    /**
     * Generates a new generic element id. This id is guaranteed to be unique for
     * the current run of wed. The ids generated by this function are meant to be
     * eventually replaced by something more permanent.
     *
     * @returns An element id.
     */
    function newGenericID() {
        return "WED-ID-" + ++nextID;
    }
    exports.newGenericID = newGenericID;
    /**
     * @param ev A DOM event.
     *
     * @returns ``true`` if Control, Alt or Meta were held when the event was
     * created. Otherwise, ``false``.
     */
    function anySpecialKeyHeld(ev) {
        var anyEv = ev;
        return anyEv.altKey || anyEv.ctrlKey || anyEv.metaKey;
    }
    exports.anySpecialKeyHeld = anySpecialKeyHeld;
    /**
     * **This function is meant to be used in debugging.** It creates a
     * ``selenium_log`` object on ``window`` which is an array that contains the
     * series of ``obj`` passed to this function. Remember that ultimately
     * ``selenium_log`` is going to be serialized by Selenium. So go easy on what
     * you put in there and be aware that Selenium may have bugs that prevent
     * serialization of certain objects.
     *
     * @param args Objects to log.
     */
    /* tslint:disable:no-any no-unsafe-any */
    function seleniumLog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var w = window;
        if (w.selenium_log === undefined) {
            w.selenium_log = [];
        }
        w.selenium_log.push.apply(w.selenium_log, args);
    }
    exports.seleniumLog = seleniumLog;
    function _exceptionStackTrace(err) {
        try {
            throw err;
        }
        catch (e) {
            return e.stack;
        }
    }
    /* tslint:enable */
    /**
     * **This function is meant to be used in debugging.** Gets a stack trace. This
     * is only as cross-platform as needed for the platforms we support.
     *
     * Support for IE 9 is missing because it was designed by baboons.
     */
    function stackTrace() {
        var err = new Error();
        if (err.stack != null) {
            return err.stack;
        }
        // If the stack is not filled already (true of IE 10, 11) then raise an
        // exception to fill it.
        return _exceptionStackTrace(err);
    }
    exports.stackTrace = stackTrace;
    /**
     * Convert a "pattern object" to a string that can be shown to the user. This
     * function is meant to be used for "complex" name patterns that we may get from
     * salve. Note that a "pattern object" is the result of calling ``toObject()``
     * on the pattern. The goal of this function is to convert the pattern object to
     * a string that would be interpretable by the end user.
     *
     * An explanation about how this handles namespaces and wildcard patterns is in
     * order. In a Relax NG schema the name pattern ``*`` in the compact notation is
     * equivalent to ``<anyName/>`` in the expanded notation. And ``foo:*`` is
     * equivalent to ``<nsName ns="uri_of_foo">`` where ``uri_of_foo`` is the URI
     * that has been associated with ``foo`` in the compact schema. It would be nice
     * if the function here could reuse this notation, but we cannot. Consider the
     * case where an Relax NG schema in the compact notation wants to declare a name
     * pattern which means "any name in the default namespace". In XML we express a
     * name in the default namespace currently in effect by simply not prefixing it
     * with a namespace name: whereas ``foo:bar`` is the ``bar`` element in the
     * ``foo`` namespace, ``bar`` is the ``bar`` element in the default
     * namespace. The pattern "any element in namespace foo" is represented with
     * ``foo:*``, however we cannot use ``*`` to mean "any element in the default
     * namespace", because ``*`` means "any name in any namespace whatsoever". The
     * compact notation forces the author of the schema to use a prefix for the
     * default namespace. And because of this, ``*`` means unambiguously "any
     * element in any namespace".
     *
     * So the ``*`` in the Relax NG schema becomes ``*:*`` here. "Any element in the
     * default namespace" is represented by ``*``. Thus ``foo:*`` and ``*`` can
     * stand in the same relation to one another as ``foo:bar`` and ``bar``.
     *
     * @param obj The "pattern object" to convert.
     * @param resolver The resolver to use to convert URIs to prefixes.
     * @returns The string representing the pattern.
     */
    /* tslint:disable:no-any no-unsafe-any */
    function convertPatternObj(obj, resolver) {
        // NameChoice
        if (obj.a != null && obj.b != null) {
            return "(" + convertPatternObj(obj.a, resolver) + ") or (" + convertPatternObj(obj.b, resolver) + ")";
        }
        var ret;
        // AnyName
        if (obj.pattern === "AnyName") {
            ret = "*:*";
        }
        else {
            // Name and NsName
            if (obj.ns === undefined) {
                throw new Error("unexpected undefined obj.ns");
            }
            if (obj.name !== undefined) {
                ret = resolver.unresolveName(obj.ns, obj.name);
                // Cannot unresolve, use the expanded name.
                if (ret === undefined) {
                    ret = "{" + obj.ns + "}" + obj.name;
                }
            }
            else {
                var ns = resolver.prefixFromURI(obj.ns);
                // If ns is undefined, we cannot resolve the URI, so we
                // display the expanded name.
                if (ns === undefined) {
                    ret = "{" + obj.ns + "}";
                }
                else {
                    // An empty ns happens if the URI refers to the default
                    // namespace.
                    ret = (ns !== "") ? (ns + ":") : ns;
                }
                ret += "*";
            }
        }
        if (obj.except != null) {
            ret += " except (" + convertPatternObj(obj.except, resolver) + ")";
        }
        return ret;
    }
    exports.convertPatternObj = convertPatternObj;
    /* tslint:enable */
    function readFile(file) {
        var reader = new FileReader();
        return new Promise(function (resolve, reject) {
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }
    exports.readFile = readFile;
    /**
     * This is required to work around a problem when extending built-in classes
     * like ``Error``. Some of the constructors for these classes return a value
     * from the constructor, which is then picked up by the constructors generated
     * by TypeScript (same with ES6 code transpiled through Babel), and this messes
     * up the inheritance chain.
     *
     * See https://github.com/Microsoft/TypeScript/issues/12123.
     */
    // tslint:disable:no-any
    function fixPrototype(obj, parent) {
        var oldProto = Object.getPrototypeOf !== undefined ?
            Object.getPrototypeOf(obj) : obj.__proto__;
        if (oldProto !== parent) {
            if (Object.setPrototypeOf !== undefined) {
                Object.setPrototypeOf(obj, parent.prototype);
            }
            else {
                obj.__proto__ = parent.prototype;
            }
        }
    }
    exports.fixPrototype = fixPrototype;
    function suppressUnhandledRejections(p) {
        var pAsAny = p;
        if (pAsAny.suppressUnhandledRejections) {
            pAsAny.suppressUnhandledRejections();
        }
        return p;
    }
    exports.suppressUnhandledRejections = suppressUnhandledRejections;
});
// tslint:enable:no-any
//  LocalWords:  Mangalam MPL Dubeau util CSS wed's unencoded URIs localName ns
//  LocalWords:  escapeCSSClass xmlns prepended nextID NG NameChoice AnyName
//  LocalWords:  convertPatternObj NsName
//# sourceMappingURL=util.js.map