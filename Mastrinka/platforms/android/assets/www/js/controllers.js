angular.module('starter.controllers', [])

.controller('MainCtrl', function ($scope, ionicMaterialInk, $state, $ionicHistory) {
    ionicMaterialInk.displayEffect();

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
        $ionicHistory.clearHistory();

        $scope.customInit(viewData);

    });

    $scope.customInit = function (viewData) {
        $scope.FullReload();
    };
    $scope.FullReload = function () {
        //$scope.isInitial = true;
        $scope.isInitial = false;
    };
    $scope.toHelp = function () {
        $state.go('tab.help', {});
        window.plugins.nativepagetransitions.slide(
        { "direction": "right" },
        function (msg) { },
        function (msg) { }
        );
    };
    $scope.startTesting = function () {
        $state.go('test-begin', {});
        window.plugins.nativepagetransitions.slide(
        { "direction": "right" },
        function (msg) { },
        function (msg) { }
        );
    };

})

.controller('HelpCtrl', function ($scope, ionicMaterialInk, $state, $ionicModal, LocalizationService) {
    ionicMaterialInk.displayEffect();
    ionicMaterialInk.displayEffect();

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
        $scope.customInit(viewData);

    });

    $scope.customInit = function (viewData) {
        $scope.FullReload();
    };
    $scope.FullReload = function () {

        $ionicModal.fromTemplateUrl('templates/modal-taste-instructions-1.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalTaste = modal;
        });
        $ionicModal.fromTemplateUrl('templates/modal-flow-info.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalFlaws = modal;
        });
        $ionicModal.fromTemplateUrl('templates/modal-positive-charateristics.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalPositive = modal;
        });
        $scope.flaws = LocalizationService.getFlaws();
        $scope.smells = LocalizationService.getSmells();
        $scope.tastes = LocalizationService.getTastes();
        $scope.isInitial = false;
    };
    $scope.ShowModalTasteInstruction = function () {
        $scope.modalTaste.show();
    };
    $scope.CloseModalTasteInstructions = function () {
        $scope.modalTaste.hide();
    };

    $scope.ShowModalFlaws = function () {
        $scope.modalFlaws.show();
    };
    $scope.CloseModalFlaws = function () {
        $scope.modalFlaws.hide();
    };

    $scope.ShowModalPositive = function () {
        $scope.modalPositive.show();
    };
    $scope.CloseModalPositive = function () {
        $scope.modalPositive.hide();
    };

    $scope.$on('$destroy', function () {
        if ($scope.modalTaste)
            $scope.modalTaste.remove();
        if ($scope.modalFlaws)
            $scope.modalFlaws.remove();
    });
})

.controller('AboutCtrl', function ($scope, ionicMaterialInk, $state) {
    ionicMaterialInk.displayEffect();

})

.controller('TestBeginCtlr', function ($scope, ionicMaterialInk, $state, $ionicHistory, HTTPService, config, $ionicModal, NativeStoragService, $ionicLoading) {
    ionicMaterialInk.displayEffect();
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
        $scope.is_read_instruction = false;
        NativeStoragService.getItem("is_read_instruction").then(function (value) {
            $scope.is_read_instruction = value;
            $scope.FullReload();
        }, function (error) {
            $scope.FullReload();
        });
        NativeStoragService.setItem("sample", null).then(function (value) {
        }, function (error) {
        });
    });

    $scope.FullReload = function () {


        $scope.isInitial = true;
        $scope.isError = false;
        $scope.Initial();

    }

    $scope.Reload = function () {
        $scope.Initial();
    };

    $scope.Initial = function () {

        $ionicModal.fromTemplateUrl('templates/modal-manifest.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalManifest = modal;
        });

        $ionicModal.fromTemplateUrl('templates/modal-tables.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalTable = modal;
        });

        $ionicModal.fromTemplateUrl('templates/modal-samples.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalSample = modal;
        });

        $ionicModal.fromTemplateUrl('templates/modal-taste-instructions.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalTaste = modal;
        });

        $scope.value = { manifest: -1, manifest_name: '', table: -1, table_name: '', tables: [], sample: -1, sample_name: '', samples: [] };

        $scope.isInitial = true;

        HTTPService.getManifastionAndSamlpes(
          function Success(data) {

              $scope.data = CreateFromManifestItemsFromServer(data.data["1"]);
              if ($scope.data == null || $scope.data.length <= 0)
              {
                  $scope.isInitial = false;
                  $scope.isError = true;
              }
              else {
                  if ($scope.data.manifest.length == 1) {
                      $scope.value.manifest = $scope.data.manifest[0].id;
                      $scope.value.manifest_name = $scope.data.manifest[0].name;
                      for (var i = 0; i < $scope.data.tables.length; i++) {
                          if ($scope.data.tables[i].manifestation.id == $scope.value.manifest)
                              $scope.value.tables.push($scope.data.tables[i]);
                      }
                  }

                  $scope.isError = false;
                  $scope.isInitial = false;
              }
          },
           function Error(data) {
               $scope.isInitial = false;
               $scope.isError = true;

           },
            config.url + 'manifestation/full'
          );
    };

    $scope.ShowModalTasteInstruction = function () {
        $scope.modalTaste.show();
    };
    $scope.CloseModalTasteInstructions = function () {
        $scope.modalTaste.hide();
    };

    $scope.ShowModalTable = function () {
        $scope.modalTable.show();
    };
    $scope.CloseModalTable = function () {
        $scope.modalTable.hide();
    };

    $scope.CloseModalSample = function () {
        $scope.modalSample.hide();
    };
    $scope.ShowModalSample = function () {
        $scope.modalSample.show();
    };
    $scope.ShowModalManifest = function () {
        $scope.modalManifest.show();
    };
    $scope.CloseModalManifest = function () {
        $scope.modalManifest.hide();
    };
    $scope.newValueModalManifest = function () {

        for (var i = 0; i < $scope.data.manifest.length; i++) {
            if ($scope.data.manifest[i].id == $scope.value.manifest) {
                $scope.value.manifest_name = $scope.data.manifest[i].name;
                break;
            }
        }
        $scope.value.table = -1;
        $scope.value.table_name = '';
        $scope.value.tables = [];
        for (var i = 0; i < $scope.data.tables.length; i++) {
            if ($scope.data.tables[i].manifestation.id == $scope.value.manifest)
                $scope.value.tables.push($scope.data.tables[i]);
        }
        $scope.modalManifest.hide();
    };
    $scope.newValueModalTable = function () {
        for (var i = 0; i < $scope.value.tables.length; i++) {
            if ($scope.value.tables[i].id == $scope.value.table) {
                $scope.value.table_name = $scope.value.tables[i].name;
                break;
            }
        }
        $scope.value.sample = -1;
        $scope.value.sample_name = '';
        $scope.value.samples = [];
        for (var i = 0; i < $scope.data.samples.length; i++) {
            if ($scope.data.samples[i].table.id == $scope.value.table)
                $scope.value.samples.push($scope.data.samples[i]);
        }

        $scope.modalTable.hide();
    };
    $scope.newValueModalSample = function () {
        for (var i = 0; i < $scope.value.samples.length; i++) {
            if ($scope.value.samples[i].id == $scope.value.sample) {
                $scope.value.sample_name = $scope.value.samples[i].name;
                break;
            }
        }

        $scope.modalSample.hide();
    };
    $scope.ToNextStep = function () {
        NativeStoragService.setItem("is_read_instruction", true).then(function (value) {
            $scope.modalTaste.hide();
            $scope.ToNextStep_1();
        }, function (error) {
            $scope.modalTaste.hide();
            $scope.ToNextStep_1();
        });

    };
    $scope.ToNextStep_1 = function () {
        $ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });
        var sample = {
            manfiest_id: $scope.value.manifest, manifest_name: $scope.value.manifest_name, table_id: $scope.value.table, table_name: $scope.value.table_name,
            sample_id: $scope.value.sample, sample_name: $scope.value.sample_name,
            data: null
        };
        HTTPService.getSampleData(
        function Success(data) {
            
            if (data.data) {
                sample.data = data.data;
                NativeStoragService.setItem("sample", sample).then(function (value) {
                    $ionicLoading.hide();
                    $state.go('test-flaw');
                    window.plugins.nativepagetransitions.slide(
                    { "direction": "left" },
                    function (msg) { },
                    function (msg) { }
                    );

                }, function (error) {
                    $ionicLoading.hide();
                    $scope.isInitial = false;
                    $scope.isError = true;
                });
            } else {
                $ionicLoading.hide();
                $scope.isInitial = false;
                $scope.isError = true;
            }



            //$scope.isError = false;
            //$scope.isInitial = false;
        },
        function Error(data) {
            $ionicLoading.hide();
            $scope.isInitial = false;
            $scope.isError = true;

        },
        config.url + 'sample-testing/only-official/' + $scope.value.sample, $scope.value.manifest, $scope.value.manifest_name, $scope.value.table, $scope.value.table_name, $scope.value.sample, $scope.value.sample_name
        );
    };

    $scope.$on('$destroy', function () {
        if ($scope.modalManifest)
            $scope.modalManifest.remove();
        if ($scope.modalTable)
            $scope.modalTable.remove();
        if ($scope.modalSample)
            $scope.modalSample.remove();
        if ($scope.modalTaste)
            $scope.modalTaste.remove();
    });
})

.controller('TestFlawCtlr', function ($scope, ionicMaterialInk, $state, $ionicHistory, HTTPService, config, $ionicModal, NativeStoragService, LocalizationService, $ionicLoading) {
    ionicMaterialInk.displayEffect();
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
        $scope.FullReload();

    });

    $scope.FullReload = function () {


        $scope.isInitial = true;
        $scope.isError = false;
        $scope.Initial();

    }

    $scope.Reload = function () {
        $scope.Initial();
    };

    $scope.Initial = function () {

        $scope.value = { flaw: -1, flaw_name: '', flaw_desc: '', flaw_intesity: 0 };
        $ionicModal.fromTemplateUrl('templates/modal-flaws.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalFlaws = modal;
        });

        NativeStoragService.setItem("flaw", null).then(function (value) {
        }, function (error) {
        });

        $scope.flaws = LocalizationService.getFlaws();

        $scope.isInitial = true;
        NativeStoragService.getItem("sample").then(function (value) {
            $scope.sample = value;
            if ($scope.sample) {
                $scope.ac_1 = 'button-raised';
                $scope.ac_2 = 'button-raised';

                $scope.yes_active = false;
                $scope.no_active = false;

                $scope.isInitial = false;
                $scope.isError = false;
            }
            else {
                $scope.isInitial = false;
                $scope.isError = true;
            }
        }, function (error) {
            $scope.isInitial = false;
            $scope.isError = true;
        });

    };

    $scope.YESClicked = function () {
        if ($scope.yes_active == true)
            return;
        $scope.ac_1 = 'button-balanced';
        $scope.ac_2 = 'button-raised';
        $scope.yes_active = true;
        $scope.no_active = false;

    };
    $scope.NOClicked = function () {
        if ($scope.no_active == true)
            return;
        $scope.ac_2 = 'button-balanced';
        $scope.ac_1 = 'button-raised';
        $scope.yes_active = false;
        $scope.no_active = true;
    };
    $scope.ToNextStep_1 = function () {
        $state.go('test-rates');
        window.plugins.nativepagetransitions.slide(
        { "direction": "left" },
        function (msg) { },
        function (msg) { }
        );
    };
    $scope.ShowModalFlaws = function () {
        $scope.modalFlaws.show();
    };
    $scope.CloseModalFlaws = function () {
        $scope.modalFlaws.hide();
    };

    $scope.newValueModalFlaw = function () {
        $scope.value.flaw_intesity = 0;
        for (var i = 0; i < $scope.flaws.length; i++) {
            if ($scope.flaws[i].id == $scope.value.flaw) {
                $scope.value.flaw_name = $scope.flaws[i].name;
                $scope.value.flaw_desc = $scope.flaws[i].desciption;
                break;
            }
        }
        $scope.modalFlaws.hide();
    };

    $scope.ToFlawFinal = function () {

        $ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });

        NativeStoragService.setFlaw({
            flaw_id: $scope.value.flaw, flaw_name: $scope.value.flaw_name,
            flaw_description: $scope.value.flaw_desc, flaw_intesity: $scope.value.flaw_intesity
        }).then(function (value) {
            $ionicLoading.hide();
            $state.go('test-flaw-result');
            window.plugins.nativepagetransitions.slide(
            { "direction": "left" },
            function (msg) { },
            function (msg) { }
            );

        }, function (error) {
            $ionicLoading.hide();
            $scope.isInitial = false;
            $scope.isError = true;
        });

    };



    $scope.$on('$destroy', function () {
        if ($scope.modalFlaws)
            $scope.modalFlaws.remove();
    });


})

.controller('TestFlawResultCtlr', function ($scope, ionicMaterialInk, $state, $ionicHistory, HTTPService, config, $ionicModal, NativeStoragService, LocalizationService) {
    ionicMaterialInk.displayEffect();
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
        $scope.FullReload();

    });

    $scope.FullReload = function () {


        $scope.isInitial = true;
        $scope.isError = false;
        $scope.Initial();

    }

    $scope.Reload = function () {
        $scope.Initial();
    };

    $scope.Initial = function () {


        $scope.isInitial = true;
        $ionicModal.fromTemplateUrl('templates/modal-flow-info.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalFlaws = modal;
        });

        $scope.flaws = LocalizationService.getFlaws();
        NativeStoragService.getItem("flaw").then(function (value) {
            $scope.flaw = value;
            if ($scope.flaw) {

                NativeStoragService.getItem("sample").then(function (value) {
                    $scope.sample = value;
                    if ($scope.sample && $scope.sample.data) {
                        $scope.server_flaw = { id: -1, name: "-", intesity: 0, status: -1 };
                        if ($scope.sample.data.FlawId && $scope.sample.data.FlawId > 0)
                        {
                            var selectedFlaw = null;
                            for (var i = 0; i < $scope.flaws.length; i++)
                            {
                                if ($scope.flaws[i].id == $scope.sample.data.FlawId)
                                {
                                    selectedFlaw = $scope.flaws[i];
                                    break;
                                }
                            }
                        }
                        
                        
                        if (selectedFlaw != null) {
                            if ($scope.sample.data.FlawIntensity > 0)
                                $scope.server_flaw.intesity = $scope.sample.data.FlawIntensity;
                            $scope.server_flaw.name = selectedFlaw.name;
                            
                        }
                        if (selectedFlaw != null && selectedFlaw.id != $scope.flaw.flaw_id)
                            $scope.server_flaw.status = 0;
                        else if (selectedFlaw == null)
                            $scope.server_flaw.status = 1;
                        else if (selectedFlaw != null && selectedFlaw.id == $scope.flaw.flaw_id)
                            $scope.server_flaw.status = 2;

                        $scope.isInitial = false;
                        $scope.isError = false;
                    }
                    else {
                        $scope.isInitial = false;
                        $scope.isError = true;
                    }
                }, function (error) {
                    $scope.isInitial = false;
                    $scope.isError = true;
                });

            }
            else {
                $scope.isInitial = false;
                $scope.isError = true;
            }
        }, function (error) {
            $scope.isInitial = false;
            $scope.isError = true;
        });

    };

    $scope.ShowModalFlaws = function () {
        $scope.modalFlaws.show();
    };
    $scope.CloseModalFlaws = function () {
        $scope.modalFlaws.hide();
    };

    $scope.goBack = function () {
        $ionicHistory.goBack();
        window.plugins.nativepagetransitions.slide(
        { "direction": "right" },
        function (msg) { },
        function (msg) { }
        );
    };
    $scope.ToThankYou = function () {
        $state.go('thank-you');
        window.plugins.nativepagetransitions.slide(
        { "direction": "left" },
        function (msg) { },
        function (msg) { }
        );
    };

})

.controller('TestRatesCtlr', function ($scope, ionicMaterialInk, $state, $ionicHistory, HTTPService, config, $ionicModal, NativeStoragService, LocalizationService, $ionicLoading) {
    ionicMaterialInk.displayEffect();
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
        $scope.FullReload();

    });

    $scope.FullReload = function () {


        $scope.isInitial = true;
        $scope.isError = false;
        $scope.Initial();

    }

    $scope.Reload = function () {
        $scope.Initial();
    };

    $scope.Initial = function () {


        $scope.isInitial = true;

        $ionicModal.fromTemplateUrl('templates/modal-smells.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalSmells = modal;
        });
        $ionicModal.fromTemplateUrl('templates/modal-tastes.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalTastes = modal;
        });
        $scope.mature_active = false;
        $scope.green_active = false;
        var smells = LocalizationService.getSmells();
        $scope.smells = [];
        for (var i = 0; i < smells.length; i++)
        {
            $scope.smells.push({ id: smells[i].id, name: smells[i].name, description: smells[i].description, checked:false })
        }
        $scope.tastes = LocalizationService.getTastes();

        $scope.value = {
            is_mature: $scope.mature_active, smell: [], smell_intesity: 0,
            taste: -1, taste_name: '', taste_description: '', taste_bitter_intesity: 0, taste_spicy_intesity: 0,
            general_rate_intesity: 0
        };

        NativeStoragService.getItem("sample").then(function (value) {
            $scope.sample = value;
            if ($scope.sample) {

                $scope.ac_1 = 'button-raised';
                $scope.ac_2 = 'button-raised';



                $scope.isInitial = false;
                $scope.isError = false;
            }
            else {
                $scope.isInitial = false;
                $scope.isError = true;
            }
        }, function (error) {
            $scope.isInitial = false;
            $scope.isError = true;
        });


    };
    $scope.SmellSliderChange = function () {
        if (!$scope.TasteShow)
            $scope.TasteShow = true;
    };
    $scope.TasteSliderChanged = function () {
        if (!$scope.GeneralShow)
            $scope.GeneralShow = true;
    };
    $scope.MatureClicked = function () {
        if ($scope.mature_active == true)
            return;
        $scope.ac_1 = 'button-balanced';
        $scope.ac_2 = 'button-raised';
        $scope.mature_active = true;
        $scope.green_active = false;

    };
    $scope.GreenClicked = function () {
        if ($scope.green_active == true)
            return;
        $scope.ac_2 = 'button-balanced';
        $scope.ac_1 = 'button-raised';
        $scope.mature_active = false;
        $scope.green_active = true;
    };

    $scope.ShowModalSmell = function () {
        $scope.modalSmells.show();
    };
    $scope.CloseModalSmells = function () {

        $scope.value.smell = [];


        for(var i = 0; i < $scope.smells.length; i++)
        {
            if($scope.smells[i].checked)
            {
                $scope.value.smell.push({id:$scope.smells[i].id, name: $scope.smells[i].name, description: $scope.smells[i].desciption });
            }
        }

        $scope.modalSmells.hide();
    };
    $scope.DisableCloseButtonSmells = function ()
    {
        for (var i = 0; i < $scope.smells.length; i++) {
            if ($scope.smells[i].checked) {
                return false;
            }
        }
        return true;
    };

    $scope.ShowModalTaste = function () {
        $scope.modalTastes.show();
    };
    $scope.CloseModalTastes = function () {


        $scope.modalTastes.hide();
    };
    $scope.newValueModalTastes = function () {
        for (var i = 0; i < $scope.tastes.length; i++) {
            if ($scope.tastes[i].id == $scope.value.taste) {
                $scope.value.taste_name = $scope.tastes[i].name;
                $scope.value.taste_description = $scope.tastes[i].desciption;
                break;
            }
        }
        $scope.modalTastes.hide();
    };

    $scope.newValueModalSmells = function () {
        for (var i = 0; i < $scope.smells.length; i++) {
            if ($scope.smells[i].id == $scope.value.smell) {
                $scope.value.smell_name = $scope.smells[i].name;
                $scope.value.smell_description = $scope.smells[i].desciption;
                break;
            }
        }
        $scope.modalSmells.hide();
    };

    $scope.GetSmells = function () {
        var arrnames = [];
        for (var i = 0; i < $scope.value.smell.length; i++)
            arrnames.push($scope.value.smell[i].name);
        return arrnames.join(',');
    };

    $scope.ToResults = function () {

        $ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });

        NativeStoragService.setRateResults({
            is_mature: $scope.value.is_mature, smell: $scope.value.smell, smell_intesity: $scope.value.smell_intesity,
            taste: $scope.value.taste, taste_name: $scope.value.taste_name, taste_description: $scope.value.taste_description, taste_bitter_intesity: $scope.value.taste_bitter_intesity, taste_spicy_intesity: $scope.value.taste_spicy_intesity,
            general_rate_intesity: $scope.value.general_rate_intesity
        }).then(function (value) {
            $ionicLoading.hide();
            $state.go('test-result');
            window.plugins.nativepagetransitions.slide(
            { "direction": "left" },
            function (msg) { },
            function (msg) { }
            );

        }, function (error) {
            $ionicLoading.hide();
            $scope.isInitial = false;
            $scope.isError = true;
        });

    };

})




.controller('TestResultCtlr', function ($scope, ionicMaterialInk, $state, $ionicHistory, HTTPService, config, $ionicModal, NativeStoragService, LocalizationService, $translate) {
    ionicMaterialInk.displayEffect();
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
        $scope.FullReload();

    });

    $scope.FullReload = function () {


        $scope.isInitial = true;
        $scope.isError = false;
        $scope.Initial();

    }

    $scope.Reload = function () {
        $scope.Initial();
    };

    $scope.Initial = function () {


        $scope.isInitial = true;





        NativeStoragService.getItem("rate_result").then(function (value) {
            $scope.rate_result = value;
            if ($scope.rate_result) {

                NativeStoragService.getItem("sample").then(function (value) {

                    //sample.data pr.
                    //{"SampleId":3,"SampleName":"UMK 33 avr","IsOfficial":1,"IsMature":0,"OverallRating":8.64,"FlawId":null,"FlawIntensity":0,"TasteId":2,"TasteBitterIntensity":6.95,"TasteSpicyIntensity":6.94,"Smells":[5,7,2]}
                    $scope.sample = value;
                    if ($scope.sample && $scope.sample.data) {

                        $scope.firstSent = '';
                        if ($scope.rate_result.is_mature)
                            $scope.firstSent = $translate.instant('MSG_OIL_FROM_MATURE_OLIVES');
                        else
                            $scope.firstSent = $translate.instant('MSG_OIL_FROM_GREEN_OLIVES');

                        var arrnames = [];
                        for (var i = 0; i < $scope.rate_result.smell.length; i++)
                            arrnames.push($scope.rate_result.smell[i].name);
                        var snames = arrnames.join(',');

                        $scope.secondSent = $translate.instant('MSG_SMELL_RESULT_SENT').format(snames.toUpperCase(), (($scope.rate_result.smell_intesity / 10)).toFixed(2));

                        $scope.thirdSent = $translate.instant('MSG_TASTE_RESULT_SENT').format($scope.rate_result.taste_name.toUpperCase(),
                            (($scope.rate_result.taste_bitter_intesity / 10)).toFixed(2), (($scope.rate_result.taste_spicy_intesity / 10)).toFixed(2));
                        $scope.fourthSent = $translate.instant('MSG_GENERAL_RATE_SENT').format((($scope.rate_result.general_rate_intesity / 10)).toFixed(2));

                        $scope.firstSent_1 = "-";
                        $scope.secondSent_1 = "-";
                        $scope.thirdSent_1 = "-";
                        $scope.fourthSent_1 = "-";

                        $scope.showLower = false;
                        
                        if ($scope.sample.data.FlawId == null || $scope.sample.data.FlawId <= 0)
                        {
                            if ($scope.sample.data.IsMature || $scope.sample.data.IsMature == 1)
                                $scope.firstSent_1 = $translate.instant('MSG_OIL_FROM_MATURE_OLIVES');
                            else
                                $scope.firstSent_1 = $translate.instant('MSG_OIL_FROM_GREEN_OLIVES');

                            var tastes = LocalizationService.getTastes();
                            var tName = null;
                            for (var i = 0; i < tastes.length; i++)
                            {
                                if (tastes[i].id == $scope.sample.data.TasteId)
                                {
                                    tName = tastes[i].name;
                                    break;
                                }
                            }
                            var smells = LocalizationService.getSmells();
                            var ssNames = [];
                            for (var i = 0; i < $scope.sample.data.Smells.length; i++)
                            {
                                for (var j = 0; j < smells.length; j++)
                                {
                                    if (smells[j].id == $scope.sample.data.Smells[i])
                                    {
                                        ssNames.push(smells[j].name);
                                        break;
                                    }
                                }
                            }
                            var sJoin = ssNames.join(',');
                            if (sJoin)
                            {
                                $scope.secondSent_1 = $translate.instant('MSG_SMELL_RESULT_SENT').format(sJoin.toUpperCase(), ($scope.sample.data.SmellIntensity).toFixed(2));
                            }
                            

                            if (tName) {
                                $scope.thirdSent_1 = $translate.instant('MSG_TASTE_RESULT_SENT').format(tName.toUpperCase(),
                            ($scope.sample.data.TasteBitterIntensity).toFixed(2), ($scope.sample.data.TasteSpicyIntensity).toFixed(2));
                            }
                            $scope.fourthSent_1 = $translate.instant('MSG_GENERAL_RATE_SENT').format((($scope.sample.data.OverallRating)).toFixed(2));

                        }
                        else
                        {
                            var flaw_name = "";
                            var flaws = LocalizationService.getFlaws();
                            for (var i = 0; i < flaws.length; i++) {
                                if (flaws[i].id == $scope.sample.data.FlawId) {
                                    flaw_name = flaws[i].name;
                                    break;
                                }
                            }

                            $scope.flawsent = $translate.instant('MSG_OIL_HAS_FLAW').format(flaw_name);

                            $scope.showLower = true;
                        }

                        $scope.isInitial = false;
                        $scope.isError = false;
                    }
                    else {
                        $scope.isInitial = false;
                        $scope.isError = true;
                    }
                }, function (error) {
                    $scope.isInitial = false;
                    $scope.isError = true;
                });
            }
            else {
                $scope.isInitial = false;
                $scope.isError = true;
            }
        }, function (error) {
            $scope.isInitial = false;
            $scope.isError = true;
        });


    };

    $scope.ToNext = function () {
        $state.go('thank-you');
        window.plugins.nativepagetransitions.slide(
        { "direction": "left" },
        function (msg) { },
        function (msg) { }
        );
    };







})

.controller('ThankYouCtlr', function ($scope, ionicMaterialInk, $state, $ionicHistory, HTTPService, config, $ionicModal, NativeStoragService, $ionicLoading) {
    ionicMaterialInk.displayEffect();
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        $ionicHistory.clearHistory();
        viewData.enableBack = true;
        $scope.FullReload();

    });

    $scope.FullReload = function () {


        $scope.isInitial = true;
        $scope.isError = false;
        $scope.Initial();

    }

    $scope.Reload = function () {
        $scope.Initial();
    };

    $scope.Initial = function () {


        $scope.isInitial = true;

        $scope.value = { usefull: 5, intiutive: 5, detail: 5 };

        $scope.is_populate_thanks = false;
        NativeStoragService.getItem("is_populate_thanks").then(function (value) {
            $scope.is_populate_thanks = value;
            NativeStoragService.getFlawAndRateAndSample().then(function (value1) {
                $scope.flaw_rate_result = value1;
                $scope.InitalDone();
            }, function (error) {
                $scope.InitalDone();
            });
            
        }, function (error) {
            $scope.InitalDone();
        });



    };

    $scope.InitalDone = function () {
        $scope.isInitial = false;
        $scope.isError = false;
    };

    $scope.ToMain = function ()
    {
        $state.go('tab.main');
        window.plugins.nativepagetransitions.slide(
        { "direction": "left" },
        function (msg) { },
        function (msg) { }
        );
    };

    $scope.RateAgain = function ()
    {
        $scope.is_populate_thanks = false;
    };

    $scope.SendAndToMain = function () {

        $ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });

        HTTPService.sentRate(
          function Success(data) {

              NativeStoragService.setFlawAndRateToNull().then(function (value1) {
                  NativeStoragService.setItem("is_populate_thanks", true).then(function (value) {
                      $ionicLoading.hide();
                      $state.go('tab.main');
                      window.plugins.nativepagetransitions.slide(
                      { "direction": "left" },
                      function (msg) { },
                      function (msg) { }
                      );

                  }, function (error) {
                      $ionicLoading.hide();
                      $state.go('tab.main');
                      window.plugins.nativepagetransitions.slide(
                      { "direction": "left" },
                      function (msg) { },
                      function (msg) { }
                      );
                  });

              }, function (error) {
                  NativeStoragService.setItem("is_populate_thanks", true).then(function (value) {
                      $ionicLoading.hide();
                      $state.go('tab.main');
                      window.plugins.nativepagetransitions.slide(
                      { "direction": "left" },
                      function (msg) { },
                      function (msg) { }
                      );

                  }, function (error) {
                      $ionicLoading.hide();
                      $state.go('tab.main');
                      window.plugins.nativepagetransitions.slide(
                      { "direction": "left" },
                      function (msg) { },
                      function (msg) { }
                      );
                  });
              });
          },
           function Error(data) {
               $ionicLoading.hide();
               $state.go('tab.main');
               window.plugins.nativepagetransitions.slide(
               { "direction": "left" },
               function (msg) { },
               function (msg) { }
               );
           },
            config.url + 'sample-testing/save-user-rating', $scope.value.usefull, $scope.value.intiutive, $scope.value.detail, $scope.flaw_rate_result
        );
    };

})

;