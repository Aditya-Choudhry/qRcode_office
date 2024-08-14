import mongoose from 'mongoose';
const { Schema } = mongoose;
const businessSchema = new Schema({
  businessLogo: {
    type: String, 
    required: false,
  },
  banner: {
    type: String, 
    required: false,
  },
  businessName: {
    type: String,
    required: true,
  },
  businessAddress: {
    type: String,
    required: true,
  },
  businessType: {
    type: String,
    required: true,
  },
  defaultLanguage: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: false,
  },
  ownerid: {
    type:String,
    required:true,
  },
});
export default mongoose.model('Business', businessSchema);
