# wordpress-gravity-forms-buttons
This is a jQuery and CSS combination that enables customizing the interface of WordPress Gravity Form radio options and dropdown select fields by creating proxy interfaces that convey the user choices to the original fields and also trigger any related field rules that handle conditional logic.

Usage:

```
window.gravityFormProxies(
    [string or boolean: either the classname of a target 'Drop Down' type Gravity form field, or a boolean to target all the fields 'Drop Down' type Gravity form fields],
    [string or boolean: either the classname of a target 'Radio' type Gravity form field, or a boolean to target all 'Radio' type Gravity form fields],
    [string or boolean: either the classname of a target 'Checkbox' type Gravity form field, or a boolean to target all 'Checkbox' type Gravity form fields]
);
```



If you want to turn all dropdowns in to horizontal buttons, enter true, such as:

`window.gravityFormProxies(true);`



Or target a single dropdown by adding a 'Custom CSS Class' to a 'Drop Down' type Gravity form field to turn it into horizontal buttons:

`window.gravityFormProxies('.gfield.dropdown_buttons');`



You may also choose to only turn all radio buttons to custom horizontal buttons by adding a second value as true:

`window.gravityFormProxies(false, true);`



Or target a single radio group by adding a 'Custom CSS Class' to a 'Radio' type Gravity form field to turn it into horizontal buttons:

`window.gravityFormProxies(false, '.myVerticalRadios');`



Or turn all dropdowns and radio buttons into cutom horizontal buttons by passing both values as true:

`window.gravityFormProxies(true, true);`
