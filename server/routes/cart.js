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

            // making so that last 3 degits represent size of id .. i.e ID : 213g2y1u3vgj12gv3jg2 + 10.5 
            // if its two digets  it would below
            //010
            let sizeS = req.params.size.toString()
            
            if(sizeS.length == 2){
                sizeS = "0" + sizeS
            }

            let newProductId = req.params._id + sizeS
            console.log(newProductId)

            
        }
    })


})
module.exports = router
