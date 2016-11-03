class PluginsController {
  constructor(pluginsService) {
    this.name = 'Plugins Component Syntax';
    this.service = pluginsService;
    this.query = "";
    this.result = [];
    this.installed = {};
    this.getInstalledPlugins();

  }

  onSubmit()
  {
    this.searchPackages(this.query, 0, 25);
  }

  addPlugin(name)
  {
    console.log("Adding: " + name);
    this.service.addPlugin(name).then((res) => {
      console.log(name + " installed.");
      //this.installed = res.data;
      getInstalledPlugins();
    });
  }

  getInstalledPlugins()
  {
    this.service.getInstalledPlugins().then((res) => {
      this.installed = res.data;
    });
  }

  getPackageInfo(name)
  {
    this.service.getPackageInfo(name).then((res) => {
      this.result = res.data;
    });
  }

  searchPackages(query, from, size)
  {
    this.selectedPlugin = undefined;
    this.result = [];
    this.searching = true;
    this.service.searchPackages(query, from, size).then((res) => {
      this.searching = false;
      this.result = res.data;
    });
  }

  getSuggestions(query, size)
  {
    this.service.getSuggestions(query, size).then((res) => {
      this.result = res.data;
    });
  }
}

export default PluginsController;