module.exports = (sequelize, DataTypes) => {

    const category = sequelize.define("tbl_category", {
        categoryID: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        cName: {
            type: DataTypes.STRING
        },
        detail: {
            type: DataTypes.STRING
        }
    })

    return category;
}

