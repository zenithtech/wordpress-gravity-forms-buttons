# wordpress-gravity-forms-buttons
Turn all radios, check boxes, dropdown menus into buttons. No more having to click multiple times. 

This is a Javascript and CSS combination that converts dropdown select fields, radios select fields, and checkboxes into clickable buttons.

It enables customizing the interface of WordPress Gravity Form select fields, radios select fields, and checkboxes by creating proxy interfaces that convey the user choices to the original fields and also trigger any related field rules that handle conditional logic.

Usage:

```
gravityFormProxies(
    [{string or boolean}, or object of [{string or bollean}, {number of options that exist}]: either the classname of a target 'Drop Down' type Gravity form field, or a boolean to target all the fields 'Drop Down' type Gravity form fields, or an object that contains 2 values, 1st either a bollean or string representing a classname or ID, 2nd the number of options that the field should have],
    [{string or boolean}, or object of [{string or bollean}, {number of options that exist}]: either the classname of a target 'Radio' type Gravity form field, or a boolean to target all 'Radio' type Gravity form fields, or an object that contains 2 values, 1st either a bollean or string representing a classname or ID, 2nd the number of options that the field should have],
    [{string or boolean}, or object of [{string or bollean}, {number of options that exist}]: either the classname of a target 'Checkbox' type Gravity form field, or a boolean to target all 'Checkbox' type Gravity form fields, or an object that contains 2 values, 1st either a bollean or string representing a classname or ID, 2nd the number of options that the field should have]
);
```

## Examples:


`window.gravityFormProxies(true, true, true);`

Turns all dropdowns, radio, and checkboxes into horizontal buttons.


`window.gravityFormProxies(true);`

Turn only dropdowns in to horizontal buttons.


`window.gravityFormProxies(false, true, false);`

Turns all radio buttons to horizontal buttons.


`window.gravityFormProxies(false, '.myVerticalRadios', false);`

Turns a single radio group to horizontal buttons.


`gravityFormProxies(false, [true, 2], false);`

Turns all radio options that have 2 options into horizontal buttons.


`gravityFormProxies(false, ['.myCustomRadios', 2], false);`

Turns all radio options that have 2 options and match classname `.myCustomRadios` into horizontal buttons.


`gravityFormProxies(false, true, '.myCheckBoxes');`

Turns all radio options into horizontal buttons, and turns all checkboxes that match classname `.myCheckBoxes` into horizontal buttons.
