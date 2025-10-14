# Migration Plan: Modernizing CadeOLeo!Ver

This document outlines the plan to modernize the project's frontend stack, moving away from Bower to modern tools and practices.

## Why Migrate?

- Bower is deprecated and no longer recommended
- Modern tools offer better performance and developer experience
- Current dependencies are outdated and have security issues
- Better browser support and features in newer versions

## Migration Steps

### Phase 1: Setup Modern Build Tools

1. Replace Bower with npm/Yarn

   ```bash
   npm init -y
   npm install vite --save-dev
   ```

2. Setup Vite

   ```json
   // package.json
   {
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview"
     }
   }
   ```

3. Create Vite config for GitHub Pages

### Phase 2: Dependency Updates

Current -> Modern Alternative:

- `bootstrap@3` -> `bootstrap@5`

  ```bash
  npm install bootstrap@5
  ```

- `jquery` -> Remove (not needed with Bootstrap 5)
- `moment.js` -> `day.js`

  ```bash
  npm install dayjs
  ```

- `bootswatch` -> Bootstrap 5 themes
- `flags` -> SVG flags or emoji flags
- Custom fonts -> Google Fonts / Bootstrap Icons
- `share-button` -> Web Share API + fallback

### Phase 3: Code Modernization

1. Convert to ES Modules

   ```javascript
   import { daysUntil } from './lib/days.js';
   import { format } from 'dayjs';
   ```

2. Use modern JavaScript features
   - Template literals
   - Arrow functions
   - Async/await
   - Optional chaining

3. Update CSS
   - Use CSS Grid/Flexbox
   - CSS Custom Properties
   - Modern selectors

4. Enhance PWA
   - Workbox instead of sw-precache
   - Better offline experience
   - Modern manifest features

## Breaking Changes

Some features will change:

1. Drop support for IE11
2. Require modern browser features:
   - ES Modules
   - CSS Grid
   - Web Share API (with fallback)

## Proposed Timeline

1. Setup modern tools (1-2 days)
2. Migrate dependencies (2-3 days)
3. Update JavaScript (2-3 days)
4. Update CSS (1-2 days)
5. Testing and fixes (2-3 days)

## How to Help

1. Review the migration plan
2. Test in different browsers
3. Report issues
4. Suggest improvements

## References

- [Vite Guide](https://vitejs.dev/guide/)
- [Bootstrap 5 Migration](https://getbootstrap.com/docs/5.0/migration/)
- [Modern JavaScript Features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API)
