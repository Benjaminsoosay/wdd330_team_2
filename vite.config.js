import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/',

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        cart: resolve(__dirname, 'src/cart/index.html'),
        checkout: resolve(__dirname, 'src/checkout/index.html'),
        product_listing: resolve(__dirname, 'src/product_listing/index.html'),
        // Add these two lines for the pages that were missing
        'account-register': resolve(__dirname, 'src/account/register.html'),
        wishlist: resolve(__dirname, 'src/wishlist/index.html'),
      },
    },
  },
});
