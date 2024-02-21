const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();

const prisma = PrismaClient()

router.get('/login', async (req, res) => {
    const user = req.user; 
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access forbidden' });
    }
    
    res.json({ message: 'Admin route accessed' });
  });



module.exports = router;