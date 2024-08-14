import mongoose from 'mongoose';
const { Schema } = mongoose;
const keywordSchema = new Schema({
  keyword: { type: String, required: true },
  language: { type: String, required: true },
  businessId: { type: String, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});
const Keyword = mongoose.model('Keyword', keywordSchema);
export default Keyword;