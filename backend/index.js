const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const db = require('./db/database')
const category = require("./controller/categoryController")
const company = require("./controller/companyController")

app.use(express.json())
app.use(cors())
app.use(bodyParser.json());

db.sequelize.sync();

//for category
app.post("/post", function(req, res){
    category.saveCategory(req, res)
})
app.get("/get", function(req, res){
    category.fetchCategory(req, res)
})
app.patch("/update/:id", function(req, res){
    category.updateCategory(req, res)
})
app.get('/get/:id', function(req, res){
    category.categoryID(req, res)
})
app.delete("/delete/:id", function(req, res){
    category.deleteCategory(req, res)
})
//end of category

//company
app.post("/company/post", function(req, res){
    company.saveCompany(req, res)
})
app.get("/company/get", function(req, res){
    company.fetchCompanyAll(req, res)
})
app.get("/company/get/:id", function(req, res){
    company.fetchCompanyByID(req, res)
})
app.patch("/company/update/:id", function(req, res){
    company.updateCompany(req, res)
})
app.delete("/company/delete/:id",function(req, res){
    company.deleteCompany(req, res)
})

app.listen(3001, ()=> console.log("Server is runing on port 3001"))