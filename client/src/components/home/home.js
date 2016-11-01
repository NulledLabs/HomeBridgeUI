import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';
import pluginsService from './../plugins/plugins.service';

let homeModule = angular.module('home', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      template: '<home></home>',
      data: {
        requiresLogin: true
      }
    });
})

.component('home', homeComponent)
.service('pluginsService', pluginsService);

export default homeModule;
