class HomeController {
  constructor(pluginsService) {
    this.name = 'home';

    this.service = pluginsService;

    this.installed = {};
    this.outdated = {};
    this.outdatedLoaded = false;
    this.homebridge = {};
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
    // this.getOutdatedPlugins();
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
    if(name === 'homebridge')
      this.homebridge.upgrading = true;
    else if(this.installed[name])
      this.installed[name].upgrading = true;

    this.service.addPlugin(name).then((res) => {
      this.getInstalledPlugins();

      //alert(name + " force updated.");
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
    this.installed[name].upgrading = true;
    this.service.updatePlugin(name).then((res) => {
      this.getInstalledPlugins();
      //alert(name + " updated.");
    });
  }

  getHomeBridgeVersion() {
    this.homebridge.loading = true;
    this.service.getHomeBridgeVersion().then((res) => {
      this.homebridge.loading = false;
      this.homebridge.upgrading = false;
      this.homebridge.version = res.data.version;
    });
    this.service.getPackageInfo('homebridge').then((res) => {
      console.log(res);
      this.homebridge.latest = res.data['dist-tags'].latest;
    },(res) =>{
      console.log(res);
    })

  }
  getInstalledPlugins()
  {
    var that = this;
    this.getHomeBridgeVersion();
    this.service.getInstalledPlugins().then((res) => {
      Object.assign(that.installed, res.data);
      angular.forEach(that.installed, function(value, key){
        value.loading = true;
        console.log(value, key);
        that.service.getPackageInfo(key).then((res) => {
          console.log(res);
          value.latest = res.data['dist-tags'].latest;
          value.loading = false;
          value.upgrading = false;
        },(res) =>{
           value.loading = false;
           value.upgrading = false;
        })
      });
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