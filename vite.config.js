import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  publicDir: "public",

  server: {
    fs: {
      strict: false
    }
  },

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        products: resolve(__dirname, "src/products.html"),
        checkoutRedirect: resolve(__dirname, "src/checkout.html"),  // Add this line
      },
    },
  },
});
