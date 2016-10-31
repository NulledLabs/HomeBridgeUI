class PluginsController {
  constructor(pluginsService) {
    this.name = 'Plugins Component Syntax';
    this.service = pluginsService;
    this.query = "";
    this.result = [];
    this.installed = {};
    this.getInstalledPlugins();
  }

  onSubmit(){
    this.searchPackages(this.query, 0, 25);
  }

  getInstalledPlugins(){
    this.service.getInstalledPlugins().then((res) => {
      this.installed = res.data;
    });
  }

  getPackageInfo(name) {
    this.service.getPackageInfo(name).then((res) => {
      this.result = res.data;
    });
  }

  searchPackages(query, from, size) {
    this.service.searchPackages(query, from, size).then((res) => {
      this.result = res.data;
    });
  }

  getSuggestions(query, size){
    this.service.getSuggestions(query, size).then((res) => {
      this.result = res.data;
    });
  }

}

export default PluginsController;
