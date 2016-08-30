require.config({
    "baseUrl": "lib/",
    "paths": {
        "test-files": "../../test-files/",
        "jquery": "external/jquery",
        "bootstrap": "external/bootstrap/js/bootstrap.min",
        "log4javascript": "external/log4javascript",
        "jquery.bootstrap-growl": "external/jquery.bootstrap-growl",
        "font-awesome": "external/font-awesome",
        "pubsub-js": "external/pubsub",
        "xregexp": "external/xregexp",
        "text": "requirejs/text",
        "optional": "requirejs/optional",
        "localforage": "external/localforage",
        "async": "external/async",
        "angular": "external/angular",
        "bootbox": "external/bootbox",
        "typeahead": "external/typeahead.bundle.min",
        "urijs": "external/urijs",
        "interact": "external/interact.min",
        "merge-options": "external/merge-options",
        "is-plain-obj": "external/is-plain-obj",
        "bluebird": "external/bluebird",
        "last-resort": "external/last-resort"
    },
    "packages": [
        {
            "name": "lodash",
            "location": "external/lodash"
        }
    ],
    "map": {
        "*": {
            "bootstrap": "wed/patches/bootstrap",
            "last-resort": "wed/glue/last-resort"
        },
        "wed/glue/last-resort": {
            "last-resort": "last-resort"
        },
        "wed/patches/bootstrap": {
            "bootstrap": "bootstrap"
        }
    },
    "shim": {
        "xregexp": {
            "exports": "XRegExp",
            "init": function () { return {XRegExp: XRegExp}; }
        },
        "bootstrap": {
            "deps": [
                "jquery"
            ],
            "exports": "jQuery.fn.popover",
            "init": function () { jQuery.noConflict() }
        },
        "external/rangy/rangy-core": {
            "exports": "rangy",
            "init": function () { return this.rangy; }
        },
        "external/rangy/rangy-selectionsaverestore": {
            "deps": [
                "external/rangy/rangy-core"
            ],
            "exports": "rangy.modules.SaveRestore"
        },
        "jquery.bootstrap-growl": {
            "deps": [
                "jquery",
                "bootstrap"
            ],
            "exports": "jQuery.bootstrapGrowl"
        },
        "log4javascript": {
            "exports": "log4javascript"
        },
        "angular": {
            "deps": [
                "jquery"
            ],
            "exports": "angular"
        },
        "bootbox": {
            "deps": [
                "bootstrap"
            ],
            "exports": "bootbox"
        },
        "typeahead": {
            "deps": [
                "jquery"
            ],
            "exports": "Bloodhound"
        }
    },
    "waitSeconds": 12,
    "enforceDefine": true
});
define("wed/config", {
    "config": {
        "schema": "../../../schemas/tei-simplified-rng.js",
        "mode": {
            "path": "wed/modes/generic/generic",
            "options": {
                "meta": {
                    "path": "wed/modes/generic/metas/tei_meta",
                    "options": {
                        "metadata": "../../../../../schemas/tei-metadata.json"
                    }
                }
            }
        }
    }
});
