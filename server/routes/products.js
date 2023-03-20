
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
       res.json(error)
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



router.post('/payment/success/:productID/:productSize/:productQuantity', async (req, res) => {
    try {
      
        const productID = req.params.productID;
        const productSize = req.params.productSize;
        const productQuantity = req.params.productQuantity;


        

        productsModel.findOne({ _id: productID }, (error, data) => {

            if (error) {
                return res.status(500).json({ message: 'An error occurred while retrieving the product.' })
            }
            if (!data) {
                return res.status(404).json({ message: 'Product not found.' })
            }
          
            for(let i = 0; i < data.inventory.stock.length; i++) {
                if(data.inventory.stock[i].size == productSize) {
                   
                    data.inventory.stock[i].quantity -= productQuantity;
                    
                }
            }

            productsModel.updateOne({ _id: productID },{inventory: data.inventory}, (error, data) => {

                if (error) {
                    
                    return res.status(500).json({ message: 'An error occurred while updating the product.' })

                }
                if (!data) {
                    return res.status(404).json({ message: 'Product not found.' })
                }
                
                res.json(data)
            })
        })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while processing the payment.' })
    }
})


router.put(`/product/return/:id/:size/:quantity`, (req, res) => {

    let productID = req.params.id;
    let productQuantity = req.params.quantity;
    let productSize = req.params.size;

    //change to int
    productQuantity = parseInt(productQuantity);
    productSize = parseInt(productSize);
 
    productsModel.findOne({ _id:productID}, (error, data) => {

        if (error) {
            return res.status(500).json({ message: 'An error occurred while retrieving the product.' })
        }
        if (!data) {
            return res.status(404).json({ message: 'Product not found.' })
        }
      
        for(let i = 0; i < data.inventory.stock.length; i++) {
            if(data.inventory.stock[i].size == productSize) {
               
                data.inventory.stock[i].quantity += productQuantity;
                
            }
        }

        productsModel.updateOne({ _id: productID },{inventory: data.inventory}, (error, data) => {

            if (error) {
                
                return res.status(500).json({ message: 'An error occurred while updating the product.' })

            }
            if (!data) {
                return res.status(404).json({ message: 'Product not found.' })
            }
            
            res.json(data)
        })
    })

})







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
// router.delete(`/product/:_id/:email`,  getAccessLevel , checkThatUserIsAnAdministrator, deleteOneProduct)

router.delete("/product/:id", async (req, res) => {
    try {
      const deletedProduct = await productsModel.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).send();
      }
      res.send(deletedProduct);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.post('/products/add', (req, res) => {
    const {
      brand,
      name,
      description,
      age,
      type,
      color,
      productImage,
      images,
      sizes,
      price,
      inventory
    } = req.body;
  
    const newProduct = new productsModel({
      brand,
      name,
      description,
      age,
      type,
      color,
      productImage,
      images,
      sizes,
      price,
      inventory
    });
  
    newProduct.save()
      .then(() => res.json('Product added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
//to get a product
router.get('/editproduct/:id', (req, res) => {
    productsModel.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

//to update a product
router.post('/editproduct/:id', (req, res) => {
    productsModel.findById(req.params.id)
        .then(product => {
            product.brand = req.body.brand;
            product.name = req.body.name;
            product.description = req.body.description;
            product.age = req.body.age;
            product.type = req.body.type;
            product.color = req.body.color;
            product.productImage = req.body.productImage;
            product.images = req.body.images;
            product.sizes = req.body.sizes;
            product.price = req.body.price;
            product.inventory = req.body.inventory;

            product.save()
                .then(() => res.json('Product updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});




module.exports = router
