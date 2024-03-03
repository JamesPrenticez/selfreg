(Microsoft PWA)[https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/]
(React PWA)[https://create-react-app.dev/docs/making-a-progressive-web-app/]
(Vite PWA)[https://www.npmjs.com/package/vite-plugin-pwa]
(Vite PWA Docs)[https://vite-pwa-org.netlify.app/guide/]
(Learn PWA)[https://web.dev/learn/pwa/]
(not related.. RTC?)[https://www.google.com/search?q=WebRTC&sourceid=chrome&ie=UTF-8]

How to:

### Step 1: Install Required Dependencies
```bash
npm i vite-plugin-pwa -D 
```

### Step 2: Update vite.config.js
```ts
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [
    VitePWA()
  ]
}
```

### Step 3: Add manafest.json
Create a manifest.json file in your public directory. 

Make sure to add icons (icon-192x192.png and icon-512x512.png) in your public directory as well

```json
{
  "name": "My React Vite App",
  "short_name": "ReactViteApp",
  "description": "A sample React Vite app",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Step 4: Link the Manifest File

```html
<!-- index.html -->
<link rel="manifest" href="/manifest.json" />
```

### Step 5: Register Service Worker

The @vitejs/plugin-pwa will automatically generate a service worker for you. You just need to register it in your application.


```ts
// registerServiceWorker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      },
      (err) => {
        console.log('Service Worker registration failed:', err);
      }
    );
  });
}
```

### Step 6: Import register service worker

```ts
// index.ts
import './registerServiceWorker';
```

### Step 7: Build and test

Testing your PWA is typically done on the production build, not the development build. This is because service workers and some other PWA features may not behave the same way in development as they do in production.

```bash
npm run build
```

```bash
npm install -g serve
```

```bash
serve dist
```

### Step 8: Auto update cashe when deploying new version of code 
https://css-tricks.com/vitepwa-plugin-offline-service-worker/#versioning-and-manifests
https://vite-pwa-org.netlify.app/guide/auto-update.html

```vite.config.ts
    VitePWA({
      registerType: 'autoUpdate'
    }),
```

### Emojis
https://codesandbox.io/s/emoji-picker-react-4-z2gkzp
https://www.npmjs.com/package/emoji-picker-react


### Digital Badges 
https://elearningindustry.com/why-online-course-creators-use-digital-badges
https://webpages.tuni.fi/gamification/2018/09/20/badges-increase-user-activity-a-field-experiment-on-the-effects-of-gamification/

## SVG
https://www.freecodecamp.org/news/how-to-import-svgs-in-react-and-vite/