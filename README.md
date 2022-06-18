# Simple yet very efficient hool for validating web forms

## To install, run: 
``
npm  install simple-validator-hook
``

## Use 
``
This hook returns a number of useful methods to validate inputs on the
form. If data is validated, handleSubmit function will have access to
validated data which you can use as you wish like sending the data
to a server or run any logic locally. The hook throttles a number of times of keyboard input which makes forms highly effecient in your apps as opposed to firing on each key press

The hook accepts three arguments
 - default form values
 - yup schema which is an object with required form properties
 - debounced time in milliseconds which throttles keyboard input

``

## Licence 
MIT @ [alisherk](https://github.com/alisherk).
