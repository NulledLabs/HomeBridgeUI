import BaseFormController from './base.js';

class FormController extends BaseFormController {
  constructor($scope, $stateParams, formsService, pluginsService) {
    super($scope);

    this.formsService = formsService;
    this.pluginsService = pluginsService;

    this.moduleName = $stateParams.moduleName;
    this.type = $stateParams.type;
    this.name = $stateParams.name;

    this.getPluginSchema(this.moduleName);
    this.getConfig(this.type, this.name);
    //Loads our VM
    // if (this.type == 'homebridgeplugin')
    // {
    //   this.getPluginSchema(this.name);
    //   this.getConfig(this.type, this.name);
    // }
    // else if (this.type == 'accessory')
    // {
    //   this.getPluginSchema(this.name);
    //   this.getConfig(this.type, this.name);
    // }
    // else if (this.type == 'platform')
    // {
    //   this.getPluginSchema(this.name);
    //   this.getConfig(this.type, this.name);
    // }
    // else if (this.type == 'homebridgeui')
    // {

    // }
    // else if (this.type == 'homebridge')
    // {
      
    // }
    // else
    // {
    //   console.log("Unrecognized type parameter");
    // }
  }

  getPluginSchema(name) {
    this.pluginsService.getPluginSchema(name).then((res) => {
      this.schema = res.data.schema || {};
      //this.form = res.data.form || {};
      //this.model = res.data.model || {};
    });
  }

  getConfig(type, name) {
    this.pluginsService.getConfig(type, name).then((res) => {
      this.model = res.data || {};
    });
  }
}

export default FormController;
