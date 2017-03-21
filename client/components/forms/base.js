class BaseFormController {
  constructor($scope, $sce) {
    this.name = 'Form Component Syntax';
    this.model = {};
    this.schema = {
      type: 'object',
      properties: {},
      'required': []
    };
    this.form = [
      '*',
      {
        type: 'submit',
        title: 'Save'
      }
    ];

    this.onSubmit = function(form) {
      // First we broadcast an event so all fields validate themselves
      $scope.$broadcast('schemaFormValidate');

      // Then we check if the form is valid
      var msg = [];
      if (form.$valid) {
        alert('saved!');
      } else {
        alert('form invalid!');
      }
    };
  }
}

export default BaseFormController;
