class NavbarController {
  constructor($state, $rootScope) {
    this.name = 'navbar';
    this.$state = $state;
    this.$rootScope = $rootScope;
  }
  logout() {
    localStorage.removeItem("JWT");
    this.$rootScope.isAuthenticated = false;
    this.$state.go('login');
  }
}

export default NavbarController;
