import { config as coreConfig } from "@faustjs/core";

if (!process.env.NEXT_PUBLIC_WORDPRESS_URL) {
  console.error("Vous indiquez le lien de NEXT_PUBLIC_WORDPRESS_URL");
}

/**
 * @type {import("@faustjs/core").Config}
 */
export default coreConfig({
  wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
  apiClientSecret: process.env.WP_HEADLESS_SECRET,
});
