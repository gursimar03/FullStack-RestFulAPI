const router = require(`express`).Router()
const cartsModel = require(`../models/Carts`)

router.get(`/cart/:_id`, (req, res) => {
    cartsModel.findById(req.params._id, (error, data) => {
        if (data) {
            res.json(data)
        } else {
            res.json(error)
        }
    })
})


router.post(`/cart/:_id/:size/:quantity`,(req,res) =>{


    cartsModel.findOne({ _id: req.params._id }, (uniqueError, uniqueData) => {
        if (uniqueData) {
          res.json({ errorMessage: `User already exists` })
        }else{
            cartsModel.create({userId:req.params._id,})
        }
    })


})
module.exports = router
