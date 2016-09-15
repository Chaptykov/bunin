;(function() {
    var BuninDictionaries = {
        "qwerty": {
            "u102": "а",
            "u44": "б",
            "u100": "в",
            "u117": "г",
            "u108": "д",
            "u116": "е",
            "u92": "ё",
            "u59": "ж",
            "u112": "з",
            "u98": "и",
            "u113": "й",
            "u114": "к",
            "u107": "л",
            "u118": "м",
            "u121": "н",
            "u106": "о",
            "u103": "п",
            "u104": "р",
            "u99": "с",
            "u110": "т",
            "u101": "у",
            "u97": "ф",
            "u91": "х",
            "u119": "ц",
            "u120": "ч",
            "u105": "ш",
            "u111": "щ",
            "u93": "ъ",
            "u109": "ь",
            "u115": "ы",
            "u39": "э",
            "u46": "ю",
            "u122": "я",

            "u60": "Б",
            "u126": "Ё",
            "u58": "Ж",
            "u123": "Х",
            "u125": "Ъ",
            "u34": "Э",
            "u62": "Ю",

            "u64": "\"",
            "u35": "№",
            "u36": ";",
            "u37": "%",
            "u94": ":",
            "u38": "?",
            "u63": ",",
            "u47": "."
        }
    };

    if (typeof window != 'undefined') {
        if (!window.BuninDictionaries) {
            window.BuninDictionaries = {};
        }

        for (var key in BuninDictionaries) {
            if (BuninDictionaries.hasOwnProperty(key) && !window.BuninDictionaries[key]) {
                window.BuninDictionaries[key] = BuninDictionaries[key];
            }
        }
    }

    if (typeof module != 'undefined' && module && module.exports) {
        module.exports = BuninDictionaries;
    }
})();
