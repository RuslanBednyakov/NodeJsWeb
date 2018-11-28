module.exports = {
    port: process.env.PORT || 4000,
    env: process.env.NODE_ENV,
    root: process.env.PWD,
    db: {
      host: '127.0.0.1',
      user: 'postgres',
      pass: 'postgres',
      name: 'sloth',
      dialect: 'postgres',
      port: 5432
    }
}