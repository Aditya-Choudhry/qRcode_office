import mongoose from 'mongoose';
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone_number: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  ipAddress: {
    type: String,
  },
  del:{
    type: Number,
    default: 0
  },
  loginAttempts :{
    type: Number,
    default: 0
  },
  loginLockout : {
    type: Boolean,
    default: false
  },
  lockoutTimestamp : {
    type: Date,
    default: null
  },
  lastLoginAttempt : {
    type: Date,
    default: null
  },
  subscribe : {
    type : Boolean,
    default: false
  },
  subscriptionType: {
    type: String, 
    default: 'none'
  },
  businessCount: { 
    type: Number, 
    default: 0 },
    isAdmin :{
      type: Boolean,
      default: false
    }
},{timestamps:true});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
export default mongoose.model('User', userSchema);

