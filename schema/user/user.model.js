import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const FriendRequestSchema = new Schema({
  requester: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: Boolean,
    required: true,
  },
});

const userSchema = new Schema(
  {
    provider: {
      type: String,
      enum: ['google', 'local'],
    },
    role: {
      type: String,
      enum: ['admin', 'bookworm']
    },
    // googleId: String,
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
    friendRequests: [FriendRequestSchema],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password
      }
    }
  }
);

const SALT_ROUNDS = 6;

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

export default model('User', userSchema);
