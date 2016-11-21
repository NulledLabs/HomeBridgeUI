import template from './login.html';
import controller from './login.controller';

let loginComponent = {
  restrict: 'E',
  scope: {},
  template: template,
  controller: controller,
  controllerAs: 'vm'
};

export default loginComponent;
