# https://cadeoleo.github.io

#CadeOLeo2015 #CadeOLeo

## Build

Currently for [PWA (Progressive Web Apps)](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/) we use service workers and W3C web manifests.

Originally, in order to generate W3C web manifests, we use: https://realfavicongenerator.net/ and to generate service workers file: https://github.com/GoogleChromeLabs/sw-precache.

```
npm install -g sw-precache
sw-precache --config=sw-precache-config.js --verbose
```

Now, using as <http://www.manifoldjs.com/generator> as well.
