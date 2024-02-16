module.exports = (sequelize, Datatype) => {

    const product = sequelize.define("tblproduct",{

        proID: {
            type: Datatype.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        proName: {
            type: Datatype.STRING
        },
        price: {
            type: Datatype.STRING
        },
        categoryID: {
            type:Datatype.INTEGER
        },
        companyID: {
            type: Datatype.INTEGER
        },
        image:{
            type:Datatype.STRING
        },
        url: {
            type:Datatype.STRING
            
        }

    })
    return product

}