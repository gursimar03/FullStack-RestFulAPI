
const router = require(`express`).Router()
const productsModel = require(`../models/products`)
const UserModal = require(`../models/users`)


const dataset = require('../dataset/shoes.json');

const fs = require('fs')
const path = require('path');
const jwt = require('jsonwebtoken');
const privateKey = fs.readFileSync(path.join(__dirname, '..', 'config', 'jwt_private_key.pem'));

// Use the privateKey variable in your code as needed


const multer  = require('multer');
const { deleteOne } = require('../models/products');


//stores the dataset in the database when the server starts
productsModel.deleteMany({}, (error, data) => {
    if (data) {
        dataset["Shoes"].forEach((product) => {
            productsModel.create(
                {
                    brand: product.brand,
                    name: product.name,
                    description: product.description,
                    age: product.age,
                    type: product.type,
                    color: product.color,
                    productImage: product["product-image"],
                    images: product.images,
                    sizes: product.sizes,
                    price: product.price,
                    inventory: product.inventory
                }
            )
        })  

    } else {
        console.log('dataset not inserted')
    }
})

// router.get(`/products`, (req, res) => {
//     productsModel.find({}, (error, data) => {
//         if (data) {
//             res.json(data)
//         } else {
//             res.json(error)
//         }
//     })
// })
router.get(`/products`, (req, res) => {
    productsModel.find({}, (error, data) => {
        if (error) {
            return res.status(500).json({ message: 'An error occurred while retrieving products.' })
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No products found.' })
        }
        res.json(data)
    })
})


// router.get(`/shoes/men`, (req, res) => {
//     productsModel.find({age: 'Men'}, (error, data) => {
//         if (data) {
//             res.json(data)
//         } else {
//             res.json(error)
//         }
//     })
// })

router.get(`/shoes/men`, (req, res) => {
    productsModel.find({age: 'Men'}, (error, data) => {
        if (error) {
            return res.status(500).json({ message: 'An error occurred while retrieving men\'s shoes.' })
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No men\'s shoes found.' })
        }
        res.json(data)
    })
})

// router.get(`/shoes/women`, (req, res) => {
//     productsModel.find({age: 'Women'}, (error, data) => {
//         if (data) {
//             res.json(data)
//         } else {
//             res.json(error)
//         }
//     })
// })

router.get(`/shoes/women`, (req, res) => {
    productsModel.find({age: 'Women'}, (error, data) => {
        if (error) {
            return res.status(500).json({ message: 'An error occurred while retrieving women\'s shoes.' })
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No women\'s shoes found.' })
        }
        res.json(data)
    })
})

// router.get(`/shoes/kids`, (req, res) => {
//     productsModel.find({}, (error, data) => {
//         if (data) {
//             let kids = [];
//             data.forEach((product) => {
//                 if(product.age === 'Boys' || product.age === 'Girls') {
//                     kids.push(product);
//                 }
//             })
//             res.json(kids)
//         } else {
//             res.json(error)
//         }
//     })
// })

router.get(`/shoes/kids`, (req, res) => {
    productsModel.find({}, (error, data) => {
        if (error) {
            return res.status(500).json({ message: 'An error occurred while retrieving kids\' shoes.' })
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No kids\' shoes found.' })
        }
        let kids = [];
        data.forEach((product) => {
            if(product.age === 'Boys' || product.age === 'Girls') {
                kids.push(product);
            }
        })
        res.json(kids)
    })
})


router.get(`/products/:_id`, (req, res) => {
    productsModel.findById(req.params._id, (error, data) => {
        if (error) {
            return res.status(500).json({ message: 'An error occurred while retrieving the product.' })
        }
        if (!data) {
            return res.status(404).json({ message: 'Product not found.' })
        }
        res.json(data)
    })
})


router.put(`/products/:_id`, (req, res) => {
    productsModel.findByIdAndUpdate(req.params._id, req.body, (error, data) => {
        if (data) {
            res.json(data)
        } else {
            res.json(error)
        }
    })
})



router.post('/payment/success', async (req, res) => {
    try {
      const { productsInCart } = req.body;
  
      // Loop through all the products in the cart
      for (let i = 0; i < productsInCart.length; i++) {
        const { databaseID, product_id, product_quantity } = productsInCart[i];
  
        // Find the product in the database by ID
        const product = await Product.findById(product_id);
  
        // Loop through the product sizes and find the matching size
        for (let j = 0; j < product.inventory.stock.length; j++) {
          if (product.inventory.stock[j].size === productsInCart[i].product_size) {
            // Calculate the new quantity
            const newQuantity = product.inventory.stock[j].quantity - product_quantity;
  
            // Update the product quantity in the database
            await Product.updateOne(
              { _id: product_id, 'inventory.stock.size': productsInCart[i].product_size },
              { $set: { 'inventory.stock.$.quantity': newQuantity } }
            );
  
            break;
          }
        }
      }
  
      res.send('Payment successful');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  



const checkThatUserIsAnAdministrator = (req, res, next) =>
{
    if(req.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
    {    
        return next()
    }
    else
    {
        return next(createError(401))
    }
}

const getAccessLevel = (req, res, next) =>

{
    UserModal.findOne({email: req.body.email}, (error, data) =>
    {
        if (error)
        {
            return next(error)
        }
        if (!data)
        {
            return next(createError(404))
        }
        req.accessLevel = data.accessLevel
        return next()
    })
}


const deleteOneProduct = (req, res, next) =>
{
    const productId = req.params._id;

    if (typeof productId !== 'string' && !Buffer.isBuffer(productId)) {
        return next(createError(400, 'Invalid product ID'));
    }

    productsModel.findByIdAndDelete(productId, (error, data) =>
    {
        if (error)
        {
            return next(error)
        }
        if (!data)
        {
            return next(createError(404))
        }
        res.json(data)
    })
}


// Delete one record
router.delete(`/product/:_id/:email`,  getAccessLevel , checkThatUserIsAnAdministrator, deleteOneProduct)

module.exports = router
