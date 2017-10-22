/// <reference path="Scripts/KendoUI/2014.2.1008/kendo.web.min.js" />
// Karma configuration
// Generated on Tue Nov 17 2015 11:57:28 GMT-0600 (Central Standard Time)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            "bower_components/jquery/dist/jquery.js",
                "bower_components/angular/angular.js",
                "bower_components/ng-idle/angular-idle.js",
                "bower_components/angular-local-storage/dist/angular-local-storage.js",
                "bower_components/angular-resource/angular-resource.js",
                "bower_components/angular-sanitize/angular-sanitize.js",
                "bower_components/angular-ui-router/release/angular-ui-router.js",
                "bower_components/angular-bootstrap/ui-bootstrap.js",
                "bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
                "bower_components/angular-cookies/angular-cookies.js",
                "bower_components/angular-animate/angular-animate.js",
                "bower_components/angular-loading-bar/build/loading-bar.js",
                "bower_components/angular-auto-validate/dist/jcs-auto-validate.js",
                "bower_components/underscore/underscore.js",
                "bower_components/jquery.filedownload/src/Scripts/jquery.fileDownload.js",
                "bower_components/fineuploader-dist/dist/fine-uploader.js",
                "bower_components/toastr/toastr.js",
				"bower_components/angular-hamburger-toggle/dist/angular-hamburger-toggle.js",
				"bower_components/bootstrap/dist/js/bootstrap.js",
				"bower_components/checklist-model/checklist-model.js",
				"bower_components/angularjs-dropdown-multiselect/src/angularjs-dropdown-multiselect.js",
                "bower_components/angular-mocks/angular-mocks.js",
                "test/pre-app-mocks/MockBootstrapRequestContext.js", //BoostrapRequestContext() method should be load first to get method for next step
                "app/app.module.js",
                "app/modules/formControls/**/*.js",
                "test/**/*.js"
        ],

        // list of files to exclude
        exclude: [
            
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'], //'Chrome', 


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity
    })
}
