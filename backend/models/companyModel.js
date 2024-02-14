module.exports = (sequelize, DataTypes) => {

    const company = sequelize.define("tbl_company", {

        companyID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comName: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }
    })

    return company

}