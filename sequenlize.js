const Sequelize = require('sequelize');
const sequelize = new Sequelize('mydb', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // SQLite only
    storage: 'path/to/database.sqlite',

    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    // operatorsAliases: false
});

// const sequelize = new Sequelize('postgres://postgres:1234@example.com:5432/mydb');

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize