
class PluginsService {

  constructor($http) {
    this.$http = $http;
  }

  addPlugin(name) {
    var url = '/homebridgeplugin/add';

    return this.$http.get(url, name).then(
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

  getInstalledPlugins() {
    var url = '/homebridgeplugin/installed';
    return this.$http({
      method: 'GET',
      url: url
    }).success(function (data) {
      // this callback will be called asynchronously
      // when the response is available
      return data;
    }).
      error(function (data, status) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        alert(status);
      });
  }


  getOutdatedPlugins() {
    var url = '/homebridgeplugin/outdated';
    return this.$http({
      method: 'GET',
      url: url
    }).success(function (data) {
      // this callback will be called asynchronously
      // when the response is available
      return data;
    }).
      error(function (data, status) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        alert(status);
      });
  }

  getPackageInfo(name) {
    var url = 'https://api.npms.io/v2/package/';
    return this.$http({
      method: 'GET',
      url: url + name
    }).success(function (data) {
      // this callback will be called asynchronously
      // when the response is available
      return data;
    }).
      error(function (data, status) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        alert(status);
      });
  }

  searchPackages(query, from, size) {
    var url = 'https://api.npms.io/v2/search';
    return this.$http({
      method: 'GET',
      url: `${url}?q=${query}+keywords%3Ahomebridge-plugin&from=${from}&size=${size}`
    }).success(function (data) {
      // this callback will be called asynchronously
      // when the response is available
      return data;
    }).
      error(function (data, status) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        alert(status);
      });
  }

  getSuggestions(query, size) {
    var url = 'https://api.npms.io/v2/search/suggestions';
    return this.$http({
      method: 'GET',
      url: `${url}?q=${query}+keywords%3Ahomebridge-plugin&size=${size}`
    }).success(function (data) {
      // this callback will be called asynchronously
      // when the response is available
      return data;
    }).
      error(function (data, status) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        alert(status);
      });
  }
}

export default PluginsService;
