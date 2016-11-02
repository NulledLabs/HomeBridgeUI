
class FormsService {

  constructor($http) {
    this.$http = $http;
  }

  getPluginSchema(name) {
    var url = '/homebridgeplugin/schema?name=';
    return this.$http({
      method: 'GET',
      url: url + name
    }).success(function (data) {
      // this callback will be called asynchronously
      // when the response is available
      return data.toJSON();
    }).
      error(function (data, status) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        alert(status);
      });
  }
}

export default FormsService;
