const mongoose = require('mongoose');
const { Schema } = mongoose;

const AgencySchema = new Schema({
        agencyId: {
            type: mongoose.Types.ObjectId,
            ref: "agency"
        },
        name: {
            type: String,
            required:true,
        },
        email: {
            type: String,
            required:true,
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

const Agency = mongoose.model('agency', AgencySchema);
module.exports = Agency;