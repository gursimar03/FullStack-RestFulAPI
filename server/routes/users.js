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
           
                        res.json({name: data.name, accessLevel:data.accessLevel, token:token, isLoggedIn:true})
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
           
                    res.json({name: data.name, accessLevel:data.accessLevel, token:token, isLoggedIn:true})
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

router.get(`/users/profile/:email`,(req, res) => {
    usersModel.findOne({email:req.params.email}, (error, data) => {
        res.json(data)
    })
})

router.put(`/users/profile/:email`, (req, res) => {
    const updatedProfile = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password, // This should be replaced with the hashed password
        gender: req.body.gender
    }

    bcrypt.hash(updatedProfile.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) => {
        if (err) {
            console.log(err);
            return res.json({ errorMessage: "Failed to hash password" });
        }

        updatedProfile.password = hash; // Update the password field with the hash

        usersModel.findOneAndUpdate({email:req.params.email}, {$set: updatedProfile}, (error, data) => {
            if(data){
                const token = jwt.sign({email: data.email, accessLevel:data.accessLevel}, process.env.JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn:process.env.JWT_EXPIRY})
                res.json({name: data.name, accessLevel:data.accessLevel, token:token, isLoggedIn:true})
            }
            else{
                res.json({errorMessage:`Failed to update profile`})
            }
        })
    })
})


// DELETE /users/:email
// router.delete('/users/delete-account/:email', (req, res) => {
//     const email = req.params.email;
//     const password = req.body.password;
  
//     // Find the user by email
//     usersModel.findOne({ email }, (err, user) => {
//       if (err) {
//         return res.status(500).json({ error: err });
//       }
  
//       // If user not found
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       // Compare the provided password with the stored hash
//       bcrypt.compare(password, user.password, (err, result) => {
//         if (err) {
//           return res.status(500).json({ error: err });
//         }
  
//         // If password is incorrect
//         if (!result) {
//           return res.status(401).json({ error: 'Invalid password' });
//         }
  
//         // Delete the user
//         usersModel.findOneAndDelete({ email: email }, (error, data) => {
//           if (data) {
//             req.session.destroy((err) => {
//               if (err) {
//                 return res.status(500).json({ error: err });
//               }
//               res.json({ message: 'Account deleted successfully' });
//             });
//           } else {
//             res.status(404).json({ message: `Account with email ${email} not found` });
//           }
//         });
//       });
//     });
//   });

router.delete('/users/delete-account/:email', (req, res) => {
    const email = req.params.email;
    const password = req.body.password;
  
    // Find the user with the email
    usersModel.findOne({ email: email }, (error, data) => {
      if (data) {
        // If the user is found, check if the password matches
        bcrypt.compare(password, data.password, (err, isMatch) => {
          if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
          } else if (isMatch) {
            // If the password matches, delete the user and clear the session
            usersModel.findOneAndDelete({ email: email }, (error, data) => {
              if (data) {
                res.json({ message: 'Account deleted successfully' });
              } else {
                res.status(404).json({ message: `Account with email ${email} not found` });
              }
            });
          } else {
            res.status(401).json({ error: 'Unauthorized', message: 'Invalid password' });
          }
        });
      } else {
        res.status(404).json({ message: `Account with email ${email} not found` });
      }
    });
  });



module.exports = router