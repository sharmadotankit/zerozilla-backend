const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClientSchema = new Schema({
        agencyId: {
            type: mongoose.Types.ObjectId,
            ref: "agency"
        },
        clientName: {
            type: String,
            required:true,
        },
        email: {
            type: String,
            required:true,
            unique:true
        },
        phoneNumber: {
            type: String,
            default:"",
            required:true,
        },
        totalBill:{
            type:Number,
            required:true,
        }
    },
    {timestamps:true}
);

const Client = mongoose.model('client', ClientSchema);
module.exports = Client;