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



router.get(`/products`, (req, res) => {
    productsModel.find({}, (error, data) => {
        if (data) {
            res.json(data)
        } else {
            res.json(error)
        }
    })
})

router.get(`/shoes/men`, (req, res) => {
    productsModel.find({age: 'Men'}, (error, data) => {
        if (data) {
            res.json(data)
        } else {
            res.json(error)
        }
    })
})

router.get(`/shoes/women`, (req, res) => {
    productsModel.find({age: 'Women'}, (error, data) => {
        if (data) {
            res.json(data)
        } else {
            res.json(error)
        }
    })
})

//get both boys and girls
router.get(`/shoes/kids`, (req, res) => {
    productsModel.find({}, (error, data) => {
        if (data) {
            //filter only boys and girls shoes
            let kids = [];
            data.forEach((product) => {
                if(product.age === 'Boys' || product.age === 'Girls') {
                    kids.push(product);
                }
            })
            res.json(kids)
        } else {
            res.json(error)
        }
    })
})









router.get(`/products/:_id`, (req, res) => {
    productsModel.findById(req.params._id, (error, data) => {
        if (data) {
            res.json(data)
        } else {
            res.json(error)
        }
    })
})

module.exports = router
