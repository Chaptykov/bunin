var assert = require('assert');

describe('Bunin', function() {
    var Bunin, B;

    before(function() {
        Bunin = require('../src/bunin');
        B = new Bunin();
    });

    describe('getUpperCaseDictionary', function() {

        it('One symbol', function() {
            var data = {u1072: 'а'},
                expected = {u1040: 'А'};

            compareProperties(expected, B.getUpperCaseDictionary(data));
        });

        it('Two symbols', function() {
            var data = {u1072: 'а', u1073: 'б'},
                expected = {u1040: 'А', u1041: 'Б'};

            compareProperties(expected, B.getUpperCaseDictionary(data));
        });

        it('Has uppercase already', function() {
            var data = {u1040: 'А'},
                expected = {u1040: 'А'};

            compareProperties(expected, B.getUpperCaseDictionary(data));
        });

        it('Empty object', function() {
            var data = {},
                expected = {};

            assert.equal(typeof B.getUpperCaseDictionary(data), 'object');
            compareProperties(expected, B.getUpperCaseDictionary(data));
        });

        it('Empty string in value', function() {
            var data = {u1072: ''},
                expected = {u1040: ''};

            compareProperties(expected, B.getUpperCaseDictionary(data));
        });

    });

    describe('mergeSets', function() {

        it('Different properties', function() {
            var obj1 = {a: 'a'},
                obj2 = {b: 'b'},
                expected = {a: 'a', b: 'b'};

            compareProperties(expected, B.mergeSets(obj1, obj2));
        });

        it('Rewrite property', function() {
            var obj1 = {a: 'a'},
                obj2 = {a: 'a2'},
                expected = {a: 'a2'};

            compareProperties(expected, B.mergeSets(obj1, obj2));
        });

        it('Add and rewrite', function() {
            var obj1 = {a: 'a'},
                obj2 = {a: 'a2', b: 'b'},
                expected = {a: 'a2', b: 'b'};

            compareProperties(expected, B.mergeSets(obj1, obj2));
        });

        it('Three arguments', function() {
            var obj1 = {a: 'a'},
                obj2 = {b: 'b'},
                obj3 = {c: 'c'},
                expected = {a: 'a', b: 'b', c: 'c'};

            compareProperties(expected, B.mergeSets(obj1, obj2, obj3));
        });

        it('Without arguments', function() {
            var expected = {};

            assert.equal(typeof B.mergeSets(), 'object');
            compareProperties(expected, B.mergeSets());
        });

    });

    describe('forEachSet', function() {

        it('Default dictionary only', function() {
            var counter = 0;

            function cb(chr, i) {
                counter++;
            }

            B.forEachSet(cb);

            assert.equal(counter, 1);
        });

        it('Two dictionaries', function() {
            var counter = 0;

            function cb(chr, i) {
                counter++;
            }

            B.initSets({'second': {}});
            B.forEachSet(cb);

            assert.equal(counter, 2);
        });

    });

    describe('mapChar', function() {

        it('Simple', function() {
            var str = 'abc',
                expected = 'a0b1c2';

            function cb(chr, i) {
                return chr + i;
            }

            assert.equal(typeof B.mapChar(str, cb), 'string');
            assert.equal(expected, B.mapChar(str, cb));
        });

        it('Empty string', function() {
            var str = '',
                expected = '';

            function cb(chr, i) {
                return chr + i;
            }

            assert.equal(typeof B.mapChar(str, cb), 'string');
            assert.equal(expected, B.mapChar(str, cb));
        });

    });

    describe('initSets', function() {

        it('Simple', function() {
            var data = {
                    testSet: {}
                },
                expected = B.direct.defaultDictionary;

            B.initSets(data);

            assert.equal(typeof B.direct.testSet, 'object');
            compareProperties(expected, B.direct.testSet);
        });

        after(function() {
            B = new Bunin();
        });

    });

    describe('translateDirect', function() {

        it('There is a set', function() {
            var translated = B.translateDirect('Женьшень', 'defaultDictionary');

            assert.equal(typeof translated, 'string');
            assert.equal(translated, 'Zhen\'shen\'');
        });

        it('There isn\'t a set', function() {
            var translated = B.translateDirect('Женьшень'),
                expected = {
                    defaultDictionary: 'Zhen\'shen\''
                };

            assert.equal(typeof translated, 'object');
            compareProperties(expected, translated);
        });

    });

    describe('translate', function() {

        it('There isn\'t a set name', function() {
            var translated = B.translate('Женьшень'),
                expected = {defaultDictionary: 'Zhen\'shen\''};

            assert.equal(typeof translated, 'object');
            compareProperties(translated, expected);
        });

        it('There is a set name', function() {
            var translated = B.translate('Женьшень', 'defaultDictionary'),
                expected = 'Zhen\'shen\'';

            assert.equal(typeof translated, 'string');
            assert.equal(translated, expected);
        });

        it('Wrong set name', function() {
            var translated = B.translate('Женьшень', 'foo'),
                expected = 'Женьшень';

            assert.equal(typeof translated, 'string');
            assert.equal(translated, expected);
        });

        it('Number as a set name', function() {
            var translated = B.translate('Женьшень', 0),
                expected = {defaultDictionary: 'Zhen\'shen\''};

            assert.equal(typeof translated, 'object');
            compareProperties(translated, expected);
        });

        it('Null as a set name', function() {
            var translated = B.translate('Женьшень', null),
                expected = {defaultDictionary: 'Zhen\'shen\''};

            assert.equal(typeof translated, 'object');
            compareProperties(translated, expected);
        });

        it('Empty string', function() {
            var translated = B.translate('', 'defaultDictionary'),
                expected = '';

            assert.equal(typeof translated, 'string');
            assert.equal(translated, expected);
        });

        it('Null as a string', function() {
            var translated = B.translate(null, 'defaultDictionary'),
                expected = '';

            assert.equal(typeof translated, 'string');
            assert.equal(translated, expected);
        });

        it('Function as a string (function to string)', function() {
            var translated = B.translate(function() {}, 'defaultDictionary'),
                expected = 'function () {}';

            assert.equal(typeof translated, 'string');
            assert.equal(translated, expected);
        });

        it('Object as a string (object to string)', function() {
            var translated = B.translate({}, 'defaultDictionary'),
                expected = '[object Object]';

            assert.equal(typeof translated, 'string');
            assert.equal(translated, expected);
        });

        it('Boolean as a string (boolean to string)', function() {
            var translated = B.translate(true, 'defaultDictionary'),
                expected = 'true';

            assert.equal(typeof translated, 'string');
            assert.equal(translated, expected);
        });

        it('No arguments', function() {
            var translated = B.translate(),
                expected = {defaultDictionary: ''};

            assert.equal(typeof translated, 'object');
            compareProperties(translated, expected);
        });
    });

    describe('Initialization', function() {

        describe('As a constructor', function() {
            before(function() {
                B = new Bunin();
            });

            testInit();
        });

        describe('As a function', function() {
            before(function() {
                B = Bunin();
            });

            testInit();
        });

        function testInit() {
            it('Has private methods', function() {
                assert.ok(B.getUpperCaseDictionary);
                assert.equal(typeof B.getUpperCaseDictionary, 'function');

                assert.ok(B.mergeSets);
                assert.equal(typeof B.mergeSets, 'function');

                assert.ok(B.forEachSet);
                assert.equal(typeof B.forEachSet, 'function');

                assert.ok(B.mapChar);
                assert.equal(typeof B.mapChar, 'function');

                assert.ok(B.initSets);
                assert.equal(typeof B.initSets, 'function');

                assert.ok(B.translate);
                assert.equal(typeof B.translate, 'function');
            });

            it('Has public methods', function() {
                assert.ok(B.translate);
                assert.equal(typeof B.translate, 'function');
            });

            it('Has initialized dictionaries', function() {
                assert.ok(B.direct);
                assert.equal(typeof B.direct, 'object');
                assert.ok(B.direct.hasOwnProperty('defaultDictionary'));
            });
        }
    });

});

function compareProperties(obj1, obj2) {
    for (var k in obj1) {
        if (obj1.hasOwnProperty(k)) {
            assert.ok(typeof obj2[k] == 'string', 'None expected property ' + k + stringify(obj1, obj2));
            assert.equal(obj1[k], obj2[k]);
        }
    }
}

function stringify(obj1, obj2) {
    return '\nObj1: ' + JSON.stringify(obj1, null, 4) + '\nObj2: ' + JSON.stringify(obj2, null, 4);
}