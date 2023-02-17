const router = require(`express`).Router()

const usersModel = require(`../models/users`)

const bcrypt = require('bcryptjs')  // needed for password encryption

const jwt = require('jsonwebtoken')


// IMPORTANT
// Obviously, in a production release, you should never have the code below, as it allows a user to delete a database collection
// The code below is for development testing purposes only 
router.post(`/users/reset_user_collection`, (req,res) => 
{
    usersModel.deleteMany({}, (error, data) => 
    {
        if(data)
        {
            const adminPassword = `123!"£qweQWE`
            bcrypt.hash(adminPassword, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) =>  
            {
                usersModel.create({name:"Administrator",email:"admin@admin.com",password:hash,accessLevel:parseInt(process.env.ACCESS_LEVEL_ADMIN)}, (createError, createData) => 
                {
                    if(createData)
                    {
                        res.json(createData)
                    }
                    else
                    {
                        res.json({errorMessage:`Failed to create Admin user for testing purposes`})
                    }
                })
            })
        }
        else
        {
            res.json({errorMessage:`User is not logged in`})
        }
    })                
})


router.post(`/users/register/:name/:surname/:email/:password/:gender`, (req,res) => 
{
    // If a user with this email does not already exist, then create new user
    usersModel.findOne({email:req.params.email}, (uniqueError, uniqueData) => 
    {
        if(uniqueData)
        {
            res.json({errorMessage:`User already exists`})
        }
        else
        {
            bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) =>  
            {
                usersModel.create({name:req.params.name,surname:req.params.surname,email:req.params.email,password:hash,gender:req.params.gender}, (error, data) => 
                {
                    if(data)
                    {
                        const token = jwt.sign({email: data.email, accessLevel:data.accessLevel}, process.env.JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn:process.env.JWT_EXPIRY})     
           
                        res.json({name: data.name, accessLevel:data.accessLevel, token:token})
                    }
                    else
                    {
                        console.log(error) // Add this line to log the error
                        res.json({errorMessage:`User was not registered`})
                    }
                }) 
            })
        }
    })         
})






router.post(`/users/login/:email/:password`, (req,res) => 
{
    usersModel.findOne({email:req.params.email}, (error, data) => 
    {
        if(data)
        {
            bcrypt.compare(req.params.password, data.password, (err, result) =>
            {
                if(result)
                {
                    const token = jwt.sign({email: data.email, accessLevel:data.accessLevel}, process.env.JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn:process.env.JWT_EXPIRY})     
           
                    res.json({name: data.name, accessLevel:data.accessLevel, token:token})
                }
                else
                {
                    res.json({errorMessage:`User is not logged in`})
                }
            })
        }
        else
        {
            console.log("not found in db")
            res.json({errorMessage:`User is not logged in`})
        } 
    })
})


router.post(`/users/logout`, (req,res) => 
{       
    res.json({})
})


module.exports = router