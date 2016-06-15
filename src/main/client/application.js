/*global angular*/
(function (angular) {
    'use strict';
    angular.module('quilton').controller('ApplicationController', ApplicationController);

    function ApplicationController($log, $rootScope) {
        var app = this;
        app.toolbar = 'toolbar.html';
        $rootScope.$on('$stateNotFound', onStateNotFound);

        function onStateNotFound(event, unfoundState, fromState, fromParams) {
            $log.warn('STATE NOT FOUND');
            $log.debug(unfoundState.to);
            $log.debug(unfoundState.toParams);
            $log.debug(unfoundState.options);
        }
    }

}(angular));