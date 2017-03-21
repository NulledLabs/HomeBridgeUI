class GithubService {

  constructor($http) {
    this.$http = $http;
  }

  getItems(githubUsername) {
    var githubUrl = 'https://api.github.com';
    return this.$http({
      method: 'JSONP',
      url: githubUrl + '/users/' +
      githubUsername + '?callback=JSON_CALLBACK'
    }).then(
      function successCallback(data) {
        // this callback will be called asynchronously
        // when the response is available
        return data.data.toJSON();
      }.bind(this),
      function errorCallback(data, status) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        alert(status);
      }.bind(this)
    );
  }

}

export default GithubService;
