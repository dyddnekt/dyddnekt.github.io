import {createProxyMiddleware} from "http-proxy-middleware";

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/", {
      target: "http://192.168.0.41:8080",
      changeOrigin: true
    })
  );
};