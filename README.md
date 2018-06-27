Project Helpers
=========

Tiny library with some fun uses. Honestly, this is just my first NPM package, so more of a test for me really. But everything should work fine.

## Installation

  `npm install project-helpers`

## Usage

    import {helpers, mapObj, setDeep} from "project-helpers"

### Access deeply nested values from an object

Sometimes we just need to reach a bit deeper than we'd like but are unsure if the pathway is even set.

Use this method to safely access deeply nested values.

    const deepObject = {layer_one: {layer_two: {layer_three: { worked: "worked"}}}};
    
    const result = accessDeep("layer_one.layer_two.layer_three.worked", deepObject);
  
  
  `result` should be `"worked"`

### Map an object like you would an array

Do you need to iterate through an object's values? Here you go. You're welcome:

    const objectMap = {
            one: 1,
            two: 2,
            three: 3
        };
        
    const result = mapObj(objectMap, function (val) {
                    return val;
                });

  `result` should be `[1, 2, 3]`
  
### Deeply set a value of an object.

If you need to deeply set a value of an object, we can do so using the setDeep method. This will create the path even
though it's not already set.

    let myObject = {};
    
    helpers.setDeep(myObject, "set.deeply.nested.values", "myValue");
    
    // myObject.set.deeply.nested.values = "myValue";
    
    // Now it should look like this:
    myObject = { set: { deeply: { nested: { values: "myValue" }}}};

## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.