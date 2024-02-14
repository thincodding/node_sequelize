module.exports = (sequelize, Datatype) => {

    const product = sequelize.define("tbl_product",{

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
        }

    })
    return product

}