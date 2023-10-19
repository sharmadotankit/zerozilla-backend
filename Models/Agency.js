const mongoose = require('mongoose');
const { Schema } = mongoose;

const AgencySchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        address1: {
            type: String,
            required:true,
        },
        address2: {
            type: String,
        },
        city: {
            type: String,
            required:true,
        },
        state: {
            type: String,
            required:true,
        },
        phoneNumber: {
            type: String,required:true,
        },
    },
    {timestamps:true}
);

const Agency = mongoose.model('agency', AgencySchema);
module.exports = Agency;