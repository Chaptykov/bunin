;(function() {
    var BuninDictionaries = {
        'BGN/PCGN': {
            "u1077": "ye",   // е
            "u1105": "yё",   // ё
            "u1098": "”",    // ъ
            "u1100": "’"     // ь
        },
        'ALA-LC': {
            "u1077": "e",    // е
            "u1105": "ё",    // ё
            "u1081": "ĭ",    // й
            "u1098": "ʺ",    // ъ
            "u1100": "ʹ",    // ь
            "u1101": "ė",    // э
            "u1102": "iu",   // ю
            "u1103": "ia"    // я
        },
        'GOST': {
            "u1077": "e",    // е
            "u1105": "ё",    // ё
            "u1078": "ž",    // ж
            "u1081": "j",    // й
            "u1093": "h",    // х
            "u1094": "c",    // ц
            "u1095": "č",    // ч
            "u1096": "š",    // ш
            "u1097": "šč",   // щ
            "u1098": "\"",   // ъ
            "u1100": "'",    // ь
            "u1101": "è",    // э
            "u1102": "ju",   // ю
            "u1103": "ja"    // я
        },
        'ISO/R 9': {
            "u1077": "e",    // е
            "u1105": "ё",    // ё
            "u1078": "ž",    // ж
            "u1081": "j",    // й
            "u1093": "ch",   // х
            "u1094": "c",    // ц
            "u1095": "č",    // ч
            "u1096": "š",    // ш
            "u1097": "šč",   // щ
            "u1098": "ʺ",    // ъ
            "u1100": "ʹ",    // ь
            "u1101": "ė",    // э
            "u1102": "ju",   // ю
            "u1103": "ja"    // я
        },
        'ISO 9': {
            "u1077": "e",    // е
            "u1105": "ё",    // ё
            "u1078": "ž",    // ж
            "u1081": "j",    // й
            "u1093": "h",    // х
            "u1094": "c",    // ц
            "u1095": "č",    // ч
            "u1096": "š",    // ш
            "u1097": "ŝ",    // щ
            "u1098": "ʺ",    // ъ
            "u1100": "ʹ",    // ь
            "u1101": "è",    // э
            "u1102": "û",    // ю
            "u1103": "â"     // я
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

    if (module && module.exports) {
        module.exports = BuninDictionaries;
    }
})();
