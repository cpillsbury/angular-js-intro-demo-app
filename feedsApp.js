'use strict';

/* global angular */

var feedsApp = angular.module('feedsApp', []);

feedsApp.controller('FeedsCtrl', ['$scope', function FeedsCtrl($scope) {
    var feedModel = {};

    feedModel.feeds = [
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

    function getSelectedFeedClass(feed, selectedFeed) {
        var feedClass = (feed == selectedFeed) ? 'selectedFeed' : '';
        return feedClass;
    };

    function checkSelectedFeedClass(feed) {
        return getSelectedFeedClass(feed, $scope.feedModel.selectedFeed);
    };

    function removeFeedFromFeeds(feed, feeds) {
        var index = feeds.indexOf(feed);
        feeds.splice(index, 1);
    }

    function removeFeed(feed) {
        removeFeedFromFeeds(feed, $scope.feedModel.feeds)
    }

    function removeFeedEntry(items) {
        if (items != null && items.length > 0) {
            items.pop();
        }
    }

    $scope.feedModel = feedModel;
    $scope.checkSelectedFeedClass = checkSelectedFeedClass;
    $scope.removeFeed = removeFeed;
    $scope.removeFeedEntry = removeFeedEntry;
}]);