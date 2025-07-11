const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


function adminOnly(req, res, next) {
  const role = req.headers['x-role']; 
  if (role !== 'ADMIN') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
}


router.post('/add-user', adminOnly, async (req, res) => {
  const { name, email, password, address, role } = req.body;

  if (!name || !email || !password || !address || !role) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, address, role }
    });
    res.status(201).json({ message: 'User added successfully!', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add user.' });
  }
});


router.post('/add-store', adminOnly, async (req, res) => {
  const { name, email, address, ownerId } = req.body;

  if (!name || !email || !address || !ownerId) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const store = await prisma.store.create({
      data: { name, email, address, ownerId }
    });
    res.status(201).json({ message: 'Store added successfully!', store });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add store.' });
  }
});

router.get('/dashboard', adminOnly, async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalStores = await prisma.store.count();
    const totalRatings = await prisma.rating.count();

    res.json({ totalUsers, totalStores, totalRatings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dashboard data.' });
  }
});

module.exports = router;
