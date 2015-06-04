var wordSamplesApp = angular.module("wordSamplesApp", ['ngRoute']);
var insideOffice = false;
var debugOption = false;

var logComment = function (message) {
    document.getElementById('console').innerHTML += message + '\n';
}

var logDebug = function (message) {
    if (debugOption) {
        document.getElementById('console').innerHTML += message + '\n';
    }
}

Office.initialize = function (reason) {
    insideOffice = true;
    console.log('Initialized!');
};

wordSamplesApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/samples',
            {
                controller: 'SamplesController',
                templateUrl: 'partials/samples.html'
            })
        .otherwise({ redirectTo: '/samples' });
}]);

wordSamplesApp.factory("wordSamplesFactory", ['$http', function ($http) {
    var factory = {};

    factory.getSamples = function () {
        return $http.get('samples/samples.json');
    };

    factory.getSampleCode = function (filename) {
        return $http.get('samples/' + filename);
    };

    return factory;
}]);

wordSamplesApp.controller("SamplesController", function ($scope, wordSamplesFactory) {
    $scope.samples = [{ name: "Loading..." }];
    $scope.selectedSample = { description: "No sample loaded" };
    $scope.insideOffice = insideOffice;
    $scope.debugOption = { value: false };

    // Update to full path if word is not at the root folder
    MonacoEditorIntegration.initializeJsEditor('TxtRichApiScript', [
            "/word/script/EditorIntelliSense/WordLatest.txt",
            "/word/script/EditorIntelliSense/Office.Runtime.txt",
            "/word/script/EditorIntelliSense/Helpers.txt",
            "/word/script/EditorIntelliSense/jquery.txt",
    ]);

    MonacoEditorIntegration.setDirty = function () {
        if ($scope.selectedSample.code) {
            $scope.selectedSample = { description: $scope.selectedSample.description + " (modified)" };
            $scope.$apply();
        }
    }

    wordSamplesFactory.getSamples().then(function (response) {
        $scope.samples = response.data.values;
        $scope.groups = response.data.groups;
    });

    $scope.loadSampleCode = function () {
        console.log("loadSampleCode called");
        appInsights.trackEvent("SampleLoaded", { name: $scope.selectedSample.name });
        wordSamplesFactory.getSampleCode($scope.selectedSample.filename).then(function (response) {
            $scope.selectedSample.code = response.data;
            $scope.insideOffice = insideOffice;
            MonacoEditorIntegration.setJavaScriptText($scope.selectedSample.code);
        });
    };

    $scope.runSelectedSample = function () {
        var script = MonacoEditorIntegration.getJavaScriptToRun().replace("console.log", "logComment");
        eval(script);
    }

    $scope.emailSample = function () {
        //emailScript(MonacoEditorIntegration.getJavaScriptToRun());
        testWindowOpen();
    }

    $scope.toggleDebugOption = function () {
        debugOption = $scope.debugOption.value;
    }
});

function testWindowOpen() {
    win = window.open("http://www.bing.com");
    if (win && win.open && !win.closed) win.close();
}

function emailScript(body_message) {
    var email = "juanbl@microsoft.com; trangluu@microsoft.com";
    var subject = "Gemini Word APIs: Sample Code";

    var mailto_link = 'mailto:' + email + '?subject=' + subject + '&body=' + body_message;

    win = window.open(mailto_link, 'emailWindow');

    if (win && win.open && !win.closed) win.close();
}