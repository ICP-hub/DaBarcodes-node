const express = require('express');
const productController = require('../Controllers/Product');  // adjust path if needed
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/create', upload.single('image'),productController.createProduct);
// router.post('/all', productController.createProducts);
router.get('/get', productController.getProducts);
router.get('/get/:id', productController.getProductById);
router.put('/updates/:id', productController.updateProduct);
router.delete('/del/:id', productController.deleteProduct);

module.exports = router;
