const env = import.meta.env.MODE || 'production'

const envConfig = {
  development: {
    baseApi: '/api',
    mockApi:
      'https://www.fastmock.site/mock/3aa8fc6d77553c0405584d0dc88c5457/api'
  },
  test: {
    baseApi: 'test.xxx.com',
    mockApi:
      'https://www.fastmock.site/mock/3aa8fc6d77553c0405584d0dc88c5457/api'
  },
  production: {
    baseApi: 'prod.xxx.com',
    mockApi: ''
  }
}

export default {
  env,
  mock: false,
  namespace: 'manager',
  ...envConfig[env]
}
