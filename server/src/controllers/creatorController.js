const prisma = require('../prisma');

const getCreatorProducts = async (req, res) => {
  try {
    const { id } = req.params;
    
    const creator = await prisma.user.findUnique({
      where: { id },
      include: { products: true }
    });

    if (!creator || creator.role !== 'CREATOR') {
      return res.status(404).json({ error: 'Creator not found' });
    }

    res.json(creator.products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCreatorProducts
};
