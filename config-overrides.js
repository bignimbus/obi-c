const { rewireBlockstackDevServer } = require('react-app-rewire-blockstack');

module.exports = {
  devServer: (configFunction) => {
    return (proxy, allowedHost) => {
      let config = configFunction(proxy, allowedHost);
      config = rewireBlockstackDevServer(config);
      return config;
    };
  },
}
