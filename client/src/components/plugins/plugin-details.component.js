import template from './plugin-details.html';
import controller from './plugin-details.controller';

let pluginDetailsComponent = {
  restrict: 'E',
  scope: {},
  template: template,
  controller: controller,
  controllerAs: 'vm'
};

export default pluginDetailsComponent;
