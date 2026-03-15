const prisma = require('../prisma');

const createOrder = async (req, res) => {
  try {
    const { amount, buyerId, productId } = req.body;
    const order = await prisma.order.create({
      data: {
        amount,
        buyerId,
        productId
      }
    });

    await prisma.product.update({
      where: { id: productId },
      data: { stock: { decrement: 1 } }
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        product: true,
        buyer: { select: { email: true, role: true } }
      }
    });
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders
};
