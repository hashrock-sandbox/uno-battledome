var test = require('tape');
var utils = require("./utils")

test('全部で108枚', function (t) {
    t.plan(1);
    var yama = utils.getAllCards()
    t.equal(yama.length, 108);
});