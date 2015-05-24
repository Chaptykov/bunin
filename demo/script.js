(function() {
    var defaultSource = document.getElementById('default-source'),
        defaultTarget = document.getElementById('default-target'),
        multipleSource = document.getElementById('multiple-source'),
        multipleTarget = document.getElementById('multiple-target'),
        keyboardSource = document.getElementById('keyboard-source'),
        keyboardTarget = document.getElementById('keyboard-target');

    var B = new Bunin();

    function defaultTranslate() {
        var text = defaultSource.innerHTML;

        defaultTarget.innerHTML = B.translate(text, 'defaultDictionary');
    }

    function multipleTranslate() {
        var text = multipleSource.innerHTML,
            out = '',
            translated = B.translate(text);

        for (var key in translated) {
            if (translated.hasOwnProperty(key) && key != 'defaultDictionary') {
                out += key + '\n' + translated[key] + '\n\n';
            }
        }

        multipleTarget.innerHTML = out;
    }

    function keyboardTranslate() {
        var text = keyboardSource.innerHTML;

        keyboardTarget.innerHTML = B.translate(text, 'qwerty');
    }

    defaultTranslate();
    multipleTranslate();
    keyboardTranslate();

    defaultSource.addEventListener('keyup', defaultTranslate, false);
    defaultSource.addEventListener('change', defaultTranslate, false);
})();