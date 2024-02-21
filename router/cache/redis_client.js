const redis = require('redis')
const express = require('express')
const router = express.Router()

const redisClient = redis.createClient();

const { PrismaClient } = require('@prisma/client');
const prisma = PrismaClient()




router.get('/users/:id', async(req, res) => {
    const userId = req.params.id;
    const users = await prisma.users.findMany();
    
    redisClient.get(`user:${userId}`, (err, cachedUser) => {
        if (err) {
            console.error('Error retrieving user data from cache:', err);
            
            const user = users.find(user => user.id == userId);
            if (user) {
                res.json(user);
            } else {
                res.status(404).send('User not found');
            }
        } else if (cachedUser) {
            
            console.log('User data retrieved from cache');
            res.json(JSON.parse(cachedUser));
        } else {
            
            const user = users.find(user => user.id == userId);
            if (user) {
                
                redisClient.set(`user:${userId}`, JSON.stringify(user));
                console.log('User data cached');
                res.json(user);
            } else {
                res.status(404).send('User not found');
            }
        }
    });
});
