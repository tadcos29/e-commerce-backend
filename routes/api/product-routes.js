const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
// router.get('/', (req, res) => {
//   // find all products
//   // be sure to include its associated Category and Tag data
// });
router.get('/', async (req, res) => {
  try {
    const prData = await Product.findAll(
     {include: [{ model: Category }, {model: Tag, through:ProductTag, as: 'product_tags' }]}
     // 
    );
    res.status(200).json(prData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const prodData = await Product.findByPk(req.params.id,
      {include: [{ model: Category }, {model: Tag, through:ProductTag, as: 'product_tags' }]}
    );
    res.status(200).json(prodData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Refactored into async/await as an exercise.

router.post('/', async (req, res) => {
    try {
      const product = await Product.create(req.body);
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
       const bulkTags = await ProductTag.bulkCreate(productTagIdArr);
       const prodData = await Product.findByPk(product.id,
        {include: [{ model: Category }, {model: Tag, through:ProductTag, as: 'product_tags' }]}
      );
       res.status(200).json(prodData);
      }
  
      }
    catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
)

// Pre-supplied code - refactored into async/await as an exercise.

router.put('/:id', async (req, res) => {
    try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
    const productTagIds = productTags.map(({ tag_id }) => tag_id);
        // create filtered list of new tag_ids
    const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });
        // figure out which ones to remove
        const productTagsToRemove = productTags.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id)).map(({ id }) => id);

        // run both actions
        await ProductTag.destroy({ where: { id: productTagsToRemove } });
        await ProductTag.bulkCreate(newProductTags);
        const prodData = await Product.findByPk(req.params.id,
          {include: [{ model: Category }, {model: Tag, through:ProductTag, as: 'product_tags' }]}
        );
        res.status(200).json(prodData);
      }
    catch(err) {
      console.log(err);
      res.status(400).json(err);
    }});

    


router.delete('/:id', async (req, res) => {
  try {
    const catData = await Product.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!catData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
