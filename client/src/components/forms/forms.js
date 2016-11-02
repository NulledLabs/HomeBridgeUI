import angular from 'angular';
import uiRouter from 'angular-ui-router';
import formsComponent from './forms.component';
import formsService from './forms.service';
import pluginsService from './../plugins/plugins.service';

// order important: tv4 -> objectpath -> shemaForm -> shemaForm-bootstrap
import 'tv4';
import 'objectpath';
import schemaForm from 'angular-schema-form';
import 'script!angular-schema-form-bootstrap';

let formsModule = angular.module('forms', [
  schemaForm.name,
  uiRouter
])

.config(($stateProvider) => {
  $stateProvider
    .state('forms', {
      url: '/forms/:moduleName/:type/:name',
      template: '<forms></forms>',
      data: {
        requiresLogin: true
      }
    });
})

.component('forms', formsComponent)
.service('formsService', formsService)
.service('pluginsService', pluginsService);

export default formsModule;
