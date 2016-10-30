import template from './plugins.html';
import controller from './plugins.controller';

let pluginsComponent = {
  restrict: 'E',
  scope: {},
  template: template,
  controller: controller,
  controllerAs: 'vm'
};

export default pluginsComponent;
