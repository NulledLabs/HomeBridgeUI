class PluginDetailsController {
  constructor(pluginsService, $stateParams) {
    this.name = $stateParams.name;
    this.service = pluginsService;
    this.query = "";
    this.result = [];
    this.installed = {};
    this.getInstalledPlugins();
    this.getPackageInfo(this.name);
    this.getModuleSchema(this.name);
    this.getConfig(this.name);
    this.options = {
      formDefaults: {
        "labelHtmlClass": "col-sm-3",
        "horizontalHtmlClass": "col-sm-9",
        "htmlClass": "form-horizontal"
      }
    }
  }

  onSubmit() {
    this.service.saveConfig(this.name, this.model).then((res) => {
      console.log(res);
    });
  }
  addPlugin(name) {
    this.installing = true;
    console.log("Adding: " + name);
    this.service.addPlugin(name).then((res) => {
      console.log(name + " installed.");
      //this.installed = res.data;
      this.getInstalledPlugins();
    });
  }

  removePlugin(name) {
    this.uninstalling = true;
    console.log("Removing: " + name);
    this.service.removePlugin(name).then((res) => {
      console.log(name + " removed.");
      //this.installed = res.data;
      this.getInstalledPlugins();
    });
  }

  getInstalledPlugins() {
    this.service.getInstalledPlugins().then((res) => {
      this.installed = res.data;
      this.installing = false;
      this.uninstalling = false;
    });
  }

  getPackageInfo(name) {
    this.selectedPlugin = null;
    this.loading = true;
    this.service.getPackageInfo(name).then((res) => {
      this.loading = false;
      this.selectedPlugin = res.data;
      this.selectedPlugin.selectedVersion = this.selectedPlugin.versions[this.selectedPlugin['dist-tags'].latest];
    });
  }

  searchPackages(query, from, size) {
    this.selectedPlugin = undefined;
    this.result = [];
    this.searching = true;
    this.service.searchPackages(query, from, size).then((res) => {
      this.searching = false;
      this.result = res.data;
    });
  }

  getSuggestions(query, size) {
    this.service.getSuggestions(query, size).then((res) => {
      this.result = res.data;
    });
  }

  getModuleSchema(name) {
    this.service.getPluginSchema(name).then((res) => {
      this.schema = res.data.schema || {};
      // this.form = [
      //   "*",
      //   {
      //     "type": "submit",
      //     "title": "Save Config"
      //   }
      // ]
      if (!res.data.form || (res.data.form && res.data.form.length === 0)) {
        this.form = ["*"];
        // for(var key in this.schema.properties){
        //   if(!this.schema.properties.hasOwnProperty(key)) continue;
        //   var obj = this.schema.properties[key];
        //   var p = {
        //     "key": key,
        //     "labelHtmlClass": "col-lg-3",
        //     "horizontalHtmlClass": "col-lg-9",
        //     "htmlClass": "form-horizontal"
        //   };
        //   this.form.push(p);
        // }
        this.form.push(
          {
            "type": "submit",
            "title": "Save Config",
            "horizontalHtmlClass": "col-lg-9 col-lg-offset-3",
            "htmlClass": "form-horizontal"
          });
      }
      else {
        this.form = res.data.form;
      }
      // this.model = res.data.model || {};
    });
  }

  getConfig(name) {
    this.service.getConfig(name).then((res) => {
      this.model = res.data || {};
    });
  }

}

export default PluginDetailsController;