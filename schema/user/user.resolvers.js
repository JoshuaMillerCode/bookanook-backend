import User from "./user.model.js";
import { GraphQLError } from 'graphql'

const userResolvers = {
  Query: {
    getUser: async (_, { id }, {user}) => {
      checkPermission(user, id)

      try {
        return await User.findById(id).populate("friends")
      } catch (err) {
        throw new GraphQLError("User not found or invalid ID")
      }
      
    },
  },
  Mutation: {
    updateUser: async (_, { id, update }, { user }) => {
      checkPermission(user, id)

      try {
        return await User.findByIdAndUpdate(id, update, { new: true })
      } catch (err) {
        throw new GraphQLError(err.message)
      }
    },
    deleteUser: async (_, { id }, { user }) => {
      checkPermission(user, id)

      try {
        return await User.findByIdAndDelete(id)
      } catch (err) {
        throw new GraphQLError(err.messsage)
      }
      
      
    },
    sendFriendRequest: async (_, { id }, { user }) => {
      // (id is the user friend request recipient )
      try {
        const recipient = await User.findById(id)

        if (!recipient) {
          throw new GraphQLError("Recipient Not Found")
        }

        const friendReq = {
          recipient: recipient._id,
          requester: user._id,
          accepted: false
        }

        recipient.friendRequests.push(friendReq)
        user.friendRequests.push(friendReq)

        user.save()
        recipient.save()

        return { status: "Sent", friendRequest: friendReq}
      } catch (err) {
        throw new GraphQLError(err)
      }
    },
    handleFriendRequest: async (_, { answer }, { user }) => {
      try {
        const { requesterId, choice } = answer
        console.log(requesterId, choice)
        
        const requester = await User.findById(requesterId)
        // console.log(requester)
        if (!requester) {
          throw new GraphQLError("Requester Not Found")
        }

        const foundRequest = user.friendRequests.find((req) => {
          return req.requester.toString() === requesterId
        })

        if (!foundRequest) {
          throw new GraphQLError("Friend Request Not Found")
        }

        // console.log(foundRequest.recipient.toString() === user._id.toString())

        if (choice && foundRequest.recipient.toString() === user._id.toString()) {
          user.friends.push(requester._id)
          requester.friends.push(user._id)

          user.friendRequests.splice(
              user.friendRequests.findIndex((req) => {
                return req.requester.toString() === requester._id.toString()
              })
            , 
              1
          )
          
          requester.friendRequests.splice(
              requester.friendRequests.findIndex((req) => {
                return req.recipient.toString() === user._id.toString()
              })
            ,
              1
          )

          user.save()
          requester.save()

        return { message: "Friend Request Accepted!"}
        }

      } catch (err) {
        throw new GraphQLError(err)
      }
    }
  }
};


// Helper Functions
function checkPermission ( user, id) {
  if (user._id === id || user.role === "admin") {} else {
    throw new GraphQLError("Permission Denied")
  }
}


//Routes To-Do

// Send Friend Request 

// Accept Friend Request

export default userResolvers;
