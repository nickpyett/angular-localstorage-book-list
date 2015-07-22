'use strict';

/* Services */

var itemListServices = angular.module('itemListServices', ['ngResource']);

itemListServices.factory('List', [function () {
    return {
        get: function (id) {
            var bookListArray = this.getAll();

            if (angular.isDefined(bookListArray[id])) {
                var bookListArray = bookListArray[id];

                bookListArray.id = id;

                return bookListArray;
            }

            return null;
        },
        getAll: function () {
            var bookListArray = JSON.parse(localStorage.getItem('bookList'));

            if (!bookListArray) {
                return [];
            }

            return bookListArray;
        },
        add: function (object) {
            var bookListArray = this.getAll();

            bookListArray.push(object);

            this.setStorageArray(bookListArray);

            return this;
        },
        setStorageArray: function (bookListArray) {
            localStorage.setItem('bookList', JSON.stringify(bookListArray));
        },
        update: function (id, object) {
            var bookListArray = this.getAll();

            if (typeof bookListArray[id] !== 'undefined') {
                // Remove the id from the object, we will use the array index to update the book
                // object in the array
                delete object.id;

                // Update the object by the array index
                bookListArray[id] = object;

                // Update the 
                this.setStorageArray(bookListArray);
            }

            return this;
        },
        delete: function (id) {
            var bookListArray = this.getAll();

            if (typeof bookListArray[id] !== 'undefined') {
                bookListArray.splice(id, 1);

                this.setStorageArray(bookListArray);
            }

            return this;
        }
    };
}]);
