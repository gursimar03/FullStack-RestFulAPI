const router = require(`express`).Router()

const usersModel = require(`../models/users`)

const bcrypt = require('bcryptjs')  // needed for password encryption

const jwt = require('jsonwebtoken')

const multer = require('multer');
const fs = require('fs')

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = 'uploads';
      const dir = `${process.env.UPLOADED_FILES_FOLDER}`;
      // Check if the directory exists
      if (!fs.existsSync(dir)) {
        // If it doesn't, create it
        fs.mkdirSync(dir);
      }
      cb(null, dir);
    },
  }),
});


// IMPORTANT
// Obviously, in a production release, you should never have the code below, as it allows a user to delete a database collection
// The code below is for development testing purposes only 
router.post(`/users/reset_user_collection`, (req, res) => {
  usersModel.deleteMany({}, (error, data) => {
    if (data) {
      const adminPassword = `123!"£qweQWE`
      bcrypt.hash(adminPassword, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) => {
        usersModel.create({ name: "Administrator", email: "admin@admin.com", password: hash, accessLevel: parseInt(process.env.ACCESS_LEVEL_ADMIN) }, (createError, createData) => {
          if (createData) {
            res.json(createData)
          }
          else {
            res.json({ errorMessage: `Failed to create Admin user for testing purposes` })
          }
        })
      })
    }
    else {
      res.json({ errorMessage: `User is not logged in` })
    }
  })
})


  


router.post(`/users/register/:name/:surname/:email/:password/:gender`, (req, res) => {
  // If a user with this email does not already exist, then create new user
  usersModel.findOne({ email: req.params.email }, (uniqueError, uniqueData) => {
    if (uniqueData) {
      res.json({ errorMessage: `User already exists` })
    }
    else {
      bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) => {
        usersModel.create({ name: req.params.name, surname: req.params.surname, email: req.params.email, password: hash, gender: req.params.gender, profilePhotoFilename: null }, (error, data) => {
          if (data) {
            const token = jwt.sign({ email: data.email, accessLevel: data.accessLevel }, process.env.JWT_PRIVATE_KEY, { algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY })

            res.json({ name: data.name, accessLevel: data.accessLevel, token: token, isLoggedIn: true, email: data.email})
          }
          else {
            console.log(error) // Add this line to log the error
            res.json({ errorMessage: `User was not registered` })
          }
        })
      })
    }
  })
})

router.post(`/users/login/:email/:password`, (req, res) => {
  usersModel.findOne({ email: req.params.email }, (error, data) => {
    if (data) {
      bcrypt.compare(req.params.password, data.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ email: data.email, accessLevel: data.accessLevel }, process.env.JWT_PRIVATE_KEY, { algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY })

          res.json({ name: data.name, accessLevel: data.accessLevel, token: token, isLoggedIn: true, email: data.email, profilePhoto: data.profilePhotoFilename })

        }
        else {
          res.json({ errorMessage: `User is not logged in` })
        }
      })
    }
    else {
      console.log("not found in db")
      res.json({ errorMessage: `User is not logged in`, clientMessage: 'The Email Address Or Password Is Incorrect.' })
    }
  })
})

router.post(`/users/logout`, (req, res) => {
  res.json({})
})

router.get(`/users/profile/:email`, (req, res) => {
  usersModel.findOne({ email: req.params.email }, (error, data) => {
    res.json(data)
  })
})

router.put('/users/password/:email', (req, res) => {
  // Get the updated password from the request body

  //to check if the old password is correct
  usersModel.findOne({ email: req.params.email }, (error, data) => {
    if (error) {
      console.log(error);
      res.json({ errorMessage: 'An error occurred. Please try again.' });
      return;
    }

    bcrypt.compare(req.body.oldPassword, data.password, (err, result) => {
      if (err) {
        console.log(err);
        res.json({ errorMessage: 'An error occurred. Please try again.' });
        return;
      }

      if (!result) {
        res.json({ errorMessage: 'Old password is incorrect' });
        return;
      }

      //first check if the password is the same as the confirmed password
      if (req.body.password !== req.body.confirmPassword) {
        res.json({ errorMessage: 'Passwords do not match' });
        return;
      }

      //then check if the password is the same as the old password
      bcrypt.compare(req.body.password, data.password, (err, result) => {
        if (err) {
          console.log(err);
          res.json({ errorMessage: 'An error occurred. Please try again.' });
          return;
        }

        if (result) {
          res.json({ errorMessage: 'New password cannot be the same as the old password' });
          return;
        }

        //then hash the new password
        bcrypt.hash(req.body.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) => {
          if (err) {
            console.log(err);
            res.json({ errorMessage: 'An error occurred. Please try again.' });
            return;
          }

          //then update the password in the database
          usersModel.findOneAndUpdate({ email: req.params.email }, { $set: { password: hash } }, (error, data) => {        
            if (error) {
              console.log(error);
              res.json({ errorMessage: 'An error occurred. Please try again.' });
              return;
            }

            if (data) {
              res.json({ successMessage: 'Password updated successfully' });
            } else {
              res.json({ errorMessage: 'Password update failed' });
            }
          });
        });
      });
    });
  });
});

router.put('/users/profile/:email', upload.single('profilePhoto'), (req, res) => {
  // Get the updated profile information from the request body
  const updatedProfile = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    gender: req.body.gender
  }

  if (req.file) {
    console.log(req.file.path);
    updatedProfile.profilePhotoFilename = fs.readFileSync(req.file.path, 'base64');
  }

  // Update the user's profile in the database
  usersModel.findOneAndUpdate({ email: req.params.email }, { $set: { ...updatedProfile } }, (error, data) => {
    if (data) {
      const token = jwt.sign({ email: updatedProfile.email, accessLevel: data.accessLevel }, process.env.JWT_PRIVATE_KEY, { algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY })
      res.json({ name: updatedProfile.name, email: updatedProfile.email, accessLevel: data.accessLevel, profilePhoto: updatedProfile.profilePhotoFilename, token: token, isLoggedIn: true })
    }
    else {
      res.json({ errorMessage: `Failed to update profile` })
    }
  })
});

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

module.exports = router;