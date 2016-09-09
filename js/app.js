// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app_twentyOne', ['ionic', 'nvd3', 'ngStorage', 'app_twentyOne.controllers', 'app_twentyOne.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //db options
    //SQLite
    //db = $cordovaSQLite.openDB({ name: "my.db"}); 
    //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");

    //WebSQL
    db = window.openDatabase("my.db", "1.0", "Cordova Demo", 200000); 
    db.transaction(function (tx) {  
        tx.executeSql('CREATE TABLE IF NOT EXISTS profile (id integer primary key, name text, startdate text, weight double)');
    });
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('home', {
        url:'/home',
        templateUrl:'templates/home.html'
    })

  /* user views */
    .state('user', {
        abstract: true,
        url: '/user',
        templateUrl: 'templates/user.html'
    })

    .state('user.chart', {
        url: '/chart',
        views:{
            'tab-userChart':{
                templateUrl: 'templates/user-chart.html',
                controller: 'userCtrl',
                controllerAs:'vm'
            }
        }
    })
    
    .state('user.data', {
        url: '/data',
        views:{
            'tab-userData':{
                templateUrl: 'templates/user-data.html',
                controller: 'dataController',
                controllerAs: 'vm'
            }
        }
    })
    
    .state('user.profile', {
        url: '/profile',
        views:{
            'tab-userProfile':{
                templateUrl: 'templates/user-profile.html',
                controller: 'profileController',
                controllerAs: 'vm'
            }
        }
    })
    
    /* tracker */
    .state('tracker', {
        abstract: true,
        url: '/tracker',
        templateUrl: 'templates/tracker.html'
    })

    .state('tracker.daily', {
        url: '/daily',
        views:{
            'tab-trackerDaily':{
                templateUrl: 'templates/tracker-daily.html',
                controller: 'dailyController'
            }
        }
    })
    
    .state('tracker.meal', {
        url: '/meal',
        views:{
            'tab-trackerMeal':{
                templateUrl: 'templates/tracker-meal.html',
                controller: 'mealController'
            }
        }
    })
    
    /* docs */
    .state('docs', {
        abstract: true,
        url: '/docs',
        templateUrl: 'templates/docs.html'
    })
    
    .state('docs.calorieTable', {
        url: '/calorieTable',
        views:{
            'tab-calorieTable':{
                templateUrl: 'templates/docs-calorieTable.html',
                controller: 'calorieTableController'
            }
        }
    })
    
    .state('docs.foodList', {
        url: '/foodList',
        views:{
            'tab-foodList':{
                templateUrl: 'templates/docs-foodList.html',
                controller:'foodListController'
            }
        }
    })
    
    .state('docs.cheatSheet', {
        url: '/cheatSheet',
        views:{
            'tab-cheatSheet':{
                templateUrl: 'templates/docs-cheatSheet.html'
            }
        }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});
