# https://cadeoleo.github.io

#CadeOLeo2015 #CadeOLeo

## Build

Currently for [PWA (Progressive Web Apps)](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/) we use service workers and W3C web manifests.

In order to generate W3C web manifests, we use: https://realfavicongenerator.net/

And to generate service workers file: https://github.com/GoogleChromeLabs/sw-precache

```
npm install -g sw-precache
sw-precache --config=sw-precache-config.js --verbose
```
