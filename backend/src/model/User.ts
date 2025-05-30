import { Schema, Document, Model } from "mongoose";

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

export interface IUser extends Document {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string,
    street: string,
    voivodeship: string,
    postalCode: string,
    homeNumber: string,
    city: string,
    comparePassword: (candidatePassword: string) => Promise<boolean>
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
      
    
    voivodeship: {
        type: String,
        required: true
    },
    
    city: {
        type: String,
        required: true
    }
});

// Hashowanie hasła przed zapisaniem
UserSchema.pre<IUser>('save', async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10)
    }
    next();    
})
UserSchema.methods.comparePassword = async function (candidatePassword:string) : Promise<boolean> {
    return bcrypt.compare(candidatePassword,this.password);
}
const User: Model<IUser> = mongoose.model('User', UserSchema);
export default User; 

