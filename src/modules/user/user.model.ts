import mongoose from 'mongoose'; // Erase if already required
export interface IUser {
    _id?: string;
    first_name: string;
    last_name: string;
    email: string;
    mobile?: string;
    password: string;
    role: string;
    provider?: string;
    providerId?: string;
    avatar?: string
}

enum Role {
    USER = "user",
    ADMIN = "admin",
}
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema<IUser>({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER,
    }
});

const userModel = mongoose.model<IUser>('user', userSchema);

export default userModel
