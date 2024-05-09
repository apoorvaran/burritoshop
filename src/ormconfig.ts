module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'your_username',
  password: 'your_password',
  database: 'your_database',
  entities: [
    'src/entities/*.ts'
  ],
  synchronize: true,
  logging: false
};
