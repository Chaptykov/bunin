var defaultDictionary = {
    "u1072": "a",    // а
    "u1073": "b",    // б
    "u1074": "v",    // в
    "u1075": "g",    // г
    "u1076": "d",    // д
    "u1077": "e",    // е
    "u1105": "yo",   // ё
    "u1078": "zh",   // ж
    "u1079": "z",    // з
    "u1080": "i",    // и
    "u1081": "y",    // й
    "u1082": "k",    // к
    "u1083": "l",    // л
    "u1084": "m",    // м
    "u1085": "n",    // н
    "u1086": "o",    // о
    "u1087": "p",    // п
    "u1088": "r",    // р
    "u1089": "s",    // с
    "u1090": "t",    // т
    "u1091": "u",    // у
    "u1092": "f",    // ф
    "u1093": "kh",   // х
    "u1094": "ts",   // ц
    "u1095": "ch",   // ч
    "u1096": "sh",   // ш
    "u1097": "shch", // щ
    "u1098": "'",    // ъ
    "u1099": "y",    // ы
    "u1100": "'",    // ь
    "u1101": "e",    // э
    "u1102": "yu",   // ю
    "u1103": "ya"    // я
};


function Bunin(dictionaries) {
    var instance = this instanceof Bunin ? this : Object.create(Bunin.prototype), // @TODO Object.create
        b = instance;

    b.direct = {};
    b.direct.defaultDictionary = b.mergeSets(defaultDictionary, b.getUpperCaseDictionary(defaultDictionary));
    b.data = {};

    if (typeof window != 'undefined' && window.BuninDictionaries) {
        b.initSets(window.BuninDictionaries);
    }

    b.initSets(dictionaries);

    return instance;
}

Bunin.prototype = {
    /**
     * Extends dictionary with uppercase symbols
     *
     * @private
     * @param {object} set - Dictionary object
     * @returns {object}
     */
    getUpperCaseDictionary: function(set) {
        var out = {};

        for (var key in set) {
            if (set.hasOwnProperty(key)) {
                var upperChr = String.fromCharCode(key.slice(1)).toUpperCase(),
                    upperChrKey = 'u' + upperChr.charCodeAt(0);

                if (!set[upperChrKey]) {
                    out[upperChrKey] = set[key].slice(0, 1).toUpperCase() + set[key].slice(1);
                } else {
                    out[upperChrKey] = set[upperChrKey];
                }

            }
        }

        return out;
    },

    /**
     * Merges some dictionaries
     *
     * @private
     * @param {...object} set - Dictionary object
     * @returns {object}
     */
    mergeSets: function(set) {
        var out = {},
            key;

        if (arguments.length) {
            for (var i = 0, len = arguments.length; i < len; i++) {
                for (key in arguments[i]) {
                    if (arguments[i].hasOwnProperty(key)) {
                        out[key] = arguments[i][key];
                    }
                }
            }
        }

        return out;
    },

    /**
     * Executes function with every dictionary
     *
     * @private
     * @param {function} iteratee - Iteratee function
     */
    forEachSet: function(iteratee) {
        var b = this;

        for (var key in b.direct) {
            if (b.direct.hasOwnProperty(key)) {
                iteratee.call(b, b.direct[key], key);
            }
        }
    },

    /**
     * Map decorator for string
     *
     * @private
     * @param {string} str - String
     * @param {function} iteratee - Iteratee function
     * @returns {string}
     */
    mapChar: function(str, iteratee) {
        var out = '',
            chr;

        for (var i = 0, len = str.length; i < len; i++) {
            chr = str.charAt(i);

            out += iteratee.call(this, chr, i);
        }

        return out;
    },

    /**
     * Adds sets to instanse
     *
     * @private
     * @param {object} sets - Object with dictionaries
     */
    initSets: function(sets) {
        var b = this;

        if (sets) {
            for (var key in sets) {
                if (sets.hasOwnProperty(key)) {
                    b.direct[key] = b.mergeSets(
                        b.direct.defaultDictionary,
                        b.getUpperCaseDictionary(sets[key]),
                        sets[key]
                    );
                }
            }
        }
    },

    /**
     * Translates string
     *
     * @param {string} str - String
     * @param {string} setName - Dictionary name
     * @returns {string|object}
     */
    translate: function(str, setName) {
        var wrongTypeMessage = 'Argument should be a string';

        if (typeof str != 'string') {
            console.warn(wrongTypeMessage);

            try {
                str = str.toString();
            } catch(e) {}

            if (typeof str != 'string') {
                str = '';
            }
        }

        if (typeof setName != 'string' && setName !== undefined) {
            console.warn(wrongTypeMessage);
            setName = undefined;
        }

        if (setName !== undefined && !this.direct[setName]) {
            console.warn('Unknown dictionary');
            return str;
        }

        return this.translateDirect(str, setName);
    },

    /**
     * Translates string (direct translation)
     *
     * @private
     * @param {string} str - String
     * @param {string} setName - Dictionary name
     * @returns {string|object}
     */
    translateDirect: function(str, setName) {
        var b = this,
            out;

        function translate(set) {
            return b.mapChar(str, function(chr) {
                var res = set['u' + chr.charCodeAt(0)]

                return typeof res == 'string' ? res : chr;
            });
        }

        if (setName !== undefined) {
            out = translate(b.direct[setName]);
        } else {
            out = {};

            b.forEachSet(function(set, key) {
                out[key] = translate(set);
            });
        }

        return out;
    }
};

if (typeof window != 'undefined') {
    window.Bunin = Bunin;
}

if (module && module.exports) {
    module.exports = Bunin;
}
