/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["assets/images/android-chrome-144x144.png","6228d9892d5931970a1db7806fa62edc"],["assets/images/android-chrome-192x192.png","fb7468f31490dff9178b243329bbe90f"],["assets/images/android-chrome-256x256.png","aeace64a4b77aaccd9b32ade3295164a"],["assets/images/android-chrome-36x36.png","b38af1a470032c1686e016e6052dcff9"],["assets/images/android-chrome-384x384.png","97ad60040fbb1610676466b047032ae2"],["assets/images/android-chrome-48x48.png","6b484cef938c5260486efe87f8dc5a65"],["assets/images/android-chrome-72x72.png","20d0cc2628a7733e620f3ef4512da3a3"],["assets/images/android-chrome-96x96.png","71d1173b052cc24a8adceb02d690ff53"],["assets/images/apple-touch-icon-114x114.png","7aff950fba177ee8668bea4519c91851"],["assets/images/apple-touch-icon-120x120.png","2df3658f9814cbe2e0befd2af94cd7eb"],["assets/images/apple-touch-icon-144x144.png","4cd4f0b702ca0660abf98bb751b0473a"],["assets/images/apple-touch-icon-152x152.png","10a1f570d51a6574300995a43ca5e18f"],["assets/images/apple-touch-icon-180x180.png","a5e112a6e6a3fa496656cc71cb6ff1fb"],["assets/images/apple-touch-icon-57x57.png","d7af8bc47ca150f34701849b9ed7d743"],["assets/images/apple-touch-icon-60x60.png","3ec22aee6f794ed5cd4f6f7a38f9c625"],["assets/images/apple-touch-icon-72x72.png","768c86dd470325e441fba7e7d74fffb7"],["assets/images/apple-touch-icon-76x76.png","a9410a94d1fe9dd5d94f2a2bf803d541"],["assets/images/apple-touch-icon.png","5e5ea3defed7ce97444ee2398b2711aa"],["assets/images/browserconfig.xml","0d4eeb66b3f463dd89b3b72f9f8d45d8"],["assets/images/favicon-16x16.png","71fd1965558e7bcb8872b6b5b8d9452b"],["assets/images/favicon-32x32.png","80c8488c9685f7886a3774bbd642b961"],["assets/images/favicon.ico","495720b1c1dd427f6f839a0899a46eda"],["assets/images/favicon.png","1edf940548f0b7555acfc51c8bf7a69a"],["assets/images/mstile-144x144.png","6228d9892d5931970a1db7806fa62edc"],["assets/images/mstile-150x150.png","23c0a7d5f9b945cb45253b46105b050e"],["assets/images/mstile-310x150.png","28df827ef1d263827328b9839519eb8a"],["assets/images/mstile-310x310.png","b4bea86c76e541996e25f9f3799e8fc5"],["assets/images/mstile-70x70.png","93f499d8754c0ab3f852f876ac093e2b"],["assets/images/safari-pinned-tab.svg","4a57332ee27cc5f48d1bee0e8bac3dd3"],["assets/javascripts/cadeoleo.js","7c930239c54398d13782ad07c1c039b2"],["assets/javascripts/main.js","bdb5a65d10be15db2d75f1b9434c003f"],["assets/stylesheets/index.css","8c4538ed944111bf09de7c4adfaa4017"],["bower_components/bootstrap/dist/css/bootstrap-theme.css","659231dde1c53bd14bbcffa1456df892"],["bower_components/bootstrap/dist/css/bootstrap-theme.css.map","ca7ee393ea214c018d316eee3acc7f39"],["bower_components/bootstrap/dist/css/bootstrap-theme.min.css","bf3499da1c31113720e9e395691730ba"],["bower_components/bootstrap/dist/css/bootstrap.css","957474c344c7131fb8e093449cc4893a"],["bower_components/bootstrap/dist/css/bootstrap.css.map","ea05728a43eaff288b1d535ebe89ec25"],["bower_components/bootstrap/dist/css/bootstrap.min.css","5d5357cb3704e1f43a1f5bfed2aebf42"],["bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot","f4769f9bdb7466be65088239c12046d1"],["bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg","89889688147bd7575d6327160d64e760"],["bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff","fa2772327f55d8198301fdb8bcfc8158"],["bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2","448c34a56d699c29117adc64c43affeb"],["bower_components/bootstrap/dist/js/bootstrap.js","8015042d0b4ac125867af5b096b175ce"],["bower_components/bootstrap/dist/js/bootstrap.min.js","4becdc9104623e891fbb9d38bba01be4"],["bower_components/bootstrap/dist/js/npm.js","ccb7f3909e30b1eb8f65a24393c6e12b"],["bower_components/bootswatch/cerulean/bootstrap.min.css","4c7d93c345e394d245ca5ad36ad06045"],["bower_components/download_webfont/cadeoleo.css","f139ba0cf8c19dbf6bafdd981a7127cd"],["bower_components/download_webfont/cadeoleo.eot","9764ab16f98eefe19685cf503ec95c09"],["bower_components/download_webfont/cadeoleo.svg","2c182c45389613df703383a8076490d7"],["bower_components/download_webfont/cadeoleo.ttf","dda4473235467bd531e2da4203dab386"],["bower_components/download_webfont/cadeoleo.woff","28f858e02c5b24b560486954b66c4eba"],["bower_components/download_webfont/demo.html","760d87725fec7b8433d47128902a409e"],["bower_components/flags/flags.css","eb7f1b8c98ca3dea8ab96cb351743afa"],["bower_components/flags/flags.png","b1ced476d8a6e4fa6460e49e9ebfda9b"],["bower_components/ie10-viewport-bug-workaround/index.js","90e29070de7dcd28a451465ec74047be"],["bower_components/jquery-flash-element/index.js","1ba2dfbfa057a7d93bd67093ab3e19eb"],["bower_components/jumbotron-narrow/index.css","4c747ccfb71bf04495c664e4f54f452f"],["bower_components/moment-precise-range-object/readable-range.js","0835ceba3b52fc4a228ddad17dfe59dd"],["bower_components/share-button/share-button.js","190dabb087d8e82409f096dd6eca4cb7"],["bower_components/share-button/share-button.min.css","8ea4e8b5aeb9c0e08da57a4b1b72b7df"],["index.html","8bcfcebb78a4e3c4b6f6c42156d29019"],["index_en.html","03ef3b74ed99040e5142499c44e418f9"],["manifest.json","0db36d6af8e66c780f07cfe8f0efffd7"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







