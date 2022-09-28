// Imports express and models 
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Returns all categories information, including product information 
router.get('/', async (req, res) => {

  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// Returns  category information by ID, including product information 
router.get('/:id', async (req, res) => {

  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category information found with that ID!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Adds a new category to the databae
router.post('/', async (req, res) => {

  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// Updates an exsisting category in the database by ID
router.put('/:id', async (req, res) => {

  try {
    const categoryData = await Category.update(req.body,
      {
        where: {
          id: req.params.id,
        },
      })

    if (!categoryData) {
      res.status(404).json({ message: 'No category information found with that ID!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});


// Deletes a category in the database by ID
router.delete('/:id', async (req, res) => {

  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category information found with that ID!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

// {
//   "category_name": "Beer"
// }

