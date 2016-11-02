class HomeController {
  constructor(pluginsService) {
    this.name = 'home';

    this.service = pluginsService;

    this.installed = {};
    this.outdated = {};
    this.outdatedLoaded = false;

    this.getInstalledPlugins();
    this.getOutdatedPlugins();
  }

  removePlugin(name)
  {
    console.log("removePlugin:" + name)
    this.service.removePlugin(name).then((res) => {
      this.getInstalledPlugins();
      alert(name + " removed.");
      //this.installed = res.data;
    });
  }

  updatePlugin(name)
  {
    console.log("updatePlugin:" + name)
    this.service.updatePlugin(name).then((res) => {
      this.getOutdatedPlugins();
      alert(name + " updating.");
      //this.installed = res.data;
    });
  }

  getInstalledPlugins()
  {
    this.service.getInstalledPlugins().then((res) => {
      this.installed = res.data;
    });
  }

  getOutdatedPlugins()
  {
    this.service.getOutdatedPlugins().then((res) => {
      console.log(res.data);
      this.outdated = res.data;
      this.outdatedLoaded = true;
    });
  }
}

export default HomeController;