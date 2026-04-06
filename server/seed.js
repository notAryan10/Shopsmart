const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Purging and Re-seeding database...');
  
  // 0. Purge
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Creators
  const creators = await Promise.all([
    prisma.user.create({
      data: {
        email: 'neon-samurai@vendora.io',
        password: 'hashedpassword',
        role: 'CREATOR'
      }
    }),
    prisma.user.create({
      data: {
        email: 'voidwalker@vendora.io',
        password: 'hashedpassword',
        role: 'CREATOR'
      }
    }),
    prisma.user.create({
      data: {
        email: 'astra@vendora.io',
        password: 'hashedpassword',
        role: 'CREATOR'
      }
    }),
    prisma.user.create({
      data: {
        email: 'err0r@vendora.io',
        password: 'hashedpassword',
        role: 'CREATOR'
      }
    }),
    prisma.user.create({
      data: {
        email: 'orbit@vendora.io',
        password: 'hashedpassword',
        role: 'CREATOR'
      }
    }),
    prisma.user.create({
      data: {
        email: 'synapse@vendora.io',
        password: 'hashedpassword',
        role: 'CREATOR'
      }
    })
  ]);

  // 2. Create Products
  const productsData = [
    {
      name: 'Cyber Katana',
      description: 'Legendary blade forged in neon code. Grants +50 Style and 100% urgency.',
      price: 89,
      stock: 12,
      type: 'DIGITAL',
      creatorId: creators[0].id,
      dropExpires: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours
    },
    {
      name: 'Void Runner Helmet',
      description: 'Experience the void. Ultra-lightweight void-tech helmet.',
      price: 120,
      stock: 5,
      type: 'PHYSICAL',
      creatorId: creators[1].id,
      dropExpires: new Date(Date.now() + 5 * 60 * 60 * 1000) // 5 hours
    },
    {
      name: 'Plasma Wings',
      description: 'Ethereal wings channeling pure plasma energy.',
      price: 250,
      stock: 2,
      type: 'PHYSICAL',
      creatorId: creators[2].id,
      dropExpires: new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 hour
    },
    {
      name: 'Glitch Cloak',
      description: 'Disappear into the glitch dimension with this legendary cloak.',
      price: 45,
      stock: 48,
      type: 'DIGITAL',
      creatorId: creators[3].id,
      dropExpires: new Date(Date.now() + 12 * 60 * 60 * 1000) // 12 hours
    },
    {
      name: 'Neural Link',
      description: 'Direct consciousness interface with the network.',
      price: 75,
      stock: 15,
      type: 'DIGITAL',
      creatorId: creators[5].id,
      dropExpires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    },
    {
      name: 'Gravity Boots',
      description: 'Defy physics with advanced gravity-manipulation technology.',
      price: 110,
      stock: 8,
      type: 'PHYSICAL',
      creatorId: creators[4].id,
      dropExpires: new Date(Date.now() + 8 * 60 * 60 * 1000) // 8 hours
    },
    {
      name: 'Neon Shades',
      description: 'See the world in neon. Perfect companion to the Cyber Katana.',
      price: 25,
      stock: 100,
      type: 'PHYSICAL',
      creatorId: creators[0].id,
      dropExpires: new Date(Date.now() + 48 * 60 * 60 * 1000) // 48 hours
    }
  ];

  const products = await Promise.all(
    productsData.map(data => prisma.product.create({ data }))
  );

  // 3. Create test buyers
  const buyers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'collector1@example.com',
        password: 'hashedpassword',
        role: 'BUYER'
      }
    }),
    prisma.user.create({
      data: {
        email: 'collector2@example.com',
        password: 'hashedpassword',
        role: 'BUYER'
      }
    })
  ]);

  // 4. Create some test orders
  await Promise.all([
    prisma.order.create({
      data: {
        amount: 89,
        buyerId: buyers[0].id,
        productId: products[0].id
      }
    }),
    prisma.order.create({
      data: {
        amount: 120,
        buyerId: buyers[1].id,
        productId: products[1].id
      }
    })
  ]);

  console.log('Seed complete! Created:');
  console.log(`- ${creators.length} creators`);
  console.log(`- ${products.length} products`);
  console.log(`- ${buyers.length} buyers`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
