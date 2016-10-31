import BaseFormController from './base.js';

class FormController extends BaseFormController {
  constructor($scope, $stateParams, formsService) {
    super($scope);

    this.service = formsService;

    this.pluginName = $stateParams.name;

    //Loads our VM
    this.getPluginSchema(this.pluginName);
    this.getPluginConfig(this.pluginName);
  }

  getPluginSchema(name) {
    this.service.getPluginSchema(name).then((res) => {
      this.schema = res.data.schema || {};
      //this.form = res.data.form || {};
      //this.model = res.data.model || {};
    });
  }

  getPluginConfig(name) {
    this.service.getPluginConfig(name).then((res) => {
      this.model = res.data || {};
    });
  }
}

export default FormController;
