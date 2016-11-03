import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/plugins.css';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import AppComponent from './app.component.js';
import Common from './common/common';
import Components from './components/components';
import './styles.scss';
import jwtHelper from 'angular-jwt';
angular.module('myApp', [
  uiRouter,
  Common.name,
  Components.name,
  jwtHelper,
])
.config(function Config($httpProvider, jwtInterceptorProvider, jwtOptionsProvider) {
  console.log("config", $httpProvider, jwtInterceptorProvider, jwtOptionsProvider);
  jwtInterceptorProvider.tokenGetter = function() {
    return localStorage.getItem('JWT');
  }
  jwtOptionsProvider.config({
    unauthenticatedRedirectPath: '/login',
    unauthenticatedRedirector: ['$state', function($state) {
      $state.go('login');
    }],
    tokenGetter: () => {
      return localStorage.getItem('JWT');
    },
    whiteListedDomains: [
      'npms.io'
    ]
  });
  $httpProvider.interceptors.push('jwtInterceptor');
})
.run(function(authManager, $rootScope, $window) {
  authManager.checkAuthOnRefresh();
  authManager.redirectWhenUnauthenticated();
  $rootScope.$on('tokenHasExpired', function() {
    alert('Your session has expired!');
  });
  var updateSize = function () {
    //set a $rootScope variable or a service variable that reused
    $rootScope.bootstrap_size = 'xs';
    $rootScope.is_mobile = true;
    if($window.innerWidth >= 1200) {
      $rootScope.bootstrap_size = 'lg';
      $rootScope.is_mobile = false;  
    } else if($window.innerWidth >= 992) {
      $rootScope.bootstrap_size = 'md';
      $rootScope.is_mobile = false;  
    } else if($window.innerWidth >=768) {    
      $rootScope.bootstrap_size = 'sm';
      $rootScope.is_mobile = false;  
    }
  }
  updateSize();
  angular.element($window).on('resize', updateSize);
})
.directive('app', AppComponent);

