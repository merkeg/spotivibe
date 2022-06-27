module.exports = {
  outputDir: "../dist/client",
  devServer: {
    "^/api": {
      target: "http://localhost:8080",
      changeOrigin: true,
      secure: false,
      pathRewrite: { "^/api": "/api" },
      logLevel: "debug",
    },
  },
};
