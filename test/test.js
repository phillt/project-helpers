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

// Test setDeepObject

describe('#setDeep', function () {
    let plainObject = {};

    it('should set a deeply nested value into a plain object using an array path.', function () {
        helpers.setDeep(plainObject, ["set", "deep", "value", "withArray"], "yes", true);

        expect(plainObject.set.deep.value.withArray).to.equal("yes");
    });

    it("should set a deeply nested value into a plain object using a string path.", function () {
        helpers.setDeep(plainObject, "set.deep.value.withString", "yes", true);

        expect(plainObject.set.deep.value.withString).to.equal("yes");
    });

});

describe('#ifFunc', function () {
    const testFunc = function(a, b) {
        return a + b ;
    };

    let fakeFunc;

    it('Call a function if it is an actual function.', function () {
        const result = helpers.ifFunc(testFunc, 1, 2);
        expect(result).to.equal(3);
    });

    it('Should gracefully fail if the reference is not a function.', function () {
        const result = helpers.ifFunc(fakeFunc, 1, 2);
        expect(result).to.equal(undefined);
    });
});

describe("#arrayChuncks", function () {
    const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const expectedArray = [[1,2,3], [4, 5, 6], [7, 8, 9]];
    const expectedBArray = [[1,2,3, 4], [5, 6, 7, 8], [9]];

    it('Should create an array of chunks that is identical as the expectedArray', function () {
        const result = helpers.arrayChunks(testArray, 3);
        expect(result).to.eql(expectedArray);
    });

    it('Should create an array of chunks that is identical as the expectedBArray', function () {
        const result = helpers.arrayChunks(testArray, 4);
        expect(result).to.eql(expectedBArray);
    });
});