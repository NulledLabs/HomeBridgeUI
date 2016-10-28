class loginController {
  constructor($http) {
    this.name = 'login Component Syntax';
    this.onSubmit = function(form) {
      $http.post("/login", JSON.stringify({ username: this.username, password: this.password }), {
            headers: new Headers({"Content-Type": "application/json"})
        })
        .then(
          function successCallback(response) {
            console.log(response);
          },
          function errorCallback(error) {
            console.log(error);
          }
        );
    }
  }
}

export default loginController;
