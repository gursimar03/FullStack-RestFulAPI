const mongoose = require(`mongoose`)

let productsSchema = new mongoose.Schema(
   {
        brand : {type: String},
        name : {type: String},
        description : {type: String},
        age : {type: String},
        type : {type: String},
        colors : {type: Array},
        productImage : {type: String},
        images : {type: Array},
        sizes : {type: Array},
        price : {type: Number},
        inventory: {type: Object}


   },
   {
       collection: `Products`
   })

module.exports = mongoose.model(`Products`, productsSchema)