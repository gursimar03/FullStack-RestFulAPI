// const mongoose = require(`mongoose`)

// let productsSchema = new mongoose.Schema(
//    {
//         brand : {type: String},
//         name : {type: String},
//         description : {type: String},
//         age : {type: String},
//         type : {type: String},
//         color : {type: String},
//         productImage : {type: String},
//         images : {type: Array},
//         sizes : {type: Array},
//         price : {type: Number},
//         inventory: {type: Object}


//    },
//    {
//        collection: `Products`
//    })

// module.exports = mongoose.model(`Products`, productsSchema)

const mongoose = require(`mongoose`);

const productsSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: String,
        required: true,
        enum: ['Men', 'Women', 'Kids', 'Boys', 'Girls'],
    },
    type: {
        type: String,
        required: true,
        enum: ['Lifestyle', 'Running', 'Basketball', 'Football', 'Training'],
    },
    color: {
        type: String,
        required: true,
        trim: true,
    },
    productImage: {
        type: String,
        required: true,
        trim: true,
    },
    images: {
        type: [String],
        required: true,
        validate: [arrayMinLength(1), arrayMaxLength(11)],
    },
    sizes: {
        type: [String],
        required: true,
        validate: [arrayMinLength(1), arrayMaxLength(20)],
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    inventory: {
        type: {
            stock: {
                type: [
                    {
                        size: {
                            type: String,
                            required: true,
                        },
                        quantity: {
                            type: Number,
                            required: true,
                            min: 0,
                        },
                    },
                ],
                required: true,
                validate: [arrayMinLength(1), arrayMaxLength(20)],
            },
        },
        required: true,
    },
}, {
    collection: `Products`,
});

// Helper function for array validation
function arrayMinLength(val) {
    return function (arr) {
        return arr.length >= val;
    };
}

// Helper function for array validation
function arrayMaxLength(val) {
    return function (arr) {
        return arr.length <= val;
    };
}

module.exports = mongoose.model(`Products`, productsSchema);
