const express = require('express');
const productController = require('../Controllers/Product');  // adjust path if needed
const router = express.Router();


router.post('/create',productController.createProduct);
router.post('/all', productController.createAllProducts);
router.get('/get', productController.getProducts);
router.get('/get/:principleId', productController.getProductByPrincipleId);
router.put('/updates/:id', productController.updateProduct);
router.get("/get/category/:category", productController.getProductsByCategory);
router.get('/get/brand/:brandName', productController.getProductsByBrandName);
router.get('/activeProduct', productController.getActiveProducts);
router.get("/page",productController.getProductsByLimit)
router.delete('/del/:id', productController.deleteProduct);
router.post("/filter",productController.filterProduct)

module.exports = router;
