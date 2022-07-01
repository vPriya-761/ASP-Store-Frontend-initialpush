const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    runtimeCaching,
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
    buildExcludes: [
      /middleware-manifest\.json$/,
      /_middleware.js$/,
      /_middleware.js.map$/,
    ],
  },
  reactStrictMode: true,
  devIndicators: {
    autoPrerender: false,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    theme: "DEFAULT",
  },
  env: {
    ASP_API_URL: process.env.ASP_API_URL,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(jpe?g|png|svg|gif|ico|webp|jp2)$/,
      use: [
        {
          loader: require.resolve("url-loader"),
          options: {
            fallback: require.resolve("file-loader"),
          },
        },
      ],
    });
    return config;
  },
  images: {
    disableStaticImages: true,
    domains: ["www.fabmerce.com", "assets.preprod.aptonshops.com"],
  },
});
