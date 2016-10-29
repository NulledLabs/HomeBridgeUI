class loginController {
  constructor($http, $state) {
    this.name = 'login Component Syntax';
    this.$http = $http;
    this.$state = $state;
    this.username = 'john';
    this.password = 'angualr2express';
  }

  onSubmit(form) {
      this.$http.post("/login", JSON.stringify({ username: this.username, password: this.password }), {
            headers: new Headers({"Content-Type": "application/json"})
        })
        .then(
          function successCallback(response) {
            if(response.data.jwt){
              localStorage.setItem('JWT',response.data.jwt);
              this.$state.go('home');
            }
            else {
              this.message = response.data.message;
            }
            console.log(response);
          }.bind(this),
          function errorCallback(error) {
            console.log(error);
          }.bind(this)
        );
    }

}

export default loginController;
