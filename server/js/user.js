// Require Mongoose
import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

// Define a schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [false, "Email is not required"]
    },
    password: {
        type: String,
        required: [false, "Password is not required"]
    },
    displayName: {
        type: String,
        required: [false, "Display name is not required"]
    },
  
});

userSchema.plugin(passportLocalMongoose);

// Compile model from schema
const User = mongoose.model('User', userSchema);

export default User;