const { default: prisma } = require("../DB/dbconfig");

// Create a new product
exports.createProduct = async (req, res) => {
  const {
    name,
    image,
    category,
    brandName,
    subBrandName,
    price,
    promotionPrice,
    supplierName,
    storeId,
    description,
    stockAvailable,
  } = req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        image,
        category,
        brandName,
        subBrandName,
        price,
        promotionPrice,
        supplierName,
        storeId,
        description,
        stockAvailable,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating product", details: error.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving products", details: error.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving product", details: error.message });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    image,
    category,
    brandName,
    subBrandName,
    price,
    promotionPrice,
    supplierName,
    storeId,
    description,
    stockAvailable,
    isActivated,
  } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        image,
        category,
        brandName,
        subBrandName,
        price,
        promotionPrice,
        supplierName,
        storeId,
        description,
        stockAvailable,
        isActivated,
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating product", details: error.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: { id },
    });
    res.status(204).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting product", details: error.message });
  }
};
