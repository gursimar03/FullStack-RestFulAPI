const mongoose = require(`mongoose`)

let Schema = mongoose.Schema
let carts = new Schema(
   {
        userId : {Type : String},
        carts : [{Type:String}]
   },
   {
       collection: `Carts`
   })

module.exports = mongoose.model(`Carts`, carts)