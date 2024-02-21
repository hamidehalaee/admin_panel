const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();

const prisma = PrismaClient()

router.get('/dashboord', async (res,req) => {

    try{
        const posts = await prisma.post.findMany();
        const users = await prisma.users.findMany()
        res.json([posts,users])
        
    }catch(error){

        res.status(403).json({ message: error });
    }
})

app.get('/search', async (req, res) => {
    const { query, page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;
    
    try {
      
      const results = await prisma.user.findMany({
        where: {
          OR: [
            { username: { contains: query, mode: 'insensitive' } },
            { email: { contains: query, mode: 'insensitive' } },
            { role: { contains: query, mode: 'insensitive' } },
            { author: { contains: query, mode: 'insensitive' } },
            { title: { contains: query, mode: 'insensitive' } },
          ],
        },
        skip: offset,
        take: parseInt(pageSize),
      });
      res.json(results);
    }
     catch (error) {

      console.error('Error searching:', error);
      res.status(500).json({ message: 'can\'t search anything.' });
    }
  });

app.post(
    '/create-post', async (req,res) =>{
        const { post } = req.body
        const { creatingpost } = await prisma.post.create({
            data:{
                post: post
            }
        })
        res.json(creatingpost)
    }
)

app.update(
    'update-post/:id', async (req,res) =>{
        const id = req.param
        const { updatedpost } = req.body
        try{
            const updatingpost = await prisma.post.update({
                where:{
                    id: id
                },
                data:{
                    updatedpost
                }
            })
            res.json(updatingpost)
        }catch(error){
            console.log(error)
            res.status(500).json({message: 'can\'t update post.'})
        }
    }
)

app.delete(
    'delete-post/:id', async (req,res) =>{
        const id = req.param
        try{
            const deletingpost = await prisma.post.delete({
                where:{
                    id: id
                }
            })
            res.json(`${deletingpost} has been deleted.`)
        }catch(error){
            console.log(error)
            res.status(500).json({message: 'can\'t delete post.'})
        }
    }
)

app.update(
    'block-user/:id', async(req,res) => {
        const id = req.param
        try{
            const user = prisma.user.update({
                where:{
                    id:id
                },
                data:{
                    block: True
                }
            })
            res.json(user)
            
        }catch(error){
            console.log(error)
            res.status(500).json('can\'t block user.')
        }
    }
)


module.exports = router;