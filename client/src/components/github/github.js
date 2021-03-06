import angular from 'angular';
import uiRouter from 'angular-ui-router';
import githubComponent from './github.component';
import githubService from './github.service';

let githubModule = angular.module('github', [
  uiRouter
])

.config(($stateProvider) => {
  $stateProvider
    .state('github', {
      url: '/github',
      template: '<github></github>',
      data: {
        requiresLogin: true
      }
    });
})

.component('github', githubComponent)
.service('githubService', githubService);

export default githubModule;
