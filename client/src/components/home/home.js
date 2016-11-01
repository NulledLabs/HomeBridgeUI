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
.service('pluginsService', pluginsService)
.filter('isEmpty', function () {
    var bar;
    return function (obj) {
        for (bar in obj) {
            if (obj.hasOwnProperty(bar)) {
                return false;
            }
        }
        return true;
    };
});

export default homeModule;
