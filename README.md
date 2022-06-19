# Simple yet very efficient React hook for validating web forms

##
Make sure you have npm and Node installed on your machine.

Installation guide [here](https://docs.npmjs.comdownloading-and-installing-node-js-and-npm).

## To install, run: 
``
npm  install simple-validator-hook
``

## Important
Ensure that each html input in the form contains unique name prop
``
<input type='text' name='password' />
``
Internally, we use Yup to run valiation on each unique value given to name prop.

## Use 
This hook returns a number of useful methods to validate inputs in html forms. If data is validated, handleSubmit function will have access to validated data which you can run any logic on or post it to your server.

The hook throttles keyboard input to ensure validation does not run on each keystroke which slows down unnecessary React renders.

The hook accepts three arguments
 - default form values
 - yup schema which is an object with required form properties
 - debounced time in milliseconds which throttles keyboard input

The github repository contains a simple React app in the example 
directory that shows the basic use of this hook.

## Licence 
MIT @ [alisherk](https://github.com/alisherk).
