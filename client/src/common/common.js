import angular from 'angular';
import Navbar from './navbar/navbar';
import User from './user/user';

export default angular.module('app.common', [
  Navbar.name,
  User.name
]);
