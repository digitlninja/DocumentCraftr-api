interface IConfig {
  development: {
      database: {
        url: string,
        port: string,
        name: string
      },
      server: {
        host: string,
        port: string,
      }
    },
    production: unknown
}

/*
* This would be excluded from git in normal circumstances (SECURITY)
* I've added it here for your ease :)
* */
export const config: IConfig = {
  development: {
    // Database settings
    database: {
      port: '27017',
      url: 'mongodb://localhost:27017/keenious',
      name: 'keenious'
    },
    // Server information
    server: {
      host: '127.0.0.1',
      port: '3000'
    }
  },
  production: {}
};
