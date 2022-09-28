const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// endpoint -  /api/tags

// Returns all Tags with linked products
router.get('/', async (req, res) => {

  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],

    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Returns all Tags with linked products by ID
router.get('/:id', async (req, res) => {

  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag information found with that ID!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Adds a new tag to the database
router.post('/', async (req, res) => {

  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});


  // updates a tags name by its `id` value
router.put('/:id', async (req, res) => {

  try {
    const tagData = await Tag.update(req.body,
      {
        where: {
          id: req.params.id,
        },
      })

    if (!tagData) {
      res.status(404).json({ message: 'No Tag information found with that ID!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});


  // deletes a tag by its `id` value
router.delete('/:id', async (req, res) => {

  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No Tag information found with that ID!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

// {
//   "tag_name": "Beer"
// }
