const mongoose = require(`mongoose`)

let salesSchema = new mongoose.Schema(
   {
        paypalPaymentID: {type: String, required:true},
        user_email: {type: String, required:true},
        //product_array of type object
        product_array: {type: Object, required:true},
        price: {type: Number, required:true},
        product_date: {type: Date, required:true}
   },
   {
       collection: `Sales`
   })

module.exports = mongoose.model(`Sales`, salesSchema)