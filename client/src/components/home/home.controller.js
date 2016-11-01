class HomeController {
  constructor(pluginsService) {
    this.name = 'home';

    this.service = pluginsService;

    this.installed = {};
    this.getInstalledPlugins();
  }


  getInstalledPlugins(){
    this.service.getInstalledPlugins().then((res) => {
      this.installed = res.data;
    });
  }
}

export default HomeController;