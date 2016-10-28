import angular from 'angular';
import Home from './home/home';
import Github from './github/github';
import Forms from './forms/forms';
import New from './new/new';
import Login from './login/login';

export default angular.module('app.components', [
  Home.name,
  Github.name,
  Forms.name,
  New.name,
  Login.name,
]);
