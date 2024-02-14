const Sequelize = require('sequelize')

const dbname = "user";
const dbuser = "root";
const dbpassword = "";

const sequelize = new Sequelize(dbname, dbuser, dbpassword, {
    host: "localhost",
    dialect: "mysql"
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.category = require('../models/categoryModel')(sequelize, Sequelize)
db.company = require('../models/companyModel')(sequelize, Sequelize)
db.product = require('../models/productModel')(sequelize, Sequelize)

module.exports = db;