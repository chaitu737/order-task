const mongoose = require('mongoose');

const Schema = mongoose.Schema;





const orderSchema = new Schema({
    title:{
        type:String
    },

    price:{
        type:Number,
    },

    status:{
        type:String
    },
    payment:{
        type:Boolean, default:false
    }

  

  





}, {
    timestamps:true
});


const User = mongoose.model('order', orderSchema);

module.exports=User