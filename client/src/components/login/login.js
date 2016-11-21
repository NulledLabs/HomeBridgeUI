import angular from 'angular';
import uiRouter from 'angular-ui-router';
import loginComponent from './login.component';
import './login.css';

let loginModule = angular.module('login', [
  uiRouter
])

.config(($stateProvider) => {
  $stateProvider
    .state('login', {
      url: '/login',
      template: '<login></login>'
    });
})

.component('login', loginComponent);

export default loginModule;
