import BaseFormController from './base.js';

class FormController extends BaseFormController {
  constructor($scope, $stateParams) {
    super($scope);
    this.schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          title: "Name",
        },
        clientId: { 
          type: 'string', 
          title: 'Client ID', 
        },
        clientSecret: {
          'type': 'string',
          'title': 'Client Secret',
        },
        token: {
          'type': 'string',
          'title': 'Token',
        }
      },
      'required': [
        'name',
        'clientId',
        'clientSecret',
        'token',
      ]
    };
  }
}

export default FormController;
