const head = require('./config/head.js');
const plugins = require('./config/plugins.js');
const themeConfig = require('./config/themeConfig.js');

const development = process.env.NODE_ENV === 'development'

const developmentBase = '/'
const productionBase = '/random/'
// const productionBase = 'https://cdn.jsdelivr.net/gh/weiyie/random/'

module.exports = {
  theme: 'vuepress-theme-weiyie', // 使用npm包主题
  // theme: require.resolve('../../theme-weiyie'), // 使用本地主题

  title: "weiyie blog",
  description: 'web前端技术博客,简洁至上,专注web前端学习与总结。JavaScript,js,ES6,TypeScript,vue,python,css3,html5,Node,git,github等技术文章。',
  base: development ? developmentBase : productionBase, // 格式：'/<仓库名>/'， 默认'/'
  markdown: {
    lineNumbers: true, // 代码行号
  },

  head,
  plugins,
  themeConfig,
  configureWebpack: (config, isServer) => {

    console.log('config: ', config)
    console.log('isServer: ', isServer)

    // 开发模式不修改默认配置
    if (development) return;


    config.output.publicPath = 'https://cdn.jsdelivr.net/gh/weiyie/random/'
    if (isServer) {
      // 修改服务端的 webpack 配置
      // config.output.publicPath = 'https://cdn.jsdelivr.net/gh/weiyie/random/'

    } else {
      // 修改客户端打包配置
      config.output.filename = 'assets/js/[name].[contenthash].js'
    }
  }
}
