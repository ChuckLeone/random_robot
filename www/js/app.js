// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db = null;
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite, Robots) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
    
    // insert db
    //
    var db = $cordovaSQLite.openDB({name: "my.db"});
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
    // insert db
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.factory', {
    url: '/factory',
    views: {
      'tab-factory': {
        templateUrl: 'templates/tab-factory.html',
        controller: 'FactoryCtrl'
      }
    }
  })

  .state('tab.warehouse', {
      url: '/warehouse',
      views: {
        'tab-warehouse': {
          templateUrl: 'templates/tab-warehouse.html',
          controller: 'WarehouseCtrl'
        }
      }
    })
    .state('tab.robot-detail', {
      url: '/robots/:robotId',
      views: {
        'tab-warehouse': {
          templateUrl: 'templates/robot-detail.html',
          controller: 'RobotDetailCtrl'
        }
      }
    })

  .state('tab.lab', {
    url: '/lab',
    views: {
      'tab-lab': {
        templateUrl: 'templates/tab-lab.html',
        controller: 'LabCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/factory');

});
