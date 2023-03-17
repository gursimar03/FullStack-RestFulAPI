const router = require(`express`).Router()
const productsModel = require(`../models/products`)

const dataset = require('../dataset/shoes.json');


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

// router.get(`/products/:_id`, (req, res) => {
//     productsModel.findById(req.params._id, (error, data) => {
//         if (data) {
//             res.json(data)
//         } else {
//             res.json(error)
//         }
//     })
// })
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

module.exports = router
