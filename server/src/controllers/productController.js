const prisma = require('../prisma');

const createProduct = async (req, res) => {
  console.log("POST /api/products - Request Body:", req.body);
  try {
    const { name, description, price, stock, type, dropExpires, creatorId } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        type,
        dropExpires: new Date(dropExpires),
        creatorId
      }
    });
    console.log("Product created successfully:", product.id);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  console.log("GET /api/products - Fetching all products");
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        creator: {
          select: {
            id: true,
            email: true
          }
        }
      }
    });
    console.log(`Found ${products.length} products`);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            email: true
          }
        }
      }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.update({
      where: { id },
      data: req.body
    });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
