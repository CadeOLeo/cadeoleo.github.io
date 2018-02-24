//This is the service worker with the Cache-first network

var CACHE = 'pwabuilder-precache';
var precacheFiles = [
    "assets/images/28a98158-a2f1-5c6d-c56a-66d02f71c0a1.webPlatform.png",
    "assets/images/3471aef3-6999-36ab-ca06-beb7a9f4b66d.webPlatform.png",
    "assets/images/7579470e-1893-1767-403d-b693cff2cc3b.webPlatform.png",
    "assets/images/8846f77e-bbf7-8960-a6e0-2456603791c6.webPlatform.png",
    "assets/images/8b66fc37-db6f-0f9b-bb08-908e59368723.webPlatform.png",
    "assets/images/99c3ddb8-17cb-3963-9189-276480c33889.webPlatform.png",
    "assets/images/a66b27be-ab63-8489-10e9-4e822959bec4.webPlatform.png",
    "assets/images/a835ecd3-fb00-55a2-6626-73ebe511ceaa.webPlatform.png",
    "assets/images/android-chrome-144x144.png",
    "assets/images/android-chrome-192x192.png",
    "assets/images/android-chrome-256x256.png",
    "assets/images/android-chrome-36x36.png",
    "assets/images/android-chrome-384x384.png",
    "assets/images/android-chrome-48x48.png",
    "assets/images/android-chrome-512x512.png",
    "assets/images/android-chrome-72x72.png",
    "assets/images/android-chrome-96x96.png",
    "assets/images/apple-touch-icon-114x114.png",
    "assets/images/apple-touch-icon-120x120.png",
    "assets/images/apple-touch-icon-144x144.png",
    "assets/images/apple-touch-icon-152x152.png",
    "assets/images/apple-touch-icon-180x180.png",
    "assets/images/apple-touch-icon-57x57.png",
    "assets/images/apple-touch-icon-60x60.png",
    "assets/images/apple-touch-icon-72x72.png",
    "assets/images/apple-touch-icon-76x76.png",
    "assets/images/apple-touch-icon.png",
    "assets/images/be883106-7384-d930-b9ea-29a0ae08890c.webPlatform.png",
    "assets/images/browserconfig.xml",
    "assets/images/cdb9b6c5-4a4c-0c74-711a-6bbd6b05ef7d.webPlatform.png",
    "assets/images/eec7fe49-2102-8e4a-4296-cd8e3d2c662e.webPlatform.png",
    "assets/images/favicon-16x16.png",
    "assets/images/favicon-32x32.png",
    "assets/images/favicon.ico",
    "assets/images/favicon.png",
    "assets/images/mstile-144x144.png",
    "assets/images/mstile-150x150.png",
    "assets/images/mstile-310x150.png",
    "assets/images/mstile-310x310.png",
    "assets/images/mstile-70x70.png",
    "assets/images/safari-pinned-tab.svg",
    "assets/javascripts/cadeoleo.js",
    "assets/javascripts/main.js",
    "assets/stylesheets/index.css",
    "bower_components/bootstrap/dist/css/bootstrap-theme.css",
    "bower_components/bootstrap/dist/css/bootstrap-theme.css.map",
    "bower_components/bootstrap/dist/css/bootstrap-theme.min.css",
    "bower_components/bootstrap/dist/css/bootstrap.css",
    "bower_components/bootstrap/dist/css/bootstrap.css.map",
    "bower_components/bootstrap/dist/css/bootstrap.min.css",
    "bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot",
    "bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg",
    "bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf",
    "bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff",
    "bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2",
    "bower_components/bootstrap/dist/js/bootstrap.js",
    "bower_components/bootstrap/dist/js/bootstrap.min.js",
    "bower_components/bootstrap/dist/js/npm.js",
    "bower_components/bootswatch/cerulean/bootstrap.min.css",
    "bower_components/download_webfont/cadeoleo.css",
    "bower_components/download_webfont/cadeoleo.eot",
    "bower_components/download_webfont/cadeoleo.svg",
    "bower_components/download_webfont/cadeoleo.ttf",
    "bower_components/download_webfont/cadeoleo.woff",
    "bower_components/download_webfont/demo.html",
    "bower_components/flags/flags.css",
    "bower_components/flags/flags.png",
    "bower_components/ie10-viewport-bug-workaround/index.js",
    "bower_components/jquery-flash-element/index.js",
    "bower_components/jumbotron-narrow/index.css",
    "bower_components/moment-precise-range-object/readable-range.js",
    "bower_components/share-button/share-button.js",
    "bower_components/share-button/share-button.min.css",
    "index.html",
    "index_en.html",
    "manifest.json",
    "pwabuilder-sw.js",
    'pwabuilder-sw-register.js',
    ];

//Install stage sets up the cache-array to configure pre-cache content
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache().then(function() {
    console.log('[ServiceWorker] Skip waiting on install');
      return self.skipWaiting();

  })
  );
});


//allow sw to control of current page
self.addEventListener('activate', function(event) {
console.log('[ServiceWorker] Claiming clients for current page');
      return self.clients.claim();

});

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.'+ evt.request.url);
  evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
  evt.waitUntil(update(evt.request));
});


function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(precacheFiles);
  });
}


function fromCache(request) {
  //we pull files from the cache first thing so we can show them fast
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}


function update(request) {
  //this is where we call the server to get the newest version of the 
  //file to use the next time we show view
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}

function fromServer(request){
  //this is the fallback if it is not in the cahche to go to the server and get it
return fetch(request).then(function(response){ return response})
}
