import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
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
.run(function(authManager, $rootScope) {
  authManager.checkAuthOnRefresh();
  authManager.redirectWhenUnauthenticated();
  $rootScope.$on('tokenHasExpired', function() {
    alert('Your session has expired!');
  });
})
.directive('app', AppComponent);
