module.exports.process = function (ip, ssd, root) {
  var str = `var path = require('path')
  module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: require('./dev.env'),
        port: ${ssd},
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/${root}': {
                target: '${ip}',
                changeOrigin: true,
                pathRewrite: {
                    '^/${root}': '/${root}'
                }
            }
        },
        cssSourceMap: false
    }
}`;
  return str;
}
