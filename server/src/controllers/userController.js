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
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers
};
