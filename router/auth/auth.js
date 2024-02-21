const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const express = require('express');

const router = express.Router()
const prisma = PrismaClient()
app.use(express.json());

router.post(
    'register/', async (req,res) =>{
        const { password,email,username } = req.body
        const hashedPassword = await bcrypt.hash(password,10)
        try{
            const createUser = prisma.user.create({
                data:{
                                username,
                                email,
                    password:   hashedPassword
                }
            })
            res.json(createUser)
        }catch(error){
            res.status(400).json({ message: 'User registration failed' });        
        }
    }
)
// function example() {
//     return condition1 ? value1
//       : condition2 ? value2
//       : condition3 ? value3
//       : value4;
//   }
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    const passwordMatch = await bcrypt.compare(password, user.password);

    return  (!user) ? (res.status(404).json({ message: 'User not found.' }))
        : 
            (!passwordMatch) ? (res.status(401).json({ message: 'Invalid password.' }))
        :   
            (user.blocked) ? (res.status(404).json({ message: 'User has been blocked.' }))
        :  
             res.json({ message: 'Login successful' });
  });

module.exports = router