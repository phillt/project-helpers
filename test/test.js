'use strict';

var expect = require('chai').expect;
var accessDeep = require('../index');

describe('#accessDeep', function() {
    var deepObject = {layer_one: {layer_two: {layer_three: { worked: "worked"}}}};

    it('should safely access "worked" value from deeply nested object.',
        function () {

            var result = accessDeep("layer_one.layer_two.layer_three.worked", deepObject);
            expect(result).to.equal('worked');
        });

    it('should safely access "worked" value from deeply nested object using an array.',
        function () {
            var result = accessDeep(["layer_one", "layer_two", "layer_three", "worked"], deepObject);
            expect(result).to.equal('worked');
        });

    it('should gracefully return null part of path is not set.',
        function () {
            var result = accessDeep(["layer_one", "layer_two", "fail_here", "worked"], deepObject);
            expect(result).to.equal(null);
        });

});