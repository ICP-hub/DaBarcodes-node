const prisma = require("../DB/dbconfig");
const { imageUploadUtil } = require("../utils/cloudinary");
exports.handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    // Assuming `result` contains the URL of the uploaded image
    const newProduct = await prisma.product.create({
      // other fields
      image: result , // Store as an object
    });

 

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occurred",
    });
  }
};


// Assuming you have an image upload utility function called imageUploadUtil


exports.createProduct = async (req, res) => {
  const {
    name,
    image, // Image can either be URL or path (if file uploaded)
    category,
    brandName,
    subBrandName,
    price,
    weight,
    promotionPrice,
    supplierName,
    storeId,
    description,
    stockAvailable,
    status,
    promotionValidUntil,
    promotedBy,
  } = req.body;
  const priceFloat = parseFloat(price);
  const promotionPriceFloat = promotionPrice ? parseFloat(promotionPrice) : null;
  const stockAvailableInt = parseInt(stockAvailable, 10);
  let imageUrl = "";  // Variable to store the uploaded image URL

  // Handle image upload if file is provided in the request
  if (req.file) {
    try {
      // Directly upload the file buffer to Cloudinary or any image upload utility you're using
      const uploadResult = await imageUploadUtil(req.file.buffer);  // Adjust based on your upload utility
      imageUrl = uploadResult.secure_url;  // Get the URL of the uploaded image
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "Error uploading image",
      });
    }
  } else if (image) {
    // If the image URL is passed in the request body, use it directly
    imageUrl = image;
  }
     // Convert promotedBy to an array if it's provided as a string (wrap it in an array)
     const promotedByArray = Array.isArray(promotedBy) ? promotedBy : [promotedBy];
  try {
    // Create the new product in the database using Prisma
    const newProduct = await prisma.product.create({
      data: {
        name,
        image: imageUrl,  // Use the uploaded image URL or the one passed in the request
        category,
        brandName,
        subBrandName,
        price: priceFloat,
        weight,
        promotionPrice: promotionPriceFloat, 
        supplierName,
        storeId,
        description,
        stockAvailable: stockAvailableInt, 
        status: status || 'Active',  // Default to 'Active' if no status is provided
        promotionValidUntil: promotionValidUntil ? new Date(promotionValidUntil) : null,
        promotedBy: promotedByArray,  // Default to empty array if not provided
      },
    });

    // Return the created product with a success status
    res.status(201).json(newProduct);
  } catch (error) {
    // Catch any errors that occur during product creation
    res.status(500).json({
      error: "Error creating product",
      details: error.message,
    });
  }
};

// exports.createAllProducts = async (req, res) => {
//   const products = req.body; // This will be an array of products

//   try {
//     // Use Prisma's createMany to insert multiple products
//     const newProducts = await prisma.product.createMany({
//       data: products, // Data should be an array of product objects
//     });

//     res.status(201).json({ message: `${newProducts.count} products created successfully`, data: newProducts });
//   } catch (error) {
//     res.status(500).json({ error: "Error creating products", details: error.message });
//   }
// };
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
