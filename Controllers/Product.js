const prisma = require("../DB/dbconfig");

// Assuming you have an image upload utility function called imageUploadUtil

// Adjust import path as needed

exports.createProduct = async (req, res) => {
  const {
    skuId,
    principleId,
    name,
    image,
    brandId,
    subBrandID,
    category,
    subCategory,
    productType,
    size,
    originalPrice,
    productDescription,
    isActivated,
  } = req.body;

  try {
    // Validate the required fields
    if (!skuId) {
      return res.status(400).json({ error: "SKU ID is required." });
    }

    if (!principleId) {
      return res.status(400).json({ error: "Principle ID is required." });
    }

    if (!name) {
      return res.status(400).json({ error: "Product name is required." });
    }

    if (!category) {
      return res.status(400).json({ error: "Category is required." });
    }

    if (!subCategory) {
      return res.status(400).json({ error: "Subcategory is required." });
    }

    if (!size) {
      return res.status(400).json({ error: "Size is required." });
    }

    if (!originalPrice || isNaN(parseFloat(originalPrice))) {
      return res.status(400).json({ error: "Valid original price is required." });
    }

    // Create the product entry
    const newProduct = await prisma.product.create({
      data: {
        productId: undefined, // Prisma will auto-handle this with the UUID generation
        skuId,
        principleId,
        name,
        image: image || null,
        brandId,
        subBrandID: subBrandID || null,
        category,
        subCategory,
        productType: productType || null,
        size,
        originalPrice: parseFloat(originalPrice),
        productDescription: productDescription || null,
        isActivated: isActivated !== undefined ? isActivated : true,
      },
    });

    res.status(201).json({
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      error: "Error creating product",
      details: error.message,
    });
  }
};

// Adjust with your Prisma client import

exports.createAllProducts = async (req, res) => {
  try{
  let products = req.body; // This should be an array of products

    // Insert validated data using Prisma's createMany
    const newProducts = await prisma.product.createMany({
      data: products,
    });

    res.status(201).json({
      message: `${newProducts.count} products created successfully`,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error creating products",
      details: error.message,
    });
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
      .json({ error: "Error retrieving product", details: error.message });
  }
};
exports.getProductsByLimit = async (req, res) => {
  try {
    // Extract pagination parameters from the request query
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 products per page

    // Calculate the offset (number of records to skip)
    const skip = (page - 1) * limit;

    // Fetch products and total count from the database
    const [products, totalProducts] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: limit,
      }),
      prisma.product.count(), // Get total count of products
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(totalProducts / limit);

    // Respond with paginated products and metadata
    res.status(200).json({
      products,
      meta: {
        totalProducts,
        totalPages,
        currentPage: page,
        productsPerPage: limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Error retrieving products",
      details: error.message,
    });
  }
};
exports.getProductByPrincipleId = async (req ,res) => {
  try {
    const { principleId } = req.params; // Extract principleId from the route params

    // Fetch the product data based on the principleId
    const products = await prisma.product.findMany({
      where: {
        principleId: principleId,
      },
    });

    // Check if products exist
    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found for the given principleId' });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching product by principleId:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.getProductsByCategory = async (req, res) => {
  console.log(req.params);

  const { category } = req.params; // Get the category from route parameters
  try {
    // Check if category is provided
    if (!category) {
      return res.status(400).json({ error: "Category is required." });
    }

    // Fetch products from the database based on the category
    const products = await prisma.product.findMany({
      where: {
        category,
      },
    });

    // Check if products exist for the given category
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this category." });
    }

    // Return the list of products
    res.status(200).json(products);
  } catch (error) {
    // Handle errors during database operation
    res.status(500).json({
      error: "Error fetching products by category",
      details: error.message,
    });
  }
};
exports.getProductsByBrandName = async (req, res) => {
  const { brandName } = req.params; // Get the brandName from route parameters

  try {
    // Check if brandName is provided
    if (!brandName) {
      return res.status(400).json({ error: "Brand name is required." });
    }

    // Fetch products from the database based on the brandName
    const products = await prisma.product.findMany({
      where: {
        brandName,
      },
    });

    // Check if products exist for the given brand name
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this brand name." });
    }

    // Return the list of products
    res.status(200).json(products);
  } catch (error) {
    // Handle errors during database operation
    res.status(500).json({
      error: "Error fetching products by brand name",
      details: error.message,
    });
  }
};
exports.getActiveProducts = async (req, res) => {
  try {
    // Fetch products from the database where isActivated is true
    const activeProducts = await prisma.product.findMany({
      where: {
        isActivated: true,
      },
    });

    // Check if any active products are found
    if (activeProducts.length === 0) {
      return res.status(404).json({ message: "No active products found." });
    }

    // Return the list of active products
    res.status(200).json(activeProducts);
  } catch (error) {
    // Handle errors during database operation
    res.status(500).json({
      error: "Error fetching active products",
      details: error.message,
    });
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

exports.filterProduct = async (req, res) => {
  try {
    const { categories, brands, names, isActive } = req.body;

    // Build filters dynamically
    const filters = {};

    if (Array.isArray(categories) && categories.length > 0) {
      filters.category = { in: categories };
    }

    if (Array.isArray(brands) && brands.length > 0) {
      filters.brandName = { in: brands };
    }

    if (Array.isArray(names) && names.length > 0) {
      filters.name = { in: names };
    }

    if (typeof isActive !== "undefined") {
      filters.isActivated = isActive;
    }

    let products = [];
    try {
      // Prisma query wrapped in its own try-catch block
      products = await prisma.product.findMany({
        where: filters,
      });
    } catch (prismaError) {
      console.error("Prisma Error:", prismaError);
      return res
        .status(500)
        .json({ error: "Error fetching products from the database" });
    }

    // Check if products array is empty
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json(products);
  } catch (error) {
    console.error("General Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
