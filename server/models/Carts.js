const mongoose = require(`mongoose`)

let Schema = mongoose.Schema
let carts = new Schema(
   {
        user_email :  {type: String, required:true},
        products_cart : { type: [[String]] }
   },
   {
       collection: `Carts`
   })

module.exports = mongoose.model(`Carts`, carts) 