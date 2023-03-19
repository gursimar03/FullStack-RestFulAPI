const router = require(`express`).Router()

const salesModel = require('../models/Sales');
const cartModel = require('../models/Carts');

//use body parser to get data from the body

router.post(`/cart/checkout`, (req, res)=> {

    return req.body
})

module.exports = router
