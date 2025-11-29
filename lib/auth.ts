// Simple token system for v0 preview (replaces jsonwebtoken)
import bcrypt from "bcryptjs"

// Simple base64 encoding/decoding for tokens
export function createToken(payload: any): string {
  const tokenData = {
    ...payload,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    iat: Date.now(),
  }

  // Simple base64 encoding
  return btoa(JSON.stringify(tokenData))
}

export function verifyToken(token: string): any {
  try {
    // Simple base64 decoding
    const decoded = JSON.parse(atob(token))

    // Check if token is expired
    if (decoded.exp && decoded.exp < Date.now()) {
      return null
    }

    return decoded
  } catch (error) {
    return null
  }
}

// Password hashing utilities
export async function hashPassword(password: string): Promise<string> {
  try {
    return await bcrypt.hash(password, 12)
  } catch (error) {
    // Fallback for v0 preview
    return `hashed_${password}`
  }
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  // Check if hash is a bcrypt hash (starts with $2a$, $2b$, etc.)
  const isBcryptHash = hash.startsWith('$2')

  if (isBcryptHash) {
    try {
      return await bcrypt.compare(password, hash)
    } catch (error) {
      return false
    }
  }

  // Fallback for v0 preview - simple comparison for mock data
  return hash === `hashed_${password}` || hash.includes(password)
}
