
export default {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: 'indigo' },
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/index.scss'
  ],
  plugins: [
    '@/plugins/globals',
    '@/plugins/axios'
  ],
  buildModules: [
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
  ],
  proxy: {
    '/api': {
      target: 'http://b.juwric.info/public/index.php/api',
      pathRewrite: {
        '^/api' : '/'
        }
      }
  },
  axios: {
    baseURL: 'https://app-ssr-vuejs.herokuapp.com/api',
  },
  env: {
    imgPath: 'http://b.juwric.info/img/posts'
  },
  build: {
    transpile: [/^element-ui/],
    extend (config, ctx) {
    }
  }
}
