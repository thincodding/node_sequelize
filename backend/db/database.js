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
db.products = require('../models/productModels')(sequelize, Sequelize)

//join table
db.category.hasMany(db.products,{foreignKey: 'categoryID',as: "catID"})
db.company.hasMany(db.products, {foreignKey: "companyID", as: "comID"})

db.products.belongsTo(db.category,{foreignKey: 'categoryID', as: "catID"})
db.products.belongsTo(db.company, {foreignKey: "companyID", as: "comID"})


module.exports = db;