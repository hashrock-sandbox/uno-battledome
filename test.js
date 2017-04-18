var test = require('tape');
var utils = require("./utils")

test('全部で108枚', function (t) {
    t.plan(1);
    var yama = utils.getAllCards()
    t.equal(yama.length, 108);
});

test('パーサチェック', function (t) {
    t.plan(5);
    t.deepEqual(
        utils.parseCardStr("Y0"),
        {type: "number", color: "Y", option: "0"}
    );
    t.deepEqual(
        utils.parseCardStr("WD4"),
        {type: "wild", color: "W", option: "D4"}
    );
    t.deepEqual(
        utils.parseCardStr("W"),
        {type: "wild", color: "W", option: ""}
    );    
    t.deepEqual(
        utils.parseCardStr("YR"),
        {type: "special", color: "Y", option: "R"}
    );
    t.deepEqual(
        utils.parseCardStr("YS"),
        {type: "special", color: "Y", option: "S"}
    );
});


test('ルールチェック', function (t) {
    t.plan(2);

    var result = utils.getAvailableCards("Y1", ["Y0", "R1", "B2"])
    t.deepEqual(result, ["Y0", "R1"]);

    var result = utils.getAvailableCards("RR", ["YR", "RR", "YS"])
    t.deepEqual(result, ["YR", "RR"]);
    
});
