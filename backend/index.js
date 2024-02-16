const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const FileUploaded = require('express-fileupload')
const app = express();

const db = require('./db/database')
const category = require("./controller/categoryController")
const company = require("./controller/companyController")
const product = require('./controller/ProductController')

app.use(express.json())
app.use(cors())
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(FileUploaded())

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

//product
app.post("/product/save",function(req, res){
    product.saveProduct(req, res)
})
app.get("/product/get", function(req, res){
    product.fetchProduct(req, res)
})
app.patch('/product/update/:id',function(req, res){
    product.updateProduct(req, res)
})
app.delete('/product/delete/:id', function(req, res){
    product.deleteProduct(req, res)
})
app.get('/product/get_join', function(req, res){
    product.joinTableProduct(req, res)
})
app.listen(3001, ()=> console.log("Server is runing on port 3001"))