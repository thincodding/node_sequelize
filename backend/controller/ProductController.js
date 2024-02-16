const db = require('../db/database')
const path = require('path')
const fs = require('fs')

const Product = db.products;
const Category = db.category;
const Company = db.company;


const saveProduct = async(req, res) => {

    if(req.file === null) return res.status(400).json({msg: "No file upload"})

    const proName = req.body.proName
    const price = req.body.price
    const categoryID = req.body.categoryID
    const companyID = req.body.companyID
    const file = req.files.file
    const fileSize = file.data.length
    const ext = path.extname(file.name)
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
    const allowType = ['.png','.jpg','.jpeg'];

    if(!allowType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Image"})
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be 5 mb"})

    file.mv(`./public/images/${fileName}`, async (err) =>{

        if(err) return res.status(500).json({msg: err.message})

        try{

            await Product.create({proName: proName, price: price, categoryID: categoryID, companyID:companyID, image: fileName, url: url});
            res.status(200).json({msg: "Product save success"})

        }
        catch(err){
            console.log(err)
        }
    })

}

//get Image

const fetchProduct = async(req, res) => {

    try{

        await Product.findAll().then((data) => {
            res.send(data)
        }).catch(err => {
            console.log(err)
        })

    }
    catch(err){
        console.log(err)
    }

}

const updateProduct = async(req, res) => {

    const product = await Product.findOne({
        where: {
            proID: req.params.id
        }
    })

    if(!product) return res.status(400).json({msg: "No data found"});
    let fileName = "";

    if(req.files === null){
        fileName = product.image
    }
    else{

        const file = req.files.file
        const fileSize = file.data.length
        const ext = path.extname(file.name)

        fileName = file.md5 + ext;

        const allowType = ['.png','.jpg','.jpeg'];

        if(!allowType.includes(ext.toLocaleLowerCase())) return res.status(422).json({msg: "Invalid Image png, jpg, jpeg only"})

        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 mb"})

        const filePath = `./public/images/${product.image}`;
        fs.unlinkSync(filePath);

        file.mv(`./public/images/${fileName}`, (err) =>{
            if(err) return res.status(500).json({msg: err.message})
        });

    }

    
    const proName = req.body.proName
    const price = req.body.price
    const categoryID = req.body.categoryID
    const companyID = req.body.companyID
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;

    try{

        await Product.update({proName: proName, price: price, categoryID: categoryID, companyID, image: fileName, url: url}, {
            where: {
                proID: req.params.id
            }
        })

        res.status(200).json({msg: "Product updated successfull"})

    }
    catch(err){
        console.log(err)
    }

}

//delete

const deleteProduct = async(req, res) => {

    const product = await Product.findOne({
        where: {
            proID: req.params.id
        }
    })

    if(!product) return res.status(400).json({msg: "No data found"})

    try{

        const filePath = `./public/images/${product.image}`;
        fs.unlinkSync(filePath);

        await Product.destroy({
            where: {
                proID: req.params.id
            }
        })
        res.status(200).json({msg: "delete product success"});

    }
    catch(err){
        console.log(err)
    }

}

//join table

const joinTableProduct = async(req, res) => {

    let data = await Product.findAll({
        attributes: ['proName'],
        include: [
            {
                model: Category,
                as: "catID",
                attributes: ['cName','detail']
            },
            {
                model: Company,
                as: "comID",
                attributes: ['comName','description']
            }
        ]
        // where:{
        //     proID: req.params.id
        // }
    });

    res.status(200).json(data)

}

module.exports = {
    saveProduct,
    fetchProduct,
    updateProduct,
    deleteProduct,
    joinTableProduct
}