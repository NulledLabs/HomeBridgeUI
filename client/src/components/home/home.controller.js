class HomeController {
  constructor(pluginsService) {
    this.name = 'home';

    this.service = pluginsService;

    this.installed = {};
    this.outdated = {};
    this.outdatedLoaded = false;

    this.accessories = {
      "Left Garage Door": {
        "moduleName": "homebridge-garage",
        "description": "Testing description"
      },
      "Right Garage Door": {
        "moduleName": "homebridge-garage",
        "description": "Testing description"
      }
    };

    this.platforms = {
      "Nest": {
        "moduleName": "homebridge-nest",
        "description": "Testing description"
      },
      "Yamaha": {
        "moduleName": "homebridge-yamaha",
        "description": "Testing description"
      }
    };

    this.getInstalledPlugins();
    this.getOutdatedPlugins();
  }

  addPlugin(name)
  {
    console.log("Adding: " + name);

    this.service.addPlugin(name).then((res) => {
      this.getInstalledPlugins();

      alert(name + " installed.");
    });
  }

  forceUpdatePlugin(name)
  {
    console.log("Force Updating: " + name);

    this.outdatedLoaded = false;

    this.service.addPlugin(name).then((res) => {
      this.getInstalledPlugins();
      this.getOutdatedPlugins();

      alert(name + " force updated.");
    });
  }

  removePlugin(name)
  {
    console.log("removePlugin:" + name);

    this.service.removePlugin(name).then((res) => {
      this.getInstalledPlugins();

      alert(name + " removed.");
    });
  }

  updatePlugin(name)
  {
    console.log("updatePlugin:" + name);
    
    this.outdatedLoaded = false;

    this.service.updatePlugin(name).then((res) => {
      this.getOutdatedPlugins();

      alert(name + " updated.");
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