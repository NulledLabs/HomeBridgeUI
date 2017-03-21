
class PluginsService {
  constructor($http) {
    this.$http = $http;
  }


  startHomebridge() {
    console.log("start homebridge");

    var url = '/homebridge/start';

    return this.$http.post(url, {}).then(
      //success
      (response) => {
        // this callback will be called asynchronously
        // when the response is available
        //return data;
        return true;
      }, 
      //error
      (response) => {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response);
    });
  }
  stopHomebridge() {
    console.log("stop homebridge");

    var url = '/homebridge/stop';

    return this.$http.post(url, {}).then(
      //success
      (response) => {
        // this callback will be called asynchronously
        // when the response is available
        //return data;
        return true;
      }, 
      //error
      (response) => {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response);
    });
  }


  addPlugin2(name) {
    console.log("addPlugin2:" + name);

    var url = '/npm';

    return this.$http.post(url, JSON.stringify({ name, action: 'install' })).then(
      //success
      (response) => {
        // this callback will be called asynchronously
        // when the response is available
        //return data;
        return true;
      },
      //error
      (response) => {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response);
      });
  }
  addPlugin(name) {
    console.log("addPlugin:" + name);

    var url = '/homebridgeplugin/add?name=' + name;

    return this.$http.get(url, {}).then(
      //success
      (response) => {
        // this callback will be called asynchronously
        // when the response is available
        //return data;
        return true;
      }, 
      //error
      (response) => {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response);
    });
  }

  removePlugin(name) {
    console.log("removePlugin:" + name);

    var url = '/homebridgeplugin/remove?name=' + name;

    return this.$http.get(url, {}).then(
      //success
      (response) => {
        // this callback will be called asynchronously
        // when the response is available
        //return data;
        return true;
      },
      //error
      (response) => {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response);
      });
  }

  updatePlugin(name) {
    console.log("plugin.service.updatePlugin:" + name);

    var url = '/homebridgeplugin/update?name=' + name;

    return this.$http.get(url, {}).then(
      //success
      (response) => {
        // this callback will be called asynchronously
        // when the response is available
        //return data;
        return true;
      },
      //error
      (response) => {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response);
      });
  }

  getHomeBridgeVersion() {
    console.log("getHomeBridgeVersion");

    var url = '/homebridge/ver';
    return this.$http.get(url, {}).then(
      //success
      (response) => {
        // this callback will be called asynchronously
        // when the response is available
        //return data;
        return response;
      },
      //error
      (response, status) => {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(status);
      });


  }

  getInstalledPlugins() {
    console.log("getInstalledPlugin");

    var url = '/homebridgeplugin/installed';

    return this.$http.get(url, {}).then(
      //success
      (response) => {
        // this callback will be called asynchronously
        // when the response is available
        //return data;
        return response;
      },
      //error
      (response, status) => {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(status);
      });
  }

  getPluginSchema(name) {
    var url = '/homebridgeplugin/schema?name=';
    return this.$http.get(url, {}).then(
      //success
      (response) => {
        // this callback will be called asynchronously
        // when the response is available
        //return data;
        return response;
      },
      //error
      (response, status) => {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(status);
      });
  }

  getConfig(name) {
    var url = '/homebridgeplugin/config?name=' + name;
    return this.$http.get(url, {}).then(
      //success
      (response) => {
        // this callback will be called asynchronously
        // when the response is available
        //return data;
        return response;
      },
      //error
      (response, status) => {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(status);
      });
  }

  saveConfig(name, config) {
    console.log("addPlugin:" + name);

    var url = '/homebridgeplugin/config?name=' + name;

    return this.$http.put(url, config).then(
      //success
      (response) => {
        // this callback will be called asynchronously
        // when the response is available
        //return data;
        return true;
      },
      //error
      (response) => {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response);
      });
  }

  getOutdatedPlugins() {
    console.log("getOutdatedPlugins");

    var url = '/homebridgeplugin/outdated';

    return this.$http.get(url, {}).then(
      //success
      (response) => {
        // this callback will be called asynchronously
        // when the response is available
        //return data;
        return response;
      },
      //error
      (response, status) => {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(status);
      });
  }

  getPackageInfo(name) {
    var url = `/homebridgeplugin/info?name=${name}`;
    return this.$http.get(url, {}).then(
      //success
      (response) => {
        // this callback will be called asynchronously
        // when the response is available
        //return data;
        return response;
      },
      //error
      (response, status) => {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(status);
      });
  }

  searchPackages(query, from, size) {
    var url = `/homebridgeplugin/search?query=${query}&from=${from}&size=${size}`;
    return this.$http({
      method: 'GET',
      url: url
    }).then(
      //success
      (response) => {
        // this callback will be called asynchronously
        // when the response is available
        //return data;
        return response;
      },
      //error
      (response, status) => {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(status);
      });
  }

  getSuggestions(query, size) {
    var url = `https://api.npms.io/v2/search/suggestions?q=${query}+keywords%3Ahomebridge-plugin&size=${size}`;
    return this.$http({
      method: 'GET',
      url: url
    }).then(
      //success
      (response) => {
        // this callback will be called asynchronously
        // when the response is available
        //return data;
        return response;
      },
      //error
      (response, status) => {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(status);
      });
  }
}

export default PluginsService;
