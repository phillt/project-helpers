'use strict';

const expect = require('chai').expect;
const helpers = require('../index');

// Test access deep functionality
describe('#accessDeep', function() {
    const deepObject = {layer_one: {layer_two: {layer_three: { worked: "worked"}}}};

    it('should safely access "worked" value from deeply nested object.',
        function () {

            const result = helpers.accessDeep("layer_one.layer_two.layer_three.worked", deepObject);
            expect(result).to.equal('worked');
        });

    it('should safely access "worked" value from deeply nested object using an array.',
        function () {
            const result = helpers.accessDeep(["layer_one", "layer_two", "layer_three", "worked"], deepObject);
            expect(result).to.equal('worked');
        });

    it('should gracefully return null part of path is not set.',
        function () {
            const result = helpers.accessDeep(["layer_one", "layer_two", "fail_here", "worked"], deepObject);
            expect(result).to.eql(null);
        });

});

// Test map object functionality
describe('#mapObj', function () {
    const objectMap = {
        one: 1,
        two: 2,
        three: 3
    };

    it('should iterate through the object values and return array of values',
        function (){

            let result = helpers.mapObj(objectMap, function (val) {
                return val;
            });

            expect(result).to.eql([1, 2, 3]);
        });

});