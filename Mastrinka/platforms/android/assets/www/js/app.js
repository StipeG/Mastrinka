// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'pascalprecht.translate', 'ngCordova', 'ion-floating-menu', 'ionic-material',
    'ngStorage', 'rzModule', 'ionic.native', 'ionicLazyLoad']);
app.constant('config', {
    url: 'https://happytovisit.com/SmartApp/SmartApp.asmx/'
});
app.run(function ($ionicPlatform, $window, $ionicModal, $rootScope, $translate, $animate, $state, $cordovaSplashscreen, $timeout,
    NativeStoragService, $translate) {




    $ionicPlatform.ready(function () {

        setTimeout(function () {
            if (navigator.splashscreen)
                navigator.splashscreen.hide();
        }, 500);

        window.plugins.nativepagetransitions.globalOptions.duration = 500;
        window.plugins.nativepagetransitions.globalOptions.iosdelay = 350;
        window.plugins.nativepagetransitions.globalOptions.androiddelay = 350;
        window.plugins.nativepagetransitions.globalOptions.winphonedelay = 350;
        window.plugins.nativepagetransitions.globalOptions.slowdownfactor = 4;
        // these are used for slide left/right only currently
        window.plugins.nativepagetransitions.globalOptions.fixedPixelsTop = 0;
        window.plugins.nativepagetransitions.globalOptions.fixedPixelsBottom = 0;

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (cordova.platformId === "ios" && window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        $ionicModal.fromTemplateUrl('templates/modal-noconnection.html', {
            scope: $rootScope
        }).then(function (modal) {
            $rootScope.modal = modal;
        });
        $rootScope.userin = true;

        $ionicPlatform.on('resume', function () {
            $rootScope.userin = true;

            NativeStoragService.getItem("clientVouchers").then(function (value) {
                if ($rootScope.online === false)
                    $rootScope.modal.show();

            }, function (error) {
                if ($rootScope.online === false)
                    $rootScope.modal.show();
            });

        });
        $ionicPlatform.on('pause', function () {
            $rootScope.userin = false;
        });


        $rootScope.online = true;
        if (window.Connection) {

            document.addEventListener("offline", function () {
                if (!$rootScope.online) return;
                $rootScope.online = false;
                if ($rootScope.userin === true)
                    $rootScope.modal.show();
            }, false);
            document.addEventListener("online", function () {
                if ($rootScope.online) return;
                $rootScope.online = true;
            }, false);

            $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
                if ($rootScope.online) return;
                $rootScope.online = true;
            })
            $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
                if (!$rootScope.online) return;
                $rootScope.online = false;
                if ($rootScope.userin === true)
                    $rootScope.modal.show();
            })
        }
        $rootScope.Reload = function () {
            if ($rootScope.online) {
                $rootScope.modal.hide();
                $state.transitionTo($state.current, $state.$current.params, { reload: true, inherit: true, notify: true });
                //$rootScope.$state.go($rootScope.$state.current, {}, { reload: true, cache: true });
            }
        }


    });
});
app.config(function ($stateProvider, $urlRouterProvider, $translateProvider, $ionicConfigProvider, $provide, $httpProvider) {

    $httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike';
    $ionicConfigProvider.views.transition('none');






    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

         .state('test-begin', {
             cache: false,
             url: "/test-begin",
             templateUrl: 'templates/test-begin.html',
             controller: 'TestBeginCtlr'
         })
        .state('test-flaw', {
             cache: false,
             url: "/test-flaw",
             templateUrl: 'templates/test-flaw.html',
             controller: 'TestFlawCtlr'
        })
        .state('test-flaw-result', {
             cache: false,
             url: "/test-flaw-result",
             templateUrl: 'templates/test-flaw-result.html',
             controller: 'TestFlawResultCtlr'
         })
        .state('test-rates', {
             cache: false,
             url: "/test-rates",
             templateUrl: 'templates/test-rates.html',
             controller: 'TestRatesCtlr'
        })
        .state('test-result', {
            cache: false,
            url: "/test-result",
            templateUrl: 'templates/test-result.html',
            controller: 'TestResultCtlr'
        })
        .state('thank-you', {
           cache: false,
           url: "/thank-you",
           templateUrl: 'templates/thank-you.html',
            controller: 'ThankYouCtlr'
       })

    // setup an abstract state for the tabs directive
      .state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'templates/tabs.html'
      })

    // Each tab has its own nav history stack:

    .state('tab.main', {
        cache: true,
        url: '/main',
        views: {
            'tab-main': {
                templateUrl: 'templates/main.html',
                controller: 'MainCtrl'
            }
        },
    })


   .state('tab.help', {
       url: '/help',
       views: {
           'tab-help': {
               templateUrl: 'templates/help.html',
               controller: 'HelpCtrl'
           }
       }
   })

       .state('tab.about', {
           url: '/about',
           views: {
               'tab-about': {
                   templateUrl: 'templates/about.html',
                   controller: 'AboutCtrl'
               }
           }
       })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/main');

    $translateProvider
    .translations('hr', hr_translation)
    .preferredLanguage('hr');

});

app.directive('ionView', function ($rootScope) {
    return {
        restrict: 'EA',
        priority: 6666,
        link: function ($scope, element, attrs) {
            $scope.$on("$ionicView.beforeEnter", function () {
                var htabs = 'hideTabs' in attrs || false;
                $rootScope.hideTabs = 'hideTabs' in attrs || false;
            });
        }
    };
});


app.directive('goNative', ['$ionicGesture', '$ionicPlatform', function ($ionicGesture, $ionicPlatform) {
    return {
        restrict: 'A',

        link: function (scope, element, attrs) {

            $ionicGesture.on('tap', function (e) {

                var direction = attrs.direction;
                var transitiontype = attrs.transitiontype;

                $ionicPlatform.ready(function () {

                    switch (transitiontype) {
                        case "slide":
                            window.plugins.nativepagetransitions.slide({
                                "direction": direction
                            },
                              function (msg) {
                                  console.log("success: " + msg)
                              },
                              function (msg) {

                              }
                            );
                            break;
                        case "flip":
                            window.plugins.nativepagetransitions.flip({
                                "direction": direction
                            },
                              function (msg) {
                                  console.log("success: " + msg)
                              },
                              function (msg) {
                              }
                            );
                            break;

                        case "fade":
                            window.plugins.nativepagetransitions.fade({

                            },
                              function (msg) {
                                  console.log("success: " + msg)
                              },
                              function (msg) {

                              }
                            );
                            break;

                        case "drawer":
                            window.plugins.nativepagetransitions.drawer({
                                "origin": direction,
                                "action": "open"
                            },
                              function (msg) {
                                  console.log("success: " + msg)
                              },
                              function (msg) {

                              }
                            );
                            break;

                        case "curl":
                            window.plugins.nativepagetransitions.curl({
                                "direction": direction
                            },
                              function (msg) {
                                  console.log("success: " + msg)
                              },
                              function (msg) {

                              }
                            );
                            break;

                        default:
                            window.plugins.nativepagetransitions.slide({
                                "direction": direction
                            },
                              function (msg) {
                                  console.log("success: " + msg)
                              },
                              function (msg) {

                              }
                            );
                    }


                });
            }, element);
        }
    };
}]);

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});