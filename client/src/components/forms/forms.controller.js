import BaseFormController from './base.js';

class FormController extends BaseFormController {
  constructor($scope, $stateParams, formsService) {
    super($scope);

    this.service = formsService;

    this.pluginName = $stateParams.name;

    //this.schema = "";

    this.getPluginSchema(this.pluginName);
  }

  getPluginSchema(name) {
    this.service.getPluginSchema(name).then((res) => {
      this.schema = res.data;
    });
  }
}

export default FormController;
