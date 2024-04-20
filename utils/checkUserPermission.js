import { GraphQLError } from 'graphql'

// write better logic here
export function checkPermission ( user, id) {
  if (user._id === id || user.role === "admin") {} else {
    throw new GraphQLError("Permission Denied")
  }
}

