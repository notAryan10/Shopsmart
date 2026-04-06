const prisma = require('../prisma');

const createUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await prisma.user.create({
      data: {
        email,
        password,
        role
      }
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const where = role ? { role } : {};
    
    const users = await prisma.user.findMany({
      where,
      include: {
        products: true,
        _count: {
          select: { products: true, orders: true }
        }
      }
    });
    
    const formattedUsers = users.map(user => ({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.email.split('@')[0].replace(/[-_]/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      status: user.role === 'CREATOR' ? 'Verified' : undefined,
      level: Math.floor(Math.random() * 50) + 10,
      category: user.role === 'CREATOR' ? 'Digital Assets' : undefined,
      totalDrops: user._count.products,
      followers: Math.floor(Math.random() * 100) + 'K',
      bio: user.role === 'CREATOR' ? 'Creating amazing digital assets for the next generation.' : undefined,
      products: user.products,
      activeDrops: user.products.filter(p => new Date(p.dropExpires) > new Date()).slice(0, 2)
    }));
    
    res.json(formattedUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers
};
