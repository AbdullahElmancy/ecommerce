import mongoose, { Types } from 'mongoose'; // Erase if already required
export interface IUser {
    _id?: Types.ObjectId;
    first_name: string;
    last_name: string;
    email: string;
    mobile?: string;
    password: string;
    role: string;
    provider?: string;
    providerId?: string;
    avatar?: string;
    cart: string[];
    wishlist?: Types.ObjectId[];
    addresses?:Types.ObjectId[];
    isBlocked:boolean;
    refreshToken?:string
}

enum Role {
    USER = "user",
    ADMIN = "admin",
    HR = "hr",
    SUPERVISOR = "supervisor",
    SUPERADMIN = "superAdmin",
    TRADER = "trader"
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
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER,
    },
    cart:{
        type:[String],
        default:[]
    },
    wishlist:[{type:Types.ObjectId,ref:"Product"}],
    addresses:[{type:Types.ObjectId,ref:"Address"}],
    isBlocked:{
        type:Boolean,
        default:false
    },
    refreshToken: String
},{timestamps:true});

const userModel = mongoose.model<IUser>('User', userSchema);

export default userModel
