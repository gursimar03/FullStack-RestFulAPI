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


router.post(`/cart/:_id/:size/:quantity/:user_email`,(req,res) =>{

 // making so that last 3 degits represent size of id .. i.e ID : 213g2y1u3vgj12gv3jg2 + 10.5 
            // if its two digets  it would below
            //010

    let sizeS = req.params.size.toString()
            
    if(sizeS.length == 2){
        sizeS = "0" + sizeS
    }

    let newProductId = req.params._id + sizeS

    let cartsAr = [newProductId,req.params.quantity]


    cartsModel.findOne({user_email: req.params.user_email }, (uniqueError, uniqueData) => {
        if (uniqueData) {
        
            uniqueData.products_cart.push(cartsAr);
            uniqueData.save((saveError) => {
              if (saveError) {
                res.json({ errorMessage: saveError });
              } else {
                res.json({ response: 'added to cart' });
              }
            })
        
        }else{

           
         
          

            cartsModel.create({user_email:req.params.user_email,products_cart:cartsAr},(error,data) =>{
                if(data){
                    res.json({response:"added to cart"})
                }else{
                    res.json({errorMessage:error})
                }
            })

            
        }
    })


})
module.exports = router
