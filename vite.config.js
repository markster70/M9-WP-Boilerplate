import dotenv from 'dotenv';

dotenv.config();
// CHANGE THE DEV PATH HERE TO WHATEVER YOUR PATH IS IN YOUR LOCAL SERVER ( MAMP / WAMP ETC )
const localDevPath = process.env.WP_LOCAL_DEV_PATH;
const themeName = process.env.WP_DEFAULT_THEME;

// http://localhost:3000 is serving Vite for development
// but accessing it directly will be empty


import liveReload from 'vite-plugin-live-reload';
import path from 'path';
import { defineConfig } from 'vite';

// uncomment this if you need Vue.js
// import vue from '@vitejs/plugin-vue'


const serverRoot = path.resolve(__dirname);


export default defineConfig(({ command, mode }) => {
  return {
    root: '',
    base: process.env.NODE_ENV === 'development' ? `` : `/wp-content/themes/${themeName}/dist/`,
    publicDir: 'fe-src/static',
    plugins:[liveReload([__dirname + '/**/*.php'],
      // uncomment this if you need Vue.js
      //  vue()
    )],
    build: {
      assetsDir: '',
      emptyOutDir: true,
      manifest: false,
      // have this turned off for now as the paths for dynamic imports causes 404'ing
      modulePreload: false,
      outDir: `public/themes/${process.env.WP_DEFAULT_THEME}/dist`,
      target: 'es2018',
      rollupOptions: {
        input: 'fe-src/js/index.js',
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: '[name][hash].js',
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split('.');
            let extSuffix = extType[extType.length - 1];
            return `assets/${extSuffix}/[name][extname]`;
          },
        },
      },
      // minifying switch
      minify: true,
      write: true,
    },
    server: {
      // required to load scripts from custom host
      cors: true,
      // we need a strict port to match on PHP side
      // change freely, but update in your functions.php to match the same port
      strictPort: true,
      port: 3000,
      // we use the server.opn config to open whichever local site we are running
      open: localDevPath,
      // serve over http
      https: false,

      // serve over https - if you need HTTPS - guide below
      // to generate localhost certificate follow the link:
      // https://github.com/FiloSottile/mkcert - Windows, MacOS and Linux supported - Browsers Chrome, Chromium and Firefox (FF MacOS and Linux only)
      // installation example on Windows 10:
      // > choco install mkcert (this will install mkcert)
      // > mkcert -install (global one time install)
      // > mkcert localhost (in project folder files localhost-key.pem & localhost.pem will be created)
      // uncomment below to enable https
      //https: {
      //  key: fs.readFileSync('localhost-key.pem'),
      //  cert: fs.readFileSync('localhost.pem'),
      //},
      hmr: {
        host: 'localhost',
        protocol: 'ws',
      },
    },
    resolve: {
      unsafeCache: true,
      modules: [path.resolve(__dirname, '/node_modules')],
      alias: [
        // when adding/editing make sure to update jsconfig.json
        // so VS Code picks up the paths in intellisense
        // Alis usage example below
        { find: '@js', replacement: '/fe-src/js' },
        {find : '@@staticAssetPath', replacement :  process.env.NODE_ENV === 'development' ? `${serverRoot}/themes/${themeName}/dist/` : `/`}
      ],
    },
  }
});
