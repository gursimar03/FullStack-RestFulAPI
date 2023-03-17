// const mongoose = require(`mongoose`)

// let usersSchema = new mongoose.Schema(
//    {
//         name: {type: String, required:true},
//         surname: {type: String, required:true},
//         email: {type: String, required:true},
//         password: {type: String,required:true},
//         gender: {type: String, required:true},
//         accessLevel: {type: Number, default:parseInt(process.env.ACCESS_LEVEL_NORMAL_USER)},
//         profilePhotoFilename: {type:String, default:""}
//    },
//    {
//        collection: `Users`
//    })

// module.exports = mongoose.model(`Users`, usersSchema)

const mongoose = require(`mongoose`);

let usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      match: /^[a-zA-Z\s]+$/,
    },
    surname: {
      type: String,
      required: true,
      match: /^[a-zA-Z\s]+$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    accessLevel: {
      type: Number,
      default: parseInt(process.env.ACCESS_LEVEL_NORMAL_USER),
      min: 0,
    },
    profilePhotoFilename: {type:String, default:""},
  },
  {
    collection: `Users`,
  }
);

module.exports = mongoose.model(`Users`, usersSchema);
