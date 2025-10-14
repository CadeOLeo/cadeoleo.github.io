# CadeOLeo!Ver

[CadeOLeo!Ver](https://cadeoleo.github.io) is a versioning schema for your little ones.

## Development


### Prerequisites

- Node.js (LTS version recommended)
- npm

### Installation

```bash
npm install
bower install

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

1. Execute `npm run dev` to start the local development server (Vite)
2. Access the app at `http://localhost:5173`
3. Use the date picker to calculate versions
4. Check Leo's version and countdown

## Progressive Web App (PWA)

This project is built as a [Progressive Web App](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/), providing offline functionality and app-like experience.


### Service Worker & PWA

The service worker and PWA features are managed automatically via [Vite](https://vitejs.dev/) and [vite-plugin-pwa](https://vite-plugin-pwa.netlify.app/):

- Offline support and asset caching
- Automatic manifest and service worker generation
- No manual sw-precache or Bower required


### Web Manifest & Assets

For PWA installation support:

- Web Manifest: Generated automatically in `dist/assets/manifest-*.webmanifest`
- Icons: Generated using [Real Favicon Generator](https://realfavicongenerator.net/)

### Offline Support

The app works offline after the first visit:

1. Service worker caches all essential assets
2. Date calculations work without network
3. Previously loaded versions are available
4. New visits require connectivity


## Building & Deployment

The project is hosted on GitHub Pages:

1. Execute `npm run build` to generate the production files in `dist/`
2. Push the contents of `dist/` to the `gh-pages` branch or configure GitHub Pages to serve from `/docs` or `/dist`
3. All static assets, manifest, and service worker are generated and ready for deployment


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Install dependencies (`npm install`)
4. Make your changes
5. Run tests to ensure everything works (`npm test`)
6. Commit your changes
7. Push to your branch
8. Open a Pull Request
