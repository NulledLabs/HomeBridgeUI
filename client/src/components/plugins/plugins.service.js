class PluginsService {

  constructor($http) {
    this.$http = $http;
  }

  getInstalledPlugins(){

  }

  getPackageInfo(name) {
    var url = 'https://api.npms.io/v2/package/';
    return this.$http({
      method: 'GET',
      url: url + name
    }).success(function(data) {
      // this callback will be called asynchronously
      // when the response is available
      return data.toJSON();
    }).
    error(function(data, status) {
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
    }).success(function(data) {
      // this callback will be called asynchronously
      // when the response is available
      return data;
    }).
    error(function(data, status) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      alert(status);
    });
  }

  getSuggestions(query, size){
    var url = 'https://api.npms.io/v2/search/suggestions';
    return this.$http({
      method: 'GET',
      url: `${url}?q=${query}+keywords%3Ahomebridge-plugin&size=${size}`
    }).success(function(data) {
      // this callback will be called asynchronously
      // when the response is available
      return data;
    }).
    error(function(data, status) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      alert(status);
    });
  }

}

export default PluginsService;
