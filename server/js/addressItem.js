// Require Mongoose
import mongoose from 'mongoose';

// Define a schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
    address: {
        type: String,
        required: [true, "Address string is required"]
    },
    status: {
        type: String,
        required: [true, "Status string is required"]
    },

});

// Compile model from schema
const AddressItem = mongoose.model('AddressItem', userSchema);

export default AddressItem;