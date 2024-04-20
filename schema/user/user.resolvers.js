import User from "./user.model.js";
import { checkPermission } from "../../utils/checkUserPermission.js";

const userResolvers = {
  Query: {
    getUser: async (_, { id }, {user}) => {
      checkPermission(user, id)

      return await User.findById(id)
    },
  },
  Mutation: {
    updateUser: async (_, { id, update }, { user }) => {
      checkPermission(user, id)

      return await User.findByIdAndUpdate(id, update, { new: true })
    },
    deleteUser: async (_, { id }, { user }) => {
      checkPermission(user, id)

      return await User.findByIdAndDelete(id)
      
    },
    sendFriendRequest: async (_, { id }, { user }) => {
      checkPermission(user, id)

      // (id is the user friend request recipient )
    }
  }
};

// Send Friend Request 

// Accept Friend Request

export default userResolvers;
