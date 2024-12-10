const prisma = require("../DB/dbconfig");



// Create a new promotion with only required fields
exports.createPromotionController = async (req, res) => {
  try {
    const { promotionSKUID, promotionPrice, promotionStartDate, promotionEndDate, productId } = req.body;

    const newPromotion = await prisma.promotion.create({
      data: {
        promotionSKUID,
        promotionPrice,
        promotionStartDate: new Date(promotionStartDate),
        promotionEndDate: new Date(promotionEndDate),
        productId,
      },
    });
    
    await prisma.product.update({
      where:{productId},
      data: { isPromotion: true },
    })
    return res.status(201).json({
      success: true,
      data: newPromotion,
    });
  } catch (error) {
    console.error('Error creating promotion:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create promotion',
      error: error.message,
    });
  }
};

// Update an existing promotion with only required fields
exports.updatePromotionController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      promotionSKUID,
      promotionPrice,
      promotionDescription,
      promotionStartDate,
      promotionEndDate,
      promotedBy,
      targetRetailer,
      promotionType,
    } = req.body;

    const updatedPromotion = await prisma.promotion.update({
      where: { promotionId: id },
      data: {
        ...(promotionSKUID && { promotionSKUID }),
        ...(promotionPrice && { promotionPrice }),
        ...(promotionDescription && { promotionDescription }),
        ...(promotionStartDate && { promotionStartDate: new Date(promotionStartDate) }),
        ...(promotionEndDate && { promotionEndDate: new Date(promotionEndDate) }),
        ...(promotedBy && { promotedBy }),
        ...(targetRetailer && { targetRetailer }),
        ...(promotionType && { promotionType }),
      },
    });

    return res.status(200).json({
      success: true,
      data: updatedPromotion,
    });
  } catch (error) {
    console.error('Error updating promotion:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Promotion not found',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to update promotion',
      error: error.message,
    });
  }
};
