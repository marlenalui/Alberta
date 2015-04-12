'use strict';

angular.module('albertApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ui.calendar',
  'xml'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Content-Type"] = "application/xml";
    $httpProvider.interceptors.push('xmlHttpInterceptor');
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
