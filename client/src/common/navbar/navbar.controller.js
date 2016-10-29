class NavbarController {
  constructor($state, $rootScope) {
    this.name = 'navbar';
    this.$state = $state;
    this.$rootScope = $rootScope;
  }
  logout() {
    localStorage.removeItem("JWT");
    $rootScope.isAuthenticated = false;
    this.$state.go('login');
  }
}

export default NavbarController;
