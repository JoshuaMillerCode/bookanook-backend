import jwt, { decode } from 'jsonwebtoken';
import User from '../schema/user/user.model.js'
import { GraphQLError } from 'graphql'

export async function extractJWT (request) {
  try {
    const jwtHeader = request.headers.get("Authorization")
    
    if (jwtHeader) {
      const token = jwtHeader.slice(7)
      const decoded = await jwt.verify(token, process.env.JWT_SECRET)

      const foundUser = await User.findById(decoded.user._id)

      if (foundUser) {
        return { user: foundUser }
      } else {
        return { user: null}
      }
    }
  } catch (err) {
    throw GraphQLError(err.message)
  }
}