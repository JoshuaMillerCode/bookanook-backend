import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      required: true,
      type: String,
    },
    displayName: String,
    password: {
      required: true,
      type: String,
    },
    age: Number,
    bio: String,
    image: String,
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    bookNotes: [{ type: Schema.Types.ObjectId, ref: 'BookNote' }],
  },
  {
    timestamps: true,
  }
);

export default model('User', userSchema);
