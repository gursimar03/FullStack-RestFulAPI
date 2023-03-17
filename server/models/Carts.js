const mongoose = require(`mongoose`)

let Schema = mongoose.Schema
let carts = new Schema(
   {
    user_email: {
        type: String,
        required: true, // the user_email must be provided
        unique: true, // the user_email must be unique (no other user can have the same user_email)
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // validate the user_email in the correct format
      },
        products_cart : { type: [[String]] }
   },
   {
       collection: `Carts`
   })

module.exports = mongoose.model(`Carts`, carts) 