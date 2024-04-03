require('dotenv').config()
const express = require('express')
const app = express()
const jwt=require('jsonwebtoken')
app.use(express.json())
app.use(express.urlencoded())
const posts=[{username : 'admin',title : 'webAdmin'},{username:'nadmin',title:'netAdmin'}]
function verifyToken(req,res,next){
    const bearerHeadr = req.headers['authorization']
    if(typeof bearerHeadr != 'undefined'){
        const bearer = bearerHeadr.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    }
}
app.get('/posts',verifyToken,(req,res) =>{
    jwt.verify(req.token, process.env.SECRETKEY, (err, decoded)=> {
        if (err)
            res.sendStatus(403)
        else{
            console.log(decoded)
            res.json(posts)
        }
    });
})
app.post('/login', (req,res)=>{
    console.log(req)
        //Authenticated User
    const username = req.body.username
    const user = { name : username }
    const accessToken = jwt.sign(user, process.env.SECRETKEY)
    res.json({ accessToken : accessToken})
})
app.listen(3000);