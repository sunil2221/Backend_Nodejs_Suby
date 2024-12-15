const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();


router.post('/add-product/:firmId', productController.addProduct)
router.get("/:firmId/products", productController.getProductByFirm);


//image getting
router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  req.headersSent("content-Type", "image/jpeg");
  res.sendFile(Path2D.join(__dirname, "..", "uploads", imageName));
});


router.delete("/:productId", productController.destroyProductById);

module.exports = router;