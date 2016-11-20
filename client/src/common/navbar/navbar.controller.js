class NavbarController {
  constructor($state, $rootScope, mySocket) {
    this.name = 'navbar';
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.tasks = [];
    mySocket.forward('cmd', $rootScope);
    $rootScope.$on('socket:cmd', function($event, cmd){
      console.log(cmd);
    });

  }
  logout() {
    localStorage.removeItem("JWT");
    this.$rootScope.isAuthenticated = false;
    this.$state.go('login');
  }
}

export default NavbarController;
