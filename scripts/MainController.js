// scripts/MainController.js

(function() {

    'use strict';

    angular
        .module('formlyApp')
        .controller('MainController', MainController);

function MainController(province) {

    var vm = this;

    // The model object that we reference
    // on the  element in index.html
    vm.rental = {};
    

    // function for checkout

	vm.rentalCheckout = function () {
		console.log(vm.rental);
	}

    // An array of our form fields with configuration
    // and options set. We make reference to this in
    // the 'fields' attribute on the  element
    vm.rentalFields = [
        {
            key: 'title',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'title',
                required: true
            }
        },
        {
            key: 'min amount',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'min_amount',
                placeholder: '0 if none',
                required: true
            }
        },
        {
            key: 'max amount',
            type: 'input',
            templateOptions: {
                type: 'number',
                label: 'max_amount',
                placeholder: '-1 if none',
                required: true
            }
        },
        {
            key: 'site_url',
            type: 'input',
            templateOptions: {
                type: 'url',
                label: 'site url',
                placeholder: 'full url',
                required: true
            }
        },
        {
            key: 'logo_url',
            type: 'input',
            templateOptions: {
                type: 'url',
                label: 'logo/image url',
                placeholder: 'full url',
                required: true
            }
        },
        {
            key: 'sector',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'sector',
                placeholder: '',
                required: true
            }
        },
        {
        key: 'under25',
        type: 'checkbox',
        templateOptions: {
            label: 'Are you under 25?',
        },
        // Hide this field if we don't have
        // any valid input in the email field
        hideExpression: '!model.email'
    },
    {
        key: 'province',
        type: 'select',
        templateOptions: {
            label: 'Province/Territory',
            // Call our province service to get a list
            // of provinces and territories
            options: province.getProvinces()
        },
        hideExpression: '!model.email'
    },
    {
        key: 'insurance',
        type: 'input',
        templateOptions: {
            label: 'Insurance Policy Number',
            placeholder: 'Enter your insurance policy number'
        },
        hideExpression: '!model.under25 || !model.province',
    },
     {
        key: 'license',
        type: 'input',
        templateOptions: {
            label: 'Driver\'s License Number',
            placeholder: 'Enter your drivers license number'
        },
        hideExpression: '!model.province',
        validators: {
           driversLicense: function($viewValue, $modelValue, scope) {
                var value = $modelValue || $viewValue;
                if(value) {
                    return validateDriversLicence(value)
                }
           }
        },
        expressionProperties: {
            // We currently only have a driver's license pattern for Ontario
            // so we need to disable this field if we've picked a province/territory
            // other than Ontario
            'templateOptions.disabled': function($viewValue, $modelValue, scope) {
                if(scope.model.province === 'ontario') {
                    return false;
                }
                return true;
            }
        }
    }

    ];
    
}


// extra functions
 function validateDriversLicence(value) {
        return /[A-Za-z]\d{4}[\s|\-]*\d{5}[\s|\-]*\d{5}$/.test(value);
 }

})();
