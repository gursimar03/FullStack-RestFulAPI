const mongoose = require(`mongoose`)

let salesSchema = new mongoose.Schema(
   {
        paypalPaymentID: {type: String, required:true},
        user_email: {type: String, required:true},
        product_array: { type: [[String]] , required:true},
        price: {type: Number, required:true}
   },
   {
       collection: `Sales`
   })

module.exports = mongoose.model(`Sales`, salesSchema)