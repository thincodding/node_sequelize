const db = require('../db/database')

const Company = db.company;


const saveCompany = async(req, res) => {

    const comName = req.body.comName
    const description = req.body.description
    try{

        await Company.create({
            comName: comName,
            description: description
        })

        res.status(201).json({msg: "Company Save Successfull"})

    }
    catch(err){
        console.log(err)
    }

}

const fetchCompanyAll = async(req, res) => {

    try{
        await Company.findAll().then(data =>{
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
    }
    catch(err){
        console.log(err)
    }
}

const fetchCompanyByID = async(req, res) => {
    try{
       const response =  await Company.findOne({
            where: {
                companyID: req.params.id
            }
        })

        res.json(response)

    }
    catch(err){
        console.log(err)
    }
}

const updateCompany = async(req, res) => {

    const comName = req.body.comName
    const description = req.body.description

    try{

        await Company.update({comName: comName, description: description },{
            where: {
                companyID: req.params.id
            }
        })
        res.status(201).json({msg: "Company update successfull"})
    }
    catch(err){
        console.log(err)
    }
}

//delete Company

const deleteCompany = async(req, res) => {

    try{

        await Company.destroy({
            where: {
                companyID: req.params.id
            }
        })

        res.status(201).json({msg: "Company delete successfull"})

    }
    catch(err){
        console.log(err)
    }

}

module.exports ={
    saveCompany,
    fetchCompanyAll,
    fetchCompanyByID,
    updateCompany,
    deleteCompany
}