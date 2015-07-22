'use strict';

var itemListControllers = angular.module('itemListControllers', []);

itemListControllers.controller('itemListController', ['$scope', 'List', function ($scope, List) {
	$scope.thingFormMessage = '';
	$scope.itemListForm = {};
    $scope.list = List.getAll();
	$scope.bookFormTitle = 'Add a Book';

	$scope.itemListFormSubmit = function () {
		// Reset the list form message
		$scope.itemListFormMessage = '';

		if (Object.keys($scope.itemListForm).length < 6) {
			$scope.itemListFormMessage = 'Please fill in all fields';
            return;
		}

		if (typeof $scope.itemListForm.id != 'undefined') {
			// Update the book by id
			List.update($scope.itemListForm.id, angular.copy($scope.itemListForm));

			// Add a success message
			$scope.itemListFormMessage = 'Book edited successfullly.';
		} else {
			// Add the book to the list
			List.add(angular.copy($scope.itemListForm));

			// Add a success message
			$scope.itemListFormMessage = 'Book added successfullly.';
		}

		$scope.bookFormTitle = 'Add a Book';

		// Update the list in the page
        $scope.list = List.getAll();

		// Wipe the form fields
		$scope.itemListForm = {};
	};

	$scope.bookFormReset = function () {
		$scope.itemListForm = {};

		$scope.bookFormTitle = 'Add a Book';
	};

	$scope.bookEdit = function (id) {
		$scope.bookFormTitle = 'Edit Book';

		$scope.itemListForm = List.get(id);
	};

    $scope.bookRemove = function (id) {
		if (!window.confirm('Are you sure you wish to delete this book?')) return;

        List.delete(id);

		// Update the list in the page
        $scope.list = List.getAll();

		// Add a success message
		$scope.itemListFormMessage = 'Book removed successfullly.';
    };
}]);

itemListControllers.controller('bookController', ['$scope', '$routeParams', 'List', function ($scope, $routeParams, List) {
    var bookId = $routeParams.bookId;

	// Get the book from the service
    var book = List.get(bookId);

	$scope.book = book;

	// Set the page title
	// $scope.title = (typeof book === 'object') ? ' - ' + book.title : null;
	$scope.title = ' - Test';
}]);
