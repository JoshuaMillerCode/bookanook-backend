import jwt from 'jsonwebtoken';

export async function extractJWT (request) {
  const jwtHeader = request.headers.get("Authorization")
    
    if (jwtHeader) {
      const token = jwtHeader.slice(7)
      const decoded = await jwt.verify(token, process.env.JWT_SECRET)
      return { user: decoded.user}
    }
}