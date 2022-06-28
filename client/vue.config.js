module.exports = {
  outputDir: "../dist/client",
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/api": "/api" },
        logLevel: "debug",
      },
    },
  },
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
};
