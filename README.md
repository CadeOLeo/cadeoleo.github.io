# CadeOLeo!Ver

[CadeOLeo!Ver](https://cadeoleo.github.io) is a versioning schema for your little ones.

## Development

### Prerequisites

- Node.js (LTS version recommended)
- npm

### Installation

```bash
# Install project dependencies
npm install
```

### Testing

The project includes automated tests to validate date calculations and versioning:

```bash
# Run test suite
npm test
```

The tests validate:

- Correct calculation of days until next birthday
- Date handling across different timezones
- Edge cases (birthday today, after birthday)

### Running Locally

After installing dependencies, you can:

1. Open `index.html` in your browser
2. Use the date picker to calculate versions
3. Check Leo's version and countdown

## Progressive Web App (PWA)

This project is built as a [Progressive Web App](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/), providing offline functionality and app-like experience.

### Service Worker

The service worker handles caching of assets for offline use:

- JavaScript files (including modules)
- CSS and images
- HTML templates
- Third-party dependencies (moment.js, bootstrap, etc.)

To update the service worker cache:

```bash
# Install sw-precache globally (if not already installed)
npm install -g sw-precache

# Generate/update service worker
sw-precache --config=sw-precache-config.js --verbose
```

The cache configuration is in `sw-precache-config.js`. When adding new static assets:

1. Add the file path to `staticFileGlobs` in `sw-precache-config.js`
2. Regenerate the service worker
3. Commit both `sw-precache-config.js` and `service-worker.js`

### Web Manifest & Assets

For PWA installation support:

- Web Manifest: `manifest.json` defines app metadata
- Icons: Generated using [Real Favicon Generator](https://realfavicongenerator.net/)
- Additional features: Added via [PWA Builder](https://www.pwabuilder.com/)

### Offline Support

The app works offline after the first visit:

1. Service worker caches all essential assets
2. Date calculations work without network
3. Previously loaded versions are available
4. New visits require connectivity

## Building & Deployment

The project is hosted on GitHub Pages and requires:

1. All static assets committed to the repository
2. Service worker updated when assets change
3. Web manifest kept in sync with app version

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Install dependencies (`npm install`)
4. Make your changes
5. Run tests to ensure everything works (`npm test`)
6. Commit your changes
7. Push to your branch
8. Open a Pull Request
