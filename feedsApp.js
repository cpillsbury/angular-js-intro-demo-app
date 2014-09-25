'use strict';

/* global angular */

var feedsApp = angular.module('feedsApp', []);

feedsApp.service('FeedsService', ['$http',
    function FeedsService($http) {
        var serviceUrl = '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=';

        this.getFeed = function(url) {
                return $http.jsonp(serviceUrl + encodeURIComponent(url));
            };
}]);

feedsApp.service('RemoveItemsService',
    function RemoveItemsService() {
        this.removeItemFromList = function (item, list) {
            var index = list.indexOf(item);
            if (index >= 0 && index < list.length) {
                list.splice(index, 1);
            }
        }

        this.removeLastItemFromList = function (list) {
            if (list != null && list.length > 0) {
                this.removeItemFromList(list[list.length-1], list);
            }
        }
});

feedsApp.factory('FeedsFactory', function() {
    var feeds = [
            {
                feedUrl: 'http://feeds.feedburner.com/EconomistsView',
                title: 'Economist\'s View',
                link: 'http://economistsview.typepad.com/economistsview/',
                description: 'Some Other Economics Blog',
                entries: [ { title: 'q' }, { title: 'e' }, { title: 'd' } ]
            },
            {
                feedUrl: 'http://econlog.econlib.org/index.xml',
                title: 'EconLog',
                link: 'http://econlog.econlib.org/',
                description: 'Some Economics Blog',
                entries: [ { title: 'a' }, { title: 'b' }, { title: 'c' } ]
            },
            {
                feedUrl: 'http://www.visualizing.org/rss.xml',
                title: 'Visualizing.org News and Visualizations Feed',
                link: 'http://www.visualizing.org',
                description: 'Visualizations, News, and Challenges from Visualizing.org',
                entries: [ { title: 's' }, { title: 'o' }, { title: 's' } ]
            }
        ];

    return feeds;
});

feedsApp.controller('FeedsCtrl', ['$scope', 'RemoveItemsService', 'FeedsFactory',
    function FeedsCtrl($scope, RemoveItemsService, feeds) {
        var feedModel = {};

        feedModel.feeds = feeds;

        function getSelectedFeedClass(feed, selectedFeed) {
            var feedClass = (feed == selectedFeed) ? 'selectedFeed' : '';
            return feedClass;
        };

        function checkSelectedFeedClass(feed) {
            return getSelectedFeedClass(feed, $scope.feedModel.selectedFeed);
        };

        function removeFeed(feed) {
            RemoveItemsService.removeItemFromList(feed, $scope.feedModel.feeds)
        }

        function removeFeedEntry(items) {
            RemoveItemsService.removeLastItemFromList(items);
        }

        $scope.feedModel = feedModel;
        $scope.checkSelectedFeedClass = checkSelectedFeedClass;
        $scope.removeFeed = removeFeed;
        $scope.removeFeedEntry = removeFeedEntry;
}]);