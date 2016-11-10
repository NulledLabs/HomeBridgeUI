import angular from 'angular';
import uiRouter from 'angular-ui-router';
import pluginsComponent from './plugins.component';
import pluginsService from './plugins.service';
import uiBootstrap from 'angular-ui-bootstrap';
import angularMoment from 'angular-moment';
import uiSelect from 'ui-select';
import hcMarked from 'angular-marked';

let pluginsModule = angular.module('plugins', [
  uiRouter,
  uiBootstrap,
  angularMoment,
  uiSelect,
  hcMarked
])

.config(($stateProvider) => {
  $stateProvider
    .state('plugins', {
      url: '/plugins',
      template: '<plugins></plugins>'
    });
})

.component('plugins', pluginsComponent)
.service('pluginsService', pluginsService);

export default pluginsModule;
