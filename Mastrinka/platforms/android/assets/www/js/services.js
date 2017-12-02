angular.module('starter.services', [])

.factory('HTTPService', function ($http, $q, $timeout) {

    return {



        getManifastionAndSamlpes: function (handleSuccess, handleError, url) {
            var deferred = $q.defer();

            setTimeout(function () {
                deferred.resolve(PopulateForTestTables());
                
            }, 1000);
            return deferred.promise.then(handleSuccess, handleError);
            /*
            ovo ce ic kad se napravi
            return $http.get(url,
            {
                timeout: deferred.promise,
                method: 'POST',
                dataType: "json",
                params: { 'signature': signature, 'public_key': publickey, 'search': search, 'translation': translation },
                headers: {
                    "Content-Type": 'application/json; charset=UTF-8'
                },
            }
            ).then(handleSuccess, handleError);*/
        },
        getSampleData: function (handleSuccess, handleError, url, manfiest_id, manifest_name, table_id, table_name, sample_id, sample_name) {
            var deferred = $q.defer();

            setTimeout(function () {
                deferred.resolve({
                    manfiest_id: manfiest_id, manifest_name: manifest_name, table_id: table_id, table_name: table_name, sample_id: sample_id, sample_name: sample_name,
                    data: null});
                
            }, 1000);
            return deferred.promise.then(handleSuccess, handleError);
            /*
            ovo ce ic kad se napravi
            return $http.get(url,
            {
                timeout: deferred.promise,
                method: 'POST',
                dataType: "json",
                params: { 'signature': signature, 'public_key': publickey, 'search': search, 'translation': translation },
                headers: {
                    "Content-Type": 'application/json; charset=UTF-8'
                },
            }
            ).then(handleSuccess, handleError);*/
        },
        sentRate: function (handleSuccess, handleError, url, rate_usefull, rate_intiutive, rate_detail) {
            var deferred = $q.defer();

            setTimeout(function () {
                deferred.resolve({
                    ok: 'ok'
                });

            }, 1000);
            return deferred.promise.then(handleSuccess, handleError);
            /*
            ovo ce ic kad se napravi
            return $http.get(url,
            {
                timeout: deferred.promise,
                method: 'POST',
                dataType: "json",
                params: { 'signature': signature, 'public_key': publickey, 'search': search, 'translation': translation },
                headers: {
                    "Content-Type": 'application/json; charset=UTF-8'
                },
            }
            ).then(handleSuccess, handleError);*/
        },

        like: function (handleSuccess, handleError, signature, publickey, search, translation, url) {
            var deferred = $q.defer();
            return $http.get(url,
            {
                timeout: deferred.promise,
                method: 'POST',
                dataType: "json",
                params: { 'signature': signature, 'public_key': publickey, 'search': search, 'translation': translation },
                headers: {
                    "Content-Type": 'application/json; charset=UTF-8'
                },
            }
            ).then(handleSuccess, handleError);
        },
        all: function (handleSuccess, handleError, signature, publickey, latitude, longitude, translation, url) {

            return $http.get(url,
            {
                method: 'POST',
                dataType: "json",
                params: { 'signature': signature, 'public_key': publickey, 'latitude': latitude, 'longitude': longitude, 'translation': translation },
                headers: {
                    "Content-Type": 'application/json; charset=UTF-8'
                },
            }
            ).then(handleSuccess, handleError);
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
            arr.push({ id: 1, name: $translate.instant('TASTE_1'), description: '' });
            arr.push({ id: 2, name: $translate.instant('TASTE_2'), description: '' });
            arr.push({ id: 3, name: $translate.instant('TASTE_3'), description: '' });
            arr.push({ id: 4, name: $translate.instant('TASTE_4'), description: '' });
            arr.push({ id: 5, name: $translate.instant('TASTE_5'), description: '' });
            return arr;
        },
        

    };

})

;