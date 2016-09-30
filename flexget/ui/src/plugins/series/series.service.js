/* global angular */
(function () {
    'use strict';

    angular
        .module('plugins.series')
        .factory('seriesService', seriesService);

    function seriesService($http, exception) {
        return {
            getShows: getShows,
            getShowMetadata: getShowMetadata,
            deleteShow: deleteShow,
            searchShows: searchShows,
            getEpisodes: getEpisodes,
            deleteEpisode: deleteEpisode,
            resetReleases: resetReleases,
            forgetRelease: forgetRelease,
            resetRelease: resetRelease,
            deleteReleases: deleteReleases,
            loadReleases: loadReleases,
            updateShow: updateShow
        };

        function getShows(options) {
            return $http.get('/api/series/',
                {
                    etagCache: true,
                    params: options
                })
                .then(callComplete)
                .catch(callFailed);
        }


        function getShowMetadata(show) {
            return $http.get('/api/tvdb/series/' + show.series_name + '/', { etagCache: true })
                .then(callComplete)
                .catch(callFailed);
        }

        function deleteShow(show, params) {
            return $http.delete('/api/series/' + show.series_id + '/',
                {
                    params: params
                })
                .catch(callFailed);
        }

        //TODO: Test
        function updateShow(show, params) {
            return $http.put('/api/series/' + show.series_id + '/', params)
                .then(callComplete)
                .catch(callFailed);
        }

        function searchShows(searchTerm) {
            return $http.get('/api/series/search/' + searchTerm + '/', { etagCache: true })
                .then(callComplete)
                .catch(callFailed);
        }

        function getEpisodes(show, params) {
            return $http.get('/api/series/' + show.series_id + '/episodes/', { params: params, etagCache: true })
                .then(callComplete)
                .catch(callFailed);
        }

        function deleteEpisode(show, episode, params) {
            return $http.delete('/api/series/' + show.series_id + '/episodes/' + episode.id + '/', { params: params })
                .then(callComplete)
                .catch(callFailed);
        }

        function resetReleases(show, episode) {
            return $http.put('/api/series/' + show.series_id + '/episodes/' + episode.id + '/releases/')
                .then(callComplete)
                .catch(callFailed);
        }

        function forgetRelease(show, episode, release, params) {
            return $http.delete('/api/series/' + show.series_id + '/episodes/' + episode.id + '/releases/' + release.id + '/', { params: params })
                .then(callComplete)
                .catch(callFailed);
        }

        function resetRelease(show, episode, release) {
            return $http.put('/api/series/' + show.series_id + '/episodes/' + episode.id + '/releases/' + release.id + '/')
                .then(resetReleaseComplete)
                .catch(callFailed);

            function resetReleaseComplete(data) {
                return data;
            }
        }

        function deleteReleases(show, episode, params) {
            return $http.delete('/api/series/' + show.series_id + '/episodes/' + episode.id + '/releases/', { params: params })
                .then(deleteReleasesComplete)
                .catch(callFailed);

            function deleteReleasesComplete() {
                return;
            }
        }

        function loadReleases(show, episode) {
            console.log(show, episode);
            return $http.get('/api/series/' + show.series_id + '/episodes/' + episode.id + '/releases/', { etagCache: true })
                .then(callComplete)
                .catch(callFailed);
        }

        function callComplete(response) {
            return response.data;
        }

        function callFailed(error) {
            return exception.catcher(error);
        }
    }
}());