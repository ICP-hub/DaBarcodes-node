const express = require('express'); 
const { createPromotionController, updatePromotionController } = require('../Controllers/Promotion');
const router = express.Router();

router.post('/create', createPromotionController);


router.put('/update/:id', updatePromotionController);




module.exports = router;