import mongoose, { Schema } from "mongoose";

const rolesValidos = ["ADMIN_ROLE", "USER_ROLE"];

const usersSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roleUser: {
        type: String,
        Enum: rolesValidos,
        required: true,
    },
    stateUser: {
        type: Boolean,
        default: true,
    }
});

usersSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
};

export default mongoose.model("Users", usersSchema);