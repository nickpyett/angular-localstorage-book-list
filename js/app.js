'use strict';

var itemListApp = angular.module('itemListApp', [
	'ngRoute',
	'itemListControllers',
	'itemListServices'
]);

itemListApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'partials/item-list.html',
			controller: 'itemListController'
		}).
		when('/book/:bookId', {
			templateUrl: 'partials/item-detail.html',
			controller: 'bookController'
		});
}]);
