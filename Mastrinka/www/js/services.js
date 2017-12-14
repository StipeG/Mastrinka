angular.module('starter.services', [])

.factory('HTTPService', function ($http, $q, $timeout) {

    return {

        getManifastionAndSamlpes: function (handleSuccess, handleError, url) {


            return $http.get(url,
            {
                method: 'POST',
                dataType: "json",
                headers: {
                    "Content-Type": 'application/json; charset=UTF-8'
                },
            }
            ).then(handleSuccess, handleError);
        },
        getSampleData: function (handleSuccess, handleError, url, manfiest_id, manifest_name, table_id, table_name, sample_id, sample_name) {
            return $http.get(url,
            {
                method: 'POST',
                dataType: "json",
                headers: {
                    "Content-Type": 'application/json; charset=UTF-8'
                },
            }
            ).then(handleSuccess, handleError);
        },

        sentRate: function (handleSuccess, handleError, url, rate_usefull, rate_intiutive, detail, flaw_rate_result) {
            var val = { };
            
            val = {
                SampleId: null, IsMature: false, OverallRating: null, FlawId: null, FlawIntensity: null, TasteId: null, TasteSpicyIntensity: null, TasteBitterIntensity: null,
                Smell: null, SmellIntensity: null, AppUsefull: null, AppIntiutive: null, AppDetail: null
            };

            if (flaw_rate_result.sample && flaw_rate_result.sample != null)
                val.SampleId = flaw_rate_result.sample.sample_id;
            else
                val.SampleId = 1;
            if (flaw_rate_result.flaw != null) {
                val.FlawId = flaw_rate_result.flaw.flaw_id;
                val.FlawIntensity = (flaw_rate_result.flaw.flaw_intesity / 10).toFixed(2);
            }
            else {
                val.IsMature = flaw_rate_result.rate_result.is_mature;
                val.TasteId = flaw_rate_result.rate_result.taste;
                val.TasteBitterIntensity = (flaw_rate_result.rate_result.taste_bitter_intesity / 10).toFixed(2);
                val.TasteSpicyIntensity = (flaw_rate_result.rate_result.taste_spicy_intesity / 10).toFixed(2);

                var arr = [];
                for (var i = 0; i < flaw_rate_result.rate_result.length; i++)
                    arr.push(flaw_rate_result.rate_result.id);

                val.Smell = arr;
                val.SmellIntensity = (flaw_rate_result.rate_result.smell_intesity / 10).toFixed(2);
                val.OverallRating = (flaw_rate_result.rate_result.general_rate_intesity / 10).toFixed(2);
            }

            val.AppDetail = detail;
            val.AppIntiutive = rate_intiutive;
            val.AppUsefull = rate_usefull;

            
            return $http.post("http://174.138.64.37/api/sample-testing/save-user-rating",
            {
                "data": {
                    "SampleId": val.SampleId, "IsMature": val.IsMature, "OverallRating": val.OverallRating, "FlawId": val.FlawId, "FlawIntensity": val.FlawIntensity,
                    "TasteId": val.TasteId, "TasteSpicyIntensity": val.TasteSpicyIntensity, "TasteBitterIntensity": val.TasteBitterIntensity,
                    "Smell": val.Smell, "SmellIntensity": val.SmellIntensity, "AppUsefull": val.AppUsefull, "AppIntiutive": val.AppIntiutive, "AppDetail": val.AppDetail
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(handleSuccess, handleError);

        },

    };

})


.factory('NativeStoragService', function  ($window, $q, $log, $localStorage) {
    var inBrowser = false;
    var initialised = false;



    function isInBrowser() {
        if (!initialised) {
            inBrowser = ($window.cordova && $window.cordova.platformId === 'browser') || !($window.phonegap || $window.cordova) || ($window.parent && $window.parent.ripple) || (ionic.Platform.isWindowsPhone());
            if (!inBrowser) {
                $log.log('NativeStorageWrapper: isNotInBrowser');
            } else {
                $log.log('NativeStorageWrapper: isInBrowser');
            }
            initialised = true;
        }
        return inBrowser;
    };
    function setInLocalStorage(reference, variable, success, error) {
        try {
            $localStorage[reference] = variable;
            success(variable);
        } catch (err) {
            error(err);
        }
    };

    function getFromLocalStorage(reference, success, error) {
        try {
            var obj;
            var value = $localStorage[reference];
            if (value != undefined) {
                success(value);
            }
            else if (value == null) {
                success(value);
            }
            else {
                throw new Error(reference + ': undefined');
            }
        } catch (err) {
            error(err);
        }
    };

    function removeFromLocalStorage(reference, success, error) {
        try {
            $localStorage.removeItem(reference);
            success(null);
        } catch (err) {
            error(err);
        }
    };

    function raiseError(error) {
        error(null);
    }
    $localStorage = $localStorage.$default({
        is_read_instruction: false,
        sample: null,
        flaw: null,
        rate_result: null,
        is_populate_thanks: false,
    });
    var defData = {
        is_read_instruction: false,
        sample: null,
        flaw: null,
        rate_result: null,
        is_populate_thanks: false,
    };
    return {
        test: function (what) {
            return defData[what];
        },

        setItem: function (reference, s) {
            var q = $q.defer();
            if (isInBrowser()) {
                setInLocalStorage(reference, s, function (result) { q.resolve(result); }, function (error) { q.resolve(null); });
            } else {
                NativeStorage.setItem(reference, s, function (result) { q.resolve(result); }, function (error) {
                    q.resolve(null);
                });
            }
            return q.promise;
        },
        getItem: function (reference) {
            var q = $q.defer();
            if (isInBrowser()) {
                getFromLocalStorage(reference, function (result) {
                    q.resolve(result);
                },
                    function (error) {
                        q.reject(error);
                    });
            } else {
                NativeStorage.getItem(reference, function (result) { q.resolve(result); }, function (error) {
                    if (error.code) {
                        try {
                            q.resolve(defData[reference]);
                        } catch (e) {
                            q.reject(error);
                        }

                    }
                    else {
                        try {
                            q.resolve(defData[reference]);
                        } catch (e) {
                            q.reject(error);
                        }
                    }

                });
            }
            return q.promise;
        },
        getFlawAndRateAndSample: function () {
            var q = $q.defer();
            if (isInBrowser()) {
                getFromLocalStorage("flaw", function (result1) {
                    getFromLocalStorage("rate_result", function (result2) {
                        getFromLocalStorage("sample", function (result3) {
                            q.resolve({ flaw: result1, rate_result: result2, sample: result3 });
                            },
                            function (error) {
                                q.reject(error);
                            });
                        },
                        function (error) {
                        q.reject(error);
                    });
                },
                 function (error) {
                        q.reject(error);
            });
            } else {
                NativeStorage.getItem("flaw", function (result1)
                {
                    NativeStorage.getItem("rate_result", function (result2) {
                        NativeStorage.getItem("rate_result", function (result3) {
                            q.resolve({ flaw: result1, rate_result: result2, sample: result3 });
                        },
                        function (error) {
                            q.reject(error);

                        });
                    },
                    function (error) {
                        q.reject(error);

                    });
                },
                function (error) {
                    q.reject(error);

                });
            }
            return q.promise;
        },
        setFlawAndRateToNull: function () {
            var q = $q.defer();
            if (isInBrowser()) {
                setInLocalStorage("flaw", null, function (result)
                {
                    setInLocalStorage("rate_result", null, function (result1) {
                        q.resolve(result1);
                    },
                    function (error) {
                        q.resolve(null);
                    });
                },
                function (error) {
                    q.resolve(null);
                });
            } else {
                NativeStorage.setItem("flaw", null, function (result)
                {
                    NativeStorage.setItem("rate_result", null, function (result1) {
                        q.resolve(result1);
                    },
                    function (error) {
                        q.resolve(null);
                    });
                },
                function (error) {
                    q.resolve(null);
                });
            }
            return q.promise;
        },
        setRateResults: function (s) {
            var q = $q.defer();
            if (isInBrowser()) {
                setInLocalStorage("flaw", null, function (result) {
                    setInLocalStorage("rate_result", s, function (result1) {
                        q.resolve(result1);
                    },
                    function (error) {
                        q.resolve(null);
                    });
                },
                function (error) {
                    q.resolve(null);
                });
            } else {
                NativeStorage.setItem("flaw", null, function (result) {
                    NativeStorage.setItem("rate_result", s, function (result1) {
                        q.resolve(result1);
                    },
                    function (error) {
                        q.resolve(null);
                    });
                },
                function (error) {
                    q.resolve(null);
                });
            }
            return q.promise;
        },
        setFlaw: function (s) {
            var q = $q.defer();
            if (isInBrowser()) {
                setInLocalStorage("rate_result", null, function (result) {
                    setInLocalStorage("flaw", s, function (result1) {
                        q.resolve(result1);
                    },
                    function (error) {
                        q.resolve(null);
                    });
                },
                function (error) {
                    q.resolve(null);
                });
            } else {
                NativeStorage.setItem("rate_result", null, function (result) {
                    NativeStorage.setItem("flaw", s, function (result1) {
                        q.resolve(result1);
                    },
                    function (error) {
                        q.resolve(null);
                    });
                },
                function (error) {
                    q.resolve(null);
                });
            }
            return q.promise;
        },
    }

})


.factory('InternetConnectivity', function () {
    return function InternetConnectivity() {
        var internet = true;
        if (window.cordova) {
            if (window.Connection) {
                if (navigator.connection.type === Connection.NONE) {
                    internet = false;
                }
            }
        }
        return internet;
    };
})


.factory('LocalizationService', function ($translate) {

    return {
        getFlaws: function () {
            var arr = [];
            arr.push({ id: 1, name: $translate.instant('FLAW_TITLE_1'), description: $translate.instant('FLAW_DESC_1') });
            arr.push({ id: 2, name: $translate.instant('FLAW_TITLE_2'), description: $translate.instant('FLAW_DESC_2') });
            arr.push({ id: 3, name: $translate.instant('FLAW_TITLE_3'), description: $translate.instant('FLAW_DESC_3') });
            arr.push({ id: 4, name: $translate.instant('FLAW_TITLE_4'), description: $translate.instant('FLAW_DESC_4') });
            arr.push({ id: 5, name: $translate.instant('FLAW_TITLE_5'), description: $translate.instant('FLAW_DESC_5') });
            arr.push({ id: 6, name: $translate.instant('FLAW_TITLE_6'), description: $translate.instant('FLAW_DESC_6') });
            arr.push({ id: 7, name: $translate.instant('FLAW_TITLE_7'), description: $translate.instant('FLAW_DESC_7') });
            arr.push({ id: 8, name: $translate.instant('FLAW_TITLE_8'), description: $translate.instant('FLAW_DESC_8') });
            arr.push({ id: 9, name: $translate.instant('FLAW_TITLE_9'), description: $translate.instant('FLAW_DESC_9') });
            arr.push({ id: 10, name: $translate.instant('FLAW_TITLE_10'), description: $translate.instant('FLAW_DESC_10') });
            arr.push({ id: 11, name: $translate.instant('FLAW_TITLE_11'), description: $translate.instant('FLAW_DESC_11') });
            arr.push({ id: 12, name: $translate.instant('FLAW_TITLE_12'), description: $translate.instant('FLAW_DESC_12') });
            arr.push({ id: 13, name: $translate.instant('FLAW_TITLE_13'), description: $translate.instant('FLAW_DESC_13') });
            arr.push({ id: 14, name: $translate.instant('FLAW_TITLE_14'), description: $translate.instant('FLAW_DESC_14') });
            arr.push({ id: 15, name: $translate.instant('FLAW_TITLE_15'), description: $translate.instant('FLAW_DESC_15') });
            arr.push({ id: 16, name: $translate.instant('FLAW_TITLE_16'), description: $translate.instant('FLAW_DESC_16') });
            return arr;
        },
        getSmells: function ()
        {
            var arr = [];
            arr.push({ id: 1, name: $translate.instant('SMELL_1'), description: '' });
            arr.push({ id: 2, name: $translate.instant('SMELL_2'), description: '' });
            arr.push({ id: 3, name: $translate.instant('SMELL_3'), description: '' });
            arr.push({ id: 4, name: $translate.instant('SMELL_4'), description: '' });
            arr.push({ id: 5, name: $translate.instant('SMELL_5'), description: '' });
            arr.push({ id: 6, name: $translate.instant('SMELL_6'), description: '' });
            arr.push({ id: 7, name: $translate.instant('SMELL_7'), description: '' });
            arr.push({ id: 8, name: $translate.instant('SMELL_8'), description: '' });
            arr.push({ id: 9, name: $translate.instant('SMELL_9'), description: '' });
            return arr;
        },
        getTastes: function () {
            var arr = [];
            arr.push({ id: 1, name: $translate.instant('TASTE_2'), description: '' });
            arr.push({ id: 2, name: $translate.instant('TASTE_3'), description: '' });
            arr.push({ id: 3, name: $translate.instant('TASTE_4'), description: '' });
            arr.push({ id: 4, name: $translate.instant('TASTE_5'), description: '' });
            return arr;
        },
        

    };

})

;