const db = require("../db/database");

const Category = db.category;


//save category
const saveCategory = async (req, res) => {
  // if(req.cName === null) return res.status(400).json({msg: "Required"})

  const cName = req.body.cName
  const detail = req.body.detail

  try{
      await Category.create({cName: cName, detail: detail});
      res.status(201).json({msg: "Category Save Successfull"})

  }
  catch(err){
      console.log(err)
  }
};

//update category
const updateCategory = async(req, res)=> {

  const cName = req.body.cName
  const detail = req.body.detail
 
 try{

    await Category.update({ cName: cName, detail: detail}, {
      where: {
        categoryID: req.params.id
      }
    })

    res.status(201).json({msg: "Update category success"})

  }
  catch(err){
    console.log(err)
  }

}
//fetchAll
function fetchCategory(req, res) {
  Category.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

//fetchByID
const categoryID = async(req, res) => {

  try{

    const response = await Category.findOne({
      where: {
        categoryID: req.params.id
      }
    })

    res.json(response)

  }
  catch(err){
    console.log(err)
  }

}

//delete
const deleteCategory = async(req, res) => {

  try{

    await Category.destroy({
      where:{
        categoryID: req.params.id
      }
    })

    res.status(201).json({msg: "Delete category success"})
      
  }
  catch(err){
    console.log(err)
  }
}

module.exports = {
  saveCategory,
  fetchCategory,
  updateCategory,
  categoryID,
  deleteCategory
};
