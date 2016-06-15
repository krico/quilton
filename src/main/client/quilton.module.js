/*global angular*/
(function (angular) {
    'use strict';
    angular.module('quilton', [
        'ng', 'ui.bootstrap', 'ui.router',
        'quilton.templates'
    ]);

    angular.module('quilton').config(configureQuilton);
    angular.module('quilton').run(runQuilton);

    function configureQuilton() {
    }

    function runQuilton($log) {
        $log.debug('Quilton!');
    }

}(angular));
