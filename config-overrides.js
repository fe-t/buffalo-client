const { overrideDevServer } = require("customize-cra");

const devServerConfig = () => (config) => {
  return {
    ...config,
    proxy: {
      "http://localhost:3000/api": {
        secure: false,
        changeOrigin: true,
        // target: "http://test-tagee.yy.com/api",
        target: "http://tagee.yy.com/api",
        pathRewrite: {
          "^/api": "",
        },
        onProxyRes(proxyRes) {
          const cookies = proxyRes.headers["set-cookie"];
          const cookieRegex = /Domain=yy\.com/;
          // 修改cookie domain
          if (cookies) {
            const newCookie = cookies.map((cookie) => {
              if (cookieRegex.test(cookie)) {
                return cookie.replace(cookieRegex, "Domain=localhost");
              }
              return cookie;
            });
            delete proxyRes.headers["set-cookie"];
            proxyRes.headers["set-cookie"] = newCookie;
          }
        },
      },
    },
  };
};

module.exports = {
  devServer: overrideDevServer(devServerConfig()),
};
