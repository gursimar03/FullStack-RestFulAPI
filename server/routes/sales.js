const router = require(`express`).Router()

const salesModel = require('../models/Sales');
const cartModel = require('../models/Carts');

//use body parser to get data from the body

// router.post(`/cart/checkout`, (req, res)=> {

//     return req.body
// })
router.post(`/cart/checkout`, async (req, res) => {
    try {
        const { paypalPaymentID, user_email, product_array, price, product_date } = req.body;

        const sales = new salesModel({
            paypalPaymentID,
            user_email,
            product_array,
            price,
            product_date
        });

        const result = await sales.save();

        res.json({ message: 'Payment data saved successfully', data: result });
    } catch (err) {
      
        res.status(500).json({ error: 'Something went wrong', details: err });
    }
});

router.get(`/cart/orders/:email`, async (req, res) => {
    try {
      const { email } = req.params;
      const orders = await salesModel.find({ user_email: email });
      res.json(orders);
    } catch (err) {
    
      res.status(500).json({ error: 'Something went wrong', details: err });
    }
  });

  router.delete('/sales/delete/:paypalID', (req, res) => {
    const paypalID = req.params.paypalID;
  
    salesModel.findOneAndDelete({ paypalPaymentID: paypalID }, (err, data) => {
      if (err) {
     
        res.status(500).json({ message: 'An error occurred while deleting the sale.' });
      } else if (!data) {
        res.status(404).json({ message: 'Sale not found.' });
      } else {
        res.json({ message: 'Sale successfully deleted.' });
      }
    });
  });


module.exports = router
